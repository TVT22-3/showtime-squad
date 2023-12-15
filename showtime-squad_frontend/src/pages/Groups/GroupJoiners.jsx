import { signal } from "@preact/signals-react"
import { postRequest } from "../../utils/GenericHTTPMethods"

import FunctionButton from "../../components/atoms/FunctionButton"
import './GroupJoiners.scss'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupJoiners({ group, groupSignal }) {

    if (!group.joinRequests) {
        // user is not the owner
        return (
            <></>
        )
    }

    async function acceptJoin({ joiner, groupname }) {
        if (confirm(`Do you wish to accept user '${joiner}' into the group?`)) {
            const response = await postRequest({
                url: `${apiUrl}/api/group/accept`,
                body: { another: joiner, groupname: groupname }
            })

            if(response.status < 400) {
                //update signal
                groupSignal.value[0].push(joiner)
                groupSignal.value[1] = groupSignal.value[1].filter(item => item !== joiner)
                groupSignal.value = [...groupSignal.value]
            }

            return response
        }
    }

    async function declineJoin({ joiner, groupname }) {
        console.error("UNIMPLEMENTED function 'declineJoin'")
    }

    return (
        <section className='group-joiners'>
            <h4>Join requests:</h4>
            {groupSignal.value[1].length < 1 ? <>No requests</> :
                <ul className="grid-user-list">{
                    groupSignal.value[1].map((joiner, index) => {
                        const acceptSig = signal("")
                        const declineSig = signal("")
                        return (
                            <li key={index} className='user joiner inline'>
                                <p className="name"><a href={`profile/${joiner}`}>{joiner}</a></p>

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
                            </li>
                        )
                    })
                } </ul>
            }
        </section>
    )
}

export default GroupJoiners