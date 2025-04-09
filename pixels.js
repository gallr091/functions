let numSquares = 40; 
const canvasWidth = 707;
const canvasHeight = 500;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  noStroke();
  drawPixels();
  noLoop(); 
}



function drawPixels() {
  let squareSize = width / numSquares;

  
  let marginX = width * 0.8; 
  let marginY = height * 0.8; 

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

      if (
        x + squareSize < safeZone.left ||
        x > safeZone.right ||
        y + squareSize < safeZone.top ||
        y > safeZone.bottom
      ) {
        let r = random();
        if (r < 0.5) {
         
          fill(206, 179, 185, 0); 
        } else {
         //teal
          fill(0, 128, 128); 
        }
        rect(x, y, squareSize, squareSize);
      }
    }
  }
  
}

