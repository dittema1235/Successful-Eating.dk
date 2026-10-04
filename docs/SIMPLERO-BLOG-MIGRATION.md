# Simplero-bloggen: overførsel og SEO-kontrol

Den offentlige sitemap på `ditte-munch-andersen.simplero.com` blev kontrolleret 4. oktober 2026. Den indeholder **565 blogartikler**. Alle 565 ændringstidspunkter i sitemappen matcher de importerede kildetekster. [URL-kortet](simplero-blog-migration.json) viser kildeside, mål, titel og beslutning for hver eneste artikel.

| Beslutning                     | Antal | Implementering                                                                                                                                                                                       |
| ------------------------------ | ----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Egen side på samme sti         |   550 | Teksten findes i artikelarkivet. 12 af siderne er særskilt redaktionelt revideret; de øvrige bevarer som udgangspunkt den oprindelige tekst, renset for forældede formularer, scripts og salgslinks. |
| Samlet med en relevant artikel |    15 | Hver gammel sti har en individuel 301 til den konkrete erstatning og en begrundelse i `src/data/article-migrations.json`.                                                                            |

Kildeudtrækket ligger i `src/data/legacy-posts.json`. Det blev oprindeligt hentet via det tidligere, Simplero-hostede `www.successfuleating.dk`; derfor bruger feltet `source` i den fil det gamle domæne. Den aktuelle Simplero-sitemap har de samme 565 blogstier og ændringstidspunkter. `scripts/prepare-archive.mjs` fremstiller den offentlige version. Testen kontrollerer både alle URL-mål og, for artikler uden særskilt redaktionel revision, at mindst 90 % af ordene fra kildeudtrækket stadig findes på den publicerede artikel. Det er en kontrol mod utilsigtet tab af tekst, ikke en faglig vurdering af hver påstand.

## Læserens vej videre

På både arkivartikler og samleartikler er titlen indgangen til emnet, brødteksten giver forklaring, og kortet efter læsningen giver et konkret næste skridt. Kortet spørger direkte, om læseren mangler mere viden om mad, beskriver hvad guiden faktisk hjælper med, og linker som primær handling til `/gratis-guide/`. Behandlingssiden er et sekundært link. Formuleringen følger den vedlagte brandguide: varm, konkret og uden skam, kostregler eller løfter om hurtige resultater.

Artiklerne har egne canonical-URL'er, unikke titler og beskrivelser, `BlogPosting` eller `Article`-schema, udgivelsesdatoer og nu også Open Graph-artikelmetadata. De 10 relevante arkivbilleder er komprimeret og hostet lokalt; to døde sporingsbilleder og et dekorativt 16-pixel ikon er fjernet. Gamle Simplero-salgslinks fjernes fra arkivet, mens et link til en tidligere artikel peger direkte på den nye lokale adresse.

## Gentag kontrollen

```sh
npm run prepare:archive
npm run audit:simplero
npm test
npm run build
npm run check:site
```

`audit:simplero` henter kun den offentlige sitemap og sammenligner både URL'er og ændringstidspunkter med kildeimporten og det indcheckede URL-kort. Hvis en Simplero-artikel ændres eller en ny artikel oprettes, stopper kontrollen med en afvigelse. Brug `npm run audit:simplero -- --write` til at opdatere kortet **efter** at de ændrede artikler er importeret og har fået egne sider eller relevante sammenlægninger; gennemgå diffen før commit.

## Ved udgivelse

Denne PR ændrer kun det nye website. De oprindelige artikler ligger stadig på Simplero-domænet, så ens indhold kan findes på to domæner; en kontrolleret Simplero-artikel har fortsat canonical til sig selv. Når ændringen senere skal udgives, bør ejeren opsætte individuelle 301-viderestillinger fra Simplero-URL'erne til målene i URL-kortet eller, hvis 301 ikke er muligt, fjerne dubletindeksering via Simplero. Kontrollér den faktiske opsætning på kildedomænet efter udgivelse. Ingen ændring i denne PR er merge eller deploy.

De historiske tekster er Dittes oprindelige artikler og er bevaret som arkiv. URL- og tekstkontrollen er ikke en fuld gennemgang af alle ældre sundhedspåstande, kundecitater eller eksterne kilder; [den redaktionelle status](REDAKTION.md) skelner mellem det gennemgåede materiale og resten af arkivet.
