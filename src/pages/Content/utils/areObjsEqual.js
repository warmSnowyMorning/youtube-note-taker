export default (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  let areSame = true
  for (let xyz in obj1) {
    if (obj1[xyz] !== obj2[xyz]) areSame = false;
  }

  return areSame
}