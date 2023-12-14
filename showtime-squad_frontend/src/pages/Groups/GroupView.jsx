import { signal } from '@preact/signals-react'

import './GroupView.scss'

import GroupNews from './GroupNews'
import GroupJoiners from './GroupJoiners'
import GroupMembers from './GroupMembers'
import GroupJoinBlock from './GroupJoinBlock'

function GroupView({ group, username, groupSignal }) {

    if (!group.owner) {
        return (
            <div className='group-view'>
                <GroupJoinBlock group={group} />
            </div>
        )
    }

    const groupMemberSig = signal([groupSignal.value.users, groupSignal.value.joinRequests])
    const groupNewsSig = signal(groupSignal.value.news)

    return (
        <div className='group-view'>
            <h4 className="group-owner">Owner: {!group.owner ? 'Error' :
                <a href={`profile/${group.owner}`}>{group.owner}</a>}</h4>

            <GroupMembers group={group} username={username} groupSignal={groupMemberSig} />

            <GroupJoiners group={group} groupSignal={groupMemberSig} />

            <GroupNews group={group} newsSignal={groupNewsSig} />
        </div>
    )
}

export default GroupView