$(document).ready(function() {
  // Function to handle showing a portfolio popup
  function showPortfolioPopup(cardId, popupId, demoUrl) {
    const card = $(cardId);
    const popup = $(popupId);
    const liveDemo = $(`${popupId}-demo`);

    card.on("click", function() {
      popup.addClass("show");
    });

    liveDemo.on("click", function() {
      window.location.href = demoUrl;
    });
  }

  // QR Code Generator
  showPortfolioPopup("#portfolio-qr-card", "#portfolio-popup-qr", "portfolio/qr-code-generator");
  // UMD
  showPortfolioPopup("#portfolio-umd-card", "#portfolio-popup-umd", "portfolio/umd");
  // Weather App
  showPortfolioPopup("#portfolio-weatherapp-card", "#portfolio-popup-weatherapp", "portfolio/weather-app");
  // Simon Game
  showPortfolioPopup("#portfolio-simon-card", "#portfolio-popup-simon", "portfolio/simon-game");
  // Drumkit
  showPortfolioPopup("#portfolio-drumkit-card", "#portfolio-popup-drumkit", "portfolio/drumkit");
  // Personal website
  showPortfolioPopup("#portfolio-personal-website-card", "#portfolio-popup-personal-website", "https://github.com/norbert-bakk/norbertbakk-eu_public");
  // Road Ahead
  showPortfolioPopup("#portfolio-road-ahead-card", "#portfolio-popup-road-ahead", null);
});
