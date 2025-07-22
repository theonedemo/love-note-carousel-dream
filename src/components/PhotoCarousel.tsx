import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
    setCurrentPhoto((prev) => (prev + 1) % memories.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + memories.length) % memories.length);
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
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="relative max-w-4xl w-full">
          {/* Main Photo Card */}
          <Card className="romantic-card p-6 overflow-hidden">
            <div className="relative">
              {/* Photo */}
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative group">
                <img
                  src={memories[currentPhoto].image}
                  alt={memories[currentPhoto].caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Caption */}
              <div className="text-center space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold text-gradient">
                  {memories[currentPhoto].caption}
                </h3>
                <p className="text-lg text-foreground/80">
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