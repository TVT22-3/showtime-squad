import './NavBar.css'

function NavBar() {
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <nav className='nav-bar'>
                <ul className='nav-items'>
                    <li>Home</li>
                    <li className='dropdown'>Movies
                        <ul className='dropdown-content'>
                            <li>Movie Category</li>
                            <li>Movie Category</li>
                            <li>Movie Category</li>
                            <li>Movie Category</li>
                            <li>Movie Category</li>
                        </ul>
                    </li>
                    <li className='dropdown'>News
                        <ul className='dropdown-content'>
                            <li>News Category</li>
                            <li>News Category</li>
                            <li>News Category</li>
                            <li>News Category</li>
                            <li>News Category</li>
                        </ul>
                    </li>
                    <li>Profile</li>
                </ul>
            </nav>

    )
}

export default NavBar