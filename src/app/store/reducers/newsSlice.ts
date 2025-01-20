import { createAppSlice } from "../../createAppSlice"
import { fetchAllData } from "./fetchNewsAPI"
import { fetchPersonaliseNewsAPI } from "./fetchPersonalizedNew"
import type { PersonaliseNews, NewsResponse } from "../../Types"

export interface NesDataState {
  personalNews: PersonaliseNews[]
  news: NewsResponse[]
  personalNewStatus: "loaded" | "loading" | "failed" | "idle"
  newsStatus: "loaded" | "loading" | "failed" | "idle"
}

const initialState: NesDataState = {
  personalNews: [],
  news: [],
  personalNewStatus: "idle",
  newsStatus: "idle",
}

export const newsSlice = createAppSlice({
  name: "NewsData",
  initialState,
  reducers: create => ({
    getPersonalizedNews: create.asyncThunk(
      async (keyword: string) => {
        const response = await fetchPersonaliseNewsAPI(keyword)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.personalNewStatus = "loading"
        },
        fulfilled: (state, action) => {
          state.personalNewStatus = "loaded"
          state.personalNews = action.payload
        },
        rejected: state => {
          state.personalNewStatus = "failed"
        },
      },
    ),
    getNews: create.asyncThunk(
      async (keyword: string) => {
        const response = await fetchAllData(keyword)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.newsStatus = "loading"
        },
        fulfilled: (state, action) => {
          state.newsStatus = "loaded"
          state.news = action.payload
        },
        rejected: state => {
          state.newsStatus = "failed"
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectNewsStatus: news => news.newsStatus,
    selectPersonalNewsStatus: news => news.personalNewStatus,
    selectNews: news => news.news,
    selectPersonalNews: news => news.personalNews,
    selectNewsSourceList: news => {
      const sourceList: string[] = []
      news.news.forEach(newsItem => {
        if (!sourceList.includes(newsItem.source)) {
          sourceList.push(newsItem.source)
        }
      })
      return sourceList
    },
    selectNewsCategoryList: news => {
      const categoryList: string[] = []
      news.news.forEach(newsItem => {
        if (!categoryList.includes(newsItem.category)) {
          categoryList.push(newsItem.category)
        }
      })
      return categoryList
    },
  },
})

// Action creators are generated for each case reducer function.
export const { getNews, getPersonalizedNews } = newsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectNewsStatus,
  selectNews,
  selectNewsCategoryList,
  selectNewsSourceList,
  selectPersonalNews,
  selectPersonalNewsStatus,
} = newsSlice.selectors
