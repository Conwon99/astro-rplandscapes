import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Facebook } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import { trackFacebookClick } from "@/utils/analytics";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: "/gallery/img1.jpg",
      alt: "Professional groundworks and landscaping project - RP Build and Landscapes"
    },
    {
      src: "/gallery/img2.jpg",
      alt: "High-quality monoblocking and paving work - Glasgow & Ayrshire"
    },
    {
      src: "/gallery/img3.jpg",
      alt: "Artificial grass installation and landscaping services"
    },
    {
      src: "/gallery/img4.jpg",
      alt: "Expert brickwork and masonry construction project"
    },
    {
      src: "/gallery/img5.jpg",
      alt: "Professional fencing installation and outdoor solutions"
    },
    {
      src: "/gallery/img6.jpg",
      alt: "Composite decking and outdoor living space design"
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-left mb-12 sm:mb-16">
          <div className="flex items-center mb-4 sm:mb-6">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--asphalt-grey))] mr-4 sm:mr-6">
              OUR WORK GALLERY
            </h2>
            <div className="flex-1 h-px bg-[hsl(var(--asphalt-grey))]"></div>
          </div>
          <p className="text-lg sm:text-xl text-[hsl(var(--asphalt-grey))] max-w-3xl">
            Take a look at some of our recent groundworks and landscaping projects across Glasgow and Ayrshire
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <div className="relative">
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8 sm:mt-12">
          <a
            href="https://www.facebook.com/rpbuilds/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFacebookClick('gallery')}
            className="inline-flex items-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
            View more work on Facebook
          </a>
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div className="max-w-4xl max-h-full">
              <LazyImage
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;