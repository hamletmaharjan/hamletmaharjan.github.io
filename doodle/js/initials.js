const canvas = document.getElementById('myGame');
let directionalShooting = localStorage.getItem("directionalShooting") || "off";
let sounds = localStorage.getItem("sounds") || "on";
const canvasWidth = 400;
const canvasHeight = 657;