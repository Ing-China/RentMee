import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { SettingItem } from "@/components/SettingItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Trans } from "@lingui/macro";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            <Trans>Profile Management</Trans>
          </ThemedText>

          <SettingItem
            icon="person.crop.circle.fill"
            title={<Trans>Edit Profile</Trans>}
            subtitle={<Trans>Update your personal information</Trans>}
            onPress={() => router.push("/settings-stack/edit-profile")}
          />

          <SettingItem
            icon="lock.fill"
            title={<Trans>Change Password</Trans>}
            subtitle={<Trans>Update your account password</Trans>}
            onPress={() => router.push("/settings-stack/change-password")}
            isLast
          />
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
});
