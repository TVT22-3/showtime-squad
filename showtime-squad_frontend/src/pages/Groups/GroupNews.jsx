import { signal } from "@preact/signals-react"
import { getXML, postRequest } from "../../utils/GenericHTTPMethods"

import NewsBlock from "../../components/containers/NewsBlock"
import AddNewsModal from "./AddNewsModal"
import FunctionButton from "../../components/atoms/FunctionButton"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupNews({ group }) {

    return (
        <section className="group-news">
            <div className='news-notice inline'>
                <p>news:</p>
                {(() => {
                    const openModal = signal(false)
                    const newsInfo = signal('')

                    // async function fetchAllNews({ signal }) {
                    //     const response = await getXML({ url: `https://www.finnkino.fi/xml/Events/` })

                    //     const eventTitles = [];
                    //     const titleNodes = await response.xml.querySelectorAll('Title');
                    //     const eventIdNodes = await response.xml.querySelectorAll('ID');

                    //     for (let i = 0; i < titleNodes.length; i++) {
                    //         const title = titleNodes[i];
                    //         const eventID = eventIdNodes[i];

                    //         eventTitles.push({ eventID, title });
                    //     }

                    //     signal.value = eventTitles
                    // }

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
                !group.news ? 'No news' :
                    <ul>{
                        group.news.toReversed().map((news, index) => {
                            const invertedIndex = group.news.length - 1 - index;

                            const newsInfo = signal('')
                            const removeNewsSig = signal('')

                            // async function fetchNews({ id, signal }) {
                            //     const response = await getXML({ url: `https://www.finnkino.fi/xml/Events/?eventID=${id}` })

                            //     const eventTitle = await response.xml.querySelector('Title');
                            //     const eventURL = await response.xml.querySelector('EventURL');
                            //     const eventSynopsis = await response.xml.querySelector('ShortSynopsis');

                            //     const newsPackage = {
                            //         title: eventTitle ? eventTitle.innerHTML : '???',
                            //         url: eventURL ? eventURL.innerHTML : '#',
                            //         synopsis: eventSynopsis ? eventSynopsis.innerHTML : '...'
                            //     }
                            //     signal.value = newsPackage
                            // }

                            fetchNews({ id: news, signal: newsInfo })

                            return (<li key={index}>
                                <NewsBlock news={news} signal={newsInfo} />

                                <FunctionButton onClick={async () => {
                                    const response = await removeNews({
                                        news: invertedIndex,
                                        groupname: group.groupname
                                    })
                                    removeNewsSig.value = response.status < 400 ? 'Success!' : response.status
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
    const titleNodes = await response.xml.querySelectorAll('Title');
    const eventIdNodes = await response.xml.querySelectorAll('ID');

    for (let i = 0; i < titleNodes.length; i++) {
        const title = titleNodes[i];
        const eventID = eventIdNodes[i];

        eventTitles.push({ eventID, title });
    }

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
    const response = await postRequest({
        url: `${apiUrl}/api/group/news/remove-index`,
        body: { news: news, groupname: groupname }
    });
    return response;
}

export default GroupNews