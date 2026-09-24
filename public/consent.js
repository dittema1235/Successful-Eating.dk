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
      description: 'Gemmer dit cookievalg i din browser, så siden husker det. Kan ikke slås fra.',
      required: true,
    },
    {
      id: 'analytics',
      label: 'Statistik',
      description:
        'Der er ingen statistik på siden, og dine besøg bliver ikke målt. Hvis en statistiktjeneste senere tilføjes, aktiveres den kun, hvis du siger ja her.',
      defaultValue: false,
      gtag: 'analytics_storage',
    },
    {
      id: 'marketing',
      label: 'Markedsføring',
      description:
        'Der er ingen markedsføringscookies eller pixels (fx Meta eller Google Ads) på siden. Hvis de senere tilføjes, aktiveres de kun, hvis du siger ja her.',
      defaultValue: false,
      gtag: ['ad_storage', 'ad_user_data', 'ad_personalization'],
    },
  ],
  text: {
    prompt: {
      description:
        '<p>Du bestemmer over dit privatliv. Siden bruger ingen statistik- eller markedsføringscookies. Læs vores <a href="/privatliv">privatlivspolitik</a>.</p>',
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
        '<p>Siden indlæser ingen statistik- eller markedsføringstjenester, og dit valg gemmes kun i din browser. Hostingudbyderen kan behandle tekniske oplysninger som IP-adresse og tidspunkt. Sender du kontaktformularen, går dit navn, din e-mail og din besked som e-mail til Ditte via Google Apps Script. Booking (Onlinebooq og Stripe) og tilmelding til den gratis guide (systeme.io) sker hos de tjenester, som modtager de oplysninger, du indtaster dér.</p><p>Læs mere i vores <a href="/privatliv">privatlivspolitik</a>.</p>',
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
