import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  CurveType,
} from 'react-native-gifted-charts';
import { colors, typography, spacing } from '../../design/tokens';

export interface ChartDataPoint {
  value: number;
  label?: string;
  color?: string;
}

export interface ChartProps extends ViewProps {
  data: ChartDataPoint[];
  type?: 'line' | 'bar' | 'pie';
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  title?: string;
  className?: string;
  testID?: string;
  color?: string;
  animationDuration?: number;
  width?: number;
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
  width = 120,
  ...props
}) => {
  const giftedData = data.map((point) => ({
    value: point.value,
    label: '', // hide labels
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
            xAxisThickness={0}
            hideRules
            xAxisLabelTextStyle={{ display: 'none' }}
            yAxisTextStyle={{ display: 'none' }}
          />
        );

      case 'pie':
        return (
          <PieChart
            data={giftedData}
            showText={false}
            radius={height / 2}
            innerRadius={height / 4}
            isAnimated
            animationDuration={animationDuration}
          />
        );

      case 'line':
      default:
        return (
          <LineChart
            curved
            curveType={CurveType.QUADRATIC}
            data={giftedData}
            thickness={3}
            color={color}
            hideDataPoints={!showValues}
            yAxisThickness={0}
            xAxisThickness={0}
            isAnimated
            animationDuration={animationDuration}
            hideRules
            hideYAxisText
            height={height}
            adjustToWidth
            areaChart2
          />
        );
    }
  };

  return (
    <
    //   style={[{ height, width: '100%', alignItems: 'center' }, style]}
    //   className={className}
    //   testID={testID}
    //   {...props}
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
    </>
  );
};
