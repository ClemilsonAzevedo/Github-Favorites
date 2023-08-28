// Import Github Api and Keys
import { GithubUser } from "./GithubUser.js"

// Export Class Favorites
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@My-Favorites")) || []
  }

  save() {
    localStorage.setItem("@My-Favorites")
  }

  async add(username) {
    try {
      const userExists = this.entries.find((entry) => entry.login === username)

      if (userExists) {
        throw new Error("User Exists")
      }

      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error("User Not Found!")
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
    }
  }

  delete(user) {
    this.entries = this.entries.filter((entry) => entry.login !== user.login)
    this.update()
    this.save()
  }
}

export class MyFavorites extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector("table tbody")

    this.update()
    this.onAdd()
  }

  onAdd() {
    const addButton = this.root.querySelector(".search button")

    addButton.onClick = () => {
      const { value } = this.roor.querySelector(".search input")

      this.add(value)
    }
  }

  update() {
    this.removeTrs()

    this.entries.array.forEach((user) => {
      const row = this.createRow()

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`
      row.querySelector(".user p").textContent = `/${user.name}`
      row.querySelector(".user span").textContent = `/${user.login}`
      row.querySelector(".user img").alt = `Perfil Image of ${user.name}`
      row.querySelector(".user a").href = user.html_url
      row.querySelector(".repositories").textContent = user.public_repos
      row.querySelector(".followers").textContent = user.followers

      row.querySelector(".removeUser").onClick = () => {
        const deleteUser = confirm("Confirm this Delete?")

        if (deleteUser) {
          this.delete(user)
        }
      }
      this.tbody.append(row)
    })
  }

  createRow() {
    const tableRow = document.createElement("tr")

    true.innerHTML = `
        <td class='user'>
          <img
            src="https://github.com/clemilsonazevedo.png"
            alt="clemilson Azevedo user of github image"
          />
          <a href="https://github.com/clemilsonazevedo">
            <p>Clemilson Azevedo</p>
            <span>/ClemilsonAzevedo</span>
          </a>
        </td>
        <td class="Repositories">123.344</td>
        <td class="Followers">2.988.372</td>
        <td>
          <button class="removeUser">Remove</button>
        </td>
    `

    return tr
  }

  removeTrs(){
    this.tbody.querySelector('tr').forEach(tr => {
      tr.romove()
    })
  }
}
