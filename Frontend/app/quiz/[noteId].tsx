import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

import { ArrowLeft, CheckCircle, XCircle, Trophy } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function QuizScreen() {

  const router = useRouter();
  const { noteId } = useLocalSearchParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Particles can exist in multiple states simultaneously?",
      options: [
        "Wave-particle duality",
        "Quantum superposition",
        "Uncertainty principle",
        "Quantum entanglement"
      ],
      correctAnswer: 1,
      explanation: "Quantum superposition allows particles to exist in multiple states."
    },
    {
      id: 2,
      question: "Which equation describes quantum state evolution?",
      options: [
        "Einstein equation",
        "Maxwell equation",
        "Schrodinger equation",
        "Heisenberg equation"
      ],
      correctAnswer: 2,
      explanation: "Schrodinger equation describes quantum system behavior."
    }
  ];

  const handleSubmit = () => {

    if (selectedAnswer === null) return;

    setAnswered(true);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

  };

  const handleNext = () => {

    if (currentQuestion < questions.length - 1) {

      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);

    } else {

      setShowResult(true);

    }

  };

  if (showResult) {

    return (

      <View style={styles.container}>

        <View style={styles.header}>

          <TouchableOpacity onPress={() => router.push("/dashboard")}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Quiz Result</Text>

        </View>

        <View style={styles.resultCard}>

          <Trophy size={60} color="#22C55E" />

          <Text style={styles.score}>
            {score} / {questions.length}
          </Text>

          <Text style={styles.resultText}>
            Your Score
          </Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.replace(`/quiz/${noteId}`)}
          >
            <Text style={styles.btnText}>Retake Quiz</Text>
          </TouchableOpacity>

        </View>

      </View>

    );
  }

  const question = questions[currentQuestion];

  return (

    <ScrollView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Quiz</Text>

      </View>

      {/* Question */}

      <View style={styles.card}>

        <Text style={styles.question}>
          {question.question}
        </Text>

        {question.options.map((option, index) => {

          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;

          return (

            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                isSelected && styles.selected
              ]}
              onPress={() => !answered && setSelectedAnswer(index)}
            >

              <Text style={styles.optionText}>{option}</Text>

              {answered && isCorrect && (
                <CheckCircle size={18} color="green" />
              )}

              {answered && isSelected && !isCorrect && (
                <XCircle size={18} color="red" />
              )}

            </TouchableOpacity>

          );

        })}

      </View>

      {/* Explanation */}

      {answered && (

        <View style={styles.explanation}>

          <Text style={styles.explanationText}>
            {question.explanation}
          </Text>

        </View>

      )}

      {/* Button */}

      {!answered ? (

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleSubmit}
        >

          <Text style={styles.btnText}>
            Submit Answer
          </Text>

        </TouchableOpacity>

      ) : (

        <TouchableOpacity
          style={styles.successBtn}
          onPress={handleNext}
        >

          <Text style={styles.btnText}>
            {currentQuestion < questions.length - 1 ? "Next Question" : "View Result"}
          </Text>

        </TouchableOpacity>

      )}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    padding: 20
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 12
  },

  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },

  option: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  selected: {
    borderColor: "#4F46E5",
    backgroundColor: "#EEF2FF"
  },

  optionText: {
    fontSize: 14
  },

  explanation: {
    backgroundColor: "#ECFDF5",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10
  },

  explanationText: {
    color: "#065F46"
  },

  primaryBtn: {
    backgroundColor: "#4F46E5",
    margin: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: "center"
  },

  successBtn: {
    backgroundColor: "#22C55E",
    margin: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: "center"
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold"
  },

  resultCard: {
    alignItems: "center",
    marginTop: 100
  },

  score: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 10
  },

  resultText: {
    fontSize: 16,
    color: "#666"
  }

});