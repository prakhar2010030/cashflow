import BenefitItem from './BenefitItem'

export default function Benefits() {
  return (
    <div id="benefits" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose CashFlow
          </h2>

          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-white rounded-lg shadow-lg p-6 md:mr-8">
                <ul className="space-y-4">
                  <BenefitItem
                    title="Fast & Instant Payments"
                    description="Complete transactions in seconds, not minutes or hours."
                  />
                  <BenefitItem
                    title="Zero Transaction Fees"
                    description="Send money to anyone without paying extra charges."
                  />
                  
                  <BenefitItem
                    title="24/7 Customer Support"
                    description="Get help anytime you need it, day or night."
                  />
                  <BenefitItem
                    title="Works Everywhere"
                    description="Accepted at millions of merchants nationwide."
                  />
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-800 text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Join Over 50 Million Happy Users
                </h3>
                <p className="mb-6">
                  Experience why CashFlow is India's fastest growing payment
                  app. Download now and see the difference.
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center mr-4">
                      <span className="font-bold">1</span>
                    </div>
                    <p>Download the app from your app store</p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center mr-4">
                      <span className="font-bold">2</span>
                    </div>
                    <p>Sign up with your phone number</p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center mr-4">
                      <span className="font-bold">3</span>
                    </div>
                    <p>Link your bank account and start using</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

