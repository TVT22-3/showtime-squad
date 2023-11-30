
async function getRequest(url) {
    // TODO: kinda barebones
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        // throw error // TODO: this is annoying with GitHub actions, figure out error throws
    }
}

async function postRequest(url, body) {
    // TODO: unimplemented
    throw new Error("Unimplemented")
}

async function putRequest(url, body) {
    // TODO: unimplemented
    throw new Error("Unimplemented")
}

async function deleteRequest(url) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const responseData = { status: response.status }

        if (response.ok) {
            console.log('Delete request successful')

            const contentType = response.headers.get('Content-Type')
            if (contentType && contentType.includes('application/json')) {
                // response is json
                const jsonResponse = await response.json()
                Object.assign(responseData, additionalData)
            } else if (contentType && contentType.includes('text')) {
                // response is text
                const textResponse = await response.text()
                Object.assign(responseData, textResponse)
            } else {
                // unknown / unimplemented response type
                throw new Error("Unkown response type")
            }
        } else {
            console.error(`Delete request failed with status ${response.status}`)
        }

        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}



export { deleteRequest }