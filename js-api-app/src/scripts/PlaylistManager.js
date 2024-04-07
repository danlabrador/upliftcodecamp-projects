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

import App from './App.js';

import OpenAI from './util/OpenAIAPI.js';
import '../img/icon-add.svg';

class PlaylistManager extends App {
  super(spotify) {
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

  async renderSuggestions() {
    // Render the track suggestions
    const tracksContainer = document.getElementById('tracks');
    tracksContainer.innerHTML = '';

    this._trackSuggestions.forEach((track, index) => {
      const trackElement = document.createElement('div');
      trackElement.classList.add('track');
      trackElement.setAttribute('data-index', index);

      // Create the featured track section
      const featuredTrackSection = document.createElement('section');
      featuredTrackSection.classList.add('track-container', 'track-container--highlight', 'bg-pink-600', 'py-2', 'px-3', 'mx-4', 'rounded-lg', 'flex', 'items-center', 'text-white');

      // Create the album art image
      const albumArtImage = document.createElement('img');
      albumArtImage.classList.add('rounded-lg');
      albumArtImage.src = track.album.art;
      albumArtImage.alt = 'album art';
      albumArtImage.width = 56;
      albumArtImage.height = 56;
      featuredTrackSection.appendChild(albumArtImage);

      // Create the track details container
      const trackDetailsContainer = document.createElement('div');
      trackDetailsContainer.classList.add('track-details', 'flex', 'flex-col', 'ml-3');

      // Create the track title element
      const trackTitleElement = document.createElement('span');
      trackTitleElement.classList.add('text-sm', 'font-medium');
      track.name.length > 40 ?
        trackTitleElement.textContent = track.name.slice(0, 40) + '...' :
        trackTitleElement.textContent = track.name;
      trackDetailsContainer.appendChild(trackTitleElement);

      // Create the track artist element
      const trackArtistElement = document.createElement('span');
      trackArtistElement.classList.add('text-xs');
      const beatsAIElement = document.createElement('span');
      beatsAIElement.classList.add('border', 'border-white', 'px-1', 'rounded-sm', 'inline-flex', 'py-0', 'relative');
      beatsAIElement.style.fontSize = '0.65em';
      beatsAIElement.style.lineHeight = '1.5em';
      beatsAIElement.style.top = '-1px';
      beatsAIElement.textContent = 'BeatsAI';
      trackArtistElement.appendChild(beatsAIElement);
      const artistNameElement = document.createElement('span');
      artistNameElement.textContent = track.artist;
      trackArtistElement.appendChild(artistNameElement);
      trackDetailsContainer.appendChild(trackArtistElement);

      featuredTrackSection.appendChild(trackDetailsContainer);

      // Create the controls panel
      const controlsPanel = document.createElement('div');
      controlsPanel.classList.add('controls__panel', 'flex', 'items-center', 'ml-auto', 'gap-2');

      // Create the add icon
      const addIcon = document.createElement('div');
      const addIconImage = document.createElement('img');
      addIconImage.classList.add('controls__icon', 'controls__icon--add', 'cursor-pointer');
      addIconImage.src = './src/img/icon-add.svg';
      addIconImage.alt = 'next icon';
      addIcon.appendChild(addIconImage);
      controlsPanel.appendChild(addIcon);

      if (track.preview_url) {
        // Create the play/pause icons
        const playIcon = document.createElement('div');
        const playIconImage = document.createElement('img');
        playIconImage.classList.add('controls__icon--play', 'cursor-pointer');
        playIconImage.src = './src/img/icon-play.svg';
        playIconImage.alt = 'play icon';
        playIcon.appendChild(playIconImage);
        const pauseIcon = document.createElement('img');
        pauseIcon.classList.add('controls__icon--pause', 'hidden', 'cursor-pointer');
        pauseIcon.src = './src/img/icon-pause.svg';
        pauseIcon.alt = 'pause icon';
        playIcon.appendChild(pauseIcon);
        controlsPanel.appendChild(playIcon);
      }

      featuredTrackSection.appendChild(controlsPanel);

      trackElement.appendChild(featuredTrackSection);

      trackElement.getElementsByClassName('controls__icon--add')[0].addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        this.addTrackToStaging(this._trackSuggestions[index]);
        this.renderStaging();
      });

      tracksContainer.appendChild(trackElement);
    });
  }
}

export default PlaylistManager;