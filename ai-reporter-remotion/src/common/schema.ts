import { z } from "zod";

export const articleApiResponse = z.array(
  z.object({
    title: z.string(),
    body: z.string(),
    uri: z.string(),
    image: z.string(),
    source: z.object({
      title: z.string(),
    }),
  }),
);

export const articleSchema = z.object({
  country: z.string(),
  data: z.nullable(articleApiResponse),
});

export type Props = z.infer<typeof articleSchema>;
