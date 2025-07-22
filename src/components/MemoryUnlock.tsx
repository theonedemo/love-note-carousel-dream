import { Heart, Unlock } from "lucide-react";
import { Card } from "./ui/card";

interface MemoryUnlockProps {
  onNext: () => void;
}

const MemoryUnlock = ({ onNext }: MemoryUnlockProps) => {
  return (
    <div className="min-h-screen romantic-bg flex items-center justify-center relative">
      {/* Floating Hearts */}
      <div className="floating-hearts">
        <div className="heart">💝</div>
        <div className="heart">💖</div>
        <div className="heart">💕</div>
        <div className="heart">💗</div>
        <div className="heart">💝</div>
        <div className="heart">💖</div>
        <div className="heart">💕</div>
        <div className="heart">💗</div>
        <div className="heart">💝</div>
      </div>

      <div className="relative z-10 px-4">
        <Card 
          className="romantic-card p-12 text-center cursor-pointer max-w-md mx-auto hover:scale-105 transition-all duration-500"
          onClick={onNext}
        >
          <div className="space-y-6">
            {/* Lock Icon with Hearts */}
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-full animate-pulse opacity-20"></div>
              <Unlock className="w-12 h-12 text-romantic-rose" />
            </div>

            {/* Decorative Hearts */}
            <div className="flex justify-center space-x-4 text-2xl">
              <Heart className="w-6 h-6 text-romantic-pink animate-pulse" />
              <Heart className="w-8 h-8 text-romantic-rose animate-pulse delay-100" />
              <Heart className="w-6 h-6 text-romantic-pink animate-pulse delay-200" />
            </div>

            {/* Main Text */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gradient">
                Mirror of Memories
              </h2>
              <p className="text-lg text-foreground/80">
                Click to unlock our beautiful memories together
              </p>
            </div>

            {/* Sparkle Effect */}
            <div className="flex justify-center space-x-2 text-romantic-gold">
              <span className="animate-pulse">✨</span>
              <span className="animate-pulse delay-100">💫</span>
              <span className="animate-pulse delay-200">✨</span>
            </div>
          </div>
        </Card>

        {/* Hint Text */}
        <p className="text-center mt-6 text-foreground/60 animate-bounce">
          Tap the card to continue...
        </p>
      </div>
    </div>
  );
};

export default MemoryUnlock;