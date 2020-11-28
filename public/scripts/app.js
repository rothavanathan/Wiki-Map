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
const points = [
  { lat: 47.570770, lng: -52.680986 },
  { lat: 47.670770, lng: -52.680986 },
  { lat: 47.570770, lng: -52.780986 },
  { lat: 47.470770, lng: -52.680986 },
];

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const center = { lat: 47.570770, lng: -52.680986 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: center,
    mapTypeId: 'hybrid'
  });
  // The marker, positioned at Uluru
  points.map(point => {
    const marker = new google.maps.Marker({
      position: point,
      map: map,
    });

  })
};

