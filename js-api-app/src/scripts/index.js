import SpotifyAPI from './util/SpotifyAPI.js';
import PlaylistManager from './PlaylistManager.js';

const spotify = new SpotifyAPI();
const manager = new PlaylistManager(spotify);

const main = async () => {
  // Initialize Application
  await manager.init();
  const tracks = await manager.recommendNewTracks(spotify);
}

function consoleTest(manager) {
  console.log('Track Suggestions')
  console.log(manager.trackSuggestions);
  console.log(' ')
  console.log('Staging Playlist')
  console.log(manager.stagingPlaylist);
  console.log('------------------------')
  console.log(' ')
}

main();
