import React from 'react';
import { motion } from 'framer-motion';

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

          {/* Rules content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gradient-to-b from-stone-900/70 to-stone-950/70 p-8 rounded-xl 
                       backdrop-blur-md border border-stone-800/40 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-800/20 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-800/20 rounded-br-3xl" />
            </div>

            {/* Title */}
            <h1 className="text-center text-4xl font-bold font-serif mb-8 text-amber-100">Rules & Regulations</h1>

            {/* Rules List */}
            <ul className="text-lg text-amber-100 space-y-4 list-disc pl-6">
              <li>
                <strong>Team Composition:</strong> Each team can have a maximum of 3 members. You can form a team with 1, 2, or 3 participants. Ensure that you have the required number of players before starting the competition.
              </li>
              <li>
                <strong>Event Duration:</strong> The event will run for 12 hours. You must solve as many challenges as possible during this period.
              </li>
              <li>
                <strong>Challenge Categories:</strong> The competition will consist of various challenges including cryptography, programming, system design, and more. Each challenge has different difficulty levels and point values.
              </li>
              <li>
                <strong>Scoring:</strong> Points will be awarded based on the difficulty of the challenges. For each challenge solved, you will earn a specific number of points, which will be displayed on the leaderboard.
              </li>
              <li>
                <strong>Time Management:</strong> Teams will have to manage their time wisely, as each challenge may take varying amounts of time. The leaderboard will show the teams ranked by their scores and the time taken to solve challenges.
              </li>
              <li>
                <strong>Code of Conduct:</strong> Participants must follow ethical guidelines and respect other participants. Any use of hacking techniques outside the competition environment, or attempts to compromise other participants' solutions, will lead to immediate disqualification.
              </li>
              <li>
                <strong>Communication:</strong> Communication with other teams is strictly prohibited during the event. Each team must solve challenges independently without external help.
              </li>
              <li>
                <strong>Prizes:</strong> The top teams will be awarded exciting prizes. The winners will be announced at the end of the competition.
              </li>
              <li>
                <strong>Help and Support:</strong> If you need any assistance during the event, please reach out to the event support team on our official Discord server. You can join the server using the link below:
                <ul className="list-none pl-0">
                  <li>
                    <a
                      href="https://discord.gg/JNj54Vvk"
                      className="text-amber-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join our Discord server here!
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Disqualification:</strong> Teams caught violating any of the rules will be disqualified immediately. We encourage fair play and sportsmanship.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default RulesPage;
