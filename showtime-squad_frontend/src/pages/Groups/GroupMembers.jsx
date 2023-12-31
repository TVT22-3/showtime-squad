import { signal } from '@preact/signals-react'
import { postRequest } from '../../utils/GenericHTTPMethods'

import FunctionButton from "../../components/atoms/FunctionButton"

import './GroupMembers.scss'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupMembers({ group, username, groupSignal }) {

    async function removeMember({ toRemove, groupname }) {
        if (confirm(`Do you wish to remove user '${toRemove}'?`)) {
            const response = await postRequest({
                url: `${apiUrl}/api/group/remove`,
                body: { another: toRemove, groupname: groupname }
            })

            if(response.status < 400) {
                //update signal
                groupSignal.value[0] = groupSignal.value[0].filter(item => item !== toRemove)
                groupSignal.value = [...groupSignal.value]
            }

            return response;
        } else {
            // const response = { status: -1 }
            // return response
        }
    }

    return (
        <section className="group-members">
            <h4>Members:</h4>
            <ul className="grid-user-list">
                {!groupSignal.value ? 'Error' : (
                    <>
                        {groupSignal.value[0].map((user, index) => {
                            const removeSig = signal("")
                            return (
                                <li key={index} className='user member inline'>
                                    <p className="name"><a href={`profile/${user}`}>{user}</a></p>

                                    {user !== group.owner && username == group.owner ?
                                        <div className="action-buttons">
                                            <FunctionButton onClick={async () => {
                                                const response = await removeMember({
                                                    toRemove: user,
                                                    groupname: group.groupname
                                                })
                                                removeSig.value = response.status < 400 ? 'Success!' : response.status
                                            }} text='❌' displayError={removeSig} />
                                        </div>
                                        : <></>}
                                </li>
                            )
                        })}
                    </>
                )}
            </ul>
        </section>
    )
}

export default GroupMembers