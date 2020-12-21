/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
    //Inputs
    var KEY =
  {
    "UP": 87,
    "DOWN": 83,

    //Player two keys
    "UP2": 38,
    "DOWN2": 40,
    //TEST
    "P": 80,
  }
  //Other vars
  var speedIncrese = 1.3;
  var points = 0;
  var points2 = 0;
  
  // Game Item Objects
  function CreateGameItem($elementId, x, y, speedX, speedY, width, height)
{
  var gameItem = {};
  gameItem.id = $elementId;
  gameItem.x = x;
  gameItem.y = y;
  gameItem.speedX  = speedX;
  gameItem.speedY = speedY;
  gameItem.width =  width;
  gameItem.height =  height;
  
}
  //Paddle1
    var paddle = CreateGameItem("paddle", 10, 0, 0, 0, 30, 150);
   /* paddle.id = "#paddle"
    paddle.x = 10;
    paddle.y = 0;
    paddle.speedX = 0;
    paddle.speedY = 0;*/



    //Paddle2
    var paddle2 = CreateGameItem("paddle2", 400, 291, 0, 0, 30, 150);
    /*paddle2.id = "#paddle2"
    paddle2.x = 400;
    paddle2.y = 291;
    paddle2.speedX = 0;
    paddle2.speedY = 0;*/

    //Ball
    var ball = CreateGameItem("ball", 210, 210, 1, 1, 15, 15);
   /* ball.id = "#ball"
    ball.x = 210;
    ball.y = 210;
    ball.speedX = 1;
    ball.speedY = 1;*/




  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown)
  $(document).on('keyup', handleKeyUp)                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //Paddle things
    repositionPaddle();
    repositionPaddle2();
    MaxPaddlePosX(paddle);
    MaxPaddlePosX(paddle2);
    //colision
    DoCollide(paddle2, ball);
    DoCollide(paddle, ball);
    YBounds(ball);
    ScorePoint(ball);
    //Handle endGame
    GameOver();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //Paddle1
    if(event.which === KEY.UP)
    {
        paddle.speedY = -5;
    }
    if (event.which === KEY.DOWN)
    {
        paddle.speedY = 5;
    }
    //Paddle2
    if(event.which === KEY.UP2)
    {
        paddle2.speedY = -5;
    }
    if (event.which === KEY.DOWN2)
    {
        paddle2.speedY = 5;
    }
    if(event.which === KEY.P)
    {
        points2 += 2;
    }
  }

  //Handles keyUp events
  function handleKeyUp(event)
  {
    //Paddle1
    if(event.which === KEY.UP)
    {
       paddle.speedY = 0;
    }
    if (event.which === KEY.DOWN)
    {
        paddle.speedY = 0;
    }

    //Paddle2
    if(event.which === KEY.UP2)
    {
       paddle2.speedY = 0;
    }
    if (event.which === KEY.DOWN2)
    {
        paddle2.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //Animation?? I dont know what I should call this yet

  //repositions our paddle
 function repositionPaddle()
 {
    //paddle 1 movement
    $("#paddle").css("top", paddle.y);
    paddle.y += paddle.speedY;
 }
 //paddle2
 function repositionPaddle2()
 {
    //paddle2 movement
    $("#paddle2").css("top", paddle2.y);
    paddle2.y += paddle2.speedY;
 }

 //Ball
 function repositionBall()
 {
    //ball
    $("#ball").css("top", ball.y)
    $("#ball").css("left", ball.x)
    ball.y += ball.speedY;
    ball.x += ball.speedX;
 }
  
 //Collisions wow
 function DoCollide(obj1, obj2)
 {
    //obj1
    obj1.right = obj1.x + obj1.width;
    obj1.botom = obj1.y + obj1.height;
    obj1.left = obj1.x;
    obj1.top = obj1.y;
    
    //obj2
    obj2.right = obj2.x + obj2.width;
    obj2.botom = obj2.y + obj2.height;
    obj2.left = obj2.x;
    obj2.top = obj2.y;
    //if the objs collide
    if(obj1.right > obj2.left && obj1.left < obj2.right && obj1.top > obj2.botom && obj1.botom < obj2.top)
    {
        ball.speedY = ball.speedY * speedIncrese;
        ball.speedX = ball.speedX * speedIncrese;
        ball.speedX = -ball.speedX;
        //ball.speedY = -ball.speedY;
        //For debug reasons, also the amime is pretty good
        console.log("Berserk is pretty cool");
    }
 }
 //Come mack to this
 function YBounds(obj)
 {
    if(obj.y < 1 || obj.y > 430)
    {
        ball.speedY = -ball.speedY;
    }
 }
//Handles paddle boundrys
 function MaxPaddlePosX(obj)
 {
    if(obj.y > 290)
    {
        obj.y = 290;
    }
    if(obj.y < 1)
    {
        obj.y = 1;
    }
 }
 //Restarts paddle and ball pos
 function Restart()
 {
    paddle.x = 10;
    paddle.y = 0;
    paddle2.x = 400;
    paddle2.y = 291;
    ball.speedX = 1;
    ball.speedY = 1;
    ball.x = 210;
    ball.y = 210;
    BallStartPosition()
    console.log("New Game");
 }
 //When You dunck on an enemy
 function ScorePoint(obj)
 {
    if(obj.x > 440)
    {
        AddPoints();
        Restart();
    }
    if(obj.x < 1)
    {  
        AddPoints2();
        Restart();
    }
 }
 //Comments save lives but not this one
 function AddPoints()
 {
    points += 1;
    $("#score").text(points);
 }
 function AddPoints2()
 {
    points2 += 1;
    $("#score2").text(points2);
 }
 //Changes ball starting Pos
 function BallStartPosition()
 {
   var randomNum = Math.floor(Math.random()*2)
   if(randomNum == 0)
   {
       ball.speedX = -ball.speedX;
       ball.speedY = -ball.speedY;
   }
   if(randomNum == 1)
   {
       ball.speedX = Math.abs(ball.speedX);
       ball.speedY = Math.abs(ball.speedY);
   }
   console.log(randomNum);
 }
 //Simply ends the game... nice
 function GameOver()
 {
    if(points > 10 || points2 > 10)
    {
        endGame();
    }
 }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

    //GameOver Message
    $("#GameOver").css("opacity", 100)
  }
}