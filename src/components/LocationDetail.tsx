import { MapPin, Phone, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackPhoneCallClick, trackQuoteRequest } from "@/utils/analytics";
import { useState, useEffect } from "react";
import { ORIGINAL_PHONE_DISPLAY, TRACKING_PHONE_DISPLAY, ORIGINAL_PHONE, TRACKING_PHONE } from "@/utils/phoneTracking";

type LocationDetail = {
  name: string;
  slug: string;
  description: string;
  serviceAreas: string[];
  commonServiceLocations: string[];
  responseTime: string;
};

interface LocationDetailProps {
  location: LocationDetail;
}

const LocationDetail = ({ location }: LocationDetailProps) => {
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
    trackPhoneCallClick('location_detail_call_button');
    window.location.href = phoneHref;
  };

  const handleQuoteClick = () => {
    trackQuoteRequest('location_detail_quote_button', [location.name]);
    window.location.href = "/contact";
  };

  const services = [
    "Groundworks",
    "Monoblocking",
    "Artificial Grass",
    "Brickwork",
    "Fencing",
    "Decking",
    "Site Preparation",
    "Drainage Systems",
    "Retaining Walls",
    "Landscaping"
  ];

  const reasons = [
    "Local Expertise - We know Glasgow & Ayrshire's landscape and common requirements",
    "Fast Response - Mobile teams ready to deploy",
    "Fair Pricing - Transparent quotes with no hidden fees",
    "All Project Types - Residential and commercial projects of all sizes",
    "Quality Materials - We use only the best materials for lasting results"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-7xl">
        {/* Main Content */}
        <div className="mb-16">
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
              Professional Groundworks & Landscaping Services in {location.name}
            </h1>
            <div className="prose prose-lg max-w-none text-[hsl(var(--asphalt-grey))]">
              <p className="text-xl leading-relaxed mb-8">
                {location.description}
              </p>
            </div>
          </div>
        </div>

        {/* Service Coverage */}
        <div className="bg-white rounded-2xl shadow-md p-8 lg:p-10 mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
            Areas We Serve in {location.name}
          </h2>
          <div className="prose prose-lg max-w-none text-[hsl(var(--asphalt-grey))]">
            <p className="text-lg leading-relaxed">
              We provide comprehensive groundworks and landscaping services throughout {location.name} and surrounding areas. Our team is experienced in working with properties of all types, from residential homes to commercial developments.
            </p>
          </div>
        </div>

        {/* Services We Provide */}
        <div className="bg-white rounded-2xl shadow-md p-8 lg:p-10 mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
            Services We Provide in {location.name}
          </h2>
          <div className="prose prose-lg max-w-none text-[hsl(var(--asphalt-grey))] mb-6">
            <p className="text-lg leading-relaxed">
              Our comprehensive range of services ensures we can handle all your groundworks and landscaping needs in {location.name}. From initial site preparation to final finishing touches, we deliver quality results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {services.map((service, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-[hsl(var(--asphalt-grey))]">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Local Areas */}
        <div className="bg-card rounded-2xl shadow-md p-8 lg:p-10 mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
            Areas We Cover in {location.name}
          </h2>
          <div className="prose prose-lg max-w-none text-[hsl(var(--asphalt-grey))]">
            <p className="text-lg leading-relaxed mb-6">
              Our services extend throughout {location.name} and the surrounding areas. We work in residential neighborhoods, commercial districts, and industrial areas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {location.serviceAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-[hsl(var(--asphalt-grey))]">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl shadow-md p-8 lg:p-10 mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
            Why Choose RP Build and Landscapes in {location.name}?
          </h2>
          <div className="prose prose-lg max-w-none text-[hsl(var(--asphalt-grey))]">
            <p className="text-lg leading-relaxed mb-6">
              When you choose RP Build and Landscapes for your groundworks and landscaping needs in {location.name}, you're choosing a team committed to quality, reliability, and customer satisfaction.
            </p>
          </div>
          <div className="space-y-4 mt-6">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-[hsl(var(--asphalt-grey))]">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Service Locations */}
        {location.commonServiceLocations.length > 0 && (
          <div className="bg-card rounded-2xl shadow-md p-8 lg:p-10 mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
              Common Service Locations in {location.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {location.commonServiceLocations.map((loc, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-[hsl(var(--asphalt-grey))]">{loc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-8 lg:p-12 text-white text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Outdoor Space?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Contact RP Build and Landscapes today for expert groundworks and landscaping services in {location.name}. Get your free quote and let us bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              onClick={handleCallClick}
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-6 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call {phoneDisplay}
            </Button>
            <Button
              onClick={handleQuoteClick}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold py-6 px-8 rounded-lg transition-colors text-lg"
            >
              Get a Free Quote
            </Button>
          </div>
        </div>

        {/* Service Areas & Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="font-display text-2xl font-bold text-[hsl(var(--asphalt-grey))] mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {location.serviceAreas.slice(0, 6).map((area, index) => (
                <li key={index} className="flex items-center gap-2 text-[hsl(var(--asphalt-grey))]">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="font-display text-2xl font-bold text-[hsl(var(--asphalt-grey))] mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service, index) => (
                <li key={index} className="flex items-center gap-2 text-[hsl(var(--asphalt-grey))]">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetail;



