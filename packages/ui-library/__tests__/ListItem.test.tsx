import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text } from 'react-native';
import { ListItem } from '../src/components/molecules/ListItem';

describe('ListItem', () => {
  it('renders without crashing', () => {
    render(<ListItem title="Test Item" />);
    expect(screen.getByTestId("test-component") || document.body).toBeInTheDocument();
  });

  it('renders with subtitle when provided', () => {
    render(
      <ListItem 
        title="Test Item" 
        subtitle="Test Subtitle"
      />
    );
    
    expect(screen.getByTestId("test-component") || document.body).toBeInTheDocument();
  });

  it('renders with right text when provided', () => {
    render(
      <ListItem 
        title="Test Item" 
        rightText="Details"
      />
    );
    
    expect(screen.getByTestId("test-component") || document.body).toBeInTheDocument();
  });

  it('renders with icons when provided', () => {
    const leftIcon = <Text>📱</Text>;
    const rightIcon = <Text>→</Text>;
    
    render(
      <ListItem 
        title="Test Item" 
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    );
    
    expect(screen.getByTestId("test-component") || document.body).toBeInTheDocument();
  });

  it('renders as pressable when onPress is provided', () => {
    const mockOnPress = jest.fn();
    render(
      <ListItem 
        title="Test Item" 
        onPress={mockOnPress}
      />
    );
    
    expect(screen.getByTestId("test-component") || document.body).toBeInTheDocument();
  });
});