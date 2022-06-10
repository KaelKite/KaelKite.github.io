/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  //Controls
  var KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
  }
  var WASD = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  }
  //Position of the circle on the x and y axis
  var positionX = 0;
  var positionY = 0;
  var playerX = 0;
  var playerY = 0;
  //Speed of the circle on the x and y axis
  var speedX = 0;
  var speedY = 0;
  var playerSpeedX = 0;
  var playerSpeedY = 0;


  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  $(document).on('keydown', handleKeyDown2);
  $(document).on('keyup', handleKeyUp2);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {    
    repositionGameItem();
    redrawGameItem();    
    repositionGameItem2(); 
    redrawGameItem2();
    
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
      if (event.which === KEY.LEFT){
      speedX = -5;
    }
    else if (event.which === KEY.RIGHT){
      speedX = 5;
    }
    else if (event.which === KEY.UP){
      speedY = -5;
    }
    else if (event.which === KEY.DOWN){
      speedY = 5;
    }
  }
  function handleKeyUp (event){
    if (event.which === KEY.LEFT){
      speedX = 0;
    }
    else if (event.which === KEY.RIGHT){
      speedX = 0;
    }
    else if (event.which === KEY.UP){
      speedY = 0;
    }
    else if (event.which === KEY.DOWN){
      speedY = 0;
    }
  }
  function handleKeyDown2(event){
    if (event.which === WASD.A){
      playerSpeedX = -5;
    }
    else if (event.which === WASD.D){
      playerSpeedX = 5;
    }
    else if (event.which === WASD.W){
      playerSpeedY = -5;
    }
    else if (event.which === WASD.S){
      playerSpeedY = 5;
    }
  }
  function handleKeyUp2 (event){
    if (event.which === WASD.A){
      playerSpeedX = 0;
    }
    else if (event.which === WASD.D){
      playerSpeedX = 0;
    }
    else if (event.which === WASD.W){
      playerSpeedY = 0;
    }
    else if (event.which === WASD.S){
      playerSpeedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

 function repositionGameItem(){
  positionX += speedX;
  positionY += speedY;
 }
 function repositionGameItem2(){
  playerX += playerSpeedX;
  playerY += playerSpeedY;
 }
 function redrawGameItem(){
  $("#walker").css("left", positionX);
  $("#walker").css("top", positionY);
 }
 function redrawGameItem2(){
  $("#player2").css("left", playerX);
  $("#player2").css("top", playerY);
 }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
