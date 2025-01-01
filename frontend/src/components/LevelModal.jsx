import { useState, useEffect } from "react";
import Questions from "./questions";
import supabase from "../config/supabaseClient";

function LevelModal({ location, onClose }) {
  const { id } = location;
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState(new Set());
  const [chapterName, setChapterName] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [userId, setUserId] = useState(null);
  const [currentAttempts, setCurrentAttempts] = useState(0);

  const MAX_ATTEMPTS = 100;

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

          setWrongAttempts(attemptsMap);
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
    if (!selectedQuestion) return;

    try {
      // Prevent further attempts if max attempts reached or question is solved
      if (currentAttempts >= MAX_ATTEMPTS || solvedQuestions.has(selectedQuestion.id)) return;

      // Fetch the correct answer for the selected question from Supabase
      const { data: questionData, error: questionError} = await supabase
        .from("questions")
        .select("answer, points")
        .eq("id", selectedQuestion.id)
        .single();

      if (questionError) throw questionError;

      const correctAnswer = questionData?.answer;
      const pointsEarned = questionData?.points;

      if (userAnswer === correctAnswer) {
        // Mark question as solved
        setSolvedQuestions((prev) => new Set(prev).add(selectedQuestion.id));

        const newScore = totalScore + pointsEarned;
        setTotalScore(newScore);

        // Update database when the question is solved
        const solvedAt = new Date().toISOString();
        await supabase
          .from("team_progress")
          .upsert(
            [
              {
                team_id: userId,
                question_id: selectedQuestion.id,
                is_solved: true,
                solution: userAnswer,
                solved_at: solvedAt,
                points_earned: pointsEarned,
                attempts: currentAttempts,
              },
            ],
            { onConflict: ["team_id", "question_id"] }
          );
      } else {
        // Increment wrong attempts
        const updatedAttempts = currentAttempts + 1;
        setCurrentAttempts(updatedAttempts);

        // Update wrong attempts in the database
        await supabase
          .from("team_progress")
          .upsert(
            [
              {
                team_id: userId,
                question_id: selectedQuestion.id,
                is_solved: false,
                attempts: updatedAttempts,
              },
            ],
            { onConflict: ["team_id", "question_id"] }
          );
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }

    setUserAnswer(""); // Reset input field
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div
        className="lg:w-[70em] lg:h-[70em] lg:mt-80 md:w-[45em] md:h-[45em] sm:w-[35em] sm:h-[35em] w-[30em] h-[30em] bg-contain bg-no-repeat bg-center relative transition-transform duration-200 ease-in-out"
        style={{
          backgroundImage: "url('/scroll.png')",
        }}
      >
        <button
          className="absolute lg:right-32 md:right-20 lg:mt-40 md:mt-28 mt-16 right-16 text-orange-950 text-3xl font-extrabold"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col items-center lg:mt-64 md:mt-40 sm:mt-28 mt-24">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-extrabold text-orange-950">
            {selectedQuestion ? selectedQuestion.title : chapterName || " "}
          </h2>

          {!selectedQuestion ? (
            <Questions
              chapterId={id}
              teamId={userId}
              onQuestionSelect={handleQuestionSelect}
              solvedQuestions={solvedQuestions}
            />
          ) : (
            <div className="lg:p-6 py-3 px-5 bg-orange-950 text-white rounded-lg w-[70%] text-center">
              <p className="mb-6 lg:max-h-[10em] sm:max-h-[4em] max-h-[2em] overflow-y-scroll md:text-base text-xs">{selectedQuestion.description}</p>
              {solvedQuestions.has(selectedQuestion.id) ? (
                <p className="text-green-500 font-bold">Correct Answer!</p>
              ) : currentAttempts >= MAX_ATTEMPTS ? (
                <p className="text-red-500 font-bold">
                  Maximum attempts exceeded.
                </p>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Type your answer here..."
                    className="lg:p-2 p-1 rounded border w-3/4 sm:text-base text-xs text-gray-900"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={solvedQuestions.has(selectedQuestion.id)}
                  />
                  <button
                    onClick={handleAnswerSubmit}
                    className="sm:ml-2 ml-1 px-4 sm:py-2 py-1 lg:text-base text-xs bg-yellow-500 text-black rounded hover:bg-yellow-600"
                  >
                    Submit
                  </button>
                  <p className="text-red-500 mt-2 lg:text-base text-sm">
                    Wrong Attempts: {currentAttempts}/{MAX_ATTEMPTS}
                  </p>
                </>
              )}
              <button
                className="text-yellow-500 hover:text-yellow-300 text-xs mt-2"
                onClick={handleBackClick}
              >
                &lt; Back to Questions
              </button>
            </div>
          )}

          {/* <div className="lg:mt-0 mt-[-1em] text-orange-950 lg:text-2xl text-sm font-bold">
            Total Score: {totalScore}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default LevelModal;
