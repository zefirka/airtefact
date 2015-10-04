var Game   = require('./game');

function physics() {
  var friction = 1;
  game.elements.forEach(function(item) {
    if(item.v !== undefined) {
      item.x = item.x + item.v.x;
      item.y = item.y + item.v.y;
    }
    if(item.a !== undefined) {
      if(!item.v) {
        item.v = {x: 0, y: 0};
      }
      if(!item.a) {
        item.v = {x: -1, y: -1  };
      }
      item.v.x = item.v.x + item.a.x;
      item.v.y = item.v.y + item.a.y;
      item.a.x -= friction;
      item.a.y = Math.abs(item.a.y - friction) > 1 ? 0 :
       item.a.y > 0 ?  item.a.y - friction :
       item.a.y + friction;
    }
  });
}

module.exports = physics;
