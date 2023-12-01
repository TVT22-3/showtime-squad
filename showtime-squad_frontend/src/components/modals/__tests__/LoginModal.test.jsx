// Importing necessary libraries and components for testing
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "../../../context/UserContext.jsx";
import Login from '../Login.jsx';

// Test suite for the Login component
describe('Login component', () => {
  // Before each test, render the Login component wrapped in BrowserRouter and UserProvider
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    );
  });

  // Test to check if the Login form is rendered correctly
  test('renders Login form', () => {
    const formElement = screen.getByTestId('form');
    const loginHeader = screen.getByText('Login', { selector: 'div.text' });
    const loginButton = screen.getByText('Login', { selector: 'button.submit' });
    const closeButton = screen.getByText('X', { selector: 'button.close-button' });

    // Assert that the selected elements are in the document
    expect(loginButton).toBeInTheDocument();
    expect(loginHeader).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  // Test to check if the user can type in the username and password fields
  test('allows user to type in username and password', async () => {
    // Provide input values and submit the form
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    // Type into the input fields
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Check if the input values are updated
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');

    // ... Add assertions for successful login if needed
  });

  // Test to check if the login is successful
  test('Find successful message', async () => {
    // Mock the fetch function to resolve with a successful response
    vitest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Login successful!' }),
    });

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const formElement = screen.getByTestId('form');

    // Simulate form submission with valid credentials
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'test' } });
      fireEvent.change(passwordInput, { target: { value: 'test' } });
      fireEvent.submit(formElement);
    });

    // Ensure the success message is displayed
    expect(await screen.findByText('Login successful!')).toBeInTheDocument();
  });

  // Test to check if the login fails with bad credentials
  test('Find Bad Credentials message', async () => {
    // Mock the fetch function to resolve with a failed response
    vitest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Bad Credentials' }),
    });

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const formElement = screen.getByTestId('form');

    // Simulate form submission with invalid credentials
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'test' } });
      fireEvent.change(passwordInput, { target: { value: 'test' } });
      fireEvent.submit(formElement);
    });

    // Ensure the error message is displayed
    expect(await screen.findByText('Bad Credentials')).toBeInTheDocument();
  });
});


