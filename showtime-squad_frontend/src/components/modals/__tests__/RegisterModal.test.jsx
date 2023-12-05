import React from 'react';
import { vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register.jsx';


describe('Register component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
          <Register />
      </BrowserRouter>
    );
  });

  test('renders Register form', () => {
    const formElement = screen.getByTestId('form');
    const registerHeader = screen.getByText('Register', { selector: 'div.text' });
    const registerButton = screen.getByText('Register', { selector: 'button.submit' });
    const closeButton = screen.getByText('X', { selector: 'button.close-button' });
    expect(registerButton).toBeInTheDocument();
    expect(registerHeader).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();

  });

  test('allows user to type in username, password, email and confirm password', async () => {
    // Provide input values and submit the form
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const emailInput = screen.getByPlaceholderText('Email');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    


     // Type into the input fields
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(emailInput, { target: { value: 'testemail' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testconfirmpassword' } });
  
    // Check if the input values are updated
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
    expect(emailInput.value).toBe('testemail');
    expect(confirmPasswordInput.value).toBe('testconfirmpassword');

  });
  /*
  test('Find successful message', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'User registered successfully!' }),
    });

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const emailInput = screen.getByPlaceholderText('Email');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const formElement = screen.getByTestId('form');

    await act(async () => {
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'Testpassword1' } });
        fireEvent.change(emailInput, { target: { value: 'testemail@gmail.com' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Testpassword1' } });
        fireEvent.submit(formElement);
      });

    // Ensure the error message is displayed
    expect(await screen.findByText('User registered successfully! Redirecting to Login...')).toBeInTheDocument();


  });

  test('Find failed message', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Failed to fetch' }),
    });

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const emailInput = screen.getByPlaceholderText('Email');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const formElement = screen.getByTestId('form');

    await act(async () => {
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'Testpassword1' } });
        fireEvent.change(emailInput, { target: { value: 'testemail@gmail.com' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Testpassword1' } });
        fireEvent.submit(formElement);
      });

    // Ensure the error message is displayed
    expect(await screen.findByText('Failed to fetch')).toBeInTheDocument();
  });
  */
});
