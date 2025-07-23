import { Stack } from 'expo-router';
import { View, ScrollView, Text } from 'react-native';
import { UserProfile } from '~/components/UserProfile';
import { Typography, Heading1, Heading2, BodyText, Label, Caption } from '~/components/Typography';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Dashboard' }} />
      <ScrollView className="flex-1 bg-background-main">
        <View className="p-6">
          {/* Header Section */}
          <View className="mb-8">
            <Heading1 className="text-primary mb-2">
              Welcome to STACK 🚀
            </Heading1>
            <BodyText className="text-text-secondary">
              Your Web3-native financial platform for smart investing
            </BodyText>
          </View>

          {/* Design System Typography Showcase */}
          <View className="bg-surface-card rounded-3xl p-6 mb-6">
            <Heading2 className="text-text-primary mb-4">
              Design System Typography
            </Heading2>
            
            <View className="space-y-4">
              {/* H1 Example */}
              <View>
                <Label className="text-text-tertiary mb-1">H1 - MD Nichrome Bold, 36px</Label>
                <Typography variant="h1" className="text-text-primary">
                  Main Heading
                </Typography>
              </View>

              {/* H2 Example */}
              <View>
                <Label className="text-text-tertiary mb-1">H2 - MD Nichrome Bold, 24px</Label>
                <Typography variant="h2" className="text-text-primary">
                  Section Heading
                </Typography>
              </View>

              {/* Body Example */}
              <View>
                <Label className="text-text-tertiary mb-1">Body - Gilroy Regular, 16px</Label>
                <Typography variant="body" className="text-text-secondary">
                  This is body text using Gilroy font. It's designed for readability and consistency across the app. Perfect for longer content and descriptions.
                </Typography>
              </View>

              {/* Label Example */}
              <View>
                <Label className="text-text-tertiary mb-1">Label - Gilroy Medium, 14px</Label>
                <Typography variant="label" className="text-text-primary">
                  Form Label or UI Element
                </Typography>
              </View>

              {/* Caption Example */}
              <View>
                <Label className="text-text-tertiary mb-1">Caption - Gilroy Regular, 12px</Label>
                <Typography variant="caption" className="text-text-tertiary">
                  Small caption text for additional information
                </Typography>
              </View>
            </View>
          </View>

          {/* Tailwind Classes Showcase */}
          <View className="bg-surface-light rounded-3xl p-6 mb-6">
            <Heading2 className="text-text-primary mb-4">
              Tailwind CSS Classes
            </Heading2>
            
            <View className="space-y-3">
              <View>
                <Label className="text-text-tertiary mb-1">font-h1 text-h1</Label>
                <Text className="font-h1 text-h1 text-primary">
                  Design System H1
                </Text>
              </View>
              
              <View>
                <Label className="text-text-tertiary mb-1">font-h2 text-h2</Label>
                <Text className="font-h2 text-h2 text-text-primary">
                  Design System H2
                </Text>
              </View>
              
              <View>
                <Label className="text-text-tertiary mb-1">font-body text-body</Label>
                <Text className="font-body text-body text-text-secondary">
                  Design System Body Text
                </Text>
              </View>
              
              <View>
                <Label className="text-text-tertiary mb-1">font-label text-label</Label>
                <Text className="font-label text-label text-text-primary">
                  Design System Label
                </Text>
              </View>
              
              <View>
                <Label className="text-text-tertiary mb-1">font-caption text-caption</Label>
                <Text className="font-caption text-caption text-text-tertiary">
                  Design System Caption
                </Text>
              </View>
            </View>
          </View>

          {/* Color Palette Showcase */}
          <View className="bg-surface-card rounded-3xl p-6 mb-6">
            <Heading2 className="text-text-primary mb-4">
              Color Palette
            </Heading2>
            
            <View className="space-y-4">
              {/* Brand Colors */}
              <View>
                <Label className="text-text-tertiary mb-2">Brand Colors</Label>
                <BodyText className="text-primary mb-1">Primary Brand Color (#5852FF)</BodyText>
                <BodyText className="text-accent">Accent Color (#B9FF4B)</BodyText>
              </View>

              {/* Text Colors */}
              <View>
                <Label className="text-text-tertiary mb-2">Text Colors</Label>
                <BodyText className="text-text-primary mb-1">Primary Text (#000000)</BodyText>
                <BodyText className="text-text-secondary mb-1">Secondary Text (#545454)</BodyText>
                <BodyText className="text-text-tertiary">Tertiary Text (#A0A0A0)</BodyText>
              </View>

              {/* Semantic Colors */}
              <View>
                <Label className="text-text-tertiary mb-2">Semantic Colors</Label>
                <BodyText className="text-semantic-success mb-1">Success Message</BodyText>
                <BodyText className="text-semantic-danger mb-1">Error Message</BodyText>
                <BodyText className="text-semantic-warning">Warning Message</BodyText>
              </View>
            </View>
          </View>

          {/* Investment Portfolio Mock */}
          <View className="bg-surface-card rounded-3xl p-6 mb-6">
            <Heading2 className="text-text-primary mb-4">
              Portfolio Overview
            </Heading2>
            
            <View className="space-y-4">
              <View>
                <Label className="text-text-tertiary mb-1">Total Portfolio Value</Label>
                <Typography variant="h1" className="text-primary">
                  $12,345.67
                </Typography>
                <Caption className="text-semantic-success">
                  +$234.56 (+1.94%) today
                </Caption>
              </View>

              <View className="flex-row justify-between">
                <View className="flex-1 mr-4">
                  <Label className="text-text-tertiary mb-1">Available Cash</Label>
                  <BodyText className="text-text-primary">$1,234.56</BodyText>
                </View>
                <View className="flex-1">
                  <Label className="text-text-tertiary mb-1">Total Invested</Label>
                  <BodyText className="text-text-primary">$11,111.11</BodyText>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons Demo */}
          <View className="bg-surface-light rounded-3xl p-6 mb-6">
            <Heading2 className="text-text-primary mb-4">
              Action Buttons
            </Heading2>
            
            <View className="space-y-3">
              <View className="bg-primary rounded-xl p-4">
                <Label className="text-text-on-primary text-center">
                  Primary Action Button
                </Label>
              </View>
              
              <View className="bg-accent rounded-xl p-4">
                <Label className="text-text-on-accent text-center">
                  Accent Action Button
                </Label>
              </View>
              
              <View className="border border-primary rounded-xl p-4">
                <Label className="text-primary text-center">
                  Secondary Action Button
                </Label>
              </View>
            </View>
          </View>

          {/* User Profile Section */}
          <View className="mb-6">
            <Heading2 className="text-text-primary mb-4">
              Your Profile
            </Heading2>
            <UserProfile />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
