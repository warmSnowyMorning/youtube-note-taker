import React from 'react'
import getClient from '../../shared/utils/getClient'
import { createVideo } from '../../shared/gql_operations/mutations'
import { useContext } from 'react'
import TokenContext from '../../context/TokenContext'


export default (props) => {
  const { set_videoExists } = props
  const [token] = useContext(TokenContext)

  const handleAddVideo = async (e) => {
    //const video = document.getElementsByClassName('video-stream')[0]
    const length = document.querySelector(".ytp-time-duration").innerHTML

    const channel = document.querySelector('.yt-formatted-string').getAttribute('href')
    const uploadDate = document.querySelector('#date.ytd-video-primary-info-renderer:last-child').lastElementChild.innerHTML.replace('Premiered ', '')
    const name = document.querySelector('.title.ytd-video-primary-info-renderer').innerText
    const url = window.location.toString()
    const variables = {
      data: {
        url,
        length,
        channel: `https://www.youtube.com${channel}`,
        name,
        uploadDate,
      }
    }
    console.log('createVideo variables', variables)

    const client = getClient(token)
    const data = await client.mutate({ mutation: createVideo, variables })
    console.log('createVideo', data)
    set_videoExists(data.data.createVideo)
  }

  return (
    <div className="__round-container">
      <span onClick={handleAddVideo} className="__add-video-button">+</span>
    </div>
  )
} 