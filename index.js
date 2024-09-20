import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;
const apiKey = process.env.OPENAI_API_KEY

// Express will parse any responses from any requests in to json
app.use(express.json());


// Backend server - setting it up so that it can communicate with open ai sever upon
app.post('/chat', async (req, res)=>{
    console.log('req.body: ', req.body);
    const prompt = req.body.prompt;
    try {
        // axios.post sends a HTTP post request to openai api
        const response = await axios.post('https://api.openai.com/v1/chat/completions', 
            // Data that is sent to openai as payload
            {
            model : "gpt-3.5-turbo",
            messages : [{role : 'user', content : prompt}]
            },
            
            // Meta data - information about the request
            {
            headers : {Authorization : `Bearer ${apiKey}`, 'Content-Type' : 'application/json'}
            }
        )
        
    return res = response.json();
    }
    catch (error){
        console.log('error: ', error)
        res.status(500).json({error : "fail"})
    }
});


 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const res = await axios.get(, {
//     //We can add more configurations in this object
//        params: {
//       //This is one of the many options we can configure
//        }
//     });
    
//     // This is the second configuration option
//     const res = await axios({
//         method: 'get',
//         url://Endpoint goes here,
//         params:{
    
//         }
//     });



// import express from 'express';
// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// const port = 3000;
// const apiKey = process.env.OPENAI_API_KEY
// console.log(apiKey);


// app.use(express.json());

// app.post('/chat', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo',
//         prompt: message,
//         max_tokens: 100,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,

//         },
//       }
//     );
//     res.json(response.data.choices[0].text.trim());
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error with AI API');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });