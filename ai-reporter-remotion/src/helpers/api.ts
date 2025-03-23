import { CalculateMetadataFunction } from "remotion";
import { Props } from "../common/schema";

export const fetchArticles: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const data = await fetch(
    "http://127.0.0.1:8787/latest-news?country=" + props.country,
  );
  const json = await data.json();

  return {
    props: {
      ...props,
      data: json?.articles?.results.slice(0, 20),
    },
  };
};
