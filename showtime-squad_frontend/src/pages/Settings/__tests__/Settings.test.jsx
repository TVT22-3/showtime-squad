import { render, screen, act, fireEvent, findByText, waitFor } from '@testing-library/react'
import { assert, describe, expect, test, vi, setTimeout } from 'vitest'
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom'

import { UserProvider } from '../../../context/UserContext.jsx';

import Settings from '../Settings.jsx'
import MiikaSandbox from '../../../utils/sandbox//MiikaSandbox.jsx'

import { getRequest, postRequest, deleteRequest } from '../../../utils/GenericHTTPMethods.jsx';
import { randomString } from '../../../utils/Randomizers.jsx';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

// Generate random username and password
const USERNAME_MAX = 20
const PASSWORD_MAX = 40

// TODO: skip until backend / mock endpoints exists
describe('Settings tests', () => {
    test.skip('SANITY: Deleting user should work with just queries', async () => {
        const username = randomString(USERNAME_MAX)
        const password = randomString(PASSWORD_MAX)
        const cookies = await registerAndLogin(username, password)
        console.log(`cookies: ${cookies}`)

        const deleteResponse = await deleteRequest({ url: `${apiUrl}/settings/delete/${username}`, cookies: cookies })
        assert(deleteResponse.status === 200,
            `Expected a successful status code after registering, but got ${deleteResponse.status}`)
    })

    test.todo('Deleting user should succeed', async () => {
        const username = randomString(USERNAME_MAX)
        const password = randomString(PASSWORD_MAX)

        await registerUser(username, password)

        let consoleSpy = vi.spyOn(console, 'log').mockImplementation()

        await act(async () => {
            render(
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/*" element={<MiikaSandbox />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </BrowserRouter>
                    <a href="/">TEST HOME</a><a href="/settings">TEST SETTINGS</a>
                </UserProvider>
            )
        })

        const settingsLink = await screen.findByText(/test settings/i)
        expect(settingsLink).toBeInTheDocument()

        // get input fields
        const usernameInput = await screen.findByLabelText('Username:')
        expect(usernameInput).toBeInTheDocument()
        const passwordInput = await screen.findByLabelText('Password:')
        expect(passwordInput).toBeInTheDocument()
        const submitButton = await screen.findByText('Submit')
        expect(submitButton).toBeInTheDocument()

        await act(async () => {
            // input username and password
            fireEvent.change(usernameInput, { target: { value: username } })
            expect(usernameInput.value).toBe(username)
            fireEvent.change(passwordInput, { target: { value: password } })
            expect(passwordInput.value).toBe(password)

            // form submission
            fireEvent.click(submitButton)
        })

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('POST request successful'))
        })
        consoleSpy.mockRestore()
        consoleSpy = vi.spyOn(console, 'log').mockImplementation()

        //TODO: fetching doesnt succeed
        // get fetch button
        const fetchButton = await screen.findByText(/Fetch/i)
        expect(fetchButton).toBeInTheDocument()

        await act(async () => {
            fireEvent.click(fetchButton)
        })
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('POST request successful'))
        })

        consoleSpy.mockRestore()
    })

    // const cookies = await registerAndLogin(username, password)
    // const deleteButton = await screen.findByText(/delete my account!/i)
    // expect(deleteButton).toBeInTheDocument()
})

/**
 * tries to register -> login -> view profile -> returns cookies
 */
async function registerAndLogin(username, password) {
    await registerUser(username, password)
    const cookies = await loginUser(username, password)

    // Then perform a GET request
    const profileResponse = await getRequest({ url: `${apiUrl}/api/profile/${username}`, cookies: cookies })
    assert(profileResponse.status === 200,
        `Expected a successful status code for viewing profile, but got ${profileResponse.status}`)
    // TODO: can add assert for checking that user specific profile info is shown

    return cookies
}

async function loginUser(username, password) {
    const loginBody = JSON.stringify({
        "username": username,
        "password": password,
    })

    const loginResponse = await postRequest({ url: `${apiUrl}/auth/login`, body: loginBody })
    assert(loginResponse.status === 200,
        `Expected a successful status code after login, but got ${loginResponse.status}`)
    return loginResponse.headers.get('set-cookie')
}

async function registerUser(username, password) {
    const registerBody = JSON.stringify({
        "username": username,
        "email": `${username}@${username}.com`,
        "password": password,
        "role": ["user"]
    })

    const registerResponse = await postRequest({ url: `${apiUrl}/auth/register`, body: registerBody })
    assert(registerResponse.status === 200,
        `Expected a successful status code after registering, but got ${registerResponse.status}`)
}
