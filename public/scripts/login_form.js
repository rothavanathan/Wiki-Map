//select #main-area
//clear main div of content

//handles Login Form submission and returns user information, map_permissions, and map info
const createLoginSubmitListener = () => {
  //login form submission
  $("#login-form").on('submit', function(event) {

    event.preventDefault();
    //hide previous alerts
    if ($('.alert')) {
      $('.alert').hide();
    }

    //convert form data and send post request
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data
    })
    //successful login attempt
      .then(res => {
        loadProfile(res.userInfo[0]);
        clearMainArea();
        showPublicMaps();

      })

    //failed post or login attempt
      .catch(err => {
        $("#login-form")
          .append(`<div class="alert alert-danger mt-4" role="alert">whoops! login failed, try again</div>`);
        $("#login-form").delegate('input', 'focus', ()=> {
          $('.alert').hide();
        });
      });
  });
};

//build/ display login form
const displayLoginForm = () => {

  //build form
  $("#main-area")
    .append(`<form id="login-form" method="POST" action="api/users">`);

  //email input
  $("#login-form")
    .append(`<div class="form-group">`)
    .append(`<label for="email-input">Email address</label>`)
    .append(`<input name="email" type="email" class="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Enter email" required>`)
    .append(`<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>`);

  //password input
  $("#login-form")
    .append(`<div class="form-group">`)
    .append(`<label for="login-password">Password</label>`)
    .append(` <input name="password" type="password" class="form-control" id="login-password" placeholder="Password" required>`);

  //submit button
  $("#login-form")
    .append(`<button type="submit" class="btn btn-secondary mt-4">Submit</button>`);

  createLoginSubmitListener();
};

const createRegistrationSubmitListener = () => {
  //login form submission
  $("#register-form").on('submit', function(event) {

    event.preventDefault();
    //hide previous alerts
    if ($('.alert')) {
      $('.alert').hide();
    }

    //convert form data and send post request
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/users/",
      data
    })
    //successful registration attempt
      .then(user => {
        loadProfile(user);
        clearMainArea();
        showPublicMaps();

      })

    //failed registration attempt
      .catch(err => {
        $("#register-form")
          .append(`<div class="alert alert-danger mt-4" role="alert">whoops! registration failed, try again</div>`);
        $("#register-form").delegate('input', 'focus', ()=> {
          $('.alert').hide();
        });
      });
  });
};

//build/ display registration form
const displayRegistrationForm = () => {

  //build form
  $("#main-area")
    .append(`<form id="register-form" method="POST" action="api/users">`);

  //handle input
  $("#register-form")
    .append(`<div class="form-group">`)
    .append(`<label for="handle-input">Pick your handle</label>`)
    .append(`<input name="handle" class="form-control" id="handle-input" placeholder="Enter handle" required>`);

  //email input
  $("#register-form")
    .append(`<div class="form-group">`)
    .append(`<label for="email-input">Email address</label>`)
    .append(`<input name="email" type="email" class="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Enter email" required>`)
    .append(`<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>`);

  //password input
  $("#register-form")
    .append(`<div class="form-group">`)
    .append(`<label for="register-password">Password</label>`)
    .append(` <input name="password" type="password" class="form-control" id="register-password" placeholder="Password" required>`);

  //avatar input
  $("#register-form")
    .append(`<div class="form-group">`)
    .append(`<label for="avatar">Avatar</label>`)
    .append(` <input name="avatar" class="form-control" id="avatar" placeholder="Image URL">`);

  //submit button
  $("#register-form")
    .append(`<button type="submit" class="btn btn-secondary mt-4">Submit</button>`);

  createRegistrationSubmitListener();
};

// LISTENERS FOR NAV BUTTONS
const addLoginListener = () => {
  $("#login-button").on('click', () => {
    clearMainArea();
    displayLoginForm();
  });
};

const addLogoutListener = () => {
  $("#logout-button").on('click', () => {
    $.ajax({
      method: "GET",
      url: "/api/users/logout",
    })
      //succesful logout
      .then(res => {

        clearMainArea();
        showPublicMaps();
        removeProfile();
      });
  });
};

const addRegisterListener = () => {
  $("#register-button").on('click', () => {
    clearMainArea();
    displayRegistrationForm();
  });
};
