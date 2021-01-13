import getClient from "../../shared/utils/getClient";
import { updateNote, updateVideo } from "../../shared/gql_operations/mutations";


export default async (initialCategories, connectedCategories, token, id, fields, mode) => {
  const client = getClient(token)
  let mutation;
  let mutationName;
  if (mode === 'video') {
    mutation = updateVideo
    mutationName = 'updateVideo'
  } else if (mode === 'note') {
    mutation = updateNote
    mutationName = 'updateNote'
  }


  if (initialCategories.length === connectedCategories.length) {
    let bothSame = true
    if (initialCategories.length > 0) {
      for (let i = 0; i < initialCategories.length; i++) {
        const initCat = initialCategories[i];
        if (!(connectedCategories.some((conCat) => initCat.id === conCat.id))) {
          bothSame = false
          break
        }
      }
    }
    console.log(bothSame, fields)
    if (bothSame) {
      if (Object.keys(fields).length > 0) {
        const variables = {
          data: {
            ...fields,
            id
          }
        }
        const data = await client.mutate({ mutation, variables })
        return data.data[mutationName]
      } else {
        console.log('handlingCatChangesLogic.  both same and empty obj passed in')
        return null
      }
    } else {
      const variables = {
        data: {
          ...fields,
          id,
          deleteFirst: true,
          connectCategories: connectedCategories.map((cat) => ({ id: cat.id })),
          initialCategories: initialCategories.map((cat) => ({ id: cat.id }))
        }
      }
      const data = await client.mutate({ mutation, variables })
      return data.data[mutationName]
    }
  } else {

    let variables;
    if (initialCategories.length === 0 && connectedCategories.length > 0) {
      //add all
      variables = {
        data: {
          ...fields,
          id,
          connectCategories: connectedCategories.map((cat) => ({ id: cat.id }))
        }
      }

    } else if (initialCategories.length > 0 && connectedCategories.length === 0) {
      //disconnect all
      variables = {
        data: {
          ...fields,
          id,
          disconnectCategories: initialCategories.map((cat) => ({ id: cat.id }))
        }
      }
    } else {
      variables = {
        data: {
          ...fields,
          id,
          deleteFirst: true,
          connectCategories: connectedCategories.map((cat) => ({ id: cat.id })),
          initialCategories: initialCategories.map((cat) => ({ id: cat.id }))
        }
      }
    }
    const data = await client.mutate({ mutation, variables })
    return data.data[mutationName]
  }
}