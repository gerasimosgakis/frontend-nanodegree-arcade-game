/*My comments
Players's height: 171
Player's width: 101

Bug's height: 171
Bug's width: 101

canvas.width = 505;
canvas.height = 606;
*/

var score = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x; //initial position
    this.y = y;
    this.speed = speed; //speed
    this.sprite = 'images/enemy-bug.png';
    //collision(this);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) {
      this.x = 0;
    }
    collision(this);
};

var collision = function(enemy) {
  if (player.x >= enemy.x-50 && player.x <= enemy.x+50
    && player.y >= enemy.y-55 && player.y <= enemy.y+55) {
    player.x = 203;
    player.y = 420;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  if (keyPress == 'left') {
    player.x -= player.speed;
  }
  if (keyPress == 'right') {
    player.x += player.speed;
  }
  if (keyPress == 'up') {
    player.y -= player.speed;
  }
  if (keyPress == 'down') {
    player.y += player.speed;
  }
  if (this.x <= -15) {
    this.x = -15;
  }
  if (this.x >= 420) {
    this.x = 420;
  }
  if (this.y <= 50) {
    this.x = 203;
    this.y = 420;
  }
  if (this.y >= 445) {
    this.y = 445;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (let i=0; i<3; i++) {
  allEnemies.push(new Enemy(0, Math.random()*280+50, Math.random()*200+50));
}

var player = new Player(203, 420, 10);

var divScore = document.createElement('div');
divScore.id="score";
divScore.style.background = "red";
divScore.style.height = "100px";
divScore.style.width = "100px";
document.body.appendChild(divScore);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
