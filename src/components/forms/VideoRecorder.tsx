import React, { useState, useRef } from 'react';
import { Camera, Square, Play, Upload, X } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface VideoRecorderProps {
  onVideoCapture: (file: File) => void;
  maxDuration?: number; // in seconds
  className?: string;
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({
  onVideoCapture,
  maxDuration = 120, // 2 minutes default
  className = '',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(blob);
      setRecordedVideo(videoUrl);
      
      // Convert to File object
      const file = new File([blob], `affirmation_video_${Date.now()}.webm`, {
        type: 'video/webm',
      });
      onVideoCapture(file);
    };

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= maxDuration) {
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setHasPermission(null);
    }
  };

  const retakeVideo = () => {
    setRecordedVideo(null);
    setRecordingTime(0);
    requestPermission();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasPermission === false) {
    return (
      <Card className={`text-center ${className}`}>
        <div className="py-8">
          <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Camera Access Required
          </h3>
          <p className="text-gray-600 mb-4">
            Please allow camera and microphone access to record your affirmation video.
          </p>
          <Button onClick={requestPermission}>
            <Camera className="w-4 h-4 mr-2" />
            Enable Camera
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Record Affirmation Video
          </h3>
          <p className="text-sm text-gray-600">
            Record a brief video introducing yourself and explaining why you want to join the internship program.
            Maximum duration: {Math.floor(maxDuration / 60)} minutes.
          </p>
        </div>

        {!hasPermission && !recordedVideo && (
          <div className="text-center py-8">
            <Button onClick={requestPermission} size="lg">
              <Camera className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
          </div>
        )}

        {hasPermission && !recordedVideo && (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-64 object-cover"
              />
              {isRecording && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  REC {formatTime(recordingTime)}
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <Button onClick={startRecording} size="lg">
                  <Camera className="w-5 h-5 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="danger" size="lg">
                  <Square className="w-5 h-5 mr-2" />
                  Stop Recording
                </Button>
              )}
            </div>
          </div>
        )}

        {recordedVideo && (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                src={recordedVideo}
                controls
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={retakeVideo} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Video Ready
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};