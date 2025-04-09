let numSquares = 40; // Number of squares per row and column
const canvasWidth = 707;
const canvasHeight = 500;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noLoop(); // Ensures draw() is only called once
  noStroke();
  drawPixels();
  noLoop(); 
}



function drawPixels() {
  let squareSize = width / numSquares;

  // Define the margins for the empty central area
  let marginX = width * 0.8; // 25% of canvas width
  let marginY = height * 0.8; // 25% of canvas height

  let safeZone = {
    left: (width - marginX) / 2,
    right: (width + marginX) / 2,
    top: (height - marginY) / 2,
    bottom: (height + marginY) / 2
  };

  for (let row = 0; row < numSquares; row++) {
    for (let col = 0; col < numSquares; col++) {
      let x = col * squareSize;
      let y = row * squareSize;

      // Check if the current square is outside the safe zone
      if (
        x + squareSize < safeZone.left ||
        x > safeZone.right ||
        y + squareSize < safeZone.top ||
        y > safeZone.bottom
      ) {
        let r = random();
        if (r < 0.5) {
          // Transparent pink square
          fill(206, 179, 185, 0); // RGB with 0 alpha for full transparency
        } else {
          // Teal square
          fill(0, 128, 128); // RGB for teal color
        }
        rect(x, y, squareSize, squareSize);
      }
    }
  }
  
}

