import { MapPin, ArrowRight } from "lucide-react";
import { trackPhoneCallClick, trackQuoteRequest } from "@/utils/analytics";
import { LOCATIONS } from "@/utils/locationData";
import { useState, useEffect } from "react";
import { ORIGINAL_PHONE_DISPLAY, TRACKING_PHONE_DISPLAY, ORIGINAL_PHONE, TRACKING_PHONE } from "@/utils/phoneTracking";

type LocationDisplay = {
  name: string;
  slug: string;
  serviceAreas: string[];
  region: string;
};

// Create display locations from location data
const LOCATION_DISPLAYS: LocationDisplay[] = LOCATIONS.map(loc => ({
  name: loc.name,
  slug: loc.slug,
  serviceAreas: loc.serviceAreas,
  region: loc.name === "Glasgow" ? "Greater Glasgow" : "Ayrshire"
}));

const LocationsList = () => {
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
    trackPhoneCallClick('locations_page_call_button');
    window.location.href = phoneHref;
  };

  const handleQuoteClick = () => {
    trackQuoteRequest('locations_page_quote_button', []);
    window.location.href = "/contact";
  };

  // Group locations by region
  const ayrshireLocations = LOCATION_DISPLAYS.filter(loc => loc.region === "Ayrshire");
  const glasgowLocations = LOCATION_DISPLAYS.filter(loc => loc.region === "Greater Glasgow");

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-7xl">
        {/* Ayrshire Locations */}
        <div className="mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[hsl(var(--asphalt-grey))] mb-8">
            Ayrshire
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ayrshireLocations.map((location, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <h3 className="font-display text-xl font-bold text-[hsl(var(--asphalt-grey))]">
                      {location.name}
                    </h3>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Service Areas:</p>
                  <p className="text-[hsl(var(--asphalt-grey))] text-sm">
                    {location.serviceAreas.slice(0, 5).join(", ")}{location.serviceAreas.length > 5 ? " and more" : ""}
                  </p>
                </div>
                <a
                  href={`/locations/${location.slug}`}
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Glasgow Locations */}
        {glasgowLocations.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[hsl(var(--asphalt-grey))] mb-8">
              Greater Glasgow
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {glasgowLocations.map((location, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <h3 className="font-display text-xl font-bold text-[hsl(var(--asphalt-grey))]">
                        {location.name}
                      </h3>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Service Areas:</p>
                    <p className="text-[hsl(var(--asphalt-grey))] text-sm">
                      {location.serviceAreas.slice(0, 5).join(", ")}{location.serviceAreas.length > 5 ? " and more" : ""}
                    </p>
                  </div>
                  <a
                    href={`/locations/${location.slug}`}
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Coverage Area Section */}
        <div className="mt-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
                Full Coverage Area
              </h2>
              <p className="text-lg mb-8 opacity-90">
                RP Build and Landscapes provides comprehensive groundworks and landscaping services throughout Glasgow and Ayrshire. Our strategically positioned team ensures rapid response times for all your landscaping needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCallClick}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
                >
                  Call {phoneDisplay}
                </button>
                <button
                  onClick={handleQuoteClick}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">Fast</div>
                  <div className="text-sm opacity-90">Response Time</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">9+</div>
                  <div className="text-sm opacity-90">Towns & Cities</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">6</div>
                  <div className="text-sm opacity-90">Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Coverage Map */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-[hsl(var(--asphalt-grey))] mb-6 text-center">
              Service Coverage Map
            </h3>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2238.5!2d-4.2518!3d55.8642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488f8b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sGlasgow%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RP Build and Landscapes - Glasgow & Ayrshire Coverage Map"
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              Serving Glasgow & Ayrshire with expert groundworks and landscaping
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsList;



