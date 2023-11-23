import "./MovieBlocks.scss"
import MovieBlock from "../atoms/MovieBlock.jsx"

function MovieBlocks() {

    return (
        <section className='movie-blocks'>
            {generateBlocks(5)}
        </section>
    )
}

function generateBlocks(count) {
    let blocks = []
    for (let i = 0; i < count; i++) {
        blocks.push(<MovieBlock key={i}/>);
    }
    return blocks
}

export default MovieBlocks