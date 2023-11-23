import "./MovieBlocks.scss"
import MovieBlock from "../atoms/MovieBlock.jsx"

function MovieBlocks() {

    return (
        <section className='movie-blocks'>
            {generateBlocks(<MovieBlock />, 5)}
        </section>
    )
}

function generateBlocks(component, count) {
    let blocks = []
    for (let i = 0; i < count; i++) {
        blocks.push(component)
    }
    return blocks
}

export default MovieBlocks