import type React from "react"
import classes from "./Filter.module.css"
import { useAppSelector } from "../../hooks"
import {
  selectNewsSourceList,
  selectNewsCategoryList,
} from "../../store/reducers/newsSlice"
type HandleFilterProps = (
  event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
) => void

const Filter = ({ handleFilter }: { handleFilter: HandleFilterProps }) => {
  const categoryList = useAppSelector(selectNewsCategoryList)
  const sourceList = useAppSelector(selectNewsSourceList)
  return (
    <div className={classes.filters}>
      {/* Category */}
      <div>
        <label htmlFor="category">Category:</label>
        <select name="category" id="category" onChange={handleFilter}>
          <option value="">All</option>
          {categoryList.map(category => {
            return <option value={category}>{category}</option>
          })}
        </select>
      </div>
      <div>
        {/* source */}
        <label htmlFor="source"> Source:</label>
        <select name="source" id="source" onChange={handleFilter}>
          <option value="">All</option>
          {sourceList.map(source => {
            return <option value={source}>{source}</option>
          })}
        </select>
      </div>
      <div>
        {/* Date */}
        <label htmlFor="Date"> Date:</label>
        <input name="date" type="date" onChange={handleFilter} />
      </div>
    </div>
  )
}

export default Filter
