import FunctionButton from "../../components/atoms/FunctionButton"
import './AddNewsModal.scss'

import { signal } from '@preact/signals-react'

import { getRequest, postRequest, getXML } from '../../utils/GenericHTTPMethods'
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function AddNewsModal({ open, newsInfo, groupname }) {

    function modalShutdown() {
        setTimeout(() => {
            open.value = false
        }, 2000);
    }

    const errorMessage = signal('')

    return (
        <dialog id="add-news-modal" className="add-news-modal modal" open={open.value}>
            <div className='flex-wrapper'>
                <FunctionButton className='close-button' onClick={() => { open.value = false }}
                    text={'❌'} />

                <h6>Choose news to add: {newsInfo.value && newsInfo.value.length ? newsInfo.value.length : 'Loading...'}</h6>

                <ul>
                    {
                        !newsInfo.value ? 'Loading...' :
                            Array.from(newsInfo.value).map((item, index) => (
                                <li key={index} className="add-item inline">
                                    {item.title.innerHTML} - {item.eventID ? item.eventID.innerHTML : -1}

                                    <FunctionButton
                                        onClick={async () => {
                                            if (await addNews({
                                                news: item.eventID ? item.eventID.innerHTML : -1,
                                                groupname: groupname,
                                                errorMessage: errorMessage
                                            })) {
                                                modalShutdown()
                                            }
                                        }}
                                        text={'➕'}
                                        displayError={errorMessage} />
                                </li>
                            ))
                    }
                </ul>
            </div>
        </dialog>
    )
}

async function addNews({ news, groupname, errorMessage }) {
    const response = await postRequest({
        url: `${apiUrl}/api/group/news/add`,
        body: {
            groupname: groupname,
            news: news
        }
    })
    const isOk = response.status < 400
    errorMessage.value = isOk ? 'Success!' : response.status
    return isOk
}

export default AddNewsModal