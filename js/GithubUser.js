// Create a class and export
export class GithubUser {
  static(username) {
    // Create a const end point and pass the api link
    const endPoint = `https://api.github.com/users/${username}`

    //return a promise that brings the values and convert to JSON.
    return fetch(endPoint)
      .then((data) => data.json())
      .then(({ login, name, public_repos, followers, html_url }) => ({
        login,
        name,
        public_repos,
        followers,
        html_url,
      }))
  }
}
