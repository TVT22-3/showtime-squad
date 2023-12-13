import { signal } from '@preact/signals-react'

import { Routes, Route, useNavigate } from "react-router-dom"
import Footer from "../../components/ui/Footer"
import Header from "../../components/ui/Header"
import Sitemap from "../../data/sitemap.json"
import FunctionButton from "../../components/atoms/FunctionButton"
import "./Settings.scss"

import { deleteRequest } from '../../utils/GenericHTTPMethods'

import { useUser } from '../../context/UserContext';
const countdown = signal(-1)
const displayErrorMessage = signal(null)

function Settings() {
    // TODO: Implement
    console.log("component not properly implemented")

    const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

    const { username, handleLogout } = useUser()

    const navigate = useNavigate()
    function moveToIndex() {
        navigate('/')
    }

    // handle user deletion
    async function deleteUser() {
        countdown.value >= 0 ? moveToIndex() : void

            console.log("clicked delete for user:", username)
        try {
            // attempt to delete
            let response = await deleteRequest({ url: `${apiUrl}/api/settings/delete/${username}` })

            // display bad http status
            // const badStatusCodes = [400, 401, 403, 404]; 
            if ((response && response.status) &&
                (response.status >= 400 /*|| badStatusCodes.includes(response.status)*/)) {
                displayErrorMessage.value = response.status
            } else {
                // trigger logout and countdown for moving back to index
                response = await logoutUser(`${apiUrl}/auth/logout` , handleLogout)
                countDown()
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    function countDown() {
        // decrement countdown every second
        const COUNTDOWN_SECONDS = 10
        countdown.value = COUNTDOWN_SECONDS

        const countdownInterval = setInterval(() => {
            countdown.value--
            if (countdown.value < 0) {
                clearInterval(countdownInterval)
                moveToIndex()
            }
        }, 1000);
    }

    return (
        <>
            <Header />

            <main id="settings">
                <FunctionButton onClick={deleteUser}
                    text={countdown.value >= 0 ? `Success! Exiting in ${countdown.value}` : "Delete my account!"}
                    displayError={displayErrorMessage.value}
                />
            </main>

            <Footer sitemap={Sitemap} loggedIn={true} />
        </>
    )
}

async function logoutUser(url, handleLogoutCallback) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            console.log("Logout successful")
            handleLogoutCallback();
        } else {
            console.error("Logout failed with status:", response.status)
        }
    } catch (error) {
        console.error('Error logging out:', error)
    }
}

export default Settings