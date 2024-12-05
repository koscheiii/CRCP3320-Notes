let c = 0;
let rect_dims, n_patches, rect_locations_top, rect_locations_bottom, m, colors, colors2;

function setup() {
  createCanvas(1000, 850);
  background(255);
  noStroke();
  rectMode(CENTER);
  pixelDensity(4);
  rect_dims = [50, 400];
  n_patches = 7;
  rect_locations_top = [];
  rect_locations_bottom = [];
  m = 20;

  // Generate random colors
  colors = [];
  colors2 = [];
  for (let i = 0; i < n_patches; i++) {
    colors.push([random(255), random(255), random(255)]);
    colors2.push([random(255), random(255), random(255)]);
  }

  // Generate rectangle locations
  for (let i = 0; i < n_patches; i++) {
    rect_locations_top.push([
      [
        random((width / n_patches) * i - m, (width / n_patches) * i + m),
        random((width / n_patches) * (i + 1) + m, (width / n_patches) * (i + 1) + 100),
      ],
      [random(-m, m), random(height - m, height + m)],
    ]);
    rect_locations_bottom.push([
      [
        random((width / n_patches) * i - m, (width / n_patches) * i + m),
        random((width / n_patches) * (i + 1) - m, (width / n_patches) * (i + 1) + m),
      ],
      [
        random(height / 2 + 50, height / 2 + 100),
        random(height - m, height + m),
      ],
    ]);
  }
}

function draw() {
  for (let j = 0; j < 700; j++) {
    for (let k = 0; k < n_patches; k++) {
      draw_dynamic_shape(
        colors[k % colors.length],
        rect_locations_top[k][0],
        rect_locations_top[k][1]
      );
      if (random() < 0.75) {
        draw_dynamic_shape(
          colors2[k % colors.length],
          rect_locations_bottom[k][0],
          rect_locations_bottom[k][1]
        );
      }
    }
  }

  // Noise layer on top
  let w = 1; // Size of each rectangle in the noise layer
  for (let i = 0; i < width; i += w) {
    for (let j = 0; j < height; j += w) {
      let n = random();
      if (n > 0.6) {
        fill(255, 255, 255, 15); // Light blur effect
      } else {
        fill(0, 0, 0, 15); // Dark blur effect
      }
      rect(i, j, w, w); // Draw the noise rectangle
    }
  }

  noLoop();
}

function draw_dynamic_shape(color, x, y) {
  let r = random();
  if (r < 0.3) {
    blendMode(HARD_LIGHT);
  } else {
    blendMode(BLEND);
  }

  fill(color[0], color[1], color[2], random(50, 150));

  // Randomize between shape types
  let shapeType = random([0, 1, 2]);
  if (shapeType === 0) {
    // Morphing rectangle to oval
    let rx = random(rect_dims[0], rect_dims[1]);
    let ry = lerp(rx, random(rect_dims[0], rect_dims[1]), sin(frameCount * 0.01));
    rect(random(x[0], x[1]), random(y[0], y[1]), rx, ry, random(0, 50));
  } else if (shapeType === 1) {
    // Irregular polygon
    let vertices = int(random(3, 8));
    beginShape();
    for (let i = 0; i < vertices; i++) {
      let angle = (TWO_PI / vertices) * i;
      let radius = random(rect_dims[0] / 2, rect_dims[1] / 2);
      let vx = random(x[0], x[1]) + cos(angle) * radius;
      let vy = random(y[0], y[1]) + sin(angle) * radius;
      vertex(vx, vy);
    }
    endShape(CLOSE);
  } else {
    // Circle
    ellipse(
      random(x[0], x[1]),
      random(y[0], y[1]),
      random(rect_dims[0], rect_dims[1]),
      random(rect_dims[0], rect_dims[1])
    );
  }
}