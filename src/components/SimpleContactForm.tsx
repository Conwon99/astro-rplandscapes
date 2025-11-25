import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { trackFormInteraction, trackQuoteRequest } from "@/utils/analytics";

const SimpleContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

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
          phone: formData.phone,
          message: formData.message,
          website_url: typeof window !== 'undefined' ? window.location.href : '',
          _subject: 'Contact Form Submission from Website'
        }),
      });

      if (response.ok) {
        trackQuoteRequest('contact_page', []);
        trackFormInteraction('contact_form', 'submit_success');
        
        // Redirect to confirmation page
        window.location.href = '/confirmation';
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      trackFormInteraction('contact_form', 'submit_error');
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 max-w-2xl mx-auto">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-[hsl(var(--asphalt-grey))] mb-6 text-center">
        Contact Us
      </h2>
      <p className="text-[hsl(var(--asphalt-grey))] mb-8 text-center">
        Get in touch with us for a free quote or any questions about our services.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-[hsl(var(--asphalt-grey))] font-semibold text-sm sm:text-base block mb-2">
            Name *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary-blue))]"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-[hsl(var(--asphalt-grey))] font-semibold text-sm sm:text-base block mb-2">
            Phone Number *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary-blue))]"
            placeholder="Your phone number"
          />
        </div>
        
        <div>
          <Label htmlFor="message" className="text-[hsl(var(--asphalt-grey))] font-semibold text-sm sm:text-base block mb-2">
            Message *
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-2 min-h-[120px] sm:min-h-[150px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary-blue))]"
            placeholder="Tell us about your project or question..."
          />
        </div>
        
        <Button
          type="submit"
          className="btn-shiny w-full text-white py-3 sm:py-4 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative z-10 text-base sm:text-lg"
        >
          <span className="relative z-10">SEND MESSAGE</span>
        </Button>
      </form>
    </div>
  );
};

export default SimpleContactForm;


