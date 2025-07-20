import React from 'react';

// Mock React Native components
jest.mock('react-native', () => ({
  View: ({ children, testID }: any) => ({ type: 'View', props: { children, testID } }),
  Text: ({ children, testID }: any) => ({ type: 'Text', props: { children, testID } }),
}));

// Import the component after mocking
import { HelloWorld } from '../HelloWorld';

describe('HelloWorld Component', () => {
  it('should be defined', () => {
    expect(HelloWorld).toBeDefined();
  });

  it('should be a function component', () => {
    expect(typeof HelloWorld).toBe('function');
  });

  it('should render with default message', () => {
    const result = HelloWorld({});
    expect(result).toBeDefined();
    expect(result.props.children.props.children).toBe('Hello World!');
    expect(result.props.children.props.testID).toBe('hello-world-text');
  });

  it('should render with custom message', () => {
    const customMessage = 'Custom Hello Message';
    const result = HelloWorld({ message: customMessage });
    expect(result).toBeDefined();
    expect(result.props.children.props.children).toBe(customMessage);
    expect(result.props.children.props.testID).toBe('hello-world-text');
  });

  it('should render container with correct testID', () => {
    const result = HelloWorld({});
    expect(result.props.testID).toBe('hello-world-container');
  });

  it('should handle undefined message prop', () => {
    const result = HelloWorld({ message: undefined });
    expect(result.props.children.props.children).toBe('Hello World!');
  });
});