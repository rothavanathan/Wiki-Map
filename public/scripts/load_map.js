//select #main-area
//clear main div of content
//load new map


//get markers from map
function load_marker(marker, map, infoWindow) {
  console.log(JSON.parse(marker.latlng));
  const newMarker = new google.maps.Marker({
    map,
    position: JSON.parse(marker.latlng),
    clickable: true,
    draggable:true
  });

  //save passed marker info to newMarker object
  newMarker.id = marker.id;
  newMarker.title = marker.title;
  newMarker.description = marker.description;
  newMarker.image_url = marker.image_url;
  newMarker.image_alt_text = marker.image_alt_text;

  //info windwow load on click marker event
  google.maps.event.addListener(newMarker, 'click', function() {
      infoWindow.setContent(`<h1 class="text-center">${this.title}</h1><img class="rounded mx-auto d-block" width="300px" src=${this.image_url} alt="${this.image_alt_text}"><p class="text-center">${this.description}</p>`);
      infoWindow.open(this.getMap(), this);
  });

  //drag to reposition marker
  newMarker.addListener('drag', (e) => {
    //store tempPosition of marker
    tempPosition = e.latLng;
    //update position in database
    console.log(tempPosition);
  })
  return newMarker;
}

//pass function map and get an array of markers associated with the map
const getMarkersForMap = (map) => {
  return $.ajax({
    url: `/api/maps/${map.id}`,
    dataType: 'json'
  }).then(data => {
    const markers = data.maps;
    // $('#main-area').append(`<h1 class="mt-4">map's markers</h1>
    // <ul id="marker-list">`);
    // //displays list of map markers
    // markers.map(function(marker){
    //   $('#marker-list').append(`<li>${marker.title}</li>`)
    // })
    return markers;

  })

}

//pass function a map.id and load the map
const loadMap = (map) => {
  //clear main-area of child nodes
  console.log(map);
  $("#main-area")
  .empty()
  .append(`<h1 class="mt-4 text-center">${map.title}</h1>
  <h2 class="mt-4 text-center">${map.owner_handle}</h2>
  <div id="map"></div>`);

  //build map

  const mapObject = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    mapTypeId: 'hybrid'
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "<p>hey i'm an info window!</p>"
  });

  //get markers associated with map
  getMarkersForMap(map)
    .then(markers => {
      mapObject.fitBounds(calcBounds(markers))
      markers.map(marker => {
        load_marker(marker, mapObject, infoWindow)
      });

    });


  // //fits all markers in initial map zoom





  // // initial set up of all the points that are saved with map object
  // markers.map(point => {
  //   load_marker(point, mapObject, infoWindow)
  // });

  // //creates new marker object on dblclick event
  // mapObject.addListener("rightclick", (e) => {
  //   console.log("rightclick");
  //   const marker = new google.maps.Marker({
  //     position: e.latLng,
  //     map: mapObject,
  //     draggable: true,
  //     clickable: true
  //   })
  //   //adds new marker to list of markerPoints
  //   markers.push(marker);
  //   console.log(markers)

  //   marker.addListener("click", () => {
  //     console.log(marker.getPosition())
  //     point = marker.getPosition();
  //     marker.setPosition(point)
  //     infoWindow.open(map, marker)


  //   });

  //   //add drag functionality to replace marker position
  //   marker.addListener('drag', (e) => {
  //     //store tempPosition of marker
  //     tempPosition = e.latLng;
  //     //update position in database
  //     console.log(tempPosition);
  //   })

};


