import React, { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks"
import {
  getPersonalizedNews,
  selectPersonalNews,
  selectPersonalNewsStatus,
} from "../../store/reducers/newsSlice"

import NewsCard from "../NewsCard/NewsCard"
import classes from "./PersonalizedNews.module.css"

const PersonalizedNews = ({
  personalizeCategory,
}: {
  personalizeCategory: string
}) => {
  const dispatch = useAppDispatch()
  const personalNews = useAppSelector(selectPersonalNews)
  const status = useAppSelector(selectPersonalNewsStatus)

  useEffect(() => {
    console.log("personalizeCategory", personalizeCategory)
    if (personalizeCategory) {
      dispatch(getPersonalizedNews(personalizeCategory))
    }
  }, [personalizeCategory])

  let personalizedNewsData: any
  if (status === "loading") {
    personalizedNewsData = <h1>Loading...</h1>
  }
  if (status === "failed") {
    personalizedNewsData = <h1>Failed to load data</h1>
  }

  if (status === "loaded") {
    console.log("personalNews", personalNews)
    personalizedNewsData = personalNews.map((newsItem: any, index) => {
      return <NewsCard key={index} newsItem={newsItem} />
    })
  }
  return (
    <div className={classes.personalisedNews}>
      {!localStorage.getItem("personaliseCategory") && (
        <h3 style={{ color: "gray" }}>You have not personalised news Feeds.</h3>
      )}
      {personalizedNewsData}
    </div>
  )
}

export default PersonalizedNews
