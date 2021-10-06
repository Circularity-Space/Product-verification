let _collector_more_details = document.querySelector('._collector_more_details')
let mobi = document.querySelector('.mobi')
let login = document.querySelector('.login')
let _google_auth = document.querySelector('._google_auth')
let _facebook_auth = document.querySelector('._facebook_auth')
let _all_next = document.querySelectorAll('._next')
let _boolean = document.querySelectorAll('._boolean p')
let _images_wrapper = document.querySelectorAll('._images_wrapper img')
let _age = document.querySelector('._age input')
let fetch_btn = document.querySelector('.fetch_btn')

let _all_children = _collector_more_details.children
let _curren_view = 1
let _target = ''

let userProfile = (function () {
  let storeHub = localStorage
  let _user_info = storeHub.getItem('userProfile')
    ? JSON.parse(storeHub.getItem('userProfile'))
    : { pref: [] }
  storeHub.setItem('userProfile', JSON.stringify({ pref: [] }))

  let saveData = () => {
    storeHub.setItem('userProfile', JSON.stringify(_user_info))
  }

  let obj = {}
  obj.update_userinfo = (info) => {
    for (var item in _user_info) {
      if (String(item) == String(Object.keys(info)[0])) {
        if (item == 'pref') {
          console.log('here we come.', _user_info[item])
          _user_info[item].push(info[item])
          _user_info[item] = [...new Set(_user_info[item])]
          saveData()
          return
        }
        _user_info[item] = info[item]
        saveData()
        return
      }
    }
    let key = Object.keys(info)[0]
    _user_info[key] = info[key]
    saveData()
  }
  obj.get_userinfo = () => {
    return _user_info
  }
  obj.get_field = (field) => {
    return _user_info[field]
  }
  obj.clearData = () => {
    _user_info = { pref: [] }
    saveData()
  }
  return obj
})()

_age.addEventListener('change', (e) => {
  userProfile.update_userinfo({ age: e.target.value })
})

mobi.addEventListener('click', (e) => {
  _collector_more_details.classList.add('_show')
  _all_children[0].classList.add('_show')
})

_images_wrapper.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    let _tick = document.createElement('div')
    _tick.classList.add('_tick')

    let first = document.createElement('div')
    first.classList.add('first')
    _tick.appendChild(first)

    let second = document.createElement('div')
    second.classList.add('second')
    _tick.appendChild(second)
    // e.target.parentNode.appendChild(_tick)

    console.log(e.target.parentNode.parentNode)
    userProfile.update_userinfo({ pref: e.target.getAttribute('diet') })
    e.target.parentNode.parentNode.setAttribute(
      'diet',
      e.target.getAttribute('diet')
    )
  })
})

/* _google_auth.addEventListener('click',(e)=>{
		console.log("authenticating via google");
}) */
_facebook_auth.addEventListener('click', (e) => {
  console.log('authenticating via facebook')
})
login.addEventListener('click', (e) => {
  window.location = 'login.html'
})

let checkDataValid = (info) => {
  return info !== '' ? true : false
}

_all_next[0].addEventListener('click', (e) => {
  let uname = e.target.parentNode.querySelectorAll('input')

  if (checkDataValid(uname[0].value) && checkDataValid(uname[1].value)) {
    console.log('valid')
    let _updated = { fname: uname[0].value }
    userProfile.update_userinfo({ fname: uname[0].value })
    userProfile.update_userinfo({ lname: uname[1].value })
    if (_curren_view == 0) {
      _all_children[_curren_view].setAttribute('style', 'display:none')
      _curren_view += 1
      return
    }
    _all_children[_curren_view - 1].setAttribute('style', 'display:block')
    _all_children[_curren_view - 1].setAttribute('style', 'display:none')
    _all_children[_curren_view].setAttribute('style', 'display:none')
    _all_children[_curren_view].setAttribute('style', 'display:block')
    _curren_view += 1
  }
  return
})
_boolean[0].addEventListener('click', (e) => {
  userProfile.update_userinfo({ gender: 'm' })
})
_boolean[1].addEventListener('click', (e) => {
  userProfile.update_userinfo({ gender: 'f' })
})
let checkIfFilled = (info) => {
  if (
    userProfile.get_field(info) !== '' &&
    userProfile.get_field(info) != undefined
  ) {
    return true
  }
  return false
}
_all_next[1].addEventListener('click', (e) => {
  let bool = checkIfFilled('gender')
  if (bool) {
    if (_curren_view == 0) {
      _all_children[_curren_view].setAttribute('style', 'display:none')
      _all_children[_curren_view].setAttribute('style', 'display:block')
      _curren_view += 1
      return
    }
    _all_children[_curren_view - 1].setAttribute('style', 'display:block')
    _all_children[_curren_view - 1].setAttribute('style', 'display:none')
    _all_children[_curren_view].setAttribute('style', 'display:none')
    _all_children[_curren_view].setAttribute('style', 'display:block')
    _curren_view += 1
  }
  return
})

_all_next[2].addEventListener('click', (e) => {
  let age = e.target.parentNode.querySelector('input').value
  if (
    age !== undefined &&
    age !== '' &&
    checkIfFilled('age') !== '' &&
    checkIfFilled('age') !== undefined
  ) {
    if (_curren_view == 0) {
      _all_children[_curren_view].setAttribute('style', 'display:none')
      _all_children[_curren_view].setAttribute('style', 'display:block')
      _curren_view += 1
      return
    }
    _all_children[_curren_view - 1].setAttribute('style', 'display:block')
    _all_children[_curren_view - 1].setAttribute('style', 'display:none')
    _all_children[_curren_view].setAttribute('style', 'display:none')
    _all_children[_curren_view].setAttribute('style', 'display:block')
    _curren_view += 1
  }
  return
})
_all_next[3].addEventListener('click', (e) => {
  let pass = e.target.parentNode.querySelectorAll('input')
  if (pass[0].value === pass[1].value && pass[0].value !== '') {
    userProfile.update_userinfo({ password: pass[0].value })
    if (_curren_view == 0) {
      _all_children[_curren_view].setAttribute('style', 'display:none')
      _all_children[_curren_view].setAttribute('style', 'display:block')
      _curren_view += 1
      return
    }
    _all_children[_curren_view - 1].setAttribute('style', 'display:block')
    _all_children[_curren_view - 1].setAttribute('style', 'display:none')
    _all_children[_curren_view].setAttribute('style', 'display:none')
    _all_children[_curren_view].setAttribute('style', 'display:block')
    _curren_view += 1
  }
  return
})

_all_next[4].addEventListener('click', (e) => {
  userProfile.clearData()
  console.log('sending data')
  return
})

fetch_btn.addEventListener('click', (e) => {
  console.log('Hello floaters')
})
let fetch_more = () => {}
