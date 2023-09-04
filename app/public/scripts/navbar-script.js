$(document).ready(function() {

  const $toggleButton = $(".navbar-toggle");
  const $navbarLinks = $(".navbar-links");

  $toggleButton.click(function() {
      $navbarLinks.toggleClass("active");
  });

  $("#homeNav").on("click", function() {
    window.location.href = "/";
  });

  $("#portfolioNav").on("click", function() {
    window.location.href = "/portfolio";
  });

  $("#socialsNav").on("click", function() {
    $("#socialsNavPopupContainer").addClass("show");
  });

  $("#contactNav").on("click", function() {
    $("#contactNavPopupContainer").addClass("show");
  });

  $("#aboutNav").on("click", function() {
    window.location.href = "/about";
  });

  $("#expNav").on("click", function() {
    window.location.href = "/experience";
  });

  let prevScrollPos = window.scrollY;
  const navbar = $("#navbar");

  /* disabled hide navbar funcitonality - might reuse later
  $(window).scroll(function() {
    const currentScrollPos = window.scrollY;
    
    if (prevScrollPos > currentScrollPos) {
      navbar.addClass("visible");
      navbar.removeClass("hidden");
    } else {
      navbar.addClass("hidden");
      navbar.removeClass("visible");
    }
    
    prevScrollPos = currentScrollPos;
  });
  */

});
