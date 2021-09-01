let storeHub = localStorage
storeHub.setItem("_user_info",JSON.stringify({
		"_g":null,
		"_age":null,
		"_pref":null
}))

let _curren_view = 1
let _target = ""

let _collector_more_details = document.querySelector("._collector_more_details")
let _info_label = document.querySelector("._info_label")
let _all_next = document.querySelectorAll("._next")
let _boolean = document.querySelectorAll("._boolean p")
let _images_wrapper = document.querySelectorAll("._images_wrapper img")
let _age = document.querySelector("._age input")

let _all_children = _collector_more_details.children

_age.addEventListener("change",(e)=>{
					let _updated = JSON.parse(storeHub.getItem("_user_info"))
					_updated['_age'] = e.target.value
					storeHub.setItem("_user_info",JSON.stringify(_updated))
})

_boolean[0].addEventListener("click",(e)=>{
				e.target.parentNode.setAttribute("gender","male")
})

_boolean[1].addEventListener("click",(e)=>{
				e.target.parentNode.setAttribute("gender","female")
})

_info_label.addEventListener("click",(e)=>{
		_collector_more_details.classList.add("_show")
	_all_children[0].classList.add('_show')
	})

_all_next[0].addEventListener("click",(e)=>{
					let gender = e.target.parentNode.querySelector("._boolean").getAttribute("gender")
					if (gender) {
						let _updated = JSON.parse(storeHub.getItem("_user_info"))
						console.log(_updated);
						_updated['_g'] = gender

						storeHub.setItem("_user_info",JSON.stringify(_updated))
									if (_curren_view==0){
										_all_children[_curren_view].setAttribute("style","display:none")
											_curren_view+=1
									return
								}
								_all_children[_curren_view-1].setAttribute("style","display:block")
								_all_children[_curren_view-1].setAttribute("style","display:none")
								_all_children[_curren_view].setAttribute("style","display:none")
									_all_children[_curren_view].setAttribute("style","display:block")
									_curren_view+=1
					}
					return
})
_all_next[1].addEventListener("click",(e)=>{
			let diet = e.target.parentNode.querySelector("._images_wrapper").getAttribute("diet")
			if (diet) {
			let _updated = JSON.parse(storeHub.getItem("_user_info"))
			_updated['_pref'] = diet
			storeHub.setItem("_user_info",JSON.stringify(_updated))

				if (_curren_view==0){
					_all_children[_curren_view].setAttribute("style","display:none")
					_all_children[_curren_view].setAttribute("style","display:block")
					_curren_view+=1
					return
				}
				_all_children[_curren_view-1].setAttribute("style","display:block")
				_all_children[_curren_view-1].setAttribute("style","display:none")
				_all_children[_curren_view].setAttribute("style","display:none")
				_all_children[_curren_view].setAttribute("style","display:block")
				_curren_view+=1
			}
			return
})

_all_next[2].addEventListener("click",(e)=>{
	let parsed = JSON.parse(localStorage.getItem("_user_info"))

	let req = fetch(_target,{
		"method":"POST",
		headers:{
				"Content-Type":"application/json",
		},
		body:{
								"_g":(parsed['_g'])?parsed['_g']:"male",
								"age":(parsed['_age'])?parsed['_age']:10,
								"_pref":(parsed['_pref'])?parsed['_pref']:10,
						}
	})
	console.log("sending backend request");
})

_images_wrapper.forEach((item, i) => {
			_images_wrapper[i].addEventListener("click",(e)=>{
				let _tick = document.createElement("div")
				_tick.classList.add("_tick")

				let first = document.createElement("div")
				first.classList.add("first")
				_tick.appendChild(first)

				let second = document.createElement("div")
				second.classList.add("second")
				_tick.appendChild(second)
				// e.target.parentNode.appendChild(_tick)

				console.log(	e.target.parentNode.parentNode);

				e.target.parentNode.parentNode.setAttribute("diet",e.target.getAttribute("diet"))
			})
});
