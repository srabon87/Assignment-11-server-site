require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.Port || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1efcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(cors());
app.use(express.json());

// DB_USER = hkONnuNfHUlUuXSS
// DB_PASS = assignment11


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);


app.get('/',(req,res) => {
    res.send('job is falling from the sky')
})

app.listen(port, () => {
    console.log(`job is running : ${port}`)
})

