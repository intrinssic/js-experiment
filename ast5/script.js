//bouncing ball

var $box=document.getElementById("box");

var $movingballr= document.createElement('div');
$movingballr.className="ballr";
$box.appendChild($movingballr);

var $movingballb= document.createElement('div');
$movingballb.className="ballb";
$box.appendChild($movingballb);

var speed=20;
var ballr={
    height: $movingballr.clientHeight,
    width: $movingballr.clientWidth,
    x: parseInt(Math.random()*500),
    y: parseInt(Math.random()*500),
    dx:parseInt((Math.random()*1)>0.5)?'1':'-1',
    dy:parseInt((Math.random()*1)>0.5)?'1':'-1',
    $elem: $movingballr
}

var ballb={
  height: $movingballb.clientHeight,
  width: $movingballb.clientWidth,
  x: parseInt(Math.random()*500),
  y: parseInt(Math.random()*100),
  dx:parseInt((Math.random()*1)>0.5)?'1':'-1',
  dy:parseInt((Math.random()*1)>0.5)?'1':'-1',
  $elem: $movingballb
}

// $movingball.style.top=ball.x+"px";
// $movingball.style.top=ball.y+"px";

updateBall(ballr);
updateBall(ballb);

setInterval(function(){
    ballr.x=ballr.x+ballr.dx*speed;
    ballr.y=ballr.y+ballr.dy*speed;

    ballb.x=ballb.x+ballb.dx*speed;
    ballb.y=ballb.y+ballb.dy*speed;

    
    checkBoundaryCollision(ballr);
    updateBall(ballr);

    checkBoundaryCollision(ballb);
    updateBall(ballb);

    checkBallCollision(ballr,ballb);
},100);

function updateBall(ball){
    ball.$elem.style.top= ball.y+"px";
    ball.$elem.style.left= ball.x+"px";
}

function checkBallCollision(ballr, ballb)
{

  var ballrLeft = ballr.x + 2;
  var ballrRight = ballrLeft + ballr.width + 2;
  var ballrTop = ballr.y + 2;
  var ballrBottom = ballrTop + ballr.height + 2;

  var ballbLeft = ballb.x + 2;
  var ballbRight = ballbLeft + ballb.width + 2;
  var ballbTop = ballb.y + 2;
  var ballbBottom = ballbTop + ballb.height + 2;

  if(ballrLeft < ballbRight && ballrRight > ballbLeft && ballrTop < ballbBottom && ballrBottom > ballbTop )
  {

    var temp = ballr.dx;
    ballr.dx = ballb.dx;
    ballb.dx = temp;

    temp = ballr.dy;
    ballr.dy = ballb.dy;
    ballb.dy = temp;

  }
}

function checkBoundaryCollision(ball){
  // Ball right  = ball left + ball width
  // Ball top < Container top
  // Ball left > Container left
  // Ball right < Container right
  // Ball bottom < Container bottom
  var ballLeft = ball.x;
  var ballRight = ballLeft + 50;
  var ballTop = ball.y;
  var ballBottom = ballTop + 50;

  var containerTop = 10;
  var containerLeft = 10;
  var containerRight = 490;
  var containerBottom = 490;


  if (ballRight > containerRight) {
    // TODO
    ball.dx= -1;    // ball.dy=-1;
  }
  if (ballBottom > containerBottom) {
    // TODO
    // ball.dx= 0;
    ball.dy= -1;
  }
  if (ballTop < containerTop) {  
    // TODO
    // ball.dx= 0.5;
    ball.dy= 1;
  }
  if (ballLeft < containerLeft) {
    // TODO
    ball.dx= 1;   
    //  ball.dy= 0;
  }
    // if(collide(ball))
    // {
        
    // }
    
}
// function collide(ball){
//     if(ball.y<=0){
//         ball.dx=1;
//         ball.dy=1;
//     }
//     if(ball.x>=500){
//         ball.dx=-1;
//         ball.dy=-1;
//     }
//     if(ball.y+20<=0){
//         ball.dx=-1;
//         ball.dy=-1;
//     }
//     if(ball.x+20>=500){
//         ball.dx=-1;
//         ball.dy=-1;
//     }
// }

