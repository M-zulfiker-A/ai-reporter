import { Hono } from "hono";
import { env } from "hono/adapter";
import { NewsAPIWrapper } from "./news-api";
import { EventRegistryWrapper } from "./news-ai-api";
import { cors } from "hono/cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchNews } from "./controllers/latest-news/fetch-news";
import { GoogleGenAI, Type } from "@google/genai";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("/*", cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/latest-news", async (c) => {
  const country = c.req.query("country") || "us";
  const language = c.req.query("language") || "eng";
  try {
    const news = await fetchNews(c, country, language);
    return c.json(news);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch news" }, 500);
  }
});

export default app;
