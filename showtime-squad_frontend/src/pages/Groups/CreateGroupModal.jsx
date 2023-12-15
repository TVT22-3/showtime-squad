import { signal } from '@preact/signals-react'

import FunctionButton from "../../components/atoms/FunctionButton"
import './CreateGroupModal.scss'

import { postRequest } from '../../utils/GenericHTTPMethods'
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

const nameField = signal('')
const descriptionField = signal('')
const errorMessage = signal('');

function CreateGroupModal({ open }) {

    const handleInput = (signal, event) => {
        signal.value = event.target.value
    }

    function modalShutdown() {
        setTimeout(() => {
            open.value = false
        }, 2000);
    }

    return (
        <dialog id="create-group-modal" className="create-group-modal modal" open={open.value}>
            <div className='flex-wrapper'>
                <FunctionButton className='close-button' onClick={()=>{open.value = false}}
                text={'❌'}/>

                <label htmlFor="">Group Name:</label>
                <input type="text" value={nameField.value} onInput={(event) => { handleInput(nameField, event) }} />

                <label htmlFor="">Description:</label>
                <textarea rows="3" type="text" value={descriptionField.value} onInput={(event) => { handleInput(descriptionField, event) }} />
                <FunctionButton className='submit-button'
                    onClick={async () => {
                        if (await createGroup({ groupname: nameField.value, description: descriptionField.value })) {
                            modalShutdown()
                        }
                    }}
                    text={'Create'}
                    displayError={errorMessage.value} />
            </div>
        </dialog>
    )
}

async function createGroup({ groupname, description }) {
    const response = await postRequest({
        url: `${apiUrl}/api/group/create`,
        body: { groupname: groupname, description: description }
    })
    const isOk = response.status < 400
    errorMessage.value = isOk ? 'Success!' : response.status
    return isOk
}

export default CreateGroupModal