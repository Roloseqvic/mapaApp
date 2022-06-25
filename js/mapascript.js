//definir la variable global
var map;
var estado = false;
var marcador;

//mostrar el mapa
cargarMapa([9.880387, -83.923898]);

//funcion cargarmapa
function cargarMapa(coord) {
    map = L.map('mapa').setView(coord, 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    //cargar el mapa overlay
    var imageUrl = '../img/Mapa-nombres.png';
    var altText = 'Mapa Colegio Vocacional de Artes y Oficios de Cartago.';
    var latLngBounds = L.latLngBounds([
        [9.88200, -83.926000],
        [9.879047, -83.922000]
    ]);
    /*var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 1,
        alt: altText,
        interactive: true
    }).addTo(map);*/


    //asignar el evento manejador de locationfound al mapa
    map.on('locationfound', onLocationFound);

    //iniciar recorrido
    recorrido();
}


//funcion manejadora del evento locationfound
function onLocationFound(e) {
    if (estado == false) {
        marcador = L.marker(e.latlng).addTo(map);
        estado = true;
        //alert("false");
    } else {
        // alert("true");
        map.removeLayer(marcador);
        marcador = L.marker(e.latlng).addTo(map);
    }
}


function recorrido() {
    //invocamos el metodo locate para definir el view en la 
    //ubicación del gps
    map.locate({
        setView: true,
        maxZoom: 16
    });

    setTimeout(recorrido, 3000);
}