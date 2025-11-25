import { MapPin } from "lucide-react";
import { trackPhoneCallClick, trackQuoteRequest } from "@/utils/analytics";
import { ORIGINAL_PHONE_DISPLAY, TRACKING_PHONE_DISPLAY, ORIGINAL_PHONE, TRACKING_PHONE } from "@/utils/phoneTracking";
import { useState, useEffect } from "react";

interface PageHeroProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  description: string;
  showContactButtons?: boolean;
}

const PageHero = ({ backgroundImage, title, subtitle, description, showContactButtons = false }: PageHeroProps) => {
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
    trackPhoneCallClick('page_hero_call_button');
    window.location.href = phoneHref;
  };

  const handleQuoteClick = () => {
    trackQuoteRequest('page_hero_quote_button', []);
    window.location.href = "/contact";
  };

  return (
    <section className="relative bg-background min-h-[60vh] flex items-center pt-32 pb-12 px-4 overflow-hidden w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover object-[center_40%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            {/* Text Content */}
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {subtitle && (
                    <h2 className="font-display font-semibold text-sm sm:text-base lg:text-lg text-white drop-shadow-lg flex items-center gap-2 flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>{subtitle}</span>
                    </h2>
                  )}
                  <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight drop-shadow-lg px-2">
                    <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      {title}
                    </span>
                  </h1>
                </div>
                <p className="text-base sm:text-lg text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2">
                  {description}
                </p>
              </div>

              {/* Quick Contact */}
              {showContactButtons && (
                <div className="pt-4 border-t border-white/20">
                  <p className="text-white text-base sm:text-lg font-semibold mb-3 text-center px-2">
                    Contact us today for a <span className="font-bold text-green-400">FREE QUOTE</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-2">
                    <button 
                      onClick={handleQuoteClick}
                      className="inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-6 sm:py-8 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base sm:text-lg btn-shiny"
                    >
                      Get a Free Quote
                    </button>
                    <button 
                      onClick={handleCallClick}
                      className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-6 sm:py-8 bg-transparent hover:bg-transparent text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-gray-300 font-medium">CALL US NOW</span>
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{phoneDisplay}</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;

