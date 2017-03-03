var map;
var cities = [];
var earthquakes = [];
var citiesMarkers = [];
var earthquakesMarkers = [];
var ciryCircle;


function initMap() { //init map




    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 13.8,
            lng: 180
        },
        //mapTypeId: 'satellite',
        zoom: 3,
        // disableDefaultUI: true,
        styles: [{
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "transit",
                "stylers": [{
                    "visibility": "off"
                }]
            }
        ]
    });







    var largeInfowindow = new google.maps.InfoWindow();

    // var defaultIcon = makeMarkerIcon('FF4040');
    // var highlightedIcon = makeMarkerIcon('00CD00');
    cityCircle = new google.maps.Circle();
    earthquakes = initEarthquake();
    //var largeInfowindow = new google.maps.InfoWindow();


    $.ajaxSetup({
        async: false
    });
    $.getJSON("data/cities.geojson", function(json) {
        // console.log(json); // this will show the info it in firebug console
        cities = json.features;
    });


    // console.log(cities)

    // $.ajax({
    //     async: false,
    //     url: "data/worldcities.json",
    //     success: function(json) {
    //         cities = json;
    //         console.log(json)
    //     }
    // });
    // console.log(cities.length);


    // cities = [{ title: 'University of California, Santa Cruz', location: { lat: 36.9738893, lng: -122.0771595 } },
    //     { title: 'San Jose State University', location: { lat: 37.335103, lng: -121.877357 } },
    //     { title: 'Santa Clara University', location: { lat: 37.349649, lng: -121.939213 } },
    //     { title: 'University of San Francisco', location: { lat: 37.776632, lng: -122.450864 } },
    //     { title: 'University of California, Berkeley', location: { lat: 37.871467, lng: -122.258915 } },
    //     { title: 'Stanford University', location: { lat: 37.426385, lng: -122.168552 } },
    //     { title: 'Northeastern University Silicon Valley', location: { lat: 37.256893, lng: -121.787221 } },
    //     { title: 'Carnegie Mellon University - Silicon Valley', location: { lat: 37.410445, lng: -122.059858 } },
    // ];


    for (var i = 0; i < cities.length; i++) {


        // var location = new Object();
        // location.lat = parseInt(cities[i].lat);
        // location.lng = parseInt(cities[i].lng);
        var location = new Object();
        location.lat = cities[i].geometry.coordinates[1];
        location.lng = cities[i].geometry.coordinates[0];
        var position = location;

        var title = cities[i].properties.city;

        var cityMarker = new google.maps.Marker({
            map: null,
            position: position,
            title: title,
            icon: makeMarkerIcon(),

            //animation: google.maps.Animation.DROP,
            id: i //i not 1
        });

        citiesMarkers.push(cityMarker);

        cityMarker.addListener('click', function() {

            populateInfoWindow(this, largeInfowindow);
            this.setAnimation(google.maps.Animation.BOUNCE);
            stopAnimation(this);
        });

        // cityMarker.addListener('mouseover', function() {
        //     this.setIcon(highlightedIcon);
        // });
        //
        // cityMarker.addListener('mouseout', function() {
        //     this.setIcon(defaultIcon);
        // });


    };


    for (var i = 0; i < earthquakes.length; i++) {

        // console.log("earthquakeMarker Correct")
        var position = earthquakes[i].location;
        var title = earthquakes[i].title;


        var earthquakeMarker = new google.maps.Marker({
            mag: earthquakes[i].mag,
            depth: earthquakes[i].depth,
            map: map,
            position: position,
            title: title,
            icon: earthquakeIcon(earthquakes[i].mag),
            // animation: google.maps.Animation.DROP,
            id: i //i not 1
        });


        earthquakesMarkers.push(earthquakeMarker);

        earthquakeMarker.addListener('click', function() {
            // console.log(123);

            removeCircle();
            hideOtherEarthquakesMarkers(this);
            removeCityList();
            map.setZoom(4);
            map.setCenter(this.getPosition());

            hideAllCitiesMarkers();
            showImpactCities(this, citiesMarkers);
            populateInfoWindow(this, largeInfowindow);
            getCircle(this, this.mag);

            // this.setAnimation(google.maps.Animation.BOUNCE);
            // stopAnimation(this);
        });

        // earthquakeMarker.addListener('mouseover', function() {
        //     this.setIcon(cycleIcon(this.mag));
        // });
        //
        // earthquakeMarker.addListener('mouseout', function() {
        //     this.setIcon(defaultIcon);
        // });


    }




    map.addListener('click', function() {
      removeCircle();
      hideAllCitiesMarkers();
      showAllEarthquakesMarkers();
      removeCityList();
      map.setZoom(3);
      map.setCenter({
          lat: 13.8,
          lng: 180
      });
    });

    $(document).ready(function() {
        $("#btn1").click(function() {
            showMag5();
        });
        $("#btn2").click(function() {
            showMag55();
        });
        $("#btn3").click(function() {
           showMag6();
        });
        $("#btn4").click(function() {
            showMag65();
        });
        $("#btn5").click(function() {
            showAllEarthquakesMarkers();
        });
    });





};







function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.

    var wikiurl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
    $.ajax({
        url: wikiurl,
        dataType: "json",
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

function makeMarkerIcon() {
    // var markerImage = new google.maps.MarkerImage('img/grey.png',
    //     // 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
    //     // '|40|_|%E2%80%A2',

    var markerImage = {
        url: 'img/city-marker.png',
        size: new google.maps.Size(30, 30),
    };
    return markerImage;
};

function stopAnimation(marker) {
    setTimeout(function() {
        marker.setAnimation(null);
    }, 1500);
};


function initEarthquake() {
    var res;
    xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            localStorage.res = xhr.responseText;
        }
    };

    xhr.open("get", "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", true);
    xhr.send(null);

    var JSONres = JSON.parse(localStorage.res);

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
                depth: JSONres.features[index].geometry.coordinates[2],
                mag: JSONres.features[index].properties.mag,
                tsunami: JSONres.features[index].properties.tsunami,
                felt: JSONres.features[index].properties.felt
            };
            array[index] = newObejct;
        })(index);
    }

    // console.log(array);
    return array;
};

// function cycleIcon(magnitude) {
//     return {
//         path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
//         fillColor: 'red',
//         fillOpacity: .2,
//         scale: Math.pow(2, magnitude) / 2,
//         strokeColor: 'white',
//         strokeWeight: 0
//     };
// };

function earthquakeIcon(magnitude) {
    if (magnitude < 5) {
        var markerImage = {
            url: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png',
            size: new google.maps.Size(12, 20),
            // origin: new google.maps.Point(6, 20),
            // anchor: new google.maps.Point(17, 34),
            // scaledSize: new google.maps.Size(25, 25)
        };
        return markerImage;

    } else if (magnitude < 5.5) {
        var markerImage = {
            url: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_yellow.png',
            size: new google.maps.Size(12, 20),
        };
        return markerImage;
    } else if (magnitude < 6) {
        var markerImage = {
            url: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_orange.png',
            size: new google.maps.Size(12, 20),

        };
        return markerImage;
    } else {
        var markerImage = {
            url: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png',
            size: new google.maps.Size(12, 20),
        };
        return markerImage;
    }
};

<<<<<<< HEAD
function synAjaxFuntion(url) {
  var res;
  var XHR = new XMLHttpRequest();
  XHR.open("get", url , false);
  XHR.send(null);
  if ( XHR.status >= 200 && XHR.status <= 300 || XHR.status == 304) {
    res = XHR.responseText;
  }
  return JSON.parse(res);
}




function showPeople(marker) {
  var felt = marker.felt;
  if (felt == null) {
    return null;
  }
  var tempRes = synAjaxFuntion(marker.url);
  var geoJson = "dyfi_geo_10km.geojson";
  var res = tempRes.properties.products.dyfi.contents.genJson.url;
  var array = synAjaxFuntion(res);
  console.log(array)
}

function synAjaxFuntion(url) {
  var res;
  var XHR = new XMLHttpRequest();
  XHR.open("get", url , false);
  XHR.send(null);
  if ( XHR.status >= 200 && XHR.status <= 300 || XHR.status == 304) {
    res = XHR.responseText;
  }
  var jsonRes = JSON.parse(res)
  console.log(jsonRes);
  return jsonRes;
}

//getMarkerArray
function getMarkerArray(marker) {
  if (marker.felt == null) {
    return null;
  }
    var array;
    // console.log(response.features[index].properties.detail);
    $.ajax({
      url: marker.detail,
      dataType:"json"
    }).done(function (response) {
      var geoJson = "dyfi_geo_10km.geojson";
      // console.log(response);
      // console.log(response.properties.products.dyfi[0].contents["dyfi_geo_10km.geojson"].url);
      // var temp
      // console.log(JSON.stringify(response.properties.products.dyfi[0].contents));
      $.ajax({
        url:response.properties.products.dyfi[0].contents["dyfi_geo_10km.geojson"].url,
        dataType:"json"
      }).done(function (response){
        // console.log(response);
        console.log(response.features);
        var array = new Array(response.features.length);
        for (var index in response.features) {
          (function(index) {
            var newObejct = {
                properties: response.features[index].properties,
                square: [{
                    lat: response.features[index].geometry.coordinates[0][0][1],
                    lng: response.features[index].geometry.coordinates[0][0][0]
                },
                {
                  lat: response.features[index].geometry.coordinates[0][1][1],
                  lng: response.features[index].geometry.coordinates[0][1][0]
                },
                {
                  lat: response.features[index].geometry.coordinates[0][2][1],
                  lng: response.features[index].geometry.coordinates[0][2][0]
                },
                {
                  lat: response.features[index].geometry.coordinates[0][3][1],
                  lng: response.features[index].geometry.coordinates[0][3][0]
                }]

            };
            array[index] = newObejct;
        })(index);
        }
        // console.log(array);
      });
    });
  return array;

}




=======
function getCircle(marker, magnitude) {
        cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: marker.position,
        radius: 20 * Math.pow(1.8, (2 * magnitude - 5)) * 1000
    });
};

function removeCircle(){
  cityCircle.setMap(null)
}

function showAllCitiesMarkers() {
    for (var i = 0; i < citiesMarkers.length; i++) {
        citiesMarkers[i].setMap(map);
    }
};

function hideAllCitiesMarkers() {
  for (var i = 0; i < citiesMarkers.length; i++) {
      citiesMarkers[i].setMap(null);
  }
};

function showAllEarthquakesMarkers(){
  for (var i = 0; i < earthquakesMarkers.length; i++) {
      earthquakesMarkers[i].setMap(map);
  }
};

function hideOtherEarthquakesMarkers(marker) {
    for (var i = 0; i < earthquakesMarkers.length; i++) {
        if (marker != earthquakesMarkers[i]) {
            earthquakesMarkers[i].setMap(null);
        }
    }
};
>>>>>>> starsyork/master

function showImpactCities(earthquakeMarker, markers) {
    // var mygc = new google.maps.Geocoder();

    // console.log(earthquakeMarker)
    // console.log(markers)
    for (var i = 0; i < markers.length; i++) {

        var dis = google.maps.geometry.spherical.computeDistanceBetween(earthquakeMarker.getPosition(), markers[i].getPosition())
        // console.log(dis);
        // console.log(earthquakeMarker.mag)
        var impactDis = 20 * Math.pow(1.8, (2 * earthquakeMarker.mag - 5)) * 1000;
        //console.log(impactDis)
        if (dis <= impactDis) {
            markers[i].setMap(map);
            showCityList(markers[i]);
        };
    }
};


function showCityList(marker) {
  $('.list-group').append('<a href="" class="list-group-item">'+ marker.title + '</a>');
}

function removeCityList(){
  $('.list-group-item').remove();
}

//Panel function
function showMag5(){
  for (var i = 0; i < earthquakesMarkers.length; i++) {
      if(earthquakesMarkers[i].mag < 5) {
          earthquakesMarkers[i].setMap(map);
      } else {
        earthquakesMarkers[i].setMap(null);
      }
  }
};

function showMag55(){
  for (var i = 0; i < earthquakesMarkers.length; i++) {
      if(earthquakesMarkers[i].mag >= 5 && earthquakesMarkers[i].mag < 5.5) {
          earthquakesMarkers[i].setMap(map);
      } else {
        earthquakesMarkers[i].setMap(null);
      }
  }
};

function showMag6(){
  for (var i = 0; i < earthquakesMarkers.length; i++) {
      if(earthquakesMarkers[i].mag >= 5.5 && earthquakesMarkers[i].mag < 6) {
          earthquakesMarkers[i].setMap(map);
      } else {
        earthquakesMarkers[i].setMap(null);
      }
  }
};

function showMag65(){
  for (var i = 0; i < earthquakesMarkers.length; i++) {
      if(earthquakesMarkers[i].mag >= 6) {
          earthquakesMarkers[i].setMap(map);
      } else {
        earthquakesMarkers[i].setMap(null);
      }
  }
};
