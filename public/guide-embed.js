// Runs only inside the click-loaded embed document, before the official Systeme.io script.
(() => {
  const notify = (action) => {
    parent.postMessage({ type: 'se:guide-popup', action }, new URL(document.baseURI).origin);
  };
  window.addEventListener('message', (event) => {
    const form = document.querySelector('iframe[id^="systemeio-iframe-"]');
    if (
      event.origin !== 'https://successfuleating.systeme.io' ||
      !form ||
      event.source !== form.contentWindow
    )
      return;
    const message = event.data;
    if (!message || typeof message !== 'object') return;
    if (message.type === 'funnel_step_25559807_popup_close') notify('close');
    if (message.type === 'funnel_step_25559807_form_submit_success') notify('submitted');
    if (message.sender === form.id && Number.isFinite(Number(message.height))) notify('ready');
  });
  window.addEventListener(
    'error',
    (event) => {
      if (event.target instanceof HTMLScriptElement) notify('error');
    },
    true,
  );
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') notify('close');
  });
  window.addEventListener('load', () => {
    // Run after the provider's window.onload has attached its click handlers.
    setTimeout(() => {
      const form = document.querySelector('iframe[id^="systemeio-iframe-"]');
      if (!form) return notify('error');
      form.title = 'Guide og e-mails om overspisning';
      document.querySelector('.systeme-show-popup-25559807')?.click();
    }, 0);
  });
})();
