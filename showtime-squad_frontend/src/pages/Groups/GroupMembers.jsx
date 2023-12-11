import { signal } from '@preact/signals-react'
import { postRequest } from '../../utils/GenericHTTPMethods'

import FunctionButton from "../../components/atoms/FunctionButton"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupMembers({ group, username }) {

    return (
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
    )
}

async function removeMember({ toRemove, groupname }) {
    const response = await postRequest({
        url: `${apiUrl}/api/group/remove`,
        body: { another: toRemove, groupname: groupname }
    });
    return response;
}

export default GroupMembers