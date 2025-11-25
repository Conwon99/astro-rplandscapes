import { Button } from "@/components/ui/button";
import { trackQuoteRequest } from "@/utils/analytics";

const ContactUsSection = () => {
  const handleQuoteClick = () => {
    trackQuoteRequest('contact_section', []);
    window.location.href = "/contact";
  };

  return (
    <section id="contact-us" className="py-20 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-[hsl(var(--asphalt-grey))] max-w-3xl mx-auto mb-12">
            Ready to transform your outdoor space? Get in touch for your FREE quote today!
          </p>
          <Button
            onClick={handleQuoteClick}
            className="btn-shiny text-white px-12 sm:px-16 py-6 sm:py-8 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative z-10 text-xl sm:text-2xl lg:text-3xl"
          >
            <span className="relative z-10">GET A FREE QUOTE</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;






