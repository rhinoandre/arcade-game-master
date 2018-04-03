// Enemies our player must avoid
const Enemy = (function () {

    function Enemy(y, line) {
        this.bugSize = 171;
        this.x = ~this.bugSize; //~ operator do (n+1)*-1
        this.y = y;
        this.line = line;
        this.speed = newSpeed();
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    };
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function (dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (isBugReachFinal(this.x)) {
            this.x = ~this.bugSize;
            this.speed = newSpeed();
        }
    };

    function newSpeed() {
        return Math.random() * 200 + 100;
    }

    function isBugReachFinal(x) {
        return x > 505
    }

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function (canvasContext) {
        canvasContext.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    return Enemy;
})();


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = (function () {
    function Player() {
        this.x = 204;
        this.y = 380;
        this.line = 0;
        this.points = 0;
        this.multiplier = 1;
        this.collided = false;
        this.sprite = 'images/char-horn-girl.png';
    }

    // I actually don't have a clu what this method is for
    Player.prototype.update = function () { }

    Player.prototype.render = function (canvasContext) {
        canvasContext.drawImage(Resources.get(this.sprite), this.x, this.y);
        canvasContext.fillText(`Points: ${this.points}`, 0, 20);
        canvasContext.fillText(`Multiplier: x${this.multiplier}`, 0, 40);
    }

    Player.prototype.handleInput = function (key) {
        if (key === 'up' && this.line !== 5) {
            this.y -= 80;
            this.line++;
            handlePoints(this);
        } else if (key === 'down' && this.line !== 0) {
            this.y += 80;
            this.line--;
        } else if (key === 'left' && !(this.x <= 4)) {
            this.x -= 100;
        } else if (key === 'right' && !(this.x >= 404)) {
            this.x += 100;
        }
    }

    // Apply the penalities for collision
    Player.prototype.handleCollision = function () {
        // Decrease the points * 2
        player.points -= 40;
        if (player.points < 0) {
            player.points = 0;
        }
        // Restart the multiplier
        player.multiplier = 1;
        player.reset();
    }

    // Reset all Player attributes
    Player.prototype.reset = function () {
        this.x = 204;
        this.y = 380;
        this.line = 0;
        this.collided = false;
    }

    /**
     * Private functions
     */
    function handlePoints(player) {
        if (player.line === 5) { // Player wins
            // Increase the points
            player.points += 20 * player.multiplier;
            // Increase the multiplier
            player.multiplier++;
            // Reset the game after 1s
            setTimeout(() => player.reset(), 1000);
        }
    }

    return Player;
})();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const allEnemies = [
    new Enemy(60, 4),
    new Enemy(60, 4),
    new Enemy(143, 3),
    new Enemy(143, 3),
    new Enemy(225, 2),
    new Enemy(225, 2)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
