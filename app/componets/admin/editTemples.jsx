// UpdateTempleForm.jsx
import { useState } from 'react';

export default function UpdateTempleForm({ templeId, initialData, onUpdateSuccess, onCancel }) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const formData = new FormData(e.target);
            formData.append('id', templeId);

            
            const cleanFormData = new FormData();
            for (const [key, value] of formData.entries()) {
                if (value instanceof File) {
                    if (value.size > 0) {
                        cleanFormData.append(key, value);
                    }
                } else if (value && value.trim() !== '') {
                    cleanFormData.append(key, value);
                }
            }

            const response = await fetch('/api/temples', {
                method: 'PATCH',
                body: cleanFormData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update temple');
            }

            setMessage('Temple updated successfully!');
            onUpdateSuccess && onUpdateSuccess(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name1"
                        defaultValue={initialData?.name}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Place</label>
                    <input
                        type="text"
                        name="Place1"
                        defaultValue={initialData?.place}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="Location1"
                        defaultValue={initialData?.location}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="Phone1"
                        defaultValue={initialData?.phone}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image[url]</label>
                    <input
                        name="Address1"
                        defaultValue={initialData?.address}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Popularity</label>
                    <input
                        type="number"
                        name="popularity1"
                        defaultValue={initialData?.popularity}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {loading ? 'Updating...' : 'Update Temple'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>

                {message && (
                    <div className="text-green-600 text-sm mt-2">{message}</div>
                )}
                
                {error && (
                    <div className="text-red-600 text-sm mt-2">{error}</div>
                )}
            </form>
        </div>
    );
}