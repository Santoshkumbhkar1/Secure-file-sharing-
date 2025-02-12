import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { uploadFile, deleteFile, listFiles } from '../services/fileService';
import FileList from '../components/FileList';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const Dashboard = () => {
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        try {
            const files = await listFiles();
            setFiles(files);
        } catch (error) {
            setError('Error loading files: ' + error.message);
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file.size > MAX_FILE_SIZE) {
            toast.error('File size must be less than 50MB');
            return;
        }
        setFile(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: MAX_FILE_SIZE,
        multiple: false
    });

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setError('File size must be less than 50MB');
            return;
        }

        setUploading(true);
        setError(null);
        setUploadProgress(0);

        try {
            await uploadFile(file, (progress) => {
                setUploadProgress(Math.round(progress));
            });
            await loadFiles();
            setFile(null);
            e.target.reset();
        } catch (error) {
            setError(error.message);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDelete = async (fileKey) => {
        try {
            await deleteFile(fileKey);
            setFiles(files.filter(f => f.key !== fileKey));
        } catch (error) {
            alert('Error deleting file: ' + error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.attributes?.email}</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl mb-4">Upload File</h2>
                <div {...getRootProps()} className={`border-2 border-dashed p-4 text-center ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the file here ...</p>
                    ) : (
                        <p>Drag 'n' drop a file here, or click to select a file</p>
                    )}
                </div>
                {file && (
                    <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>
                )}
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button 
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
                {uploading && (
                    <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded">
                            <div 
                                className="bg-blue-500 rounded h-2" 
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                            {uploadProgress}%
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl mb-4">My Files</h2>
                <FileList files={files} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default Dashboard;
