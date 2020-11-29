//test data
// const markerPoints = [
//   { lat: 47.570770, lng: -52.680986 },
//   { lat: 47.670770, lng: -52.680986 },
//   { lat: 47.570770, lng: -52.780986 },
//   { lat: 47.470770, lng: -52.680986 },
// ];

// Sets map boundaries based on furthest corners of flags in a map.
const calcBounds = (markers) => {
  const latMIN = (Math.min(...markers.map(point => point.latlng.lat)));
  const latMAX = (Math.max(...markers.map(point => point.latlng.lat)));
  const lngMIN = (Math.min(...markers.map(point => point.latlng.lng)));
  const lngMAX = (Math.max(...markers.map(point => point.latlng.lng)));
  const bounds = {
    south: latMIN,
    west: lngMIN,
    north: latMAX,
    east: lngMAX
  };
  return bounds;
};

function load_marker(marker, map, infoWindow) {
  const newMarker = new google.maps.Marker({
    map,
    position: marker.latlng,
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
      infoWindow.setContent(`<h1>${this.title}</h1><img src=${this.image_url} alt="${this.image_alt_text}"><p>${this.description}</p>`);
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
