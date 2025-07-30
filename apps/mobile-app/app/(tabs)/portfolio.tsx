import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Card, Icon, colors, typography, spacing } from '@stack/ui-library';

// Mock data as specified in the story
const mockTotalValue = {
  amount: 47543298,
  currency: 'USD',
  change: 8.2,
  changeAmount: 411234.72,
};

const mockHoldings = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 150,
    currentPrice: 18946,
    totalValue: 2841900,
    change: 0.85,
    changeAmount: 2412,
  },
  {
    id: '2',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 75,
    currentPrice: 27500,
    totalValue: 2062500,
    change: -1.2,
    changeAmount: -2500,
  },
  {
    id: '3',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 200,
    currentPrice: 41000,
    totalValue: 8200000,
    change: 2.1,
    changeAmount: 16800,
  },
];

// Format currency values
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);
};

// Format percentage change
const formatPercentage = (change: number): string => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};

// Portfolio Value Card Component
const PortfolioValueCard: React.FC = () => (
  <Card variant="default" padding="large" className="mb-6">
    <View className="items-center">
      <Text
        className="mb-2 text-center"
        style={{
          fontFamily: typography.fonts.secondary,
          fontSize: typography.styles.h2.size,
          fontWeight: typography.weights.bold,
          color: colors.text.primary,
        }}
        accessibilityRole="header"
        accessibilityLabel="Portfolio total value">
        My Portfolio
      </Text>

      <Text
        className="mb-2 text-center"
        style={{
          fontFamily: typography.fonts.primary,
          fontSize: 36,
          fontWeight: typography.weights.bold,
          color: colors.text.primary,
        }}
        accessibilityLabel={`Total value ${formatCurrency(mockTotalValue.amount)}`}>
        {formatCurrency(mockTotalValue.amount)}
      </Text>

      <View className="flex-row items-center">
        <Icon
          library="feather"
          name={mockTotalValue.change >= 0 ? 'trending-up' : 'trending-down'}
          size={16}
          color={mockTotalValue.change >= 0 ? colors.semantic.success : colors.semantic.danger}
        />
        <Text
          className="ml-1"
          style={{
            fontFamily: typography.fonts.secondary,
            fontSize: typography.styles.body.size,
            color: mockTotalValue.change >= 0 ? colors.semantic.success : colors.semantic.danger,
          }}
          accessibilityLabel={`Change ${formatPercentage(mockTotalValue.change)} or ${formatCurrency(mockTotalValue.changeAmount)}`}>
          {formatPercentage(mockTotalValue.change)} ({formatCurrency(mockTotalValue.changeAmount)})
        </Text>
      </View>
    </View>
  </Card>
);

// Holdings List Item Component
const HoldingItem: React.FC<{ holding: (typeof mockHoldings)[0] }> = ({ holding }) => (
  <Card variant="default" padding="medium" className="mb-3">
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <Text
          style={{
            fontFamily: typography.fonts.secondary,
            fontSize: typography.styles.body.size,
            fontWeight: typography.weights.bold,
            color: colors.text.primary,
          }}
          accessibilityLabel={`${holding.name} stock`}>
          {holding.symbol}
        </Text>
        <Text
          style={{
            fontFamily: typography.fonts.primary,
            fontSize: typography.styles.caption.size,
            color: colors.text.secondary,
          }}>
          {holding.name}
        </Text>
        <Text
          style={{
            fontFamily: typography.fonts.primary,
            fontSize: typography.styles.caption.size,
            color: colors.text.tertiary,
          }}
          accessibilityLabel={`${holding.shares} shares at ${formatCurrency(holding.currentPrice)} each`}>
          {holding.shares} shares @ {formatCurrency(holding.currentPrice)}
        </Text>
      </View>

      <View className="items-end">
        <Text
          style={{
            fontFamily: typography.fonts.secondary,
            fontSize: typography.styles.body.size,
            fontWeight: typography.weights.bold,
            color: colors.text.primary,
          }}
          accessibilityLabel={`Total value ${formatCurrency(holding.totalValue)}`}>
          {formatCurrency(holding.totalValue)}
        </Text>
        <View className="flex-row items-center">
          <Icon
            library="feather"
            name={holding.change >= 0 ? 'trending-up' : 'trending-down'}
            size={12}
            color={holding.change >= 0 ? colors.semantic.success : colors.semantic.danger}
          />
          <Text
            className="ml-1"
            style={{
              fontFamily: typography.fonts.primary,
              fontSize: typography.styles.caption.size,
              color: holding.change >= 0 ? colors.semantic.success : colors.semantic.danger,
            }}
            accessibilityLabel={`Change ${formatPercentage(holding.change)}`}>
            {formatPercentage(holding.change)}
          </Text>
        </View>
      </View>
    </View>
  </Card>
);

// Holdings List Component
const HoldingsList: React.FC = () => (
  <View>
    <Text
      className="mb-4"
      style={{
        fontFamily: typography.fonts.secondary,
        fontSize: typography.styles.h3.size,
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
        paddingHorizontal: spacing.md,
      }}
      accessibilityRole="header">
      Holdings
    </Text>

    <View className="px-4">
      {mockHoldings.map((holding) => (
        <HoldingItem key={holding.id} holding={holding} />
      ))}
    </View>
  </View>
);

export default function PortfolioScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Text className="pl-[12px] font-h1 text-[38px] font-bold text-text-primary">Portfolio</Text>
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
      headerShown: true,
    });
  }, [navigation]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}
      accessibilityLabel="Portfolio screen">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Portfolio content">
        <PortfolioValueCard />
        <HoldingsList />
      </ScrollView>
    </SafeAreaView>
  );
}
