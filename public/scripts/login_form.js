//select #main-area
//clear main div of content
//build/ display login form

$("#login-button").on('click', () => {
  console.log('login button clicked!');
  $("#main-area")
    //clear main-area of child nodes
    .empty()
    //build form
    .append(`<form id="login-form">`);

    //email input
  $("#login-form")
    .append(`<div class="form-group">`)
    .append(`<label for="exampleInputEmail1">Email address</label>`)
    .append(`<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">`)
    .append(`<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>`);

    //password input
  $("#login-form")
    .append(`<div class="form-group">`)
    .append(`<label for="exampleInputPassword1">Password</label>`)
    .append(` <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">`);

  //submit button
  $("#login-form")
    .append(`<button type="submit" class="btn btn-primary">Submit</button>`);



  // .append(
  //   `<form>
  //   <div class="form-group">
  //     <label for="exampleInputEmail1">Email address</label>
  //     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  //     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  //   </div>
  //   <div class="form-group">
  //     <label for="exampleInputPassword1">Password</label>
  //     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  //   </div>
  //   <div class="form-check">
  //     <input type="checkbox" class="form-check-input" id="exampleCheck1">
  //     <label class="form-check-label" for="exampleCheck1">Check me out</label>
  //   </div>
  //   <button type="submit" class="btn btn-primary">Submit</button>
  // </form>`
  // );

});
