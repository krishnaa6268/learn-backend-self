import { User } from "../models/user.js";

async function handleGetAllUsers(req, res) {
  res.setHeader("X-MyName", "Krishna Gupta");
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    firstName: "Updated Name",
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
}
async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
}

async function handleCreateNewUser(req, res) {
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
  return res
    .status(201)
    .json({ msg: "User created successfully", id: result._id });
}

export {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
