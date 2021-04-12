let input, buttonOne, buttonTwo, reset;

var data = [];
var m = 1;
var b = 0;
var max_X;
var max_Y;
var learningRate = 0.00001;


function setup() {
  createCanvas(800, 800);
  background(255);

  input = createInput();
  buttonOne = createButton('submit');
  buttonTwo = createButton('submit');
  reset = createButton('reset');

  input.position(20, 20);
  buttonTwo.position(170, 20);
  buttonOne.position(-100, -100);
  
  stroke(0);
  fill(0);
  text("input the limit of your graph as max_X, max_Y", 20, 10);
  
  reset.position(20, 780);
  
  buttonTwo.mousePressed(setGraphBound);
}



function draw() {
  buttonOne.mousePressed(plotPoint);
  reset.mousePressed(restart);
  
  
  if (data.length > 1) {
    gradientDescent();
    drawLine();
  }
}




function restart(){
  //数据清零
  data = [];
  background(255);
  
  //draw a coordinate plane
  stroke(3);
  fill(0);
  line(50, 50, 50, 750);
  line(50, 750, 750, 750);
  text(max_X, 730, 760);
  text(max_Y, 25, 60);
}



function clearBoard(){
  background(255);
  
  //draw a coordinate plane
  stroke(3);
  fill(0);
  line(50, 50, 50, 750);
  line(50, 750, 750, 750);
  text(max_X, 730, 760);
  text(max_Y, 25, 60);
  
  plotPoint();
  
  //text above the coordinate input
  stroke(0);
  fill(0);
  text("input your value as x,y", 20, 10);
  
  
  //text above the learning rate input
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
  
  // //debug
  // console.log(max_X);
  // console.log(max_Y);
  
  //clear the input box & put a new button in
  input.value('');
  buttonTwo.position(-100, -100);
  buttonOne.position(170, 20);
  
  //add the learning rate input option
  
  clearBoard();
}






function plotPoint() {
  //seperate the x & y from the input--------------
  let coordinate = split(input.value(), ',');

  var x = float(coordinate[0]);
  var y = float(coordinate[1]);
  var point = createVector(x, y);

  //store the *actual data* in a vector array
  data.push(point);


//   //plot the points--------------------------------
//   background(255);

//   //draw a coordinate plane
//   stroke(3);
//   fill(0);
//   line(50, 50, 50, 750);
//   line(50, 750, 750, 750);
//   text(max_X, 730, 760);
//   text(max_Y, 25, 60);

  
  //draw in the points
  fill(200, 0, 200);
  for (var i = 0; i < data.length; i++) {
    //fit the points to the coordinate plane
    var map_X = map (data[i].x, 0, max_X, 50, 750);
    var map_Y = map (data[i].y, 0, max_Y, 750, 50);
    ellipse(map_X, map_Y, 8, 8);
  }

  //clear the input box & reset the text
  input.value('');
  // stroke(0);
  // fill(0);
  // text("input your value as x,y", 20, 10);
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
