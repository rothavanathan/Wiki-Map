//select #main-area
//clear main div of content
//display ul of maps

<<<<<<< HEAD
//build map article for browsing
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
=======
//build the string
const makeMapCard = (map) => {
  //
  return <li></li>
>>>>>>> origin/master
}

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
<<<<<<< HEAD
      $('#public-map-list').append(makeMapArticle(map));
=======
      $('#public-map-list').append(makeMapCard(map));
>>>>>>> origin/master
    })
  })
}

$('#public-map').on('click', ()=> showPublicMaps());
