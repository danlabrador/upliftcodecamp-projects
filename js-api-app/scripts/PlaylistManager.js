/**
 * Class to manage the playlist creation process
 * 
 * @method searchTracks - Searches for tracks on Spotify
 *   @param {string} term - Search term
 *   @param {SpotifyAPI} spotify - Spotify API object
 *   @returns {Array<Object>} - Array of track objects
 * 
 * @method recommendTracks - Recommends tracks using OpenAI
 *   @param {string} prompt - Prompt for the AI
 *   @param {string} userId - User ID
 *   @returns {Array<Object>} - Array of track objects
 * 
 * @method recommendNewTracks - Recommends new tracks using Spotify's new releases
 *   @param {SpotifyAPI} spotify - Spotify API object
 *   @param {number} [limit=20] - Limit of tracks to recommend 
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

import OpenAI from './util/OpenAIAPI.js';

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

  async recommendTracks(prompt, userId) {
    this._trackSuggestions = [];

    let instructions = 'Recommend songs, specifying artist and title. Use shorter, recognizable artist names where possible. Output as a JSON object with each song as an object, including its title and artist, without additional formatting, explanations or triple back ticks.\n';

    instructions += 'Sample is delimited by triple back ticks but do not use triple back ticks on the output:\n``` {"suggestions":[{"title":"Song 1 Title","artist":"Artist Name"},{"title":"Song 2 Title","artist":"Artist Name"}]}```\n';

    instructions += 'For year-specific requests without data, use the most recent year. For a specified number of songs, return up to that number, with a 20-song limit. If user does not specify the number of songs, suggest 15 songs. You must output JSON object and remove any additional text or formatting. Never abbreviate the JSON object.';
    try {
      const response = await OpenAI.getCompletion({ prompt, userId, instructions, max_tokens: 1024, temperature: 1.5 })

      let content = response.choices[0].message.content;

      // Clean up the response
      if (content.startsWith('"')) content = content.slice(1, -1);
      content = content
        .replace(/\\n/g, '')
        .replace(/\\t/g, '')
        .replace(/`/g, '');

      const recommendationObj = JSON.parse(content);

      let recommendations = recommendationObj.suggestions;
      recommendations = recommendations.slice(0, 20);

      // Add the recommendations to the track suggestions array
      const trackPromises = recommendations.map(async (recommendation) => {
        const searchResults = await this._spotify.searchTracks(recommendation.title + ' ' + recommendation.artist);
        const track = searchResults[0];
        return track;
      });

      this._trackSuggestions = await Promise.all(trackPromises);

      // If the number of recommendations is less than 20, search for additional tracks using Spotify's recommendation endpoint
      const recommendationsLength = recommendations.length;
      if (recommendationsLength < 20) {
        const remainingTracks = 20 - recommendationsLength;
        console.log(`OpenAI provided ${recommendationsLength} songs. Searching for ${remainingTracks} in Spotify.`)
        const supplementaryTracks = await this._spotify.getRecommendations(this._trackSuggestions, remainingTracks);
        this._trackSuggestions = this._trackSuggestions.concat(supplementaryTracks);
      }

      return this._trackSuggestions;

    } catch (error) {
      const results = await this._spotify.searchTracks(prompt);
      this._trackSuggestions = results;
      console.error('Error getting recommendations from OpenAI. Using search term to search for tracks. Error: ' + error);
      return results;
    }
  }

  async recommendNewTracks(spotify, limit = 20) {
    const album = await spotify.getNewReleases();

    const newReleases = album.slice(0, limit).map(async (album) => {
      const track = await spotify.getTracksFromAlbum(album, 1); // Limit to 1 track per album
      return track;
    });

    this._trackSuggestions = await Promise.all(newReleases);
    return this._trackSuggestions;
  }

  clearSuggestions() {
    temp = this._trackSuggestions;
    this._trackSuggestions = [];
    return temp;
  }

  addTrackToStaging(track) {
    this._stagingPlaylist.push(track);
    return track;
  }

  addTracksToStaging(tracks) {
    this._stagingPlaylist = this._stagingPlaylist.concat(tracks);
    return tracks;
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

/**
 * OpenAI API class
 * 
 * @method getCompletion - Retrieves a completion from the OpenAI API
 *   @param {string} prompt - Prompt for the AI
 *   @param {string} userId - User ID
 *   @param {string} [instructions='You are a helpful assistant.'] - Instructions for the AI
 *   @param {string} [model='gpt-3.5-turbo'] - Model to use for the completion
 *   @returns {Object} - Completion object
 */