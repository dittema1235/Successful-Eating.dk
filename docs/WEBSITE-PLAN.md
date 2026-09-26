# Website-, SEO- og GEO-plan

Udarbejdet 19. september 2026. Gælder det nye statiske website i `dittema1235/Successful-Eating.dk`.

## Grundlag og prioritering

Planen kombinerer **SEO-GEO-successfuleating.pdf** (8 sider, offentlig stikprøve) og **successfuleating-SEO-GEO-samlet-rapport.pdf** (47 sider, inklusive byggebeslutninger og rapporterede Search Console-data). Den detaljerede rapports seneste byggebeslutninger bruges ved konflikter; ejerens efterfølgende præcisering af pris og forsamtaler 19. september 2026 har forrang. Search Console-tal gengives ikke som selvstændigt verificerede målinger; direkte adgang til Search Console var ikke tilgængelig.

De to behandlingsforløb er overspisning/BED og kropsaccept. ADHD indgår som et videnstema og mulig hensyntagen i behandling; det markedsføres ikke som et separat forløb. Successful Eating har nationalt fokus og synligt samarbejde med den lokale psykologpraksis. Der er ikke bygget bysider eller lokale placeringspåstande.

## Mål og brugerrejser

1. Besøgende, der søger behandling: forside/artikel → relevant behandling → forløb til 4.499 kr. inkl. forsamtale → fuld tilbagebetaling, hvis forløbet ved forsamtalen vurderes som et dårligt match.
2. Besøgende, der er i tvivl: problemgenkendelse → metode og faglig profil → 50 minutters forsamtale til 645 kr. → ved efterfølgende deltagelse modregnes 645 kr., så restbeløbet er 3.854 kr.
3. Besøgende, der vil begynde forsigtigt: viden/guide → `/sulteneller` → e-mailanmodning eller ekstern samtykkestyret tilmelding.

Begge købsveje vises samlet på forsiden og behandlingssiden, med pris, garanti og modregning før klik. Priser og varighed er bekræftet af ejeren og lagres i site-data; llms.txt genereres fra samme kilde. Den tidligere gratis 15-minutters afklaring er fjernet fra den aktive brugerrejse. Forsamtalen har en tydelig e-mailforespørgsel, indtil et verificeret eksternt booking-/betalingslink er konfigureret. Priser kopieres ikke til Product-schema. Kropsaccept har et enkelt tilbud og tydelig opfordring til at få de konkrete rammer oplyst.

## Design og indhold

Skovgrøn, varm crème, afdæmpet fersken og rødbrun accent. Fraunces til overskrifter og DM Sans til brødtekst. Eget portræt, rummelig typografi, en kort navigation og gentagne relevante handlinger. To primære behandlingskort. Ingen opdigtede tilfredshedstal, nedtællinger eller garantier om vægttab.

Nye hovedsider: `/`, `/forloebet`, `/kropsglaede`, `/om-ditte`, `/resultater`, `/kontakt`, `/gratis-guide`, `/sulteneller`, `/madro-biblioteket`, `/blog`, `/privatlivspolitik-og-vilkaar`, `/privatliv`, `/terms`.

## Rapportanbefaling → implementering

| Fund | Implementering | Rest før domæneskift |
| --- | --- | --- |
| Tre telefonnumre | +45 71 41 59 69 fra den detaljerede rapport samles i site-data, footer, kontakt, schema og llms.txt | Koordinér eksterne profiler og det andet domæne |
| Modstridende priser/varighed | To ejerbekræftede købsveje, central prisdata, eksplicit tilbagebetaling og modregning. Otte uger efter aktuelt checkout | Tilknyt betalt forsamtale og afstem ekstern checkout, modregning og vilkår |
| Forkert forsidetitel og manglende descriptions | Centrale sider har unikke HTML-titler, beskrivelser, identiske OG-titler og kanoniske adresser | Search Console URL Inspection efter lancering |
| Hovedsider uden sitemap og kategorier mod noindex | Automatisk sitemap fra faktiske HTML-sider; emnehubs med egen canonical; gamle kategorier får redirects | Kontrollér Googles valgte canonical efter skift |
| Uklar personidentitet | Stabil Person/Organization-graf, fuldt navn, `/om-ditte`, krydslink til psykologpraksis og LinkedIn | Fagprofiler kan suppleres efter verifikation |
| Påstande uden tilstrækkelig dokumentation | Nye introduktioner med korte svar og NICE-kilder; de udpegede problemudsagn er nedtonet/fjernet | Faglig gennemlæsning af nyt indhold og resten af arkivet |
| Resultatprocenter uden metode | `/resultater` forklarer begrænsningerne; procenterne bruges ikke i salgstekst | Ejer kan senere levere komplette data og metode |
| Omfattende gammelt arkiv | 555 artikel-URL'er bevaret; 10 konkrete indlæg samlet i 5 artikler med 301; 6 emneindgange, søgning og datoer | Konsolidér kun efter konkret indholds- og trafikvurdering |
| Mobil/hastighed ikke målt i rapport | Statisk HTML, lokal font, responsive billeder, minimal JavaScript; mobil- og tilgængelighedstest | Feltdata efter lancering |
| Samtykke | Lokalt hostet Silktide, dansk tekst, afvist statistik/marketing som standard | Tilknyt eventuelle måleværktøjer og opdatér oplysninger, før aktivering |

## Bevidste valg i forhold til rapporterne

- Den detaljerede rapport omtaler flere steder cirka 150 blogindlæg. Det aktuelle sitemap indeholdt **565**; alle er importeret. Efter ejerens godkendelse er 10 konkret gennemgåede indlæg samlet i fem nye artikler; 555 bevarer deres adresser. De 10 gamle URL'er får relevante 301-mål. Automatisk sammenlægning alene ud fra nul klik ville være en unødvendig risiko. De seks emnehubs er klar til en senere redaktionel konsolidering.
- De seks gamle biblioteks-URL'er er bevaret og teksterne redaktionelt tilpasset. Nye introduktioner er mærket som redaktionelt indhold, ikke som en foretaget klinisk kvalitetssikring.
- FAQ anvendes for forståelighed. llms.txt er en lille, ajourført oversigt, ikke en påstået genvej til AI-synlighed.
- Momsstatus afgøres ikke af ordvalg eller schema-type. Rapportens anbefaling om at undgå undervisnings-/vægttabssprog er omsat til tydelig beskrivelse af behandling; selve klassifikationen og vilkårene er ejerens rådgivers opgave.
- Den oprindelige `/terms` er videreført med målrettet opdatering af pris og forsamtaler efter ejerens præcisering. Den modstridende 30-minuttersangivelse for den inkluderede samtale er fjernet; kun den særskilt købte forsamtale angives som 50 minutter. Et tydeligt supplement beskriver den nye hjemmesides faktiske cookie-/databrug. De eksisterende vilkårs uoverensstemmelser er registreret i lanceringsvejledningen.
- Domænegenkøb, DNS-ændringer, ændring af tredjepartsprofiler og udsendelse af e-mails er ikke udført som led i repository-opgaven.

## Måling efter lancering

Brug gennemført booking, godkendt lead og gennemført køb som resultater. Klik på guide, kontakt, booking og checkout er hjælpemål. Websitekoden udsender kun lokale events med handling og placering – aldrig navn, e-mail, søgeord, helbredsoplysninger eller transskriptioner.

Saml en baseline fra Search Console før skiftet. Følg vigtige URL'er, ikke-brand-forespørgsler, indeksering og 404-fejl de første uger. Undersøg LCP/INP/CLS i feltdata, når der er nok trafik. Hold de samme AI-spørgsmål og registreringsmetoder ved gentagelser; ingen garanti for citation eller placering.

## Næste arbejdsrunde

Den konkrete rækkefølge, de første 10 artikler, den fulde screeningsliste og kriterier for næste SEO/GEO-runde findes i [SEO-GEO-ARBEJDSPLAN.md](SEO-GEO-ARBEJDSPLAN.md). Arbejdsplanen erstatter de generelle tidsangivelser nedenfor som operationel prioritering.

## Opfølgning

- Før skift: guideintegration, pris-/vilkårskonsistens, faglig gennemgang, staging og redirects.
- Første 14 dage: sitemap og URL Inspection, trafikbærende URL'er, 404 og booking-/betalingsvej.
- Dag 15–30: 3–5 prioriterede artikler og dokumentation af personlige resultater, hvis datagrundlag findes.
- Dag 31–60: udbyg de seks emneindgange efter faktisk efterspørgsel og saml dokumenteret overlappende artikler med konkrete 301'er.
- Dag 61–90: vurder kvalificerede henvendelser, organisk trafik og faktiske AI-henvisninger; prioritér næste iteration ud fra målinger.
