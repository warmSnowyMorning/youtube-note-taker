import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import async_setContentJSauth from '../utils/async_setContentJSauth'
import CategoriesContainer from '../components/categories/CategoriesContainer'
import getClient from '../../shared/utils/getClient'
import TokenContext from '../../context/TokenContext'
import { myCategories } from '../../shared/gql_operations/queries'
import CategoriesContext from '../../context/CategoriesContext'



export default (props) => {
  const [authStage, set_authStage] = useContext(AuthContext)
  const [categories, set_categories] = useState([])
  const [categoriesReady, set_categoriesReady] = useState(false)
  const [managingCategories, set_managingCategories] = useState(false)
  const [token, set_token] = useContext(TokenContext)

  useEffect(() => {
    (async () => {
      console.log('token from YT_VNC popup', token)
      const client = getClient(token)
      const data = await client.query({ query: myCategories })
      console.log('categories', data.data.myCategories)
      set_categories(data.data.myCategories)
      set_categoriesReady(true)
    })()
  }, [])

  const handleSignOut = () => {
    chrome.storage.local.set({
      token: '',
      options: {
        stay_signed_in: false,
      }
    }, () => {
      set_authStage('login')
      async_setContentJSauth('login')

    })
  }

  //login, validated, signUp
  return (
    <div className="__YT_VNC">
      {managingCategories ? <CategoriesContext.Provider value={[categories, set_categories]}><CategoriesContainer set_managingCategories={set_managingCategories} /></CategoriesContext.Provider> : <button disabled={!categoriesReady} onClick={() => set_managingCategories(true)}>Manage Categories</button>}
      <button onClick={handleSignOut}>sign out</button>
    </div>
  )
}