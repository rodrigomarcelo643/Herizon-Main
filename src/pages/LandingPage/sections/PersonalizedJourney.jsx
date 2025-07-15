import { useState } from "react";

function PresonalizedJourney() {
  return (
    <>
    <div className='min-h-screen font-montserrat-light bg-[#817773] bg-cover pt-20 flex flex-col text-center'>
      <h1 className='text-white text-5xl leading-snug'><span>PERSONALIZED YOUR<br/>JOURNEY</span></h1>
      <p className="text-white text-lg mt-2">This helps Herizon tailor the AI responses and mentor matches</p>
      <form>
        <div className='flex flex-row justify-center gap-4 mt-16'>
          <input type='text' className='input-name border-1 border-[#E1D7CD] text-white font-montserrat-light text-lg rounded-full py-2 px-4' placeholder="Name"></input>
          <select className='cursor-pointer bg-[#817773] border-1 border-[#E1D7CD] text-white font-montserrat-light text-lg rounded-full py-2 px-4'>
            <option value="" disabled selected>Select your business area</option>
            <option value="tech">Technology</option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
          </select>
          <select className='cursor-pointer bg-[#817773] border-1 border-[#E1D7CD] font-montserrat-light text-white text-lg rounded-full py-2 px-4'>
            <option value="" selected disabled>Ask area of help needed</option>
            <option value="technical_support">Technical Support</option>
            <option value="ai_assistance">AI Assistance</option>
            <option value="mentorship">Mentorship</option>
            <option value="general_inquiry">General Inquiry</option>
          </select>
        </div>
        <button className="text-xl text-[#1F2937] py-3 px-20 bg-white rounded-full transform hover:scale-105 transition-all ease-in-out cursor-pointer mt-12">Continue</button>
      </form>
    </div>
    </>
  )
}

export default PresonalizedJourney