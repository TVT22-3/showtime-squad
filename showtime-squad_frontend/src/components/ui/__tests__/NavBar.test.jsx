import React from 'react';
import { render, screen } from '@testing-library/react';
import  { NavBar, NavElement, SubElement, hasKey, build } from '../NavBar';

describe('NavBar', () => {
    test('renders NavBar component', () => {
        render(<NavBar />);
        const navBarElement = screen.getByTestId('navbar');
        expect(navBarElement).toBeInTheDocument();
    });

    test('renders NavElement component', () => {
        render(<NavElement />);
        const navElement = screen.getByTestId('nav-element');
        expect(navElement).toBeInTheDocument();
    });

    test('renders SubElement component', () => {
        render(<SubElement />);
        const subElement = screen.getByTestId('sub-element');
        expect(subElement).toBeInTheDocument();
    });

    test('hasKey function returns true for existing key', () => {
        const obj = { key: 'value' };
        const keyExists = hasKey(obj, 'key');
        expect(keyExists).toBe(true);
    });

    test('hasKey function returns false for non-existing key', () => {
        const obj = { key: 'value' };
        const keyExists = hasKey(obj, 'nonExistingKey');
        expect(keyExists).toBe(false);
    });

    test('build function returns a valid sitemap', () => {
        const sitemap = build();
        expect(sitemap).toBeDefined();
        expect(Array.isArray(sitemap)).toBe(true);
        expect(sitemap.length).toBeGreaterThan(0);
    });
});
