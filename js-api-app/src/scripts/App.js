/**
 * Represents the core functionality of the application, handling initialization
 * and user-related information by interfacing with the Spotify API. This class
 * sets up the user's data upon initialization and updates the UI accordingly.
 *
 * @class App
 * 
 * @constructor
 *   Initializes a new instance of the App class.
 *   @param {SpotifyAPI} spotify - An instance of the Spotify API client used for communication with Spotify's Web API.
 *
 * @property {SpotifyAPI} _spotify - The Spotify API client instance.
 * @property {Object|null} _user - The user's profile information obtained from Spotify. Null until initialized.
 *
 * @method user
 *   Getter for the user's profile information.
 *   @returns {Object|null} The user's profile information if initialized; otherwise, null.
 *
 * @method init
 *   Asynchronously initializes the application by fetching the user's profile information
 *   from Spotify and updating the UI with the user's data. It handles setting the user's
 *   avatar, first name, and an appropriate greeting based on the current time of day.
 *   Ensures the application UI is visible once the user data is fully loaded.
 *   @async
 *   @returns {Promise<Object>} A promise that resolves with the user's profile information once it has been successfully fetched and the UI updated.
 */

class App {
  constructor(spotify) {
    this._spotify = spotify;
    this._user = null;
  }

  get user() {
    return this._user;
  }

  async init() {
    this._user = await this._spotify.getUser();

    // Update header
    if (this._user.images.length !== 0) {
      document.getElementsByClassName('header__avatar')[0].src = this._user.images[0].url;
    }
    document.getElementsByClassName('header__first-name')[0].textContent = this._user.display_name.split(' ')[0];

    // Get user time and update greeting based on time of day
    const date = new Date();
    const hours = date.getHours();
    let greeting = '';
    if (hours < 12) {
      greeting = 'Good morning, ‎';
    } else if (hours < 18) {
      greeting = 'Good afternoon, ‎';
    } else {
      greeting = 'Good evening, ‎';
    }
    document.getElementsByClassName('header__greetings-text')[0].textContent = greeting;

    // Remove .hidden class when user is loaded
    document.getElementById('app').classList.remove('hidden');

    return this._user;
  }
}

export default App;