import { render, screen, act, fireEvent } from '@testing-library/react'
import View from '../View.jsx'
import { describe, expect } from 'vitest'

import { OptionsButtonContextProvider } from '../../../context/OptionsButtonContext.jsx'

describe('View tests', () => {
    test('render View without any props', async () => {
        const mockContextData = { category: "movies", option: "top movies" }

        await act(async () => {
            render(
                <OptionsButtonContextProvider type={{ category: mockContextData.category, option: mockContextData.option }}>
                    <View />
                </OptionsButtonContextProvider>
            )
        })

        const view = screen.getByTestId('view')
        expect(view).toBeInTheDocument()
    })

    // TODO: more precise unit testing and integration tests
})

