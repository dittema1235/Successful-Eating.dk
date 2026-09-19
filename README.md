# Successful Eating

Dansk, statisk website for psykolog Ditte Munch-Andersen. Varmt, redaktionelt design med skovgrøn, crème og rødbrune detaljer. Bygget med Astro: alle sider, inklusive artikelarkivet, leveres som almindelig HTML med lokal CSS og lidt JavaScript.

## Kør lokalt

Kræver Node.js 22.12+ og npm.

```sh
npm ci
npm run dev
```

Lokal udvikling: `http://127.0.0.1:4321`.

```sh
npm test
npm run build
npm run check:site
npx playwright install chromium
npm run test:e2e
```

Den færdige hjemmeside ligger i **`dist/`**. Ingen applikationsserver, database eller API-nøgler er nødvendige for at servere sitet. `node scripts/serve-dist.mjs` viser den byggede version og afprøver redirects på port 4321.

## Deploy fra GitHub til Cloudflare Pages

1. Opret et **Pages**-projekt i Cloudflare, vælg Git integration og dette repository.
2. Produktionsgren: `main`. Build command: `npm run build`. Output directory: `dist`. Node-version: `22`.
3. Test først på den tildelte `*.pages.dev`-adresse. Flyt først domænet, når punkterne i [lanceringsvejledningen](docs/LANCERING.md) er afklaret.
4. `_redirects` og `_headers` kopieres automatisk fra `public/` til `dist/`. Ingen Worker eller server-rendering kræves.

Cloudflare Pages bygger selv ved push til GitHub. GitHub Actions kører separat kvalitetstjek og gemmer den statiske build som downloadbar artifact. Workflowet ændrer ikke DNS eller opretter et hostingprojekt.

GitHub Pages kan også servere HTML/CSS/JS, men behandler **ikke** Cloudflares `_redirects`/`_headers`. Brug derfor Cloudflare Pages til den planlagte domænemigrering; ellers skal redirects implementeres særskilt. Site og canonical er konfigureret til `https://www.successfuleating.dk`, ikke en GitHub Pages-understi.

## Indhold og integrationer

- To behandlingssider: `/forloebet` og `/kropsglaede`.
- 555 historiske blogartikler på deres oprindelige adresser. 10 udpegede indlæg er samlet i 5 nye kildeunderbyggede artikler med individuelle 301-viderestillinger. Alle 565 gamle blogadresser har dermed fortsat et relevant mål. Desuden 6 bevarede biblioteksadresser, 6 emnehubs og søgning.
- Kontaktoplysninger og eksterne booking-/checkout-links: `src/data/site.ts`.
- Forløb: **4.499 kr. inklusive en gratis forsamtale**, med fuld tilbagebetaling ved dårligt match ved forsamtalen. Direkte betaling hos det eksisterende systeme.io-checkout. Alternativt: **50 minutters forsamtale til 645 kr.**, som modregnes ved efterfølgende deltagelse (restbeløb 3.854 kr.).
- Sæt `PUBLIC_CONSULTATION_BOOKING_URL` til det verificerede eksterne booking-/betalingslink for forsamtalen. Uden linket tilbyder siden tydeligt en e-mailforespørgsel, hvor tid og betaling aftales med Ditte. Ingen booking eller betaling simuleres lokalt.
- `/sulteneller` bevarer guidens adresse. Sæt `PUBLIC_GUIDE_SIGNUP_URL` til en verificeret ekstern tilmeldingsside for automatisk guide/nyhedsbrev. Uden den er den tydelige fallback en **e-mailanmodning**, som ikke automatisk tilmelder nogen.
- Silktide Consent Manager er hostet lokalt med dansk tekst. Statistik og marketing er afvist som standard. Der er aktuelt ingen eksterne trackere; cookievalg kan åbnes med ikonet. Slå først automatisk banner til, hvis samtykkekrævende tjenester tilføjes.
- `se:conversion` er lokale, anonyme klik-events, som en senere samtykkestyret integration kan lytte til. De er **ikke** booking-/købsbekræftelser og sender ingen netværkskald.

## SEO, GEO og migration

Unikke titler, descriptions, canonical, Open Graph, lokale skrifttyper, responsive WebP-billeder, sitemap, robots.txt, stabil Person/Organization-identitet, Service-schema og artikelmetadata er bygget ind. Centrale artikler begynder med korte svar og kildehenvisninger. FAQ er til læserne; der loves hverken rich results eller AI-citationer.

Planen bygger på begge brugerleverede PDF-rapporter fra 19. september 2026. Se [website- og SEO-plan](docs/WEBSITE-PLAN.md), [lancering](docs/LANCERING.md) og [redaktionel gennemgang](docs/REDAKTION.md).

`src/data/legacy-posts.json` bevarer det rensede kildeindhold. `scripts/prepare-archive.mjs` laver publiceringsversion og søgeindeks med dokumenterede rettelser. En ny offentlig import kræver først de originale sitemap-/HTML-kilder; en almindelig build er fuldt reproducerbar fra Git og har ingen afhængighed af Simplero.

## Licenser og billeder

Dittes billeder er hentet fra virksomhedens eksisterende website som led i denne redesignopgave, komprimeret og hostet lokalt. Brug dem kun med rettigheder fra ejeren. Skrifttyperne DM Sans og Fraunces distribueres med deres licenser via Fontsource. Silktide er MIT-licenseret, se `public/vendor/SILKTIDE-LICENSE`. Ingen nye klientudtalelser eller anmeldelser er opfundet.
