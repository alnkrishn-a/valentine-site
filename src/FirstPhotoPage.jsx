import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import img31 from './assets/img31.jpg';

const FirstPhotoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0202] overflow-y-auto py-20 px-4 scroll-smooth">
      <button onClick={() => navigate('/')} className="fixed top-10 left-10 z-50 text-white/40 hover:text-red-500 flex items-center gap-2 transition-all uppercase tracking-widest text-xs font-bold">
        <ChevronLeft size={16} /> Back to Us
      </button>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto flex flex-col items-center gap-20">
        <div className="w-full p-3 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_0_80px_rgba(255,0,0,0.15)]">
            <img src={img31} alt="The First One" className="w-full h-auto max-h-[85vh] object-contain rounded-[2.5rem]" />
        </div>

        {/* OLD PAPER STYLE QUOTE */}
        <div className="relative w-full max-w-2xl p-12 md:p-16 bg-[#f2e2ba] rounded-tl-[5rem] rounded-br-[5rem] shadow-2xl border-[10px] border-[#8b4513]/10 transform rotate-1 mb-20">
          <div className="text-center select-none">
             <h2 className="font-['Playfair_Display'] text-[#5d2e15] text-2xl font-black mb-8 uppercase tracking-[0.3em] border-b border-[#5d2e15]/20 pb-4 inline-block italic">Our Beginning</h2>
             <p className="font-['Playfair_Display'] text-[#3d1e0d] text-3xl md:text-4xl leading-relaxed italic font-black">
               "If I could live this moment over and over, I would. This was the exact second I knew you were the one I wanted to hold forever."
             </p>
             <Heart className="mx-auto text-red-900/20 mt-10" size={40} fill="currentColor" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FirstPhotoPage;