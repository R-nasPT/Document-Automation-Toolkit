import React, { useRef, useEffect } from 'react';
import BwipJs from '@bwip-js/browser';

// Import types from the bwip-js library
type BarcodeType = keyof typeof BwipJs;
type RenderOptions = BwipJs.RenderOptions;

interface BarcodeProps extends Omit<RenderOptions, 'bcid'> {
  // Allow only valid barcode types from the library
  barcodeType: BarcodeType;
  // Canvas HTML attributes
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable Barcode component using bwip-js
 */
export const Barcode: React.FC<BarcodeProps> = ({ 
  barcodeType, 
  text, 
  width,
  height,
  className,
  style,
  ...options 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear previous barcode
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    try {
      // Generate the barcode
      BwipJs.toCanvas(canvas, {
        bcid: barcodeType,
        text: text,
        scale: window.devicePixelRatio || 1,
        // Add all other options
        ...options
      });
    } catch (error) {
      console.error('Error generating barcode:', error);
    }
  }, [barcodeType, text, options]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};

/**
 * Hook for generating a barcode as a data URL
 */
export const useBarcodeUrl = (
  barcodeType: BarcodeType,
  text: string,
  options: Omit<RenderOptions, 'bcid' | 'text'> = {}
): string | null => {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);

  useEffect(() => {
    // Create a temporary canvas element
    const canvas = document.createElement('canvas');
    
    try {
        BwipJs.toCanvas(canvas, {
        bcid: barcodeType,
        text: text,
        scale: window.devicePixelRatio || 1,
        ...options
      });
      
      setDataUrl(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Error generating barcode URL:', error);
      setDataUrl(null);
    }
  }, [barcodeType, text, options]);

  return dataUrl;
};

export default Barcode;
