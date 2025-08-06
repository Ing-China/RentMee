import { View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabBarBackground() {
  const { colors } = useTheme();
  return <View style={{ flex: 1, backgroundColor: colors.background }} />;
}

export function useBottomTabOverflow() {
  return 0;
}
