GAMELOOP = {};

// Time controls
var start = null;
var frameRate = 5;
GAMELOOP.step = function (timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  if (progress > 1000/frameRate) {
    start = null;
    KAIJU.stepFrame();
  }

  window.requestAnimationFrame(GAMELOOP.step);
}
