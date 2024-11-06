'use client'

import React from 'react';
import TDatas from '../api/datas/AllDatas';
import Theyyams from '../api/datas/TheyyamLists';
import { useState,useEffect } from 'react';

function MainPage() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUpcomingFestivals = () => {
    const today = new Date();
    const tenDaysFromNow = new Date();
    tenDaysFromNow.setDate(today.getDate() + 10);
    

    return temples.filter(item => {
      const startDate = new Date(`${today.getFullYear()}-${item.festival_start_time}`);
      const endDate = new Date(`${today.getFullYear()}-${item.festival_end_time}`);
      return (startDate <= tenDaysFromNow && endDate >= today);
    });
  };

//-------------------

  const [choice,setChoice] = useState('default')
  const upcomingFestivals = getUpcomingFestivals();



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

  if(loading){
    return <div>loading.....</div>
  }

  return (
    <div className='bg-zinc-300 w-full cursor-default h-[200vh]'>
      <div className='h-2/5'>
        <div className='h-1/4'>
        <div className='text-center bg-red-700 p-4'>Welcome to the land of culture</div>
        <h3 className='font-mono bg-zinc-300 text-emerald-950 text-center'>Theyyam Festival Happening Now [With in 10 Days....]</h3> 
        </div>

        <div className='h-3/4  bg-zinc-300 overflow-auto'>
          <div className='flex  justify-between w-fit mt-4'>
            {upcomingFestivals.map((item, index) => (
              <div key={index} className='text-zinc-800 cursor-default  bg-zinc-100 rounded-md border-2 border-zinc-200 p-5  flex flex-col items-center justify-center lg:flex-row mr-10 ml-5  w-72  lg:w-96'>
                <div className='mb-4 lg:mb-2 lg:mr-5'>
                  <p className='font-bold'>{item.name}</p>
                  <p className='text-xs'>Place: {item.place}</p>
                  {/* <p>Popularity: {item.popularity}</p> */}
                  <div className='border rounded-sm p-1 bg-zinc-200'>
                    <h1 className='font-bold'>Festival <span className='text-xs'>[{item.malayala_masam ? item.malayala_masam : ''}]</span></h1>
                    <div className='text-xs flex justify-between lg:flex-col'>
                        <p>Starts: {item.festival_start_time}</p>
                        <p>Ends: {item.festival_end_time}</p>
                    </div>
                  </div>
                  
                  <p className='cursor-pointer'>more...</p>
                </div>
                <div>
                  <img className='max:w-40 min-w-36 md:min-w-40 rounded-sm' src={item.img || "./imgs/temple.png"} alt={item.name} width={100} height={100} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='h-3/5 bg-zinc-300 text-zinc-800'>
      <div className='pt-4 pb-3'>
        <div className='flex justify-center items-center flex-col'>
        <input type="search" className='w-56 text-black ' placeholder='Search Temples/Theyyams'/>
        </div>
      </div>
      <div>

        <div className='flex justify-between px-4'>
            <h1 className='cursor-pointer' onClick={()=>setChoice('cal')}>Theyyam Calender</h1>
            <h1 className='cursor-pointer' onClick={()=>setChoice('default')}>Theyyam Gallery</h1>
        </div>

        <div>
            {choice == 'cal' ? 
            <>
                <div>calender</div>
            </>
            
            :


            <>
            <div className='flex flex-wrap justify-center'>
            {Theyyams.map((data, index) => (
              <div key={index} className='relative rounded-md border bg-zinc-300  m-2 p-4 flex flex-col items-center md:h-48 w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                <img 
                  alt="" 
                  className='absolute rounded-md inset-0 object-cover bg-zinc-300 w-full h-full z-0' 
                  src={data.img || "./imgs/temple.png"} 
                />
                <p className='font-bold  justify-end relative bottom-2  p-2 z-10 bg-transparent backdrop-blur-lg rounded-md text-white text-lg'>{data.name || 'Not Found'}</p>
              </div>
            ))}
            </div>
            </>}

        </div>
      </div>
      </div>
    </div>
  );
}

export default MainPage;