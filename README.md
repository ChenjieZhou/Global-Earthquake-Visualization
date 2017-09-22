# Global Earthquakes with Cities Which Possibly Be Impacted

Data mining and visualization about real-time global earthquakes, also display the reports of DYFI (Do You Feel It) and cities that possibly be impacted by certain earthquake.


Data source comes from USGS.

[Click here](https://benny201.github.io/Globle-Earthquake-Visualization/) to see the website.

## Data Sources:
* [Earthquake Lists](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) sorted by magnitude and date. This is a GeoJson file to show all of the earthquakes that happened within specific time range sorted by magnitude. The GeoJson data is friendly with Google Map API and including magnitude, location, depth, etc. meaningful information.

* [List of cities by longitude](https://en.wikipedia.org/wiki/List_of_cities_by_longitude) some major cities in the world. This is a Wikipedia page about some major cities in the world.

* [Do You Feel It (Responses)](https://earthquake.usgs.gov/data/dyfi/) Did You Feel It? (DYFI) collects information from people who felt an earthquake and creates maps that show what people experienced and the extent of damage.


## Data Analysis:
1. In the real project, we choose the file that earthquakes happened within past 7 days and magnitude higher than 4.5M. Because the number of earthquakes in this file would be perfect for our visualization, sometimes about 20-30 objects. And magnitude greater than 4.5 is the quake that most people would feel about it. We could get enough felt reports of this earthquakes.

2. Earthquakes color classify:
The following table gives intensities that are typically observed at locations near the epicenter of earthquakes of different magnitudes. [Link](https://earthquake.usgs.gov/learn/topics/mag_vs_int.php )
The following is an abbreviated description of the levels of Modified Mercalli intensity.[Link](https://earthquake.usgs.gov/learn/topics/mercalli.php)

3. Calculate which cities possibly be impacted of the earthquake:
From the USGS website, [Link](https://earthquake.usgs.gov/data/dyfi/background.php), there is a model for predicted intensity levels of earthquakes at some distance away from their epicenter, as a function of the magnitude of the earthquake. So we approximate the distance away at which the earthquake is felt at an intensity of more than II by the formula: `12.5*(1.8^(2*Magnitude - 5)) (Km)`. But this formula is for illustration purposes only and is not intended to be used for safety-critical or predictive applications. The actual distance at which earthquakes are felt with some intensity depends on the geography of the region and many other factors as well.

## Visualization:
1. Technology
 * JavaScript: This visualization based on JavaScript.
 
 * Google Maps API: Our projects’ map based on Google Maps API.

 * jQuery: We use jQuery to get elements from DOM and detect the changes of DOM.

 * Ajax: it is the use of the XMLHttpRequest object to communicate with server-side scripts.

 * Materialize: We use Materialize to build website’s UI.
 
 * Github: Version control.

2. Mode
 * **Earthquake Mode**: In this mode, you will see all of the earthquakes happened in past 7 days 4.5+ magnitude.
 * **City Mode**: In this mode, all cities that possibly be impacted by earthquakes will be shown on map.

 * **Responses Mode**: In this mode, all Do You Feel It responses will be shown on map with tiny red square.

3. Function
 * Mini-map to display global earthquakes: On the top left, there is a tiny dark map to show all of the earthquakes with red transparent circle. The larger of the circle, the larger of the magnitude. The deeper of the color, the more earthquakes happened in that area.

 * Earthquake Filter: On top right, there is a drop-down menu used to filter earthquakes showing on the map.

 * Information window: When a user clicks any earthquake marker, an infowindow will be shown with the location, magnitude, depth, number of felt people (DYFI) of this earthquake. When user clicks any city marker, it will display a link to corresponding Wikipedia page. When user hover the cursor on any response marker (red square), an infowindow with location, number of response’ people, distance and felt intensity will be shown.

 * Estimate impacted area: For some earthquakes which no responses from DYFI, it will show an estimate impacted area with red transparent circle, the radius of the circle depends on the magnitude of earthquake calculate by above formula.

 * Relation between responses and cities of each earthquake: When user clicks any earthquake marker, the application automatically hide any other earthquakes and show the cities that possibly be impacted by this earthquake and all responses to this earthquake.

 * Show cities list: this function extends from the last one. You will see all possibly be impacted cities on the bottom left list.
