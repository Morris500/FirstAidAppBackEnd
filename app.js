//require("dotenv").config();
import dotenv from "dotenv";
import express from "express";
import bodyparser from 'body-parser';
import axios from "axios";
import LlamaAI from "llamaai";
import ejs from "ejs";
import Groq from "groq-sdk";

dotenv.config();
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));


// const apiToken =process.env.API_TOKEN;
// const llamaAPI = new LlamaAI(apiToken);


const isFirstAidRelated = (input) => {
        const firstAidKeywords = [
          'first aid', 'cpr', 'bandage', 'burns', 'choking', 'bleeding', 'fracture', 'emergency', 'injury', 'wound',
          'resuscitation', 'cuts', 'sprain', 'shock', 'poisoning'
        ];
  // Check if any first aid keyword exists in the query
  return firstAidKeywords.some(keyword => input.toLowerCase().includes(keyword));
};



 app.route("/")
 .get((req, res) => {
   // console.log(LlamaAI);
   

//    const groq = new Groq();
//    async function main() {
//      const chatCompletion = await groq.chat.completions.create({
//        "messages": [
//          {
//            "role": "user",
//            "content": "hello"
//          }
//        ],
//        "model": "llama3-8b-8192",
//        "temperature": 1,
//        "max_tokens": 1024,
//        "top_p": 1,
//        "stream": true,
//        "stop": null
//      });
   
//      for await (const chunk of chatCompletion) {
//       console.log(
//        process.stdout.write(chunk.choices[0]?.delta?.content || ''));
//      }
//    }
   
//    main();
   res.render( "index")

 })
 .post(async (req, res) => {
    const input = req.body.input;

        if (!isFirstAidRelated(input)) {
            return res.status(400).json({
              message: 'Your query does not seem to be related to first aid. Please ask something related to first aid.'
            });
          } else {
      
      
//using groq ai

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

 async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

 async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `provide detailed first aid information about: ${input}. only  respond if it is related to to first aid`,
      },
    ],
    model: "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
  });
}
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
 

 })
 



app.listen(port, (req, res)=>{console.log("app running on port 3000")
 })