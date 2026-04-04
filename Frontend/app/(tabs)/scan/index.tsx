import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

import {
  Camera,
  Upload,
  ScanLine,
  CheckCircle,
  ArrowLeft
} from "lucide-react-native";

import { useRouter } from "expo-router";

export default function ScanNotesScreen() {

  const router = useRouter();

  const [scanned, setScanned] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const handleScan = () => {

    setExtractedText(
      "Quantum Mechanics - Lecture Notes\n\n" +
      "Wave-Particle Duality:\n" +
      "Light exhibits both wave-like and particle-like properties.\n\n" +
      "Key Principles:\n" +
      "1. Heisenberg's Uncertainty Principle\n" +
      "2. Schrödinger's Wave Equation\n" +
      "3. Quantum Superposition"
    );

    setScanned(true);
  };

  const handleSaveNote = () => {
    router.push("/notes");
  };

  return (

    <ScrollView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.push("/dashboard")}>
          <ArrowLeft size={24} color="#555" />
        </TouchableOpacity>

        <Text style={styles.title}>Scan Notes</Text>

      </View>

      {!scanned ? (

        <View style={styles.content}>

          {/* Camera Box */}

          <View style={styles.cameraBox}>

            <Camera size={60} color="#fff" />

            <Text style={styles.cameraText}>
              Position your notes within the frame
            </Text>

          </View>

          {/* Buttons */}

          <TouchableOpacity
            style={styles.scanBtn}
            onPress={handleScan}
          >

            <ScanLine size={20} color="#fff" />

            <Text style={styles.btnText}>Scan Notes</Text>

          </TouchableOpacity>


          <TouchableOpacity style={styles.uploadBtn}>

            <Upload size={20} color="#4F46E5" />

            <Text style={styles.uploadText}>Upload Image</Text>

          </TouchableOpacity>


          {/* Tips */}

          <View style={styles.tipsBox}>

            <Text style={styles.tipTitle}>Tips for best results:</Text>

            <Text style={styles.tip}>• Ensure good lighting</Text>
            <Text style={styles.tip}>• Keep the camera steady</Text>
            <Text style={styles.tip}>• Make sure text is readable</Text>

          </View>

        </View>

      ) : (

        <View style={styles.content}>

          {/* Success */}

          <View style={styles.successBox}>

            <CheckCircle size={24} color="#16A34A" />

            <View style={{ marginLeft: 10 }}>

              <Text style={styles.successTitle}>
                Scan Successful!
              </Text>

              <Text style={styles.successSub}>
                Text extracted from your notes
              </Text>

            </View>

          </View>

          {/* Extracted Text */}

          <View style={styles.textBox}>

            <Text style={styles.sectionTitle}>
              Extracted Text
            </Text>

            <Text style={styles.extractedText}>
              {extractedText}
            </Text>

          </View>


          {/* Buttons */}

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSaveNote}
          >

            <Text style={styles.btnText}>
              Save to Notes
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={styles.rescanBtn}
            onPress={() => setScanned(false)}
          >

            <Text style={styles.rescanText}>
              Scan Another
            </Text>

          </TouchableOpacity>

        </View>

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
    backgroundColor: "#fff",
    padding: 20
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10
  },

  content: {
    padding: 20
  },

  cameraBox: {
    height: 350,
    backgroundColor: "#111",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },

  cameraText: {
    color: "#ddd",
    marginTop: 10
  },

  scanBtn: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },

  uploadBtn: {
    borderWidth: 2,
    borderColor: "#4F46E5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20
  },

  uploadText: {
    color: "#4F46E5",
    marginLeft: 6,
    fontWeight: "600"
  },

  btnText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold"
  },

  tipsBox: {
    backgroundColor: "#DBEAFE",
    padding: 15,
    borderRadius: 12
  },

  tipTitle: {
    fontWeight: "bold",
    marginBottom: 6
  },

  tip: {
    fontSize: 13
  },

  successBox: {
    flexDirection: "row",
    backgroundColor: "#DCFCE7",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20
  },

  successTitle: {
    fontWeight: "bold"
  },

  successSub: {
    fontSize: 12
  },

  textBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10
  },

  extractedText: {
    fontSize: 14,
    lineHeight: 20
  },

  saveBtn: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10
  },

  rescanBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },

  rescanText: {
    color: "#444"
  }

});