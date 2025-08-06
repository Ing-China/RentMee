import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LocalizCode } from "@/i18n/config";
import { t } from "@lingui/core/macro";

type LanguageOption = LocalizCode;

export default function LanguageScreen() {
  const { colors } = useTheme();
  const { locale, changeLocale } = useI18n();

  const languageOptions = [
    {
      id: "en" as LanguageOption,
      title: t`English`,
      subtitle: t`English (US)`,
      flag: "🇺🇸",
    },
    {
      id: "km" as LanguageOption,
      title: t`Khmer`,
      subtitle: t`Khmer (Cambodia)`,
      flag: "🇰🇭",
    },
  ];

  const handleLanguageSelect = (newLanguage: LanguageOption) => {
    changeLocale(newLanguage);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {t`Language`}
        </ThemedText>

        {languageOptions.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.languageOption,
              { borderColor: colors.icon + "20" },
              index === languageOptions.length - 1 && { borderBottomWidth: 0 },
            ]}
            onPress={() => handleLanguageSelect(option.id)}
          >
            <ThemedView style={styles.optionContent}>
              <ThemedView
                style={[
                  styles.flagContainer,
                  { backgroundColor: colors.icon + "20" },
                ]}
              >
                <ThemedText style={styles.flag}>{option.flag}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.textContainer}>
                <ThemedText type="defaultSemiBold">{option.title}</ThemedText>
                <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
                  {option.subtitle}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView
              style={[styles.radioButton, { borderColor: colors.tint }]}
            >
              {locale === option.id && (
                <ThemedView
                  style={[
                    styles.radioButtonInner,
                    { backgroundColor: colors.tint },
                  ]}
                />
              )}
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    margin: 15,
    borderRadius: 15,
  },
  sectionTitle: {
    padding: 15,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderBottomWidth: 1,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flagContainer: {
    width: 35,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  flag: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
