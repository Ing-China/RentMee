import { t } from "@lingui/core/macro";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedAlert } from "@/components/ui/ThemedAlert";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedTextInput } from "@/components/ui/ThemedTextInput";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useThemedAlert } from "@/hooks/useThemedAlert";

export default function LoginScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const { alertConfig, showAlert, hideAlert } = useThemedAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      newErrors.email = t`Email is required`;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t`Please enter a valid email`;
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = t`Password is required`;
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = t`Password must be at least 6 characters`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({ email: "", password: "" }); // Clear previous errors

    try {
      const result = await login({
        email: email.trim(),
        password: password.trim(),
        device_name: "RentMee Mobile App",
      });

      if (result.success) {
        // Don't manually navigate - let the auth guard handle it
        // The _layout.tsx will automatically redirect when isAuthenticated becomes true
      } else {
        if (result.error === "Invalid credentials") {
          showAlert(
            t`Login Failed`,
            t`Please check your credentials and try again.`
          );
        } else {
          showAlert(
            t`Error`,
            t`An unexpected error occurred. Please try again.`
          );
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlert(t`Error`, t`An unexpected error occurred. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const telegramUrl = "https://t.me/Ing_China";
      const canOpen = await Linking.canOpenURL(telegramUrl);

      if (canOpen) {
        await Linking.openURL(telegramUrl);
      } else {
        showAlert(
          t`Unable to Open`,
          t`Cannot open Telegram. Please contact @Ing_China manually.`
        );
      }
    } catch (error) {
      showAlert(t`Error`, t`Unable to open Telegram. Please try again.`);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: insets.top + 20,
              paddingBottom: insets.bottom + 20,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <ThemedText type="title" style={styles.title}>
              {t`Welcome Back`}
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
              {t`Sign in to your account to continue`}
            </ThemedText>
          </View>

          <ThemedTextInput
            label={t`Email`}
            icon="envelope.fill"
            value={email}
            onChangeText={setEmail}
            placeholder={errors.email || t`Enter your email`}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
          />

          <ThemedTextInput
            label={t`Password`}
            icon="lock.fill"
            value={password}
            onChangeText={setPassword}
            placeholder={errors.password || t`Enter your password`}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            error={errors.password}
          />

          <ThemedButton
            title={t`Sign In`}
            onPress={handleLogin}
            loading={loading}
            style={styles.signInButton}
          />

          <ThemedButton
            title={t`Don't have an account? Register`}
            variant="outline"
            onPress={handleRegister}
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
    paddingHorizontal: 16,
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
  },
  signInButton: {
    marginTop: 8,
    marginBottom: 16,
  },
});
