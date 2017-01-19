/**
 * Initializes the Kaiju Application
 */
KAIJU.init  = function() {
  console.log('KAIJU init');
  // DOM Injection
  KAIJU.els_.playground = KAIJU.createPlayground();

  window.requestAnimationFrame(GAMELOOP.step);
};

KAIJU.createPlayground = function() {
  var playground = document.createElement('div');
      playground.classList.add('kaiju-playground');

  // for dev
  playground.innerHTML = "<div class='kaiju-monster kaiju-monster-sprite' data-kaiju-id='9218734' data-x-coord=0></div>";

  document.body.appendChild(playground);

  return playground;
};

var direction = 1
KAIJU.stepFrame = function() {
  console.log('stepping kaiju');
  // @TODO query multiple monsters more effectively
  // @TODO break out monster movements and changes to methods
  // @TODO add back and forth
  // @TODO add taking breaks/sitting
  // @TODO shift animation to being transform on inner container
  var targetKaiju = document.querySelector('.kaiju-monster[data-kaiju-id="9218734"]');
  var left = parseInt(targetKaiju.getAttribute('data-x-coord'));
  left += 5 * direction;

  if (left > window.innerWidth - 60 || left < 0) {
    direction = direction * -1;
  }

  targetKaiju.setAttribute('data-x-coord', left);
  targetKaiju.classList.toggle('kaiju-alt-frame');
  console.log('left', left);
  targetKaiju.style.transform = 'translateX(' + left + 'px)'
  if (direction === -1) {
    targetKaiju.style.transform = targetKaiju.style.transform +
        ' rotateY(180deg)';
  }
};



KAIJU.init();
