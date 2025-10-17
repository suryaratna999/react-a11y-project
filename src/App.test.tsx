// @vitest-environment jsdom
/// <reference types="vitest" />
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  afterEach(() => cleanup());

  it('has a labeled textarea', () => {
    render(<App />);
    const textarea = screen.getByLabelText(/Numbers/i);
    expect(textarea).not.toBeNull();
  });

  it('calculates on Enter', async () => {
    render(<App />);
    const textarea = screen.getByLabelText(/Numbers/i);
    await userEvent.click(textarea);
    await userEvent.type(textarea, '1,2');
    fireEvent.keyDown(textarea, { key: 'Enter' });
    const result = await screen.findByText(/Result:/i);
    expect(result.textContent).toContain('Result: 3');
  });

  it('Shift+Enter adds a newline', async () => {
    render(<App />);
    const textarea = screen.getByLabelText(/Numbers/i) as HTMLTextAreaElement;
    await userEvent.click(textarea);
    await userEvent.type(textarea, '1');
    await userEvent.type(textarea, '\n');
    expect(textarea.value.includes('\n')).toBe(true);
    const maybeResult = screen.queryByText(/Result:/i);
    expect(maybeResult).toBeNull();
  });

  it('button focus and click calculate', async () => {
    render(<App />);
    const textarea = screen.getByLabelText(/Numbers/i);
    const button = screen.getAllByRole('button', { name: /Calculate/i })[0];
    await userEvent.click(textarea);
    await userEvent.type(textarea, '4,5');
    button.focus();
    expect(document.activeElement).toBe(button);
    await userEvent.click(button);
    const result = await screen.findByText(/Result:/i);
    expect(result.textContent).toContain('Result: 9');
  });
});
