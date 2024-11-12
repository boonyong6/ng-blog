export type Page<Type> = {
  count: number;
  next: null;
  previous: null;
  results: Type[];
};
