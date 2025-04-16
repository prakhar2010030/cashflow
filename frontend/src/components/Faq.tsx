import FaqItem from './FaqItem'

export default function Faq() {
  return (
    <div className="py-16 bg-white">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <FaqItem
        question="How do I create a CashFlow account?"
        answer="Download the CashFlow app from your app store, sign up with your phone number, verify with OTP, and link your bank account or add money to get started."
      />
      <FaqItem
        question="Are there any transaction fees?"
        answer="CashFlow offers zero transaction fees for sending money to friends and family. For merchant payments and bill payments, there are no additional charges for users."
      />
      <FaqItem
        question="Is CashFlow available nationwide?"
        answer="Yes, CashFlow is available across India and works with all major banks and UPI platforms."
      />
      <FaqItem
        question="How secure is CashFlow?"
        answer="CashFlow uses bank-grade security with end-to-end encryption, two-factor authentication, and biometric security options to keep your money and data safe."
      />
      <FaqItem
        question="What if I have issues with a transaction?"
        answer="Our 24/7 customer support team is available to help with any transaction issues. You can also track all your transactions in the app."
      />
    </div>
  </div>
  )
}
