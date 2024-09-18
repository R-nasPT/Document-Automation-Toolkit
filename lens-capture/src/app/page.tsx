'use client'

import Link from "next/link";

import VideoRecorder from "@/components/VideoRecorder";
import ZxingReuse from "./zxing-reuse/page";
import { Result } from "@zxing/library";
import { useState } from "react";

export default function Home() {
  const [resultScan, setResultScan] = useState<Result | null>(null);
  const handleVideoRecorded = (videoBlob: Blob) => {
    // จัดการกับ video blob ที่บันทึกได้ เช่น อัปโหลดไปยังเซิร์ฟเวอร์
    console.log('Video recorded:', videoBlob)
  }

  const handleScanResult = (result: Result) => {
    console.log("Scanned data:", result.getText());
    console.log("Barcode format:", result.getBarcodeFormat());
    // Handle the scan result as needed
    setResultScan(result);
  };

  console.log(resultScan)

  return (
    <div className="p-3">
      <VideoRecorder onVideoRecorded={handleVideoRecorded} />
      <br />
      <br />
      <Link href="media-recorder" className="p-3 bg-blue-400 text-white rounded-xl m-5">media recorder</Link>
      <Link href="record-2" className="p-3 bg-blue-400 text-white rounded-xl m-5">record 2</Link>
      <Link href="zxing" className="p-3 bg-blue-400 text-white rounded-xl m-5">zxing</Link>
      <Link href="yudiel" className="p-3 bg-blue-400 text-white rounded-xl m-5">yudiel</Link>
      <Link href="zxing-reuse" className="p-3 bg-blue-400 text-white rounded-xl m-5">zxing reuse</Link>
      <br />
      <br />
      <br />
      <ZxingReuse
      showScanButton={true}
      onResult={handleScanResult}
      showDetail={true}
    />
    </div>
  );
}
