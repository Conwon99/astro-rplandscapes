import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { trackPhoneCall, trackPhoneCallClick } from "@/utils/analytics";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What groundworks services do you provide?",
      answer: "We provide comprehensive groundworks services including site preparation, drainage systems, foundation work, and excavation services. Our groundworks form the foundation for all our landscaping projects, ensuring proper preparation for monoblocking, artificial grass, brickwork, fencing, and decking installations."
    },
    {
      question: "How much does monoblocking cost?",
      answer: "Monoblocking costs vary depending on the size, design complexity, and material choice. Prices typically range from £40-80 per square meter for standard installations. We provide free, no-obligation quotes for all monoblocking work including driveways, patios, and pathways."
    },
    {
      question: "What areas do you cover?",
      answer: "We provide groundworks and landscaping services across Glasgow and Ayrshire, including surrounding areas. Contact us to confirm coverage for your specific location and discuss your project requirements."
    },
    {
      question: "Do you install artificial grass?",
      answer: "Yes, we specialise in high-quality artificial grass installation and maintenance. Our artificial grass solutions offer low maintenance, year-round green appearance, and realistic looks. We handle everything from ground preparation to professional installation with proper drainage systems."
    },
    {
      question: "What brickwork services do you offer?",
      answer: "We provide expert brickwork and masonry services including walls, retaining walls, repairs, and custom designs. Our skilled bricklayers work with various materials and can create both functional and decorative brickwork solutions for your property."
    },
    {
      question: "Do you offer fencing installation and repairs?",
      answer: "Yes, we provide comprehensive fencing services including new installations, repairs, and maintenance. We work with various fencing materials and can handle everything from privacy fences to security fencing. All work is completed to the highest standards by our expert contractors."
    },
    {
      question: "Do you install both composite and wooden decking?",
      answer: "Yes, we specialise in both composite and wooden decking installation. Composite decking offers low maintenance and weather resistance, while wooden decking provides natural beauty and traditional appeal. Our skilled contractors can help you choose the best option for your needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project duration depends on size and complexity. Simple installations like fencing or artificial grass typically take 1-2 days, while larger groundworks or comprehensive landscaping projects may take up to a week. We provide realistic timelines during the quote process and keep you updated throughout the project."
    },
    {
      question: "Do you offer free quotes?",
      answer: "Yes, we provide completely free, no-obligation quotes for all our services. You can request a quote by calling 07305 967999, emailing us at pope64602@gmail.com, or using our contact form. We'll assess your needs and provide a detailed, transparent quote with no hidden costs."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    script.id = 'faq-structured-data';
    
    // Remove existing script if present
    const existing = document.getElementById('faq-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.getElementById('faq-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <>
      
      <section id="faq" className="py-20 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[hsl(var(--asphalt-grey))] max-w-3xl mx-auto">
              Common questions about our groundworks, landscaping, monoblocking, artificial grass, brickwork, fencing, and decking services across Glasgow and Ayrshire
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-[hsl(var(--asphalt-grey))] pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-[hsl(var(--primary-blue))] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[hsl(var(--primary-blue))] flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-[hsl(var(--asphalt-grey))] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-[hsl(var(--asphalt-grey))] mb-6">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+447305967999"
                onClick={() => trackPhoneCallClick('faq_section')}
                className="inline-flex items-center justify-center px-6 py-3 bg-[hsl(var(--primary-blue))] text-white rounded-full font-semibold hover:bg-[hsl(var(--primary-blue))]/90 transition-colors"
              >
                Call 07305 967999
              </a>
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-[hsl(var(--primary-blue))] text-[hsl(var(--primary-blue))] rounded-full font-semibold hover:bg-[hsl(var(--primary-blue))] hover:text-white transition-colors"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
