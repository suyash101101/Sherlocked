import React from 'react';
import { motion } from 'framer-motion';

const rules = [
  {
    title: "Team Composition",
    content: "Each team can have a maximum of 3 members. You can form a team with 1, 2, or 3 participants."
  },
  {
    title: "Event Duration",
    content: "The event will run for 12 hours. You must solve as many challenges as possible during this period."
  },
  {
    title: "Challenge Categories",
    content: "The competition will consist of various challenges including cryptography, programming, system design, and more."
  },
  {
    title: "Scoring",
    content: "Points will be awarded based on the difficulty of the challenges. Each challenge solved earns specific points."
  },
  {
    title: "Time Management",
    content: "Teams will have to manage their time wisely. The leaderboard shows teams ranked by scores and time taken."
  },
  {
    title: "Code of Conduct",
    content: "Participants must follow ethical guidelines. Any misuse will lead to immediate disqualification."
  },
  {
    title: "Communication",
    content: "Communication with other teams is strictly prohibited during the event. Each team must solve challenges independently."
  },
  {
    title: "Prizes",
    content: "The top teams will be awarded exciting prizes. Winners will be announced at the end of the competition."
  }
];

function RulesPage() {
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
          >
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-stone-800/15 rounded-full blur-3xl" />
          </motion.div>

          {/* Discord Banner at the top */}
          <motion.a
            href="https://discord.gg/JNj54Vvk"
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-8 bg-gradient-to-r from-[#5865F2]/20 via-[#5865F2]/10 to-[#5865F2]/20 
                       rounded-lg border border-[#5865F2]/30 overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <div className="px-6 py-4 flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
              </svg>
              <span className="text-lg font-medium text-[#5865F2]">Join our Discord Community</span>
              <span className="text-[#5865F2]">→</span>
            </div>
          </motion.a>

          {/* Rules content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gradient-to-b from-stone-900/70 to-stone-950/70 p-12 rounded-xl 
                       backdrop-blur-md border border-stone-800/40 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-amber-800/30 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-amber-800/30 rounded-br-3xl" />
            </div>

            {/* Title with decorative line */}
            <div className="relative mb-12 text-center">
              <h1 className="text-4xl font-bold font-serif text-amber-100">Rules & Regulations</h1>
              <div className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
            </div>

            {/* Rules List with improved styling */}
            <ul className="text-lg text-amber-100/90 space-y-6">
              {rules.map((rule, index) => (
                <motion.li 
                  key={index}
                  className="p-4 rounded-lg bg-stone-900/50 border border-stone-800/30 hover:border-amber-800/30 transition-all"
                  whileHover={{ scale: 1.01 }}
                >
                  <strong className="text-amber-400">{rule.title}</strong>
                  <p className="mt-2">{rule.content}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default RulesPage;
