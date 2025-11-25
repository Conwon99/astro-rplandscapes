import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackQuoteRequest } from "@/utils/analytics";
import { SERVICES } from "@/utils/serviceData";

const ServicesAlternatingLayout = () => {
  const handleLearnMoreClick = (serviceSlug: string, serviceTitle: string) => {
    trackQuoteRequest('services_alternating_layout', [serviceTitle]);
    // Navigate to service page
    window.location.href = `/services/${serviceSlug}`;
  };

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-left mb-16">
          <div className="flex items-center mb-6">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[hsl(var(--asphalt-grey))] mr-6">
              OUR SERVICES
            </h2>
            <div className="flex-1 h-px bg-[hsl(var(--asphalt-grey))]"></div>
          </div>
          <p className="text-xl text-[hsl(var(--asphalt-grey))] max-w-3xl">
            Expert groundworks and landscaping across Glasgow & Ayrshire. We deliver quality monoblocking, artificial grass, brickwork, fencing and decking.
          </p>
        </div>

        <div className="space-y-20 lg:space-y-24">
          {SERVICES.map((service, index) => {
            // Even indices (0, 2, 4...) = image left, text right
            // Odd indices (1, 3, 5...) = image right, text left
            const isEven = index % 2 === 0;
            
            return (
              <article
                key={service.title}
                className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
              >
                {/* Image - Left for even indices, Right for odd indices */}
                <div className={`w-full lg:w-1/2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={service.image}
                      alt={`Professional ${service.title} in Glasgow & Ayrshire - RP Build and Landscapes services`}
                      className="w-full h-[400px] lg:h-[500px] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content - Right for even indices, Left for odd indices */}
                <div className={`w-full lg:w-1/2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-6">
                    <h3 className="font-display text-3xl lg:text-4xl font-bold text-[hsl(var(--asphalt-grey))]">
                      {service.title}
                    </h3>
                    <p className="text-lg text-[hsl(var(--asphalt-grey))] opacity-80 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-[hsl(var(--asphalt-grey))]">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2">
                      <Button
                        onClick={() => handleLearnMoreClick(service.slug, service.title)}
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold rounded-lg px-8 py-6 text-lg"
                      >
                        Learn More
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesAlternatingLayout;



