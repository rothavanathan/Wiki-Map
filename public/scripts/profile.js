//CURRENTLY NOT BEING USED might delete this

const loadProfile = (userInfo)=> {
  if (!userInfo) {
    return;
  }


  //shows logged in user profile
  $('.list-group').prepend(`<div class="avatar"><img src="${userInfo.avatar_url}"></div>
  <span class="handle text-center"><h2>${userInfo.handle}</h2></span>`);
  // $(`.logged-out-Tabs`).toggleClass('hide');


  //shows logged in menu items
  $('.list-group').append(`<a href="#" id="fave-map" class="list-group-item list-group-item-action bg-light profileTabs">MyFaves</a>
  <a href="#" class="list-group-item list-group-item-action bg-light profileTabs">MyContributed</a>
  <a href="#" id="create_new_map" class="list-group-item list-group-item-action bg-light profileTabs">Map Generator</a>`)



  //switch navbar items
  $('#navbarSupportedContent > ul').empty()
  $('#navbarSupportedContent > ul').append(` <li class="nav-item">
  <a class="nav-link profileTabs" href="#" id="logout-button">Logout</a>
</li>`)
  addMapGenListener();
  addLogoutListener();
  faveMapListener();
  return;
}

const removeProfile = () => {
  $('.avatar').remove();
  $('.handle').remove();


  $('.profileTabs').remove();

  // switch navbar items
  $('#navbarSupportedContent > ul').empty()

  //adding register and login
  $('#navbarSupportedContent > ul').append(`<li class="nav-item active logged-out-Tabs">
  <a class="nav-link " href="#" id="register-button">Register <span class="sr-only">(current)</span></a>
  </li>
  <li class="nav-item logged-out-Tabs">
    <a class="nav-link" href="#" id="login-button">Login</a>
  </li>`)

  addLoginListener();
  addRegisterListener();
  return
}
