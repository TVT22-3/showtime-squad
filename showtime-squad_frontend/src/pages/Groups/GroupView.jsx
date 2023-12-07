import FunctionButton from '../../components/atoms/FunctionButton'
import './GroupView.scss'

function GroupView({ group }) {
    if (!group) {
        return (
            <div className='group-view'>
                <div className='join-notice inline'>
                    <p>Not a member. Request to join:</p> <FunctionButton onClick={requestToJoin} text='💪' />
                </div>
            </div>
        )
    }

    return (
        <div className='group-view'>
            <h5 className="group-owner">owner: {!group.owner ? 'Error' : <>{group.owner}</>}</h5>
            <section className="group-members">
                members:
                <ul>
                    {!group.users ? 'Error' : (
                        <>
                            {group.users.map((user, index) => {
                                return (
                                    <li key={index} className='user member inline'>
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
                                        <li key={index} className='user joiner inline'>
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

function requestToJoin() {

}

function removeMember() {

}

function acceptJoin() {

}

function declineJoin() {
    console.error("UNIMPLEMENTED function 'declineJoin'")
}
export default GroupView