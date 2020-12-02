const newMarkers = []
const newMap = []
const mapAuthentication = []

$("#map_generator").on('click', () => {
  $("#main-area")
    //clear main-area of child nodes
    .empty()
    //Add create Map onto main
    .append(`

<form id="mapSetup">
  <h1 class="mt-4">Map setup <span class="float-right"> <button id="generate_map" type="submit" class="btn btn-light">Generate Map</button></span></h1>
  <div class="form-group">
    <label for="mapTitle">Map Title</label>
    <input type="text" class="form-control" id="mapTitle" name="title" placeholder="Map Title here..." required>
  </div>
  <div class="form-group">
    <label for="mapDescription">Map Description</label>
    <textarea class="form-control" id="mapDescription" rows="2" name="description" placeholder="Tell people about   your map..."></textarea>
  </div>
  <div class="form-group">
    <label for="thumbnail_photo_url">Map thumbnail photo </label>
    <input type="text" class="form-control" id="thumbnail_photo_url" name="thumbnail_photo_url" placeholder="Thumbnail url...">
  </div>
  <div class="form-group">
    <label for="alternateThumbText">Alternate thumbnail description</label>
    <input type="text" class="form-control" id="alternateThumbText" name="thumbnail_alt_text" placeholder="Short description here...">
  </div>
</form>

  <div class="form-group">
  <label class="form-check-label d-flex justify-content-center" for="privateToggle">
   Make Map Private
  </label>
  <input class="form-control" type="checkbox" id="privateToggle" value="option1" aria-label="...">
  </div>

  <hr/>
    <div class="form-group d-flex justify-content-between">
      <button form="mapSetup" class="btn-save btn btn-primary">Set Map Details</button>
      <a class="btn btn-primary" data-toggle="collapse" href="#privateCollapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Add Users to Map</a>
    </div>

  <form id="authenticUsers">
    <div class="form-group collapse" id="privateCollapse">
      <hr/>
      <input class="form-control" type="text" placeholder="Choose which users you'd like to authorize on your Private Map" readonly>
      <div class="form-group">
      <label for="handleList">Authenticate other Users on your Map</label>
      <select class="form-control" id="handleList">
      </select>
      <hr/>
      <div class="form-group d-flex justify-content-center">
      <button type="submit" class="btn-save btn btn-primary btn-sm">Save</button>
      <input class="form-control" type="text" placeholder="Save your selected Users" readonly>
      </div>
    </div>
  </form>
`);

  $("#mapSetup").on("submit", (event) => {
    event.preventDefault();
    newMap.push(mapFormData)
    console.log("Saved Form Data")
    })


  $("#mapSetup").find("input, textarea").on("change", (event) => {
    let key = event.target.name
    console.log(event.target.name, event.target.value)
    mapFormData[key] = event.target.value
  })

  $("#handleList").on("submit", (event) => {
  event.preventDefault();
  console.log(event.target.value)
  })

  $("#privateToggle").on("click", () => {
  mapFormData.isPublic ? mapFormData.isPublic = false : mapFormData.isPublic = true
  console.log(mapFormData.isPublic)
  })

  const mapFormData = {
    title: "",
    description: "",
    thumbnail_photo_url: "",
    thumbnail_alt_text: "",
    isPublic: true
  }

  const fetchUserHandleList = () => {
    // const currentUser = sessionStorage.getItem("handle")
    const userHandles = []
    $.ajax({
      url: "/api/users",
      dataType: 'json'
    }).then(data => {
      let fetchedUsers = data.users;
      // console.log(data.users)
      for (let user in fetchedUsers) {
        // if (fetchedUsers[user].handle !== currentUser) {
        userHandles.push(fetchedUsers[user].handle)
        // }
      }
      return generateHandleList(userHandles);
    })
  }

  const generateHandleList = (userHandles) => {
    userHandles.forEach((handle) => {
      $("#handleList").append(`
    <option>${handle}</option>
    `);
    })
  }





  fetchUserHandleList()

  const mapBuilder = () => {

  }

  $("#generate_map").on('click', () => {
    $("#main-area")
      //clear main-area of child nodes
      .empty()
      //Add create Map onto main
      .append(`
    <h1 class="mt-4">Create Map <span class="float-right"> <button id="saveMap" type="submit" class="btn btn-light">Save Map</button></span></h1>
    <div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 500px">
    <div id="map" class="viewMap"></div>
    </div>`);

    $("#saveMap").on("click", (event) => {
      const savedMarkers = []
      event.preventDefault;
      console.log("Attempting to save map...")
      if (newMarkers.length >= 1) {
        newMarkers.forEach((marker) => {
          if (marker.formData.description && marker.formData.title) {
            savedMarkers.push(marker)
            console.log(marker.formData.description, marker.formData.title)
          }
        })
        console.log("You've saved your map!")
        console.log(savedMarkers)
      } else (console.log("Error saving: Please add at least one flag to save your map"))
    })

    const contentString = `
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" name="title" placeholder="Title here..." required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" id="description" name="description"rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="flagPicture">Add a picture</label>
          <input type="text" class="form-control-file" id="flagPicture" name="img_url" placeholder="img url here...">
        </div>
        <div class="form-group">
          <label for="pictureAltText">Alternate img Text</label>
          <input type="text" class="form-control" id="pictureAltText" name="img_alt_text" placeholder="Img description here...">
        </div>
        <div class="form-group d-flex justify-content-around">
        <button type="submit" name="saveFlag" class="saveFlag btn btn-primary">Submit</button>
        <button type="submit" name="deleteFlag" class="deleteFlag btn btn-primary">Delete</button>
        </div>
      </form>
    `
    //New map request function
    function newMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.6532, lng: -79.3832 },
        zoom: 15,
        mapTypeId: 'hybrid'
      });

      map.addListener("rightclick", (event) => {
        console.log("map right click!")
        const marker = new google.maps.Marker({
          position: event.latLng,
          map,
          draggable: true,
          clickable: true
        })

        map.setCenter(event.latLng);
        const $iwForm = $(contentString);

        const infoWindow = new google.maps.InfoWindow({
          position: marker.getPosition(),
          content: $iwForm[0],
        });

        infoWindow.open(map, marker)
        marker.infoWindow = infoWindow;

        marker.formData = {
          latlng: {},
          title: "",
          description: "",
          image_url: "",
          image_alt_text: "",
        }

        $iwForm.on("submit", (event) => {
          event.preventDefault();
          console.log("saving form")
          marker.formData.latlng = marker.getPosition();
          infoWindow.close()
        })


        // $iwForm.on("submit", (event) => {
        //   console.log("deleted")
        //   event.preventDefault();
        //   marker.infoWindow.setMap(null);
        //   marker.infoWindow = null;
        //   infoWindow.close()
        // })


        $iwForm.find("input, textarea").on("change", (event) => {
          let target = event.target
          marker.formData[target.name] = target.value;
          console.log(target.name, target.value)
        })

        marker.addListener("click", (e) => {
          console.log("Marker click!")
          map.setCenter(e.latLng);
          infoWindow.open(map, marker)
          let markerSpot = marker.getPosition()
          console.log(markerSpot)
        });

        newMarkers.push(marker);
      });
    };
    //Call newMap and initialize the map
    newMap();
  })
})
