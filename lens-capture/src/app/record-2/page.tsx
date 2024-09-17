"use client"
import React, { useState, useEffect } from 'react'
import { ReactMediaRecorder } from 'react-media-recorder'

export default function MediaRecorder() {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDevice, setSelectedDevice] = useState<string>('')

  useEffect(() => {
    const getVideoDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevs = devices.filter((device) => device.kind === 'videoinput')
      setVideoDevices(videoDevs)
      if (videoDevs.length > 0) {
        setSelectedDevice(videoDevs[0].deviceId)
      }
    }

    getVideoDevices()
  }, [])

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value)
  }

  const handleUpload = async (mediaBlobUrl: string | null) => {
    if (mediaBlobUrl) {
      try {
        const response = await fetch(mediaBlobUrl)
        const blob = await response.blob()
        console.log(blob)
        
        // Example upload function
        // await uploadVideo(blob)
      } catch (error) {
        console.error('Error fetching video blob:', error)
      }
    }
  }

  return (
    <div>
      <ReactMediaRecorder
        audio
        video={{
            width: 1280,
            height: 720,
            frameRate: 24 // Lower frame rate to reduce file size and processing
          }}
        render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl }) => (
          <div>
            <p>Status: {status}</p>
            <select value={selectedDevice} onChange={handleDeviceChange}>
              {videoDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId}`}
                </option>
              ))}
            </select>
            <button className='bg-red-500 p-2 m-3' onClick={startRecording}>Start Recording</button>
            <button className='bg-red-500 p-2 m-3' onClick={stopRecording}>Stop Recording</button>
            <button className='bg-red-500 p-2 m-3' onClick={clearBlobUrl}>Clear Recording</button>
            <button className='bg-red-500 p-2 m-3' onClick={() => handleUpload(mediaBlobUrl ?? null)}>Upload Video</button>
            <div className='w-[800px] p-5'>
            {previewStream && (
              <video
                ref={(video) => {
                  if (video && previewStream) {
                    video.srcObject = previewStream
                  }
                }}
                autoPlay
                muted
              />
            )}
            {status === 'idle' && 
            <video controls className='w-full'/>
            }
            {mediaBlobUrl && <video src={mediaBlobUrl} controls />}
            </div>
          </div>
        )}
      />
    </div>
  )
}
