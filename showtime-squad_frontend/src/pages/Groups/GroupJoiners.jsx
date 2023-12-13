import { signal } from "@preact/signals-react"
import { postRequest } from "../../utils/GenericHTTPMethods"

import FunctionButton from "../../components/atoms/FunctionButton"
import './GroupJoiners.scss'

const joinerSig = signal()

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupJoiners({ group }) {

    if (!group.joinRequests) {
        // user is not the owner
        return (
            <></>
        )
    }

    if (!joinerSig.value) {
        joinerSig.value = group.joinRequests
    }


    async function acceptJoin({ joiner, groupname }) {
        if (confirm(`Do you wish to accept user '${joiner}' into the group?`)) {
            const response = await postRequest({
                url: `${apiUrl}/api/group/accept`,
                body: { another: joiner, groupname: groupname }
            })

            if(response.status < 400) {
                //update signal
                joinerSig.value = joinerSig.value.filter(item => item !== joiner)
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
            {joinerSig.value.length < 1 ? <>No requests</> :
                <ul className="grid-user-list">{
                    joinerSig.value.map((joiner, index) => {
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