//test data
// const markerPoints = [
//   { lat: 47.570770, lng: -52.680986 },
//   { lat: 47.670770, lng: -52.680986 },
//   { lat: 47.570770, lng: -52.780986 },
//   { lat: 47.470770, lng: -52.680986 },
// ];

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
  newMarker.title = marker.title;
  newMarker.description = marker.description;
  newMarker.image_url = marker.image_url;
  google.maps.event.addListener(newMarker, 'click', function() {
      infoWindow.setContent(`<h1>${this.title}</h1><img src=${this.image_url}<p>${this.description}</p>`);
      infoWindow.open(this.getMap(), this);
  });
  newMarker.addListener('drag', (e) => {
    //store tempPosition of marker
    tempPosition = e.latLng;
    //update position in database
    console.log(tempPosition);
  })
  return newMarker;
}
