var service;
var infowindow;
let positionMaps;
let googleMaps;
let mapGoogleOut = document.getElementById('googlemaps');
let optionFood;

//evento para buscar los tipos de comida
selectFood.addEventListener("change", function() {
  photoPlace.innerHTML = '';
  optionFood =selectFood.value;
  mapsLocation(positionMaps);
});

function mapsLocation(posicion) {
  positionMaps = posicion
  //Obtenermos las coordemadas
  let maplatitud =  -12.1167 /* posicion.coords.latitude */;
  let maplongitude = -77.0333/*  posicion.coords.longitude */;

  let googleLatLon = new google.maps.LatLng(maplatitud, maplongitude); 
  let objConfig = {
    zoom: 17,
    //center de aacuerdo una geolocalizacion
    center: googleLatLon
  }

   googleMaps = new google.maps.Map(mapGoogleOut, objConfig);

 

  let objConfigMarker = {
    //son objetos de google de acuerdo a las coordenadas 
    position: googleLatLon, /* place.geometry.location */
    map: googleMaps,
  }
  let request = {
    location: googleLatLon,
    radius: '500', /* range */
    type: ['restaurant'],
    keyword: optionFood, 
  }
  let googleMarker = new google.maps.Marker(objConfigMarker)

  //Ubica en el mapa los lugares de la busqueda por lugar 
  service = new google.maps.places.PlacesService(googleMaps);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        /* var place = results[i]; */
       
       createPhotoMarker(results[i]); 
        createMarker(results[i]);
      }
    }
  }
}

function createMarker(place) {
  infowindow = new google.maps.InfoWindow();
   let googleMarker = new google.maps.Marker({
    icon: "img/food.png",
    map: googleMaps,
    position: place.geometry.location
  });
  google.maps.event.addListener(googleMarker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(googleMaps, this);
  });
}


function error() {
  mapGoogleOut.innerHTML = "<p> No se puede ontener</p>";

}
//ubicacion actual del usuario
navigator.geolocation.getCurrentPosition(mapsLocation, error);


function createPhotoMarker(place) {
 var photos = place.photos;
  if (!photos) {
    return;
  } 
  let photoplace = photos[0].getUrl({ 'maxWidth': 160, 'maxHeight': 160 })
  photoPlace.innerHTML += ` <div class="photoRestaurant"> 
  <img  class="photoRestaurant" src="${photoplace}">  
  <p>${place.name}</p>
  </div>`;
}

