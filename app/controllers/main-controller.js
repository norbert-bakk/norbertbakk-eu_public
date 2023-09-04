const qr = require("qr-image");
const path = require("path");
const fs = require("fs");

const homeController = async (req, res) => {
    res.render("index", {pageTitle: "norbert bakk: homepage"});  
};

const portfolioController = async (req, res) => {
    res.render("portfolio", {pageTitle: "norbert bakk: portfolio"});
};

const aboutController = async (req, res) => {
    res.render("about", {pageTitle: "norbert bakk: about me"});
};

const experienceController = async (req, res) => {
    res.render("experience", {pageTitle: "norbert bakk: experience"});
};

const portfQrCodeController = async (req, res) => {
    res.render("portfolio/qr-code-generator");
};

const generateQRCode = async (req, res) => {
    const url = req.body.url;
    console.log(url);
    
    const qr_png = qr.imageSync(url, { type: "png"});

    const qrPath = (path.join(__dirname, "..", "public", "images", "portfolio-resources", "qr-code-res", "generated-qr-image", "qr-img.png"));
    fs.writeFileSync(qrPath, qr_png);

    res.status(200).json({ message: "POST request successful", qrPath: "/images/portfolio-resources/qr-code-res/generated-qr-image/qr-img.png" });
};


const portfSimonController = async (req, res) => {
    res.render("portfolio/simon-game");
};

const portfWeatherAppController = async (req, res) => {
    res.render("portfolio/weather-app");
};

// API key route for the weather app
const fetchWeatherAppAPIKey = async (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
};

const portfDrumkitController = async (req, res) => {
    res.render("portfolio/drumkit");
};

module.exports = {
    homeController,
    portfolioController,
    aboutController,
    experienceController,
    portfQrCodeController,
    generateQRCode,
    portfSimonController,
    portfWeatherAppController,
    portfDrumkitController,
    fetchWeatherAppAPIKey
};