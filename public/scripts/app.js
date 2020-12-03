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

// const { request } = require("express");

//hard coded markerPoints for map testing
// const markers = [
//   {
//     id: 1,
//     map_id: "",
//     latlng: { lat: 43.65785712314121,  lng: -79.40664101589161 },
//     title: 'El Ranchos',
//     description: "Night Club",
//     image_url: "https://www.pexels.com/photo/artists-audience-band-blue-426976/",
//     image_alt_text: "A crowd dancing at El Ranchos nightclub",
//   },
//   {
//     id: 2,
//     map_id: "",
//     latlng: { lat: 43.65562780833972, lng: -79.41236028181297 },
//     title: 'BLND TGER',
//     description: "Night Club",
//     image_url: "https://www.pexels.com/photo/people-dancing-inside-dim-room-2114365/",
//     image_alt_text: "A crowd dancing at BLNG TGER nightclub",
//   },
//   {
//     id: 3,
//     map_id: "",
//     latlng: { lat: 43.65774994467593, lng: -79.4002035011423 },
//     title: 'El Mocambo',
//     description: "Live Music Venue",
//     image_url: "https://www.pexels.com/photo/neon-light-signages-on-wall-1426620/",
//     image_alt_text: "A punk band at El Mocambo",
//   },
//   {
//     id: 4,
//     map_id: "",
//     latlng: { lat: 43.64926425834702, lng: -79.3959058299788 },
//     title: 'Horseshoe Tavern',
//     description: "Live Music Venue",
//     image_url: "https://www.pexels.com/photo/fans-filming-concert-on-smartphones-in-night-club-4319117/e",
//     image_alt_text: "A shitty local band playing at the Horseshow",
//   }
// ];


// Initialize and add the map


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


//initial page load
$(document).ready(function() {
  // //landing page
  // $.ajax({
  //   url: "/",
  //   dataType: 'json'
  // }).then(data => {
    //where do we get info from?
    // removeProfile()
  clearMainArea();
  showPublicMaps();
  addMapGenListener();
  addLoginListener();
  addLogoutListener();
  addRegisterListener();
  faveMapListener();
  // })
})

