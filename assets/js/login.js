let submit = document.querySelector(".submit")
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
		console.log('invalid email');
	}
})
