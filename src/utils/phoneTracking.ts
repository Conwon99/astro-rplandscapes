// Phone number tracking utility
// Original business number (for Google/SEO): +447305967999
// Tracking number (for users): +44 7360 544321

export const ORIGINAL_PHONE = '+447305967999';
export const TRACKING_PHONE = '+447360544321';
export const ORIGINAL_PHONE_DISPLAY = '07305 967999';
export const TRACKING_PHONE_DISPLAY = '07360 544321';

/**
 * Replaces all visible phone numbers with the tracking number
 * This runs client-side so Google still sees the original number in HTML
 */
export function replacePhoneNumbers() {
  if (typeof window === 'undefined') return;

  // Find all elements containing the original phone number
  const originalDisplayPatterns = [
    '07305 967999',
    '07305967999',
    '+44 7305 967999',
    '+447305967999',
    '07305-967999'
  ];

  const trackingDisplay = TRACKING_PHONE_DISPLAY;

  // Replace text content in all elements (but skip script and style tags)
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tagName = parent.tagName?.toLowerCase();
        if (tagName === 'script' || tagName === 'style' || tagName === 'noscript') {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  let node;
  const textNodes: Text[] = [];
  while (node = walker.nextNode()) {
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node as Text);
    }
  }

  textNodes.forEach(textNode => {
    let text = textNode.textContent || '';
    let replaced = false;

    // Replace various formats of the original number
    originalDisplayPatterns.forEach(pattern => {
      if (text.includes(pattern)) {
        text = text.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), trackingDisplay);
        replaced = true;
      }
    });

    if (replaced) {
      textNode.textContent = text;
    }
  });

  // Update all tel: links to use tracking number (if they still have original)
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.includes(ORIGINAL_PHONE) || href.includes('+447305967999'))) {
      link.setAttribute('href', `tel:${TRACKING_PHONE}`);
    }
  });

  // Update any onclick handlers containing phone numbers
  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    // Check onclick handlers
    const onclick = el.getAttribute('onclick');
    if (onclick && (onclick.includes(ORIGINAL_PHONE) || onclick.includes('+447305967999'))) {
      el.setAttribute('onclick', onclick.replace(/\+?447305967999/g, TRACKING_PHONE));
    }
  });
}

/**
 * Initialize phone number replacement
 * Should be called after DOM is ready
 */
export function initPhoneTracking() {
  if (typeof window === 'undefined') return;

  // Run immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replacePhoneNumbers);
  } else {
    replacePhoneNumbers();
  }

  // Also run after delays to catch dynamically loaded content (React components, etc.)
  setTimeout(replacePhoneNumbers, 100);
  setTimeout(replacePhoneNumbers, 500);
  setTimeout(replacePhoneNumbers, 1000);
  setTimeout(replacePhoneNumbers, 2000);

  // Use MutationObserver to catch dynamically added content
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      replacePhoneNumbers();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    // Clean up observer after 30 seconds to avoid performance issues
    setTimeout(() => {
      observer.disconnect();
    }, 30000);
  }
}

