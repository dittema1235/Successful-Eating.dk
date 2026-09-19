# SEO-, GEO- og konverteringsplan

Dato: 19. september 2026. Udgangspunkt: websiteversion `cd412dd`. Dette er næste arbejdsrunde; planen skelner mellem udført screening, kommende redaktionelt arbejde og kontrol efter lancering.

Målet er flere relevante besøgende, bedre forståelse af behandlingen og flere kvalificerede henvendelser og tilmeldinger. En teknisk score på 100 eller en bestemt tekstlængde er ikke slutmålet. Placeringer, trafikstigninger og omtale i AI-svar kan ikke garanteres.

## Status ved start

- Udført: statisk website, metadata, canonical, schema, sitemap, mobiltilpasning og tekniske tests.
- Udført: 10 indlæg samlet i fem artikler med individuelle 301-viderestillinger. 555 historiske artikler er stadig publiceret på deres oprindelige stier.
- Udført: alle 565 oprindelige blogadresser kontrolleret; 555 svarer 200, og 10 viderestiller direkte til en relevant erstatning. 18 browsertests består lokalt og i GitHub.
- Udført i denne planrunde: automatisk screening og arbejdsliste for alle 555 tilbageværende artikler i [editorial-inventory.json](editorial-inventory.json). Genkør med `node scripts/audit-editorial.mjs`.
- Ikke udført: manuel kvalitetsvurdering af hele arkivet, Dittes faglige godkendelse, ny Search Console-baseline og kontrol af det nye site på produktionsdomænet.

Screeningen finder 143 tekster under 200 ord, 17 med kampagneformuleringer, 10 med mulige vægttabs-/resultatløfter og 28 med faglige formuleringer, der bør kontrolleres i kontekst. Kategorierne overlapper. De er signaler til gennemlæsning, ikke dokumenterede fejl eller slettebeslutninger. Ingen signaler betyder heller ikke, at en artikel er fagligt godkendt. Ukendt trafik er ikke sat til nul.

## Arbejdsrækkefølge og ansvar

| Rækkefølge | Leverance | Ansvar | Færdig, når |
| --- | --- | --- | --- |
| 1 · Påbegyndt | Baseline og komplet URL-arbejdsliste | Codex; ejer leverer nye analysedata | Alle 555 artikler er registreret. Aktuelle trafikdata tilføjes privat, når de foreligger; kilder, dato og mangler er tydelige. |
| 2 · Før lancering | Fjern misvisende tilbud og ret problematiske udsagn | Codex udarbejder rettelser; Ditte vurderer fagligt indhold | De 27 kampagne-/resultatkandidater er læst manuelt; tilbud er ajourført eller fjernet, og hver ændring er begrundet. De 28 faglige signalkandidater er vurderet, med overlap registreret. |
| 3 · Første indholdsrunde | Forbedr de 10 prioriterede artikler og afklar overlap | Codex; Ditte gennemgår nye faglige formuleringer | De 10 URL'er har tydeligt formål, brugbart svar, relevante kilder, korrekt afsender og en relevant vej videre. De bevarer deres eksisterende URL. |
| 4 · Næste indholdsrunder | Gennemgå resten af de 555 artikler og udbyg emnestrukturen | Codex, i portioner på 25–40 artikler; Ditte ved faglige spørgsmål | Hver artikel har en begrundet beslutning. Sammenlægninger har færdigt mål, konkret 301 og beståede tests. Ingen masseændring alene ud fra ordtal eller nul klik. |
| 5 · Før lancering | Faglig troværdighed, køb, forsamtale og guide | Codex implementerer; Ditte/ejer bekræfter oplysninger og leverer eksterne links | De prioriterede sider er fagligt gennemgået. Pris, betingelser og eksterne købsveje hænger sammen. Alle kundens næste skridt virker som beskrevet. |
| 6 · Ved og efter lancering | Produktionskontrol og måling af SEO/GEO og tilmeldinger | Codex med relevant adgang; ejer/hostingansvarlig ved domæne og udbydere | URL'er, indeksering, formular-/betalingsveje og mobilhastighed er kontrolleret på produktion. Opfølgning har faktiske målinger og tydelige begrænsninger. |

Runde 2 og 3 prioriteres før en større udvidelse af biblioteket. Runde 4 kan gennemføres løbende; en fuld manuel gennemgang af 555 artikler er større end en enkelt omskrivningsrunde. Manglende Search Console-data hindrer ikke kildekontrol eller fjernelse af dokumenterbart udløbne tilbud, men begrænser beslutninger om at pensionere URL'er.

## Første 10 artikler

Rækkefølgen bygger på rapportens prioriteringer, kendte søgesignaler og relevans for behandlingen. Rapportens Search Console-tal er historiske, ikke selvstændigt verificeret i denne session. Detaljerede analysedata opbevares uden for det offentlige repository.

| Prioritet | Eksisterende artikel | Konkret arbejde |
| --- | --- | --- |
| 1 | [Sådan stopper du med at overspise om aftenen](https://www.successfuleating.dk/blog/101752-saadan-stopper-du-med-at-overspise-om) | Bevar URL som hovedartikel om aftenspisning. Kontroller forklaringer og kilder, styrk det direkte svar, fjern gentagelser og afklar overlap med den nye aftenintroduktion. |
| 2 | [Hjælp til overspisning](https://www.successfuleating.dk/blog/59618-hjaelp-til-overspisning) | Gør det let at forstå muligheder for hjælp, hvornår læge er relevant, og forskellen på generel information og Dittes konkrete tilbud. Hold siden adskilt fra salgssiden. |
| 3 | [Behandling af sukkerafhængighed eller afhængighed af mad](https://www.successfuleating.dk/blog/59762-sukkerafhaengighed-eller-afhaengighed-af-mad) | Nuancér afhængighedsbegrebet; adskil oplevet trang, BED og forskningshypoteser. Underbyg udsagn og afgræns, hvad forskningen kan sige. |
| 4 | [Hvad sker der i hjernen, når du spiser sukker, fedt og salt?](https://www.successfuleating.dk/blog/50527-hvad-sker-der-i-hjernen-naar-du-spiser) | Gennemgå neurobiologiske forklaringer. Skeln mellem dyreforsøg og viden om mennesker. Undgå en simpel dopaminforklaring på alle spisemønstre. |
| 5 | [Ædeflip, madorgier og overspisninger – er der forskel?](https://www.successfuleating.dk/blog/50375-aedeflip-madorgier-og-overspisninger-er) | Definér begreber præcist og respektfuldt, forklar grænsen til en diagnose og giv et tydeligt næste skridt ved kontroltab. |
| 6 | [Er du bange for at føle sult?](https://www.successfuleating.dk/blog/50318-er-du-bange-for-at-foele-sult) | Udbyg sult, restriktion og regelmæssig spisning med individuel kontekst; undgå universelle kostregler. |
| 7 | [Det alkoholikere og sukkerafhængige har til fælles](https://www.successfuleating.dk/blog/50601-det-alkoholikere-og-sukkerafhaengige-har) | Kontroller analogien og omskriv titel og indhold, hvor sammenligningen bliver misvisende. URL bevares. |
| 8 | [Men kan jeg så aldrig gå all in på sushi?](https://www.successfuleating.dk/blog/56441-men-kan-jeg-saa-aldrig-gaa-all-in-paa) | Gør den korte refleksion mere nyttig om fleksibilitet og social spisning, uden at presse den op på et bestemt ordtal. |
| 9 | [Hvis skyld er det?](https://www.successfuleating.dk/blog/50507-hvis-skyld-er-det) | Mere beskrivende titel og description, kildekontrol af alt-eller-intet-mønstret og relevante links til restriktion og trøstespisning. |
| 10 | [Hvordan vil det være at hade din krop resten af livet?](https://www.successfuleating.dk/blog/50565-hvordan-vil-det-vaere-at-hade-din-krop) | Mere omsorgsfuld titel, uddybning af kropskritik, ingen presbaseret salgstekst og tydeligt link til kropsaccept. |

## Én tydelig rolle til hver vigtig side

- `/forloebet`: det konkrete behandlingstilbud, målgruppe, format, opstart, pris og vilkår. `/blog/59618-…`: uafhængigt forståelig vejledning om at søge hjælp og de relevante muligheder.
- `/blog/101752-…`: hovedartikel om aftenspisning. Sammenlign med `/madro-biblioteket/overspisning-om-aftenen`. Flyt eventuel unik, nyttig tekst ind i hovedartiklen og giv introduktionen en 301 dertil, hvis den ikke har en særskilt læseropgave. Dette er en planlagt redaktionel beslutning, endnu ikke implementeret.
- `/blog/59762-…`: nuanceret hovedartikel om sukker-/madafhængighed. `/madro-biblioteket/tanker-og-spisning`: praktisk arbejde med tankemønstre. Siderne skal have forskellige spørgsmål og tydelige krydslinks.
- `/madro-biblioteket/troestespisning`: følelser og spisning. `/madro-biblioteket/hvad-er-madro`: begrebsforklaring. `/kropsglaede`: behandling af kropskritik. Undgå at gøre dem til næsten ens generelle salgssider.
- Seks emneoversigter skal introducere emnet og fremhæve de bedste artikler først. De skal ikke hver især blive en kopi af hovedartiklen eller blot en lang liste over alle gamle indlæg.

Interne links skal pege direkte på den aktuelle canonical-side. Sammenlægning kræver samme læserbehov og bevarelse af nyttigt indhold; beslægtede emner alene er ikke tilstrækkeligt. Længdekrav eller bestemte antal søgeordsforekomster bruges ikke som kvalitetsmål.

## Metode til resten af arkivet

For hver artikel registreres: eksisterende URL, emne, søgeintention, primær læseropgave, trafik/backlinks hvis kendt, konkret indholdsproblem, kildebehov, beslutning, eventuel erstatning og status for faglig gennemgang. Arbejdslisten er påbegyndt med URL, længde, emne og screeningssignaler; de øvrige felter kræver manuel læsning og aktuelle data.

Beslutningerne er: behold; forbedr på samme URL; saml i en navngiven artikel; eller pensionér, hvis indholdet ikke har et relevant formål. En 301 bruges kun til en relevant erstatning. Findes ingen relevant erstatning, vurderes 404/410 konkret efter trafik- og backlinkkontrol; ingen generel redirect til forsiden og ingen automatisk noindex af korte tekster.

De 27 kampagne-/resultatkandidater får en tidlig gennemgang. Eksempler er gamle nytårsrabatter, tidsbegrænsede pladser, tidligere 50-dages tilbud og klienthistorier med kiloresultater. Betalingslinket kan allerede være fjernet, selv om salgsteksten stadig står tilbage. Det er derfor brødteksten, ikke kun links, der skal gennemgås.

Hver portion på 25–40 artikler afsluttes med en ændringsoversigt, opdateret migrationsliste og kontrol af links, sitemap, søgning og metadata. Manuelle vurderinger gemmes i en separat beslutningslog med URL som nøgle, når den første gennemlæsning begynder. `editorial-inventory.json` er en dateret, automatisk screening; den må ikke bruges som lagring af manuelle beslutninger, fordi screeningsscriptet gendanner filen. Status i beslutningsloggen ændres først efter en konkret vurdering.

## Redaktionel kvalitet og GEO

Alle centrale artikler skal besvare det vigtigste spørgsmål tidligt, bruge forståelige danske underoverskrifter og tydeligt skelne mellem generel viden, praktiske forslag og individuel behandling. Beslægtede spørgsmål dækkes, hvor det hjælper læseren; der tilføjes ikke FAQ alene for schemaets skyld.

Konkrete faglige påstande kobles til læste, relevante kilder. En retningslinje om BED bruges ikke som belæg for alle påstande om dopamin, hormoner eller vægttab. Citater skal være korrekte, have afklaret brugsgrundlag og må ikke præsenteres som typiske resultater uden data. Deltagerundersøgelsens procenter genindføres kun med et tilstrækkeligt metodegrundlag.

Forfatter, redaktør og faglig reviewer skal afspejle faktiske roller. Ditte gennemgår især diagnostiske afgrænsninger, forklaringer, behandlingsanbefalinger og begrænsninger. Først derefter kan siden angive en reel faglig godkendelse og dato. En teknisk migration må ikke fremstilles som en faglig opdatering.

Kontroller Dittes verificerbare uddannelse og professionelle profiler, og forbind relevante afsenderoplysninger på `/om-ditte`, artikelbylines og schema. Organisationens kontaktoplysninger skal være konsistente. Der opfindes ikke titler, medlemskaber, forskning, anmeldelser eller ekspertgodkendelser. `llms.txt` vedligeholdes som indholdsoversigt; det er ikke en garanti for AI-synlighed.

## Tilmelding og køb

De eksisterende priser og købsveje er fastlagt: 4.499 kr. inklusive gratis forsamtale og fuld tilbagebetaling ved dårligt match ved forsamtalen; alternativt 50 minutter til 645 kr., som modregnes ved efterfølgende deltagelse. Restbeløbet er 3.854 kr.

- Tilknyt det verificerede eksterne link til forsamtalen via `PUBLIC_CONSULTATION_BOOKING_URL`. Kontrollér pris, 50 minutter, bekræftelse og den faktiske modregning hos udbyderen.
- Tilknyt guide/nyhedsbrev via `PUBLIC_GUIDE_SIGNUP_URL`. Kontrollér samtykke, guidelevering, kvittering og afmelding. E-mailforespørgslen er den aktuelle fallback; den må ikke tælles som en tilmelding.
- Afstem det eksterne checkout og handelsbetingelserne, herunder den modstridende varighed på den inkluderede forsamtale. Varigheden opfindes ikke på hjemmesiden.
- Bekræft kropsacceptforløbets pris, format og rammer før eventuel visning af konkrete tal.
- Mål særskilt på klik, gennemført forsamtalekøb, gennemført forløbskøb og bekræftet guidetilmelding. Klik er ikke konverteringer. Afklar, om udbyderen leverer bekræftelser/eksport, og hvilken måling der kræver samtykke. Ingen helbredsoplysninger eller e-mailadresser i almindelige analytics-events.

## Kontrol før og efter lancering

Før domæneskift: staging med korrekt noindex-header, gennemgang af vigtige sider og nye faglige tekster, fungerende køb/forespørgsler, dokumenteret DNS-udgangspunkt og tilbageførselsmulighed. Viderestillinger og ukendte 404-adresser testes på den valgte hosting, ikke kun lokalt. Cloudflare-reglerne virker ikke på GitHub Pages alene.

Ved lancering: korrekt HTTPS og www/apex-retning, fjernelse af utilsigtet noindex på produktion, kontrolleret robots.txt og WAF-adgang for de relevante søgecrawlere, canonical til det faktiske domæne, sitemap uden pensionerede URL'er og ingen adgang til private medlems-/patientoplysninger. Anmeld sitemap i Search Console og Bing Webmaster Tools med den nødvendige ejeradgang. Brug URL Inspection på de vigtigste sider, hvor værktøjet understøtter det.

Lokal build, links og browserkontroller skal bestå for hver indholdsrunde. På produktion måles mobiloplevelse og Core Web Vitals. Sigt mod gode feltværdier ved 75-percentilen: LCP højst 2,5 s, INP højst 200 ms og CLS højst 0,1, når der er tilstrækkeligt datagrundlag. Lokale laboratorietests og manglende feltdata rapporteres særskilt.

## Måleplan

| Tidspunkt | Kontrol | Beslutning |
| --- | --- | --- |
| Før lancering | Seneste 90 dage og længere historik fra Search Console; side- og søgeordsdata, brand/ikke-brand, mobil og land. Backlinks hvis tilgængelige. | Fastlæg baseline og beskyt dokumenteret værdifulde URL'er. Gem rå analysedata privat. |
| Dag 1–14 efter lancering | Indeksering af prioriterede sider, utilsigtet noindex, 404, redirectkæder og eksterne købsveje. | Ret konkrete migrationsfejl hurtigt. Vurder ikke redaktionel succes ud fra få dages placeringer. |
| Dag 28 og 56 | Sammenlign ens perioder og dokumentér sæsonforhold; relevante visninger, klik, CTR, landingssider og bekræftede konverteringer. | Vælg næste indholdsportion efter dokumenterede muligheder. Små datamængder kræver forsigtighed. |
| Dag 90 | Organiske kvalificerede henvendelser, tilmeldinger, køb, trafik til hovedartikler og de tekniske felttal, der faktisk findes. | Prioritér næste forbedringsrunde. Sæt talmål ud fra baseline frem for at opfinde vækstprocenter nu. |

GEO følges med disse 12 faste danske spørgsmål, to for hvert af de seks hovedemner:

| Emne | Spørgsmål 1 | Spørgsmål 2 |
| --- | --- | --- |
| Overspisning | Hvorfor overspiser jeg om aftenen? | Hvor kan jeg få psykologisk hjælp til overspisning online i Danmark? |
| Madstøj og trøstespisning | Hvad er madstøj? | Hvad er forskellen på trøstespisning og BED? |
| Sukkertrang | Er sukkerafhængighed en diagnose? | Hvordan håndterer jeg sukkertrang uden nye madforbud? |
| ADHD | Hvordan kan ADHD påvirke spisning? | Hvilken hjælp findes til overspisning, når man har ADHD? |
| Kropsbillede | Hvordan får jeg hjælp til kropskritik? | Kan jeg få psykologisk behandling med fokus på kropsaccept online? |
| Social spisning | Hvordan håndterer jeg julefrokoster uden madstress? | Hvad kan jeg gøre med dårlig samvittighed efter en stor middag? |

Registrér tjeneste, dato, præcis forespørgsel, kilde-URL'er og om omtalen er relevant og korrekt. Mål citation og verificerbar henvisningstrafik separat. Gentag under så ens forhold som muligt, og angiv variation og manglende data; dette er en observationsmetode, ikke en autoritativ GEO-score. Robots-adgang eller schema alene tæller ikke som synlighed.

Kontroltidspunkterne er en arbejdsplan. Der er ikke oprettet automatiske rutiner eller udsendelser.

## Afhængigheder og hvad der kan laves nu

Codex kan fortsætte med manuel læsning, kildekontrol, omskrivninger, interne links, metadata og kodekontroller med det nuværende materiale. Ditte/ejer skal bidrage med faglig gennemgang, bekræftede oplysninger om kropsaccept, det betalte forsamtalelink, guideintegration og eventuel dokumentation for resultater. Seneste Search Console-data og adgang til hosting/udbydere forbedrer prioritering og er nødvendige for at verificere deres faktiske produktionsopsætning.

Disse afhængigheder stopper ikke arbejdet med resten af indholdet. Der angives ikke godkendelse, automatisk guidelevering, modregning eller måledata, før de faktisk er på plads. Fuld SEO/GEO-optimering er løbende arbejde; denne runde er færdig, når de konkrete leverancer ovenfor er verificeret og den resterende arbejdsliste er tydelig.

## Kilder og sporbarhed

Grundlag: de to brugerleverede rapporter, `SEO-GEO-successfuleating.pdf` og `successfuleating-SEO-GEO-samlet-rapport.pdf`, især afsnittene om migrering, URL-prioritering, emneklynger og måling; ejerens efterfølgende præciseringer; det faktiske repository og screeningslisten fra 19. september 2026.

Se også [den oprindelige websiteplan](WEBSITE-PLAN.md), [udført redaktionel oprydning](REDAKTION.md), [lancering](LANCERING.md) og [verifikation](VERIFIKATION.md). Rapportens skøn over cirka 150 gamle artikler erstattes af den faktiske inventarliste på 565 oprindelige URL'er. Private rapporter og rå Search Console-data publiceres ikke i repository.

## Udført: første redaktionelle indholdsrunde, 19. september 2026

- De 10 prioriterede artikler er omskrevet på eksisterende URL'er med forskellige søgeformål, direkte svar, konkrete forslag, kilder og videre hjælp. Publiceringsdatoerne er bevaret; opdateringer har redaktionel afsender og separat ændringsdato. Dette er ikke Dittes kliniske godkendelse.
- Fem yderligere indlæg er samlet: 116291 → hovedartikel om skyld; 116119 og 92036 → trøstespisningsguiden; 89451 og 89212 → madro og vægt. Brugbare pointer er indarbejdet; udløbne tilbud og generalisering af kunders vægttab er fjernet fra disse tekster.
- Den nye aftenintroduktion er samlet i den eksisterende 101752-artikel med en direkte 301. Emneside og llms.txt henviser direkte til originaladressen.
- I alt er nu 15 oprindelige blogindlæg erstattet med relevante 301'er, og 550 originale blogadresser har fortsat en artikel. Beslutninger findes i `editorial-decisions.json`; publiceringsrettelser vedligeholdes i `src/data/editorial-overrides.json`. Originalimporten er bevaret.
- Sukkerartiklerne henviser til Westwater et al. (2016), DOI 10.1007/s00394-016-1229-6, med tydelig afgrænsning af dyreforsøg og menneskelig evidens. Abstract verificeret via Europe PMC. Kliniske behandlingsafsnit bygger på NICE NG69. Ingen systematisk litteraturgennemgang påstås.

Restarbejde: De øvrige kampagne- og faglige signalkandidater samt det resterende arkiv skal stadig gennemgås manuelt i de planlagte portioner. Den oprindelige screeningsfil ovenfor er en baseline og skal ikke læses som en liste over færdigbehandlede URL'er. En fuld faglig godkendelse, produktionskontrol og måling kræver fortsat Ditte og de relevante adgange. Korte artikler er ikke automatisk kandidater til sletning.

Validering af den isolerede Git-version: build og Astro check bestået; 7 indholds-/migrationstests og 22 browsertests bestået på desktop/mobil, inklusive uden JavaScript. Sitekontrol: 605 HTML-sider, 604 sitemap-URL'er, 54 redirectregler og ingen fundne fejl. Viderestillinger er afprøvet i den lokale statiske server; faktisk produktionshosting er ikke verificeret i denne runde.
