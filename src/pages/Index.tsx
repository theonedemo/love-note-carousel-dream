import { useState } from "react";
import BirthdayGreeting from "../components/BirthdayGreeting";
import MemoryUnlock from "../components/MemoryUnlock";
import PhotoCarousel from "../components/PhotoCarousel";
import CakePage from "../components/CakePage";
import FinalMessage from "../components/FinalMessage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % 5);
  };

  const pages = [
    <BirthdayGreeting key="greeting" onNext={nextPage} />,
    <MemoryUnlock key="unlock" onNext={nextPage} />,
    <PhotoCarousel key="carousel" onNext={nextPage} />,
    <CakePage key="cake" onNext={nextPage} />,
    <FinalMessage key="final" />
  ];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {pages.map((page, index) => (
          <div key={index} className="min-w-full">
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
