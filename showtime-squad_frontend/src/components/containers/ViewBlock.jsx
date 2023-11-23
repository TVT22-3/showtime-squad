import './ViewBlock.scss'
import MovieBlocks from './MovieBlocks.jsx'

function ViewBlock() {
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <article className='view-block'>
            <div className='action-row'>
                <div className='title'>
                    <h6>Title</h6>
                </div>

                <div className='options'>
                    <ul className='edit menu-indicator'>
                        <li className='dropdown'>
                            📝
                            <ul className='dropdown-content'>
                                <li className='dropdown'>Type
                                    <ul className='types dropdown-content dropdown-options'>
                                        <li className='active'>Top Movies</li>
                                        <li>Favorites</li>
                                        <li>Favorites</li>
                                        <li>Favorites</li>
                                        <li>Favorites</li>
                                        <li>Favorites</li>
                                        <li>Favorites</li>
                                    </ul>
                                </li>
                                <li className='size dropdown'>Size
                                    <ul className='dropdown-content'>
                                        <li>width</li>
                                        <li>height</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className='remove menu-indicator'>
                        <li className='remove dropdown'>
                            ❌
                            <ul className='dropdown-content dropdown-options'>
                                <li>Reset</li>
                                <li>Remove</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='content'>
                <MovieBlocks />
            </div>
        </article>
    )
}

export default ViewBlock