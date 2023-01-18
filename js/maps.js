const mapsApiKey = config.MAPS_API_KEY;
const poznanCenter = { lat: 52.409538, lng: 16.931992 };
const locations = [
  ['Trzecia Kawa', 52.41440697640961, 16.8974837, 1],
  ['Święty', 52.41114538669486, 16.90294246931034, 2],
  ['Dram bar', 52.40944049319182, 16.93367042327585, 3],
  ['Posnania', 52.39661885963552, 16.955420684464972, 4],
  ['Piwna Stopa', 52.41030906182357, 16.936449399469165, 5],
  ['Stary Rynek', poznanCenter, 6]
];

function initMap() {

  let marker, i, map;
  let infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: poznanCenter,
    zoom: 13,
  });
  
  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}


function callMap(url) {
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}
