const loadProfile = (user)=> {
  $('sidebar-wrapper')
    .prepend('<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>')
}
$(document).ready(() => {
  loadProfile();
  });
