import React from 'react'
import NotesContainer from './notes/NotesContainer'
import CategoriesContainer from './categories/CategoriesContainer'
import { useContext, useState, useEffect, useRef } from 'react'
import VideoContext from '../../context/VideoContext'
import EditModeContext from '../../context/EditModeContext'
import TokenContext from '../../context/TokenContext'
import CategoriesContext from '../../context/CategoriesContext'
import getClient from '../../shared/utils/getClient'
import { myCategories } from '../../shared/gql_operations/queries'
import ConnectCategory from './categories/ConnectCategory'
import { updateVideo } from '../../shared/gql_operations/mutations'
import handlingCatChangesLogic from '../utils/handlingCatChangesLogic.js'
import ConnectedCategoriesContext from '../../context/ConnectedCategoriesContext'

export default (props) => {
  const { video } = props
  const [name, set_name] = useState(video.name)
  const [preEditName, set_preEditName] = useState(video.name)
  const [editMode, set_editMode] = useState(false)
  const [initialCategories, set_initialCategories] = useState(video.categories)
  const [connectedCategories, set_connectedCategories] = useState(video.categories)

  const [token, set_token] = useContext(TokenContext)
  // useEffect(() => {
  //   const client = getClient(token)
  //   client.query({ query: myCategories }).then((res) => {
  //     set_categories(res.data.myCategories)
  //     chrome.runtime.onConnect.addListener(chromeListenerHandleCategoryChange)
  //   }, (err) => console.log('connected categories container', err))

  //   return () => {
  //     chrome.runtime.onConnect.removeListener(chromeListenerHandleCategoryChange)
  //   }
  // }, [])

  // const chromeListenerHandleCategoryChange = (port) => {
  //   if (port.name === 'categoryChange') {
  //     console.log(port)
  //   }
  // }

  const handleEditModeChange = async (e) => {
    if (editMode) {

      const data = {
        ...(!(name.length === preEditName.length && preEditName.includes(name)) && {
          name
        })
      }
      console.log('logging data obj', data, name.length === preEditName.length && preEditName.includes(name))
      const result = await handlingCatChangesLogic(initialCategories, connectedCategories, token, video.id, data, 'video')
      console.log(result, 'result')
      if (result) {
        set_preEditName(result.name)
        set_name(result.name)
        set_initialCategories(result.categories)
        set_editMode(!editMode)
      } else {
        set_editMode(!editMode)
      }
    } else {
      set_editMode(!editMode)

    }
  }
  return (
    <div className="__show-video">
      <NotesContainer video={video} />

      {editMode ? <input type="text" value={name} onChange={(e) => set_name(e.target.value)} className="__name-edit_mode"></input> : <p>{name}</p>}
      <EditModeContext.Provider value={[editMode]}>
        <input type="submit" value={editMode ? 'save' : 'edit'} onClick={handleEditModeChange}></input>
        <ConnectedCategoriesContext.Provider value={[connectedCategories, set_connectedCategories]}>
          <CategoriesContainer />
        </ConnectedCategoriesContext.Provider>


      </EditModeContext.Provider>
    </div>
  )
}