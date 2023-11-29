import { render, screen } from '@testing-library/react'
import NestedOptionsMenu from '../NestedOptionsMenu.jsx'
import { assert, expect } from 'vitest'

import { OptionsButtonContextProvider } from '../../../context/OptionsButtonContext.jsx'

test('render NestedOptionsMenu without any props', () => {
    render(<NestedOptionsMenu />)

    const menu = screen.getByText(/💩/i)
    expect(menu).toBeInTheDocument()

    const nullText = screen.getByText(/null/i)
    expect(nullText).toBeInTheDocument()

    const listItems = document.querySelectorAll('.category')
    expect(listItems.length).toBe(0)
})

test('render NestedOptionsMenu with mock data', () => {
    const mockOptions = getMockOptions()
    const icon = '📝'
    const block = { category: "movies", option: "top movies" }

    render(
        <OptionsButtonContextProvider type={{ category: block.category, option: block.option }}>
            <NestedOptionsMenu options={mockOptions} icon={icon} />
        </OptionsButtonContextProvider>
    )

    const menu = screen.getByText(/📝/i)
    expect(menu).toBeInTheDocument()

    const nullText = screen.queryByText(/null/i)
    expect(nullText).toBeNull()

    const listItems = document.querySelectorAll('.category')
    expect(listItems.length).toBe(5)
})

function getMockOptions() {
    return {
        "edit": {
            "options": []
        },
        "type": {
            "movies": {
                "options": [
                    "top movies",
                    "free pick",
                    "favorites"
                ]
            },
            "text": {
                "options": [
                    "news",
                    "review"
                ]
            }
        },
        "size": {
            "width": {
                "options": [
                    "+",
                    "-"
                ]
            },
            "height": {
                "options": [
                    "+",
                    "-"
                ]
            }
        }
    }
}

