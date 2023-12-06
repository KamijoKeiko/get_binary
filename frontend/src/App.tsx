import React, {useState} from 'react';
import axios from 'axios';

type User = {
    name: string;
    department: string;
};

export const App: React.FC = () => {
    const [user, setUser] = useState<User>({name: "", department: ""});
    const [file, setFile] = useState<File | null>(null)
    const handleClick = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('name', user.name)
        formData.append('department', user.department)
        formData.append('file', file)

        try {
            const response = await axios.post('http://localhost:7000/submit', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <><input
            type="text"
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            placeholder="Name"
        />
            <input
                type="text"
                value={user.department}
                onChange={(e) => setUser({...user, department: e.target.value})}
                placeholder="Department"
            />
            <input
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />

            <button onClick={handleClick}>Submit</button>
        </>
    );
};

