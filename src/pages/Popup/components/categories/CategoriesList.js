import React, { useContext } from 'react'
import CategoriesContext from '../../../context/CategoriesContext'
import CategoriesListItem from './CategoriesListItem'

export default () => {
  const [categories, set_categories] = useContext(CategoriesContext)

  return (
    <div>
      {categories.length > 0 ? categories.map((category) => <CategoriesListItem category={category} key={category.id} />) : <h1>There are no categories to view</h1>}
    </div>
  )
}