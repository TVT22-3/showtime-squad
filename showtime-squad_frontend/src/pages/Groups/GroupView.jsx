import { signal } from '@preact/signals-react'

import FunctionButton from '../../components/atoms/FunctionButton'
import { getRequest, postRequest, getXML } from '../../utils/GenericHTTPMethods'
import './GroupView.scss'
import NewsBlock from '../../components/containers/NewsBlock'
import AddNewsModal from './AddNewsModal'
import GroupNews from './GroupNews'
import GroupJoiners from './GroupJoiners'
import GroupMembers from './GroupMembers'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupView({ group, username }) {

    if (!group.owner) {
        return (
            <div className='group-view'>
                <div className='join-notice inline'>
                    <p>Not a member. Request to join:</p>
                    {(() => {
                        const joinSig = signal('');
                        return (
                            <FunctionButton onClick={async () => {
                                await requestToJoin({ groupname: group.groupname, signal: joinSig })
                            }}
                                text='💪' displayError={joinSig} />
                        )
                    })()}
                </div>
            </div>
        )
    }

    return (
        <div className='group-view'>
            <h5 className="group-owner">owner: {!group.owner ? 'Error' : <>{group.owner}</>}</h5>

            <GroupMembers group={group} username={username} />
            {/* <section className="group-members">
                members:
                <ul>
                    {!group.users ? 'Error' : (
                        <>
                            {group.users.map((user, index) => {
                                const removeSig = signal("")
                                return (
                                    <li key={index} className='user member inline'>
                                        {user}
                                        {user !== group.owner && username == group.owner ?
                                            <FunctionButton onClick={async () => {
                                                const response = await removeMember({
                                                    toRemove: user,
                                                    groupname: group.groupname
                                                })
                                                removeSig.value = response.status < 400 ? 'Success!' : response.status
                                            }} text='❌' displayError={removeSig} />
                                            : <></>}
                                    </li>
                                )
                            })}
                        </>
                    )}
                </ul>
            </section> */}

            {group.joinRequests ? (
                <GroupJoiners group={group} />
                // <section className='group-joiners'>
                //     join requests:
                //     <ul>
                //         {group.joinRequests.length < 1 ? <li>No requests</li> :
                //             (
                //                 group.joinRequests.map((joiner, index) => {
                //                     const acceptSig = signal("")
                //                     const declineSig = signal("")
                //                     return (
                //                         <li key={index} className='user joiner inline'>
                //                             {joiner}
                //                             {
                //                                 <FunctionButton onClick={async () => {
                //                                     const response = await acceptJoin({
                //                                         joiner: joiner,
                //                                         groupname: group.groupname
                //                                     })
                //                                     acceptSig.value = response.status < 400 ? 'Success!' : response.status
                //                                 }} text='✅' displayError={acceptSig} />
                //                             }
                //                             {
                //                                 <FunctionButton onClick={async () => {
                //                                     const response = await declineJoin({
                //                                         joiner: joiner,
                //                                         groupname: group.groupname
                //                                     })
                //                                     declineSig.value = response.status < 400 ? 'Success!' : response.status
                //                                 }} text='❌' displayError={declineSig} />
                //                             }
                //                         </li>)
                //                 })
                //             )}
                //     </ul>
                // </section>
            ) : <></>}

            <GroupNews group={group} />
            {/* <section className="group-news">
                <div className='news-notice inline'>
                    <p>news:</p>
                    {(() => {
                        const openModal = signal(false)
                        const newsInfo = signal('')

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
                            group.news.map((news, index) => {
                                const newsInfo = signal('')
                                const removeNewsSig = signal('')

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

                                fetchNews({ id: news, signal: newsInfo })

                                return (<li key={index}>
                                    <NewsBlock news={news} signal={newsInfo} />

                                    <FunctionButton onClick={async () => {
                                        const response = await removeNews({
                                            news: index,
                                            groupname: group.groupname
                                        })
                                        removeNewsSig.value = response.status < 400 ? 'Success!' : response.status
                                    }} text='❌' displayError={removeNewsSig} />
                                </li>
                                )
                            })
                        }</ul>
                }
            </section> */}
        </div>
    )
}

async function removeNews({ news, groupname }) {
    const response = await postRequest({
        url: `${apiUrl}/api/group/news/remove-index`,
        body: { news: news, groupname: groupname }
    });
    return response;
}

async function requestToJoin({ groupname, signal }) {
    const response = await postRequest({
        url: `${apiUrl}/api/group/join`,
        body: { groupname: groupname }
    });
    signal.value = response.status < 400 ? 'Success!' : response.status
}

async function removeMember({ toRemove, groupname }) {
    const response = await postRequest({
        url: `${apiUrl}/api/group/remove`,
        body: { another: toRemove, groupname: groupname }
    });
    return response;
}

async function acceptJoin({ joiner, groupname }) {
    const response = await postRequest({
        url: `${apiUrl}/api/group/accept`,
        body: { another: joiner, groupname: groupname }
    });
    return response;
}

async function declineJoin({ joiner, groupname }) {
    console.error("UNIMPLEMENTED function 'declineJoin'")
}

export default GroupView