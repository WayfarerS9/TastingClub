export class Utils {
  loggedIn() {
    return !!JSON.parse(
      JSON.stringify(localStorage.getItem('TOKEN_TASTYCLUB'))
    );
  }

  getToken() {
    return localStorage.getItem('TOKEN_TASTYCLUB');
  }
}
