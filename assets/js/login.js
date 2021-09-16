let submit = document.querySelector(".submit")
let mail_checker = ()=>{
		let uname = document.querySelector(".username").value
		let password = document.querySelector(".password").value
		if (uname === '' || password === '') return
		
}
submit.addEventListener('click',(e)=>{
	e.preventDefault();
	mail_checker();
})
