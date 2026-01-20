"use client";

import React from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const mango = localFont({
  src: "../public/MangoGrotesque/MangoGrotesque-Bold.ttf",
});

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className='w-full px-4 mb-4'>
      <div className='relative bg-white rounded-[40px] text-black overflow-hidden pt-16 px-6 md:px-12 pb-0'>
        <div className='max-w-[1400px] mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24'>
            <div className='md:col-span-4'>
              <h2 className='text-3xl md:text-4xl font-semibold leading-tight'>
              Let&apos;s build something users actually enjoy using.

              </h2>
              <div className='mt-6'>
                <a
                  href='mailto:rangelkoli@gmail.com'
                  className='group inline-flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-500 hover:text-black transition-colors'
                >
                  <span className="border-b-2 border-transparent group-hover:border-black transition-all duration-300">Connect</span>
                  <svg 
                    className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className='md:col-span-2'>
              <h3 className='text-lg font-semibold mb-6 text-[#FF9F2E]'>Explore</h3>
              <ul className='space-y-4 text-gray-500'>
                <li>
                  <Link href='/' className='hover:text-black transition-colors'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='#about'
                    className='hover:text-black transition-colors'
                  >
                    About Me
                  </Link>
                </li>

              </ul>
            </div>

            <div className='md:col-span-5'>
              <h3 className='text-lg font-semibold mb-6 text-[#4F91F0]'>Follow Me</h3>
              <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
                <a
                  href='https://linkedin.com/in/rangelkoli'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-500 hover:text-[#0A66C2] transition-colors flex items-center gap-2 group'
                >
                  <FaLinkedin size={18} className='text-[#0A66C2]' />
                  <span className='group-hover:text-black'>LinkedIn</span>
                </a>
                <a
                  href='https://github.com/rangelkoli'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-500 hover:text-black transition-colors flex items-center gap-2 group'
                >
                  <FaGithub size={18} className='text-[#181717]' />
                  <span className='group-hover:text-black'>Github</span>
                </a>
                <a
                  href='https://x.com/rangelkoli'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-500 hover:text-black transition-colors flex items-center gap-2 group'
                >
                  <FaXTwitter size={18} />
                  <span className='group-hover:text-black'>X</span>
                </a>
              </div>
            </div>

            <div className='md:col-span-1'></div>
          </div>
        </div>

        <div className='relative w-full flex justify-center items-end leading-[0.75] select-none pointer-events-none'>
          <h1
            className={`${mango.className} w-full text-[25vw] md:text-[23vw] text-[#F5F5F5] text-center translate-y-[4vw] leading-[0.7]`}
          >
            rangelkoli
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
