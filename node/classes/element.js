var logics = require('./executer.js');

function getRandomArbitary(min, max)
{
  return Math.random() * (max - min) + min;
}


function dist(a,b) {
  return Math.sqrt((a.X - b.X) * (a.X - b.X) + (a.Y - b.Y) * (a.Y - b.Y));
}
function len(vector) {
  return (Math.sqrt(vector.X * vector.X + vector.Y * vector.Y));
}
function Idle(){}

var InfoBag = {MousePos : {X :0, Y :0}};

module.exports = {

  Element : function() {
    this.position = {X :0, Y :0};
    this.ID = logics.Elements.length + 1;
    this.Action = { Act : Idle, Params : 0};
    this.actions = [];
    this.Rules = [];
    this.Speed = 2;

    this.DoAction = function() {
      if (this.actions.length === 0) {
        this.AddAction(module.exports.MoveRandomly);
      }
      this.Action.Act = this.actions[0].Act;
      this.Action.Params = this.actions[0].Params;
      this.Action.Act.call(this, this.Action.Params);
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
    this.AddRule = function(Rule, params, Name) {
      var contains = false;
      this.Rules.forEach(function(item) {
        if (item.Name == Name) {
          contains = true;
        }
      });
      if (!contains)
      {
        var R = {};
        R.Rule = Rule;
        R.Params = params;
        R.Name = Name;
        this.Rules.push(R);
      }
    };
    return this;
  },
  GetElementsById : function(ID) {
    return logics.Elements.filter(function(a) {
      return a.ID == ID;
    });
  },
  UpdateInfo : function(infoCollection) {
    for(var i = 0; i < infoCollection.length; i++) {
      for(var e in infoCollection[i]) {
        InfoBag[e] = infoCollection[i][e];
      }
    }
  },

  Move : function(vector) {
    var X = vector.X /len(vector) * this.Speed;
    var Y = vector.Y /len(vector) * this.Speed;
    this.position.X += X;
    this.position.Y += Y;
  },
  MoveTo : function(position) {
    var vector = {X : position.X - this.position.X, Y : position.Y - this.position.Y};
    var X = vector.X /len(vector) * this.Speed;
    var Y = vector.Y /len(vector) * this.Speed;
    this.position.X += X;
    this.position.Y += Y;
    if (dist(position, this.position) > 10){
      this.AddAction(module.exports.MoveTo, position);
    }
  },
  FollowCursor : function() {
    //  console.log(InfoBag);
    this.AddAction(module.exports.Move,
      {X : InfoBag.MousePos.X - this.position.X,
        Y : InfoBag.MousePos.Y - this.position.Y});
  },
  FollowObject : function(elem) {
    elem = elem[0];
    this.AddAction(module.exports.Move,
      {X : elem.position.X - this.position.X,
        Y : elem.position.Y - this.position.Y});
  },
  MoveRandomly : function() {
    var randPos = {X : getRandomArbitary(0, 300), Y : getRandomArbitary(0,300)};
    this.AddAction(module.exports.MoveTo, randPos);
  }
};
