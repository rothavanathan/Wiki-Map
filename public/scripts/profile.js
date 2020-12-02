//CURRENTLY NOT BEING USED might delete this

const loadProfile = (user) => {
  // $('.sidebar-heading')
  // .append('<div class="avatar"><img src="https://www.flaticon.com/svg/static/icons/svg/147/147144.svg"></div>')
  console.log(`in loadprofile. user is: `, user);

  //load avatar
  $('.avatar').empty()
  .append(`<img src=${user.avatar_url}>`);

  //load handle
  $('.handle').empty()
  .append(`<h2>${user.handle}></h2>`);

  return
  // $('.profileTabs').show();
}
// .prepend('<div><img class="https://www.flaticon.com/svg/static/icons/svg/147/147144.svg"></div>')
// }

// $(document).ready(() => {
//   $('.profileTabs').hide();
//   loadProfile();
// });
