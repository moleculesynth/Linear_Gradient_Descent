let input, buttonOne, buttonTwo, reset;

var data = [];
var m = 0;
var b = 0;
var max_X;
var max_Y;
var learningRate = 0.001;


function setup() {
  createCanvas(800, 800);
  background(255);
  stroke(0);
  fill(0);
  text("input the limit of your graph as max_X, max_Y", 20, 10);

  input = createInput();
  input.position(20, 20);
  
  buttonOne = createButton('submit');
  buttonOne.position(100, 100);
  
  buttonTwo = createButton('submit');
  buttonTwo.position(170, 20);
  buttonTwo.mousePressed(setGraphBound);
  
  reset = createButton('reset');
  reset.position(20, 780);
}


function mousePressed() {
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  if (x>=0 && x<=1 && y>=0 && y<=1) {
    var point = createVector(x, y);
    data.push(point);
  }
}

function draw() {
  background(20);
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    fill(214,40,40);
    stroke(214,40,40);
    heart(x, y, 8, 8);
  }

  if (data.length > 1) {
    gradientDescent();
    drawLine();
  }
}

function restart(){
  data = [];
}

function clearBoard(){
  background(255);
  stroke(3);
  fill(0);
  line(50, 50, 50, 750);
  line(50, 750, 750, 750);
  text(max_X, 730, 760);
  text(max_Y, 25, 60);
  
  plotPoint();
  stroke(0);
  fill(0);
  text("input your value as x,y", 20, 10);
  text("input your learning rate", 500, 10);
  text("current learning rate: " + learningRate, 500, 50);
  text("m = " + m, 500, 70);
  text("b = " + b, 500, 90);
}



function setGraphBound(){
  //seperate the max_X & max_X from the input--------------
  let coordinate = split(input.value(), ',');
  max_X = float(coordinate[0]);
  max_Y = float(coordinate[1]);
  input.value('');
  buttonOne.position(170, 20);
  clearBoard();
}






function plotPoint() {
  let coordinate = split(input.value(), ',');
  var x = float(coordinate[0]);
  var y = float(coordinate[1]);
  var point = createVector(x, y);
  data.push(point);
  fill(200, 0, 200);
  for (var i = 0; i < data.length; i++) {
    var map_X = map (data[i].x, 0, max_X, 50, 750);
    var map_Y = map (data[i].y, 0, max_Y, 750, 50);
    ellipse(map_X, map_Y, 8, 8);
  }
  input.value('');
}



function gradientDescent(){
  
  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;
    
    var guess = m * x + b;
    var error = y - guess;
    
    m = m + error * x * learningRate;
    b = b + error * learningRate;
    
    console.log(m);
    console.log(b);
  }
  
}


function drawLine() {
  clearBoard();
  
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 50, 750);
  y1 = map(y1, 0, 1, 750, 50);
  x2 = map(x2, 0, 1, 50, 750);
  y2 = map(y2, 0, 1, 750, 50);

  stroke(255, 0, 255);
  strokeWeight(2);
  line(x1, y1, x2, y2);
}
