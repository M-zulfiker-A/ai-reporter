interface NewsAPIResponse {
  status: "ok" | "error";
  totalResults?: number;
  articles?: any[]; // Replace 'any' with your Article interface if you have one
  code?: string;
  message?: string;
}

interface SourcesResponse {
  status: "ok" | "error";
  sources?: any[]; // Replace 'any' with your Source interface if you have one
  code?: string;
  message?: string;
}

export class NewsAPIWrapper {
  private apiKey: string;
  private userAgent: string;

  constructor(apiKey: string, userAgent: string) {
    this.apiKey = apiKey;
    this.userAgent = userAgent;
  }

  private async fetchAPI(url: string, options: RequestInit = {}): Promise<any> {
    const headers = {
      "User-Agent": this.userAgent,
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async topHeadlines(params: {
    country?: string;
    category?: string;
    sources?: string;
    q?: string;
    pageSize?: number;
    page?: number;
  }): Promise<NewsAPIResponse> {
    const url = new URL("https://newsapi.org/v2/top-headlines");
    url.searchParams.append("apiKey", this.apiKey);

    if (params.country) url.searchParams.append("country", params.country);
    if (params.category) url.searchParams.append("category", params.category);
    if (params.sources) url.searchParams.append("sources", params.sources);
    if (params.q) url.searchParams.append("q", params.q);
    if (params.pageSize)
      url.searchParams.append("pageSize", params.pageSize.toString());
    if (params.page) url.searchParams.append("page", params.page.toString());

    return this.fetchAPI(url.toString());
  }

  async everything(params: {
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
  }): Promise<NewsAPIResponse> {
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.append("apiKey", this.apiKey);

    url.searchParams.append("q", params.q);
    if (params.qInTitle) url.searchParams.append("qInTitle", params.qInTitle);
    if (params.sources) url.searchParams.append("sources", params.sources);
    if (params.domains) url.searchParams.append("domains", params.domains);
    if (params.excludeDomains)
      url.searchParams.append("excludeDomains", params.excludeDomains);
    if (params.from) url.searchParams.append("from", params.from);
    if (params.to) url.searchParams.append("to", params.to);
    if (params.language) url.searchParams.append("language", params.language);
    if (params.sortBy) url.searchParams.append("sortBy", params.sortBy);
    if (params.pageSize)
      url.searchParams.append("pageSize", params.pageSize.toString());
    if (params.page) url.searchParams.append("page", params.page.toString());

    return this.fetchAPI(url.toString());
  }

  async sources(
    params: {
      category?: string;
      language?: string;
      country?: string;
    } = {}
  ): Promise<SourcesResponse> {
    const url = new URL("https://newsapi.org/v2/sources");
    url.searchParams.append("apiKey", this.apiKey);

    if (params.category) url.searchParams.append("category", params.category);
    if (params.language) url.searchParams.append("language", params.language);
    if (params.country) url.searchParams.append("country", params.country);

    return this.fetchAPI(url.toString());
  }
}
