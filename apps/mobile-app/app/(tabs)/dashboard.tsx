import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router, useNavigation } from 'expo-router';
import {
  Icon,
  BalanceCard,
  BasketFeedCard,
  QuestFeedCard,
  AITipCard,
  Button,
  Grid,
  GridItem,
} from '@stack/ui-library';

interface BasketFeedItem {
  id: string;
  type: 'basket';
  name: string;
  description: string;
  avatar: string;
  performanceData: Array<{ date: string; value: number }>;
  stockAvatars: string[];
  performance: {
    value: number;
    percentage: number;
    isPositive: boolean;
  };
}

interface QuestFeedItem {
  id: string;
  type: 'quest';
  title: string;
  description: string;
  progress: number;
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted: boolean;
  streakCount?: number;
}

interface AITipFeedItem {
  id: string;
  type: 'tip';
  title: string;
  content: string;
  category: 'market' | 'portfolio' | 'education' | 'strategy';
  readTime: number;
  isBookmarked: boolean;
}

type FeedItem = BasketFeedItem | QuestFeedItem | AITipFeedItem;

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
        <Text className="pl-[12px] font-h1 text-[38px] font-bold text-text-primary">Dashboard</Text>
      ),
      headerRight: () => (
        <TouchableOpacity
          //   onPress={() => {
          //     router.push('/settings');
          //   }}
          className="mr-[12px]">
          <Icon library="feather" name="bell" size={24} color="#000000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const mockFeedItems: FeedItem[] = [
    {
      id: '1',
      type: 'basket',
      name: 'Tech Innovators',
      description: 'Discover cutting-edge technology companies with high growth potential.',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEsx0cmENacsYu8Z3kwcrZJRqc8oFsWe2n3Q&sI',
      performanceData: [
        { date: '2024-01-01', value: 1250 },
        { date: '2024-01-02', value: 2514 },
        { date: '2024-01-03', value: 1103 },
        { date: '2024-01-04', value: 5008 },
        { date: '2024-01-05', value: 6122 },
      ],
      stockAvatars: [
        'https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png',
        'https://www.clipartmax.com/png/middle/39-396698_tesla-logo-%5Beps-motors%5D-tesla-logo-icon.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEsx0cmENacsYu8Z3kwcrZJRqc8oFsWe2n3Q&s',
      ],
      performance: {
        value: 12.34,
        percentage: 8.5,
        isPositive: true,
      },
    },
    {
      id: '2',
      type: 'quest',
      title: 'Set Up Round-ups',
      description: 'Start investing spare change automatically with every purchase.',
      progress: 60,
      xpReward: 150,
      difficulty: 'easy',
      isCompleted: false,
      streakCount: 3,
    },
    {
      id: '3',
      type: 'tip',
      title: 'Market Update on Your Holdings',
      content:
        'Your tech stocks are performing well this week. Consider diversifying your portfolio to reduce risk while maintaining growth potential.',
      category: 'portfolio',
      readTime: 3,
      isBookmarked: false,
    },
  ];

  const handlePortfolioPress = () => {
    router.push('/portfolio');
  };

  const handleFeedItemPress = (item: FeedItem) => {
    switch (item.type) {
      case 'basket':
        console.log('Navigate to basket:', item.id);
        // router.push(`/baskets/${item.id}`);
        break;
      case 'quest':
        console.log('Navigate to quest:', item.id);
        // router.push(`/quests/${item.id}`);
        break;
      case 'tip':
        console.log('Navigate to tip:', item.id);
        // router.push(`/tips/${item.id}`);
        break;
      default:
        console.log('Unknown feed item type');
    }
  };

  const renderFeedItem = (item: FeedItem) => {
    switch (item.type) {
      case 'basket':
        return (
          <BasketFeedCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            avatar={item.avatar}
            performance={{
              value: item.performance.value,
              isPositive: item.performance.isPositive,
              chartData: item.performanceData.map((d) => d.value),
            }}
            stocks={item.stockAvatars.map((avatar, index) => ({
              id: `stock-${index}`,
              symbol: `S${index + 1}`,
              avatar,
              allocation: 25, // Mock allocation
            }))}
            onPress={() => handleFeedItemPress(item)}
            className="mb-4"
          />
        );
      case 'quest':
        return (
          <QuestFeedCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            progress={item.progress}
            xpReward={item.xpReward}
            difficulty={item.difficulty}
            isCompleted={item.isCompleted}
            streakCount={item.streakCount}
            onPress={() => handleFeedItemPress(item)}
            className="mb-4"
          />
        );
      case 'tip':
        return (
          <AITipCard
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            category="general"
            readTime={`${item.readTime} min`}
            isBookmarked={item.isBookmarked}
            onPress={() => handleFeedItemPress(item)}
            onBookmark={() => console.log('Bookmark toggled for tip:', item.id)}
            className="mb-4"
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Dashboard screen content">
        {/* Portfolio Summary Section */}
        <BalanceCard
          className="mx-[14px] mt-[24px] h-[25%] gap-y-[16px] p-[16px]"
          balance={portfolioValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          onTopUpPress={handlePortfolioPress}
        />

        <View className="mx-6 items-start gap-x-4 gap-y-[16px] pt-2">
          <Text className="font-heading-bold text-[20px] ">Add Money</Text>
          <Grid columns={3}>
            <Button size="medium" variant="tertiary" title="$ 20k" />
            <Button size="medium" variant="tertiary" title="$ 50k" />
            <Button size="medium" variant="tertiary" title="$ 100k" />
            <Button size="medium" variant="tertiary" title="$ 100" className="mr-2 h-[50px] bg-primary p-2" />
            <Button size="medium" variant="tertiary" title="$ 200" />
            <Button
              size="medium"
              variant="tertiary"
              icon={<Icon library="feather" name="plus" size={16} color="black" />}
              title=""
              className="mr-2 h-[50px] bg-primary p-2"
            />
          </Grid>
        </View>

        {/* Feed Items Section */}
        <View className="px-6">
          <Text
            className="mb-4 mt-[24px] font-h1 text-[28px] font-bold text-black"
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
