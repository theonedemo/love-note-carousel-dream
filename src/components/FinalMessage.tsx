import { useState } from "react";
import { Lightbulb, Heart, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const FinalMessage = () => {
  const [lightsOn, setLightsOn] = useState(false);
  const [cardOpened, setCardOpened] = useState(false);

  const toggleLights = () => {
    setLightsOn(!lightsOn);
    if (!lightsOn) {
      setTimeout(() => setCardOpened(true), 500);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      lightsOn 
        ? 'bg-gradient-to-br from-yellow-100 via-pink-50 to-purple-100' 
        : 'romantic-bg'
    } flex items-center justify-center relative`}>
      
      {/* Floating Hearts */}
      <div className="floating-hearts">
        <div className="heart">💫</div>
        <div className="heart">✨</div>
        <div className="heart">🌟</div>
        <div className="heart">💖</div>
        <div className="heart">💫</div>
        <div className="heart">✨</div>
        <div className="heart">🌟</div>
        <div className="heart">💖</div>
        <div className="heart">💫</div>
      </div>

      {/* Sparkle effects when lights are on */}
      {lightsOn && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="text-center space-y-8 px-4 max-w-4xl mx-auto relative z-10">
        {/* Main Title */}
        <div className="space-y-6">
          <h1 className={`text-6xl md:text-8xl font-bold transition-all duration-1000 ${
            lightsOn ? 'text-yellow-600' : 'text-gradient'
          } mb-4 sparkle`}>
            Light Up My Life
          </h1>
          
          {lightsOn && (
            <div className="animate-fade-in">
              <div className="text-4xl mb-4">🌟✨💫✨🌟</div>
              <h2 className="text-3xl md:text-4xl font-semibold text-gradient">
                You are my sunshine! ☀️
              </h2>
            </div>
          )}
        </div>

        {/* Greeting Card */}
        <div className={`relative perspective-1000 max-w-2xl mx-auto transition-all duration-1000`}>
          <div className={`greeting-card ${cardOpened ? 'opened' : ''} ${lightsOn ? 'lit' : ''}`}>
            {/* Card Front */}
            <div className="card-front romantic-card p-8 rounded-3xl">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
                  You bring light to every corner of my world 💖
                </p>
                <p className="text-lg text-foreground/80">
                  On this special day, I want to celebrate the incredible light you bring into my life every single day.
                </p>
              </div>
            </div>
            
            {/* Card Inside */}
            <div className="card-inside bg-gradient-to-r from-yellow-50 to-pink-50 p-8 rounded-3xl shadow-2xl">
              <div className="space-y-6 animate-fade-in">
                <p className="text-xl md:text-2xl leading-relaxed text-yellow-800">
                  ✨ Happy Birthday to my brightest star! ✨
                </p>
                <p className="text-lg text-pink-700">
                  Thank you for being the light that guides me, the warmth that comforts me, 
                  and the love that completes me. Here's to another year of making beautiful 
                  memories together! 🥂💕
                </p>
                <div className="text-2xl space-x-2">
                  <span>🎂</span>
                  <span>🎉</span>
                  <span>💖</span>
                  <span>✨</span>
                  <span>🌟</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Switch Button */}
        <div className="pt-8">
          <Button
            onClick={toggleLights}
            size="lg"
            className={`rounded-full text-xl px-12 py-6 hover:scale-105 transition-all duration-300 ${
              lightsOn 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 shadow-lg shadow-yellow-300/50' 
                : 'glow-button'
            }`}
          >
            <Lightbulb className={`mr-3 h-6 w-6 ${lightsOn ? 'animate-pulse' : ''}`} />
            {lightsOn ? 'You Light Up My World!' : 'Turn the Lights On ✨'}
            {lightsOn ? (
              <Sparkles className="ml-3 h-6 w-6 animate-pulse" />
            ) : (
              <Heart className="ml-3 h-6 w-6 romantic-pulse" />
            )}
          </Button>
        </div>

        {lightsOn && (
          <div className="animate-fade-in delay-500">
            <p className="text-lg text-pink-600 font-medium">
              Forever and always, you are my everything 💕
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalMessage;