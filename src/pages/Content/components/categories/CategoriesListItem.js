import React from 'react'
import { useContext } from 'react'
import EditModeContext from '../../../context/EditModeContext'
import CategoriesContext from '../../../context/CategoriesContext'
import ConnectedCategoriesContext from '../../../context/ConnectedCategoriesContext'
export default (props) => {
  const { category } = props
  const [editMode] = useContext(EditModeContext)
  const [connectedCategories, set_connectedCategories] = useContext(ConnectedCategoriesContext)

  const handleDisconnectCategory = (e) => {
    set_connectedCategories(connectedCategories.filter((cCat) => cCat.id !== category.id))
  }

  return (
    <span>
      {category.name}
      {editMode && <span onClick={handleDisconnectCategory}> X</span>}
    </span>
  )
}