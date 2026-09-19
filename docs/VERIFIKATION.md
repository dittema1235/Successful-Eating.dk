# Verifikation

Kontrolleret 19. september 2026 på den lokale statiske build.

- Astro/TypeScript: 0 fejl og 0 advarsler ved build.
- 612 HTML-sider; 611 indekserbare sitemap-URL'er; 48 redirectregler efter den redaktionelle oprydning.
- Alle genererede sider kontrolleret for dansk sprog, én H1, title, description, selvrefererende canonical, OG og gyldig JSON-LD.
- Ingen manglende interne linkmål fundet blandt 633 lokale mål. Ukendte stier har en rigtig 404-side.
- Fem migrationstests består: URL-bevarelse, sikre HTML-importer, målrettede redaktionelle rettelser og dækning af det gamle sitemap.
- 18 Playwright-browsertests består på desktop og mobil: menu, FAQ, søgning i hele arkivet, søgefejl/retry, booking-/checkout-links, guidefallback, cookievalg, ingen eksterne trackingkald, tilgængelighed og læsning uden JavaScript.
- Axe WCAG 2 A/AA og WCAG 2.1 AA fandt ingen overtrædelser på de testede hovedsider efter rettelser. Automatiske tests er ikke en fuld tilgængelighedscertificering.
- Visuel kontrol: desktop, mobil, behandlingsside og plan-dokument. De to nye priskort er efterfølgende kontrolleret på desktop og mobil; screenshots er opdateret. Build, site-kontrol, fem migrationstests og alle 18 browsertests består igen efter prisændringerne. Browsertesten verificerer både 4.499 kr., 645 kr. / 50 minutter, modregning til 3.854 kr., tilbagebetaling og den ærlige e-mailforespørgsel. Se screenshots.
- `npm audit`: ingen kendte sårbarheder i den installerede dependency-lås ved afslutning.

## Kontrol efter redaktionel oprydning

Alle 565 oprindelige blogadresser er kontrolleret via HTTP mod den statiske build: 555 svarer 200, og 10 svarer 301 direkte til en relevant artikel med status 200. Ingen fejl. De pensionerede sider findes hverken i søgeindeks eller sitemap. De 18 browsertests kontrollerer også erstatningsartiklernes canonical, synlighed i søgningen og mobiltilgængelighed. Visuelt kontrolleret bibliotek på desktop og ny artikel på mobil; se `bibliotek-oprydning-desktop.png` og `troestespisning-mobil.png` under screenshots.

## Lighthouse – forside, simuleret mobil

| Område | Score |
| --- | ---: |
| Performance | 97 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

FCP 1,7 sek., LCP 2,4 sek., TBT 0 ms, CLS 0,001. Målingen er fra før den efterfølgende tilføjelse af de to priskort. Det er en lokal laboratoriemåling med Lighthouse, ikke feltdata, en Google-placering eller en garanti for produktionshastighed. Produktionshosting og øvrige sider skal måles efter deploy. Det maskinlæsbare resumé ligger i `lighthouse-summary.json`.

## Eksterne handlinger

Systeme.io-checkout er læst i browseren uden at indsende formular, betale eller oprette en kunde. Prisen 4.499 kr. og rateplanerne var synlige. Ejeren har derefter præciseret begge købsveje. Forsamtalens eksterne betalings-/bookinglink afventes; den aktive side tilbyder en tydelig e-mailforespørgsel. Den tidligere Google-kalender markedsføres ikke som en betalt forsamtale. Der er ikke reserveret tider, sendt e-mails eller tilmeldt nogen til et nyhedsbrev.

De to sukkerkategorier er kontrolleret som eksisterende offentlige sider og får en specifik redirect til den relevante nye emnehub. Domæne/DNS og produktionshosting er ikke ændret.
