$(document).ready(function() {

// contact me variable + html embedded
var contactInfo = `
┌─────────────────────────────────┐
| Norbert Bakk                    |
| Email: bakknorbert@outlook.com  |
└─────────────────────────────────┘`;
$("#contact-card").html(`<pre>` + contactInfo + `</pre>`);
// contact me variable end

    // menu object variables
    // main menu
    const mainMenu = $(".main-menu")
    const portfolio = $("#portfolio");
    const experience = $("#experience");
    const socials = $("#socials");
    const contactMe = $("#contact-me");
    const aboutMe = $("#about-me");

    // submenu options
    const smSocials = $("#smenu-socials");

    // other objects
    const decPainting = $(".decorative-paiting");

    // menu options
    portfolio.on("click", function() {
        window.location.href = "/portfolio";
    });

    experience.on("click", function() {
        window.location.href = "/experience";
    });

    aboutMe.on("click", function() {
        window.location.href = "/about";
    });

    // submenu socials option
    socials.on("click", function() {
        mainMenu.hide();
        smSocials.show();
    });

    $("#socials-back-btn").on("click", function() {
        smSocials.hide();
        mainMenu.show();
    });
    
    // contact me submenu option
    $("#contact-card").html(`<pre>` + contactInfo + `</pre>`);

    $("#contact-me").on("click", function() {
        mainMenu.hide();
        $(".smenu-contact-me").show();
    });

    $("#contactme-back-btn").on("click", function() {
        $(".smenu-contact-me").hide();
        mainMenu.show();
    });

    // menu pictures 
    portfolio.on("mouseover", function (){
        decPainting.attr("src", "images/arts/knight_coding.png");
    });
    experience.on("mouseover", function (){
        decPainting.attr("src", "images/arts/knight_reading_a_book.png");
    });
    socials.on("mouseover", function (){
        decPainting.attr("src", "images/arts/socials.png");
    });
    contactMe.on("mouseover", function (){
        decPainting.attr("src", "images/arts/self_painting_2.png");
    });
    aboutMe.on("mouseover", function (){
        decPainting.attr("src", "images/arts/self_painting.png");
    });

});