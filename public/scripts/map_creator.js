const showMapDetailForm = () => {
  $("#main-area")
  //clear main-area of child nodes
  .empty()
  //Add create Create Map HTML onto main
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
    <textarea class="form-control" id="mapDescription" rows="2" name="description" placeholder="Tell people about   your map..." disabled></textarea>
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

  <div class="form-check">
    <input class="form-check-input" type="radio" name="exampleRadios" id="public" value="true" checked>
    <label class="form-check-label" for="exampleRadios1">
      Public Map
    </label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="exampleRadios" id="private" value="false">
    <label class="form-check-label" for="exampleRadios2">
      Private Map
    </label>
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

  // Set the privacy status of the Map
  $('.form-check input').on('change', function() {
    mapFormData.isPublic = $('input[name=exampleRadios]:checked', '.form-check').val();
  });

  //Functions and JQUERY to set initial Map Details

  $("#setupButton").hide()
  $("#generate_map").attr("disabled", true)

  $("#mapSetup").find("input").on("change", (event) => {
    $("#mapSetup").find("textarea").attr("disabled", false)
  })

  $("#mapSetup").find("textarea").on("change", (event) => {
    $("#setupButton").show()
  })

  $("#mapSetup").find("input, textarea").on("change", (event) => {
    let key = event.target.name
    console.log(key)
    console.log(event.target.name, event.target.value)
    mapFormData[key] = event.target.value
  })

  $("#mapSetup").on("submit", (event) => {
    event.preventDefault();
    $("#setupButton").attr("disabled", true);
    $("#generate_map").attr("disabled", false);
    $("#generate_map").css("background-color", "#4d90fe")
    $("#generate_map").css("color", "#fff")
    console.log("Saved Form Data")
    insertMap(mapFormData)
  })

  //Creates map in Database

  const insertMap = (mapFormData) => {
    console.log("this is the data", mapFormData)
    $.ajax({
      method: "POST",
      url: "/api/maps/save",
      data: mapFormData
    })
  }

  // Map permission functions

  // Containers for storing permission related data
  const mapAuthentication = {};
  let chosenUser;

  //Sends key and handle of chosen user to Authorize user function
  $("#authenticUsers").on("submit", (event) => {
    let finalUser;
    event.preventDefault();
    for(let key in mapAuthentication) {
    if(mapAuthentication[key] === chosenUser){
      finalUser = key;
      console.log(finalUser)
      }
    }
    authorizeUser(finalUser, chosenUser)
  })

  $("#handleList").on("change", (event) => {
    chosenUser = event.target.value
  })

  //Inserts User into DB as authorized user for Map
  const authorizeUser = (finalUser, chosenUser) => {
    const user_id = finalUser
    if(user_id === undefined){
      $(alert("Please select a user to submit"))
    } else if (user_id) {
      $.ajax({
        method: "POST",
        url: "/api/maps/permissions",
        data: {key: user_id},
      })
    $(alert(`${chosenUser} has been authenticated`))
    }
  }

  const mapFormData = {
    title: "",
    description: "",
    thumbnail_photo_url: "",
    thumbnail_alt_text: "",
    isPublic: true
  }

  // Retrieves user info and send to generateHandleList
  const fetchUserHandleList = () => {
    const userHandles = []
    $.ajax({
      url: "/api/users",
      dataType: 'json'
    }).then(data => {
        let fetchedUsers = data.users;
        let cUser = data.currentUser
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

  //Grabs User and Handles for list population
  fetchUserHandleList()
}

const displayNewMap = () => {
  $("#main-area")
    //clear main-area of child nodes
    .empty()
    //Add create Map onto main
    .append(`
    <h1 class="mt-4 d-flex justify-content-between">Create Map  <button id="saveMap" type="submit" class="btn btn-light">Save Map</button></h1>
    <div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 500px">
      <input id="pac-input" class="controls" type="text" placeholder="Search Box"/>
      <div id="map" class="viewMap"></div>
    </div>`);

  // Containers for data
  const newMarkers = []

  //Gathers all non-empty markers from new Markers and sends to saveMarkers
  $("#saveMap").on("click", (event) => {
    const savedMarkers = []
    event.preventDefault;
    if (newMarkers.length >= 1) {
      newMarkers.forEach((marker) => {
        if (marker.formData.description && marker.formData.title) {
          savedMarkers.push(marker)
        }
      })
      saveMarkers(savedMarkers)
    } else if (newMarkers.length < 1) {
      $(alert("Error saving: Please add at least one flag to save your map"))
    }
  })

  //Sends map markers to DB
  const saveMarkers = (savedMarkers) => {
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
    console.log("sending this obj to DB", markerSQL)

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
      <button type="button" name="deleteFlag" class="deleteFlag btn btn-primary">Delete</button>
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

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    //Listening event to generate marker on rightclick
    map.addListener("rightclick", (event) => {
      console.log("map right click!")
      const marker = new google.maps.Marker({
        position: event.latLng,
        map,
        draggable: true,
        clickable: true
      })
      map.setCenter(event.latLng);
      //Make content string Jquery element so it can have listening event attached
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


      $iwForm.find("[type='button']").on("click", (event) => {
        console.log("deleted")
        event.preventDefault();
        marker.infoWindow.setMap(null);
        marker.infoWindow = null;
        infoWindow.close()
      })

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




