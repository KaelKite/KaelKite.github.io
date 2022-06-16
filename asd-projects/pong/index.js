/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  //paddle controls
  var KEY = {
    UP: 38,
    DOWN: 40,
  }
  var WS = {
    W: 87,
    S: 83,
  }
  //Keydown/Keyup function
  function handleKeyDown(event) {
    var keycode = event.which;
    console.log(keycode);
     if (event.which === KEY.UP){
      speedY = -5;
    }
    else if (event.which === KEY.DOWN){
      speedY = 5;
    }
  }
  function handleKeyUp (event){
     if (event.which === KEY.UP){
      speedY = 0;
    }
    else if (event.which === KEY.DOWN){
      speedY = 0;
    }
  }
  function handleKeyDown2(event) {
    var keycode = event.which;
    console.log(keycode);
     if (event.which === WS.W){
      speedY = -5;
    }
    else if (event.which === WS.S){
      speedY = 5;
    }
  }
  function handleKeyUp2(event){
    if (event.which === WS.W){
     speedY = 0;
   }
   else if (event.which === WS.S){
     speedY = 0;
   }
 }
 
  // Game Item Objects
  function GameItem(elementId) {
    var gameItem = {};
    gameItem.id = elementId;
    gameItem.x = parseFloat($(elementId).css('left'));
    gameItem.y = parseFloat($(elementId).css('top'));
    gameItem.width = $(elementId).width();
    gameItem.height = $(elementId).height();
    gameItem.speedX = 5;
    gameItem.speedY = 5;
    return gameItem;
    }

    var obj = GameItem("#ball")
    var obj1 = GameItem("#player1")
    var obj2 = GameItem("#player2")
    
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)                           
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
  function handleEvent(event) {

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
    $("#player1").css("left", positionX);
    $("#player1").css("top", positionY);
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
