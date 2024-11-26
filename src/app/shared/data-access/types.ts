export type Page<Type> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Type[];
};

export type Tag = {
  id: number;
  url: string;
  count: number;
  name: string;
  slug: string;
};

export enum ThemeMode {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

export type Theme = {
  mode: ThemeMode;
  isDarkMode: boolean;
};
