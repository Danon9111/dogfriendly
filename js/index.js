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
  });

  const script = document.createElement("script");

  script.src =
    "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
  document.getElementsByTagName("head")[0].appendChild(script);

  
  
  //hidding default points on map
  map.setOptions({ styles: styles["hide"] });

}

const eqfeed_callback = function (results) {
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    new google.maps.Marker({
      position: latLng,
      map,
    });
  }
};

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