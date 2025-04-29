
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type FloatingTextProps = {
  text: string;
  isVisible: boolean;
  onAnimationEnd?: () => void;
  className?: string;
}

const FloatingText = ({ text, isVisible, onAnimationEnd, className }: FloatingTextProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      
      // Hide the text after animation completes
      const timer = setTimeout(() => {
        setVisible(false);
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }, 3000); // Match with animation duration
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationEnd]);

  if (!isVisible && !visible) return null;
  
  return (
    <div 
      className={cn(
        "absolute left-1/2 -translate-x-1/2 text-lg font-medium text-tibetan-gold opacity-0",
        "animate-float-up",
        className
      )}
    >
      {text}
    </div>
  );
};

export default FloatingText;
