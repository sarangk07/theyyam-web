import React, { useEffect, useState } from 'react';

const TemplesView = () => {
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // Function to handle temple deletion
    const handleDelete = async (templeId) => {
        if (!confirm('Are you sure you want to delete this temple?')) return; // Confirmation dialog

        try {
            const response = await fetch(`/api/temples?id=${templeId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                // Refresh the list of temples after deletion
                setTemples(prevTemples => prevTemples.filter(temple => temple.id !== templeId));
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error deleting temple:', error);
            alert('An error occurred while deleting the temple.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                Loading...
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
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {temples.map((temple) => (
                <div key={temple.id} className="bg-zinc-300 p-4 rounded-md text-zinc-800">
                    <div className="border-b border-zinc-300">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">{temple.name}</h3>
                            
                        </div>
                        <div>
                            {/* Correctly pass a function reference to onClick */}
                            <button onClick={() => handleDelete(temple.id)} className="mr-4 border p-1 text-red-800 ">
                                Delete Temple
                            </button>
                            <button className="text-blue-800 border p-1 ">
                                Edit Temple
                            </button>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="space-y-2">
                            <p><span className="font-medium">Place:</span> {temple.place}</p>
                            <p> Popularity: {temple.popularity}</p>
                            {temple.location && (
                                <p><span className="font-medium">Location:</span> {temple.location}</p>
                            )}
                            {temple.phone && (
                                <p><span className="font-medium">Phone:</span> {temple.phone}</p>
                            )}
                            {temple.address && (
                                <p><span className="font-medium">Address:</span> {temple.address}</p>
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
                </div>
            ))}
        </div>
    );
};


export default TemplesView;