var map;
var map2;
var cities = [];
var earthquakes = [];
var citiesMarkers = [];
var earthquakesMarkers = [];
var ciryCircle;
var reportSquare = [];
// var reportInfoWindow;

var numReports = 0;


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

    map2 = new google.maps.Map(document.getElementById('map2'), {
        center: {
            lat: 13.8,
            lng: 180
        },
        //mapTypeId: 'satellite',
        zoom: 0,
        disableDefaultUI: true,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        cursor: 'default',
        clickableIcons:false,
        styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
    });




    var largeInfowindow = new google.maps.InfoWindow();
    var cityInfoWindow = new google.maps.InfoWindow();
    // reportInfoWindow = new google.maps.InfoWindow();



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
            // icon: makeMarkerIcon(),

            //animation: google.maps.Animation.DROP,
            id: i //i not 1
        });

        citiesMarkers.push(cityMarker);

        cityMarker.addListener('click', function() {

            showCityInfoWindow(this, cityInfoWindow);
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
            felt: earthquakes[i].felt,
            urlLink: earthquakes[i].url,
            depth: earthquakes[i].depth,
            map: map,
            position: position,
            title: title,
            icon: earthquakeIcon(earthquakes[i].mag),
            // animation: google.maps.Animation.DROP,
            id: i //i not 1
        });


        var earthquakeMarker2 = new google.maps.Marker({

            map: map2,
            position: position,
            title: title,
            icon: cycleIcon(earthquakes[i].mag),
            clickable: false,
            // animation: google.maps.Animation.DROP,
            id: i //i not 1
        });


        earthquakesMarkers.push(earthquakeMarker);

        earthquakeMarker.addListener('click', function() {
            // console.log(123);
            var reports = getReportArray(this);


            removeReports();
            removeCircle();
            hideOtherEarthquakesMarkers(this);
            removeCityList();
            map.setZoom(6);
            map.setCenter(this.getPosition());

            hideAllCitiesMarkers();
            showImpactCities(this, citiesMarkers);
            earthquakeInfoWindow(this, largeInfowindow);
            getCircle(this, this.mag);
            showReports(reports);

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



    // Map click event
    map.addListener('click', function() {
        removeCircle();
        hideAllCitiesMarkers();
        showAllEarthquakesMarkers();
        removeCityList();
        showNone();
        map.setZoom(3);
        map.setCenter({
            lat: 13.8,
            lng: 180
        });
    });

    //UI control
    $(document).ready(function() {
      $(".dropdown-button").dropdown();
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
    $('.count-earthquake').append('<span>  ' + earthquakesMarkers.length + '</span>');
    $('.count-city').append('<span>  ' + citiesMarkers.length + '</span>');

    countReport();
    $('.count-report').append('<span>  ' + numReports + '</span>');

};


// Info Window
function showCityInfoWindow(marker, infowindow) {
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
                infowindow.setContent('<div>' + marker.title + '</div>' + 'Oops, cannot find any thing on Wikipeida');
            } else {
                infowindow.setContent('<div>Find out ' + '<a href = "' + url + '">' + articleStr + '</a> on Wikipeida</div>');
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

function earthquakeInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
      infowindow.marker = marker;

      infowindow.setContent('<div id="iw-container">' +
                    '<div class="iw-title">' + marker.title + '</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Mag: <span style="color:red">' + marker.mag +'</span></div>' +

                      '<div class="iw-subTitle">Depth: ' + marker.depth + ' Km</div>' +

                      '<div class="iw-subTitle">Felt #: ' + marker.felt + '</div>' +

                    '</div>' +

                  '</div>');
      infowindow.open(map, marker);

  };
  infowindow.addListener('closeclick', function() {

      infowindow.setMarker = null;
  });
};



function makeMarkerIcon() {
    // var markerImage = new google.maps.MarkerImage('img/grey.png',
    //     // 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + 'FF4040' + '|40|_|%E2%80%A2',

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
                felt: JSONres.features[index].properties.felt,
                url: JSONres.features[index].properties.detail
            };
            array[index] = newObejct;
        })(index);
    }

    // console.log(array);
    return array;
};

function cycleIcon(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / 5,
        strokeColor: 'white',
        strokeWeight: 0
    };
};

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

function showAllEarthquakesMarkers() {
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


function getCircle(marker, magnitude) {
  if (marker.felt == null) {
    cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: marker.position,
        radius: (20 * Math.pow(1.8, (2 * magnitude - 5)) * 1000) / 1.60934
    });
  }


};

function removeCircle() {
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

function showAllEarthquakesMarkers() {
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

function showImpactCities(earthquakeMarker, markers) {
    // var mygc = new google.maps.Geocoder();

    // console.log(earthquakeMarker)
    // console.log(markers)
    var count = 0;
    for (var i = 0; i < markers.length; i++) {

        var dis = google.maps.geometry.spherical.computeDistanceBetween(earthquakeMarker.getPosition(), markers[i].getPosition())
        // console.log(dis);
        // console.log(earthquakeMarker.mag)
        var impactDis = (20 * Math.pow(1.8, (2 * earthquakeMarker.mag - 5)) * 1000) / 1.60934;
        //console.log(impactDis)
        if (dis <= impactDis) {
          count++;
            markers[i].setMap(map);
            showCityList(markers[i]);
        };
    };
    if(count ===0){
        showNone();
    }
};


function showCityList(marker) {
    $('.collection').append('<li class="collection-item list-group-city">' + marker.title + '</li>');
}

function removeCityList() {
    $('.list-group-city').remove();

}

function showNone(){
  $('.list-group-city').remove();
  $('.collection-header').append('<li class="collection-item list-group-city">' + 'None' + '</li>');
}

//Panel function
function showMag5() {
    for (var i = 0; i < earthquakesMarkers.length; i++) {
        if (earthquakesMarkers[i].mag < 5) {
            earthquakesMarkers[i].setMap(map);
        } else {
            earthquakesMarkers[i].setMap(null);
        }
    }
};

function showMag55() {
    for (var i = 0; i < earthquakesMarkers.length; i++) {
        if (earthquakesMarkers[i].mag >= 5 && earthquakesMarkers[i].mag < 5.5) {
            earthquakesMarkers[i].setMap(map);
        } else {
            earthquakesMarkers[i].setMap(null);
        }
    }
};

function showMag6() {
    for (var i = 0; i < earthquakesMarkers.length; i++) {
        if (earthquakesMarkers[i].mag >= 5.5 && earthquakesMarkers[i].mag < 6) {
            earthquakesMarkers[i].setMap(map);
        } else {
            earthquakesMarkers[i].setMap(null);
        }
    }
};

function showMag65() {
    for (var i = 0; i < earthquakesMarkers.length; i++) {
        if (earthquakesMarkers[i].mag >= 6) {
            earthquakesMarkers[i].setMap(map);
        } else {
            earthquakesMarkers[i].setMap(null);
        }
    }
};

function synAjaxFuntion(url) {
    var res;
    var XHR = new XMLHttpRequest();
    XHR.open("get", url, false);
    XHR.send(null);
    if (XHR.status >= 200 && XHR.status <= 300 || XHR.status == 304) {
        res = XHR.responseText;
    }
    var jsonRes = JSON.parse(res)

    return jsonRes;
}

//getMarkerArray
function getReportArray(marker) {

    if (marker.felt == null) {
        return null;
    }
    var array;
    // console.log(response.features[index].properties.detail);
    $.ajax({
        url: marker.urlLink,
        dataType: "json"
    }).done(function(response) {
        var geoJson = "dyfi_geo_10km.geojson";
        // console.log(response);
        // console.log(response.properties.products.dyfi[0].contents["dyfi_geo_10km.geojson"].url);
        // var temp
        // console.log(JSON.stringify(response.properties.products.dyfi[0].contents));
        $.ajax({
            url: response.properties.products.dyfi[0].contents["dyfi_geo_10km.geojson"].url,
            dataType: "json"
        }).done(function(response) {
            // console.log(response);

            array = new Array(response.features.length);
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
                            }
                        ]

                    };
                    array[index] = newObejct;
                })(index);
            }

        });
    });

    return array;

}

// function showReports(reports){
//   if (reports != null) {
//     for (var i = 0; i < reports.length; i++) {
//
//       var corrds = reports[i].square;
//        var reportSquare = new google.maps.Polygon({
//         paths: corrds,
//         strokeColor: '#FF0000',
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: '#FF0000',
//         fillOpacity: 0.35
//       });
//       reportSquare.setMap(map);
//       var tmp = reports[i];
//
//       reportSquares.push(reportSquare);
//
//
//       reportSquare.addListener('mouseover', function() {
//         console.log(tmp);
//           showReportList(tmp);
//
//       });
//
//       reportSquare.addListener('mouseout', function() {
//         removeReportList();
//       });
//
//     };
//   };
//
// };

function showReports(reports){
  if (reports != null) {
    for (var i = 0; i < reports.length; i++) {

      (function () {
        var corrds = reports[i].square;
        reportSquare[i] = new google.maps.Polygon({
          paths: corrds,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        reportSquare[i].setMap(map);
        var tmp = reports[i];

        var reportInfowindow = new google.maps.InfoWindow();
        reportSquare[i].addListener('mouseover', function() {

            //showReportList(tmp);
            // showReportInfoWindow(tmp, reportInfoWindow);

            reportInfowindow.setContent('<div>' +
                          '<div ><b>' + tmp.properties.name + '</b></div>' +
                          '<div>' +
                            '<div ><b>Felt Itensity:  </b>'+ '<span style="color: red">'+ tmp.properties.cdi+'</span>' +'</div>' +
                            '<div ><b>Response #: ' +tmp.properties.nresp +'</b></div>' +
                            '<div ><b>Distance:  ' + tmp.properties.dist + ' Km</b></div>' +


                            // '<br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>'+
                          '</div>' +
                        '</div>');


            reportInfowindow.setPosition(tmp.square[2]);
            reportInfowindow.open(map);
        });

        reportSquare[i].addListener('mouseout', function() {
          //removeReportList();
          reportInfowindow.close();
        });
      })();
    };
  };
};

function removeReports(){

  for (var i = 0; i < reportSquare.length; i++) {
      reportSquare[i].setMap(null);
  }
}


// function showReportList(marker) {
//     $('.reportlist').append('<div class="list-group-report" >'+
//                             '<b> Report' + marker.properties.name + '</b>'+
//                             '<p> Number of Response: ' + marker.properties.nresp + '</p>' +
//                             '<p> Felt CID' + marker.properties.cdi + '</p>'+
//                             '<p> Distance' + marker.properties.dist + '</p></div>'
//                           );
// }
//
// function removeReportList() {
//     $('.list-group-report').remove();
// }


function countReport(){
  for (var i = 0; i < earthquakesMarkers.length; i++) {
      if (earthquakesMarkers[i].felt != null) {
          numReports = numReports + earthquakesMarkers[i].felt;
      }
  }
  return numReports;
}
