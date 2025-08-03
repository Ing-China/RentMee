import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Switch, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { SettingItem } from "@/components/SettingItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <SafeAreaView className="flex-1" edges={["left", "right"]}>
      <ScrollView className="flex-1">
        <ThemedView
          className="px-5 pb-5 items-center"
          style={{ paddingTop: insets.top + 20 }}
        >
          <ThemedView className="items-center">
            <Image
              source="https://i.pinimg.com/736x/92/26/d7/9226d738bb7e00aa1bff0b73b786ae00.jpg"
              style={{
                width: 128,
                height: 128,
                borderRadius: 64,
                marginBottom: 12,
              }}
              contentFit="cover"
            />
            <ThemedText type="title" className="mb-1">
              Ing China
            </ThemedText>
            <ThemedText className="text-sm opacity-70">
              ing.china@email.com
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView className="mx-4 rounded-xl my-8">
          <ThemedText type="subtitle" className="m-4 bg-red">
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
          />
        </ThemedView>

        <ThemedView className="mx-4 rounded-xl mb-8">
          <ThemedText type="subtitle" className="m-4 bg-red">
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
                  true: "#0ea5e9",
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
            icon="icloud.fill"
            title="Auto Backup"
            subtitle="Automatically backup data"
            rightElement={
              <Switch
                value={autoBackup}
                onValueChange={setAutoBackup}
                trackColor={{
                  false: "#E5E7EB",
                  true: "#0ea5e9",
                }}
                thumbColor={autoBackup ? "#fff" : "#f4f3f4"}
              />
            }
            showArrow={false}
          />
        </ThemedView>

        <ThemedView className="mx-4 rounded-xl mb-8">
          <ThemedText type="subtitle" className="m-4 bg-red">
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
          />
        </ThemedView>

        <ThemedView className="mx-4 rounded-xl mb-8">
          <ThemedText type="subtitle" className="m-4 bg-red">
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
          />
        </ThemedView>

        <ThemedView className="mx-4 mb-8 rounded-xl">
          <TouchableOpacity
            className="flex-row items-center justify-center py-4 border rounded-xl gap-2.5"
            style={{ borderColor: "#ff3b30" }}
            onPress={() => console.log("Signed out")}
          >
            <IconSymbol name="power" size={20} color="#ff3b30" />
            <ThemedText
              className="text-base font-semibold"
              style={{ color: "#ff3b30" }}
            >
              Sign Out
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView className="items-center py-4">
          <ThemedText className="text-xs opacity-50">RentMe v1.0.0</ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
