import { render, screen, act, fireEvent } from '@testing-library/react'
import Settings from '../Settings.jsx'
import { assert, describe, expect, test } from 'vitest'

import { getRequest, postRequest, deleteRequest } from '../../../utils/GenericHTTPMethods.jsx';
import { randomString } from '../../../utils/Randomizers.jsx';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

// Generate random username and password
const USERNAME_MAX = 20
const PASSWORD_MAX = 40
const username = randomString(USERNAME_MAX)
const password = randomString(PASSWORD_MAX)

describe('asd', () => {

    test('Deleting user should succeed', async () => {
        const cookies = await registerAndLogin()
        console.log(`cookies: ${cookies}`)

    })

})

/**
 * tries to register -> login -> view profile -> returns cookies
 */
async function registerAndLogin() {
    // register user
    console.log(`url: ${apiUrl}/auth/register`)
    const registerBody = JSON.stringify({
        "username": username,
        "email": `${username}@${username}.com`,
        "password": password,
        "role": ["user"]
    })

    const registerResponse = await postRequest({ url: `${apiUrl}/auth/register`, body: registerBody })
    assert(registerResponse.status === 200,
        `Expected a successful status code after registering, but got ${registerResponse.status}`)

    // register user
    const loginResponse = await postRequest({ url: `${apiUrl}/auth/login`, body: registerBody })
    assert(loginResponse.status === 200,
        `Expected a successful status code after login, but got ${loginResponse.status}`)
    const cookies = loginResponse.headers.get('set-cookie');

    // Then perform a GET request
    const profileResponse = await getRequest({ url: `${apiUrl}/api/profile/${username}`, cookies: cookies })
    assert(profileResponse.status === 200,
        `Expected a successful status code for viewing profile, but got ${profileResponse.status}`)
    // TODO: can add assert for checking that user specific profile info is shown

    return cookies
}
