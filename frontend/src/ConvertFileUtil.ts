export const encodeFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const decodeBase64ToBlob = (encodedFileContent: string): Blob => {

    const decodeBase64Content = () => {
        return atob(encodedFileContent.split(',')[1]);
    }

    const binaryFileContent = decodeBase64Content();

    const decodedByteArray = new Uint8Array([...binaryFileContent].map(char => char.charCodeAt(0)));

    return new Blob([decodedByteArray], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
};

export const downloadBlob = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};



