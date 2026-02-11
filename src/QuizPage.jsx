import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, CheckCircle, XCircle, PartyPopper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const questions = [
  {
    question: "What is my absolute favorite food?",
    options: ["Biryani", "Mandi", "Pizza", "Pasta"],
    correct: "Mandi"
  },
  {
    question: "When was our very first date?",
    options: ["Feb 14, 2023", "Jan 29, 2023", "Feb 5, 2023", "March 1, 2023"],
    correct: "Feb 5, 2023"
  },
  {
    question: "What is my 'comfort show' or movie?",
    options: ["Friends", "Breaking Bad", "Game of Thrones", "Stranger Things"],
    correct: "Breaking Bad"
  },
  {
    question: "Who said 'I love you' first?",
    options: ["You", "We said it together", "Me", "It was a text"],
    correct: "Me"
  },
  {
    question: "What is my biggest pet peeve?",
    options: ["Slow Internet", "Talking to me when I'm tensed", "Loud chewing", "Being late"],
    correct: "Talking to me when I'm tensed"
  },
  {
    question: "If I could travel anywhere with you, where would we go?",
    options: ["Paris", "Maldives", "Switzerland", "Japan"],
    correct: "Switzerland"
  },
  {
    question: "What is the one song that reminds me of you?",
    options: ["Tum Hi Ho", "Perfect", "Ye Tune Kya Kia", "Kesariya"],
    correct: "Ye Tune Kya Kia"
  },
  {
    question: "What is my favorite memory of us (so far)?",
    options: ["Our first call", "The Hackathon", "Feb 5 in home", "Graduation Day"],
    correct: "Feb 5 in home"
  },
  {
    question: "Coffee or Tea?",
    options: ["Tea", "Coffee", "Hot Chocolate", "Juice"],
    correct: "Coffee"
  },
  {
    question: "What is my dream for when we grow old?",
    options: ["Travel the world", "Stay together", "Buy a big mansion", "Retire early"],
    correct: "Stay together"
  }
];

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null); // null, true, or false
  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].correct) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        setIsCorrect(null);
        setCurrentQ(prev => prev + 1);
      }, 1500);
    } else {
      setIsCorrect(false);
      setTimeout(() => setIsCorrect(null), 1000); // Shake effect duration
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden relative">
      {/* Background Hearts */}
      <div className="fixed inset-0 pointer-events-none">
         {[...Array(5)].map((_, i) => (
           <Heart key={i} className="absolute text-red-900/20 animate-pulse" size={100 + i*20} style={{ top: Math.random()*80+'%', left: Math.random()*80+'%' }} />
         ))}
      </div>

      <button onClick={() => navigate('/')} className="fixed top-10 left-10 text-white/50 hover:text-white flex items-center gap-2 uppercase tracking-widest text-xs font-bold z-50">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {currentQ < questions.length ? (
            <motion.div 
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-[3rem] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6 text-rose-300 text-xs font-bold tracking-widest uppercase">
                <span>Question {currentQ + 1}/{questions.length}</span>
                <span>Score: {score}</span>
              </div>

              <h2 className="text-white text-2xl font-black italic font-['Playfair_Display'] mb-8 leading-relaxed">
                {questions[currentQ].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQ].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(opt)}
                    className={`w-full p-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                      isCorrect === false 
                        ? "bg-red-900/50 border-red-500 text-white animate-shake" // Shake on wrong
                        : "bg-white/5 border-white/10 text-white hover:bg-white/20 hover:border-red-400"
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              
              {/* Feedback Icons */}
              <div className="h-8 mt-4 flex justify-center">
                {isCorrect === true && <CheckCircle className="text-green-400 animate-bounce" />}
                {isCorrect === false && <XCircle className="text-red-500 animate-pulse" />}
              </div>

            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <PartyPopper className="text-yellow-400 mx-auto mb-6" size={60} />
              <h1 className="text-5xl font-['Playfair_Display'] font-black text-white italic mb-4">Quiz Complete!</h1>
              <p className="text-rose-200 text-xl mb-8">You scored {score} out of {questions.length}!</p>
              <p className="text-white/50 text-sm uppercase tracking-widest">You know me better than anyone.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;