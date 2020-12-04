//build map article for map
const makeMapCard = (map, list) => {
  $(`#${list}`).append(`
  <article class="mapPost" id="${map.id}"  style="width: 18rem;">
    <div class="card h-100" >
    <img class="card-img-top" src="${map.thumbnail_photo_url}" alt="${map.thumbnail_alt_text}">
      <div class="card-body">
          <i class="${map.permissions.isfavorite ? 'fas' : 'far'} fa-heart ${map.permissions.isfavorite ? 'favorite' : ''}"></i>
        <h5 class="card-title text-center">${map.title}</h5>
        <span><h5 class="card-title text-center">${map.owner_handle}</h5></span>
        <p class="card-text">${map.description}</p>
      </div>
    </div>
  </article>`);
  faveButtonListener(map);
};

const faveButtonListener = (map) => {
  $(`#${map.id} i`).on('click', () => {

    const data = map;
    if (map.permissions.isfavorite) {
      data.permissions.isfavorite = false;
      $(`#${map.id} i`).removeClass(`fas`).addClass(`far`);
    } else {
      data.permissions.isfavorite = true;
      $(`#${map.id} i`).removeClass(`far`).addClass(`fas`);
    }
    $.ajax({
      data,
      url: `/api/maps/permissions/update`,
      method: 'POST'
    }).then(data => {
      console.log(`isFavorite changed`, data.data.rows[0].map_id, data.data.rows[0].isfavorite)
    }).catch(err => console.log(err))
  })

}

//gets list of all maps and appends #public-map-list in main area
const showPublicMaps = () => {
  $.ajax({
    url: "/api/maps/public",
    dataType: 'json'
  }).then(data => {
    console.log(data)
    const maps = data.publicMaps;
    //populate main area with a title and ul
    $('#main-area').append(`<h1 class="mt-4 text-center">Public Maps</h1>
    <ul class="d-flex flex-row justify-content-around flex-wrap" id="public-map-list">`);
    //populate ul with articles of all public maps
    maps.map(function(map){
      (makeMapCard(map, 'public-map-list'));
      //event listener to load map
      $(`#${map.id} img`).on('click', (e) => {
        loadMap(map)
      });

      $(`#${map.id} i`).on('click', () => {
        //toggle isFavorite in UI and in database
        $(`#${map.id} i`).toggleClass('favorite')
      })

    })
  })
};

//listener for menu item
const publicMapListener = () => {
  $('#public-map').on('click', ()=> {
    clearMainArea();
    showPublicMaps();
  });
}

//gets list of all maps and appends #fave-map-list in main area
const showFaveMaps = () => {
  $.ajax({
    url: "/api/maps/fave",
    dataType: 'json'
  }).then(data => {

    console.log(data)
    const maps = data.faveMaps;
    //populate main area with a title and ul
    $('#main-area').append(`<h1 class="mt-4 text-center">Fave Maps</h1>
    <ul class="d-flex flex-row justify-content-around flex-wrap" id="fave-map-list">`);
    //populate ul with articles of all public maps
    maps.map(function(map){
      makeMapCard(map, 'fave-map-list')
      //event listener to load map
      $(`#${map.id} img`).on('click', (e) => {
        loadMap(map)
      });
    })
  })
};

//listener for menu item
const faveMapListener = () =>  {
  $('#fave-map').on('click', ()=> {
    clearMainArea();
    showFaveMaps();
  });
}

//ajax request and grab all maps that current user owns or is authenticated on
const showMyMaps = () => {
  $.ajax({
    url: "/api/maps/contributed",
    dataType: 'json'
  }).then(data => {

    console.log(data)
    const maps = data.uniqueMaps;
    //populate main area with a title and ul
    $('#main-area').append(`<h1 class="mt-4 text-center">My Maps</h1>
    <ul class="d-flex flex-row justify-content-around flex-wrap" id="my-map-list">`);
    //populate ul with articles of all public maps
    maps.map(function(map){
      makeMapCard(map, 'my-map-list')
      //event listener to load map
      $(`#${map.id} img`).on('click', (e) => {
        loadMap(map)
      });
    })
  })

}

//listener for menu item
const myMapsListener = () =>  {
  $('#contributions-map').on('click', ()=> {
    console.log(`clicked the my contribution button`)
    clearMainArea()
    showMyMaps();
  });
}

const addMapGenListener = () => {
  $("#create_new_map").on('click', () => {
    showMapDetailForm()
    $("#generate_map").on('click', () => {
      displayNewMap();
  })
  })
}

