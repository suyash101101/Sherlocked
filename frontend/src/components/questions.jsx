import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { PipetteIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Lock, Brain, Award, Clock } from 'lucide-react';

function Questions({ chapterId, onQuestionSelect, teamId }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Only proceed if we have both chapterId and teamId
        if (!chapterId || !teamId) {
          setLoading(false);
          return;
        }

        // First fetch questions
        const { data: questionsData, error: questionsError } = await supabase
          .from("questions")
          .select("*, chapter_name")
          .eq("chapter_id", chapterId);

        if (questionsError) throw questionsError;

        // Then fetch progress only if we have questions
        if (questionsData) {
          const { data: progressData, error: progressError } = await supabase
            .from("team_progress")
            .select("*")
            .eq("team_id", teamId);

          if (progressError && progressError.code !== 'PGRST116') throw progressError;

          const questionsWithProgress = questionsData.map((question) => {
            const progress = progressData?.find(
              (p) => p.question_id === question.id
            );
            return {
              ...question,
              is_solved: progress?.is_solved || false,
              attempts: progress?.attempts || 0,
              points_earned: progress?.points_earned || 0
            };
          });

          setQuestions(questionsWithProgress);
        }
      } catch (err) {
        console.error("Error fetching questions and progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [chapterId, teamId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[40vh]">
        <PipetteIcon className="w-8 h-8 text-orange-950 animate-spin" />
        <p className="text-orange-950 mt-2">Loading questions...</p>
      </div>
    );
  }

  if (!teamId) {
    return (
      <div className="text-center text-orange-950 p-4">
        Authenticating...
      </div>
    );
  }

  return (
    <div className="max-h-[45vh] overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-transparent">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 pb-4">
        <AnimatePresence>
          {questions.map((question) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={!question.is_solved ? { scale: 1.02 } : {}}
              className={`relative overflow-hidden rounded-lg border ${
                question.is_solved
                  ? 'border-green-500/40 bg-gradient-to-br from-green-950/40 to-stone-950/40'
                  : 'border-amber-700/40 bg-gradient-to-br from-amber-950/40 to-stone-950/40'
              } backdrop-blur-sm shadow-md`}
            >
              <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm text-amber-100/90">{question.title}</h4>
                  {question.is_solved ? (
                    <CheckCircle2 className="text-green-400 w-4 h-4" />
                  ) : (
                    <Brain className="text-amber-400 w-4 h-4" />
                  )}
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  <Award className="w-3 h-3 text-amber-400/90" />
                  <span className="text-xs text-amber-200/90">{question.points} pts</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-[10px] flex items-center gap-1 ${
                    question.is_solved ? 'text-green-400' : 'text-amber-300/90'
                  }`}>
                    {question.is_solved ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" /> Unsolved
                      </>
                    )}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !question.is_solved && onQuestionSelect(question)}
                    disabled={question.is_solved}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      question.is_solved
                        ? 'bg-green-500/20 text-green-300 cursor-default'
                        : 'bg-amber-700/30 text-amber-100 hover:bg-amber-600/40'
                    }`}
                  >
                    {question.is_solved ? 'Completed' : 'Solve'}
                  </motion.button>
                </div>
              </div>

              {/* Progress indicator */}
              {question.attempts > 0 && !question.is_solved && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(question.attempts / MAX_ATTEMPTS) * 100}%` }}
                    className="h-full bg-amber-600/70"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Questions;
