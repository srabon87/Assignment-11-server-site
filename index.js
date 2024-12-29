require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
// const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1efcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {

    // await client.connect();
    console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    const database = client.db("assignmentDB"); 
    const assignmentsCollection = database.collection("assignments");

    // Create Assignment
    app.post("/assignments", async (req, res) => {
      const assignment = req.body;
      const result = await assignmentsCollection.insertOne(assignment);
      res.send(result);
    });

    // Get All Assignments
    app.get("/assignments", async (req, res) => {
      const assignments = await assignmentsCollection.find({}).toArray();
      res.send(assignments);
    });

    // Delete Assignment
    app.delete("/assignments/:id", async (req, res) => {
      const id = req.params.id;
      const result = await assignmentsCollection.deleteOne({
        id: parseInt(id),
      });
      res.send(result);
    });

    // Update Assignment
    app.put("/assignments/:id", async (req, res) => {
      const id = req.params.id;
      const updatedAssignment = req.body;
      const result = await assignmentsCollection.updateOne(
        { id: parseInt(id) },
        { $set: updatedAssignment }
      );
      res.send(result);
    });

    app.get("/submittedAssignments", async (req, res) => {
        const { userId } = req.query;
        try {
          const assignments = await db.collection("submittedAssignments").find({ userId }).toArray();
          res.status(200).json(assignments);
        } catch (error) {
          console.error("Error fetching assignments:", error);
          res.status(500).send("Internal Server Error");
        }
      });
      
  } finally {
    
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("job is falling from the sky");
});

app.listen(port, () => {
  console.log(`job is running : ${port}`);
});
