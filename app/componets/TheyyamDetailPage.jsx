'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { LocalTheyyamData } from '../api/localData/Ltheyyams';


export default function TheyyamDetailPage() {
  const params = useParams();
  const [theyyamData, setTheyyamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
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
    <div  className="relative">
      <div 
        className="w-full h-screen flex flex-col justify-center items-center bg-black absolute text-white"
      >
        <div className="relative w-full max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <img
              src={(theyyamData.img ?? theyyamData.descriptions) || "./imgs/theyyamLandingPG2.png"}
              alt={theyyamData.name}
              className="w-full h-[50vh] object-cover rounded-b-lg"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">{theyyamData.name}</h1>
          {theyyamData.god && (
            <p className="text-xl mb-2">Deity: {theyyamData.god}</p>
          )}
          <div className="flex items-center">
            <span className="mr-2">Popularity:</span>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={index < theyyamData.popularity ? 'text-yellow-500' : 'text-gray-500'}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
}