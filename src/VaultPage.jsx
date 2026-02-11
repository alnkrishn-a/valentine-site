import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Database, Sparkles, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const reasons = [
  "The way your eyes light up when you're excited about something.",
  "How you make even the most boring days feel like an adventure.",
  "Your kindness—not just to me, but to everyone around you.",
  "The way you believe in me even when I don't believe in myself.",
  "Your laugh. It's my favorite song in the entire world.",
  "How you remember the tiny details I mention in passing.",
  "The way you look at me when you think I'm not looking.",
  "Because you're not just my partner, you're my best friend.",
  "How you always know exactly what to say to make me smile.",
  "The way you make me feel safe and at home, no matter where we are."
];

const VaultPage = () => {
  const navigate = useNavigate();
  const [currentReason, setCurrentReason] = useState(null);

  const queryDatabase = () => {
    const random = reasons[Math.floor(Math.random() * reasons.length)];
    setCurrentReason(random);
    confetti({
      particleCount: 40,
      spread: 60,
      colors: ['#ff0000', '#ffffff'],
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black pointer-events-none" />

      <button 
        onClick={() => navigate('/')} 
        className="fixed top-10 left-10 z-50 text-white/40 hover:text-white flex items-center gap-2 uppercase tracking-[0.3em] text-[10px] font-bold transition-colors"
      >
        <ChevronLeft size={16} /> Exit Vault
      </button>

      <div className="relative z-10 max-w-2xl w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden"
        >
          <Database className="text-red-600 mx-auto mb-6 opacity-50" size={40} />
          <h2 className="text-white/60 text-xs uppercase tracking-[0.5em] font-bold mb-10 italic">
            Secure Emotional Database // Decrypting...
          </h2>

          <div className="min-h-[120px] flex items-center justify-center mb-12">
            <AnimatePresence mode="wait">
              {currentReason ? (
                <motion.p 
                  key={currentReason}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-white text-2xl md:text-3xl font-['Playfair_Display'] italic font-bold leading-relaxed"
                >
                  "{currentReason}"
                </motion.p>
              ) : (
                <p className="text-rose-200/30 text-lg italic">
                  Press the button to retrieve a record...
                </p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={queryDatabase}
            className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-[0_0_50px_rgba(220,38,38,0.3)] flex items-center gap-3 mx-auto"
          >
            <Sparkles size={18} />
            {currentReason ? "Fetch Another Record" : "Query Heart.db"}
          </motion.button>
        </motion.div>

        <p className="text-red-900/40 text-[10px] uppercase tracking-[0.6em] mt-12 font-bold flex items-center justify-center gap-2">
           <Heart size={10} /> Data verified since Jan 29, 2023 <Heart size={10} />
        </p>
      </div>
    </div>
  );
};

export default VaultPage;