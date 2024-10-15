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
    origin: [
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

app.use(express.json());
app.use(cookieParser());

const uri =
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.flqqu4g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
      const token = jwt.sign(email, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, cookieOptions).send({ success: true });
    });

    app.post("/logout", async (req, res) => {
      res
        .clearCookie("token", { ...cookieOptions, maxAge: 0 })
        .send({ success: true });
    });

    const database = client.db("ph-assignment12");
    const users = database.collection("users");
    const guides = database.collection("guides");
    const stories = database.collection("stories");
    const tourTypes = database.collection("tourTypes");
    const packages = database.collection("packages");
    const bookings = database.collection("bookings");
    const wishlist = database.collection("wishlists");
    const blogs = database.collection("blogs");
    const posts = database.collection("posts");

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

    app.get("/users", verifyToken, async (req, res) => {
      const email = req.user.email;
      const filter = req.query?.roleFilter;
      if (email) {
        if (filter) {
          const result = await users.find({ role: filter }).toArray();
          res.send(result);
        } else {
          const result = await users.find({}).toArray();
          res.send(result);
        }
      }
    });

    app.get("/userRole", async (req, res) => {
      const email = req.query.email;
      const result = await users.findOne({ email: email });
      res.send(result?.role);
    });

    app.get("/guide/profile", async (req, res) => {
      const email = req.query.email;
      const result = await guides.findOne({ email: email });
      res.send(result);
    });

    app.get("/guide/:id", async (req, res) => {
      const id = req.params.id;
      const result = await guides.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/guides", async (req, res) => {
      const result = await guides.find({}).toArray();
      res.send(result);
    });

    app.post("/guide/profile", verifyToken, async (req, res) => {
      const email = req.user.email;
      if (req.body.email === email) {
        const query = { email: email };
        const update = {
          $set: {
            name: req.body.name,
            img: req.body.img,
            eduData: req.body.eduData,
            sklData: req.body.sklData,
            expData: req.body.expData,
            phnData: req.body.phnData,
          },
        };
        const options = { upsert: true };
        const result = await guides.updateOne(query, update, options);
        res.send(result);
      } else {
        return res.status(403).send({ message: "Unauthorized" });
      }
    });

    app.post("/bookings", verifyToken, async (req, res) => {
      const email = req.user.email;
      if (req.body.touristEmail === email) {
        const newBooking = req.body;
        const result = await bookings.insertOne(newBooking);
        const result2 = await bookings.aggregate([
          {
            $group: {
              _id: "$touristEmail",
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          }
        ]).toArray();
        // console.log(result2)
        res.send(result2);
      } else {
        return res.status(403).send({ message: "Unauthorized" });
      }
    });

    app.get("/bookings", verifyToken, async (req, res) => {
      const email = req.user.email;
      const result = await bookings.find({ touristEmail: email }).toArray();
      res.send(result);
    });

    app.delete("/cancelBooking/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await bookings.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/assignedTours", verifyToken, async (req, res) => {
      const email = req.user.email;
      const result = await bookings.find({ guideEmail: email }).toArray();
      res.send(result);
    });

    app.patch("/rejectBooking/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await bookings.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "Rejected" } }
      );
      res.send(result);
    });

    app.patch("/acceptBooking/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await bookings.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "Accepted" } }
      );
      res.send(result);
    });

    app.post("/addToWishlist", verifyToken, async (req, res) => {
      const email = req.user.email;
      if (req.body.email === email) {
        const newWishlist = req.body;
        const result = await wishlist.insertOne(newWishlist);
        res.send(result);
      } else {
        return res.status(403).send({ message: "Unauthorized" });
      }
    });

    app.get("/checkWishlist/:id", verifyToken, async (req, res) => {
      const email = req.user.email;
      const id = req.params.id;
      const result = await wishlist.findOne({ email: email, packageId: id });
      res.send(result);
    });

    app.get("/wishlist", verifyToken, async (req, res) => {
      const email = req.user.email;
      const result = await wishlist.find({ email: email }).toArray();
      res.send(result);
    });

    app.delete("/wishlist/:id", verifyToken, async (req, res) => {
      const email = req.user.email;
      const id = req.params.id;
      const result = await wishlist.deleteOne({ email: email, packageId: id });
      res.send(result);
    });

    app.post("/stories", verifyToken, async (req, res) => {
      const email = req.user.email;
      if (req.body.email === email) {
        const newStory = req.body;
        const result = await stories.insertOne(newStory);
        res.send(result);
      } else {
        return res.status(403).send({ message: "Unauthorized" });
      }
    });

    app.get("/stories", async (req, res) => {
      const result = await stories.find({}).toArray();
      res.send(result);
    });

    app.get("/story/:id", async (req, res) => {
      const id = req.params.id;
      const result = await stories.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });


    app.get("/types", async (req, res) => {
      const result = await tourTypes.find({}).toArray();
      res.send(result);
    });

    app.get("/types/:id", async (req, res) => {
      const id = req.params.id;
      const result = await tourTypes.findOne({ _id: new ObjectId(id) });
      const result2 = await packages.find({ type: result.name }).toArray();
      res.send(result2);
    });

    app.get("/packages", async (req, res) => {
      const result = await packages.find({}).toArray();
      res.send(result);
    });

    app.get("/packages/:id", async (req, res) => {
      const id = req.params.id;
      const result = await packages.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post("/addPackage", verifyToken, async (req, res) => {
      const email = req.user.email;
      if (email) {
        const newPackage = req.body;
        const result = await packages.insertOne(newPackage);
        res.send(result);
      } else {
        return res.status(403).send({ message: "Unauthorized" });
      }
    });

    app.post("/reqToAdmin", verifyToken, async (req, res) => {
      const email = req.user.email;
      const user = await users.findOne({ email: email });
      if (user?.role === "Tourist") {
        const result = await users.updateOne(
          { email: email },
          { $set: { req: "true" } }
        );
        res.send(result);
      }
    });

    app.patch("/makeGuide/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const user = await users.findOne({ _id: new ObjectId(id) });
      if (user?.role === "Tourist" || user?.req === "true") {
        const result = await users.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role: "Guide" }, $unset: { req: "" } }
        );
        const result2 = await guides.insertOne({
          email: user.email,
          name: user.name,
          img: user.photoURL,
          eduData: "",
          sklData: "",
          expData: "",
          phnData: "",
        });
        res.send(result);
      } else {
        return res.status(403).send({ message: "Unauthorized" });
      }
    });

    app.patch("/makeAdmin/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const user = await users.findOne({ _id: new ObjectId(id) });
      if (user?.role !== "Admin") {
        const result = await users.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role: "Admin" } }
        );
        res.send(result);
      } else {
        return res.status(403).send({ message: "Unauthorized" });
      }
    });

    app.get("/blogs", async (req, res) => {
      const result = await blogs.find({}).toArray();
      res.send(result);
    });

    app.get("/communityPosts", async (req, res) => {
      const result = await posts.find({}).toArray();
      res.send(result);
    });

    app.get("/images", async (req, res) => {
      const result = await packages.aggregate([
        { $unwind: "$images" },
        { $group: { _id: null, allImages: { $push: "$images" } } },
        { $project: { _id: 0, allImages: 1 } }
      ]).toArray();
      res.send(result[0].allImages);
    });


    // await client.db("ph-assignment12").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
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
