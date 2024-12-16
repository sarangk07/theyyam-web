'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Swastika() {
    const mainRef = useRef(null)

    const subRefs = useRef([])
    useEffect(()=>{
        
        
        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        tl.to(subRefs.current, {
            backgroundColor:'yellow',
            duration: 1,
            stagger: 0.3,
            ease: "power1.inOut"
        });

        tl.to(mainRef.current,{
            rotate:'360deg',
            duration:1,
            ease: "power1.inOut"
        })

        // // Reset to original state
        tl.to(subRefs.current, {
            backgroundColor:'#f97316',
            duration: 1,
            stagger: 0.3,
            ease: "power1.inOut"
        });

        tl.to(mainRef.current, {
            backgroundColor: 'transparent',
            duration: 1,
            ease: "power1.inOut"
        }, "<");
    },[])

  return (
    <div ref={mainRef} className='w-[3rem] h-[3rem] bg-transparent flex relative items-center justify-center'>
      <div ref={(el) => (subRefs.current[1] = el)} className='h-1/2 w-4 bg-orange-500 absolute top-0 left-0 rounded-t-md'></div>
      <div ref={(el) => (subRefs.current[8] = el)} className='h-1/2 w-2 bg-orange-500 absolute bottom-0 rounded-b-md'></div>
      <div ref={(el) => (subRefs.current[4] = el)} className='h-1/2 w-2 bg-orange-500 absolute top-0 rounded-t-md'></div>
      <div ref={(el) => (subRefs.current[5] = el)} className='h-1/2 w-4 bg-orange-500 absolute bottom-0 right-0 rounded-b-md'></div>

      <div ref={(el) => (subRefs.current[3] = el)} className='w-1/2 h-4 bg-orange-500 absolute top-0 right-0 rounded-e-md'></div>
      <div ref={(el) => (subRefs.current[6] = el)} className='w-1/2 h-2 bg-orange-500 absolute  right-0 rounded-e-md'></div>
      <div ref={(el) => (subRefs.current[2] = el)} className='w-1/2 h-2 bg-orange-500 absolute left-0 rounded-s-md'></div>
      <div ref={(el) => (subRefs.current[7] = el)} className='w-1/2 h-4 bg-orange-500 absolute bottom-0 left-0 rounded-s-md'></div>
    </div>
  )
}

export default Swastika
