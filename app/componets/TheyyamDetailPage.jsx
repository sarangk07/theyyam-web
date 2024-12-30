'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { LocalTheyyamData } from '../api/localData/Ltheyyams';
import Swastika from './customLoader';
import { useRouter } from 'next/navigation';


export default function TheyyamDetailPage() {
  const params = useParams();
  const [theyyamData, setTheyyamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRouter()


  useEffect(() => {
    try {
      if (!LocalTheyyamData || !Array.isArray(LocalTheyyamData)) {
        throw new Error('Theyyam data is not available');
      }

      const theyyamId = parseInt(params.id, 10);
      const foundTheyyam = LocalTheyyamData.find(t => 
        t && typeof t === 'object' && t.id === theyyamId
      );

      if (!foundTheyyam) {
        throw new Error(`Theyyam with ID ${theyyamId} not found`);
      }

      setTheyyamData(foundTheyyam);
    } catch (err) {
      console.error('Error loading theyyam:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params.id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Swastika/>
      </div>
    );
  }

  if (error || !theyyamData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Theyyam not found</h1>
          <p className="mt-2">{error || 'The requested theyyam details could not be found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div  className="relative w-full h-fit ">
      <div 
        className="w-full flex flex-col  bg-gradient-to-t from-zinc-950 to-red-900 justify-center items-center  absolute text-white"
      >
      <button className='absolute top-3 left-3 z-50' onClick={()=>route.push('/mainPage')}>Back</button>

        <div className="relative  w-full max-w-4xl mx-auto p-6">
          <div className="mb-8 mt-10">
            <img
              src={(theyyamData.img ?? theyyamData.descriptions) || "./imgs/theyyamLandingPG2.png"}
              alt={theyyamData.name}
              className="w-full h-[50vh] object-cover rounded-tr-[5rem] rounded-bl-[5rem]"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">{theyyamData.name}</h1>
          {theyyamData.god && (
            <p className="text-xl mb-2">Deity: {theyyamData.god}</p>
          )}
          <div>
            <p className='underline underline-offset-2 mt-10'>Story</p>
            {theyyamData && theyyamData.story ?
            <p className='text-sm'>
              {theyyamData.story}
            </p>
            :
            <>no story found!</>}
          </div>
          

        </div>
      </div> 
    </div>
  );
}