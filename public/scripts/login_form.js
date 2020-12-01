//select #main-area
//clear main div of content
//build/ display login form
const displayLoginForm = () => {
  $("#main-area")
    //clear main-area of child nodes
    .empty()
    //build form
    .append(`<form id="login-form" method="POST" action="api/users">`);

    //email input
  $("#login-form")
    .append(`<div class="form-group">`)
    .append(`<label for="email-input">Email address</label>`)
    .append(`<input name="email" type="email" class="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Enter email">`)
    .append(`<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>`);

    //password input
  $("#login-form")
    .append(`<div class="form-group">`)
    .append(`<label for="login-password">Password</label>`)
    .append(` <input name="password" type="password" class="form-control" id="login-password" placeholder="Password">`);

  //submit button
  $("#login-form")
    .append(`<button type="submit" class="btn btn-primary">Submit</button>`);


  //login form submission
  $("#login-form").on('submit', function(event) {

    event.preventDefault();
    //hide previous alerts
    if ($('.alert')) {
      $('.alert').hide()
    }

    //convert form data and send post request
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data
    })
      //successful login attempt
      .then(user => {
        console.log(user)
        console.log(`user is logged in`)
        clearMainArea();
        showPublicMaps();
      })

      //failed post or login attempt
      .catch(err => {
        $("#login-form")
          .append(`<div class="alert form-group ">whoops! login failed, try again</div>`);
      })
  });
}


$("#login-button").on('click', () => {
  displayLoginForm();

  // $("#login-form").on('input', () => {
  //   if ($('.alert')
  // }


});

module.exports = displayLoginForm;
