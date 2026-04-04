import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { GraduationCap } from "lucide-react-native";

export default function SplashScreen() {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(auth)/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      
      <View style={styles.iconBox}>
        <GraduationCap size={80} color="#ffffff" strokeWidth={1.5} />
      </View>

      <Text style={styles.title}>AI Study Assistant</Text>

      <Text style={styles.subtitle}>
        Your AI-powered study partner
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5B4CF0",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },

  iconBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 30,
    borderRadius: 30,
    marginBottom: 30
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10
  },

  subtitle: {
    fontSize: 16,
    color: "#f0f0f0"
  }
});