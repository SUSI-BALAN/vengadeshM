// Single source of truth for all site content.
// Mirrors the copy in scroll-animation.html so the markup stays data-driven.

export const hero = {
  // glitch-light text (apostrophe is literal here)
  name: "HELLO, I'M VenKadash",
  bio:
    'Hi, I’m a UI/UX Designer who loves turning ideas into meaningful digital experiences. I focus on clean interfaces, intuitive user journeys, and designs that balance aesthetics with usability. I’m always exploring new ways to make digital products simpler, smarter, and more enjoyable.',
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
  { title: 'B.E COMPUTER SCIENCE ENGINEERING', sub: 'PET ENGINEERING COLLEGE', yr: ' 2024 – 2027' },
  { title: 'UI/UX Design Certification', sub: 'Google Career Certificates', yr: '2025' },
];

export const contact = {
  email: 'venkadash@example.com',
  site: 'https://www.venKadesh.com',
  phone: '+91 9876543210',
  location: 'TIRUNELVALI, INDIA',
  socials: [
    { label: 'IG', href: 'https://instagram.com/', aria: 'Instagram' },
    { label: 'BE', href: 'https://behance.net/', aria: 'Behance' },
    { label: 'IN', href: 'https://linkedin.com/', aria: 'LinkedIn' },
    { label: 'DR', href: 'https://dribbble.com/', aria: 'Dribbble' },
  ],
};
