import { render, screen, fireEvent } from '@testing-library/react'
import OptionListItem from '../OptionListItem.jsx'
import { assert, expect } from 'vitest'

import { OptionsButtonContextProvider, useOptionsButtonContext } from '../../../context/OptionsButtonContext.jsx'

test('render OptionListItem without any props', () => {
    const block = { category: "movies", option: "top movies" }

    render(
        <OptionsButtonContextProvider type={{ category: block.category, option: block.option }}>
            <OptionListItem />
        </OptionsButtonContextProvider>
    )

    const button = screen.getByRole('listitem')
    expect(button).toBeInTheDocument()
})

test('render OptionListItem with mock data and test click', () => {
    const block = { category: "movies", option: "top movies" }

    render(
        <OptionsButtonContextProvider type={{ category: block.category, option: block.option }}>
            <OptionListItem category='test category' option='test option' />
        </OptionsButtonContextProvider>
    )

    const button = screen.getByText(/test option/i)
    expect(button).toBeInTheDocument()

    // clicking the button should not throw error even when it's not tied to any real hook
    fireEvent.click(button)
})


