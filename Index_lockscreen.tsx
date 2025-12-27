import { useState, useCallback, useEffect } from "react";
import { quotes } from "@/data/quotes";
import { QuoteCard } from "@/components/QuoteCard";
import { QuoteNavigation } from "@/components/QuoteNavigation";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const changeQuote = useCallback((newIndex: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 300);
  }, []);

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? quotes.length - 1 : currentIndex - 1;
    changeQuote(newIndex);
  }, [currentIndex, changeQuote]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex === quotes.length - 1 ? 0 : currentIndex + 1;
    changeQuote(newIndex);
  }, [currentIndex, changeQuote]);

  const handleShuffle = useCallback(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentIndex && quotes.length > 1);
    changeQuote(newIndex);
  }, [currentIndex, changeQuote]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === " ") {
        e.preventDefault();
        handleShuffle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext, handleShuffle]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="py-6 px-6 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-serif text-xl font-semibold text-foreground">
              Daily Wisdom
            </span>
          </div>
          <span className="text-sm text-muted-foreground font-sans">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl animate-fade-in">
          {/* Subtitle */}
          <p className="text-center text-muted-foreground font-sans text-sm md:text-base mb-8 tracking-wide uppercase">
            Today's Inspiration
          </p>

          {/* Quote card */}
          <QuoteCard 
            quote={quotes[currentIndex]} 
            isAnimating={isAnimating}
          />

          {/* Navigation */}
          <QuoteNavigation
            onPrevious={handlePrevious}
            onNext={handleNext}
            onShuffle={handleShuffle}
            currentIndex={currentIndex}
            totalQuotes={quotes.length}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center">
        <p className="text-sm text-muted-foreground font-sans">
          Use arrow keys to navigate • Press space to shuffle
        </p>
      </footer>
    </div>
  );
};

export default Index;
