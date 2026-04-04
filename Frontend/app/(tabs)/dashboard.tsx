import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ScanLine, MessageSquare, ClipboardList, FileText, TrendingUp, Sparkles } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function DashboardScreen() {

  const router = useRouter();

  const quickActions = [
    { icon: ScanLine, label: "Scan Notes", path: "/scan" },
    { icon: MessageSquare, label: "Ask AI", path: "/chat" },
    { icon: ClipboardList, label: "Generate Quiz", path: "/quiz/demo" },
    { icon: FileText, label: "My Notes", path: "/notes" },
  ];

  const recentNotes = [
    {
      id: 1,
      title: "Quantum Physics - Chapter 5",
      preview: "Wave-particle duality and Heisenberg's uncertainty principle...",
      date: "2 hours ago",
      subject: "Physics",
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      preview: "Supervised learning, unsupervised learning...",
      date: "1 day ago",
      subject: "Computer Science",
    },
    {
      id: 3,
      title: "Organic Chemistry Notes",
      preview: "Alkanes, alkenes, and functional groups...",
      date: "2 days ago",
      subject: "Chemistry",
    },
  ];

  return (

    <ScrollView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.name}>Shivam</Text>
      </View>

      {/* Study Progress */}

      <View style={styles.card}>

        <View style={styles.rowBetween}>

          <View>
            <Text style={styles.small}>Study Progress</Text>
            <Text style={styles.percent}>75%</Text>
          </View>

          <TrendingUp size={28} color="#22C55E" />

        </View>

        <View style={styles.progressBg}>
          <View style={styles.progressFill} />
        </View>

        <Text style={styles.small}>12 hours studied this week</Text>

      </View>

      {/* Quick Actions */}

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.grid}>

        {quickActions.map((item, index) => {

          const Icon = item.icon;

          return (

            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => router.push(item.path)}
            >

              <Icon size={28} color="#4F46E5" />

              <Text style={styles.actionText}>
                {item.label}
              </Text>

            </TouchableOpacity>

          );

        })}

      </View>

      {/* AI Suggestion */}

      <View style={styles.aiCard}>

        <View style={styles.row}>

          <Sparkles size={20} color="white" />

          <Text style={styles.aiTitle}>
            AI Suggestion
          </Text>

        </View>

        <Text style={styles.aiText}>
          You've been studying Physics for 3 hours. Try taking a quiz!
        </Text>

        <TouchableOpacity
          style={styles.quizBtn}
          onPress={() => router.push("/quiz/demo")}
        >

          <Text style={styles.quizText}>
            Start Quiz
          </Text>

        </TouchableOpacity>

      </View>

      {/* Recent Notes */}

      <View style={styles.rowBetween}>

        <Text style={styles.sectionTitle}>
          Recent Notes
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/notes")}
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>

      </View>

      {recentNotes.map((note) => (

        <TouchableOpacity
          key={note.id}
          style={styles.noteCard}
          onPress={() => router.push(`/notes/${note.id}`)}
        >

          <View style={styles.rowBetween}>

            <Text style={styles.noteTitle}>
              {note.title}
            </Text>

            <Text style={styles.subject}>
              {note.subject}
            </Text>

          </View>

          <Text style={styles.preview}>
            {note.preview}
          </Text>

          <Text style={styles.date}>
            {note.date}
          </Text>

        </TouchableOpacity>

      ))}

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20
  },

  header: {
    backgroundColor: "#4F46E5",
    padding: 25,
    borderRadius: 20,
    marginBottom: 20
  },

  greeting: {
    color: "white",
    opacity: 0.8
  },

  name: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold"
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20
  },

  percent: {
    fontSize: 22,
    fontWeight: "bold"
  },

  small: {
    color: "#666",
    fontSize: 12
  },

  progressBg: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginVertical: 10
  },

  progressFill: {
    width: "75%",
    height: 8,
    backgroundColor: "#22C55E",
    borderRadius: 10
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20
  },

  actionCard: {
    width: "48%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10
  },

  actionText: {
    marginTop: 8,
    fontWeight: "500"
  },

  aiCard: {
    backgroundColor: "#4F46E5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  aiTitle: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8
  },

  aiText: {
    color: "white",
    marginVertical: 8
  },

  quizBtn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start"
  },

  quizText: {
    color: "#4F46E5",
    fontWeight: "bold"
  },

  noteCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },

  noteTitle: {
    fontWeight: "bold",
    flex: 1
  },

  subject: {
    color: "#4F46E5",
    fontSize: 12
  },

  preview: {
    color: "#666",
    marginVertical: 5
  },

  date: {
    fontSize: 12,
    color: "#999"
  },

  viewAll: {
    color: "#4F46E5"
  }

});