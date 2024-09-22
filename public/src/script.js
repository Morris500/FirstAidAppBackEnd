
const CPR = 'images/diagnosis_images/image.png'
const Seizures = "images/diagnosis_images/image-1.png"
const Bleeding = "images/diagnosis_images/image-2.png"


const image_list = [CPR, Seizures, Bleeding, "images/diagnosis_images/image-3.png", "images/diagnosis_images/image-4.png", "images/diagnosis_images/image-5.png"]


const returnImagesAsList = () => {
    return image_list;
}


const disease_diagnosis = [  "Heart Attack", "Shock",  "Asthma"]
const list_item = document.getElementById("list")
const diagnosis_images_list = document.getElementById("diagnosis-images-list")


for (let i = 0; i < disease_diagnosis.length; i++) {
    const item_html = `<a href='/${disease_diagnosis[i]}'><div class='item'>${disease_diagnosis[i]}</div><a/>`
    list_item.innerHTML += item_html
}

const images_list = returnImagesAsList()
const text_list = ["CPR", "Bleeding", "seizures", "Asthma", "Snake Bite", "Heart Attack"]


for (var i = 0; i < images_list.length; i++) {
    // console.log(images_list)
    const img_item = `<div class='img_container'><img src="${images_list[i]}"/><p>${text_list[i].toUpperCase()}</P><div>`
    diagnosis_images_list.innerHTML += img_item;
}

// function search() {
//     const element =document.querySelector("tag");
//     element.classList.replace("diagnosis-section","newdiagnosis-section");
//     console.log(element);
    
// }



       const element = document.getElementById('name');
       console.log(element);
       
      const p = document.getElementById("ptag").innerHTML;
console.log(p.length);

    
if (p.length > 41) {
    element.classList.replace('diagnosis-section','newdiagnosis-section');

}
       
    
      

   
// // Function to get user's geolocation and send it to the server
// document.getElementById('getLocation').addEventListener('click', function () {
//      // Initialize the map and set its view to a default location (Lagos, Nigeria)
//    const map = L.map('map').setView([6.5244, 3.3792], 13);

// // Add OpenStreetMap tile layer (free and open-source)
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// attribution: '© OpenStreetMap contributors'
// }).addTo(map);


//     if (navigator.geolocation) {
//         const geoOptions = {
//         enableHighAccuracy: true,   
//         timeout: 10000,            
//         maximumAge: 0               
//     };
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const userCoords = [position.coords.latitude, position.coords.longitude];
//              console.log(userCoords);
             
             
// // Center the map on user's location
// map.setView(userCoords, 14);

// // Add a marker at the user's location
// const userMarker = L.marker(userCoords).addTo(map)
// .bindPopup('You are here!')
// .openPopup();
// coordinate(userCoords);
//              },
//                (error) => {
//                  console.error("Error retrieving geolocation:", error);
//                   alert("Error retrieving geolocation: " + error.message);
//              }, geoOptions );     
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// function coordinate(userCoords) {


// // Query for nearby places (restaurants, for example)
// // queryNearbyPlaces(userCoords);
// findNearestHospital(userCoords);

// // Function to query nearby places using OpenStreetMap's Nominatim API
// // function queryNearbyPlaces(userCoords) {
// //     const query = 'nearest hospital';  // Change to the type of place you want to search for
// //     const [lat, lon] = userCoords;

// //     // Using Nominatim to search for nearby places
// //     const url = `https://nominatim.openstreetmap.org/search?` +
// //                 `q=${query}&format=json&limit=5&viewbox=${lon-0.05},${lat-0.05},${lon+0.05},${lat+0.05}`;

// //     fetch(url)
// //         .then(response => response.json())
// //         .then(data => {
// //             data.forEach(place => {
// //                 const placeCoords = [place.lat, place.lon];
// //                 const placeMarker = L.marker(placeCoords).addTo(map)
// //                     .bindPopup(`${place.display_name}`)
// //                     .openPopup();

// //                 // Optionally, add a route to the first result found
// //                 if (data.indexOf(place) === 0) {
// //                     addRouteToDestination(userCoords, placeCoords);
// //                 }
// //             });
// //         })
// //         .catch(error => console.error('Error querying nearby places:', error));
// // }





// // Function to search for the nearest hospital using Overpass API
// function findNearestHospital(userCoords) {
// const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:5000,${userCoords[0]},${userCoords[1]});out;`;

// fetch(overpassUrl)
//     .then(response => response.json())
//     .then(data => {
//         if (data.elements.length > 0) {
//             // Get the nearest hospital's location
//             const nearestHospital = data.elements[0];
//             const hospitalCoords = [nearestHospital.lat, nearestHospital.lon];
//             const hospitalName = nearestHospital.tags.name || 'Unknown Hospital';

//             // Center the map on the nearest hospital
//             map.setView(hospitalCoords, 14);

//             // Add a marker for the nearest hospital
//             L.marker(hospitalCoords).addTo(map)
//                 .bindPopup(`Nearest Hospital: ${hospitalName}`)
//                 .openPopup();
//                    // Optionally, add a route to the first result found
// //if (data.indexOf(nearestHospital) === 0) {
//             addRouteToDestination(userCoords, hospitalCoords);
//          // }
//         } else {
//             alert("No hospitals found nearby.");
//         }
//     })
//     .catch(error => {
//         console.error("Error fetching hospital data:", error);
//     });
// }









// // Function to add a route from user's location to the destination using OSRM API
// function addRouteToDestination(origin, destination) {
// const [originLat, originLng] = origin;
// const [destLat, destLng] = destination;

// // OSRM API for routing
// const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`;

// fetch(osrmUrl)
// .then(response => response.json())
// .then(data => {
//     const route = data.routes[0].geometry;
// console.log(route);

//     // Add the route as a polyline to the map
//     const routeLine = L.geoJSON(route, {
//         style: { color: 'blue', weight: 4 }
//     }).addTo(map);
// console.log(routeLine);

//     // Zoom the map to fit the route
//     map.fitBounds(routeLine.getBounds());
// })
// .catch(error => console.error('Error fetching the route:', error));
// }

// }

// });

