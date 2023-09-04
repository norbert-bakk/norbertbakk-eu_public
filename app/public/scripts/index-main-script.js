/*
import { ExpiringLocalStorage } from "./popup-user-status.js";
var expiringStorage = new ExpiringLocalStorage();
*/
$(document).ready(function() {

  const textElement = $(".welcoming-text");
  const text = textElement.html();
  textElement.empty();
  let i = 0;
  const speed = 30;

  const menuOptions = $(".menu-option");
  const subMenuOptions = $(".smenu-option");

  menuOptions.add(subMenuOptions).on("mouseenter", function() {

    if (!$(this).hasClass("locked")) {
      PlayMenuSound();
    }

  });

  function typeWriter() {
    if (i < text.length) {
      if (text.charAt(i) === "<") {
        const tagEndIndex = text.indexOf(">", i);
        textElement.append(text.slice(i, tagEndIndex + 1));
        i = tagEndIndex + 1;
      } else {
        textElement.append(text.charAt(i));
        i++;
      }
      setTimeout(typeWriter, speed);
    } else {
      // after text typing is complete, adding the blinking cursor at the end
      textElement.append("<span class='blinking-cursor'>_</span>");
    }
  }

  function PlayMenuSound() {
    const thissound = new Audio("sounds/hover_sound1.mp3");
    thissound.volume = 0.07;
    thissound.play();
  }

  // index popup logic
  /*
  function ShowIndexPopup(){
    if (localStorage.getItem("popupDisabled") !== "true") {
      $(".popup-container").show();
    }
  }
  */

  /*
  $("#dontShowAgainFlag").on("click", function() {
    expiringStorage.setItemWithExpiration("popupDisabled", "true", 1);
    var retrievedData = expiringStorage.getItem("popupDisabled");
    console.log(retrievedData);
    $(".popup-container").hide();
  });
  */

  typeWriter();

});
