"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/utils";
import BwipJs from "@bwip-js/browser";

type QRBarcodeType = keyof typeof BwipJs;
type RenderOptions = Omit<
  BwipJs.RenderOptions,
  | "textcolor"
  | "textfont"
  | "textgaps"
  | "textsize"
  | "textxalign"
  | "textxoffset"
  | "textyalign"
  | "textyoffset"
  | "includetext"
  | "alttext"
>;

interface QRBarcodeProps extends Omit<RenderOptions, "bcid"> {
  barcodeType?: QRBarcodeType;
  width?: number;
  height?: number;
  className?: string;
  containerClasses?: string;
  showText?: boolean;
  textPosition?: "top" | "bottom";
  textClassName?: string;
}

export default function QRBarcode({
  barcodeType = "code128",
  text,
  width,
  height,
  className,
  containerClasses,
  showText,
  textPosition = "bottom",
  textClassName,
  ...options
}: QRBarcodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    try {
      BwipJs.toCanvas(canvas, {
        bcid: barcodeType,
        text: text,
        scale: window.devicePixelRatio || 1,
        ...options,
      });
    } catch (error) {
      console.error("Error generating barcode:", error);
    }
  }, [barcodeType, text, options]);

  return (
    <div className={cn("w-fit", containerClasses)}>
      <figure
        className={cn(
          textPosition === "top"
            ? "flex flex-col-reverse items-center"
            : "flex flex-col items-center"
        )}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={className}
        />

        {showText && (
          <figcaption
            className={cn(
              "font-mono text-center whitespace-nowrap",
              textPosition === "bottom" ? "mt-0.5" : "mb-0.5",
              textClassName
            )}
          >
            {text}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

// ------------------------- exaple ----------------------------------

<QRBarcode
    text={dispatchBatchNumber}
    containerClasses="p-3"
    className="w-[135px] h-9"
    showText
    textClassName="text-xl leading-none"
 />

<QRBarcode
   text={fulfillment?.code || ""}
   className="w-[252px] h-[50px]"
   scale={4}
 />
