import { render, screen } from '@testing-library/react'
import MovieBlocks from '../MovieBlocks.jsx'
import { expect } from 'vitest'

import { OptionsButtonContextProvider, useOptionsButtonContext } from '../../../context/OptionsButtonContext.jsx'

test('render MovieBlocks without any props', () => {
    const block = { category: "movies", option: "top movies" }

    render(
        <OptionsButtonContextProvider type={{ category: block.category, option: block.option }}>
            <MovieBlocks />
        </OptionsButtonContextProvider>
    )

    const button = screen.getByTestId('movie-blocks')
    expect(button).toBeInTheDocument()

    const blocks = screen.queryAllByTestId('movie-block')
    expect(blocks.length).toBe(5)
})

test('render MovieBlocks with favorites', () => {
    const block = { category: "movies", option: "top movies" }

    render(
        <OptionsButtonContextProvider type={{ category: block.category, option: block.option }}>
            <MovieBlocks type={'favorites'} maxAmount={4}/>
        </OptionsButtonContextProvider>
    )

    const button = screen.getByTestId('movie-blocks')
    expect(button).toBeInTheDocument()

    const blocks = screen.queryAllByTestId('movie-block')
    expect(blocks.length).toBe(4)

    //TODO: test different fetch types
})

