const API_URL = "https://crawllab.onrender.com";

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
