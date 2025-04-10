import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigates } from "../../hooks/useNavigates";

const QRScanner = () => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const { navigateWithState } = useNavigates();

  useEffect(() => {
    const interval = setInterval(() => {
      const container = scannerRef.current;

      // Wait until container is rendered with a width
      if (container && container.clientWidth > 0) {
        clearInterval(interval); // ✅ clear once ready

        const scanner = new Html5Qrcode(container.id);
        html5QrCodeRef.current = scanner;

        Html5Qrcode.getCameras()
          .then((devices) => {
            if (devices.length === 0) {
              console.error("No cameras found.");
              return;
            }

            // const cameraId = devices[0].id;

            scanner
              .start(
                { facingMode: "environment" }, // ✅ camera config
                {
                  fps: 10,
                  qrbox: { width: 250, height: 500 },
                },
                (decodedText) => {
                  console.log("✅ QR Code scanned:", decodedText);
                  // handle redirect or payment here
                  navigateWithState("/send", { state: { id: decodedText } });
                },
                (errorMessage) => {
                  console.warn("Scan error:", errorMessage);
                  // navigateWithState("/send", { state: { id: "67ed1cde9a3148641c4bacdc" } });
                }
              )
              .catch((err) => {
                console.error("Failed to start scanner:", err);
              });
          })
          .catch((err) => console.error("Camera error:", err));
      }
    }, 100); // check every 100ms

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="mb-2 font-semibold">Scan a QR Code</p>
      <div
        id="html5qr-code"
        ref={scannerRef}
        className="w-full h-[300px] bg-gray-200"
      />
    </div>
  );
};

export default QRScanner;
