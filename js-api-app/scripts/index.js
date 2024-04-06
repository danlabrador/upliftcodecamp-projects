import SpotifyAPI from './util/SpotifyAPI.js';
import PlaylistManager from './PlaylistManager.js';

const main = async () => {
  const spotify = new SpotifyAPI();
  const playlistManager = new PlaylistManager(spotify);

  let searchResults = await playlistManager.searchTracks('lofi');
  reviewPlaylists(playlistManager);

  const firstTrack = searchResults[0];
  playlistManager.addToStaging(firstTrack);
  reviewPlaylists(playlistManager);

  searchResults = await playlistManager.searchTracks('jazz');
  reviewPlaylists(playlistManager);

  const secondTrack = searchResults[0];
  playlistManager.addToStaging(secondTrack);
  reviewPlaylists(playlistManager);

  // const playlistName = 'TestData';
  // const playlist = await playlistManager.savePlaylist(playlistName);
  // console.log(playlist);
  // console.log('Playlist Saved');
  // reviewPlaylists(playlistManager);
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
