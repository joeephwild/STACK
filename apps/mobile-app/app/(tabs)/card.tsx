import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card</Text>
      <Text style={styles.subtitle}>Manage your virtual debit card and transactions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'MD Nichrome',
  },
  subtitle: {
    fontSize: 16,
    color: '#545454',
    textAlign: 'center',
    fontFamily: 'Gilroy',
  },
});