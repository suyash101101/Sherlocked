import { useState, useEffect } from "react";
import Questions from "./questions";
import supabase from "../config/supabaseClient";
import { updateScore } from '../config/supabaseClient1';
import { motion, AnimatePresence } from 'framer-motion';
import bcrypt from 'bcryptjs';
import { Sparkles, BookOpen, ArrowLeft, Send, AlertCircle, CheckCircle2, Brain } from 'lucide-react';

function LevelModal({ location, onClose }) {
  const { id } = location;
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState(new Set());
  const [chapterName, setChapterName] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [userId, setUserId] = useState(null);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [attempts, setAttempts] = useState({});

  const MAX_ATTEMPTS = 25;

  const getRandomWrongMessage = () => {
    const messages = [
      "Not quite right, detective. Try another approach!",
      "A good attempt, but there's more to uncover...",
      "Keep investigating, you're on the right track!",
      "Elementary, but not quite there yet...",
      "The game is still afoot! Try again.",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const fetchUserId = async () => {
    try {
      // Fetch authenticated user from auth
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const user = session?.session?.user;
      if (!user) {
        console.error("No authenticated user found.");
        return;
      }

      const userEmail = user.email;

      // Use the email to fetch ID from the users table
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

  useEffect(() => {
    fetchUserId();
  }, []);

  // Fetch chapter name from Supabase
  useEffect(() => {
    const fetchChapterName = async () => {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("chapter_name")
          .eq("chapter_id", id)
          .limit(1)
          .single();

        if (error) throw error;
        setChapterName(data.chapter_name);
      } catch (err) {
        console.error("Error fetching chapter name:", err);
      }
    };

    fetchChapterName();
  }, [id]);

  // Fetch the total score when userId is set
  const fetchTotalScore = async () => {
    try {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("total_score")
        .eq("team_id", userId)
        .single();

      if (error) throw error;
      if (data) setTotalScore(data.total_score);
    } catch (err) {
      console.error("Error fetching total score:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTotalScore();
    }
  }, [userId]);

  // Disable scrolling on the body when the modal is open
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  // Fetch attempts when question is selected or userId is set
  useEffect(() => {
    const fetchAttempts = async () => {
      if (!selectedQuestion || !userId) return;

      try {
        const { data, error } = await supabase
          .from("team_progress")
          .select("attempts")
          .eq("team_id", userId)
          .eq("question_id", selectedQuestion.id)
          .single();

        if (error && error.code !== "PGRST116") throw error; // Ignore "No rows" error
        const fetchedAttempts = data?.attempts || 0;
        setCurrentAttempts(fetchedAttempts);
      } catch (err) {
        console.error("Error fetching attempts:", err);
      }
    };

    fetchAttempts();
  }, [selectedQuestion, userId]);

  // Initialize wrongAttempts state when modal loads
  useEffect(() => {
    if (!userId || !id) return;

    const initializeState = async () => {
      try {
        const { data, error } = await supabase
          .from("team_progress")
          .select("question_id, attempts")
          .eq("team_id", userId);

        if (error) throw error;

        if (data) {
          const attemptsMap = data.reduce((acc, item) => {
            acc[item.question_id] = item.attempts || 0;
            return acc;
          }, {});

          setAttempts(attemptsMap);
        }
      } catch (err) {
        console.error("Error initializing state:", err);
      }
    };

    initializeState();
  }, [userId, id]);

  // Handle question selection
  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleBackClick = () => {
    setSelectedQuestion(null);
    setUserAnswer("");
  };

  // Handle answer submission
  const handleAnswerSubmit = async () => {
    if (!selectedQuestion || !userId) return;

    try {
      const { data: questionData, error: questionError } = await supabase
        .from("questions")
        .select("answer, points")
        .eq("id", selectedQuestion.id)
        .single();

      if (questionError) throw questionError;

      const isCorrect =  await bcrypt.compare(userAnswer, questionData.answer);;
      const currentAttempt = attempts[selectedQuestion.id] || 0;
      const newAttempts = currentAttempt + 1;
      setCurrentAttempts(newAttempts);

      // Update attempts
      setAttempts(prev => ({
        ...prev,
        [selectedQuestion.id]: newAttempts
      }));

      if (isCorrect && !solvedQuestions.has(selectedQuestion.id)) {
        // Update score in leaderboard
        await updateScore(userId, questionData.points);
        
        // Update team progress
        await supabase
          .from("team_progress")
          .upsert([
            {
              team_id: userId,
              question_id: selectedQuestion.id,
              is_solved: true,
              attempts: newAttempts,
              points_earned: questionData.points,
              solved_at: new Date().toISOString()
            }
          ],
          { onConflict: ["team_id", "question_id"] }
        );

        setSolvedQuestions(prev => new Set(prev).add(selectedQuestion.id));
      } else {
        // Update attempts for wrong answer
        await supabase
          .from("team_progress")
          .upsert([
            {
              team_id: userId,
              question_id: selectedQuestion.id,
              is_solved: false,
              attempts: newAttempts
            }
          ],
          { onConflict: ["team_id", "question_id"] }
        );
      }
    } catch (err) {
      console.error("Error processing answer:", err);
    }

    setUserAnswer("");
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose(); 
    }
  };

  return (
    <div 
    id = "modal-overlay"
    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
    onClick={handleOutsideClick}>
      <motion.div
        className="lg:w-[70em] lg:h-[70em] lg:mt-80 md:w-[45em] md:h-[45em] sm:w-[35em] sm:h-[35em] w-[30em] h-[30em] bg-contain bg-no-repeat bg-center relative"
        style={{ backgroundImage: "url('/scroll.png')" }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button
          className="absolute lg:right-32 md:right-20 lg:mt-40 md:mt-28 mt-16 right-16 text-orange-950 text-3xl font-extrabold"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col items-center lg:mt-56 md:mt-36 sm:mt-24 mt-20">
          <motion.h2 
            className="lg:text-3xl md:text-xl text-lg font-bold text-amber-950 mb-4 flex items-center gap-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {selectedQuestion ? null : (
    <>
      <BookOpen className="w-6 h-6 text-amber-700" />
      {chapterName || " "}
    </>
  )}
          </motion.h2>

          <div className="w-[85%] mx-auto">
            {!selectedQuestion ? (
              <Questions
                chapterId={id}
                teamId={userId}
                onQuestionSelect={handleQuestionSelect}
                solvedQuestions={solvedQuestions}
              />
            ) : (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="lg:p-6 py-3 px-5 bg-gradient-to-br from-amber-950/90 to-stone-950/90 backdrop-blur-md rounded-lg w-[98%] mx-auto shadow-xl border border-amber-900/20"
              >
                <div className="relative">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 lg:max-h-[13em] sm:max-h-[7em] max-h-[5em] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-900/30 scrollbar-track-transparent"
                  >
                    <p className="text-amber-100/90 leading-relaxed">{selectedQuestion.description}</p>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {solvedQuestions.has(selectedQuestion.id) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex flex-col items-center gap-3 py-4"
                      >
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <Sparkles className="w-12 h-12 text-amber-400" />
                        </motion.div>
                        <p className="text-green-400 font-bold text-lg">Brilliant Deduction!</p>
                      </motion.div>
                    ) : currentAttempts >= MAX_ATTEMPTS ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-4"
                      >
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
                        <p className="text-red-400 font-bold">Maximum attempts reached</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter your deduction..."
                            className="w-full px-4 py-3 bg-stone-900/50 border border-amber-900/30 rounded-lg text-amber-100 placeholder-amber-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); // Prevent the default form submission or other behaviors
                                handleAnswerSubmit();
                              }
                            }}
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAnswerSubmit}
                            className="absolute right-2 top-2 p-1.5 bg-amber-700/30 hover:bg-amber-600/40 rounded-md text-amber-100"
                          >
                            <Send className="w-5 h-5" />
                          </motion.button>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-amber-700">
                          <span>Attempts: {currentAttempts}/{MAX_ATTEMPTS}</span>
                          <span>{MAX_ATTEMPTS - currentAttempts} deductions remaining</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ x: -5 }}
                    onClick={handleBackClick}
                    className="mt-4 flex items-center gap-2 text-amber-600 hover:text-amber-500 text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cases
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LevelModal;
