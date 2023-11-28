import "./MovieBlocks.scss"
import MovieBlock from "../atoms/MovieBlock.jsx"

function MovieBlocks() {

    console.log("Implement movie fetch cases")

    let movies = [];
    // switch (type) {
    //     case "favorites":
    //         // fetch favorite movies from db
    //         break;

    //     case "top movies":
    //         // fetch top movies from api
    //         break;
    // }

    return (
        <section className='movie-blocks'>
            {generateBlocks(5, movies)}
        </section>
    )
}

function generateBlocks(count, movies) {
    let blocks = []
    for (let i = 0; i < count; i++) {
        blocks.push(<MovieBlock key={i} />)
    }
    return blocks
}

export default MovieBlocks