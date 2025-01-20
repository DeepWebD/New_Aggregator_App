import type { PersonaliseNews } from "../../Types"

export const fetchPersonaliseNewsAPI = async (
  keyword: string,
): Promise<PersonaliseNews[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines/sources?category=${keyword}&apiKey=5cd16c7fc02e4ca7b2ab3c1b1a8b1b4e`,
  )
  const news = await response.json()
  return news.sources
}
