window.dataLayer = window.dataLayer || [];
window.gtag =
  window.gtag ||
  function () {
    window.dataLayer.push(arguments);
  };
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});
window.silktideConsentManager.init({
  namespace: 'successful-eating',
  // There are currently no optional trackers. Let visitors open choices on demand.
  autoShow: false,
  consentTypes: [
    {
      id: 'necessary',
      label: 'Nødvendige indstillinger',
      description: 'Husker dine valg om privatliv. Kan ikke slås fra.',
      required: true,
    },
    {
      id: 'analytics',
      label: 'Statistik',
      description:
        'Tillad statistik, hvis en statistiktjeneste tilsluttes. Der er aktuelt ingen statistik på siden.',
      defaultValue: false,
      gtag: 'analytics_storage',
    },
    {
      id: 'marketing',
      label: 'Markedsføring',
      description:
        'Tillad markedsføringscookies, hvis en tjeneste tilsluttes. Der er aktuelt ingen markedsføringspixels.',
      defaultValue: false,
      gtag: ['ad_storage', 'ad_user_data', 'ad_personalization'],
    },
  ],
  text: {
    prompt: {
      description:
        '<p>Du bestemmer over dit privatliv. Læs vores <a href="/privatlivspolitik-og-vilkaar">privatlivspolitik</a>.</p>',
      acceptAllButtonText: 'Tillad alle',
      acceptAllButtonAccessibleLabel: 'Tillad alle valgfrie cookies',
      rejectNonEssentialButtonText: 'Kun nødvendige',
      rejectNonEssentialButtonAccessibleLabel: 'Afvis valgfrie cookies',
      preferencesButtonText: 'Tilpas valg',
      preferencesButtonAccessibleLabel: 'Åbn cookieindstillinger',
    },
    preferences: {
      title: 'Dine cookieindstillinger',
      description:
        '<p>Statistik og markedsføring er som udgangspunkt slået fra. Læs mere i vores <a href="/privatlivspolitik-og-vilkaar">privatlivspolitik</a>.</p>',
      saveButtonText: 'Gem mine valg',
      saveButtonAccessibleLabel: 'Gem dine cookieindstillinger',
      creditLinkText: 'Samtykkeværktøj fra Silktide',
      creditLinkAccessibleLabel: 'Læs om Silktide Consent Manager',
    },
  },
  prompt: { position: 'bottomRight' },
  icon: { position: 'bottomLeft' },
});
// The vendor's icon labels are not all configurable; translate them after rendering.
const translate = () => {
  for (const input of document.querySelectorAll('#stcm-form input')) {
    const label = input.closest('fieldset')?.querySelector('legend')?.textContent;
    if (label) input.setAttribute('aria-label', label);
  }
  for (const el of document.querySelectorAll('.stcm-toggle-off'))
    if (el.textContent !== 'Fra') el.textContent = 'Fra';
  for (const el of document.querySelectorAll('.stcm-toggle-on'))
    if (el.textContent !== 'Til') el.textContent = 'Til';
  document.querySelector('#stcm-icon')?.setAttribute('title', 'Åbn cookieindstillinger');
  document
    .querySelector('.stcm-modal-close')
    ?.setAttribute('aria-label', 'Luk cookieindstillinger');
  for (const el of document.querySelectorAll('#stcm-wrapper [aria-label]')) {
    const label = el.getAttribute('aria-label');
    const da = {
      'Manage consent preferences': 'Åbn cookieindstillinger',
      'Manage cookie preferences': 'Åbn cookieindstillinger',
      'Open consent preferences': 'Åbn cookieindstillinger',
      Close: 'Luk',
      'Close preferences': 'Luk cookieindstillinger',
      'Cookie preferences': 'Cookieindstillinger',
      'Cookie settings': 'Cookieindstillinger',
      'Show consent preferences': 'Åbn cookieindstillinger',
    }[label];
    if (da) el.setAttribute('aria-label', da);
  }
};
translate();
new MutationObserver(translate).observe(document.getElementById('stcm-wrapper'), {
  childList: true,
  subtree: true,
});
