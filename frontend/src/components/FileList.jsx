import { useState } from 'react';
import { getFileUrl, deleteFile } from '../services/fileService';
import FilePreview from './FilePreview';
import ShareDialog from './ShareDialog';
import FileCard from './FileCard';

const FileList = ({ files, onDelete }) => {
    const [loading, setLoading] = useState({});
    const [previewFile, setPreviewFile] = useState(null);
    const [shareFile, setShareFile] = useState(null);

    const handleDownload = async (fileKey) => {
        try {
            setLoading(prev => ({ ...prev, [fileKey]: true }));
            const url = await getFileUrl(fileKey);
            window.open(url.url, '_blank');
        } catch (error) {
            alert('Error downloading file: ' + error.message);
        } finally {
            setLoading(prev => ({ ...prev, [fileKey]: false }));
        }
    };

    return (
        <div className="space-y-4">
            {files.map((file) => (
                <FileCard
                    key={file.key}
                    file={file}
                    onDelete={onDelete}
                    onDownload={handleDownload}
                    onPreview={() => setPreviewFile(file)}
                    onShare={() => setShareFile(file)}
                />
            ))}
            {files.length === 0 && (
                <p className="text-gray-500 text-center">No files uploaded yet.</p>
            )}
            {previewFile && (
                <FilePreview file={previewFile} onClose={() => setPreviewFile(null)} />
            )}
            {shareFile && (
                <ShareDialog file={shareFile} onClose={() => setShareFile(null)} />
            )}
        </div>
    );
};

export default FileList;
