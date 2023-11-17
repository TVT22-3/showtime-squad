// path: showtime-squad_frontend/src/components/ui/NavBar.jsx

import './NavBar.css'
import sitemap from '../../data/sitemap.json'

const sitemapArray = Object.values(sitemap)
//console.log(sitemapArray)
const guestStatus = false // placeholder

function NavElement(sitemapKey) {
    // Used to create a nav element for the NavBar component
    const guest = sitemapKey.guests;
    const subpages = hasKey(sitemapKey, "subpages")
    console.log("component partly implemented")

    if ((sitemapKey.title=="profile"&&guestStatus==true)||(sitemapKey.title=="sign-in"&&guestStatus==false)){
        return null
    } else if ((guest == guestStatus)||guest) {
        return (
            <li className={subpages ? "dropdown" : ""}>
                <a href={sitemapKey.path}>{sitemapKey.title}</a>
                {subpages ? 
                <ul className='dropdown-content'>
                    {(Object.values(sitemapKey.subpages).map((key) => {SubElement(key)}))}
                </ul> : null}
            </li>
        )
    } else {
        return null
    }
}

function SubElement(sitemapKey) {
    const guest = sitemapKey.guests;
    if (guest == guestStatus||guest) {
        return (
            <li>
                <a href={sitemapKey.path}>{sitemapKey.title}</a>
            </li>
        )
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
                    return (
                        <>
                        {NavElement(key)}
                        </>
                    );
                })}
            </ul>
        </nav>

    )
}

export default NavBar