import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedAlert } from "@/components/ui/ThemedAlert";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedTextInput } from "@/components/ui/ThemedTextInput";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useThemedAlert } from "@/hooks/useThemedAlert";
import { t } from "@lingui/core/macro";

export default function ChangePasswordScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { changePassword } = useAuth();
  const { alertConfig, showAlert, hideAlert } = useThemedAlert();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!currentPassword.trim()) {
      newErrors.currentPassword = t`Current password is required`;
      isValid = false;
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = t`New password is required`;
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = t`Password must be at least 8 characters long`;
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = t`Please confirm your password`;
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t`Passwords do not match`;
      isValid = false;
    }

    if (newPassword === currentPassword) {
      newErrors.newPassword = t`New password must be different from current password`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    try {
      await changePassword(currentPassword, newPassword);
      showAlert(t`Success`, t`Password changed successfully`, [
        { text: t`OK`, onPress: () => router.back() },
      ]);
    } catch (error) {
      showAlert(
        t`Error`,
        t`Failed to change password. Please check your current password and try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedTextInput
            label={t`Current Password`}
            icon="lock.fill"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder={
              errors.currentPassword || t`Enter your current password`
            }
            secureTextEntry
            autoCapitalize="none"
            autoComplete="current-password"
            error={errors.currentPassword}
          />

          <ThemedTextInput
            label={t`New Password`}
            icon="lock.fill"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder={errors.newPassword || t`Enter your new password`}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="new-password"
            error={errors.newPassword}
          />

          <ThemedTextInput
            label={t`Confirm New Password`}
            icon="lock.fill"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={errors.confirmPassword || t`Confirm your new password`}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="new-password"
            error={errors.confirmPassword}
          />

          <ThemedButton
            title={t`Change Password`}
            onPress={handleChangePassword}
            loading={loading}
            style={styles.changeButton}
            variant="primary"
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <ThemedAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        onDismiss={hideAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  changeButton: {
    marginTop: 8,
  },
});
