import { useEffect, useState } from "react"
import {
  getNews,
  selectNews,
  selectNewsStatus,
} from "../../store/reducers/newsSlice"
import { useAppDispatch, useAppSelector } from "../../hooks"
import NewsCard from "../NewsCard/NewsCard"
import classes from "./News.module.css"
import Filter from "../Filter/Filter"
import PersonalizedNews from "../PersonalizedNews/PersonalizedNews"

const category = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
]
const News = () => {
  const [filterObj, setFilterObj] = useState({
    category: "",
    source: "",
    date: "",
  })
  const [personalizeCategory, setPersonalizeCategory] = useState(
    localStorage.getItem("personaliseCategory") || "",
  )
  const dispatch = useAppDispatch()
  const [keyword, setKeyword] = useState("")
  const news = useAppSelector(selectNews)
  const status = useAppSelector(selectNewsStatus)

  const [filteredNews, setFilteredNews] = useState(news)

  useEffect(() => {
    const tempNews = news.filter(newsItem => {
      return (
        (filterObj.category === "" ||
          newsItem.category === filterObj.category) &&
        (filterObj.source === "" || newsItem.source === filterObj.source) &&
        (filterObj.date === "" ||
          Date.parse(newsItem.date) > Date.parse(filterObj.date))
      )
    })
    console.log("tempNews", tempNews)
    setFilteredNews(tempNews)
  }, [filterObj, news])

  const searchHandler = (e: any) => {
    e.preventDefault()
    dispatch(getNews(keyword))
  }
  let newsData: any
  if (status === "loading") {
    newsData = <h1>Loading...</h1>
  }
  if (status === "failed") {
    newsData = <h1>Failed to load data</h1>
  }
  if (status === "loaded") {
    if (filteredNews.length === 0) {
      newsData = <h1>No data found</h1>
    } else {
      newsData = filteredNews.map((newsItem: any, index) => {
        return <NewsCard key={index} newsItem={newsItem} />
      })
    }
  }

  const handleFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setFilterObj({ ...filterObj, [e.target.name]: e.target.value })
  }

  const personaliseNewsHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPersonalizeCategory(e.target.value)
    localStorage.setItem("personaliseCategory", e.target.value)
  }

  return (
    <div className={classes.container}>
      {/* Search News */}
      <form onSubmit={searchHandler}>
        <input
          type="text"
          onChange={e => setKeyword(e.target.value)}
          placeholder="What you are looking for..."
        />
        <input type="submit" />
      </form>
      {/* Personalise your news */}
      <div className={classes.personaliseNews}>
        <h2>Personalise your news</h2>
        <div>
          <label htmlFor="Category">Category: </label>
          <select
            name="category"
            id="personaliseCategoty"
            onChange={personaliseNewsHandler}
          >
            {category.map(item => {
              return <option value={item}>{item}</option>
            })}
          </select>
        </div>
        <div>
          {localStorage.getItem("personaliseCategory") && (
            <p>
              Persionalised category:{" "}
              {localStorage.getItem("personaliseCategory")}
            </p>
          )}
        </div>
      </div>

      {/* News List */}
      <div className={classes.newsContainer}>
        {/* Filters */}
        {status === "loaded" && <Filter handleFilter={handleFilter} />}
        <div className={classes.newsList}>{newsData}</div>

        <h2>Personalise News Feeds</h2>
        <div className={classes.newsList}>
          <PersonalizedNews personalizeCategory={personalizeCategory} />
        </div>
      </div>
    </div>
  )
}

export default News
