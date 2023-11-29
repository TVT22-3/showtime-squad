import { render, screen } from '@testing-library/react'
import Stars from '../Stars.jsx'
import { expect } from 'vitest'


test('render Stars without any props', () => {
    render(
        <Stars />
    )

    const stars = screen.getByText(/★★★★★/i)
    expect(stars).toBeInTheDocument()

    const container = stars.parentElement
    expect(container.getAttribute('data-rating')).toBe('-1')
})

test('render Stars with mock rating', () => {
    render(
        <Stars rating={1.337} />
    )

    const stars = screen.getByText(/★★★★★/i)
    const container = stars.parentElement
    expect(container.getAttribute('data-rating')).toBe('1.337')
})
