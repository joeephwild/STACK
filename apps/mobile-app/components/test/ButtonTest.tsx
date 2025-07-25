import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@stack/ui-library';

export function ButtonTest() {
  return (
    <View style={{ padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Button Test Component</Text>

      <View style={{ gap: 10 }}>
        <Button
          title="Primary Button"
          onPress={() => console.log('Primary button pressed')}
          variant="primary"
          size="large"
        />

        <Button
          title="Accent Button"
          onPress={() => console.log('Accent button pressed')}
          variant="accent"
          size="medium"
        />

        <Button
          title="Tertiary Button"
          onPress={() => console.log('Tertiary button pressed')}
          variant="tertiary"
          size="small"
        />

        <Button
          title="Loading Button"
          onPress={() => console.log('Loading button pressed')}
          variant="primary"
          size="large"
          loading={true}
        />
      </View>
    </View>
  );
}