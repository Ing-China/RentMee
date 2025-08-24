import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { SettingItem } from "@/components/SettingItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedAlert } from "@/components/ui/ThemedAlert";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useThemedAlert } from "@/hooks/useThemedAlert";
import { getFontForText } from "@/lib/textUtils";
import { Trans, t } from "@lingui/macro";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { logout, user } = useAuth();
  const { alertConfig, showAlert, hideAlert } = useThemedAlert();
  const [notifications, setNotifications] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = () => {
    showAlert(t`Sign Out`, t`Are you sure you want to sign out?`, [
      {
        text: t`Cancel`,
        style: "cancel",
      },
      {
        text: t`Sign Out`,
        style: "destructive",
        onPress: async () => {
          setLogoutLoading(true);
          try {
            await logout();
            // Navigation will be handled automatically by the app's auth flow
          } catch (error) {
            console.error("Logout failed:", error);
          } finally {
            setLogoutLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView
          style={[styles.profileSection, { paddingTop: insets.top + 20 }]}
        >
          <ThemedView style={styles.profileContent}>
            <Image
              source={user?.image_url || require("@/assets/images/icon.png")}
              style={styles.profileImage}
              contentFit="cover"
            />
            <ThemedText
              type="title"
              style={[
                styles.profileName,
                {
                  fontFamily: getFontForText(user?.name || "User", "semiBold"),
                },
              ]}
            >
              {user?.name || "User"}
            </ThemedText>
            <ThemedText
              style={[
                styles.profileEmail,
                { color: colors.text + "B3" },
                { fontFamily: getFontForText(user?.email || "", "regular") },
              ]}
            >
              {user?.email}
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
            onPress={() => router.push("/settings-stack/profile")}
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
            onPress={() => router.push("/settings-stack/appearance")}
          />

          <SettingItem
            icon="globe"
            title={<Trans>Language</Trans>}
            subtitle={<Trans>App display language</Trans>}
            onPress={() => router.push("/settings-stack/language")}
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
          <ThemedButton
            title={t`Sign Out`}
            variant="destructive"
            icon="power"
            onPress={handleLogout}
            loading={logoutLoading}
          />
        </ThemedView>

        <ThemedView style={styles.versionSection}>
          <ThemedText
            style={[styles.versionText, { color: colors.text + "80" }]}
          >
            RentMe v1.0.0
          </ThemedText>
        </ThemedView>
      </ScrollView>

      <ThemedAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        onDismiss={hideAlert}
      />
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
  userType: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
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
  versionSection: {
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 16,
  },
  versionText: {
    fontSize: 12,
  },
});
