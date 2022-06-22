/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  //paddle controls
  var KEY = {
    UP: 38,
    DOWN: 40,
  }
  var WS = {
    W: 87,
    S: 83,
  }

  
  // Game Item Objects
  function GameItem(elementId) {
    var gameItem = {};
    gameItem.id = elementId;
    gameItem.x = parseFloat($(elementId).css('left'));
    gameItem.y = parseFloat($(elementId).css('top'));
    gameItem.width = $(elementId).width();
    gameItem.height = $(elementId).height();
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    return gameItem;
    }

    var ball = GameItem("#ball")
    var player1 = GameItem("#player1")
    var player2 = GameItem("#player2")

    var score1 = $("#score1");
    var score2 = $("#score2");
    score1.score = 0;
    score2.score = 0;
    //var board = GameItem("#board")
    
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)                           
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  $(document).on('keydown', handleKeyDown2);
  $(document).on('keyup', handleKeyUp2);
  startBall();

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
    repositionBall();
    redrawBall();
    wallCollision();
    scoring();
    if (doCollide(ball, player1)){
      ball.speedX *= -1
    }
    if (doCollide(ball, player2)){
      ball.speedX *= -1
    }
    if (score1.score >= 11){
      endGame();
    }
    if (score2.score >= 11){
      endGame();
    }
  }

  

  
  function handleKeyDown(event) {
    var keycode = event.which;
    console.log(keycode);
     if (event.which === KEY.UP){
      player2.speedY = -5;
    }
    else if (event.which === KEY.DOWN){
      player2.speedY = 5;
    }
  }
  function handleKeyUp (event){
     if (event.which === KEY.UP){
      player2.speedY = 0;
    }
    else if (event.which === KEY.DOWN){
      player2.speedY = 0;
    }
  }
  function handleKeyDown2(event) {
    var keycode = event.which;
    console.log(keycode);
     if (event.which === WS.W){
      player1.speedY = -5;
    }
    else if (event.which === WS.S){
      player1.speedY = 5;
    }
  }
  function handleKeyUp2(event){
    if (event.which === WS.W){
      player1.speedY = 0;
   }
   else if (event.which === WS.S){
    player1.speedY = 0;
   }
 }
 
  /* 
  Called in response to events.
  */
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function doCollide(square1, square2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    square1.leftX = square1.x;
    square1.rightX = square1.x + square1.width;
    square1.topY = square1.y;
    square1.bottomY = square1.y + square1.height; 
    // TODO: Do the same for square2
    square2.leftX = square2.x;
    square2.rightX = square2.x + square2.width;
    square2.topY = square2.y;
    square2.bottomY = square2.y + square2.height;
    // TODO: Return true if they are overlapping, false otherwise
	var result = ((square1.leftX < square2.rightX && square1.rightX > square2.leftX &&
        square1.topY < square2.bottomY && square1.bottomY > square2.topY) ? true : false); 
	
    return result;
}

  function scoring(){
    if (ball.x > BOARD_WIDTH) {
      score1.score += 1;
      startBall();
    }
    else if (ball.x < 0) {
      score2.score += 1;
      startBall();
    }
  $("#score1").text(score1.score);
  $("#score2").text(score2.score);
 }

  function wallCollision(){
    if (ball.x > BOARD_WIDTH){
      ball.speedX *= -1
    }
    else if (ball.x < 0){
      ball.speedX *= -1
    }
    else if (ball.y > BOARD_HEIGHT){
        ball.speedY *= -1
    }
    else if (ball.y < 0){
      ball.speedY *= -1
    }
    if (player1.y > BOARD_HEIGHT){
      player1.speedY *= -1
    }
    else if (player1.y < 0){
      player1.speedY *= -1
    }
    if (player2.y > BOARD_HEIGHT){
      player2.y *= -1
    }
    else if (player2.y < 0){
      player2.y *= -1
    }
    
    }
  function startBall(){
  $("#ball").css("left", ball.x);
  $("#ball").css("top", ball.y);
  ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  ball.x = 220;
  ball.y = 220;
 }
 function repositionBall(){
  ball.x += ball.speedX
  ball.y += ball.speedY
 }
 function redrawBall(){
   $("#ball").css("left", ball.x);
   $("#ball").css("top", ball.y);
 }
  function repositionGameItem(){
    player1.y += player1.speedY;
   }
   function repositionGameItem2(){
    player2.y += player2.speedY;
   }

   function redrawGameItem(){
    $("#player1").css("top", player1.y);
   }
   function redrawGameItem2(){
    $("#player2").css("top", player2.y);
   }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}