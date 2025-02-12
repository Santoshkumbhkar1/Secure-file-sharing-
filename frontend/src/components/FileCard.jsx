import React from 'react';
import { DocumentIcon, TrashIcon, ArrowDownTrayIcon, EyeIcon, ShareIcon } from '@heroicons/react/24/outline';

const FileCard = ({ file, onDelete, onDownload, onPreview, onShare }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <DocumentIcon className="h-10 w-10 text-blue-500" />
        <div>
          <h3 className="font-semibold text-gray-700">{file.key}</h3>
          <p className="text-sm text-gray-500">{new Date(file.lastModified).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onPreview(file)} className="p-2 text-green-600 hover:bg-green-100 rounded">
          <EyeIcon className="h-5 w-5" />
        </button>
        <button onClick={() => onDownload(file.key)} className="p-2 text-blue-600 hover:bg-blue-100 rounded">
          <ArrowDownTrayIcon className="h-5 w-5" />
        </button>
        <button onClick={() => onShare(file)} className="p-2 text-yellow-600 hover:bg-yellow-100 rounded">
          <ShareIcon className="h-5 w-5" />
        </button>
        <button onClick={() => onDelete(file.key)} className="p-2 text-red-600 hover:bg-red-100 rounded">
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
