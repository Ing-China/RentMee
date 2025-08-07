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
import { getFontForText } from "@/lib/textUtils";
import { Trans } from "@lingui/macro";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const userName = "Monkey D. Luffy";
  const userEmail = "luffy2004@email.com";

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
            <ThemedText
              type="title"
              style={[
                styles.profileName,
                { fontFamily: getFontForText(userName, "semiBold") },
              ]}
            >
              {userName}
            </ThemedText>
            <ThemedText
              style={[
                styles.profileEmail,
                { color: colors.text + "B3" },
                { fontFamily: getFontForText(userEmail, "regular") },
              ]}
            >
              {userEmail}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            <Trans>Account</Trans>
          </ThemedText>

          <SettingItem
            icon="person.circle.fill"
            title={<Trans>Profile</Trans>}
            subtitle={<Trans>Manage your personal information</Trans>}
            onPress={() => console.log("Profile pressed")}
          />

          <SettingItem
            icon="creditcard.fill"
            title={<Trans>Billing & Subscriptions</Trans>}
            subtitle={<Trans>Manage payment methods and plans</Trans>}
            onPress={() => console.log("Billing pressed")}
            isLast
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            <Trans>Preferences</Trans>
          </ThemedText>

          <SettingItem
            icon="bell.fill"
            title={<Trans>Notifications</Trans>}
            subtitle={<Trans>Push notifications and alerts</Trans>}
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{
                  false: colors.icon,
                  true: colors.tint,
                }}
                thumbColor={notifications ? "#fff" : "#f4f3f4"}
              />
            }
            showArrow={false}
          />

          <SettingItem
            icon="moon.fill"
            title={<Trans>Appearance</Trans>}
            subtitle={<Trans>Dark mode, theme settings</Trans>}
            onPress={() => router.push("/settings/appearance")}
          />

          <SettingItem
            icon="globe"
            title={<Trans>Language</Trans>}
            subtitle={<Trans>App display language</Trans>}
            onPress={() => router.push("/settings/language")}
            isLast
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            <Trans>Data & Privacy</Trans>
          </ThemedText>

          <SettingItem
            icon="lock.fill"
            title={<Trans>Privacy Settings</Trans>}
            subtitle={<Trans>Control data sharing and privacy</Trans>}
            onPress={() => console.log("Privacy pressed")}
          />

          <SettingItem
            icon="arrow.down.doc.fill"
            title={<Trans>Export Data</Trans>}
            subtitle={<Trans>Download your rental data</Trans>}
            onPress={() => console.log("Export pressed")}
          />

          <SettingItem
            icon="trash.fill"
            title={<Trans>Delete Account</Trans>}
            subtitle={<Trans>Permanently delete your account</Trans>}
            onPress={() => console.log("Delete pressed")}
            isLast
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            <Trans>Support</Trans>
          </ThemedText>

          <SettingItem
            icon="questionmark.circle.fill"
            title={<Trans>Help & Support</Trans>}
            subtitle={<Trans>Get help and contact support</Trans>}
            onPress={() => console.log("Help pressed")}
          />

          <SettingItem
            icon="star.fill"
            title={<Trans>Rate App</Trans>}
            subtitle={<Trans>Rate us on the App Store</Trans>}
            onPress={() => console.log("Rate pressed")}
          />

          <SettingItem
            icon="info.circle.fill"
            title={<Trans>About</Trans>}
            subtitle={<Trans>App version and legal info</Trans>}
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
            <ThemedText style={styles.signOutText}>
              <Trans>Sign Out</Trans>
            </ThemedText>
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
    paddingHorizontal: 25,
    paddingBottom: 25,
    alignItems: "center",
  },
  profileContent: {
    alignItems: "center",
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 16,
  },
  profileName: {
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  section: {
    marginHorizontal: 16,
    borderRadius: 16,
    marginVertical: 16,
  },
  sectionTitle: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  signOutSection: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 16,
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
    marginTop: 16,
  },
  versionText: {
    fontSize: 12,
  },
});
