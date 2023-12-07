

function GroupView({ group }) {
    if (!group) {
        return (
            <>
                <p>Not a member.</p>
            </>
        )
    }

    return (
        <>
            <h4 className="group-name">Group name: {!group.groupname ? 'Error' : <>{group.groupname}</>}</h4>
            <h5 className="group-owner">owner: {!group.owner ? 'Error' : <>{group.owner}</>}</h5>
            <section className="group-members">
                members:
                <ul>
                    {!group.users ? 'Error' : (
                        <>
                            {group.users.map((user, index) => {
                                return <li key={index}>{user}</li>
                            })}
                        </>
                    )}
                </ul>
            </section>
            <section className="group-news">news: {!group.news ? 'No news' : <>{group.news}</>}</section>
            {group.joinRequests ? (
                <section>
                    join requests:
                    <ul>
                        {group.joinRequests.length < 1 ? <li>No requests</li> :
                            (
                                group.joinRequests.map((joiner, index) => {
                                    return <li key={index}>{joiner}</li>
                                })
                            )}
                    </ul>
                </section>
            ) : <></>}
        </>
    )
}

export default GroupView