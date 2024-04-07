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
 *   @docs https://developer.spotify.com/documentation/web-api/reference/search
 *   @param {string} term - Search term
 *   @param {number} [limit=20] - Number of search results to limit (default: 20)
 *   @returns {Array<Object>} - Array of track objects
 * 
 * @method getRecommendations - Retrieves track recommendations based on seed tracks
 *   @docs https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 *   @param {Array<Object>} tracks - Array of seed track objects
 *   @param {number} [limit=20] - Number of recommendations to limit (default: 20)
 *   @returns {Array<Object>} - Array of track objects
 * 
 * @method getNewReleases - Retrieves new album releases
 *   @docs https://developer.spotify.com/documentation/web-api/reference/get-new-releases
 *   @param {number} [limit=20] - Number of new releases to limit (default: 20)
 *   @returns {Array<Object>} - Array of album objects
 * 
 * @method getTracksFromAlbum - Retrieves tracks from an album
 *   @docs https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
 *   @param {Object} album - Album object
 *   @param {number} [limit=1] - Number of tracks to limit (default: 1)
 *   @returns {Array<Object>} - Array of track objects
 * 
 * @method getUser - Retrieves the user's Spotify profile
 *   @docs https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 *   @returns {Object} - User object
 * 
 * @method createPlaylist - Creates a new playlist in the user's Spotify account
 *   @docs https://developer.spotify.com/documentation/web-api/reference/create-playlist
 *   @param {string} name - Playlist name
 *   @returns {Object} - Playlist object
 * 
 * @method addTracksToPlaylist - Saves a playlist to the user's Spotify account
 *   @docs https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
 *   @param {Object} playlist - Playlist object
 *   @param {Array<string>} uriArr - Array of track URIs
 *   @returns {Object} - Playlist object
 */

import RetryUtil from './RetryUtil.js';
import Track from '../Track.js';

class SpotifyAPI {
  constructor() {
    this._accessToken = null;
    this._expiresIn = null;
    this._userId = null;
  }

  init() {
    this.getAccessToken();
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
      window.location = `${spotifyAuthorizeEndpoint}?client_id=${process.env.AURORA_BEATS_SPOTIFY_CLIENT_ID}&redirect_uri=${redirectURLAfterLogin}&scope=${scopesURLParam}&response_type=token&show_dialogue=true`;
    }
  }

  async searchTracks(term, limit = 20) {
    const headers = { Authorization: `Bearer ${this.getAccessToken()}` };
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=${limit}`, { headers });

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
      const newTrack = new Track();
      newTrack.useSpotifyData(track);
      return newTrack;
    })

    return searchResults;
  }

  async getRecommendations(tracks, limit = 20) {
    const endpoint = `https://api.spotify.com/v1/recommendations?limit=${limit}`;
    const seedTracks = tracks.slice(0, 5).map(track => track.spotify_id).join(',');
    const headers = { Authorization: `Bearer ${this.getAccessToken()}` };

    const response = await fetch(`${endpoint}&seed_tracks=${seedTracks}`, { headers });

    const isRateLimited =
      response.status === RetryUtil.TOO_MANY_REQUESTS ||
      response.status === RetryUtil.SERVICE_UNAVAILABLE;

    if (isRateLimited) {
      const retryAfter = response.headers.get('Retry-After');
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        return RetryUtil.retryAfterError(3, this.getRecommendations(tracks), delay);
      }
    }

    const json = await response.json();

    const unmappedRecommendations = await json.tracks;

    const recommendations = await unmappedRecommendations.map(track => {
      const newTrack = new Track();
      newTrack.useSpotifyData(track);
      return newTrack;
    });

    return recommendations;
  }

  async getNewReleases(limit = 20) {
    const endpoint = `https://api.spotify.com/v1/browse/new-releases?limit=${limit}`;
    const headers = { Authorization: `Bearer ${this.getAccessToken()}` };
    const response = await fetch(endpoint, { headers });

    const isRateLimited =
      response.status === RetryUtil.TOO_MANY_REQUESTS ||
      response.status === RetryUtil.SERVICE_UNAVAILABLE;

    if (isRateLimited) {
      const retryAfter = response.headers.get('Retry-After');
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        return RetryUtil.retryAfterError(3, this.getNewGlobalReleases(), delay);
      }
    }

    const json = await response.json();

    return json.albums.items;
  }

  async getTracksFromAlbum(album, limit = 1) {
    if (!album) return;

    const endpoint = `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=${limit}`;
    const headers = { Authorization: `Bearer ${this.getAccessToken()}` };
    const response = await fetch(endpoint, { headers });

    const isRateLimited =
      response.status === RetryUtil.TOO_MANY_REQUESTS ||
      response.status === RetryUtil.SERVICE_UNAVAILABLE;

    if (isRateLimited) {
      const retryAfter = response.headers.get('Retry-After');
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        return RetryUtil.retryAfterError(3, this.getTracksFromAlbum(album, limit), delay);
      }
    }

    const json = await response.json();
    const tracks = json.items;

    if (limit === 1) {
      const track = tracks[0];
      track.album = album;
      const newTrack = new Track();
      newTrack.useSpotifyData(json.items[0]);
      return newTrack;
    } else {
      return json.items.map(track => {
        track.album = album;
        const newTrack = new Track();
        newTrack.useSpotifyData(track);
        return newTrack;
      });
    }
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
