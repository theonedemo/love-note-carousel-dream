import { useState, useEffect, useRef } from "react";
import { ArrowRight, Mic } from "lucide-react";
import { Button } from "./ui/button";
import cakeImage from "../assets/birthday-cake.jpg";

interface CakePageProps {
  onNext: () => void;
}

const CakePage = ({ onNext }: CakePageProps) => {
  const [candleBlown, setCandleBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const blowCandle = () => {
    if (!candleBlown) {
      setCandleBlown(true);
      setShowConfetti(true);
      stopListening();
      
      // Show next button after confetti
      setTimeout(() => {
        setShowNextButton(true);
      }, 1500);
    }
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      
      const microphone = audioContext.createMediaStreamSource(stream);
      microphoneRef.current = microphone;
      microphone.connect(analyser);
      
      setIsListening(true);
      detectBlowing();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      // Fallback to click
    }
  };

  const stopListening = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
  };

  const detectBlowing = () => {
    if (!analyserRef.current || candleBlown) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const checkSound = () => {
      if (!analyserRef.current || candleBlown) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Detect low frequency sounds (blowing typically has strong low frequencies)
      const lowFreqSum = dataArray.slice(0, 10).reduce((sum, value) => sum + value, 0);
      const avgLowFreq = lowFreqSum / 10;
      
      // Detect if there's a sustained low frequency sound (blowing)
      if (avgLowFreq > 80) { // Threshold for blowing detection
        blowCandle();
        return;
      }
      
      if (isListening) {
        requestAnimationFrame(checkSound);
      }
    };
    
    checkSound();
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  // Generate confetti
  useEffect(() => {
    if (showConfetti) {
      const colors = ['#ff69b4', '#ff1493', '#da70d6', '#ba55d3', '#9370db'];
      const confettiCount = 50;
      
      for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.animationDelay = Math.random() * 3 + 's';
          confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
          document.body.appendChild(confetti);
          
          setTimeout(() => {
            confetti.remove();
          }, 5000);
        }, i * 50);
      }
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen romantic-bg flex flex-col items-center justify-center relative px-4">
      {/* Floating Hearts */}
      <div className="floating-hearts">
        <div className="heart">🎂</div>
        <div className="heart">🎉</div>
        <div className="heart">🎈</div>
        <div className="heart">✨</div>
        <div className="heart">🎂</div>
        <div className="heart">🎉</div>
        <div className="heart">🎈</div>
        <div className="heart">✨</div>
        <div className="heart">🎂</div>
      </div>

      <div className="text-center space-y-8 max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient sparkle">
            Let's Cut the Cake!
          </h1>
          <div className="text-4xl animate-bounce">🎂</div>
        </div>

        {/* Cake Container */}
        <div className="romantic-card p-8 rounded-3xl max-w-2xl mx-auto">
          <div className="relative">
            {/* Cake Image */}
            <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative group cursor-pointer" onClick={blowCandle}>
              <img
                src={cakeImage}
                alt="Birthday Cake"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Candle Flame Overlay */}
              {!candleBlown && (
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-4 h-8 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full animate-pulse"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-10 bg-gradient-to-t from-orange-300/50 to-yellow-200/50 rounded-full animate-pulse blur-sm"></div>
                  </div>
                </div>
              )}
              
              {/* Click instruction */}
              {!candleBlown && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xl font-semibold bg-black/50 px-4 py-2 rounded-full">
                    Click to blow out the candle! 💨
                  </p>
                </div>
              )}
            </div>

            {/* Microphone Button */}
            {!candleBlown && !isListening && (
              <div className="mb-4">
                <Button
                  onClick={startListening}
                  className="glow-button rounded-full px-6 py-3 mb-4"
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Start Listening for Blowing 🎤
                </Button>
              </div>
            )}

            {isListening && !candleBlown && (
              <div className="mb-4 animate-pulse">
                <p className="text-lg text-gradient font-semibold">
                  🎤 Listening... Blow into your microphone! 💨
                </p>
              </div>
            )}

            {/* Messages */}
            {!candleBlown ? (
              <p className="text-lg text-foreground/80">
                {!isListening ? "Start listening, then blow out the candle! 🕯️✨" : "Blow gently into your microphone! 💨"}
              </p>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <p className="text-2xl text-gradient font-semibold">
                  🎉 Happy Birthday Beautiful! 🎉
                </p>
                <p className="text-lg text-foreground/80">
                  May all your wishes come true! 💖
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Next Button */}
        {showNextButton && (
          <div className="animate-fade-in">
            <Button
              onClick={onNext}
              className="glow-button rounded-full px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
            >
              Continue the Magic
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CakePage;