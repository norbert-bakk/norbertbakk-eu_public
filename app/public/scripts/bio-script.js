$(document).ready(function() {

  const birthYear = 1999;
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  document.getElementById("age").textContent = age;

});