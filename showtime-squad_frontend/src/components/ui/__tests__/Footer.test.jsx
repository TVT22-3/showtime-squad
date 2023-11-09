import { render, screen } from '@testing-library/react'
import Footer from '../Footer.jsx'

test('render Footer without any props', () => {
    render(<Footer />)

    const footerElement = screen.getByRole('contentinfo')

    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveClass('footer')
})