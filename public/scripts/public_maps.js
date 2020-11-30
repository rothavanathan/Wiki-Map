//select #main-area
//clear main div of content
//display ul of maps

//build map article for browsing
//tweak of Kelvins
const makeMapArticle = (map) => {
  //
  return `
  <article id="mapPost">
    <div class="thumbnail">
      <img src="${map.thumbnail_photo_url}">
    </div>
    <div class="mapInfo">
      <span><h3>${map.title}</h3></span>
      <span>By ${map.owner_id} owner name</span>
      <span>details of map ${map.description}</span>
    </div>
    <footer>
      <span><button>Favorite?</button></span>
    </footer>
  </article>`
}

//lovingly borrowed from bootstraps website
const makeMapCard = (map) => {
  return `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${map.thumbnail_photo_url}" alt="${map.thumbnail_photo_url}">
  <div class="card-body">
    <h5 class="card-title">${map.title}: ${map.owner_id}</h5>
    <p class="card-text">${map.description}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
};


const showPublicMaps = () => {
  $("#main-area")
  //clear main-area of child nodes
  .empty();
  $.ajax({
    url: "/api/maps",
    dataType: 'json'
  }).then(data => {
    const maps = data.maps;
    $('#main-area').append('<ul id="public-map-list">');
    maps.map(map => {
      $('#public-map-list').append(makeMapCard(map));
    })
  })
}

$('#public-map').on('click', ()=> showPublicMaps());
