"use client";
import { useEffect, useRef, useCallback } from "react";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  Result,
} from "@zxing/library";

interface ZxingReuseProps {
  onResult?: (result: Result) => void;
  onError?: (error: string) => void;
}

export default function Scanner({
  onResult,
  onError
}: ZxingReuseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  const handleScan = useCallback(
    (result: Result) => {
      if (onResult) {
        onResult(result);
      }
    },
    [onResult]
  );

  const handleError = useCallback(
    (errorMessage: string) => {
      if (onError) {
        onError(errorMessage);
      }
    },
    [onError]
  );

  const startScanner = useCallback(async () => {
    if (!codeReaderRef.current) {
      codeReaderRef.current = new BrowserMultiFormatReader();
    }

    try {
      const videoInputDevices =
        await codeReaderRef.current.listVideoInputDevices();
      const selectedDeviceId = videoInputDevices[0].deviceId;

      await codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result: Result | null, err: Error | undefined) => {
          if (result) {
            handleScan(result);
          }
          if (err && !(err instanceof NotFoundException)) {
            handleError("Scanning error: " + err.message);
          }
        }
      );
    } catch (err) {
      handleError(
        "Failed to start scanner: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  }, [handleError, handleScan]);

  const stopScanner = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
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

  return (
      <div className="relative w-full h-[70vh] overflow-hidden">
        <style jsx>{`
          @keyframes fastPulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          .fast-pulse {
            animation: fastPulse 0.5s ease-in-out infinite;
          }
        `}</style>
        <div className="w-full h-full">
          <video ref={videoRef} className="w-full h-full object-cover"></video>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="shadow-[0_0_0_500px_rgba(0,0,0,0.4)] relative w-56 h-56 lg:w-40 lg:h-40 rounded-xl">
              {/* Top-left corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl animate-fast-pulse"></div>
              {/* Top-right corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl animate-fast-pulse"></div>
              {/* Bottom-left corner */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl fast-pulse"></div>
              {/* Bottom-right corner */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl fast-pulse"></div>
              {/* <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white animate-pulse"></div> */}
            </div>
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white animate-pulse"></div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm font-semibold text-white">
            กำลังสแกน...
          </div>
        </div>
      </div>
  );
}
