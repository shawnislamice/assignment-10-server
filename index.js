const express = require("express");
const cors = require("cors");
 require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Middleware
app.use(express.json());
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsConfig));
// Middleware

// Database
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ipcjhor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Data related codes
    const spotCollection = client.db("SpotCollection").collection("tourSpots");
    const userCollection = client
      .db("SpotUserCollection")
      .collection("SpotUsers");
    const countryCollection = client
      .db("CountryCollection")
      .collection("Countries");
    app.post("/tourspots", async (req, res) => {
      const newSpot = req.body;
      const result = await spotCollection.insertOne(newSpot);
      res.send(result);
    });
    app.get("/tourspots", async (req, res) => {
      const cursor = spotCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/tourspots/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await spotCollection.findOne(query);
      res.send(result);
    });
    app.delete("/tourspots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await spotCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/tourspots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedSpot = req.body;
      console.log(updatedSpot);
      const spot = {
        $set: {
          averageCost: updatedSpot.averageCost,
          country: updatedSpot.country,
          location: updatedSpot.location,
          photo: updatedSpot.photo,
          season: updatedSpot.season,
          shortDescription: updatedSpot.shortDescription,
          touristSpotName: updatedSpot.touristSpotName,
          travelTime: updatedSpot.travelTime,
          totalTravellers: updatedSpot.totalTravellers,
        },
      };
      const result = await spotCollection.updateOne(query, spot, options);
      res.send(result);
    });
    // Data related codes
    // User
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log(newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });
     app.put("/users/:id", async (req, res) => {
       const id = req.params.id;
       const query = { _id: new ObjectId(id) };
       const options = { upsert: true };
       const updatedSpot = req.body;
       console.log(updatedSpot);
       const spot = {
         $set: {
           displayName:updatedSpot.name,
           photoURL:updatedSpot.photo 
         },
       };
       const result = await userCollection.updateOne(query, spot, options);
       res.send(result);
     });
    // User
    // Country
    app.post('/country',async(req,res)=>{
      const newCountry = req.body;
     
      const result = await countryCollection.insertOne(newCountry);
      res.send(result);
    })
    app.get('/country',async(req,res)=>{
      const cursor = countryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get('/country/:id',async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await countryCollection.findOne(query);
      res.send(result);
    })
    // Country
    // Just for commit
    // Just for commit
    // Just for commit
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Database

app.get("/", (req, res) => {
  res.send("Assignment 10 Loading");
});

app.listen(port, (req, res) => {
  console.log(`Assignment 10 is running on port ${port}`);
});
