import './GroupView.scss'

import GroupNews from './GroupNews'
import GroupJoiners from './GroupJoiners'
import GroupMembers from './GroupMembers'
import GroupJoinBlock from './GroupJoinBlock'

function GroupView({ group, username }) {

    if (!group.owner) {
        return (
            <div className='group-view'>
                <GroupJoinBlock group={group} />
            </div>
        )
    }

    return (
        <div className='group-view'>
            <h5 className="group-owner">owner: {!group.owner ? 'Error' : <>{group.owner}</>}</h5>

            <GroupMembers group={group} username={username} />

            <GroupJoiners group={group} />

            <GroupNews group={group} />
        </div>
    )
}

export default GroupView