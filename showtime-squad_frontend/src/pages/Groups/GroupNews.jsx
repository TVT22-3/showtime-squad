import { signal } from "@preact/signals-react"
import { getXML, postRequest } from "../../utils/GenericHTTPMethods"

import NewsBlock from "../../components/containers/NewsBlock"
import AddNewsModal from "./AddNewsModal"
import FunctionButton from "../../components/atoms/FunctionButton"

import './GroupNews.scss'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupNews({ group }) {

    let newsSig
    if (!newsSig || !newsSig.value) {
        newsSig = signal()
        newsSig.value = group.news
    }

    function removeNewsAtIndex({ index }) { // TODO:
        newsSig.value = newsSig.value.filter((_, i) => i !== index)
    }
    
    return (
        <section className="group-news">
            <h4>News:</h4>
            <div className='news-notice inline'>
                {(() => {
                    const openModal = signal(false)
                    const newsInfo = signal('')

                    fetchAllNews({ signal: newsInfo })

                    return (
                        <>
                            <AddNewsModal open={openModal} newsInfo={newsInfo} groupname={group.groupname} />
                            <FunctionButton onClick={() => { openModal.value = !openModal.value }} text={'Add News 📋'} />
                        </>)
                })()
                }
            </div>
            {
                !newsSig.value || newsSig.value.length < 1 ? 'No news' :
                    <ul className="group-news-grid">{
                        newsSig.value.toReversed().map((news, index) => {
                            const invertedIndex = newsSig.value.length - 1 - index;

                            const newsInfo = signal('')
                            const removeNewsSig = signal('')

                            fetchNews({ id: news, signal: newsInfo })

                            return (<li key={index} className="news-item">
                                <NewsBlock news={news} signal={newsInfo} />

                                <FunctionButton onClick={async () => {
                                    const response = await removeNews({
                                        news: invertedIndex,
                                        groupname: group.groupname
                                    })
                                    removeNewsSig.value = response.status < 400 ? 'Success!' : response.status

                                    if (response.status < 400) {
                                        removeNewsAtIndex({ index: invertedIndex })
                                    }
                                }} text='❌' displayError={removeNewsSig} />
                            </li>
                            )
                        })
                    }</ul>
            }
        </section>
    )
}

async function fetchAllNews({ signal }) {
    const response = await getXML({ url: `https://www.finnkino.fi/xml/Events/` })

    const eventTitles = [];
    const eventNodes = await response.xml.querySelectorAll('Event');

    eventNodes.forEach((eventNode) => {
        const title = eventNode.querySelector('Title')
        const eventID = eventNode.querySelector('ID')

        eventTitles.push({ eventID, title })
    })

    signal.value = eventTitles
}

async function fetchNews({ id, signal }) {
    const response = await getXML({ url: `https://www.finnkino.fi/xml/Events/?eventID=${id}` })

    const eventTitle = await response.xml.querySelector('Title');
    const eventURL = await response.xml.querySelector('EventURL');
    const eventSynopsis = await response.xml.querySelector('ShortSynopsis');

    const newsPackage = {
        title: eventTitle ? eventTitle.innerHTML : '???',
        url: eventURL ? eventURL.innerHTML : '#',
        synopsis: eventSynopsis ? eventSynopsis.innerHTML : '...'
    }
    signal.value = newsPackage
}

async function removeNews({ news, groupname }) {
    if (confirm(`Do you wish to remove news at index '${news}'?`)) {
        const response = await postRequest({
            url: `${apiUrl}/api/group/news/remove-index`,
            body: { news: news, groupname: groupname }
        });
        return response;
    }
}

export default GroupNews