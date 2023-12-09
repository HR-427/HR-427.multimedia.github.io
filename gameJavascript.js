// Create the canvas for the game to display in
var canvas = document.createElement("canvas");
canvas.style = "float:right;margin-right:30px;";
canvas.style.border = "10px solid #D7FFC4"; 
var ctx = canvas.getContext("2d");
canvas.width = 485;
canvas.height = 450;
document.body.appendChild(canvas);




function theGame()
{
  // Load the background image
  var bgReady = false;
  var bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "grass_background.png";


  // Load the player image
  var playerReady = false;
  var playerImage = new Image();
  playerImage.onload = function () {
    // show the player image
    playerReady = true;
  };
  playerImage.src = "player.png";

  // Load the enemy image
  var enemyReady = false;
  var enemyImage = new Image();
  enemyImage.onload = function () {
    // show the enemy image
    enemyReady = true;
  };
  enemyImage.src = "enemy.png";
  // Create the game objects
  var player = {
    speed: 100 // movement speed of player in pixels per second
  };
  var enemy = {};
  var enemiesCaught = 0;

  // Handle keyboard controls
  var keysDown = {};

  // Check for keys pressed where key represents the key pressed
  addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
  }, false);

  addEventListener("keyup", function (event) {
    delete keysDown[event.key];
  }, false);

  // Reset the player and enemy positions when player catches an enemy
  var reset = function () {
    // Reset player's position to centre of canvas
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;

    // Place the enemy somewhere on the canvas randomly
    enemy.x = enemyImage.width + (Math.random() * (canvas.width - (enemyImage.width*2)));
    enemy.y = enemyImage.height + (Math.random() * (canvas.height - (enemyImage.height*2)));
  };

  // Update game objects - change player position based on key pressed
  var update = function (modifier) {
    if ("w" in keysDown) { // Player is holding up key
      player.y -= player.speed * modifier;
    }
    if ("s" in keysDown) { // Player is holding down key
      player.y += player.speed * modifier;
    }
    if ("a" in keysDown) { // Player is holding left key
      player.x -= player.speed * modifier;
    }
    if ("d" in keysDown) { // Player is holding right key
      player.x += player.speed * modifier;
    }

    // Check if player and enemy collide
    if (
      player.x <= (enemy.x + enemyImage.width)
      && enemy.x <= (player.x + playerImage.width)
      && player.y <= (enemy.y + enemyImage.height)
      && enemy.y <= (player.y + playerImage.height)
    ) {
      ++enemiesCaught;
      reset();
    }
  };

  // Draw everything on the canvas
  var render = function () {
    if (bgReady) {
      ctx.drawImage(bgImage, 0, 0);
    }

    if (playerReady) {
      ctx.drawImage(playerImage, player.x, player.y);
    }

    if (enemyReady) {
      ctx.drawImage(enemyImage, enemy.x, enemy.y);
    }

    // Display score and time 
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Enemies caught: " + enemiesCaught, 20, 20);
    ctx.fillText("Time: " + count, 20, 50);
    // Display game over message when timer finished
    if(finished==true){
      ctx.fillText("Game over!", 200, 220);
    }

    
  };

  var count = 30; // how many seconds the game lasts for - default 30
  var finished = false;
  var counter =function(){
    count=count-1; // countown by 1 every second
    // when count reaches 0 clear the timer, hide enemy and player and finish the game
      if (count <= 0)
      {
        // stop the timer
        clearInterval(counter);
        // set game to finished
        finished = true;
        count=0;
        // hider enemy and player
        enemyReady=false;
        playerReady=false;
      }

  }

  // timer interval is every second (1000ms)
  setInterval(counter, 1000);

  // The main game loop
  var main = function () {
    // run the update function
    update(0.02); // do not change
    // run the render function
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
  };

  // Cross-browser support for requestAnimationFrame
  var w = window;
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

  // Let's play this game!
  reset();
  main();
}