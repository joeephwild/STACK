import React from 'react';
import { View, Text, ViewProps, TouchableOpacity } from 'react-native';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { colors, typography, spacing } from '../../design/tokens';
import { Chart, Icon } from '../atoms';
import { ChartDataPoint } from '../atoms/Chart';

export interface BalanceCardProps extends ViewProps {
  balance: string;
  currency?: string;
  onTopUpPress?: () => void;
  className?: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  currency = 'USD',
  onTopUpPress,
  className,
  ...props
}) => {
  // Sample chart data for balance trends
  const chartData: ChartDataPoint[] = [
    { value: 1250, label: 'Jan', color: colors.primary.royalBlue },
    { value: 2800, label: 'Feb', color: colors.primary.royalBlue },
    { value: 1750, label: 'Mar', color: colors.primary.royalBlue },
    { value: 5000, label: 'Apr', color: colors.primary.royalBlue },
    { value: 6180, label: 'May', color: colors.primary.royalBlue },
    { value: 2700, label: 'Jun', color: colors.primary.royalBlue },
  ];

  return (
    <View className={`${className || ''}`} {...props}>
      {/* Balance Section */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-2">
          <Text
            className="font-medium text-sm text-text-secondary"
            style={{
              fontFamily: typography.fonts.secondary,
              fontSize: typography.styles.label.size,
              color: colors.text.onPrimary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            Portfolio Value
          </Text>
          <View className="flex-row items-center gap-x-1">
            <Icon
              library="feather"
              name="trending-up"
              size={14}
              color={colors.accent.limeGreen}
            />
            <Text
              className="text-xs font-medium"
              style={{ color: colors.accent.limeGreen }}
            >
              +12.5%
            </Text>
          </View>
        </View>

        <View className="mb-3">
          <Text
            className="font-bold font-h1 text-text-primary"
            style={{
              fontSize: 48,
              color: colors.text.onPrimary,
            }}
          >
            {balance}
          </Text>
          <View className="flex-row items-center gap-x-2 mt-1">
            <Icon
              library="feather"
              name="eye"
              size={16}
              color={colors.text.onPrimary}
            />
            <Text
              className="text-sm"
              style={{
                fontFamily: typography.fonts.secondary,
                color: colors.text.onPrimary,
              }}
            >
              {currency} Balance
            </Text>
          </View>
        </View>
      </View>

      {/* Chart Section */}
      <View className="mb-6 w-full">
        <Chart
          data={chartData}
          type="line"
          height={120}
          showLabels={false}
          showValues={false}
          style={{ width: '100%' }}
        />
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center gap-x-3">
        <TouchableOpacity
          style={{
            backgroundColor: colors.accent.limeGreen,
            shadowColor: colors.accent.limeGreen,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
          className="flex-1 flex-row items-center gap-x-2 justify-center px-4 py-3 rounded-xl"
          onPress={onTopUpPress}
        >
          <Icon
            library="feather"
            name="plus"
            size={18}
            color={colors.text.primary}
          />
          <Text
            className="font-semibold text-base"
            style={{ color: colors.text.primary }}
          >
            Add Funds
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary.royalBlue,
            shadowColor: colors.primary.royalBlue,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
          className="flex-1 flex-row items-center gap-x-2 justify-center px-4 py-3 rounded-xl"
        >
          <Icon
            library="feather"
            name="arrow-down-left"
            size={18}
            color={colors.text.onPrimary}
          />
          <Text
            className="font-semibold text-base"
            style={{ color: colors.text.onPrimary }}
          >
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
