// Single source of truth for all site content.
// Mirrors the copy in scroll-animation.html so the markup stays data-driven.

export const hero = {
  // glitch-light text (apostrophe is literal here)
  name: "HELLO, I'M Vengadash",
  bio:
    'HALO! SAYA SHOFI ALFATIH, BIASA DIPANGGIL FATIH, SEORANG VISUAL CREATOR YANG BARU BANGET NYEMPLUNG KE DUNIA DESAIN SEKITAR 4 BULAN INI. WALAUPUN MASIH ITUNGANNYA “PENDATANG BARU”, SAYA LAGI HAUS BANGET BUAT EKSPLORASI BERBAGAI MACAM GAYA VISUAL BUAT SAYA, BARU 4 BULAN ITU BUKAN HALANGAN, TAPI JUSTRU AWAL DARI PERJALANAN KREATIF YANG SERU. SAYA SELALU TERBUKA BUAT BELAJAR HAL BARU, DAPET FEEDBACK, ATAU DIAJAK KOLABORASI BARENG.',
};

export const projects = [
  {
    id: 'veloce',
    title: 'VELOCE BIKES',
    category: 'E-Commerce',
    tags: ['ecommerce', 'web'],
    desc: 'A fast, conversion-focused storefront for a premium e-bike brand.',
    thumb: 'veloce',
    link: '#',
  },
  {
    id: 'woodcraft',
    title: 'WOODCRAFT',
    category: 'Furniture',
    tags: ['furniture', 'web'],
    desc: 'A warm, tactile catalogue site for a handcrafted furniture maker.',
    thumb: 'wood',
    link: '#',
  },
  {
    id: 'urbanic',
    title: 'URBANIC',
    category: 'Fashion',
    tags: ['fashion', 'web'],
    desc: 'A bold lookbook and shop for an up-and-coming streetwear label.',
    thumb: 'urban',
    link: '#',
  },
];

// Skill groups keyed by filter category.
export const skills = {
  design: [
    ['Web Design', 90],
    ['UI/UX Design', 88],
    ['Figma', 85],
    ['Adobe XD', 72],
  ],
  dev: [
    ['HTML / CSS', 92],
    ['JavaScript', 78],
    ['Webflow', 70],
    ['GSAP Animation', 65],
  ],
  tools: [
    ['Framer', 68],
    ['Photoshop', 80],
    ['SEO Basics', 74],
  ],
};

export const process = [
  { n: '01', ico: '◎', title: 'DISCOVER', desc: 'Understanding goals, audience, and project requirements.' },
  { n: '02', ico: '✎', title: 'CREATE', desc: 'Planning, wireframing, and creating the right concept.' },
  { n: '03', ico: '✏', title: 'DESIGN', desc: 'Crafting visual design with a focus on user experience.' },
  { n: '04', ico: '</>', title: 'DEVELOP', desc: 'Building fast, responsive, and high-performing websites.' },
  { n: '05', ico: '➤', title: 'DELIVER', desc: 'Testing, optimizing, and launching with perfection.' },
];

export const education = [
  { title: 'B.Sc. in Visual Communication Design', sub: 'Binus University', yr: '2018 – 2022' },
  { title: 'UI/UX Design Certification', sub: 'Google Career Certificates', yr: '2023' },
];

export const contact = {
  email: 'fatih@example.com',
  site: 'https://www.shofialfath.com',
  phone: '+62 812 3456 7890',
  location: 'Jakarta, Indonesia',
  socials: [
    { label: 'IG', href: 'https://instagram.com/', aria: 'Instagram' },
    { label: 'BE', href: 'https://behance.net/', aria: 'Behance' },
    { label: 'IN', href: 'https://linkedin.com/', aria: 'LinkedIn' },
    { label: 'DR', href: 'https://dribbble.com/', aria: 'Dribbble' },
  ],
};

// Background presets for the scroll-driven canvas.
export const backgrounds = [
  { id: 'frames', label: 'Frame' },
  { id: 'video', label: 'Video', src: 'video/464168.mp4' },
  { id: 'image', label: 'Still', src: 'frames/ezgif-frame-150.jpg' },
];

export const TOTAL_FRAMES = 300;
export const STILL_FRAME = 150; // used by the "Still" preset
