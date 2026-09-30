import React from "react";

export interface LinkResult {
  url: string;
  title: string;
  snippets: string[];
  sources: string[];
  type: string;
}

export interface SearchResult {
  keyword: string;
  links: LinkResult[];
}

interface ResultListProps {
  result: SearchResult[];
  truncateLink: (link: string) => string;
  handleBack: () => void;
  backButtonText: string;
  noLinksText: string;
}

const ResultList: React.FC<ResultListProps> = ({
  result,
  truncateLink,
  handleBack,
  backButtonText,
  noLinksText,
}) => {
  const getCategoryColor = (type: string) => {
    switch (type) {
      case "news":
        return "#ff5252";

      case "technical":
        return "#42a5f5";

      case "knowledge":
        return "#ab47bc";

      case "discussion":
        return "#ff9800";

      default:
        return "#bdbdbd";
    }
  };

  return (
    <div className="result">
      <h3>Results</h3>

      {result.map((item, index) => (
        <div key={index}>
          <h4>Keyword: {item.keyword}</h4>

          {item.links && item.links.length > 0 ? (
            <ul
              style={{
                padding: 0,
                margin: 0,
                listStyle: "none",
              }}
            >
              {item.links.map((link, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      flexShrink: 0,
                      padding: "4px 9px",
                      borderRadius: "12px",
                      backgroundColor: getCategoryColor(link.type),
                      color: "#111",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      textTransform: "uppercase",
                    }}
                  >
                    {link.type}
                  </span>

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.url}
                    style={{
                      color: "#ffcc00",
                      textDecoration: "none",
                      minWidth: 0,
                    }}
                  >
                    {truncateLink(link.url)}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>{noLinksText}</p>
          )}
        </div>
      ))}

      <button onClick={handleBack} className="back-button">
        {backButtonText}
      </button>
    </div>
  );
};

export default ResultList;
