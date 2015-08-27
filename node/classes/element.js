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


var Phases = [
  {Name : 'GoToPhase',
    Blocks : [{
      Condition : function(Params) {
        return this.Speed !== undefined && dist(this, Params[0]) >= 10;
      },
      Action : MoveToPosition,
      NextPhase : 'GoToPhase'
    },
    {
      Condition : function(Params) {
        return this.Speed !== undefined && dist(this, Params[0]) < 10;
      },
      Action : Idle,
      NextPhase : 'TestPhase'
    }],
    Params : 0
  }
];

var Module = {

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
        this.Phase.Blocks.forEach(function(item, i) {
          if(item.Condition()) {
            this.AddAction(Module[item.Action]);
            this.Phase = Phases[item.NextPhase];
          }
        });
      }
    };
    this.SetPhase = function (PhaseName) {
      this.Phase = Phases[PhaseName];
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

  Move : function(vector) {
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
      this.AddAction(Module.GoTo);
    }
  },
  FollowCursor : function() {
    //  console.log(InfoBag);
    this.AddAction(Module.Move,
      {X : InfoBag.MousePos.X - this.position.X,
        Y : InfoBag.MousePos.Y - this.position.Y});
  },
  MoveToPosition : function() {
    var pos = this.ItemsInMind.position;
    this.AddAction(Module.Move,
      {X : pos.X - this.position.X,
        Y : pos.Y - this.position.Y});
  },
  FollowObject : function() {
    var obj = this.ItemsInMind.follow;
    this.AddAction(Module.Move,
      {X : obj.position.X - this.position.X,
        Y : obj.position.Y - this.position.Y});
  },
  MoveRandomly : function() {
    this.ItemsInMind.position = {X : getRandomArbitary(0, 300), Y : getRandomArbitary(0,300)};
    this.AddAction(Module.GoTo);
  }
};

module.exports = Module;
