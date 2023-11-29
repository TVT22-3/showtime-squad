import { render, screen, act, fireEvent } from '@testing-library/react'
import ViewBlock from '../ViewBlock.jsx'
import { describe, expect } from 'vitest'

import { OptionsButtonContextProvider } from '../../../context/OptionsButtonContext.jsx'

describe('ViewBlock tests', () => {
    test('render ViewBlock without any props', async () => {
        const mockContextData = { category: "movies", option: "top movies" }

        await act(async () => {
            render(
                <OptionsButtonContextProvider type={{ category: mockContextData.category, option: mockContextData.option }}>
                    <ViewBlock />
                </OptionsButtonContextProvider>
            )
        })

        const view = screen.getByTestId('view-block')
        expect(view).toBeInTheDocument()
    })

    // if this test breaks after implementing things like
    // login, fetch data, etc. and you can't immediately fix it,
    // feel free to comment this out and add a T*DO
    test('title changes when clicking options', async () => {
        const mockContextData = { category: "movies", option: "testing" }

        await act(async () => {
            render(
                <OptionsButtonContextProvider type={{ category: mockContextData.category, option: mockContextData.option }}>
                    <ViewBlock />
                </OptionsButtonContextProvider>
            )
        })
        const view = screen.getByTestId('view-block')
        const title = view.querySelector('.title')
        const button = screen.getAllByTestId('nested-option-button')[0]

        expect(title.innerHTML).toContain('testing')
        fireEvent.click(button)
        expect(title.innerHTML).toContain(button.innerHTML)
    })
})

