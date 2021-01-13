import React, { useEffect, useState, useContext } from 'react'
import getClient from '../../shared/utils/getClient'
import { queryVideo, myCategories } from '../../shared/gql_operations/queries'
import ShowVideo from '../components/ShowVideo'
import AddVideo from '../components/AddVideo'
import Loading from '../../shared/components/Loading'
import VideoContext from '../../context/VideoContext'
import CategoriesContext from '../../context/CategoriesContext'
import TokenContext from '../../context/TokenContext'


export default () => {
  const [videoExists, set_videoExists] = useState({})
  const [loading, set_loading] = useState(true)
  const [categories, set_categories] = useState([])
  const [token, set_token] = useContext(TokenContext)

  useEffect(() => {
    console.log('mounting YT_VNC');
    (async () => {
      const client = getClient(token)
      const videoData = await client.query({ query: queryVideo, variables: { query: window.location.toString() } })
      const categoryData = await client.query({ query: myCategories })
      set_categories(categoryData.data.myCategories)
      if (videoData.data.myVideos.length > 0) {
        set_videoExists(videoData.data.myVideos[0])
      }
      console.log('setting categories context', categoryData.data.myCategories)
      set_loading(false)
    })()

  }, [])
  return (
    <div className="__YT_VNC">

      {loading ? <Loading /> : Object.keys(videoExists).length > 0 ? (
        <CategoriesContext.Provider value={[categories, set_categories]}>
          <ShowVideo video={videoExists} />
        </CategoriesContext.Provider>
      ) : <AddVideo set_videoExists={set_videoExists} />}


    </div>
  )
}