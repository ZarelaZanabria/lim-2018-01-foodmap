var service;
var infowindow;

let mapGoogleOut = document.getElementById('googlemaps');
let optionFood = document.getElementById('select-food');

//evento para buscar los tipos de comida
optionFood.addEventListener('change', event = () => {
  alert('Seleccionastes');
});

//Creamos una funcion en donde ubicaion la latitud y longitud 
//funcion que muestra el mapa
function mapsLocation(posicion) {
  //Obtenermos las coordemadas
  let maplatitud =  -12.1167 /* posicion.coords.latitude */;
  let maplongitude = -77.0333/*  posicion.coords.longitude */;

  var googleLatLon = new google.maps.LatLng(maplatitud, maplongitude);

  var objConfig = {
    zoom: 17,
    //center de aacuerdo una geolocalizacion
    center: googleLatLon
  }

  let googleMaps = new google.maps.Map(mapGoogleOut, objConfig);

  let objConfigMarker = {
    //son objetos de google de acuerdo a las coordenadas 
    position: googleLatLon, /* place.geometry.location */
    map: googleMaps,
  }
  let request = {
    location: googleLatLon,
    radius: '500', /* range */
    type: ['restaurant']
  }
  let googleMarker = new google.maps.Marker(objConfigMarker)



  //Ubica en el mapa los lugares de la busqueda por lugar 
  service = new google.maps.places.PlacesService(googleMaps);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        /* var place = results[i]; */
        console.log(results[i])
       createPhotoMarker(results[i]); 
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    infowindow = new google.maps.InfoWindow();
    /*  let placeLocation = place.geometry.location; */
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

  let photoplace = photos[0].getUrl({ 'maxWidth': 180, 'maxHeight': 180 })
  photoPlace.innerHTML += ` <div> 
  <img src="${photoplace}">  
  <p>${place.name}</p>
  </div>`;
}

