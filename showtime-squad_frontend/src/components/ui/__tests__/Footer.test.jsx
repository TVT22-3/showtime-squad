import { render, screen } from '@testing-library/react'
import Footer from '../Footer.jsx'
import actualSitemap from '../../../data/sitemap.json'

test('render Footer without any props', () => {
    render(<Footer />)

    const footerElement = screen.getByRole('contentinfo')

    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveClass('footer')
})

test('render Footer with sitemap.json as guest', () => {
    render(<Footer sitemap={actualSitemap} loggedIn={false} />)

    const footerElement = screen.getByRole('contentinfo')

    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveClass('footer')

    //expect sitemap column to exist
    const elementWithHomeText = screen.getByText(/sitemap/i)
    expect(elementWithHomeText).toBeInTheDocument()

    //expect all pages available to guests to be visible
    recursivelyIterateThroughPages(actualSitemap, false, (title) => {
        const titleElements = screen.getAllByText(new RegExp(`${title}`, 'i'))
        expect(titleElements.length).toBeGreaterThan(0)
    })
})

test('render Footer with sitemap.json as user', () => {
    render(<Footer sitemap={actualSitemap} loggedIn={true} />)

    const footerElement = screen.getByRole('contentinfo')

    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveClass('footer')

    //expect sitemap column to exist
    const elementWithHomeText = screen.getByText(/sitemap/i)
    expect(elementWithHomeText).toBeInTheDocument()

    //expect all pages available to guests to be visible
    recursivelyIterateThroughPages(actualSitemap, true, (title) => {
        const titleElements = screen.getAllByText(new RegExp(`${title}`, 'i'))
        expect(titleElements.length).toBeGreaterThan(0)
    })
})

function recursivelyIterateThroughPages(pages, loggedIn, assertions) {
    Object.entries(pages).forEach(([key, page]) => {
        // guard clause to check if user is logged in
        if (page.show &&
            (!loggedIn && page.show === 'user') || (loggedIn && page.show === 'guest')) {
            return
        }

        // check if page contains subpages
        if (page.subpages) {
            // recurse into subpages
            return (
                recursivelyIterateThroughPages(page.subpages, loggedIn, assertions)
            )
        } else {
            // recursion stops when no more subpages are met
            assertions(page.title)
        }
    })
}
