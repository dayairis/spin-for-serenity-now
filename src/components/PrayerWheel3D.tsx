
import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { useIsMobile } from '@/hooks/use-mobile';

type PrayerWheel3DProps = {
  isSpinning: boolean;
  onSpin: () => void;
};

const PrayerWheel3D = ({ isSpinning, onSpin }: PrayerWheel3DProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Handle loading state
  useEffect(() => {
    // Reset loading state when spinning status changes
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  // Handle touch events for mobile
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isSpinning) {
      onSpin();
    }
  };

  return (
    <div 
      className="h-[500px] w-full relative cursor-pointer"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Display loading screen while the model is loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="text-tibetan-maroon text-xl">
            Loading...
          </div>
        </div>
      )}

      {/* The Spline 3D model */}
      <div className="w-full h-full">
        <Spline
          scene="https://prod.spline.design/AphHP1HRKQk94T6p/scene.splinecode"
          onLoad={() => setIsLoading(false)}
        />
        
        {/* Add a transparent overlay to capture touch events on mobile */}
        {isMobile && (
          <div 
            className="absolute inset-0 z-10"
            onClick={handleInteraction}
            onTouchStart={handleInteraction}
            style={{ touchAction: 'manipulation' }}
          ></div>
        )}
      </div>
      
      <style>{`
        /* Additional mobile-specific styles */
        @media (max-width: 768px) {
          .spline-container {
            touch-action: manipulation;
          }
        }
      `}</style>
    </div>
  );
};

export default PrayerWheel3D;
