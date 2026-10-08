// Based on the Divin Ostilia Wine Bar menu (Via Ostilia 4, Roma).
// Replace prices and items as the kitchen changes — the page renders whatever is here.
export const MENU = [
  {
    id: 'bollicine',
    title: { en: 'Sparkling & Aperitivo', it: 'Bollicine e Aperitivi' },
    note: null,
    items: [
      {
        name: 'Prosecco di Valdobbiadene',
        desc: { en: 'Extra dry, bright, served very cold.', it: 'Extra dry, brillante, servito ben freddo.' },
        price: '7 / 28',
      },
      {
        name: 'Franciacorta Brut',
        desc: { en: 'Fine bubbles with a note of brioche.', it: 'Bolla fine con una nota di brioche.' },
        price: '9 / 40',
      },
      {
        name: 'Aperol Spritz',
        desc: { en: 'Aperol, prosecco, soda, a slice of orange.', it: 'Aperol, prosecco, soda, una fetta di arancia.' },
        price: '8',
      },
      {
        name: 'Spritz Ostilia',
        desc: { en: 'Our spritz, with bitter orange.', it: 'Il nostro spritz, con arancia amara.' },
        price: '8',
      },
    ],
  },
  {
    id: 'bianchi',
    title: { en: 'White Wines', it: 'Vini Bianchi' },
    note: { en: 'By the glass / by the bottle', it: 'Al bicchiere / alla bottiglia' },
    items: [
      {
        name: 'Frascati Superiore',
        desc: { en: 'The white of the Castelli Romani: soft, floral, easy.', it: 'Il bianco dei Castelli Romani: morbido, floreale, facile.' },
        price: '6 / 24',
      },
      {
        name: 'Bellone',
        desc: { en: 'An old Lazio grape, full of citrus and salt.', it: 'Uva antica del Lazio, piena di agrumi e sale.' },
        price: '7 / 28',
      },
      {
        name: 'Grechetto',
        desc: { en: 'Textured and savoury, almond on the finish.', it: 'Di corpo e sapido, mandorla in chiusura.' },
        price: '7 / 28',
      },
      {
        name: 'Bicchiere di vino bianco',
        desc: { en: 'House white, by the glass.', it: 'Bianco della casa, al bicchiere.' },
        price: '5',
      },
    ],
  },
  {
    id: 'rossi',
    title: { en: 'Red Wines', it: 'Vini Rossi' },
    note: { en: 'By the glass / by the bottle', it: 'Al bicchiere / alla bottiglia' },
    items: [
      {
        name: 'Cesanese del Piglio',
        desc: { en: 'The red of the Roman hills: dark fruit, a little spice.', it: 'Il rosso dei colli romani: frutto scuro e un po’ di spezia.' },
        price: '7 / 30',
      },
      {
        name: 'Nero Buono di Cori',
        desc: { en: 'Deep, warm and very local.', it: 'Profondo, caldo e molto locale.' },
        price: '8 / 32',
      },
      {
        name: 'Rosso della Casa',
        desc: { en: 'Our house red, chosen again every month.', it: 'Il nostro rosso della casa, scelto ogni mese.' },
        price: '5 / 20',
      },
      {
        name: 'Bicchiere di vino rosso',
        desc: { en: 'House red, by the glass.', it: 'Rosso della casa, al bicchiere.' },
        price: '5',
      },
    ],
  },
  {
    id: 'antipasti',
    title: { en: 'Antipasti & Boards', it: 'Antipasti e Taglieri' },
    note: null,
    items: [
      {
        name: 'Tagliere Divin Ostilia',
        desc: { en: 'Prosciutto, pecorino romano, olives, warm focaccia.', it: 'Prosciutto, pecorino romano, olive e focaccia calda.' },
        price: '18',
      },
      {
        name: 'Antipasti',
        desc: { en: 'A plate of the day’s cured meats and cheeses.', it: 'Un piatto di salumi e formaggi del giorno.' },
        price: '12',
      },
      {
        name: 'Bruschetta',
        desc: { en: 'Tomato, garlic and oil on toasted bread.', it: 'Pomodoro, aglio e olio su pane tostato.' },
        price: '5',
      },
      {
        name: 'Focaccia al Rosmarino',
        desc: { en: 'Baked twice a day.', it: 'Cotta due volte al giorno.' },
        price: '4',
      },
      {
        name: 'Patatine Fritte',
        desc: { en: 'Hand-cut, fried to order.', it: 'Tagliate a mano, fritte al momento.' },
        price: '4',
      },
    ],
  },
  {
    id: 'primi',
    title: { en: 'Roman Pastas', it: 'Primi Romani' },
    note: null,
    items: [
      {
        name: 'Cacio e Pepe',
        desc: { en: 'Pecorino and black pepper, nothing else.', it: 'Pecorino e pepe nero, nient’altro.' },
        price: '14',
      },
      {
        name: 'Carbonara',
        desc: { en: 'Egg, guanciale, pecorino, pepper.', it: 'Uovo, guanciale, pecorino, pepe.' },
        price: '15',
      },
      {
        name: 'Amatriciana',
        desc: { en: 'Guanciale, tomato, pecorino.', it: 'Guanciale, pomodoro, pecorino.' },
        price: '14',
      },
      {
        name: 'Gricia',
        desc: { en: 'Guanciale and pecorino — the mother of them all.', it: 'Guanciale e pecorino, la madre di tutte.' },
        price: '13',
      },
      {
        name: 'Lasagne',
        desc: { en: 'Baked in the oven, the way it should be.', it: 'Al forno, come deve essere.' },
        price: '13',
      },
      {
        name: 'Gnocchi al Forno',
        desc: { en: 'Baked gnocchi with tomato and mozzarella.', it: 'Gnocchi al forno con pomodoro e mozzarella.' },
        price: '13',
      },
    ],
  },
  {
    id: 'secondi',
    title: { en: 'Mains', it: 'Secondi' },
    note: null,
    items: [
      {
        name: 'Polpette',
        desc: { en: 'Roman meatballs in tomato.', it: 'Polpette romane al pomodoro.' },
        price: '12',
      },
      {
        name: 'Spigola',
        desc: { en: 'Sea bass, grilled, with vegetables.', it: 'Spigola alla griglia con verdure.' },
        price: '18',
      },
    ],
  },
  {
    id: 'dolci',
    title: { en: 'Desserts', it: 'Dolci' },
    note: null,
    items: [
      {
        name: 'Tiramisù della casa',
        desc: { en: 'Made every morning.', it: 'Fatto ogni mattina.' },
        price: '7',
      },
      {
        name: 'Crostata di visciole',
        desc: { en: 'Sour cherry tart, served warm.', it: 'Crostata di visciole, servita tiepida.' },
        price: '7',
      },
      {
        name: 'Gelato artigianale',
        desc: { en: 'Three scoops — ask for today’s flavours.', it: 'Tre gusti — chiedi quelli del giorno.' },
        price: '6',
      },
    ],
  },
];