import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import questionsData from '../data/questions.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';
import { initializeProgress, updateAttempt, getProgress, MAX_ATTEMPTS } from '../utils/progressHandler';
import { updateTeamProgress, getTeamProgress, handleQuestionAttempt, checkQuestionStatus } from '../config/supabaseClient';

function QuestionPage() {
  const [cookies] = useCookies(['userId']);
  const { chapterId, questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const checkProgress = async () => {
      try {
        const status = await checkQuestionStatus(cookies.userId, questionId);
        setAttempts(status.attempts || 0);
        setIsSolved(status.is_solved);
        
        if (status.is_solved) {
          toast.info("You've already solved this question!");
          navigate('/level');
        }
      } catch (error) {
        console.error('Error checking progress:', error);
      }
    };

    checkProgress();
  }, [questionId, cookies.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isSolved) return;
    setIsSubmitting(true);

    try {
      const isCorrect = answer.trim().toLowerCase() === question.answer.toLowerCase();
      const result = await handleQuestionAttempt(
        cookies.userId, 
        questionId, 
        isCorrect, 
        isCorrect ? question.points : 0
      );

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setAttempts(result.attempts);

      if (isCorrect) {
        setIsSolved(true);
        toast.success('Correct! Well done!');
        setTimeout(() => navigate('/level'), 2000);
      } else {
        setShowError(true);
        setAnswer('');
        toast.error(
          <div className="flex items-center gap-2">
            <span className="text-lg">❌</span>
            <div>
              <p className="font-medium">Incorrect Deduction!</p>
              <p className="text-sm">{`${MAX_ATTEMPTS - result.attempts} attempts remaining`}</p>
            </div>
          </div>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "bg-red-900/90 border border-red-700",
            bodyClassName: "text-white",
            progressClassName: "bg-red-500"
          }
        );
        setTimeout(() => setShowError(false), 500);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20"> {/* Added top padding for navbar */}
      <div className="max-w-4xl mx-auto"> {/* Added max width container */}
        <button
          onClick={() => navigate(`/track/${chapterId}`)}
          className="mb-4 text-blue-500 hover:underline"
        >
          ← Back to Chapter {chapterId}
        </button>
        <h1 className="text-4xl font-bold mb-4">{question.title}</h1>
        <div className="bg-stone-900/70 p-4 sm:p-6 rounded-lg mb-8 backdrop-blur-sm">
          <p className="text-stone-200 text-sm sm:text-base">{question.description}</p>
        </div>
        <motion.form 
          onSubmit={handleSubmit} 
          animate={showError ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-300 mb-2">
              Your Answer
            </label>
            <textarea
              id="answer"
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter your answer here..."
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Answer
            </button>
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-blue-500 hover:underline"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-stone-400">
              <span>Attempts: {attempts}/{MAX_ATTEMPTS}</span>
              {isSolved && <span className="text-green-500">Completed!</span>}
            </div>
            <div className="h-1 bg-stone-800 rounded mt-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(attempts/MAX_ATTEMPTS) * 100}%` }}
                className={`h-full rounded ${
                  attempts > MAX_ATTEMPTS - 5 ? 'bg-red-600' : 'bg-amber-600'
                }`}
              />
            </div>
          </div>
        </motion.form>
        {showHint && (
          <div className="mt-4 p-4 bg-yellow-600 rounded">
            <p className="font-bold">Hint:</p>
            <p>{question.hint}</p>
          </div>
        )}
        {feedback && (
          <div className={`mt-4 p-4 rounded ${feedback.includes('Correct') ? 'bg-green-600' : 'bg-red-600'}`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionPage;

