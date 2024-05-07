import { jwtDecode } from 'jwt-decode';

type GoogleLoginResponse = {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
};

type GoogleUser = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  iat: number /** The time the token was issued, in seconds since the epoch. */;
  name: string;
  picture: string;
  sub: string;
};

export default class GoogleIdentity {
  private _user: GoogleUser;

  constructor() {
    this._user = {} as GoogleUser;
  }

  get user() {
    return this._user;
  }

  set user(user: GoogleUser) {
    this._user = user;
  }

  handleLoginResponse(response: GoogleLoginResponse): void {
    const userObject = jwtDecode(response.credential);
    this._user = userObject as GoogleUser;
  }

  async renderButton(): Promise<void> {
    /* global google */
    await google.accounts.id.initialize({
      client_id: '744543541785-v89rrt123mnl76h2ek2e3fvbq15erpob.apps.googleusercontent.com',
      callback: this.handleLoginResponse,
    });

    await google.accounts.id.renderButton(document.getElementById('g_id_onload'), {
      theme: 'outline', // outline, filled_blue, filled_black
      size: 'large', // small, medium, large
      text: 'continue_with', // continue_with, sign_in_with, signup_with, signin
      shape: 'circular', // rectangular, pill
      logo_alignment: 'left', // left, center
      locale: 'en',
      // type: 'standard',
      // width: '300px',
      // click_listener: (event: Event) => {},
      // state - example: `button 1` - Optional, as multiple Sign in with Google buttons can be rendered on the same page, you can assign each button with a unique string. The same string would return along with the ID token, so you can identify which button user clicked to sign in.
    });
  }

  async logout(): Promise<void> {
    await google.accounts.id.disableAutoSelect();
    await google.accounts.id.prompt();
  }
}
