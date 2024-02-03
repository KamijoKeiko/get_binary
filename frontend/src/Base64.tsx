import * as React from 'react';
import {useState} from "react";
import {encodeFileToBase64} from "./ConvertFileUtil.ts";
import axios from 'axios';

type User = {
    name: string;
    department: string;
};

export const Base64: React.FC = () => {
    const [user, setUser] = useState<User>({name: "", department: ""});
    const [file, setFile] = useState<File | null>(null)


    const handleClick = async () => {
        if (!file) return;
        const startTime = Date.now()
        const base64Data = await encodeFileToBase64(file);

        try {
            const response = await axios.post('http://localhost:7000/base64',
              {file: base64Data},
              {headers:{'Content-Type': 'application/json'}});
            console.log(response.data);

            if (response.status == 200) {
                const endTime = Date.now()
                console.log(endTime - startTime)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <p>名 前：<input
                type="text"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                placeholder="Name"
            /></p>
            <p>所 属：<input
                type="text"
                value={user.department}
                onChange={(e) => setUser({...user, department: e.target.value})}
                placeholder="Department"
            /></p>
            <p>チェックシート：<input
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            /></p>

            <button onClick={handleClick}>Base64</button>
        </>
    );
};

