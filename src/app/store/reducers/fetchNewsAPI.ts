import { v4 as uuidv4 } from "uuid"
import type { Article, Result, GaurdianResult, NewsResponse } from "../../Types"

export const fetchNews = async (keyword: string): Promise<NewsResponse[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&apiKey=5cd16c7fc02e4ca7b2ab3c1b1a8b1b4e&pageSize=20`,
  )
  const news = await response.json()
  //formate the data
  const newsData = (news.articles = news.articles.map((article: Article) => {
    if (article.title !== "[Removed]") {
      return {
        id: uuidv4(),
        title: article.title,
        description: article.description,
        url: article.url,
        date: article.publishedAt,
        category: "others",
        author: article.author || "unknown",
        source: article.source.name,
      }
    }
  })).filter((article: Article) => article !== undefined)

  return newsData
}

export const fetchNewsDataAPI = async (keyword: string) => {
  const response = await fetch(
    `https://newsdata.io/api/1/latest?apikey=pub_65570aeebf124c0ebc8d244e8b6bb0c186826&q=${keyword}{&domainurl=news.google.com`,
  )
  const news = await response.json()
  const newsData = news.results.map((result: Result) => {
    return {
      id: result.article_id,
      title: result.title,
      description: result.description,
      url: result.link,
      date: result.pubDate,
      category: result.category,
      author: result.creator || "unknown",
      source: result.source_name,
    }
  })
  return newsData
}

export const fetchGaurdianNewsAPI = async (keyword: string) => {
  const response = await fetch(
    `https://content.guardianapis.com/search?q=${keyword}&api-key=test`,
  )

  const news = await response.json()
  const newsData = news.response.results.map((result: GaurdianResult) => {
    return {
      id: result.id,
      title: result.webTitle,
      description: result.webTitle,
      url: result.webUrl,
      date: result.webPublicationDate,
      category: result.sectionName,
      author: "unknown",
      source: result.pillarName,
    }
  })
  return newsData
}

export const fetchAllData = async (keyword: string) => {
  try {
    const [news1, news2, news3] = await Promise.all([
      fetchNews(keyword),
      fetchNewsDataAPI(keyword),
      fetchGaurdianNewsAPI(keyword),
    ])

    return [...news1, ...news2, ...news3]
  } catch (error) {
    console.error("Error fetching data", error)
    throw error
  }
}
