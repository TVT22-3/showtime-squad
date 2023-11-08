import './SearchBar.css'

function SearchBar() {
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <search className='search-bar'>
            <form id='search-form' className='search-form' method='GET' action='/movies'>
                <input id='example-search' name='param' type='text' placeholder='Search...' />
                <button type='submit'><i className='fa fa-search'></i></button>
            </form>
        </search>
    )
}

export default SearchBar