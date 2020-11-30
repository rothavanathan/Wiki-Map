//select #main-area
//clear main div of content
//display ul of maps

//build map article for browsing
const makeMapCard = (map) => {
  return `
    <article class="mapPost" id="${map.id}">
      <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${map.thumbnail_photo_url}" alt="${map.thumbnail_alt_text}">
        <div class="card-body">
          <h5 class="card-title">${map.title}: ${map.owner_id}</h5>
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
    $('#main-area').append(`<h1 class="mt-4">Public Maps</h1>
    <ul id="public-map-list">`);
    maps.map(function(map){
      $('#public-map-list').append(makeMapCard(map))
      $(`#${map.id}`).on('click', (e) => {
        console.log(`you clicked on a mapPost!`, e);
        //load a specific map
        console.log(`map is: `, map);
        loadMap(map)
      });
    })
  })
}

$('#public-map').on('click', ()=> {
  $("#main-area")
    //clear main-area of child nodes
    .empty();
  showPublicMaps();

});

