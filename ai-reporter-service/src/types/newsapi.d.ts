// newsapi.d.ts

declare module "newsapi" {
  interface NewsAPI {
    v2: {
      topHeadlines(params: TopHeadlinesParams): Promise<NewsAPIResponse>;
      everything(params: EverythingParams): Promise<NewsAPIResponse>;
      sources(params?: SourcesParams): Promise<SourcesResponse>;
    };

    new (apiKey: string): NewsAPI;
  }

  interface TopHeadlinesParams {
    country?: string;
    category?: string;
    sources?: string;
    q?: string;
    pageSize?: number;
    page?: number;
  }

  interface EverythingParams {
    q: string;
    qInTitle?: string;
    sources?: string;
    domains?: string;
    excludeDomains?: string;
    from?: string;
    to?: string;
    language?: string;
    sortBy?: "relevancy" | "popularity" | "publishedAt";
    pageSize?: number;
    page?: number;
  }

  interface SourcesParams {
    category?: string;
    language?: string;
    country?: string;
  }

  interface NewsAPIResponse {
    status: "ok" | "error";
    totalResults?: number;
    articles?: Article[];
    code?: string;
    message?: string;
  }

  interface SourcesResponse {
    status: "ok" | "error";
    sources?: Source[];
    code?: string;
    message?: string;
  }

  interface Article {
    source: Source;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }

  interface Source {
    id: string | null;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
  }

  const NewsAPI: NewsAPI;
  export = NewsAPI;
}
