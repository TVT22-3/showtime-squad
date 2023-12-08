import { signal } from '@preact/signals-react'

import FunctionButton from '../../components/atoms/FunctionButton'
import { postRequest } from '../../utils/GenericHTTPMethods'
import './GroupView.scss'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupView({ group, username }) {

    if (!group.owner) {
        const joinSig = signal('')
        return (
            <div className='group-view'>
                <div className='join-notice inline'>
                    <p>Not a member. Request to join:</p>
                    <FunctionButton onClick={
                        () => { requestToJoin({ groupname: group.groupname, signal: joinSig }) }
                    } text='💪' displayError={joinSig} />
                </div>
            </div>
        )
    }

    return (
        <div className='group-view'>
            <h5 className="group-owner">owner: {!group.owner ? 'Error' : <>{group.owner}</>}</h5>

            <section className="group-members">
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
            </section>

            {group.joinRequests ? (
                <section className='group-joiners'>
                    join requests:
                    <ul>
                        {group.joinRequests.length < 1 ? <li>No requests</li> :
                            (
                                group.joinRequests.map((joiner, index) => {
                                    const acceptSig = signal("")
                                    const declineSig = signal("")
                                    return (
                                        <li key={index} className='user joiner inline'>
                                            {joiner}
                                            {
                                                <FunctionButton onClick={async () => {
                                                    const response = await acceptJoin({
                                                        joiner: joiner,
                                                        groupname: group.groupname
                                                    })
                                                    acceptSig.value = response.status < 400 ? 'Success!' : response.status
                                                }} text='✅' displayError={acceptSig} />
                                            }
                                            {
                                                <FunctionButton onClick={async () => {
                                                    const response = await decline({
                                                        joiner: joiner,
                                                        groupname: group.groupname
                                                    })
                                                    declineSig.value = response.status < 400 ? 'Success!' : response.status
                                                }} text='❌' displayError={declineSig} />
                                            }
                                        </li>)
                                })
                            )}
                    </ul>
                </section>
            ) : <></>}

            <section className="group-news">
                news: {!group.news ? 'No news' : <>{group.news}</>}
            </section>
        </div>
    )
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