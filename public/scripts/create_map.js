// const newMarkers = []
// $("#generate_map").on('click', () => {
//   $("#main-area")
//   //clear main-area of child nodes
//   .empty()
//   //Add create Map onto main
//   .append(`
//   <h1 class="mt-4">Create Map <span class="float-right"> <button id="saveMap" type="submit" class="btn btn-light">Save Map</button></span></h1>
//   <div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 500px">
//   <div id="map" class="viewMap"></div>
//   </div>`);

//   $("#saveMap").on("click", (event) => {
//     event.preventDefault;
//     console.log("saving map!")
//     if(newMarkers.length >= 1){
//       newMarkers.forEach((marker) => {
//         console.log(marker.formData)
//       })
//       console.log("You've saved your map!")
//     } else (console.log("please add a flag to save your map"))
//   })

//   const contentString = `
//     <form>
//       <div class="form-group">
//         <label for="title">Title</label>
//         <input type="text" class="form-control" id="title" name="title" placeholder="Title here..." required>
//       </div>
//       <div class="form-group">
//         <label for="description">Description</label>
//         <textarea class="form-control" id="description" name="description"rows="2" required></textarea>
//       </div>
//       <div class="form-group">
//         <label for="flagPicture">Add a picture</label>
//         <input type="text" class="form-control-file" id="flagPicture" name="img_url" placeholder="img url here...">
//       </div>
//       <div class="form-group">
//         <label for="pictureAltText">Alternate img Text</label>
//         <input type="text" class="form-control" id="pictureAltText" name="img_alt_text" placeholder="Img description here...">
//       </div>
//       <div class="form-group d-flex justify-content-around">
//       <button type="submit" name="saveFlag" class="saveFlag btn btn-primary">Submit</button>
//       <button type="submit" name="deleteFlag" class="deleteFlag btn btn-primary">Delete</button>
//       </div>
//     </form>
//   `
//   //New map request function
//   function newMap() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 43.6532, lng: -79.3832 },
//       zoom: 15,
//       mapTypeId: 'hybrid'
//     });

//     map.addListener("rightclick", (event) => {
//       console.log("map right click!")
//       const marker = new google.maps.Marker({
//         position: event.latLng,
//         map,
//         draggable: true,
//         clickable: true
//       })

//       map.setCenter(event.latLng);
//       const $iwForm = $(contentString);

//       const infoWindow = new google.maps.InfoWindow({
//         position: marker.getPosition(),
//         content: $iwForm[0],
//       });

//       infoWindow.open(map, marker)
//       marker.infoWindow = infoWindow;

//       marker.formData = {
//         latlng: {},
//         title: "",
//         description: "",
//         image_url: "",
//         image_alt_text: "",
//       }

//       $iwForm.on("submit", (event) => {
//         event.preventDefault();
//         console.log("saving form")
//         marker.formData.latlng = marker.getPosition();
//         infoWindow.close()
//         })


//       // $iwForm.on("submit", (event) => {
//       //   console.log("deleted")
//       //   event.preventDefault();
//       //   marker.infoWindow.setMap(null);
//       //   marker.infoWindow = null;
//       //   infoWindow.close()
//       // })


//       $iwForm.find("input, textarea").on("change", (event) => {
//         let target = event.target
//         marker.formData[target.name] = target.value;
//         console.log(target.name, target.value)
//       })

//       marker.addListener("click", (e) => {
//         console.log("Marker click!")
//         map.setCenter(e.latLng);
//         infoWindow.open(map, marker)
//         let markerSpot = marker.getPosition()
//         console.log(markerSpot)
//       });

//       newMarkers.push(marker);

//     });


//   //Call newMap and initialize the map
// };
// newMap();

// })








