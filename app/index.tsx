import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function IndexPage() {
  const { isAuthenticated } = useAuth();

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/dashboard" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
