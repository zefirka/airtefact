var logics = require('./executer.js');

function dist(a,b) {
  return Math.sqrt((a.X - b.X) * (a.X - b.X) + (a.Y - b.Y) * (a.Y - b.Y));
}
function Idle(){}


module.exports = {

  Element : function() {
    this.position = {X :0, Y :0};
    this.ID = logics.Elements.length + 1;
    this.Action = { Act: Idle, Params: 0};

    this.DoAction = function() {
      this.Action.Act(this, this.Action.Params);
      this.Action.Act = Idle;
    };
    this.AbortActive = function() {
      this.Action.Act = Idle;
    };
    this.SetAction = function(Act, params) {
      this.Action.Act = Act;
      this.Action.Params = params;
    };
    return this;
  },
  Move: function(elem, relative) {
    elem.position.X += relative.posX;
    elem.position.Y += relative.posY;
  }
};
