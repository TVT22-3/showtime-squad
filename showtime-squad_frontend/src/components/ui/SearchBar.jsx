import React, { useState, useEffect } from 'react';
import './SearchBar.scss'

function SearchBar() {


    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 675) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <search id="search-bar" className={`${isScrolled ? 'scrolled' : ''}`}>
            <form id='search-form' className='search-form' method='GET' action='/movies'>
                <input id='example-search' name='param' type='text' placeholder='Search...' />
                <button id={`${isScrolled ? 'scrolled' : ''}`} type='submit'><i className='fa fa-search'></i></button>
            </form>
        </search>
    )
}

export default SearchBar