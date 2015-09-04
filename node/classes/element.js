var logics = require('./executer.js');
var phases = require('./phases.js');

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
    this.Action  = 0;
    this.actions = [];
    this.Phase = 0;
    this.ItemsInMind = {};
    this.Speed = 2;

    this.ConsiderAlgorithm = function() {
      if (this.Phase === 0) {
        this.AddAction(Idle);
      } else if (this.Phase.Blocks !== undefined) {
        var self = this;
        this.Phase.Blocks.forEach(function(item, i) {
          if(item.Condition.call(self)) {
            self.AddAction(module.exports[item.Action]);
            self.SetPhase(item.NextPhase);
          }
        });
      }
    };
    this.SetPhase = function (PhaseName) {
      var phase = (phases.Phases.filter(function(a) {
        return a.Name == PhaseName;
      }));
      this.Phase = phase[0];
    };
    this.DoAction = function() {
      if (this.actions.length === 0) {
        this.AddAction(Idle);
      }
      this.Action = this.actions[0];
      this.Action.call(this);
      this.actions.shift();

    };
    this.AbortActive = function() {
      this.Action.Act = Idle;
    };
    this.SetAction = function(Act, params) {
      this.Action.Act = Act;
      this.Action.Params = params;
    };
    this.AddAction = function(Act) {
      this.actions.push(Act);
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

  Move : function() {
    var vector = this.ItemsInMind.position;
    var X = vector.X /len(vector) * this.Speed;
    var Y = vector.Y /len(vector) * this.Speed;
    this.position.X += X;
    this.position.Y += Y;
  },
  GoTo : function() {
    var pos = this.ItemsInMind.position;
    var vector = {X : pos.X - this.position.X, Y : pos.Y - this.position.Y};
    var X = vector.X /len(vector) * this.Speed;
    var Y = vector.Y /len(vector) * this.Speed;
    this.position.X += X;
    this.position.Y += Y;
    if (dist(pos, this.position) > 10){
      this.AddAction(module.exports.GoTo);
    }
  },
  FollowCursor : function() {
    //  console.log(InfoBag);
    this.AddAction(module.exports.Move,
      {X : InfoBag.MousePos.X - this.position.X,
        Y : InfoBag.MousePos.Y - this.position.Y});
  },
  MoveToPosition : function() {
    var pos = this.ItemsInMind.position;
    this.AddAction(module.exports.Move,
      {X : pos.X - this.position.X,
        Y : pos.Y - this.position.Y});
  },
  FollowObject : function() {
    var obj = this.ItemsInMind.follow;
    this.AddAction(module.exports.Move,
      {X : obj.position.X - this.position.X,
        Y : obj.position.Y - this.position.Y});
  },
  MoveRandomly : function() {
    this.ItemsInMind.position = {X : getRandomArbitary(0, 300), Y : getRandomArbitary(0,300)};
    this.AddAction(module.exports.GoTo);
  },
  MoveRandom : function() {
    this.ItemsInMind.position = {X : getRandomArbitary(0, 300), Y : getRandomArbitary(0,300)};
    this.AddAction(module.exports.Move);
  }
};
