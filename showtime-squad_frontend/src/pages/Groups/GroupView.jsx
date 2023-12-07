import { Routes, Route } from "react-router-dom"
import { signal } from '@preact/signals-react'

import { deleteRequest, getRequest } from "../../utils/GenericHTTPMethods"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupView({ name = "", showSignal, groupSignal }) {
    if (showSignal == null || groupSignal == null) {
        throw new Error("Specified (individual) signals are mandatory")
    }

    async function handleShow() {
        showSignal.value = !showSignal.value
        if (showSignal.value === false) {
            return
        }

        const group = await fetchGroup(name)
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
        </>
    )
}

async function fetchGroup(name) {
    try {
        const response = await getRequest({ url: `${apiUrl}/api/group/${name}` })
        if (response && response.groupname) {
            // seems valid
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