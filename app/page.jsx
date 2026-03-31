"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart,
  Mail,
  Sparkles,
  Camera,
  PlayCircle,
  Music,
  Pause,
  Star,
  Flower2,
  Gift,
  Cherry,
  Feather,
  PenLine,
  BookHeart,
} from "lucide-react";

const CONFETTI_COLORS = [
  "#ff3377", "#ff75a3", "#ffd700", "#a8e6cf", "#c9a0dc",
  "#ffb347", "#ff6b6b", "#74b9ff", "#fd79a8", "#ffeaa7",
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [particles, setParticles] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const pageContainerRef = useRef(null);

  // Generate particles on mount - REDUCED FROM 35 to 15 FOR PERFORMANCE
  useEffect(() => {
    const icons = ["flower", "star", "heart", "sparkles", "petal", "cherry"];
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${15 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: 14 + Math.random() * 22,
      type: icons[Math.floor(Math.random() * icons.length)],
      layer: i < 5 ? "layer-back" : "layer-front",
    }));
    setParticles(newParticles);
  }, []);

  // Audio setup
  useEffect(() => {
    const bgm = new Audio("/assets/lagu/Nekodachi - Balik Layar.mp3");
    bgm.loop = true;
    setAudio(bgm);

    return () => {
      bgm.pause();
      bgm.src = "";
    };
  }, []);

  // Scroll reveal for fold items (Unfolding Paper Effect)
  useEffect(() => {
    if (step !== 2) return;

    // Use a smaller threshold to trigger folds earlier on mobile screens
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-open");
          }
        });
      },
      { threshold: 0.1 }
    );

    const folds = document.querySelectorAll(".fold-item");
    folds.forEach((fold) => observer.observe(fold));

    // Observe reveal-on-scroll items (like photos)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll(".reveal-on-scroll");
    reveals.forEach((el) => revealObserver.observe(el));

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, [step]);

  // Generate confetti pieces
  const generateConfetti = useCallback(() => {
    const pieces = Array.from({ length: 60 }).map((_, i) => {
      const angle = (i / 60) * 360;
      const distance = 200 + Math.random() * 400;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance - 200;
      return {
        id: i,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        x: `${x}px`,
        y: `${y}px`,
        rotation: `${Math.random() * 720 - 360}deg`,
        delay: `${Math.random() * 0.3}s`,
        width: 6 + Math.random() * 10,
        height: 14 + Math.random() * 16,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      };
    });
    setConfettiPieces(pieces);
  }, []);

  const handleOpenEnvelope = () => {
    if (step !== 0) return;

    setStep(1);
    setShakeScreen(true);
    setTimeout(() => setShakeScreen(false), 500);

    // Confetti!
    generateConfetti();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);

    // Glow burst
    setShowGlow(true);
    setTimeout(() => setShowGlow(false), 1500);

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
      audio.play().catch((e) => console.log("Audio play prevented:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const renderParticleIcon = (type, size) => {
    switch (type) {
      case "flower":
        return <Flower2 size={size} strokeWidth={1.5} />;
      case "star":
        return <Star size={size} strokeWidth={1.5} />;
      case "heart":
        return <Heart size={size} strokeWidth={1.5} fill="#ffdeeb" />;
      case "sparkles":
        return <Sparkles size={size} strokeWidth={1.5} />;
      case "petal":
        return <Feather size={size} strokeWidth={1.5} />;
      case "cherry":
        return <Cherry size={size} strokeWidth={1.5} />;
      default:
        return <Heart size={size} />;
    }
  };

  const page4Lines = [
    { type: "paragraph", text: "Sebenernya banyak banget yang mau aku omongin di sini, tapi aku ga tau harus mulai dari mana. Jadi yaudah, aku tulis aja semua yang ada di kepala aku ya." },
    { type: "paragraph", text: "Pertama, aku mau bilang makasih. Makasih udah jadi salah satu alasan aku semangat ngejalainin hari-hari. Kadang hidup tuh berat banget, tapi setiap kali liat kamu ketawa, nyanyi, atau bahkan cuma ngobrol random, rasanya tuh... gimana ya, kayak dunia jadi lebih ringan aja gitu." },
    { type: "paragraph", text: "Kedua, aku mau bilang kalau aku bangga banget sama kamu. Aku tau perjalanan kamu ga selalu mulus, pasti ada hari-hari dimana kamu ngerasa capek, ngerasa ga cukup, atau bahkan pengen nyerah. Tapi kamu tetep di sini. Kamu tetep berjuang. Dan itu... itu yang bikin aku makin sayang sama kamu." },
    { type: "japanese", text: "大切な人へ、いつもそばにいるよ。", sub: "(Untuk orang yang berharga, aku selalu ada di sisimu.)" },
    { type: "paragraph", text: "Ketiga — dan ini yang paling penting — aku mau kamu tau kalau kamu ga sendirian. Apapun yang terjadi, ada banyak orang yang sayang sama kamu, termasuk aku. Mungkin aku cuma satu dari sekian banyak fans, tapi perasaan ini tulus banget." },
    { type: "paragraph", text: "Oh iya, satu lagi. Kalau kamu baca ini pas lagi sedih, aku harap surat ini bisa bikin kamu senyum walau cuma sedikit. Dan kalau kamu baca ini pas lagi seneng, anggap aja ini tambahan kebahagiaan dari aku 😊" },
    { type: "paragraph", text: "Aku selalu percaya kalau kebaikan yang kamu tebar ke dunia pasti akan kembali ke kamu berlipat ganda. Jadi terus jadi diri kamu yang apa adanya ya. Jangan pernah berubah demi orang lain kalau itu bikin kamu ga bahagia." },
    { type: "divider" },
    { type: "paragraph", text: "P.S. Kalau nanti kapan-kapan kamu baca ulang surat ini, aku harap kamu ingat satu hal: kamu dicintai lebih dari yang kamu kira. Selalu. 💕" },
    { type: "paragraph", text: "P.P.S. Jangan lupa minum air putih yang banyak!!! Dan tidur yang cukup!!! Ini penting!!!" },
    { type: "paragraph", text: "P.P.P.S. Aku ga akan pernah bosen dukung kamu. Sampai kapanpun. 🌸" },
  ];

  return (
    <>
      {/* Background Particles - Reduced rendering burden */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`particle text-pink-100 ${p.layer} ${p.type === "petal" ? "petal" : ""}`}
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

      {/* Confetti Explosion */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="confetti-piece"
              style={{
                "--confetti-x": piece.x,
                "--confetti-y": piece.y,
                "--confetti-rot": piece.rotation,
                animationDelay: piece.delay,
                backgroundColor: piece.color,
                width: `${piece.width}px`,
                height: `${piece.height}px`,
                borderRadius: piece.borderRadius,
              }}
            />
          ))}
        </div>
      )}

      {/* Glow Burst */}
      {showGlow && <div className="glow-burst" />}

      {step < 2 ? (
        <div className={`envelope-container relative z-10 ${shakeScreen ? "screen-shake" : ""}`}>
          <div
            className={`envelope-wrapper ${step === 1 ? "is-opening" : ""}`}
            onClick={handleOpenEnvelope}
          >
            {step === 0 && (
              <div className="absolute -top-24 left-0 right-0 text-center z-10 bounce-text flex flex-col items-center">
                <div className="bg-white/95 px-6 py-3 rounded-full border-2 border-pink-300 shadow-lg flex flex-col items-center">
                  <Mail className="text-pink-500 mb-1" size={28} />
                  <h2 className="text-xl font-cute text-pink-600 font-bold">
                    Ada Surat Untukmu!
                  </h2>
                </div>
              </div>
            )}

            <div className="envelope">
              <div className="flap"></div>
              <div className="paper-inside"></div>
              <div className="front-pocket"></div>
              <div className="heart-seal flex items-center justify-center">
                <Heart size={36} fill="#ffebf0" stroke="#ffb3c6" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* External Music Player Component */}
          <div className="music-player">
            {isPlaying && (
              <div className="song-title-pill">
                <div className="music-visualizer">
                  <div className="viz-bar bar-1" />
                  <div className="viz-bar bar-2" />
                  <div className="viz-bar bar-3" />
                  <div className="viz-bar bar-4" />
                  <div className="viz-bar bar-5" />
                </div>
                <div className="song-title-scroll">
                  <span>Nekodachi — Balik Layar 🎵</span>
                </div>
              </div>
            )}
            <button
              onClick={toggleMusic}
              className={`music-btn ${isPlaying ? "playing" : ""}`}
              aria-label="Toggle BGM"
            >
              {isPlaying ? <Pause size={26} /> : <Music size={26} />}
            </button>
          </div>

          <div className="min-h-screen pb-32 animate-enter-paper pt-12 md:pt-20 relative z-10">
            <main className="max-w-3xl mx-auto w-full px-4 sm:px-6" ref={pageContainerRef}>
              
              {/* SECTION 1: HEADER & PEMBUKA (No fold down animation, this is the top sheet) */}
              <div className="paper-lines paper-margin bg-white px-6 md:px-16 pt-16 pb-8 border border-b-0 border-pink-200 relative glow-paper rounded-t-2xl z-20 shadow-md">
                <div className="sticker sticker-top-right" style={{ "--sticker-rot": "12deg" }}>
                  <Star size={32} className="text-yellow-400" fill="#ffd700" strokeWidth={1.5} />
                </div>
                <div className="sticker sticker-top-left" style={{ "--sticker-rot": "-15deg" }}>
                  <Flower2 size={30} className="text-pink-300" strokeWidth={1.5} />
                </div>

                <div className="text-center font-cute mb-10 flex justify-center">
                  <span className="bg-pink-100/90 px-6 py-2.5 rounded-full text-pink-600 uppercase tracking-widest text-xs font-extrabold border border-pink-200 flex items-center gap-2 shadow-sm">
                    <Gift size={16} /> To my favorite person
                  </span>
                </div>

                <div className="paper-content">
                  <h1 className="font-cute text-4xl md:text-5xl mb-8 text-gradient-pink font-bold flex items-center gap-3 flex-wrap">
                    Dear Kururin aka Kurin <Flower2 className="text-pink-500" size={40} />
                  </h1>
                  <p>
                    Otcukarinsamadeshitaaaa! Terima kasih sudah selalu bekerja keras dan
                    berjuang selama dan sejauh iniiiiii. Lewat surat sederhana ini, aku
                    ingin mengabadikan sedikit rasa bahagia dan dukunganku untukmu.
                  </p>
                  <p className="font-cute text-pink-600 font-bold text-xl pt-2">
                    君の笑顔は毎日を輝かせてくれるよ。
                    <br />
                    <span className="text-pink-400 text-lg font-normal">
                      (Senyummu selalu mencerahkan hariku.)
                    </span>
                  </p>
                </div>
              </div>

              {/* SECTION 2: MEMORI KITA (Fold 1) */}
              <div className="fold-wrapper relative z-10 -mt-1">
                <div className="fold-item bg-white paper-lines paper-margin px-6 md:px-16 py-12 border-l border-r border-t-0 border-pink-200 shadow-md">
                  <div className="sticker sticker-top-right" style={{ "--sticker-rot": "18deg" }}>
                    <Camera size={28} className="text-pink-400" strokeWidth={1.5} />
                  </div>

                  <div className="text-center font-cute mb-8 flex justify-center">
                    <span className="bg-pink-100/90 px-6 py-2.5 rounded-full text-pink-600 uppercase tracking-widest text-xs font-extrabold border border-pink-200 flex items-center gap-2 shadow-sm">
                      <Camera size={16} /> Memori Kita
                    </span>
                  </div>

                  <div className="paper-content">
                    <p>
                      Setiap penampilanmu di panggung selalu membekas di hati ku. Ini
                      adalah beberapa memori favorit yang sengaja aku simpan dan tempelkan
                      di surat ini. Nanti aku akan penuhi bingkai ini dengan pose
                      candid-mu yang paling lucu dan menggemaskan!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 my-12 relative">
                      <div className="photo-frame rotate-3 reveal-on-scroll">
                        <div className="tape tape-pink"></div>
                        <div className="aspect-[4/3] bg-pink-50 flex flex-col items-center justify-center mb-3 border-2 border-dashed border-pink-200 rounded overflow-hidden">
                          <img src="/assets/foto/pertemuan1.jpg" alt="Pertemuan Pertama" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-cute text-center text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                          Pertemuan Pertama Kitaaaa!! <Sparkles size={18} className="text-pink-400" />
                        </p>
                      </div>

                      <div className="photo-frame -rotate-2 mt-4 sm:mt-0 reveal-on-scroll" style={{ animationDelay: "0.2s" }}>
                        <div className="tape tape-lavender"></div>
                        <div className="aspect-[4/3] bg-pink-50 flex flex-col items-center justify-center mb-3 border-2 border-dashed border-pink-200 rounded overflow-hidden">
                          <img src="/assets/foto/fotofav.jpg" alt="Foto Favorit" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-cute text-center text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                          Foto Favorit yang aku ambil :3 <Heart size={18} fill="#ff75a3" className="text-pink-400" />
                        </p>
                      </div>

                      <div className="photo-frame rotate-2 mt-4 sm:mt-0 reveal-on-scroll" style={{ animationDelay: "0.4s" }}>
                        <div className="tape tape-mint"></div>
                        <div className="aspect-[4/3] bg-pink-50 flex flex-col items-center justify-center mb-3 border-2 border-dashed border-pink-200 rounded overflow-hidden">
                          <img src="/assets/foto/vc.jpg" alt="Video Call Pertama" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-cute text-center text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                          ini kayakny Video Call pertama aku :(
                          <Sparkles size={18} className="text-pink-400" />
                        </p>
                      </div>

                      <div className="photo-frame -rotate-3 mt-4 sm:mt-0 reveal-on-scroll" style={{ animationDelay: "0.6s" }}>
                        <div className="tape tape-gold"></div>
                        <div className="aspect-[4/3] bg-pink-50 flex flex-col items-center justify-center mb-3 border-2 border-dashed border-pink-200 rounded overflow-hidden">
                          <img src="/assets/foto/selfie.jpg" alt="Selfie Favorit" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-cute text-center text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                          selfie paling aku suka! <Heart size={18} fill="#ff75a3" className="text-pink-400" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: BEHIND THE SCENES (Fold 2) */}
              <div className="fold-wrapper relative z-8 -mt-1">
                <div className="fold-item bg-white paper-lines paper-margin px-6 md:px-16 py-12 border-l border-r border-t-0 border-pink-200 shadow-md">
                  <div className="text-center font-cute mb-8 flex justify-center">
                    <span className="bg-pink-100/90 px-6 py-2.5 rounded-full text-pink-600 uppercase tracking-widest text-xs font-extrabold border border-pink-200 flex items-center gap-2 shadow-sm">
                      <PlayCircle size={16} /> Behind The Scenes
                    </span>
                  </div>

                  <div className="paper-content">
                    <p className="font-cute text-pink-600 font-bold text-xl pb-2">
                      ずっと応援してる。がんばってね！
                      <br />
                      <span className="text-pink-400 text-lg font-normal">
                        (Aku akan terus mendukungmu. Semangat ya!)
                      </span>
                    </p>
                    <p>
                      Aku tau momen momen kemarin kamu pasti cape banget buat kamu off
                      sosmed :(, butttt, liat ini kak! beberapa moment kamu selama ini di
                      Nekodachi dari aku yang mengagumi dari balik layar kamera. Kamu sudah
                      menyebarkan sebanyak ini kebahagiaan ke banyak orang. Aku bangga
                      banget sama Kak Riinn.
                    </p>

                    <div className="my-12 mx-auto w-full max-w-md photo-frame rotate-1 reveal-on-scroll">
                      <div className="tape tape-striped"></div>
                      <div className="aspect-video bg-pink-50 border-2 border-dashed border-pink-200 rounded overflow-hidden">
                        <video
                          src="/assets/video/memories.mp4"
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <p className="font-cute text-center mt-3 text-md text-pink-600 font-bold flex items-center justify-center gap-2">
                        Throwback konser favorit <Heart size={18} fill="#ff75a3" className="text-pink-400" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: DEEP LETTER (Fold 3) */}
              <div className="fold-wrapper relative z-6 -mt-1">
                <div className="fold-item bg-white paper-lines paper-margin px-6 md:px-16 py-12 border-l border-r border-t-0 border-pink-200 shadow-md">
                   <div className="sticker sticker-top-right" style={{ "--sticker-rot": "10deg" }}>
                    <PenLine size={28} className="text-pink-400" strokeWidth={1.5} />
                  </div>

                  <div className="text-center font-cute mb-8 flex justify-center">
                    <span className="bg-pink-100/90 px-6 py-2.5 rounded-full text-pink-600 uppercase tracking-widest text-xs font-extrabold border border-pink-200 flex items-center gap-2 shadow-sm">
                      <PenLine size={16} /> Dari Hati ke Hati
                    </span>
                  </div>

                  <div className="paper-content">
                    <h2 className="font-cute text-2xl md:text-3xl mb-6 text-gradient-pink font-bold reveal-on-scroll flex items-center gap-2">
                      ✍️ Hal-Hal yang Ingin Aku Sampaikan...
                    </h2>
                    
                    {page4Lines.map((line, index) => {
                      if (line.type === "japanese") {
                        return (
                          <div key={index} className="reveal-on-scroll">
                            <p className="font-cute text-pink-600 font-bold text-xl pt-2">
                              {line.text}
                              <br />
                              <span className="text-pink-400 text-lg font-normal">
                                {line.sub}
                              </span>
                            </p>
                          </div>
                        );
                      }
                      if (line.type === "divider") {
                        return (
                          <div key={index} className="section-divider my-6 reveal-on-scroll">
                            <Sparkles size={16} />
                          </div>
                        );
                      }
                      return (
                        <p key={index} className="reveal-on-scroll">
                          {line.text}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 5: FOOTER (Fold 4) */}
              <div className="fold-wrapper relative z-4 -mt-1">
                <div className="fold-item bg-white paper-lines paper-margin px-6 md:px-16 pt-12 pb-24 border border-t-0 border-pink-200 rounded-b-2xl shadow-md">
                  <div className="sticker sticker-bottom-left" style={{ "--sticker-rot": "-8deg" }}>
                    <Star size={24} className="text-yellow-300" fill="#ffd700" strokeWidth={1.5} />
                  </div>

                  <div className="text-center font-cute mb-8 flex justify-center">
                    <span className="bg-pink-100/90 px-6 py-2.5 rounded-full text-pink-600 uppercase tracking-widest text-xs font-extrabold border border-pink-200 flex items-center gap-2 shadow-sm">
                      <Heart size={16} fill="#ff75a3" /> Penutup
                    </span>
                  </div>

                  <div className="paper-content">
                    <p className="font-cute text-pink-600 font-bold text-xl pb-2">
                      これからもよろしくね。
                      <br />
                      <span className="text-pink-400 text-lg font-normal">
                        (Mohon kerjasamanya juga ke depannya ya.)
                      </span>
                    </p>

                    <p>
                      Sampai jumpa di pertemuan selanjutnya ya kak! Aku ga sabar ketemu
                      kamu lagi. Have a wonderful day, wonderful week, wonderful month, dan
                      wonderful life! 🌸✨
                    </p>

                    <div className="section-divider my-8">
                      <Heart size={16} fill="#ff75a3" />
                    </div>

                    <div className="mt-14 text-right pr-4 flex flex-col items-end reveal-on-scroll">
                      <p className="font-cute text-3xl md:text-4xl text-gradient-rainbow font-bold mb-3">
                        With lots of love,
                      </p>
                      <p className="font-cute text-xl text-pink-400 font-semibold flex items-center gap-2">
                        Rakuuu <Sparkles size={20} className="text-pink-400" />
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-pink-300">
                        <Heart size={14} fill="#ffb6c1" />
                        <Heart size={18} fill="#ff75a3" />
                        <Heart size={22} fill="#ff3377" />
                        <Heart size={18} fill="#ff75a3" />
                        <Heart size={14} fill="#ffb6c1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </main>
          </div>
        </>
      )}
    </>
  );
}