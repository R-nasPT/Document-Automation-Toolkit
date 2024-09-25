// ================= แบบ scan แล้วค่อยกดปุ่ม copy =========================

// "use client";
// import { useEffect, useState } from "react";
// import Scanner from "@/components/Scaner";
// import Dialog from "@/components/dialog";
// import { Result } from "@zxing/library";
// import { FaCopy, FaTimes } from "react-icons/fa";

// export default function ZxingReuse() {
//   const [open, setOpen] = useState(false);
//   const [resultScan, setResultScan] = useState<Result | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [isScanning, setIsScanning] = useState(false);

//   const handleScanResult = (result: Result) => {
//     console.log("Scanned data:", result.getText());
//     console.log("Barcode format:", result.getBarcodeFormat());
//     setResultScan(result);
//   };

//   const handleScanError = (errorMessage: string) => {
//     console.error("Scan error:", errorMessage);
//     setError(errorMessage);
//     setResultScan(null);
//   };

//   const handleCopy = async () => {
//     if (resultScan) {
//       try {
//         await navigator.clipboard.writeText(resultScan.getText());
//         setCopySuccess(true);
//         setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
//       } catch (err) {
//         console.error("Failed to copy text: ", err);
//       }
//     }
//   };

//   useEffect(() => {
//     setIsScanning(open);
//   }, [open]);

//   return (
//     <>
//       <button onClick={() => setOpen(true)}>scan</button>
//       <Dialog open={open} onClose={() => setOpen(false)} desktop="xs">
//         <div className="bg-red-500">
//         {isScanning && (
//             <Scanner onResult={handleScanResult} onError={handleScanError} />
//           )}
//         </div>
//       </Dialog>

//       {error && (
//         <div className="z-[500] mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//           <strong className="font-bold">Error!</strong>
//           <span className="block sm:inline"> {error}</span>
//           <FaTimes
//             size={20}
//             className="absolute top-0 right-0 mt-4 mr-4 text-red-500 cursor-pointer"
//             onClick={() => setError("")}
//           />
//         </div>
//       )}

//       {resultScan && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-[400]"
//           onClick={() => setResultScan(null)}
//         ></div>
//       )}

//       <aside
//         className={`
//           fixed z-[500] transition-all duration-300 ease-in-out lg:hidden rounded-t-2xl
//           w-screen bottom-0 left-0 bg-white shadow-xl p-5
//           ${resultScan ? "translate-y-0" : "translate-y-full"}
//           `}
//       >
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">
//           Scan Result
//         </h3>
//         <div className="flex items-center justify-between mb-2">
//           <p className="text-gray-600 flex-grow mr-2">
//             <strong>Content:</strong> {resultScan?.getText()}
//           </p>
//           <button
//             onClick={handleCopy}
//             className={`px-3 py-1 rounded ${
//               copySuccess
//                 ? "bg-green-500 text-white"
//                 : "bg-blue-500 text-white hover:bg-blue-600"
//             } transition-colors duration-200 flex items-center`}
//           >
//             <FaCopy className="mr-1" />
//             {copySuccess ? "Copied!" : "Copy"}
//           </button>
//         </div>
//         <p className="text-gray-600">
//           <strong>Format:</strong> {resultScan?.getBarcodeFormat()}
//         </p>
//       </aside>
//     </>
//   );
// }

// ================= แบบ scan แล้ว copy เลย =========================

"use client";
import { useState, useEffect } from "react";
import Scanner from "@/components/Scaner";
import Dialog from "@/components/dialog";
import { Result } from "@zxing/library";
import { FaTimes, FaCopy } from "react-icons/fa";

export default function ZxingReuse() {
  const [open, setOpen] = useState(false);
  const [resultScan, setResultScan] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanResult = async (result: Result) => {
    console.log("Scanned data:", result.getText());
    console.log("Barcode format:", result.getBarcodeFormat());
    setResultScan(result);
    await handleCopy(result.getText());
    setOpen(false); // Close the dialog after successful scan
  };

  const handleScanError = (errorMessage: string) => {
    console.error("Scan error:", errorMessage);
    setError(errorMessage);
    setResultScan(null);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setError("Failed to copy text to clipboard");
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
    setError(null); // Clear any previous errors
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setError(null); // Clear any errors when closing the dialog
  };

  useEffect(() => {
    setIsScanning(open);
  }, [open]);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  return (
    <>
      <button onClick={handleOpenDialog}>scan</button>
      <p className="bg-background text-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, id!</p>
      <p className="bg-gradient-radial from-purple-300 to-blue-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, quaerat?</p>
      <Dialog open={open} onClose={handleCloseDialog} desktop="xs">
        <div className="bg-red-500">
          {isScanning && (
            <Scanner onResult={handleScanResult} onError={handleScanError} />
          )}
        </div>
      </Dialog>

      {error && (
        <div className="z-[500] mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <FaTimes
            size={20}
            className="absolute top-0 right-0 mt-4 mr-4 text-red-500 cursor-pointer"
            onClick={() => setError("")}
          />
        </div>
      )}

      {resultScan && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[400]"
          onClick={() => setResultScan(null)}
        ></div>
      )}

      <aside
        className={`
          fixed z-[500] transition-all duration-300 ease-in-out lg:hidden rounded-t-2xl
          w-screen bottom-0 left-0 bg-white shadow-xl p-5
          ${resultScan ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Scan Result
        </h3>
        <div className="mb-2">
          <p className="text-gray-600">
            <strong>Content:</strong> {resultScan?.getText()}
          </p>
          {copySuccess && (
            <p className="text-green-500 mt-1">
              <FaCopy className="inline mr-1" />
              Copied to clipboard!
            </p>
          )}
        </div>
        <p className="text-gray-600">
          <strong>Format:</strong> {resultScan?.getBarcodeFormat()}
        </p>
      </aside>
    </>
  );
}
