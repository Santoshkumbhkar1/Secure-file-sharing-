import React, { useState } from 'react';
import { shareFile } from '../services/fileService';
import { toast } from 'react-toastify';

const ShareDialog = ({ file, onClose }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleShare = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = await shareFile(file.key, email);
            toast.success(`File shared with ${email}`);
            onClose();
        } catch (error) {
            toast.error(`Failed to share file: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl mb-4">Share {file.key}</h2>
                <form onSubmit={handleShare}>
                    <input
                        type="email"
                        placeholder="Recipient's email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Sharing...' : 'Share'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShareDialog;
