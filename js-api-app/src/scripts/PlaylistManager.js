/**
 * Manages the playlist creation and interaction process, integrating Spotify and OpenAI for track recommendations and playlist management.
 *
 * This class handles track searching, AI-driven recommendations, managing a staging playlist for user review before saving to Spotify, and more. It serves as the core controller for the user interface, allowing for dynamic interaction with music data.
 *
 * @class PlaylistManager
 * @extends {App}
 * 
 * Methods:
 * @method addEventListeners - Registers event listeners for user interactions with the UI.
 * 
 * @method searchTracks - Searches for tracks on Spotify based on a given search term.
 *   @param {string} term - The search term used to find tracks on Spotify.
 *   @returns {Array<Object>} Returns an array of track objects found on Spotify.
 * 
 * @method recommendTracks - Generates track recommendations using OpenAI based on a given prompt.
 *   @param {string} prompt - The AI prompt used to generate track recommendations.
 *   @param {string} userId - The user's ID for personalized track recommendations.
 *   @returns {Array<Object>} Returns an array of recommended track objects.
 * 
 * @method recommendNewTracks - Generates recommendations for new tracks using Spotify's new releases feature.
 *   @param {SpotifyAPI} spotify - Instance of Spotify API object used to find new releases.
 *   @param {number} [limit=20] - Optional. The maximum number of tracks to recommend. Defaults to 20.
 *   @returns {Array<Object>} Returns an array of newly released track objects.
 * 
 * @method clearSuggestions - Clears the internal array of track suggestions.
 *   @returns {Array<Object>} Returns the array of track objects that were cleared.
 * 
 * @method addTrackToStaging - Adds a single track to the staging playlist.
 *   @param {Object} track - The track object to add to the staging playlist.
 *   @returns {Object} Returns the track object that was added to the staging playlist.
 *
 * @method addTracksToStaging - Adds multiple tracks to the staging playlist.
 *   @param {Array<Object>} tracks - An array of track objects to add to the staging playlist.
 *   @returns {Array<Object>} Returns the array of track objects that were added.
 * 
 * @method removeFromStaging - Removes a selected track from the staging playlist.
 *   @param {Object} track - The track object to remove from the staging playlist.
 *   @returns {Object} Returns the track object that was removed from the staging playlist.
 * 
 * @method savePlaylist - Saves the current staging playlist to the user's Spotify account with a given name.
 *   @param {string} name - The name for the new playlist to be saved on Spotify.
 *   @returns {Object} Returns the playlist object that was created and saved to the user's Spotify account.
 *
 * @method renderTracks - Renders tracks in the UI based on a provided list of track objects.
 *   @param {Array<Object>} list - The list of track objects to render in the UI.
 * 
 * @method setActiveTrack - Sets a track as the currently active track for preview and interaction.
 *   @param {Object} track - The track object to set as active.
 *   @returns {Element} Returns the player element that was created or interacted with.
 */


import App from './App.js';
import OpenAI from './util/OpenAIAPI.js';
import playIconSrc from '../img/icon-play.svg';
import pauseIconSrc from '../img/icon-pause.svg';
import addIconSrc from '../img/icon-add.svg';
import removeIconSrc from '../img/icon-remove.svg';
import artHoverOverlaySrc from '../img/art-hover-overlay.png';

class PlaylistManager extends App {
  constructor(spotify) {
    super(spotify);
    this._trackSuggestions = [];
    this._stagingPlaylist = [];
    this._spotify = spotify;
    this._newReleasesBtnState = true;
    this._auroraAIState = false;
    this._browseModeState = true;
    this.addEventListeners();
  }

  addEventListeners() {
    // See results
    document.getElementById('browse-btn').addEventListener('click', async () => {
      this._browseModeState = true;
      document.getElementById('browse-icon').classList.remove('filter', 'grayscale', 'brightness-200');
      document.getElementById('browse-text').classList.add('text-pink-300');
      document.getElementById('collection-icon').classList.add('filter', 'grayscale', 'brightness-200');
      document.getElementById('collection-text').classList.remove('text-pink-300');
      document.getElementById('playlist-header').classList.add('hidden');
      this.renderTracks(this._trackSuggestions);
    });

    // See collection
    document.getElementById('collection-btn').addEventListener('click', async () => {
      this._browseModeState = false;
      document.getElementById('collection-icon').classList.remove('filter', 'grayscale', 'brightness-200');
      document.getElementById('collection-text').classList.add('text-pink-300');
      document.getElementById('browse-icon').classList.add('filter', 'grayscale', 'brightness-200');
      document.getElementById('browse-text').classList.remove('text-pink-300');
      document.getElementById('playlist-header').classList.remove('hidden');
      this.renderTracks(this._stagingPlaylist);
    });

    // Recommend New Tracks
    (async () => {
      document.getElementById('new-releases-btn').classList.remove('filter', 'grayscale', 'brightness-200');
      document.getElementById('new-releases-btn-container').classList.add('bg-pink-200');
      this._newReleasesBtnState = true;
      const newTracks = await this.recommendNewTracks(this._spotify);
      this.renderTracks(newTracks);
    })();

    document.getElementById('new-releases-btn-container').addEventListener('click', async () => {
      if (!this._newReleasesBtnState) {
        document.getElementById('new-releases-btn').classList.remove('filter', 'grayscale', 'brightness-200');
        document.getElementById('new-releases-btn-container').classList.add('bg-pink-200');
        this._newReleasesBtnState = true;
        const newTracks = await this.recommendNewTracks(this._spotify);

        if (this._stagingPlaylist.length > 0) {
          const supplementaryTracks = await this._spotify.getRecommendations(this._stagingPlaylist.slice(0, 5), 3);
          supplementaryTracks.forEach(track => {
            track.featured = true;
            this._trackSuggestions.unshift(track);
          });
        }

        this.renderTracks(newTracks);
      }
    });

    // Search for tracks on return key
    document.getElementById('search-input').addEventListener('keydown', async (event) => {
      if (event.key === 'Enter' && event.target.value === '') return;

      if (event.key === 'Enter') {
        this._browseModeState = true;
        document.getElementById('browse-icon').classList.remove('filter', 'grayscale', 'brightness-200');
        document.getElementById('browse-text').classList.add('text-pink-300');
        document.getElementById('collection-icon').classList.add('filter', 'grayscale', 'brightness-200');
        document.getElementById('collection-text').classList.remove('text-pink-300');
        document.getElementById('playlist-header').classList.add('hidden');
        this.renderTracks(this._trackSuggestions);
        document.getElementById('new-releases-btn').classList.add('filter', 'grayscale', 'brightness-200');
        document.getElementById('new-releases-btn-container').classList.remove('bg-pink-200');
        this._newReleasesBtnState = false;
      }

      if (event.key === 'Enter' && this._auroraAIState === false) {
        const term = event.target.value;
        event.target.value = '';
        event.target.blur();
        await this.searchTracks(term);

        if (this._stagingPlaylist.length > 0) {
          const supplementaryTracks = await this._spotify.getRecommendations(this._stagingPlaylist.slice(0, 5), 3);
          supplementaryTracks.forEach(track => {
            track.featured = true;
            this._trackSuggestions.unshift(track);
          });
        }

        this.renderTracks(this._trackSuggestions);
      } else if (event.key === 'Enter' && this._auroraAIState === true) {
        const prompt = event.target.value;
        event.target.value = '';
        event.target.blur();
        await this.recommendTracks(prompt, this._user.id);

        this._trackSuggestions.forEach(async (track) => {
          track.featured = true;
        });

        if (this._stagingPlaylist.length > 0) {
          const supplementaryTracks = await this._spotify.getRecommendations(this._stagingPlaylist.slice(0, 5), 3);
          supplementaryTracks.forEach(track => {
            track.featured = true;
            this._trackSuggestions.unshift(track);
          });
        }

        this.renderTracks(this._trackSuggestions);
      }
    });

    // Enable AuroraAI
    document.getElementById('ai-btn').addEventListener('click', async () => {
      if (!this._auroraAIState) {
        document.getElementById('ai-btn').classList.add('bg-pink-200');
        document.getElementById('ai-icon').classList.remove('filter', 'grayscale', 'brightness-200');
        document.getElementById('search-input').placeholder = 'Ask AuroraAI for recommendations';
        this._auroraAIState = true;
      } else {
        document.getElementById('ai-btn').classList.remove('bg-pink-200');
        document.getElementById('ai-icon').classList.add('filter', 'grayscale', 'brightness-200');
        document.getElementById('search-input').placeholder = 'Search for songs, artists, or albums';
        this._auroraAIState = false;
      }
    });

    // Save Playlist
    document.getElementById('save-playlist-btn-container').addEventListener('click', async () => {
      if (this._stagingPlaylist.length > 0 && document.getElementById('playlist-name-input').value !== '') {
        const name = document.getElementById('playlist-name-input').value;
        const playlist = await this.savePlaylist(name);
        document.getElementById('playlist-name-input').value = '';
        document.getElementById('playlist-name-input').blur();
        this._stagingPlaylist = [];
        this.renderTracks(this._stagingPlaylist);
        const playlistLink = playlist.external_urls.spotify;
        window.open(playlistLink, '_blank');
        this._browseModeState = true;
        document.getElementById('browse-icon').classList.remove('filter', 'grayscale', 'brightness-200');
        document.getElementById('browse-text').classList.add('text-pink-300');
        document.getElementById('collection-icon').classList.add('filter', 'grayscale', 'brightness-200');
        document.getElementById('collection-text').classList.remove('text-pink-300');
        document.getElementById('playlist-header').classList.add('hidden');
        document.getElementById('new-releases-btn').classList.remove('filter', 'grayscale', 'brightness-200');
        document.getElementById('new-releases-btn-container').classList.add('bg-pink-200');
        this._newReleasesBtnState = true;
        const newTracks = await this.recommendNewTracks(this._spotify);
        this.renderTracks(newTracks);
        document.getElementById('playlist-name-input').value = 'New Playlist';
      }
    });


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

  async renderTracks(list) {
    // Render the track suggestions
    const tracksContainer = document.getElementById('tracks');
    tracksContainer.innerHTML = '';

    list.forEach((track, index) => {
      const trackElement = document.createElement('div');
      trackElement.classList.add('track');
      trackElement.setAttribute('data-index', index);

      // Create the featured track section
      const featuredTrackSection = document.createElement('section');
      featuredTrackSection.classList.add('track-container', 'py-2', 'px-3', 'mx-4', 'rounded-lg', 'flex', 'items-center', 'text-white');
      track.featured && featuredTrackSection.classList.add('track-container--highlight', 'bg-pink-600');

      if (index === 0 && !track.featured) {
        featuredTrackSection.classList.remove('py-2');
        featuredTrackSection.classList.add('pb-2');
      }

      // Create the album art container
      const albumArtContainer = document.createElement('div');
      albumArtContainer.classList.add('rounded-lg');
      albumArtContainer.style.backgroundImage = `url(${track.album.art})`;
      albumArtContainer.style.backgroundSize = 'cover';
      albumArtContainer.style.backgroundPosition = 'center';
      albumArtContainer.style.width = '56px';
      albumArtContainer.style.height = '56px';
      albumArtContainer.style.overflow = 'hidden';
      albumArtContainer.style.position = 'relative';

      // Create the album art anchor tag
      const albumArtLink = document.createElement('a');
      albumArtLink.href = track.spotify_url;
      albumArtLink.target = '_blank';

      // Create the album art image
      const albumArtImage = document.createElement('img');
      albumArtImage.src = artHoverOverlaySrc;
      albumArtImage.alt = 'album art';
      albumArtImage.style.width = '100%';
      albumArtImage.style.height = '100%';
      albumArtImage.style.objectFit = 'fill';
      albumArtImage.style.position = 'absolute';
      albumArtImage.style.top = '0';
      albumArtImage.style.left = '0';
      albumArtImage.style.opacity = '0';
      albumArtImage.style.transition = 'opacity 0.3s';

      albumArtLink.appendChild(albumArtImage);
      albumArtContainer.appendChild(albumArtLink);
      featuredTrackSection.appendChild(albumArtContainer);

      albumArtContainer.addEventListener('mouseenter', () => {
        albumArtImage.style.opacity = '1';
      });

      albumArtContainer.addEventListener('mouseleave', () => {
        albumArtImage.style.opacity = '0';
      });

      // Create the track details container
      const trackDetailsContainer = document.createElement('div');
      trackDetailsContainer.classList.add('track-details', 'flex', 'flex-col', 'ml-3');
      trackDetailsContainer.style.width = 'calc(100% - 140px)';

      // Create the track title element
      const trackTitleElement = document.createElement('span');
      trackTitleElement.classList.add('text-sm', 'font-medium');
      trackTitleElement.textContent = track.name;
      trackDetailsContainer.appendChild(trackTitleElement);

      // Create the track artist element
      const trackArtistElement = document.createElement('span');
      trackArtistElement.classList.add('text-xs');

      if (track.featured) {
        const featuredElement = document.createElement('span');
        featuredElement.classList.add('border', 'border-white', 'px-1', 'rounded-sm', 'inline-flex', 'py-0', 'relative', 'mr-1');
        featuredElement.style.fontSize = '0.65em';
        featuredElement.style.lineHeight = '1.5em';
        featuredElement.style.top = '-1px';
        featuredElement.textContent = 'AuroraAI';
        trackArtistElement.appendChild(featuredElement);
        featuredTrackSection.classList.add('mb-4');
      }

      const artistNameElement = document.createElement('span');
      artistNameElement.textContent = track.artist;
      trackArtistElement.appendChild(artistNameElement);
      trackDetailsContainer.appendChild(trackArtistElement);

      featuredTrackSection.appendChild(trackDetailsContainer);

      // Create the controls panel
      const controlsPanel = document.createElement('div');
      controlsPanel.classList.add('controls__panel', 'flex', 'items-center', 'ml-auto', 'gap-2');

      if (track.preview_url) {
        // Create the play/pause icons
        const playIcon = document.createElement('div');
        const playIconImage = document.createElement('img');
        playIconImage.classList.add('controls__icon--play', 'cursor-pointer');
        playIconImage.src = playIconSrc;
        playIconImage.alt = 'play icon';
        playIcon.appendChild(playIconImage);
        const pauseIcon = document.createElement('img');
        pauseIcon.classList.add('controls__icon--pause', 'hidden', 'cursor-pointer');
        pauseIcon.src = pauseIconSrc;
        pauseIcon.alt = 'pause icon';
        playIcon.appendChild(pauseIcon);
        controlsPanel.appendChild(playIcon);

        playIconImage.addEventListener('click', (event) => {
          const index = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-index');
          if (this._browseModeState) {
            this.setActiveTrack(this._trackSuggestions[index]);
          } else {
            this.setActiveTrack(this._stagingPlaylist[index]);
          }
        })

      }

      // Create the add icon or remove icon depending on the mode
      const addIcon = document.createElement('div');
      const addIconImage = document.createElement('img');
      addIconImage.classList.add('controls__icon', 'controls__icon--add', 'cursor-pointer');
      addIconImage.src = addIconSrc;
      addIconImage.alt = 'add to collection icon';
      addIcon.appendChild(addIconImage);

      const removeIcon = document.createElement('div');
      const removeIconImage = document.createElement('img');
      removeIconImage.classList.add('controls__icon', 'controls__icon--remove', 'cursor-pointer');
      removeIconImage.src = removeIconSrc;
      removeIconImage.alt = 'remove from collection icon';
      removeIcon.appendChild(removeIconImage);

      if (this._browseModeState) {
        controlsPanel.appendChild(addIcon);
      } else {
        controlsPanel.appendChild(removeIcon);
      }

      featuredTrackSection.appendChild(controlsPanel);

      trackElement.appendChild(featuredTrackSection);

      if (this._browseModeState) {
        trackElement.getElementsByClassName('controls__icon--add')[0].addEventListener('click', (event) => {
          const index = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-index');
          // Check if the track is already in the staging playlist
          const existingTrack = this._stagingPlaylist.find(item => item === this._trackSuggestions[index]);
          if (!existingTrack) {
            this.addTrackToStaging(this._trackSuggestions[index]);
          }
        });
      } else {
        trackElement.getElementsByClassName('controls__icon--remove')[0].addEventListener('click', (event) => {
          const index = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-index');
          this.removeFromStaging(this._stagingPlaylist[index]);
          this.renderTracks(this._stagingPlaylist);
        });
      }

      tracksContainer.appendChild(trackElement);
    });
  }

  async setActiveTrack(track) {
    const playerContainer = document.getElementById('player');
    if (playerContainer) {
      playerContainer.remove();
    }

    const player = document.createElement('div');
    player.id = 'player';
    player.classList.add('mobile__player', 'bg-indigo-900', 'text-white', 'mx-3', 'p-2', 'rounded-md', 'flex', 'items-center');

    const albumArtLink = document.createElement('a');
    albumArtLink.classList.add('rounded-md');
    albumArtLink.href = track.spotify_url;
    albumArtLink.style.backgroundImage = `url(${track.album.art})`;
    albumArtLink.style.backgroundSize = 'cover';
    albumArtLink.style.backgroundPosition = 'center';
    albumArtLink.style.overflow = 'hidden';
    albumArtLink.style.position = 'relative';


    const albumArtImage = document.createElement('img');
    albumArtImage.classList.add('h-10', 'w-10', 'opacity-0', 'hover:opacity-100', 'transition-opacity', 'duration-200', 'cursor-pointer');
    albumArtImage.src = artHoverOverlaySrc;
    albumArtImage.alt = '';

    albumArtLink.appendChild(albumArtImage);
    player.appendChild(albumArtLink);

    const trackDetailsContainer = document.createElement('div');
    trackDetailsContainer.classList.add('track-details', 'flex', 'flex-col', 'ml-3');

    const trackTitleElement = document.createElement('span');
    trackTitleElement.classList.add('text-sm', 'font-medium');
    trackTitleElement.textContent = track.name;

    const trackArtistElement = document.createElement('span');
    trackArtistElement.classList.add('text-xs');
    trackArtistElement.textContent = track.artist;

    trackDetailsContainer.appendChild(trackTitleElement);
    trackDetailsContainer.appendChild(trackArtistElement);
    player.appendChild(trackDetailsContainer);

    const controlsPanel = document.createElement('div');
    controlsPanel.classList.add('controls__panel', 'flex', 'items-center', 'ml-auto', 'gap-2', 'mr-2');

    if (track.preview_url) {
      const playIconContainer = document.createElement('div');
      const playIcon = document.createElement('img');
      playIcon.classList.add('controls__icon--play', 'cursor-pointer');
      playIcon.src = playIconSrc;
      playIcon.width = '14';
      playIcon.alt = 'play icon';
      playIconContainer.appendChild(playIcon);

      const pauseIcon = document.createElement('img');
      pauseIcon.classList.add('controls__icon--pause', 'hidden', 'cursor-pointer');
      pauseIcon.src = pauseIconSrc;
      pauseIcon.alt = 'pause icon';
      playIconContainer.appendChild(pauseIcon);

      controlsPanel.appendChild(playIconContainer);
    }

    player.appendChild(controlsPanel);

    const bottomControls = document.getElementById('bottom-controls');
    bottomControls.insertBefore(player, bottomControls.firstChild);

    // Add play/pause functionality here
    if (track.preview_url) {
      const playIcon = player.getElementsByClassName('controls__icon--play')[0];
      const pauseIcon = player.getElementsByClassName('controls__icon--pause')[0];

      let audio = new Audio(track.preview_url);
      audio.volume = 0.5;

      // Play immediately as the player is created
      audio.play();
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      audio.addEventListener('ended', () => {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
      });

      playIcon.addEventListener('click', () => {
        audio.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        audio.addEventListener('ended', () => {
          playIcon.classList.remove('hidden');
          pauseIcon.classList.add('hidden');
        });
      });
      pauseIcon.addEventListener('click', () => {
        if (audio) {
          audio.pause();
          playIcon.classList.remove('hidden');
          pauseIcon.classList.add('hidden');
        }
      });

      player.addEventListener('DOMNodeRemoved', () => {
        if (audio) {
          audio.pause();
        }
      });
    }

    return player;
  }
}

export default PlaylistManager;