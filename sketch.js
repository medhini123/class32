const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var myboat;
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  // myboat = new Boat(width-100, height - 100, 200, 200);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
  tower.display();
  showBoats();
  // myboat.display();
  // Matter.Body.setVelocity(myboat.body,{x:-5,y:0})
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//function to show the ball
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function showBoats() {
  if (balls.length > 0) {
    if (
      boats.length < 7 &&
      boats[boats.length - 1].body.position.x < width - 400
    ) {
      var position = [-40, -60, -70, -30];
      var b = random(position);
      var myboat = new Boat(width - 10, height - 100, 150, 150, b);
      boats.push(myboat);
    }
    for (var i = 0; i < boats.length; i += 1) {
      Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
      boats[i].display();
    }
  } else {
    myboat = new Boat(width - 10, height - 100, 150, 150, -60);
    boats.push(myboat);
  }
}
