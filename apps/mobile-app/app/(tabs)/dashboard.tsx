import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import { Card, Button, Icon, BalanceCard, SpendableBalance } from '@stack/ui-library';

interface FeedItem {
  id: string;
  type: 'investment' | 'quest' | 'tip';
  title: string;
  description: string;
  actionText: string;
  icon?: string;
}

export default function DashboardScreen() {
  const navigation = useNavigation();
  // Mock data for placeholder content
  const portfolioValue = 1245989.56;
  const dailyChange = 12.34;
  const dailyChangePercent = 1.2;
  const isPositiveChange = dailyChange >= 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Text className="pl-[12px] font-h1 text-[38px] font-bold text-white">Dashboard</Text>
      ),
    });
  }, [navigation]);

  const mockFeedItems: FeedItem[] = [
    {
      id: '1',
      type: 'investment',
      title: 'New Basket Available: Tech Innovators',
      description: 'Discover cutting-edge technology companies with high growth potential.',
      actionText: 'Explore Basket',
      icon: 'trending-up',
    },
    {
      id: '2',
      type: 'quest',
      title: 'Complete Your First Quest: Set Up Round-ups',
      description: 'Start investing spare change automatically with every purchase.',
      actionText: 'Start Quest',
      icon: 'target',
    },
    {
      id: '3',
      type: 'tip',
      title: 'AI Tip: Market Update on Your Holdings',
      description: 'Your tech stocks are performing well this week. Consider diversifying.',
      actionText: 'Learn More',
      icon: 'lightbulb',
    },
  ];

  const handlePortfolioPress = () => {
    router.push('/portfolio');
  };

  const handleFeedItemPress = (item: FeedItem) => {
    // Future implementation will handle different item types
    console.log('Feed item pressed:', item.title);
  };

  const renderFeedItem = (item: FeedItem) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleFeedItemPress(item)}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}. ${item.description}`}
      accessibilityHint={`Tap to ${item.actionText.toLowerCase()}`}>
      <Card className="mb-4 bg-white p-4">
        <View className="flex-row items-start">
          {item.icon && (
            <View className="mr-3 mt-1">
              <Icon name={item.icon} size={20} color="#5852FF" accessibilityLabel="" />
            </View>
          )}
          <View className="flex-1">
            <Text
              className="mb-2 text-lg font-bold text-black"
              style={{ fontFamily: 'MD Nichrome' }}
              accessibilityRole="header">
              {item.title}
            </Text>
            <Text className="mb-3 text-base text-gray-600" style={{ fontFamily: 'Gilroy' }}>
              {item.description}
            </Text>
            <View className="flex-row justify-end">
              <Text className="text-sm font-medium text-blue-600" style={{ fontFamily: 'Gilroy' }}>
                {item.actionText}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Dashboard screen content">
        {/* Portfolio Summary Section */}
        <View className="h-[45%] gap-y-[16px] bg-primary px-[14px] pt-[24px]">
          <BalanceCard
            className="h-auto"
            balance={portfolioValue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
            onTopUpPress={handlePortfolioPress}
          />
        </View>

        {/* Feed Items Section */}
        <View className="px-6">
          <Text
            className="mb-4 mt-[24px] font-h1 text-[34px] font-bold text-black"
            accessibilityRole="header">
            For You
          </Text>

          <View accessibilityLabel="Personalized feed items">
            {mockFeedItems.map(renderFeedItem)}
          </View>

          {/* Load More Indicator */}
          <View className="mt-4 items-center">
            <TouchableOpacity
              className="px-6 py-3"
              accessibilityRole="button"
              accessibilityLabel="Load more feed items"
              accessibilityHint="Loads additional personalized content">
              <Text
                className="text-base font-medium text-blue-600"
                style={{ fontFamily: 'Gilroy' }}>
                Load More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
