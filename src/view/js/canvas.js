// clear btn:
// document.getElementById("clear").addEventListener("click", clearCanvas);

// function clearCanvas() {
//     var c = document.getElementsByClassName("myCanvas");
//     var ctx = c.getContext("2d");
//     ctx.fillRect(0, 0, 0, 0);
//     ctx.beginPath();
// }

$(document).ready(function () {
  // Get the drawing canvas
  const canvasMouse = document.getElementById("drawing");
  const contextMouse = canvasMouse.getContext("2d");

  // $("#clear").on('click', function () {
  //     context.clearRect(0, 0, canvas.width, canvas.height);
  // });

  contextMouse.lineWidth = 10;
  contextMouse.lineJoin = contextMouse.lineCap = "round";

  let isDrawing;
  const points = [];

  canvasMouse.onmousedown = function (e) {
    const trueX = e.clientX - canvasMouse.getBoundingClientRect().left;
    const trueY = e.clientY - canvasMouse.getBoundingClientRect().top;
    isDrawing = true;
    points.push({ x: trueX, y: trueY });
  };

  canvasMouse.onmousemove = function (e) {
    if (!isDrawing) return;

    const trueX = e.clientX - canvasMouse.getBoundingClientRect().left;
    const trueY = e.clientY - canvasMouse.getBoundingClientRect().top;
    points.push({ x: trueX, y: trueY });

    contextMouse.beginPath();
    contextMouse.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      contextMouse.lineTo(points[i].x, points[i].y);
    }

    contextMouse.stroke();
  };

  canvasMouse.onmouseup = function () {
    isDrawing = false;
    points.length = 0;
  };
});

// eslint-disable-next-line no-unused-vars
function eraseCanvas() {
  const canvasMouse = document.getElementById("drawing");
  const context = canvasMouse.getContext("2d");
  context.clearRect(0, 0, canvasMouse.width, canvasMouse.height);
}

// returns true if every pixel's uint32 representation is 0 (or "blank")
// eslint-disable-next-line no-unused-vars
function isCanvasBlank() {
  const canvas = document.getElementById("drawing");
  const context = canvas.getContext("2d");

  const pixelBuffer = new Uint32Array(
    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );

  return !pixelBuffer.some((color) => color !== 0);
}
