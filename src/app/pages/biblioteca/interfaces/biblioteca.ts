export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
}

export interface SearchResults {
  docs: Book[];
  numFound: number;
  start: number;
}