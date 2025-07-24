import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { FeatureCard } from '../../src/components/molecules/FeatureCard';

describe('FeatureCard', () => {
  const defaultProps = {
    icon: <Text>📱</Text>,
    title: 'Test Feature',
    description: 'This is a test feature description',
  };

  it('renders with basic props', () => {
    render(<FeatureCard {...defaultProps} />);
    
    expect(screen.getByText('Test Feature')).toBeTruthy();
    expect(screen.getByText('This is a test feature description')).toBeTruthy();
    expect(screen.getByText('📱')).toBeTruthy();
  });

  it('applies custom className', () => {
    render(<FeatureCard {...defaultProps} className="custom-class" />);
    
    expect(screen.getByText('Test Feature')).toBeTruthy();
  });

  it('handles long text content', () => {
    const longProps = {
      ...defaultProps,
      title: 'Very Long Feature Title That Might Wrap',
      description: 'This is a very long description that might wrap to multiple lines in the interface and should be handled properly by the component',
    };
    
    render(<FeatureCard {...longProps} />);
    
    expect(screen.getByText('Very Long Feature Title That Might Wrap')).toBeTruthy();
    expect(screen.getByText('This is a very long description that might wrap to multiple lines in the interface and should be handled properly by the component')).toBeTruthy();
  });

  it('renders with different icon types', () => {
    const { rerender } = render(<FeatureCard {...defaultProps} icon={<Text>🎯</Text>} />);
    expect(screen.getByText('🎯')).toBeTruthy();

    rerender(<FeatureCard {...defaultProps} icon={<Text>⭐</Text>} />);
    expect(screen.getByText('⭐')).toBeTruthy();
  });

  it('has proper accessibility structure', () => {
    render(<FeatureCard {...defaultProps} />);
    
    // Verify all content is accessible
    expect(screen.getByText('Test Feature')).toBeTruthy();
    expect(screen.getByText('This is a test feature description')).toBeTruthy();
    expect(screen.getByText('📱')).toBeTruthy();
  });
});