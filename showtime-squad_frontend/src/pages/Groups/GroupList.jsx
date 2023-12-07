import { Routes, Route } from "react-router-dom"
import { signal } from '@preact/signals-react'

import { deleteRequest, getRequest } from "../../utils/GenericHTTPMethods"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

const groups = signal(["No groups"])
groups.value = await fetchGroups()

function GroupList() {
    // TODO: Implement
    console.log("component not properly implemented")
    return (
        <>
            <div>asdasdasdasdasd</div>
            <div>{groups.value}</div>
        </>
    )
}

async function fetchGroups() {
    try {
        const response = await getRequest({ url: apiUrl + "/api/group/" })
        if (response && response.groups) {
            // handle singleton
            const groups = Array.isArray(response.groups) ? response.groups : [response.groups];

            const groupList = groups.map(function (group, index) {
                return <li key={index}>{group}</li>;
            });

            console.log("in fetch:", groups)

            return groupList;
        }

        return null;
    } catch (error) {
        console.error("Error fetching groups:", error);
        // Handle error if fetchGroups fails
        return null;
    }
}

export default GroupList