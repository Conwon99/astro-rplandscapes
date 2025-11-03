type GaLike = (
  command: string,
  eventName: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GaLike;
    dataLayer?: unknown[];
  }
}

export function trackPageView(pathname: string, title?: string): void {
  try {
    if (typeof window === "undefined") return;

    // Google Analytics 4 via gtag.js
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: title ?? document.title,
      });
      return;
    }

    // Fallback: push to dataLayer for GTM if present
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "page_view",
        page_path: pathname,
        page_title: title ?? document.title,
      });
    }
  } catch {
    // Swallow errors to avoid breaking navigation
  }
}

export function trackPhoneCall(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "phone_call", {
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "phone_call",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackNavigation(sectionId: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "navigation_click", {
        section_id: sectionId,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "navigation_click",
        section_id: sectionId,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackQuoteRequest(source: string, services: string[]): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "quote_request", {
        source: source,
        services: services,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "quote_request",
        source: source,
        services: services,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackMessenger(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "messenger_click", {
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "messenger_click",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackFormInteraction(action: string, formData?: Record<string, unknown>): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "form_interaction", {
        action: action,
        form_data: formData,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "form_interaction",
        action: action,
        form_data: formData,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackServiceClick(serviceTitle: string, source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "service_click", {
        service_title: serviceTitle,
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "service_click",
        service_title: serviceTitle,
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackExternalLink(url: string, linkText: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "external_link_click", {
        link_url: url,
        link_text: linkText,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "external_link_click",
        link_url: url,
        link_text: linkText,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackFacebookClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "facebook_click", {
        source: source,
        event_category: "social_media",
        event_label: "Facebook",
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "facebook_click",
        source: source,
        event_category: "social_media",
        event_label: "Facebook",
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackWhatsAppClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", {
        source: source,
        event_category: "contact",
        event_label: "WhatsApp",
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "whatsapp_click",
        source: source,
        event_category: "contact",
        event_label: "WhatsApp",
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackPhoneCallClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "phone_call_click", {
        source: source,
        event_category: "contact",
        event_label: "Phone Call",
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "phone_call_click",
        source: source,
        event_category: "contact",
        event_label: "Phone Call",
      });
    }
  } catch {
    // Swallow errors
  }
}

