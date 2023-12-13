import { signal } from "@preact/signals-react";
import { postRequest } from "../../utils/GenericHTTPMethods";

import FunctionButton from "../../components/atoms/FunctionButton";

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function GroupJoinBlock({ group }) {

    return (
        <div className='join-notice inline'>
            <p>Not a member.</p>
            {(() => {
                const joinSig = signal('');
                return (
                    <FunctionButton onClick={async () => {
                        await requestToJoin({ groupname: group.groupname, signal: joinSig })
                    }}
                        text='Request to join 💪' displayError={joinSig} />
                )
            })()}
        </div>
    )
}

async function requestToJoin({ groupname, signal }) {
    const response = await postRequest({
        url: `${apiUrl}/api/group/join`,
        body: { groupname: groupname }
    });
    signal.value = response.status < 400 ? 'Success!' : response.status
}

export default GroupJoinBlock