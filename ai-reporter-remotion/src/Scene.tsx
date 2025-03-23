import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";
import Reporter from "./Reporter";
import NewsCards from "./components/news-cards";
import { Props } from "./common/schema";

export const Scene: React.FC<Props> = ({ data }: Props) => {
  const { width, height } = useVideoConfig();

  return (
    <>
      <div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1000,
            width,
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NewsCards data={data?.slice(0, 20) || null} />
        </div>
        <ThreeCanvas width={width} height={height}>
          <Reporter />
        </ThreeCanvas>
      </div>
    </>
  );
};
