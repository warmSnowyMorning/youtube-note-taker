import { gql } from 'apollo-boost'

export const me = gql`
  query{
    me {
      name
    }
  }
`
export const queryVideo = gql`
  query($query: String!) {
    myVideos(query: $query) {
      id
      url
      channel
      length
      name
      uploadDate
      categories {
        name
        id
      }
      notes {
        content
        id
        starred
        time
        categories {
          id
          name
        } 
      }
    }
  }
`
export const myNotes = gql`
  query($videoId: String) {
    myNotes(videoId: $videoId) {
      content
      id
      starred
      time
      categories {
        id
        name
      } 
    }
  }
`
export const myCategories = gql`
  query {
    myCategories {
      id
      name
    }
  }
`