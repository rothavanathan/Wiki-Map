//select #main-area
//clear main div of content
//display ul of maps

// const { request } = require("express");

//build map article for browsing
const makeMapCard = (map) => {
  return `
    <article class="mapPost" id="${map.id}" style="width: 18rem;">
      <div class="card" >
      <img class="card-img-top" src="${map.thumbnail_photo_url}" alt="${map.thumbnail_alt_text}">
        <div class="card-body">
          <h5 class="card-title text-center">${map.title}: ${map.owner_id}</h5>
          <p class="card-text">${map.description}</p>
        </div>
      </div>
    </article>`
};


const showPublicMaps = () => {
  $.ajax({
    url: "/api/maps",
    dataType: 'json'
  }).then(data => {
    const maps = data.maps;
    //populate main area with a title and ul
    $('#main-area').append(`<h1 class="mt-4 text-center">Public Maps</h1>
    <ul class="d-flex flex-row justify-content-around flex-wrap" id="public-map-list">`);
    //populate ul with articles of all public maps
    maps.map(function(map){
      $('#public-map-list').append(makeMapCard(map))
      $(`#${map.id}`).on('click', (e) => {
        loadMap(map)
      });
    })
  })
}

// //check whether session cookie is present
// const isLoggedIn = () => {
//   if (req.session) {
//     console.log(`we got a cookie!`)
//   }
//   return;
// };

$('#public-map').on('click', ()=> {
  $("#main-area")
    //clear main-area of child nodes
    .empty();
  // isLoggedIn();
  showPublicMaps();

});

