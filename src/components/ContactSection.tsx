import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { trackPhoneCall, trackMessenger, trackQuoteRequest, trackFormInteraction, trackWhatsAppClick, trackPhoneCallClick } from "@/utils/analytics";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const { toast } = useToast();

  const serviceOptions = [
    'Groundworks',
    'Monoblocking',
    'Artificial Grass',
    'Brickwork',
    'Fencing',
    'Decking',
    'General Landscaping',
    'Site Preparation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xgvndlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _subject: 'Free Quote Request from Website'
        }),
      });

      if (response.ok) {
        trackQuoteRequest('contact_form', [formData.service]);
        trackFormInteraction('quote_form', 'submit_success');
        
        toast({
          title: "Quote request sent!",
          description: "Thank you for your request. We'll respond within 24 hours.",
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      trackFormInteraction('quote_form', 'submit_error');
      toast({
        title: "Error sending request",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleCallClick = () => {
    trackPhoneCallClick('contact_section');
    window.location.href = "tel:+447305967999";
  };

  const handleMessengerClick = () => {
    trackWhatsAppClick('contact_section');
    window.open("https://wa.me/447305967999", "_blank");
  };

  return (
    <section id="contact-form" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--asphalt-grey))] mb-4 sm:mb-6">
            Contact Us
          </h2>
          <p className="text-lg sm:text-xl text-[hsl(var(--asphalt-grey))] max-w-3xl mx-auto px-4">
            Ready to transform your outdoor space? Get in touch for your FREE quote today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[hsl(var(--asphalt-grey))] mb-4 sm:mb-6">
                Get In Touch
              </h3>
              <p className="text-[hsl(var(--asphalt-grey))] mb-6 sm:mb-8 text-sm sm:text-base">
                We're here to help with all your groundworks and landscaping needs. Contact us today for a free, no-obligation quote.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(var(--primary-blue))] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[hsl(var(--asphalt-grey))] text-sm sm:text-base">Phone</p>
                  <a href="tel:+447305967999" className="text-[hsl(var(--primary-blue))] hover:underline text-sm sm:text-base break-all">
                    07305 967999
                  </a>
                </div>
              </div>

              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(var(--primary-blue))] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[hsl(var(--asphalt-grey))] text-sm sm:text-base">Email</p>
                  <a href="mailto:pope64602@gmail.com" className="text-[hsl(var(--primary-blue))] hover:underline text-sm sm:text-base break-all">
                    pope64602@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(var(--primary-blue))] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[hsl(var(--asphalt-grey))] text-sm sm:text-base">Service Areas</p>
                  <p className="text-[hsl(var(--asphalt-grey))] text-sm sm:text-base">Glasgow & Ayrshire</p>
                </div>
              </div>

              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(var(--primary-blue))] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[hsl(var(--asphalt-grey))] text-sm sm:text-base">Business Hours</p>
                  <p className="text-[hsl(var(--asphalt-grey))] text-sm sm:text-base">Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-[hsl(var(--asphalt-grey))] text-sm sm:text-base">Sat: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  onClick={handleCallClick}
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue))]/90 text-white font-semibold py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Now
                </Button>
                <Button 
                  onClick={handleMessengerClick}
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[hsl(var(--asphalt-grey))] mb-4 sm:mb-6">
              Request Your FREE Quote
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="name" className="text-[hsl(var(--asphalt-grey))] font-semibold text-sm sm:text-base">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="mt-1 sm:mt-2 rounded-xl border-2 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[hsl(var(--asphalt-grey))] font-semibold text-sm sm:text-base">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="mt-1 sm:mt-2 rounded-xl border-2 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-[hsl(var(--asphalt-grey))] font-semibold text-sm sm:text-base">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="mt-1 sm:mt-2 rounded-xl border-2 text-sm sm:text-base"
                />
              </div>

              <div>
                <Label htmlFor="service" className="text-[hsl(var(--asphalt-grey))] font-semibold text-sm sm:text-base">Service Required</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                  <SelectTrigger className="mt-1 sm:mt-2 rounded-xl border-2 text-sm sm:text-base">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="text-[hsl(var(--asphalt-grey))] font-semibold text-sm sm:text-base">Project Details</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about your groundworks and landscaping needs..."
                  className="mt-1 sm:mt-2 rounded-xl border-2 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                />
              </div>

          <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-full transition-colors duration-200 text-sm sm:text-base lg:text-lg"
          >
                Send Quote Request
          </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;