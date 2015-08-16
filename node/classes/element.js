var logics = require('./executer.js');

function dist(a,b) {
  return Math.sqrt((a.X - b.X) * (a.X - b.X) + (a.Y - b.Y) * (a.Y - b.Y));
}
function Idle(){}


module.exports = {

  Element : function() {
    this.position = {X :0, Y :0};
    this.ID = logics.Elements.length + 1;
    this.Action = { Act : Idle, Params : 0};
    this.actions = [];

    this.DoAction = function() {
      if (this.actions.length === 0) {
        this.Action.Act = Idle;
      } else {
        this.Action.Act = this.actions[0].Act;
        this.Action.Params = this.actions[0].Params;
      }
      this.Action.Act(this, this.Action.Params);
      this.actions.shift();

    };
    this.AbortActive = function() {
      this.Action.Act = Idle;
    };
    this.SetAction = function(Act, params) {
      this.Action.Act = Act;
      this.Action.Params = params;
    };
    this.AddAction = function(Act, params) {
      var Action = {};
      Action.Act = Act;
      Action.Params = params;
      this.actions.push(Action);
    };
    return this;
  },
  Move : function(elem, relative) {
    console.log(elem.position);
    elem.position.X += relative.posX;
    elem.position.Y += relative.posY;
    console.log(elem.position);
  },
  GetElementsById : function(ID) {
    return logics.Elements.filter(function(a) {
      return a.ID == ID;
    });
  }
};
