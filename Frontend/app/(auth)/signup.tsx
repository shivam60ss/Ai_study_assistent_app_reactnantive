import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { User, Mail, Lock, Eye, EyeOff, BookOpen } from "lucide-react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../config/api";

const Signup = () => {
  const router = useRouter();

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ── VALIDATION ─────────────────────────────────────────
  const validate = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return false;
    }
    if (name.length < 3) {
      Alert.alert("Error", "Name must be at least 3 characters");
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
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    return true;
  };

  // ── SIGNUP HANDLER ──────────────────────────────────────
  const handleSignup = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      Keyboard.dismiss();

      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      console.log("Signup Success ✅", response.data);

      // Save token and user, then navigate to dashboard
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      Alert.alert(
        "Success 🎉",
        "Account created successfully!",
        [
          {
            text: "Continue",
            onPress: () => router.replace("/dashboard"),
          },
        ]
      );

    } catch (error) {
      // Log detailed error for debugging (network errors often have no response)
      if (axios.isAxiosError(error)) {
        console.error('Signup Failed ❌ (axios)', error.toJSON ? error.toJSON() : error);
      } else {
        console.error('Signup Failed ❌', error);
      }

      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message || error.message)
        : String(error);

      Alert.alert(
        'Signup Failed',
        message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconBox}>
                <BookOpen size={48} color="#fff" />
              </View>
              <Text style={styles.headerTitle}>Create Account</Text>
              <Text style={styles.headerSubtitle}>
                Join us and start learning today
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>

              {/* Full Name */}
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputBox}>
                <User size={20} color="#888" />
                <TextInput
                  placeholder="Enter your full name"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
              </View>

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputBox}>
                <Mail size={20} color="#888" />
                <TextInput
                  ref={emailRef}
                  placeholder="Enter your email"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
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
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? <Eye size={20} color="#888" />
                    : <EyeOff size={20} color="#888" />
                  }
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputBox}>
                <Lock size={20} color="#888" />
                <TextInput
                  ref={confirmPasswordRef}
                  placeholder="Re-enter your password"
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleSignup}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword
                    ? <Eye size={20} color="#888" />
                    : <EyeOff size={20} color="#888" />
                  }
                </TouchableOpacity>
              </View>

              {/* Signup Button */}
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSignup}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.buttonText}>Create Account</Text>
                }
              </TouchableOpacity>

              {/* Login Link */}
              <TouchableOpacity
                onPress={() => router.push("/login")}
                disabled={loading}
              >
                <Text style={styles.loginText}>
                  Already have an account?{" "}
                  <Text style={styles.loginLink}>Login</Text>
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

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

  headerTitle: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#eee",
    marginTop: 4,
    fontSize: 13,
  },

  form: {
    padding: 24,
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

  button: {
    backgroundColor: "#5B4CF0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  buttonDisabled: {
    backgroundColor: "#A5B4FC",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginText: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
  },

  loginLink: {
    color: "#5B4CF0",
    fontWeight: "bold",
  },

});