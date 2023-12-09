export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const decodeBase64ToBlob = (encodedFileContent: string): Blob => {
    const binaryFileContent = atob(encodedFileContent.split(',')[1]);
    const fixedLengthBuffer = new ArrayBuffer(binaryFileContent.length);
    const decodedByteArray = new Uint8Array(fixedLengthBuffer);

    for (let i = 0; i < binaryFileContent.length; i++) {
        decodedByteArray[i] = binaryFileContent.charCodeAt(i);
    }

    return new Blob([fixedLengthBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
};

export const downloadBlob = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};