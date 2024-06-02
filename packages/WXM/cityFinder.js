import bindings from './h3/bindings'

var geocoder = new google.maps.Geocoder();
var cityName = string cityName; 

function getCoordinates(cityName, callback) {
    geocoder.geocode({ 'address': cityName }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            callback({lat: latitude, lng: longitude});
        } else {
            callback(null);
        }
    });
}

getCoordinates(cityName, function(coords) {
    if (coords) {
        console.log("Latitude: " + coords.lat + "\nLongitude: " + coords.lng);
    } else {
        console.log("Unable to get coordinates for " + cityName);
    }
});

function getCell(latitude = coords.lat, longitude = coords.lng) {
    const lat = latitude;
    const lng = longitude;
    const res = 7;
    return bindings.latLngToCell(lat, lng, res);
  }

var cellFinal = getCell(coords.lat, coords.lng);

module.exports = {
    cellFinal,
    getCell,
    // other exports...
  };
