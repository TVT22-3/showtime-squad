import { Routes, Route } from "react-router-dom"
import { signal } from '@preact/signals-react'

import { deleteRequest, getRequest, postRequest } from "../../utils/GenericHTTPMethods"
import { useUser } from '../../context/UserContext';

import GroupView from './GroupView'
import FunctionButton from '../../components/atoms/FunctionButton'

import './GroupBlock.scss'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupBlock({ name = "", showSignal, groupSignal }) {
    if (showSignal == null || groupSignal == null) {
        throw new Error("Specified (individual) signals are mandatory")
    }

    const { username } = useUser()

    async function handleShow() {
        showSignal.value = !showSignal.value
        if (showSignal.value === false) {
            return
        }

        const group = await fetchGroupInfo(name, username)
        if (!group) {
            console.error("Could not fetch group")
            return;
        }

        console.log(group)
        groupSignal.value = group
    }

    return (
        <>
            <section className="group-block">
                <div className="group-card">
                    <h4 className="group-name">{name}</h4>
                    <FunctionButton onClick={handleShow} text={showSignal.value ? 'hide' : 'show'} />
                </div>

                {showSignal.value ? <GroupView group={groupSignal.value} username={username} /> : <></>}
            </section>
        </>
    )
}

async function fetchGroupInfo(name, username) {
    try {
        const response = await getRequest({ url: `${apiUrl}/api/group/${name}` })
        if (response && response.groupname) {
            // response seems valid
            if (username && response.owner && username == response.owner) {
                //is owner, get join requests
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

            if (response.news && response.news.length > 0) {
                // fetch news
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

export default GroupBlock