
import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResult } from "@/types/PredictionResult";
import { PredictionResults } from "@/components/PredictionResult";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ScrollArea } from "@/components/ui/scroll-area";



const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = (result: PredictionResult) => {
    setIsLoading(true);
    
    // Simulate ML processing time
    setTimeout(() => {
      setPredictionResult(result);
      setIsLoading(false);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500);
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Main Content  */}
        <main id="prediction-form" className="flex-1 scroll-mt-14 dark:bg-gradient-to-b from-[#0e0c1f] via-[#342063] to-[#110824]">
          {/* Prediction Form Section */}
          <section  className="py-16 px-4 ">
            <div className="container mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl dark:text-zinc-300 font-bold mb-4">Predict Your Apartment's Value</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Our machine learning algorithm analyzes thousands of data points to provide 
                  the most accurate price prediction for your property.
                </p>
              </div>
              
              <PredictionForm onPredict={handlePredict} />
            </div>
          </section>
          
          {/* Results Section */}
          <section id="results" className="py-16 px-4 bg-white dark:bg-gradient-to-t from-[#0e0c1f]  to-[#221743]">
            <div className="container mx-auto">
              {isLoading ? (
                <LoadingSpinner />
              ) : predictionResult ? (
                <>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4">Your Price Prediction</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Based on the property details you provided, our AI has generated the following prediction.
                    </p>
                  </div>
                  
                  <PredictionResults result={predictionResult} />
                </>
              ) : null}
            </div>
          </section>
          
          {/* How It Works Section */}
          <HowItWorks />
          
          {/* Testimonials Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Trusted by Professionals</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  See what real estate professionals and homeowners are saying about our prediction tool.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <p className="text-sm text-gray-500">Real Estate Agent</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "AptPriceSeer has transformed how I help clients set listing prices. The ML-driven
                    predictions are consistently within 5% of final sale prices."
                  </p>
                  <div className="flex mt-4">
                    <span className="text-realestate-purple">★★★★★</span>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-medium">Michael Chen</h4>
                      <p className="text-sm text-gray-500">Property Investor</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "As an investor, accurate valuations are critical. This tool has helped me
                    identify undervalued properties and make confident investment decisions."
                  </p>
                  <div className="flex mt-4">
                    <span className="text-realestate-purple">★★★★★</span>
                  </div>
                </div>
                
                {/* Testimonial 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-medium">Emily Rodriguez</h4>
                      <p className="text-sm text-gray-500">First-time Homebuyer</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "AptPriceSeer helped me avoid overpaying for my first apartment. The detailed
                    breakdown of value factors was incredibly educational."
                  </p>
                  <div className="flex mt-4">
                    <span className="text-realestate-purple">★★★★★</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 px-4 bg-gradient-to-r from-realestate-purple to-realestate-darkBlue text-white">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Property's True Value?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/80">
                Join thousands of homeowners and real estate professionals who rely on AptPriceSeer 
                for accurate property valuations.
              </p>
              <button className="bg-white text-realestate-purple font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
                Get Your Free Price Prediction
              </button>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ScrollArea>
  );
};

export default Index;
