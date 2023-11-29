import { render, screen, fireEvent } from '@testing-library/react'
import MovieBlock from '../MovieBlock.jsx'
import { expect } from 'vitest'

test('render MovieBlock without any props', () => {
    render(<MovieBlock />)

    const movieBlock = screen.getByTestId("movie-block")
    expect(movieBlock).toBeInTheDocument()

    const imgElement = movieBlock.querySelector('img')
    expect(imgElement).not.toBeInTheDocument()

    const aElement = movieBlock.querySelector('a')
    expect(aElement).toBeInTheDocument()
    expect(aElement.getAttribute('href')).toBe('#')
    expect(aElement.getAttribute('data-title')).toBe('')

    const starElement = movieBlock.querySelector('.star-rating')
    expect(starElement).toBeInTheDocument()
    expect(starElement.getAttribute('data-rating')).toBe("-1")
})

test('render MovieBlock with mock data', () => {

    const imgUrl = "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png"
    const linkUrl = "https://www.wikipedia.org/"
    const title = "Wikipedia"
    const rating = 3.14159265359

    render(<MovieBlock imgUrl={imgUrl} linkUrl={linkUrl} title={title} rating={rating} />)

    const movieBlock = screen.getByTestId("movie-block")
    expect(movieBlock).toBeInTheDocument()

    const imgElement = movieBlock.querySelector('img')
    expect(imgElement).toBeInTheDocument()

    const aElement = movieBlock.querySelector('a')
    expect(aElement).toBeInTheDocument()
    expect(aElement.getAttribute('href')).toBe(linkUrl)
    expect(aElement.getAttribute('data-title')).toBe(title)

    const starElement = movieBlock.querySelector('.star-rating')
    expect(starElement).toBeInTheDocument()
    expect(starElement.getAttribute('data-rating')).toBe(`${rating}`)
})

