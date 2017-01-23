/**
 * Initializes the Kaiju Application
 */
KAIJU.init  = function() {
  console.log('KAIJU init');
  // DOM Injection
  KAIJU.els_.playground = KAIJU.createPlayground();

  KAIJU.addKaiju();

  window.requestAnimationFrame(GAMELOOP.step);
};

KAIJU.createPlayground = function() {
  var playground = document.createElement('div');
      playground.classList.add('kaiju-playground');

  document.body.appendChild(playground);

  return playground;
};

KAIJU.addKaiju = function() {
  KAIJU.state_.monsters.forEach(function(monster) {
    var kaijuMonster = document.createElement('div');
        kaijuMonster.classList.add('kaiju-monster', 'kaiju-monster-sprite', 'kaiju-monster--' + monster.type);
        kaijuMonster.setAttribute('data-kaiju-id', monster.id);
        kaijuMonster.setAttribute('data-x-coord', Math.random() * (window.innerWidth - 60) + 1);

        kaijuMonster.addEventListener('click', function() {
          KAIJU.clickKaiju(this);
        }.bind(kaijuMonster));

    KAIJU.els_.playground.appendChild(kaijuMonster);
  });
};

KAIJU.clickKaiju = function(targetKaiju) {
  var kaijuID = targetKaiju.getAttribute('data-kaiju-id');
  
  KAIJU.state_.monsters.forEach(function(monster, i) {
    if (kaijuID == monster.id) {
      KAIJU.state_.monsters[i].clicks += 1;
      console.log(KAIJU.state_.monsters[i].clicks);

      KAIJU.saveData();
      return;
    }
  });
};

KAIJU.stepFrame = function() {
  KAIJU.state_.monsters.forEach(KAIJU.updateKaiju);
};

// @TODO add taking breaks/sitting
KAIJU.updateKaiju = function(monsterData, i) {
  var direction = monsterData.direction;
  var baseStats = KAIJU.kaijuData_[monsterData.type];

  var targetKaiju = document
      .querySelector('.kaiju-monster[data-kaiju-id="' + monsterData.id + '"]');


  KAIJU.walkKaiju(targetKaiju, baseStats.speed, direction, i);
  KAIJU.scaleKaiju(targetKaiju, monsterData, baseStats);
};

KAIJU.scaleKaiju = function(targetKaiju, monsterData, baseStats) {
  var scale = 1;

  if (baseStats.evolvePoint !== -1) {
    scale = (monsterData.good + monsterData.evil)/baseStats.evolvePoint;
    if (scale < 0.5) {scale = 0.5};
  }

  targetKaiju.style.transform =
      targetKaiju.style.transform + ' scale(' + scale + ')';
};

KAIJU.walkKaiju = function(targetKaiju, speed, direction, i) {
  var left = parseInt(targetKaiju.getAttribute('data-x-coord'));
      left += speed * direction;
  if (left > window.innerWidth - 60 || left < 0) {
    direction = direction * -1;
  }

  targetKaiju.setAttribute('data-x-coord', left);
  targetKaiju.classList.toggle('kaiju-alt-frame');
  targetKaiju.style.transform = 'translateX(' + left + 'px)';

  if (direction === -1) {
    targetKaiju.style.transform = targetKaiju.style.transform +
        ' rotateY(180deg)';
  }

  KAIJU.state_.monsters[i].direction = direction;
};

KAIJU.saveData = function() {
  chrome.storage.sync.set({ "gameState": KAIJU.state_ }, function(){});
};

chrome.storage.sync.get(["gameState"], function(items){
  console.log(items.gameState);

  if (items.gameState !== undefined) {
    KAIJU.state_ = items.gameState;
  }

  KAIJU.init();
});
