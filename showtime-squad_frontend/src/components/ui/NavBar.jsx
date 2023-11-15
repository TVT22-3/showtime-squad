// path: showtime-squad_frontend/src/components/ui/NavBar.jsx

import './NavBar.css'
import sitemap from '../../data/sitemap.json'

const sitemapArray = Object.values(sitemap)
//console.log(sitemapArray)
const guestStatus = true // placeholder

function NavElement(sitemapKey) {
    // Used to create a nav element for the NavBar component
    const guest = sitemapKey.guests; //(not yet properly implemented)
    const subpages = hasKey(sitemapKey, "subpages")
    console.log("component partly implemented")
    if ((sitemapKey.title=="profile"&&guestStatus==false)||(sitemapKey.title=="sign-in"&&guestStatus==true)){
        return (
            <li className={subpages ? "dropdown" : ""}>
                <a href={sitemapKey.path}>{sitemapKey.title}</a>
            </li>
        )
    } else if (sitemapKey.title=="sign-in"){
        return null
    } else if ((guest == guestStatus)||guest) {
        return (
            <li className={subpages ? "dropdown" : ""}>
                <a href={sitemapKey.path}>{sitemapKey.title}</a>
            </li>
        )
    } else {
        return null
    }
}

function hasKey(obj, key) {
    // Used to check if a key exists in an object
    console.log("component might not be properly implemented yet")
    return Object.prototype.hasOwnProperty.call(obj, key)
}

function NavBar() {
    //TODO: Implement
    console.log("component might not be properly implemented yet")
    //console.log(sitemapArray)
    return (
        <nav className='nav-bar'>
            <ul className='nav-items'>
                {sitemapArray.map((key) => {
                    const subpages = hasKey(key, "subpages");
                    return (
                        <>
                        {NavElement(key)}
                            {subpages ? (
                                <ul className="dropdown-content">
                                    {Object.values(key.subpages).map((subKey) => NavElement(subKey))}
                                </ul>
                            ) : null}
                        </>
                    );
                })}
            </ul>
        </nav>

    )
}

export default NavBar