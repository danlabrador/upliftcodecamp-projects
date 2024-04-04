import SpotifyAPI from './util/SpotifyAPI.js';

(async () => {
  const spotifyAPI = new SpotifyAPI();
  const tracks = await spotifyAPI.searchTracks('Never Gonna Give You Up');
  console.log(tracks);

  const user = await spotifyAPI.getUser();
  console.log(user);

  const playlist = await spotifyAPI.createPlaylist('Rick Roll 3');
  console.log(playlist);

  const uriArr = tracks.map(track => track.uri);
  const uris = uriArr.join(',');
  const savedPlaylist = await spotifyAPI.addTracksToPlaylist(playlist, uriArr);

  console.log(savedPlaylist);
})()

/**
 * @class SpotifyAPI - handles all Spotify API requests
 * 
 * @constructor
 *   @property {string} _accessToken - Spotify access token
 *   @property {number} _expiresIn - Time in seconds until the access token expires
 *   @property {string} _userId - Spotify user ID
 * 
 * @method getAccessToken - Retrieves the access token from the URL
 *   @returns {string} - Spotify access token
 * 
 * @method searchTracks - Searches for tracks on Spotify
 *   @param {string} term - Search term
 *   @returns {Array} - Array of track objects
 * 
 * @method getUser - Retrieves the user's Spotify profile
 *   @returns {Object} - User object
 * 
 * @method createPlaylist - Creates a new playlist in the user's Spotify account
 *   @param {string} name - Playlist name
 *   @returns {Object} - Playlist object
 * 
 * @method addTracksToPlaylist - Saves a playlist to the user's Spotify account
 *   @param {Object} playlist - Playlist object
 *   @param {Array} uriArr - Array of track URIs
 *   @returns {Object} - Playlist object
 */