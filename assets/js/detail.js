let close_map = document.querySelector(".close_map")
let map_container = document.querySelector(".product_map")
let _open_map = document.querySelector("._open_map")
let back_icon = document.querySelector(".back_icon")
let like = document.querySelector(".like")

close_map.addEventListener('click',(e)=>{
		map_container.classList.remove('slide_in_class')
		map_container.classList.add('slide_out_class')
})
_open_map.addEventListener('click',(e)=>{
	map_container.classList.add('slide_in_class')
	map_container.classList.remove('slide_out_class')
})

back_icon.addEventListener('click',(e)=>{window.history.back()})
like.addEventListener('click',(e)=>{alert('liked');})
// Initialize and add the map
function initMap() {
		// The location of Uluru
		const uluru = { lat: -2, lng: 38};
		// The map, centered at Uluru
		const map = new google.maps.Map(document.querySelector("._real_map"), {
				zoom: 10,
				center: uluru,
		});
		// The marker, positioned at Uluru
		const marker = new google.maps.Marker({
				position: uluru,
				map: map,
		});
}
