import React, { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import UpdateTempleForm from './editTemples';

const TemplesView = () => {
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTempleId, setEditingTempleId] = useState(null); // Track which temple is being edited

    useEffect(() => {
        fetchTemples();
    }, []);

    const fetchTemples = async () => {
        try {
            const response = await fetch('/api/temples');
            if (!response.ok) {
                throw new Error('Failed to fetch temples');
            }
            const data = await response.json();
            setTemples(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (templeId) => {
        if (!confirm('Are you sure you want to delete this temple?')) return;

        try {
            const response = await fetch(`/api/temples?id=${templeId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setTemples(prevTemples => prevTemples.filter(temple => temple.id !== templeId));
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error deleting temple:', error);
            alert('An error occurred while deleting the temple.');
        }
    };

    // Handle successful update
    const handleUpdateSuccess = async (updatedTemple) => {
        // Refresh the temples list
        await fetchTemples();
        // Close the edit form
        setEditingTempleId(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <PropagateLoader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="p-4 font-serif grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {temples.map((temple) => (
                <div key={temple.id} className="bg-zinc-300 p-4 rounded-md text-zinc-800">
                    <div className="border-b border-zinc-300">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">{temple.name}</h3>
                        </div>
                        <div className="relative top-1">
                            <button 
                                onClick={() => handleDelete(temple.id)} 
                                className="mr-4 bg-zinc-200 border border-b-0 p-1 text-red-800"
                            >
                                Delete Temple
                            </button>
                            <button 
                                onClick={() => setEditingTempleId(temple.id)}
                                className="text-blue-800 border bg-zinc-200 border-b-0 p-1"
                            >
                                Edit Temple
                            </button>
                        </div>
                    </div>

                    {editingTempleId === temple.id ? (
                        <div className="mt-4 bg-white p-4 rounded-md">
                            <UpdateTempleForm 
                                templeId={temple.id} 
                                initialData={temple}
                                onUpdateSuccess={handleUpdateSuccess}
                                onCancel={() => setEditingTempleId(null)}
                            />
                        </div>
                    ) : (
                        <div className="pt-4 border bg-zinc-200">
                            <div className="space-y-2 p-2">
                                <p><span className="font-medium">Place:</span> {temple.place}</p>
                                <p>Popularity: {temple.popularity}</p>
                                {temple.location && (
                                    <p><span className="font-medium">Location:</span> {temple.location}</p>
                                )}
                                {temple.phone && (
                                    <p><span className="font-medium">Phone:</span> {temple.phone}</p>
                                )}
                                {temple.address && (
                                    // <p><span className="font-medium">Address:</span> {temple.address}</p>
                                    <img  src={temple.address} alt="" />
                                )}
                                <div className="border-t border-zinc-700 pt-2 mt-2">
                                    <p><span className="font-medium">Festival Duration:</span> {temple.festival_duration_days} days</p>
                                    <p><span className="font-medium">Malayalam Month:</span> {temple.malayala_masam}</p>
                                    <p><span className="font-medium">Festival Time:</span></p>
                                    <p className="pl-4">Start: {temple.festival_start_time}</p>
                                    <p className="pl-4">End: {temple.festival_end_time}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TemplesView;