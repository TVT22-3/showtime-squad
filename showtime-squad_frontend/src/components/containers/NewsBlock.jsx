import { getXML } from '../../utils/GenericHTTPMethods';

function NewsBlock({ signal }) {

    return (
        <div>
            <h6>{signal.value.title ? signal.value.title : '???'}</h6>
            <p>{signal.value.synopsis ? signal.value.synopsis : '...'}</p>
            <a href={signal.value.url ? signal.value.url : '#'}>Read more...</a>
        </div>
    )
}



export default NewsBlock