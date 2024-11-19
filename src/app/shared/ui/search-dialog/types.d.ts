export type SearchResult = {
  items: SearchResultItem[];
  next: string | null;
};

export type SearchResultItem = {
  date: string;
  title: string;
  url: string;
};
