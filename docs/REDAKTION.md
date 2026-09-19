# Redaktionel status

## Udført

- 565 offentlige blogartikler importeret med deres oprindelige stier og datoer. Dublerede gamle metadatalinjer, formularer, scripts og indlejrede frames er fjernet.
- Direkte historiske salgslinks er fjernet fra artikelbrødtekster. Udpegede vægtartikler og øvrige artikler med tydelig vægt-/slanketitel har en blød CTA til forfatterprofil/guide i stedet for behandling.
- `/blog/50416-…`: usikre buffet-/portionsstudier blev først fjernet; artiklen indgår nu i den samlede julefrokostartikel med en 301 fra den gamle URL.
- `/blog/50419-…`: Louise-citatet og udokumenterede fysiologiske udsagn fjernet i en redaktionel omskrivning.
- `/blog/50257-…`: udokumenteret 2 %-påstand fjernet.
- Seks biblioteksartikler bevarer deres URL, men har nu mere forsigtige formuleringer, kilder og tydelig redaktionel attribution. Tal om genetisk risiko, absolutte ego-depletion-/dopaminforklaringer og løfter om vægtregulering er ikke genbrugt.
- `/resultater` forklarer, hvorfor 78 %, 43 % og 29 % ikke markedsføres som dokumenterede effekter uden metodegrundlaget.
- Maria-citatet på forsiden er et ordret uddrag fra den tidligere forside, uden vægttabsudsagn og med forbehold. Der er ikke oprettet Review- eller AggregateRating-schema.

## Redaktionel oprydning efter ejerens godkendelse

Den 19. september 2026 er 10 gennemgåede indlæg erstattet af fem samleartikler. Udvælgelsen følger rapportens konkrete anbefalinger og den efterfølgende gennemgang med ejeren; den er ikke en automatisk sletning af alle tekster under en ordgrænse eller uden klik. De trafikbærende artikler og de særligt udpegede bevaringskandidater beholder deres URL.

| Ny artikel i Madro-biblioteket | Erstatter gamle artikel-id'er | Redaktionelt valg |
| --- | --- | --- |
| `troestespisning` | 50506, 63606, 50259 | Følelser, sult, støtte og madøre-identitet samlet; kategoriske forklaringer og gamle salgsafslutninger fjernet. |
| `sult-maethed-og-portionsstoerrelser` | 50258 | Portionsrefleksioner udbygget med fleksible måltider og individuel kontekst. |
| `julefrokost-uden-madstress` | 50416, 50255 | De to juleartikler samlet uden vægtløfter, rigide portionsregler eller usikre studiepåstande. |
| `tanker-og-spisning` | 50374, 50487, 50321 | Gamle rabatter, videoteaser og forklaringen om tanker som hele årsagen til overvægt erstattet. |
| `madro-og-vaegt` | 56446 | Vægttabsudtalelsen genudgives ikke. Emnet erstattes med realistiske forventninger til behandling og resultater. |

`src/data/article-migrations.json` angiver præcis gammel URL, ny URL og begrundelse. `prepare:archive` genererer 301-regler, filtrerer de pensionerede indlæg fra arkiv og søgeindeks og retter links i tilbageværende artikler direkte til erstatningerne. En almindelig build kører dette trin, så gamle indlæg ikke utilsigtet genopstår ved genimport.

Originalteksterne er bevaret i kildearkivet for sporbarhed, men de 10 sider bygges ikke og findes ikke i sitemap. De nye artikler findes i biblioteket, emneoversigterne og søgningen. Alle 565 oprindelige blogadresser testes som enten bevaret artikel eller individuel 301 til en eksisterende erstatning.

De nye tekster er mærket med redaktionen som afsender. NICE NG69, afsnit 1.4, og NIDDK's “Factors Affecting Weight & Health” er læst og kontrolleret 19. september 2026. Kliniske anbefalinger adskilles fra hverdagseksempler; julebuffetforslag fremstilles ikke som dokumenterede behandlingsgreb. Der er ikke påstået klinisk godkendelse af teksterne. Ingen nye Search Console- eller backlinkdata var tilgængelige; rapportens tal behandles som rapporterede observationer.

## Skal ikke forveksles med fuld faglig audit

De øvrige historiske artikler er bevaret som dateret arkiv. En fuld vurdering af hver påstand, kilde, omtalt person, samtykke til citater og gamle eksterne links er ikke udført. Udpegningen af Wansink-lignende udsagn i rapporten er ikke i sig selv dokumentation for ophavet til alle udsagn. Derfor bruges den ikke til at omskrive hele arkivet automatisk.

Den nye tekst er et redaktionelt udkast for virksomheden. Der angives ikke en klinisk godkendelsesdato eller en faglig reviewer, som ikke har foretaget gennemgangen. Datoen 19. september 2026 på ændrede artikler er dato for den faktiske redaktionelle ændring.

## Prioriteret videre arbejde

1. Gennemlæs de trafikbærende artikler fra rapportens URL-liste, især `/blog/101752-…`, `/blog/59762-…` og `/blog/59618-…`.
2. Vurder resten af citaterne og eventuelle sundhedspåstande i arkivet. Brug den oprindelige kildetekst i `legacy-posts.json` ved sammenligning.
3. Udbyg de seks emnehubs til dækkende hovedartikler, hvor der er et reelt vidensbehov. De er nu introduktioner og navigation, ikke 1.200–2.000-ords forskningsoversigter.
4. Sammenlæg kun artikler, når det er dokumenteret, at de dækker samme læserbehov. Angiv en konkret erstatning og en 301 for hver gammel URL; ingen blanket-redirect.
5. Nye artikler: kort svar først, naturlige underspørgsmål, brugbar refleksion, verificerbare kilder til konkrete faglige påstande, fuld attribution og relevant intern linking.

## Kilder

Begge brugerleverede PDF-rapporter, det offentlige sitemap og de oprindelige sider blev læst 19. september 2026. `legacy-import-report.json` viser den afsluttede importstatus. `editorial-changes.json` viser målrettede arkivrettelser. PDF'ernes fulde indhold og eventuelle private Search Console-oplysninger er ikke lagt i dette offentlige repository.
