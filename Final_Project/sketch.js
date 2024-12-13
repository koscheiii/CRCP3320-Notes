let particles = [];
let n_particles = 200;
let rect_dims = [20, 60];
let noise_scale = 0.01;
let time = 0;
let background_layer;

function setup() {
  createCanvas(1000, 850);
  noStroke();
  rectMode(CENTER);
  pixelDensity(2);

  // Initialize particles
  for (let i = 0; i < n_particles; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(rect_dims[0], rect_dims[1]),
      speed: random(1, 3),
      offsetX: random(1000),
      offsetY: random(1000),
      color: [random(100, 200), random(100, 200), random(100, 200), random(50, 120)],
    });
  }

  // Create a base background layer
  background_layer = createGraphics(width, height);
  background_layer.noStroke();
  background_layer.fill(20, 20, 40, 30); // Dark, soft background tone
  background_layer.rect(0, 0, width * 2, height * 2);
}

function draw() {
  // Draw the evolving background
  image(background_layer, 0, 0);

  // Add a transparent fading effect for layering
  fill(0, 5);
  rect(0, 0, width, height);

  for (let p of particles) {
    // Update particle position based on Perlin noise
    let angle = noise(p.x * noise_scale, p.y * noise_scale, time) * TWO_PI * 2;
    p.x += cos(angle) * p.speed;
    p.y += sin(angle) * p.speed;

    // Wrap around the screen
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    // Draw the particle shape
    draw_dynamic_shape(p.color, p.x, p.y, p.size);
  }

  time += 0.01; // Increment time for evolving noise
}

function draw_dynamic_shape(color, x, y, size) {
  blendMode(OVERLAY); // Soft blending for layering
  fill(color[0], color[1], color[2], color[3]);

  // Dynamic shapes
  let shapeType = random([0, 1, 2]);
  if (shapeType === 0) {
    rect(x, y, size, size, random(10, 50));
  } else if (shapeType === 1) {
    ellipse(x, y, size, size * random(0.5, 1.5));
  } else {
    beginShape();
    let vertices = int(random(3, 6));
    for (let i = 0; i < vertices; i++) {
      let angle = (TWO_PI / vertices) * i;
      let radius = size / 2;
      let vx = x + cos(angle) * radius * random(0.8, 1.2);
      let vy = y + sin(angle) * radius * random(0.8, 1.2);
      vertex(vx, vy);
    }
    endShape(CLOSE);
  }
}