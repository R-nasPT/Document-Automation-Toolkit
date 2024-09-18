"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  Result,
} from "@zxing/library";

export default function ZxingPage() {
  const [scanResult, setScanResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  const handleScan = useCallback((result: Result) => {
    setScanResult(result);
    setIsScanning(false);
    // ที่นี่คุณสามารถเพิ่มโค้ดเพื่อจัดการกับข้อมูลที่สแกนได้
    console.log("Scanned data:", result.getText());
    console.log("Barcode format:", result.getBarcodeFormat());
    // ตัวอย่าง: ส่งข้อมูลไปยัง API
    // sendDataToAPI(result.getText());
  }, []);

  const startScanner = useCallback(async () => {
    if (!codeReaderRef.current) {
      codeReaderRef.current = new BrowserMultiFormatReader();
    }

    try {
      const videoInputDevices = await codeReaderRef.current.listVideoInputDevices();
      const selectedDeviceId = videoInputDevices[0].deviceId;

      await codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, err) => {
          if (result) {
            handleScan(result);
          }
          if (err && !(err instanceof NotFoundException)) {
            setError("Scanning error: " + err);
          }
        }
      );
      setIsScanning(true);
    } catch (err) {
      setError(
        "Failed to start scanner: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  }, [handleScan]);

  const stopScanner = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      setIsScanning(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      startScanner();
    }, 1000);

    return () => {
      clearTimeout(timer);
      stopScanner();
    };
  }, [startScanner, stopScanner]);

  const handleRescan = () => {
    setScanResult(null);
    setError("");
    stopScanner(); // Ensure we stop the previous scan
    setTimeout(() => {
      startScanner();
    }, 1000);
  };

  return (
    <div>
      <video
        ref={videoRef}
        className={`${isScanning ? "block" : "hidden"} w-full max-w-[500px]`}
      ></video>
      {!isScanning && <button onClick={handleRescan}>Scan Again</button>}
      {scanResult && (
        <div>
          <p>Scanned Result: {scanResult.getText()}</p>
          <p>Format: {scanResult.getBarcodeFormat()}</p>
          {/* ที่นี่คุณสามารถแสดงข้อมูลเพิ่มเติมจาก scanResult */}
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
