import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";
import Reporter from "./Reporter";

export const Scene: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <>
      <div>
        <h1
          style={{
            position: "absolute",
            bottom: 10,
            zIndex: 1000,
          }}
        >
          WHer are I?
        </h1>
        <ThreeCanvas width={width} height={height}>
          <Reporter />
        </ThreeCanvas>
      </div>
    </>
  );
};
