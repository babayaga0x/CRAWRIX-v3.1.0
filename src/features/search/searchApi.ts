const API_URL = "http://127.0.0.1:5000/parse";

export const searchApi = async (
  keywords: string[],
  lang: string
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      keywords,
      lang,
    }),
  });

  const data = await response.json();

  return data;
};
