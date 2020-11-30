//select #main-area
//clear main div of content
//build/ display login form

$("#login-button").on('click', () => {
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

  $("#login-form").on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data
    }).then(res => {
      console.log(`user is logged in`)
    }).catch(err => {
      //failed login have a pop up that asks user to try again
      console.log(`error at end of ajax login post request`, err)
      $("#login-form")
    .append(`<div class="form-group">whoops! login failed, try again</div>`);
    })
  });
});

