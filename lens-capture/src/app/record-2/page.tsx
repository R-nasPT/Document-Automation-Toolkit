"use client";
import React, { useState, useEffect } from "react";
import {
  MdCamera,
  MdDelete,
  MdStopCircle,
  MdUpload,
  MdVideoCall,
} from "react-icons/md";
import { ReactMediaRecorder } from "react-media-recorder";

export default function MediaRecorder() {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");

  useEffect(() => {
    const getVideoDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoDevices(videoDevs);
      if (videoDevs.length > 0) {
        setSelectedDevice(videoDevs[0].deviceId);
      }
    };

    getVideoDevices();
  }, []);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
  };

  const handleUpload = async (mediaBlobUrl: string | null) => {
    if (mediaBlobUrl) {
      try {
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();
        console.log(blob);

        // Example upload function
        // await uploadVideo(blob)
      } catch (error) {
        console.error("Error fetching video blob:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        บันทึกวิดีโอ
      </h1>
      <ReactMediaRecorder
        audio={false}
        video={{
          width: 1280,
          height: 720,
          frameRate: 24, // Lower frame rate to reduce file size and processing
        }}
        render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl }) => (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <p className="text-lg font-semibold">
                สถานะ:
                <span
                  className={`ml-2 ${status === "recording" ? "text-red-500" : "text-green-500"}`}
                >
                  {status === "idle"? "พร้อมบันทึก": status === "recording"? "กำลังบันทึก": "บันทึกเสร็จสิ้น"}
                </span>
              </p>
              <select
                value={selectedDevice}
                onChange={handleDeviceChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {videoDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `กล้อง ${device.deviceId}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                className={`flex items-center px-6 py-3 rounded-lg transition duration-300
                  ${status === "recording"
                      ? "bg-blue-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                onClick={startRecording}
                disabled={status === "recording"}
              >
                <MdVideoCall className="mr-2 text-xl" />
                เริ่มบันทึก
              </button>
              <button
                className={`flex items-center px-6 py-3 rounded-lg transition duration-300
                  ${status !== "recording"
                      ? "bg-red-300 text-gray-600 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                onClick={stopRecording}
                disabled={status !== "recording"}
              >
                <MdStopCircle className="mr-2 text-xl" />
                หยุดบันทึก
              </button>
              <button
                className={`flex items-center px-6 py-3 rounded-lg transition duration-300
                  ${!mediaBlobUrl
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                onClick={clearBlobUrl}
                disabled={!mediaBlobUrl}
              >
                <MdDelete className="mr-2 text-xl" />
                ลบวิดีโอ
              </button>
              <button
                className={`flex items-center px-6 py-3 rounded-lg transition duration-300
                  ${!mediaBlobUrl
                      ? "bg-green-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                onClick={() => handleUpload(mediaBlobUrl ?? null)}
                disabled={!mediaBlobUrl}
              >
                <MdUpload className="mr-2 text-xl" />
                อัพโหลดวิดีโอ
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="w-full h-auto rounded-lg overflow-hidden"> {/* <-- ต้องกำหนด style ด้านนอก */}
                <video
                  ref={(video) => {
                    if (video && previewStream) {
                      video.srcObject = previewStream;
                    }
                  }}
                  autoPlay
                  muted
                  className={previewStream ? "block" : "hidden"} //<--กำหนด style ในนี้ไม่ได้
                />
              </div>
              {status === "idle" && (
                <div className="flex items-center justify-center h-80 bg-gray-200 rounded-lg">
                  <MdCamera size={64} className="text-gray-400" />
                </div>
              )}
              <video
                src={mediaBlobUrl}
                controls
                className={`w-full h-auto rounded-lg ${
                  mediaBlobUrl ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
