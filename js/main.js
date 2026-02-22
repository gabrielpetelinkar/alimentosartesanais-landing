/* ============================================
   MAIN.JS — FAQ Accordion + Scroll Animations
   ============================================ */

/* ------------------------------------------
   FAQ Accordion
   ------------------------------------------ */
function initAccordion() {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');
    if (!question) return;

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('faq__item--active');

      // Close all items and reset aria-expanded
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('faq__item--active');
        var otherQuestion = otherItem.querySelector('.faq__question');
        if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('faq__item--active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ------------------------------------------
   Scroll Fade-In Animations
   ------------------------------------------ */
function initScrollAnimations() {
  var fadeElements = document.querySelectorAll('.fade-in');

  if (!fadeElements.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    fadeElements.forEach(function (el) {
      el.classList.add('fade-in--visible');
    });
  }
}

/* ------------------------------------------
   CTA Click Tracking
   ------------------------------------------ */
function initCtaTracking() {
  var ctaButtons = document.querySelectorAll('.btn--primary[href]');

  ctaButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Fire Meta Pixel ViewContent event if available
      if (typeof fbq === 'function') {
        fbq('track', 'ViewContent', {
          content_name: 'Guia Estrategico Produtores Artesanais',
          content_type: 'product',
          value: 97.0,
          currency: 'BRL'
        });
      }

      // Fire GA4 event if available
      if (typeof gtag === 'function') {
        gtag('event', 'cta_click', {
          event_category: 'conversion',
          event_label: 'checkout_hotmart'
        });
      }
    });
  });
}

/* ------------------------------------------
   Initialize on DOM Ready
   ------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  initAccordion();
  initScrollAnimations();
  initCtaTracking();
});
