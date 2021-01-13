export default (dt) => {
  const diff = dt - chrome._LAST_RUN;
  if (diff <= 75) {
    return false;
  } else {
    return true;
  }
};
