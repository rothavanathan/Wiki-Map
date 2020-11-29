$("#create_map").on('click', () => {
  $("#main-area")
    //clear main-area of child nodes
    .empty()
    //build form
    .append(`<!--Grid row-->
    <div class="row">

      <!--Grid column-->
      <div class="col-md-6 mb-4">

        <!--Card-->
        <div class="card card-cascade narrower">

          <!--Card image-->
          <div class="view view-cascade gradient-card-header blue-gradient">
            <h5 class="mb-0">Regular map</h5>
          </div>
          <!--/Card image-->

          <!--Card content-->
          <div class="card-body card-body-cascade text-center">

            <!--Google map-->
            <div id="map-container-google-8" class="z-depth-1-half map-container-5" style="height: 300px">
              <iframe src="https://maps.google.com/maps?q=Barcelona&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>

          </div>
          <!--/.Card content-->

        </div>
        <!--/.Card-->

      </div>
      <!--Grid column-->

      <!--Grid column-->
      <div class="col-md-6 mb-4">

        <!--Card-->
        <div class="card card-cascade narrower">

          <!--Card image-->
          <div class="view view-cascade gradient-card-header peach-gradient">
            <h5 class="mb-0">Custom map</h5>
          </div>
          <!--/Card image-->

          <!--Card content-->
          <div class="card-body card-body-cascade text-center">

            <!--Google map-->
            <div id="map-container-google-9" class="z-depth-1-half map-container-5" style="height: 300px">
              <iframe src="https://maps.google.com/maps?q=Madryt&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
                style="border:0" allowfullscreen></iframe>
            </div>


          </div>
          <!--/.Card content-->

        </div>
        <!--/.Card-->

      </div>
      <!--Grid column-->

    </div>
    <!--Grid row-->`);


  //   //email input
  // $("#login-form")
  //   .append(`<div class="form-group">`)
  //   .append(`<label for="email-input">Email address</label>`)
  //   .append(`<input name="email" type="email" class="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Enter email">`)
  //   .append(`<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>`);

  //   //password input
  // $("#login-form")
  //   .append(`<div class="form-group">`)
  //   .append(`<label for="login-password">Password</label>`)
  //   .append(` <input name="password" type="password" class="form-control" id="login-password" placeholder="Password">`);

  // //submit button
  // $("#login-form")
  //   .append(`<button type="submit" class="btn btn-primary">Submit</button>`);

  // $("#login-form").on('submit', function(event) {
  //   event.preventDefault();
  //   console.log(`form submitted`);
  //   const data = $(this).serialize();
  //   console.log(data);
  //   $.ajax({
  //     method: "POST",
  //     url: "/api/users/login",
  //     data
  //   }).then(res => {
  //     console.log(res)
  //     })
  // });
});
