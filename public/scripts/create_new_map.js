const newMarkers = []
const newMap = []
const mapAuthentication = {}
let mapId

const showMapDetailForm = () => {
  $("#main-area")
  //clear main-area of child nodes
  .empty()
  //Add create Map onto main
  .append(`

<form id="mapSetup">
<h1 class="mt-4">Map setup <span class="float-right"> <button id="generate_map" type="submit" class="btn btn-light">Generate Map</button></span></h1>
<label for="mapSetup">Please add a Title and Description</label>
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
  <div class="form-group d-flex justify-content-center">
    <button id="setupButton" form="mapSetup" class="btn-save btn btn-primary" data-toggle="collapse" href="#privateCollapse"">Set Map Details</button>
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
    <button form="authenticUsers" type="submit" class="btn-save btn btn-primary btn-sm">Save</button>
    <input class="form-control" type="text" placeholder="Save your selected Users" readonly>
    </div>
  </div>
</form>
`);

//Functions to set initial Map Details
$("#setupButton").hide()

$("#mapSetup").on("submit", (event) => {
  event.preventDefault();
  $("#setupButton").attr("disabled", true);
  console.log("Saved Form Data")
  insertMap(mapFormData)
  })

const insertMap = (mapFormData) => {
    console.log("this is the data", mapFormData)
    $.ajax({
      method: "POST",
      url: "/api/maps/save",
      data: mapFormData
    })
}

$("#mapSetup").find("input, textarea").on("change", (event) => {
    $("#setupButton").show()
  let key = event.target.name
  console.log(key)
  console.log(event.target.name, event.target.value)
  mapFormData[key] = event.target.value
})

let chosenUser

$("#authenticUsers").on("submit", (event) => {
let finalUser;
event.preventDefault();
for(let key in mapAuthentication) {
  if(mapAuthentication[key] === chosenUser){
    finalUser = key;
    console.log(finalUser)
  }
  authorizeUser(finalUser)
}
})

const authorizeUser = (finalUser) => {
const user_id = finalUser
console.log("user id is", user_id)
$.ajax({
  method: "POST",
  url: "/api/maps/permissions",
  data: {key: user_id},
})
}

$("#handleList").on("change", (event) => {
  chosenUser = event.target.value
  console.log(chosenUser)
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
    let cUser = data.currentUser
    console.log("currentUser", cUser)
    // console.log(data.users)
    for (let user in fetchedUsers) {
      mapAuthentication[fetchedUsers[user].id] = fetchedUsers[user].handle
      if (fetchedUsers[user].id !== cUser) {
      userHandles.push(fetchedUsers[user].handle)
      }
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
}

const displayNewMap = () => {
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
    console.log("to save this map")
    if (newMarkers.length >= 1) {
      newMarkers.forEach((marker) => {
        if (marker.formData.description && marker.formData.title) {
          savedMarkers.push(marker)
        }
      })
      saveMarkers(savedMarkers)
    } else {
      console.log("Error saving: Please add at least one flag to save your map")
    }
  })

  const saveMarkers = (savedMarkers) => {
    console.log("this is being called", savedMarkers)
    const markerSQL = []
    for (let marker of savedMarkers) {
      markerSQL.push({
        ...marker.formData,
        latlng: JSON.stringify(marker.formData.latlng)
      })
    }
    $.ajax({
      method: "POST",
      url: "/api/maps/markers",
      data: JSON.stringify(markerSQL),
      dataType: "json",
      contentType: "application/json; charset=utf-8"
    })
    console.log(markerSQL)

  }

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
}



const addMapGenListener = () => {
  $("#create_new_map").on('click', () => {
    showMapDetailForm()
    $("#generate_map").on('click', () => {
      displayNewMap();
  })
  })
}




