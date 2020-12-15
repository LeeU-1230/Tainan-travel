var get_map = L.map('map', {                                                  
    center: [22.99729, 120.21266],
    zoom: 16
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {       
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(get_map);

L.marker([22.99729, 120.21266]).addTo(get_map)
    .bindPopup('<h1>台南火車站</h1>')
    .openPopup();

