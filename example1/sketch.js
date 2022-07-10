var canvas_width = 1280;
var canvas_height = 720;
var circle_size = 128;

var colorbg = [255, 41, 118];

var color1 = [255, 211, 26];
var color2 = [255, 143, 31];
var color3 = [242, 34, 254];
var color4 = [141, 30, 255];
var colors = [color1, color1, color1, color1,
              color1, color2, color3, color4, 
              color1, color2, color3, color4, 
              color1, color2, color3, color4, 
              color1, color2, color3, color4];

var t = 0;
var step = 0.05;

var fr = 60;
var fmax = 3200;
var f = 0;

function setup() {
  createCanvas(canvas_width, canvas_height);
  background(colorbg);
}

function draw() {
  frameRate(fr);

  var opacity = 1;
  colorbg.push(opacity);
  background(colorbg);

  var x = noise(t) * width;
  var y = noise(t + 5) * height;

  var circlecolor = map(noise(t + 10), 0, 1, 0, colors.length - 1);
  circlecolor = Math.ceil(circlecolor);
  fill(colors[circlecolor]);
  strokeWeight(1);
  stroke(0);

  ellipse(x, y, circle_size, circle_size);

  f = f + 1;
  if(f <= fmax){
    t = t + step;

  }

}
