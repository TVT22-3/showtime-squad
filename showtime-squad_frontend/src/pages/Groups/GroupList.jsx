import { Routes, Route } from "react-router-dom"

import { getRequest } from "../../utils/GenericHTTPMethods"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupList() {
    // TODO: Implement
    console.log("component not properly implemented")

    generateGroups()

    return (
        <>
            <div>asdasdasdasdasd</div>
        </>
    )
}

async function generateGroups() {
    await fetchGroups()
    return (<div>qqqq</div>)
}

async function fetchGroups() {
    console.log("ASDASD", apiUrl + "/api/group/")
    const response = await getRequest(apiUrl + "/api/group/")
    console.log(response)
}

export default GroupList