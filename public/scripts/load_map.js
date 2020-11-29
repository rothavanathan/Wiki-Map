//select #main-area
//clear main div of content
//load new map

$("#login-button").on('click', () => {
  $("#main-area")
    //clear main-area of child nodes
    .empty()
    //build form
    .append(`<form id="login-form" method="POST" action="api/users">`);


  $("#login-form").on('submit', function(event) {
    event.preventDefault();
    console.log(`form submitted`);
    const data = $(this).serialize();
    console.log(data);
    $.ajax({
      method: "GET",
      url: "/api/maps/drizzysmap",
      data
    }).then(res.rows => {
      res.rows.forEach(row => loadmarkers(row))
      })
  });
});

