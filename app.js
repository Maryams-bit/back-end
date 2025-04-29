const {configDotenv}=require("dotenv");
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
configDotenv();

const port = process.env.PORT || 3000
const host = "0.0.0.0";

app.use(cors());
app.use(bodyParser.json());
//4YZcJo2OW0IUfpSN


const uri = process.env.SUPERBASE_URI

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);

const studList = []
//'POST, GET, PATCH, PUT, DELETE'
app.get('/', (req, res) => {
  res.send('Hello everyone!')
});

app.get("/student-list", async(req,res)=>{
   
    try {
      const result = await client.db("CICT").collection("students").find().toArray();
      console.log(result);
      res.json({data: result});
      
    } catch (error) {
      console.log(error)
      
    }
});
app.post("/student", async (req, res)=>{
  try {
    const name = req.body.name;
    const age = req.body.age;
    if (!name || !age ){
      res.status(403).json({message: "all fields are required"});
      return;
    }
    const result = await client.db("CICT").collection("students").insertOne({
      name,
       age,
    });
    console.log(result);
    res.status(200).json({message: "student added successfully"});
  } catch (error) {
    console.log(error)
    
  }
 
 
  
  }
)
app.listen(port, host, () => 
  console.log("app is running on port"+port))

console.log("Hey Maryam");

