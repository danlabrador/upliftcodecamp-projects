/**
 * Track class
 * 
 * @property {Object} album
 *   @property {string} album.name
 *   @property {string} album.art
 *   @property {string} album.external_url
 * @property {string} artist
 * @property {string} name
 * @property {string} preview_url
 * @property {string} spotify_id 
 * @property {string} spotify_uri
 * @property {string} spotify_url
 * @property {string} source [spotify]
 * 
 * @method useSpotifyData - sets the properties of the track object using Spotify API data
 * 
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