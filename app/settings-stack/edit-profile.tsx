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

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, updateProfile } = useAuth();
  const { alertConfig, showAlert, hideAlert } = useThemedAlert();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    let isValid = true;

    if (!firstName.trim()) {
      newErrors.firstName = t`First name is required`;
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = t`Last name is required`;
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = t`Email is required`;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t`Please enter a valid email`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

    try {
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      showAlert(t`Success`, t`Profile updated successfully`, [
        { text: t`OK`, onPress: () => router.back() },
      ]);
    } catch (error) {
      showAlert(t`Error`, t`Failed to update profile. Please try again.`);
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
            label={t`First Name`}
            icon="person.fill"
            value={firstName}
            onChangeText={setFirstName}
            placeholder={errors.firstName || t`Enter your first name`}
            autoCapitalize="words"
            autoComplete="given-name"
            error={errors.firstName}
          />

          <ThemedTextInput
            label={t`Last Name`}
            icon="person.fill"
            value={lastName}
            onChangeText={setLastName}
            placeholder={errors.lastName || t`Enter your last name`}
            autoCapitalize="words"
            autoComplete="family-name"
            error={errors.lastName}
          />

          <ThemedTextInput
            label={t`Email`}
            icon="envelope.fill"
            value={email}
            onChangeText={setEmail}
            placeholder={errors.email || t`Enter your email address`}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
          />

          <ThemedTextInput
            label={t`Phone Number`}
            icon="phone.fill"
            value={phone}
            onChangeText={setPhone}
            placeholder={errors.phone || t`Enter your phone number`}
            keyboardType="phone-pad"
            autoComplete="tel"
            error={errors.phone}
          />

          <ThemedButton
            title={t`Save Changes`}
            onPress={handleSave}
            loading={loading}
            style={styles.saveButton}
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
  saveButton: {
    marginTop: 8,
  },
});
