import { Routes, Route } from "react-router-dom"
import { signal } from '@preact/signals-react'

import { deleteRequest, getRequest, postRequest } from "../../utils/GenericHTTPMethods"
import { useUser } from '../../context/UserContext';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupView({ name = "", showSignal, groupSignal }) {
    if (showSignal == null || groupSignal == null) {
        throw new Error("Specified (individual) signals are mandatory")
    }

    const { username } = useUser()

    async function handleShow() {
        showSignal.value = !showSignal.value
        if (showSignal.value === false) {
            return
        }

        const group = await fetchGroup(name, username)
        if (!group) {
            console.error("Could not fetch group")
            return;
        }

        console.log(group)
        groupSignal.value = group
    }

    return (
        <>
            <section>
                {name} - {showSignal.value ? 'show please' : 'dont show'}
                <button onClick={handleShow}>Click me</button>

                {showSignal.value ? <Idklol group={groupSignal.value} /> : <></>}
            </section>
        </>
    )
}

function Idklol({ group }) {
    if (!group) {
        return (
            <>
                <p>Not a member.</p>
            </>
        )
    }

    return (
        <>
            <h4 className="group-name">Group name: {!group.groupname ? 'Error' : <>{group.groupname}</>}</h4>
            <h5 className="group-owner">owner: {!group.owner ? 'Error' : <>{group.owner}</>}</h5>
            <section className="group-members">
                members:
                <ul>
                    {!group.users ? 'Error' : (
                        <>
                            {group.users.map((user, index) => {
                                return <li key={index}>{user}</li>
                            })}
                        </>
                    )}
                </ul>
            </section>
            <section className="group-news">news: {!group.news ? 'No news' : <>{group.news}</>}</section>
            {group.joinRequests ? (
                <section>
                    join requests:
                    <ul>
                        {group.joinRequests.length < 1 ? <li>No requests</li> :
                            (
                                group.joinRequests.map((joiner, index) => {
                                    return <li key={index}>{joiner}</li>
                                })
                            )}
                    </ul>
                </section>
            ) : <></>}
        </>
    )
}

async function fetchGroup(name, username) {
    try {
        const response = await getRequest({ url: `${apiUrl}/api/group/${name}` })
        if (response && response.groupname) {
            // seems valid
            if (username && response.owner && username == response.owner) {
                //is owner
                console.log("is owner!")
                const joiners = await postRequest({
                    url: `${apiUrl}/api/group/requests`,
                    body: { groupname: response.groupname }
                });

                console.log("joiners: ", joiners)
                if (joiners) {
                    response.joinRequests = joiners.joinRequests;
                } else {
                    throw new Error("Could not fetch joiners")
                }
            }

            console.log("____", response)

            return response;
        }

        return null;
    } catch (error) {
        console.error("Error fetching groups:", error);
        // Handle error if fetchGroups fails
        return null;
    }
}

export default GroupView