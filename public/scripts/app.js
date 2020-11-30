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
    map_id: "",
    latlng: { lat: 43.65785712314121,  lng: -79.40664101589161 },
    title: 'El Ranchos',
    description: "Night Club",
    image_url: "https://www.pexels.com/photo/artists-audience-band-blue-426976/",
    image_alt_text: "A crowd dancing at El Ranchos nightclub",
  },
  {
    id: 2,
    map_id: "",
    latlng: { lat: 43.65562780833972, lng: -79.41236028181297 },
    title: 'BLND TGER',
    description: "Night Club",
    image_url: "https://www.pexels.com/photo/people-dancing-inside-dim-room-2114365/",
    image_alt_text: "A crowd dancing at BLNG TGER nightclub",
  },
  {
    id: 3,
    map_id: "",
    latlng: { lat: 43.65774994467593, lng: -79.4002035011423 },
    title: 'El Mocambo',
    description: "Live Music Venue",
    image_url: "https://www.pexels.com/photo/neon-light-signages-on-wall-1426620/",
    image_alt_text: "A punk band at El Mocambo",
  },
  {
    id: 4,
    map_id: "",
    latlng: { lat: 43.64926425834702, lng: -79.3959058299788 },
    title: 'Horseshoe Tavern',
    description: "Live Music Venue",
    image_url: "https://www.pexels.com/photo/fans-filming-concert-on-smartphones-in-night-club-4319117/e",
    image_alt_text: "A shitty local band playing at the Horseshow",
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
  map.addListener("rightclick", (e) => {
    console.log("rightclick");
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
      point = marker.getPosition();
      marker.setPosition(point)
      infoWindow.open(map, marker)


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

//top right icon home/ profile button functionality
$("#home-icon").on('click', () => {
  //if we have user cookeies load profile page
  //if no user cookies load logged out user home page

})

//creates template for logged in user
const userLoggedIn = () => {}

//creates template for public pages only
const noUserLoggedIn= () => {

}
