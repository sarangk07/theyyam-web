import React from 'react'
import { useState,useEffect } from 'react';
import { PropagateLoader } from 'react-spinners';

function TheyyamView() {
    const [theyyam,setTheyyams] = useState([])
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        fetchTheyyams();
    }, []);

    //fetch theyyams
    const fetchTheyyams = async ()=>{
        try{
            const response = await fetch('/api/theyyams')
            if (!response.ok) {
                throw new Error('Failed to fetch theyyam');
            }
            const datas = await response.json()
            console.log(datas,'==================');
            
            setTheyyams(datas)
        }catch(e){
            console.log(e);
            
        }finally{
            setLoading(false)
        }
    }



    // Function to handle theyyam deletion
    const handleDelete = async (theyyamId) => {
        if (!confirm('Are you sure you want to delete this theyyam?')) return; 

        try {
            const response = await fetch(`/api/theyyams?id=${theyyamId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                console.log(data.message);
                
                // Refresh the list of theyyams after deletion
                setTheyyams(prevtheyyams => prevtheyyams.filter(theyyam => theyyam.id !== theyyamId));
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error deleting theyyam:', error);
            alert('An error occurred while deleting the theyyam.');
        }
    };





    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <PropagateLoader />
            </div>
        );
    }
return (
<>
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {theyyam?.map((data)=>(
        <div key={data.id} className="bg-zinc-300 p-4 rounded-md text-zinc-800">
            <div className="border-b border-zinc-300">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{data.name}</h3>
                    <div className='cursor-pointer text-zinc-100'>
                        <span className="bg-red-900 px-2 mr-3 py-1 rounded text-sm" onClick={()=>handleDelete(data.id)}>
                            Delete
                        </span>
                        <span className="bg-blue-900 px-2 py-1 rounded text-sm">
                            Edit
                        </span>
                    </div>   
                </div>
            </div>
            <div className="pt-4">
                <div className="space-y-2">
                    
                    {data.popularity && (
                       <p>Popularity: {data.popularity}</p>
                    )}
                    {data.descriptions && (
                        <img 
                        className="w-64 h-48 object-cover" 
                        src={data.descriptions} 
                        alt="" 
                      />
                    )}
                    {data.phone && (
                        <p><span className="font-medium">story:</span> {story.phone}</p>
                    )}
                    {data.god && (
                        <p><span className="font-medium">god:</span> {data.god}</p>
                    )}
                </div>
            </div>
        </div>
    ))}   
    </div> 
</>
)
}

export default TheyyamView
