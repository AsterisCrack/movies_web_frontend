import React, { useEffect } from 'react';
export default function GetUserData({setUser}) {
    // Get the current user information
    useEffect(() => {
        // Fetch user information from http://apps/users/me with session cookie
        fetch('http://127.0.0.1:8000/apps/users/me/', {
            method: 'GET',
            credentials: 'include', // This will include the session cookie in the request
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUser(data);
            // Set other state variables if needed
        })
        .catch(error => console.error('Error:', error));
    }, []);
    return null;
}