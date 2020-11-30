//select #main-area
//clear main div of content
//display ul of maps

//build the string
const makeMapCard = (map) => {
  //
  return <li></li>
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
      $('#public-map-list').append(makeMapCard(map));
    })
  })
}

$('#public-map').on('click', ()=> showPublicMaps());
