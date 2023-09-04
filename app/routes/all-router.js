const express = require("express");
const router = express.Router();
// UMD constants
const {
  upload,
  createUser,
  getAllUsers,
  renderAddUserPage,
  editUser,
  updateUser,
  deleteUser,
} = require("../controllers/umd-controller.js");

// importing the necessary controllers
const controller = require("../controllers/main-controller.js");
const homeController = controller.homeController;
const portfolioController = controller.portfolioController;
const aboutController = controller.aboutController;
const experienceController = controller.experienceController;
const portfQrCodeController = controller.portfQrCodeController;
const generateQRCode = controller.generateQRCode;
const portfSimonController = controller.portfSimonController;
const portfWeatherAppController = controller.portfWeatherAppController;
const portfDrumkitController = controller.portfDrumkitController;
const fetchWeatherAppAPIKey = controller.fetchWeatherAppAPIKey;

// defining routes
router.get("/", homeController);
router.get("/portfolio", portfolioController);
router.get("/about", aboutController);
router.get("/experience", experienceController);
router.get("/portfolio/qr-code-generator", portfQrCodeController);
router.post("/api/generate-qr-code", generateQRCode);
router.get("/portfolio/simon-game", portfSimonController);
router.get("/portfolio/weather-app", portfWeatherAppController);
router.get("/portfolio/drumkit", portfDrumkitController);
router.get("/api/api-key", fetchWeatherAppAPIKey);

// UMD routes
// Main route: getting all users
router.get("/portfolio/umd", getAllUsers);
// Rendering the add user page
router.get("/portfolio/umd/add-user", renderAddUserPage);
// Editing user
router.get("/portfolio/umd/edit-user/:id", editUser);
// API route: creating a new user
router.post("/portfolio/umd/api/create-user", upload, createUser);
// API route: updating a user
router.post("/portfolio/umd/api/update-user/:id", upload, updateUser);
// API route: deleting a user
router.get("/portfolio/umd/api/delete-user/:id", deleteUser);

// 404 route
router.use((req, res) => {
  res.status(404).render("404", {pageTitle: "error: 404"});
});

module.exports = router;