import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import memory1 from "../assets/memory1.jpg";
import memory2 from "../assets/memory2.jpg";
import memory3 from "../assets/memory3.jpg";

interface PhotoCarouselProps {
  onNext: () => void;
}

const PhotoCarousel = ({ onNext }: PhotoCarouselProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const memories = [
    {
      image: memory1,
      caption: "This smile… my forever favorite",
      description: "Every time you smile, my world becomes brighter ✨"
    },
    {
      image: memory2,
      caption: "That moment... when time stood still",
      description: "In your eyes, I found my home 💕"
    },
    {
      image: memory3,
      caption: "Walking into forever with you",
      description: "Every step with you is a step towards paradise 🌅"
    }
  ];

  const nextPhoto = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPhoto((prev) => (prev + 1) % memories.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevPhoto = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPhoto((prev) => (prev - 1 + memories.length) % memories.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="min-h-screen romantic-bg flex flex-col">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4 sparkle">
          Mirror of Memories
        </h1>
        <p className="text-xl text-foreground/80">
          Our beautiful journey together 💖
        </p>
      </div>

      {/* Carousel Container */}
      <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
        <div className="relative max-w-4xl w-full">
          {/* Floating Hearts Around Photo */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <Heart
                key={i}
                className={`absolute text-romantic-rose/30 animate-float h-4 w-4 sm:h-6 sm:w-6`}
                style={{
                  left: `${15 + (i * 15)}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + (i % 2)}s`
                }}
              />
            ))}
          </div>

          {/* Main Photo Card with 3D Effect */}
          <Card className={`memory-card romantic-card p-3 sm:p-6 overflow-hidden transform transition-all duration-500 ${
            isAnimating ? 'scale-95 rotate-1' : 'scale-100 rotate-0'
          }`}>
            <div className="relative">
              {/* Photo with Modern Frame */}
              <div className="aspect-video rounded-2xl overflow-hidden mb-4 sm:mb-6 relative group shadow-xl">
                <img
                  key={currentPhoto}
                  src={memories[currentPhoto].image}
                  alt={memories[currentPhoto].caption}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    isAnimating ? 'opacity-80 blur-sm' : 'opacity-100 blur-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Sparkle Effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(8)].map((_, i) => (
                    <Sparkles
                      key={i}
                      className="absolute text-white/80 animate-ping h-3 w-3 sm:h-4 sm:w-4"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Caption with Animation */}
              <div className="text-center space-y-2 sm:space-y-3">
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-semibold text-gradient transition-all duration-500 ${
                  isAnimating ? 'opacity-50 translate-y-2' : 'opacity-100 translate-y-0'
                }`}>
                  {memories[currentPhoto].caption}
                </h3>
                <p className={`text-base sm:text-lg text-foreground/80 transition-all duration-500 delay-100 ${
                  isAnimating ? 'opacity-50 translate-y-2' : 'opacity-100 translate-y-0'
                }`}>
                  {memories[currentPhoto].description}
                </p>
              </div>
            </div>
          </Card>

          {/* Navigation Buttons */}
          <Button
            onClick={prevPhoto}
            variant="outline"
            size="lg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full w-14 h-14 bg-white/90 hover:bg-white border-romantic-pink hover:border-romantic-rose transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-romantic-rose" />
          </Button>

          <Button
            onClick={nextPhoto}
            variant="outline"
            size="lg"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full w-14 h-14 bg-white/90 hover:bg-white border-romantic-pink hover:border-romantic-rose transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-romantic-rose" />
          </Button>
        </div>
      </div>

      {/* Photo Indicators */}
      <div className="flex justify-center space-x-3 py-6">
        {memories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhoto(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentPhoto
                ? 'bg-romantic-rose scale-125'
                : 'bg-romantic-pink/50 hover:bg-romantic-pink'
            }`}
          />
        ))}
      </div>

      {/* Next Page Button */}
      <div className="flex justify-end p-8">
        <Button
          onClick={onNext}
          className="glow-button rounded-full px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
        >
          Next Page
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PhotoCarousel;