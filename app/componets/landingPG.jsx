'use client'

import React from 'react'
import Swastika from './customLoader'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function LandingPG() {
  const [leftW, setLeftW] = useState(null)
  const [rightW, setRightW] = useState(null)
  const [startbtn, setStartbtn] = useState(null)
  const [start, setStart] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && start) {
      const tl = gsap.timeline()

      tl.to(leftW, {
        left: -1200,
        overflow: 'hidden',
        duration: 3,
        display: 'none',
        ease: "power1.inOut"
      })
      .to(rightW, {
        right: -1200,
        overflow: 'hidden',
        duration: 3,
        display: 'none',
        ease: "power1.inOut"
      }, "<") 
      .to(startbtn, {
        top: -600,
        overflow: 'hidden',
        duration: 2,
        display: 'none',
        ease: "power1.inOut"
      }, "<")
    }
  }, [start, leftW, rightW, startbtn, router])

  const onStart = () => {
    setStart(true)
    setTimeout(()=>{
        router.push('/mainPage/')
    },1800)
  }

  return (
    <div>
      <div 
        ref={(el) => setLeftW(el)} 
        className="fixed w-[50%] left-0 h-full border-r-8 border-red-700 bg-black z-40 overflow-hidden"
      >
        <div className="w-full h-full relative">
          <img 
            src="https://i.pinimg.com/1200x/dc/fd/da/dcfddabd6f5b2533fe615aeb49a295b0.jpg" 
            alt="theyyamLPaG2"
            className="absolute w-full h-screen object-cover object-center md:object-right-top"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
      
      <div 
        ref={(el) => setRightW(el)} 
        className="fixed w-[50%] right-0 h-full border-l-8 border-red-700 bg-black z-40 overflow-hidden"
      >
        <div className="w-full h-full relative">
          <img 
            src="https://i.pinimg.com/1200x/b8/c1/19/b8c119223267d926a457a0049a4aaa77.jpg" 
            alt="theyyamLPaG1"
            className="absolute w-full h-screen object-cover object-center md:object-left-top"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      <div 
        ref={(el) => setStartbtn(el)}
        onClick={onStart} 
        className="fixed rounded-tr-full border-2 border-yellow-300 backdrop-blur-md rounded-bl-full cursor-pointer top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-40 flex justify-center items-center bg-red-700"
      >
        <Swastika/> 
      </div>
    </div>
  )
}

export default LandingPG