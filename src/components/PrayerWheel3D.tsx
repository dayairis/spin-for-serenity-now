
import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

type PrayerWheel3DProps = {
  isSpinning: boolean;
  onSpin: () => void;
};

const PrayerWheel3D = ({ isSpinning, onSpin }: PrayerWheel3DProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSpin();
  };

  return (
    <div className="h-[500px] w-full relative cursor-pointer spline-container">
      {/* Display loading screen while the model is loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="text-tibetan-maroon text-xl">
            Loading...
          </div>
        </div>
      )}

      {/* The Spline 3D model */}
      <div 
        onClick={handleClick}
        className="w-full h-full"
      >
        <Spline
          scene="https://prod.spline.design/AphHP1HRKQk94T6p/scene.splinecode"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      
      {/* Instead of using style jsx, we'll use normal style tag - this fixes the TypeScript error */}
      <style>
        {`
          .spline-container::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 140px;
            height: 40px;
            background-color: white;
            z-index: 1000;
          }
        `}
      </style>
    </div>
  );
};

export default PrayerWheel3D;
