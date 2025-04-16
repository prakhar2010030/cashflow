import { QrCode } from "lucide-react";
import { Send } from "lucide-react";
import { Gift } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Feature() {
  return (
    <div id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need in One App
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<QrCode className="h-8 w-8 text-gray-600" />}
            title="Quick QR Payments"
            description="Scan any QR code to instantly pay at shops, restaurants, or to friends."
          />
          <FeatureCard
            icon={<Send className="h-8 w-8 text-gray-600" />}
            title="Money Transfers"
            description="Send money directly to any bank account or CashFlow user instantly."
          />

          <FeatureCard
            icon={<Gift className="h-8 w-8 text-gray-600" />}
            title="Cashback & Rewards"
            description="Earn points on every transaction and redeem for exciting rewards."
          />
        </div>
      </div>
    </div>
  );
}
