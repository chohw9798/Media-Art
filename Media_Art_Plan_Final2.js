// reference: https://codepen.io/sixhat/pen/VrJVGW
var mic;

class objects{
  constructor(){
    this.vx = random(-1,2);
    this.vy = random(-2,1);
    this.x = random(width);
    this.y = random(height);
    this.m = random(height/10,height);
    this.c = random();
    this.w = random(-1,1);
  }
  draw(level){
    fill(this.c, 1, 1, 1-level);
    ellipse(this.x, this.y, this.m*level);
    
    this.x += this.vx*(1+level);
    this.y += this.vy*(1+level);
    
    if (this.x>width || this.x < 0){
      this.vx = -this.vx
    }
    if (this.y>height || this.y < 0){
      this.vy = -this.vy
    }
  }
}
let nBalls = 200;
let balls=[];
function setup(){
  createCanvas(windowWidth, windowHeight);
  background(50);
  mic = new p5.AudioIn()
  //have start() before getLevel() 
  mic.start();
  colorMode(RGB,1);
  noStroke();
  for(let i = 0; i<nBalls; i++){
    balls.push(new objects());
  }
}

function draw(){
  background(0, .15);
  micLevel = mic.getLevel(.9);
  for(let i = 0; i<nBalls; i++){
    balls[i].draw(micLevel);
  }
  for (var x=0; x < width; x+=5) {
    var noiseVal = noise((micLevel+x)*200, micLevel*300);
    stroke(noiseVal*200);
    line(x, height, x, micLevel*100+noiseVal*1800);
  }
}
