
import React, { useState, useEffect, useContext, useRef } from "react"
import CategoriesContext from "../../../context/CategoriesContext";
import ConnectedCategoriesContext from "../../../context/ConnectedCategoriesContext";

export default ({ category }) => {
  const isInitialMount = useRef(true);
  const [checkboxState, set_checkboxState] = useState(false)
  const [connectedCategories, set_connectedCategories] = useContext(ConnectedCategoriesContext)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      set_connectedCategories([...connectedCategories, category])
    }
  }, [checkboxState])

  return (
    <label htmlFor={category.id}>
      {category.name}
      <input type="checkbox" checked={checkboxState} onChange={() => set_checkboxState(!checkboxState)} />
    </label>
  )
}