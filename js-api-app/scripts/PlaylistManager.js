/**
 * Class to manage the playlist creation process
 * 
 * @method searchTracks - Searches for tracks on Spotify
 *   @param {string} term - Search term
 *   @param {SpotifyAPI} spotify - Spotify API object
 *   @returns {Array<Object>} - Array of track objects
 * 
 * @method clearSuggestions - Clears the track suggestions array
 *   @returns {Array<Object>} - Array of track objects that were cleared
 * 
 * @method addToStaging - Adds a track to the staging playlist
 *   @param {Object} track - Track object
 *   @returns {Object} - Track object that was added
 * 
 * @method removeFromStaging - Removes a track from the staging playlist
 *   @param {Object} track - Track object
 *   @returns {Object} - Track object that was removed
 * 
 * @method savePlaylist - Saves the staging playlist to the user's Spotify account
 *   @param {string} name - Playlist name
 *   @param {SpotifyAPI} spotify - Spotify API object
 *   @returns {Object} - Playlist object that was created and saved to the user's account
 */

class PlaylistManager {
  constructor(spotify) {
    this._trackSuggestions = [];
    this._stagingPlaylist = [];
    this._spotify = spotify;
  }

  get trackSuggestions() {
    return this._trackSuggestions;
  }

  get stagingPlaylist() {
    return this._stagingPlaylist;
  }

  async searchTracks(term) {
    const results = await this._spotify.searchTracks(term);
    this._trackSuggestions = results;
    return results;
  }

  clearSuggestions() {
    temp = this._trackSuggestions;
    this._trackSuggestions = [];
    return temp;
  }

  addToStaging(track) {
    this._stagingPlaylist.push(track);
    return track;
  }

  removeFromStaging(track) {
    const removedTrack = this._stagingPlaylist.find(item => item === track);
    this._stagingPlaylist = this._stagingPlaylist.filter(item => item !== track);
    return removedTrack;
  }

  async savePlaylist(name) {
    const playlist = await this._spotify.createPlaylist(name);
    const uriArr = this._stagingPlaylist.map(track => track.spotify_uri);
    const snapshot = await this._spotify.addTracksToPlaylist(playlist, uriArr);
    playlist.snapshot_id = snapshot.snapshot_id;
    this._stagingPlaylist = [];
    return playlist;
  }
}

export default PlaylistManager;