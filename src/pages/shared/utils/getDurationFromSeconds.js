export default (seconds) => {
  const str = new Date(seconds * 1000).toISOString().substr(11, 8)
  const strArr = str.split('')
  let foundIndex;
  for (let index = 0; index < strArr.length; index++) {
    if (!(strArr[index] === ':' || strArr[index] === '0')) {
      foundIndex = index
      break
    }

  }

  return str.substr(foundIndex)
}