import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create single instance of supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storageKey: 'sherlocked-auth'
  }
});

export async function checkQuestionStatus(teamId, questionId) {
  const { data, error } = await supabase
    .from('team_progress')
    .select('is_solved, attempts')
    .eq('team_id', teamId)
    .eq('question_id', questionId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data || { is_solved: false, attempts: 0 };
}

export async function handleQuestionAttempt(teamId, questionId, isCorrect, points = 0) {
  try {
    // Get current status
    const status = await checkQuestionStatus(teamId, questionId);
    
    // If already solved, prevent further attempts
    if (status.is_solved) {
      return { error: 'Question already solved', status };
    }

    const newAttempts = (status.attempts || 0) + 1;
    
    // Prepare update data
    const updateData = {
      team_id: teamId,
      question_id: questionId,
      attempts: newAttempts,
      is_solved: isCorrect,
      last_attempt_at: new Date().toISOString()
    };

    if (isCorrect) {
      updateData.solved_at = new Date().toISOString();
      updateData.points_earned = points;
    }

    // Update or insert progress
    const { error: progressError } = await supabase
      .from('team_progress')
      .upsert(updateData, { 
        onConflict: 'team_id,question_id',
        returning: 'minimal' 
      });

    if (progressError) throw progressError;

    // If correct, update leaderboard
    if (isCorrect) {
      await supabase.rpc('update_team_score', {
        p_team_id: teamId,
        p_points: points
      });
    }

    return { success: true, attempts: newAttempts, is_solved: isCorrect };
  } catch (error) {
    console.error('Error handling attempt:', error);
    throw error;
  }
}

export default supabase;
