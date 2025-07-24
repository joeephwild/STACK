import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TextLink } from '../../src/components/molecules/TextLink';

describe('TextLink', () => {
  const defaultProps = {
    text: 'Test Link',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<TextLink {...defaultProps} />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    render(<TextLink {...defaultProps} onPress={mockOnPress} />);
    
    const link = screen.getByText('Test Link');
    fireEvent.press(link);
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with primary variant', () => {
    render(<TextLink {...defaultProps} variant="primary" />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('renders with secondary variant', () => {
    render(<TextLink {...defaultProps} variant="secondary" />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('renders with accent variant', () => {
    render(<TextLink {...defaultProps} variant="accent" />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('renders with small size', () => {
    render(<TextLink {...defaultProps} size="small" />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('renders with medium size', () => {
    render(<TextLink {...defaultProps} size="medium" />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('renders with large size', () => {
    render(<TextLink {...defaultProps} size="large" />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('renders with underline enabled', () => {
    render(<TextLink {...defaultProps} underline={true} />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('renders with underline disabled', () => {
    render(<TextLink {...defaultProps} underline={false} />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    render(<TextLink {...defaultProps} onPress={mockOnPress} disabled={true} />);
    
    const link = screen.getByText('Test Link');
    fireEvent.press(link);
    
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<TextLink {...defaultProps} className="custom-class" />);
    
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('has proper accessibility attributes', () => {
    render(<TextLink {...defaultProps} />);
    
    const link = screen.getByLabelText('Click me');
    expect(link).toBeTruthy();
  });

  it('handles long text properly', () => {
    const longText = 'This is a very long text link that might wrap to multiple lines in the interface';
    render(<TextLink text={longText} onPress={jest.fn()} />);
    
    expect(screen.getByText(longText)).toBeTruthy();
  });
});