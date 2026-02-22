/* ============================================
   COOKIE-CONSENT.JS — LGPD Banner + Conditional Analytics
   ============================================ */

(function () {
  'use strict';

  var CONSENT_KEY = 'cookie_consent';
  var GA_MEASUREMENT_ID = 'G-SEU_ID_AQUI';
  var META_PIXEL_ID = 'SEU_PIXEL_ID_AQUI';

  /* ------------------------------------------
     Check stored consent
     ------------------------------------------ */
  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      // localStorage unavailable — consent valid for session only
    }
  }

  /* ------------------------------------------
     Load Google Analytics 4
     ------------------------------------------ */
  function loadGA4() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }

  /* ------------------------------------------
     Load Meta Pixel
     ------------------------------------------ */
  function loadMetaPixel() {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  /* ------------------------------------------
     Load all analytics
     ------------------------------------------ */
  function loadAnalytics() {
    loadGA4();
    loadMetaPixel();
  }

  /* ------------------------------------------
     Show / Hide Banner
     ------------------------------------------ */
  function showBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('cookie-banner--visible');
    }
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('cookie-banner--visible');
    }
  }

  /* ------------------------------------------
     Handle user choice
     ------------------------------------------ */
  function handleAccept() {
    setConsent('accepted');
    hideBanner();
    loadAnalytics();
  }

  function handleReject() {
    setConsent('rejected');
    hideBanner();
  }

  /* ------------------------------------------
     Initialize
     ------------------------------------------ */
  function init() {
    var consent = getConsent();

    if (consent === 'accepted') {
      loadAnalytics();
      return;
    }

    if (consent === 'rejected') {
      return;
    }

    // No consent stored — show banner
    showBanner();

    var acceptBtn = document.getElementById('cookie-accept');
    var rejectBtn = document.getElementById('cookie-reject');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', handleAccept);
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', handleReject);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
