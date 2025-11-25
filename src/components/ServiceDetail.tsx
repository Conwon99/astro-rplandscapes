import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { trackPhoneCallClick, trackQuoteRequest } from "@/utils/analytics";
import type { Service } from "@/utils/serviceData";
import { useState, useEffect } from "react";
import { ORIGINAL_PHONE_DISPLAY, TRACKING_PHONE_DISPLAY, ORIGINAL_PHONE, TRACKING_PHONE } from "@/utils/phoneTracking";

interface ServiceDetailProps {
  service: Service;
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  // Phone number state - starts with canonical (for SSR), switches to tracking after mount
  const [phoneDisplay, setPhoneDisplay] = useState(ORIGINAL_PHONE_DISPLAY);
  const [phoneHref, setPhoneHref] = useState(`tel:${ORIGINAL_PHONE}`);

  // Switch to tracking number after component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPhoneDisplay(TRACKING_PHONE_DISPLAY);
      setPhoneHref(`tel:${TRACKING_PHONE}`);
    }
  }, []);

  const handleCallClick = () => {
    trackPhoneCallClick('service_detail_call_button');
    window.location.href = phoneHref;
  };

  const handleQuoteClick = () => {
    trackQuoteRequest('service_detail_quote_button', [service.title]);
    window.location.href = "/contact";
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={service.image}
                alt={`Professional ${service.title} in Glasgow & Ayrshire - RP Build and Landscapes services`}
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
              {service.title} in Glasgow & Ayrshire
            </h1>
            <p className="text-xl text-[hsl(var(--asphalt-grey))] opacity-80 leading-relaxed mb-8">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleQuoteClick}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold rounded-lg px-8 py-6"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={handleCallClick}
                variant="outline"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-lg px-8 py-6"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {phoneDisplay}
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-card rounded-3xl shadow-lg p-8 lg:p-12 mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[hsl(var(--asphalt-grey))] mb-8">
            What We Offer
          </h2>
          <ul className="grid md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-[hsl(var(--asphalt-grey))]">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today for a free, no-obligation quote for {service.title.toLowerCase()} in Glasgow & Ayrshire
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleQuoteClick}
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={handleCallClick}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-lg transition-colors duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call {phoneDisplay}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;



