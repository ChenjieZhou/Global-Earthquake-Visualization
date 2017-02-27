var map;
var cities = [];
var earthquakes = [];
var citiesMarkers = [];
var earthquakesMarkers = [];


function initMap() { //init map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.4, lng: -121.8 },
        zoom: 3
    });

    var largeInfowindow = new google.maps.InfoWindow();

    var defaultIcon = makeMarkerIcon('FF4040');
    var highlightedIcon = makeMarkerIcon('00CD00');

    //var largeInfowindow = new google.maps.InfoWindow();

    earthquakes = initEarthquake();
    cities = [{ title: 'University of California, Santa Cruz', location: { lat: 36.9738893, lng: -122.0771595 } },
        { title: 'San Jose State University', location: { lat: 37.335103, lng: -121.877357 } },
        { title: 'Santa Clara University', location: { lat: 37.349649, lng: -121.939213 } },
        { title: 'University of San Francisco', location: { lat: 37.776632, lng: -122.450864 } },
        { title: 'University of California, Berkeley', location: { lat: 37.871467, lng: -122.258915 } },
        { title: 'Stanford University', location: { lat: 37.426385, lng: -122.168552 } },
        { title: 'Northeastern University Silicon Valley', location: { lat: 37.256893, lng: -121.787221 } },
        { title: 'Carnegie Mellon University - Silicon Valley', location: { lat: 37.410445, lng: -122.059858 } },
    ];


    for (var i = 0; i < cities.length; i++) {


        var position = cities[i].location;
        var title = cities[i].title;

        var cityMarker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            id: i //i not 1
        });
        citiesMarkers.push(cityMarker);

        cityMarker.addListener('click', function(){
            populateInfoWindow(this, largeInfowindow);
            this.setAnimation(google.maps.Animation.BOUNCE);
            stopAnimation(this);
        });

        cityMarker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });

        cityMarker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });


    };


    for (var i = 0; i < earthquakes.length; i++) {


        var position = earthquakes[i].location;
        var title = earthquakes[i].title;

        var earthquakeMarker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            id: i //i not 1
        });

        earthquakesMarkers.push(earthquakeMarker);

        earthquakeMarker.addListener('click', function(){
            console.log(123);
            showImpactCities(this, citiesMarkers);
            populateInfoWindow(this, largeInfowindow);
            this.setAnimation(google.maps.Animation.BOUNCE);
            stopAnimation(this);
        });

        earthquakeMarker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });

        earthquakeMarker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });


    }

};



function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.

    var wikiurl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
    $.ajax({
        url: wikiurl,
        dataType: "jsonp",
        timout: 8000
    }).fail(function() {
        infowindow.setContent('<div>' + 'Please Check Your Connection' + '</div>');
        infowindow.open(map, marker);
    }).done(function(response) {
            var articleList = response[1];
            articleStr = articleList[0];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                if (articleStr == null) {
                    infowindow.setContent('<div>' + marker.title + '</div>' + 'Oops, no such wiki');
                } else {
                    infowindow.setContent('<div>' + '</div>' + '<a href = "' + url + '">' + articleStr + '</a>');
                }
                infowindow.open(map, marker);
                // Make sure the marker property is cleared if the infowindow is closed.
            }
            // clearTimeout(wikiRequestTimeout);
        });


    infowindow.addListener('closeclick', function() {
        infowindow.setMarker = null;
    });
}


function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
};



function stopAnimation(marker) {
    setTimeout(function () {
        marker.setAnimation(null);
    }, 1500);
};



function initEarthquake() {
    var res;
    xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            sessionStorage.res = xhr.responseText;
        }
    };

    xhr.open("get", "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson", true);
    xhr.send(null);


    var JSONres = JSON.parse(sessionStorage.res);


    var array = new Array(JSONres.features.length);
    for (var index in JSONres.features) {
        // alert(o);
        // alert(JSONres.features[o]);
        // alert("text:"+JSONres.features[index].properties.rms);
        (function(index) {
            var newObejct = {
                title: JSONres.features[index].properties.place,
                location: {
                    lat: JSONres.features[index].geometry.coordinates[1],
                    lng: JSONres.features[index].geometry.coordinates[0]
                },
                deep: JSONres.features[index].geometry.coordinates[2]

            };
            array[index] = newObejct;
        })(index);
    }

    console.log(array);
    return array;
};



function showImpactCities(earthquakeMarker, markers) {
    // var mygc = new google.maps.Geocoder();

    console.log(earthquakeMarker.getPosition())
    console.log(markers)
    for (var i = 0; i < markers.length; i++) {

        var dis = google.maps.geometry.spherical.computeDistanceBetween(earthquakeMarker.getPosition(), markers[i].getPosition())
        console.log(dis);
    }
};
