import React from "react";
import { motion } from 'framer-motion';
import DiscordButton from '../components/DiscordButton';
import { Phone } from 'lucide-react';

export default function About() {
  return (
    <>
      {/* Fixed background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.75), 
            rgba(0, 0, 0, 0.7)
          ), url('/img.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Victorian pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(153, 123, 56, 0.1) 2px, transparent 2px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Scrollable content wrapper */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto max-w-6xl pt-20 pb-12 px-4">
          {/* Blur effects */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none"
          >
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-stone-800/15 rounded-full blur-3xl" />
          </motion.div>

          <div className="flex justify-center mb-8">
            <DiscordButton />
          </div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gradient-to-b from-stone-900/70 to-stone-950/70 p-12 rounded-xl 
                       backdrop-blur-md border border-stone-800/40 shadow-2xl relative overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left column - Image and brief intro */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <img 
                    src="/PHOTO-2024-12-28.jpg"
                    alt="Anshi Sachan"
                    className="rounded-full w-full h-full object-cover border-4 border-amber-800/30"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-stone-900/50 to-transparent"></div>
                </div>
                <h1 className="text-3xl font-bold font-serif text-amber-100 mb-4">Anshi Sachan</h1>
                <p className="text-amber-100/80">IT 2nd Year | IET Cipher Member</p>
                <div className="p-6 bg-stone-900/50 rounded-lg border border-stone-800/30">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">About Me</h2>
                  <p className="text-amber-100/80 leading-relaxed">
                  As a passionate systems and backend developer, I'm driven by building high-performance, user-centric solutions. I specialize in Rust, leveraging its power to create scalable, efficient systems that seamlessly bridge low-level programming with exceptional user experiences.
                  </p>
                </div>

                <div className="p-6 bg-stone-900/50 rounded-lg border border-stone-800/30">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Notable Achievements</h2>
                  <ul className="space-y-3 text-amber-100/80">
                    
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Gaining hands-on experience with Rust through a systems programming project.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Building expertise in backend tools like Supabase, React, and Node.js.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Actively contributing to technical club activities and fostering collaboration.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Developing strong problem-solving and analytical skills through challenging technical projects and collaborative efforts.
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-stone-900/50 rounded-lg border border-stone-800/30">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Connect With Me</h2>
                  <div className="flex flex-wrap gap-4 justify-evenly">
                    <a 
                      href="tel:+918310595970"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      +91 8310595970
                    </a>
                    <a 
                      href="https://github.com/Srishti-K15"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"/>
                      </svg>
                      GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/srishti-kumari15"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                      LinkedIn
                    </a>
                    <a 
                      href="mailto:srishtikjaiswal@gmail.com"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
              {/* Left column - Image and brief intro */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <img 
                    src="/PHOTO-2024-12-31-00-28-11.jpg"
                    alt="Suyash Nahar"
                    className="rounded-full w-full h-full object-cover border-4 border-amber-800/30"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-stone-900/50 to-transparent"></div>
                </div>
                <h1 className="text-3xl font-bold font-serif text-amber-100 mb-4">Suyash Nahar</h1>
                <p className="text-amber-100/80">EEE 2nd Year | IET Cipher Member</p>
                <div className="p-6 bg-stone-900/50 rounded-lg border border-stone-800/30">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">About Me</h2>
                  <p className="text-amber-100/80 leading-relaxed">
                    Passionate about hackathons and web development, with a strong focus on frontend development. 
                    I love building innovative solutions using blockchain technology and Web3. Currently exploring 
                    the intersection of decentralized systems and user-friendly interfaces.
                  </p>
                </div>

                <div className="p-6 bg-stone-900/50 rounded-lg border border-stone-800/30">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Notable Achievements</h2>
                  <ul className="space-y-3 text-amber-100/80">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Quadratic Voting 3rd place and Track Prize Winner at ETHIndia 24'
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Finalist and Finance Track Winner at Hackverse 5.0
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Track Prize Winner at Unfold 24'
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Topped UniDAO 2.0 cohort leaderboard - 6-week Web3 bootcamp by Devfolio
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      All India 4th place in Saras AI Clash at IIT Bombay
                </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      All India 2nd place in Code-Red by IEEE
                </li>
              </ul>
                </div>

                <div className="p-6 bg-stone-900/50 rounded-lg border border-stone-800/30">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Connect With Me</h2>
                  <div className="flex flex-wrap gap-4 justify-evenly">
                    <a 
                      href="tel:+917892799071"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      +91 7892799071
                    </a>
                    <a 
                      href="https://github.com/suyash101101"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"/>
                      </svg>
                      GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/suyash-nahar-1a51422a8/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                      LinkedIn
                    </a>
                    <a 
                      href="mailto:naharsuyash@gmail.com"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
              {/* Left column - Image and brief intro */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <img 
                    src="/PHOTO-2024-12-28.jpg"
                    alt="Srishti Kumari"
                    className="rounded-full w-full h-full object-cover border-4 border-amber-800/30"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-stone-900/50 to-transparent"></div>
                </div>
                <h1 className="text-3xl font-bold font-serif text-amber-100 mb-4">Srishti Kumari</h1>
                <p className="text-amber-100/80">CSE 2nd Year | IET Cipher Member</p>
                <div className="p-6 bg-stone-900/50 rounded-lg border border-stone-800/30">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">About Me</h2>
                  <p className="text-amber-100/80 leading-relaxed">
                  As a passionate systems and backend developer, I'm driven by building high-performance, user-centric solutions. I specialize in Rust, leveraging its power to create scalable, efficient systems that seamlessly bridge low-level programming with exceptional user experiences.
                  </p>
                </div>

                <div className="p-6 bg-stone-900/50 rounded-lg border border-stone-800/30">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Notable Achievements</h2>
                  <ul className="space-y-3 text-amber-100/80">
                    
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Gaining hands-on experience with Rust through a systems programming project.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Building expertise in backend tools like Supabase, React, and Node.js.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Actively contributing to technical club activities and fostering collaboration.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Developing strong problem-solving and analytical skills through challenging technical projects and collaborative efforts.
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-stone-900/50 rounded-lg border border-stone-800/30">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Connect With Me</h2>
                  <div className="flex flex-wrap gap-4 justify-evenly">
                    <a 
                      href="tel:+918310595970"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      +91 8310595970
                    </a>
                    <a 
                      href="https://github.com/Srishti-K15"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"/>
                      </svg>
                      GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/srishti-kumari15"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                      LinkedIn
                    </a>
                    <a 
                      href="mailto:srishtikjaiswal@gmail.com"
                      className="flex items-center gap-2 text-amber-100/80 hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
