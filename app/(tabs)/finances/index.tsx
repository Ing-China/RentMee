import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function FinancesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Finances</ThemedText>
      <ThemedText>Track your rental income and expenses here.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});