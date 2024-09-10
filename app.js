//require("dotenv").config();
import dotenv from "dotenv";
import express from "express";
import bodyparser from 'body-parser';
import axios from "axios";
import LlamaAI from "llamaai";
import ejs from "ejs";

dotenv.config();
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));


const apiToken =process.env.API_TOKEN;
const llamaAPI = new LlamaAI(apiToken);



 app.route("/")
 .get((req, res) => {
   // console.log(LlamaAI);
    
   res.render( "index")

 })
 .post((req, res) => {
    const input = req.body.input;
console.log(input);

    // Build the Request
const apiRequestJson = {
    "messages": [
        {"role": "user", "content": input},
    ],
    "functions": [
        {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    },
                    "days": {
                        "type": "number",
                        "description": "for how many days ahead you wants the forecast",
                    },
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                },
            },
            "required": ["location", "days"],
        }
    ],
    "stream": false,
    "function_call": "get_current_weather",
   };
 
   // Execute the Request
    llamaAPI.run(apiRequestJson)
      .then((response) => {
        // Process response
        console.log(response);
        

      })
      .catch(error => {
        // Handle errors
        console.log(error);
        
      });
 

 })



app.listen(port, (req, res)=>{console.log("app running on port 3000")
 })