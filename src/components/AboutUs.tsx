import { Button } from "@/components/ui/button";
import { Award, Users, Clock, Home, Facebook, Truck } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { trackMessenger, trackFacebookClick, trackWhatsAppClick } from "@/utils/analytics";

const AboutUs = () => {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 bg-[hsl(var(--asphalt-grey))]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                ABOUT US
              </h2>
              <div className="w-16 h-1 bg-primary"></div>
              
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                We are trusted groundworks contractors and landscaping specialists serving Glasgow & Ayrshire. Our professional team specialises in monoblocking, artificial grass installation, brickwork, fencing, decking, and all aspects of groundworks. Expert installation services across Glasgow and Ayrshire, delivering premium outdoor solutions that enhance your property's beauty and value.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.facebook.com/rpbuilds/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackFacebookClick('about_section')}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </a>
                <a 
                  href="https://wa.me/447305967999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('about_section')}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" color="black" />
                </a>
              </div>
            </div>
          </div>

          {/* Company Logo/Image */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-2">
            <div className="text-center max-w-sm w-full">
              <div className="mb-4 sm:mb-6 mx-auto">
                <LazyImage
                  src="/RP - Edited.png"
                  alt="RP Build and Landscapes logo"
                  className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain brightness-0 invert mx-auto"
                />
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                RP BUILD
              </h3>
              <p className="text-white/80 text-base sm:text-lg">
                AND LANDSCAPES
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;