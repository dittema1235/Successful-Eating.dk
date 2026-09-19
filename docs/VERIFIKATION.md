# Verifikation

Kontrolleret 19. september 2026 på den lokale statiske build.

- Astro/TypeScript: 0 fejl og 0 advarsler ved build.
- 617 HTML-sider; 616 indekserbare sitemap-URL'er; 38 redirectregler.
- Alle genererede sider kontrolleret for dansk sprog, én H1, title, description, selvrefererende canonical, OG og gyldig JSON-LD.
- Ingen manglende interne linkmål fundet blandt 638 lokale mål. Ukendte stier har en rigtig 404-side.
- Fire migrationstests består: URL-bevarelse, sikre HTML-importer, målrettede redaktionelle rettelser og dækning af det gamle sitemap.
- 16 Playwright-browsertests består på desktop og mobil: menu, FAQ, søgning i hele arkivet, søgefejl/retry, booking-/checkout-links, guidefallback, cookievalg, ingen eksterne trackingkald, tilgængelighed og læsning uden JavaScript.
- Axe WCAG 2 A/AA og WCAG 2.1 AA fandt ingen overtrædelser på de testede hovedsider efter rettelser. Automatiske tests er ikke en fuld tilgængelighedscertificering.
- Visuel kontrol: desktop, mobil, behandlingsside og plan-dokument. Se screenshots.
- `npm audit`: ingen kendte sårbarheder i den installerede dependency-lås ved afslutning.

## Lighthouse – forside, simuleret mobil

| Område | Score |
| --- | ---: |
| Performance | 97 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

FCP 1,7 sek., LCP 2,4 sek., TBT 0 ms, CLS 0,001. Det er en lokal laboratoriemåling med Lighthouse, ikke feltdata, en Google-placering eller en garanti for produktionshastighed. Produktionshosting og øvrige sider skal måles efter deploy. Det maskinlæsbare resumé ligger i `lighthouse-summary.json`.

## Eksterne handlinger

Systeme.io-checkout er læst i browseren uden at indsende formular, betale eller oprette en kunde. Prisen 4.499 kr. og rateplanerne var synlige. Bookinglinket går til den eksisterende Google-kalender. Der er ikke reserveret tider, sendt e-mails eller tilmeldt nogen til et nyhedsbrev.

De to sukkerkategorier er kontrolleret som eksisterende offentlige sider og får en specifik redirect til den relevante nye emnehub. Domæne/DNS og produktionshosting er ikke ændret.
