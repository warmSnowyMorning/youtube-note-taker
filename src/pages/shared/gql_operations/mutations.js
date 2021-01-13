import { gql } from 'apollo-boost'

export const createUser = gql`
    mutation($data:CreateUserInput!) {
        createUser(
            data: $data
        ){
            token,
            user {
                id
                name
                email
            }
        }
    }
`

export const login = gql`
    mutation($data:LoginUserInput!) {
        login(
            data: $data
        ){
            token
        }
    }
`
export const createVideo = gql`
  mutation($data:CreateVideoInput!) {
    createVideo(data: $data) {
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
export const updateVideo = gql`
  mutation($data: UpdateVideoInput!) {
    updateVideo(data: $data) {
      id
      name
      categories {
        name
        id
      }
      
    }
  }
`

export const createNote = gql`
  mutation($data: CreateNoteInput!) {
    createNote(data: $data) {
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
export const updateNote = gql`
  mutation($data:UpdateNoteInput!) {
    updateNote(data:$data) {
      content
      id
      starred
      time
      categories {
        name
        id
      }
    }
  }
`
export const deleteNote = gql`
  mutation($id: ID!){
    deleteNote(id: $id) {
      id 
      content
    }
  }
`
export const createCategory = gql`
  mutation($name: String!) {
    createCategory(name: $name) {
      id
      name
    }
  }
`
export const deleteCategory = gql`
  mutation($id:ID!) {
    deleteCategory(id:$id) {
      id
      name
    }
  }
`
export const updateCategory = gql`
  mutation($data: UpdateCategoryInput!) {
    updateCategory(data: $data) {
      name
      id
    }
  }
`