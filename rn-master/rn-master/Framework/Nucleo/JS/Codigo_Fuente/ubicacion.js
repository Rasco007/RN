function getLocation(d_input_geolocalizacion) {
    d_geolocalizacion  = document.getElementById(d_input_geolocalizacion);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        $('#d_geolocalizacion').val("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude + "/" + position.coords.longitude;
	$('#d_geolocalizacion').val(latlon);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $('#d_geolocalizacion').val("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $('#d_geolocalizacion').val("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $('#d_geolocalizacion').val("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $('#d_geolocalizacion').val("An unknown error occurred.");
            break;
    }
}