import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import LazyImage from "@/components/LazyImage";
import { trackPhoneCall, trackNavigation, trackQuoteRequest, trackPhoneCallClick } from "@/utils/analytics";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Approximate hero section height
      
      if (scrollY > heroHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallClick = () => {
    trackPhoneCallClick('navigation');
    window.location.href = "tel:+447305967999";
  };

  const scrollToSection = (sectionId: string) => {
    trackNavigation(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleQuoteClick = () => {
    trackQuoteRequest('navigation_button', []);
    scrollToSection("contact-form");
  };


  const navItems = [
    { label: "Home", onClick: () => scrollToSection("hero") },
    { label: "Services", onClick: () => scrollToSection("services") },
    { label: "Gallery", onClick: () => scrollToSection("gallery") },
    { label: "Reviews", onClick: () => scrollToSection("reviews") },
    { label: "FAQ", onClick: () => scrollToSection("faq") },
    { label: "Contact", onClick: () => scrollToSection("contact-form") },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black backdrop-blur-sm border-b border-white/10' 
        : 'bg-black'
    }`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
              <LazyImage
                src="/RP - Edited.png"
                alt="RP Build and Landscapes logo"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
          </div>

          {/* Desktop Navigation - Only on very large screens */}
          <div className="hidden xl:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* iPad/Tablet Layout - Phone Number + Hamburger */}
          <div className="hidden md:flex xl:hidden items-center space-x-4">
            <Button
              onClick={handleCallClick}
              variant="ghost"
              className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground bg-transparent hover:bg-transparent p-0"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Phone className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-300 font-medium">CALL US NOW</span>
                <span className="text-lg font-bold text-white">07305 967999</span>
              </div>
            </Button>
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-primary-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-primary-foreground" />
              )}
            </button>
          </div>

          {/* Desktop CTA - Only on very large screens */}
          <div className="hidden xl:flex items-center space-x-4">
            <Button
              onClick={handleCallClick}
              variant="ghost"
              className="flex items-center gap-4 text-primary-foreground/80 hover:text-primary-foreground bg-transparent hover:bg-transparent p-0"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <Phone className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-300 font-medium">CALL US NOW</span>
                <span className="text-3xl font-bold text-white">07305 967999</span>
              </div>
            </Button>
            <Button
              onClick={handleQuoteClick}
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-6 py-2 rounded-full font-semibold"
            >
              Free Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-primary-foreground" />
            )}
          </button>
        </div>

        {/* Mobile/iPad Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-primary border-t border-primary-foreground/20">
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="block w-full text-left px-4 py-2 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-4 border-t border-primary-foreground/20 space-y-3">
                <Button
                  onClick={handleCallClick}
                  variant="ghost"
                  className="w-full justify-start flex items-center gap-4 text-primary-foreground hover:text-primary-foreground/80 bg-transparent hover:bg-transparent p-0"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-300 font-medium">CALL US NOW</span>
                    <span className="text-3xl font-bold text-white">07305 967999</span>
                  </div>
                </Button>
                <Button
                  onClick={handleQuoteClick}
                  className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-primary"
                >
                  Get Free Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;