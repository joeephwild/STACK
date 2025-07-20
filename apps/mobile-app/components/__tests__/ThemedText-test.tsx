import * as React from 'react';

// Mock React Native components and hooks
jest.mock('react-native', () => ({
  Text: ({ children, style, ...props }: any) => ({ type: 'Text', props: { children, style, ...props } }),
  StyleSheet: {
    create: (styles: any) => styles,
  },
}));

// Mock the useThemeColor hook
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#000000'),
}));

import { ThemedText } from '../ThemedText';

describe('ThemedText Component', () => {
  it('should be defined', () => {
    expect(ThemedText).toBeDefined();
  });

  it('should be a function component', () => {
    expect(typeof ThemedText).toBe('function');
  });

  it('should render with default props', () => {
    const result = ThemedText({ children: 'Test text' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('Test text');
  });

  it('should render with custom type', () => {
    const result = ThemedText({ children: 'Title text', type: 'title' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('Title text');
  });

  it('should handle different text types', () => {
    const types = ['default', 'title', 'defaultSemiBold', 'subtitle', 'link', 'subtext'];
    
    types.forEach(type => {
      const result = ThemedText({ children: `${type} text`, type: type as any });
      expect(result).toBeDefined();
      expect(result.props.children).toBe(`${type} text`);
    });
  });
});
