let home = document.querySelector('.home')
let activate = document.querySelector('.activate')
let scan = document.querySelector('.scan')

home.addEventListener("click",(e)=>{
		window.location = "home.html"
})
activate.addEventListener("click",(e)=>{
	window.location = "activate.html"
})
scan.addEventListener("click",(e)=>{
	window.location = "scan.html"
})
