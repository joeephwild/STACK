import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { Illustration } from '../../src/components/molecules/Illustration';

describe('Illustration', () => {
  it('renders welcome illustration', () => {
    render(<Illustration type="welcome" />);
    
    expect(screen.getByTestId('illustration-welcome')).toBeTruthy();
  });

  it('renders gift illustration', () => {
    render(<Illustration type="gift" />);
    
    expect(screen.getByTestId('illustration-gift')).toBeTruthy();
  });

  it('renders custom illustration with children', () => {
    render(
      <Illustration type="custom">
        <Text testID="custom-content">Custom Content</Text>
      </Illustration>
    );
    
    expect(screen.getByTestId('custom-content')).toBeTruthy();
  });

  it('renders with small size', () => {
    render(<Illustration type="welcome" size="small" />);
    
    expect(screen.getByTestId('illustration-welcome')).toBeTruthy();
  });

  it('renders with medium size', () => {
    render(<Illustration type="welcome" size="medium" />);
    
    expect(screen.getByTestId('illustration-welcome')).toBeTruthy();
  });

  it('renders with large size', () => {
    render(<Illustration type="welcome" size="large" />);
    
    expect(screen.getByTestId('illustration-welcome')).toBeTruthy();
  });

  it('applies custom className', () => {
    render(<Illustration type="welcome" className="custom-class" />);
    
    expect(screen.getByTestId('illustration-welcome')).toBeTruthy();
  });

  it('handles different type and size combinations', () => {
    const { rerender } = render(<Illustration type="gift" size="small" />);
    expect(screen.getByTestId('illustration-gift')).toBeTruthy();

    rerender(<Illustration type="welcome" size="large" />);
    expect(screen.getByTestId('illustration-welcome')).toBeTruthy();
  });

  it('renders custom type without predefined content', () => {
    render(<Illustration type="custom" />);
    
    // Custom type should render the container but no predefined content
    expect(screen.queryByTestId('illustration-welcome')).toBeNull();
    expect(screen.queryByTestId('illustration-gift')).toBeNull();
  });
});