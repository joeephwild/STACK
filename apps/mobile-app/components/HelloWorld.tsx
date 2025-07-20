import React from 'react';
import { View, Text } from 'react-native';

interface HelloWorldProps {
  message?: string;
}

export const HelloWorld = ({ message = 'Hello World!' }: HelloWorldProps) => {
  return (
    <View testID="hello-world-container">
      <Text testID="hello-world-text">{message}</Text>
    </View>
  );
};