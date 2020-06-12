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
  "./image/obi_wan_kenobi.jpeg",
  "./image/anakin_skywalker.png",
  "./image/wilhuff_tarkin.jpg",
  "./image/chewbacca.png",
  "./image/han_solo.jpg",
  "./image/greedo.jpg",
  "./image/jabba_desilijic_tiure.jpeg",
  "./image/wedge_antilles.jpg",
  "./image/jek_tono_porkins.jpg",
  "./image/yoda.jpg",
  "./image/palpatine.png",
  "./image/boba_fett.jpg",
  "./image/ig_88.jpg",
  "./image/bossk.png",
  "./image/lando_calrissian.jpg",
  "./image/lobot.jpg",
  "./image/ackbar.jpg",
  "./image/mon_mothma.png",
  "./image/arvel_crynyd.jpg",
  "./image/wicket_systri_warrick.png",
  "./image/nien_nunb.jpg",
  "./image/qui_gon_jinn.jpg",
  "./image/nute_gunray.jpeg",
  "./image/finis_valorum.jpg",
  "./image/padme_amidala.jpg",
  "./image/jar_jar_binks.jpg",
  "./image/roos_tarpals.jpg",
  "./image/rugor_nass.jpg",
  "./image/ric_olie.jpg",
  "./image/watto.jpg",
  "./image/sebulba.jpeg",
  "./image/quarsh_panaka.png",
  "./image/shmi_skywalker.jpg",
  "./image/darth_maul.jpeg",
  "./image/bib_fortuna.jpg",
  "./image/ayla_secura.png",
  "./image/ratts_tyerel.jpeg",
  "./image/dud_bolt.jpg",
  "./image/gasgano.png",
  "./image/ben_quadinaros.png",
  "./image/mace_windu.jpg",
  "./image/ki_adi_mundi.jpg",
  "./image/kit_fisto.jpg",
  "./image/eeth_koth.png",
  "./image/adi_gallia.jpg",
  "./image/seasee_tiin.jpg",
  "./image/yarael_poof.jpg",
  "./image/plo_koon.jpg",
  "./image/mas_amedda.jpg",
  "./image/captain_typho.jpg",
  "./image/corde.jpg",
  "./image/cliegg_lars.jpg",
  "./image/poggle_the_lesser.jpg",
  "./image/luminara_unduli.jpg",
  "./image/barriss_offee.png",
  "./image/dorme.jpg",
  "./image/dooku.jpeg",
  "./image/bail_prestor_organa.jpg",
  "./image/jango_fett.jpg",
  "./image/zam_wesell.jpg",
  "./image/dexter_jettster.jpg",
  "./image/luma_su.jpg",
  "./image/taun_we.jpg",
  "./image/jocasta_nu.jpg",
  "./image/r4_p17.jpg",
  "./image/wat_tambor.jpg",
  "./image/san_hill.jpg",
  "./image/shaak_ti.jpg",
  "./image/grievous.jpg",
  "./image/tartful.jpg",
  "./image/raymus_antilles.png",
  "./image/sly_moore.jpg",
  "./image/tion_medon.jpg"
]

async function fetchData() {
  const api_url = "https://swapi.dev/api/people"
  let page = 1
  let people = []
  let lastResult = []
  do {
    try {
      const resp = await fetch(api_url + `/?page=${page}`)
      const data = await resp.json()

      lastResult = data
      data.results.forEach(person => {
        const {
          name,
          height,
          gender,
          hair_color,
          mass,
          skin_color,
          homeworld,
          url
        } = person
        people.push({
          name,
          height,
          gender,
          hair_color,
          mass,
          skin_color,
          homeworld,
          url
        })
      })
      page++
    } catch (err) {
      console.error(`Något gick fel försök igen! ${err}`)
    }
  } while (lastResult.next !== null)
  sendData(people)
}

fetchData()

const sendData = async data => {
  const starWarsCharectersWithImage = data.map(
    (starWarsCharecter, charImage) => {
      starWarsCharecter.image = characterImg[charImage]

      return { ...starWarsCharecter }
    }
  )

  const html = starWarsCharectersWithImage
    .map((starWarsCharecter, index) => {
      let url_char = starWarsCharecter.url
      url_chars = url_char.slice(28, -1)

      return `
                <li onclick="showChar(${url_chars} )"id="box"><img class="card_img" src="${starWarsCharecter.image}"><h4 class="card_name"> ${starWarsCharecter.name} </h4></li>`
    })
    .join(" ")

  document.querySelector("#card").insertAdjacentHTML("afterbegin", html)
}

const showChar = async indexOfStarWarsCharecter => {
  const char_api_url =
    "https://swapi.dev/api/people/" + indexOfStarWarsCharecter

  await fetch(char_api_url)
    .then(res => {
      if (!res.ok) {
        console.log(res)
        throw Error("ERROR")
      }
      return res.json()
    })

    .then(charstarWarsData => {
      charData(charstarWarsData, indexOfStarWarsCharecter)
      getWorld(charstarWarsData.homeworld)
    })
    .catch(error => {
      console.log(error)
    })
}

const charData = async (info, index) => {
  if (index > 16) {
    index = index - 1
  }

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

const getWorld = async homeWorld => {
  await fetch(homeWorld)
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
