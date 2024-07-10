import React, { useEffect, useRef, useState } from 'react';
import 'player.css'; // Make sure to import the Tailwind CSS

interface PlayerProps {
  videoUrl: string;
  customClasses?: string;
  buttonStyles?: {
    playPause?: string;
    volumeUp?: string;
    volumeDown?: string;
    volumeMax?: string;
    fullScreen?: string;
    forward?: string;
    rewind?: string;
  };
  buttonLabels?: {
    play?: string;
    pause?: string;
    volumeUp?: string;
    volumeDown?: string;
    volumeMax?: string;
    fullScreen?: string;
    forward?: string;
    rewind?: string;
  };
}

const Player: React.FC<PlayerProps> = ({
  videoUrl,
  customClasses = '',
  buttonStyles = {},
  buttonLabels = {}
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaSourceRef = useRef<MediaSource | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (videoRef.current) {
      mediaSourceRef.current = new MediaSource();
      videoRef.current.src = URL.createObjectURL(mediaSourceRef.current);

      mediaSourceRef.current.addEventListener('sourceopen', handleSourceOpen);
    }

    return () => {
      if (mediaSourceRef.current) {
        mediaSourceRef.current.removeEventListener('sourceopen', handleSourceOpen);
      }
    };
  }, [videoUrl]);

  const handleSourceOpen = () => {
    const mediaSource = mediaSourceRef.current;
    if (!mediaSource) return;

    sourceBufferRef.current = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

    fetchChunks(0);
  };

  const fetchChunks = async (chunkIndex: number) => {
    try {
      while (chunkIndex < Number.MAX_SAFE_INTEGER) {
        const response = await fetch(`${videoUrl}/chunk_${chunkIndex}.ts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const chunk = await response.arrayBuffer();
        const sourceBuffer = sourceBufferRef.current;
  
        if (sourceBuffer) {
          const appendBufferPromise = new Promise<void>((resolve) => {
            const handleUpdateEnd = () => {
              sourceBuffer.removeEventListener('updateend', handleUpdateEnd);
              resolve();
            };
  
            sourceBuffer.addEventListener('updateend', handleUpdateEnd);
            sourceBuffer.appendBuffer(chunk);
          });
  
          await appendBufferPromise;
        }
  
        chunkIndex++;
      }
  
      mediaSourceRef.current?.endOfStream();
    } catch (error) {
      console.error('Error fetching chunk:', error);
    }
  };
  

  const handlePlayPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (change: number) => {
    if (videoRef.current) {
      let newVolume = videoRef.current.volume + change;
      if (newVolume > 2) newVolume = 2;
      if (newVolume < 0) newVolume = 0;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleFullScreenToggle = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  return (
    <div className={`flex flex-col items-center ${customClasses}`}>
      <video ref={videoRef} className="w-full" />
      <div className="flex space-x-2 mt-2">
        <button
          className={buttonStyles.playPause || 'bg-blue-500 text-white px-4 py-2 rounded'}
          onClick={handlePlayPause}
        >
          {isPlaying ? buttonLabels.pause || 'Pause' : buttonLabels.play || 'Play'}
        </button>
        <button
          className={buttonStyles.volumeUp || 'bg-green-500 text-white px-4 py-2 rounded'}
          onClick={() => handleVolumeChange(0.1)}
        >
          {buttonLabels.volumeUp || 'Volume +'}
        </button>
        <button
          className={buttonStyles.volumeDown || 'bg-red-500 text-white px-4 py-2 rounded'}
          onClick={() => handleVolumeChange(-0.1)}
        >
          {buttonLabels.volumeDown || 'Volume -'}
        </button>
        <button
          className={buttonStyles.volumeMax || 'bg-yellow-500 text-white px-4 py-2 rounded'}
          onClick={() => handleVolumeChange(1)}
        >
          {buttonLabels.volumeMax || 'Volume 100%'}
        </button>
        <button
          className={buttonStyles.fullScreen || 'bg-purple-500 text-white px-4 py-2 rounded'}
          onClick={handleFullScreenToggle}
        >
          {buttonLabels.fullScreen || 'Full Screen'}
        </button>
        <button
          className={buttonStyles.forward || 'bg-gray-500 text-white px-4 py-2 rounded'}
          onClick={handleForward}
        >
          {buttonLabels.forward || '+10s'}
        </button>
        <button
          className={buttonStyles.rewind || 'bg-gray-700 text-white px-4 py-2 rounded'}
          onClick={handleRewind}
        >
          {buttonLabels.rewind || '-10s'}
        </button>
      </div>
    </div>
  );
};

export default Player;
