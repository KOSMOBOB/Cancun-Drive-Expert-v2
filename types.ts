
export type Locale = 'en' | 'es';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  locale: Locale;
}

export interface Breadcrumb {
  label: string;
  path: string;
}
