import FunctionButton from '../../components/atoms/FunctionButton'
import './GroupView.scss'

function GroupView({ group }) {
    if (!group) {
        return (
            <div className='group-view'>
                <p>Not a member.</p>
            </div>
        )
    }

    return (
        <div className='group-view'>
            <h4 className="group-name">Group name: {!group.groupname ? 'Error' : <>{group.groupname}</>}</h4>
            <h5 className="group-owner">owner: {!group.owner ? 'Error' : <>{group.owner}</>}</h5>
            <section className="group-members">
                members:
                <ul>
                    {!group.users ? 'Error' : (
                        <>
                            {group.users.map((user, index) => {
                                return (
                                    <li key={index} className='user member'>
                                        {user}
                                        {user !== group.owner ?
                                            <FunctionButton onClick={declineJoin} text='❌' />
                                            : <></>}
                                    </li>
                                )
                            })}
                        </>
                    )}
                </ul>
            </section>
            <section className="group-news">news: {!group.news ? 'No news' : <>{group.news}</>}</section>
            {group.joinRequests ? (
                <section className='group-joiners'>
                    join requests:
                    <ul>
                        {group.joinRequests.length < 1 ? <li>No requests</li> :
                            (
                                group.joinRequests.map((joiner, index) => {
                                    return (
                                        <li key={index} className='user joiner'>
                                            {joiner}
                                            {<FunctionButton onClick={acceptJoin} text='✅' />}
                                            {<FunctionButton onClick={declineJoin} text='❌' />}
                                        </li>)
                                })
                            )}
                    </ul>
                </section>
            ) : <></>}
        </div>
    )
}

function removeMember() {

}

function acceptJoin() {

}

function declineJoin() {
    console.error("UNIMPLEMENTED function 'declineJoin'")
}
export default GroupView