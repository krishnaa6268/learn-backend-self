import express from "express";
import {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} from "../controllers/user.js";

const router = express.Router();

// REST APIs
// router.get("/users", async (req, res) => {
//   const allUsers = await User.find({});
//   const html = `<ul>
//     ${allUsers.map((user) => `<li>${user.firstName} ${user.lastName} - ${user.email} - ${user.gender} - ${user.jobTitle}</li>`).join("")}
//   </ul>`;
//   return res.send(html);
// });

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

export default router;

/*
get All    -    await User.find({});
get by Id  -    await User.findById(req.params.id);
create     -    User.create({firstName: body.first_name,...})
update     -    User.findByIdAndUpdate(req.params.id, {firstName: "Updated Name"})
delete     -    User.findByIdAndDelete(req.params.id)

Handlres (.get, .post, .patch...) are controllers and they are responsible for handling the request and response. They contain the business logic of the application. They interact with the database and return the response to the client.
*/
