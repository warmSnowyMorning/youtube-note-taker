import React, { useContext } from 'react'
// import CategoriesContext from '../../../context/CategoriesContext'
import { useState } from 'react'
import useGetUnusedCategories from '../../../shared/utils/useGetUnusedCategories'
import EditModeContext from '../../../context/EditModeContext'
import ConnectCategoryItem from './ConnectCategoryItem'

export default (props) => {
  const unselectedCategories = useGetUnusedCategories()
  const [editMode] = useContext(EditModeContext)
  const [categoriesExpanded, set_categoriesExpanded] = useState(false)

  return (
    <div>
      {editMode && <button onClick={() => {
        console.log(unselectedCategories)
        set_categoriesExpanded(!categoriesExpanded)
      }}></button>}
      <div>
        {categoriesExpanded && editMode && unselectedCategories.map((category) => <ConnectCategoryItem key={category.id} category={category} />)}
      </div>
    </div>
  )
}