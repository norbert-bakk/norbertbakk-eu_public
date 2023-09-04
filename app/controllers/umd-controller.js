const User = require("../models/userModel");
const multer = require("multer");
const fs = require("fs");

// uploading the image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "app/public/images/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");

// Creating a new user
async function createUser(req, res) {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });

    await user.save();

    req.session.message = {
      type: "success",
      message: "User successfully added!",
    };
    res.redirect("/portfolio/umd");
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
}

// Getting all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find().exec();
    res.render("umd/umd-index", {
      pageTitle: "User Management Dashboard",
      users: users,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
}

// Rendering the add user page
function renderAddUserPage(req, res) {
  res.render("umd/add-user", { pageTitle: "Add User" });
}

// Editing user
async function editUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      res.json({ message: "User not found!" });
      return res.redirect("/portfolio/umd");
    }

    res.render("umd/edit-user", {
      pageTitle: "Edit User",
      user: user,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
}

// Updating a user
async function updateUser(req, res) {
  try {
    const id = req.params.id;
    let newImage = "";

    if (req.file) {
      newImage = req.file.filename;
      try {
        fs.unlinkSync(`app/public/images/uploads/${req.body.oldImage}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      newImage = req.body.oldImage;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: newImage,
      },
      { new: true }
    );

    if (!updatedUser) {
      res.json({ message: "User not found!" });
      return res.redirect("/portfolio/umd");
    }

    req.session.message = {
      type: "success",
      message: "User successfully updated!",
    };

    res.redirect("/portfolio/umd");
  } catch (error) {
    res.json({ message: error.message, type: "danger" });
  }
}

// Deleting a user
async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.json({ message: "User not found!", type: "danger" });
    }

    if (user.image !== "") {
      try {
        fs.unlinkSync(`app/public/images/uploads/${user.image}`);
      } catch (error) {
        console.error(error);
      }
    }

    await User.findByIdAndDelete(id);

    req.session.message = {
      type: "info",
      message: "User successfully deleted!",
    };
    res.redirect("/portfolio/umd");
  } catch (error) {
    res.json({ message: error.message, type: "danger" });
  }
}

module.exports = {
  upload,
  createUser,
  getAllUsers,
  renderAddUserPage,
  editUser,
  updateUser,
  deleteUser,
};
