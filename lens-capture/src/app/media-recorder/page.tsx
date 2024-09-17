
"use client";

import React, { useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'

export default function MediaRecorder() {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDevice, setSelectedDevice] = useState<string>('')

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
    previewStream,
  } = useReactMediaRecorder({ 
    video: true,
    audio: true,
    blobPropertyBag: { type: "video/mp4" },
  })

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevs = devices.filter((device) => device.kind === 'videoinput')
      setVideoDevices(videoDevs)
      if (videoDevs.length > 0) {
        setSelectedDevice(videoDevs[0].deviceId)
      }
    })
  }, [])

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value)
    clearBlobUrl()
  }

  // const uploadVideo = async (blob: Blob) => {
  //   const formData = new FormData()
  //   formData.append('video', blob, 'recording.mp4')

  //   try {
  //     const response = await fetch('/upload', { // เปลี่ยนเป็น URL ของเซิร์ฟเวอร์ที่ต้องการอัปโหลด
  //       method: 'POST',
  //       body: formData,
  //     })

  //     if (!response.ok) {
  //       throw new Error('Upload failed')
  //     }

  //     console.log('Upload successful')
  //   } catch (error) {
  //     console.error('Error uploading video:', error)
  //   }
  // }

React.useEffect(() => {
  const handleUpload = async () => {
    if (mediaBlobUrl) {
      try {
        const response = await fetch(mediaBlobUrl)
        const blob = await response.blob()
        console.log(blob);
        
        // await uploadVideo(blob)
      } catch (error) {
        console.error('Error fetching video blob:', error)
      }
    }
  }

  handleUpload()
}, [mediaBlobUrl])

  return (
    <div>
      <p>Status: {status}</p>
      <select value={selectedDevice} onChange={handleDeviceChange}>
        {videoDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select>
      <button className='bg-red-500 p-2 m-3' onClick={startRecording} disabled={status !== "idle"}>Start Recording</button>
      <button className='bg-red-500 p-2 m-3' onClick={stopRecording} disabled={status !== "recording"}>Stop Recording</button>
      <button className='bg-red-500 p-2 m-3' onClick={clearBlobUrl}>Clear Recording</button>
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
      {mediaBlobUrl && <video src={mediaBlobUrl} controls />}
    </div>
  )
}