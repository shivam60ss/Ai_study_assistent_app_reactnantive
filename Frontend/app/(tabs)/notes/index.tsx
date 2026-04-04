import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { Search, Plus, ArrowLeft, Calendar, BookOpen } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function NotesScreen() {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const notes = [
    {
      id: 1,
      title: "Quantum Physics - Chapter 5",
      preview:
        "Wave-particle duality and Heisenberg's uncertainty principle.",
      date: "Mar 10, 2026",
      subject: "Physics",
      color: "#3B82F6"
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      preview:
        "Supervised learning and neural networks introduction.",
      date: "Mar 9, 2026",
      subject: "Computer Science",
      color: "#8B5CF6"
    },
    {
      id: 3,
      title: "Organic Chemistry Notes",
      preview:
        "Alkanes, alkenes and functional groups in organic compounds.",
      date: "Mar 8, 2026",
      subject: "Chemistry",
      color: "#22C55E"
    }
  ];

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.push("/dashboard")}>
          <ArrowLeft size={24} color="#555" />
        </TouchableOpacity>

        <Text style={styles.title}>My Notes</Text>

      </View>

      {/* Search Bar */}

      <View style={styles.searchBox}>

        <Search size={18} color="#999" />

        <TextInput
          placeholder="Search notes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />

      </View>

      {/* Notes List */}

      <ScrollView style={styles.notesContainer}>

        {filteredNotes.length === 0 ? (

          <View style={styles.empty}>
            <BookOpen size={40} color="#ccc" />
            <Text style={{ color: "#777" }}>No notes found</Text>
          </View>

        ) : (

          filteredNotes.map((note) => (

            <TouchableOpacity
              key={note.id}
              onPress={() => router.push(`/notes/${note.id}`)}
              style={styles.card}
            >

              <View style={styles.row}>

                <View
                  style={[
                    styles.colorBar,
                    { backgroundColor: note.color }
                  ]}
                />

                <View style={{ flex: 1 }}>

                  <View style={styles.cardHeader}>

                    <Text style={styles.noteTitle}>{note.title}</Text>

                    <Text
                      style={[
                        styles.subject,
                        { backgroundColor: note.color }
                      ]}
                    >
                      {note.subject}
                    </Text>

                  </View>

                  <Text style={styles.preview}>
                    {note.preview}
                  </Text>

                  <View style={styles.dateRow}>
                    <Calendar size={14} color="#999" />
                    <Text style={styles.dateText}>{note.date}</Text>
                  </View>

                </View>

              </View>

            </TouchableOpacity>

          ))

        )}

      </ScrollView>

      {/* Floating Button */}

      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => router.push("/scan")}
      >

        <Plus size={28} color="#fff" />

      </TouchableOpacity>

    </View>
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
    padding: 20,
    backgroundColor: "#fff"
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    margin: 16,
    padding: 10,
    borderRadius: 10
  },

  input: {
    marginLeft: 10,
    flex: 1
  },

  notesContainer: {
    paddingHorizontal: 16
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14
  },

  row: {
    flexDirection: "row"
  },

  colorBar: {
    width: 4,
    height: 70,
    borderRadius: 2,
    marginRight: 10
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  noteTitle: {
    fontWeight: "bold",
    fontSize: 16
  },

  subject: {
    color: "#fff",
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },

  preview: {
    fontSize: 13,
    color: "#666",
    marginTop: 4
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6
  },

  dateText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4
  },

  floatingBtn: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 40,
    elevation: 6
  },

  empty: {
    alignItems: "center",
    marginTop: 80
  }

});