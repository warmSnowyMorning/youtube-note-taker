import React from 'react'
import { useState } from 'react'
import getClient from '../../../shared/utils/getClient'
import { useContext } from 'react'
import TokenContext from '../../../context/TokenContext'
import CategoriesContext from '../../../context/CategoriesContext'
import { createCategory } from '../../../shared/gql_operations/mutations'

export default () => {
  const [name, set_name] = useState('')
  const [token, set_token] = useContext(TokenContext)
  const [categories, set_categories] = useContext(CategoriesContext)

  const handleAddCategory = async (e) => {
    e.preventDefault()

    if (name) {
      const client = getClient(token)
      const data = await client.mutate({
        mutation: createCategory, variables: {
          name
        }
      })
      set_categories([...categories, data.data.createCategory])
    }
  }
  return (
    <form action="" onSubmit={handleAddCategory}>
      <div>
        <label htmlFor="__category-name" autoComplete="off">Name: </label>
        <input type="text" value={name} onChange={(e) => set_name(e.target.value)} id='__category-name' />
        <input type="submit" value="Add" />
      </div>
    </form>
  )
}