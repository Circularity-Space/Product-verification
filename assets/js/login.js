let submit = document.querySelector(".submit")
let _details_error = document.querySelector("._details_error")

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let check_input = ()=>{
		let email = document.querySelector(".username").value
		let password = document.querySelector(".password").value
		if (email === '' || password === '') return
		return validateEmail(email)
}

submit.addEventListener('click',(e)=>{
	e.preventDefault();
	if (check_input()) {
				console.log("success");
	}else{
  _details_error.innerHTML = "Invalid Email"
  _details_error.setAttribute("style","visibility:visible");
  setTimeout((e)=>{
   _details_error.setAttribute("style","visibility:hidden");
  },3000)
		console.log('invalid email');
	}
})
