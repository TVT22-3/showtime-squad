import { signal } from '@preact/signals-react'

import { getRequest } from "../../utils/GenericHTTPMethods"
import GroupBlock from "./GroupBlock"
import CreateGroupModal from "./CreateGroupModal"

import './GroupList.scss'
import FunctionButton from "../../components/atoms/FunctionButton"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

const groups = signal("No groups")
{ (async () => { groups.value = await fetchGroups() })() }

const openModal = signal(false)

function GroupList() {

    return (
        <>
            <main id="group-list">
                <div className='max-wrapper'>
                    <CreateGroupModal open={openModal} />
                    <FunctionButton onClick={() => { openModal.value = !openModal.value }} text={'Create New ➕'} />

                    <div className='group-grid'>
                        {groups.value}
                    </div>
                </div>
            </main>
        </>
    )
}

async function fetchGroups() {
    try {
        const response = await getRequest({ url: apiUrl + "/api/group/" })
        if (response && response.groups) {
            // handle singleton
            const groups = Array.isArray(response.groups) ? response.groups : [response.groups];

            const showSigList = {}
            const groupList = groups.map(function (group, index) {
                const showSig = signal(false);
                const groupSig = signal();

                showSigList[index] = showSig

                return (
                    <GroupBlock key={index} name={group} showSignal={showSigList} groupSignal={groupSig} index={index}/>
                );
            });

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