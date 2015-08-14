
function dist(a,b) {
  return Math.sqrt((a.X - b.X) * (a.X - b.X) + (a.Y - b.Y) * (a.Y - b.Y));
}
function Idle(){}

function Move(element, destination) {
  if (dist(element,destination) > 10) {
    element.position.X += (destination.X - element.position.X) / 5;
  } else {
    element.AbortActive();
  }
}

module.exports = {

  Element : function() {
    this.position = {X :0, Y :0}
    this.ID = 0;
    this.Action = Idle;

    this.DoAction = function() {
      Action();
    }
    this.AbortActive = function() {
      Action = Idle;
    }
  }
}
