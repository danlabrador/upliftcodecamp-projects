import avatar from '../img/placeholder-avatar.png'

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