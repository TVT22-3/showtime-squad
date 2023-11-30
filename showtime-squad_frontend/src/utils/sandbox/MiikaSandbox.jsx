import React, { useState } from 'react';
import { postRequest } from '../GenericHTTPMethods';

function MiikaSandbox() {

    const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [responseData, setResponseData] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        postRequest({ url: `${apiUrl}/api/auth/signin`, body: JSON.stringify(formData) })

        // try {
        //     console.log(`${apiUrl}/api/auth/signin`)
        //     console.log(JSON.stringify(formData))
        //     const response = await fetch(`${apiUrl}/api/auth/signin`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //         credentials: 'include', // Include this line
        //     })

        //     if (response.ok) {
        //         console.log('Login successful!');
        //         return response.json()
        //     } else {
        //         console.error('Login failed:', response.statusText);
        //     }
        // } catch (error) {
        //     console.error('Error during login:', error.message);
        // }
    };

    const handleFetchData = () => {
        // Perform a fetch request
        fetch(`${apiUrl}/api/profile/${formData.username}`, {
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Check if the response is JSON
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then(data => {
                // Display the response in the textarea
                setResponseData(JSON.stringify(data, null, 2));
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit">Submit</button>
            </form>

            <button onClick={handleFetchData}>Fetch Data</button>
            <textarea
                value={responseData}
                rows="5"
                cols="50"
                readOnly
            ></textarea>
        </div>
    )
}



export default MiikaSandbox