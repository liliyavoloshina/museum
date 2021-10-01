import 'mapbox-gl/dist/mapbox-gl.css'

import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibGlsaXlhYnJlYWsiLCJhIjoiY2t1N3l0YmI0MXhvbzJvbzZ3cnI3bzFmdCJ9.S9pGmLDfnV6MZuNrSjnChA'
const map = new mapboxgl.Map({
  container: 'mapboxContainer',
  style: 'mapbox://styles/liliyabreak/cku80418l51qn19rzk8oejc39',
  center: [2.3363, 48.86095],
  // center: [2.3364, 48.86091],
  zoom: 15.79
})

map.addControl(new mapboxgl.NavigationControl())

const marker = new mapboxgl.Marker({
  color: 'black',
  scale: 0.9
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map)

const marker2 = new mapboxgl.Marker({
  color: 'grey',
  scale: 0.9
})
  .setLngLat([2.3333, 48.8602])
  .addTo(map)

const marker3 = new mapboxgl.Marker({
  color: 'grey',
  scale: 0.9
})
  .setLngLat([2.3397, 48.8607])
  .addTo(map)

const marker4 = new mapboxgl.Marker({
  color: 'grey',
  scale: 0.9
})
  .setLngLat([2.333, 48.8619])
  .addTo(map)

const marker5 = new mapboxgl.Marker({
  color: 'grey',
  scale: 0.9
})
  .setLngLat([2.3365, 48.8625])
  .addTo(map)

if (window.matchMedia('(max-width: 1024px)').matches) {
  map.jumpTo({ center: [2.337971132212658, 48.861654049081125], zoom: 15.8 })
}

if (window.matchMedia('(max-width: 768px)').matches) {
  map.jumpTo({ center: [2.3377, 48.8615], zoom: 15.8 })
}

if (window.matchMedia('(max-width: 420px)').matches) {
  map.jumpTo({ center: [2.336291017475844, 48.86089689766189], zoom: 15.986528579763117 })
}

// map.on('click', () => {
//   const center = map.getCenter()
//   const zoom = map.getZoom()
//   console.log(center, zoom)
// })