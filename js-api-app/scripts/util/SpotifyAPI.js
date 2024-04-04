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
 *   @returns {Array[Object]} - Array of track objects
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
 *   @param {Array[Object]} uriArr - Array of track URIs
 *   @returns {Object} - Playlist object
 */

import RetryUtil from './RetryUtil.js';
const SPOTIFY_CLIENT_ID = 'c9bcd3ce9d3245cfbaa0a14c7d8e8ff0';

class SpotifyAPI {
  constructor() {
    this._accessToken = null;
    this._expiresIn = null;
    this._userId = null;
  }

  getAccessToken() {
    const url = window.location.href;
    const accessTokenMatch = url.match(/access_token=([^&]*)/);

    if (this._accessToken) {
      return this._accessToken;
    } else if (accessTokenMatch) {
      this._accessToken = accessTokenMatch[1];
      this._expiresIn = url.match(/expires_in=([^&]*)/)[1];

      // Clear the access token after it expires
      window.setTimeout(() => this._accessToken = '', this._expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return this._accessToken;
    } else {
      const spotifyAuthorizeEndpoint = 'https://accounts.spotify.com/authorize';

      // Encode the redirect URL to be used in the Spotify API request
      let redirectURLAfterLogin = url.replaceAll('/', '%2F');
      redirectURLAfterLogin = redirectURLAfterLogin.replaceAll('-', '%2D');

      const scopes = ['playlist-modify-public'];
      const spaceDelimiter = "%20";
      const scopesURLParam = scopes.join(spaceDelimiter);

      // Redirect the user to the Spotify login page
      window.location = `${spotifyAuthorizeEndpoint}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${redirectURLAfterLogin}&scope=${scopesURLParam}&response_type=token&show_dialogue=true`;
    }
  }

  async searchTracks(term) {
    const headers = { Authorization: `Bearer ${this.getAccessToken()}` };
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers });

    const isRateLimited =
      response.status === RetryUtil.TOO_MANY_REQUESTS ||
      response.status === RetryUtil.SERVICE_UNAVAILABLE;

    if (isRateLimited) {
      const retryAfter = response.headers.get('Retry-After');
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        return RetryUtil.retryAfterError(3, this.searchTracks(term), delay);
      }
    }

    const json = await response.json();

    if (!json) return [];

    const unmappedSearchResults = await json.tracks.items;

    const searchResults = await unmappedSearchResults.map(track => {
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }
    })

    return searchResults;
  }

  async getUser() {
    const headers = { Authorization: `Bearer ${this.getAccessToken()}` };

    const response = await fetch('https://api.spotify.com/v1/me', { headers });

    const isRateLimited =
      response.status === RetryUtil.TOO_MANY_REQUESTS ||
      response.status === RetryUtil.SERVICE_UNAVAILABLE;

    if (isRateLimited) {
      const retryAfter = response.headers.get('Retry-After');
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        return RetryUtil.retryAfterError(3, this.getUser(), delay);
      }
    }

    const json = await response.json();
    return json;
  }

  async createPlaylist(name) {
    if (!name) return;

    const user = await this.getUser();
    const userId = await user.id;

    const headers = { Authorization: `Bearer ${this.getAccessToken()}` }
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ name: name })
    }

    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, options);

    const isRateLimited =
      response.status === RetryUtil.TOO_MANY_REQUESTS ||
      response.status === RetryUtil.SERVICE_UNAVAILABLE;

    if (isRateLimited) {
      const retryAfter = response.headers.get('Retry-After');
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        return RetryUtil.retryAfterError(3, this.createPlaylist(name), delay);
      }
    }

    const json = await response.json();
    return json;
  }

  async addTracksToPlaylist(playlist, uriArr) {
    if (!uriArr) return;

    const headers = { Authorization: `Bearer ${this.getAccessToken()}` }
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ uris: uriArr })
    }

    const playlistId = await playlist.id;

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, options);

    const isRateLimited =
      response.status === RetryUtil.TOO_MANY_REQUESTS ||
      response.status === RetryUtil.SERVICE_UNAVAILABLE;

    if (isRateLimited) {
      const retryAfter = response.headers.get('Retry-After');
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        return RetryUtil.retryAfterError(3, this.addTracksToPlaylist(uriArr), delay);
      }
    }

    const json = await response.json();
    return json;
  }
}

export default SpotifyAPI;
