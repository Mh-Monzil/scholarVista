const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://my-project-2f30d.web.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j6yhdqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    await client.connect();

    const usersCollection = client.db("scholarDB").collection("users");
    const scholarshipsCollection = client
      .db("scholarDB")
      .collection("scholarships");
    const reviewsCollection = client.db("scholarDB").collection("reviews");
    const appliedScholarshipCollection = client
      .db("scholarDB")
      .collection("appliedScholarships");

    // Verify Token Middleware
    const verifyToken = async (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ message: "unauthorized access" });
        }
        req.user = decoded;
        next();
      });
    };

    // verify admin middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.user.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      console.log(result.role);
      if (!result || result?.role !== "admin") {
        return res.status(403).send({ message: "forbidden access!!" });
      }
      next();
    };

    // verify host middleware
    const verifyCommon = async (req, res, next) => {
      const email = req.user.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      console.log(result, "common");
      if (!result || result?.role !== "admin" || result?.role !== "moderator") {
        return res.status(403).send({ message: "forbidden access!!" });
      }

      next();
    };

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.send({ token });
    });
   

    ///create-payment-intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const fees = req.body.fees;
      const feesInCent = parseFloat(fees) * 100;
      if (!fees || feesInCent < 1) return;

      const { client_secret } = await stripe.paymentIntents.create({
        amount: feesInCent,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.send({ clientSecret: client_secret });
    });

    //save user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const email = user.email;
      const query = { email: email };
      // check if user already exists in db
      const isExist = await usersCollection.findOne(query);
      if (isExist) return res.send("user already exists");

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    

    //get all user
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    //get all users with email
    app.get("/users-role/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    //update user role with email
    app.patch("/users/:email", verifyToken, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const updatedRole = req.body;
      const query = { email: email };
      const updateDoc = {
        $set: {
          ...updatedRole,
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    //delete user role with email
    app.delete("/users/:email", verifyToken, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    //sort users by role
    app.get("/sort-users/:role", verifyToken, verifyAdmin, async (req, res) => {
      const role = req.params.role;
      const query = { role: role };
      const sortedRole = await usersCollection.find(query).toArray();
      const others = await usersCollection
        .find({ role: { $ne: role } })
        .toArray();
      const result = sortedRole.concat(others);
      res.send(result);
    });

    //post scholarship
    app.post("/scholarships", verifyToken, verifyCommon, async (req, res) => {
      const scholarship = req.body;
      const result = await scholarshipsCollection.insertOne(scholarship);
      res.send(result);
    });

    //get top scholarship
    app.get("/top-scholarships", async (req, res) => {
      const result = await scholarshipsCollection
        .aggregate([
          {
            $sort: {
              applicationFees: 1,
              postDate: -1,
            },
          },
        ])
        .toArray();
      res.send(result);
    });

    //get all scholarships
    app.get("/scholarships", async (req, res) => {
      const result = await scholarshipsCollection.find().toArray();
      res.send(result);
    });

    //update scholarship by  id
    app.patch("/update-scholarships/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const updateInfo = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updateInfo,
        },
      };
      const result = await scholarshipsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    //get scholarship by id
    app.get("/scholarship-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await scholarshipsCollection.findOne(query);
      res.send(result);
    });

    //get scholarship by search
    app.get("/scholarship-search/:text", verifyToken, async (req, res) => {
      const searchText = req.params.text;
      const finalText = new RegExp(searchText, "i");
      const query = {
        $or: [
          { universityName: finalText },
          { subjectCategory: finalText },
          { subjectName: finalText },
        ],
      };
      const result = await scholarshipsCollection.find(query).toArray();
      res.send(result);
    });

    //delete scholarship by id
    app.delete(
      "/scholarship/:id",
      verifyToken,
      verifyCommon,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await scholarshipsCollection.deleteOne(query);
        res.send(result);
      }
    );

    //save applied scholarship
    app.post("/applied-scholarships", verifyToken, async (req, res) => {
      const appliedInfo = req.body;
      const result = await appliedScholarshipCollection.insertOne(appliedInfo);
      res.send(result);
    });

    //get all applied scholarships
    app.get("/applied-scholarships", verifyToken, async (req, res) => {
      const result = await appliedScholarshipCollection.find().toArray();
      res.send(result);
    });

    //get applied scholarship by id
    app.get(
      "/applied-scholarships/:id",
      // verifyToken,
      // verifyCommon,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await appliedScholarshipCollection.findOne(query);
        res.send(result);
      }
    );

    //get my applied scholarship by email
    app.get("/my-applied-scholarships/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await appliedScholarshipCollection.find(query).toArray();
      res.send(result);
    });

    // delete applied scholarship
    app.delete("/my-applied-scholarship/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await appliedScholarshipCollection.deleteOne(query);
      res.send(result);
    });

    //update applied Scholarship
    app.patch(
      "/applied-scholarships/:id",
      verifyToken,
      verifyCommon,
      async (req, res) => {
        const id = req.params.id;
        const editedInfo = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            ...editedInfo,
          },
        };
        const result = await appliedScholarshipCollection.updateOne(
          query,
          updateDoc
        );
        res.send(result);
      }
    );

    // delete applied scholarship
    app.delete(
      "/applied-scholarship/:id",
      verifyToken,
      verifyCommon,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await appliedScholarshipCollection.deleteOne(query);
        res.send(result);
      }
    );

    //save review
    app.post("/reviews", verifyToken, async (req, res) => {
      const review = req.body;
      const result = await reviewsCollection.insertOne(review);
      res.send(result);
    });

    //get all reviews
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    //get review by id
    app.get("/reviews/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { university_id: id };
      const result = await reviewsCollection.find(query).toArray();
      res.send(result);
    });

    //get all reviews by email
    app.get("/my-reviews/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { reviewerEmail: email };
      const result = await reviewsCollection.find(query).toArray();
      res.send(result);
    });

    //update review
    app.patch("/update-reviews/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const updatedReview = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updatedReview,
        },
      };
      const result = await reviewsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/delete-reviews/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewsCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
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
  res.send("Scholarship is available");
});

app.listen(port, console.log("Scholarship is running"));
