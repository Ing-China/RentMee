import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeMode } from "@/theme/config";
import { t } from "@lingui/core/macro";

export default function AppearanceScreen() {
  const { theme, changeTheme, colors } = useTheme();

  const themeOptions = [
    {
      id: "system" as ThemeMode,
      title: t`System`,
      subtitle: t`Use device setting`,
      icon: "gear" as const,
    },
    {
      id: "light" as ThemeMode,
      title: t`Light`,
      subtitle: t`Light appearance`,
      icon: "sun.max.fill" as const,
    },
    {
      id: "dark" as ThemeMode,
      title: t`Dark`,
      subtitle: t`Dark appearance`,
      icon: "moon.fill" as const,
    },
  ];

  const handleThemeSelect = (newTheme: ThemeMode) => {
    changeTheme(newTheme);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {t`Theme`}
        </ThemedText>

        {themeOptions.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.themeOption,
              { borderColor: colors.icon + "20" },
              index === themeOptions.length - 1 && { borderBottomWidth: 0 },
            ]}
            onPress={() => handleThemeSelect(option.id)}
          >
            <ThemedView style={styles.optionContent}>
              <ThemedView
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.icon + "20" },
                ]}
              >
                <IconSymbol name={option.icon} size={20} color={colors.tint} />
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
              {theme === option.id && (
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
  themeOption: {
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
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
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
