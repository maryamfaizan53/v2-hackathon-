import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function herosection() {
  return (
    <div>
      <div className="mt-3 lg:flex md:m-16 lg:m-0">
        <div className="bg-[#F2F0F1] w-full h-[665px] p-16 mb-0 ">
          <h1 className="text-[45px] font-[900] pl-3 leading-[45px] m-0 md:text-[26px] lg:text-[60px] lg:leading-[70px] xl:text-[85px] xl:leading-[80px]">
            FIND CLOTHES
          </h1>
          <h1 className="text-[45px] font-[900] pl-3 leading-[45px] m-0 md:text-[26px] lg:text-[60px] lg:leading-[70px] xl:text-[85px] xl:leading-[80px]">
            {" "}
            THAT MATCHES
          </h1>
          <h1 className="text-[45px] font-[900] pl-3 leading-[45px] m-0 md:text-[26px] lg:text-[60px] lg:leading-[70px] xl:text-[85px] xl:leading-[80px]">
            YOUR STYLES
          </h1>
          <p className="text-[18px] pl-3 pt-3">
            Browse through our diverse range of meticulously crafted
            garment,designed to bring out your individuality and cater to your
            sense of style.
          </p>
          <Link href="/items">
            <button className="flex justify-center items-center border-2 border-black rounded-3xl text-center px-28 py-3 ml-3 mt-3 bg-black text-white text-2xl md:px-20 ">
              Shop Now
            </button>
          </Link>
        </div>
        <Image
          src="/images/h1.png"
          alt="hero-image"
          width={1440}
          height={663}
          className="w-[100%] sm:w-[500px] md:w-[400px] lg:w-[663px] h-auto"
        />
      </div>

      {/* Decorative Vectors */}
      <div className="hidden lg:block absolute lg:top-[30%] lg:right-[3%] animate-spin-slow">
        <Image
          src="/images/v1.png" // Replace with your vector path
          alt="Decorative Vector 1"
          width={80}
          height={80}
          className="w-14 lg:w-16"
        />
      </div>

      <div className="hidden lg:block absolute lg:top-[65%] lg:right-[32%] animate-spin-reverse">
        <Image
          src="/images/v2.png" // Replace with your vector path
          alt="Decorative Vector 2"
          width={50}
          height={50}
          className="w-12 lg:w-14"
        />
      </div>

     

      <div
        id="brand"
        className="flex justify-evenly items-center flex-wrap bg-black text-white text-xl font-medium py-7 md:text-2xl md:font-bold lg:text-3xl xl:text-4xl xl:py-8 xl:font-extrabold mt-0"
      >
        <Image src="/images/v6.png" alt="brand logo" width={167} height={33} />
        <Image src="/images/v3.png" alt="brand logo" width={167} height={33} />
        <Image src="/images/v4.png" alt="brand logo" width={167} height={33} />
        <Image src="/images/v7.png" alt="brand logo" width={167} height={33} />
        <Image src="/images/v5.png" alt="brand logo" width={167} height={33} />
      </div>
    </div>
  );
}
