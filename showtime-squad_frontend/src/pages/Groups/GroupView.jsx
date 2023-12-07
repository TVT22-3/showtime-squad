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
        if(showSignal.value === false) {
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
                {showSignal.value ? <Idklol group={groupSignal.value}/> : <></>}
                <button onClick={handleShow}>Click me</button>
            </section>
        </>
    )
}

function Idklol({group}) {
    return (
        <>
            {!group || !group.groupname ? 'Error' : <>'Group name: ' {group.groupname}</> }
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