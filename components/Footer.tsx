"use client";

import React from "react";
import Link from "next/link";
import localFont from "next/font/local";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiInstagram,
  FiArrowUp,
  FiHeart,
} from "react-icons/fi";

const bueno_regular = localFont({
  src: "./bueno-regular.otf",
});

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub size={20} />,
      href: "https://github.com/rangelkoli", // Update with your GitHub
      color: "hover:text-gray-800",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin size={20} />,
      href: "https://linkedin.com/in/rangelkoli", // Update with your LinkedIn
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: <FiTwitter size={20} />,
      href: "https://twitter.com/rangelkoli", // Update with your Twitter
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: <FiInstagram size={20} />,
      href: "https://instagram.com/rangelkoli", // Update with your Instagram
      color: "hover:text-pink-500",
    },
    {
      name: "Email",
      icon: <FiMail size={20} />,
      href: "mailto:rangelkoli@gmail.com", // Update with your email
      color: "hover:text-red-500",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className='relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 border-t border-orange-100 footer-animate'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Main Footer Content */}
        <div className='pt-16 pb-12'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 footer-grid'>
            {/* Brand Section */}
            <div className='lg:col-span-2 footer-brand'>
              <div className='mb-8'>
                <Link href='/' className='inline-block'>
                  <span
                    className={`${bueno_regular.className} text-5xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 uppercase tracking-wider`}
                  >
                    RANGEL
                  </span>
                </Link>
              </div>
              <p className='text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl uppercase tracking-wide font-medium'>
                FULL-STACK DEVELOPER PASSIONATE ABOUT CREATING DIGITAL
                EXPERIENCES THAT MAKE A DIFFERENCE. TURNING IDEAS INTO REALITY
                THROUGH CODE, ONE PROJECT AT A TIME.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-8 uppercase tracking-wider'>
                GET IN TOUCH
              </h3>
              <div className=''>
                <div className='flex items-center space-x-4 text-gray-600'>
                  <FiMail className='text-blue-500' size={24} />
                  <a
                    href='mailto:rangelkoli@gmail.com'
                    className='text-lg hover:text-blue-600 transition-colors duration-300 uppercase tracking-wide font-medium'
                  >
                    rangelkoli@gmail.com
                  </a>
                </div>

                {/* Social Links */}
                <div className='pt-4'>
                  <div className='flex space-x-4 footer-social'>
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`p-3 bg-white rounded-full shadow-md border border-gray-200 text-gray-600 transition-all duration-300 hover:shadow-lg ${social.color}`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none'></div>

      {/* Floating dots decoration */}
      <div className='absolute top-8 right-8 opacity-20'>
        <div className='grid grid-cols-3 gap-2'>
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className='w-2 h-2 bg-blue-400 rounded-full floating-dots'
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
