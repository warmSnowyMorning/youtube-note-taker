import React from 'react'
import AddCategory from './AddCategory'
import CategoriesList from './CategoriesList'

export default (props) => {
  const { set_managingCategories } = props

  return (
    <div>
      <AddCategory />
      <CategoriesList />
      categories container
      <button onClick={() => set_managingCategories(false)}>Done</button>
    </div>
  )
}