
//select #main-area
//clear main div of content
//display ul of maps

// const { makeArray } = require("jquery");

//build map article for map
const makeMapCard = (map, list) => {
  $(`#${list}`).append(`
  <article class="mapPost" id="${map.id}"  style="width: 18rem;">
    <div class="card h-100" >
    <img class="card-img-top" src="${map.thumbnail_photo_url}" alt="${map.thumbnail_alt_text}">
      <div class="card-body">
          <i class="${map.isfavorite ? 'fas' : 'far'} fa-heart ${map.isfavorite ? 'favorite' : ''}"></i>
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
