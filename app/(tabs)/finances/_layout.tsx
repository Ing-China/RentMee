import { Stack } from "expo-router";

export default function FinancesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false // Hide header for main tab screen
        }} 
      />
    </Stack>
  );
}