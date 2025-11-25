import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackQuoteRequest } from "@/utils/analytics";

const CTA = () => {
  const handleQuoteClick = () => {
    trackQuoteRequest('cta_section', []);
    // Navigate to contact page
    window.location.href = "/contact";
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-500 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your free, no-obligation quote today. Our experienced team is ready to help with all your groundworks and landscaping needs across Glasgow & Ayrshire.
          </p>
          <Button
            onClick={handleQuoteClick}
            className="inline-flex items-center gap-3 bg-white text-green-600 hover:bg-gray-100 font-semibold py-6 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Get a Free Quote
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-white/80 text-sm mt-4">
            Or call us at <a href="tel:+447305967999" className="font-semibold underline hover:text-white transition-colors">07305 967999</a> or <a href="/contact" className="font-semibold underline hover:text-white transition-colors">contact us online</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;



