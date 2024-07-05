"use client";
import { PrintLabel } from "@/documents/print";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function PrintPage() {
  const printLabelRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printLabelRef.current,
  });
  return (
    <div>
      <button onClick={handlePrint}>Print this out!</button>
      <PrintLabel ref={printLabelRef} />
    </div>
  );
}
