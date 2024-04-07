import SpotifyAPI from './util/SpotifyAPI.js';
import PlaylistManager from './PlaylistManager.js';

const main = async () => {
  const spotify = new SpotifyAPI();
  const playlistManager = new PlaylistManager(spotify);

  const user = await spotify.getUser();

  let searchResults = await playlistManager.searchTracks('lofi');
  playlistManager.addTracksToStaging(searchResults.slice(0, 5));
  reviewPlaylists(playlistManager);

  searchResults = await playlistManager.recommendTracks('Recommend songs by Billie Eilish', user.id);
  playlistManager.addTracksToStaging(searchResults.slice(0, 5));
  reviewPlaylists(playlistManager);

  searchResults = await playlistManager.recommendNewTracks(spotify);
  playlistManager.addTracksToStaging(searchResults.slice(0, 5));
  reviewPlaylists(playlistManager);

  playlistManager.removeFromStaging(playlistManager.stagingPlaylist[0]);
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
