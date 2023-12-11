import { signal } from "@preact/signals-react"
import { postRequest } from "../../utils/GenericHTTPMethods"

import FunctionButton from "../../components/atoms/FunctionButton"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupJoiners({ group }) {

    if (!group.joinRequests) {
        // user is not the owner
        return (
            <></>
        )
    }

    return (
        <section className='group-joiners'>
            <p>join requests:</p>
            <ul className="grid-user-list">
                {group.joinRequests.length < 1 ? <li>No requests</li> :
                    (
                        group.joinRequests.map((joiner, index) => {
                            const acceptSig = signal("")
                            const declineSig = signal("")
                            return (
                                <li key={index} className='user joiner inline'>
                                    <p className="name">{joiner}</p>
                                    
                                    <div className="action-buttons">
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
                                            const response = await declineJoin({
                                                joiner: joiner,
                                                groupname: group.groupname
                                            })
                                            declineSig.value = response.status < 400 ? 'Success!' : response.status
                                        }} text='❌' displayError={declineSig} />
                                    }
                                    </div>
                                </li>)
                        })
                    )}
            </ul>
        </section>
    )
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

export default GroupJoiners