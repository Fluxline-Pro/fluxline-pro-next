import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button />);
  });

  it('renders children correctly', () => {
    const testText = 'Test content';
    render(<Button>{testText}</Button>);
    
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Button className={customClass}>Test</Button>);
    
    const element = screen.getByText('Test');
    expect(element).toHaveClass(customClass);
  });

  it('passes through additional props', () => {
    const testId = 'test-button';
    render(<Button data-testid={testId}>Test</Button>);
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // Add more specific tests for your component's functionality
  it('handles user interactions', async () => {
    const user = userEvent.setup();
    render(<Button>Interactive content</Button>);
    
    // Add interaction tests here
    // Example: await user.click(screen.getByRole('button'));
  });
});
