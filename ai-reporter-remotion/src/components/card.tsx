import { CSSProperties } from "react";
import "./cards.styles.css";

type ArticleType = {
  uri: string;
  title: string;
  body: string;
  image: string;
  source: {
    title: string;
  };
};

type CardProps = {
  article: ArticleType;
  isActive: boolean;
  zIndex: number;
};

const Card = ({ article, isActive, zIndex }: CardProps) => {
  const cardStyle: CSSProperties = {
    background: "white",
    width: "90%",
    borderRadius: "12px",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    padding: "1.5rem",
    gap: "2rem",
    boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
    opacity: isActive ? 1 : 0.7,
    transform: isActive
      ? "translateY(0) scale(1)"
      : `translateY(${zIndex * 20}px) scale(${1 - zIndex * 0.05})`,
    transition: "all 0.6s ease",
    zIndex: 100 - zIndex,
    border: "1px solid #eaeaea",
    height: "400px",
  };
  console.log(zIndex);
  return (
    <div style={cardStyle}>
      <img
        src={article.image}
        height={350}
        width={350}
        style={{
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div className="article-content">
        <h1>{article.title}</h1>
        <p className="article-body">{article.body.slice(0, 500)}...</p>
      </div>
      <div className="article-source">Source : {article.source.title}</div>
    </div>
  );
};

export default Card;
