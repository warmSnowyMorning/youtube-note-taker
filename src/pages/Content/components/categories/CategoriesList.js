import React from 'react'
import { useContext } from 'react'
import CategoriesContext from '../../../context/CategoriesContext'
import CategoriesListItem from './CategoriesListItem'
import ConnectedCategoriesContext from '../../../context/ConnectedCategoriesContext'
export default (props) => {
  const [connectedCategories] = useContext(ConnectedCategoriesContext)
  return (
    <div>
      {connectedCategories.length > 0 && connectedCategories.map((category) => <CategoriesListItem key={category.id} category={category} />)}
    </div>
  )
}