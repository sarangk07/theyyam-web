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
        <div key={data.id} className="bg-zinc-300 p-4 rounded-md text-zinc-800">
            <div className="border-b border-zinc-300">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{data.name}</h3>
                    <div className='cursor-pointer text-zinc-100'>
                        <span className="bg-red-900 px-2 mr-3 py-1 rounded text-sm">
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
