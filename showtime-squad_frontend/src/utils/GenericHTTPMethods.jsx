
async function handleResponse(response, requestType) {
    const responseData = { status: response.status, headers: response.headers }

    if (response.ok) {
        console.log(`${requestType} request successful`)

        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.includes('application/json')) {
            // response is json
            const jsonResponse = await response.json()
            Object.assign(responseData, jsonResponse)
        } else if (contentType && contentType.includes('xml')) {
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
            responseData.xml = xmlDoc;
        } else if (contentType && contentType.includes('text')) {
            // response is text
            const textResponse = await response.text()
            Object.assign(responseData, textResponse)
        } else {
            // unknown / unimplemented response type
            throw new Error("Unkown response type")
        }
    } else {
        console.error(`${requestType} request failed with status ${response.status}`)
    }

    return responseData
}
async function getXML({ url, cookies = null }) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/xml'
            },
        })

        const responseData = await handleResponse(response, 'GET')

        return responseData
    } catch (error) {
        console.error('Error during GET:', error)
    }
}

async function getRequest({ url, cookies = null }) {
    // TODO: kinda barebones
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies,
                'Access-Control-Allow-Origin': '*'
            },
        })

        const responseData = await handleResponse(response, 'GET')

        return responseData
    } catch (error) {
        console.error('Error during GET:', error)
        // throw error // TODO: this is annoying with GitHub actions, figure out error throws
    }
}

async function postRequest({ url, cookies = null, body }) {
    body = JSON.stringify(body) // TODO different content types, though we are only using json

    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies,
            },
            body: body,
        })

        const responseData = await handleResponse(response, 'POST')

        return responseData
    } catch (error) {
        console.error('Error during POST:', error.message)
    }
}

async function putRequest(url, body) {
    // TODO: unimplemented
    throw new Error("Unimplemented")
}

async function deleteRequest({ url, cookies }) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies,
            },
        })

        const responseData = await handleResponse(response, 'DELETE')

        return responseData
    } catch (error) {
        console.error('Error during DELETE:', error)
    }
}



export { getRequest, postRequest, putRequest, deleteRequest, getXML }