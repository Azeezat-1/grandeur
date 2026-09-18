const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

export const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Suits', slug: 'suits' },
  { name: 'Shirts', slug: 'shirts' },
  { name: 'Trousers', slug: 'trousers' },
  { name: 'Native Wear', slug: 'native-wear' },
  { name: 'Casual Wear', slug: 'casual-wear' },
  { name: 'Shoes', slug: 'shoes' },
]

export const products = [
  {
    id: 'native-royal-kaftan',
    slug: 'royal-kaftan',
    name: 'Royal Embroidered Kaftan',
    category: 'native-wear',
    price: 145000,
    description:
      'A structured luxury kaftan cut for elegance, finished with hand-sewn chest embroidery on premium cotton brocade. Designed to sit cleanly on the shoulder with a tailored slim silhouette.',
    details: {
      embroidery: 'Hand-guided chest embroidery in tonal silk thread',
      neckline: 'Classic mandarin collar with covered-button closure',
      pocket: 'Welted chest pocket with embroidered trim',
      fabric: 'Premium cotton brocade, breathable weave',
      sleeve: 'Structured long sleeve with pointed cuff and buttons',
      custom: 'Made-to-measure available on request',
    },
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Warm Beige', 'Deep Ivory'],
    stock: 18,
    featured: true,
    image: u('photo-1594938298603-c8148c4dae35'),
    detailImages: [u('photo-1594938298603-c8148c4dae35'), u('photo-1558769132-94e457f0e3af')],
  },
  {
    id: 'native-kaftan-agbada-set',
    slug: 'agbada-set',
    name: 'Kaftan & Agbada Set',
    category: 'native-wear',
    price: 285000,
    description:
      'A complete coordinated set: inner kaftan, flowing embroidered agbada and matching trousers. A statement outfit built for ceremonies, with contrast embroidery across the chest and edges of the outer cape.',
    details: {
      embroidery: 'Contrast embroidery on chest, edges and back',
      neckline: 'Round structured kaftan neckline',
      pocket: 'Front patch pockets with embroidered borders',
      fabric: 'Heavyweight brocade blend with rich drape',
      agbada: 'Flowing outer cape with open sleeve finish',
      custom: 'Fully made-to-measure with your measurements',
    },
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Gold & Charcoal', 'Ivory & Brown'],
    stock: 8,
    featured: true,
    image: u('photo-1617127365659-c47fa864d8bc'),
    detailImages: [u('photo-1617127365659-c47fa864d8bc'), u('photo-1558769132-94e457f0e3af')],
  },
  {
    id: 'suit-linen-slim',
    slug: 'two-piece-suit',
    name: 'Sartorial Two-Piece Suit',
    category: 'suits',
    price: 240000,
    description:
      'A refined two-piece suit with a natural shoulder, tapered trouser and full-canvas construction. Tailored to cut a confident, clean line.',
    sizes: ['38', '40', '42', '44'],
    colors: ['Charcoal', 'Navy', 'Black'],
    stock: 10,
    featured: true,
    image: u('photo-1594938298603-c8148c4dae35', 1000),
    detailImages: [u('photo-1594938298603-c8148c4dae35'), u('photo-1558769132-94e457f0e3af')],
  },
  {
    id: 'suit-three-piece',
    slug: 'three-piece-suit',
    name: 'Executive Three-Piece Suit',
    category: 'suits',
    price: 320000,
    description:
      'Complete three-piece tailoring in dark wool blend, with a waistcoat, peak lapels and structured trousers. Built for authority and occasion dressing.',
    sizes: ['38', '40', '42', '44'],
    colors: ['Charcoal', 'Anthracite'],
    stock: 6,
    featured: false,
    image: u('photo-1507679799987-c73779587ccf', 1000),
    detailImages: [u('photo-1507679799987-c73779587ccf')],
  },
  {
    id: 'shirt-luxury-oxford',
    slug: 'luxury-oxford-shirt',
    name: 'Luxury Oxford Shirt',
    category: 'shirts',
    price: 48000,
    description:
      'A pressed-look oxford in soft brushed cotton with fused collar, mother-of-pearl buttons and French seams. Smart on its own or under a kaftan.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Ivory', 'Light Blue'],
    stock: 30,
    featured: false,
    image: u('photo-1603252109303-2751441dd157', 900),
    detailImages: [u('photo-1603252109303-2751441dd157')],
  },
  {
    id: 'trouser-tailored',
    slug: 'tailored-trousers',
    name: 'Tailored Trousers',
    category: 'trousers',
    price: 38000,
    description:
      'Sharp flat-front trousers in tropical wool with a tailored taper and side adjusters. Pairs with Grandeur kaftans or suiting.',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Charcoal', 'Black', 'Beige'],
    stock: 24,
    featured: false,
    image: u('photo-1473966968600-fa801b869a1a', 900),
    detailImages: [u('photo-1473966968600-fa801b869a1a')],
  },
  {
    id: 'casual-polo-knit',
    slug: 'luxury-polo',
    name: 'Luxury Knit Polo',
    category: 'casual-wear',
    price: 42000,
    description:
      'A heavyweight knit polo with a structured collar and ribbed cuffs. Understated, comfortable and built to hold its shape.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Olive', 'Beige'],
    stock: 22,
    featured: false,
    image: u('photo-1598033129183-c4f50c736f10', 900),
    detailImages: [u('photo-1598033129183-c4f50c736f10')],
  },
  {
    id: 'casual-linen-tee',
    slug: 'linen-tee',
    name: 'Relaxed Linen Tee',
    category: 'casual-wear',
    price: 26000,
    description:
      'A relaxed, breathable linen tee with a clean neckline and slightly dropped shoulder. Weekday ease with a refined finish.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Off-White', 'Charcoal', 'Sand'],
    stock: 35,
    featured: false,
    image: u('photo-1576566588028-4147f3842f27', 900),
    detailImages: [u('photo-1576566588028-4147f3842f27')],
  },
  {
    id: 'shoes-brogue',
    slug: 'heritage-brogue',
    name: 'Heritage Leather Brogues',
    category: 'shoes',
    price: 140000,
    description:
      'Hand-finished full-grain leather brogues with Goodyear welt construction. The finishing note for suits and native looks alike.',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Tan', 'Dark Brown'],
    stock: 14,
    featured: false,
    image: u('photo-1543163521-1bf539c55dd2', 900),
    detailImages: [u('photo-1543163521-1bf539c55dd2')],
  },
  {
    id: 'shoes-loafers',
    slug: 'suede-loafers',
    name: 'Suede Penny Loafers',
    category: 'shoes',
    price: 98000,
    description:
      'Soft suede penny loafers with a leather sole and clean silhouette. Refined casual footwear for the modern gentleman.',
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Chocolate', 'Black'],
    stock: 16,
    featured: false,
    image: u('photo-1608256246200-53e635b5b65f', 900),
    detailImages: [u('photo-1608256246200-53e635b5b65f')],
  },
]

export const collections = [
  {
    slug: 'suits',
    title: 'Suits',
    description: 'Full-canvas tailoring cut for confidence.',
    image: u('photo-1507679799987-c73779587ccf', 1200),
  },
  {
    slug: 'shirts',
    title: 'Shirts',
    description: 'Pressed, structured and made to layer.',
    image: u('photo-1603252109303-2751441dd157', 1200),
  },
  {
    slug: 'trousers',
    title: 'Trousers',
    description: 'Sharp tailored lines for every occasion.',
    image: u('photo-1473966968600-fa801b869a1a', 1200),
  },
  {
    slug: 'native-wear',
    title: 'Native Wear',
    description: 'Kaftans, agbada and embroidered ceremony wear.',
    image: u('photo-1617127365659-c47fa864d8bc', 1600),
  },
  {
    slug: 'casual-wear',
    title: 'Casual Wear',
    description: 'Relaxed luxury for everyday confidence.',
    image: u('photo-1598033129183-c4f50c736f10', 1200),
  },
  {
    slug: 'shoes',
    title: 'Shoes',
    description: 'Hand-finished footwear to complete the look.',
    image: u('photo-1543163521-1bf539c55dd2', 1200),
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