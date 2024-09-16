//require("dotenv").config();
import dotenv from "dotenv";
import express from "express";
import bodyparser from 'body-parser';
import axios from "axios";
import LlamaAI from "llamaai";
import ejs from "ejs";
import Groq from "groq-sdk";
import cors from "cors";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
//import alert from "alert";

dotenv.config();
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

// const apiToken =process.env.API_TOKEN;
// const llamaAPI = new LlamaAI(apiToken);


const isFirstAidRelated = (input) => {
        const firstAidKeywords = [
          'first aid', 'cpr', 'bandage', 'burns', 'choking', 'bleeding', 'fracture', 'emergency', 'injury', 'wound',
          'resuscitation', 'cuts', 'sprain', 'shock', 'poisoning', 'cut','scrapes','nosebleed','strain','insect bite','dog bite', 'stings','allergic reaction', 'reactions','fever','seizures','seizure','eye','eye injury','injuries','blood','burn','accident','leg','arm','broken','fingers','head','pain','bp','swollen','swell','feet','ache','stomach','itching','inflammation','inflamed inflame','asthma','breathe','panic attack','drowning','poisons','poison','splinter','electricution','electricity','shock','epileptic','labor','pregnancy','stroke','convulsion','faint','loss of conciousness','concussion','gunshot','hand','heart','attack','gun'
        ];
  // Check if any first aid keyword exists in the query
  return firstAidKeywords.some(keyword => input.toLowerCase().includes(keyword));
};
app.post("/a", (req,res)=>{
  const { lat, lon } = req.body;
  const userCoords = [lat, lon];

  console.log(`Received coordinates: Latitude - ${lat}, Longitude - ${lon}`);
   // leaflet api
   
    // Initialize the map and set its view to a default location (Lagos, Nigeria)
    const map = L.map('map').setView([6.5244, 3.3792], 13);

    // Add OpenStreetMap tile layer (free and open-source)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

        // Center the map on user's location
        map.setView(userCoords, 14);

        // Add a marker at the user's location
        const userMarker = L.marker(userCoords).addTo(map)
            .bindPopup('You are here!')
            .openPopup();

        // Query for nearby places (restaurants, for example)
        queryNearbyPlaces(userCoords);
    

    // Function to query nearby places using OpenStreetMap's Nominatim API
    function queryNearbyPlaces(userCoords) {
        const query = 'restaurant';  // Change to the type of place you want to search for
        const [lat, lon] = userCoords;

        // Using Nominatim to search for nearby places
        const url = `https://nominatim.openstreetmap.org/search?` +
                    `q=${query}&format=json&limit=5&viewbox=${lon-0.05},${lat-0.05},${lon+0.05},${lat+0.05}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(place => {
                    const placeCoords = [place.lat, place.lon];
                    const placeMarker = L.marker(placeCoords).addTo(map)
                        .bindPopup(`${place.display_name}`)
                        .openPopup();

                    // Optionally, add a route to the first result found
                    if (data.indexOf(place) === 0) {
                        addRouteToDestination(userCoords, placeCoords);
                    }
                });
            })
            .catch(error => console.error('Error querying nearby places:', error));
    }

    // Function to add a route from user's location to the destination using OSRM API
    function addRouteToDestination(origin, destination) {
        const [originLat, originLng] = origin;
        const [destLat, destLng] = destination;

        // OSRM API for routing
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`;

        fetch(osrmUrl)
            .then(response => response.json())
            .then(data => {
                const route = data.routes[0].geometry;

                // Add the route as a polyline to the map
                const routeLine = L.geoJSON(route, {
                    style: { color: 'blue', weight: 4 }
                }).addTo(map);

                // Zoom the map to fit the route
                map.fitBounds(routeLine.getBounds());
            })
            .catch(error => console.error('Error fetching the route:', error));
    }




 
    // Now call a function to perform a nearby search using Google Places API
    //searchNearbyPlaces(lat, lon);
//google map  api setting
// function searchNearbyPlaces(latitude, longitude) {
//   // Construct the Places API request URL
//   const apiKey = process.env.MAP_API_KEY;
//   const radius = 1500; // Search radius in meters
//   const keyword = 'hositipals closest to my location'; // Change the keyword to search for specific items
// const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;

//   // const type = 'restaurant'; // Specify the type of places you're searching for
//   // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

//   // Fetch data from the Places API
//   fetch(url)
//       .then(response => response.json())
//       .then(data => {
//           console.log(data);
//           if (data.results.length > 0) {
//               displayPlaces(data.results);
//           } else {
//               //alert("No nearby places found.");
//               //console.error("error");
              
//           }
//       })
//       .catch(error => console.error('Error:', error));
// }

// // Function to display the results
// function displayPlaces(places) {
//   places.forEach(place => {
//       console.log(`Name: ${place.name}, Address: ${place.vicinity}`);
//   });
// }

   }

)

 app.route("/")
 .get((req, res) => {
  
  
  
   res.render( "index",{Message: ""})

 })
 .post(async (req, res) => {
    const input = req.body.input;

        if (!isFirstAidRelated(input)) {
            return res.status(400).render("index",{
              Message: `Your search "${input}" does not seem to be related to first aid. Please ask something related to first aid.`
            });
          } else {     
      
//using groq ai

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

 async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `provide detailed and brief first aid information about: ${input} not more than 150 words. only respond if it is related to to first aid`,
      },
    ],
    model: "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
  });
}

async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  res.render("index",{Message: chatCompletion.choices[0]?.message?.content || "" })

main();
     }





//     // Build the Request
// const apiRequestJson = {
//     "messages": [
//         {"role": "user", "content": input},
//     ],
//     "functions": [
//         {
//             "name": "get_current_weather",
//             "description": "Get the current weather in a given location",
//             "parameters": {
//                 "type": "object",
//                 "properties": {
//                     "location": {
//                         "type": "string",
//                         "description": "The city and state, e.g. San Francisco, CA",
//                     },
//                     "days": {
//                         "type": "number",
//                         "description": "for how many days ahead you wants the forecast",
//                     },
//                     "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
//                 },
//             },
//             "required": ["location", "days"],
//         }
//     ],
//     "stream": false,
//     "function_call": "get_current_weather",
//    };
 
//    // Execute the Request
//     llamaAPI.run(apiRequestJson)
//       .then((response) => {
//         // Process response
//         console.log(response);
        

//       })
//       .catch(error => {
//         // Handle errors
//         console.log(error);
        
//       });
 
          }
 })
 



app.listen(port, (req, res)=>{console.log("app running on port 3000")
 })