import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router, useNavigation } from 'expo-router';
import {
  Icon,
  BalanceCard,
  BasketFeedCard,
  QuestFeedCard,
  AITipCard,
  Button,
  Grid,
  ChartDataPoint,
  colors,
} from '@stack/ui-library';
import { Avatar } from 'react-native-elements';
import { avatar } from '~/assets/images';

// --- INTERFACES ---
interface BasketFeedItem {
  id: string;
  type: 'basket';
  name: string;
  description: string;
  avatar?: string;
  performance: {
    value: number;
    isPositive: boolean;
    chartData: number[];
  };
  stocks: Array<{
    id: string;
    symbol: string;
    avatar?: string;
    allocation: number;
  }>;
}

interface QuestFeedItem {
  id: string;
  type: 'quest';
  title: string;
  description: string;
  progress: number;
  xpReward: number;
  iconName: any;
  isCompleted: boolean;
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

// --- MOCK DATA ---
const mockFeedItemsData: FeedItem[] = [
  {
    id: 'quest1',
    type: 'quest',
    title: 'First Investment',
    description: 'Make your first investment to learn the basics.',
    progress: 0,
    xpReward: 100,
    iconName: 'target',
    isCompleted: false,
  },
  {
    id: 'tip1',
    type: 'tip',
    title: 'Understanding ETFs',
    content:
      'Exchange-Traded Funds (ETFs) offer a great way to diversify your portfolio without buying individual stocks.',
    category: 'education',
    readTime: 3,
    isBookmarked: false,
  },
  {
    id: 'basket1',
    type: 'basket',
    name: 'Tech Giants',
    description: 'A basket of the top-performing technology stocks.',
    avatar: 'https://placehold.co/48x48/6366F1/FFFFFF?text=TG',
    performance: {
      value: 12.5,
      isPositive: true,
      chartData: [30, 40, 25, 50, 60, 80, 70],
    },
    stocks: [
      {
        id: 's1',
        symbol: 'AAPL',
        avatar: 'https://placehold.co/24x24/000000/FFFFFF?text=A',
        allocation: 40,
      },
      {
        id: 's2',
        symbol: 'GOOGL',
        avatar: 'https://placehold.co/24x24/EA4335/FFFFFF?text=G',
        allocation: 30,
      },
      {
        id: 's3',
        symbol: 'MSFT',
        avatar: 'https://placehold.co/24x24/00A4EF/FFFFFF?text=M',
        allocation: 30,
      },
    ],
  },
  {
    id: 'quest2',
    type: 'quest',
    title: 'Portfolio Diversification',
    description: 'Add at least 3 different assets to your portfolio.',
    progress: 66,
    xpReward: 150,
    iconName: 'git-merge',
    isCompleted: false,
  },
];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const portfolioValue = 1245989.56;

  const [feedItems, setFeedItems] = useState(mockFeedItemsData);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View className="ml-[12px] flex-row items-center gap-x-4">
          <Avatar rounded source={avatar} size="small" />
          <Text className="font-heading-bold text-[24px] text-text-primary">HI, Simon</Text>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-[12px] rounded-full bg-primary-lavender px-4 py-2">
            <Text className="font-body text-body text-text-on-primary">Seed</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-[12px]">
            <Icon library="feather" name="bell" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        paddingBottom: 10,
        height: 100,
      },
      headerShown: true,
    });
  }, [navigation]);

  const balanceChartData: ChartDataPoint[] = [
    { value: 1250 },
    { value: 2800 },
    { value: 1750 },
    { value: 5000 },
    { value: 6180 },
    { value: 2700 },
    { value: 4500 },
    { value: 5200 },
    { value: 3200 },
  ];

  const handlePortfolioPress = () => router.push('/portfolio');
  const handleBasketPress = (id: string) => Alert.alert('Navigate', `To basket ${id}`);
  const handleQuestPress = (id: string) => Alert.alert('Navigate', `To quest ${id}`);
  const handleTipPress = (id: string) => Alert.alert('Navigate', `To tip ${id}`);

  const handleBookmark = (id: string) => {
    setFeedItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.type === 'tip') {
          return { ...item, isBookmarked: !item.isBookmarked };
        }
        return item;
      })
    );
  };

  const renderFeedItem = (item: FeedItem) => {
    switch (item.type) {
      case 'basket':
        return (
          <BasketFeedCard
            key={item.id}
            {...item}
            onPress={() => handleBasketPress(item.id)}
            className="mb-4"
          />
        );
      case 'quest':
        return (
          <QuestFeedCard
            key={item.id}
            {...item}
            onPress={() => handleQuestPress(item.id)}
            className="mb-4"
          />
        );
      case 'tip':
        return (
          <AITipCard
            key={item.id}
            {...item}
            onPress={() => handleTipPress(item.id)}
            onBookmark={() => handleBookmark(item.id)}
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
        showsVerticalScrollIndicator={false}>
        <BalanceCard
          className="mx-[14px] mt-[24px]"
          balance={portfolioValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          onPress={handlePortfolioPress}
          chartData={balanceChartData}
          performanceText="+12.5%"
        />

        <View className="mx-6 items-start gap-x-4 gap-y-[16px] pt-2">
          <Text className="font-heading-bold text-[20px] ">Add Cash</Text>
          <Grid columns={3}>
            <Button
              icon={<Icon library="feather" name="arrow-down-circle" size={20} color={colors.primary.royalBlue} />}
              variant="primary"
              size="medium"
              style={{ backgroundColor: colors.text.primary }}
              title="Top Up"
            />
            <Button
              icon={<Icon library="feather" name="arrow-down" size={20} color={colors.primary.royalBlue} />}
              variant="primary"
              size="medium"
              style={{ backgroundColor: colors.text.primary }}
              title="Cash Out"
            />
            <Button
              icon={<Icon library="feather" name="arrow-right" size={20} color={colors.primary.royalBlue} />}
              variant="primary"
              size="medium"
              style={{ backgroundColor: colors.text.primary }}
              title="Power up"
            />
          </Grid>
        </View>

        <View className="px-6 ">
          <View className="flex-row items-center justify-between py-4">
            <Text className="font-body-bold text-[18px]">Create a bucket</Text>
            <View className="flex-row items-center gap-x-2">
              <Text className="font-body-light text-[14px] text-text-secondary">
                View all bucket
              </Text>
              <Icon library="feather" name="chevron-right" size={16} color="#545454" />
            </View>
          </View>
          <Text className="pb-2 font-body-medium text-[14px] text-text-secondary">
            Start your investment journey by creating your first bucket
          </Text>
          <TouchableOpacity className="h-[160px] w-[50%] items-center justify-center gap-y-2 rounded-lg bg-primary-lavendertint">
            <View className="rounded-full bg-background-main p-2">
              <Icon library="feather" name="plus" size={16} color="#545454" />
            </View>
            <Text className="text-center font-body-light text-[14px]">
              Create an investment bucket
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 px-6">
          <Text className="mb-4 font-h1 text-[28px] font-bold text-black">For You</Text>
          <View>{feedItems.map(renderFeedItem)}</View>
        </View>
      </ScrollView>
    </View>
  );
}
