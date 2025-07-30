import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {  useNavigation } from 'expo-router';
import { Header, Card, Icon, colors, typography, spacing, Chart } from '@stack/ui-library';
import { ChartDataPoint } from '../../../../packages/ui-library/src/components/atoms/Chart';

// Mock data as specified in the story
const mockTotalValue = {
  amount: 47543298,
  currency: 'USD',
  change: 8.2,
  changeAmount: 411234.72,
};
const chartData: ChartDataPoint[] = [
  { value: 1250, label: 'Jan', color: colors.primary.royalBlue },
  { value: 2800, label: 'Feb', color: colors.primary.royalBlue },
  { value: 1750, label: 'Mar', color: colors.primary.royalBlue },
  { value: 5000, label: 'Apr', color: colors.primary.royalBlue },
  { value: 6180, label: 'May', color: colors.primary.royalBlue },
  { value: 2700, label: 'Jun', color: colors.primary.royalBlue },
  { value: 5000, label: 'Apr', color: colors.primary.royalBlue },
  { value: 6180, label: 'May', color: colors.primary.royalBlue },
  { value: 2700, label: 'Jun', color: colors.primary.royalBlue },
];

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
  const { width: screenWidth } = useWindowDimensions();

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
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}
      accessibilityLabel="Portfolio screen">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingVertical: 15,
        }}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Portfolio content">
        {/* Wrap content that needs padding in a View */}
        <View style={{ paddingHorizontal: 15 }}>
          <View className="flex-row items-center gap-x-3">
            <Text className="font-body-regular text-[16px] text-text-secondary">
              Total Value of portfolio
            </Text>
            <Icon library="feather" name="eye" size={16} color="#545454" />
          </View>
          <Text className="font-h1 text-[38px]">
            {mockTotalValue.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Text>
          <Text className="font-body-regular text-[16px] text-text-secondary">
            {mockTotalValue.changeAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </View>

        <Chart
          type="line"
          data={chartData}
          height={295}
          width={screenWidth} // Use the screen width
          color="#00FF00" // Example: Green line color
          startFillColor="#00FF00" // Example: Green gradient start
          endFillColor="#FFFFFF" // Example: White gradient end
        />

        <View style={{ paddingHorizontal: 15 }}>
          {/* Your HoldingsList or other components go here */}
        </View>
      </ScrollView>
    </View>
  );
}
