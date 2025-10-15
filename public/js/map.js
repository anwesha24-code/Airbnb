// process.env.MAPBOX_TOKEN wont be directly accessible in public/js/map.js as it is a server-side environment variable.
//they are only accessible in server-side code. To use the MAP_TOKEN in your client-side JavaScript, you need to pass it from your server to your client.
//so we added a script tag in show.ejs to define a global variable mapToken with the value of process.env.MAP_TOKEN

//this is for custom marker icon
const el = document.createElement('div');
el.className = 'marker';
el.innerHTML='<i class="fa-regular fa-compass"></i>';//adding a compass icon to the marker


mapboxgl.accessToken= mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom 
    //more options can be added like style of map etc
});
console.log(listing.geometry.coordinates);
// the the coordinates cannot be accessed directly since it is in public folder so we add coordinates in the top of show.ejs
const marker=new mapboxgl.Marker(el)
.setLngLat(listing.geometry.coordinates)//setting the marker at the coordinates of the listing as stored in the database
.setPopup(
    new mapboxgl.Popup({offset:25})//adding a popup to the marker
        .setHTML(`<h4>${listing.title}</h4><p>Exact location provided after booking</p>`)
    )//adding html to the popup
.addTo(map);//adding the popup to the map
