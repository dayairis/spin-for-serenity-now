
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import FloatingText from './FloatingText';
import { useAudio } from '@/utils/audioUtils';
import { useMeritCounter } from '@/utils/storageUtils';
import { cn } from '@/lib/utils';

const PrayerWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showMantra, setShowMantra] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const wheelRef = useRef<HTMLImageElement>(null);
  
  const { merit, incrementMerit } = useMeritCounter();
  const { isAudioLoaded, isBackgroundPlaying, playSpinSound, toggleBackgroundMusic } = useAudio();

  // Add keyboard controls (spacebar to spin)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isSpinning) {
        event.preventDefault();
        handleSpin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSpinning]);

  const handleSpin = () => {
    if (isSpinning) return;
    
    // Handle spin animation
    setIsSpinning(true);
    
    // Play spin sound
    playSpinSound();
    
    // Increment merit
    incrementMerit();
    
    // Show mantra text
    setShowMantra(true);
    
    // Track spin count for background music suggestion
    const newSpinCount = spinCount + 1;
    setSpinCount(newSpinCount);
    
    // Reset after animation
    setTimeout(() => {
      setIsSpinning(false);
      setShowMantra(false);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Merit Counter */}
      <div className="text-2xl font-cinzel text-tibetan-maroon mb-4 flex items-center">
        <span className="mr-2">🙏</span>
        <span>Merit: {merit}</span>
      </div>
      
      {/* Prayer Wheel */}
      <div className="relative mb-8">
        <div 
          className="relative cursor-pointer"
          onClick={handleSpin}
        >
          <img
            ref={wheelRef}
            src="/prayer-wheel.svg"
            alt="Tibetan Prayer Wheel"
            width={300}
            height={300}
            className={cn(
              "prayer-wheel",
              isSpinning && "spinning"
            )}
          />
          
          {/* Floating Mantra Text */}
          {showMantra && (
            <FloatingText
              text="Merit +1 · Om Mani Padme Hum"
              isVisible={showMantra}
              className="top-0"
            />
          )}
        </div>
        
        {/* Instructions */}
        <p className="text-sm text-center mt-4 text-muted-foreground">
          Click the wheel or press spacebar to spin
        </p>
      </div>
      
      {/* Background Music Toggle */}
      {isAudioLoaded && (
        <Button
          onClick={toggleBackgroundMusic}
          variant="outline"
          className={cn(
            "border-tibetan-gold hover:border-tibetan-turquoise",
            "text-tibetan-maroon hover:text-tibetan-turquoise",
            "transition-all duration-300"
          )}
        >
          {isBackgroundPlaying ? "Stop Music" : "Start Immersive Experience"}
        </Button>
      )}
      
      {/* Suggestion to start background music after several spins */}
      {spinCount >= 5 && !isBackgroundPlaying && (
        <p className="text-sm text-muted-foreground mt-4 animate-pulse">
          Try the immersive experience with meditation music
        </p>
      )}
    </div>
  );
};

export default PrayerWheel;
