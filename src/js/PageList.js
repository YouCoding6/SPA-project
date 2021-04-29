const PageList = (argument) => {

  const hideCard = () => {
    const cards = document.querySelectorAll('.card-game')
    console.log(cards)
    cards.forEach((card, index) => {
      if (index > 8) {
        card.classList.add('hidden')
      }
    });
  }

  const showMore = () => {
    let cards = document.querySelectorAll(".hidden")
    cards.forEach((card, index) => {
      if (index < 8) {
        card.classList.remove('hidden')
      }
    });
    if (cards.length < 8) {
      document.querySelector(".showMore").classList.add("hidden")
    }

  }

  const displayImage = (element) => {
    if (element.background_image != null) {
      return element.background_image
    }
    else {
      return "src/images/undefined-image.jpg"
    }
  }


  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let games = "";
    const apiKey = "&key=" + process.env.api_key

    const fetchList = (url, argument) => {
      let finalURL
      if (argument != "") {
        finalURL = url + "?search=" + argument + apiKey;
      }
      else {
        finalURL = url + "?dates=2015-01-01,2025-12-31" + apiKey;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.results.length)

          response.results.forEach((game) => {

            games += `
                    <div class="card-game col-4 p-0 col-md-3 m-4" ">
                      <img class="card-img-top flex-img" src="${displayImage(game)}" alt="Card image">    
                      <div class=" mt-2 mb-2"> 
                        <a href = "#pagedetail/${game.id}" class="name">${game.name}</a>
                      </div>
                      <div class="row">
                        ${logoStore(game.parent_platforms)}
                      </div>
                    </div>
                  `;
            document.querySelector(".page-list .cards").innerHTML = games;

          });

          const cards = document.querySelectorAll('.card-game')
          if (cards.length > 8) {
            document.querySelector(".showMore").classList.remove("hidden")
          }
          hideCard();
          const btnShowMore = document.querySelector(".showMore")
          let count = 0
          btnShowMore.addEventListener('click', (e) => {
            count++
            e.preventDefault();
            if (count < 3) {
              showMore();
            }
          })
        });

    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const logoStore = (game) => {
    let str = ""
    if (game) {
      game.forEach((element) => {
        str += `<img class="col-md-2 logo" src="src/images/` + element.platform.slug + `.svg">`
      });
    }
    return str
  }


  const render = () => {
    pageContent.innerHTML = `
    <div class="page-list">
      <h1 class="welcome mb-2">Welcome,</h1>
      <p class="mb-5"> The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
        the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
        brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
        groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
        with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure
      </p>
      <div class="container text-center mt-4">
        <div class="cards">...loading</div>
        <button class="btn btn-outline-secondary mb-4 showMore hidden">Show More</button>
      </div>
    
    </div>`

    preparePage()

  };

  render();
  // showMore();
};

const form = document.querySelector("form")
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let inputSearch = document.querySelector("input").value
  PageList(inputSearch);
})


export { PageList };