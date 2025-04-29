
import React, { useState, useEffect, useRef } from 'react';
import '@google/model-viewer';

type PrayerWheel3DProps = {
  isSpinning: boolean;
  onSpin: () => void;
};

// Need to declare the model-viewer element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'rotation-per-second'?: string;
        'ar'?: boolean;
        'ar-modes'?: string;
        'loading'?: 'auto' | 'lazy' | 'eager';
        'ar-status'?: string;
        'shadow-intensity'?: string;
        'camera-orbit'?: string;
        'field-of-view'?: string;
        'environment-image'?: string;
        'exposure'?: string;
        'poster'?: string;
        'alt'?: string;
        'touch-action'?: string;
      };
    }
  }
}

const PrayerWheel3D = ({ isSpinning, onSpin }: PrayerWheel3DProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const modelViewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Handle loading state
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Apply rotation when spinning
  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (isSpinning && modelViewer) {
      modelViewer.setAttribute('auto-rotate', 'true');
      modelViewer.setAttribute('rotation-per-second', '60deg');
      
      // Stop auto-rotation after the spin animation completes
      const timer = setTimeout(() => {
        modelViewer.removeAttribute('auto-rotate');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  return (
    <div className="h-[400px] w-full relative cursor-pointer flex items-center justify-center">
      {/* Display loading screen while the model is loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="text-tibetan-maroon text-xl">
            Loading...
          </div>
        </div>
      )}

      {/* The model-viewer 3D model */}
      <div onClick={onSpin} className="w-[300px] h-[300px] mx-auto model-viewer-container">
        <model-viewer
          ref={modelViewerRef}
          src="/models/prayer_wheel.glb"
          camera-controls={false}
          touch-action="pan-y"
          shadow-intensity="1"
          camera-orbit="0deg 75deg 2m"
          field-of-view="30deg"
          environment-image="neutral"
          exposure="0.5"
          alt="3D Prayer Wheel"
          onLoad={() => setIsLoading(false)}
        ></model-viewer>
      </div>
    </div>
  );
};

export default PrayerWheel3D;
