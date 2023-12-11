/**
 * @jest-environment jsdom
 */

import {encodeFileToBase64, decodeBase64ToBlob, downloadBlob} from './ConvertFileUtil.ts'

describe('convertToBase64', () => {

    global.Blob = jest.fn().mockImplementation(() => {
        return {
            size: 4,
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };
    });


    global.File = jest.fn().mockImplementation((content, fileName, options) => {
        return {content, fileName, options};
    });

// FileReaderのモックを作成
    const setupFileReaderMock = () => {
        const readAsDataURL = jest.fn();
        const mockFileReader = {
            onload: jest.fn(),
            onerror: jest.fn(),
            readAsDataURL,
            result: '',
        };

        // FileReaderのモックをグローバルオブジェクトに設定
        global.FileReader = jest.fn(() => mockFileReader) as any;

        return {mockFileReader, readAsDataURL};
    }
    it('converts a file to a base64 string', async () => {
        const {mockFileReader, readAsDataURL} = setupFileReaderMock();

        // ダミーのファイルオブジェクトを作成
        const dummyContent = 'dummy content';
        const blob = new Blob([dummyContent], {type: 'text/plain'});
        const file = new File([blob], 'dummy.xlsx', {type: 'text/plain'});

        // convertToBase64関数を実行
        const base64Promise = encodeFileToBase64(file);

        // FileReader.onloadを模倣
        mockFileReader.result = 'data:text/plain;base64,dGVzdA==';  // ダミーのBase64文字列
        mockFileReader.onload();

        // 結果を検証
        await expect(base64Promise).resolves.toBe('data:text/plain;base64,dGVzdA==');

        // readAsDataURLが適切に呼び出されたことを確認
        expect(readAsDataURL).toHaveBeenCalledWith(file);
    });
});

describe('decodeBase64ToBlob', () => {
    beforeEach(() => {
        (global.Blob as jest.Mock).mockReset();
    });

    it('converts base64 string to a Blob', () => {
        // ダミーのBase64エンコードされた文字列
        const base64String = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,dGVzdA==';

        // 関数を実行
        const blob = decodeBase64ToBlob(base64String);

        // Blobの検証
        expect(blob).toBeInstanceOf(Blob);
    });
});

describe('downloadBlob', () => {
    beforeAll(() => {
        global.URL.createObjectURL = jest.fn();
        document.body.appendChild = jest.fn();
        document.body.removeChild = jest.fn();
        document.createElement = jest.fn().mockImplementation(() => ({
            href: '',
            download: '',
            click: jest.fn(),
            appendChild: jest.fn(),
            removeChild: jest.fn()
        }));
    });

    it('triggers a download process for a blob', () => {
        const mockBlob = new Blob(['test content'], {type: 'text/plain'});
        const fileName = 'testfile.txt';

        downloadBlob(mockBlob, fileName);

        // URL.createObjectURLが呼ばれたことを確認
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);

        // a要素が作成され、適切な属性が設定されていることを確認
        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(document.body.appendChild).toHaveBeenCalled();
        expect(document.body.removeChild).toHaveBeenCalled();

    });
});

