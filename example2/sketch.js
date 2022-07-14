var canvas_width = 4096 ;
var canvas_height = 2160;

var num = 8000;
var noise_scale = 400;
var noise_strength = 1.5;
var speed_min = 0.1;
var speed_max = 10;

var particles = [num];

var bg_color = [43, 56, 75, 3];
var color1 = [209, 49, 97];
var color2 = [238, 128, 127]

var line_width = 1;

var z_off = 0;
var z_off_inc = 2;

function setup() {
  createCanvas(canvas_width, canvas_height);
  background(43, 56, 75);

  for (let i=0; i<num; i++) {
    var position = createVector(random(width), random(height));
    var direction = createVector(cos(PI/2), sin(PI/2));
    var speed = random(speed_min, speed_max);
    var color_r = map(i, 0, num, color1[0], color2[0]);
    var color_g = map(i, 0, num, color1[1], color2[1]);
    var color_b = map(i, 0, num, color1[2], color2[2]);
    var color = [color_r, color_g, color_b];
    particles[i]= new Particle(position, direction, speed, color, i);
  }
}

function draw() {
  background(bg_color);
  for (let i=0; i<particles.length; i++) {
    particles[i].run();
  }
  z_off = z_off + z_off_inc;
}

class Particle{
  constructor(_position, _direction, _speed, _color, _i){
    this.position = _position;
    this.prev_position = this.position.copy();
    this.direction = _direction;
    this.speed = _speed;
    this.color = _color;
    this.i = _i;
  }


  move(){
    this.prev_position = this.position.copy();
    let angle=noise(this.position.x/noise_scale, this.position.y/noise_scale, z_off/noise_scale)*TWO_PI*noise_strength; //0-2PI
    this.direction.x = cos(angle);
    this.direction.y = sin(angle);
    var velocity = this.direction.copy();
    velocity.mult(this.speed); 
    this.position.add(velocity); 
  }

  check_edges(){
    if (this.position.x<0 || this.position.x>width || this.position.y<0 || this.position.y>height) {    
      this.position.x = random(width);
      this.position.y = random(height);

      this.prev_position = this.position.copy();
    }
  }

  update(){
    stroke(this.color);
    strokeWeight(line_width);
    line(this.position.x, this.position.y, this.prev_position.x, this.prev_position.y);
  }

  run() {
    this.move();
    this.check_edges();
    this.update();
  }
}