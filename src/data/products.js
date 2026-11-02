// Prototype data. Later this can be replaced with data from a backend/API.

export const CATEGORIES = [
  { id: 'sukneles', label: 'Suknelės', shape: 'dress' },
  { id: 'svarkai', label: 'Švarkai', shape: 'jacket' },
  { id: 'kostiumai', label: 'Kostiumai', shape: 'jacket' },
  { id: 'marskiniai', label: 'Marškiniai ir palaidinės', shape: 'top' },
  { id: 'kelnes', label: 'Kelnės', shape: 'pants' },
  { id: 'paltai', label: 'Paltai', shape: 'coat' },
];

export const OCCASIONS = ['Vestuvės', 'Vakarėlis', 'Darbas', 'Kasdien'];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

// Rental periods in days and their discount
export const RENTAL_PERIODS = [
  { days: 4, discount: 0 },
  { days: 7, discount: 0.1 },
  { days: 14, discount: 0.2 },
];

export const products = [
  { id: 'smaragdo-suknele', name: 'Smaragdo atlaso suknelė', category: 'sukneles', occasion: 'Vestuvės', sizes: ['XS', 'S', 'M'], color: 'Smaragdo žalia', hex: '#1F7A5C', pricePerDay: 6, value: 180, material: '100 % viskozė', description: 'Ilga atlaso suknelė su plonomis petnešėlėmis. Tinka vestuvėms ir vakaro renginiams.' },
  { id: 'juoda-kokteiline', name: 'Juoda kokteilinė suknelė', category: 'sukneles', occasion: 'Vakarėlis', sizes: ['S', 'M', 'L'], color: 'Juoda', hex: '#2B2B2E', pricePerDay: 4, value: 95, material: 'Poliesteris ir elastanas', description: 'Klasikinė kelių ilgio suknelė, kurią lengva derinti su bet kokiais aksesuarais.' },
  { id: 'gelyneta-vasarine', name: 'Gėlėta vasarinė suknelė', category: 'sukneles', occasion: 'Kasdien', sizes: ['XS', 'S', 'M', 'L'], color: 'Šviesiai mėlyna', hex: '#8FB3DE', pricePerDay: 3, value: 60, material: '100 % medvilnė', description: 'Lengva medvilninė suknelė šiltoms dienoms ir savaitgalio išvykoms.' },
  { id: 'bordo-vakarine', name: 'Bordo aksominė suknelė', category: 'sukneles', occasion: 'Vakarėlis', sizes: ['M', 'L', 'XL'], color: 'Bordo', hex: '#7A1E36', pricePerDay: 5, value: 140, material: 'Aksomas', description: 'Aksominė suknelė ilgomis rankovėmis žiemos šventėms.' },
  { id: 'smelio-svarkas', name: 'Smėlio spalvos švarkas', category: 'svarkai', occasion: 'Darbas', sizes: ['S', 'M', 'L'], color: 'Smėlio', hex: '#C9AE8C', pricePerDay: 3, value: 110, material: 'Vilnos mišinys', description: 'Laisvo kirpimo švarkas, tinkantis tiek darbui, tiek susitikimams.' },
  { id: 'languotas-svarkas', name: 'Languotas vilnonis švarkas', category: 'svarkai', occasion: 'Kasdien', sizes: ['M', 'L', 'XL'], color: 'Pilka', hex: '#7D8088', pricePerDay: 3, value: 120, material: '80 % vilna', description: 'Šiltas languotas švarkas rudens dienoms.' },
  { id: 'tamsiai-melynas-kostiumas', name: 'Tamsiai mėlynas kostiumas', category: 'kostiumai', occasion: 'Vestuvės', sizes: ['M', 'L', 'XL'], color: 'Tamsiai mėlyna', hex: '#22305A', pricePerDay: 8, value: 260, material: 'Vilna', description: 'Dviejų dalių kostiumas: švarkas ir kelnės. Tinka vestuvėms, išleistuvėms ir oficialiems renginiams.' },
  { id: 'pilkas-kostiumas', name: 'Šviesiai pilkas kostiumas', category: 'kostiumai', occasion: 'Darbas', sizes: ['S', 'M', 'L'], color: 'Šviesiai pilka', hex: '#A9ADB5', pricePerDay: 7, value: 220, material: 'Vilnos ir lino mišinys', description: 'Lengvas kostiumas pokalbiams dėl darbo ir vasaros renginiams.' },
  { id: 'balti-marskiniai', name: 'Balti lininiai marškiniai', category: 'marskiniai', occasion: 'Kasdien', sizes: ['XS', 'S', 'M', 'L', 'XL'], color: 'Balta', hex: '#ECEAE4', pricePerDay: 2, value: 55, material: '100 % linas', description: 'Lietuviško lino marškiniai, tinkantys kasdien ir prie kostiumo.' },
  { id: 'silkine-palaidine', name: 'Šilkinė palaidinė', category: 'marskiniai', occasion: 'Darbas', sizes: ['XS', 'S', 'M'], color: 'Pudros rožinė', hex: '#E3B5B0', pricePerDay: 3, value: 90, material: '100 % šilkas', description: 'Švelni šilkinė palaidinė biuro ir vakaro deriniams.' },
  { id: 'dryzuoti-marskiniai', name: 'Dryžuoti marškiniai', category: 'marskiniai', occasion: 'Darbas', sizes: ['M', 'L', 'XL'], color: 'Mėlyna ir balta', hex: '#6F8FC4', pricePerDay: 2, value: 50, material: 'Medvilnė', description: 'Klasikiniai dryžuoti marškiniai su sagų apykakle.' },
  { id: 'placios-kelnes', name: 'Plačios klostuotos kelnės', category: 'kelnes', occasion: 'Darbas', sizes: ['XS', 'S', 'M', 'L'], color: 'Kreminė', hex: '#E2D7C1', pricePerDay: 2, value: 70, material: 'Viskozė', description: 'Aukšto liemens plačios kelnės su klostėmis.' },
  { id: 'velvetines-kelnes', name: 'Velvetinės kelnės', category: 'kelnes', occasion: 'Kasdien', sizes: ['S', 'M', 'L', 'XL'], color: 'Ruda', hex: '#7B5136', pricePerDay: 2, value: 65, material: 'Medvilnės velvetas', description: 'Tiesaus kirpimo velvetinės kelnės rudeniui.' },
  { id: 'kupranugario-paltas', name: 'Kupranugario spalvos paltas', category: 'paltai', occasion: 'Kasdien', sizes: ['S', 'M', 'L'], color: 'Kupranugario', hex: '#B08654', pricePerDay: 6, value: 280, material: '70 % vilna', description: 'Ilgas klasikinis paltas, kuris tarnaus daug sezonų.' },
  { id: 'juodas-paltas', name: 'Juodas vilnonis paltas', category: 'paltai', occasion: 'Vestuvės', sizes: ['M', 'L', 'XL'], color: 'Juoda', hex: '#2B2B2E', pricePerDay: 6, value: 250, material: 'Vilna ir kašmyras', description: 'Elegantiškas paltas žiemos renginiams ir šventėms.' },
  { id: 'zalias-tvido-svarkas', name: 'Žalias tvido švarkas', category: 'svarkai', occasion: 'Vakarėlis', sizes: ['XS', 'S', 'M'], color: 'Samanų žalia', hex: '#5C6B3C', pricePerDay: 4, value: 130, material: 'Tvidas', description: 'Trumpas tvido švarkas su auksinėmis sagomis.' },
];

export function getProduct(id) {
  return products.find((p) => p.id === id);
}

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

export function rentalPrice(product, days) {
  const period = RENTAL_PERIODS.find((p) => p.days === days) ?? RENTAL_PERIODS[0];
  return Math.round(product.pricePerDay * days * (1 - period.discount) * 100) / 100;
}

export function formatPrice(value) {
  return new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(value);
}
