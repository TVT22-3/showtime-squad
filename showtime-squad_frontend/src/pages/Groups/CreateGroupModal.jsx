import { signal } from '@preact/signals-react'

import FunctionButton from "../../components/atoms/FunctionButton"
import './CreateGroupModal.scss'

import { postRequest } from '../../utils/GenericHTTPMethods'
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

const inputField = signal('')
const errorMessage = signal('');

function CreateGroupModal({ open }) {

    const handleInput = (event) => {
        inputField.value = event.target.value
    };

    function modalShutdown() {
        setTimeout(() => {
            open.value = false
        }, 2000);
    }

    return (
        <dialog id="create-group-modal" className="create-group-modal modal" open={open.value}>
            <div className='flex-wrapper'>
                <h6>Give group name:</h6>

                <input type="text" value={inputField.value} onInput={handleInput} />
                <FunctionButton
                    onClick={async () => {
                        if (await createGroup(inputField.value)) {
                            modalShutdown()
                        }
                    }}
                    text={'Create'}
                    displayError={errorMessage.value} />
            </div>
        </dialog>
    )
}

async function createGroup(groupname) {
    const response = await postRequest({ url: `${apiUrl}/api/group/create`, body: { groupname: groupname } });
    const isOk = response.status < 400
    errorMessage.value = isOk ? 'Success!' : response.status
    return isOk
}

export default CreateGroupModal