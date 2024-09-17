'use client'

import React, { useState, useRef, useCallback } from 'react'

interface VideoRecorderProps {
  onVideoRecorded?: (videoBlob: Blob) => void;
}

export default function VideoRecorder({ onVideoRecorded }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const videoURL = URL.createObjectURL(blob)
        setRecordedVideo(videoURL)
        if (onVideoRecorded) {
          onVideoRecorded(blob)
        }
        chunksRef.current = []
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }, [onVideoRecorded])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      const stream = videoRef.current?.srcObject as MediaStream | null
      stream?.getTracks().forEach(track => track.stop())
    }
  }, [isRecording])

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      {!isRecording && !recordedVideo && (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {isRecording && (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      {recordedVideo && (
        <div>
          <h3>Recorded Video:</h3>
          <video src={recordedVideo} controls />
        </div>
      )}
    </div>
  )
}