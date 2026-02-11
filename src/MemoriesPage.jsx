import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, Heart, Binary, Cpu, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- IMAGE IMPORTS ---
import img1 from './assets/img1.jpg'; import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg'; import img4 from './assets/img4.jpg';
import img5 from './assets/img5.jpg'; import img6 from './assets/img6.jpg';
import img7 from './assets/img7.jpg'; import img8 from './assets/img8.jpg';

const memories = [
  { id: 1, img: img1, quote: "In your smile, I see something more beautiful than the stars.", side: "left" },
  { id: 2, img: img2, quote: "Every system glitch is better when I'm facing it with you.", side: "right" },
  { id: 3, img: img3, quote: "You are the best decision my heart ever made.", side: "left" },
  { id: 4, img: img4, quote: "My favorite place in the world is right next to you.", side: "right" },
  { id: 5, img: img5, quote: "I love you more than code loves a perfect compile.", side: "left" },
  { id: 6, img: img6, quote: "You're my forever, my home, and my best friend.", side: "right" },
  { id: 7, img: img7, quote: "Life with you is the most beautiful algorithm.", side: "left" },
  { id: 8, img: img8, quote: "I promise to stay by your side, through every update.", side: "right" },
];

// --- SUB-COMPONENT FOR BACKGROUND DECORATION (Fixes Hook Rule) ---
const BackgroundDecoration = ({ scrollYProgress, index }) => {
  const randomTop = useMemo(() => Math.random() * 100, []);
  const randomLeft = useMemo(() => Math.random() * 100, []);
  const randomMovement = useMemo(() => Math.random() * -500 - 100, []);
  
  const y = useTransform(scrollYProgress, [0, 1], [0, randomMovement]);

  return (
    <motion.div
      className="absolute"
      style={{ top: `${randomTop}%`, left: `${randomLeft}%`, y }}
    >
      {index % 2 === 0 ? (
        <Binary className="text-red-900/40" size={30} />
      ) : (
        <Heart className="text-red-950/40" size={20} />
      )}
    </motion.div>
  );
};

const MemoriesPage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-black min-h-screen relative overflow-x-hidden select-none pb-40">
      {/* --- FIXED NAVIGATION --- */}
      <button 
        onClick={() => navigate('/')} 
        className="fixed top-10 left-10 z-50 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-full text-white hover:bg-red-600/50 transition-all flex items-center gap-2 group"
      >
        <ChevronLeft size={20} />
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Return to Heart</span>
      </button>

      {/* --- PARALLAX BACKGROUND ELEMENTS (FIXED LOGIC) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <BackgroundDecoration key={i} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>

      {/* --- HEADER SECTION --- */}
      <header className="h-screen flex flex-col items-center justify-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <div className="flex justify-center mb-4">
            <Terminal className="text-red-600 animate-pulse" size={48} />
          </div>
          <h1 className="text-7xl md:text-9xl font-['Playfair_Display'] font-black text-white italic leading-none">
            Our <span className="text-red-600">Journey</span>
          </h1>
          <p className="text-rose-200/40 uppercase tracking-[0.8em] text-[10px] font-bold">Compiled with love since Jan 29, 2023</p>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }} 
            className="text-red-600 mt-20 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Scroll Down</span>
            <div className="w-[2px] h-12 bg-gradient-to-b from-red-600 to-transparent" />
          </motion.div>
        </motion.div>
      </header>

      {/* --- VERTICAL TIMELINE CONTENT --- */}
      <div className="relative max-w-6xl mx-auto px-6 space-y-40 z-10">
        {/* Central Circuit Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-600/50 via-red-900/20 to-red-600/50 hidden md:block" />

        {memories.map((memory, index) => (
          <motion.div 
            key={memory.id}
            initial={{ opacity: 0, x: memory.side === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col md:flex-row items-center w-full ${memory.side === "left" ? "md:justify-start" : "md:justify-end"}`}
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              className="bg-white p-4 pb-16 shadow-[0_20px_50px_rgba(255,0,0,0.15)] w-full max-w-[350px] md:max-w-[400px] relative group transition-transform duration-500"
              style={{ rotate: index % 2 === 0 ? -2 : 2 }}
            >
              <div className="h-[300px] md:h-[450px] w-full overflow-hidden mb-8 bg-gray-100">
                <img 
                  src={memory.img} 
                  alt="Memory" 
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
                />
              </div>

              <div className="px-2">
                 <p className="text-black font-['Playfair_Display'] italic text-lg md:text-xl leading-relaxed text-center font-bold">
                   "{memory.quote}"
                 </p>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-black p-3 rounded-2xl border border-red-600/30 group-hover:border-red-600 transition-colors shadow-2xl">
                  {index % 2 === 0 ? <Cpu className="text-red-600" size={24} /> : <Binary className="text-red-600" size={24} />}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* --- FINAL FOOTER --- */}
      <footer className="h-screen flex flex-col items-center justify-center text-center space-y-10 relative z-10">
        <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} 
            transition={{ repeat: Infinity, duration: 3 }}
        >
          <Heart className="text-red-600" size={120} fill="currentColor" />
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] font-black text-white italic leading-tight">
          To be <br/> <span className="text-red-600">continued...</span>
        </h2>
      </footer>
    </div>
  );
};

export default MemoriesPage;