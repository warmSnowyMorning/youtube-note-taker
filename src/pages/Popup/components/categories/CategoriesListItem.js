import React from 'react'
import getClient from '../../../shared/utils/getClient'
import { useContext } from 'react'
import TokenContext from '../../../context/TokenContext'
import { deleteCategory } from '../../../shared/gql_operations/mutations'
import CategoriesContext from '../../../context/CategoriesContext'

export default ({ category }) => {
  const [token, get_token] = useContext(TokenContext)
  const [categories, set_categories] = useContext(CategoriesContext)

  const handleRemoveCategory = async () => {
    const client = getClient(token)
    const data = await client.mutate({
      mutation: deleteCategory,
      variables: {
        id: category.id
      }
    })

    set_categories(categories.filter((cat) => cat.id !== category.id))
  }

  return (
    <div>
      <h3>{category.name}</h3>
      <button onClick={handleRemoveCategory}>X</button>
    </div>
  )
}