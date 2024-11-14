export type Page<Type> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Type[];
};

export type Tag = {
  url: string;
  count: number;
  name: string;
  slug: string;
};
