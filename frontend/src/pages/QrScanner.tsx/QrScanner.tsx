import { useState, useRef, useEffect } from "react";
import { QrReader } from "react-qr-reader";
// import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const [data, setData] = useState("");
  // const navigate = useNavigate();
  const hasScanned = useRef(false);

  const handleScan = (result: any, error: unknown) => {
    alert(result);

    if (result && !hasScanned.current) {
      hasScanned.current = true;
      const scannedText = result?.text;
      setData(scannedText);

      // const userId = scannedText.replace("payto:", "");
      // navigate(`/pay/${userId}`);
    }

    if (error) {
      // console.info(
      //   "Scanner error:",
      //   error instanceof Error ? error.message : error
      // );
      console.log(error);
    }
  };
  useEffect(() => {
    alert(data);
  }, [data]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <p className="mb-2 font-semibold">Scan a QR Code</p>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={handleScan}
        scanDelay={300}
        videoStyle={{ width: "100%" }}
      />
    </div>
  );
};

export default QRScanner;
