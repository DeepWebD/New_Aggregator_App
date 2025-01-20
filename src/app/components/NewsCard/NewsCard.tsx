import type React from "react"
import classes from "./NewsCard.module.css"
import type { NewsResponse } from "../../Types"

const NewsCard: React.FC<{ newsItem: NewsResponse }> = ({ newsItem }) => {
  const {
    title = "",
    description = "",
    url = "",
    id = "",
    author = "",
    source = "",
    category = "",
    date = "",
  } = newsItem

  return (
    <div className={classes.newsCard} key={id}>
      <p className={classes.category}> Category: {category}</p>
      <p className={classes.date}>{date.split("T")[0]}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      {source && <p>Source : {source}</p>}
      {author && <p>Author : {author}</p>}
      <a href={url} target="_blank" rel="noreferrer">
        Read more...
      </a>
    </div>
  )
}

export default NewsCard
