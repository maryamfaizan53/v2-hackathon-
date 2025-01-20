import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import Link from 'next/link';

export default function footer() {
  return (
    <div className='bg-[#e3e3e1] w-[100%] h-auto p-3 flex justify-evenly items-start flex-col md:flex-row pt-32'>
      <div className='w-[100%] pl-10'>
        <h4 className='text-[40px] font-extrabold'>SHOP.C0</h4>
        <p>We have clothes that suits your style and  <br />
         which you’re proud to wear
          From <br />
          women to men.</p>
        <div className='flex py-6 gap-5 '>
        <FaFacebook size='30px' />
        <AiFillInstagram size='30px'/>
        <AiFillTwitterCircle size='30px'/>
        </div>
      </div>
<div className='flex justify-around items-center w-[100%] mb-10'>
      <div>
        <h4 className='text-[20px] font-bold'>COMPANY</h4>
        <Link href='#'>About</Link> <br />
        <Link href='#'>Feature</Link> <br />
        <Link href='#'>Works</Link> <br />
        <Link href='#'>Career</Link> <br />
      </div>
      <div>
      <h4 className='text-[20px] font-bold'>HELP</h4>
      <Link href='#'>Customer Support</Link> <br />
        <Link href='#'>Delivery Details</Link> <br />
        <Link href='#'>Terms & Conditions</Link> <br />
        <Link href='#'>Privacy Policy</Link> <br />
      </div>
      </div>
      <div className='flex justify-around items-center w-[100%]'>
      <div>
      <h4 className='text-[20px] font-bold'>FAQS</h4>
        <Link href='#'>Accounts</Link> <br />
        <Link href='#'>Manage Deliery</Link> <br />
        <Link href='#'>Orders</Link> <br />
        <Link href='#'>Payments</Link> <br />
      </div>
      <div>
      <h4 className='text-[20px] font-bold'>RESOURCES</h4>
        <Link href='#'>Free ebooks</Link> <br />
        <Link href='#'>Development Tutorials</Link> <br />
        <Link href='#'>How to - Blog</Link> <br />
        <Link href='#'>Youtube Playlist</Link> <br />
      </div>
      </div>
    </div>
  )
}
