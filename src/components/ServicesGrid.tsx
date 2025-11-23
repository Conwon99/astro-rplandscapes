import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackQuoteRequest } from "@/utils/analytics";

type ServiceCard = {
  title: string;
  description: string;
  features: string[];
  image: string;
};

const SERVICE_CARDS: ServiceCard[] = [
  {
    title: "Groundworks",
    description: "Complete groundworks solutions for all your landscaping needs",
    features: ["Site preparation", "Drainage systems", "Foundation work", "Excavation services"],
    image: "/Services/groundRP.jpg",
  },
  {
    title: "Monoblocking",
    description: "Professional monoblocking and paving services",
    features: ["Driveways", "Patios", "Pathways", "Quality materials"],
    image: "/Services/monoRP.jpg",
  },
  {
    title: "Artificial Grass",
    description: "High-quality artificial grass installation and maintenance",
    features: ["Low maintenance", "Year-round green", "Professional installation", "Realistic appearance"],
    image: "/Services/grassRP.jpg",
  },
  {
    title: "Brickwork",
    description: "Expert brickwork and masonry services",
    features: ["Walls", "Retaining walls", "Repairs", "Custom designs"],
    image: "/Services/brickRP.jpg",
  },
  {
    title: "Fencing",
    description: "Professional fencing installation and repairs",
    features: ["Privacy fencing", "Security fencing", "Custom heights", "Quality materials"],
    image: "/fencing1.jpg",
  },
  {
    title: "Decking",
    description: "High-quality decking solutions for outdoor living",
    features: ["Composite decking", "Wooden decking", "Custom designs", "Professional installation"],
    image: "/Services/deckRP.jpg",
  },
];

const ServicesGrid = () => {
  const handleQuoteClick = () => {
    console.log('[ServicesGrid] handleQuoteClick called');
    trackQuoteRequest('services_grid', []);
    console.log('[ServicesGrid] Navigating to /contact');
    window.location.href = "/contact";
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_CARDS.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden flex flex-col rounded-3xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] hover:scale-[1.02] h-full"
            >
              {/* Image (ANGE style: aspect wrapper, object-cover, centered) */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.title} service image`}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="font-display text-2xl font-bold text-[hsl(var(--asphalt-grey))] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[hsl(var(--asphalt-grey))] opacity-80 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[hsl(var(--asphalt-grey))]">
                        <div className="w-1.5 h-1.5 bg-[hsl(var(--primary-blue))] rounded-full mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <Button onClick={handleQuoteClick} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold rounded-full">
                    Request a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;


