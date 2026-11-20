export type ProjectScreenKey =
  | 'dashboard'
  | 'travel'
  | 'shop'
  | 'moto'
  | 'folio'
  | 'blog';

export interface ProjectItem {
  id: string;
  title: string;
  stack: string;
  screen: ProjectScreenKey;
  image: string;
  rgb: string;
  url: string;
  repo: string;
  description: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  color: string;
}

export interface EducationItem {
  label: string;
}

export const PORTFOLIO_PROFILE_PHOTO = '/assets/profile.jpg';

export const PORTFOLIO_CONFIG = {
  name: 'Sok Sophea',
  role: 'Web Developer',
  email: 'sophea044056@gmail.com',
  phone: '0969185182',
  linkedinLabel: 'Sok Sophea',
  linkedinUrl:
    'https://www.linkedin.com/in/sophea-sok-497501438?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/',
  location: 'National Technical Training Institute (NTTI), Phnom Penh, Cambodia',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=National+Technical+Training+Institute+NTTI+Phnom+Penh+Cambodia&hl=en&z=16&output=embed',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(
      'National Technical Training Institute (NTTI), Phnom Penh, Cambodia'
    ).replace(/[()]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase()),
  formEndpoint: '',
  intro:
    'I am an Information Technology student at the National Technical Training Institute (NTTI), currently in the first semester of my second year pursuing an Associate Degree in Information Technology.',
  journey:
    'My journey in technology has evolved from simple curiosity into a passion for creating clean, beautiful, and functional applications using modern web technologies.',
  experience:
    'Currently, I am also working as an intern Backend and Frontend Developer at Somnab Technology, where I continue to gain practical experience in website development. Through this internship, I am developing my skills in both frontend and backend technologies while learning how to build responsive, functional, and user-friendly web applications.',
  whatIDoPrefix:
    'I build responsive and interactive interfaces using ',
  whatIDoMid: ' and develop robust backend systems with ',
  whatIDoSuffix:
    '. I create comprehensive digital experiences by combining clean architecture with modern UI/UX design principles.',
};

export const EDUCATION: EducationItem[] = [
  { label: 'Primary School' },
  { label: 'Secondary School' },
  { label: 'High School' },
  { label: 'University' },
];

export const SKILLS: SkillItem[] = [
  { name: 'HTML', color: '#ff6a2e' },
  { name: 'CSS', color: '#2f9bff' },
  { name: 'Bootstrap', color: '#a35bff' },
  { name: 'JavaScript', color: '#ffe033' },
  { name: 'React', color: '#4fe3ff' },
  { name: 'Vue', color: '#42d392' },
  { name: 'PHP', color: '#8f94ff' },
  { name: 'Laravel', color: '#ff3b30' },
  { name: 'MySQL', color: '#22b8ff' },
  { name: 'GitHub', color: '#b48aff' },
  { name: 'GitLab', color: '#fc6d26' },
  { name: 'Vercel', color: '#6df7ff' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'inventory-dashboard',
    title: 'Inventory Dashboard',
    stack: 'Laravel + MySQL + Bootstrap 5',
    screen: 'dashboard',
    image: '/assets/aistudio/Inventory_Dashboard_02d814b0.webp',
    rgb: '25,224,210',
    url: 'https://loan-ruddy-omega.vercel.app/',
    repo: '',
    description:
      'Admin dashboard for managing products, inventory, and business data.',
    highlights: [
      'Real-time stock KPI cards and category breakdown charts',
      'Laravel RESTful backend paired with relational MySQL schema',
      'Responsive Bootstrap 5 admin layout for desktop and tablet',
    ],
  },
  {
    id: 'travel-guide',
    title: 'Travel Guide',
    stack: 'React.js + TypeScript + Bootstrap 5',
    screen: 'travel',
    image: '/assets/aistudio/Travel_Guide_ac909ce8.webp',
    rgb: '255,159,64',
    url: '',
    repo: '',
    description:
      'Travel-focused web application for exploring destinations, built with a modern frontend.',
    highlights: [
      'Interactive destination explorer with regional filters',
      'Type-safe React.js + TypeScript component architecture',
      'Responsive itinerary cards and curated travel highlights',
    ],
  },
  {
    id: 'phone-store',
    title: 'Phone Store',
    stack: 'HTML + CSS + JavaScript + Bootstrap 5',
    screen: 'shop',
    image: '/assets/aistudio/phoneshop-preview_16b373f9.webp',
    rgb: '180,138,255',
    url: 'https://phoneshop-deploy.vercel.app/',
    repo: '',
    description:
      'Responsive phone-store interface designed for a clean and modern shopping experience.',
    highlights: [
      'Deployed live storefront on Vercel with mobile-first grid',
      'Dynamic product showcase with interactive filtering',
      'Clean typography and high-contrast storefront hero section',
    ],
  },
  {
    id: 'car-rental-system',
    title: 'Car Rental System',
    stack: 'PHP + MySQL + Bootstrap 5',
    screen: 'moto',
    image: '/assets/aistudio/Car_Rental_System_7fc00a1b.webp',
    rgb: '255,82,82',
    url: '',
    repo: '',
    description:
      'Car Rental System with vehicle listings, easy booking and database-driven content.',
    highlights: [
      'Database-driven fleet catalog with availability tracking',
      'Streamlined reservation workflow powered by PHP & MySQL',
      'Responsive multi-column showcase for new arrivals',
    ],
  },
  {
    id: 'my-portfolio',
    title: 'My Portfolio',
    stack: 'React.js + Laravel + Bootstrap 5',
    screen: 'folio',
    image: '/assets/aistudio/my-portfolio-preview_d1267459.webp',
    rgb: '255,214,51',
    url: 'https://sophea-silk.vercel.app/',
    repo: '',
    description:
      'Interactive developer portfolio focused on modern UI, responsive layouts, and motion.',
    highlights: [
      'Storm-themed interactive canvas with physics-driven tech orbs',
      '3D perspective skill cards with custom per-brand glow',
      'Accessible keyboard navigation and reduced-motion compliance',
    ],
  },
  {
    id: 'task-management-system',
    title: 'Task Management System',
    stack: 'JavaScript + React.js + Bootstrap 5',
    screen: 'blog',
    image: '/assets/aistudio/Task_Management_System_e4b77d0d.webp',
    rgb: '61,220,132',
    url: '',
    repo: '',
    description:
      'Task dashboard for tracking projects, priorities and progress.',
    highlights: [
      'Interactive task board for tracking priorities and milestones',
      'Component-driven React.js UI with fast state updates',
      'Clean sidebar overview for active project status',
    ],
  },
];
