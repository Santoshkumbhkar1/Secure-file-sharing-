import React from 'react';
import { getFileUrl } from '../services/fileService';

const FilePreview = ({ file, onClose }) => {
    const [previewUrl, setPreviewUrl] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadPreview = async () => {
            try {
                const url = await getFileUrl(file.key);
                setPreviewUrl(url);
            } catch (error) {
                console.error('Error loading preview:', error);
            } finally {
                setLoading(false);
            }
        };
        loadPreview();
    }, [file]);

    if (loading) {
        return <div>Loading preview...</div>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-3xl max-h-full overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{file.key}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        Close
                    </button>
                </div>
                {file.contentType?.startsWith('image/') ? (
                    <img src={previewUrl} alt={file.key} className="max-w-full h-auto" />
                ) : (
                    <div className="bg-gray-100 p-4 rounded">
                        <p>Preview not available for this file type.</p>
                        <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Download to view
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilePreview;
