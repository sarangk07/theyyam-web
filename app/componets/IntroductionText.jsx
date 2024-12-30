import React from 'react'

function IntroductionText() {
  return (
    <div className='relative overflow-hidden rounded-tr-[5rem] rounded-bl-[5rem] flex justify-center items-center flex-col'>
      <img src="/imgs/introtextbgImg.jpg" alt="introtextbgImg" className='absolute opacity-80 bg-transparent  w-36 md:w-60  object-cover  z-0'/>
      
      
      <h2 className='text-zinc-300 relative w-full z-10 p-8 pt-2 lg:text-lg text-wrap backdrop-blur-sm backdrop-brightness-75 font-semibold'>About Theyyam</h2>

      <p className='text-white z-10 relative p-8 pb-1 pt-2 lg:text-lg  text-wrap backdrop-blur-sm backdrop-brightness-75 font-semibold'>
        Theyyam, also known as Kaliyattam, is a vibrant and sacred Hindu religious ritual dance form originating from North Kerala, particularly in the regions of Kannur and Kasaragod. This unique art form combines elements of dance, mime, and music, serving as a profound expression of spirituality and cultural heritage for the local communities.
      </p>

      <p className='text-white relative z-10 p-8 pt-2 lg:text-lg text-wrap backdrop-blur-sm backdrop-brightness-75 font-semibold'>
          Theyyam's roots can be traced back to ancient tribal traditions, where it was performed as a means of worshipping local deities, ancestors, and nature spirits. The term "theyyam" derives from the Sanskrit word daivam, meaning god or deity. Each performance embodies a specific divine figure or heroic character, allowing the performer—known as Kolam—to channel the essence of that deity during the ritual.
          Theyyam is not merely a performance; it is a deeply spiritual experience for both the performers and the audience. It is believed that during the ritual, the deity descends into the performer, making them a conduit for divine energy. This connection reinforces the community's belief in the protective power of the Theyyam, which is seen as a guardian spirit for the village.
      </p>

    </div>
  )
}

export default IntroductionText
