import React from 'react'
import { useState,useEffect } from 'react';

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






if(loading){
    return <div>Loading.....</div>
}
return (
<>
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {theyyam?.map((data)=>(
        <div key={data.id} className="bg-zinc-800 p-4 rounded-md text-zinc-100">
            <div className="border-b border-zinc-700">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{data.name}</h3>
                    <button className="bg-zinc-700 px-2 py-1 rounded text-sm">
                        Delete
                    </button>
                    <span className="bg-zinc-700 px-2 py-1 rounded text-sm">
                        Popularity: {data.popularity}
                    </span>
                </div>
            </div>
            <div className="pt-4">
                <div className="space-y-2">
                    
                    {data.descriptions && (
                        <p><span className="font-medium">descriptions:</span> {data.descriptions}</p>
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
