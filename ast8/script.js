function Player()
{
    var self = this;
    self.$player = document.getElementById("player");
    self.carY = 0;
    self.carX = 0;

    self.update = function (direction)
    {
        if (direction === 1 && self.carX < 260)
        {
            self.carX += 110;


        } else if (direction === -1 && self.carX > 140)
        {
            self.carX += -110;

        }

        self.$player.style.left = self.carX + 'px';
    };

    self.initializeCar = function ()
    {
        self.carY = 500;
        self.carX = 150;
        self.$player.style.top = self.carY + 'px';
        self.$player.style.left = self.carX + 'px';
    };
}

function Bullet(props)
{
    var self = this;
    self.player = props.player;
    self.gamecontainer = props.gamecontainer;
    self.bulletY = 0;
    self.bulletX = 0;
    
    var $bullet = document.createElement("div");

    self.createbullet = function ()
    {
        
        console.log("bulletinside");
        $bullet.className = "bullets";
        console.log($bullet);
        self.bulletX = self.player.carX + 46;
        self.bulletY = self.player.carY;
        $bullet.style.left = self.bulletX + "px";
        $bullet.style.top = self.bulletY + "px";
        self.gamecontainer.appendChild($bullet);
    };
    
    self.updateBullet = function (speed) {
        var pos = self.bulletY - speed;
        self.bulletY = pos;
        $bullet.style.top = self.bulletY + "px";
    };
    
    self.deleteBullet = function()
    {
        self.gamecontainer.removeChild($bullet);
    };
}

function Looper(props)
{

    var self = this;
    var bullets = [];
    var bulletcount = 0;
    var $gameContainer = props.main.gamecontainer;


    var player = props.player;
    var isRunning = false;
    var delay = props.delay || 15;
    var main = null;


    self.init = function ()
    {
        main = new Main(
                {
                    main: props.main,
                    player: player

                });
    };


    self.start = function ()
    {

        if (!isRunning)
        {
            isRunning = true;

            self.intervalRef = setInterval(
                    function () {

                        main.updateBackground();
                        main.createEnemies();
                        main.updateEnemies();
                        main.playerEnemiesCollison();
                        main.updateBullets(bullets);
                        bulletcount++;
                    }, delay);
        }
    };
    document.addEventListener('keydown', function (e)
    {
        console.log("space");
        if (e.keyCode === 32)
        {
            if (bulletcount >3)
            {
                var bullet = new Bullet(
                        {
                            player: player,
                            gamecontainer: $gameContainer
                        });
                bullet.createbullet();
                bullets.push(bullet);
                bulletcount=0;
            }

        }
    });

    self.init();
}

function Main(props)
{

    var self = this;
    var speed = props.speed || 1;
    var y = 0;
    self.bullets = 0;
    var enemy;
    var speedratio = 0;
    var player = props.player;
    var $player = props.$player;
    var enemies = [];
    self.count = 0;

    var $gameContainer = props.main.gamecontainer;


    self.updateBackground = function () {
        $gameContainer.style.backgroundPosition = "0px " + y + "px";
        y = y + speed;
        speedratio++;
    };


    self.createEnemies = function ()
    {

        self.count++;
        if (self.count > (80 - (speed * 1)))
        {

            enemy = new Enemy({$el: $gameContainer});
            enemies.push(enemy);
            enemy.createEnemy();
            self.count = 0;
        }

    };

    self.updateEnemies = function ()
    {
        for (var i = 0; i < enemies.length; i++)
        {

            enemies[i].updateEnemy(speed);
            if (enemies[i].y > 600)
            {

                enemies[i].deleteEnemy();
                enemies[i] = null;

            }

        }
        enemies = self.clearArray(enemies);
    };


    self.clearArray = function (enemies)
    {
        var temp = [];
        for (var i = 0; i < enemies.length; i++)
        {
            if (enemies[i] !== null)
            {
                temp.push(enemies[i]);
            }
        }

        return temp;
    };

    self.playerEnemiesCollison = function ()
    {
        enemies.forEach(function (oneenemy)
        {
            if ((Math.abs(oneenemy.x - player.carX)) < 100 && (Math.abs(oneenemy.y - player.carY) < 100))
            {
                alert("Collision");
            }
        });
    };


    self.reset = function ()
    {
        var temp_enemys = enemies;
        for (var i = 0; i < temp_enemys.length; i++)
        {
            temp_enemys[i].deleteEnemy();
            temp_enemys[i] = null;
        }
        enemies = self.clearArray(temp_enemys);
        console.log(enemies);

        var temp_bullets = self.bullets;
        for (var y = 0; y < temp_bullets.length; y++)
        {
            if (temp_bullets[y] !== null)
            {
                temp_bullets[y].deleteBullet();
                temp_bullets[y] = null;
            }

        }
        self.bullets = self.clearBulletArray(temp_bullets);
        console.log(self.bullets);
        y=0;
        speed = 0;
        resetGame();
    };

    self.bulletEnemiesCollision = function (oneenemy, bullet)
    {

        if (bullet !== null)
        {
            if ((Math.abs(oneenemy.y - bullet.bulletY)) < 100 && ((oneenemy.x < bullet.bulletX) && (oneenemy.x + 100 > bullet.bulletX)))
            {

                return true;

            }
        }


    };


    self.updateBullets = function (bullets)
    {
        self.bullets = bullets;
        for (var i = 0; i < bullets.length; i++)
        {
            if (bullets[i] !== null)
            {
                bullets[i].updateBullet(10);

                enemies.forEach(function (enemy)
                {

                    if (self.bulletEnemiesCollision(enemy, bullets[i]))
                    {

                        enemy.health -= 1;
                        if (enemy.health === 0)
                        {
                            enemy.deleteEnemy();
                            enemies.splice(enemies.indexOf(enemy), 1);

                        }
                        bullets[i].deleteBullet();
                        bullets[i] = null;

                    }
                });

                if (bullets[i] !== null)
                {
                    if (bullets[i].bulletY < 0)
                    {

                        bullets[i].deleteBullet();
                        bullets[i] = null;
                    }
                }

            }

        }

        bullets = self.clearBulletArray(bullets);
    };

    self.clearBulletArray = function (bullets)
    {

        var temp = [];
        for (var i = 0; i < bullets.length; i++)
        {
            if (bullets[i] !== null)
            {

                temp.push(bullets[i]);
            }
        }

        return temp;
    };

}



function Enemy(props)
{
    var self = this;
    var $parent = props.$el;
    self.x = 0;
    self.y = -100;
    self.dy = 0;
    self.health = 3;
    self.elem = document.createElement('div');

    self.createEnemy = function () {

        self.elem.className = "enemy";
        self.x = randomX();
        self.elem.style.left = self.x + "px";
        self.elem.style.top = self.y + "px";
        $parent.appendChild(self.elem);
    };

    self.updateEnemy = function (speed) {
        self.dy = speed;
        self.y = self.y + self.dy;
        self.elem.style.top = self.y + "px";
    };


    self.deleteEnemy = function () {

        $parent.removeChild(self.elem);
    };


    function randomX()
    {
        var random = Math.random();
        if (random >= 0 && random < 0.33)
        {
            return 40;
        } else if (random >= 0.33 && random < 0.66)
        {
            return (150);
        } else
        {
            return (260);
        }
    }

}

function resetGame()
{
    var $gameContainer = document.getElementById("gameContainer");
    
    var $player = new Player();
    $player.initializeCar();

    var looper = new Looper(
            {
                delay: 10,
                main:
                        {
                            gamecontainer: $gameContainer
                           
                        },
                player: $player
            });

    looper.start();

    document.addEventListener('keydown', function (e)
    {

        if (e.key === "Escape")
        {

            looper.pause();

        }

        if (e.key === "R" || e.key === "r") {

            looper.resume();

        }
        if (e.key === "ArrowRight")
        {
            console.log("right");
            $player.update(1);

        }
        if (e.key === "ArrowLeft")
        {
            console.log("left");
            $player.update(-1);

        }
      


    });
}

resetGame();