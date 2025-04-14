import { Context } from "hono";
import { env } from "hono/adapter";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { GoogleGenAI, Type } from "@google/genai";
import { SCRPT_PROMPT } from "../../../constants/prompts";

export default async function generateScript(
  c: Context,
  newsArticle: NewsScriptInput
) {
  const { GOOGLE_GENERATIVE_AI_API_KEY } = env<{
    GOOGLE_GENERATIVE_AI_API_KEY: string;
  }>(c);
  const ai = new GoogleGenAI({ apiKey: GOOGLE_GENERATIVE_AI_API_KEY });
  //   const model = google("gemini-2.0-flash-exp", { structuredOutputs: false });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: SCRPT_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: {
              type: Type.STRING,
              description: "Unique ID for the news article",
            },
            title: {
              type: Type.STRING,
              description: "Title of the news article",
            },
            script: {
              type: Type.STRING,
              description: "Script generated for the news article",
            },
          },
          required: ["id", "title", "script"],
        },
      },
      contents: `Title: ${newsArticle.title} \n Description: ${newsArticle.description}`,
    });
    return JSON.parse(response.text || "{}");
  } catch (error: any) {
    console.log("Error generating script:", error?.message);
    throw new Error("Failed to generate script");
  }
}
