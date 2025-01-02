import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const fetchLeaderboardData = async (searchQuery = '') => {
  try {
    let query = supabase
      .from('leaderboard')
      .select(`
        *,
        users!inner(team_name)
      `)
      .order('total_score', { ascending: false });
    
    if (searchQuery) {
      query = query.ilike('users.team_name', `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    return { 
      data: data.map(entry => ({
        id: entry.id,
        team_name: entry.users.team_name,
        total_score: entry.total_score || 0,
        questions_solved: entry.questions_solved || 0
      }))
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: error.message };
  }
};

export const addNewUserToLeaderboard = async (teamName) => {
  try {
    const { data, error } = await supabase
      .from('current_leaderboard')
      .insert([
        { team_name: teamName, total_score: 0 }
      ])
      .select();

    if (error) throw error;
    return { data };
  } catch (error) {
    console.error('Error adding user:', error);
    return { error: error.message };
  }
};

export const initializeLeaderboard = async (userId, teamName) => {
  try {
    // First check if entry exists in leaderboard
    const { data: existingEntry, error: checkError } = await supabase
      .from('leaderboard')
      .select('id')
      .eq('team_id', userId)
      .maybeSingle(); // Use maybeSingle instead of single to avoid 406 error

    if (checkError) throw checkError;

    // Only create new entry if one doesn't exist
    if (!existingEntry) {
      const { error: insertError } = await supabase
        .from('leaderboard')
        .insert({
          team_id: userId,
          total_score: 0,
          questions_solved: 0,
          created_at: new Date().toISOString()
        });

      if (insertError) throw insertError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error initializing leaderboard:', error);
    return { error };
  }
};

export const updateScore = async (userId, points) => {
  try {
    // First get current score
    const { data: current, error: fetchError } = await supabase
      .from('leaderboard')
      .select('total_score, questions_solved')
      .eq('team_id', userId)
      .maybeSingle();

    if (fetchError) throw fetchError;

    // If no record exists, create one
    if (!current) {
      await initializeLeaderboard(userId);
    }

    const newScore = ((current?.total_score || 0) + points);
    const newQuestionsSolved = ((current?.questions_solved || 0) + 1);

    const { error: updateError } = await supabase
      .from('leaderboard')
      .update({ 
        total_score: newScore,
        questions_solved: newQuestionsSolved,
        last_submission_at: new Date().toISOString()
      })
      .eq('team_id', userId);

    if (updateError) throw updateError;

    return { newScore };
  } catch (error) {
    console.error('Error updating score:', error);
    return { error };
  }
};
