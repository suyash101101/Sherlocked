import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
      }
      setUser(sessionData?.session?.user || null);
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
