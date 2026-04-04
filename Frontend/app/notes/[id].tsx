import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeft, Sparkles, Lightbulb, ClipboardList } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function NoteDetailScreen() {

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const noteContent = `Quantum Mechanics - Lecture Notes

Wave-Particle Duality

Light and matter exhibit both wave-like and particle-like properties. This fundamental principle is one of the cornerstones of quantum mechanics.

Key Principles:

1. Heisenberg's Uncertainty Principle
2. Schrödinger's Wave Equation
3. Quantum Superposition

Applications:
- Quantum Computing
- Semiconductor technology
- Laser technology
- Quantum cryptography`;

  const keyPoints = [
    "Wave-particle duality is fundamental to quantum mechanics",
    "Uncertainty principle limits measurement precision",
    "Superposition allows particles to exist in multiple states",
    "Measurement collapses quantum state"
  ];

  const aiSummary =
    "This lecture covers the fundamental principles of quantum mechanics such as wave-particle duality, uncertainty principle, and quantum superposition.";

  return (

    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.push("/notes")}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.headerTitle}>Note Details</Text>
          <Text style={styles.headerSubtitle}>Quantum Physics - Chapter 5</Text>
        </View>

      </View>

      {/* AI Summary */}
      <View style={styles.aiCard}>

        <View style={styles.row}>
          <Sparkles size={20} color="#fff" />
          <Text style={styles.aiTitle}> AI Summary</Text>
        </View>

        <Text style={styles.aiText}>{aiSummary}</Text>

      </View>

      {/* Key Points */}
      <View style={styles.card}>

        <View style={styles.row}>
          <Lightbulb size={20} color="#F59E0B" />
          <Text style={styles.sectionTitle}> Key Points</Text>
        </View>

        {keyPoints.map((point, index) => (
          <View key={index} style={styles.pointRow}>
            <View style={styles.dot}></View>
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}

      </View>

      {/* Full Notes */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>Full Notes</Text>

        <Text style={styles.noteText}>
          {noteContent}
        </Text>

      </View>

      {/* Generate Quiz */}
      <TouchableOpacity
        style={styles.quizBtn}
        onPress={() => router.push(`/quiz/${id}`)}
      >

        <ClipboardList size={20} color="#fff" />
        <Text style={styles.quizText}> Generate Quiz from this Note</Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5B4CF0",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },

  headerSubtitle: {
    color: "#ddd",
    fontSize: 12
  },

  aiCard: {
    backgroundColor: "#6D5CF6",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16
  },

  aiTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5
  },

  aiText: {
    color: "#eee",
    marginTop: 8
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16
  },

  sectionTitle: {
    fontWeight: "bold",
    marginLeft: 5
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  pointRow: {
    flexDirection: "row",
    marginTop: 8
  },

  dot: {
    width: 6,
    height: 6,
    backgroundColor: "#22C55E",
    borderRadius: 3,
    marginTop: 6,
    marginRight: 8
  },

  pointText: {
    flex: 1,
    fontSize: 14
  },

  noteText: {
    marginTop: 10,
    lineHeight: 20
  },

  quizBtn: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },

  quizText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6
  }

});