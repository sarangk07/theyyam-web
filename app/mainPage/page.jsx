'use client'

import React, { useRef,useState,useEffect} from 'react';
import Calendar from '../componets/Calendar';
import { RiseLoader } from 'react-spinners';
import { LocalTempleData } from '../api/localData/Ltemples';
import { LocalTheyyamData } from '../api/localData/Ltheyyams';
import gsap from 'gsap';
import Swastika from '../componets/customLoader';
import theyyamView from '../theyyam/[id]/page';
import { useRouter } from 'next/navigation';
import IntroductionText from '../componets/IntroductionText';

function MainPage() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theyyam,setTheyyams] = useState([])

  const [today, setToday] = useState(null);
  const [tenDaysFromNow, setTenDaysFromNow] = useState(null);
  const route = useRouter()

//gsap -----------------
const [titleRef, setTitleRef] = useState(null);

// const [theyyamBox, setTheyyamBox] = useState(null);

  useEffect(() => {
    
    if (typeof window !== 'undefined' && titleRef) {
      gsap.to(titleRef, {
        color: 'white', 
        duration:15, 
        repeat: -1, 
        yoyo: true, 
        ease: "power1.inOut"
      });
    }
  }, [titleRef]);

//-------------------------

  useEffect(() => {
    const currentDate = new Date();
    const tenDaysLater = new Date();
    tenDaysLater.setDate(currentDate.getDate() + 10);
    setToday(currentDate);
    setTenDaysFromNow(tenDaysLater);
  }, []);

  const getUpcomingFestivals = () => {
    if (!today || !tenDaysFromNow) return [];
    return temples.filter(item => {
      const startDate = new Date(`${today.getFullYear()}-${item.festival_start_time}`);
      const endDate = new Date(`${today.getFullYear()}-${item.festival_end_time}`);
      return startDate <= tenDaysFromNow && endDate >= today;
    });
  };
  

  // const getUpcomingFestivals = () => {
  //   const today = new Date();
  //   const tenDaysFromNow = new Date();
  //   tenDaysFromNow.setDate(today.getDate() + 10);
    

  //   return temples.filter(item => {
  //     const startDate = new Date(`${today.getFullYear()}-${item.festival_start_time}`);
  //     const endDate = new Date(`${today.getFullYear()}-${item.festival_end_time}`);
  //     return (startDate <= tenDaysFromNow && endDate >= today);
  //   });
  // };

//---

  const [choice,setChoice] = useState('default')
  const upcomingFestivals = getUpcomingFestivals();

// console.log('ttt',upcomingFestivals);


  useEffect(() => {
      fetchTemples();
  }, []);


//api-----------------
  // const fetchTemples = async () => {
  //     try {
  //         const response = await fetch('/api/temples');
  //         if (!response.ok) {
  //             throw new Error('Failed to fetch temples');
  //         }
  //         const data = await response.json();
  //         console.log(data,'templeeeeeeeeeeeeeeeeeeeeeeeeeeee');
          
  //         setTemples(data);
  //     } catch (err) {
  //         setError(err.message);
  //     } finally {
  //         setLoading(false);
  //     }
  // };


//local-datas--------------
  const fetchTemples = ()=> {
    try{
      if (!LocalTempleData) {
        throw new Error('Failed to fetch temples');
      }
      setTemples(LocalTempleData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
      fetchTheyyams();
  }, []);


//api-----------------
  // const fetchTheyyams = async ()=>{
  //     try{
  //         const response = await fetch('/api/theyyams')
  //         if (!response.ok) {
  //             throw new Error('Failed to fetch theyyam');
  //         }
  //         const datas = await response.json()
  //         console.log(datas,'==================');
          
  //         setTheyyams(datas)
  //     }catch(e){
  //         console.log(e);
          
  //     }finally{
  //         setLoading(false)
  //     }
  // }


//local-datas--------------
  const fetchTheyyams = ()=> {
    try{
      if (!LocalTheyyamData) {
        throw new Error('Failed to fetch theyyams');
      }
      setTheyyams(LocalTheyyamData);
      console.log(LocalTheyyamData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }



  if(loading){
    return <div className="flex justify-center items-center w-full h-screen"><RiseLoader color='#e88015' /></div>
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
    <div className='bg-amber-50 w-full cursor-default overflow-x-hidden h-screen'>
      <div className='h-fit relative'>
        <div className='h-1/4'>
        <div ref={(el) => setTitleRef(el)} className='text-right text-black text-2xl md:text-3xl font-street relative font-extrabold bg-gradient-to-b from-red-800 to-orange-400 p-4 pb-10'>
        <div className='absolute'>
          <Swastika/>   
        </div>    
          <p>Theyyam Web</p>
        </div>
        </div>
        <h3 
          className='font-mono px-4 absolute w-full flex-wrap bg-transparent border-b-2 text-emerald-950 text-left'
        >
        Theyyam Festival Happening Now [With in 10 Days....]
      </h3> 
        <div className='h-3/4 md:pt-3 font-serif pt-10 bg-gradient-to-t  from-amber-50 to-orange-400 overflow-auto'>
          <div className='flex  justify-between w-fit mt-4'>
            
            
            
            {upcomingFestivals && upcomingFestivals.length > 0 ? 
            <>
            {upcomingFestivals.map((item, index) => (
              <div key={index} className='text-zinc-800 flex-wrap cursor-default my-5 bg-gradient-to-t from-orange-200 to-orange-600 rounded-md border-4 border-orange-200 p-5  flex flex-col items-center justify-center lg:flex-row mr-10 ml-5  w-80  lg:w-96'>
                <div className='mb-4 lg:mb-2 lg:mr-5'>
                  <p className='font-bold text-zinc-50'>{item.name}</p>
                  <p className='text-xs'>Place: {item.place}</p>
                  {/* <p>Popularity: {item.popularity}</p> */}
                  <div className='border rounded-md p-1 bg-orange-200'>
                    <h1 className='font-bold'>Festival <span className='text-xs'>[{item.malayala_masam ? item.malayala_masam : ''}]</span></h1>
                    <div className='text-xs flex justify-between lg:flex-col'>
                        <p>Starts: {item.festival_start_time}</p>
                        <p>Ends: {item.festival_end_time}</p>
                    </div> 
                  </div>
                   
                  <p className='font-bold text-sm'>Theyyams:</p>
                  {item.theyyams && item.theyyams.length > 0 ? (
                    <div className='flex flex-wrap'>
                      {item.theyyams.map((theyyam, index) => (
                        <p key={index} className="cursor-pointer text-xs pr-3 ">
                          {theyyam},
                        </p>
                      ))}
                    </div>
                  ) : (
                    <>No Datas</>
                  )}  
                </div>
                <div>
                  <img className='max:w-40 min-w-36 md:min-w-40 rounded-sm' src={(item.img ?? item.address) || "./imgs/temple.png"} alt={item.name} width={100} height={100} />
                </div>
              </div>
            ))}
            </> 
            :
            <>
              <p className='text-orange-900 pl-4  flex justify-center items-center'>Sorry No Temples Found with Theyyams...</p>
            </>}
            
          </div>
          <div className='mt-5  '>
            <IntroductionText/>
          </div>
        </div>
      </div>

      <div className='h-fit bg-orange-50 text-zinc-800'>
      <div className='mt-3'>
        <div className='flex justify-between px-4'>
            <h1 className='cursor-pointer font-mono font-semibold' onClick={()=>setChoice('cal')}>Theyyam Calender</h1>
            <h1 className='cursor-pointer font-mono font-semibold' onClick={()=>setChoice('default')}>Theyyam Gallery</h1>
        </div>

        <div>
            {choice == 'cal' ? 
            <div className='flex justify-center items-center'>
              <Calendar templesData={temples} TodayDate={today}/>
            </div>
            
            :

            <>
            <div className='flex flex-wrap justify-center pb-10 pt-10 ' >
            {theyyam.map((data, index) => (
              <div key={index}
                onClick={() => route.push(`/theyyam/${data.id}`)}
                className='relative  cursor-pointer rounded-md border bg-zinc-300  m-2 p-4 flex flex-col items-center h-28 md:h-48 w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5' style={{filter: 'drop-shadow(8px 8px 3px rgb(253 186 116))'}}>
                <img 
                  alt="" 
                  className='absolute rounded-md inset-0 object-cover bg-orange-200 w-full  h-full z-0' 
                  src={(data.img ?? data.descriptions) || "./imgs/theyyamLandingPG2.png"} 
                />
                <p className='font-bold justify-end absolute bottom-1 p-2 z-10 bg-transparent backdrop-blur-sm rounded-md text-white text-xs md:text-lg'>{data.name || 'Not Found'}</p>
              </div>
            ))}
            </div>
            </>}

        </div>
      </div>
      </div>
    </div>

    </div>

  );
}

export default MainPage;