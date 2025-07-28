import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { router } from 'expo-router';
import Dashboard from '../dashboard';

// Mock Expo Router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock UI library components
jest.mock('@/packages/ui-library', () => ({
  Card: ({ children, testID, className, ...props }: any) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID, ...props }, children);
  },
  Button: ({ title, onPress, testID, variant, ...props }: any) => {
    const React = require('react');
    const { TouchableOpacity, Text } = require('react-native');
    return React.createElement(
      TouchableOpacity,
      { testID, onPress, ...props },
      React.createElement(Text, {}, title)
    );
  },
  Icon: ({ name, size, color, testID }: any) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { testID, style: { color, fontSize: size } }, name);
  },
}));

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, {}, children);
  },
}));

// Mock console.log for interaction testing
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Dashboard Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('renders the dashboard title correctly', () => {
    const { getByText } = render(<Dashboard />);
    
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Your financial overview at a glance')).toBeTruthy();
  });

  it('renders portfolio summary section with mock data', () => {
    const { getByText } = render(<Dashboard />);
    
    expect(getByText('Portfolio Summary')).toBeTruthy();
    expect(getByText('$12,450.00')).toBeTruthy();
    expect(getByText("Today's Change")).toBeTruthy();
    expect(getByText('+$125.50 (+1.02%)')).toBeTruthy();
  });

  it('renders feed items section with mock content', () => {
    const { getByText } = render(<Dashboard />);
    
    expect(getByText('For You')).toBeTruthy();
    expect(getByText('Your portfolio gained 2.5% this week')).toBeTruthy();
    expect(getByText('Complete your first investment quest')).toBeTruthy();
    expect(getByText('Tip: Diversify your portfolio for better risk management')).toBeTruthy();
  });

  it('navigates to portfolio screen when view portfolio button is pressed', () => {
    const { getByTestId } = render(<Dashboard />);
    
    const viewPortfolioButton = getByTestId('view-portfolio-button');
    fireEvent.press(viewPortfolioButton);
    
    expect(router.push).toHaveBeenCalledWith('/portfolio');
  });

  it('handles feed item interactions', () => {
    const { getByTestId } = render(<Dashboard />);
    
    // Test individual feed item interactions
    const investmentItem = getByTestId('feed-item-investment');
    const questItem = getByTestId('feed-item-quest');
    const tipItem = getByTestId('feed-item-tip');
    
    expect(investmentItem).toBeTruthy();
    expect(questItem).toBeTruthy();
    expect(tipItem).toBeTruthy();
    
    // Test first feed item interaction
    fireEvent.press(investmentItem);
    expect(consoleSpy).toHaveBeenCalledWith('Feed item pressed:', 'investment');
  });

  it('has proper accessibility attributes', () => {
    const { getByTestId } = render(<Dashboard />);
    
    // Check portfolio summary accessibility
    const portfolioSection = getByTestId('portfolio-summary');
    expect(portfolioSection).toBeTruthy();
    
    // Check feed section accessibility
    const feedSection = getByTestId('feed-section');
    expect(feedSection).toBeTruthy();
  });

  it('displays correct colors and styling', () => {
    const { getByText } = render(<Dashboard />);
    
    // Verify portfolio value styling
    const portfolioValue = getByText('$12,450.00');
    expect(portfolioValue).toBeTruthy();
    
    // Verify positive change styling
    const positiveChange = getByText('+$125.50 (+1.02%)');
    expect(positiveChange).toBeTruthy();
  });

  it('renders all required icons', () => {
    const { getByTestId } = render(<Dashboard />);
    
    // Check for trend icon in portfolio summary
    const trendIcon = getByTestId('trend-icon');
    expect(trendIcon).toBeTruthy();
    
    // Check for feed item icons
    const investmentIcon = getByTestId('investment-icon');
    const questIcon = getByTestId('quest-icon');
    const tipIcon = getByTestId('tip-icon');
    
    expect(investmentIcon).toBeTruthy();
    expect(questIcon).toBeTruthy();
    expect(tipIcon).toBeTruthy();
  });
});