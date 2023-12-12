url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"

var map = L.map('map').setView([20,-40], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

d3.json(url).then(data=>{
    L.geoJSON(data, {
        style: function (feature) {
            let mag=feature.properties.mag;
            let depth=feature.geometry.coordinates[2];

            return {
                color: "black",
                weight: 1,
                radius: mag*3,
                fillOpacity: .7,
                fillColor: 
                    depth < 10 ? "green" :
                    depth < 30 ? "lime":
                    depth < 50 ? "yellow":
                    depth < 70 ? "orange":
                    depth < 90 ? "darkorange": "red"

            
            };
        },

        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        }
        


    }).bindPopup(function (layer) {
        return layer.feature.properties.description;
    }).addTo(map);
})
