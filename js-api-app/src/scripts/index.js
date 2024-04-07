import SpotifyAPI from './util/SpotifyAPI.js';
import PlaylistManager from './PlaylistManager.js';

const main = async () => {
  const spotify = new SpotifyAPI();
  spotify.init();
}

main();

// ----------------------------
function consoleTest(manager) {
  console.log('Track Suggestions')
  console.log(manager.trackSuggestions);
  console.log(' ')
  console.log('Staging Playlist')
  console.log(manager.stagingPlaylist);
  console.log('------------------------')
  console.log(' ')
}
