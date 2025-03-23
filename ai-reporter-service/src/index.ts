import { Hono } from "hono";
import { env } from "hono/adapter";
import { NewsAPIWrapper } from "./news-api";
import { EventRegistryWrapper } from "./news-ai-api";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("/*", cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/latest-news", async (c) => {
  const country = c.req.query("country") || "us";
  const language = c.req.query("language") || "eng";
  const { NEWS_AI_API_KEY } = env<{ NEWS_AI_API_KEY: string }>(c);
  const newsApi = new EventRegistryWrapper(NEWS_AI_API_KEY);
  try {
    const news = await newsApi.getArticles({
      locationUri: "http://en.wikipedia.org/wiki/" + country,
      sourceLocationUri: "http://en.wikipedia.org/wiki/" + country,
      forceMaxDataTimeWindow: "1d",
      language,
    });
    return c.json(news, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch news" }, 500);
  }
});

export default app;
