import { render, screen } from '@testing-library/react'
import Footer from '../Footer.jsx'
import actualSitemap from '../../../data/sitemap.json'

test('render Footer without any props', () => {
    render(<Footer />)

    const footerElement = screen.getByRole('contentinfo')

    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveClass('footer')
})

test('render Footer with sitemap.json', () => {
    render(<Footer sitemap={actualSitemap} />)

    const footerElement = screen.getByRole('contentinfo')

    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveClass('footer')

    //expect sitemap column to exist
    const elementWithHomeText = screen.getByText(/sitemap/i)
    expect(elementWithHomeText).toBeInTheDocument()

    //expect all pages available to guests to be visible
    recursivelyIterateThroughPages(actualSitemap, (title) => {
        const titleElement = screen.getByText(new RegExp(`${title}`, 'i'))
        expect(titleElement).toBeInTheDocument()
    })
})

function recursivelyIterateThroughPages(pages, assertions) {
    Object.entries(pages).forEach(([key, page]) => {
        if (page && typeof page === 'object' && page.guests) {
            console.log(`Key: ${key}, Guests: ${page.guests}`)

            assertions(page.title)

            if (page.subpages) {
                console.log("contains subpages")
                recursivelyIterateThroughPages(page.subpages)
            }
        }
    })
}