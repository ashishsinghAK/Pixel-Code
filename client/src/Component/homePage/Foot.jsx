import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble, BsLinkedin } from 'react-icons/bs';

export const Foot = () => {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              PIXEL-CODE
            </h2>
            <p className="text-gray-300">
              Learn coding with industry experts. Get hands-on experience and become job-ready.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-12">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Pixel-Code
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Follow</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/ashishsinghAK" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                    <BsGithub className="mr-2" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/ashish-kumar-singh-a852b426a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                    <BsLinkedin className="mr-2" /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-start md:items-end space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <BsFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <BsInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <BsTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <BsDribbble className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <Footer.Divider className="my-8 border-gray-700" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <Footer.Copyright 
            href="#" 
            by="PIXEL-CODE" 
            year={new Date().getFullYear()} 
            className="text-gray-400"
          />
          
         
        </div>
      </div>
    </footer>
  );
};