const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    const apiKey = "?key=" + process.env.api_key

    const fetchGame = (url, argument) => {

      let finalURL = url + argument + apiKey

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {

          console.log(response.website)

          let { name, rating, ratings, website, id, screenshots_count, description, released, stores, genres, tags, background_image, developers, platforms, publishers } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector(".image-detail").src = background_image;
          articleDOM.querySelector(".website").href = website;
          articleDOM.querySelector(".title-detail").innerHTML = name + ",";
          articleDOM.querySelector(".rating").innerHTML = rating + " /5 - " + ratings.length + " votes"
          articleDOM.querySelector(".release-date").innerHTML = released;
          articleDOM.querySelector(".description").innerHTML = description;

          if (developers) {
            developers.forEach((developer, index) => {
              if (index < developers.length - 1) {
                articleDOM.querySelector(".developers").innerHTML += developer.name + ", ";
              }
              else {
                articleDOM.querySelector(".developers").innerHTML += developer.name;

              }
            })
          };
          if (platforms) {
            platforms.forEach((element, index) => {
              if (index < platforms.length - 1) {
                articleDOM.querySelector(".platforms").innerHTML += element.platform.name + ", ";
              }
              else {
                articleDOM.querySelector(".platforms").innerHTML += element.platform.name;
              }
            })
          }
          if (publishers) {
            publishers.forEach((publisher, index) => {
              if (index < publishers.length - 1) {
                articleDOM.querySelector(".publishers").innerHTML += publisher.name + ", ";
              }
              else {
                articleDOM.querySelector(".publishers").innerHTML += publisher.name;

              }
            })
          }
          if (tags) {
            tags.forEach((tag, index) => {
              if (index < tags.length - 1) {
                articleDOM.querySelector(".tags").innerHTML += tag.name + ", ";
              }
              else {
                articleDOM.querySelector(".tags").innerHTML += tag.name;
              }
            })
          }
          if (genres) {
            genres.forEach((genre, index) => {
              if (index < genres.length - 1) {
                articleDOM.querySelector(".genres").innerHTML += genre.name + ", ";
              }
              else {
                articleDOM.querySelector(".genres").innerHTML += genre.name;
              }
            })
          }
          if (stores) {
            stores.forEach(element => {
              articleDOM.querySelector(".stores").innerHTML += `
                <a href="${element.url}"><span class="link">${element.store.name}</a><br>`;
            })
          }
          if (screenshots_count > 0) {
            fetchScreenshots(id);
          }
        });
    };

    const fetchScreenshots = (idGame) => {
      let finalURL = `https://api.rawg.io/api/games/${idGame}/screenshots${apiKey}`
      fetch(finalURL)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((result, index) => {
            if (index < 4) {
              document.querySelector(".card-screenshots").innerHTML += `
            
                <div class="card-game-screenshot col-md-6 my-2"> 
                  <img alt="${name}" class="game-screenshot" src="${result.image}">  
                </div>
          
              `;
            }
          });

        })
    }

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };
  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail mb-5"> 
        <div class="article">
          <img class="image-detail mt-4 mx-auto d-block w-100" src="" alt="Card image">
          <div class="website-btn"> 
            <a href="" class="website mt-5">Check website</a> 
          </div>
           
          <div class="row align-items-center mt-3 mb-4">
            <div class="col-md-8">        
              <h3 class="title-detail mt-3"></h3>
            </div>
            <div class="col-md-4">
              <h3 class="rating text-right"></h3>
            </div>
          </div>
          <div>
            <h3 class="plot p-0">Plot</h3>
            <div class="description pt-0"></div>  
          </div>
          <div class="row mt-5 mb-4">
            <div class="col-md-3"> 
              <h4 class="font-weight-bold">Release date :</h4>
            </div>
            <div class="col-md-2">
              <h4 class="release-date font-weight-bold"></h4>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-md-4">
                <div class="font-weight-bold">Developpers</div>
                <div class="developers"></div>
              </div>
              <div class="col-md-4">
                <div class="font-weight-bold">Platforms</div>
                <div class="platforms"></div>
              </div>
              <div class="col-md-4">
                <div class="font-weight-bold">Publisers</div>
                <div class="publishers"></div>
              </div>
            </div>
            <div class="row mt-5 mb-5">
              <div class="col-md-4">
                <div class="font-weight-bold">Tags</div>
                <div class="tags"></div>
              </div>
              <div class="col-md-4">
                <div class="font-weight-bold">Genres</div>
                <div class="genres"></div>
              </div>
            </div>
          </div>
          <div class="stores"> 
           <div class="buy mb-1">Buy</div>
          </div>
          <div class=" row card-screenshots mt-3">
           
          </div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };