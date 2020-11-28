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
    id: 1,
    latlng: { lat: 43.65785712314121,  lng: -79.40664101589161 },
    title: 'El Ranchos',
    description: "Night Club",
    image_url: "",
    map_id: "",
  },
  {
    id: 2,
    latlng: { lat: 43.65562780833972, lng: -79.41236028181297 },
    title: 'BLND TGER',
    description: "Night Club",
    image_url: "",
    map_id: "",
  },
  {
    id: 3,
    latlng: { lat: 43.65774994467593, lng: -79.4002035011423 },
    title: 'El Mocambo',
    description: "Live Music Venue",
    image_url: "",
    map_id: "",
  },
  {
    id: 4,
    latlng: { lat: 43.64926425834702, lng: -79.3959058299788 },
    title: 'Horseshoe Tavern',
    description: "Live Music Venue",
    image_url: "",
    map_id: "",
  }
];


// Initialize and add the map
function initMap() {
  //create map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    mapTypeId: 'hybrid'
  });

  //fits all markers in initial map zoom
  map.fitBounds(calcBounds(markers));

  const infoWindow = new google.maps.InfoWindow({
    content: "<p>hey i'm an info window!</p>"
  });


  // initial set up of all the points that are saved with map object
  markers.map(point => {
    load_marker(point, map, infoWindow)
  });

  //creates new marker object on dblclick event
  map.addListener("dblclick", (e) => {
    console.log('dblclick!');
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

