import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

export default function ScoreBoard() {
  const [score, setScore] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [userId, setUserId] = useState(null);
  // Fetch the total_score from the leaderboard table
  const fetchUserId = async () => {
    try {
      // Step 1: Fetch authenticated user from auth
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
  
      const user = session?.session?.user;
      if (!user) {
        console.error("No authenticated user found.");
        return;
      }
  
      const userEmail = user.email;
  
      // Step 2: Use the email to fetch ID from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id') 
        .eq('email', userEmail) 
        .single();
  
      if (userError) throw userError;
  
      if (userData) {
        setUserId(userData.id);
      }
    } catch (err) {
      console.error('Error fetching user ID:', err);
    }
  };

  const fetchScore = async () => {
    try {
      setLoading(true);
      // Query the leaderboard table
      const { data, error } = await supabase
        .from('leaderboard') // Table name
        .select('total_score') // Select the column
        .eq('team_id', userId) // Filter by the specific row

      if (error) throw error;

      if (data && data.length > 0) {
        setScore(data[0].total_score); // Set the total_score
      } else {
        setScore(0); // Default to 0 if no data is found
      }
    } catch (err) {
      console.error('Error fetching score:', err);
      setError('Failed to fetch the score.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserId();
  }, []);

  // Fetch the score after userId is set
  useEffect(() => {
    if (userId) {
      fetchScore();
    }
  }, [userId]);

  return (
    <div className="absolute top-4 right-4 z-30 bg-gray-800 bg-opacity-75 px-4 py-2 rounded-lg shadow-lg">
      {loading ? (
        <h2 className="text-xl font-bold text-white">Loading...</h2>
      ) : error ? (
        <h2 className="text-xl font-bold text-red-500">{error}</h2>
      ) : (
        <h2 className="text-xl font-bold text-white">Score: {score}</h2>
      )}
    </div>
  );
}
