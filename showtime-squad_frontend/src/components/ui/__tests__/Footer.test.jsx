import { render, screen } from '@testing-library/react'
import Footer from '../Footer.jsx'
import actualSitemap from '../../../data/sitemap.json'
import { UserProvider } from "../../../context/UserContext.jsx";
import { AuthProvider } from '../../../context/AuthContext.jsx';

test('render Footer without any props', () => {
    render(
    <AuthProvider>
    <UserProvider>
      <Footer />
    </UserProvider>
    </AuthProvider>
  )

    const footerElement = screen.getByRole('contentinfo')

    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveClass('footer')
})

test('render Footer with sitemap.json as guest', () => {
    render(
    <AuthProvider>
    <UserProvider test={false}>
    <Footer sitemap={actualSitemap} />
    </UserProvider>
    </AuthProvider>
    )

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
    render(
        <AuthProvider>
        <UserProvider test={true}>
        <Footer sitemap={actualSitemap} />
        </UserProvider>
        </AuthProvider>
        )

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

function recursivelyIterateThroughPages(pages, loginStatus, assertions) {
    Object.entries(pages).forEach(([key, page]) => {
        // guard clause to check if user is logged in
        if (page.show &&
            (!loginStatus && page.show === 'user') || (loginStatus && page.show === 'guest')) {
            return
        }

        // check if page contains subpages
        if (page.subpages) {
            // recurse into subpages
            return (
                recursivelyIterateThroughPages(page.subpages, loginStatus, assertions)
            )
        } else {
            // recursion stops when no more subpages are met
            assertions(page.title)
        }
    })
}
