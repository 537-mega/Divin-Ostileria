const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

export const VENUE = {
  name: 'Divin Ostilia Wine Bar',
  address: 'Via Ostilia 4, 00184 Roma, Italia',
  street: 'Via Ostilia 4',
  city: '00184 Roma, Italia',
  phone: '+39 06 7049 6526',
  phoneHref: 'tel:+390670496526',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Ostilia+4%2C+00184+Roma',
  embedUrl:
    'https://maps.google.com/maps?q=Via%20Ostilia%204%2C%2000184%20Roma&t=&z=16&ie=UTF8&iwloc=&output=embed',
};

export const IMAGES = {
  hero: 'https://media.db.com/images/public/6ac6bb1199a347f195803d0f/73a307378_generated_image.png',
  interior: 'https://media.db.com/images/public/6ac6bb1199a347f195803d0f/5699f287d_generated_image.png',
  board: 'https://media.db.com/images/public/6ac6bb1199a347f195803d0f/e845bc332_generated_image.png',
  doorway: 'https://media.db.com/images/public/6ac6bb1199a347f195803d0f/c00b4f403_generated_image.png',
  pasta: 'https://media.db.com/images/public/6ac6bb1199a347f195803d0f/24fa67aa5_generated_image.png',
  pour: 'https://media.db.com/images/public/6ac6bb1199a347f195803d0f/3960f615a_generated_image.png',
};

export const HOURS = [
  { key: 'hours.monSat', time: '11:30 – 23:00' },
  { key: 'hours.sun', time: '11:30 – 22:30' },
];

/* "What we are known for" — edit each card's image here, and its text in i18n under sig.<key>. */
export const SIGNATURES = [
  { key: 'wine', image: IMAGES.pour, alt: 'Red wine poured into a glass' },
  { key: 'board', image: IMAGES.board, alt: 'A wooden board of prosciutto and pecorino' },
  { key: 'primi', image: IMAGES.pasta, alt: 'A bowl of cacio e pepe' },
];

/* Food carousel — swap each image and caption below. Images can be any URL. */
export const FOOD_SLIDES = [
  { image: IMAGES.pour, caption: { en: 'Wine by the glass', it: 'Vino al bicchiere' } },
  { image: IMAGES.board, caption: { en: 'Taglieri', it: 'Taglieri' } },
  { image: IMAGES.pasta, caption: { en: 'Cacio e pepe', it: 'Cacio e pepe' } },
  { image: 'https://images.unsplash.com/photo-1473093295043-cdd389562d99?auto=format&fit=crop&w=900&q=80', caption: { en: 'From the kitchen', it: 'Dalla cucina' } },
  { image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80', caption: { en: 'Roman pastas', it: 'Primi romani' } },
  { image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80', caption: { en: 'Bruschetta & focaccia', it: 'Bruschetta e focaccia' } },
  { image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80', caption: { en: 'Small plates', it: 'Piccoli piatti' } },
  { image: 'https://images.unsplash.com/photo-1467003904411-7f4c4be2f0a0?auto=format&fit=crop&w=900&q=80', caption: { en: 'Desserts', it: 'I dolci' } },
  { image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=900&q=80', caption: { en: 'Aperitivo', it: 'Aperitivo' } },
  { image: 'https://images.unsplash.com/photo-1565958011703-44f9825ba157?auto=format&fit=crop&w=900&q=80', caption: { en: 'The menu', it: 'La carta' } },
];

/* Reviews — replace the placeholder text and ratings with the real ones. */
export const TA_RATING = 4.5;
export const TA_COUNT = '1.278';
export const GOOGLE_RATING = 4.7;
export const GOOGLE_COUNT = '1.278';
export const REVIEWS_TOTAL = '2.500+';
export const REVIEWS = [
  { source: 'TripAdvisor', rating: 5, author: 'Guest', text: { en: 'Replace this with a real review — a sentence or two from the guest.', it: 'Sostituisci con una recensione vera — una o due frasi dell’ospite.' } },
  { source: 'Google', rating: 5, author: 'Guest', text: { en: 'Replace this with a real review — a sentence or two from the guest.', it: 'Sostituisci con una recensione vera — una o due frasi dell’ospite.' } },
  { source: 'TripAdvisor', rating: 5, author: 'Guest', text: { en: 'Replace this with a real review — a sentence or two from the guest.', it: 'Sostituisci con una recensione vera — una o due frasi dell’ospite.' } },
];

/* Booking rules — keep these in step with how the bar works. */
export const SEAT_CAP = 20; // seats per 30-minute slot
export const MAX_PARTY = 10; // largest party bookable online
export const CLOSED_ALL = 'all'; // value used to block a whole day

const buildSlots = (start, end, stepMinutes = 30) => {
  const toMinutes = (value) => {
    const [h, m] = value.split(':').map(Number);
    return h * 60 + m;
  };
  const slots = [];
  for (let t = toMinutes(start); t <= toMinutes(end); t += stepMinutes) {
    slots.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`);
  }
  return slots;
};

export const SLOTS = buildSlots('12:00', '22:00', 60);

export const slotLabel = (time) => {
  const [h, m] = time.split(':').map(Number);
  const end = h * 60 + (m || 0) + 60;
  return `${time} – ${String(Math.floor(end / 60)).padStart(2, '0')}:${String(end % 60).padStart(2, '0')}`;
};

export const ROME_TIME = () =>
  new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const addDaysISO = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};