"use client";
import Barcode from "react-barcode";
import { useBarcode } from "next-barcode";
import QRCode from "react-qr-code";
import { useQRCode } from "next-qrcode";

export default function Home() {
  const { inputRef } = useBarcode({
    value: "https://www.google.co.th",
    options: {
      background: "green",
      lineColor: "white",
      displayValue: false,
    },
  });
  const { inputRef: svgRef } = useBarcode({
    value: "https://www.google.co.th",
    options: {
      background: "blue",
      fontSize: 40,
      width: 1.3,
    },
  });
  const { inputRef: canvasRef } = useBarcode({
    value: "https://www.google.co.th",
    options: {
      background: "pink",
      textPosition: "top",
      textAlign: "right",
    },
  });

  const { Image } = useQRCode();
  const { SVG } = useQRCode();
  const { Canvas } = useQRCode();

  return (
    <>
      <section className="flex flex-col justify-center items-center py-10">
        <h1>BARCODE</h1>
        <p>react-barcode</p>
        <Barcode
          value="https://www.google.co.th"
          width={1.5}
          height={70}
          textAlign="left"
          textPosition="top"
          textMargin={10}
          background="red"
          lineColor="green"
          fontSize={50}
        />

        <p>next-barcode</p>
        <img ref={inputRef} />
        <br />
        <svg ref={svgRef} />
        <br />
        <canvas ref={canvasRef} />
        <br />
        <br />
        <br />
        <h1>QRCODE</h1>
        <p>react-barcode</p>
        <QRCode
          value="https://www.google.co.th"
          size={200}
          style={{ height: "auto", maxWidth: "50%", width: "10%" }}
        />
        <br />
        <p>next-qrcode</p>
        <Image
          text="https://www.google.co.th"
          options={{ type: "image/jpeg", width: 300 }}
        />
      </section>
    </>
  );
}
