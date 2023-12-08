import * as React from 'react';
import {useState} from "react";
import axios from 'axios';

type User = {
    name: string;
    department: string;
};

export const MultiType: React.FC = () => {
    const [user, setUser] = useState<User>({name: "", department: ""});
    const [file, setFile] = useState<File | null>(null)
    const handleClick = async () => {
            if (!file) return;


            const formData = new FormData();
            formData.append('name', user.name)
            formData.append('department', user.department)
            formData.append('file', file)

            const startTime = Date.now()

            try {
                const response = await axios.post('http://localhost:7000/multi_type', formData,
                    {
                        headers: {
                            'Content-Type':
                                'multipart/form-data'
                        }
                    })
                console.log(response.data);

                if (response.status == 200) {
                    const endTime = Date.now()
                    console.log(endTime - startTime)
                }
            } catch
                (error) {
                console.error('Error:', error);
            }
        }
    ;

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

            <button onClick={handleClick}>登 録</button>
        </>
    );
};

