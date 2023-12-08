import { signal } from '@preact/signals-react'

import FunctionButton from '../../components/atoms/FunctionButton'
import { postRequest } from '../../utils/GenericHTTPMethods'
import './GroupView.scss'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupView({ group, username }) {
    if (!group) {
        return (
            <div className='group-view'>
                <div className='join-notice inline'>
                    <p>Not a member. Request to join:</p> <FunctionButton onClick={requestToJoin} text='💪' />
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
                                return (
                                    <li key={index} className='user member inline'>
                                        {user}
                                        {user !== group.owner && username == group.owner ?
                                            <FunctionButton onClick={declineJoin} text='❌' />
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
                                                }} text='✅' displayError={acceptSig}/>
                                            }
                                            {
                                                <FunctionButton onClick={async () => {
                                                    const response = await decline({
                                                        joiner: joiner,
                                                        groupname: group.groupname
                                                    })
                                                    declineSig.value = response.status < 400 ? 'Success!' : response.status
                                                }} text='❌' displayError={declineSig}/>
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

async function requestToJoin() {

}

async function removeMember() {

}

async function acceptJoin({ joiner, groupname }) {
    const response = postRequest({
        url: `${apiUrl}/api/group/accept`,
        body: { another: joiner, groupname: groupname }
    });
    console.log("________", response)
    return response;
}

async function declineJoin({ joiner, groupname }) {
    console.error("UNIMPLEMENTED function 'declineJoin'")
}

export default GroupView