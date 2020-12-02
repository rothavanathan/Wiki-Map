//CURRENTLY NOT BEING USED might delete this

const loadProfile = (userInfo)=> {
  if (!userInfo) {
    return;
  }
  console.log(`in loadProfile. user info is: `, userInfo)
  $('.list-group').prepend(`<div class="avatar"><img src="${userInfo.avatar_url}"></div>
  <span class="handle text-center"><h2>${userInfo.handle}</h2></span>`);

  $(`.profileTabs`).show()
  return;
}

const removeProfile = () => {

  $(`.profileTabs`).hide()
  return
}
