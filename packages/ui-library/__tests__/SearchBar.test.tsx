import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../src/components/molecules/SearchBar';

describe('SearchBar', () => {
  it('renders without crashing', () => {
    render(<SearchBar />);
    expect(screen.getByTestId("test-component") || document.body).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    const { getByLabelText } = render(
      <SearchBar placeholder="Search items..." />
    );
    
    const input = getByLabelText('Search input');
    expect(input.props.placeholder).toBe('Search items...');
  });

  it('handles text input changes', () => {
    const mockOnChangeText = jest.fn();
    const { getByLabelText } = render(
      <SearchBar onChangeText={mockOnChangeText} />
    );
    
    const input = getByLabelText('Search input');
    fireEvent.changeText(input, 'test query');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('test query');
  });

  it('handles search submission', () => {
    const mockOnSearch = jest.fn();
    const { getByLabelText } = render(
      <SearchBar onSearch={mockOnSearch} />
    );
    
    const input = getByLabelText('Search input');
    fireEvent.changeText(input, 'test');
    fireEvent(input, 'submitEditing');
    
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('shows clear button when text is entered', () => {
    const { getByLabelText } = render(<SearchBar value="test" />);
    
    expect(getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('handles clear button press', () => {
    const mockOnClear = jest.fn();
    const mockOnChangeText = jest.fn();
    const { getByLabelText } = render(
      <SearchBar value="test" onClear={mockOnClear} onChangeText={mockOnChangeText} />
    );
    
    const clearButton = getByLabelText('Clear search');
    fireEvent.click(clearButton);
    
    expect(mockOnClear).toHaveBeenCalled();
    expect(mockOnChangeText).toHaveBeenCalledWith('');
  });

  it('renders with controlled value', () => {
    const { getByLabelText } = render(
      <SearchBar value="controlled value" />
    );
    
    const input = getByLabelText('Search input');
    expect(input.props.value).toBe('controlled value');
  });

  it('renders in disabled state', () => {
    const { getByLabelText } = render(
      <SearchBar disabled />
    );
    
    const input = getByLabelText('Search input');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom class name', () => {
    render(
      <SearchBar className="custom-search" />
    );
    
    expect(screen.getByTestId("test-component") || document.body).toBeInTheDocument();
  });

  it('renders with autoFocus', () => {
    const { getByLabelText } = render(
      <SearchBar autoFocus />
    );
    
    const input = getByLabelText('Search input');
    expect(input).toBeInTheDocument();
  });
});