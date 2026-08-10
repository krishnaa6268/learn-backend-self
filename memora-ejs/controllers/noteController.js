import noteModel from "../models/note.js";

async function getHomePage(req, res) {
  try {
    const notes = await noteModel.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.render("home", { notes, user: req.user });
  } catch (error) {
    return res.render("home", { notes: [], user: req.user, msg: "Failed to fetch notes." });
  }
}

async function getNotes(req, res) {
  return getHomePage(req, res);
}

async function createNote(req, res) {
  const { title, content } = req.body;
  if (!title || !content) {
    const notes = await noteModel.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.render("home", { notes, user: req.user, msg: "Title and content are required." });
  }

  try {
    await noteModel.create({
      title,
      content,
      createdBy: req.user._id,
    });
    return res.redirect("/");
  } catch (error) {
    const notes = await noteModel.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.render("home", { notes, user: req.user, msg: "Something went wrong saving your note." });
  }
}

async function showEditNote(req, res) {
  try {
    const note = await noteModel.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!note) {
      return res.redirect("/");
    }

    return res.render("editNote", { note, user: req.user });
  } catch (error) {
    return res.redirect("/");
  }
}

async function updateNote(req, res) {
  const { title, content } = req.body;

  try {
    await noteModel.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id,
      },
      { title, content },
      { runValidators: true },
    );
  } catch (error) {
    console.error("Update note error:", error);
  }

  return res.redirect("/");
}

async function deleteNote(req, res) {
  try {
    await noteModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
  } catch (error) {
    console.error("Delete note error:", error);
  }

  return res.redirect("/");
}

export {
  createNote,
  deleteNote,
  getHomePage,
  getNotes,
  showEditNote,
  updateNote,
};
