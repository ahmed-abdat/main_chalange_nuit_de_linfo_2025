// Types for Village NIRD Project

export interface NIRDPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
}

export interface School {
  id: string;
  name: string;
  location: string;
  pcsReconditioned: number;
  studentsImpacted: number;
  yearStarted: number;
  testimonial?: string;
}

export interface Statistic {
  value: string;
  label: string;
  impact: string;
  type: 'danger' | 'warning' | 'success';
}

export interface ChoiceOption {
  id: string;
  title: string;
  description: string;
  consequences: {
    cost: string;
    sustainability: string;
    sovereignty: string;
    longTerm: string;
  };
  isRecommended?: boolean;
}

export interface GalleryItem {
  image: string;
  text: string;
}

export interface Review {
  id: string | number;
  name: string;
  affiliation: string;
  quote: string;
  imageSrc: string;
  thumbnailSrc: string;
}
