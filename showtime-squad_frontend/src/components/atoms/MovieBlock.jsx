import "./MovieBlocks.scss"

function MovieBlock({imgUrl, linkUrl, title, rating}) {
    
    return (
        <section className='movie-block'>
            <div>
                <img src={imgUrl} alt={`${title}_poster`} />
            </div>

            
        </section>
    )
}

export default MovieBlock