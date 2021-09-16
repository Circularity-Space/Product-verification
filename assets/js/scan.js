const supported = 'mediaDevices' in navigator
let video = document.querySelector("video")
let snap = document.querySelector(".torch_trigger")
let canvas = document.getElementById("canvas")

let context = canvas.getContext('2d')
console.log(canvas);
if (supported) {
		navigator.mediaDevices.getUserMedia({'video':true}).then((stream)=>{
				console.log(stream);
				video.srcObject = stream
		})
}

snap.addEventListener('click',(e)=>{
		console.log("Hello");
		context.drawImage(video, 0, 0, 640, 480);
})
