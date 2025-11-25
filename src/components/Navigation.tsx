import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { trackPhoneCall, trackNavigation, trackQuoteRequest, trackPhoneCallClick } from "@/utils/analytics";

// Phone number tracking - canonical for SEO, tracking for users
const CANONICAL_PHONE_DISPLAY = '07305 967999';
const CANONICAL_PHONE_HREF = 'tel:+447305967999';
const TRACKING_PHONE_DISPLAY = '07360 544321';
const TRACKING_PHONE_HREF = 'tel:+447360544321';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Phone number state - starts with canonical (for SSR), switches to tracking after mount
  const [phoneDisplay, setPhoneDisplay] = useState(CANONICAL_PHONE_DISPLAY);
  const [phoneHref, setPhoneHref] = useState(CANONICAL_PHONE_HREF);

  useEffect(() => {
    console.log('[Navigation] Component mounted');
    setIsHydrated(true);
    console.log('[Navigation] Component hydrated');
    console.log('[Navigation] Checking if buttons are in DOM...');
    const buttons = document.querySelectorAll('nav button');
    console.log('[Navigation] Navigation buttons found:', buttons.length);
    
    // Switch to tracking number after component mounts (client-side only)
    if (typeof window !== 'undefined') {
      setPhoneDisplay(TRACKING_PHONE_DISPLAY);
      setPhoneHref(TRACKING_PHONE_HREF);
    }
    
    return () => {
      console.log('[Navigation] Component unmounted');
    };
  }, []);

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
    window.location.href = phoneHref;
  };

  const scrollToSection = (sectionId: string) => {
    console.log('[Navigation] scrollToSection called with:', sectionId);
    trackNavigation(sectionId);
    setIsMenuOpen(false);
    
    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    
    if (!isHomePage) {
      // If not on home page, navigate to home with hash, then scroll
      console.log('[Navigation] Not on home page, navigating to home first');
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      console.log('[Navigation] Looking for element with id:', sectionId);
      const element = document.getElementById(sectionId);
      console.log('[Navigation] Element found:', element);
      
      if (element) {
        const navHeight = 64; // Height of the navigation bar (h-16 = 64px)
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = Math.max(0, elementPosition - navHeight);
        
        console.log('[Navigation] Scrolling to position:', offsetPosition);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn('[Navigation] Element not found, listing all section IDs:');
        // List all elements with IDs to help debug
        const allElements = document.querySelectorAll('[id]');
        const allIds = Array.from(allElements).map(el => el.id);
        console.log('[Navigation] All IDs on page:', allIds);
        
        // If element not found, try again after a short delay
        setTimeout(() => {
          console.log('[Navigation] Retrying to find element:', sectionId);
          const retryElement = document.getElementById(sectionId);
          if (retryElement) {
            console.log('[Navigation] Retry successful, scrolling...');
            const navHeight = 64;
            const elementPosition = retryElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = Math.max(0, elementPosition - navHeight);
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            console.error('[Navigation] Element still not found after retry:', sectionId);
          }
        }, 200);
      }
    });
  };

  const handleContactClick = () => {
    console.log('[Navigation] handleContactClick called');
    trackNavigation('contact_page');
    console.log('[Navigation] Navigating to /contact');
    window.location.href = "/contact";
    setIsMenuOpen(false);
  };

  const handleQuoteClick = () => {
    console.log('[Navigation] handleQuoteClick called');
    trackQuoteRequest('navigation_button', []);
    console.log('[Navigation] Navigating to /contact');
    window.location.href = "/contact";
  };


  const handleServicesClick = () => {
    trackNavigation('services_page');
    window.location.href = "/services";
    setIsMenuOpen(false);
  };

  const handleAboutClick = () => {
    trackNavigation('about_page');
    window.location.href = "/about";
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "HOME", onClick: () => scrollToSection("hero") },
    { label: "SERVICES", onClick: handleServicesClick },
    { label: "ABOUT", onClick: handleAboutClick },
    { label: "GALLERY", onClick: () => scrollToSection("gallery") },
    { label: "REVIEWS", onClick: () => scrollToSection("reviews") },
    { label: "CONTACT", onClick: handleContactClick },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black backdrop-blur-sm border-b border-white/10' 
        : 'bg-black'
    }`} style={{ pointerEvents: 'auto' }}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => {
                console.log('[Navigation] Logo clicked, navigating to home');
                window.location.href = "/";
              }}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              type="button"
              aria-label="Go to home page"
            >
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                <img
                src="/RP - Edited.png"
                alt="RP Build and Landscapes logo"
                className="w-full h-full object-contain brightness-0 invert"
                  loading="eager"
              />
            </div>
            </button>
          </div>

          {/* Desktop Navigation - Only on very large screens */}
          <div className="hidden xl:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={(e) => {
                  console.log('[Navigation] Button clicked:', item.label, 'isHydrated:', isHydrated);
                  e.preventDefault();
                  e.stopPropagation();
                  if (isHydrated) {
                    item.onClick();
                  } else {
                    console.warn('[Navigation] Component not hydrated yet, waiting...');
                    setTimeout(() => item.onClick(), 100);
                  }
                }}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors duration-200 font-medium cursor-pointer"
                type="button"
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
                <span className="text-lg font-bold text-white">{phoneDisplay}</span>
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
          <div className="hidden xl:flex items-center space-x-6 ml-auto pl-8">
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
                <span className="text-3xl font-bold text-white">{phoneDisplay}</span>
              </div>
            </Button>
            <Button
              onClick={handleQuoteClick}
              className="btn-shiny text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative z-10"
            >
              <span className="relative z-10">GET A FREE QUOTE</span>
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
                  onClick={(e) => {
                    console.log('[Navigation] Mobile button clicked:', item.label, 'isHydrated:', isHydrated);
                    e.preventDefault();
                    e.stopPropagation();
                    if (isHydrated) {
                      item.onClick();
                    } else {
                      console.warn('[Navigation] Component not hydrated yet, waiting...');
                      setTimeout(() => item.onClick(), 100);
                    }
                  }}
                  className="block w-full text-left px-4 py-2 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors duration-200 cursor-pointer"
                  type="button"
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
                    <span className="text-3xl font-bold text-white">{phoneDisplay}</span>
                  </div>
                </Button>
                <Button
                  onClick={handleQuoteClick}
                  className="btn-shiny w-full text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative z-10"
                >
                  <span className="relative z-10">GET A FREE QUOTE</span>
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