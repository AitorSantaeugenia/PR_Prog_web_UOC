//CARGAMOS LIBRERIA ANIMATION FRAME
var animate = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
function(callback) { window.setTimeout(callback, 1000/60) };

//CREAMOS LA PANTALLA
var canvas = document.createElement('canvas');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

//CARGAMOS EL CANVAS Y ARRANCAMOS LA ANIMACIÓN
window.onload = function() {
  //document.body.appendChild(canvas);
  container = document.getElementById("container");
  container.appendChild(canvas);
  update();
  render();
  //animate(step);
};

//ACTUALIZA LOS ELEMENTOS, LOS RENDERIZA Y VUELVE A EJECUTAR SE EN BUCLE INFINITO
var step = function() {
  update();
  render();
  animate(step);
};

/* 1a FASE 
var update = function() {
};*/
/* 1a FASE */


//CREAMOS LA CLASE PADDLE Y SU RENDERIZACIÓN
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function() {
  context.fillStyle = "#0000FF";
  context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
   this.paddle = new Paddle(10, 275, 10, 50);
}

Player.prototype.render = function() {
  this.paddle.render();
};

//CONTRUIMOS LOS OBJETOS
var player = new Player();


//CLASE BOLA
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 3;
  this.y_speed = 3;
  this.radius = 5;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#ffffff";
  context.fill();
};

//CREAMOS EL OBJETO BOLA
var ball = new Ball(30, 300);

var lifes = 3;
var points = 0;

var render = function() {
  context.fillStyle = "grey";
  context.fillRect(0, 0, width, height);
  player.render();
  ball.render();
};


/* 2a FASE 
var update = function() {
  ball.update();
};*/

Ball.prototype.update = function() {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - this.radius;
  var top_y = this.y - this.radius;
  var bottom_x = this.x + this.radius;
  var bottom_y = this.y + this.radius;
  
  score = document.getElementById("points");
  score.value = points;

  //REBOTES SUPERIOR E INFERIOR
  if (this.y + this.radius > height) {
  	this.y = height - this.radius;
  	this.y_speed = -this.y_speed;
  } else if (this.y - this.radius < 0){
  	this.y = 0 + this.radius;
  	this.y_speed = -this.y_speed;
  } 

  //LIMITE IZQUIERDO
  if(this.x - this.radius < 0) { // hitting the left wall
    //this.x = this.radius;
    //this.x_speed = -this.x_speed;
    lifes = lifes - 1;
    switch(lifes) {
    case 0:
        document.getElementById("life1").style.display = "none";
        finishGame();

        //TEXTO FIN
        break;
    case 1:
        document.getElementById("life2").style.display = "none";
        reloadBall ();
        break;
    case 2:
        document.getElementById("life3").style.display = "none";
        reloadBall ();
        break;
    default:
        break;
    }

    //DESTRUIR LA ANTERIOR PELOTA
    //LANZAR NUEVA PELOTA
    this.x = 300;
    this.y = 300;
    this.x_speed = 0;
    this.y_speed = 0;


    


  //REBOTEDERECHA
  } else if(this.x + this.radius > width) { // hitting the right wall
    this.x = width - this.radius;
    this.x_speed = -this.x_speed;
  }

  //REBOTE CON PADDLE
  /*if ((this.x - this.radius < 20) && (player.paddle.y > this.y) && (player.paddle.y < this.y - 50)){
    this.x  = 20 + this.radius;
    this.x_speed = -this.x_speed;
  }*/

  /*if ((this.x - this.radius <= 20)) { 
    alert("Ha pasado de x=20");
    this.x_speed = -this.x_speed;
  };*/

  //REBOTE CON LA PALA
  if ((player.paddle.y < this.y) && (player.paddle.y + 50 > this.y)) { 
    //alert("La bola está por debajo del paddle");
    //this.x_speed = -this.x_speed;
    if ((this.x - this.radius <= 20)) { 
      //alert("Ha pasado de x=20");
      this.x_speed = -this.x_speed;
      points = points + 1;
      score.value = points;
      switch (points) {
        case 20 :
          this.x_speed = this.x_speed*1.25;
          this.y_speed = this.y_speed*1.25;
          break;
        case 40 :
          this.x_speed = this.x_speed*1.25;
          this.y_speed = this.y_speed*1.25;
          break;
        case 60 :
          this.x_speed = this.x_speed*1.25;
          this.y_speed = this.y_speed*1.25;
          break;
        case 80 :
          this.x_speed = this.x_speed*1.25;
          this.y_speed = this.y_speed*1.25;
          break;
        case 100 :
          this.x_speed = this.x_speed*1.25;
          this.y_speed = this.y_speed*1.25;
          break;
        case 120 :
          this.x_speed = this.x_speed*1.25;
          this.y_speed = this.y_speed*1.25;
          break;
        default:
          break;
      }

    }
  }

  

  


};
/* 2a FASE */


function leftWall() {

}




//TECLADO
/* LISTENERS CONTROLES */
var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});



var update = function() {
  player.update();
  ball.update(player.paddle);
};

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    var keySpeed = 5;
    if(value == 38) { // down
      this.paddle.move(0, -keySpeed);
    } else if (value == 40) { // right down
      this.paddle.move(0, keySpeed);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.y < 0) { // all the way to the left
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > height) { // all the way to the right
    this.y = height - this.height;
    this.y_speed = 0;
  }
}

isPlaying = true;
isStill = true;
vel_x = 0;
vel_y = 0;

function stillGame() {
  if(isStill) {
    vel_x = ball.x_speed;
    vel_y = ball.y_speed;
    ball.x_speed = 0;
    ball.y_speed = 0;
    isStill = false;
  }
  
}

function startGame() {

  if(isPlaying) {
    animate(step);
    isPlaying = false;
    document.getElementById("start-btn").style.display = "none";
  }
  
}

function restartGame() {
  location.reload();
}


function continueGame() {
  if(!isStill) {
    ball.x_speed = vel_x;
    ball.y_speed = vel_y;
    vel_x = 0;
    vel_y = 0;
    isStill = true;
  }

}


function finishGame() {

    ball.x = 300;
    ball.y = 300;
    ball.x_speed = 0;
    ball.y_speed = 0;

    document.getElementById("restart-btn").style.display = "inline";
  
}

function reloadBall () {
  setTimeout(function() {
      ball.x_speed = 3;
      ball.y_speed = 3;
  }, 1000);
}






