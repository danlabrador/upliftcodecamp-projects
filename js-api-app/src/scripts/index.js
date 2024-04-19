/**
 * Entry point script for initializing and demonstrating the functionality of the Playlist Manager application.
 * Utilizes the SpotifyAPI to fetch and manage tracks, showcasing the capabilities of the PlaylistManager class.
 * The script demonstrates initializing the application.
 *
 * @requires SpotifyAPI - The Spotify API wrapper to interact with Spotify Web API.
 * @requires PlaylistManager - Manages playlist creation, track recommendations, and staging playlists.
 *
 * @function main - Asynchronous function to initialize the application.
 * Calls the `init` method on the PlaylistManager instance..
 *
 * @function consoleTest - Logs current track suggestions and the staging playlist to the console for testing and demonstration purposes.
 * @param {PlaylistManager} manager - The instance of PlaylistManager containing track suggestions and staging playlist data.
 */


import SpotifyAPI from './util/SpotifyAPI.js';
import PlaylistManager from './PlaylistManager.js';

const spotify = new SpotifyAPI();
const manager = new PlaylistManager(spotify);

const main = async () => {
  // Initialize Application
  await manager.init();
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
