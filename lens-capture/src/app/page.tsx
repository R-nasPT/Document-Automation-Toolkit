'use client'

import Link from "next/link";

import VideoRecorder from "@/components/VideoRecorder";

export default function Home() {
  const handleVideoRecorded = (videoBlob: Blob) => {
    // จัดการกับ video blob ที่บันทึกได้ เช่น อัปโหลดไปยังเซิร์ฟเวอร์
    console.log('Video recorded:', videoBlob)
  }
  return (
    <div className="p-3">
      <VideoRecorder onVideoRecorded={handleVideoRecorded} />
      <Link href="media-recorder" className="p-3 bg-blue-400 text-white rounded-xl m-5">media recorder</Link>
      <Link href="record-2" className="p-3 bg-blue-400 text-white rounded-xl m-5">record 2</Link>
    </div>
  );
}
