mapboxgl.accessToken = 'pk.eyJ1IjoiYmluZ2dhbWVsIiwiYSI6ImNsODM3bmQ2bzAzMGczbm81aGFmaTRuc3EifQ.imEYXx5UcC79Np5M1TaVEQ';

const start = {
    center: [126.97617, 37.58409],
    zoom: 15,
    pitch: 0,
    bearing: 0
};

const end = {
    // center: [74.5, 40],
    // zoom: 2
    center: [126.977346, 37.584648],
    zoom: 17,
    bearing: -32.5,
    pitch: 51
};



// marker
const geojson = {
    type: "FeatureCollection",
    features: [
      //첫번째 장소
      {
        type: "Feature",
        geometry: {
          type: "Point",
            coordinates: [126.9748917, 37.5865747] //마커를 위치시킬 위도 경도값
            
        },
        properties: {
          title: "청와대 본관",
          description: "본관입니다. 본관에서 하는 일을 수행합니다."
        }
      },
      //두번째 장소
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [126.9739104, 37.5847538] //마커를 위치시킬 위도 경도값
        },
        properties: {
          title: "청와대 영빈관",
          description: "영빈관입니다. 영빈관에서 할 수 있는 일을 합니다."
        }
      }
    ]
};
      

const map = new mapboxgl.Map({
style: 'mapbox://styles/binggamel/cl9rwz30i000614o5krh77r6a',
center: [126.9772,37.5840],
// zoom: 15.5,
// pitch: 45,
// bearing: -17.6,
container: 'mapContainer',
    antialias: true,
    // projection: 'globe',
    ...start
});
 
map.on('load', () => {
    map.resize();

});

let isAtStart = true;
window.addEventListener('DOMContentLoaded', () => {
    console.log("addEventListener");
    // depending on whether we're currently at point a or b,
    // aim for point a or b
    const target = isAtStart ? end : start;
    isAtStart = !isAtStart;
     
    map.flyTo({
        ...target, // Fly to the selected target
        duration: 5000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
    });

});

// add markers to map
for (const { geometry, properties } of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement("div");
    el.className = "marker";
  
    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(el)
      .setLngLat(geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 35 }) // add popups
          .setHTML(`<h3>${properties.title}</h3><p>${properties.description}</p>`)
      )
      .addTo(map);
  }