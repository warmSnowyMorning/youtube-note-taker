import ApolloBoost from 'apollo-boost'

export default (jwt) => {
  return new ApolloBoost({
    uri: 'https://secure-thicket-21144.herokuapp.com/',
    request(operation) {
      if (jwt) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      }
    }
  })
}

