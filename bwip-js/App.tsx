import { Barcode, useBarcodeUrl } from './Barcode';

// Example usage in a component:
export default function App() {
  return (
    <div>
      <h2>QR Code</h2>
      <Barcode 
        barcodeType="qrcode" 
        text="https://example.com" 
        scale={3}
        width={200}
        height={200}
      />
      
      <h2>Code 128</h2>
      <Barcode 
        barcodeType="code128" 
        text="0123456789" 
        scale={2}
        includetext={true}
        textxalign="center"
      />
      
      {/* Using the hook to get a barcode URL */}
      <BarcodeImage />
    </div>
  );
}

// Example of using the hook
function BarcodeImage() {
  const barcodeUrl = useBarcodeUrl("ean13", "590123412345", {
    includetext: true,
    scale: 3
  });
  
  return (
    <div>
      <h2>EAN-13 (as image)</h2>
      {barcodeUrl ? (
        <img src={barcodeUrl} alt="EAN-13 Barcode" />
      ) : (
        <p>Loading barcode...</p>
      )}
    </div>
  );
}
