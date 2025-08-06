import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { SettingItem } from "@/components/SettingItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView style={styles.scrollView}>
        <ThemedView
          style={[styles.profileSection, { paddingTop: insets.top + 20 }]}
        >
          <ThemedView style={styles.profileContent}>
            <Image
              source="https://i.pinimg.com/736x/92/26/d7/9226d738bb7e00aa1bff0b73b786ae00.jpg"
              style={styles.profileImage}
              contentFit="cover"
            />
            <ThemedText type="title" style={styles.profileName}>
              Ing China
            </ThemedText>
            <ThemedText
              style={[styles.profileEmail, { color: colors.text + "B3" }]}
            >
              ing.china@email.com
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Account
          </ThemedText>

          <SettingItem
            icon="person.circle.fill"
            title="Profile"
            subtitle="Manage your personal information"
            onPress={() => console.log("Profile pressed")}
          />

          <SettingItem
            icon="creditcard.fill"
            title="Billing & Subscriptions"
            subtitle="Manage payment methods and plans"
            onPress={() => console.log("Billing pressed")}
            isLast
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Preferences
          </ThemedText>

          <SettingItem
            icon="bell.fill"
            title="Notifications"
            subtitle="Push notifications and alerts"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{
                  false: "#E5E7EB",
                  true: colors.tint,
                }}
                thumbColor={notifications ? "#fff" : "#f4f3f4"}
              />
            }
            showArrow={false}
          />

          <SettingItem
            icon="moon.fill"
            title="Appearance"
            subtitle="Dark mode, theme settings"
            onPress={() => router.push("/settings/appearance")}
          />

          <SettingItem
            icon="globe"
            title="Language"
            subtitle="App display language"
            onPress={() => router.push("/settings/language")}
            isLast
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Data & Privacy
          </ThemedText>

          <SettingItem
            icon="lock.fill"
            title="Privacy Settings"
            subtitle="Control data sharing and privacy"
            onPress={() => console.log("Privacy pressed")}
          />

          <SettingItem
            icon="arrow.down.doc.fill"
            title="Export Data"
            subtitle="Download your rental data"
            onPress={() => console.log("Export pressed")}
          />

          <SettingItem
            icon="trash.fill"
            title="Delete Account"
            subtitle="Permanently delete your account"
            onPress={() => console.log("Delete pressed")}
            isLast
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Support
          </ThemedText>

          <SettingItem
            icon="questionmark.circle.fill"
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => console.log("Help pressed")}
          />

          <SettingItem
            icon="star.fill"
            title="Rate App"
            subtitle="Rate us on the App Store"
            onPress={() => console.log("Rate pressed")}
          />

          <SettingItem
            icon="info.circle.fill"
            title="About"
            subtitle="App version and legal info"
            onPress={() => console.log("About pressed")}
            isLast
          />
        </ThemedView>

        <ThemedView style={styles.signOutSection}>
          <TouchableOpacity
            style={[styles.signOutButton, { borderColor: "#ff3b30" }]}
            onPress={() => console.log("Signed out")}
          >
            <IconSymbol name="power" size={20} color="#ff3b30" />
            <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.versionSection}>
          <ThemedText
            style={[styles.versionText, { color: colors.text + "80" }]}
          >
            RentMe v1.0.0
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  profileContent: {
    alignItems: "center",
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 12,
  },
  profileName: {
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  section: {
    marginHorizontal: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  sectionTitle: {
    margin: 16,
  },
  signOutSection: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 12,
    gap: 10,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff3b30",
  },
  versionSection: {
    alignItems: "center",
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 12,
  },
});
