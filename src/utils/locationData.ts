export type LocationDetail = {
  name: string;
  slug: string;
  description: string;
  serviceAreas: string[];
  commonServiceLocations: string[];
  responseTime: string;
};

export const LOCATIONS: LocationDetail[] = [
  {
    name: "Glasgow",
    slug: "glasgow",
    description: "Professional groundworks and landscaping services in Glasgow. RP Build and Landscapes provides expert monoblocking, artificial grass, brickwork, fencing, and decking services throughout Glasgow and surrounding areas.",
    serviceAreas: ["Glasgow", "East Kilbride", "Paisley", "Clydebank", "Bearsden", "Milngavie", "Bishopbriggs"],
    commonServiceLocations: ["City centre", "Residential areas", "Commercial districts", "Industrial estates", "Suburban areas"],
    responseTime: "Fast response - call for current availability"
  },
  {
    name: "Ayr",
    slug: "ayr",
    description: "Expert groundworks and landscaping services in Ayr. We provide professional monoblocking, artificial grass, brickwork, fencing, and decking solutions for properties throughout Ayr and the surrounding coastal areas.",
    serviceAreas: ["Ayr", "Prestwick", "Alloway", "Monkton", "Annanhill", "Heads of Ayr", "Dunure"],
    commonServiceLocations: ["Seafront properties", "Historic town centre", "Residential areas", "Commercial districts", "Coastal properties"],
    responseTime: "Fast response - call for current availability"
  },
  {
    name: "Kilmarnock",
    slug: "kilmarnock",
    description: "Quality groundworks and landscaping services in Kilmarnock. RP Build and Landscapes delivers expert monoblocking, artificial grass, brickwork, fencing, and decking for homes and businesses throughout Kilmarnock.",
    serviceAreas: ["Kilmarnock", "Hurlford", "Fenwick", "Dalrymple", "Galston", "Newmilns", "Darvel", "Crosshouse", "Riccarton"],
    commonServiceLocations: ["Residential areas", "Town centre properties", "Industrial estates", "Commercial buildings", "Housing estates"],
    responseTime: "Fast response - call for current availability"
  },
  {
    name: "Irvine",
    slug: "irvine",
    description: "Professional groundworks and landscaping services in Irvine. Our team provides expert monoblocking, artificial grass, brickwork, fencing, and decking solutions for residential and commercial properties.",
    serviceAreas: ["Irvine", "Troon", "Dundonald", "Kilwinning", "Stevenston", "Bourtreehill", "Girdle Toll"],
    commonServiceLocations: ["Town centre", "Harbour area", "Residential estates", "Industrial parks", "Commercial zones"],
    responseTime: "Fast response - call for current availability"
  },
  {
    name: "Troon",
    slug: "troon",
    description: "Expert groundworks and landscaping services in Troon. RP Build and Landscapes delivers quality monoblocking, artificial grass, brickwork, fencing, and decking for properties throughout Troon and surrounding areas.",
    serviceAreas: ["Troon", "Barassie", "Dundonald", "Irvine", "Prestwick", "Monkton"],
    commonServiceLocations: ["Seafront properties", "Golf course areas", "Residential estates", "Harbour area", "Town centre"],
    responseTime: "Fast response - call for current availability"
  },
  {
    name: "Prestwick",
    slug: "prestwick",
    description: "Professional groundworks and landscaping services in Prestwick. We provide expert monoblocking, artificial grass, brickwork, fencing, and decking solutions for homes and businesses throughout Prestwick.",
    serviceAreas: ["Prestwick", "Ayr", "Monkton", "Symington", "Alloway", "Heads of Ayr"],
    commonServiceLocations: ["Airport area", "Seafront properties", "Town centre", "Residential areas", "Golf course properties"],
    responseTime: "Fast response - call for current availability"
  },
  {
    name: "Ardrossan",
    slug: "ardrossan",
    description: "Reliable groundworks and landscaping services in Ardrossan. RP Build and Landscapes provides comprehensive monoblocking, artificial grass, brickwork, fencing, and decking services for properties along the Ayrshire coast.",
    serviceAreas: ["Ardrossan", "Saltcoats", "Seamill", "West Kilbride", "Stevenston", "Portencross"],
    commonServiceLocations: ["Harbour area", "Seafront properties", "Town centre", "Residential estates", "Industrial areas"],
    responseTime: "Fast response - call for current availability"
  },
  {
    name: "Saltcoats",
    slug: "saltcoats",
    description: "Expert groundworks and landscaping services in Saltcoats. Our team provides quality monoblocking, artificial grass, brickwork, fencing, and decking solutions for properties throughout Saltcoats and surrounding areas.",
    serviceAreas: ["Saltcoats", "Ardrossan", "Stevenston", "Irvine", "West Kilbride", "Seamill"],
    commonServiceLocations: ["Seafront properties", "Town centre", "Residential estates", "Harbour area", "Commercial districts"],
    responseTime: "Fast response - call for current availability"
  },
  {
    name: "Largs",
    slug: "largs",
    description: "Professional groundworks and landscaping services in Largs. RP Build and Landscapes delivers expert monoblocking, artificial grass, brickwork, fencing, and decking for properties throughout Largs and the West Coast.",
    serviceAreas: ["Largs", "Fairlie", "Skelmorlie", "Wemyss Bay", "Inverkip", "Millport"],
    commonServiceLocations: ["Seafront properties", "Town centre", "Hillside properties", "Residential areas", "Marina area"],
    responseTime: "Fast response - call for current availability"
  },
];

export function getLocationBySlug(slug: string): LocationDetail | undefined {
  return LOCATIONS.find(location => location.slug === slug);
}

export function getAllLocations(): LocationDetail[] {
  return LOCATIONS;
}



