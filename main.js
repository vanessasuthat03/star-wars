const characterImg = [
  "./image/luke_skywalker.jpg",
  "./image/C3po.png",
  "./image/r2d2.jpg",
  "./image/darth_vader.jpg",
  "./image/leia_organa.jpeg",
  "./image/owen_lars.jpg",
  "./image/beru_whitesun_lars.jpg",
  "./image/r5_d4.jpg",
  "./image/biggs_darklighter.png",
  "./image/obi_wan_kenobi.jpeg"
]

const api_url = "https://swapi.dev/api/people"
function fetchData() {
  fetch(api_url)
    .then(respons => {
      if (!respons.ok) {
        throw Error("ERROR")
      }
      return respons.json()
    })
    .then(starWarsData => {
      sendData(starWarsData.results)
    })
    .catch(error => {
      console.log(error)
    })
}
fetchData()

const sendData = data => {
  const starWarsCharectersWithImage = data.map((starWarsCharecter, index) => {
    starWarsCharecter.image = characterImg[index]
    return { ...starWarsCharecter }
  })

  const html = starWarsCharectersWithImage
    .map((starWarsCharecter, index) => {
      let starWarsCharecterUrl = starWarsCharecter.url

      return `
          <li onclick="showChar(${index +
            1})" id="box"><img class="card_img" src="${
        starWarsCharecter.image
      }"><h4 class="card_name"> ${starWarsCharecter.name} </h4></li>`
    })
    .join(" ")

  document.querySelector("#card").insertAdjacentHTML("afterbegin", html)
}

const showChar = indexOfStarWarsCharecter => {
  const char_api_url =
    "https://swapi.dev/api/people/" + indexOfStarWarsCharecter + "/"
  fetch(char_api_url)
    .then(res => {
      if (!res.ok) {
        throw Error("ERROR")
      }
      return res.json()
    })
    .then(charstarWarsData => {
      console.log(charstarWarsData)
      charData(charstarWarsData, indexOfStarWarsCharecter)
      getWorld(charstarWarsData.homeworld)
    })
    .catch(error => {
      console.log(error)
    })
}

//test mappa in img i enskild person
const charData = (info, index) => {
  let imgIndex = index - 1
  let img = { image: characterImg[imgIndex] }
  info = { ...info, ...img }

  let name = info.name
  let height = info.height
  let image = info.image
  let gender = info.gender
  let birth_year = info.birth_year
  let mass = info.mass
  let hair_color = info.hair_color
  let skin_color = info.skin_color

  let output = `<h1 class="charName">${name}</h1>
                <div class="charBox">
                    <div class="image">
                        <img class="charImg" src="${image}">
                    </div>

                        <div class="textInfo">
                        <h4 class="info">Personal data</h4>
                        <p class="height"><span>Height:</span> ${height}</p>
                        <p><span>Gender:</span> ${gender}</p>
                        <p><span>Birth Year:</span> ${birth_year}</p>
                        <p><span>Mass:</span> ${mass}</p>
                        <p><span>Hair color:</span> ${hair_color}</p>
                        <p><span>Skin color:</span> ${skin_color}</p>
                       
                    </div>
                </div>`
  document.querySelector("#selected").innerHTML = output
  document.getElementById("selected").style.display = "flex"
  document.querySelector(".close").style.display = "block"
}

const infoBox = document
  .querySelector(".close")
  .addEventListener("click", () => {
    document.getElementById("selected").style.display = "none"
    document.querySelector(".close").style.display = "none"
  })

const getWorld = homeWorld => {
  fetch(homeWorld)
    .then(respWorld => {
      if (!respWorld.ok) {
        throw Error("ERROR")
      }
      return respWorld.json()
    })
    .then(charWorld => {
      sendWorld(charWorld)
    })
    .catch(error => {
      console.log(error)
    })
}

// printout world

const sendWorld = worldInfo => {
  let worldName = worldInfo.name
  let climate = worldInfo.climate
  let diameter = worldInfo.diameter
  let gravity = worldInfo.gravity
  let population = worldInfo.population
  let terrain = worldInfo.terrain

  let output2 = `<div class="homeWorld">
                    <h4 class="home">Homeworld</h4>
                    <p class="worldName"><span>Name:</span> ${worldName}</p>
                    <p><span>Clicamet:</span> ${climate}</p>
                    <p><span>Diameter:</span> ${diameter}</p>
                    <p><span>Gravity:</span> ${gravity}</p>
                    <p class="population"><span>Population:</span> ${population}</p>
                    <p class="terrain"><span>Terrain:</span> ${terrain}</p>
                </div>`
  document.querySelector(".charBox").insertAdjacentHTML("beforeend", output2)
}
//search filter
const charList = document.querySelector("#card")
const searchChar = document.forms["search_char"].querySelector("input")
searchChar.addEventListener("keyup", function(event) {
  const eventTarget = event.target.value.toLowerCase()
  const characters = charList.getElementsByTagName("li")

  Array.from(characters).forEach(function(character) {
    const title = character.lastElementChild.innerHTML

    if (title.toLowerCase().indexOf(eventTarget) != -1) {
      character.style.display = "block"
    } else {
      character.style.display = "none"
    }
  })
})
