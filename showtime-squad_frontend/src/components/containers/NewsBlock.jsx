import './NewsBlock.scss'

function NewsBlock({ signal }) {

    return (
        <div className='news-block'>
            <div className='news-title'>
                <h6>{signal.value.title ? signal.value.title : '???'}</h6>
            </div>
            <p className='news-content'>{signal.value.synopsis ? signal.value.synopsis : '...'}</p>
            <a href={signal.value.url ? signal.value.url : '#'}>Read more...</a>
        </div>
    )
}



export default NewsBlock