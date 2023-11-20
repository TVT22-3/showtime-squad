// path: showtime-squad_frontend/src/components/ui/NavBar.jsx

import './NavBar.css'
import sitemap from '../../data/sitemap.json'

const sitemapArray = Object.values(sitemap)
//console.log(sitemapArray)
const loginStatus = false // placeholder for login status
console.log("placeholder login status is set to: " + loginStatus)

function NavElement(sitemapKey) {
    // Used to create a nav element for the NavBar component
    const show = sitemapKey.show;
    const subpages = hasKey(sitemapKey, "subpages")
    console.log(subpages)
    console.log("component partly implemented")

    // guard clause to check if the user is logged in and if the element is for guests only
    if ((show=="user"&&loginStatus==false)||(show=="guest"&&loginStatus==true)){
        return null;
    }
    return (
        <li className={subpages ? 'dropdown' : ''}>
            <a href={sitemapKey.path}>{sitemapKey.title}</a>
            {subpages ? 
            <ul className='dropdown-content'>
                {Object.values(sitemapKey.subpages).map((key) => (
                    SubElement(key)
                ))}
            </ul> : null}
        </li>
    )
}

function SubElement(submapKey) {
    console.log("in subelement")
    console.log(submapKey)
    const show = submapKey.show;
    console.log(show)
    
    // guard clause
    if ((show=="user"&&loginStatus==false)||(show=="guest"&&loginStatus==true)){
        return null;
    }
    return (
        <li>
            <a href={submapKey.path}>{submapKey.title}</a>
        </li>
    )
}

function hasKey(obj, key) {
    // Used to check if a key exists in an object
    console.log("component might not be properly implemented yet")
    return Object.prototype.hasOwnProperty.call(obj, key)
}

function NavBar() {
    //TODO: Implement
    console.log("component might not be fully implemented yet")
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
