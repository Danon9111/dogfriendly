const mapsApiKey = config.MAPS_API_KEY;
let map;
const cityCenterCoordinates = { lat: 52.409538, lng: 16.931992 };

//builds and concatenate Google Maps API call
function callMap(url) {
  
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}

function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: cityCenterCoordinates,
    zoom: 15,
    mapTypeId: "roadmap"
  }); 

  new google.maps.Marker({
    position: cityCenterCoordinates,
    map,
    title: "Hello World!",
  });
  
  //hidding default points on map
  map.setOptions({ styles: styles["hide"] });

}

const styles = {
  hide: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};