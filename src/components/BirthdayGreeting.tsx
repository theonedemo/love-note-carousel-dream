import { Heart } from "lucide-react";
import { Button } from "./ui/button";

interface BirthdayGreetingProps {
  onNext: () => void;
}

const BirthdayGreeting = ({ onNext }: BirthdayGreetingProps) => {
  return (
    <div className="min-h-screen romantic-bg flex items-center justify-center relative">
      {/* Floating Hearts */}
      <div className="floating-hearts">
        <div className="heart">💖</div>
        <div className="heart">💕</div>
        <div className="heart">💗</div>
        <div className="heart">💖</div>
        <div className="heart">💕</div>
        <div className="heart">💗</div>
        <div className="heart">💖</div>
        <div className="heart">💕</div>
        <div className="heart">💗</div>
      </div>

      <div className="text-center space-y-8 px-4 max-w-4xl mx-auto relative z-10">
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4 animate-fade-in">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-6xl font-semibold text-gradient sparkle">
            My Love!
          </h2>
        </div>

        {/* Subheading */}
        <h3 className="text-2xl md:text-3xl font-medium text-foreground/80 animate-fade-in delay-300">
          To the most amazing woman in my life
        </h3>

        {/* Sweet Message */}
        <div className="romantic-card p-8 rounded-3xl max-w-2xl mx-auto animate-scale-in delay-500">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
            Every moment with you is a gift, and today we celebrate the greatest gift of all – 
            <span className="text-gradient font-semibold"> YOU! </span>
            <span className="inline-block animate-pulse">🌹</span>
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="pt-8 animate-fade-in delay-700">
          <Button
            onClick={onNext}
            size="lg"
            className="glow-button text-xl px-12 py-6 rounded-full hover:scale-105 transition-all duration-300"
          >
            <Heart className="mr-3 h-6 w-6 romantic-pulse" />
            Begin Your Surprise!
            <Heart className="ml-3 h-6 w-6 romantic-pulse" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayGreeting;