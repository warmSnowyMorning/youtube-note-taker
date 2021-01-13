import React from 'react'
import ConnectCategory from './ConnectCategory'
import CategoriesList from './CategoriesList'
import { useEffect } from 'react'
import { useState } from 'react'
import CategoriesContext from '../../../context/CategoriesContext'
import getClient from '../../../shared/utils/getClient'
import { useContext } from 'react'
import TokenContext from '../../../context/TokenContext'
import { myCategories } from '../../../shared/gql_operations/queries'
export default (props) => {


  return (
    <div>
      <CategoriesList />
      <ConnectCategory />
    </div>
  )
}

