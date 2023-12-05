// Import necessary dependencies for testing
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from '../ForgotPassword.jsx';

// Describe block for the ForgotPassword component
describe('ForgotPassword component', () => {
    // Setup code to be executed before each test
    beforeEach(() => {
        render(
            <BrowserRouter>
                <ForgotPassword />
            </BrowserRouter>
        );
    });

    // Test case to check if the ForgotPassword form renders correctly
    test('renders ForgotPassword form', () => {
        // Get elements by their test IDs or text content
        const formElement = screen.getByTestId('form');
        const ForgotPasswordHeader = screen.getByText('Forgot Password?', { selector: 'div.text' });
        const ForgotPasswordButton = screen.getByText('Reset Password', { selector: 'button.submit' });
        const closeButton = screen.getByText('X', { selector: 'button.close-button' });

        // Assertions to check if elements are present in the document
        expect(ForgotPasswordButton).toBeInTheDocument();
        expect(ForgotPasswordHeader).toBeInTheDocument();
        expect(formElement).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    });

    // Test case to check if the user can type in the email input field
    test('allows user to type in email', async () => {
        // Get the email input field by its placeholder text
        const emailInput = screen.getByPlaceholderText('Email');

        // Simulate typing into the email input field
        fireEvent.change(emailInput, { target: { value: 'testemail@gmail.com' } });

        // Assertion to check if the input value is updated
        expect(emailInput.value).toBe('testemail@gmail.com');
    });
});

