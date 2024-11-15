import React, { useState, useEffect, useMemo } from 'react';
import { PropagateLoader } from 'react-spinners';
import EditTheyyam from './editTheyyam';

const TheyyamView = () => {
    const [theyyams, setTheyyams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTheyyamId, setEditingTheyyamId] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchTheyyams();
    }, []);

    const fetchTheyyams = async () => {
        try {
            const response = await fetch('/api/theyyams');
            if (!response.ok) {
                throw new Error('Failed to fetch theyyams');
            }
            const data = await response.json();
            setTheyyams(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // search results
    const filteredTheyyams = useMemo(() => {
        if (!searchInput.trim()) {
            return theyyams;
        }

        const searchTerm = searchInput.toLowerCase().trim();
        return theyyams.filter(theyyam => {
            
            return (
                theyyam.name?.toLowerCase().includes(searchTerm) ||
                theyyam.god?.toLowerCase().includes(searchTerm) 
            );
        });
    }, [theyyams, searchInput]);

    const handleDelete = async (theyyamId) => {
        if (!confirm('Are you sure you want to delete this theyyam?')) return;

        try {
            const response = await fetch(`/api/theyyams?id=${theyyamId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setTheyyams(prevTheyyams => prevTheyyams.filter(theyyam => theyyam.id !== theyyamId));
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error deleting theyyam:', error);
            alert('An error occurred while deleting the theyyam.');
        }
    };

    const handleUpdateSuccess = async (updatedTheyyam) => {
        await fetchTheyyams();
        setEditingTheyyamId(null);
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
        <div className="p-4 font-serif">
            <div className="mb-6">
                <div className="max-w-md mx-auto">
                    <input
                        type="search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search theyyams..."
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {filteredTheyyams.length === 0 && searchInput && (
                    <p className="text-center mt-4 text-zinc-600">
                        No theyyams found matching "{searchInput}"
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTheyyams.map((theyyam) => (
                    <div key={theyyam.id} className="bg-zinc-300 p-4 rounded-md text-zinc-800">
                        <div className="border-b border-zinc-300">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold">{theyyam.name}</h3>
                            </div>
                            <div className="relative top-1">
                                <button 
                                    onClick={() => handleDelete(theyyam.id)} 
                                    className="mr-4 bg-zinc-200 border border-b-0 p-1 text-red-800"
                                >
                                    Delete Theyyam
                                </button>
                                <button 
                                    onClick={() => setEditingTheyyamId(theyyam.id)}
                                    className="text-blue-800 border bg-zinc-200 border-b-0 p-1"
                                >
                                    Edit Theyyam
                                </button>
                            </div>
                        </div>

                        {editingTheyyamId === theyyam.id ? (
                            <div className="mt-4 bg-white p-4 rounded-md">
                                <EditTheyyam 
                                    theyyamId={theyyam.id}
                                    initialData={theyyam}
                                    onUpdateSuccess={handleUpdateSuccess}
                                    onCancel={() => setEditingTheyyamId(null)}
                                />
                            </div>
                        ) : (
                            <div className="pt-4 border bg-zinc-200">
                                <div className="space-y-2 p-2">
                                    {theyyam.popularity && (
                                        <p><span className="font-medium">Popularity:</span> {theyyam.popularity}</p>
                                    )}
                                    {theyyam.descriptions && (
                                        <img 
                                            className="w-64 h-48 object-cover" 
                                            src={theyyam.descriptions} 
                                            alt="theyyam img" 
                                        />
                                    )}
                                    {theyyam.god && (
                                        <p><span className="font-medium">God:</span> {theyyam.god}</p>
                                    )}
                                    {theyyam.story && (
                                        <p>
                                            <span className="font-medium">Story:</span>{' '}
                                            {theyyam.story.length > 120 
                                                ? `${theyyam.story.substring(0, 120)}...`
                                                : theyyam.story
                                            }
                                        </p>
                                    )}
                                    {theyyam.temples && (
                                        <p><span className="font-medium">Temples:</span> {theyyam.temples}</p>
                                    )}
                                    {theyyam.img && (
                                        <p><span className="font-medium">img:</span> {theyyam.img}</p>
                                    )}
                                    {theyyam.imgs && (
                                        <p><span className="font-medium">imgs:</span> {theyyam.imgs}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TheyyamView;