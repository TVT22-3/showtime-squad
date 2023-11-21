import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar, { NavElement, SubElement, hasKey } from '../NavBar';

describe('NavBar', () => {
    test('renders NavBar component', () => {
        render(<NavBar />);
        // Add your assertions here
    });

    test('renders NavElement component', () => {
        render(<NavElement />);
        // Add your assertions here
    });

    test('renders SubElement component', () => {
        render(<SubElement />);
        // Add your assertions here
    });

});
