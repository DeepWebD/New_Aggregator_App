export interface PersonaliseNews {
  category: string
  country: string
  description: string
  id: string
  language: string
  name: string
  url: string
}
export interface source {
  id: string | null
  name: string
}
export interface Article {
  source: source
  author: string | null
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string
}
export interface Result {
  article_id: string
  title: string
  link: string
  keywords: string[] | null
  creator: string[] | null
  video_url: string | null
  description: string
  content: string
  pubDate: string
  pubDateTZ: string
  image_url: string | null
  source_id: string
  source_priority: number
  source_name: string
  source_url: string
  source_icon: string
  language: string
  country: string[]
  category: string[]
  ai_tag: string
  sentiment: string
  sentiment_stats: string
  ai_region: string
  ai_org: string
  duplicate: boolean
}

export interface GaurdianResult {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: string
  webTitle: string
  webUrl: string
  apiUrl: string
  isHosted: boolean
  pillarId: string
  pillarName: string
}

export interface NewsResponse {
  id: string
  title: string
  description: string
  url: string
  date: string
  category: string
  author: string
  source: string
}
