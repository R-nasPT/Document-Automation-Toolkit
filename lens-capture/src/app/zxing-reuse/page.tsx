"use client"
import { useEffect, useRef, useState, useCallback } from "react";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  Result,
} from "@zxing/library";
import { FaCamera, FaTimes } from "react-icons/fa";

interface ZxingReuseProps {
  showScanButton?: boolean;
  onResult?: (result: Result) => void;
  showDetail?: boolean;
}

export default function ZxingReuse({
  showScanButton,
  onResult,
  showDetail,
}: ZxingReuseProps) {
  const [scanResult, setScanResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  const handleScan = useCallback(
    (result: Result) => {
      setScanResult(result);
      setIsScanning(false);
      if (onResult) {
        onResult(result);
      }
    },
    [onResult]
  );

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
        (result: Result | null, err: Error | undefined) => {
          if (result) {
            handleScan(result);
          }
          if (err && !(err instanceof NotFoundException)) {
            setError("Scanning error: " + err.message);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRescan = () => {
    setScanResult(null);
    setError("");
    stopScanner();
    setTimeout(() => {
      startScanner();
    }, 1000);
  };

  return (
    <div className="zxing-scanner max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <div
          className={`${isScanning ? "block" : "hidden"} w-full max-w-[500px]`}
        >
          <video ref={videoRef} className="w-full h-64 object-cover"></video>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-4 border-white rounded-lg opacity-50"></div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">
            Scanning...
          </div>
        </div>
        {!isScanning && (
          <div className="bg-gray-100 h-64 flex items-center justify-center">
            <FaCamera size={48} className="text-gray-400" />
          </div>
        )}
      </div>

      {!isScanning && showScanButton && (
        <button
          onClick={handleRescan}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <FaCamera size={20} className="mr-2" />
          Scan Again
        </button>
      )}

      {scanResult && showDetail && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Scan Result
          </h3>
          <p className="text-gray-600">
            <strong>Content:</strong> {scanResult.getText()}
          </p>
          <p className="text-gray-600">
            <strong>Format:</strong> {scanResult.getBarcodeFormat()}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <FaTimes
            size={20}
            className="absolute top-0 right-0 mt-4 mr-4 text-red-500 cursor-pointer"
            onClick={() => setError("")}
          />
        </div>
      )}
    </div>
  );
}
