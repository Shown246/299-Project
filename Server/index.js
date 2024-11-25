const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true, // Allows cookies
  })
);

app.options("*", cors()); // Enable preflight across all routes

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use "lax" in development
};

app.use(express.json());
app.use(cookieParser());

const uri =
  `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.flqqu4g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// cookie verification
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.JWT_SECRET, { expiresIn: "7d" });
      
      // Set cookie with appropriate options
      res.cookie("token", token, cookieOptions);
      res.status(200).send({ success: true }); // Use 200 status instead of 204
    });

    app.post("/logout", async (req, res) => {
      res
        .clearCookie("token", { ...cookieOptions, maxAge: 0 })
        .send({ success: true });
    });

    const database = client.db("299DB");
    const users = database.collection("users");
    const jobPosts = database.collection("JobPosts");
    const serProfiles = database.collection("ServiceMen");

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const email = newUser.email;
      const user = await users.findOne({ email: email });
      if (user) {
        return res.status(409).send({ message: "User already exists" });
      }
      const result = await users.insertOne(newUser);
      res.send(result);
    });

    app.get("/userProfile", verifyToken, async (req, res) => {
      const email = req.user.email;
      const user = await users.findOne({ email: email });
      res.send(user);
    });

    app.get("/userRole", async (req, res) => {
      const email = req.query.email;
      const result = await users.findOne({ email: email });
      res.send(result?.role);
    });

    app.post("/jobPost", verifyToken, async (req, res) => {
      const newJobPost = req.body;
      const result = await jobPosts.insertOne(newJobPost);
      res.send(result);
    });

    app.get("/jobPosts",verifyToken, async (req, res) => {
      const result = await jobPosts.find().toArray();
      res.send(result);
    });

    app.get("/jobPost/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      // const result = await jobPosts.findOne({ _id: ObjectId(id) });
      // res.send(result);
    });

    app.post("/serProfile", verifyToken, async (req, res) => {
      const email = req.user.email;
      console.log(email);
      if (req.body.email === email) {
        const query = { email: email };
        const update = {
          $set: {
            eduData: req.body.eduData,
            skill: req.body.skill,
            expData: req.body.expData,
            phnData: req.body.phnData,
            selectedLocation: req.body.selectedLocation,
            gender: req.body.gender
          },
        };
        const options = { upsert: true };
        const result = await serProfiles.updateOne(query, update, options);
        res.send(result);
      } else {
        return res.status(403).send({ message: "Unauthorized" });
      }
    })

    app.get("/serProfile", verifyToken, async (req, res) => {
      const email = req.query.email;
      const result = await serProfiles.findOne({ email: email });
      res.send(result);
    });

    await client.db("299DB").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
