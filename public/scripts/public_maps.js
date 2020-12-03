
//select #main-area
//clear main div of content
//display ul of maps


//build map article for map
const makeMapCard = (map, list) => {
  $(`#${list}`).append(`
  <article class="mapPost" id="${map.id}"  style="width: 18rem;">
    <div class="card h-100" >
    <img class="card-img-top" src="${map.thumbnail_photo_url}" alt="${map.thumbnail_alt_text}">
      <div class="card-body">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart ${map.isfavorite ? 'favorite' : ''}" xmlns="http://www.w3.org/2000/svg">
            <path  d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
        <h5 class="card-title text-center">${map.title}</h5>
        <span><h5 class="card-title text-center">${map.owner_handle}</h5></span>
        <p class="card-text">${map.description}</p>
      </div>
    </div>
  </article>`)

};

//gets list of all maps and appends #public-map-list in main area
const showPublicMaps = () => {
  $.ajax({
    url: "/api/maps/public",
    dataType: 'json'
  }).then(data => {
    const maps = data.maps;
    //populate main area with a title and ul
    $('#main-area').append(`<h1 class="mt-4 text-center">Public Maps</h1>
    <ul class="d-flex flex-row justify-content-around flex-wrap" id="public-map-list">`);
    //populate ul with articles of all public maps
    maps.map(function(map){

      (makeMapCard(map, 'public-map-list'));
      //event listener to load map
      $(`#${map.id} img`).on('click', (e) => {
        loadMap(map)
      });

      $(`#${map.id} svg`).on('click', () => {
        //toggle isFavorite in UI and in database
        $(`#${map.id} svg`).toggleClass('favorite')
      })

    })
  })
};


$('#public-map').on('click', ()=> {
  clearMainArea();
  showPublicMaps();
});

//gets list of all maps and appends #fave-map-list in main area
const showFaveMaps = () => {
  $.ajax({
    url: "/api/maps/fave",
    dataType: 'json'
  }).then(data => {
    const maps = data.maps;
    console.log(maps)
    //populate main area with a title and ul
    $('#main-area').append(`<h1 class="mt-4 text-center">Fave Maps</h1>
    <ul class="d-flex flex-row justify-content-around flex-wrap" id="fave-map-list">`);
    //populate ul with articles of all public maps
    maps.map(function(map){
      makeMapCard(map, 'fave-map-list')
      //event listener to load map
      $(`#${map.id}`).on('click', (e) => {
        loadMap(map)
      });
    })
  })
};

const faveMapListener = () =>  {
  $('#fave-map').on('click', ()=> {
    clearMainArea();
    showFaveMaps();
  });
}
