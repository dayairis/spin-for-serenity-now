
import { useState, useEffect, useRef } from 'react';

export type AudioType = 'spin' | 'background';

// Custom hook for managing audio
export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements
    const spinAudio = new Audio();
    spinAudio.src = '/sounds/sound-spin.mp3'; // 更新为正确的声音文件路径
    spinAudio.preload = 'auto';
    
    const bgmAudio = new Audio();
    bgmAudio.src = '/sounds/bgm.mp3'; // 使用指定的背景音乐路径
    bgmAudio.loop = true;
    bgmAudio.preload = 'auto';
    
    // Store refs
    spinAudioRef.current = spinAudio;
    bgmAudioRef.current = bgmAudio;
    
    // Set up event listeners
    const onLoad = () => setIsLoaded(true);
    spinAudio.addEventListener('canplaythrough', onLoad);
    bgmAudio.addEventListener('canplaythrough', onLoad);
    
    // Initialize AudioContext (for future effects if needed)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(audioCtx);
    } catch (error) {
      console.error('Web Audio API is not supported in this browser', error);
    }
    
    return () => {
      spinAudio.removeEventListener('canplaythrough', onLoad);
      bgmAudio.removeEventListener('canplaythrough', onLoad);
      if (spinAudioRef.current) {
        spinAudioRef.current.pause();
      }
      if (bgmAudioRef.current) {
        bgmAudioRef.current.pause();
      }
    };
  }, []);
  
  // Play spin sound effect
  const playSpinSound = () => {
    if (spinAudioRef.current) {
      spinAudioRef.current.currentTime = 0;
      spinAudioRef.current.play().catch(e => console.error('Error playing spin sound:', e));
    }
  };
  
  // Toggle background music
  const toggleBackgroundMusic = () => {
    if (bgmAudioRef.current) {
      if (isPlaying) {
        bgmAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        bgmAudioRef.current.play().catch(e => console.error('Error playing background music:', e));
        setIsPlaying(true);
      }
    }
  };
  
  return {
    isAudioLoaded: isLoaded,
    isBackgroundPlaying: isPlaying,
    playSpinSound,
    toggleBackgroundMusic
  };
}
