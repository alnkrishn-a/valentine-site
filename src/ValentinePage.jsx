import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Heart, Sparkles, Volume2, VolumeX, HeartPulse, ChevronDown, Fingerprint, Scan, Lock, ArrowRight, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

// --- IMAGE IMPORTS ---
import img1 from './assets/img1.jpg'; import img2 from './assets/img2.jpg'; import img3 from './assets/img3.jpg';
import img4 from './assets/img4.jpg'; import img5 from './assets/img5.jpg'; import img6 from './assets/img6.jpg';
import img7 from './assets/img7.jpg'; import img8 from './assets/img8.jpg'; import img9 from './assets/img9.jpg';
import img10 from './assets/img10.jpg'; import img11 from './assets/img11.jpg'; import img12 from './assets/img12.jpg';
import img13 from './assets/img13.jpg'; import img14 from './assets/img14.jpg'; import img15 from './assets/img15.jpg';
import img16 from './assets/img16.jpg'; import img17 from './assets/img17.jpg'; import img18 from './assets/img18.jpg';
import img19 from './assets/img19.jpg'; import img20 from './assets/img20.jpg'; import img21 from './assets/img21.jpg';
import img22 from './assets/img22.jpg'; import img23 from './assets/img23.jpg'; import img24 from './assets/img24.jpg';
import img25 from './assets/img25.jpg'; import img26 from './assets/img26.jpg'; import img27 from './assets/img27.jpg';
import img28 from './assets/img28.jpg'; import img29 from './assets/img29.jpg'; import img30 from './assets/img30.jpg';

// --- AUDIO IMPORT ---
import loveSong from './assets/music.mp3';

const FallingDecorations = memo(() => {
  const items = useMemo(() => [...Array(15)].map((_, i) => ({
    id: i, char: i % 2 === 0 ? '🧸' : '❤️', left: Math.random() * 100 + "%", duration: 22 + Math.random() * 8, delay: Math.random() * 5
  })), []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map(item => (
        <motion.div key={item.id} initial={{ y: -100, opacity: 0 }} animate={{ y: '110vh', opacity: [0, 0.4, 0.4, 0], rotate: 360 }} transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "linear" }} className="absolute text-5xl filter blur-[1px]" style={{ left: item.left }}>
          {item.char}
        </motion.div>
      ))}
    </div>
  );
});

const MilestoneCard = ({ item, navigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Initializing feelings... Accessing Jan 29 archive... Success. I love you.";

  useEffect(() => {
    if (item.typewriter && isHovered) {
      let i = 0;
      const timer = setInterval(() => {
        setDisplayText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(timer);
      }, 50);
      return () => clearInterval(timer);
    } else {
      setDisplayText("");
    }
  }, [isHovered, item.typewriter]);

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(item.route)}
      className={`bg-black/80 backdrop-blur-2xl p-8 rounded-[3rem] border shadow-2xl max-w-sm cursor-pointer group relative overflow-hidden transition-colors ${item.glitch && isHovered ? 'border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.3)]' : 'border-red-900/40'}`}
    >
      <div className="text-red-500 mb-4 group-hover:text-red-400">
        {item.icon}
      </div>
      <span className="text-red-400 font-bold text-xs uppercase tracking-[0.3em]">{item.date}</span>
      <h3 className={`text-white text-3xl font-black font-['Playfair_Display'] italic my-2 ${item.glitch && isHovered ? 'animate-bounce text-red-500' : ''}`}>
        {item.glitch && isHovered ? "SECURE ACCESS" : item.title}
      </h3>
      <div className="text-rose-200 text-sm italic opacity-80 min-h-[60px]">
        {item.typewriter && isHovered ? (
          <div className="font-mono text-green-400 bg-black/50 p-2 rounded">
            {"> "}{displayText}<span className="animate-pulse">|</span>
          </div>
        ) : (
          item.desc
        )}
      </div>
      <p className="text-red-500/50 text-[10px] uppercase tracking-widest mt-4">Tap to explore</p>
    </motion.div>
  );
};

const ValentinePage = () => {
  const navigate = useNavigate();
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  const audioRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const startDate = useMemo(() => new Date(2023, 0, 29, 0, 0, 0), []);
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const photoGrid = useMemo(() => [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
    img21, img22, img23, img24, img25, img26, img27, img28, img29, img30
  ], []);

  // --- NEW: PERFORMANCE OPTIMIZATION (PRELOADING) ---
  useEffect(() => {
    photoGrid.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [photoGrid]);

  useEffect(() => {
    if (hasAccepted) {
      window.scrollTo(0, 0);
    }
  }, [hasAccepted]);

  const heartPattern = [0,0,1,1,0,1,1,0,0, 0,1,1,1,1,1,1,1,0, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 0,1,1,1,1,1,1,1,0, 0,0,1,1,1,1,1,0,0, 0,0,0,1,1,1,0,0,0, 0,0,0,0,1,0,0,0,0];

  const milestones = [
    { date: "Jan 29, 2023", title: "The Expression", desc: "The moment our source code changed forever.", icon: <Terminal size={24}/>, route: "/memories", typewriter: true },
    { date: "Feb 14, 2023", title: "Heart's Vault", desc: "Accessing 100+ reasons why I love you...", icon: <Lock size={24}/>, route: "/vault", glitch: true },
    { date: "Today", title: "Building Our Future", desc: "I can't wait for every second with you.", icon: <HeartPulse size={24}/>, route: "/quiz" },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      setTimeTogether({ days: Math.floor(diff / (1000 * 60 * 60 * 24)), hours: Math.floor((diff / (1000 * 60 * 60)) % 24), mins: Math.floor((diff / (1000 * 60) % 60)), secs: Math.floor((diff / 1000) % 60) });
    };
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => { window.removeEventListener('mousemove', handleMouseMove); clearInterval(timer); };
  }, [startDate]);

  useEffect(() => {
    let interval;
    if (isScanning && scanProgress < 100) {
      interval = setInterval(() => { setScanProgress(prev => Math.min(prev + 1.5, 100)); }, 10);
    } else if (!isScanning && scanProgress < 100 && scanProgress > 0) {
      setScanProgress(0); 
    }
    if (scanProgress >= 100) { setTimeout(() => navigate('/first-photo'), 500); }
    return () => clearInterval(interval);
  }, [isScanning, scanProgress, navigate]);

  const handleYes = () => {
    setHasAccepted(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
    confetti({ particleCount: 500, spread: 200, origin: { y: 0.6 } });
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const moveNo = () => {
    const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    setNoButtonPos({ x, y });
    setYesScale(prev => prev + 0.2); 
  };

  const handleDoorOpen = () => {
    if (!isDoorOpen) {
      setIsDoorOpen(true);
      confetti({ particleCount: 200, spread: 120, colors: ['#ffffff', '#ff0000', '#ffd700'], origin: { y: 0.8 } });
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-black cursor-none selection:bg-red-800">
      <audio ref={audioRef} src={loveSong} loop />
      
      {/* Optimized: Falling items only show on landing to save RAM */}
      {!hasAccepted && <FallingDecorations />}

      {hasAccepted && <motion.div className="fixed top-0 left-0 right-0 h-2 bg-red-600 origin-left z-[10000]" style={{ scaleX }} />}
      
      {/* Optimized: Changed from spring to tween to stop cursor lag */}
      <motion.div 
        className="fixed top-0 left-0 w-12 h-12 z-[9999] pointer-events-none" 
        animate={{ x: mousePos.x - 24, y: mousePos.y - 24 }} 
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      >
        <Heart fill="#aa0000" className="text-red-500 drop-shadow-[0_0_20px_#ff0000]" size={48} />
      </motion.div>

      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5, filter: "blur(50px)" }} className="relative z-10 w-full min-h-screen overflow-y-auto scroll-smooth">
            <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
              <h1 className="neo-glow-text font-['Playfair_Display'] text-7xl md:text-[11rem] font-black mb-10 italic text-red-600 drop-shadow-2xl leading-tight">Be My <br/> Valentine?</h1>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-red-400 mt-10 flex flex-col items-center gap-2"><span className="text-xs font-bold tracking-[0.3em] uppercase">Scroll Down</span><ChevronDown /></motion.div>
            </section>
            
            <section className="min-h-screen flex flex-col items-center justify-center p-6">
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[4rem] mb-12 shadow-2xl w-full max-w-4xl mx-auto">
                <p className="text-rose-400 font-bold tracking-[0.4em] text-[10px] mb-6 text-center uppercase flex items-center justify-center gap-2"><Sparkles size={12}/> Since Jan 29, 2023 <Sparkles size={12}/></p>
                <div className="flex justify-center gap-4 md:gap-10">
                  {Object.entries(timeTogether).map(([label, val]) => (
                    <div key={label} className="flex flex-col items-center"><span className="text-3xl md:text-7xl font-black text-red-600 font-serif">{val}</span><span className="text-[10px] uppercase font-bold text-rose-300/30 tracking-[0.2em] mt-3">{label}</span></div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-16 items-center justify-center min-h-[300px] w-full relative">
                <motion.button onClick={handleYes} animate={{ scale: yesScale }} className="bg-gradient-to-br from-red-600 to-rose-700 text-white px-20 py-8 rounded-full text-4xl font-black shadow-[0_0_100px_rgba(220,38,38,0.6)] z-20 border-t border-white/20">YES!</motion.button>
                <motion.button onMouseEnter={moveNo} animate={{ x: noButtonPos.x, y: noButtonPos.y }} className="bg-white text-red-600 px-12 py-6 rounded-full text-2xl font-black border-4 border-red-500 shadow-2xl z-10 transition-colors">No</motion.button>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative min-h-[700vh] w-full bg-black">
            <div className="fixed inset-0 z-10 grid grid-cols-9 grid-rows-8 p-4 md:p-10 pointer-events-none opacity-90">
              {heartPattern.map((isActive, i) => (
                <div key={i} className="relative w-full h-full overflow-hidden">
                  {isActive && (<motion.div className="w-full h-full border border-white/5" style={{ backgroundImage: `url(${photoGrid[i % 30]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} animate={{ opacity: Math.sqrt(Math.pow(mousePos.x - (window.innerWidth/9 * (i%9) + window.innerWidth/18), 2) + Math.pow(mousePos.y - (window.innerHeight/8 * Math.floor(i/9) + window.innerHeight/16), 2)) < 250 ? 1 : 0.03, scale: Math.sqrt(Math.pow(mousePos.x - (window.innerWidth/9 * (i%9) + window.innerWidth/18), 2) + Math.pow(mousePos.y - (window.innerHeight/8 * Math.floor(i/9) + window.innerHeight/16), 2)) < 250 ? 1.15 : 1 }} />)}
                </div>
              ))}
            </div>

            <div className="relative z-30 pt-40 px-6 max-w-4xl mx-auto space-y-[60vh]">
              <div className="flex flex-col items-center">
                  <motion.div onMouseDown={() => setIsScanning(true)} onMouseUp={() => setIsScanning(false)} onTouchStart={() => setIsScanning(true)} onTouchEnd={() => setIsScanning(false)} className="bg-black/60 backdrop-blur-3xl p-10 rounded-[4rem] border border-red-900/40 shadow-2xl max-w-lg cursor-pointer group relative overflow-hidden select-none">
                    <motion.div className="absolute inset-0 bg-red-900/30 z-0" initial={{ height: "0%" }} animate={{ height: `${scanProgress}%` }} transition={{ duration: 0 }} />
                    <div className="relative z-10 text-center">
                      <Fingerprint className={`mb-6 mx-auto transition-all ${scanProgress === 100 ? 'text-green-500 scale-110' : 'text-red-500'}`} size={60} />
                      <h3 className="text-white text-4xl font-black italic font-['Playfair_Display'] mb-2">{scanProgress === 100 ? "ACCESS GRANTED" : "Top Secret Memory"}</h3>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Scan size={14} className={isScanning ? "text-red-400 animate-spin" : "text-red-700"} />
                        <p className="text-red-400 font-bold tracking-widest text-[10px] uppercase">{scanProgress === 100 ? "Unlocked" : "Hold Finger to Unlock"}</p>
                      </div>
                    </div>
                  </motion.div>
               </div>

              {milestones.map((item, idx) => (
                <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'items-start' : 'items-end'}`}>
                   <MilestoneCard item={item} navigate={navigate} />
                </div>
              ))}

              <div className="flex flex-col items-center justify-center h-screen pointer-events-auto pb-40">
                <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[5rem] border border-white/10 text-center shadow-[0_0_100px_rgba(255,0,0,0.15)] w-full max-w-2xl relative">
                  <HeartPulse className="text-red-900/50 mx-auto mb-6 animate-pulse" size={48} />
                  <h3 className="text-white/60 text-3xl font-black font-['Playfair_Display'] mb-10 italic text-center uppercase tracking-widest">A Final Vow...</h3>
                  <div className="relative w-full max-w-[450px] aspect-[4/3] mx-auto overflow-hidden rounded-[3rem] border-4 border-red-900/30 shadow-2xl bg-rose-950">
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center z-0">
                        <p className="text-white font-['Playfair_Display'] text-2xl md:text-3xl italic leading-relaxed font-bold">"I promise to marry you at exactly the age you wish. I'll be your home, your best friend, and your forever. Forever."</p>
                    </div>
                    <motion.div className="absolute inset-0 z-20 bg-[#1a0505] flex flex-col items-center justify-center border-r-4 border-red-900/50 cursor-grab" drag="x" dragConstraints={{ left: 0, right: 300 }} onDragEnd={(e, { offset }) => { if (offset.x > 100) handleDoorOpen(); }} animate={isDoorOpen ? { x: "100%", opacity: 0 } : { x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
                      <Lock className="text-red-500 mb-4" size={50} />
                      <h3 className="text-white font-black text-2xl uppercase">Private</h3>
                      <div className="flex items-center gap-2 mt-4 text-red-400/60 animate-pulse">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Slide to Unlock</span>
                        <ArrowRight size={16} />
                      </div>
                    </motion.div>
                  </div>
                  <p className="text-rose-400/40 font-bold tracking-[0.5em] text-[10px] mt-12 uppercase italic">This promise is for your eyes only</p>
                </div>
              </div>

              <div className="flex flex-col items-center pb-80 pointer-events-none mt-20">
                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, type: "spring" }}>
                  <Heart className="text-red-600 mx-auto mb-10 animate-pulse" size={180} fill="currentColor" />
                </motion.div>
                <h3 className="font-['Playfair_Display'] text-white text-8xl md:text-[14rem] font-black italic text-center tracking-tighter leading-none drop-shadow-[0_0_50px_rgba(255,0,0,0.5)]">Always <br/> Yours.</h3>
              </div>
            </div>

            <button 
              onClick={toggleMusic}
              className="fixed bottom-10 right-10 z-50 bg-red-600/20 backdrop-blur-xl p-4 rounded-full border border-red-600/50 transition-transform hover:scale-110 active:scale-95"
            >
              {isMusicPlaying ? <Volume2 className="text-red-500" size={24} /> : <VolumeX className="text-red-500" size={24} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentinePage;