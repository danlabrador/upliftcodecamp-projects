/**
 * Represents a music track with metadata and streaming information, primarily sourced from Spotify.
 * This class encapsulates track details such as the album, artist, and various Spotify identifiers,
 * and provides a method to populate these details from Spotify's API data. It is designed to create
 * track objects that can be easily managed and utilized within the application.
 * 
 * @class Track
 * 
 * @property {Object} album - Contains details about the track's album, including name, artwork URL, and Spotify external URL.
 *   @property {string} album.name - The name of the album.
 *   @property {string} album.art - The URL of the album art, preferably in 300x300 resolution, or the first available image if not available.
 *   @property {string} album.external_url - The Spotify URL that directs to the album on the Spotify web client.
 * @property {string} artist - The name of the primary artist of the track.
 * @property {string} name - The name of the track.
 * @property {string} preview_url - The URL to a 30-second preview clip of the track, if available.
 * @property {string} spotify_id - The unique identifier for the track on Spotify.
 * @property {string} spotify_uri - The Spotify URI for the track, which can be used to play this track in Spotify clients.
 * @property {string} spotify_url - The URL that directs to the track on the Spotify web client.
 * @property {string} source - The source of the track data, with a default value of "spotify".
 * 
 * @method useSpotifyData
 *   Populates the track object's properties using data obtained from the Spotify API.
 *   @param {Object} track - The track data object as obtained from the Spotify API.
 *   @returns {void}
 * 
 * @method toString
 *   Provides a string representation of the track, typically for logging or simple display purposes.
 *   @returns {string} - A string in the format "Track Name by Artist Name".
 */


class Track {
  constructor() {
    this.album = {
      name: null,
      art: null,
      external_url: null
    };
    this.artist = null;
    this.name = null;
    this.preview_url = null;
    this.spotify_id = null;
    this.spotify_uri = null;
    this.spotify_url = null;
    this.source = null;
  }

  useSpotifyData(track) {
    this.album = {
      name: track.album.name,
      // Use the 300x300 image for the album art, otherwise use the first image
      art: track.album.images
        .filter(image => image.height === 300).length > 0 ?
        track.album.images.filter(image => image.height === 300)[0].url :
        track.album.images[0].url,
      external_url: track.album.external_urls.spotify
    };
    this.artist = track.artists[0].name;
    this.name = track.name;
    this.preview_url = track.preview_url;
    this.spotify_id = track.id;
    this.spotify_url = track.external_urls.spotify;
    this.spotify_uri = track.uri;
    this.source = 'spotify';
  }

  toString() {
    return `${this.name} by ${this.artist}`;
  }
}

export default Track;