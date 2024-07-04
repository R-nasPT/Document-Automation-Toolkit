"use client";
import PDFTaxInvoice from "@/pdf/tax-invoice";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import dynamic from "next/dynamic";

// Dynamically import PDFViewer with no SSR
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function PdfViewer() {
  return (
    <div>
      <PDFDownloadLink document={<PDFTaxInvoice />} fileName="TaxInvoice.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>

      <BlobProvider document={PDFTaxInvoice as any}>
        {({ blob, url, loading, error }) => {
          // Do whatever you need with blob here
          return (
            <div>
              There&apos; &lsquo; &#39; &rsquo;s something going on on the fly
            </div>
          );
        }}
      </BlobProvider>

      <PDFViewer className="w-full h-screen">
        <PDFTaxInvoice />
      </PDFViewer>
    </div>
  );
}
