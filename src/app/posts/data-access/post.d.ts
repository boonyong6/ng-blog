export type Post = {
  url: string;
  id: number;
  author: string;
  tags: string[];
  urlAlt: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  publish: string;
  created: string;
  updated: string;
  status: string;
  previous: PostPreview | null;
  next: PostPreview | null;
};

type PostPreview = Pick<
  Post,
  'url' | 'urlAlt' | 'id' | 'title' | 'slug' | 'publish'
>;
