const {GoogleGenerativeAI} = require('@google/generative-ai')

// for work with image files 
const fs = require('fs')

// setting up the GOOGLE_API 
require('dotenv').config()
const apiKey = process.env.GOOGLE_API;
// console.log(apiKey); 
const genAI = new GoogleGenerativeAI(apiKey)


async function run(){
    // selecting the model 
    const model = genAI.getGenerativeModel({model:"gemini-pro"})
    // console.log(model)
    // prompt part 
    const prompt = "write a story about a magic backpack"
    const result = await model.generateContent(prompt)
    const response = await result.response 
    const text = response.text()
    console.log(text)
}

// run()

function fileToGenerativePart(path,mimeType){
    return {
        inlineData :{
            data:Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        }
    }
}

async function runVision(){
    const model = genAI.getGenerativeModel({model:"gemini-pro-vision"})
    const prompt = "what's different between these pictures?"
    const imageParts = [
        fileToGenerativePart("pic.jpg","image/jpeg"),
        fileToGenerativePart("cat.jpeg","image/jpeg"),
    ]
    const result = await model.generateContent([prompt,...imageParts])
    const response = await result.response 
    const text = response.text()
    console.log(text)
}

// runVision()


async function runChat(){
    const model = genAI.getGenerativeModel({model:"gemini-pro"})
    const chat = model.startChat({
        history :[
            {
                role:"user",
                parts:"Hellow, I want to learn coding"
            },
            {
                role:"model",
                parts:"Great to meet you. What can i do for you?"
            }
            
        ]
    })
    const msg = "How many cats are in my house?"
    const result = await chat.sendMessage(msg)
    const response = await result.response
    console.log(response)

    const text = response.text

    console.log(text)
}

// runChat()

async function runEmbedding(){
    const model = genAI.getGenerativeModel({model:"embedding-001"})
    const text = "The quick brown fox jumped over the lazy dog"

    const result =  await model.embedContent(text)
    const embedding = result.embedding
    console.log(embedding)
}

runEmbedding()

