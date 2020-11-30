$("#create_map").on('click', () => {
  $("#main-area")
    //clear main-area of child nodes
    .empty()
    //Add create Map onto main
    .append(`
    <h1 class="mt-4">Create Map <span class="float-right"> <button type="button" class="btn btn-light">Save Map</button></span></h1>
    <div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 500px">
    <div id="map" class="viewMap"></div>

    </div>`);
//New map request function
 function newMap() {
    const markers = []

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 43.6532, lng: -79.3832 },
      zoom: 15,
      mapTypeId: 'hybrid'
    });

    const contentString = `<button id="infoEdit">Click me to edit!</button>`

    map.addListener("rightclick", (e) => {
      console.log("right click!")
      const marker = new google.maps.Marker({
        position: e.latLng,
        map,
        draggable: true,
        clickable: true
      })
      const infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener("click", (e) => {
        console.log("click!")
        map.setCenter(e.latLng);
        infoWindow.open(map, marker)
      })
      map.setCenter(e.latLng);
      markers.push(marker);
      console.log("i listened")
    });
  }

  //Jquery scripts and events

//Call newMap and initilize the map
  newMap();
});





