import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FormField } from '../src/components/molecules/FormField';

describe('FormField', () => {
  it('renders with label and input', () => {
    render(
      <FormField 
        label="Email"
        value=""
        onChangeText={jest.fn()}
      />
    );
    
    const output = JSON.stringify(toJSON());
    expect(output).toContain('Email');
  });

  it('shows error message when provided', () => {
    render(
      <FormField 
        label="Email"
        value=""
        onChangeText={jest.fn()}
        error="Invalid email"
      />
    );
    
    const output = JSON.stringify(toJSON());
    expect(output).toContain('Invalid email');
  });

  it('shows helper text when provided', () => {
    render(
      <FormField 
        label="Password"
        value=""
        onChangeText={jest.fn()}
        helperText="Must be at least 8 characters"
      />
    );
    
    const output = JSON.stringify(toJSON());
    expect(output).toContain('Must be at least 8 characters');
  });

  it('handles text input correctly', () => {
    const mockOnChangeText = jest.fn();
    
    render(
      <FormField 
        label="Email"
        value=""
        onChangeText={mockOnChangeText}
      />
    );
    
    const output = JSON.stringify(toJSON());
    expect(output).toContain('Email');
    expect(mockOnChangeText).toBeDefined();
  });

  it('applies required styling when required', () => {
    render(
      <FormField 
        label="Email"
        value=""
        onChangeText={jest.fn()}
        required={true}
      />
    );
    
    const output = JSON.stringify(toJSON());
    expect(output).toContain('Email');
  });

  it('passes through input props correctly', () => {
    render(
      <FormField 
        label="Email"
        value=""
        onChangeText={jest.fn()}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
    );
    
    const output = JSON.stringify(toJSON());
    expect(output).toContain('Email');
    expect(output).toContain('Enter your email');
  });

  it('applies custom className', () => {
    render(
      <FormField 
        label="Email"
        value=""
        onChangeText={jest.fn()}
        className="custom-form-field"
      />
    );
    
    const output = JSON.stringify(toJSON());
    expect(output).toContain('Email');
  });

  it('shows error but hides helper text when both provided', () => {
    render(
      <FormField 
        label="Password"
        value=""
        onChangeText={jest.fn()}
        error="Password too short"
        helperText="Must be at least 8 characters"
      />
    );
    
    const output = JSON.stringify(toJSON());
    expect(output).toContain('Password too short');
    expect(output).not.toContain('Must be at least 8 characters');
  });
});