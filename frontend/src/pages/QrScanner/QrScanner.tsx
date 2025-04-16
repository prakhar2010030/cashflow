import { useEffect, useRef } from "react";
import { useNavigates } from "../../hooks/useNavigates";

const QRScanner = () => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<any>(null); //`any` since import is dynamic
  const { navigateWithState, navigateTo } = useNavigates();

  useEffect(() => {
    const interval = setInterval(async () => {
      const container = scannerRef.current;

      if (container && container.clientWidth > 0) {
        clearInterval(interval);

        const { Html5Qrcode } = await import("html5-qrcode"); //dynamic import
        const scanner = new Html5Qrcode(container.id);
        html5QrCodeRef.current = scanner;

        Html5Qrcode.getCameras()
          .then((devices) => {
            if (devices.length === 0) {
              console.error("No cameras found.");
              return;
            }

            scanner
              .start(
                { facingMode: "environment" },
                {
                  fps: 10,
                  qrbox: { width: 250, height: 250 },
                },
                (decodedText) => {
                  // console.log("QR Code scanned:", decodedText);
                  navigateWithState("/send", { state: { id: decodedText } });
                },
                (errorMessage) => {
                  console.warn("Scan error:", errorMessage);
                  alert("work only with smart phones, not laptops");
                  navigateTo("/dashboard");
                }
              )
              .catch((err) => {
                console.error("Failed to start scanner:", err);
              });
          })
          .catch((err) => console.error("Camera error:", err));
      }
    }, 100);

    return () => {
      clearInterval(interval);
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="mb-2 text-center font-semibold">Scan a QR Code</p>
      <div
        id="html5qr-code"
        ref={scannerRef}
        className="w-full bg-gray-200"
      />
    </div>
  );
};

export default QRScanner;
