import { useState } from "react";
import { ScrollView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type ThemeOption = "system" | "light" | "dark";

export default function AppearanceScreen() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>("system");

  const themeOptions = [
    {
      id: "system" as ThemeOption,
      title: "System",
      subtitle: "Use device setting",
      icon: "gear",
    },
    {
      id: "light" as ThemeOption,
      title: "Light",
      subtitle: "Light appearance",
      icon: "sun.max.fill",
    },
    {
      id: "dark" as ThemeOption,
      title: "Dark",
      subtitle: "Dark appearance",
      icon: "moon.fill",
    },
  ];

  const handleThemeSelect = (theme: ThemeOption) => {
    setSelectedTheme(theme);
    // Here you would typically save to storage and apply the theme
    console.log("Selected theme:", theme);
  };

  return (
    <ScrollView className="flex-1">
      {/* <ThemedView className="px-5 pt-6">
        <ThemedText type="subtitle" className="mb-4 text-gray-600">
          Theme
        </ThemedText>

        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            className="flex-row items-center justify-between py-4 px-4 bg-white rounded-xl mb-3 shadow-sm"
            onPress={() => handleThemeSelect(option.id)}
          >
            <ThemedView className="flex-row items-center flex-1">
              <ThemedView
                className="w-10 h-10 rounded-lg items-center justify-center mr-4"
                style={{ backgroundColor: "#bae6fd" }}
              >
                <IconSymbol
                  name={option.icon as any}
                  size={22}
                  color="#0ea5e9"
                />
              </ThemedView>
              <ThemedView className="flex-1">
                <ThemedText type="defaultSemiBold">{option.title}</ThemedText>
                <ThemedText className="text-sm opacity-60 mt-0.5">
                  {option.subtitle}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView className="w-6 h-6 rounded-full border-2 border-primary-500 items-center justify-center">
              {selectedTheme === option.id && (
                <ThemedView
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#0ea5e9" }}
                />
              )}
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView> */}

      <ThemedView className="m-4 rounded-xl">
        <ThemedText type="subtitle" className="m-4 bg-red">
          Account
        </ThemedText>

        {/* 
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
        /> */}
      </ThemedView>
    </ScrollView>
  );
}
