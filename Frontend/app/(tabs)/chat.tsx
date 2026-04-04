import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Send, Sparkles, ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function AIChatScreen() {

  const router = useRouter();

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI study assistant. How can I help you today?",
      sender: "ai",
      time: new Date().toLocaleTimeString()
    }
  ]);

  const [inputText, setInputText] = useState("");

  const scrollRef = useRef<any>();

  const suggestedPrompts = [
    "Explain this concept",
    "Summarize notes",
    "Generate quiz"
  ];

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const generateAIResponse = (userInput: string) => {

    const lower = userInput.toLowerCase();

    if (lower.includes("explain")) {
      return "Sure! Let me explain this concept in simple terms. First understand the definition, then see how it applies in real examples.";
    }

    if (lower.includes("quiz")) {
      return "I can generate a quiz for you with multiple choice questions and explanations.";
    }

    if (lower.includes("summarize")) {
      return "Here is a quick summary of the topic with key points and important ideas.";
    }

    return "That's an interesting question! Can you give more details so I can help better?";
  };

  const handleSend = () => {

    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {

      const aiMessage = {
        id: messages.length + 2,
        text: generateAIResponse(inputText),
        sender: "ai",
        time: new Date().toLocaleTimeString()
      };

      setMessages((prev) => [...prev, aiMessage]);

    }, 1000);

    setInputText("");
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.push("/dashboard")}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>AI Assistant</Text>
          <Text style={styles.subtitle}>Always here to help</Text>
        </View>

        <Sparkles size={20} color="#fff" />

      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={{ paddingBottom: 20 }}
      >

        {messages.map((msg) => (

          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.sender === "user"
                ? styles.userRow
                : styles.aiRow
            ]}
          >

            <View
              style={[
                styles.messageBubble,
                msg.sender === "user"
                  ? styles.userBubble
                  : styles.aiBubble
              ]}
            >

              <Text
                style={
                  msg.sender === "user"
                    ? styles.userText
                    : styles.aiText
                }
              >
                {msg.text}
              </Text>

              <Text style={styles.time}>
                {msg.time}
              </Text>

            </View>

          </View>
        ))}

      </ScrollView>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <View style={styles.prompts}>

          {suggestedPrompts.map((p, i) => (
            <TouchableOpacity
              key={i}
              style={styles.promptBtn}
              onPress={() => setInputText(p)}
            >
              <Text style={styles.promptText}>{p}</Text>
            </TouchableOpacity>
          ))}

        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={handleSend}
        >
          <Send size={20} color="#fff" />
        </TouchableOpacity>

      </View>

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
    padding: 16,
    backgroundColor: "#5B4CF0",
    gap: 10
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },

  subtitle: {
    color: "#ddd",
    fontSize: 12
  },

  messages: {
    flex: 1,
    padding: 16
  },

  messageRow: {
    marginBottom: 10
  },

  userRow: {
    alignItems: "flex-end"
  },

  aiRow: {
    alignItems: "flex-start"
  },

  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16
  },

  userBubble: {
    backgroundColor: "#4F46E5"
  },

  aiBubble: {
    backgroundColor: "#fff"
  },

  userText: {
    color: "#fff"
  },

  aiText: {
    color: "#333"
  },

  time: {
    fontSize: 10,
    marginTop: 4,
    color: "#999"
  },

  prompts: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 8
  },

  promptBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },

  promptText: {
    fontSize: 12
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff"
  },

  input: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 12
  },

  sendBtn: {
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 10,
    marginLeft: 8
  }

});