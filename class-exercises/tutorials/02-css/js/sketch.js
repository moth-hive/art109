let canvas;

var randY = 0;
var delayX = 0;
var susCount = 100; //Amount that will spawn
var susX = [];
var susY = [];
var susR = [];
var susRRate = [];
var susH = [];

function setup() {
  canvas = createCanvas(windowWidth, 375);
  canvas.position(0, 0);
  colorMode(HSB, 255);
  rectMode(CENTER);

  //Sets all the coordinates and values to start
  for(var i = 0; i < susCount; i++){
    //Gives them a random height
    randY = int(random(0, height * 0.9));
    susY[i] = randY;

    //Allows there to be a random distance between spawned beans
    delayX -= random(20, 80);
    susX[i] = delayX;

    //Randomized rotations
    susR[i] = 0;
    susRRate[i] = random(-0.1, 0.1);

    //Randomizes the color
    susH[i] = int(random(0,256));
  }
}

function windowResize(){
    resizeCanvas(windowWidth, 375);
}

function draw() {
  background(0);

   //Draws the bean
   for(var i = 0; i < susCount; i++){
     push();
     translate(susX[i], susY[i]);
     drawSus(0, 0, susR[i], susH[i]);
     susX[i] += 1;
     susR[i] += susRRate[i];
     pop();

     //Resets a bean for pseudo infinity
     if(susX[i] > width + 20){
       susX[i] = 0 - int(random(20,120));
       susY[i] = int(random(0, height * 0.9));
       susRRate[i] = random(-0.1, 0.1);
       susH[i] = int(random(0,256));
     }
   }
}

//Bean Drawer
function drawSus(x, y, rot, hue){
  rotate(rot);

  //Body
  fill(hue, 255, 255);
  noStroke();
  rect(x - 7, y + 0, 6, 15, 10);
  rect(x, y, 15, 20, 15);
  rect(x - 5, y + 8, 7, 15, 5);
  rect(x + 5, y + 7, 6, 14, 5);

  //Visor
  fill(128, 87, 250);
  rect(x + 3, y - 4, 13, 7, 5);
}
