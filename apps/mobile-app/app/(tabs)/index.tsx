import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { UserProfile } from '~/components/UserProfile';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <ScrollView style={styles.container}>
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Your Profile
          </Text>
          <Text className="text-gray-600">
            Manage your account and wallet information
          </Text>
        </View>
        
        <UserProfile />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f9fafb',
  },
});
