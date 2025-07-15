import React from 'react'
import AnonymousStatic from '../../../assets/images/anonymous-static.svg';
import TestimonialStatic from '../../../assets/images/testimonials-static.svg';

function Testimonials() {
  return (
    <div className='w-full min-h-screen'>
      <div className='flex flex-col mt-20 justify-center items-center'>
        <h1 className='text-4xl'>“</h1>
        <h3 className='text-5xl text-center font-montserrat-light mt-4'>"Smart Support. Bold Dreams.<br/>
        Herizon AI for Women<br/>
        Entrepreneurs."</h3>
        <img className='mt-20' src={AnonymousStatic} alt="static anonymous comment" />
        <img className='mt-16' src={TestimonialStatic} alt="static anonymous comment" />
      </div>
    </div>
  )
}

export default Testimonials