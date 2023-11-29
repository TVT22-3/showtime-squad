import { render, screen, fireEvent } from '@testing-library/react'
import Adder from '../Adder.jsx'
import { expect } from 'vitest'

test('render Adder without any props', () => {
    render(<Adder />)

    const element = screen.getByText('+')
    expect(element).toBeInTheDocument()
})

test('test Adder onClick', () => {
    let testNum = 0
    render(<Adder onClick={() => {console.log(testNum++)}}/>)

    const element = screen.getByText('+').parentElement
    expect(element).toBeInTheDocument()

    expect(testNum).toBe(0)
    fireEvent.click(element)
    expect(testNum).toBe(1)
    fireEvent.click(element)
    expect(testNum).toBe(2)
})

