// path: showtime-squad_frontend/src/components/ui/NavBar.jsx
import React from 'react'
import './FilterBar.scss'
import sitemap from '../../data/sitemap.json'

const sitemapArray = Object.values(sitemap)

function NavElement(sitemapKey) {
  const show = sitemapKey.show
  const subpages = hasKey(sitemapKey, "subpages")

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
  const show = submapKey.show

 

  return (
    <li key={submapKey.title}>
      <a href={submapKey.path}>{submapKey.title}</a>
    </li>
  )
}

function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

function FilterBar() {
  
  const filteredSitemapArray = sitemapArray.filter(
    (key) => key.title.toLowerCase() === 'top rated' || key.title.toLowerCase() === 'popular'
  )

  return (
    <nav id='nav-bar'>
      <ul className='nav-items'>
        {filteredSitemapArray.map((key) => (
          <React.Fragment key={key.title}>
            {NavElement(key)}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  )
}

export default FilterBar
