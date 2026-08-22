import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Mail, Lock, BookOpen, Eye, EyeOff } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../../config/api";

export default function LoginScreen() {

  const router = useRouter();
  const passwordRef = useRef<TextInput | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── VALIDATION ─────────────────────────────────────────
  const validate = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "Enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  // ── LOGIN HANDLER ───────────────────────────────────────
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      Keyboard.dismiss();

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Save token and user data
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Login Success ✅");

      // replace so user cant go back to login
      router.replace("/dashboard");

    } catch (error) {
      console.error("Login Failed ❌", error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Something went wrong";
      Alert.alert(
        "Login Failed",
        message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconBox}>
                <BookOpen size={48} color="#fff" />
              </View>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>Sign in to continue learning</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputBox}>
                <Mail size={20} color="#888" />
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>

              {/* Password */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputBox}>
                <Lock size={20} color="#888" />
                <TextInput
                  ref={passwordRef}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                {/* Show / Hide Password */}
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? <Eye size={20} color="#888" />
                    : <EyeOff size={20} color="#888" />
                  }
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Buttons */}
              <View style={styles.inBox2}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonLeft]}
                  onPress={handleSignup}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.buttonText}>Login</Text>
                  }
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    backgroundColor: "#5B4CF0",
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  iconBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#eee",
  },

  form: {
    padding: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
    fontWeight: "600",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  forgot: {
    color: "#4F46E5",
    textAlign: "right",
    marginBottom: 20,
    fontSize: 13,
  },

  button: {
    flex: 1,
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonLeft: {
    marginRight: 10,
    backgroundColor: "#818CF8",
  },

  buttonDisabled: {
    backgroundColor: "#A5B4FC",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  inBox2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

});