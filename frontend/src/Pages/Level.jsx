import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import FloatingIsland from '../components/FloatingIsland';
import ConnectingPaths from '../components/ConnectingPaths';
import LevelModal from '../components/LevelModal';
import { initializeLeaderboard } from '../config/supabaseClient1';

const islands = [
  { id: 1, name: "Baker Street", x: 5, y: 10, image: "/221b.png" },
  { id: 2, name: "Scotland Yard", x: 15, y: 65, image: "/221b.png" },
  { id: 3, name: "British Museum", x: 38, y: 20, image: "/221b.png" },
  { id: 4, name: "Tower Bridge", x: 55, y: 76, image: "/221b.png" },
  { id: 5, name: "Buckingham Palace", x: 70, y: 22, image: "/221b.png" },
];

const unlockThresholds = [0, 300, 800, 1500, 2500];

export default function Level() {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [score, setScore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  const fetchUserId = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;

      if (!user) {
        console.error("No authenticated user found.");
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, team_name')
        .eq('email', user.email)
        .single();

      if (userError) throw userError;

      if (userData) {
        setUserId(userData.id);
        await initializeLeaderboard(userData.id, userData.team_name);
      }
    } catch (err) {
      console.error('Error fetching user ID:', err);
    }
  };

  const fetchScore = async () => {
    try {
      if (!userId) return;
      const { data, error } = await supabase
        .from('leaderboard')
        .select('total_score')
        .eq('team_id', userId)
        .maybeSingle();

      if (error) throw error;

      setScore(data?.total_score || 0);
    } catch (err) {
      console.error('Error fetching score:', err);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) fetchScore();
  }, [userId]);

  // Dynamically calculate unlocked levels whenever score changes
  useEffect(() => {
    if (score !== null) {
      const nextLevel = unlockThresholds.findIndex((threshold) => score >= threshold) + 1;
      setUnlockedLevel(nextLevel);
    }
  }, [score]);

  // Poll for score updates every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchScore, 5000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [userId]);

  return (
    <div className="sherlock-background bg-[url('https://static.vecteezy.com/system/resources/previews/036/105/309/non_2x/ai-generated-vintage-map-of-the-world-on-the-old-paper-background-sepia-tone-ai-generated-free-photo.jpg')] bg-no-repeat bg-cover bg-center object-cover relative h-[85em] lg:h-[90em]">
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <main className="relative z-10 h-screen">
        <ConnectingPaths islands={islands} unlockedLevel={unlockedLevel} />

        {islands.map((island, index) => {
          const isUnlocked = score >= unlockThresholds[index];
          return (
            <FloatingIsland
              key={island.id}
              {...island}
              isUnlocked={isUnlocked}
              score={score}
              unlockThreshold={unlockThresholds[index]}
              backgroundImage={island.image} 
            />
          );
        })}
      </main>

      {showModal && (
        <LevelModal
          location={{ id: unlockedLevel }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
