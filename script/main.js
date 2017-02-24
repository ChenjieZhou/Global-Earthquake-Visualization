$.ajax({
        url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson',
        dataType: "json",
        timout: 8000
    }).fail(function() {
        alert('check your internet')
    }).done(function(response) {
            var earthquakes = response.features;
            console.log(earthquakes.length)
            for (var quake in earthquakes){

              console.log(quake, earthquakes[quake])
            }
});
