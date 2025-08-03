import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function PropertiesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Properties</ThemedText>
      <ThemedText>Manage your rental properties here.</ThemedText>
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