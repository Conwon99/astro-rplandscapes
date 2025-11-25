export type Service = {
  title: string;
  description: string;
  features: string[];
  image: string;
  slug: string;
};

export const SERVICES: Service[] = [
  {
    title: "Groundworks",
    description: "Complete groundworks solutions for all your landscaping needs",
    features: [
      "Site preparation",
      "Drainage systems",
      "Foundation work",
      "Excavation services"
    ],
    image: "/Services/groundRP.jpg",
    slug: "groundworks",
  },
  {
    title: "Monoblocking",
    description: "Professional monoblocking and paving services",
    features: [
      "Driveways",
      "Patios",
      "Pathways",
      "Quality materials"
    ],
    image: "/Services/monoRP.jpg",
    slug: "monoblocking",
  },
  {
    title: "Artificial Grass",
    description: "High-quality artificial grass installation and maintenance",
    features: [
      "Low maintenance",
      "Year-round green",
      "Professional installation",
      "Realistic appearance"
    ],
    image: "/Services/grassRP.jpg",
    slug: "artificial-grass",
  },
  {
    title: "Brickwork",
    description: "Expert brickwork and masonry services",
    features: [
      "Walls",
      "Retaining walls",
      "Repairs",
      "Custom designs"
    ],
    image: "/Services/brickRP.jpg",
    slug: "brickwork",
  },
  {
    title: "Fencing",
    description: "Professional fencing installation and repairs",
    features: [
      "Privacy fencing",
      "Security fencing",
      "Custom heights",
      "Quality materials"
    ],
    image: "/fencing1.jpg",
    slug: "fencing",
  },
  {
    title: "Decking",
    description: "High-quality decking solutions for outdoor living",
    features: [
      "Composite decking",
      "Wooden decking",
      "Custom designs",
      "Professional installation"
    ],
    image: "/Services/deckRP.jpg",
    slug: "decking",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(service => service.slug === slug);
}

export function getAllServices(): Service[] {
  return SERVICES;
}



