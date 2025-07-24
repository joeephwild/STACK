import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { BalanceCard } from '../../src/components/molecules/BalanceCard';

describe('BalanceCard', () => {
  const defaultProps = {
    balance: '1,234.56',
  };

  it('renders with balance and default currency', () => {
    render(<BalanceCard {...defaultProps} />);
    
    expect(screen.getByText('Portfolio Value')).toBeTruthy();
    expect(screen.getByText('$1,234.56 USD')).toBeTruthy();
  });

  it('renders with custom currency', () => {
    render(<BalanceCard {...defaultProps} currency="EUR" />);
    
    expect(screen.getByText('Portfolio Value')).toBeTruthy();
    expect(screen.getByText('$1,234.56 EUR')).toBeTruthy();
  });

  it('renders Top Up button when onTopUpPress is provided', () => {
    const mockOnTopUpPress = jest.fn();
    render(<BalanceCard {...defaultProps} onTopUpPress={mockOnTopUpPress} />);
    
    const topUpButton = screen.getByText('Top Up');
    expect(topUpButton).toBeTruthy();
  });

  it('does not render Top Up button when onTopUpPress is not provided', () => {
    render(<BalanceCard {...defaultProps} />);
    
    expect(screen.queryByText('Top Up')).toBeNull();
  });

  it('calls onTopUpPress when Top Up button is pressed', () => {
    const mockOnTopUpPress = jest.fn();
    render(<BalanceCard {...defaultProps} onTopUpPress={mockOnTopUpPress} />);
    
    const topUpButton = screen.getByText('Top Up');
    fireEvent.press(topUpButton);
    
    expect(mockOnTopUpPress).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<BalanceCard {...defaultProps} className="custom-class" />);
    
    expect(screen.getByText('Portfolio Value')).toBeTruthy();
  });

  it('handles large numbers correctly', () => {
    render(<BalanceCard balance="1,234,567.89" />);
    
    expect(screen.getByText('$1,234,567.89 USD')).toBeTruthy();
  });

  it('handles zero balance', () => {
    render(<BalanceCard balance="0.00" />);
    
    expect(screen.getByText('$0.00 USD')).toBeTruthy();
  });
});