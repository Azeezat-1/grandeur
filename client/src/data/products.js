const FOLDERS = { kaftans: 'kaftan', agbada: 'agbada', suits: 'suit', caps: 'caps' }
const photo = (category, file) => `/photos/${FOLDERS[category]}/${file}`

const KAFTAN_FILES = [
  '469005918_18371848198115127_1840532585173048531_n.jpg',
  '474179295_458659130648566_4987006008118321141_n.jpg',
  '484166623_18385775029115127_7949971659973677005_n.jpg',
  '484251686_18386147107115127_5517111928484557718_n.jpg',
  '532709071_18407999215115127_953918901769511150_n.jpg',
  '637171710_18439473046115127_677242637587550100_n.jpg',
  '670599946_18449530771115127_8570854658278768772_n.jpg',
  '670652932_18448778206115127_7383275382912532880_n.jpg',
  '671814988_18449530753115127_2053033403780742108_n.jpg',
  '673118362_18449840638115127_5468456342578098618_n.jpg',
  '683758802_18451030330115127_9090613380133934334_n.jpg',
]

const AGBADA_FILES = [
  '468638126_18371867122115127_6050702171287759176_n.jpg',
  '468899360_18371853574115127_5706216597433361997_n.jpg',
  '470230684_431702050010941_3961850809088119725_n.jpg',
  '472231890_445906608590485_8925906217239826626_n.jpg',
  '482529554_18384971929115127_6074136541522746366_n.jpg',
  '482607529_18384883639115127_3619556020001289544_n.jpg',
  '482729452_18384734860115127_3308585975266185916_n.jpg',
  '484303230_18386054032115127_1426785170446595455_n.jpg',
  '488609268_18390734812115127_3730262705908840077_n.jpg',
  '489851709_18391036603115127_2395397736292710402_n.jpg',
  '491417480_18391426582115127_6895553817828692143_n.jpg',
  '491444990_18393003910115127_893247681069235983_n.jpg',
  '491447892_18393876901115127_6210165095652325258_n.jpg',
  '495327240_18394636888115127_7535404730061133773_n.jpg',
  '497080353_18395575135115127_4973232226941796936_n.jpg',
  '497093000_18395336536115127_339473896622220296_n.jpg',
  '497393825_18395690929115127_1667450883187397981_n.jpg',
  '498134117_18395966638115127_5672086864893682746_n.jpg',
  '542364771_18410761897115127_1072053033904063159_n.jpg',
  '557358807_18415228465115127_2700883447488426798_n.jpg',
  '681266095_18451178242115127_996054351294477405_n.jpg',
  '690633562_821196657728143_5159682173772358953_n.jpg',
]

const SUIT_FILES = [
  '466018795_18368563024115127_8237044931393756195_n.jpg',
  '466137379_18368563042115127_7024856634949907475_n.jpg',
  '468094568_18371018878115127_4033784243345210679_n.jpg',
]

const CAP_FILES = [
  '512765680_574242359090242_3912759996769258010_n.jpg',
  '513079191_574242352423576_1914461248101949094_n.jpg',
  '513191212_574242292423582_7480774602880140582_n.jpg',
  '513196921_574242312423580_4682858373612574224_n.jpg',
  '513282874_574242289090249_6157208802360966715_n.jpg',
  '513885727_574242319090246_152259844686206059_n.jpg',
]

export const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Kaftans', slug: 'kaftans' },
  { name: 'Agbada', slug: 'agbada' },
  { name: 'Suits', slug: 'suits' },
  { name: 'Caps', slug: 'caps' },
]

const NAMES = {
  kaftans: [
    'Classic Kaftan',
    'Royal Embroidered Kaftan',
    'Ceremonial Kaftan',
    'Signature Kaftan',
    'Everyday Kaftan',
    'Statement Kaftan',
    'Evening Kaftan',
    'Heritage Kaftan',
    'Atelier Kaftan',
    'Modern Kaftan',
    'Grand Kaftan',
    'Noble Kaftan',
    'Emperor Kaftan',
    'Ivory Kaftan',
    'Velvet Kaftan',
    'Urban Kaftan',
    'Festive Kaftan',
    'Refined Kaftan',
    'Mandarin Kaftan',
  ],
  agbada: [
    'Classic Embroidered Agbada Set',
    'Royal Agbada Set',
    'Ceremonial Agbada Set',
    'Signature Agbada Set',
    'Statement Agbada Set',
    'Evening Agbada Set',
    'Heritage Agbada Set',
    'Atelier Agbada Set',
    'Modern Agbada Set',
    'Grand Agbada Set',
    'Noble Agbada Set',
    'Festive Agbada Set',
    'Refined Agbada Set',
    'Executive Agbada Set',
    'Premier Agbada Set',
    'Elegant Agbada Set',
    'Majestic Agbada Set',
    'Distinct Agbada Set',
    'Timeless Agbada Set',
    'Regal Agbada Set',
    'Essential Agbada Set',
    'Select Agbada Set',
    'Bespoke Agbada Set',
    'Deluxe Agbada Set',
    'Embroidered Agbada Set',
    'Metropolitan Agbada Set',
    'Distinguished Agbada Set',
    'Treasured Agbada Set',
    'Accented Agbada Set',
    'Celebration Agbada Set',
  ],
  suits: ['Sartorial Two-Piece Suit', 'Executive Three-Piece Suit', 'Contemporary Two-Piece Suit'],
  caps: ['Festival Cap', 'Embroidered Cap', 'Classic Crown Cap', 'Statement Cap', 'Designer Cap', 'Refined Cap'],
}

const PRICES = {
  kaftans: [86000, 98000, 112000, 124000, 135000, 145000],
  agbada: [185000, 205000, 225000, 245000, 265000, 285000],
  suits: [240000, 265000, 320000],
  caps: [12000, 13000, 14800, 16500, 18500],
}

const SIZES = {
  kaftans: ['M', 'L', 'XL', 'XXL'],
  agbada: ['M', 'L', 'XL', 'XXL'],
  suits: ['38', '40', '42', '44'],
  caps: ['Free Size'],
}

const COLORS = {
  kaftans: ['Charcoal', 'Deep Ivory', 'Warm Beige'],
  agbada: ['Ivory & Brown', 'Gold & Charcoal', 'Deep Emerald'],
  suits: ['Charcoal', 'Navy', 'Black'],
  caps: ['Black', 'Ivory', 'Embroidered'],
}

const DESCRIPTIONS = {
  kaftans:
    'A refined Grandeur kaftan — clean shoulders, a sharp collar and hand-finished embroidery. Made to measure for a confident, elegant silhouette.',
  agbada:
    'A complete kaftan + agbada set with an inner kaftan, flowing embroidered outer cape and matching trousers. Built for ceremonies and statement dressing.',
  suits:
    'Sharp, structured Grandeur suiting with a clean natural shoulder and tailored trouser. Cut to carry confidence, end to end.',
  caps:
    'A hand-finished Grandeur cap with a structured crown and refined finish — the perfect finishing touch for native and everyday looks.',
}

const KAFTAN_DETAILS = {
  embroidery: 'Hand-guided embroidery on the chest and cuffs',
  neckline: 'Classic mandarin collar with covered-button closure',
  pocket: 'Welted chest pocket with embroidered trim',
  fabric: 'Premium cotton brocade, breathable weave',
  sleeve: 'Structured long sleeve with pointed cuff',
  custom: 'Made-to-measure available on request',
}

const AGBADA_DETAILS = {
  embroidery: 'Contrast embroidery on the chest, edges and back',
  fabric: 'Heavyweight brocade blend with rich drape',
  agbada: 'Flowing outer cape with open sleeve finish',
  custom: 'Fully made-to-measure with your measurements',
}

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const build = (category, files) =>
  files.map((file, i) => {
    const isNative = category === 'kaftans' || category === 'agbada'
    const name = NAMES[category][i % NAMES[category].length]
    return {
      id: `${category}-${i + 1}`,
      slug: `${category}-${slugify(name)}`,
      name,
      category,
      price: PRICES[category][i % PRICES[category].length],
      description: DESCRIPTIONS[category],
      details: isNative ? (category === 'kaftans' ? KAFTAN_DETAILS : AGBADA_DETAILS) : undefined,
      sizes: SIZES[category],
      colors: COLORS[category],
      stock: 14 + ((i * 7) % 21),
      featured: i % 5 === 0,
      image: photo(category, file),
      detailImages: [photo(category, file)],
    }
  })

export const products = [
  ...build('kaftans', KAFTAN_FILES),
  ...build('agbada', AGBADA_FILES),
  ...build('suits', SUIT_FILES),
  ...build('caps', CAP_FILES),
]

export const collections = [
  {
    slug: 'kaftans',
    title: 'Kaftans',
    description: 'Made-to-measure kaftans with hand-finished embroidery.',
    image: photo('kaftans', KAFTAN_FILES[0]),
  },
  {
    slug: 'agbada',
    title: 'Agbada',
    description: 'Ceremonial kaftan + agbada sets for statement dressing.',
    image: photo('agbada', AGBADA_FILES[3]),
  },
  {
    slug: 'suits',
    title: 'Suits',
    description: 'Structured suiting cut for confidence.',
    image: photo('suits', SUIT_FILES[0]),
  },
  {
    slug: 'caps',
    title: 'Caps',
    description: 'Hand-finished caps to complete the look.',
    image: photo('caps', CAP_FILES[2]),
  },
]

export function getProductById(id) {
  return products.find((p) => p.id === id)
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug)
}

export function formatPrice(n) {
  return `₦${Number(n).toLocaleString('en-NG')}`
}