"use client";

import { ComponentToPrint } from "@/documents/print";
import Link from "next/link";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Home() {
  const componentRef = useRef<HTMLDivElement>(null);
  const contentToPrint = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint2 = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div>
      <section>
        <button onClick={handlePrint}>Print this out!</button>
        {/* <div className="hidden"> */}
        <ComponentToPrint ref={componentRef} />
        {/* </div> */}
      </section>

      <section>
        <div ref={contentToPrint}>Hello Again</div>
        <button
          onClick={() => {
            handlePrint2(null, () => contentToPrint.current);
          }}
        >
          PRINT
        </button>
      </section>
      <Link href="print-page">Page Print</Link>
    </div>
  );
}
