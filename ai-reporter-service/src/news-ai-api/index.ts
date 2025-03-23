interface EventRegistryArticlesParams {
  query: {
    $query: {
      $and: {
        locationUri: string;
        sourceLocationUri: string;
      }[];
    };
    $filter?: {
      forceMaxDataTimeWindow?: string;
    };
  };
  resultType: "articles";
  articlesSortBy: "date" | string;
  includeArticleEventUri?: boolean;
  includeArticleImage?: boolean;
  apiKey: string;
}

interface EventRegistryArticlesResponse {
  articles: {
    results: any[];
    totalResults: number;
    pages: number;
    page: number;
  };
}

export class EventRegistryWrapper {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getArticles(params: {
    locationUri: string;
    sourceLocationUri: string;
    forceMaxDataTimeWindow?: string;
    articlesSortBy?: "date" | string;
    includeArticleEventUri?: boolean;
    includeArticleImage?: boolean;
    language?: string;
  }): Promise<EventRegistryArticlesResponse> {
    const url = "https://eventregistry.org/api/v1/article/getArticles";

    const requestBody = {
      query: {
        $query: {
          $and: [
            {
              locationUri: params.locationUri,
            },
            {
              sourceLocationUri: params.sourceLocationUri,
            },
            {
              lang: params.language || "eng",
            },
          ],
        },
        $filter: params.forceMaxDataTimeWindow
          ? { forceMaxDataTimeWindow: params.forceMaxDataTimeWindow }
          : undefined,
      },
      resultType: "articles",
      articlesSortBy: params.articlesSortBy || "date",
      includeArticleEventUri: params.includeArticleEventUri,
      includeArticleImage: params.includeArticleImage,
      apiKey: this.apiKey,
    };

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as EventRegistryArticlesResponse;
    } catch (error) {
      throw error;
    }
  }
}
