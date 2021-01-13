export default (url) => {
  const urlParts = url.split('/');
  const youtubeMatched = urlParts[2].includes('youtube');
  const navigatedToVideoPage = urlParts[3].slice(0, 5) === 'watch';

  return {
    youtubeMatched,
    navigatedToVideoPage,
  };
};
