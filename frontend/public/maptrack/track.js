const socket = io();

// Check if geolocation is available in the browser
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    }, (error) => {
        console.log(error);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
}

// Initialize Leaflet map and store it in a variable
const map = L.map("map").setView([0, 0], 10);


// Add a tile layer to the map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"
}).addTo(map);

// Store markers for each connected user
const markers = {};

// Handle receiving location data from the server
socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    // Update the map view to the user's location
    map.setView([latitude, longitude], 16);

    // Update marker if it exists, otherwise create a new one
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

// Handle user disconnection and remove their marker
socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
