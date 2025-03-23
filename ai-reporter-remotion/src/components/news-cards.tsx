import { CSSProperties, useState } from "react";
import { Props } from "../common/schema";
import Card from "./card";
import { useCurrentFrame, useVideoConfig } from "remotion";

const NewsCards = ({ data: articles }: Omit<Props, "country">) => {
  const { durationInFrames, fps } = useVideoConfig();
  const currentFrame = useCurrentFrame();
  const [activeIndex, setActiveIndex] = useState(0);
  const numberOfArticles = articles?.length || 1;

  const cardsContainer: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Calculate the active index based on the current frame
  const calculateActiveIndex = () => {
    const effectiveFps = fps || 30;
    const baseTimeout = durationInFrames / effectiveFps; // Duration in seconds
    const timeoutPerArticle = baseTimeout / numberOfArticles;
    const framesPerArticle = timeoutPerArticle * effectiveFps;

    const currentArticleIndex = Math.floor(currentFrame / framesPerArticle);
    return currentArticleIndex % numberOfArticles;
  };

  // Update activeIndex whenever the current frame changes
  const newActiveIndex = calculateActiveIndex();
  if (newActiveIndex !== activeIndex) {
    setActiveIndex(newActiveIndex);
  }

  return (
    <div style={cardsContainer}>
      {articles?.map((article, index) => {
        // Calculate relative position in stack
        const relativeIndex =
          (index - activeIndex + articles.length) % articles.length;

        // Only show cards that should be visible in the stack
        if (relativeIndex < 3) {
          return (
            <Card
              article={article}
              key={article.uri}
              isActive={relativeIndex === 0}
              zIndex={relativeIndex}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default NewsCards;
