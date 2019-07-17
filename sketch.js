var points = []
let hull = []
let input;
let showMinimumText;

let leftMost;
let currentVertex;
let index = 0;
let nextVertex;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas')
  input = document.getElementById('input')
  input.onchange = setPoints
  setPoints(5)

}


function draw() {
  background(0);

  stroke(255, 0, 100);
  fill(255, 0, 100, 75);
  beginShape();
  for (let p of hull) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  stroke(255)
  strokeWeight(8)
  for (let i = 0; i < points.length; i++) {
   point(points[i].x, points[i].y);
  }
  let checking = points[index]
  
  stroke(255)
  strokeWeight(2)
  line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y)
  stroke(0, 255, 0)
  line(currentVertex.x, currentVertex.y, checking.x, checking.y)
  
  stroke(200, 0, 500)
  point(currentVertex.x, currentVertex.y)
  stroke(255)
  point(nextVertex.x, nextVertex.y)
  stroke(0,255,0)
  point(checking.x, checking.y)

  stroke(0, 255, 0);
  strokeWeight(10);
  point(leftMost.x, leftMost.y);

  


  let a = {
    x: nextVertex.x - currentVertex.x,
    y: nextVertex.y - currentVertex.y
  }
  let b = {
    x: checking.x - currentVertex.x,
    y: checking.y - currentVertex.y
  }

  let crossProduct = a.x*b.y - a.y*b.x;
  
  if (crossProduct < 0) {
    nextVertex = checking
  }
  index++;

  if (showMinimumText) {
    textSize(20)
    fill(300);
    stroke(255)
    strokeWeight(1)
    text('The minimum amount of points is 3', 10, height - 10)
  }
 

  if (index == points.length) {
    if (nextVertex == leftMost) {
      console.log('DONE');
      noLoop()
      index = 0;

    } else {
      hull.push(nextVertex);
      currentVertex = nextVertex;
      index = 0;
      nextVertex = leftMost;
    }

  }
  

}

function setPoints() {
  loop()
  points = [];
  hull = [];
  showMinimumText = false;
  let amount = input.value
  if (amount < 3) {
    amount = 3
    showMinimumText = true
  }
  

  let buffer = 20;
  for (let i = 0; i < amount; i++) {
    points.push({
      x: random(buffer,width-buffer),
      y: random(buffer,height-buffer-30)
    })
  }

  points.sort(function (value1, value2) {
    return value1.x - value2.x;
  })

  leftMost = points[0]
  currentVertex = leftMost
  hull.push(currentVertex);
  nextVertex = points[1]
  index=2;

}