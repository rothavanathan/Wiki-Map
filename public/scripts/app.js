// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

//hard coded markerPoints for map testing
const markers = [
  {
    latlng: { lat: 43.65785712314121,  lng: -79.40664101589161 },
    title: 'El Ranchos',
    description: "Night Club",
    image_url: "",
    map_id: "",
  },
  {
    latlng: { lat: 43.65562780833972, lng: -79.41236028181297 },
    title: 'BLND TGER',
    description: "Night Club",
    image_url: "",
    map_id: "",
  },
  {
    latlng: { lat: 43.65774994467593, lng: -79.4002035011423 },
    itle: 'El Mocambo',
    description: "Live Music Venue",
    image_url: "",
    map_id: "",
  },
  {
    latlng: { lat: 43.64926425834702, lng: -79.3959058299788 },
    itle: 'Horseshoe ave',
    description: "Live Music Venue",
    image_url: "",
    map_id: "",
  }
];

// const calcBounds = (points) => {
//   const latMIN = (Math.min(...markerPoints.map(point => point.lat)));
//   const latMAX = (Math.max(...markerPoints.map(point => point.lat)));
//   const lngMIN = (Math.min(...markerPoints.map(point => point.lng)));
//   const lngMAX = (Math.max(...markerPoints.map(point => point.lng)));
//   const bounds = [
//     {"lat": latMIN,
//     "lng": lngMIN},
//     {"lat": latMAX,
//     "lng": lngMAX}
//   ];
//   return bounds;
// }


// const sw = {lat: , lng: }

// Initialize and add the map
function initMap() {
  //
  const center = { lat: 47.570770, lng: -52.680986 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    mapTypeId: 'hybrid'
  });

  //fits all markers in initial map zoom
  map.fitBounds(calcBounds(markers));

  // initial set up of all the points that are saved with map object
  markers.map(point => {
    const marker = new google.maps.Marker({
      position: point.latlng,
      map: map,
      setDraggable: true
    });
    marker.addListener("click", () => {
      console.log(marker.getPosition())
      point = (marker.getPosition());
    });
  })



  //creates new marker object on dblclick event
  map.addListener("dblclick", (e) => {
    console.log('dblclick!')
    const marker = new google.maps.Marker({
      position: e.latLng,
      map: map,
      draggable: true,
      clickable: true
    })
    //adds new marker to list of markerPoints
    markers.push(marker);
    console.log(markers)

    marker.addListener("click", () => {
      console.log(marker.getPosition())
      point = (marker.getPosition());

    });

    //add drag functionality to replace marker position
    marker.addListener('drag', (e) => {
      //store tempPosition of marker
      tempPosition = e.latLng;
      //update position in database
      console.log(tempPosition);
    })
  });
};

