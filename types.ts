
export type Locale = 'en' | 'es';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  locale: Locale;
}

export interface Breadcrumb {
  label: string;
  path: string;
}
