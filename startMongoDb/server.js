import express from "express";
import users from "../ProjectZero/MOCK_DATA.json" with { type: "json" };
import mongoose from "mongoose";
import fs from "fs";

const app = express();
const PORT = 8000;

//0-conncetion mongodb-
mongoose
  .connect("mongodb://127.0.0.1:27017/my-users")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error: ", err));

//1-create schema-
const user_schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    jobTitle: { type: String },
  },
  { timestamps: true },
);

//2-create model- autometiclly becomes -- users(plural form) collection in mongodb
const User = mongoose.model("user", user_schema);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Middleware executed for M1", req.url);
  next();
});

app.use((req, res, next) => {
  console.log("Middleware executed for M2", req.url);
  // return res.json("Middleware M2 response");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware executed for M3", req.url);
  fs.appendFile(
    "./logs.txt",
    `${new Date().toISOString()} - ${req.method} ${req.path}\n`,
    (err) => {
      if (err) console.error("Error writing to log file:", err);
    },
  );
  next();
});

app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  const html = `<ul>
    ${allUsers.map((user) => `<li>${user.firstName} ${user.lastName} - ${user.email} - ${user.gender} - ${user.jobTitle}</li>`).join("")}
  </ul>`;
  return res.send(html);
});

// REST APIs
app.get("/api/users", async (req, res) => {
  res.setHeader("X-MyName", "Krishna Gupta");
  // always add X to custom header to avoid conflict with standard headers
  const allUsers = await User.find({});
  return res.json(allUsers);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log("Body: ", body);
  if (!body.first_name || !body.email || !body.gender) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json(result);
  console.log("User created: ", result);
});

app
  .route("/api/users/:id")
  // GET user
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  })
  // PATCH user
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstName: "Updated Name",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  })

  // DELETE user
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  });

app.listen(PORT, () => {
  console.log("server is running...", PORT);
});

/*
get All    -    await User.find({});
get by Id  -    await User.findById(req.params.id);
create     -    User.create({firstName: body.first_name,...})
update     -    User.findByIdAndUpdate(req.params.id, {firstName: "Updated Name"})
delete     -    User.findByIdAndDelete(req.params.id)
*/
