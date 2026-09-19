# Lancering og drift

## Leverancen er statisk

`npm ci && npm run build` giver en `dist/`-mappe med HTML, CSS, JavaScript og mediefiler. Bygningen bruger kun det committed indhold. Browseren behøver hverken React, en database eller en server for at læse siderne. GitHub Actions verificerer koden; Cloudflare Pages kan bygge og udgive direkte fra repository.

## Opsæt Cloudflare Pages

- Repository: `dittema1235/Successful-Eating.dk`.
- Produktionsgren: `main`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Node: `22` (mindst 22.12), valgt via den committed `.nvmrc`. Hvis Cloudflare har en manuel `NODE_VERSION`-variabel, skal den være `22`, ikke `20`.
- Root directory: repository-roden (lad feltet være tomt).
- Framework preset: `Astro` eller `None` med ovenstående build/output. Vælg et **Pages**-projekt, ikke en Worker.
- Ingen hemmelige miljøvariabler er påkrævet.
- Valgfri `PUBLIC_CONSULTATION_BOOKING_URL`: verificeret ekstern HTTPS-side til 50 minutters forsamtale til 645 kr. Uden den bruges en tydelig e-mailforespørgsel.
- Valgfri `PUBLIC_GUIDE_SIGNUP_URL`: en verificeret ekstern HTTPS-side til guide/nyhedsbrev. Må ikke pege på sitets egen `/sulteneller`.

Behold det gamle site, mens det nye afprøves på Pages-adressen. En egentlig preview-distribution bør sætte `X-Robots-Tag: noindex` på `*.pages.dev` via hostingkonfiguration; produktionssiderne skal være indekserbare. Canonical peger allerede på det endelige domæne. Bekræft www/apex-redirect én gang på Cloudflare; undgå kæder.

## Hvis GitHub viser “Deploy Astro site to Pages” som fejlet

Det workflow udgiver på GitHub Pages og er separat fra Cloudflare Pages. Den konstaterede fejl i run `35459429821` var `Node.js v20.20.2 is not supported by Astro`, fordi skabelonen valgte Node 20. Workflowet bruger nu `.nvmrc` (Node 22) og hele `npm run build`. Det kører kun manuelt; den planlagte automatiske udgivelse sker gennem Cloudflares Git-integration. GitHubs `Verify static website` fortsætter ved hvert push.

I Cloudflare: Åbn **Workers & Pages**, opret et **Pages**-projekt, og forbind `dittema1235/Successful-Eating.dk`. Brug `main`, `npm run build` og `dist`. Test Pages-adressen før domæneskift. En fejl i Cloudflare skal læses i det pågældende projekts buildlog; GitHub Pages-loggen beskriver en anden udgivelsesvej. Node-advarsler om selve GitHub Actions og meddelelsen om Ubuntu-image er ikke den konstaterede buildfejl.

## Konkrete punkter før domæneskift

1. **Guide/nyhedsbrev:** Den eksisterende Simplero-guide blev fundet på `/sulteneller`, men dens tilmelding er bundet til den gamle platform. Ny side bevarer stien og tilbyder en ærlig e-mailanmodning, indtil ekstern opt-in er konfigureret. Der vises aldrig en falsk tilmeldingsbekræftelse. Kontrollér derefter samtykke, kvitteringsmail, guidelevering og afmelding med en ejerautoriseret testadresse.
2. **Aktuelt checkout:** `https://successfuleating.systeme.io/4b00a70d` blev verificeret som det eksisterende otteugers forløb. Det beskriver en **50-minutters** forsamtale øverst og en **30-minutters** forsamtale i garantiteksten. Ejeren har efterfølgende bekræftet forløbsprisen 4.499 kr. inkl. gratis forsamtale og fuld tilbagebetaling ved dårligt match samt særskilt forsamtale på 50 minutter til 645 kr. med modregning. Sitet følger denne præcisering; ret uoverensstemmelserne hos udbyderen. Varigheden af den inkluderede forsamtale angives ikke på det nye site. Kontrollér den endelige samlede pris og antal rater i en normal browser før et eventuelt køb; ingen køb blev udført i denne opgave.
3. **Vilkår:** `/terms` er videreført med målrettet præcisering af de ejerbekræftede priser, 50-minutters selvstændig forsamtale og modregning. Den gamle 30-minuttersangivelse for den inkluderede forsamtale er fjernet. Øvrige historiske vilkår er bevaret og bør afstemmes med de aktuelle tilbud. Afsnit om Analytics/Meta beskriver det gamle setup; det nye site indlæser ingen af delene, og `/privatliv` forklarer dette. Ændring af juridiske vilkår bør ske med ejerens rådgiver.
4. **Kropsaccept:** Siden har ét individuelt tilbud og ingen opdigtet pris. Bekræft samlet pris, antal samtaler, varighed og eventuelle tilkøb, og opdatér både side og betalingsvilkår samlet.
5. **Fagligt indhold:** Læs nye tekster og de seks reviderede biblioteksartikler igennem. De fem nye samleartikler er redaktionelle udkast med faglige kilder. De 555 tilbageværende historiske artikler er ikke erklæret klinisk kvalitetssikret. Se `REDAKTION.md`.
6. **Booking:** Tilknyt det bekræftede booking-/betalingslink for forsamtalen til 645 kr. Det gamle link til gratis afklaring bruges ikke. Indtil da beder kunden tydeligt om tid og betalingsoplysninger via e-mail. Kontrollér varighed (50 minutter), ledige tider, betaling og bekræftelsesmail. Sørg for, at 645 kr. faktisk modregnes ved efterfølgende køb: restbeløb 3.854 kr., samlet 4.499 kr. Der er ikke opsat automatisk modregning eller tilbagebetaling hos den eksterne udbyder som del af denne websiteopgave.
7. **Konverteringsmåling:** Tilknyt først en eventuel analyseleverandør efter beslutning om samtykke og databehandling. Knyt bekræftede køb/bookinger til udbyderens bekræftelsesside, ikke til klik på en knap. Ingen person- eller helbredsoplysninger i events.
8. **Teknik:** Kør alle kommandoer i README, tjek redirects på Pages, og kontrollér mobil/tastatur. Cloudflare-regler virker ikke automatisk på GitHub Pages.

## SEO-overgang

- `docs/legacy-url-inventory.json` er en offentlig URL-inventarliste, ikke et Search Console-udtræk.
- Af de 565 gamle blogstier bevares 555 som artikler; 10 får individuelle 301-viderestillinger til fem nye samleartikler. De seks eksisterende biblioteksstier bevares. Der er ingen blanket-redirect af blogarkivet til forsiden.
- Nedlagte behandlingsstier peger på det samlede forløb; kategorier går til emne-/arkivsidernes korrekte canonical.
- `/page/293522` blev læst og identificeret som en ældre vægttabsforløbsside, og peger derfor specifikt på `/forloebet`.
- `/courses/*` peger midlertidigt til eksisterende Simplero-login frem for at skjule eksisterende kunders adgang i et blogarkiv. Afklar med ejeren, hvornår gamle medlemsadgange kan udfases.
- Indsend `https://www.successfuleating.dk/sitemap-index.xml`. `/sitemap.xml` har en 301 dertil.
- Ukendte URL'er returnerer 404. Ingen SPA-fallback og ingen generel redirect til forsiden.
- Domænerne dittema.dk og slankepsykologen.dk er ikke registreret, købt eller ændret her. Hvis de genkøbes, skal redirects oprettes på deres egen zone med korrekt HTTPS.

## Tilbageførsel

Bevar den gamle Simplero-opsætning indtil kontrolperioden er afsluttet. En Cloudflare Pages-release kan rulles tilbage til en tidligere build; DNS kan føres tilbage til det dokumenterede tidligere mål ved behov. Eksportér DNS før en ændring. Ingen DNS eller produktionsdeploy blev udført som del af denne kodeleverance.
