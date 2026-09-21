export type ParticipantTestimonial = {
  id: string;
  name: string;
  quote: string;
};

export const participantTestimonials: ParticipantTestimonial[] = [
  {
    id: 'winnie',
    name: 'Winnie',
    quote:
      'Jeg har VIRKELIGT prøvet meget og jeg har VIRKELIG lidt af voldsomme overspisninger i mange år. Så når det kan hjælpe mig, så kan det hjælpe mange andre',
  },
  {
    id: 'mai',
    name: 'Mai',
    quote:
      'Ferie og sommerhus er nok den største højrisiko jeg kan sætte mig i, fordi hygge er forbundet med madindtag. Det er det stadig, men nu har jeg kontrollen over indtaget og jeg har hygget mig lige meget af den grund',
  },
  {
    id: 'linda',
    name: 'Linda',
    quote:
      'Det betyder meget for mig, at det her mindset ikke handler om at undvære/udelade en eller flere fødevarer- jeg kan spise lige præcis det jeg har lyst til. Hurra, det virker!!!',
  },
  {
    id: 'stella',
    name: 'Stella',
    quote:
      'Jeg er dybt taknemmelig for at have været med på kurset og anbefaler det gerne til andre. Jeg tror, at jeg for første gang i mit liv tror på, at jeg er i færd med at ændre mit forhold til mad.',
  },
  {
    id: 'jette',
    name: 'Jette',
    quote:
      'Så tak for denne gang, Ditte. Jeg vil helt klart anbefale dit forløb til andre, som har problemer med overspisning',
  },
  {
    id: 'christina',
    name: 'Christina',
    quote:
      'Jeg er så glad for, at jeg besluttede mig for dit forløb og synes, det er et super godt materiale, du har lavet. Det giver så meget mening for mig og beskriver nærmest i detaljer, hvordan jeg har det med mad',
  },
  {
    id: 'tine',
    name: 'Tine',
    quote:
      'Jeg tror ikke jeg nogensinde får brug for at deltage i andre forløb eller gå på kur igen og det er simpelthen så befriende og lykkeligt 😊',
  },
];

export function selectTestimonials(ids: string[]) {
  return ids
    .map((id) => participantTestimonials.find((testimonial) => testimonial.id === id))
    .filter((testimonial): testimonial is ParticipantTestimonial => Boolean(testimonial));
}
