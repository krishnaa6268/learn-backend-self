import express from "express";
import users from "./MOCK_DATA.json" with { type: "json" };
import fs from "fs";

const app = express();
const PORT = 8000;

// middleware - plugin *******
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Middleware executed for M1", req.url);
  // return res.json("Middleware M1 response");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware executed for M2", req.url);
  // return res.json("Middleware M2 response");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware executed for M3", req.url);
  fs.appendFile('./logs.txt',`${new Date().toISOString()} - ${req.method} ${req.path}\n`, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
  next();
})

// 1st way-
app.get("/usersraw", (req, res) => {
  const html = `
  <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>`;
  return res.send(html);
});

// 2nd way- SSR *******
import path from "path";
app.get("/users", (req, res) => {
  res.sendFile(path.resolve("./dummy.html"));
});

// REST APIs
app.get("/api/users", (req, res) => {
  // console.log("----", req.ip);
  res.setHeader("X-MyName", "Krishnaa");
  // always add X to custom header to avoid conflict with standard headers
  return res.json(users);
  // return res.send("Hyy m2 chip");
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("Body: ", body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "pending", id: users.length });
  });
});

//-Dynamic Path Paremeter--
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   return res.json(user);
// });

// app.patch("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   console.log("todo: edit user with id");
//   return res.json({ status: "pending" });
// });

// app.delete("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   console.log("todo: delete user with id");
//   return res.json({ status: "pending" });
// });

// route /api/users/:id  is used multi place use DRY*******...
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  })
  // PATCH user
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users[index] = { ...users[index], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ error: "Update failed" });

      return res.json(users[index]);
    });
  })

  // DELETE user
  .delete((req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ error: "Delete failed" });

      return res.json(deletedUser[0]);
    });
  });

app.listen(PORT, () => {
  console.log("server is running...", PORT);
});
