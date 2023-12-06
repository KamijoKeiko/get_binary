import React, { useState, useEffect } from 'react';
import axios from 'axios';

type ApiResponse = {
    message: string
};
export const App:React.FC = () => {
     const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get<ApiResponse>('http://localhost:7000/hello')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>Response from API</h1>
            <h2>{message}</h2>
        </div>
    );
}
