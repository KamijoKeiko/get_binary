import React, {useState} from 'react';
import {decodeBase64ToBlob, downloadBlob} from "./ConvertFileUtil.ts";
import axios from 'axios';

export const Decode: React.FC = () => {
    const [encodedFile, setEncodedFile] = useState(null);

    const fetchEncodedFile = async () => {
        try {
            const startTime = Date.now()
            const response = await axios.get('http://localhost:7000/data');
            setEncodedFile(response.data[0]);
            const endTime = Date.now()
            console.log(endTime - startTime)
        } catch (error) {
            console.error('Error fetching encoded file:', error);
        }
    };

    const handleDownload = () => {
        const startTime = Date.now()
        if (encodedFile) {

            const blob = decodeBase64ToBlob(encodedFile);
            downloadBlob(blob, 'MySpreadsheet.xlsx');

        }
        const endTime = Date.now()
        console.log(endTime - startTime)
    };

    return (
        <>
            <button onClick={fetchEncodedFile}>
                Fetch Encoded File
            </button>
            {encodedFile && (
                <button onClick={handleDownload}>
                    Download File
                </button>
            )}
        </>
    );
};

