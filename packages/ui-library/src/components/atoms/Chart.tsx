import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { LineChart, BarChart, ProgressChart } from 'react-native-gifted-charts';
import { colors, typography, spacing } from '../../design/tokens';

export interface ChartDataPoint {
  value: number;
  label?: string;
  color?: string;
}

export interface ChartProps extends ViewProps {
  data: ChartDataPoint[];
  type?: 'line' | 'bar' | 'progress';
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  title?: string;
  className?: string;
  testID?: string;
  color?: string;
  animationDuration?: number;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  type = 'line',
  height = 120,
  showLabels = false,
  showValues = false,
  title,
  className,
  testID,
  style,
  color = colors.accent.limeGreen,
  animationDuration = 800,
  ...props
}) => {
  const giftedData = data.map((point, index) => ({
    value: point.value,
    label: point.label || '',
    frontColor: point.color || color,
  }));

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart
            data={giftedData}
            barWidth={20}
            frontColor={color}
            spacing={20}
            showValuesOnTopOfBars={showValues}
            isAnimated
            animationDuration={animationDuration}
            height={height}
            yAxisThickness={0}
            xAxisLabelTextStyle={{
              fontFamily: typography.fonts.secondary,
              fontSize: typography.styles.caption.size,
              color: colors.text.secondary,
            }}
            hideAxesAndRules={!showLabels}
          />
        );

      case 'progress':
        const total = data.reduce((sum, p) => sum + p.value, 0);
        const percentages = data.map(p => p.value / total);
        return (
          <ProgressChart
            data={percentages}
            labels={showLabels ? data.map(p => p.label || '') : []}
            radius={height / 2}
            strokeWidth={10}
            showText
            strokeColorConfig={data.map(p => p.color || color)}
            animated
            animationDuration={animationDuration}
            textColor={colors.text.primary}
            textFontSize={typography.styles.caption.size}
          />
        );

      case 'line':
      default:
        return (
          <LineChart
            areaChart5
            data={giftedData}
            thickness={5}
            color={color}
            hideDataPoints={!showValues}
            yAxisThickness={0}
            isAnimated
            animationDuration={animationDuration}
            height={height}
            xAxisLabelTextStyle={{
              fontFamily: typography.fonts.secondary,
              fontSize: typography.styles.caption.size,
              color: colors.text.secondary,
            }}
            hideAxesAndRules={!showLabels}
          />
        );
    }
  };

  return (
    <View
      style={[{ padding: spacing.md }, style]}
      className={className}
      testID={testID}
      {...props}
    >
      {title && (
        <Text
          style={{
            fontFamily: typography.fonts.primary,
            fontSize: typography.styles.h3.size,
            fontWeight: typography.styles.h3.weight,
            color: colors.text.primary,
            marginBottom: spacing.md,
          }}
        >
          {title}
        </Text>
      )}
      {renderChart()}
    </View>
  );
};
