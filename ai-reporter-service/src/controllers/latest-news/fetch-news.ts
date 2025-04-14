import { Context } from "hono";
import { EventRegistryWrapper } from "../../news-ai-api";
import { env } from "hono/adapter";
import generateScript from "./generate-script";

export async function fetchNews(c: Context, country: string, language: string) {
  const { NEWS_AI_API_KEY } = env<{ NEWS_AI_API_KEY: string }>(c);
  const newsApi = new EventRegistryWrapper(NEWS_AI_API_KEY);
  try {
    const news = await newsApi.getArticles({
      locationUri: "http://en.wikipedia.org/wiki/" + country,
      sourceLocationUri: "http://en.wikipedia.org/wiki/" + country,
      forceMaxDataTimeWindow: "1d",
      language,
    });
    if (!news) {
      throw new Error("No news articles found");
    }

    const scripts = [];
    for (const article of news.articles.results.slice(0, 2)) {
      const script = await generateScript(c, {
        title: article.title,
        description: article.body,
      });
      scripts.push(script);
    }

    return scripts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch news");
  }
}
