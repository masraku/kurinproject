"use client";

import { useState, useEffect } from "react";
import { 
  Heart, 
  Mail, 
  Sparkles, 
  Camera, 
  Smile, 
  PlayCircle, 
  Music, 
  Pause,
  Star,
  Flower2,
  Gift
} from "lucide-react";

export default function Home() {
  const [step, setStep] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [particles, setParticles] = useState([]);

  // Generate partikel dekorasi saat komponen di-mount
  useEffect(() => {
    const icons = ['flower', 'star', 'heart', 'sparkles'];
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${10 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: 16 + Math.random() * 24,
      type: icons[Math.floor(Math.random() * icons.length)]
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const bgm = new Audio("/assets/lagu/Nekodachi - Balik Layar.mp3");
    bgm.loop = true;
    setAudio(bgm);
    
    return () => {
      bgm.pause();
      bgm.src = "";
    };
  }, []);

  useEffect(() => {
    if (step !== 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-open");
          }
        });
      },
      { threshold: 0.15 } 
    );

    const folds = document.querySelectorAll(".fold-item");
    folds.forEach((fold) => observer.observe(fold));

    return () => observer.disconnect();
  }, [step]);

  const handleOpenEnvelope = () => {
    if (step !== 0) return;
    
    setStep(1); 
    
    if (audio) {
      audio.play().catch((e) => console.log("Audio play prevented:", e));
      setIsPlaying(true);
    }

    setTimeout(() => {
      setStep(2);
      window.scrollTo(0, 0);
    }, 1500);
  };

  const toggleMusic = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log("Audio play prevented:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const renderParticleIcon = (type, size) => {
    switch(type) {
      case 'flower': return <Flower2 size={size} strokeWidth={1.5} />;
      case 'star': return <Star size={size} strokeWidth={1.5} />;
      case 'heart': return <Heart size={size} strokeWidth={1.5} fill="#ffdeeb" />;
      case 'sparkles': return <Sparkles size={size} strokeWidth={1.5} />;
      default: return <Heart size={size} />;
    }
  };

  return (
    <>
      {/* Background Partikel Hidup */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map(p => (
          <div 
            key={p.id} 
            className="particle text-pink-100" 
            style={{
              left: p.left,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          >
            {renderParticleIcon(p.type, p.size)}
          </div>
        ))}
      </div>

      {step < 2 ? (
        <div className="envelope-container relative z-10">
          <div 
            className={`envelope-wrapper ${step === 1 ? 'is-opening' : ''}`} 
            onClick={handleOpenEnvelope}
          >
            {step === 0 && (
               <div className="absolute -top-24 left-0 right-0 text-center z-10 bounce-text flex flex-col items-center">
                 <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full border-2 border-pink-300 shadow-lg flex flex-col items-center">
                   <Mail className="text-pink-500 mb-1" size={28} />
                   <h2 className="text-xl font-cute text-pink-600 font-bold">Ada Surat Untukmu!</h2>
                 </div>
               </div>
            )}
            
            <div className="envelope">
              <div className="flap"></div>
              <div className="paper-inside"></div>
              <div className="front-pocket"></div>
              <div className="heart-seal">
                <Heart size={56} fill="#ff1a66" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen pb-32 animate-enter-paper pt-12 md:pt-20 relative z-10">
          <button onClick={toggleMusic} className="music-btn" aria-label="Toggle BGM">
            {isPlaying ? <Pause size={28} /> : <Music size={28} />}
          </button>

          <main className="max-w-3xl mx-auto w-full px-4 sm:px-6">
            
            <div className="paper-lines bg-white/95 backdrop-blur-sm rounded-t-2xl px-6 md:px-16 pt-16 pb-8 shadow-xl border border-b-0 border-pink-200 relative">
              <div className="text-center font-cute mb-10 flex justify-center">
                <span className="bg-pink-100/90 px-6 py-2 rounded-full text-pink-600 uppercase tracking-widest text-xs font-extrabold border border-pink-200 flex items-center gap-2">
                  <Gift size={16} /> To my favorite person
                </span>
              </div>

              <div className="paper-content">
                <h1 className="font-cute text-4xl md:text-5xl mb-8 text-gradient-pink font-bold flex items-center gap-3">
                  Dear Kururin aka Kurin  <Flower2 className="text-pink-500" size={40} />
                </h1>
                <p>
                  Otcukarinsamadeshitaaaa! Terima kasih sudah selalu bekerja keras dan berjuang selama dan sejauh iniiiiii. Lewat surat sederhana ini, aku ingin mengabadikan sedikit rasa bahagia dan dukunganku untukmu.
                </p>
                <p className="font-cute text-pink-600 font-bold text-xl pt-2">
                  君の笑顔は毎日を輝かせてくれるよ。<br/>
                  <span className="text-pink-400 text-lg font-normal">(Senyummu selalu mencerahkan hariku.)</span>
                </p>
                <p>
                  Coba scroll ke bawah pelan-pelan ya, ada kejutan di lipatan kertas selanjutnya...
                </p>
              </div>
            </div>

            <div className="fold-wrapper">
              <div className="fold-item paper-lines bg-white/95 backdrop-blur-sm px-6 md:px-16 py-10 border-x border-pink-200">
                 <div className="paper-content">
                   <p>
                     Setiap penampilanmu di panggung selalu membekas di hati ku. Ini adalah beberapa memori favorit yang sengaja aku simpan dan tempelkan di surat ini. Nanti aku akan penuhi bingkai ini dengan pose candid-mu yang paling lucu dan menggemaskan!
                   </p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 my-12 relative">
                     <div className="photo-frame rotate-3">
                       <div className="tape"></div>
                       <div className="aspect-[4/3] bg-pink-50/80 flex flex-col items-center justify-center mb-3 border-2 border-dashed border-pink-200 rounded overflow-hidden">
                         <img src="/assets/foto/pertemuan1.jpg" alt="Foto Cantik 1" className="w-full h-full object-cover" />
                       </div>
                       <p className="font-cute text-center text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                         Pertemuan Pertama Kitaaaa!! <Sparkles size={18} className="text-pink-400" />
                       </p>
                     </div>

                     <div className="photo-frame -rotate-2 mt-4 sm:mt-0">
                       <div className="tape"></div>
                       <div className="aspect-[4/3] bg-pink-50/80 flex flex-col items-center justify-center mb-3 border-2 border-dashed border-pink-200 rounded overflow-hidden">
                         <img src="/assets/foto/fotofav.jpg" alt="Foto Cantik 1" className="w-full h-full object-cover" />
                       </div>
                       <p className="font-cute text-center text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                         Foto Favorit yang aku ambil :3 <Heart size={18} fill="#ff75a3" className="text-pink-400" />
                       </p>
                     </div>
                     
                     <div className="photo-frame rotate-2 mt-4 sm:mt-0">
                       <div className="tape"></div>
                       <div className="aspect-[4/3] bg-pink-50/80 flex flex-col items-center justify-center mb-3 border-2 border-dashed border-pink-200 rounded overflow-hidden">
                         <img src="/assets/foto/vc.jpg" alt="Foto Cantik 1" className="w-full h-full object-cover" />
                       </div>
                       <p className="font-cute text-center text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                         ini kayakny Video Call pertama aku, huh menyesal ga sering vc :( <Sparkles size={18} className="text-pink-400" />
                       </p>
                     </div>

                     <div className="photo-frame -rotate-3 mt-4 sm:mt-0">
                       <div className="tape"></div>
                       <div className="aspect-[4/3] bg-pink-50/80 flex flex-col items-center justify-center mb-3 border-2 border-dashed border-pink-200 rounded overflow-hidden">
                         <img src="/assets/foto/selfie.jpg" alt="Foto Cantik 1" className="w-full h-full object-cover" />
                       </div>
                       <p className="font-cute text-center text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                         ini selfie kita yang paling aku suka! kamu lucu banget :(((( <Heart size={18} fill="#ff75a3" className="text-pink-400" />
                       </p>
                     </div>
                   </div>
                   
                   <p>
                     Meskipun nantinya jadwal kamu super padat, tolong jangan lupa untuk istirahat. Makan makanan enak yang buaanyakkkkk yaa jangan telaat!!!
                   </p>
                 </div>
              </div>
            </div>

            <div className="fold-wrapper">
              <div className="fold-item paper-lines bg-white/95 backdrop-blur-sm px-6 md:px-16 py-10 border-x border-pink-200">
                 <div className="paper-content">
                   <p className="font-cute text-pink-600 font-bold text-xl pb-2">
                     ずっと応援してる。がんばってね！<br/>
                     <span className="text-pink-400 text-lg font-normal">(Aku akan terus mendukungmu. Semangat ya!)</span>
                   </p>
                   <p>
                     Aku tau momen momen kemarin kamu pasti cape banget buat kamu off sosmed :(, butttt, liat ini kak! beberapa moment kamu selama ini di Nekodachi dari aku yang mengagumi dari balik layar kamera . Kamu sudah menyebarkan sebanyak ini kebahagiaan ke banyak orang. Aku bangga banget sama Kak Riinn.
                   </p>
                   
                   <div className="my-12 mx-auto w-full max-w-md photo-frame rotate-1">
                     <div className="tape"></div>
                     <div className="aspect-video bg-pink-50/80 flex flex-col items-center justify-center border-2 border-dashed border-pink-200 rounded cursor-pointer group">
                        <PlayCircle className="text-pink-400 mb-3 group-hover:scale-110 transition-transform" size={56} strokeWidth={1.5} />
                        <span className="text-pink-500 font-cute text-xl font-bold">Putar Video</span>
                     </div>
                     <p className="font-cute text-center mt-3 text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                       Throwback konser favorit <Heart size={18} fill="#ff75a3" className="text-pink-400" />
                     </p>
                   </div>
                   
                   <p>
                     Aku bakal terus dukung dengan sederhana: dengerin lagu-lagumu, nge-vote, dan bantu sebarin pesona kamu ke seluruh dunia, love love love!
                   </p>
                 </div>
              </div>
            </div>

            <div className="fold-wrapper">
              <div className="fold-item paper-lines bg-white/95 backdrop-blur-sm px-6 md:px-16 pt-10 pb-32 border border-t-0 border-pink-200 rounded-b-2xl shadow-2xl">
                 <div className="paper-content">
                   <p>
                     Segini dulu surat dan halaman kenangannya. Kapanpun kamu baca ini, ketahuilah kalau banyak banget cinta yang mengelilingi kamu. Have a wonderful day!
                   </p>
                   
                   <div className="mt-14 text-right pr-4 flex flex-col items-end">
                     <p className="font-cute text-3xl text-gradient-pink font-bold mb-2">With lots of love,</p>
                     <p className="font-cute text-xl text-pink-400 font-semibold flex items-center gap-2">
                       Rakuuu <Sparkles size={20} className="text-pink-400" />
                     </p>
                   </div>
                 </div>
              </div>
            </div>

          </main>
        </div>
      )}
    </>
  );
}