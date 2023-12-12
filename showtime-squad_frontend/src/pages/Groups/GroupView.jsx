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
            <h4 className="group-owner">Owner: {!group.owner ? 'Error' :
                <a href={`profile/${group.owner}`}>{group.owner}</a>}</h4>

            <GroupMembers group={group} username={username} />

            <GroupJoiners group={group} />

            <GroupNews group={group} />
        </div>
    )
}

export default GroupView