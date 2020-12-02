//CURRENTLY NOT BEING USED might delete this

const loadProfile = (user) => {
  // $('.sidebar-heading')
  // .append('<div class="avatar"><img src="https://www.flaticon.com/svg/static/icons/svg/147/147144.svg"></div>')

  $('.avatar')
  .append(`<img src=${user.avatar_url}>`)
  return;
  // $('.profileTabs').show();
}
// .prepend('<div><img class="https://www.flaticon.com/svg/static/icons/svg/147/147144.svg"></div>')
// }

// $(document).ready(() => {
//   $('.profileTabs').hide();
//   loadProfile();
// });
