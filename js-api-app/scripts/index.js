import SpotifyAPI from './util/SpotifyAPI.js';
import PlaylistManager from './PlaylistManager.js';

const main = async () => {
  const spotify = new SpotifyAPI();
  const playlistManager = new PlaylistManager(spotify);

  const user = await spotify.getUser();

  let searchResults = await playlistManager.searchTracks('lofi');
  reviewPlaylists(playlistManager);

  searchResults = await playlistManager.recommendTracks('Modern Christian music', user.id);
  reviewPlaylists(playlistManager);

}

function reviewPlaylists(playlistManager) {
  console.log(playlistManager.trackSuggestions);
  console.log('Track Suggestions');
  console.log(playlistManager.stagingPlaylist);
  console.log('Staging Playlist');
  console.log('-------------------------------')
}

async function test() {
  const spotify = new SpotifyAPI();

  const searchResults = await spotify.searchTracks('jazz');
  console.log(searchResults[0]);
}

main();
// test();
