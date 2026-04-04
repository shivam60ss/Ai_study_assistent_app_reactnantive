import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ArrowLeft, User, FileText, Clock, Trophy, LogOut, Settings, Bell, HelpCircle } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {

  const router = useRouter();

  const stats = [
    { icon: FileText, label: "Notes Created", value: "42" },
    { icon: Clock, label: "Study Hours", value: "87" },
    { icon: Trophy, label: "Quizzes Passed", value: "28" },
  ];

  const menuItems = [
    { icon: Settings, label: "Settings" },
    { icon: Bell, label: "Notifications" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (

    <ScrollView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.push("/dashboard")}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

      </View>

      {/* Profile Card */}

      <View style={styles.profileCard}>

        <View style={styles.avatar}>
          <User size={40} color="white" />
        </View>

        <Text style={styles.name}>Shivam</Text>
        <Text style={styles.email}>shivam@example.com</Text>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>

      </View>

      {/* Stats */}

      <Text style={styles.sectionTitle}>Study Statistics</Text>

      <View style={styles.statsRow}>

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (

            <View key={index} style={styles.statCard}>

              <Icon size={22} color="#4F46E5" />

              <Text style={styles.statValue}>{item.value}</Text>

              <Text style={styles.statLabel}>{item.label}</Text>

            </View>

          );

        })}

      </View>

      {/* Achievements */}

      <Text style={styles.sectionTitle}>Recent Achievements</Text>

      <View style={styles.card}>

        <View style={styles.row}>

          <Trophy size={22} color="#EAB308" />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.bold}>Quiz Master</Text>
            <Text style={styles.small}>Completed 25 quizzes</Text>
          </View>

        </View>

        <View style={styles.divider} />

        <View style={styles.row}>

          <FileText size={22} color="#8B5CF6" />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.bold}>Note Taker</Text>
            <Text style={styles.small}>Created 40 notes</Text>
          </View>

        </View>

        <View style={styles.divider} />

        <View style={styles.row}>

          <Clock size={22} color="#22C55E" />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.bold}>Study Streak</Text>
            <Text style={styles.small}>7 day streak</Text>
          </View>

        </View>

      </View>

      {/* Menu */}

      <View style={styles.card}>

        {menuItems.map((item, index) => {

          const Icon = item.icon;

          return (

            <TouchableOpacity key={index} style={styles.menuItem}>

              <Icon size={22} color="#555" />

              <Text style={styles.menuText}>{item.label}</Text>

            </TouchableOpacity>

          );

        })}

      </View>

      {/* Logout */}

      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.replace("/login")}
      >

        <LogOut size={20} color="white" />

        <Text style={styles.logoutText}>Logout</Text>

      </TouchableOpacity>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },

  header: {
    backgroundColor: "#4F46E5",
    padding: 20,
    flexDirection: "row",
    alignItems: "center"
  },

  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10
  },

  profileCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: "center"
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },

  name: {
    fontSize: 20,
    fontWeight: "bold"
  },

  email: {
    color: "#666",
    marginBottom: 10
  },

  editBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8
  },

  editText: {
    color: "white"
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20
  },

  statCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 100
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold"
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center"
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10
  },

  bold: {
    fontWeight: "bold"
  },

  small: {
    fontSize: 12,
    color: "#666"
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12
  },

  menuText: {
    marginLeft: 10,
    fontSize: 15
  },

  logout: {
    backgroundColor: "#EF4444",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10
  }

});