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

          let { name, rating, ratings, website, description, released, stores, genres, tags, background_image, developers, platforms, publishers } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector(".image-detail").src = background_image;
          articleDOM.querySelector(".website").href = website;
          articleDOM.querySelector(".title-detail").innerHTML = name + ",";
          articleDOM.querySelector(".rating").innerHTML = rating + " /5 - " + ratings.length + " votes"
          articleDOM.querySelector(".release-date").innerHTML = released;
          articleDOM.querySelector(".description").innerHTML = description;
          developers.forEach(developer => {
            articleDOM.querySelector(".developers").innerHTML += developer.name;
          });
          platforms.forEach(element => {
            articleDOM.querySelector(".platforms").innerHTML += element.platform.name + ", ";
          });
          publishers.forEach(publisher => {
            articleDOM.querySelector(".publishers").innerHTML += publisher.name + ", ";
          });
          tags.forEach(tag => {
            articleDOM.querySelector(".tags").innerHTML += tag.name + ", ";
          });
          genres.forEach(genre => {
            articleDOM.querySelector(".genres").innerHTML += genre.name + ", ";
          });
          stores.forEach(element => {
            articleDOM.querySelector(".stores").innerHTML += element.store.name + ", ";
            // articleDOM.querySelector(".stores").href += "https:/" + element.store.domain + ", ";
            console.log(element.store.domain)

          });
          // articleDOM.querySelector(".stores").href += "https:/" + element.store.domain + ", ";
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };
  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail mb-5"> 
        <div class="article">
          <img class="image-detail mt-4 mx-auto d-block w-100" src="" alt="Card image">
          <a href="" class="website mt-5">Check website</a>   
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

          <div class="buy mb-1">Buy</div>
          <a href="" class="stores"></a>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };