export interface Template {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

export const TEMPLATES: Template[] = [
  {
    id: 1,
    name: 'Modern',
    description: 'A clean, contemporary ATS-friendly design suitable for tech, startup, and modern roles.',
    tags: ['ATS Friendly', 'Modern', 'Clean', 'Tech', 'Minimalist'],
  },
  {
    id: 2,
    name: 'Classic',
    description: 'A traditional, elegant layout perfect for corporate, legal, and academic professions.',
    tags: ['Traditional', 'Classic', 'Elegant', 'Corporate', 'Formal'],
  },
  {
    id: 3,
    name: 'Professional',
    description: 'A sophisticated, high-impact structure highlighting achievements and leadership experience.',
    tags: ['Executive', 'Professional', 'Structured', 'Leadership', 'Clean'],
  },
];
