import React from 'react'
import Image from 'next/image'

export default function browser() {
  return (
    <div className='bg-[#e3e3e1] w-[90%] h-auto m-auto mt-20 py-10 rounded-3xl'>
        <h3 className='text-[40px] font-[900] text-center pb-5'>BROWSER BY DRESS STYLES</h3>
      <div className='flex justify-center items-center gap-5 flex-wrap'>
      <Image
        src="/banner1.png"
        alt="Banner Image"
        className="object-cover w-[300px] h-[200px] rounded-[20px] lg:h-[250px] lg:w-[350px] xl:w-[400px] xl:h-[300px] "
        width="300" 
        height="300"        
        />
        <Image
        src="/banner2.png"
        alt="Banner Image"
        className=" w-[300px] h-[200px] rounded-[20px] lg:w-[500px] lg:h-[250px] xl:w-[700px] xl:h-[300px]"
        width="300" 
        height="300"        
        />
      </div>
      <div className='flex justify-center items-center gap-5 flex-wrap mt-6'>
        <Image
          src="/banner3.png"
          alt="Banner Image"
          className=" w-[300px] h-[200px] rounded-[20px] lg:w-[500px] lg:h-[250px] xl:w-[700px] xl:h-[300px]"
          width="300" 
          height="300"        
          />
      <Image
        src="/banner4.png"
        alt="Banner Image"
        className="object-cover w-[300px] h-[200px] rounded-[20px] lg:h-[250px] lg:w-[350px] xl:w-[400px] xl:h-[300px] "
        width="300" 
        height="300"        
        />
      </div>
    </div>
  )
}
