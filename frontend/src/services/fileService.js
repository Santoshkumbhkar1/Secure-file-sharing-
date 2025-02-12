import { uploadData, getUrl, remove, list } from 'aws-amplify/storage';

const uploadFile = async (file) => {
    try {
        const result = await uploadData({
            key: `${Date.now()}-${file.name}`,
            data: file,
            options: {
                contentType: file.type,
                accessLevel: 'private'
            }
        }).result;
        return result;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

const getFileUrl = async (fileKey) => {
    try {
        return await getUrl({
            key: fileKey,
            options: {
                accessLevel: 'private',
                expiresIn: 3600
            }
        });
    } catch (error) {
        console.error('Error getting file URL:', error);
        throw error;
    }
};

const deleteFile = async (fileKey) => {
    try {
        await remove({
            key: fileKey,
            options: {
                accessLevel: 'private'
            }
        });
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

const listFiles = async () => {
    try {
        const result = await list({
            options: {
                accessLevel: 'private'
            }
        });
        return result.items;
    } catch (error) {
        console.error('Error listing files:', error);
        throw error;
    }
};

const shareFile = async (fileKey, recipientEmail) => {
    try {
        const url = await getUrl({
            key: fileKey,
            options: {
                accessLevel: 'private',
                expiresIn: 3600 * 24 // 24 hours
            }
        });
        
        // In a real application, you would send this URL to your backend
        // to email it to the recipient. For now, we'll just return it.
        console.log(`Sharing file ${fileKey} with ${recipientEmail}`);
        return url;
    } catch (error) {
        console.error('Error sharing file:', error);
        throw error;
    }
};

export { uploadFile, getFileUrl, deleteFile, listFiles, shareFile };
