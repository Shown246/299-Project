const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
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
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.cookie("token", token, cookieOptions);
      res.status(200).send({ success: true });
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
    const bids = database.collection("Bids"); // New bids collection

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

    app.get("/jobPosts", verifyToken, async (req, res) => {
      const result = await jobPosts.find().toArray();
      res.send(result);
    });

    app.get("/jobPost/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await jobPosts.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post("/serProfile", verifyToken, async (req, res) => {
      const email = req.user.email;
      if (req.body.email === email) {
        const query = { email: email };
        const update = {
          $set: {
            eduData: req.body.eduData,
            skill: req.body.skill,
            expData: req.body.expData,
            phnData: req.body.phnData,
            selectedLocation: req.body.selectedLocation,
            gender: req.body.gender,
          },
        };
        const options = { upsert: true };
        const result = await serProfiles.updateOne(query, update, options);
        res.send(result);
      } else {
        return res.status(403).send({ message: "Unauthorized" });
      }
    });

    app.get("/serProfile", verifyToken, async (req, res) => {
      const email = req.query.email;
      const result = await serProfiles.findOne({ email: email });
      res.send(result);
    });

    // New route to get all jobs a serviceman has applied to
    app.get("/servicemanJobs", verifyToken, async (req, res) => {
      try {
        const servicemanEmail = req.user.email;
        const jobBids = await bids.find({ servicemanEmail }).toArray();
        const jobDetails = await Promise.all(
          jobBids.map(async (bid) => {
            const job = await jobPosts.findOne({ _id: new ObjectId(bid.jobId) });
            return {
              jobId: job._id,
              jobTitle: job.title,
              jobDescription: job.description,
              bidAmount: bid.amount,
              status: bid.status,
            };
          })
        );
        res.send(jobDetails);
      } catch (err) {
        res.status(500).send({ message: "Failed to fetch serviceman jobs" });
      }
    });

    // New route to place a bid on a job
    app.post("/placeBid", verifyToken, async (req, res) => {
      const { jobId, amount } = req.body;
      const servicemanEmail = req.user.email;

      try {
        const job = await jobPosts.findOne({ _id: new ObjectId(jobId) });
        if (!job) {
          return res.status(404).send({ message: "Job not found" });
        }

        // Insert the bid into the Bids collection
        const newBid = {
          jobId,
          servicemanEmail,
          amount,
          status: "Pending", // Initial bid status
        };

        const result = await bids.insertOne(newBid);
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: "Failed to place bid" });
      }
    });

    // New route to get all bids placed by a serviceman
    app.get("/servicemanBids", verifyToken, async (req, res) => {
      try {
        const servicemanEmail = req.user.email;
        const bidList = await bids.find({ servicemanEmail }).toArray();
        res.send(bidList);
      } catch (err) {
        res.status(500).send({ message: "Failed to fetch serviceman bids" });
      }
    });

    await client.db("299DB").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close(); Uncomment when needed
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
