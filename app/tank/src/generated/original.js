// Generated from the local 4399 2014 ActionScript. Do not edit; run npm run port.
const avmGet=(o,k)=>o==null?undefined:o[k];
const avmCall=(o,k,args)=>{if(o==null)return undefined;if(typeof o[k]!=="function")throw Error("Unsupported AVM call "+k+" on "+(o.kind||o.name||typeof o));return o[k].apply(o,args);};
export function installCore(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.createMaze = (function createMaze(xsize, ysize) {
  scope.tempmaze = new Array(xsize + 1);
  var _loc2_ = 0;
  while (_loc2_ < avmGet(scope.tempmaze, "length")) {
    scope.tempmaze[_loc2_] = new Array(ysize + 1);
    _loc2_ = _loc2_ + 1;
  }
  _loc2_ = 0;
  var _loc1_;
  while (_loc2_ < avmGet(scope.tempmaze, "length")) {
    _loc1_ = 0;
    while (_loc1_ < avmGet(avmGet(scope.tempmaze, _loc2_), "length")) {
      avmGet(scope.tempmaze, _loc2_)[_loc1_] = random(4);
      _loc1_ = _loc1_ + 1;
    }
    _loc2_ = _loc2_ + 1;
  }
  scope.maze = new Array(xsize);
  _loc2_ = 0;
  while (_loc2_ < avmGet(scope.maze, "length")) {
    scope.maze[_loc2_] = new Array(ysize);
    _loc2_ = _loc2_ + 1;
  }
  _loc2_ = 0;
  var _loc3_;
  var _loc4_;
  while (_loc2_ < avmGet(scope.maze, "length")) {
    _loc1_ = 0;
    while (_loc1_ < avmGet(avmGet(scope.maze, _loc2_), "length")) {
      _loc3_ = avmGet(avmGet(scope.tempmaze, _loc2_), _loc1_ + 1) == 2 || avmGet(avmGet(scope.tempmaze, _loc2_ + 1), _loc1_ + 1) == 0;
      _loc4_ = avmGet(avmGet(scope.tempmaze, _loc2_), _loc1_) == 1 || avmGet(avmGet(scope.tempmaze, _loc2_), _loc1_ + 1) == 3;
      avmGet(scope.maze, _loc2_)[_loc1_] = new Array(1, !_loc3_ ? 0 : 1, !_loc4_ ? 0 : 1);
      _loc1_ = _loc1_ + 1;
    }
    _loc2_ = _loc2_ + 1;
  }
  return scope.maze;
}).bind(scope);
scope.calcReachable = (function calcReachable(maze, startx, starty) {
  _root.reachableIndex = new Array(avmGet(maze, "length"));
  var _loc6_ = 0;
  while (_loc6_ < avmGet(maze, "length")) {
    avmGet(_root, "reachableIndex")[_loc6_] = new Array(avmGet(avmGet(maze, _loc6_), "length"));
    _loc6_ = _loc6_ + 1;
  }
  var _loc4_ = new Array();
  var _loc7_ = new Array();
  var _loc5_ = new Array();
  avmCall(_loc5_, "push", [{
    x: startx,
    y: starty
  }]);
  var _loc2_;
  while (avmGet(_loc5_, "length") > 0) {
    _loc2_ = avmCall(_loc5_, "pop", []);
    avmGet(scope.reachableIndex, avmGet(_loc2_, "x"))[avmGet(_loc2_, "y")] = avmGet(_loc7_, "length");
    avmCall(_loc7_, "push", [_loc2_]);
    _loc4_[avmGet(_loc2_, "x") + avmGet(_loc2_, "y") * avmGet(maze, "length")] = true;
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc2_, "x")), avmGet(_loc2_, "y")), 2) == 0 && avmGet(_loc2_, "x") > 0) {
      if (avmGet(_loc4_, avmGet(_loc2_, "x") - 1 + avmGet(_loc2_, "y") * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc2_, "x") - 1 + avmGet(_loc2_, "y") * avmGet(maze, "length")] = true;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc2_, "x") - 1,
          y: avmGet(_loc2_, "y")
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc2_, "x") + 1), avmGet(_loc2_, "y")), 2) == 0 && avmGet(_loc2_, "x") < avmGet(maze, "length") - 1) {
      if (avmGet(_loc4_, avmGet(_loc2_, "x") + 1 + avmGet(_loc2_, "y") * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc2_, "x") + 1 + avmGet(_loc2_, "y") * avmGet(maze, "length")] = true;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc2_, "x") + 1,
          y: avmGet(_loc2_, "y")
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc2_, "x")), avmGet(_loc2_, "y") - 1), 1) == 0 && avmGet(_loc2_, "y") > 0) {
      if (avmGet(_loc4_, avmGet(_loc2_, "x") + (avmGet(_loc2_, "y") - 1) * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc2_, "x") + (avmGet(_loc2_, "y") - 1) * avmGet(maze, "length")] = true;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc2_, "x"),
          y: avmGet(_loc2_, "y") - 1
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc2_, "x")), avmGet(_loc2_, "y")), 1) == 0 && avmGet(_loc2_, "y") < avmGet(avmGet(maze, avmGet(_loc2_, "x")), "length") - 1) {
      if (avmGet(_loc4_, avmGet(_loc2_, "x") + (avmGet(_loc2_, "y") + 1) * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc2_, "x") + (avmGet(_loc2_, "y") + 1) * avmGet(maze, "length")] = true;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc2_, "x"),
          y: avmGet(_loc2_, "y") + 1
        }]);
      }
    }
  }
  return _loc7_;
}).bind(scope);
scope.findDeadEnds = (function findDeadEnds(maze, reachable) {
  var _loc2_ = new Array(avmGet(maze, "length"));
  var _loc6_ = 0;
  while (_loc6_ < avmGet(_loc2_, "length")) {
    _loc2_[_loc6_] = new Array(avmGet(avmGet(maze, _loc6_), "length"));
    _loc6_ = _loc6_ + 1;
  }
  var _loc8_ = new Array();
  _loc6_ = 0;
  while (_loc6_ < avmGet(reachable, "length")) {
    avmCall(_loc8_, "push", [avmGet(reachable, _loc6_)]);
    avmGet(_loc2_, avmGet(avmGet(reachable, _loc6_), "x"))[avmGet(avmGet(reachable, _loc6_), "y")] = 0;
    _loc6_ = _loc6_ + 1;
  }
  var _loc1_;
  var _loc7_;
  var _loc5_;
  var _loc4_;
  while (avmGet(_loc8_, "length") > 0) {
    _loc1_ = avmCall(_loc8_, "pop", []);
    if (!avmGet(avmGet(_loc2_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y"))) {
      _loc5_ = 0;
      _loc4_ = scope.MAXDEADENDPENALTY;
      if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 2) == 0 && avmGet(_loc1_, "x") > 0 && !avmGet(avmGet(_loc2_, avmGet(_loc1_, "x") - 1), avmGet(_loc1_, "y"))) {
        _loc7_ = {
          x: avmGet(_loc1_, "x") - 1,
          y: avmGet(_loc1_, "y")
        };
        _loc5_ = _loc5_ + 1;
      } else if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 2) == 0 && avmGet(_loc1_, "x") > 0) {
        _loc4_ = avmCall(Math, "max", [1, avmCall(Math, "min", [avmGet(avmGet(_loc2_, avmGet(_loc1_, "x") - 1), avmGet(_loc1_, "y")) - 1, _loc4_])]);
      }
      if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y")), 2) == 0 && avmGet(_loc1_, "x") < avmGet(maze, "length") - 1 && !avmGet(avmGet(_loc2_, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y"))) {
        _loc7_ = {
          x: avmGet(_loc1_, "x") + 1,
          y: avmGet(_loc1_, "y")
        };
        _loc5_ = _loc5_ + 1;
      } else if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y")), 2) == 0 && avmGet(_loc1_, "x") < avmGet(maze, "length") - 1) {
        _loc4_ = avmCall(Math, "max", [1, avmCall(Math, "min", [avmGet(avmGet(_loc2_, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y")) - 1, _loc4_])]);
      }
      if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") - 1), 1) == 0 && avmGet(_loc1_, "y") > 0 && !avmGet(avmGet(_loc2_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") - 1)) {
        _loc7_ = {
          x: avmGet(_loc1_, "x"),
          y: avmGet(_loc1_, "y") - 1
        };
        _loc5_ = _loc5_ + 1;
      } else if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") - 1), 1) == 0 && avmGet(_loc1_, "y") > 0) {
        _loc4_ = avmCall(Math, "max", [1, avmCall(Math, "min", [avmGet(avmGet(_loc2_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") - 1) - 1, _loc4_])]);
      }
      if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 1) == 0 && avmGet(_loc1_, "y") < avmGet(avmGet(maze, avmGet(_loc1_, "x")), "length") - 1 && !avmGet(avmGet(_loc2_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") + 1)) {
        _loc7_ = {
          x: avmGet(_loc1_, "x"),
          y: avmGet(_loc1_, "y") + 1
        };
        _loc5_ = _loc5_ + 1;
      } else if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 1) == 0 && avmGet(_loc1_, "y") < avmGet(avmGet(maze, avmGet(_loc1_, "x")), "length") - 1) {
        _loc4_ = avmCall(Math, "max", [1, avmCall(Math, "min", [avmGet(avmGet(_loc2_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") + 1) - 1, _loc4_])]);
      }
      if (_loc5_ == 1) {
        avmGet(_loc2_, avmGet(_loc1_, "x"))[avmGet(_loc1_, "y")] = _loc4_;
        avmCall(_loc8_, "push", [_loc7_]);
      }
      if (_loc5_ == 0) {
        avmGet(_loc2_, avmGet(_loc1_, "x"))[avmGet(_loc1_, "y")] = _loc4_;
      }
    }
  }
  return _loc2_;
}).bind(scope);
scope.calcDistances = (function calcDistances(maze, startx, starty) {
  var _loc3_ = new Array(avmGet(maze, "length"));
  var _loc6_ = 0;
  while (_loc6_ < avmGet(_loc3_, "length")) {
    _loc3_[_loc6_] = new Array(avmGet(avmGet(maze, _loc6_), "length"));
    _loc6_ = _loc6_ + 1;
  }
  var _loc4_ = new Array();
  var _loc5_ = new Array();
  avmCall(_loc5_, "push", [{
    x: startx,
    y: starty
  }]);
  var _loc7_ = 0;
  avmGet(_loc3_, startx)[starty] = 0;
  var _loc1_;
  while (_loc7_ < avmGet(_loc5_, "length")) {
    _loc1_ = avmGet(_loc5_, _loc7_);
    _loc7_ = _loc7_ + 1;
    _loc4_[avmGet(_loc1_, "x") + avmGet(_loc1_, "y") * avmGet(maze, "length")] = true;
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 2) == 0 && avmGet(_loc1_, "x") > 0) {
      if (avmGet(_loc4_, avmGet(_loc1_, "x") - 1 + avmGet(_loc1_, "y") * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc1_, "x") - 1 + avmGet(_loc1_, "y") * avmGet(maze, "length")] = true;
        avmGet(_loc3_, avmGet(_loc1_, "x") - 1)[avmGet(_loc1_, "y")] = avmGet(avmGet(_loc3_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")) + 1;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc1_, "x") - 1,
          y: avmGet(_loc1_, "y")
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y")), 2) == 0 && avmGet(_loc1_, "x") < avmGet(maze, "length") - 1) {
      if (avmGet(_loc4_, avmGet(_loc1_, "x") + 1 + avmGet(_loc1_, "y") * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc1_, "x") + 1 + avmGet(_loc1_, "y") * avmGet(maze, "length")] = true;
        avmGet(_loc3_, avmGet(_loc1_, "x") + 1)[avmGet(_loc1_, "y")] = avmGet(avmGet(_loc3_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")) + 1;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc1_, "x") + 1,
          y: avmGet(_loc1_, "y")
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") - 1), 1) == 0 && avmGet(_loc1_, "y") > 0) {
      if (avmGet(_loc4_, avmGet(_loc1_, "x") + (avmGet(_loc1_, "y") - 1) * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc1_, "x") + (avmGet(_loc1_, "y") - 1) * avmGet(maze, "length")] = true;
        avmGet(_loc3_, avmGet(_loc1_, "x"))[avmGet(_loc1_, "y") - 1] = avmGet(avmGet(_loc3_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")) + 1;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc1_, "x"),
          y: avmGet(_loc1_, "y") - 1
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 1) == 0 && avmGet(_loc1_, "y") < avmGet(avmGet(maze, avmGet(_loc1_, "x")), "length") - 1) {
      if (avmGet(_loc4_, avmGet(_loc1_, "x") + (avmGet(_loc1_, "y") + 1) * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc1_, "x") + (avmGet(_loc1_, "y") + 1) * avmGet(maze, "length")] = true;
        avmGet(_loc3_, avmGet(_loc1_, "x"))[avmGet(_loc1_, "y") + 1] = avmGet(avmGet(_loc3_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")) + 1;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc1_, "x"),
          y: avmGet(_loc1_, "y") + 1
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 1) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 2) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") - 1), avmGet(_loc1_, "y")), 1) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") + 1), 2) == 0 && avmGet(_loc1_, "x") > 0 && avmGet(_loc1_, "y") < avmGet(avmGet(maze, avmGet(_loc1_, "x")), "length") - 1) {
      if (avmGet(_loc4_, avmGet(_loc1_, "x") - 1 + (avmGet(_loc1_, "y") + 1) * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc1_, "x") - 1 + (avmGet(_loc1_, "y") + 1) * avmGet(maze, "length")] = true;
        avmGet(_loc3_, avmGet(_loc1_, "x") - 1)[avmGet(_loc1_, "y") + 1] = avmGet(avmGet(_loc3_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")) + 1.414214;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc1_, "x") - 1,
          y: avmGet(_loc1_, "y") + 1
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 1) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y")), 2) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y")), 1) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y") + 1), 2) == 0 && avmGet(_loc1_, "x") < avmGet(maze, "length") - 1 && avmGet(_loc1_, "y") < avmGet(avmGet(maze, avmGet(_loc1_, "x")), "length") - 1) {
      if (avmGet(_loc4_, avmGet(_loc1_, "x") + 1 + (avmGet(_loc1_, "y") + 1) * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc1_, "x") + 1 + (avmGet(_loc1_, "y") + 1) * avmGet(maze, "length")] = true;
        avmGet(_loc3_, avmGet(_loc1_, "x") + 1)[avmGet(_loc1_, "y") + 1] = avmGet(avmGet(_loc3_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")) + 1.414214;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc1_, "x") + 1,
          y: avmGet(_loc1_, "y") + 1
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")), 2) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") - 1), 2) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") - 1), avmGet(_loc1_, "y") - 1), 1) == 0 && avmGet(_loc1_, "x") > 0 && avmGet(_loc1_, "y") > 0) {
      if (avmGet(_loc4_, avmGet(_loc1_, "x") - 1 + (avmGet(_loc1_, "y") - 1) * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc1_, "x") - 1 + (avmGet(_loc1_, "y") - 1) * avmGet(maze, "length")] = true;
        avmGet(_loc3_, avmGet(_loc1_, "x") - 1)[avmGet(_loc1_, "y") - 1] = avmGet(avmGet(_loc3_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")) + 1.414214;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc1_, "x") - 1,
          y: avmGet(_loc1_, "y") - 1
        }]);
      }
    }
    if (avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y")), 2) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x")), avmGet(_loc1_, "y") - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y") - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, avmGet(_loc1_, "x") + 1), avmGet(_loc1_, "y") - 1), 2) == 0 && avmGet(_loc1_, "x") < avmGet(maze, "length") - 1 && avmGet(_loc1_, "y") > 0) {
      if (avmGet(_loc4_, avmGet(_loc1_, "x") + 1 + (avmGet(_loc1_, "y") - 1) * avmGet(maze, "length")) == undefined) {
        _loc4_[avmGet(_loc1_, "x") + 1 + (avmGet(_loc1_, "y") - 1) * avmGet(maze, "length")] = true;
        avmGet(_loc3_, avmGet(_loc1_, "x") + 1)[avmGet(_loc1_, "y") - 1] = avmGet(avmGet(_loc3_, avmGet(_loc1_, "x")), avmGet(_loc1_, "y")) + 1.414214;
        avmCall(_loc5_, "push", [{
          x: avmGet(_loc1_, "x") + 1,
          y: avmGet(_loc1_, "y") - 1
        }]);
      }
    }
  }
  return _loc3_;
}).bind(scope);
scope.getShortestPath = (function getShortestPath(maze, startx, starty, endx, endy) {
  var _loc1_ = avmCall(scope, "calcDistances", [maze, startx, starty]);
  return avmCall(scope, "getShortestPathWithDistances", [maze, _loc1_, startx, starty, endx, endy]);
}).bind(scope);
scope.getShortestPathWithDistances = (function getShortestPathWithDistances(maze, distances, startx, starty, endx, endy) {
  var _loc10_ = new Array();
  var _loc1_ = endx;
  var _loc2_ = endy;
  var _loc11_ = avmGet(avmGet(distances, _loc1_), _loc2_);
  var _loc4_ = _loc11_;
  var _loc6_ = endx;
  var _loc7_ = endy;
  do {
    avmCall(_loc10_, "push", [{
      x: _loc1_,
      y: _loc2_
    }]);
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ - 1), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ + 1), 2) == 0 && _loc1_ > 0 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1 && avmGet(avmGet(distances, _loc1_ - 1), _loc2_ + 1) < _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ - 1), _loc2_ + 1);
      _loc6_ = _loc1_ - 1;
      _loc7_ = _loc2_ + 1;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ + 1), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1 && avmGet(avmGet(distances, _loc1_ + 1), _loc2_ + 1) < _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ + 1), _loc2_ + 1);
      _loc6_ = _loc1_ + 1;
      _loc7_ = _loc2_ + 1;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ - 1), _loc2_ - 1), 1) == 0 && _loc1_ > 0 && _loc2_ > 0 && avmGet(avmGet(distances, _loc1_ - 1), _loc2_ - 1) < _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ - 1), _loc2_ - 1);
      _loc6_ = _loc1_ - 1;
      _loc7_ = _loc2_ - 1;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ - 1), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && _loc2_ > 0 && avmGet(avmGet(distances, _loc1_ + 1), _loc2_ - 1) < _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ + 1), _loc2_ - 1);
      _loc6_ = _loc1_ + 1;
      _loc7_ = _loc2_ - 1;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && _loc1_ > 0 && avmGet(avmGet(distances, _loc1_ - 1), _loc2_) < _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ - 1), _loc2_);
      _loc6_ = _loc1_ - 1;
      _loc7_ = _loc2_;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && avmGet(avmGet(distances, _loc1_ + 1), _loc2_) < _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ + 1), _loc2_);
      _loc6_ = _loc1_ + 1;
      _loc7_ = _loc2_;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && _loc2_ > 0 && avmGet(avmGet(distances, _loc1_), _loc2_ - 1) < _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_), _loc2_ - 1);
      _loc6_ = _loc1_;
      _loc7_ = _loc2_ - 1;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1 && avmGet(avmGet(distances, _loc1_), _loc2_ + 1) < _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_), _loc2_ + 1);
      _loc6_ = _loc1_;
      _loc7_ = _loc2_ + 1;
    }
    _loc11_ = _loc4_;
    _loc1_ = _loc6_;
    _loc2_ = _loc7_;
  } while (_loc1_ != startx || _loc2_ != starty);
  avmCall(_loc10_, "reverse", []);
  return _loc10_;
}).bind(scope);
scope.optimizeShortestPath = (function optimizeShortestPath(maze, path) {
  var _loc2_ = avmCall(path, "pop", []);
  var _loc3_ = avmCall(path, "pop", []);
  var _loc4_ = avmGet(path, avmGet(path, "length") - 1);
  if (avmCall(scope, "checkClearPath", [maze, _loc4_, _loc2_])) {
    avmCall(path, "push", [_loc2_]);
  } else {
    avmCall(path, "push", [_loc3_]);
    avmCall(path, "push", [_loc2_]);
  }
}).bind(scope);
scope.checkClearPath = (function checkClearPath(maze, start, end) {
  var _loc10_ = avmCall(Math, "sqrt", [(avmGet(start, "x") - avmGet(end, "x")) * (avmGet(start, "x") - avmGet(end, "x")) + (avmGet(start, "y") - avmGet(end, "y")) * (avmGet(start, "y") - avmGet(end, "y"))]);
  var _loc5_ = (avmGet(end, "x") - avmGet(start, "x")) / _loc10_;
  var _loc6_ = (avmGet(end, "y") - avmGet(start, "y")) / _loc10_;
  var _loc8_ = avmGet(start, "x") + 0.5;
  var _loc7_ = avmGet(start, "y") + 0.5;
  var _loc1_ = avmCall(Math, "floor", [_loc8_]);
  var _loc2_ = avmCall(Math, "floor", [_loc7_]);
  while (_loc1_ != avmGet(end, "x") || _loc2_ != avmGet(end, "y")) {
    if (_loc5_ < 0 && _loc6_ > 0 && _loc1_ > avmGet(end, "x") && _loc2_ < avmGet(end, "y")) {
      if (!(avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ - 1), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ + 1), 2) == 0 && _loc1_ > 0 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1)) {
        return false;
      }
    }
    if (_loc5_ > 0 && _loc6_ > 0 && _loc1_ < avmGet(end, "x") && _loc2_ < avmGet(end, "y")) {
      if (!(avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ + 1), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1)) {
        return false;
      }
    }
    if (_loc5_ < 0 && _loc6_ < 0 && _loc1_ > avmGet(end, "x") && _loc2_ > avmGet(end, "y")) {
      if (!(avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ - 1), _loc2_ - 1), 1) == 0 && _loc1_ > 0 && _loc2_ > 0)) {
        return false;
      }
    }
    if (_loc5_ > 0 && _loc6_ < 0 && _loc1_ < avmGet(end, "x") && _loc2_ > avmGet(end, "y")) {
      if (!(avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ - 1), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && _loc2_ > 0)) {
        return false;
      }
    }
    if (_loc5_ < 0 && _loc6_ == 0) {
      if (!(avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && _loc1_ > 0)) {
        return false;
      }
    }
    if (_loc5_ > 0 && _loc6_ == 0) {
      if (!(avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1)) {
        return false;
      }
    }
    if (_loc5_ == 0 && _loc6_ < 0) {
      if (!(avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && _loc2_ > 0)) {
        return false;
      }
    }
    if (_loc5_ == 0 && _loc6_ > 0) {
      if (!(avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1)) {
        return false;
      }
    }
    _loc8_ += _loc5_;
    _loc7_ += _loc6_;
    _loc1_ = avmCall(Math, "floor", [_loc8_]);
    _loc2_ = avmCall(Math, "floor", [_loc7_]);
  }
  return true;
}).bind(scope);
scope.followGradientPathWithDistances = (function followGradientPathWithDistances(maze, distances, startx, starty, maxLength) {
  var _loc12_ = new Array();
  var _loc1_ = startx;
  var _loc2_ = starty;
  var _loc6_ = startx;
  var _loc7_ = starty;
  var _loc11_ = avmGet(avmGet(distances, _loc1_), _loc2_);
  var _loc4_ = _loc11_;
  do {
    var foundPlace = false;
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ - 1), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ + 1), 2) == 0 && _loc1_ > 0 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1 && avmGet(avmGet(distances, _loc1_ - 1), _loc2_ + 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ - 1), _loc2_ + 1);
      _loc6_ = _loc1_ - 1;
      _loc7_ = _loc2_ + 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ + 1), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1 && avmGet(avmGet(distances, _loc1_ + 1), _loc2_ + 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ + 1), _loc2_ + 1);
      _loc6_ = _loc1_ + 1;
      _loc7_ = _loc2_ + 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ - 1), _loc2_ - 1), 1) == 0 && _loc1_ > 0 && _loc2_ > 0 && avmGet(avmGet(distances, _loc1_ - 1), _loc2_ - 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ - 1), _loc2_ - 1);
      _loc6_ = _loc1_ - 1;
      _loc7_ = _loc2_ - 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ - 1), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && _loc2_ > 0 && avmGet(avmGet(distances, _loc1_ + 1), _loc2_ - 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ + 1), _loc2_ - 1);
      _loc6_ = _loc1_ + 1;
      _loc7_ = _loc2_ - 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && _loc1_ > 0 && avmGet(avmGet(distances, _loc1_ - 1), _loc2_) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ - 1), _loc2_);
      _loc6_ = _loc1_ - 1;
      _loc7_ = _loc2_;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && avmGet(avmGet(distances, _loc1_ + 1), _loc2_) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ + 1), _loc2_);
      _loc6_ = _loc1_ + 1;
      _loc7_ = _loc2_;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && _loc2_ > 0 && avmGet(avmGet(distances, _loc1_), _loc2_ - 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_), _loc2_ - 1);
      _loc6_ = _loc1_;
      _loc7_ = _loc2_ - 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1 && avmGet(avmGet(distances, _loc1_), _loc2_ + 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_), _loc2_ + 1);
      _loc6_ = _loc1_;
      _loc7_ = _loc2_ + 1;
      foundPlace = true;
    }
    _loc11_ = _loc4_;
    _loc1_ = _loc6_;
    _loc2_ = _loc7_;
    avmCall(_loc12_, "push", [{
      x: _loc1_,
      y: _loc2_
    }]);
    maxLength = maxLength - 1;
  } while (foundPlace && maxLength > 0);
  return _loc12_;
}).bind(scope);
scope.followGradientPathWithDistancesAndDeadEnds = (function followGradientPathWithDistancesAndDeadEnds(maze, distances, deadEnds, startx, starty, maxLength) {
  var _loc16_ = new Array();
  var _loc1_ = startx;
  var _loc2_ = starty;
  var _loc7_ = startx;
  var _loc8_ = starty;
  var _loc9_ = avmGet(avmGet(distances, _loc1_), _loc2_) - avmGet(avmGet(deadEnds, _loc1_), _loc2_);
  var _loc4_ = _loc9_;
  var _loc12_;
  var _loc10_;
  var _loc11_;
  do {
    var foundPlace = false;
    _loc12_ = _loc9_;
    _loc10_ = 0;
    _loc11_ = 0;
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ - 1), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ + 1), 2) == 0 && _loc1_ > 0 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1 && avmGet(avmGet(distances, _loc1_ - 1), _loc2_ + 1) - avmGet(avmGet(deadEnds, _loc1_ - 1), _loc2_ + 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ - 1), _loc2_ + 1) - avmGet(avmGet(deadEnds, _loc1_ - 1), _loc2_ + 1);
      _loc7_ = _loc1_ - 1;
      _loc8_ = _loc2_ + 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ + 1), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1 && avmGet(avmGet(distances, _loc1_ + 1), _loc2_ + 1) - avmGet(avmGet(deadEnds, _loc1_ + 1), _loc2_ + 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ + 1), _loc2_ + 1) - avmGet(avmGet(deadEnds, _loc1_ + 1), _loc2_ + 1);
      _loc7_ = _loc1_ + 1;
      _loc8_ = _loc2_ + 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ - 1), _loc2_ - 1), 1) == 0 && _loc1_ > 0 && _loc2_ > 0 && avmGet(avmGet(distances, _loc1_ - 1), _loc2_ - 1) - avmGet(avmGet(deadEnds, _loc1_ - 1), _loc2_ - 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ - 1), _loc2_ - 1) - avmGet(avmGet(deadEnds, _loc1_ - 1), _loc2_ - 1);
      _loc7_ = _loc1_ - 1;
      _loc8_ = _loc2_ - 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ - 1), 1) == 0 && avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_ - 1), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && _loc2_ > 0 && avmGet(avmGet(distances, _loc1_ + 1), _loc2_ - 1) - avmGet(avmGet(deadEnds, _loc1_ + 1), _loc2_ - 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ + 1), _loc2_ - 1) - avmGet(avmGet(deadEnds, _loc1_ + 1), _loc2_ - 1);
      _loc7_ = _loc1_ + 1;
      _loc8_ = _loc2_ - 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 2) == 0 && _loc1_ > 0 && avmGet(avmGet(distances, _loc1_ - 1), _loc2_) - avmGet(avmGet(deadEnds, _loc1_ - 1), _loc2_) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ - 1), _loc2_) - avmGet(avmGet(deadEnds, _loc1_ - 1), _loc2_);
      _loc7_ = _loc1_ - 1;
      _loc8_ = _loc2_;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_ + 1), _loc2_), 2) == 0 && _loc1_ < avmGet(maze, "length") - 1 && avmGet(avmGet(distances, _loc1_ + 1), _loc2_) - avmGet(avmGet(deadEnds, _loc1_ + 1), _loc2_) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_ + 1), _loc2_) - avmGet(avmGet(deadEnds, _loc1_ + 1), _loc2_);
      _loc7_ = _loc1_ + 1;
      _loc8_ = _loc2_;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_ - 1), 1) == 0 && _loc2_ > 0 && avmGet(avmGet(distances, _loc1_), _loc2_ - 1) - avmGet(avmGet(deadEnds, _loc1_), _loc2_ - 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_), _loc2_ - 1) - avmGet(avmGet(deadEnds, _loc1_), _loc2_ - 1);
      _loc7_ = _loc1_;
      _loc8_ = _loc2_ - 1;
      foundPlace = true;
    }
    if (avmGet(avmGet(avmGet(maze, _loc1_), _loc2_), 1) == 0 && _loc2_ < avmGet(avmGet(maze, _loc1_), "length") - 1 && avmGet(avmGet(distances, _loc1_), _loc2_ + 1) - avmGet(avmGet(deadEnds, _loc1_), _loc2_ + 1) > _loc4_) {
      _loc4_ = avmGet(avmGet(distances, _loc1_), _loc2_ + 1) - avmGet(avmGet(deadEnds, _loc1_), _loc2_ + 1);
      _loc7_ = _loc1_;
      _loc8_ = _loc2_ + 1;
      foundPlace = true;
    }
    _loc9_ = _loc4_;
    _loc1_ = _loc7_;
    _loc2_ = _loc8_;
    avmCall(_loc16_, "push", [{
      x: _loc1_,
      y: _loc2_
    }]);
    maxLength = maxLength - 1;
  } while (foundPlace && maxLength > 0);
  return _loc16_;
}).bind(scope);
scope.destroyTank = (function destroyTank(number) {
  const Math = env.visualMath, random = env.visualRandom;
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundExplosion"), "start", []);
    avmCall(avmGet(_root, "soundExplosion2"), "start", []);
  }
  avmGet(avmGet(_root, "game"), "tank" + number).alive = false;
  avmGet(avmGet(_root, "game"), "tank" + number)._visible = false;
  _root.aliveCount = avmGet(_root, "aliveCount") - 1;
  _root.endCount = avmGet(_root, "NUMBEROFFRAMESBEFOREEND");
  _root.shake = avmCall(Math, "min", [avmGet(_root, "MAXSHAKE"), avmGet(_root, "shake") + 7]);
  var _loc5_ = 0;
  while (_loc5_ < avmGet(_root, "NUMBEROFSMOKECLOUDS")) {
    avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["smoke" + number + "-" + _loc5_, avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    scope.s = avmGet(avmGet(_root, "game"), "smoke" + number + "-" + _loc5_);
    avmCall(scope.s, "lineStyle", [15 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4)]) * 1118481, 40 + random(20)]);
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    scope.s.xspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.yspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.x = avmGet(avmGet(avmGet(_root, "game"), "tank" + number), "_x") + avmGet(scope.s, "xspeed") * (random(6) + 1) + (random(2) - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.y = avmGet(avmGet(avmGet(_root, "game"), "tank" + number), "_y") + avmGet(scope.s, "yspeed") * (random(6) + 1) + (random(2) - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 2;
      this._yscale += 2;
      this._alpha -= 3 - avmCall(Math, "random", []) * 2;
      this.xspeed *= 0.93;
      this.yspeed *= 0.93;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc5_ = _loc5_ + 1;
  }
  _loc5_ = 0;
  while (_loc5_ < avmGet(_root, "NUMBEROFFRAGMENTS")) {
    avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "createEmptyMovieClip", ["fragment" + number + "-" + _loc5_, avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
    scope.f = avmGet(avmGet(avmGet(_root, "game"), "mazebg"), "fragment" + number + "-" + _loc5_);
    scope.dir = avmCall(Math, "random", []) * 3.141593 * 2;
    scope.speed = avmCall(Math, "random", []) * 3 + 1;
    scope.f.xspeed = avmCall(Math, "cos", [scope.dir]) * (scope.speed / 1.5) * (avmGet(_root, "SCALE") / 50);
    scope.f.yspeed = avmCall(Math, "sin", [scope.dir]) * (scope.speed / 1.5) * (avmGet(_root, "SCALE") / 50);
    scope.f.rotspeed = avmCall(Math, "random", []) * 120 - 60;
    scope.f.active = true;
    scope.f.smokenamebase = "smoke-fragment" + number + "-" + _loc5_;
    scope.f.smokecounter = 0;
    scope.f.hitPoints = new Array();
    avmCall(scope.f, "lineStyle", [1, 0, 100, false, "none"]);
    if (avmCall(Math, "random", []) > 0.4) {
      avmCall(scope.f, "beginFill", [parseInt(avmGet(avmGet(_root, "loginInfo"), "p" + (number + 1) + "trac")), 100]);
    } else {
      avmCall(scope.f, "beginFill", [parseInt(avmGet(avmGet(_root, "loginInfo"), "p" + (number + 1) + "turc")), 100]);
    }
    scope.point1 = {
      x: random(10) - 5,
      y: random(10) - 5
    };
    scope.point2 = {
      x: random(10) - 5,
      y: random(10) - 5
    };
    scope.point3 = {
      x: random(10) - 5,
      y: random(10) - 5
    };
    scope.point4 = {
      x: random(10) - 5,
      y: random(10) - 5
    };
    scope.center = {
      x: (avmGet(scope.point1, "x") + avmGet(scope.point2, "x") + avmGet(scope.point3, "x") + avmGet(scope.point4, "x")) / 4,
      y: (avmGet(scope.point1, "y") + avmGet(scope.point2, "y") + avmGet(scope.point3, "y") + avmGet(scope.point4, "y")) / 4
    };
    avmCall(scope.f, "moveTo", [(avmGet(scope.point1, "x") - avmGet(scope.center, "x")) * (avmGet(_root, "SCALE") / 50), (avmGet(scope.point1, "y") - avmGet(scope.center, "y")) * (avmGet(_root, "SCALE") / 50)]);
    avmCall(scope.f, "lineTo", [(avmGet(scope.point2, "x") - avmGet(scope.center, "x")) * (avmGet(_root, "SCALE") / 50), (avmGet(scope.point2, "y") - avmGet(scope.center, "y")) * (avmGet(_root, "SCALE") / 50)]);
    avmCall(avmGet(scope.f, "hitPoints"), "push", [{
      x: (avmGet(scope.point2, "x") - avmGet(scope.center, "x")) * (avmGet(_root, "SCALE") / 50),
      y: (avmGet(scope.point2, "y") - avmGet(scope.center, "y")) * (avmGet(_root, "SCALE") / 50)
    }]);
    avmCall(scope.f, "lineTo", [(avmGet(scope.point3, "x") - avmGet(scope.center, "x")) * (avmGet(_root, "SCALE") / 50), (avmGet(scope.point3, "y") - avmGet(scope.center, "y")) * (avmGet(_root, "SCALE") / 50)]);
    avmCall(avmGet(scope.f, "hitPoints"), "push", [{
      x: (avmGet(scope.point3, "x") - avmGet(scope.center, "x")) * (avmGet(_root, "SCALE") / 50),
      y: (avmGet(scope.point3, "y") - avmGet(scope.center, "y")) * (avmGet(_root, "SCALE") / 50)
    }]);
    avmCall(scope.f, "lineTo", [(avmGet(scope.point4, "x") - avmGet(scope.center, "x")) * (avmGet(_root, "SCALE") / 50), (avmGet(scope.point4, "y") - avmGet(scope.center, "y")) * (avmGet(_root, "SCALE") / 50)]);
    avmCall(avmGet(scope.f, "hitPoints"), "push", [{
      x: (avmGet(scope.point4, "x") - avmGet(scope.center, "x")) * (avmGet(_root, "SCALE") / 50),
      y: (avmGet(scope.point4, "y") - avmGet(scope.center, "y")) * (avmGet(_root, "SCALE") / 50)
    }]);
    avmCall(scope.f, "lineTo", [(avmGet(scope.point1, "x") - avmGet(scope.center, "x")) * (avmGet(_root, "SCALE") / 50), (avmGet(scope.point1, "y") - avmGet(scope.center, "y")) * (avmGet(_root, "SCALE") / 50)]);
    avmCall(avmGet(scope.f, "hitPoints"), "push", [{
      x: (avmGet(scope.point1, "x") - avmGet(scope.center, "x")) * (avmGet(_root, "SCALE") / 50),
      y: (avmGet(scope.point1, "y") - avmGet(scope.center, "y")) * (avmGet(_root, "SCALE") / 50)
    }]);
    avmCall(scope.f, "endFill", []);
    scope.f.spawnCounter = 0;
    scope.f.x = avmGet(avmGet(avmGet(_root, "game"), "tank" + number), "_x") + avmGet(scope.f, "xspeed") * (random(5) + 2);
    scope.f.y = avmGet(avmGet(avmGet(_root, "game"), "tank" + number), "_y") + avmGet(scope.f, "yspeed") * (random(5) + 2);
    scope.f._x = avmGet(scope.f, "x");
    scope.f._y = avmGet(scope.f, "y");
    scope.f._rotation = random(360);
    scope.f.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      if (avmGet(this, "active")) {
        this.spawnCounter = avmGet(this, "spawnCounter") + 1;
        if (avmGet(this, "spawnCounter") % 3) {
          avmCall(avmGet(_root, "game"), "createEmptyMovieClip", [avmGet(this, "smokenamebase") + "-" + avmGet(this, "smokecounter"), avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
          scope.s = avmGet(avmGet(_root, "game"), avmGet(this, "smokenamebase") + "-" + avmGet(this, "smokecounter"));
          this.smokecounter = avmGet(this, "smokecounter") + 1;
          avmCall(scope.s, "lineStyle", [3 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4)]) * 1118481, 30]);
          avmCall(scope.s, "moveTo", [0, 0]);
          avmCall(scope.s, "lineTo", [0, 1]);
          scope.s.xspeed = (avmCall(Math, "random", []) - 0.5) * (avmGet(_root, "SCALE") / 50);
          scope.s.yspeed = (avmCall(Math, "random", []) - 0.5) * (avmGet(_root, "SCALE") / 50);
          scope.s.x = avmGet(this, "_x");
          scope.s.y = avmGet(this, "_y");
          scope.s._x = avmGet(scope.s, "x");
          scope.s._y = avmGet(scope.s, "y");
          scope.s.onEnterFrame = function () {
            if (avmGet(_root, "frozen")) {
              return undefined;
            }
            this._xscale += 2;
            this._yscale += 2;
            this._alpha -= 3 - avmCall(Math, "random", []) * 3;
            this.xspeed *= 0.9;
            this.yspeed *= 0.9;
            this.x += avmGet(this, "xspeed");
            this.y += avmGet(this, "yspeed");
            this._x = avmGet(this, "x");
            this._y = avmGet(this, "y");
            if (avmGet(this, "_alpha") <= 0) {
              avmCall(this, "removeMovieClip", []);
            }
          };
        }
        this.x += avmGet(this, "xspeed");
        this.y += avmGet(this, "yspeed");
        this._x = avmGet(this, "x");
        this._y = avmGet(this, "y");
        this.xspeed *= 0.97;
        this.yspeed *= 0.97;
        this.rotspeed *= 0.97;
        this._rotation += avmGet(this, "rotspeed");
        if (avmCall(this, "hitCheck", [avmGet(this, "hitPoints")])) {
          this.active = false;
        }
      }
      if (!avmGet(this, "active") || avmCall(Math, "abs", [avmGet(this, "xspeed")]) < 0.5 && avmCall(Math, "abs", [avmGet(this, "yspeed")]) < 0.5) {
        this._alpha -= 5;
      }
      if (avmGet(this, "_alpha") <= 0) {
        this.active = false;
        avmCall(this, "removeMovieClip", []);
      }
    };
    scope.f.hitCheck = function (points) {
      var _loc3_ = 0;
      while (_loc3_ < avmGet(points, "length")) {
        scope.point = {
          x: avmGet(avmGet(points, _loc3_), "x"),
          y: avmGet(avmGet(points, _loc3_), "y")
        };
        avmCall(this, "localToGlobal", [scope.point]);
        if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(scope.point, "x"), avmGet(scope.point, "y"), true])) {
          return true;
        }
        _loc3_ = _loc3_ + 1;
      }
      return false;
    };
    _loc5_ = _loc5_ + 1;
  }
}).bind(scope);
scope.lockedControl = (function lockedControl(owner, weapon) {
  switch (weapon) {
    case "laser":
      return !avmGet(owner, "laserReady");
    case "deathRay":
      return !avmGet(owner, "deathRayReady");
    case "remote":
      return avmGet(owner, "remoteControlling");
    case "elToro":
      return !avmGet(owner, "elToroReady");
    default:
      return false;
  }
}).bind(scope);
scope.weaponReady = (function weaponReady(owner, weapon) {
  switch (weapon) {
    case "bullet":
      return avmGet(owner, "bulletsFired") < avmGet(_root, "settingsMaxBullets");
    case "laser":
      return avmGet(owner, "laserReady");
    case "frag":
      return true;
    case "gatling":
      return avmGet(owner, "gatlingReady");
    case "homing":
      return avmGet(owner, "homingReady");
    case "mine":
      return true;
    case "remote":
      return !avmGet(owner, "remoteControlling");
    case "electric":
      return avmGet(owner, "electricReady");
    case "deathRay":
      return avmGet(owner, "deathRayReady");
    case "elToro":
      return avmGet(owner, "elToroReady");
    default:
      return;
  }
}).bind(scope);
scope.setWeapon = (function setWeapon(owner, weapon) {
  owner.currentWeapon = weapon;
  switch (weapon) {
    case "bullet":
      avmCall(avmGet(owner, "turret"), "gotoAndStop", [1]);
      owner.hitPointsFront = new Array();
      avmGet(owner, "hitPointsFront")[0] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[1] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[2] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[3] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[4] = {
        x: -avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      avmGet(owner, "hitPointsFront")[5] = {
        x: avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      break;
    case "laser":
      avmCall(avmGet(owner, "turret"), "gotoAndStop", [5]);
      owner.hitPointsFront = new Array();
      avmGet(owner, "hitPointsFront")[0] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[1] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2.7,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2 * 1.2
      };
      avmGet(owner, "hitPointsFront")[2] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2.7,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2 * 1.2
      };
      avmGet(owner, "hitPointsFront")[3] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[4] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2 * 1.2
      };
      avmGet(owner, "hitPointsFront")[5] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2 * 1.2
      };
      avmGet(owner, "hitPointsFront")[6] = {
        x: 0,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11.5
      };
      avmGet(owner, "hitPointsFront")[7] = {
        x: 0,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 9
      };
      avmCall(_root, "setEquipment", [owner, "aimer"]);
      break;
    case "frag":
      avmCall(avmGet(owner, "turret"), "gotoAndStop", [7]);
      owner.hitPointsFront = new Array();
      avmGet(owner, "hitPointsFront")[0] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[1] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[2] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[3] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[4] = {
        x: -avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      avmGet(owner, "hitPointsFront")[5] = {
        x: avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      break;
    case "gatling":
      avmCall(avmGet(owner, "turret"), "gotoAndStop", [13]);
      owner.hitPointsFront = new Array();
      avmGet(owner, "hitPointsFront")[0] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[1] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[2] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[3] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[4] = {
        x: -avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 17 * 11
      };
      avmGet(owner, "hitPointsFront")[5] = {
        x: avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 17 * 11
      };
      break;
    case "homing":
      avmCall(avmGet(owner, "turret"), "gotoAndStop", [17]);
      owner.hitPointsFront = new Array();
      avmGet(owner, "hitPointsFront")[0] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[1] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[2] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[3] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[4] = {
        x: -avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      avmGet(owner, "hitPointsFront")[5] = {
        x: avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      break;
    case "mine":
      avmCall(avmGet(owner, "turret"), "gotoAndStop", [35]);
      owner.hitPointsFront = new Array();
      avmGet(owner, "hitPointsFront")[0] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[1] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[2] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[3] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[4] = {
        x: -avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      avmGet(owner, "hitPointsFront")[5] = {
        x: avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      owner.minesLayed = 0;
      break;
    case "deathRay":
      avmCall(avmGet(owner, "turret"), "gotoAndStop", [20]);
      owner.hitPointsFront = new Array();
      avmGet(owner, "hitPointsFront")[0] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[1] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[2] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[3] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[4] = {
        x: -avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 17 * 11
      };
      avmGet(owner, "hitPointsFront")[5] = {
        x: avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 17 * 11
      };
      break;
    case "elToro":
      avmCall(avmGet(owner, "turret"), "gotoAndStop", [33]);
      owner.hitPointsFront = new Array();
      avmGet(owner, "hitPointsFront")[0] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[1] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[2] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[3] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[4] = {
        x: 0,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[5] = {
        x: -avmGet(avmGet(owner, "turret"), "_width") / 2,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      avmGet(owner, "hitPointsFront")[6] = {
        x: avmGet(avmGet(owner, "turret"), "_width") / 2,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      avmCall(_root, "setEquipment", [owner, "elToro"]);
      break;
    case "remote":
      avmCall(avmGet(owner, "turret"), "gotoAndStop", [37]);
      owner.hitPointsFront = new Array();
      avmGet(owner, "hitPointsFront")[0] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[1] = {
        x: -avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[2] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 4,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[3] = {
        x: avmGet(avmGet(owner, "base"), "_width") / 2,
        y: -avmGet(avmGet(owner, "base"), "_height") / 2
      };
      avmGet(owner, "hitPointsFront")[4] = {
        x: -avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      avmGet(owner, "hitPointsFront")[5] = {
        x: avmGet(avmGet(owner, "turret"), "_width") / 6,
        y: -avmGet(avmGet(owner, "turret"), "_height") / 16 * 11
      };
      break;
    case "electric":
  }
  var _loc3_ = new Color(avmGet(avmGet(owner, "turret"), "background"));
  avmCall(_loc3_, "setRGB", [avmGet(owner, "turretColor")]);
}).bind(scope);
scope.setEquipment = (function setEquipment(owner, equ) {
  avmCall(avmGet(owner, "equipment"), "removeMovieClip", []);
  owner.currentEquipment = equ;
  switch (equ) {
    case "none":
      break;
    case "aimer":
      owner.equipment = avmCall(_root, "addAimer", [owner]);
      break;
    case "shield":
      owner.equipment = avmCall(_root, "addShield", [owner]);
      break;
    case "elToro":
      owner.equipment = avmCall(_root, "addElToro", [owner]);
    default:
      return;
  }
}).bind(scope);
scope.fireWeapon = (function fireWeapon(owner, weapon) {
  switch (weapon) {
    case "bullet":
      avmCall(scope, "fireBullet", [owner]);
      break;
    case "laser":
      avmCall(scope, "fireLaser", [owner]);
      break;
    case "frag":
      avmCall(scope, "fireFrag", [owner]);
      break;
    case "gatling":
      avmCall(scope, "fireGatling", [owner]);
      break;
    case "deathRay":
      avmCall(scope, "fireDeathRay", [owner]);
      break;
    case "homing":
      avmCall(scope, "fireHoming", [owner]);
      break;
    case "mine":
      avmCall(scope, "layMine", [owner]);
      break;
    case "remote":
      avmCall(scope, "fireRemote", [owner]);
      break;
    case "elToro":
      avmCall(scope, "chargeElToro", [owner]);
      break;
    case "electric":
      avmCall(scope, "fireElectric", [owner]);
    default:
      return;
  }
}).bind(scope);
scope.fireBullet = (function fireBullet(owner) {
  avmCall(avmGet(owner, "turret"), "play", []);
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundBullet"), "start", []);
  }
  scope.bulletDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.bulletName = "bullet" + scope.bulletDepth;
  scope.bullet = avmCall(avmGet(_root, "game"), "attachMovie", ["bullet", scope.bulletName, scope.bulletDepth]);
  avmCall(owner, "swapDepths", [scope.bullet]);
  scope.bullet.x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.bullet.y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.bullet._x = avmGet(scope.bullet, "x");
  scope.bullet._y = avmGet(scope.bullet, "y");
  scope.bullet._xscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.bullet._yscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.bullet.xSpeed = avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.BULLETSPEED / scope.BULLETHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.bullet.ySpeed = avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.BULLETSPEED / scope.BULLETHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.bullet.lifetime = scope.BULLETLIFETIME;
  scope.bullet.deadly = scope.BULLETDEADLY;
  scope.bullet.owner = owner;
  owner.bulletsFired = avmGet(owner, "bulletsFired") + 1;
}).bind(scope);
scope.fireLaser = (function fireLaser(owner) {
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundLaser"), "start", []);
  }
  scope.laserDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.laserName = "laser" + scope.laserDepth;
  scope.laser = avmCall(avmGet(_root, "game"), "attachMovie", ["laser", scope.laserName, scope.laserDepth]);
  avmCall(owner, "swapDepths", [scope.laser]);
  scope.laser._x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.laser._y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.laser.x = 0;
  scope.laser.y = 0;
  scope.laser.xSpeed = avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.LASERSPEED / scope.LASERHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.laser.ySpeed = avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.LASERSPEED / scope.LASERHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.laser.lifetime = scope.LASERLIFETIME;
  scope.laser.deadly = scope.LASERDEADLY;
  scope.laser.active = true;
  scope.laser.owner = owner;
  scope.laser.laserColor = avmGet(owner, "turretColor");
  avmCall(scope.laser, "moveTo", [0, 0]);
  owner.laserReady = false;
  avmCall(scope, "setEquipment", [owner, "none"]);
}).bind(scope);
scope.fireFrag = (function fireFrag(owner) {
  if (avmGet(owner, "fragFired") && avmGet(owner, "alive")) {
    avmCall(avmGet(owner, "lastFrag"), "detonate", []);
  } else {
    avmCall(avmGet(owner, "turret"), "play", []);
    if (avmGet(_root, "soundOn")) {
      avmCall(avmGet(_root, "soundFragment"), "start", []);
    }
    scope.fragDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
    scope.fragName = "frag" + scope.fragDepth;
    scope.frag = avmCall(avmGet(_root, "game"), "attachMovie", ["fragbomb", scope.fragName, scope.fragDepth]);
    avmCall(owner, "swapDepths", [scope.frag]);
    scope.frag.x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
    scope.frag.y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
    scope.frag._x = avmGet(scope.frag, "x");
    scope.frag._y = avmGet(scope.frag, "y");
    scope.frag._xscale = 100 * (avmGet(_root, "SCALE") / 50);
    scope.frag._yscale = 100 * (avmGet(_root, "SCALE") / 50);
    scope.frag.xSpeed = avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.FRAGSPEED / scope.FRAGHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
    scope.frag.ySpeed = avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.FRAGSPEED / scope.FRAGHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
    scope.frag.lifetime = scope.FRAGLIFETIME;
    scope.frag.deadly = scope.FRAGDEADLY;
    scope.frag.level = avmGet(_root, "FRAGLEVELS");
    scope.frag.owner = owner;
    owner.lastFrag = scope.frag;
    owner.fragFired = true;
  }
}).bind(scope);
scope.fireGatling = (function fireGatling(owner) {
  avmCall(avmGet(owner, "turret"), "play", []);
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundGatlingMotorStart"), "start", []);
  }
  scope.gatlingDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.gatlingName = "gatling" + scope.gatlingDepth;
  scope.gatling = avmCall(avmGet(_root, "game"), "attachMovie", ["gatling", scope.gatlingName, scope.gatlingDepth]);
  scope.gatling.active = true;
  scope.gatling.spinSpeed = 0;
  scope.gatling.fireCounter = 0;
  scope.gatling.bulletsLeft = scope.GATLINGBULLETS;
  scope.gatling.owner = owner;
  owner.gatlingReady = false;
}).bind(scope);
scope.fireDeathRay = (function fireDeathRay(owner) {
  avmCall(avmGet(owner, "turret"), "play", []);
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundDeathRayCharge"), "start", [1]);
  }
  scope.deathRayDepth = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", []);
  scope.deathRayName = "deathRay" + scope.deathRayDepth;
  scope.deathRay = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "attachMovie", ["deathRay", scope.deathRayName, scope.deathRayDepth]);
  scope.deathRay._x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.deathRay._y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.deathRay.xSpeed = avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * (avmGet(_root, "SCALE") / 16);
  scope.deathRay.ySpeed = avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * (avmGet(_root, "SCALE") / 16);
  scope.deathRay.active = false;
  scope.deathRay.warmup = scope.DEATHRAYWARMUPTIME;
  scope.deathRay.lifetime = scope.DEATHRAYLIFETIME;
  scope.deathRay.owner = owner;
  owner.deathRayReady = false;
}).bind(scope);
scope.fireHoming = (function fireHoming(owner) {
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundHoming3"), "start", []);
  }
  scope.homingDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.homingName = "homing" + scope.homingDepth;
  scope.homing = avmCall(avmGet(_root, "game"), "attachMovie", ["homingbullet", scope.homingName, scope.homingDepth]);
  avmCall(owner, "swapDepths", [scope.homing]);
  scope.homing.x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.homing.y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.homing._x = avmGet(scope.homing, "x");
  scope.homing._y = avmGet(scope.homing, "y");
  scope.homing._rotation = avmGet(owner, "_rotation");
  scope.homing._xscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.homing._yscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.homing.xSpeed = avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.HOMINGSPEED / scope.HOMINGHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.homing.ySpeed = avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.HOMINGSPEED / scope.HOMINGHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  var _loc6_ = new Color(avmGet(scope.homing, "background"));
  avmCall(_loc6_, "setRGB", [avmGet(owner, "turretColor")]);
  scope.homing.lifetime = scope.HOMINGLIFETIME;
  scope.homing.deadly = scope.HOMINGDEADLY;
  scope.homing.homing = false;
  scope.homing.startuptime = scope.HOMINGSTARTUPTIME;
  scope.homing.soundCounter = 0;
  scope.homing.owner = owner;
  scope.homing.target = undefined;
  owner.homingReady = false;
  avmCall(avmGet(owner, "turret"), "gotoAndStop", [18]);
  owner.hitPointsFront = new Array();
  avmGet(owner, "hitPointsFront")[0] = {
    x: -avmGet(avmGet(owner, "base"), "_width") / 2,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  avmGet(owner, "hitPointsFront")[1] = {
    x: -avmGet(avmGet(owner, "base"), "_width") / 4,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  avmGet(owner, "hitPointsFront")[2] = {
    x: avmGet(avmGet(owner, "base"), "_width") / 4,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  avmGet(owner, "hitPointsFront")[3] = {
    x: avmGet(avmGet(owner, "base"), "_width") / 2,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  avmGet(owner, "hitPointsFront")[4] = {
    x: 0,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  var _loc7_ = new Color(avmGet(avmGet(owner, "turret"), "background"));
  avmCall(_loc7_, "setRGB", [avmGet(owner, "turretColor")]);
  var _loc4_ = 0;
  var _loc5_;
  while (_loc4_ < 3 * avmGet(_root, "HOMINGSMOKECLOUDS")) {
    _loc5_ = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
    avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["homingSmoke-" + _loc5_, avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    scope.s = avmGet(avmGet(_root, "game"), "homingSmoke-" + _loc5_);
    avmCall(scope.s, "lineStyle", [8 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4) + 6]) * 1118481, 40]);
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    scope.s.xspeed = (2 * avmCall(Math, "random", []) - 1) * (avmGet(_root, "SCALE") / 50) - avmCall(Math, "random", []) * avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 0.1;
    scope.s.yspeed = (2 * avmCall(Math, "random", []) - 1) * (avmGet(_root, "SCALE") / 50) - avmCall(Math, "random", []) * avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 0.1;
    scope.s.x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 2 / 16;
    scope.s.y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 2 / 16;
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 2;
      this._yscale += 2;
      this._alpha -= 4 - avmCall(Math, "random", []) * 3;
      this.xspeed *= 0.9;
      this.yspeed *= 0.9;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc4_ = _loc4_ + 1;
  }
}).bind(scope);
scope.layMine = (function layMine(owner) {
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundBullet"), "start", []);
  }
  scope.mineDepth = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", []);
  scope.mineName = "mine-" + scope.mineDepth;
  scope.mine = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "attachMovie", ["mine", scope.mineName, scope.mineDepth]);
  scope.mine.x = avmGet(owner, "_x");
  scope.mine.y = avmGet(owner, "_y");
  scope.mine._rotation = 180 + avmGet(owner, "_rotation");
  scope.mine._x = avmGet(scope.mine, "x");
  scope.mine._y = avmGet(scope.mine, "y");
  scope.mine._xscale = 25 * (avmGet(_root, "SCALE") / 50);
  scope.mine._yscale = 25 * (avmGet(_root, "SCALE") / 50);
  scope.mine.xSpeed = -avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.MINESPEED / scope.MINEHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.mine.ySpeed = -avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.MINESPEED / scope.MINEHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  var _loc3_ = new Color(avmGet(scope.mine, "background"));
  avmCall(_loc3_, "setRGB", [avmGet(owner, "turretColor")]);
  scope.mine.deadly = scope.MINEDEADLY;
  scope.mine.hideCounter = scope.MINEHIDETIME;
  scope.mine.landed = false;
  scope.mine.armed = false;
  scope.mine.detonating = false;
  scope.mine.detonateCounter = scope.MINEDETONATETIME;
  scope.mine.owner = owner;
  owner.minesLayed = avmGet(owner, "minesLayed") + 1;
  if (avmGet(owner, "minesLayed") >= scope.MINENUMBER) {
    avmCall(_root, "setWeapon", [owner, "bullet"]);
  }
}).bind(scope);
scope.fireRemote = (function fireRemote(owner) {
  avmCall(avmGet(owner, "turret"), "play", []);
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundHoming3"), "start", []);
  }
  scope.remoteDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.remoteName = "remote" + scope.remoteDepth;
  scope.remote = avmCall(avmGet(_root, "game"), "attachMovie", ["rCMissile", scope.remoteName, scope.remoteDepth]);
  avmCall(owner, "swapDepths", [scope.remote]);
  scope.remote.x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.remote.y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.remote._x = avmGet(scope.remote, "x");
  scope.remote._y = avmGet(scope.remote, "y");
  scope.remote._rotation = avmGet(owner, "_rotation");
  scope.remote.turnSpeed = scope.REMOTETURNSPEED;
  scope.remote._xscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.remote._yscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.remote.xSpeed = avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.REMOTESPEED / scope.REMOTEHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.remote.ySpeed = avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.REMOTESPEED / scope.REMOTEHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  var _loc6_ = new Color(avmGet(scope.remote, "background"));
  avmCall(_loc6_, "setRGB", [avmGet(owner, "turretColor")]);
  scope.remote.lifetime = scope.REMOTELIFETIME;
  scope.remote.deadly = scope.REMOTEDEADLY;
  scope.remote.owner = owner;
  owner.remoteControlling = true;
  scope.tankSignalDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.tankSignalName = "tankSignal" + scope.tankSignalDepth;
  scope.tankSignal = avmCall(avmGet(_root, "game"), "attachMovie", ["rCSignal", scope.tankSignalName, scope.tankSignalDepth]);
  scope.tankSignal.sourceMC = owner;
  scope.tankSignal.targetMC = scope.remote;
  scope.tankSignal.outgoing = true;
  scope.tankSignal.initialDelay = 0;
  scope.tankSignal.signalColor = avmGet(owner, "turretColor");
  scope.tankSignal.signalOffsetX = -10;
  scope.tankSignal.owner = owner;
  avmCall(avmGet(owner, "turret"), "gotoAndStop", [38]);
  owner.hitPointsFront = new Array();
  avmGet(owner, "hitPointsFront")[0] = {
    x: -avmGet(avmGet(owner, "base"), "_width") / 2,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  avmGet(owner, "hitPointsFront")[1] = {
    x: -avmGet(avmGet(owner, "base"), "_width") / 4,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  avmGet(owner, "hitPointsFront")[2] = {
    x: avmGet(avmGet(owner, "base"), "_width") / 4,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  avmGet(owner, "hitPointsFront")[3] = {
    x: avmGet(avmGet(owner, "base"), "_width") / 2,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  avmGet(owner, "hitPointsFront")[4] = {
    x: 0,
    y: -avmGet(avmGet(owner, "base"), "_height") / 2
  };
  var _loc7_ = new Color(avmGet(avmGet(owner, "turret"), "background"));
  avmCall(_loc7_, "setRGB", [avmGet(owner, "turretColor")]);
  var _loc4_ = 0;
  var _loc5_;
  while (_loc4_ < 3 * avmGet(_root, "HOMINGSMOKECLOUDS")) {
    _loc5_ = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
    avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["remoteSmoke-" + _loc5_, avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    scope.s = avmGet(avmGet(_root, "game"), "remoteSmoke-" + _loc5_);
    avmCall(scope.s, "lineStyle", [8 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4) + 6]) * 1118481, 40]);
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    scope.s.xspeed = (2 * avmCall(Math, "random", []) - 1) * (avmGet(_root, "SCALE") / 50) - avmCall(Math, "random", []) * avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 0.1;
    scope.s.yspeed = (2 * avmCall(Math, "random", []) - 1) * (avmGet(_root, "SCALE") / 50) - avmCall(Math, "random", []) * avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 0.1;
    scope.s.x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 2 / 16;
    scope.s.y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 2 / 16;
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 2;
      this._yscale += 2;
      this._alpha -= 4 - avmCall(Math, "random", []) * 3;
      this.xspeed *= 0.9;
      this.yspeed *= 0.9;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc4_ = _loc4_ + 1;
  }
}).bind(scope);
scope.chargeElToro = (function chargeElToro(owner) {
  avmGet(owner, "equipment").charging = true;
  avmGet(owner, "equipment").running = false;
  avmGet(owner, "equipment").chargeCounter = scope.ELTOROCHARGETIME;
  avmGet(owner, "equipment").runCounter = scope.ELTORORUNTIME;
  owner.elToroReady = false;
}).bind(scope);
scope.fireElectric = (function fireElectric(owner) {
  avmCall(avmGet(owner, "turret"), "play", []);
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundBullet"), "start", []);
  }
  scope.bulletDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.bulletName = "electricbullet" + scope.bulletDepth;
  scope.bullet = avmCall(avmGet(_root, "game"), "attachMovie", ["electricbullet", scope.bulletName, scope.bulletDepth]);
  avmCall(owner, "swapDepths", [scope.bullet]);
  scope.bullet.x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.bullet.y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.bullet._x = avmGet(scope.bullet, "x");
  scope.bullet._y = avmGet(scope.bullet, "y");
  scope.bullet._xscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.bullet._yscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.bullet.xSpeed = avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 95) * 3.141593 / 180]) * scope.BULLETSPEED / scope.BULLETHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.bullet.ySpeed = avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 95) * 3.141593 / 180]) * scope.BULLETSPEED / scope.BULLETHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.bullet.lifetime = scope.BULLETLIFETIME;
  scope.bullet.deadly = scope.BULLETDEADLY;
  scope.bullet.owner = owner;
  scope.bullet2Depth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.bullet2Name = "electricbullet" + scope.bullet2Depth;
  scope.bullet2 = avmCall(avmGet(_root, "game"), "attachMovie", ["electricbullet", scope.bullet2Name, scope.bullet2Depth]);
  avmCall(owner, "swapDepths", [scope.bullet2]);
  scope.bullet2.x = avmGet(owner, "_x") + avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.bullet2.y = avmGet(owner, "_y") + avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 90) * 3.141593 / 180]) * scope.SCALE * 4.5 / 16;
  scope.bullet2._x = avmGet(scope.bullet2, "x");
  scope.bullet2._y = avmGet(scope.bullet2, "y");
  scope.bullet2._xscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.bullet2._yscale = 100 * (avmGet(_root, "SCALE") / 50);
  scope.bullet2.xSpeed = avmCall(Math, "cos", [(avmGet(owner, "_rotation") - 85) * 3.141593 / 180]) * scope.BULLETSPEED / scope.BULLETHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.bullet2.ySpeed = avmCall(Math, "sin", [(avmGet(owner, "_rotation") - 85) * 3.141593 / 180]) * scope.BULLETSPEED / scope.BULLETHITCHECKINTERVALS * (avmGet(_root, "SCALE") / 50);
  scope.bullet2.lifetime = scope.BULLETLIFETIME;
  scope.bullet2.deadly = scope.BULLETDEADLY;
  scope.bullet2.owner = owner;
  scope.bullet.firstBullet = scope.bullet;
  scope.bullet.lastBullet = scope.bullet2;
  scope.bullet2.firstBullet = scope.bullet;
  scope.bullet2.lastBullet = scope.bullet2;
  owner.electricReady = false;
  scope.sparkDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.sparkName = "spark" + scope.sparkDepth;
  scope.spark = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", [scope.sparkName, scope.sparkDepth]);
  scope.spark._x = 0;
  scope.spark._y = 0;
  scope.spark.points = new Array();
  scope.spark.waveCounter = 0;
  scope.bullet.sparkMC = scope.spark;
  scope.bullet2.sparkMC = scope.spark;
}).bind(scope);
scope.spawnCrate = (function spawnCrate(pos, scale) {
  if (avmGet(avmGet(_root, "settingsActiveWeapons"), "length") == 0) {
    return undefined;
  }
  _root.numberOfCrates = avmGet(_root, "numberOfCrates") + 1;
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundCrate"), "start", []);
  }
  var _loc4_ = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "attachMovie", ["crate", "crate" + avmGet(avmGet(avmGet(_root, "reachable"), pos), "x") + "-" + avmGet(avmGet(avmGet(_root, "reachable"), pos), "y"), avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
  _loc4_._x = (avmGet(avmGet(avmGet(_root, "reachable"), pos), "x") + 0.5) * scale;
  _loc4_._y = (avmGet(avmGet(avmGet(_root, "reachable"), pos), "y") + 0.5) * scale;
  _loc4_.targetScale = scale * 1.5;
  _loc4_._rotation = avmCall(Math, "random", []) * 90 - 45;
  _loc4_._xscale = 0;
  _loc4_._yscale = 0;
  _loc4_.scaleSpeed = scale / 5;
  _loc4_.scaleSpeedDiff = scale / 20;
  _loc4_.landed = false;
  var _loc3_ = 0;
  while (_loc3_ < avmGet(_root, "NUMBEROFPUFFCLOUDS")) {
    avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "createEmptyMovieClip", ["puff" + avmGet(_root, "numberOfCrates") + "-" + _loc3_, avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
    scope.s = avmGet(avmGet(avmGet(_root, "game"), "mazebg"), "puff" + avmGet(_root, "numberOfCrates") + "-" + _loc3_);
    avmCall(scope.s, "lineStyle", [15 * (avmGet(_root, "SCALE") / 50), 8947848 + avmCall(Math, "random", []) * 16777215, 40 + random(20)]);
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    scope.s.xspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.yspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.x = avmGet(_loc4_, "_x") + avmGet(scope.s, "xspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.y = avmGet(_loc4_, "_y") + avmGet(scope.s, "yspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 2;
      this._yscale += 2;
      this._alpha -= 8 - avmCall(Math, "random", []) * 5;
      this.xspeed *= 0.85;
      this.yspeed *= 0.85;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc3_ = _loc3_ + 1;
  }
  scope.weapon = random(avmGet(avmGet(_root, "settingsActiveWeapons"), "length"));
  avmCall(_loc4_, "gotoAndStop", [avmGet(avmGet(_root, "settingsActiveWeapons"), scope.weapon)]);
  _loc4_.weapon = avmGet(avmGet(_root, "settingsActiveWeapons"), scope.weapon);
  _loc4_.pos = pos;
  avmGet(avmGet(_root, "reachable"), pos).used = true;
}).bind(scope);
scope.addAimer = (function addAimer(owner) {
  scope.aimerDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.aimerName = "aimer" + scope.aimerDepth;
  scope.aimer = avmCall(avmGet(_root, "game"), "attachMovie", ["aimer", scope.aimerName, scope.aimerDepth]);
  avmCall(owner, "swapDepths", [scope.aimer]);
  scope.aimer.owner = owner;
  scope.aimer.aimerColor = avmGet(owner, "turretColor");
  return scope.aimer;
}).bind(scope);
scope.addShield = (function addShield(owner) {
  scope.shieldDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.shieldName = "shield" + scope.shieldDepth;
  scope.shield = avmCall(avmGet(_root, "game"), "attachMovie", ["shield", scope.shieldName, scope.shieldDepth]);
  scope.shield.owner = owner;
  scope.shield.shieldColor = avmGet(owner, "baseColor");
  scope.shield.targetSize = scope.SHIELDSIZE;
  return scope.shield;
}).bind(scope);
scope.addElToro = (function addElToro(owner) {
  scope.elToroDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.elToroName = "elToro" + scope.elToroDepth;
  scope.elToro = avmCall(avmGet(_root, "game"), "attachMovie", ["elToro", scope.elToroName, scope.elToroDepth]);
  scope.elToro.owner = owner;
  scope.elToro.myColor = avmGet(owner, "baseColor");
  scope.elToro.charging = false;
  return scope.elToro;
}).bind(scope);
scope.setupStandardMaze = (function setupStandardMaze(tanks) {
  while (avmGet(avmGet(_root, "reachable"), "length") < 2 * scope.TANKS) {
    scope.WIDTH = avmCall(Math, "floor", [random(9)]) + 4;
    scope.HEIGHT = avmCall(Math, "floor", [random(7)]) + 4;
    scope.SCALE = avmCall(Math, "min", [(scope.MOVIEHEIGHT - scope.HEIGHTTOBOTTOM) / (scope.HEIGHT + 0.125), scope.MOVIEWIDTH / (scope.WIDTH + 0.125)]);
    scope.maze = avmCall(scope, "createMaze", [scope.WIDTH, scope.HEIGHT]);
    tanks[0] = {
      x: avmCall(Math, "floor", [avmCall(Math, "random", []) * scope.WIDTH]),
      y: avmCall(Math, "floor", [avmCall(Math, "random", []) * scope.HEIGHT])
    };
    _root.reachable = avmCall(scope, "calcReachable", [scope.maze, avmGet(avmGet(tanks, 0), "x"), avmGet(avmGet(tanks, 0), "y")]);
  }
  avmGet(avmGet(_root, "reachable"), 0).used = true;
  var _loc3_ = 1;
  var _loc2_;
  while (_loc3_ < scope.TANKS) {
    _loc2_ = avmCall(Math, "floor", [avmCall(Math, "random", []) * avmGet(avmGet(_root, "reachable"), "length")]);
    if (avmGet(avmGet(avmGet(_root, "reachable"), _loc2_), "used") != true) {
      tanks[_loc3_] = {
        x: avmGet(avmGet(avmGet(_root, "reachable"), _loc2_), "x"),
        y: avmGet(avmGet(avmGet(_root, "reachable"), _loc2_), "y")
      };
      avmGet(avmGet(_root, "reachable"), _loc2_).used = true;
    } else {
      _loc3_ = _loc3_ - 1;
    }
    _loc3_ = _loc3_ + 1;
  }
  _loc3_ = 0;
  while (_loc3_ < avmGet(avmGet(_root, "reachable"), "length")) {
    avmGet(avmGet(_root, "reachable"), _loc3_).used = false;
    _loc3_ = _loc3_ + 1;
  }
  _root.numberOfCrates = 0;
  avmCall(scope, "drawMaze", [scope.maze, scope.SCALE]);
}).bind(scope);
scope.MOVIEWIDTH = 692;
scope.MOVIEHEIGHT = 480;
scope.HEIGHTTOBOTTOM = 80;
scope.STARTWEAPON = "bullet";
scope.BULLETSPEED = 4.5;
scope.BULLETLIFETIME = 250;
scope.LASERSPEED = 70;
scope.LASERLIFETIME = 8;
scope.AIMERLENGTH = 200;
scope.FRAGSPEED = 4.5;
scope.FRAGLIFETIME = 250;
scope.DEATHRAYLIFETIME = 30;
scope.HOMINGSPEED = 4.5;
scope.HOMINGLIFETIME = 250;
scope.MINESPEED = 5.5;
scope.REMOTESPEED = 4.5;
scope.REMOTETURNSPEED = 15;
scope.REMOTELIFETIME = 250;
scope.GATLINGSPEED = 5.5;
scope.GATLINGLIFETIME = 125;
scope.GATLINGBULLETS = 20;
if (scope.DEBUG) {
  scope.CRATESPAWNTIMEBASE = 0;
  scope.CRATESPAWNTIMERANDOM = 0;
  scope.CRATESPAWNMAZESIZESCALE = 2000;
} else {
  scope.CRATESPAWNTIMEBASE = 350;
  scope.CRATESPAWNTIMERANDOM = 200;
  scope.CRATESPAWNMAZESIZESCALE = 2000;
}
scope.BULLETHITCHECKINTERVALS = 7;
scope.LASERHITCHECKINTERVALS = 70;
scope.AIMERHITCHECKINTERVALS = 100;
scope.FRAGHITCHECKINTERVALS = 7;
scope.HOMINGHITCHECKINTERVALS = 5;
scope.MINEHITCHECKINTERVALS = 4;
scope.REMOTEHITCHECKINTERVALS = 5;
scope.GATLINGHITCHECKINTERVALS = 7;
scope.BULLETDEADLY = 0;
scope.LASERDEADLY = 7;
scope.AIMERACTIVE = 7;
scope.FRAGDEADLY = 0;
scope.DEATHRAYDEADLY = 0;
scope.HOMINGDEADLY = 0;
scope.MINEDEADLY = 20;
scope.REMOTEDEADLY = 0;
scope.GATLINGDEADLY = 2;
scope.NUMBEROFFRAGMENTS = 8;
scope.NUMBEROFSMOKECLOUDS = 10;
scope.NUMBEROFPUFFCLOUDS = 0;
scope.NUMBEROFDUSTCLOUDS = 20;
scope.NUMBEROFFRAMESBEFOREEND = 125;
scope.NUMBEROFFRAMESFROZEN = 50;
scope.NUMBEROFFRAMESBEFORERESET = 5;
scope.FRAGFRAGMENTS = 40;
scope.FRAGSMOKECLOUDS = 10;
scope.FRAGLEVELS = 1;
scope.GATLINGSPINSPEED = 10;
scope.DEATHRAYWARMUPTIME = 15;
scope.HOMINGSTARTUPTIME = 50;
scope.HOMINGSMOKECLOUDS = 5;
scope.MINEHIDETIME = 0;
scope.MINENUMBER = 3;
scope.MINEFRAGMENTS = 40;
scope.MINESMOKECLOUDS = 10;
scope.MINEDETONATETIME = 6;
scope.REMOTESMOKECLOUDS = 5;
scope.REMOTESIGNALSIZE = 70;
scope.ELTOROCHARGETIME = 10;
scope.ELTOROSNORTTIME = 5;
scope.ELTORONUMBEROFSNORTS = 15;
scope.ELTORORUNTIME = 15;
scope.ELTOROSIZE = 5;
scope.SHIELDSIZE = 70;
scope.MAXSHAKE = 8;
scope.aliveCount = 0;
scope.endCount = -1;
scope.resetCount = -1;
scope.frozen = false;
scope.shake = 0;
scope.gameX = scope.gameY = 0;
scope.MAXDEADENDPENALTY = 5;
scope.consecutiveLaikaKills = 0;
scope.crateTimer = (scope.CRATESPAWNTIMEBASE + random(scope.CRATESPAWNTIMERANDOM)) * avmGet(_root, "settingsCrateSpawnModifier");
}
export function installLaika(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.updateGoal = (function updateGoal(temp) {
  if (avmGet(scope.myGoal, "priority") < avmGet(temp, "priority")) {
    scope.myGoal = temp;
  }
}).bind(scope);
scope.dodgeTrajectories = (function dodgeTrajectories(fieldx, fieldy, bullets, maxTimeToDodge, maxDistToDodge, maxCellDistToDodge, hitCheckInterval, checkBounce) {
  var _loc41_ = maxTimeToDodge;
  var _loc16_ = maxDistToDodge;
  var _loc25_ = {
    priority: 0
  };
  var _loc21_ = 0;
  var _loc7_;
  var _loc2_;
  var _loc3_;
  var _loc24_;
  var _loc23_;
  var _loc8_;
  var _loc9_;
  var _loc17_;
  var _loc18_;
  var _loc19_;
  var _loc10_;
  var _loc11_;
  var _loc12_;
  var _loc4_;
  var _loc5_;
  var _loc6_;
  var _loc15_;
  var _loc13_;
  var _loc14_;
  while (_loc21_ < avmGet(bullets, "length")) {
    _loc7_ = avmGet(bullets, _loc21_);
    _loc2_ = avmGet(_loc7_, "x");
    _loc3_ = avmGet(_loc7_, "y");
    _loc24_ = avmCall(Math, "floor", [_loc2_ / avmGet(_root, "SCALE")]);
    _loc23_ = avmCall(Math, "floor", [_loc3_ / avmGet(_root, "SCALE")]);
    if (avmGet(avmGet(avmGet(avmGet(avmGet(_root, "distancesForMaze"), fieldx), fieldy), _loc24_), _loc23_) <= maxCellDistToDodge) {
      _loc8_ = avmGet(_loc7_, "x") + avmGet(_loc7_, "xSpeed") * hitCheckInterval;
      _loc9_ = avmGet(_loc7_, "y") + avmGet(_loc7_, "ySpeed") * hitCheckInterval;
      _loc17_ = avmGet(scope.myTank, "x");
      _loc18_ = avmGet(scope.myTank, "y");
      _loc19_ = (_loc8_ - _loc2_) * (_loc8_ - _loc2_) + (_loc9_ - _loc3_) * (_loc9_ - _loc3_);
      _loc10_ = ((_loc17_ - _loc2_) * (_loc8_ - _loc2_) + (_loc18_ - _loc3_) * (_loc9_ - _loc3_)) / _loc19_;
      if (_loc10_ > -1 && _loc10_ < _loc41_) {
        _loc11_ = _loc2_ + _loc10_ * (_loc8_ - _loc2_);
        _loc12_ = _loc3_ + _loc10_ * (_loc9_ - _loc3_);
        _loc4_ = _loc17_ - _loc11_;
        _loc5_ = _loc18_ - _loc12_;
        _loc6_ = avmCall(Math, "sqrt", [_loc4_ * _loc4_ + _loc5_ * _loc5_]);
        _loc15_ = avmCall(scope, "checkPathForCollision", [_loc11_, _loc12_, _loc4_ / _loc6_, _loc5_ / _loc6_, 1, avmCall(Math, "ceil", [_loc6_]), avmCall(Math, "ceil", [_loc6_])]);
        if (_loc15_ == undefined && _loc6_ < _loc16_) {
          _loc4_ = _loc8_ - _loc11_;
          _loc5_ = _loc9_ - _loc12_;
          _loc13_ = avmCall(Math, "sqrt", [_loc4_ * _loc4_ + _loc5_ * _loc5_]);
          _loc15_ = avmCall(scope, "checkPathForCollision", [_loc11_, _loc12_, _loc4_ / _loc13_, _loc5_ / _loc13_, 1, avmCall(Math, "ceil", [_loc13_]), avmCall(Math, "ceil", [_loc13_])]);
          if (_loc15_ == undefined) {
            _loc16_ = avmCall(Math, "min", [_loc16_, _loc6_]);
            _loc25_ = {
              goal: "dodgeBullet",
              x: avmGet(_loc7_, "x"),
              y: avmGet(_loc7_, "y"),
              closest: {
                x: _loc11_,
                y: _loc12_
              },
              dist: _loc6_,
              t: _loc10_,
              dir: {
                x: _loc8_ - _loc2_,
                y: _loc9_ - _loc3_
              },
              maxTime: maxTimeToDodge,
              maxDist: maxDistToDodge,
              period: 10,
              priority: 1,
              updateContinuously: false,
              id: scope.goalId++
            };
          }
        }
      }
      if (_loc16_ > avmGet(_root, "SCALE") / 4 && checkBounce) {
        _loc14_ = avmCall(scope, "checkPathForCollision", [_loc2_, _loc3_, avmGet(_loc7_, "xSpeed"), avmGet(_loc7_, "ySpeed"), hitCheckInterval, 12, avmGet(_loc7_, "lifetime")]);
        if (_loc14_ != undefined) {
          _loc2_ = avmGet(_loc14_, "x");
          _loc3_ = avmGet(_loc14_, "y");
          _loc8_ = avmGet(_loc14_, "x") + avmGet(_loc14_, "xSpeed") * hitCheckInterval;
          _loc9_ = avmGet(_loc14_, "y") + avmGet(_loc14_, "ySpeed") * hitCheckInterval;
          _loc19_ = (_loc8_ - _loc2_) * (_loc8_ - _loc2_) + (_loc9_ - _loc3_) * (_loc9_ - _loc3_);
          _loc10_ = ((_loc17_ - _loc2_) * (_loc8_ - _loc2_) + (_loc18_ - _loc3_) * (_loc9_ - _loc3_)) / _loc19_;
          if (_loc10_ > 0 && _loc10_ < maxTimeToDodge - avmGet(_loc14_, "t")) {
            _loc11_ = _loc2_ + _loc10_ * (_loc8_ - _loc2_);
            _loc12_ = _loc3_ + _loc10_ * (_loc9_ - _loc3_);
            _loc4_ = _loc17_ - _loc11_;
            _loc5_ = _loc18_ - _loc12_;
            _loc6_ = avmCall(Math, "sqrt", [_loc4_ * _loc4_ + _loc5_ * _loc5_]);
            _loc15_ = avmCall(scope, "checkPathForCollision", [_loc11_, _loc12_, _loc4_ / _loc6_, _loc5_ / _loc6_, 1, avmCall(Math, "ceil", [_loc6_]), avmCall(Math, "ceil", [_loc6_])]);
            if (_loc15_ == undefined && _loc6_ < _loc16_) {
              _loc4_ = _loc11_ - _loc2_;
              _loc5_ = _loc12_ - _loc3_;
              _loc13_ = avmCall(Math, "sqrt", [_loc4_ * _loc4_ + _loc5_ * _loc5_]);
              _loc15_ = avmCall(scope, "checkPathForCollision", [_loc2_, _loc3_, _loc4_ / _loc13_, _loc5_ / _loc13_, 1, avmCall(Math, "ceil", [_loc13_]), avmCall(Math, "ceil", [_loc13_])]);
              if (_loc15_ == undefined) {
                _loc16_ = avmCall(Math, "min", [_loc16_, _loc6_]);
                _loc25_ = {
                  goal: "dodgeBullet",
                  x: avmGet(_loc7_, "x"),
                  y: avmGet(_loc7_, "y"),
                  closest: {
                    x: _loc11_,
                    y: _loc12_
                  },
                  dist: _loc6_,
                  t: _loc10_ + avmGet(_loc14_, "t"),
                  dir: {
                    x: _loc8_ - _loc2_,
                    y: _loc9_ - _loc3_
                  },
                  maxTime: maxTimeToDodge,
                  maxDist: maxDistToDodge,
                  period: 10,
                  priority: 1,
                  updateContinuously: false,
                  id: scope.goalId++
                };
              }
            }
          }
        }
      }
    }
    _loc21_ = _loc21_ + 1;
  }
  return _loc25_;
}).bind(scope);
scope.tryToRetaliate = (function tryToRetaliate() {
  if (scope.currentAggresiveness < scope.AGGRESIVENESS / 2) {
    return undefined;
  }
  var _loc14_;
  var _loc12_;
  var _loc13_;
  var _loc11_;
  var _loc10_;
  var _loc4_;
  var _loc5_;
  var _loc6_;
  var _loc3_;
  var _loc7_;
  var _loc2_;
  switch (avmGet(scope.myTank, "currentWeapon")) {
    case "bullet":
    case "laser":
      if (avmGet(scope.myTank, "bulletsFired") < avmGet(_root, "settingsMaxBullets")) {
        _loc14_ = avmGet(scope.myTank, "_rotation");
        _loc12_ = false;
        _loc13_ = avmGet(_root, "BULLETLIFETIME");
        _loc11_ = avmGet(_root, "MOVIEWIDTH") + avmGet(_root, "MOVIEHEIGHT");
        _loc10_ = avmCall(scope, "checkBulletPath", [_loc14_]);
        if (avmGet(_loc10_, "result") == "HIT") {
          _loc12_ = true;
          if (avmGet(_loc10_, "time") < _loc13_) {
            _loc13_ = avmGet(_loc10_, "time");
            _loc11_ = 0;
          }
        } else if (avmGet(_loc10_, "result") == "NOTHING" && !_loc12_) {
          if (avmGet(_loc10_, "closest") < _loc11_) {
            _loc11_ = avmGet(_loc10_, "closest");
          }
        }
        if (_loc12_ || _loc11_ < scope.MAXCLOSESTDISTANCE / 2) {
          trace("Retaliate!");
          avmCall(scope.myActionsForGoal, "push", [{
            action: "fireWeapon",
            delay: 1
          }]);
          scope.currentAggresiveness = avmCall(Math, "max", [0, scope.currentAggresiveness - 0.2]);
        }
      }
      break;
    case "frag":
      if (avmGet(scope.myTank, "fragFired")) {
        _loc4_ = avmGet(scope.myTank, "lastFrag");
        _loc5_ = avmGet(scope.myTank, "x") - avmGet(_loc4_, "x");
        _loc6_ = avmGet(scope.myTank, "y") - avmGet(_loc4_, "y");
        _loc3_ = avmCall(Math, "sqrt", [_loc5_ * _loc5_ + _loc6_ * _loc6_]);
        _loc7_ = avmCall(scope, "checkPathForCollision", [avmGet(_loc4_, "x"), avmGet(_loc4_, "y"), _loc5_ / _loc3_, _loc6_ / _loc3_, 1, avmCall(Math, "ceil", [_loc3_]), avmCall(Math, "ceil", [_loc3_])]);
        if (_loc7_ != undefined || _loc3_ >= scope.FRAGBOMBSAFETYDIST) {
          _loc2_ = 0;
          while (_loc2_ < avmGet(_root, "TANKS")) {
            if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc2_), "alive") && avmGet(avmGet(_root, "game"), "tank" + _loc2_) != scope.myTank) {
              _loc5_ = avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc2_), "x") - avmGet(_loc4_, "x");
              _loc6_ = avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc2_), "y") - avmGet(_loc4_, "y");
              _loc3_ = avmCall(Math, "sqrt", [_loc5_ * _loc5_ + _loc6_ * _loc6_]);
              if (_loc3_ <= scope.FRAGBOMBDETONATEDIST) {
                _loc7_ = avmCall(scope, "checkPathForCollision", [avmGet(_loc4_, "x"), avmGet(_loc4_, "y"), _loc5_ / _loc3_, _loc6_ / _loc3_, 1, avmCall(Math, "ceil", [_loc3_]), avmCall(Math, "ceil", [_loc3_])]);
                if (_loc7_ == undefined) {
                  avmCall(scope.myActionsForGoal, "push", [{
                    action: "fireWeapon",
                    delay: 1
                  }]);
                }
              }
            }
            _loc2_ = _loc2_ + 1;
          }
        }
      }
      break;
    case "gatling":
    default:
      return;
  }
}).bind(scope);
scope.checkPathForCollision = (function checkPathForCollision(x, y, xSpeed, ySpeed, hitCheckInterval, maxtime, lifetime) {
  lifetime = avmCall(Math, "min", [maxtime, lifetime]);
  scope.t = 0;
  while (lifetime > 0) {
    scope.i = 0;
    while (scope.i < hitCheckInterval) {
      scope.previousX = x;
      scope.previousY = y;
      x += xSpeed;
      y += ySpeed;
      if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(avmGet(_root, "game"), "_x") + x, avmGet(avmGet(_root, "game"), "_y") + y, true])) {
        x = scope.previousX;
        y = scope.previousY;
        x -= xSpeed;
        y += ySpeed;
        if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(avmGet(_root, "game"), "_x") + x, avmGet(avmGet(_root, "game"), "_y") + y, true])) {
          scope.hitOnXInvert = true;
        } else {
          scope.hitOnXInvert = false;
        }
        x = scope.previousX;
        y = scope.previousY;
        x += xSpeed;
        y -= ySpeed;
        if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(avmGet(_root, "game"), "_x") + x, avmGet(avmGet(_root, "game"), "_y") + y, true])) {
          scope.hitOnYInvert = true;
        } else {
          scope.hitOnYInvert = false;
        }
        if (scope.hitOnXInvert && !scope.hitOnYInvert) {
          ySpeed = -ySpeed;
        } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
          xSpeed = -xSpeed;
        } else {
          xSpeed = -xSpeed;
          ySpeed = -ySpeed;
        }
        x = scope.previousX;
        y = scope.previousY;
        x += xSpeed;
        y += ySpeed;
        return {
          x: x,
          y: y,
          xSpeed: xSpeed,
          ySpeed: ySpeed,
          t: scope.t
        };
      }
      scope.i++;
    }
    lifetime = lifetime - 1;
    scope.t++;
  }
  return undefined;
}).bind(scope);
scope.checkBulletPath = (function checkBulletPath(angle) {
  var _loc2_ = avmGet(scope.myTank, "_x") + avmCall(Math, "cos", [(angle - 90) * 3.141593 / 180]) * avmGet(_root, "SCALE") * 4.5 / 16;
  var _loc3_ = avmGet(scope.myTank, "_y") + avmCall(Math, "sin", [(angle - 90) * 3.141593 / 180]) * avmGet(_root, "SCALE") * 4.5 / 16;
  var _loc4_ = avmCall(Math, "cos", [(angle - 90) * 3.141593 / 180]) * avmGet(_root, "BULLETSPEED") * (avmGet(_root, "SCALE") / 50);
  var _loc5_ = avmCall(Math, "sin", [(angle - 90) * 3.141593 / 180]) * avmGet(_root, "BULLETSPEED") * (avmGet(_root, "SCALE") / 50);
  var _loc7_ = avmGet(_root, "BULLETLIFETIME") / 3;
  var _loc11_ = avmGet(_root, "BULLETDEADLY");
  var _loc10_ = avmGet(_root, "MOVIEWIDTH") + avmGet(_root, "MOVIEHEIGHT");
  var _loc6_;
  var _loc9_;
  var _loc8_;
  while (_loc7_ > 0) {
    i = 0;
    while (i < 1) {
      scope.previousX = _loc2_;
      scope.previousY = _loc3_;
      _loc2_ += _loc4_;
      _loc3_ += _loc5_;
      if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(avmGet(_root, "game"), "_x") + _loc2_, avmGet(avmGet(_root, "game"), "_y") + _loc3_, true])) {
        _loc2_ = scope.previousX;
        _loc3_ = scope.previousY;
        _loc2_ -= _loc4_;
        _loc3_ += _loc5_;
        if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(avmGet(_root, "game"), "_x") + _loc2_, avmGet(avmGet(_root, "game"), "_y") + _loc3_, true])) {
          scope.hitOnXInvert = true;
        } else {
          scope.hitOnXInvert = false;
        }
        _loc2_ = scope.previousX;
        _loc3_ = scope.previousY;
        _loc2_ += _loc4_;
        _loc3_ -= _loc5_;
        if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(avmGet(_root, "game"), "_x") + _loc2_, avmGet(avmGet(_root, "game"), "_y") + _loc3_, true])) {
          scope.hitOnYInvert = true;
        } else {
          scope.hitOnYInvert = false;
        }
        if (scope.hitOnXInvert && !scope.hitOnYInvert) {
          _loc5_ = -_loc5_;
        } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
          _loc4_ = -_loc4_;
        } else {
          _loc4_ = -_loc4_;
          _loc5_ = -_loc5_;
        }
        _loc2_ = scope.previousX;
        _loc3_ = scope.previousY;
        _loc2_ += _loc4_;
        _loc3_ += _loc5_;
      }
      i++;
    }
    if (_loc11_ == 0) {
      var i = 0;
      while (i < avmGet(_root, "TANKS")) {
        if (avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "alive") && avmCall(avmGet(avmGet(_root, "game"), "tank" + i), "hitTest", [avmGet(avmGet(_root, "game"), "_x") + _loc2_, avmGet(avmGet(_root, "game"), "_y") + _loc3_, false])) {
          if (avmCall(avmGet(avmGet(_root, "game"), "tank" + i), "hitTest", [avmGet(avmGet(_root, "game"), "_x") + _loc2_, avmGet(avmGet(_root, "game"), "_y") + _loc3_, true])) {
            if (avmGet(avmGet(_root, "game"), "tank" + i) == scope.myTank) {
              return {
                result: "SUICIDE",
                time: avmGet(_root, "BULLETLIFETIME") / 3 - _loc7_
              };
            }
            return {
              result: "HIT",
              time: avmGet(_root, "BULLETLIFETIME") / 3 - _loc7_
            };
          }
        } else if (avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "alive") && avmGet(avmGet(_root, "game"), "tank" + i) != scope.myTank) {
          _loc6_ = avmCall(Math, "abs", [avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "x") - _loc2_]) + avmCall(Math, "abs", [avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "y") - _loc3_]);
          if (_loc6_ < scope.MAXCLOSESTDISTANCE) {
            _loc9_ = avmCall(Math, "floor", [_loc2_ / avmGet(_root, "SCALE")]);
            _loc8_ = avmCall(Math, "floor", [_loc3_ / avmGet(_root, "SCALE")]);
            if (avmGet(avmGet(avmGet(avmGet(avmGet(_root, "distancesForMaze"), avmGet(avmGet(avmGet(_root, "tankFields"), i), "x")), avmGet(avmGet(avmGet(_root, "tankFields"), i), "y")), _loc9_), _loc8_) <= scope.MAXCLOSESTCELLDISTANCE) {
              if (_loc6_ < _loc10_) {
                _loc10_ = _loc6_;
              }
            }
          }
        }
        i++;
      }
    }
    if (_loc11_ > 0) {
      _loc11_ = _loc11_ - 1;
    }
    _loc7_ = _loc7_ - 1;
  }
  return {
    result: "NOTHING",
    time: avmGet(_root, "BULLETLIFETIME") / 3,
    closest: _loc10_
  };
}).bind(scope);
scope.pushActionsToFollowPath = (function pushActionsToFollowPath(path) {
  var _loc2_ = avmGet(path, "length") - 1;
  while (_loc2_ >= 1) {
    avmCall(scope.myActionsForGoal, "push", [{
      action: "driveToField",
      x: avmGet(avmGet(path, _loc2_), "x"),
      y: avmGet(avmGet(path, _loc2_), "y")
    }]);
    _loc2_ = _loc2_ - 1;
  }
  var _loc6_;
  var _loc5_;
  var _loc4_;
  if (avmGet(path, "length") > 1) {
    _loc6_ = avmGet(scope.myTank, "_rotation");
    _loc4_ = {
      x: (avmGet(avmGet(path, 1), "x") + 0.5) * avmGet(_root, "SCALE") - avmGet(scope.myTank, "_x"),
      y: (avmGet(avmGet(path, 1), "y") + 0.5) * avmGet(_root, "SCALE") - avmGet(scope.myTank, "_y")
    };
    if (avmGet(_loc4_, "x") != 0) {
      if (avmGet(_loc4_, "x") > 0) {
        _loc5_ = 90 + avmCall(Math, "atan", [avmGet(_loc4_, "y") / avmGet(_loc4_, "x")]) * 180 / 3.141593;
      } else {
        _loc5_ = -90 + avmCall(Math, "atan", [avmGet(_loc4_, "y") / avmGet(_loc4_, "x")]) * 180 / 3.141593;
      }
    } else if (avmGet(_loc4_, "y") > 0) {
      _loc5_ = 180;
    } else if (avmGet(_loc4_, "y") < 0) {
      _loc5_ = 0;
    } else {
      _loc5_ = _loc6_;
    }
  }
  avmCall(scope.myActionsForGoal, "push", [{
    action: "driveToPos",
    x: (avmGet(avmGet(path, 0), "x") + 0.5) * avmGet(_root, "SCALE"),
    y: (avmGet(avmGet(path, 0), "y") + 0.5) * avmGet(_root, "SCALE"),
    canReverse: avmGet(path, "length") <= 2
  }]);
}).bind(scope);
scope.makeDecisionsAndUpdateGoal = (function makeDecisionsAndUpdateGoal() {
  if (avmGet(scope.myGoal, "period") > 0) {
    scope.myGoal.period--;
    return avmGet(scope.myGoal, "updateContinuously");
  }
  scope.myGoal.priority *= 0.9;
  scope.oldGoal = scope.myGoal;
  var _loc10_ = avmCall(Math, "floor", [avmGet(scope.myTank, "_x") / avmGet(_root, "SCALE")]);
  var _loc9_ = avmCall(Math, "floor", [avmGet(scope.myTank, "_y") / avmGet(_root, "SCALE")]);
  var _loc28_;
  var _loc40_;
  var _loc7_;
  var _loc12_;
  var _loc24_;
  var _loc25_;
  var _loc26_;
  var _loc3_;
  if (avmGet(_root, "aliveCount") > 1 && avmGet(scope.myTank, "currentWeapon") == "bullet") {
    _loc28_ = new Array();
    for (var _loc48_ in avmGet(avmGet(_root, "game"), "mazebg")) {
      if (substring(_loc48_, 0, 5) == "crate") {
        avmCall(_loc28_, "push", [avmGet(avmGet(avmGet(_root, "game"), "mazebg"), _loc48_)]);
      }
    }
    _loc40_ = scope.MAXCELLDISTTOGOFORCRATE;
    _loc7_ = {
      priority: 0
    };
    _loc12_ = 0;
    while (_loc12_ < avmGet(_loc28_, "length")) {
      _loc24_ = avmGet(_loc28_, _loc12_);
      _loc25_ = avmCall(Math, "floor", [avmGet(_loc24_, "_x") / avmGet(_root, "SCALE")]);
      _loc26_ = avmCall(Math, "floor", [avmGet(_loc24_, "_y") / avmGet(_root, "SCALE")]);
      _loc3_ = avmGet(avmGet(avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc10_), _loc9_), _loc25_), _loc26_);
      if (_loc3_ <= _loc40_) {
        _loc40_ = _loc3_;
        _loc7_ = {
          goal: "goForCrate",
          x: _loc25_,
          y: _loc26_,
          period: 10,
          priority: (scope.MAXCELLDISTTOGOFORCRATE - _loc3_) / scope.MAXCELLDISTTOGOFORCRATE * scope.GREEDY * (avmGet(_root, "settingsMaxBullets") - avmGet(scope.myTank, "bulletsFired")) / avmGet(_root, "settingsMaxBullets"),
          updateContinuously: false,
          id: scope.goalId++
        };
      }
      _loc12_ = _loc12_ + 1;
    }
    avmCall(scope, "updateGoal", [_loc7_]);
  }
  var _loc38_ = new Array();
  for (var _loc47_ in avmGet(_root, "game")) {
    if (substring(_loc47_, 0, 6) == "bullet") {
      avmCall(_loc38_, "push", [avmGet(avmGet(_root, "game"), _loc47_)]);
    }
  }
  _loc7_ = avmCall(scope, "dodgeTrajectories", [_loc10_, _loc9_, _loc38_, scope.MAXTIMETODODGEBULLET, scope.MAXDISTTODODGEBULLET, scope.MAXCELLDISTTODODGEBULLET, avmGet(_root, "BULLETHITCHECKINTERVALS"), true]);
  avmCall(scope, "updateGoal", [_loc7_]);
  var _loc27_ = new Array();
  var _loc46_ = new Array();
  for (var _loc49_ in avmGet(_root, "game")) {
    if (substring(_loc49_, 0, 4) == "frag") {
      if (substring(_loc49_, 0, 12) == "fragfragment") {
        if (avmGet(avmGet(avmGet(_root, "game"), _loc49_), "active")) {
          avmCall(_loc46_, "push", [avmGet(avmGet(_root, "game"), _loc49_)]);
        }
        continue;
      }
      avmCall(_loc27_, "push", [avmGet(avmGet(_root, "game"), _loc49_)]);
    }
  }
  var _loc15_ = scope.MAXCELLDISTTODODGEFRAGBOMB;
  _loc12_ = 0;
  var _loc11_;
  var _loc29_;
  var _loc31_;
  while (_loc12_ < avmGet(_loc27_, "length")) {
    _loc11_ = avmGet(_loc27_, _loc12_);
    _loc29_ = avmCall(Math, "floor", [avmGet(_loc11_, "x") / avmGet(_root, "SCALE")]);
    _loc31_ = avmCall(Math, "floor", [avmGet(_loc11_, "y") / avmGet(_root, "SCALE")]);
    _loc3_ = avmGet(avmGet(avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc10_), _loc9_), _loc29_), _loc31_);
    if (_loc3_ < _loc15_) {
      _loc15_ = _loc3_;
      _loc7_ = {
        goal: "dodgeFragbomb",
        frag: _loc11_,
        period: 10,
        priority: 1,
        updateContinuously: false,
        id: scope.goalId++
      };
    }
    _loc12_ = _loc12_ + 1;
  }
  avmCall(scope, "updateGoal", [_loc7_]);
  _loc7_ = avmCall(scope, "dodgeTrajectories", [_loc10_, _loc9_, _loc46_, scope.MAXTIMETODODGEFRAGBOMBFRAGMENT, scope.MAXDISTTODODGEFRAGBOMBFRAGMENT, scope.MAXCELLDISTTODODGEFRAGBOMBFRAGMENT, avmGet(_root, "FRAGHITCHECKINTERVALS"), false]);
  avmCall(scope, "updateGoal", [_loc7_]);
  _loc38_ = new Array();
  for (_loc47_ in avmGet(_root, "game")) {
    if (substring(_loc47_, 0, 13) == "gatlingBullet") {
      avmCall(_loc38_, "push", [avmGet(avmGet(_root, "game"), _loc47_)]);
    }
  }
  _loc7_ = avmCall(scope, "dodgeTrajectories", [_loc10_, _loc9_, _loc38_, scope.MAXTIMETODODGEGATLINGBULLET, scope.MAXDISTTODODGEGATLINGBULLET, scope.MAXCELLDISTTODODGEGATLINGBULLET, avmGet(_root, "GATLINGHITCHECKINTERVALS"), true]);
  avmCall(scope, "updateGoal", [_loc7_]);
  _loc15_ = scope.MAXCELLDISTTODODGELASER;
  _loc7_ = {
    priority: 0
  };
  _loc12_ = 0;
  var _loc2_;
  var _loc32_;
  var _loc30_;
  var _loc16_;
  var _loc13_;
  var _loc14_;
  var _loc18_;
  var _loc19_;
  var _loc34_;
  var _loc36_;
  var _loc37_;
  var _loc17_;
  var _loc33_;
  var _loc35_;
  while (_loc12_ < avmGet(_root, "TANKS")) {
    if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "alive") && avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "currentEquipment") == "aimer" && avmGet(avmGet(_root, "game"), "tank" + _loc12_) != scope.myTank) {
      _loc2_ = avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "equipment");
      if (avmGet(_loc2_, "hit") == scope.myTank) {
        _loc15_ = 0;
        _loc7_ = {
          goal: "dodgeLaser",
          dir: {
            x: avmGet(_loc2_, "hitXSpeed"),
            y: avmGet(_loc2_, "hitYSpeed")
          },
          owner: avmGet(avmGet(_root, "game"), "tank" + _loc12_),
          period: 10,
          priority: 1,
          updateContinuously: false,
          id: scope.goalId++
        };
      } else if (avmGet(_loc2_, "hit") == undefined) {
        _loc32_ = avmCall(Math, "floor", [(avmGet(_loc2_, "_x") + avmGet(_loc2_, "x")) / avmGet(_root, "SCALE")]);
        _loc30_ = avmCall(Math, "floor", [(avmGet(_loc2_, "_y") + avmGet(_loc2_, "y")) / avmGet(_root, "SCALE")]);
        _loc3_ = avmGet(avmGet(avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc10_), _loc9_), _loc32_), _loc30_);
        if (_loc3_ <= _loc15_) {
          _loc16_ = avmCall(scope, "checkPathForCollision", [avmGet(_loc2_, "_x") + avmGet(_loc2_, "x"), avmGet(_loc2_, "_y") + avmGet(_loc2_, "y"), avmGet(_loc2_, "xSpeed"), avmGet(_loc2_, "ySpeed"), avmGet(_root, "AIMERHITCHECKINTERVALS"), 12, 12]);
          if (_loc16_ != undefined) {
            _loc13_ = avmGet(_loc2_, "_x") + avmGet(_loc2_, "x");
            _loc14_ = avmGet(_loc2_, "_y") + avmGet(_loc2_, "y");
            _loc18_ = avmGet(_loc16_, "x");
            _loc19_ = avmGet(_loc16_, "y");
            _loc34_ = avmGet(scope.myTank, "x");
            _loc36_ = avmGet(scope.myTank, "y");
            _loc37_ = (_loc18_ - _loc13_) * (_loc18_ - _loc13_) + (_loc19_ - _loc14_) * (_loc19_ - _loc14_);
            _loc17_ = ((_loc34_ - _loc13_) * (_loc18_ - _loc13_) + (_loc36_ - _loc14_) * (_loc19_ - _loc14_)) / _loc37_;
            if (_loc17_ > 0 && _loc17_ < 1) {
              _loc33_ = avmCall(Math, "floor", [(_loc13_ + _loc17_ * (_loc18_ - _loc13_)) / avmGet(_root, "SCALE")]);
              _loc35_ = avmCall(Math, "floor", [(_loc14_ + _loc17_ * (_loc19_ - _loc14_)) / avmGet(_root, "SCALE")]);
              _loc3_ = avmGet(avmGet(avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc10_), _loc9_), _loc33_), _loc35_);
              if (_loc3_ <= _loc15_) {
                _loc15_ = _loc3_;
                _loc7_ = {
                  goal: "dodgeLaser",
                  dir: {
                    x: avmGet(_loc16_, "xSpeed"),
                    y: avmGet(_loc16_, "ySpeed")
                  },
                  owner: avmGet(avmGet(_root, "game"), "tank" + _loc12_),
                  period: 10,
                  priority: 1,
                  updateContinuously: false,
                  id: scope.goalId++
                };
              }
            }
          } else {
            _loc15_ = _loc3_;
            _loc7_ = {
              goal: "dodgeLaser",
              dir: {
                x: avmGet(_loc2_, "xSpeed"),
                y: avmGet(_loc2_, "ySpeed")
              },
              owner: avmGet(avmGet(_root, "game"), "tank" + _loc12_),
              period: 10,
              priority: 1,
              updateContinuously: false,
              id: scope.goalId++
            };
          }
        }
      }
    }
    _loc12_ = _loc12_ + 1;
  }
  avmCall(scope, "updateGoal", [_loc7_]);
  var _loc8_;
  var _loc22_;
  var _loc23_;
  var _loc39_;
  switch (avmGet(scope.myTank, "currentWeapon")) {
    case "bullet":
    case "laser":
      if (avmGet(scope.myTank, "bulletsFired") < avmGet(_root, "settingsMaxBullets") || avmGet(scope.myTank, "currentWeapon") == "laser") {
        _loc12_ = 0;
        while (_loc12_ < avmGet(_root, "TANKS")) {
          if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "alive") && avmGet(avmGet(_root, "game"), "tank" + _loc12_) != scope.myTank) {
            _loc8_ = avmCall(_root, "getShortestPathWithDistances", [avmGet(_root, "maze"), avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc10_), _loc9_), _loc10_, _loc9_, avmGet(avmGet(avmGet(_root, "tankFields"), _loc12_), "x"), avmGet(avmGet(avmGet(_root, "tankFields"), _loc12_), "y")]);
            if (avmGet(_loc8_, "length") < scope.LONGESTPATHTOSHOOT) {
              _loc7_ = {
                goal: "shootAfter",
                target: avmGet(avmGet(_root, "game"), "tank" + _loc12_),
                period: 10,
                priority: avmGet(_loc8_, "length") > scope.LONGESTPATHTONOTHESITATETOSHOOT ? (scope.LONGESTPATHTOSHOOT - avmGet(_loc8_, "length")) / scope.LONGESTPATHTOSHOOT * scope.currentAggresiveness : 1,
                updateContinuously: false,
                id: scope.goalId++
              };
              avmCall(scope, "updateGoal", [_loc7_]);
            }
          }
          _loc12_ = _loc12_ + 1;
        }
      }
      break;
    case "frag":
      if (!avmGet(scope.myTank, "fragFired")) {
        _loc12_ = 0;
        while (_loc12_ < avmGet(_root, "TANKS")) {
          if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "alive") && avmGet(avmGet(_root, "game"), "tank" + _loc12_) != scope.myTank) {
            _loc8_ = avmCall(_root, "getShortestPathWithDistances", [avmGet(_root, "maze"), avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc10_), _loc9_), _loc10_, _loc9_, avmGet(avmGet(avmGet(_root, "tankFields"), _loc12_), "x"), avmGet(avmGet(avmGet(_root, "tankFields"), _loc12_), "y")]);
            if (avmGet(_loc8_, "length") < scope.LONGESTPATHTOSHOOT) {
              _loc7_ = {
                goal: "shootAfter",
                target: avmGet(avmGet(_root, "game"), "tank" + _loc12_),
                period: 10,
                priority: avmGet(_loc8_, "length") > scope.LONGESTPATHTONOTHESITATETOSHOOT ? (scope.LONGESTPATHTOSHOOT - avmGet(_loc8_, "length")) / scope.LONGESTPATHTOSHOOT * scope.currentAggresiveness : 1,
                updateContinuously: false,
                id: scope.goalId++
              };
              avmCall(scope, "updateGoal", [_loc7_]);
            }
          }
          _loc12_ = _loc12_ + 1;
        }
      } else {
        _loc11_ = avmGet(scope.myTank, "lastFrag");
        _loc22_ = avmGet(scope.myTank, "x") - avmGet(_loc11_, "x");
        _loc23_ = avmGet(scope.myTank, "y") - avmGet(_loc11_, "y");
        _loc3_ = avmCall(Math, "sqrt", [_loc22_ * _loc22_ + _loc23_ * _loc23_]);
        _loc39_ = avmCall(scope, "checkPathForCollision", [avmGet(_loc11_, "x"), avmGet(_loc11_, "y"), _loc22_ / _loc3_, _loc23_ / _loc3_, 1, avmCall(Math, "ceil", [_loc3_]), avmCall(Math, "ceil", [_loc3_])]);
        if (_loc39_ != undefined || _loc3_ >= scope.FRAGBOMBSAFETYDIST) {
          _loc12_ = 0;
          while (_loc12_ < avmGet(_root, "TANKS")) {
            if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "alive") && avmGet(avmGet(_root, "game"), "tank" + _loc12_) != scope.myTank) {
              _loc22_ = avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "x") - avmGet(_loc11_, "x");
              _loc23_ = avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "y") - avmGet(_loc11_, "y");
              _loc3_ = avmCall(Math, "sqrt", [_loc22_ * _loc22_ + _loc23_ * _loc23_]);
              if (_loc3_ <= scope.FRAGBOMBDETONATEDIST) {
                _loc39_ = avmCall(scope, "checkPathForCollision", [avmGet(_loc11_, "x"), avmGet(_loc11_, "y"), _loc22_ / _loc3_, _loc23_ / _loc3_, 1, avmCall(Math, "ceil", [_loc3_]), avmCall(Math, "ceil", [_loc3_])]);
                if (_loc39_ == undefined) {
                  _loc7_ = {
                    goal: "detonate",
                    period: 1,
                    priority: 1,
                    updateContiuously: false,
                    id: scope.goalId++
                  };
                  avmCall(scope, "updateGoal", [_loc7_]);
                }
              }
            }
            _loc12_ = _loc12_ + 1;
          }
        }
      }
      break;
    case "gatling":
      if (avmGet(scope.myTank, "gatlingReady")) {
        _loc12_ = 0;
        while (_loc12_ < avmGet(_root, "TANKS")) {
          if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "alive") && avmGet(avmGet(_root, "game"), "tank" + _loc12_) != scope.myTank) {
            _loc8_ = avmCall(_root, "getShortestPathWithDistances", [avmGet(_root, "maze"), avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc10_), _loc9_), _loc10_, _loc9_, avmGet(avmGet(avmGet(_root, "tankFields"), _loc12_), "x"), avmGet(avmGet(avmGet(_root, "tankFields"), _loc12_), "y")]);
            if (avmGet(_loc8_, "length") < scope.LONGESTPATHTOSHOOT) {
              _loc7_ = {
                goal: "sprayBullets",
                target: avmGet(avmGet(_root, "game"), "tank" + _loc12_),
                period: 15,
                priority: avmGet(_loc8_, "length") > scope.LONGESTPATHTONOTHESITATETOSHOOT ? (scope.LONGESTPATHTOSHOOT - avmGet(_loc8_, "length")) / scope.LONGESTPATHTOSHOOT * scope.currentAggresiveness : 1,
                updateContinuously: false,
                id: scope.goalId++
              };
              avmCall(scope, "updateGoal", [_loc7_]);
            }
          }
          _loc12_ = _loc12_ + 1;
        }
      }
  }
  var _loc5_;
  var _loc6_;
  var _loc4_;
  var _loc21_;
  if (avmGet(_root, "aliveCount") > 1 && avmGet(scope.myTank, "currentWeapon") == "bullet" && avmGet(scope.myTank, "bulletsFired") == avmGet(_root, "settingsMaxBullets")) {
    _loc5_ = new Array(avmGet(avmGet(_root, "maze"), "length") - 1);
    _loc12_ = 0;
    while (_loc12_ < avmGet(_loc5_, "length")) {
      _loc5_[_loc12_] = new Array(avmGet(avmGet(avmGet(_root, "maze"), _loc12_), "length") - 1);
      _loc12_ = _loc12_ + 1;
    }
    _loc6_ = 0;
    while (_loc6_ < avmGet(_loc5_, "length")) {
      _loc4_ = 0;
      while (_loc4_ < avmGet(avmGet(_loc5_, 0), "length")) {
        avmGet(_loc5_, _loc6_)[_loc4_] = 0;
        _loc4_ = _loc4_ + 1;
      }
      _loc6_ = _loc6_ + 1;
    }
    _loc12_ = 0;
    while (_loc12_ < avmGet(_root, "TANKS")) {
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "alive") && avmGet(avmGet(_root, "game"), "tank" + _loc12_) != scope.myTank && avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc12_), "bulletsFired") != avmGet(_root, "settingsMaxBullets")) {
        _loc21_ = avmGet(avmGet(avmGet(_root, "distancesForMaze"), avmGet(avmGet(avmGet(_root, "tankFields"), _loc12_), "x")), avmGet(avmGet(avmGet(_root, "tankFields"), _loc12_), "y"));
        _loc6_ = 0;
        while (_loc6_ < avmGet(_loc5_, "length")) {
          _loc4_ = 0;
          while (_loc4_ < avmGet(avmGet(_loc5_, 0), "length")) {
            avmGet(_loc5_, _loc6_)[_loc4_] += avmGet(avmGet(_loc21_, _loc6_), _loc4_);
            _loc4_ = _loc4_ + 1;
          }
          _loc6_ = _loc6_ + 1;
        }
      }
      _loc12_ = _loc12_ + 1;
    }
    if (avmGet(avmGet(_loc5_, _loc10_), _loc9_) < scope.LONGESTPATHTORUN) {
      _loc7_ = {
        goal: "runAway",
        dist: _loc5_,
        period: 10,
        priority: (scope.LONGESTPATHTORUN - avmGet(avmGet(_loc5_, _loc10_), _loc9_)) / scope.LONGESTPATHTORUN * scope.COWARDNESS * (avmGet(scope.myTank, "bulletsFired") / avmGet(_root, "settingsMaxBullets")),
        updateContinuously: false,
        id: scope.goalId++
      };
      avmCall(scope, "updateGoal", [_loc7_]);
    }
  }
  if (avmGet(scope.myTank, "hitSomething")) {
    scope.stuckTime = avmCall(Math, "min", [scope.stuckTime + 1, scope.MAXSTUCKTIME]);
  } else {
    scope.stuckTime = 0;
  }
  _loc7_ = {
    goal: "backAway",
    period: 5,
    priority: scope.stuckTime / (scope.MAXSTUCKTIME - 0.1),
    updateContinuously: false,
    id: scope.goalId++
  };
  avmCall(scope, "updateGoal", [_loc7_]);
  var _loc20_;
  if (avmGet(_root, "aliveCount") > 1) {
    _loc20_ = random(avmGet(_root, "TANKS"));
    while (avmGet(avmGet(_root, "game"), "tank" + _loc20_) == scope.myTank || !avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc20_), "alive")) {
      _loc20_ = random(avmGet(_root, "TANKS"));
    }
    if (avmGet(avmGet(_root, "game"), "tank" + _loc20_) != scope.myTank) {
      _loc7_ = {
        goal: "driveTo",
        period: 10,
        priority: scope.IDLEDRIVETOWARDENEMYPRIORITY,
        x: avmGet(avmGet(avmGet(_root, "tankFields"), _loc20_), "x"),
        y: avmGet(avmGet(avmGet(_root, "tankFields"), _loc20_), "y"),
        updateContinuously: false,
        id: scope.goalId++
      };
      avmCall(scope, "updateGoal", [_loc7_]);
    }
  }
  if (avmGet(scope.oldGoal, "id") != avmGet(scope.myGoal, "id")) {
    switch (avmGet(scope.myGoal, "goal")) {
      case "shootAfter":
        trace("Goal: Shoot after " + avmGet(scope.myGoal, "target"));
        scope.currentAggresiveness = avmCall(Math, "max", [0, scope.currentAggresiveness - 0.2]);
        break;
      case "sprayBullets":
        trace("Goal: Spray bullets at " + avmGet(scope.myGoal, "target"));
        scope.currentAggresiveness = avmCall(Math, "max", [0, scope.currentAggresiveness - 0.1]);
        break;
      case "detonate":
        scope.currentAggresiveness = avmCall(Math, "max", [0, scope.currentAggresiveness - 0.1]);
        break;
      case "runAway":
        trace("Goal: Run away");
        break;
      case "backAway":
        break;
      case "driveTo":
        trace("Goal: Drive to " + avmGet(scope.myGoal, "x") + ", " + avmGet(scope.myGoal, "y"));
        break;
      case "dodgeBullet":
        trace("Goal: Dodge bullet at " + avmGet(scope.myGoal, "x") + ", " + avmGet(scope.myGoal, "y"));
        break;
      case "dodgeFragbomb":
      case "dodgeLaser":
      case "driveAfter":
      case "goForCrate":
    }
    return true;
  }
  scope.currentAggresiveness = avmCall(Math, "min", [scope.AGGRESIVENESS, scope.currentAggresiveness + scope.AGGRESIVENESS / 50]);
  return avmGet(scope.myGoal, "updateContinuously");
}).bind(scope);
scope.decideActionsToAchieveGoal = (function decideActionsToAchieveGoal() {
  scope.myActionsForGoal = new Array();
  var _loc10_ = avmCall(Math, "floor", [avmGet(scope.myTank, "_x") / avmGet(_root, "SCALE")]);
  var _loc11_ = avmCall(Math, "floor", [avmGet(scope.myTank, "_y") / avmGet(_root, "SCALE")]);
  var _loc4_;
  var _loc8_;
  var _loc7_;
  var _loc6_;
  var _loc2_;
  var _loc12_;
  var _loc13_;
  var _loc19_;
  var _loc28_;
  var _loc5_;
  var _loc3_;
  var _loc17_;
  var _loc14_;
  var _loc9_;
  var _loc26_;
  var _loc24_;
  var _loc20_;
  var _loc21_;
  var _loc18_;
  var _loc16_;
  var _loc15_;
  var _loc27_;
  var _loc25_;
  var _loc22_;
  var _loc23_;
  var _loc29_;
  var _loc30_;
  switch (avmGet(scope.myGoal, "goal")) {
    case "shootAfter":
      _loc4_ = avmGet(scope.myTank, "_rotation");
      _loc8_ = false;
      _loc7_ = avmGet(_root, "BULLETLIFETIME");
      _loc6_ = avmGet(_root, "MOVIEWIDTH") + avmGet(_root, "MOVIEHEIGHT");
      _loc2_ = avmGet(scope.myTank, "_rotation");
      _loc12_ = avmGet(avmGet(scope.myGoal, "target"), "x") - avmGet(scope.myTank, "x");
      _loc13_ = avmGet(avmGet(scope.myGoal, "target"), "y") - avmGet(scope.myTank, "y");
      _loc19_ = avmCall(Math, "sqrt", [_loc12_ * _loc12_ + _loc13_ * _loc13_]);
      _loc28_ = avmCall(scope, "checkPathForCollision", [avmGet(scope.myTank, "x"), avmGet(scope.myTank, "y"), _loc12_ / _loc19_, _loc13_ / _loc19_, 1, avmCall(Math, "ceil", [_loc19_]), avmCall(Math, "ceil", [_loc19_])]);
      if (_loc28_ == undefined) {
        _loc8_ = true;
        _loc6_ = 0;
        if (_loc12_ != 0) {
          if (_loc12_ > 0) {
            _loc4_ = 90 + avmCall(Math, "atan", [_loc13_ / _loc12_]) * 180 / 3.141593;
          } else {
            _loc4_ = -90 + avmCall(Math, "atan", [_loc13_ / _loc12_]) * 180 / 3.141593;
          }
        } else if (_loc13_ > 0) {
          _loc4_ = 180;
        } else if (_loc13_ < 0) {
          _loc4_ = 0;
        } else {
          _loc4_ = _loc2_;
        }
        trace("Set shot to be a direct hitter with angle " + _loc4_);
      }
      if (!_loc8_) {
        _loc5_ = 1;
        while (_loc5_ <= 3) {
          _loc3_ = avmCall(scope, "checkBulletPath", [_loc2_]);
          if (avmGet(_loc3_, "result") == "HIT") {
            _loc8_ = true;
            if (avmGet(_loc3_, "time") < _loc7_) {
              _loc7_ = avmGet(_loc3_, "time");
              _loc6_ = 0;
              _loc4_ = _loc2_;
            }
          } else if (avmGet(_loc3_, "result") == "NOTHING" && !_loc8_) {
            if (avmGet(_loc3_, "closest") < _loc6_) {
              _loc6_ = avmGet(_loc3_, "closest");
              _loc4_ = _loc2_;
            }
          }
          if (avmCall(Math, "random", []) < 0.5) {
            _loc2_ += avmGet(scope.myTank, "turnSpeed") * _loc5_ * _loc5_;
          } else {
            _loc2_ -= avmGet(scope.myTank, "turnSpeed") * _loc5_ * _loc5_;
          }
          if (_loc2_ < -180) {
            _loc2_ = 360 + _loc2_;
          }
          if (_loc2_ > 180) {
            _loc2_ -= 360;
          }
          _loc5_ = _loc5_ + 1;
        }
      }
      trace(avmGet(scope.myTank, "currentWeapon"));
      if (_loc8_ || _loc6_ < scope.MAXCLOSESTDISTANCE / (avmGet(scope.myTank, "currentWeapon") != "laser" ? 1 : 2)) {
        avmCall(scope.myActionsForGoal, "push", [{
          action: "fireWeapon",
          delay: 5
        }]);
        avmCall(scope.myActionsForGoal, "push", [{
          action: "turnTo",
          angle: _loc4_
        }]);
      } else if (_loc4_ != avmGet(scope.myTank, "_rotation")) {
        avmCall(scope.myActionsForGoal, "push", [{
          action: "turnTo",
          angle: _loc4_
        }]);
      } else {
        _loc4_ = avmGet(scope.myTank, "_rotation") + 180;
        if (_loc4_ > 180) {
          _loc4_ -= 360;
        }
        avmCall(scope.myActionsForGoal, "push", [{
          action: "turnTo",
          angle: _loc4_
        }]);
      }
      break;
    case "sprayBullets":
      _loc4_ = avmGet(scope.myTank, "_rotation");
      _loc8_ = false;
      _loc7_ = avmGet(_root, "GATLINGLIFETIME");
      _loc6_ = avmGet(_root, "MOVIEWIDTH") + avmGet(_root, "MOVIEHEIGHT");
      _loc2_ = avmGet(scope.myTank, "_rotation");
      _loc5_ = 1;
      while (_loc5_ <= 3) {
        _loc3_ = avmCall(scope, "checkBulletPath", [_loc2_]);
        if (avmGet(_loc3_, "result") == "HIT") {
          _loc8_ = true;
          if (avmGet(_loc3_, "time") < _loc7_) {
            _loc7_ = avmGet(_loc3_, "time");
            _loc6_ = 0;
            _loc4_ = _loc2_;
          }
        } else if (avmGet(_loc3_, "result") == "NOTHING" && !scope.foundGoodShot) {
          if (avmGet(_loc3_, "closest") < _loc6_) {
            _loc6_ = avmGet(_loc3_, "closest");
            _loc4_ = _loc2_;
          }
        }
        if (avmCall(Math, "random", []) < 0.5) {
          _loc2_ += avmGet(scope.myTank, "turnSpeed") * _loc5_ * _loc5_;
        } else {
          _loc2_ -= avmGet(scope.myTank, "turnSpeed") * _loc5_ * _loc5_;
        }
        if (_loc2_ < -180) {
          _loc2_ = 360 + _loc2_;
        }
        if (_loc2_ > 180) {
          _loc2_ -= 360;
        }
        _loc5_ = _loc5_ + 1;
      }
      if (_loc8_ || _loc6_ < scope.MAXCLOSESTDISTANCE) {
        avmCall(scope.myActionsForGoal, "push", [{
          action: "fireWeapon",
          delay: 75
        }]);
        avmCall(scope.myActionsForGoal, "push", [{
          action: "turnTo",
          angle: _loc4_
        }]);
      } else if (_loc4_ != avmGet(scope.myTank, "_rotation")) {
        avmCall(scope.myActionsForGoal, "push", [{
          action: "turnTo",
          angle: _loc4_
        }]);
      } else {
        _loc4_ = avmGet(scope.myTank, "_rotation") + 180;
        if (_loc4_ > 180) {
          _loc4_ -= 360;
        }
        avmCall(scope.myActionsForGoal, "push", [{
          action: "turnTo",
          angle: _loc4_
        }]);
      }
      break;
    case "detonate":
      avmCall(scope.myActionsForGoal, "push", [{
        action: "fireWeapon",
        delay: 1
      }]);
      break;
    case "driveTo":
      _loc17_ = avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc10_), _loc11_);
      _loc14_ = avmCall(_root, "getShortestPathWithDistances", [avmGet(_root, "maze"), _loc17_, _loc10_, _loc11_, avmGet(scope.myGoal, "x"), avmGet(scope.myGoal, "y")]);
      avmCall(scope, "pushActionsToFollowPath", [_loc14_]);
      break;
    case "runAway":
      _loc17_ = avmGet(scope.myGoal, "dist");
      _loc9_ = avmCall(_root, "followGradientPathWithDistancesAndDeadEnds", [avmGet(_root, "maze"), _loc17_, avmGet(_root, "deadEnds"), _loc10_, _loc11_, 5]);
      avmCall(scope, "pushActionsToFollowPath", [_loc9_]);
      break;
    case "backAway":
      avmCall(scope.myActionsForGoal, "push", [{
        action: "driveToPos",
        x: (_loc10_ + 0.5) * avmGet(_root, "SCALE"),
        y: (_loc11_ + 0.5) * avmGet(_root, "SCALE"),
        canReverse: false
      }]);
      if (avmCall(scope.myTank, "expandedHitCheck", [avmGet(scope.myTank, "hitPointsFront"), 1.1])) {
        if (avmCall(scope.myTank, "expandedHitCheck", [avmGet(scope.myTank, "hitPointsRear"), 1.1])) {
          if (avmCall(scope.myTank, "expandedHitCheck", [avmGet(scope.myTank, "hitPointsLeft"), 1.3])) {
            avmCall(scope.myActionsForGoal, "push", [{
              action: "backupAndTurn",
              dist: 5,
              dir: "left"
            }]);
          } else {
            avmCall(scope.myActionsForGoal, "push", [{
              action: "backupAndTurn",
              dist: 5,
              dir: "right"
            }]);
          }
        } else {
          avmCall(scope.myActionsForGoal, "push", [{
            action: "backup",
            dist: 3
          }]);
        }
      } else if (avmCall(scope.myTank, "expandedHitCheck", [avmGet(scope.myTank, "hitPointsRear"), 1.1])) {
        if (avmCall(scope.myTank, "expandedHitCheck", [avmGet(scope.myTank, "hitPointsFront"), 1.1])) {
          if (avmCall(scope.myTank, "expandedHitCheck", [avmGet(scope.myTank, "hitPointsLeft"), 1.3])) {
            avmCall(scope.myActionsForGoal, "push", [{
              action: "backupAndTurn",
              dist: 5,
              dir: "left"
            }]);
          } else {
            avmCall(scope.myActionsForGoal, "push", [{
              action: "backupAndTurn",
              dist: 5,
              dir: "right"
            }]);
          }
        } else {
          avmCall(scope.myActionsForGoal, "push", [{
            action: "forward",
            dist: 3
          }]);
        }
      } else {
        avmCall(scope.myActionsForGoal, "push", [{
          action: "backup",
          dist: 3
        }]);
      }
      break;
    case "dodgeBullet":
      _loc26_ = avmCall(Math, "floor", [avmGet(scope.myGoal, "x") / avmGet(_root, "SCALE")]);
      _loc24_ = avmCall(Math, "floor", [avmGet(scope.myGoal, "y") / avmGet(_root, "SCALE")]);
      _loc9_ = avmCall(_root, "followGradientPathWithDistancesAndDeadEnds", [avmGet(_root, "maze"), avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc26_), _loc24_), avmGet(_root, "deadEnds"), _loc10_, _loc11_, 5]);
      if (avmGet(scope.myGoal, "t") < avmGet(scope.myGoal, "maxTime") / 3 && avmGet(scope.myGoal, "dist") < avmGet(scope.myGoal, "maxDist") / 5 || avmGet(_loc9_, "length") <= 1) {
        if (avmGet(_loc9_, "length") <= 1 && !(avmGet(scope.myGoal, "t") < avmGet(scope.myGoal, "maxTime") / 3 && avmGet(scope.myGoal, "dist") < avmGet(scope.myGoal, "maxDist") / 5)) {
          trace("I was cornered!");
        }
        _loc20_ = avmGet(scope.myTank, "_rotation");
        if (avmGet(avmGet(scope.myGoal, "dir"), "x") != 0) {
          if (avmGet(avmGet(scope.myGoal, "dir"), "x") > 0) {
            _loc4_ = 90 + avmCall(Math, "atan", [avmGet(avmGet(scope.myGoal, "dir"), "y") / avmGet(avmGet(scope.myGoal, "dir"), "x")]) * 180 / 3.141593;
          } else {
            _loc4_ = -90 + avmCall(Math, "atan", [avmGet(avmGet(scope.myGoal, "dir"), "y") / avmGet(avmGet(scope.myGoal, "dir"), "x")]) * 180 / 3.141593;
          }
        } else if (avmGet(avmGet(scope.myGoal, "dir"), "y") > 0) {
          _loc4_ = 180;
        } else if (avmGet(avmGet(scope.myGoal, "dir"), "y") < 0) {
          _loc4_ = 0;
        } else {
          _loc4_ = _loc20_;
        }
        if (avmCall(Math, "abs", [_loc4_ - _loc20_]) > 90 && avmCall(Math, "abs", [_loc4_ - _loc20_]) < 270) {
          _loc4_ += 180;
          if (_loc4_ > 180) {
            _loc4_ -= 360;
          }
        }
        _loc4_ = avmCall(Math, "round", [_loc4_ / avmGet(scope.myTank, "turnSpeed")]) * avmGet(scope.myTank, "turnSpeed");
        avmCall(scope.myActionsForGoal, "push", [{
          action: "turnTo",
          angle: _loc4_
        }]);
        if (avmGet(scope.myGoal, "dist") < avmGet(_root, "SCALE") / 4) {
          _loc21_ = avmCall(Math, "sqrt", [avmGet(avmGet(scope.myGoal, "dir"), "x") * avmGet(avmGet(scope.myGoal, "dir"), "x") + avmGet(avmGet(scope.myGoal, "dir"), "y") * avmGet(avmGet(scope.myGoal, "dir"), "y")]);
          _loc18_ = {
            x: -avmGet(avmGet(scope.myGoal, "dir"), "y") / _loc21_,
            y: avmGet(avmGet(scope.myGoal, "dir"), "x") / _loc21_
          };
          _loc16_ = {
            x: avmGet(avmGet(scope.myGoal, "closest"), "x") + avmGet(_loc18_, "x") * avmGet(_root, "SCALE") / 2,
            y: avmGet(avmGet(scope.myGoal, "closest"), "y") + avmGet(_loc18_, "y") * avmGet(_root, "SCALE") / 2
          };
          _loc15_ = {
            x: avmGet(avmGet(scope.myGoal, "closest"), "x") - avmGet(_loc18_, "x") * avmGet(_root, "SCALE") / 2,
            y: avmGet(avmGet(scope.myGoal, "closest"), "y") - avmGet(_loc18_, "y") * avmGet(_root, "SCALE") / 2
          };
          _loc27_ = avmCall(Math, "sqrt", [(avmGet(scope.myTank, "x") - avmGet(_loc16_, "x")) * (avmGet(scope.myTank, "x") - avmGet(_loc16_, "x")) + (avmGet(scope.myTank, "y") - avmGet(_loc16_, "y")) * (avmGet(scope.myTank, "y") - avmGet(_loc16_, "y"))]);
          _loc25_ = avmCall(Math, "sqrt", [(avmGet(scope.myTank, "x") - avmGet(_loc15_, "x")) * (avmGet(scope.myTank, "x") - avmGet(_loc15_, "x")) + (avmGet(scope.myTank, "y") - avmGet(_loc15_, "y")) * (avmGet(scope.myTank, "y") - avmGet(_loc15_, "y"))]);
          if (_loc27_ < _loc25_) {
            avmCall(scope.myActionsForGoal, "push", [{
              action: "driveToPos",
              x: avmGet(_loc16_, "x"),
              y: avmGet(_loc16_, "y"),
              canReverse: true
            }]);
          } else {
            avmCall(scope.myActionsForGoal, "push", [{
              action: "driveToPos",
              x: avmGet(_loc15_, "x"),
              y: avmGet(_loc15_, "y"),
              canReverse: true
            }]);
          }
        }
      } else {
        avmCall(scope, "pushActionsToFollowPath", [_loc9_]);
      }
      avmCall(scope, "tryToRetaliate", []);
      break;
    case "dodgeFragbomb":
      _loc22_ = avmCall(Math, "floor", [avmGet(avmGet(scope.myGoal, "frag"), "x") / avmGet(_root, "SCALE")]);
      _loc23_ = avmCall(Math, "floor", [avmGet(avmGet(scope.myGoal, "frag"), "y") / avmGet(_root, "SCALE")]);
      _loc9_ = avmCall(_root, "followGradientPathWithDistancesAndDeadEnds", [avmGet(_root, "maze"), avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc22_), _loc23_), avmGet(_root, "deadEnds"), _loc10_, _loc11_, 5]);
      if (avmGet(_loc9_, "length") > 1) {
        avmCall(scope, "pushActionsToFollowPath", [_loc9_]);
      } else {
        _loc9_ = avmCall(_root, "followGradientPathWithDistances", [avmGet(_root, "maze"), avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc22_), _loc23_), _loc10_, _loc11_, 5]);
        avmCall(scope, "pushActionsToFollowPath", [_loc9_]);
      }
      avmCall(scope, "tryToRetaliate", []);
      break;
    case "dodgeLaser":
      _loc29_ = avmCall(Math, "floor", [avmGet(avmGet(scope.myGoal, "owner"), "x") / avmGet(_root, "SCALE")]);
      _loc30_ = avmCall(Math, "floor", [avmGet(avmGet(scope.myGoal, "owner"), "y") / avmGet(_root, "SCALE")]);
      _loc9_ = avmCall(_root, "followGradientPathWithDistancesAndDeadEnds", [avmGet(_root, "maze"), avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc29_), _loc30_), avmGet(_root, "deadEnds"), _loc10_, _loc11_, 2]);
      avmCall(scope, "pushActionsToFollowPath", [_loc9_]);
      avmCall(scope, "tryToRetaliate", []);
      break;
    case "goForCrate":
      _loc17_ = avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc10_), _loc11_);
      _loc14_ = avmCall(_root, "getShortestPathWithDistances", [avmGet(_root, "maze"), _loc17_, _loc10_, _loc11_, avmGet(scope.myGoal, "x"), avmGet(scope.myGoal, "y")]);
      avmCall(scope.myActionsForGoal, "push", [{
        action: "driveToPos",
        x: (avmGet(avmGet(_loc14_, avmGet(_loc14_, "length") - 1), "x") + 0.5) * avmGet(_root, "SCALE"),
        y: (avmGet(avmGet(_loc14_, avmGet(_loc14_, "length") - 1), "y") + 0.5) * avmGet(_root, "SCALE"),
        canReverse: true
      }]);
      avmCall(scope, "pushActionsToFollowPath", [_loc14_]);
      break;
    case "idle":
      avmCall(scope.myActionsForGoal, "push", [{
        action: "idle"
      }]);
    default:
      return;
  }
}).bind(scope);
scope.setInputToDoActions = (function setInputToDoActions() {
  var _loc7_ = avmCall(Math, "floor", [avmGet(scope.myTank, "_x") / avmGet(_root, "SCALE")]);
  var _loc6_ = avmCall(Math, "floor", [avmGet(scope.myTank, "_y") / avmGet(_root, "SCALE")]);
  scope.action = avmCall(scope.myActionsForGoal, "pop", []);
  switch (avmGet(scope.action, "action")) {
    case "driveToField":
      if (avmCall(Math, "abs", [avmGet(scope.myTank, "_x") - (avmGet(scope.action, "x") + 0.5) * avmGet(_root, "SCALE")]) > avmGet(_root, "SCALE") / 3 || avmCall(Math, "abs", [avmGet(scope.myTank, "_y") - (avmGet(scope.action, "y") + 0.5) * avmGet(_root, "SCALE")]) > avmGet(_root, "SCALE") / 3) {
        avmCall(scope.myActionsForGoal, "push", [scope.action]);
      }
      break;
    case "turnTo":
      if (avmCall(Math, "abs", [avmGet(scope.myTank, "_rotation") - avmGet(scope.action, "angle")]) >= avmGet(scope.myTank, "turnSpeed")) {
        avmCall(scope.myActionsForGoal, "push", [scope.action]);
      }
      break;
    case "fireWeapon":
      if (avmGet(scope.action, "delay") != 0) {
        scope.action.delay--;
        avmCall(scope.myActionsForGoal, "push", [scope.action]);
      }
      break;
    case "driveToPos":
      if (avmCall(Math, "abs", [avmGet(scope.myTank, "_x") - avmGet(scope.action, "x")]) > avmGet(_root, "SCALE") / 4 || avmCall(Math, "abs", [avmGet(scope.myTank, "_y") - avmGet(scope.action, "y")]) > avmGet(_root, "SCALE") / 4) {
        avmCall(scope.myActionsForGoal, "push", [scope.action]);
      }
      break;
    case "forward":
      if (avmGet(scope.action, "dist") != 0) {
        scope.action.dist--;
        avmCall(scope.myActionsForGoal, "push", [scope.action]);
      }
      break;
    case "forwardAndTurn":
      if (avmGet(scope.action, "dist") != 0) {
        scope.action.dist--;
        avmCall(scope.myActionsForGoal, "push", [scope.action]);
      }
    case "backup":
      if (avmGet(scope.action, "dist") != 0) {
        scope.action.dist--;
        avmCall(scope.myActionsForGoal, "push", [scope.action]);
      }
      break;
    case "backupAndTurn":
      if (avmGet(scope.action, "dist") != 0) {
        scope.action.dist--;
        avmCall(scope.myActionsForGoal, "push", [scope.action]);
      }
      break;
    case "idle":
      avmCall(scope.myActionsForGoal, "push", [scope.action]);
  }
  scope.action = avmGet(scope.myActionsForGoal, avmGet(scope.myActionsForGoal, "length") - 1);
  var _loc3_;
  var _loc2_;
  var _loc5_;
  var _loc4_;
  switch (avmGet(scope.action, "action")) {
    case "driveToField":
      _loc3_ = avmGet(scope.myTank, "_rotation");
      if (_loc7_ > avmGet(scope.action, "x")) {
        _loc2_ = -90;
      } else if (_loc7_ < avmGet(scope.action, "x")) {
        _loc2_ = 90;
      } else if (_loc6_ > avmGet(scope.action, "y")) {
        _loc2_ = 0;
      } else if (_loc6_ < avmGet(scope.action, "y")) {
        _loc2_ = 180;
      } else {
        _loc2_ = _loc3_;
      }
      if (_loc2_ > _loc3_) {
        if (avmCall(Math, "abs", [_loc2_ - _loc3_]) > 180) {
          scope.myTank.turnLeft = true;
          scope.myTank.turnRight = false;
        } else {
          scope.myTank.turnLeft = false;
          scope.myTank.turnRight = true;
        }
      } else if (_loc2_ < _loc3_) {
        if (avmCall(Math, "abs", [_loc2_ - _loc3_]) > 180) {
          scope.myTank.turnLeft = false;
          scope.myTank.turnRight = true;
        } else {
          scope.myTank.turnLeft = true;
          scope.myTank.turnRight = false;
        }
      } else {
        scope.myTank.turnLeft = false;
        scope.myTank.turnRight = false;
      }
      if (avmCall(Math, "abs", [_loc2_ - _loc3_]) > 90 && avmCall(Math, "abs", [_loc2_ - _loc3_]) < 270) {
        scope.myTank.forward = false;
        scope.myTank.backup = false;
      } else {
        scope.myTank.forward = true;
        scope.myTank.backup = false;
      }
      scope.myTank.fire = false;
      return;
    case "turnTo":
      _loc3_ = avmGet(scope.myTank, "_rotation");
      _loc2_ = avmGet(scope.action, "angle");
      if (_loc2_ > _loc3_) {
        if (avmCall(Math, "abs", [_loc2_ - _loc3_]) > 180) {
          scope.myTank.turnLeft = true;
          scope.myTank.turnRight = false;
        } else {
          scope.myTank.turnLeft = false;
          scope.myTank.turnRight = true;
        }
      } else if (_loc2_ < _loc3_) {
        if (avmCall(Math, "abs", [_loc2_ - _loc3_]) > 180) {
          scope.myTank.turnLeft = false;
          scope.myTank.turnRight = true;
        } else {
          scope.myTank.turnLeft = true;
          scope.myTank.turnRight = false;
        }
      } else {
        scope.myTank.turnLeft = false;
        scope.myTank.turnRight = false;
      }
      scope.myTank.forward = false;
      scope.myTank.backup = false;
      scope.myTank.fire = false;
      return;
    case "fireWeapon":
      scope.myTank.turnLeft = false;
      scope.myTank.turnRight = false;
      scope.myTank.forward = false;
      scope.myTank.backup = false;
      scope.myTank.fire = true;
      return;
    case "driveToPos":
      _loc3_ = avmGet(scope.myTank, "_rotation");
      _loc5_ = false;
      _loc4_ = {
        x: avmGet(scope.action, "x") - avmGet(scope.myTank, "_x"),
        y: avmGet(scope.action, "y") - avmGet(scope.myTank, "_y")
      };
      if (avmGet(_loc4_, "x") != 0) {
        if (avmGet(_loc4_, "x") > 0) {
          _loc2_ = 90 + avmCall(Math, "atan", [avmGet(_loc4_, "y") / avmGet(_loc4_, "x")]) * 180 / 3.141593;
        } else {
          _loc2_ = -90 + avmCall(Math, "atan", [avmGet(_loc4_, "y") / avmGet(_loc4_, "x")]) * 180 / 3.141593;
        }
      } else if (avmGet(_loc4_, "y") > 0) {
        _loc2_ = 180;
      } else if (avmGet(_loc4_, "y") < 0) {
        _loc2_ = 0;
      } else {
        _loc2_ = _loc3_;
      }
      _loc2_ = avmGet(scope.myTank, "turnSpeed") * avmCall(Math, "round", [_loc2_ / avmGet(scope.myTank, "turnSpeed")]);
      if (avmGet(scope.action, "canReverse")) {
        if (avmCall(Math, "abs", [_loc2_ - _loc3_]) > 90 && avmCall(Math, "abs", [_loc2_ - _loc3_]) < 270) {
          _loc5_ = true;
          _loc2_ += 180;
          if (_loc2_ > 180) {
            _loc2_ -= 360;
          }
        }
      }
      if (_loc2_ > _loc3_) {
        if (avmCall(Math, "abs", [_loc2_ - _loc3_]) > 180) {
          scope.myTank.turnLeft = avmCall(Math, "abs", [_loc2_ - _loc3_]) < 360 - avmGet(scope.myTank, "turnSpeed") ? true : false;
          scope.myTank.turnRight = false;
        } else {
          scope.myTank.turnLeft = false;
          scope.myTank.turnRight = avmCall(Math, "abs", [_loc2_ - _loc3_]) > avmGet(scope.myTank, "turnSpeed") ? true : false;
        }
      } else if (_loc2_ < _loc3_) {
        if (avmCall(Math, "abs", [_loc2_ - _loc3_]) > 180) {
          scope.myTank.turnLeft = false;
          scope.myTank.turnRight = avmCall(Math, "abs", [_loc2_ - _loc3_]) < 360 - avmGet(scope.myTank, "turnSpeed") ? true : false;
        } else {
          scope.myTank.turnLeft = avmCall(Math, "abs", [_loc2_ - _loc3_]) > avmGet(scope.myTank, "turnSpeed") ? true : false;
          scope.myTank.turnRight = false;
        }
      } else {
        scope.myTank.turnLeft = false;
        scope.myTank.turnRight = false;
      }
      if (avmCall(Math, "abs", [_loc2_ - _loc3_]) > 45 && avmCall(Math, "abs", [_loc2_ - _loc3_]) < 315) {
        scope.myTank.forward = false;
        scope.myTank.backup = false;
      } else {
        scope.myTank.forward = !_loc5_;
        scope.myTank.backup = _loc5_;
      }
      scope.myTank.fire = false;
      return;
    case "forward":
      scope.myTank.turnLeft = false;
      scope.myTank.turnRight = false;
      scope.myTank.forward = true;
      scope.myTank.backup = false;
      scope.myTank.fire = false;
      return;
    case "forwardAndTurn":
      scope.myTank.turnLeft = avmGet(scope.action, "dir") == "left";
      scope.myTank.turnRight = avmGet(scope.action, "dir") == "right";
      scope.myTank.forward = true;
      scope.myTank.backup = false;
      scope.myTank.fire = false;
      return;
    case "backup":
      scope.myTank.turnLeft = false;
      scope.myTank.turnRight = false;
      scope.myTank.forward = false;
      scope.myTank.backup = true;
      scope.myTank.fire = false;
      return;
    case "backupAndTurn":
      scope.myTank.turnLeft = avmGet(scope.action, "dir") == "left";
      scope.myTank.turnRight = avmGet(scope.action, "dir") == "right";
      scope.myTank.forward = false;
      scope.myTank.backup = true;
      scope.myTank.fire = false;
      return;
    case "idle":
      scope.myTank.turnLeft = false;
      scope.myTank.turnRight = false;
      scope.myTank.forward = false;
      scope.myTank.backup = false;
      scope.myTank.fire = false;
      return;
    default:
      scope.myTank.turnLeft = false;
      scope.myTank.turnRight = false;
      scope.myTank.forward = false;
      scope.myTank.backup = false;
      scope.myTank.fire = false;
      scope.myGoal.period = 0;
      return;
  }
}).bind(scope);
scope.myTank = undefined;
scope.myGoal = {
  goal: "idle",
  priority: 0,
  period: 15,
  id: 0,
  updateContinuously: true
};
scope.myActionsForGoal = undefined;
scope.AGGRESIVENESS = 0.5;
scope.COWARDNESS = 0.7;
scope.GREEDY = 1;
scope.LONGESTPATHTOSHOOT = 7;
scope.LONGESTPATHTONOTHESITATETOSHOOT = 2;
scope.FRAGBOMBSAFETYDIST = 3 * avmGet(_root, "SCALE");
scope.FRAGBOMBDETONATEDIST = 3 * avmGet(_root, "SCALE");
scope.LONGESTPATHTORUN = 10;
scope.MAXSTUCKTIME = 1;
scope.stuckTime = 0;
scope.currentAggresiveness = scope.AGGRESIVENESS;
scope.IDLEDRIVETOWARDENEMYPRIORITY = 0.1;
scope.IDLEDRIVEPRIORITY = 0.1;
scope.MAXCLOSESTCELLDISTANCE = 2;
scope.MAXCLOSESTDISTANCE = avmGet(_root, "SCALE") * scope.MAXCLOSESTCELLDISTANCE;
scope.MAXTIMETODODGEBULLET = 75;
scope.MAXDISTTODODGEBULLET = 4 * avmGet(_root, "SCALE");
scope.MAXCELLDISTTODODGEBULLET = scope.MAXTIMETODODGEBULLET * avmGet(_root, "BULLETSPEED") / 50;
scope.MAXCELLDISTTODODGEFRAGBOMB = 5;
scope.MAXTIMETODODGEFRAGBOMBFRAGMENT = 50;
scope.MAXDISTTODODGEFRAGBOMBFRAGMENT = 3 * avmGet(_root, "SCALE");
scope.MAXCELLDISTTODODGEFRAGBOMBFRAGMENT = scope.MAXTIMETODODGEFRAGBOMBFRAGMENT * (avmGet(_root, "FRAGSPEED") + 4) / 50;
scope.MAXTIMETODODGEGATLINGBULLET = 75;
scope.MAXDISTTODODGEGATLINGBULLET = 3 * avmGet(_root, "SCALE");
scope.MAXCELLDISTTODODGEGATLINGBULLET = scope.MAXTIMETODODGEGATLINGBULLET * avmGet(_root, "GATLINGSPEED") / 50;
scope.MAXCELLDISTTODODGELASER = 2;
scope.MAXCELLDISTTOGOFORCRATE = 10;
scope.goalId = 1;
}
export function installTank(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.drawHitPoints = (function drawHitPoints(points, scale) {
  scope.i = 0;
  while (scope.i < avmGet(points, "length")) {
    avmCall(this, "lineStyle", [10, 65280]);
    avmCall(this, "moveTo", [avmGet(avmGet(points, scope.i), "x") * scale, avmGet(avmGet(points, scope.i), "y") * scale]);
    avmCall(this, "lineTo", [avmGet(avmGet(points, scope.i), "x") * scale + 1, avmGet(avmGet(points, scope.i), "y") * scale]);
    scope.i++;
  }
}).bind(scope);
scope.hitCheck = (function hitCheck(points) {
  scope.i = 0;
  var _loc2_;
  while (scope.i < avmGet(points, "length")) {
    _loc2_ = {
      x: avmGet(avmGet(points, scope.i), "x"),
      y: avmGet(avmGet(points, scope.i), "y")
    };
    avmCall(scope, "localToGlobal", [_loc2_]);
    if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(_loc2_, "x"), avmGet(_loc2_, "y"), true])) {
      return true;
    }
    scope.i++;
  }
  return false;
}).bind(scope);
scope.expandedHitCheck = (function expandedHitCheck(points, scale) {
  scope.i = 0;
  var _loc2_;
  while (scope.i < avmGet(points, "length")) {
    _loc2_ = {
      x: avmGet(avmGet(points, scope.i), "x") * scale,
      y: avmGet(avmGet(points, scope.i), "y") * scale
    };
    avmCall(scope, "localToGlobal", [_loc2_]);
    if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(_loc2_, "x"), avmGet(_loc2_, "y"), true])) {
      return true;
    }
    scope.i++;
  }
  return false;
}).bind(scope);
scope.attemptToMove = (function attemptToMove(forward, backup, turnLeft, turnRight) {
  scope.STEPS = 5;
  scope.movesSuc = 0;
  scope.turnsSuc = 0;
  scope.moveSize = 0;
  scope.turnSize = 0;
  if (forward) {
    scope.moveSize = scope.forwardSpeed / scope.STEPS;
  }
  if (backup) {
    scope.moveSize -= scope.backUpSpeed / scope.STEPS;
  }
  if (turnLeft) {
    scope.turnSize = -scope.turnSpeed / scope.STEPS;
  }
  if (turnRight) {
    scope.turnSize += scope.turnSpeed / scope.STEPS;
  }
  scope.hitSomething = false;
  var _loc2_ = 0;
  while (_loc2_ < scope.STEPS) {
    scope._rotation = scope._rotation + scope.turnSize;
    scope.x += avmCall(Math, "cos", [(scope._rotation - 90) * 3.141592653589793 / 180]) * scope.moveSize;
    scope.y += avmCall(Math, "sin", [(scope._rotation - 90) * 3.141592653589793 / 180]) * scope.moveSize;
    _loc2_ = _loc2_ + 1;
  }
  scope._X = scope.x;
  scope._Y = scope.y;
  if (avmCall(scope, "hitCheck", [scope.hitPointsFront]) || avmCall(scope, "hitCheck", [scope.hitPointsRear]) || avmCall(scope, "hitCheck", [scope.hitPointsLeft]) || avmCall(scope, "hitCheck", [scope.hitPointsRight])) {
    scope.x = scope.oldX;
    scope.y = scope.oldY;
    scope._X = scope.oldX;
    scope._Y = scope.oldY;
    if (!scope.mouseTank || avmGet(_root, "settingsUseNewMouseControl")) {
      scope._rotation = scope.oldRot;
    }
    _loc2_ = 0;
    while (_loc2_ < scope.STEPS) {
      if (!scope.mouseTank || avmGet(_root, "settingsUseNewMouseControl")) {
        scope.oldRot = scope._rotation;
        scope._rotation = scope._rotation + scope.turnSize;
        if (avmCall(scope, "hitCheck", [scope.hitPointsFront]) || avmCall(scope, "hitCheck", [scope.hitPointsRear]) || avmCall(scope, "hitCheck", [scope.hitPointsLeft]) || avmCall(scope, "hitCheck", [scope.hitPointsRight])) {
          scope._rotation = scope.oldRot;
          scope.hitSomething = true;
        }
      } else if (scope.mouseTank && !avmGet(_root, "settingsUseNewMouseControl")) {
        if (avmCall(scope, "hitCheck", [scope.hitPointsFront]) || avmCall(scope, "hitCheck", [scope.hitPointsRear]) || avmCall(scope, "hitCheck", [scope.hitPointsLeft]) || avmCall(scope, "hitCheck", [scope.hitPointsRight])) {
          if (!avmGet(_root, "settingsUseSmoothCollision")) {
            scope._rotation = scope.oldRot;
          }
          scope.hitSomething = true;
        }
      }
      scope.oldX = scope.x;
      scope.oldY = scope.y;
      scope.x += avmCall(Math, "cos", [(scope._rotation - 90) * 3.141592653589793 / 180]) * scope.moveSize;
      scope.y += avmCall(Math, "sin", [(scope._rotation - 90) * 3.141592653589793 / 180]) * scope.moveSize;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (scope.moveSize > 0 && avmCall(scope, "hitCheck", [scope.hitPointsFront])) {
        scope.x = scope.oldX;
        scope.y = scope.oldY;
        scope._X = scope.oldX;
        scope._Y = scope.oldY;
        scope.hitSomething = true;
      } else if (scope.moveSize < 0 && avmCall(scope, "hitCheck", [scope.hitPointsRear])) {
        scope.x = scope.oldX;
        scope.y = scope.oldY;
        scope._X = scope.oldX;
        scope._Y = scope.oldY;
        scope.hitSomething = true;
      }
      _loc2_ = _loc2_ + 1;
    }
    if (avmGet(_root, "settingsUseSmoothCollision") && scope.hitSomething) {
      _loc2_ = 0;
      while (_loc2_ < 2) {
        if (scope.mouseTank && !avmGet(_root, "settingsUseNewMouseControl")) {
          avmCall(scope, "attemptToClearFrontAndBack", []);
        } else if (scope._rotation == scope.oldRot) {
          avmCall(scope, "attemptToClearLeftAndRight", [scope.moveSize]);
          avmCall(scope, "attemptToClearFrontAndBack", []);
          if (avmCall(scope, "hitCheck", [scope.hitPointsFront]) || avmCall(scope, "hitCheck", [scope.hitPointsRear]) || avmCall(scope, "hitCheck", [scope.hitPointsLeft]) || avmCall(scope, "hitCheck", [scope.hitPointsRight])) {
            scope._rotation = scope.oldRot;
            if (avmCall(scope, "hitCheck", [scope.hitPointsFront]) || avmCall(scope, "hitCheck", [scope.hitPointsRear]) || avmCall(scope, "hitCheck", [scope.hitPointsLeft]) || avmCall(scope, "hitCheck", [scope.hitPointsRight])) {
              scope.x = scope.oldX;
              scope.y = scope.oldY;
              scope._X = scope.oldX;
              scope._Y = scope.oldY;
            }
          }
        }
        avmCall(scope, "preventGettingStuckOnCorner", []);
        _loc2_ = _loc2_ + 1;
      }
      avmCall(scope, "spawnSmokeSkidMarks", [scope.moveSize]);
      if (avmCall(Math, "random", []) > 0.3) {
        avmCall(scope, "spawnRubbleSkidMarks", [scope.moveSize]);
      }
    }
  }
  scope.offset = (360 + scope._rotation) % scope.turnSpeed;
  if (!scope.hitSomething && scope.offset != 0 && (!scope.mouseTank || avmGet(_root, "settingsUseNewMouseControl"))) {
    if (scope.offset < scope.turnSpeed / 2) {
      scope._rotation = scope._rotation - scope.offset;
      if (avmCall(scope, "hitCheck", [scope.hitPointsFront]) || avmCall(scope, "hitCheck", [scope.hitPointsRear]) || avmCall(scope, "hitCheck", [scope.hitPointsLeft]) || avmCall(scope, "hitCheck", [scope.hitPointsRight])) {
        scope._rotation = scope._rotation + scope.offset;
      }
    } else {
      scope._rotation = scope._rotation + (scope.turnSpeed - scope.offset);
      if (avmCall(scope, "hitCheck", [scope.hitPointsFront]) || avmCall(scope, "hitCheck", [scope.hitPointsRear]) || avmCall(scope, "hitCheck", [scope.hitPointsLeft]) || avmCall(scope, "hitCheck", [scope.hitPointsRight])) {
        scope._rotation = scope._rotation - (scope.turnSpeed - scope.offset);
      }
    }
  }
  return !scope.hitSomething;
}).bind(scope);
scope.preventGettingStuckOnCorner = (function preventGettingStuckOnCorner() {
  if (avmCall(scope, "hitCheck", [scope.hitPointsLeft]) && !avmCall(scope, "expandedHitCheck", [scope.hitPointsRight, 1.1])) {
    scope.x += avmCall(Math, "cos", [scope._rotation * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
    scope.y += avmCall(Math, "sin", [scope._rotation * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
    scope._X = scope.x;
    scope._Y = scope.y;
  } else if (avmCall(scope, "hitCheck", [scope.hitPointsRight]) && !avmCall(scope, "expandedHitCheck", [scope.hitPointsLeft, 1.1])) {
    scope.x += avmCall(Math, "cos", [(scope._rotation - 180) * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
    scope.y += avmCall(Math, "sin", [(scope._rotation - 180) * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
    scope._X = scope.x;
    scope._Y = scope.y;
  }
}).bind(scope);
scope.attemptToClearLeftAndRight = (function attemptToClearLeftAndRight(moveSize) {
  if (avmCall(scope, "expandedHitCheck", [scope.hitPointsLeft, 1.4000000000000001])) {
    if (moveSize == 0) {
      scope.x += avmCall(Math, "cos", [scope._rotation * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
      scope.y += avmCall(Math, "sin", [scope._rotation * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
      scope._X = scope.x;
      scope._Y = scope.y;
    }
    scope._rotation = scope._rotation + (moveSize < 0 ? -1 : 1) * scope.turnSpeed / scope.STEPS;
  } else if (avmCall(scope, "expandedHitCheck", [scope.hitPointsRight, 1.4000000000000001])) {
    if (moveSize == 0) {
      scope.x += avmCall(Math, "cos", [(scope._rotation - 180) * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
      scope.y += avmCall(Math, "sin", [(scope._rotation - 180) * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
      scope._X = scope.x;
      scope._Y = scope.y;
    }
    scope._rotation = scope._rotation - (moveSize < 0 ? -1 : 1) * scope.turnSpeed / scope.STEPS;
  } else {
    scope._rotation = scope._rotation + (avmCall(Math, "random", []) <= 0.5 ? 0.5 : -0.5) * scope.turnSpeed / scope.STEPS;
  }
}).bind(scope);
scope.attemptToClearFrontAndBack = (function attemptToClearFrontAndBack() {
  var _loc1_ = avmCall(scope, "expandedHitCheck", [scope.hitPointsFront, 1.1]);
  var _loc2_ = avmCall(scope, "expandedHitCheck", [scope.hitPointsRear, 1.1]);
  if (_loc1_ && !_loc2_) {
    scope.x += avmCall(Math, "cos", [(scope._rotation - 90) * 3.141592653589793 / 180]) * -scope.backUpSpeed / scope.STEPS;
    scope.y += avmCall(Math, "sin", [(scope._rotation - 90) * 3.141592653589793 / 180]) * -scope.backUpSpeed / scope.STEPS;
    scope._X = scope.x;
    scope._Y = scope.y;
  } else if (_loc2_ && !_loc1_) {
    scope.x += avmCall(Math, "cos", [(scope._rotation - 90) * 3.141592653589793 / 180]) * scope.forwardSpeed / scope.STEPS;
    scope.y += avmCall(Math, "sin", [(scope._rotation - 90) * 3.141592653589793 / 180]) * scope.forwardSpeed / scope.STEPS;
    scope._X = scope.x;
    scope._Y = scope.y;
  } else if (_loc2_ && _loc1_) {
    if (avmCall(scope, "expandedHitCheck", [scope.hitPointsLeft, 1.4000000000000001])) {
      scope.x += avmCall(Math, "cos", [scope._rotation * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
      scope.y += avmCall(Math, "sin", [scope._rotation * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
      scope._X = scope.x;
      scope._Y = scope.y;
    } else {
      scope.x += avmCall(Math, "cos", [(scope._rotation - 180) * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
      scope.y += avmCall(Math, "sin", [(scope._rotation - 180) * 3.141592653589793 / 180]) * scope.backUpSpeed / scope.STEPS;
      scope._X = scope.x;
      scope._Y = scope.y;
    }
  }
}).bind(scope);
scope.spawnRubbleSkidMarks = (function spawnRubbleSkidMarks(moveSize) {
  const Math = env.visualMath, random = env.visualRandom;
  var _loc3_ = 0;
  var _loc5_;
  while (_loc3_ < 1) {
    scope.s = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "createEmptyMovieClip", ["skidmarksmoke" + this + "-" + _loc3_ + "-" + avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", []), avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
    avmCall(this, "swapDepths", [scope.s]);
    avmCall(scope.s, "lineStyle", [avmCall(Math, "random", []) * 2 + 1, 5066061, 100]);
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    _loc5_ = moveSize == 0 ? (avmCall(Math, "random", []) <= 0.5 ? 0.5 : -0.5) * (avmGet(_root, "SCALE") / 50) : -moveSize;
    scope.s.xspeed = _loc5_ * avmCall(Math, "cos", [(scope._rotation - 90) * 3.141592653589793 / 180]) * 5 + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.yspeed = _loc5_ * avmCall(Math, "sin", [(scope._rotation - 90) * 3.141592653589793 / 180]) * 5 + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.x = scope._X + avmGet(scope.s, "xspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50) - avmGet(scope.s, "yspeed") * (avmCall(Math, "random", []) - 0.5) * 4;
    scope.s.y = scope._Y + avmGet(scope.s, "yspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50) + avmGet(scope.s, "xspeed") * (avmCall(Math, "random", []) - 0.5) * 4;
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      if (avmGet(this, "xspeed") < 0.5 && avmGet(this, "yspeed") < 0.5) {
        this._alpha -= 15 - avmCall(Math, "random", []) * 10;
      }
      this.xspeed *= 0.85;
      this.yspeed *= 0.85;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      var _loc3_ = {
        x: avmGet(this, "x"),
        y: avmGet(this, "y")
      };
      avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "localToGlobal", [_loc3_]);
      if (avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "hitTest", [avmGet(_loc3_, "x"), avmGet(_loc3_, "y"), true])) {
        this.xspeed = 0;
        this.yspeed = 0;
      }
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc3_ = _loc3_ + 1;
  }
}).bind(scope);
scope.spawnSmokeSkidMarks = (function spawnSmokeSkidMarks(moveSize) {
  const Math = env.visualMath, random = env.visualRandom;
  var _loc3_ = 0;
  var _loc4_;
  while (_loc3_ < 2) {
    scope.s = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "createEmptyMovieClip", ["skidmarksmoke" + this + "-" + _loc3_ + "-" + avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", []), avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
    avmCall(this, "swapDepths", [scope.s]);
    avmCall(scope.s, "lineStyle", [10 * (avmGet(_root, "SCALE") / 50), 11184810, 40 + random(20)]);
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    _loc4_ = moveSize == 0 ? (avmCall(Math, "random", []) <= 0.5 ? 0.5 : -0.5) * (avmGet(_root, "SCALE") / 50) : -moveSize;
    scope.s.xspeed = _loc4_ * avmCall(Math, "cos", [(scope._rotation - 90) * 3.141592653589793 / 180]) * 3 + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.yspeed = _loc4_ * avmCall(Math, "sin", [(scope._rotation - 90) * 3.141592653589793 / 180]) * 3 + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.x = scope._X + avmGet(scope.s, "xspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.y = scope._Y + avmGet(scope.s, "yspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 2;
      this._yscale += 2;
      this._alpha -= 4 - avmCall(Math, "random", []) * 2;
      this.xspeed *= 0.85;
      this.yspeed *= 0.85;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc3_ = _loc3_ + 1;
  }
}).bind(scope);
scope.forwardSpeed = 4 * (avmGet(_root, "SCALE") / 50);
scope.backUpSpeed = 2.5 * (avmGet(_root, "SCALE") / 50);
scope.turnSpeed = 10;
scope.triggerReleased = true;
scope.bulletsFired = 0;
scope.laserReady = true;
scope.fragFired = false;
scope.alive = true;
scope.gatlingReady = true;
scope.homingReady = true;
scope.minesLayed = 0;
scope.deathRayReady = true;
scope.remoteControlling = false;
scope.electricReady = true;
scope.elToroReady = true;
scope.x = scope._X;
scope.y = scope._Y;
scope.hitPointsFront = new Array();
scope.hitPointsFront[0] = {
  x: -avmGet(scope.base, "_width") / 2,
  y: -avmGet(scope.base, "_height") / 2
};
scope.hitPointsFront[1] = {
  x: -avmGet(scope.base, "_width") / 4,
  y: -avmGet(scope.base, "_height") / 2
};
scope.hitPointsFront[2] = {
  x: avmGet(scope.base, "_width") / 4,
  y: -avmGet(scope.base, "_height") / 2
};
scope.hitPointsFront[3] = {
  x: avmGet(scope.base, "_width") / 2,
  y: -avmGet(scope.base, "_height") / 2
};
scope.hitPointsFront[4] = {
  x: -avmGet(scope.turret, "_width") / 6,
  y: -avmGet(scope.turret, "_height") / 16 * 11
};
scope.hitPointsFront[5] = {
  x: avmGet(scope.turret, "_width") / 6,
  y: -avmGet(scope.turret, "_height") / 16 * 11
};
scope.hitPointsRear = new Array();
scope.hitPointsRear[0] = {
  x: -avmGet(scope.base, "_width") / 2,
  y: avmGet(scope.base, "_height") / 2
};
scope.hitPointsRear[1] = {
  x: -avmGet(scope.base, "_width") / 4,
  y: avmGet(scope.base, "_height") / 2
};
scope.hitPointsRear[2] = {
  x: 0,
  y: avmGet(scope.base, "_height") / 2
};
scope.hitPointsRear[3] = {
  x: avmGet(scope.base, "_width") / 4,
  y: avmGet(scope.base, "_height") / 2
};
scope.hitPointsRear[4] = {
  x: avmGet(scope.base, "_width") / 2,
  y: avmGet(scope.base, "_height") / 2
};
scope.hitPointsRight = new Array();
scope.hitPointsRight[0] = {
  x: avmGet(scope.base, "_width") / 2,
  y: -avmGet(scope.base, "_height") / 6 * 2
};
scope.hitPointsRight[1] = {
  x: avmGet(scope.base, "_width") / 2,
  y: -avmGet(scope.base, "_height") / 6
};
scope.hitPointsRight[2] = {
  x: avmGet(scope.base, "_width") / 2,
  y: 0
};
scope.hitPointsRight[3] = {
  x: avmGet(scope.base, "_width") / 2,
  y: avmGet(scope.base, "_height") / 6
};
scope.hitPointsRight[4] = {
  x: avmGet(scope.base, "_width") / 2,
  y: avmGet(scope.base, "_height") / 6 * 2
};
scope.hitPointsLeft = new Array();
scope.hitPointsLeft[0] = {
  x: -avmGet(scope.base, "_width") / 2,
  y: -avmGet(scope.base, "_height") / 6 * 2
};
scope.hitPointsLeft[1] = {
  x: -avmGet(scope.base, "_width") / 2,
  y: -avmGet(scope.base, "_height") / 6
};
scope.hitPointsLeft[2] = {
  x: -avmGet(scope.base, "_width") / 2,
  y: 0
};
scope.hitPointsLeft[3] = {
  x: -avmGet(scope.base, "_width") / 2,
  y: avmGet(scope.base, "_height") / 6
};
scope.hitPointsLeft[4] = {
  x: -avmGet(scope.base, "_width") / 2,
  y: avmGet(scope.base, "_height") / 6 * 2
};
if (scope.mouseTank) {
  this.onMouseDown = function () {
    if (!avmCall(avmGet(_root, "sound"), "hitTest", [avmGet(_root, "_xmouse"), avmGet(_root, "_ymouse"), false]) && !avmCall(avmGet(_root, "settings"), "hitTest", [avmGet(_root, "_xmouse"), avmGet(_root, "_ymouse"), false])) {
      scope.fire = true;
    }
  };
  this.onMouseUp = function () {
    scope.fire = false;
  };
}
scope.onEnterFrame = function () {
  var _loc8_ = new Color(avmGet(avmGet(this, "turret"), "background"));
  avmCall(_loc8_, "setRGB", [avmGet(this, "turretColor")]);
  var _loc11_ = new Color(avmGet(avmGet(this, "base"), "background"));
  avmCall(_loc11_, "setRGB", [avmGet(this, "baseColor")]);
  avmCall(avmGet(avmGet(this, "scoreboard"), "tankIcon"), "setTurretColor", [avmGet(this, "turretColor")]);
  avmCall(avmGet(avmGet(this, "scoreboard"), "tankIcon"), "setTracksColor", [avmGet(this, "baseColor")]);
  var _loc6_;
  if (scope.mouseTank) {
    _loc6_ = {
      x: avmGet(_root, "xMouse"),
      y: avmGet(_root, "yMouse")
    };
    avmCall(avmGet(avmGet(_root, "game"), "mazemc"), "globalToLocal", [_loc6_]);
    scope.deltaX = avmGet(_loc6_, "x") - scope._X;
    scope.deltaY = avmGet(_loc6_, "y") - scope._Y;
    scope.deltaLength = avmCall(Math, "sqrt", [avmCall(Math, "pow", [scope.deltaX, 2]) + avmCall(Math, "pow", [scope.deltaY, 2])]);
    avmGet(_root, "scopeCross")._x = avmGet(_root, "xMouse");
    avmGet(_root, "scopeCross")._y = avmGet(_root, "yMouse");
    if (scope.deltaLength > 60 && scope.alive) {
      avmGet(_root, "scopeCircle")._x = avmGet(avmGet(_root, "game"), "_x") + scope._X + scope.deltaX / scope.deltaLength * 60;
      avmGet(_root, "scopeCircle")._y = avmGet(avmGet(_root, "game"), "_y") + scope._Y + scope.deltaY / scope.deltaLength * 60;
    } else {
      avmGet(_root, "scopeCircle")._x = avmGet(_root, "xMouse");
      avmGet(_root, "scopeCircle")._y = avmGet(_root, "yMouse");
    }
    if (avmGet(_root, "settingsUseNewMouseControl")) {
      if (scope.deltaLength > 120 && scope.alive) {
        avmCall(avmGet(_root, "scopeCircle"), "gotoAndStop", [2]);
      } else {
        avmCall(avmGet(_root, "scopeCircle"), "gotoAndStop", [1]);
      }
    }
  }
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  var _loc4_;
  var _loc3_;
  var _loc5_;
  var _loc7_;
  if (scope.alive && !avmCall(_root, "lockedControl", [this, scope.currentWeapon])) {
    scope.oldX = scope.x;
    scope.oldY = scope.y;
    scope.oldRot = scope._rotation;
    if (scope.mouseTank) {
      if (avmGet(_root, "settingsUseNewMouseControl")) {
        _loc4_ = scope._rotation;
        _loc5_ = false;
        _loc7_ = scope.deltaLength < 120;
        if (scope.deltaX != 0) {
          if (scope.deltaX > 0) {
            _loc3_ = 90 + avmCall(Math, "atan", [scope.deltaY / scope.deltaX]) * 180 / 3.141592653589793;
          } else {
            _loc3_ = -90 + avmCall(Math, "atan", [scope.deltaY / scope.deltaX]) * 180 / 3.141592653589793;
          }
        } else if (scope.deltaY > 0) {
          _loc3_ = 180;
        } else if (scope.deltaY < 0) {
          _loc3_ = 0;
        } else {
          _loc3_ = _loc4_;
        }
        _loc3_ = avmCall(Math, "round", [_loc3_ / scope.turnSpeed]) * scope.turnSpeed;
        if (_loc7_ && avmCall(Math, "abs", [_loc3_ - _loc4_]) > 90 && avmCall(Math, "abs", [_loc3_ - _loc4_]) < 270) {
          _loc5_ = true;
          _loc3_ += 180;
          if (_loc3_ > 180) {
            _loc3_ -= 360;
          }
        }
        if (_loc3_ == 180 && _loc4_ < 0 || _loc3_ == -180 && _loc4_ > 0) {
          _loc3_ *= -1;
        }
        if (_loc3_ > _loc4_ + (scope.turnSpeed - 1)) {
          if (avmCall(Math, "abs", [_loc3_ - _loc4_]) > 180) {
            scope.turnLeft = true;
            scope.turnRight = false;
          } else {
            scope.turnLeft = false;
            scope.turnRight = true;
          }
        } else if (_loc3_ < _loc4_ - (scope.turnSpeed - 1)) {
          if (avmCall(Math, "abs", [_loc3_ - _loc4_]) > 180) {
            scope.turnLeft = false;
            scope.turnRight = true;
          } else {
            scope.turnLeft = true;
            scope.turnRight = false;
          }
        } else {
          scope.turnLeft = false;
          scope.turnRight = false;
        }
      } else {
        if (scope.deltaX < 0) {
          if (scope.deltaY < 0) {
            scope.aimAngle = -3.141592653589793 + avmCall(Math, "atan", [scope.deltaY / scope.deltaX]);
          } else {
            scope.aimAngle = 3.141592653589793 + avmCall(Math, "atan", [scope.deltaY / scope.deltaX]);
          }
        } else if (scope.deltaX > 0) {
          scope.aimAngle = avmCall(Math, "atan", [scope.deltaY / scope.deltaX]);
        } else if (scope.deltaY < 0) {
          scope.aimAngle = -1.5707963267948966;
        } else {
          scope.aimAngle = 1.5707963267948966;
        }
        scope._rotation = (scope.aimAngle + 1.5707963267948966) * 180 / 3.141592653589793;
      }
      if (avmGet(_root, "settingsUseNewMouseControl")) {
        if (scope.deltaLength > 60 && (avmCall(Math, "abs", [_loc3_ - _loc4_]) < 45 || avmCall(Math, "abs", [_loc3_ - _loc4_]) > 315)) {
          scope.forward = !_loc5_;
          scope.backup = _loc5_;
        } else {
          scope.forward = false;
          scope.backup = false;
        }
      } else if (scope.deltaLength > 60) {
        scope.forward = true;
        scope.backup = false;
      } else {
        scope.forward = false;
        scope.backup = false;
      }
    } else {
      if (avmCall(Key, "isDown", [scope.KEYTURNLEFT])) {
        scope.turnLeft = true;
      } else {
        scope.turnLeft = false;
      }
      if (avmCall(Key, "isDown", [scope.KEYFORWARD])) {
        scope.forward = true;
      } else {
        scope.forward = false;
      }
      if (avmCall(Key, "isDown", [scope.KEYTURNRIGHT])) {
        scope.turnRight = true;
      } else {
        scope.turnRight = false;
      }
      if (avmCall(Key, "isDown", [scope.KEYBACKUP])) {
        scope.backup = true;
      } else {
        scope.backup = false;
      }
      if (avmCall(Key, "isDown", [scope.KEYFIRE])) {
        scope.fire = true;
      } else {
        scope.fire = false;
      }
    }
    if (scope.AI != undefined) {
      if (avmCall(scope.AI, "makeDecisionsAndUpdateGoal", [])) {
        avmCall(scope.AI, "decideActionsToAchieveGoal", []);
      }
      avmCall(scope.AI, "setInputToDoActions", []);
    }
    if (avmGet(_root, "MYTANK") != undefined && this != avmGet(_root, "MYTANK")) {
      scope.turnLeft = avmGet(avmGet(avmGet(_root, "PLAYERS"), scope.username), "turnLeft");
      scope.forward = avmGet(avmGet(avmGet(_root, "PLAYERS"), scope.username), "forward");
      scope.turnRight = avmGet(avmGet(avmGet(_root, "PLAYERS"), scope.username), "turnRight");
      scope.backup = avmGet(avmGet(avmGet(_root, "PLAYERS"), scope.username), "backup");
      scope.fire = avmGet(avmGet(avmGet(_root, "PLAYERS"), scope.username), "fire");
    }
    avmCall(scope, "attemptToMove", [scope.forward, scope.backup, scope.turnLeft, scope.turnRight]);
    if (scope.fire && scope.triggerReleased && avmCall(_root, "weaponReady", [this, scope.currentWeapon])) {
      scope.triggerReleased = false;
      avmCall(_root, "fireWeapon", [this, scope.currentWeapon]);
    } else if (!scope.fire) {
      scope.triggerReleased = true;
    }
  }
  if (scope.equipment != undefined) {
    if (scope.currentEquipment == "shield") {
      if (avmCall(scope.equipment, "getDepth", []) < avmCall(scope, "getDepth", [])) {
        avmCall(scope.equipment, "swapDepths", [avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
      }
      scope.equipment._x = scope._X;
      scope.equipment._y = scope._Y;
    }
  }
};
}
export function install_aimer(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.linePoints = new Array();
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  if (!avmGet(scope.owner, "alive")) {
    avmCall(this, "removeMovieClip", []);
  }
  avmCall(scope, "clear", []);
  avmCall(scope, "lineStyle", [1 * (avmGet(_root, "SCALE") / 50), scope.aimerColor, 100]);
  avmCall(scope, "moveTo", [0, 0]);
  scope._X = avmGet(scope.owner, "_x") + avmCall(Math, "cos", [(avmGet(scope.owner, "_rotation") - 90) * 3.141593 / 180]) * avmGet(_root, "SCALE") * 4.5 / 16;
  scope._Y = avmGet(scope.owner, "_y") + avmCall(Math, "sin", [(avmGet(scope.owner, "_rotation") - 90) * 3.141593 / 180]) * avmGet(_root, "SCALE") * 4.5 / 16;
  scope.x = 0;
  scope.y = 0;
  scope.active = avmGet(_root, "AIMERACTIVE");
  scope.xSpeed = avmCall(Math, "cos", [(avmGet(scope.owner, "_rotation") - 90) * 3.141593 / 180]) * avmGet(_root, "AIMERLENGTH") / avmGet(_root, "AIMERHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
  scope.ySpeed = avmCall(Math, "sin", [(avmGet(scope.owner, "_rotation") - 90) * 3.141593 / 180]) * avmGet(_root, "AIMERLENGTH") / avmGet(_root, "AIMERHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
  scope.hit = undefined;
  scope.hitXSpeed = 0;
  scope.hitYSpeed = 0;
  scope.j = 0;
  var _loc3_;
  while (scope.j < avmGet(_root, "AIMERHITCHECKINTERVALS")) {
    scope.previousX = scope.x;
    scope.previousY = scope.y;
    scope.x += scope.xSpeed;
    scope.y += scope.ySpeed;
    if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
      x: scope.x,
      y: scope.y
    }])) {
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x -= scope.xSpeed;
      scope.y += scope.ySpeed;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: scope.x,
        y: scope.y
      }])) {
        scope.hitOnXInvert = true;
      } else {
        scope.hitOnXInvert = false;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y -= scope.ySpeed;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: scope.x,
        y: scope.y
      }])) {
        scope.hitOnYInvert = true;
      } else {
        scope.hitOnYInvert = false;
      }
      if (scope.hitOnXInvert && !scope.hitOnYInvert) {
        scope.ySpeed = -scope.ySpeed;
      } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
        scope.xSpeed = -scope.xSpeed;
      } else {
        scope.xSpeed = -scope.xSpeed;
        scope.ySpeed = -scope.ySpeed;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
    }
    if (scope.active > 0) {
      scope.active--;
    }
    if (scope.active == 0 && scope.j % 2 == 0) {
      _loc3_ = 0;
      while (_loc3_ < avmGet(_root, "TANKS")) {
        if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + _loc3_), {
          x: scope.x,
          y: scope.y
        }])) {
          scope.hit = avmGet(avmGet(_root, "game"), "tank" + _loc3_);
          scope.hitXSpeed = scope.xSpeed;
          scope.hitYSpeed = scope.ySpeed;
          scope.j = avmGet(_root, "AIMERHITCHECKINTERVALS");
        }
        _loc3_ = _loc3_ + 1;
      }
    }
    if (avmCall(Math, "random", []) > 0.7) {
      avmCall(scope, "lineStyle", [3 * (avmGet(_root, "SCALE") / 50), 0, 30]);
      avmCall(scope, "lineTo", [scope.x, scope.y]);
      avmCall(scope, "lineStyle", [2 * (avmGet(_root, "SCALE") / 50), scope.aimerColor, 100]);
      avmCall(scope, "moveTo", [scope.previousX, scope.previousY]);
      avmCall(scope, "lineTo", [scope.x, scope.y]);
    } else {
      avmCall(scope, "moveTo", [scope.x, scope.y]);
    }
    scope.j++;
  }
};
}
export function install_elToro(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.trail = (function trail(angle) {
  var _loc6_ = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
  scope.s = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["elToroTrail-" + _loc6_, avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
  avmCall(scope.owner, "swapDepths", [scope.s]);
  avmCall(scope.s, "beginFill", [scope.myColor, 100]);
  var _loc4_ = {
    x: avmGet(scope.elToroPositionA, "x") - avmCall(Math, "cos", [angle]) * avmGet(_root, "SCALE") * 5.5 / 16,
    y: avmGet(scope.elToroPositionA, "y") - avmCall(Math, "sin", [angle]) * avmGet(_root, "SCALE") * 5.5 / 16
  };
  var _loc3_ = {
    x: avmGet(scope.elToroPositionB, "x") - avmCall(Math, "cos", [angle]) * avmGet(_root, "SCALE") * 5.5 / 16,
    y: avmGet(scope.elToroPositionB, "y") - avmCall(Math, "sin", [angle]) * avmGet(_root, "SCALE") * 5.5 / 16
  };
  avmCall(scope.s, "moveTo", [avmGet(scope.oldTrailPosA, "x"), avmGet(scope.oldTrailPosA, "y")]);
  avmCall(scope.s, "lineTo", [avmGet(_loc4_, "x"), avmGet(_loc4_, "y")]);
  avmCall(scope.s, "lineTo", [avmGet(_loc3_, "x"), avmGet(_loc3_, "y")]);
  avmCall(scope.s, "lineTo", [avmGet(scope.oldTrailPosB, "x"), avmGet(scope.oldTrailPosB, "y")]);
  avmCall(scope.s, "lineTo", [avmGet(scope.oldTrailPosA, "x"), avmGet(scope.oldTrailPosA, "y")]);
  avmCall(scope.s, "endFill", []);
  scope.oldTrailPosA = _loc4_;
  scope.oldTrailPosB = _loc3_;
  scope.s._alpha = 80;
  scope.s.onEnterFrame = function () {
    if (avmGet(_root, "frozen")) {
      return undefined;
    }
    this._alpha -= 20;
    if (avmGet(this, "_alpha") <= 0) {
      avmCall(this, "removeMovieClip", []);
    }
  };
}).bind(scope);
scope.snort = (function snort(angle) {
  var _loc6_ = 0;
  var _loc4_;
  var _loc7_;
  var _loc5_;
  while (_loc6_ < avmGet(_root, "ELTORONUMBEROFSNORTS")) {
    _loc4_ = avmCall(Math, "random", []) > 0.5;
    _loc7_ = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
    scope.s = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["elToroSnort-" + _loc7_, avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    avmCall(scope.owner, "swapDepths", [scope.s]);
    avmCall(scope.s, "lineStyle", [4 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4) + 6]) * 1118481, 20]);
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    if (_loc4_) {
      scope.s.xspeed = (avmCall(Math, "sin", [angle + 0.9]) * 5 + 2 * (avmCall(Math, "random", []) - 0.5)) * (avmGet(_root, "SCALE") / 50);
      scope.s.yspeed = (-avmCall(Math, "cos", [angle + 0.9]) * 5 + 2 * (avmCall(Math, "random", []) - 0.5)) * (avmGet(_root, "SCALE") / 50);
    } else {
      scope.s.xspeed = (-avmCall(Math, "sin", [angle - 0.9]) * 5 + 2 * (avmCall(Math, "random", []) - 0.5)) * (avmGet(_root, "SCALE") / 50);
      scope.s.yspeed = (avmCall(Math, "cos", [angle - 0.9]) * 5 + 2 * (avmCall(Math, "random", []) - 0.5)) * (avmGet(_root, "SCALE") / 50);
    }
    _loc5_ = avmCall(Math, "sqrt", [scope.xSpeed * scope.xSpeed + scope.ySpeed * scope.ySpeed]);
    if (isNaN(_loc5_)) {
      _loc5_ = 1;
    }
    if (_loc4_) {
      scope.s.x = avmGet(scope.elToroPosition, "x") + (-avmCall(Math, "cos", [angle]) + avmCall(Math, "sin", [angle])) * avmGet(_root, "SCALE") * 1 / 16;
      scope.s.y = avmGet(scope.elToroPosition, "y") + (-avmCall(Math, "sin", [angle]) - avmCall(Math, "cos", [angle])) * avmGet(_root, "SCALE") * 1 / 16;
    } else {
      scope.s.x = avmGet(scope.elToroPosition, "x") + (-avmCall(Math, "cos", [angle]) - avmCall(Math, "sin", [angle])) * avmGet(_root, "SCALE") * 1 / 16;
      scope.s.y = avmGet(scope.elToroPosition, "y") + (-avmCall(Math, "sin", [angle]) + avmCall(Math, "cos", [angle])) * avmGet(_root, "SCALE") * 1 / 16;
    }
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 5;
      this._yscale += 5;
      this._alpha -= 10 - avmCall(Math, "random", []) * 10;
      this.xspeed *= 0.85;
      this.yspeed *= 0.85;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc6_ = _loc6_ + 1;
  }
}).bind(scope);
scope.impact = (function impact(x, y, speedX, speedY) {
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundBounce" + random(2)), "start", []);
  }
  scope.hitCount++;
  var _loc3_ = 0;
  var _loc4_;
  var _loc5_;
  while (_loc3_ < 10) {
    scope.p = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["particle-" + avmCall(avmGet(_root, "game"), "getNextHighestDepth", []), avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    _loc4_ = avmCall(Math, "random", []) * 360;
    _loc5_ = (0.5 + avmCall(Math, "random", [])) * (avmGet(_root, "SCALE") / 50);
    avmCall(scope.p, "lineStyle", [avmCall(Math, "random", []) * 2 * (avmGet(_root, "SCALE") / 50), scope.myColor]);
    avmCall(scope.p, "moveTo", [0, 0]);
    avmCall(scope.p, "lineTo", [1, 0]);
    scope.p.xspeed = avmCall(Math, "cos", [_loc4_]) * _loc5_ + 2 * speedX;
    scope.p.yspeed = avmCall(Math, "sin", [_loc4_]) * _loc5_ + 2 * speedY;
    scope.p.x = x + avmGet(scope.p, "xspeed");
    scope.p.y = y + avmGet(scope.p, "yspeed");
    scope.p._x = avmGet(scope.p, "x");
    scope.p._y = avmGet(scope.p, "y");
    scope.p.lifetime = 12;
    scope.p.alpha = 100;
    scope.p.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      this._alpha = avmGet(this, "alpha");
      this.xspeed *= 0.95;
      this.yspeed *= 0.95;
      this.lifetime = avmGet(this, "lifetime") - 1;
      if (avmGet(this, "lifetime") <= 0) {
        this.alpha -= 5;
      }
      if (avmGet(this, "alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc3_ = _loc3_ + 1;
  }
}).bind(scope);
scope.repulseBullet = (function repulseBullet(bullet) {
  var _loc7_ = avmCall(_root, "squaredDistanceToLine", [scope.elToroPositionA, scope.elToroPositionB, bullet]);
  var _loc5_;
  var _loc8_;
  var _loc3_;
  var _loc6_;
  var _loc4_;
  if (_loc7_ < avmGet(_root, "ELTOROSIZE") * avmGet(_root, "ELTOROSIZE")) {
    _loc5_ = {
      x: avmGet(scope.elToroPosition, "x") - avmGet(bullet, "x"),
      y: avmGet(scope.elToroPosition, "y") - avmGet(bullet, "y")
    };
    _loc8_ = avmGet(_loc5_, "x") * avmGet(bullet, "xSpeed") + avmGet(_loc5_, "y") * avmGet(bullet, "ySpeed");
    if (_loc8_ > 0) {
      bullet.xSpeed = -avmGet(bullet, "xSpeed");
      bullet.ySpeed = -avmGet(bullet, "ySpeed");
      _loc3_ = {
        x: avmCall(Math, "sin", [(avmGet(scope.owner, "_rotation") - 90) * 3.141593 / 180]),
        y: -avmCall(Math, "cos", [(avmGet(scope.owner, "_rotation") - 90) * 3.141593 / 180])
      };
      _loc6_ = avmGet(_loc3_, "x") * avmGet(_loc3_, "x") + avmGet(_loc3_, "y") * avmGet(_loc3_, "y");
      _loc4_ = (avmGet(bullet, "xSpeed") * avmGet(_loc3_, "x") + avmGet(bullet, "ySpeed") * avmGet(_loc3_, "y")) / _loc6_;
      bullet.xSpeed -= 2 * avmGet(_loc3_, "x") * _loc4_;
      bullet.ySpeed -= 2 * avmGet(_loc3_, "y") * _loc4_;
      avmCall(scope, "impact", [avmGet(scope.elToroPosition, "x"), avmGet(scope.elToroPosition, "y"), avmGet(bullet, "xSpeed"), avmGet(bullet, "ySpeed")]);
    }
  }
}).bind(scope);
scope.elToroPosition = undefined;
scope.elToroPositionA = undefined;
scope.elToroPositionB = undefined;
scope.hitCount = 0;
scope.oldForwardSpeed = avmGet(scope.owner, "forwardSpeed");
scope.oldTrailPosA = undefined;
scope.oldTrailPosB = undefined;
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  if (!avmGet(scope.owner, "alive")) {
    scope.owner.equipment = undefined;
    scope.owner.currentEquipment = "";
    avmCall(this, "removeMovieClip", []);
  }
  if (scope.hitCount >= 5) {
    scope.owner.equipment = undefined;
    scope.owner.currentEquipment = "";
    scope.owner.elToroReady = true;
    scope.owner.forwardSpeed = scope.oldForwardSpeed;
    avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
    avmCall(this, "removeMovieClip", []);
  }
  var _loc3_ = (avmGet(scope.owner, "_rotation") - 90) * 3.141593 / 180;
  scope.elToroPosition = {
    x: avmGet(scope.owner, "_x") + avmCall(Math, "cos", [_loc3_]) * avmGet(_root, "SCALE") * 4.5 / 16,
    y: avmGet(scope.owner, "_y") + avmCall(Math, "sin", [_loc3_]) * avmGet(_root, "SCALE") * 4.5 / 16
  };
  scope.elToroPositionA = {
    x: avmGet(scope.elToroPosition, "x") + avmCall(Math, "sin", [_loc3_]) * avmGet(_root, "SCALE") * 3 / 16,
    y: avmGet(scope.elToroPosition, "y") - avmCall(Math, "cos", [_loc3_]) * avmGet(_root, "SCALE") * 3 / 16
  };
  scope.elToroPositionB = {
    x: avmGet(scope.elToroPosition, "x") - avmCall(Math, "sin", [_loc3_]) * avmGet(_root, "SCALE") * 3 / 16,
    y: avmGet(scope.elToroPosition, "y") + avmCall(Math, "cos", [_loc3_]) * avmGet(_root, "SCALE") * 3 / 16
  };
  if (scope.charging) {
    if (scope.chargeCounter > 0) {
      scope.chargeCounter--;
    }
    if (scope.chargeCounter > avmGet(_root, "ELTOROCHARGETIME") - avmGet(_root, "ELTOROSNORTTIME")) {
      avmCall(scope, "snort", [_loc3_]);
    }
    if (scope.chargeCounter == 0) {
      scope.charging = false;
      scope.running = true;
      scope.owner.forwardSpeed = 8 * (avmGet(_root, "SCALE") / 50);
      scope.oldTrailPosA = {
        x: avmGet(scope.elToroPositionA, "x") - avmCall(Math, "cos", [_loc3_]) * avmGet(_root, "SCALE") * 5.5 / 16,
        y: avmGet(scope.elToroPositionA, "y") - avmCall(Math, "sin", [_loc3_]) * avmGet(_root, "SCALE") * 5.5 / 16
      };
      scope.oldTrailPosB = {
        x: avmGet(scope.elToroPositionB, "x") - avmCall(Math, "cos", [_loc3_]) * avmGet(_root, "SCALE") * 5.5 / 16,
        y: avmGet(scope.elToroPositionB, "y") - avmCall(Math, "sin", [_loc3_]) * avmGet(_root, "SCALE") * 5.5 / 16
      };
    }
  }
  if (scope.running) {
    if (!avmCall(scope.owner, "attemptToMove", [true, false, false, false])) {
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundExplosion3"), "start", []);
      }
      scope.runCounter = 1;
      _root.shake = avmCall(Math, "max", [avmGet(_root, "MAXSHAKE"), avmGet(_root, "shake") + 7]);
    }
    avmCall(scope, "trail", [_loc3_]);
    if (scope.runCounter > 0) {
      scope.runCounter--;
    }
    if (scope.runCounter == 0) {
      scope.owner.equipment = undefined;
      scope.owner.currentEquipment = "";
      scope.owner.elToroReady = true;
      scope.owner.forwardSpeed = scope.oldForwardSpeed;
      avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
      avmCall(this, "removeMovieClip", []);
    }
  }
};
}
export function install_bullet(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  i = 0;
  var _loc3_;
  while (i < avmGet(_root, "BULLETHITCHECKINTERVALS")) {
    scope.previousX = scope.x;
    scope.previousY = scope.y;
    scope.x += scope.xSpeed;
    scope.y += scope.ySpeed;
    scope._X = scope.x;
    scope._Y = scope.y;
    if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
      x: 0,
      y: 0
    }])) {
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundBounce" + random(2)), "start", []);
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x -= scope.xSpeed;
      scope.y += scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnXInvert = true;
      } else {
        scope.hitOnXInvert = false;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y -= scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnYInvert = true;
      } else {
        scope.hitOnYInvert = false;
      }
      if (scope.hitOnXInvert && !scope.hitOnYInvert) {
        scope.ySpeed = -scope.ySpeed;
      } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
        scope.xSpeed = -scope.xSpeed;
      } else {
        scope.xSpeed = -scope.xSpeed;
        scope.ySpeed = -scope.ySpeed;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
    }
    _loc3_ = 0;
    while (_loc3_ < avmGet(_root, "TANKS")) {
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "currentEquipment") == "shield") {
        avmCall(avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "equipment"), "repulseBullet", [this]);
      } else if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "currentEquipment") == "elToro") {
        avmCall(avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "equipment"), "repulseBullet", [this]);
      }
      _loc3_ = _loc3_ + 1;
    }
    i++;
  }
  scope._X = scope.x;
  scope._Y = scope.y;
  if (scope.deadly == 0 && (avmGet(_root, "MASTER") == undefined || avmGet(_root, "MASTER"))) {
    var i = 0;
    while (i < avmGet(_root, "TANKS")) {
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + i), {
        x: 0,
        y: 0
      }])) {
        avmCall(_root, "registerHit", [scope.owner, avmGet(avmGet(_root, "game"), "tank" + i)]);
        scope.owner.bulletsFired--;
        avmCall(_root, "destroyTank", [i]);
        if (avmGet(_root, "MASTER")) {
          avmCall(_root, "sendKillToSlaves", ["bullet", scope.id, avmGet(scope.owner, "username"), i]);
          avmCall(_root, "sendKillToServer", ["bullet", avmGet(scope.owner, "username"), avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "username")]);
        }
        avmCall(this, "removeMovieClip", []);
      }
      i++;
    }
  }
  if (scope.deadly > 0) {
    scope.deadly--;
  }
  scope.lifetime--;
  if (scope.lifetime <= 0) {
    scope.owner.bulletsFired--;
    if (avmGet(_root, "soundOn")) {
      avmCall(avmGet(_root, "soundPoof"), "start", []);
    }
    _loc3_ = 0;
    while (_loc3_ < avmGet(_root, "NUMBEROFSMOKECLOUDS") * 2) {
      scope.s = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["smokebullet" + avmCall(avmGet(_root, "game"), "getNextHighestDepth", []), avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
      avmCall(scope.s, "lineStyle", [5 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4)]) * 1118481, 10 + random(20)]);
      avmCall(scope.s, "moveTo", [0, 0]);
      avmCall(scope.s, "lineTo", [0, 1]);
      scope.s.xspeed = scope.xSpeed * avmGet(_root, "BULLETHITCHECKINTERVALS") + 0.5 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.yspeed = scope.ySpeed * avmGet(_root, "BULLETHITCHECKINTERVALS") + 0.5 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.x = scope._X;
      scope.s.y = scope._Y;
      scope.s._x = avmGet(scope.s, "x");
      scope.s._y = avmGet(scope.s, "y");
      scope.s.hitCheck = function (mc, point) {
        avmCall(this, "localToGlobal", [point]);
        if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
          return true;
        }
        return false;
      };
      scope.s.onEnterFrame = function () {
        if (avmGet(_root, "frozen")) {
          return undefined;
        }
        this._xscale += 2;
        this._yscale += 2;
        this._alpha -= 15 - avmCall(Math, "random", []) * 2;
        this.xspeed *= 0.93;
        this.yspeed *= 0.93;
        this.x += avmGet(this, "xspeed");
        this.y += avmGet(this, "yspeed");
        this._x = avmGet(this, "x");
        this._y = avmGet(this, "y");
        if (avmCall(this, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: 0,
          y: 0
        }])) {
          this.xspeed *= 0.25;
          this.yspeed *= 0.25;
        }
        if (avmGet(this, "_alpha") <= 0) {
          avmCall(this, "removeMovieClip", []);
        }
      };
      _loc3_ = _loc3_ + 1;
    }
    avmCall(this, "removeMovieClip", []);
  }
};
}
export function install_deathRay(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.hitCheck2 = (function hitCheck2(mc, point) {
  avmCall(mc, "localToGlobal", [point]);
  if (avmCall(this, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.targetClosestTank = (function targetClosestTank(s, d) {
  scope.circleCounter = 0;
  scope.straightLine = true;
  scope.targetPosition = undefined;
  var _loc13_ = 1.0e+33;
  var _loc9_ = 0;
  var _loc8_;
  var _loc5_;
  var _loc4_;
  var _loc11_;
  var _loc12_;
  var _loc7_;
  var _loc6_;
  while (_loc9_ < avmGet(_root, "TANKS")) {
    _loc8_ = avmGet(avmGet(_root, "game"), "tank" + _loc9_);
    if (_loc8_ != scope.owner) {
      if (avmGet(_loc8_, "alive")) {
        _loc5_ = new Object({
          x: avmGet(_loc8_, "x") - avmGet(this, "_x") - avmGet(s, "x"),
          y: avmGet(_loc8_, "y") - avmGet(this, "_y") - avmGet(s, "y")
        });
        _loc4_ = new Object({
          x: avmGet(d, "y"),
          y: -avmGet(d, "x")
        });
        if (avmGet(d, "x") * avmGet(_loc5_, "x") + avmGet(d, "y") * avmGet(_loc5_, "y") > 0) {
          _loc11_ = avmGet(_loc5_, "x") * avmGet(_loc5_, "x") + avmGet(_loc5_, "y") * avmGet(_loc5_, "y");
          if (_loc11_ <= _loc13_) {
            _loc13_ = _loc11_;
            scope.targetPosition = {
              x: avmGet(_loc8_, "x") - avmGet(this, "_x"),
              y: avmGet(_loc8_, "y") - avmGet(this, "_y")
            };
            scope.straightLine = avmCall(Math, "abs", [avmGet(_loc4_, "x") * avmGet(_loc5_, "x") + avmGet(_loc4_, "y") * avmGet(_loc5_, "y")]) <= 0.00001;
            if (!scope.straightLine) {
              _loc12_ = avmCall(Math, "sqrt", [avmGet(_loc4_, "x") * avmGet(_loc4_, "x") + avmGet(_loc4_, "y") * avmGet(_loc4_, "y")]);
              _loc4_.x /= _loc12_;
              _loc4_.y /= _loc12_;
              _loc7_ = (avmGet(_loc5_, "x") * avmGet(_loc5_, "x") + avmGet(_loc5_, "y") * avmGet(_loc5_, "y")) / (2 * avmGet(_loc4_, "x") * avmGet(_loc5_, "x") + 2 * avmGet(_loc4_, "y") * avmGet(_loc5_, "y"));
              if (_loc7_ > 0) {
                _loc7_ = avmCall(Math, "max", [650 * (avmGet(_root, "SCALE") / 50), _loc7_]);
                scope.leftSide = true;
              } else {
                _loc7_ = avmCall(Math, "min", [-650 * (avmGet(_root, "SCALE") / 50), _loc7_]);
                scope.leftSide = false;
              }
              _loc6_ = new Object({
                x: avmGet(s, "x") + avmGet(_loc4_, "x") * _loc7_,
                y: avmGet(s, "y") + avmGet(_loc4_, "y") * _loc7_
              });
              scope.targetCircleRadius = avmCall(Math, "sqrt", [(avmGet(_loc6_, "x") - avmGet(s, "x")) * (avmGet(_loc6_, "x") - avmGet(s, "x")) + (avmGet(_loc6_, "y") - avmGet(s, "y")) * (avmGet(_loc6_, "y") - avmGet(s, "y"))]);
              scope.targetCircleCenter = _loc6_;
              if (-(avmGet(_loc6_, "x") - avmGet(s, "x")) != 0) {
                if (-(avmGet(_loc6_, "x") - avmGet(s, "x")) > 0) {
                  scope.targetCircleStartAngle = 1.570796 + avmCall(Math, "atan", [-(avmGet(_loc6_, "y") - avmGet(s, "y")) / -(avmGet(_loc6_, "x") - avmGet(s, "x"))]);
                } else {
                  scope.targetCircleStartAngle = -1.570796 + avmCall(Math, "atan", [-(avmGet(_loc6_, "y") - avmGet(s, "y")) / -(avmGet(_loc6_, "x") - avmGet(s, "x"))]);
                }
              } else if (-(avmGet(_loc6_, "y") - avmGet(s, "y")) > 0) {
                scope.targetCircleStartAngle = 3.141593;
              } else if (-(avmGet(_loc6_, "y") - avmGet(s, "y")) < 0) {
                scope.targetCircleStartAngle = 0;
              }
              scope.targetCircleStartAngle -= 1.570796;
            }
          }
        }
      }
    }
    _loc9_ = _loc9_ + 1;
  }
}).bind(scope);
trace("-----");
scope.collisionPoints = new Array();
scope.rayThickness = 0;
scope.ballSize = 0;
scope.particleCounter = 0;
scope.ownerColor = avmGet(scope.owner, "turretColor");
scope.darkerOwnerColor = scope.ownerColor;
scope.colors = new Array(16777215, scope.ownerColor, 16777215, scope.ownerColor, 16777215, scope.ownerColor, 16777215, scope.ownerColor, 16777215, scope.ownerColor);
scope.alphas = new Array(100, 100, 100, 100, 100, 100, 100, 100, 100, 100);
scope.fractions = new Array(0, 25, 50, 75, 100, 125, 150, 175, 200, 225);
scope.nextColor = 16777215;
scope.lengthCounter = 0;
scope.curvePoints = new Array();
scope.circleCounter = 0;
scope.targetCircleCenter = undefined;
scope.targetCircleRadius = undefined;
scope.targetCircleStartAngle = undefined;
scope.targetPosition = undefined;
scope.straightLine = undefined;
scope.leftSide = undefined;
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    avmCall(avmGet(_root, "soundDeathRayCharge"), "stop", ["soundDeathRayCharge"]);
    avmCall(avmGet(_root, "soundDeathRayFire"), "stop", ["soundDeathRayFire"]);
    return undefined;
  }
  if (!avmGet(scope.owner, "alive")) {
    avmCall(avmGet(_root, "soundDeathRayCharge"), "stop", ["soundDeathRayCharge"]);
    avmCall(avmGet(_root, "soundDeathRayFire"), "stop", ["soundDeathRayFire"]);
    avmCall(this, "removeMovieClip", []);
  }
  if (scope.warmup > 0) {
    scope.ballSize += 0.75;
    scope.warmup--;
  }
  var _loc14_;
  var _loc15_;
  var _loc11_;
  var _loc13_;
  var _loc4_;
  var _loc8_;
  var _loc9_;
  if (scope.warmup == 0) {
    avmCall(avmGet(_root, "soundDeathRayCharge"), "stop", ["soundDeathRayCharge"]);
    if (avmGet(_root, "soundOn")) {
      avmCall(avmGet(_root, "soundDeathRayFire"), "start", []);
    }
    scope.x = 0;
    scope.y = 0;
    _loc14_ = new Object({
      x: scope.x,
      y: scope.y
    });
    _loc15_ = new Object({
      x: scope.xSpeed,
      y: scope.ySpeed
    });
    avmCall(scope, "targetClosestTank", [_loc14_, _loc15_]);
    _loc11_ = false;
    while (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazebg"), {
      x: scope.x,
      y: scope.y
    }])) {
      _loc13_ = new Object({
        x: avmGet(scope.targetPosition, "x") - scope.x,
        y: avmGet(scope.targetPosition, "y") - scope.y
      });
      _loc4_ = new Object();
      if (scope.straightLine) {
        _loc4_.x = scope.xSpeed;
        _loc4_.y = scope.ySpeed;
      } else {
        _loc8_ = avmCall(Math, "sqrt", [scope.xSpeed * scope.xSpeed + scope.ySpeed * scope.ySpeed]);
        _loc4_.x = avmCall(Math, "sin", [scope.targetCircleStartAngle + scope.circleCounter * (!scope.leftSide ? 1 : -1) * _loc8_ / scope.targetCircleRadius]) * _loc8_;
        _loc4_.y = -avmCall(Math, "cos", [scope.targetCircleStartAngle + scope.circleCounter * (!scope.leftSide ? 1 : -1) * _loc8_ / scope.targetCircleRadius]) * _loc8_;
        if (!scope.leftSide) {
          _loc4_.x = -avmGet(_loc4_, "x");
          _loc4_.y = -avmGet(_loc4_, "y");
        }
      }
      scope.xSpeed = avmGet(_loc4_, "x");
      scope.ySpeed = avmGet(_loc4_, "y");
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
      scope.lengthCounter++;
      scope.circleCounter++;
      avmCall(scope.curvePoints, "push", [{
        x: scope.x,
        y: scope.y
      }]);
      if (scope.targetPosition != undefined && avmGet(_loc4_, "x") * avmGet(_loc13_, "x") + avmGet(_loc4_, "y") * avmGet(_loc13_, "y") <= 0) {
        avmCall(scope, "targetClosestTank", [{
          x: scope.x,
          y: scope.y
        }, _loc4_]);
      }
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: scope.x,
        y: scope.y
      }])) {
        if (!_loc11_) {
          _loc9_ = {
            x: scope.x,
            y: scope.y
          };
          avmCall(scope, "localToGlobal", [_loc9_]);
          avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "globalToLocal", [_loc9_]);
          avmCall(scope.collisionPoints, "push", [_loc9_]);
          _loc11_ = true;
        }
      } else if (_loc11_) {
        _loc9_ = {
          x: scope.x,
          y: scope.y
        };
        avmCall(scope, "localToGlobal", [_loc9_]);
        avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "globalToLocal", [_loc9_]);
        avmCall(scope.collisionPoints, "push", [_loc9_]);
      }
      _loc11_ = false;
    }
    scope.x = avmGet(avmGet(scope.curvePoints, avmGet(scope.curvePoints, "length") - 1), "x");
    scope.y = avmGet(avmGet(scope.curvePoints, avmGet(scope.curvePoints, "length") - 1), "y");
    while (!avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazebg"), {
      x: scope.x + 3 * (avmGet(_root, "SCALE") / 50),
      y: scope.y
    }]) || !avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazebg"), {
      x: scope.x - 3 * (avmGet(_root, "SCALE") / 50),
      y: scope.y
    }]) || !avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazebg"), {
      x: scope.x,
      y: scope.y + 3 * (avmGet(_root, "SCALE") / 50)
    }]) || !avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazebg"), {
      x: scope.x,
      y: scope.y - 3 * (avmGet(_root, "SCALE") / 50)
    }])) {
      avmCall(scope.curvePoints, "pop", []);
      scope.x = avmGet(avmGet(scope.curvePoints, avmGet(scope.curvePoints, "length") - 1), "x");
      scope.y = avmGet(avmGet(scope.curvePoints, avmGet(scope.curvePoints, "length") - 1), "y");
      scope.lengthCounter--;
    }
    scope.active = true;
    scope.warmup--;
  }
  var _loc12_;
  var _loc7_;
  var _loc10_;
  var _loc5_;
  var _loc6_;
  var _loc3_;
  if (scope.active) {
    scope.ballSize = avmCall(Math, "max", [0, scope.ballSize - 5]);
    scope.rayThickness = avmCall(Math, "min", [5, scope.rayThickness + 1]);
    _loc12_ = 0;
    while (_loc12_ < avmGet(scope.collisionPoints, "length")) {
      _loc7_ = 0;
      while (_loc7_ < 1) {
        if (avmCall(Math, "random", []) <= 0.5) {
          scope.p = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "createEmptyMovieClip", ["particle" + scope.particleCounter + "-" + avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", []), avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
          avmCall(this, "swapDepths", [scope.p]);
          scope.particleCounter++;
          _loc10_ = avmCall(Math, "random", []) * 360;
          _loc8_ = (0.5 + 2 * avmCall(Math, "random", [])) * (avmGet(_root, "SCALE") / 50);
          scope.p.x = avmGet(avmGet(scope.collisionPoints, _loc12_), "x");
          scope.p.y = avmGet(avmGet(scope.collisionPoints, _loc12_), "y");
          scope.p._x = avmGet(scope.p, "x");
          scope.p._y = avmGet(scope.p, "y");
          avmCall(scope.p, "lineStyle", [(avmCall(Math, "random", []) + 1) * (avmGet(_root, "SCALE") / 50), avmCall(Math, "random", []) <= 0.7 ? scope.ownerColor : scope.darkerOwnerColor]);
          avmCall(scope.p, "moveTo", [0, 0]);
          _loc5_ = 0;
          _loc6_ = 0;
          _loc7_ = 0;
          while (_loc7_ < 8) {
            _loc5_ += avmCall(Math, "random", []) * 10 - 5;
            _loc6_ += avmCall(Math, "random", []) * 10 - 5;
            avmCall(scope.p, "lineTo", [_loc5_ * (avmGet(_root, "SCALE") / 50), _loc6_ * (avmGet(_root, "SCALE") / 50)]);
            _loc7_ = _loc7_ + 1;
          }
          scope.p.onEnterFrame = function () {
            if (avmGet(_root, "frozen")) {
              return undefined;
            }
            avmCall(this, "removeMovieClip", []);
          };
        }
        _loc7_ = _loc7_ + 1;
      }
      _loc12_ = _loc12_ + 1;
    }
    _loc12_ = 0;
    while (_loc12_ < avmGet(scope.collisionPoints, "length")) {
      if (avmCall(Math, "random", []) <= 0.5) {
        scope.p = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "createEmptyMovieClip", ["particle" + scope.particleCounter + "-" + avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", []), avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
        avmCall(this, "swapDepths", [scope.p]);
        scope.particleCounter++;
        _loc10_ = avmCall(Math, "random", []) * 360;
        _loc8_ = (0.5 + 2 * avmCall(Math, "random", [])) * (avmGet(_root, "SCALE") / 50);
        scope.p.x = avmGet(avmGet(scope.collisionPoints, _loc12_), "x");
        scope.p.y = avmGet(avmGet(scope.collisionPoints, _loc12_), "y");
        scope.p._x = avmGet(scope.p, "x");
        scope.p._y = avmGet(scope.p, "y");
        avmCall(scope.p, "lineStyle", [(avmCall(Math, "random", []) * 2 + 1) * (avmGet(_root, "SCALE") / 50), 5066061]);
        avmCall(scope.p, "moveTo", [0, 0]);
        avmCall(scope.p, "lineTo", [1, 0]);
        scope.p.xspeed = avmCall(Math, "cos", [_loc10_]) * _loc8_;
        scope.p.yspeed = avmCall(Math, "sin", [_loc10_]) * _loc8_;
        scope.p.lifetime = 12;
        scope.p.alpha = 100;
        scope.p.onEnterFrame = function () {
          if (avmGet(_root, "frozen")) {
            return undefined;
          }
          this.x += avmGet(this, "xspeed");
          this.y += avmGet(this, "yspeed");
          this._x = avmGet(this, "x");
          this._y = avmGet(this, "y");
          this._alpha = avmGet(this, "alpha");
          this.xspeed *= 0.95;
          this.yspeed *= 0.95;
          this.lifetime = avmGet(this, "lifetime") - 1;
          if (avmGet(this, "lifetime") <= 0) {
            this.alpha -= 25;
          }
          if (avmGet(this, "alpha") <= 0) {
            avmCall(this, "removeMovieClip", []);
          }
        };
      }
      _loc12_ = _loc12_ + 1;
    }
    _loc12_ = 0;
    while (_loc12_ < avmGet(_root, "TANKS")) {
      _loc3_ = avmGet(avmGet(_root, "game"), "tank" + _loc12_);
      if (_loc3_ != scope.owner) {
        if (avmGet(_loc3_, "alive")) {
          _loc7_ = 0;
          while (_loc7_ < avmGet(avmGet(_loc3_, "hitPointsFront"), "length")) {
            if (avmGet(_loc3_, "alive") && avmCall(scope, "hitCheck2", [_loc3_, {
              x: avmGet(avmGet(avmGet(_loc3_, "hitPointsFront"), _loc7_), "x"),
              y: avmGet(avmGet(avmGet(_loc3_, "hitPointsFront"), _loc7_), "y")
            }])) {
              avmCall(_root, "registerHit", [scope.owner, _loc3_]);
              avmCall(_root, "destroyTank", [_loc12_]);
              break;
            }
            _loc7_ = _loc7_ + 1;
          }
          _loc7_ = 0;
          while (_loc7_ < avmGet(avmGet(_loc3_, "hitPointsLeft"), "length")) {
            if (avmGet(_loc3_, "alive") && avmCall(scope, "hitCheck2", [_loc3_, {
              x: avmGet(avmGet(avmGet(_loc3_, "hitPointsLeft"), _loc7_), "x"),
              y: avmGet(avmGet(avmGet(_loc3_, "hitPointsLeft"), _loc7_), "y")
            }])) {
              avmCall(_root, "registerHit", [scope.owner, _loc3_]);
              avmCall(_root, "destroyTank", [_loc12_]);
              break;
            }
            _loc7_ = _loc7_ + 1;
          }
          _loc7_ = 0;
          while (_loc7_ < avmGet(avmGet(_loc3_, "hitPointsRear"), "length")) {
            if (avmGet(_loc3_, "alive") && avmCall(scope, "hitCheck2", [_loc3_, {
              x: avmGet(avmGet(avmGet(_loc3_, "hitPointsRear"), _loc7_), "x"),
              y: avmGet(avmGet(avmGet(_loc3_, "hitPointsRear"), _loc7_), "y")
            }])) {
              avmCall(_root, "registerHit", [scope.owner, _loc3_]);
              avmCall(_root, "destroyTank", [_loc12_]);
              break;
            }
            _loc7_ = _loc7_ + 1;
          }
        }
      }
      _loc12_ = _loc12_ + 1;
    }
  }
  if (!scope.active && scope.warmup < 0) {
    scope.rayThickness -= 3;
    if (scope.rayThickness <= 0) {
      scope.owner.deathRayReady = true;
      avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
      avmCall(this, "removeMovieClip", []);
    }
  }
  if (avmGet(scope.fractions, 0) <= 0) {
    avmCall(scope.fractions, "shift", []);
    avmCall(scope.fractions, "push", [250]);
    avmCall(scope.colors, "shift", []);
    avmCall(scope.colors, "push", [scope.nextColor]);
    if (scope.nextColor == scope.ownerColor) {
      scope.nextColor = 16777215;
    } else {
      scope.nextColor = scope.ownerColor;
    }
  }
  _loc12_ = 0;
  while (_loc12_ < avmGet(scope.fractions, "length")) {
    scope.fractions[_loc12_] -= 5;
    _loc12_ = _loc12_ + 1;
  }
  avmCall(scope, "clear", []);
  avmCall(scope, "lineStyle", [scope.rayThickness * (avmGet(_root, "SCALE") / 50)]);
  avmCall(scope, "lineGradientStyle", ["linear", scope.colors, scope.alphas, scope.fractions, {
    matrixType: "box",
    x: -750 * (avmGet(_root, "SCALE") / 50),
    y: -750 * (avmGet(_root, "SCALE") / 50),
    w: 1500 * (avmGet(_root, "SCALE") / 50),
    h: 1500 * (avmGet(_root, "SCALE") / 50),
    r: (avmGet(scope.owner, "_rotation") + 90) / 180 * 3.141593
  }]);
  avmCall(scope, "moveTo", [0, 0]);
  _loc12_ = 0;
  while (_loc12_ < avmGet(scope.curvePoints, "length")) {
    avmCall(scope, "lineTo", [avmGet(avmGet(scope.curvePoints, _loc12_), "x"), avmGet(avmGet(scope.curvePoints, _loc12_), "y")]);
    _loc12_ = _loc12_ + 1;
  }
  avmCall(scope, "lineStyle", [0.5 * scope.rayThickness * (avmGet(_root, "SCALE") / 50)]);
  avmCall(scope, "lineGradientStyle", ["linear", scope.colors, scope.alphas, scope.fractions, {
    matrixType: "box",
    x: -750 * (avmGet(_root, "SCALE") / 50),
    y: -750 * (avmGet(_root, "SCALE") / 50),
    w: 1500 * (avmGet(_root, "SCALE") / 50),
    h: 1500 * (avmGet(_root, "SCALE") / 50),
    r: (avmGet(scope.owner, "_rotation") - 90) / 180 * 3.141593
  }]);
  avmCall(scope, "moveTo", [0, 0]);
  _loc12_ = 0;
  while (_loc12_ < avmGet(scope.curvePoints, "length")) {
    avmCall(scope, "lineTo", [avmGet(avmGet(scope.curvePoints, _loc12_), "x"), avmGet(avmGet(scope.curvePoints, _loc12_), "y")]);
    _loc12_ = _loc12_ + 1;
  }
  if (scope.active) {
    scope.lifetime--;
  }
  if (scope.lifetime == 0) {
    scope.active = false;
  }
};
}
export function install_electricbullet(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  i = 0;
  while (i < avmGet(_root, "BULLETHITCHECKINTERVALS")) {
    scope.previousX = scope.x;
    scope.previousY = scope.y;
    scope.x += scope.xSpeed;
    scope.y += scope.ySpeed;
    scope._X = scope.x;
    scope._Y = scope.y;
    if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
      x: 0,
      y: 0
    }])) {
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundBounce" + random(2)), "start", []);
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x -= scope.xSpeed;
      scope.y += scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnXInvert = true;
      } else {
        scope.hitOnXInvert = false;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y -= scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnYInvert = true;
      } else {
        scope.hitOnYInvert = false;
      }
      if (scope.hitOnXInvert && !scope.hitOnYInvert) {
        scope.ySpeed = -scope.ySpeed;
      } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
        scope.xSpeed = -scope.xSpeed;
      } else {
        scope.xSpeed = -scope.xSpeed;
        scope.ySpeed = -scope.ySpeed;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
    }
    i++;
  }
  scope._X = scope.x;
  scope._Y = scope.y;
  var _loc7_;
  var _loc8_;
  var _loc6_;
  var _loc9_;
  var _loc10_;
  var _loc5_;
  var _loc3_;
  if (scope.deadly == 0 && this == scope.firstBullet && scope.lastBullet instanceof MovieClip) {
    avmCall(scope.sparkMC, "clear", []);
    _loc7_ = avmGet(scope.lastBullet, "x") - avmGet(this, "x");
    _loc8_ = avmGet(scope.lastBullet, "y") - avmGet(this, "y");
    _loc6_ = avmCall(Math, "sqrt", [_loc7_ * _loc7_ + _loc8_ * _loc8_]);
    scope.sparkMC.points = new Array();
    _loc9_ = -_loc8_ / _loc6_;
    _loc10_ = _loc7_ / _loc6_;
    scope.sparkMC.waveCounter += 0.5;
    _loc7_ = _loc7_ / _loc6_ * 5;
    _loc8_ = _loc8_ / _loc6_ * 5;
    _loc5_ = 0;
    while (_loc5_ <= _loc6_ / 5) {
      _loc3_ = avmCall(Math, "cos", [_loc5_ / 5 + avmGet(scope.sparkMC, "waveCounter")]) * avmCall(Math, "min", [1, avmCall(Math, "min", [_loc5_ / 5, (_loc6_ / 5 - _loc5_) / 5])]) * 10;
      avmGet(scope.sparkMC, "points")[_loc5_] = {
        x: avmGet(this, "x") + _loc5_ * _loc7_ + _loc9_ * _loc3_,
        y: avmGet(this, "y") + _loc5_ * _loc8_ + _loc10_ * _loc3_
      };
      _loc5_ = _loc5_ + 1;
    }
    _loc5_ = 0;
    while (_loc5_ < 2) {
      avmCall(scope.sparkMC, "moveTo", [avmGet(avmGet(avmGet(scope.sparkMC, "points"), 0), "x"), avmGet(avmGet(avmGet(scope.sparkMC, "points"), 0), "y")]);
      var i = 1;
      while (i < avmGet(avmGet(scope.sparkMC, "points"), "length") - 1) {
        avmCall(scope.sparkMC, "lineStyle", [avmCall(Math, "random", []) * 2 + 1, avmCall(Math, "random", []) >= 0.5 ? 10066431 : 6711039, avmCall(Math, "random", []) * 30 + 70]);
        avmCall(scope.sparkMC, "lineTo", [avmGet(avmGet(avmGet(scope.sparkMC, "points"), i), "x") + avmCall(Math, "random", []) * 10 - 5, avmGet(avmGet(avmGet(scope.sparkMC, "points"), i), "y") + avmCall(Math, "random", []) * 10 - 5]);
        i++;
      }
      if (avmGet(avmGet(scope.sparkMC, "points"), "length") >= 2) {
        avmCall(scope.sparkMC, "lineTo", [avmGet(avmGet(avmGet(scope.sparkMC, "points"), i), "x"), avmGet(avmGet(avmGet(scope.sparkMC, "points"), i), "y")]);
      }
      _loc5_ = _loc5_ + 1;
    }
    if (!avmGet(scope.sparkMC, "shooting") && avmCall(Math, "random", []) > 0.85) {
      scope.sparkMC.shooting = true;
      var i = avmCall(Math, "floor", [avmCall(Math, "random", []) * avmGet(avmGet(scope.sparkMC, "points"), "length")]);
      scope.sparkMC.shootingPoints = new Array();
      avmGet(scope.sparkMC, "shootingPoints")[avmGet(avmGet(scope.sparkMC, "shootingPoints"), "length")] = {
        x: avmGet(avmGet(avmGet(scope.sparkMC, "points"), i), "x"),
        y: avmGet(avmGet(avmGet(scope.sparkMC, "points"), i), "y")
      };
    }
    if (avmGet(scope.sparkMC, "shooting")) {
      avmCall(scope.sparkMC, "moveTo", [avmGet(avmGet(avmGet(scope.sparkMC, "shootingPoints"), 0), "x"), avmGet(avmGet(avmGet(scope.sparkMC, "shootingPoints"), 0), "y")]);
      avmGet(scope.sparkMC, "shootingPoints")[avmGet(avmGet(scope.sparkMC, "shootingPoints"), "length")] = {
        x: avmGet(avmGet(avmGet(scope.sparkMC, "shootingPoints"), avmGet(avmGet(scope.sparkMC, "shootingPoints"), "length") - 1), "x") + (avmCall(Math, "random", []) >= 0.5 ? -1 : 1) * (avmCall(Math, "random", []) * 10 + 5),
        y: avmGet(avmGet(avmGet(scope.sparkMC, "shootingPoints"), avmGet(avmGet(scope.sparkMC, "shootingPoints"), "length") - 1), "y") + (avmCall(Math, "random", []) >= 0.5 ? -1 : 1) * (avmCall(Math, "random", []) * 10 + 5)
      };
      var i = 0;
      while (i < avmGet(avmGet(scope.sparkMC, "shootingPoints"), "length")) {
        avmCall(scope.sparkMC, "lineStyle", [(avmGet(avmGet(scope.sparkMC, "shootingPoints"), "length") - i) / 2, avmCall(Math, "random", []) >= 0.5 ? 10066431 : 6711039, 100]);
        avmCall(scope.sparkMC, "lineTo", [avmGet(avmGet(avmGet(scope.sparkMC, "shootingPoints"), i), "x") + avmCall(Math, "random", []) * 5 - 2.5, avmGet(avmGet(avmGet(scope.sparkMC, "shootingPoints"), i), "y") + avmCall(Math, "random", []) * 5 - 2.5]);
        i++;
      }
      if (avmGet(avmGet(scope.sparkMC, "shootingPoints"), "length") == 6) {
        scope.sparkMC.shooting = false;
      }
    }
  }
  if (scope.deadly > 0) {
    scope.deadly--;
  }
  scope.lifetime--;
  var _loc4_;
  if (scope.lifetime <= 0) {
    scope.owner.electricReady = true;
    avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
    if (avmGet(_root, "soundOn")) {
      avmCall(avmGet(_root, "soundPoof"), "start", []);
    }
    _loc4_ = 0;
    while (_loc4_ < avmGet(_root, "NUMBEROFSMOKECLOUDS") * 2) {
      scope.s = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["smokebullet" + avmCall(avmGet(_root, "game"), "getNextHighestDepth", []), avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
      avmCall(scope.s, "lineStyle", [5 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4)]) * 1118481, 10 + random(20)]);
      avmCall(scope.s, "moveTo", [0, 0]);
      avmCall(scope.s, "lineTo", [0, 1]);
      scope.s.xspeed = scope.xSpeed * avmGet(_root, "BULLETHITCHECKINTERVALS") + 0.5 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.yspeed = scope.ySpeed * avmGet(_root, "BULLETHITCHECKINTERVALS") + 0.5 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.x = scope._X;
      scope.s.y = scope._Y;
      scope.s._x = avmGet(scope.s, "x");
      scope.s._y = avmGet(scope.s, "y");
      scope.s.hitCheck = function (mc, point) {
        avmCall(this, "localToGlobal", [point]);
        if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
          return true;
        }
        return false;
      };
      scope.s.onEnterFrame = function () {
        if (avmGet(_root, "frozen")) {
          return undefined;
        }
        this._xscale += 2;
        this._yscale += 2;
        this._alpha -= 15 - avmCall(Math, "random", []) * 2;
        this.xspeed *= 0.93;
        this.yspeed *= 0.93;
        this.x += avmGet(this, "xspeed");
        this.y += avmGet(this, "yspeed");
        this._x = avmGet(this, "x");
        this._y = avmGet(this, "y");
        if (avmCall(this, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: 0,
          y: 0
        }])) {
          this.xspeed *= 0.25;
          this.yspeed *= 0.25;
        }
        if (avmGet(this, "_alpha") <= 0) {
          avmCall(this, "removeMovieClip", []);
        }
      };
      _loc4_ = _loc4_ + 1;
    }
    avmCall(scope.sparkMC, "removeMovieClip", []);
    avmCall(this, "removeMovieClip", []);
  }
};
}
export function install_fragbomb(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.detonate = (function detonate() {
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundExplosion3"), "start", []);
    avmCall(avmGet(_root, "soundExplosion3"), "start", []);
    avmCall(avmGet(_root, "soundExplosion3"), "start", []);
  }
  _root.shake = avmCall(Math, "max", [avmGet(_root, "MAXSHAKE"), avmGet(_root, "shake") + 7]);
  scope.owner.fragFired = false;
  scope.owner.lastFrag = undefined;
  avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
  var _loc5_;
  var _loc6_;
  var _loc4_;
  if (scope.level > 0) {
    _loc5_ = 0;
    while (_loc5_ < avmGet(_root, "FRAGFRAGMENTS")) {
      scope.fragDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
      scope.fragName = "fragfragment" + scope.fragDepth;
      scope.frag = avmCall(avmGet(_root, "game"), "attachMovie", ["fragbombfragment", scope.fragName, scope.fragDepth]);
      avmCall(this, "swapDepths", [scope.frag]);
      scope.frag.x = scope._X;
      scope.frag.y = scope._Y;
      scope.frag._x = avmGet(scope.frag, "x");
      scope.frag._y = avmGet(scope.frag, "y");
      scope.frag._xscale = 170 * (avmGet(_root, "SCALE") / 50);
      scope.frag._yscale = 170 * (avmGet(_root, "SCALE") / 50);
      scope.frag._rotation = random(360);
      _loc6_ = 25 + random(25);
      scope.frag.rotSpeed = avmCall(Math, "random", []) <= 0.5 ? -_loc6_ : _loc6_;
      _loc4_ = random(360);
      scope.frag.xSpeed = avmCall(Math, "cos", [(_loc4_ - 90) * 3.141593 / 180]) * (avmGet(_root, "FRAGSPEED") - avmCall(Math, "random", []) * avmGet(_root, "FRAGSPEED") + 4) / avmGet(_root, "FRAGHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
      scope.frag.ySpeed = avmCall(Math, "sin", [(_loc4_ - 90) * 3.141593 / 180]) * (avmGet(_root, "FRAGSPEED") - avmCall(Math, "random", []) * avmGet(_root, "FRAGSPEED") + 4) / avmGet(_root, "FRAGHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
      scope.frag.active = true;
      scope.frag.owner = scope.owner;
      _loc5_ = _loc5_ + 1;
    }
  }
  var _loc3_ = 0;
  while (_loc3_ < avmGet(_root, "FRAGSMOKECLOUDS")) {
    scope.s = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["smokefrag" + scope.owner + "-" + _loc3_, avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    avmCall(scope.s, "lineStyle", [15 * (avmGet(_root, "SCALE") / 50) * ((scope.level + 2) / (avmGet(_root, "FRAGLEVELS") + 2)), avmCall(Math, "round", [random(4)]) * 1118481, 40 + random(20)]);
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    scope.s.xspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.yspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.x = scope._X + avmGet(scope.s, "xspeed") * (random(6) + 1) + (random(2) - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.y = scope._Y + avmGet(scope.s, "yspeed") * (random(6) + 1) + (random(2) - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 2;
      this._yscale += 2;
      this._alpha -= 3 - avmCall(Math, "random", []) * 2;
      this.xspeed *= 0.93;
      this.yspeed *= 0.93;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc3_ = _loc3_ + 1;
  }
  avmCall(this, "removeMovieClip", []);
}).bind(scope);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  if (!avmGet(scope.owner, "alive")) {
    avmCall(scope, "detonate", []);
  }
  i = 0;
  while (i < avmGet(_root, "FRAGHITCHECKINTERVALS")) {
    scope.previousX = scope.x;
    scope.previousY = scope.y;
    scope.x += scope.xSpeed;
    scope.y += scope.ySpeed;
    scope._X = scope.x;
    scope._Y = scope.y;
    if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
      x: 0,
      y: 0
    }])) {
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundBounce" + random(2)), "start", []);
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x -= scope.xSpeed;
      scope.y += scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnXInvert = true;
      } else {
        scope.hitOnXInvert = false;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y -= scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnYInvert = true;
      } else {
        scope.hitOnYInvert = false;
      }
      if (scope.hitOnXInvert && !scope.hitOnYInvert) {
        scope.ySpeed = -scope.ySpeed;
      } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
        scope.xSpeed = -scope.xSpeed;
      } else {
        scope.xSpeed = -scope.xSpeed;
        scope.ySpeed = -scope.ySpeed;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
    }
    i++;
  }
  scope._X = scope.x;
  scope._Y = scope.y;
  if (scope.deadly == 0) {
    var i = 0;
    while (i < avmGet(_root, "TANKS")) {
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + i), {
        x: 0,
        y: 0
      }])) {
        avmCall(_root, "registerHit", [scope.owner, avmGet(avmGet(_root, "game"), "tank" + i)]);
        avmCall(_root, "destroyTank", [i]);
        avmCall(scope, "detonate", []);
      }
      i++;
    }
  }
  if (scope.deadly > 0) {
    scope.deadly--;
  }
  scope.lifetime--;
  if (scope.lifetime <= 0) {
    avmCall(scope, "detonate", []);
    avmCall(this, "removeMovieClip", []);
  }
};
}
export function install_fragbombfragment(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  if (scope.active) {
    i = 0;
    while (i < avmGet(_root, "FRAGHITCHECKINTERVALS")) {
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        if (avmGet(_root, "soundOn")) {
          if (avmCall(Math, "random", []) > 0.5) {
            avmCall(avmGet(_root, "soundFragmentHit"), "start", []);
          } else {
            avmCall(avmGet(_root, "soundFragmentHit2"), "start", []);
          }
        }
        scope.active = false;
        i = avmGet(_root, "FRAGHITCHECKINTERVALS");
      }
      i++;
    }
    scope._X = scope.x;
    scope._Y = scope.y;
    scope._rotation = scope._rotation + scope.rotSpeed;
    var i = 0;
    while (i < avmGet(_root, "TANKS")) {
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + i), {
        x: 0,
        y: 0
      }])) {
        avmCall(_root, "registerHit", [scope.owner, avmGet(avmGet(_root, "game"), "tank" + i)]);
        avmCall(_root, "destroyTank", [i]);
        avmCall(this, "removeMovieClip", []);
      }
      i++;
    }
  } else {
    scope._alpha = scope._alpha - 5;
    if (scope._alpha <= 0) {
      avmCall(this, "removeMovieClip", []);
    }
  }
};
}
export function install_gatling(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;

scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    avmCall(avmGet(_root, "soundGatlingMotorStart"), "stop", ["soundGatlingMotorStart"]);
    avmCall(avmGet(_root, "soundGatlingMotor"), "stop", ["soundGatlingMotor"]);
    avmCall(avmGet(_root, "soundGatlingMotorStop"), "stop", ["soundGatlingMotorStop"]);
    return undefined;
  }
  if (!avmGet(scope.owner, "alive")) {
    avmCall(avmGet(_root, "soundGatlingMotorStart"), "stop", ["soundGatlingMotorStart"]);
    avmCall(avmGet(_root, "soundGatlingMotor"), "stop", ["soundGatlingMotor"]);
    avmCall(avmGet(_root, "soundGatlingMotorStop"), "stop", ["soundGatlingMotorStop"]);
    avmCall(this, "removeMovieClip", []);
  }
  if (avmGet(avmGet(scope.owner, "turret"), "_currentframe") == 16) {
    avmCall(avmGet(scope.owner, "turret"), "gotoAndPlay", [13]);
  }
  if (scope.active && avmGet(scope.owner, "triggerReleased")) {
    scope.active = false;
    avmCall(avmGet(_root, "soundGatlingMotorStart"), "stop", ["soundGatlingMotorStart"]);
    avmCall(avmGet(_root, "soundGatlingMotor"), "stop", ["soundGatlingMotor"]);
    if (avmGet(_root, "soundOn")) {
      avmCall(avmGet(_root, "soundGatlingMotorStop"), "start", [2.1 - 2.1 * (avmCall(Math, "pow", [scope.spinSpeed, 0.3]) / avmCall(Math, "pow", [avmGet(_root, "GATLINGSPINSPEED"), 0.3]))]);
    }
    scope.spinSpeed += 35;
  }
  var _loc3_;
  if (scope.active) {
    if (scope.spinSpeed < avmGet(_root, "GATLINGSPINSPEED")) {
      scope.spinSpeed++;
    }
    if (scope.spinSpeed == avmGet(_root, "GATLINGSPINSPEED") - 1) {
      avmCall(avmGet(_root, "soundGatlingMotorStart"), "stop", ["soundGatlingMotorStart"]);
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundGatlingMotor"), "start", [0, 999]);
      }
    }
    if (scope.spinSpeed == avmGet(_root, "GATLINGSPINSPEED")) {
      scope.fireCounter++;
      if (scope.fireCounter % 3 == 0) {
        if (scope.bulletsLeft > 0) {
          scope.bulletsLeft--;
          if (avmGet(_root, "soundOn")) {
            avmCall(avmGet(_root, "soundGatlingShot"), "start", []);
          }
          scope.gatlingBulletDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
          scope.gatlingBulletName = "gatlingBullet" + scope.gatlingBulletDepth;
          scope.gatlingBullet = avmCall(avmGet(_root, "game"), "attachMovie", ["gatlingBullet", scope.gatlingBulletName, scope.gatlingBulletDepth]);
          avmCall(scope.owner, "swapDepths", [scope.gatlingBullet]);
          scope.gatlingBullet.x = avmGet(scope.owner, "_x") + avmCall(Math, "cos", [(avmGet(scope.owner, "_rotation") - 90) * 3.141593 / 180]) * avmGet(_root, "SCALE") * 4.5 / 16;
          scope.gatlingBullet.y = avmGet(scope.owner, "_y") + avmCall(Math, "sin", [(avmGet(scope.owner, "_rotation") - 90) * 3.141593 / 180]) * avmGet(_root, "SCALE") * 4.5 / 16;
          scope.gatlingBullet._x = avmGet(scope.gatlingBullet, "x");
          scope.gatlingBullet._y = avmGet(scope.gatlingBullet, "y");
          scope.gatlingBullet._xscale = 100 * (avmGet(_root, "SCALE") / 50);
          scope.gatlingBullet._yscale = 100 * (avmGet(_root, "SCALE") / 50);
          _loc3_ = avmGet(scope.owner, "_rotation") - 90 + avmCall(Math, "random", []) * 11 - 5.5;
          scope.gatlingBullet.xSpeed = avmCall(Math, "cos", [_loc3_ * 3.141593 / 180]) * avmGet(_root, "GATLINGSPEED") / avmGet(_root, "GATLINGHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
          scope.gatlingBullet.ySpeed = avmCall(Math, "sin", [_loc3_ * 3.141593 / 180]) * avmGet(_root, "GATLINGSPEED") / avmGet(_root, "GATLINGHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
          scope.gatlingBullet.lifetime = avmGet(_root, "GATLINGLIFETIME");
          scope.gatlingBullet.deadly = avmGet(_root, "GATLINGDEADLY");
          scope.gatlingBullet.owner = scope.owner;
        } else if (avmGet(_root, "soundOn")) {
          avmCall(avmGet(_root, "soundExposion"), "start", []);
        }
      }
    }
  }
  if (!scope.active) {
    if (scope.spinSpeed > 0) {
      scope.spinSpeed--;
    }
    if (scope.spinSpeed == 0 && avmGet(scope.owner, "gatlingReady")) {
      avmCall(this, "removeMovieClip", []);
    }
    if (scope.spinSpeed == 0) {
      scope.owner.gatlingReady = true;
      avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
    }
  }
};
}
export function install_gatlingBullet(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  i = 0;
  while (i < avmGet(_root, "GATLINGHITCHECKINTERVALS")) {
    scope.previousX = scope.x;
    scope.previousY = scope.y;
    scope.x += scope.xSpeed;
    scope.y += scope.ySpeed;
    scope._X = scope.x;
    scope._Y = scope.y;
    if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
      x: 0,
      y: 0
    }])) {
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundBounce" + random(2)), "start", []);
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x -= scope.xSpeed;
      scope.y += scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnXInvert = true;
      } else {
        scope.hitOnXInvert = false;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y -= scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnYInvert = true;
      } else {
        scope.hitOnYInvert = false;
      }
      if (scope.hitOnXInvert && !scope.hitOnYInvert) {
        scope.ySpeed = -scope.ySpeed;
      } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
        scope.xSpeed = -scope.xSpeed;
      } else {
        scope.xSpeed = -scope.xSpeed;
        scope.ySpeed = -scope.ySpeed;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
    }
    i++;
  }
  scope._X = scope.x;
  scope._Y = scope.y;
  if (scope.deadly == 0) {
    var i = 0;
    while (i < avmGet(_root, "TANKS")) {
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + i), {
        x: 0,
        y: 0
      }])) {
        avmCall(_root, "registerHit", [scope.owner, avmGet(avmGet(_root, "game"), "tank" + i)]);
        avmCall(_root, "destroyTank", [i]);
        avmCall(this, "removeMovieClip", []);
      }
      i++;
    }
  }
  if (scope.deadly > 0) {
    scope.deadly--;
  }
  scope.lifetime--;
  var _loc3_;
  if (scope.lifetime <= 0) {
    _loc3_ = 0;
    while (_loc3_ < avmGet(_root, "NUMBEROFSMOKECLOUDS")) {
      scope.s = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["smokegatlingbullet" + avmCall(avmGet(_root, "game"), "getNextHighestDepth", []), avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
      avmCall(scope.s, "lineStyle", [2 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4)]) * 1118481, 10 + random(20)]);
      avmCall(scope.s, "moveTo", [0, 0]);
      avmCall(scope.s, "lineTo", [0, 1]);
      scope.s.xspeed = scope.xSpeed * avmGet(_root, "GATLINGHITCHECKINTERVALS") + 0.25 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.yspeed = scope.ySpeed * avmGet(_root, "GATLINGHITCHECKINTERVALS") + 0.25 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.x = scope._X;
      scope.s.y = scope._Y;
      scope.s._x = avmGet(scope.s, "x");
      scope.s._y = avmGet(scope.s, "y");
      scope.s.hitCheck = function (mc, point) {
        avmCall(this, "localToGlobal", [point]);
        if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
          return true;
        }
        return false;
      };
      scope.s.onEnterFrame = function () {
        if (avmGet(_root, "frozen")) {
          return undefined;
        }
        this._xscale += 2;
        this._yscale += 2;
        this._alpha -= 15 - avmCall(Math, "random", []) * 2;
        this.xspeed *= 0.93;
        this.yspeed *= 0.93;
        this.x += avmGet(this, "xspeed");
        this.y += avmGet(this, "yspeed");
        this._x = avmGet(this, "x");
        this._y = avmGet(this, "y");
        if (avmCall(this, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: 0,
          y: 0
        }])) {
          this.xspeed *= 0.25;
          this.yspeed *= 0.25;
        }
        if (avmGet(this, "_alpha") <= 0) {
          avmCall(this, "removeMovieClip", []);
        }
      };
      _loc3_ = _loc3_ + 1;
    }
    avmCall(this, "removeMovieClip", []);
  }
};
}
export function install_homingbullet(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
avmCall(scope, "stop", []);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  var _loc12_;
  var _loc11_;
  var _loc10_;
  var _loc13_;
  var _loc14_;
  var _loc4_;
  var _loc6_;
  var _loc8_;
  var _loc5_;
  var _loc17_;
  var _loc15_;
  var _loc16_;
  var _loc3_;
  if (scope.homing) {
    _loc12_ = avmCall(Math, "floor", [scope.x / avmGet(_root, "SCALE")]);
    _loc11_ = avmCall(Math, "floor", [scope.y / avmGet(_root, "SCALE")]);
    _loc10_ = 1000;
    _loc4_ = 0;
    while (_loc4_ < avmGet(_root, "TANKS")) {
      _loc6_ = avmCall(Math, "floor", [avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc4_), "x") / avmGet(_root, "SCALE")]);
      _loc8_ = avmCall(Math, "floor", [avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc4_), "y") / avmGet(_root, "SCALE")]);
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc4_), "alive")) {
        _loc5_ = avmGet(avmGet(avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc12_), _loc11_), _loc6_), _loc8_);
        if (_loc5_ < _loc10_ || _loc5_ == _loc10_ && avmGet(avmGet(_root, "game"), "tank" + _loc4_) != scope.owner) {
          _loc10_ = _loc5_;
          _loc13_ = _loc6_;
          _loc14_ = _loc8_;
          scope.target = avmGet(avmGet(_root, "game"), "tank" + _loc4_);
          scope.targetColor = avmGet(scope.target, "baseColor");
        }
      }
      _loc4_ = _loc4_ + 1;
    }
    if (!avmGet(scope.target, "alive")) {
      scope.homing = false;
    } else {
      if (scope.target != scope.oldTarget) {
        if (avmGet(_root, "soundOn")) {
          avmCall(avmGet(_root, "soundHoming"), "start", []);
        }
      }
      scope.oldTarget = scope.target;
      _loc17_ = avmCall(_root, "getShortestPathWithDistances", [avmGet(_root, "maze"), avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc12_), _loc11_), _loc12_, _loc11_, _loc13_, _loc14_]);
      if (avmGet(avmGet(avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc12_), _loc11_), _loc13_), _loc14_) + 1 <= 1) {
        _loc15_ = avmGet(scope.target, "x");
        _loc16_ = avmGet(scope.target, "y");
      } else {
        _loc15_ = (avmGet(avmGet(_loc17_, 0), "x") + 0.5) * avmGet(_root, "SCALE");
        _loc16_ = (avmGet(avmGet(_loc17_, 0), "y") + 0.5) * avmGet(_root, "SCALE");
      }
      scope.soundCounter++;
      if (avmGet(_root, "soundOn")) {
        if (scope.soundCounter > (avmGet(avmGet(avmGet(avmGet(avmGet(_root, "distancesForMaze"), _loc12_), _loc11_), _loc13_), _loc14_) + 1) * 4) {
          scope.soundCounter = 0;
          avmCall(avmGet(_root, "soundHoming2"), "start", []);
        }
      }
      _loc4_ = 0;
      while (_loc4_ < avmGet(_root, "HOMINGHITCHECKINTERVALS")) {
        scope.previousX = scope.x;
        scope.previousY = scope.y;
        scope.x += scope.xSpeed;
        scope.y += scope.ySpeed;
        scope._X = scope.x;
        scope._Y = scope.y;
        if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: 0,
          y: 0
        }])) {
          if (avmGet(_root, "soundOn")) {
            avmCall(avmGet(_root, "soundBounce" + random(2)), "start", []);
          }
          scope.x = scope.previousX;
          scope.y = scope.previousY;
          scope.x -= scope.xSpeed;
          scope.y += scope.ySpeed;
          scope._X = scope.x;
          scope._Y = scope.y;
          if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
            x: 0,
            y: 0
          }])) {
            scope.hitOnXInvert = true;
          } else {
            scope.hitOnXInvert = false;
          }
          scope.x = scope.previousX;
          scope.y = scope.previousY;
          scope.x += scope.xSpeed;
          scope.y -= scope.ySpeed;
          scope._X = scope.x;
          scope._Y = scope.y;
          if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
            x: 0,
            y: 0
          }])) {
            scope.hitOnYInvert = true;
          } else {
            scope.hitOnYInvert = false;
          }
          if (scope.hitOnXInvert && !scope.hitOnYInvert) {
            scope.ySpeed = -scope.ySpeed;
          } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
            scope.xSpeed = -scope.xSpeed;
          } else {
            scope.xSpeed = -scope.xSpeed;
            scope.ySpeed = -scope.ySpeed;
          }
          scope.x = scope.previousX;
          scope.y = scope.previousY;
          scope.x += scope.xSpeed;
          scope.y += scope.ySpeed;
        }
        if (_loc15_ - scope.x < 0) {
          scope.xSpeed -= 0.12 / avmGet(_root, "HOMINGHITCHECKINTERVALS");
        } else {
          scope.xSpeed += 0.12 / avmGet(_root, "HOMINGHITCHECKINTERVALS");
        }
        if (_loc16_ - scope.y < 0) {
          scope.ySpeed -= 0.12 / avmGet(_root, "HOMINGHITCHECKINTERVALS");
        } else {
          scope.ySpeed += 0.12 / avmGet(_root, "HOMINGHITCHECKINTERVALS");
        }
        _loc3_ = avmCall(Math, "sqrt", [scope.xSpeed * scope.xSpeed + scope.ySpeed * scope.ySpeed]);
        if (_loc3_ > avmGet(_root, "HOMINGSPEED") / avmGet(_root, "HOMINGHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50)) {
          scope.xSpeed = scope.xSpeed / _loc3_ * avmGet(_root, "HOMINGSPEED") / avmGet(_root, "HOMINGHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
          scope.ySpeed = scope.ySpeed / _loc3_ * avmGet(_root, "HOMINGSPEED") / avmGet(_root, "HOMINGHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
        }
        _loc4_ = _loc4_ + 1;
      }
    }
  } else {
    _loc4_ = 0;
    while (_loc4_ < avmGet(_root, "HOMINGHITCHECKINTERVALS")) {
      scope.previousX = scope.x;
      scope.previousY = scope.y;
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        if (avmGet(_root, "soundOn")) {
          avmCall(avmGet(_root, "soundBounce" + random(2)), "start", []);
        }
        scope.x = scope.previousX;
        scope.y = scope.previousY;
        scope.x -= scope.xSpeed;
        scope.y += scope.ySpeed;
        scope._X = scope.x;
        scope._Y = scope.y;
        if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: 0,
          y: 0
        }])) {
          scope.hitOnXInvert = true;
        } else {
          scope.hitOnXInvert = false;
        }
        scope.x = scope.previousX;
        scope.y = scope.previousY;
        scope.x += scope.xSpeed;
        scope.y -= scope.ySpeed;
        scope._X = scope.x;
        scope._Y = scope.y;
        if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: 0,
          y: 0
        }])) {
          scope.hitOnYInvert = true;
        } else {
          scope.hitOnYInvert = false;
        }
        if (scope.hitOnXInvert && !scope.hitOnYInvert) {
          scope.ySpeed = -scope.ySpeed;
        } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
          scope.xSpeed = -scope.xSpeed;
        } else {
          scope.xSpeed = -scope.xSpeed;
          scope.ySpeed = -scope.ySpeed;
        }
        scope.x = scope.previousX;
        scope.y = scope.previousY;
        scope.x += scope.xSpeed;
        scope.y += scope.ySpeed;
      }
      _loc4_ = _loc4_ + 1;
    }
  }
  scope._X = scope.x;
  scope._Y = scope.y;
  if (scope.xSpeed < 0) {
    if (scope.ySpeed < 0) {
      scope.aimAngle = -3.141593 + avmCall(Math, "atan", [scope.ySpeed / scope.xSpeed]);
    } else {
      scope.aimAngle = 3.141593 + avmCall(Math, "atan", [scope.ySpeed / scope.xSpeed]);
    }
  } else if (scope.xSpeed > 0) {
    scope.aimAngle = avmCall(Math, "atan", [scope.ySpeed / scope.xSpeed]);
  } else if (scope.ySpeed < 0) {
    scope.aimAngle = -1.570796;
  } else {
    scope.aimAngle = 1.570796;
  }
  scope._rotation = (scope.aimAngle + 1.570796) * 180 / 3.141593;
  _loc4_ = 0;
  var _loc9_;
  while (_loc4_ < avmGet(_root, "HOMINGSMOKECLOUDS")) {
    _loc9_ = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
    avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["homingSmoke-" + _loc9_, avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    scope.s = avmGet(avmGet(_root, "game"), "homingSmoke-" + _loc9_);
    if (scope.homing && avmCall(Math, "random", []) > 0.5) {
      avmCall(scope.s, "lineStyle", [4 * (avmGet(_root, "SCALE") / 50), scope.targetColor, 20]);
    } else {
      avmCall(scope.s, "lineStyle", [4 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4) + 6]) * 1118481, 20]);
    }
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    scope.s.xspeed = -avmGet(this, "xSpeed") + (avmCall(Math, "random", []) - 0.5) * (avmGet(_root, "SCALE") / 50);
    scope.s.yspeed = -avmGet(this, "ySpeed") + (avmCall(Math, "random", []) - 0.5) * (avmGet(_root, "SCALE") / 50);
    _loc3_ = avmCall(Math, "sqrt", [scope.xSpeed * scope.xSpeed + scope.ySpeed * scope.ySpeed]);
    if (isNaN(_loc3_)) {
      _loc3_ = 1;
    }
    scope.s.x = avmGet(this, "_x") + (-8 * avmGet(this, "xSpeed") / _loc3_ + (5 * avmCall(Math, "random", []) - 2.5)) * (avmGet(_root, "SCALE") / 50);
    scope.s.y = avmGet(this, "_y") + (-8 * avmGet(this, "ySpeed") / _loc3_ + (5 * avmCall(Math, "random", []) - 2.5)) * (avmGet(_root, "SCALE") / 50);
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 2;
      this._yscale += 2;
      this._alpha -= 4 - avmCall(Math, "random", []) * 4;
      this.xspeed *= 0.95;
      this.yspeed *= 0.95;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc4_ = _loc4_ + 1;
  }
  if (scope.deadly == 0) {
    _loc4_ = 0;
    while (_loc4_ < avmGet(_root, "TANKS")) {
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc4_), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + _loc4_), {
        x: 0,
        y: 0
      }])) {
        avmCall(_root, "registerHit", [scope.owner, avmGet(avmGet(_root, "game"), "tank" + _loc4_)]);
        scope.owner.homingReady = true;
        avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
        avmCall(_root, "destroyTank", [_loc4_]);
        avmCall(this, "removeMovieClip", []);
      }
      _loc4_ = _loc4_ + 1;
    }
  }
  if (scope.startuptime >= 0) {
    scope.startuptime--;
  }
  if (scope.startuptime == 0) {
    scope.homing = true;
  }
  if (scope.deadly > 0) {
    scope.deadly--;
  }
  scope.lifetime--;
  var _loc7_;
  if (scope.lifetime <= 0) {
    scope.owner.homingReady = true;
    avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
    if (avmGet(_root, "soundOn")) {
      avmCall(avmGet(_root, "soundPoof"), "start", []);
    }
    _loc7_ = 0;
    while (_loc7_ < avmGet(_root, "NUMBEROFSMOKECLOUDS") * 2) {
      scope.s = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["smokebullet" + avmCall(avmGet(_root, "game"), "getNextHighestDepth", []), avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
      avmCall(scope.s, "lineStyle", [5 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4)]) * 1118481, 10 + random(20)]);
      avmCall(scope.s, "moveTo", [0, 0]);
      avmCall(scope.s, "lineTo", [0, 1]);
      scope.s.xspeed = scope.xSpeed * avmGet(_root, "HOMINGHITCHECKINTERVALS") + 0.5 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.yspeed = scope.ySpeed * avmGet(_root, "HOMINGHITCHECKINTERVALS") + 0.5 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.x = scope._X;
      scope.s.y = scope._Y;
      scope.s._x = avmGet(scope.s, "x");
      scope.s._y = avmGet(scope.s, "y");
      scope.s.hitCheck = function (mc, point) {
        avmCall(this, "localToGlobal", [point]);
        if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
          return true;
        }
        return false;
      };
      scope.s.onEnterFrame = function () {
        if (avmGet(_root, "frozen")) {
          return undefined;
        }
        this._xscale += 2;
        this._yscale += 2;
        this._alpha -= 15 - avmCall(Math, "random", []) * 2;
        this.xspeed *= 0.93;
        this.yspeed *= 0.93;
        this.x += avmGet(this, "xspeed");
        this.y += avmGet(this, "yspeed");
        this._x = avmGet(this, "x");
        this._y = avmGet(this, "y");
        if (avmCall(this, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: 0,
          y: 0
        }])) {
          this.xspeed *= 0.25;
          this.yspeed *= 0.25;
        }
        if (avmGet(this, "_alpha") <= 0) {
          avmCall(this, "removeMovieClip", []);
        }
      };
      _loc7_ = _loc7_ + 1;
    }
    avmCall(this, "removeMovieClip", []);
  }
};
}
export function install_laser(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.linePoints = new Array();
scope.bounces = 0;
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  var _loc3_;
  if (scope.active) {
    scope.j = 0;
    while (scope.j < avmGet(_root, "LASERHITCHECKINTERVALS")) {
      scope.previousX = scope.x;
      scope.previousY = scope.y;
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: scope.x,
        y: scope.y
      }])) {
        scope.bounces++;
        scope.x = scope.previousX;
        scope.y = scope.previousY;
        scope.x -= scope.xSpeed;
        scope.y += scope.ySpeed;
        if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: scope.x,
          y: scope.y
        }])) {
          scope.hitOnXInvert = true;
        } else {
          scope.hitOnXInvert = false;
        }
        scope.x = scope.previousX;
        scope.y = scope.previousY;
        scope.x += scope.xSpeed;
        scope.y -= scope.ySpeed;
        if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: scope.x,
          y: scope.y
        }])) {
          scope.hitOnYInvert = true;
        } else {
          scope.hitOnYInvert = false;
        }
        if (scope.hitOnXInvert && !scope.hitOnYInvert) {
          scope.ySpeed = -scope.ySpeed;
        } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
          scope.xSpeed = -scope.xSpeed;
        } else {
          scope.xSpeed = -scope.xSpeed;
          scope.ySpeed = -scope.ySpeed;
        }
        scope.x = scope.previousX;
        scope.y = scope.previousY;
        scope.x += scope.xSpeed;
        scope.y += scope.ySpeed;
      }
      if (scope.deadly > 0) {
        scope.deadly--;
      }
      if (scope.deadly == 0 && (avmGet(_root, "MASTER") == undefined || avmGet(_root, "MASTER"))) {
        _loc3_ = 0;
        while (_loc3_ < avmGet(_root, "TANKS")) {
          if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + _loc3_), {
            x: scope.x,
            y: scope.y
          }])) {
            if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "username") == avmGet(_root, "AIName") && scope.bounces == 0) {
              if (avmGet(avmGet(avmGet(_root, "loginInfo"), "actualRankedPlayers"), 0)) {
                avmCall(_root, "unlockAchievement", [36, avmGet(avmGet(_root, "loginInfo"), "p1n"), avmGet(avmGet(_root, "loginInfo"), "k")]);
              }
            }
            avmCall(_root, "registerHit", [scope.owner, avmGet(avmGet(_root, "game"), "tank" + _loc3_)]);
            avmCall(_root, "destroyTank", [_loc3_]);
            if (avmGet(_root, "MASTER")) {
              avmCall(_root, "sendKillToSlaves", ["laser", scope.id, avmGet(scope.owner, "username"), _loc3_]);
              avmCall(_root, "sendKillToServer", ["laser", avmGet(scope.owner, "username"), avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "username")]);
            }
            scope.j = avmGet(_root, "LASERHITCHECKINTERVALS");
            scope.lifetime = 1;
          }
          _loc3_ = _loc3_ + 1;
        }
      }
      avmCall(scope.linePoints, "push", [{
        x: scope.x,
        y: scope.y
      }]);
      scope.j++;
    }
  } else {
    scope.j = 0;
    while (scope.j < avmGet(_root, "LASERHITCHECKINTERVALS")) {
      avmCall(scope.linePoints, "shift", []);
      scope.j++;
    }
    if (avmGet(scope.linePoints, "length") == 0) {
      avmCall(this, "removeMovieClip", []);
    }
  }
  avmCall(scope, "clear", []);
  avmCall(scope, "lineStyle", [3 * (avmGet(_root, "SCALE") / 50), 0, 30]);
  avmCall(scope, "moveTo", [avmGet(avmGet(scope.linePoints, 0), "x"), avmGet(avmGet(scope.linePoints, 0), "y")]);
  _loc3_ = 1;
  while (_loc3_ < avmGet(scope.linePoints, "length")) {
    avmCall(scope, "lineTo", [avmGet(avmGet(scope.linePoints, _loc3_), "x"), avmGet(avmGet(scope.linePoints, _loc3_), "y")]);
    _loc3_ = _loc3_ + 1;
  }
  avmCall(scope, "lineStyle", [2 * (avmGet(_root, "SCALE") / 50), scope.laserColor, 100]);
  avmCall(scope, "moveTo", [avmGet(avmGet(scope.linePoints, 0), "x"), avmGet(avmGet(scope.linePoints, 0), "y")]);
  _loc3_ = 1;
  while (_loc3_ < avmGet(scope.linePoints, "length")) {
    avmCall(scope, "lineTo", [avmGet(avmGet(scope.linePoints, _loc3_), "x"), avmGet(avmGet(scope.linePoints, _loc3_), "y")]);
    _loc3_ = _loc3_ + 1;
  }
  scope.lifetime--;
  if (scope.lifetime == 0) {
    scope.owner.laserReady = true;
    scope.active = false;
    avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
  }
};
}
export function install_mine(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.detonate = (function detonate() {
  _root.shake = avmCall(Math, "min", [avmGet(_root, "MAXSHAKE"), avmGet(_root, "shake") + 7]);
  if (avmGet(_root, "soundOn")) {
    avmCall(avmGet(_root, "soundExplosion3"), "start", []);
    avmCall(avmGet(_root, "soundExplosion3"), "start", []);
    avmCall(avmGet(_root, "soundExplosion3"), "start", []);
  }
  var _loc4_ = 0;
  var _loc6_;
  var _loc3_;
  while (_loc4_ < avmGet(_root, "MINEFRAGMENTS")) {
    scope.fragDepth = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
    scope.fragName = "fragfragment" + scope.fragDepth;
    scope.frag = avmCall(avmGet(_root, "game"), "attachMovie", ["fragbombfragment", scope.fragName, scope.fragDepth]);
    scope.frag.x = scope._X;
    scope.frag.y = scope._Y;
    scope.frag._x = avmGet(scope.frag, "x");
    scope.frag._y = avmGet(scope.frag, "y");
    scope.frag._xscale = 170 * (avmGet(_root, "SCALE") / 50);
    scope.frag._yscale = 170 * (avmGet(_root, "SCALE") / 50);
    scope.frag._rotation = random(360);
    _loc6_ = 25 + random(25);
    scope.frag.rotSpeed = avmCall(Math, "random", []) <= 0.5 ? -_loc6_ : _loc6_;
    _loc3_ = random(360);
    scope.frag.xSpeed = avmCall(Math, "cos", [(_loc3_ - 90) * 3.141593 / 180]) * (avmGet(_root, "FRAGSPEED") - avmCall(Math, "random", []) * avmGet(_root, "FRAGSPEED") + 4) / avmGet(_root, "FRAGHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
    scope.frag.ySpeed = avmCall(Math, "sin", [(_loc3_ - 90) * 3.141593 / 180]) * (avmGet(_root, "FRAGSPEED") - avmCall(Math, "random", []) * avmGet(_root, "FRAGSPEED") + 4) / avmGet(_root, "FRAGHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
    scope.frag.active = true;
    scope.frag.owner = scope.owner;
    _loc4_ = _loc4_ + 1;
  }
  var _loc5_ = 0;
  while (_loc5_ < avmGet(_root, "MINESMOKECLOUDS")) {
    scope.s = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["smokemine" + scope.owner + "-" + avmCall(avmGet(_root, "game"), "getNextHighestDepth", []), avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    avmCall(scope.s, "lineStyle", [15 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4)]) * 1118481, 40 + random(20)]);
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    scope.s.xspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.yspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.x = scope._X + avmGet(scope.s, "xspeed") * (random(6) + 1) + (random(2) - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s.y = scope._Y + avmGet(scope.s, "yspeed") * (random(6) + 1) + (random(2) - 1) * (avmGet(_root, "SCALE") / 50);
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 2;
      this._yscale += 2;
      this._alpha -= 3 - avmCall(Math, "random", []) * 2;
      this.xspeed *= 0.93;
      this.yspeed *= 0.93;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc5_ = _loc5_ + 1;
  }
  avmCall(this, "removeMovieClip", []);
}).bind(scope);
avmCall(scope, "stop", []);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    avmCall(scope.blinker, "stop", []);
    return undefined;
  }
  i = 0;
  while (i < avmGet(_root, "MINEHITCHECKINTERVALS")) {
    scope.previousX = scope.x;
    scope.previousY = scope.y;
    scope.x += scope.xSpeed;
    scope.y += scope.ySpeed;
    scope._X = scope.x;
    scope._Y = scope.y;
    if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
      x: 0,
      y: 0
    }])) {
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundBounce" + random(2)), "start", []);
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x -= scope.xSpeed;
      scope.y += scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnXInvert = true;
      } else {
        scope.hitOnXInvert = false;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y -= scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnYInvert = true;
      } else {
        scope.hitOnYInvert = false;
      }
      if (scope.hitOnXInvert && !scope.hitOnYInvert) {
        scope.ySpeed = -scope.ySpeed;
      } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
        scope.xSpeed = -scope.xSpeed;
      } else {
        scope.xSpeed = -scope.xSpeed;
        scope.ySpeed = -scope.ySpeed;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
    }
    i++;
  }
  scope.xSpeed *= 0.75;
  scope.ySpeed *= 0.75;
  scope._X = scope.x;
  scope._Y = scope.y;
  var _loc4_;
  if (!scope.landed) {
    if (avmCall(Math, "abs", [scope.xSpeed]) < 0.15 && avmCall(Math, "abs", [scope.ySpeed]) < 0.15) {
      scope.landed = true;
      scope.xSpeed = 0;
      scope.ySpeed = 0;
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundMineLand"), "start", []);
      }
      _loc4_ = 0;
      while (_loc4_ < avmGet(_root, "NUMBEROFDUSTCLOUDS") / 2) {
        scope.s = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "createEmptyMovieClip", ["minedust-" + avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", []), avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
        avmCall(this, "swapDepths", [scope.s]);
        avmCall(scope.s, "lineStyle", [10 * (avmGet(_root, "SCALE") / 50), 11184810, 40 + random(20)]);
        avmCall(scope.s, "moveTo", [0, 0]);
        avmCall(scope.s, "lineTo", [0, 1]);
        scope.s.xspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
        scope.s.yspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
        scope.s.x = scope._X + avmGet(scope.s, "xspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
        scope.s.y = scope._Y + avmGet(scope.s, "yspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
        scope.s._x = avmGet(scope.s, "x");
        scope.s._y = avmGet(scope.s, "y");
        scope.s.onEnterFrame = function () {
          if (avmGet(_root, "frozen")) {
            return undefined;
          }
          this._xscale += 2;
          this._yscale += 2;
          this._alpha -= 4 - avmCall(Math, "random", []) * 2;
          this.xspeed *= 0.85;
          this.yspeed *= 0.85;
          this.x += avmGet(this, "xspeed");
          this.y += avmGet(this, "yspeed");
          this._x = avmGet(this, "x");
          this._y = avmGet(this, "y");
          if (avmGet(this, "_alpha") <= 0) {
            avmCall(this, "removeMovieClip", []);
          }
        };
        _loc4_ = _loc4_ + 1;
      }
    }
  }
  var _loc3_;
  if (scope.deadly == 0 && !scope.armed) {
    var i = 0;
    while (i < avmGet(_root, "TANKS")) {
      _loc3_ = 0;
      while (_loc3_ < 6.283185) {
        if (avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "base"), {
          x: avmCall(Math, "cos", [_loc3_]) * 25,
          y: avmCall(Math, "sin", [_loc3_]) * 25
        }])) {
          scope.armed = true;
          avmCall(avmGet(_root, "soundMineActivate"), "stop", ["soundMineActivate"]);
          if (avmGet(_root, "soundOn")) {
            avmCall(avmGet(_root, "soundMineArm"), "start", []);
          }
          break;
        }
        _loc3_ += 0.5;
      }
      if (scope.armed) {
        break;
      }
      i++;
    }
  }
  var _loc5_;
  if (scope.armed && !scope.detonating) {
    _loc5_ = false;
    var i = 0;
    while (i < avmGet(_root, "TANKS")) {
      _loc3_ = 0;
      while (_loc3_ < 6.283185) {
        if (avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "base"), {
          x: avmCall(Math, "cos", [_loc3_]) * 25,
          y: avmCall(Math, "sin", [_loc3_]) * 25
        }])) {
          _loc5_ = true;
          break;
        }
        _loc3_ += 0.5;
      }
      if (_loc5_) {
        break;
      }
      i++;
    }
    if (!_loc5_) {
      scope.detonating = true;
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundMineDetonate"), "start", []);
      }
    }
  }
  if (scope.detonating) {
    if (scope.detonateCounter > 0) {
      scope.detonateCounter--;
    }
    if (scope.detonateCounter == 0) {
      avmCall(avmGet(_root, "soundMineDetonate"), "stop", ["soundMineDetonateCharge"]);
      avmCall(scope, "detonate", []);
    }
  }
  if (scope.deadly > 0) {
    scope.deadly--;
  }
  if (scope.deadly == 1) {
    avmCall(scope, "gotoAndStop", [2]);
    if (avmGet(_root, "soundOn")) {
      avmCall(avmGet(_root, "soundMineActivate"), "start", []);
    }
  }
  if (scope.deadly == 0 && !scope.armed) {
    if (scope.hideCounter > 0) {
      scope.hideCounter--;
    }
    if (scope.hideCounter == 0) {
      if (scope._alpha > 0) {
        scope._alpha = scope._alpha - 10;
      }
    }
  } else if (scope.armed) {
    if (scope._alpha < 100) {
      scope._alpha = scope._alpha + 10;
    }
  }
};
}
export function install_rCMissile(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
    return true;
  }
  return false;
}).bind(scope);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  var _loc6_;
  var _loc7_;
  var _loc8_;
  if (avmGet(scope.owner, "alive")) {
    if (avmGet(scope.owner, "mouseTank")) {
      _loc6_ = avmGet(avmGet(avmGet(_root, "game"), "mazemc"), "_xmouse") - scope._X;
      _loc7_ = avmGet(avmGet(avmGet(_root, "game"), "mazemc"), "_ymouse") - scope._Y;
      _loc8_ = avmCall(Math, "sqrt", [avmCall(Math, "pow", [_loc6_, 2]) + avmCall(Math, "pow", [_loc7_, 2])]);
      if (_loc6_ < 0) {
        if (_loc7_ < 0) {
          scope.aimAngle = -3.141593 + avmCall(Math, "atan", [_loc7_ / _loc6_]);
        } else {
          scope.aimAngle = 3.141593 + avmCall(Math, "atan", [_loc7_ / _loc6_]);
        }
      } else if (_loc6_ > 0) {
        scope.aimAngle = avmCall(Math, "atan", [_loc7_ / _loc6_]);
      } else if (_loc7_ < 0) {
        scope.aimAngle = -1.570796;
      } else {
        scope.aimAngle = 1.570796;
      }
      scope._rotation = (scope.aimAngle + 1.570796) * 180 / 3.141593;
    } else {
      if (avmCall(Key, "isDown", [avmGet(scope.owner, "KEYTURNLEFT")])) {
        scope.turnLeft = true;
      } else {
        scope.turnLeft = false;
      }
      if (avmCall(Key, "isDown", [avmGet(scope.owner, "KEYTURNRIGHT")])) {
        scope.turnRight = true;
      } else {
        scope.turnRight = false;
      }
      scope.turnSize = 0;
      if (scope.turnLeft) {
        scope.turnSize = -scope.turnSpeed;
      }
      if (scope.turnRight) {
        scope.turnSize += scope.turnSpeed;
      }
      scope._rotation = scope._rotation + scope.turnSize;
    }
  }
  scope.xSpeed += 0.35 * avmCall(Math, "cos", [(scope._rotation - 90) * 3.141593 / 180]) * avmGet(_root, "REMOTESPEED") / avmGet(_root, "REMOTEHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
  scope.ySpeed += 0.35 * avmCall(Math, "sin", [(scope._rotation - 90) * 3.141593 / 180]) * avmGet(_root, "REMOTESPEED") / avmGet(_root, "REMOTEHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50);
  var _loc3_ = avmCall(Math, "sqrt", [scope.xSpeed * scope.xSpeed + scope.ySpeed * scope.ySpeed]);
  if (_loc3_ > avmGet(_root, "REMOTESPEED") / avmGet(_root, "REMOTEHITCHECKINTERVALS") * (avmGet(_root, "SCALE") / 50)) {
    scope.xSpeed *= avmGet(_root, "REMOTESPEED") / avmGet(_root, "REMOTEHITCHECKINTERVALS") / _loc3_ * (avmGet(_root, "SCALE") / 50);
    scope.ySpeed *= avmGet(_root, "REMOTESPEED") / avmGet(_root, "REMOTEHITCHECKINTERVALS") / _loc3_ * (avmGet(_root, "SCALE") / 50);
  }
  i = 0;
  while (i < avmGet(_root, "REMOTEHITCHECKINTERVALS")) {
    scope.previousX = scope.x;
    scope.previousY = scope.y;
    scope.x += scope.xSpeed;
    scope.y += scope.ySpeed;
    scope._X = scope.x;
    scope._Y = scope.y;
    if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
      x: 0,
      y: 0
    }])) {
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundBounce" + random(2)), "start", []);
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x -= scope.xSpeed;
      scope.y += scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnXInvert = true;
      } else {
        scope.hitOnXInvert = false;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y -= scope.ySpeed;
      scope._X = scope.x;
      scope._Y = scope.y;
      if (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
        x: 0,
        y: 0
      }])) {
        scope.hitOnYInvert = true;
      } else {
        scope.hitOnYInvert = false;
      }
      if (scope.hitOnXInvert && !scope.hitOnYInvert) {
        scope.ySpeed = -scope.ySpeed;
        scope._rotation = 180 - scope._rotation;
      } else if (scope.hitOnYInvert && !scope.hitOnXInvert) {
        scope.xSpeed = -scope.xSpeed;
        scope._rotation = -scope._rotation;
      } else {
        scope.xSpeed = -scope.xSpeed;
        scope.ySpeed = -scope.ySpeed;
        scope._rotation = scope._rotation + 180;
      }
      scope.x = scope.previousX;
      scope.y = scope.previousY;
      scope.x += scope.xSpeed;
      scope.y += scope.ySpeed;
    }
    i++;
  }
  scope._X = scope.x;
  scope._Y = scope.y;
  var i = 0;
  var _loc5_;
  while (i < avmGet(_root, "REMOTESMOKECLOUDS")) {
    _loc5_ = avmCall(avmGet(_root, "game"), "getNextHighestDepth", []);
    avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["remoteSmoke-" + _loc5_, avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    scope.s = avmGet(avmGet(_root, "game"), "remoteSmoke-" + _loc5_);
    if (scope.homing && avmCall(Math, "random", []) > 0.5) {
      avmCall(scope.s, "lineStyle", [4 * (avmGet(_root, "SCALE") / 50), scope.targetColor, 20]);
    } else {
      avmCall(scope.s, "lineStyle", [4 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4) + 6]) * 1118481, 20]);
    }
    avmCall(scope.s, "moveTo", [0, 0]);
    avmCall(scope.s, "lineTo", [0, 1]);
    scope.s.xspeed = -avmGet(this, "xSpeed") + (avmCall(Math, "random", []) - 0.5) * (avmGet(_root, "SCALE") / 50);
    scope.s.yspeed = -avmGet(this, "ySpeed") + (avmCall(Math, "random", []) - 0.5) * (avmGet(_root, "SCALE") / 50);
    _loc3_ = avmCall(Math, "sqrt", [scope.xSpeed * scope.xSpeed + scope.ySpeed * scope.ySpeed]);
    if (isNaN(_loc3_)) {
      _loc3_ = 1;
    }
    scope.s.x = avmGet(this, "_x") + (-8 * avmGet(this, "xSpeed") / _loc3_ + (5 * avmCall(Math, "random", []) - 2.5)) * (avmGet(_root, "SCALE") / 50);
    scope.s.y = avmGet(this, "_y") + (-8 * avmGet(this, "ySpeed") / _loc3_ + (5 * avmCall(Math, "random", []) - 2.5)) * (avmGet(_root, "SCALE") / 50);
    scope.s._x = avmGet(scope.s, "x");
    scope.s._y = avmGet(scope.s, "y");
    scope.s.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this._xscale += 2;
      this._yscale += 2;
      this._alpha -= 4 - avmCall(Math, "random", []) * 4;
      this.xspeed *= 0.95;
      this.yspeed *= 0.95;
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      if (avmGet(this, "_alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    i++;
  }
  if (scope.deadly == 0) {
    var i = 0;
    while (i < avmGet(_root, "TANKS")) {
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + i), "alive") && avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + i), {
        x: 0,
        y: 0
      }])) {
        avmCall(_root, "registerHit", [scope.owner, avmGet(avmGet(_root, "game"), "tank" + i)]);
        scope.owner.remoteControlling = false;
        avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
        avmCall(_root, "destroyTank", [i]);
        avmCall(this, "removeMovieClip", []);
      }
      i++;
    }
  }
  if (scope.deadly > 0) {
    scope.deadly--;
  }
  scope.lifetime--;
  var _loc4_;
  if (scope.lifetime <= 0) {
    scope.owner.remoteControlling = false;
    avmCall(_root, "setWeapon", [scope.owner, "bullet"]);
    if (avmGet(_root, "soundOn")) {
      avmCall(avmGet(_root, "soundPoof"), "start", []);
    }
    _loc4_ = 0;
    while (_loc4_ < avmGet(_root, "NUMBEROFSMOKECLOUDS") * 2) {
      scope.s = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["smokeremotebullet" + avmCall(avmGet(_root, "game"), "getNextHighestDepth", []), avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
      avmCall(scope.s, "lineStyle", [5 * (avmGet(_root, "SCALE") / 50), avmCall(Math, "round", [random(4)]) * 1118481, 10 + random(20)]);
      avmCall(scope.s, "moveTo", [0, 0]);
      avmCall(scope.s, "lineTo", [0, 1]);
      scope.s.xspeed = scope.xSpeed * avmGet(_root, "REMOTEHITCHECKINTERVALS") + 0.5 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.yspeed = scope.ySpeed * avmGet(_root, "REMOTEHITCHECKINTERVALS") + 0.5 * (avmCall(Math, "random", []) * 8 - 4) * (avmGet(_root, "SCALE") / 50);
      scope.s.x = scope._X;
      scope.s.y = scope._Y;
      scope.s._x = avmGet(scope.s, "x");
      scope.s._y = avmGet(scope.s, "y");
      scope.s.hitCheck = function (mc, point) {
        avmCall(this, "localToGlobal", [point]);
        if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), true])) {
          return true;
        }
        return false;
      };
      scope.s.onEnterFrame = function () {
        if (avmGet(_root, "frozen")) {
          return undefined;
        }
        this._xscale += 2;
        this._yscale += 2;
        this._alpha -= 15 - avmCall(Math, "random", []) * 2;
        this.xspeed *= 0.93;
        this.yspeed *= 0.93;
        this.x += avmGet(this, "xspeed");
        this.y += avmGet(this, "yspeed");
        this._x = avmGet(this, "x");
        this._y = avmGet(this, "y");
        if (avmCall(this, "hitCheck", [avmGet(avmGet(_root, "game"), "mazemc"), {
          x: 0,
          y: 0
        }])) {
          this.xspeed *= 0.25;
          this.yspeed *= 0.25;
        }
        if (avmGet(this, "_alpha") <= 0) {
          avmCall(this, "removeMovieClip", []);
        }
      };
      _loc4_ = _loc4_ + 1;
    }
    avmCall(this, "removeMovieClip", []);
  }
};
}
export function install_rCSignal(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.updateSignalPosAndRot = (function updateSignalPosAndRot() {
  if (avmGet(scope.sourceMC, "_x") != undefined) {
    scope._X = avmGet(scope.sourceMC, "_x") + avmCall(Math, "cos", [(avmGet(scope.sourceMC, "_rotation") - 90) * 3.141593 / 180]) * scope.signalOffsetX * (avmGet(_root, "SCALE") / 50);
    scope._Y = avmGet(scope.sourceMC, "_y") + avmCall(Math, "sin", [(avmGet(scope.sourceMC, "_rotation") - 90) * 3.141593 / 180]) * scope.signalOffsetX * (avmGet(_root, "SCALE") / 50);
  }
  var _loc4_;
  var _loc2_;
  var _loc3_;
  var _loc5_;
  if (avmGet(scope.sourceMC, "_x") != undefined && avmGet(scope.targetMC, "_x") != undefined) {
    _loc4_ = 0;
    _loc2_ = avmGet(scope.targetMC, "_x") - avmGet(scope.sourceMC, "_x");
    _loc3_ = avmGet(scope.targetMC, "_y") - avmGet(scope.sourceMC, "_y");
    _loc5_ = avmCall(Math, "sqrt", [avmCall(Math, "pow", [_loc2_, 2]) + avmCall(Math, "pow", [_loc3_, 2])]);
    if (_loc2_ < 0) {
      if (_loc3_ < 0) {
        _loc4_ = -3.141593 + avmCall(Math, "atan", [_loc3_ / _loc2_]);
      } else {
        _loc4_ = 3.141593 + avmCall(Math, "atan", [_loc3_ / _loc2_]);
      }
    } else if (_loc2_ > 0) {
      _loc4_ = avmCall(Math, "atan", [_loc3_ / _loc2_]);
    } else if (_loc3_ < 0) {
      _loc4_ = -1.570796;
    } else {
      _loc4_ = 1.570796;
    }
    scope._rotation = _loc4_ * 180 / 3.141593;
    scope.signalSize = avmCall(Math, "min", [avmGet(_root, "REMOTESIGNALSIZE"), _loc5_]);
  }
}).bind(scope);
scope.angleSize = 1.570796;
scope.signalColors = new Array(scope.signalColor, scope.signalColor, scope.signalColor, scope.signalColor, scope.signalColor, scope.signalColor, scope.signalColor, scope.signalColor, scope.signalColor, scope.signalColor, scope.signalColor);
scope.signalAlphas = new Array(0, 0, 80, 0, 0, 80, 0, 0, 80, 0, 0);
scope.signalFractions = new Array(0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 250);
scope.signalSize = avmGet(_root, "REMOTESIGNALSIZE");
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  if (scope.initialDelay > 0) {
    scope.initialDelay--;
    return undefined;
  }
  if (!avmGet(scope.owner, "alive") || avmGet(scope.sourceMC, "_x") == undefined || avmGet(scope.targetMC, "_x") == undefined) {
    scope.angleSize -= 0.1;
    scope._alpha = scope._alpha - 10;
    if (scope._alpha <= 0) {
      avmCall(this, "removeMovieClip", []);
    }
  }
  avmCall(scope, "updateSignalPosAndRot", []);
  avmCall(scope, "clear", []);
  avmCall(scope, "lineStyle", [1, 0, 0]);
  if (scope.outgoing) {
    if (avmGet(scope.signalFractions, 9) > 10 && avmGet(scope.signalFractions, 9) < 15) {
      if (avmGet(_root, "soundOn")) {
        avmCall(avmGet(_root, "soundRemoteSignal"), "start", []);
      }
    }
    scope.signalFractions[9] += 5;
    if (avmGet(scope.signalFractions, 9) > 10) {
      scope.signalFractions[8] += 5;
    }
    if (avmGet(scope.signalFractions, 8) > 10) {
      scope.signalFractions[7] += 5;
      scope.signalAlphas[8] -= 3;
    }
    if (avmGet(scope.signalFractions, 7) > 20) {
      scope.signalFractions[6] += 5;
    }
    if (avmGet(scope.signalFractions, 6) > 10) {
      scope.signalFractions[5] += 5;
    }
    if (avmGet(scope.signalFractions, 5) > 10) {
      scope.signalFractions[4] += 5;
      scope.signalAlphas[5] -= 3;
    }
    if (avmGet(scope.signalFractions, 4) > 20) {
      scope.signalFractions[3] += 5;
    }
    if (avmGet(scope.signalFractions, 3) > 10) {
      scope.signalFractions[2] += 5;
    }
    if (avmGet(scope.signalFractions, 2) > 10) {
      scope.signalFractions[1] += 5;
      scope.signalAlphas[2] -= 3;
    }
    if (avmGet(scope.signalFractions, 1) > 130) {
      scope.signalFractions[9] = 1;
      scope.signalFractions[8] = 1;
      scope.signalFractions[7] = 1;
      scope.signalFractions[6] = 1;
      scope.signalFractions[5] = 1;
      scope.signalFractions[4] = 1;
      scope.signalFractions[3] = 1;
      scope.signalFractions[2] = 1;
      scope.signalFractions[1] = 1;
      scope.signalAlphas[2] = 80;
      scope.signalAlphas[5] = 80;
      scope.signalAlphas[8] = 80;
    }
  } else {
    scope.signalFractions[1] = avmCall(Math, "max", [0, avmGet(scope.signalFractions, 1) - 5]);
    if (avmGet(scope.signalFractions, 1) < 121) {
      scope.signalFractions[2] = avmCall(Math, "max", [0, avmGet(scope.signalFractions, 2) - 5]);
    }
    if (avmGet(scope.signalFractions, 2) < 121) {
      scope.signalFractions[3] = avmCall(Math, "max", [0, avmGet(scope.signalFractions, 3) - 5]);
      scope.signalAlphas[2] = avmCall(Math, "min", [80, avmGet(scope.signalAlphas, 2) + 3]);
    }
    if (avmGet(scope.signalFractions, 3) < 111) {
      scope.signalFractions[4] = avmCall(Math, "max", [0, avmGet(scope.signalFractions, 4) - 5]);
    }
    if (avmGet(scope.signalFractions, 4) < 121) {
      scope.signalFractions[5] = avmCall(Math, "max", [0, avmGet(scope.signalFractions, 5) - 5]);
    }
    if (avmGet(scope.signalFractions, 5) < 121) {
      scope.signalFractions[6] = avmCall(Math, "max", [0, avmGet(scope.signalFractions, 6) - 5]);
      scope.signalAlphas[5] = avmCall(Math, "min", [80, avmGet(scope.signalAlphas, 5) + 3]);
    }
    if (avmGet(scope.signalFractions, 6) < 111) {
      scope.signalFractions[7] = avmCall(Math, "max", [0, avmGet(scope.signalFractions, 7) - 5]);
    }
    if (avmGet(scope.signalFractions, 7) < 121) {
      scope.signalFractions[8] = avmCall(Math, "max", [0, avmGet(scope.signalFractions, 8) - 5]);
    }
    if (avmGet(scope.signalFractions, 8) < 121) {
      scope.signalFractions[9] = avmCall(Math, "max", [0, avmGet(scope.signalFractions, 9) - 5]);
      scope.signalAlphas[8] = avmCall(Math, "min", [80, avmGet(scope.signalAlphas, 8) + 3]);
    }
    if (avmGet(scope.signalFractions, 9) < 1) {
      scope.signalFractions[9] = 130;
      scope.signalFractions[8] = 130;
      scope.signalFractions[7] = 130;
      scope.signalFractions[6] = 130;
      scope.signalFractions[5] = 130;
      scope.signalFractions[4] = 130;
      scope.signalFractions[3] = 130;
      scope.signalFractions[2] = 130;
      scope.signalFractions[1] = 130;
      scope.signalAlphas[2] = 0;
      scope.signalAlphas[5] = 0;
      scope.signalAlphas[8] = 0;
    }
  }
  avmCall(scope, "beginGradientFill", ["radial", scope.signalColors, scope.signalAlphas, scope.signalFractions, {
    matrixType: "box",
    x: -2 * scope.signalSize * (avmGet(_root, "SCALE") / 50),
    y: -2 * scope.signalSize * (avmGet(_root, "SCALE") / 50),
    w: 4 * scope.signalSize * (avmGet(_root, "SCALE") / 50),
    h: 4 * scope.signalSize * (avmGet(_root, "SCALE") / 50),
    r: 0
  }]);
  avmCall(scope, "moveTo", [0, 0]);
  scope.angle = scope.angleSize / 2;
  while (scope.angle > -scope.angleSize / 2) {
    avmCall(scope, "lineTo", [avmCall(Math, "cos", [scope.angle]) * scope.signalSize * (avmGet(_root, "SCALE") / 50), avmCall(Math, "sin", [scope.angle]) * scope.signalSize * (avmGet(_root, "SCALE") / 50)]);
    scope.angle -= 0.2;
  }
  avmCall(scope, "lineTo", [avmCall(Math, "cos", [-scope.angleSize / 2]) * scope.signalSize * (avmGet(_root, "SCALE") / 50), avmCall(Math, "sin", [-scope.angleSize / 2]) * scope.signalSize * (avmGet(_root, "SCALE") / 50)]);
  avmCall(scope, "lineTo", [0, 0]);
  avmCall(scope, "endFill", []);
};
}
export function install_shield(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.repulseBullet = (function repulseBullet(bullet) {
  var _loc5_ = {
    x: avmGet(bullet, "x"),
    y: avmGet(bullet, "y")
  };
  avmCall(avmGet(_root, "game"), "localToGlobal", [_loc5_]);
  var _loc3_;
  var _loc7_;
  var _loc4_;
  var _loc8_;
  var _loc6_;
  if (avmCall(scope, "hitTest", [avmGet(_loc5_, "x"), avmGet(_loc5_, "y"), true]) && scope.targetSize > 0) {
    _loc3_ = {
      x: scope._X - avmGet(bullet, "x"),
      y: scope._Y - avmGet(bullet, "y")
    };
    _loc7_ = avmGet(_loc3_, "x") * avmGet(bullet, "xSpeed") + avmGet(_loc3_, "y") * avmGet(bullet, "ySpeed");
    if (_loc7_ > 0) {
      bullet.xSpeed = -avmGet(bullet, "xSpeed");
      bullet.ySpeed = -avmGet(bullet, "ySpeed");
      _loc4_ = {
        x: avmGet(_loc3_, "y"),
        y: -avmGet(_loc3_, "x")
      };
      _loc8_ = avmGet(_loc4_, "x") * avmGet(_loc4_, "x") + avmGet(_loc4_, "y") * avmGet(_loc4_, "y");
      _loc6_ = (avmGet(bullet, "xSpeed") * avmGet(_loc4_, "x") + avmGet(bullet, "ySpeed") * avmGet(_loc4_, "y")) / _loc8_;
      bullet.xSpeed -= 2 * avmGet(_loc4_, "x") * _loc6_;
      bullet.ySpeed -= 2 * avmGet(_loc4_, "y") * _loc6_;
      scope.targetSize -= 10;
      avmGet(scope.layers, scope.hitCount).x = -avmGet(_loc3_, "x");
      avmGet(scope.layers, scope.hitCount).y = -avmGet(_loc3_, "y");
      scope.hitCount++;
      avmCall(scope.shieldGraphic, "impact", [scope._X - avmGet(_loc3_, "x"), scope._Y - avmGet(_loc3_, "y"), scope.hitCount]);
    }
  }
}).bind(scope);
scope.shieldGraphic = avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "attachMovie", ["shieldGraphic", "shieldGraphic-" + avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", []), avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
scope.shieldGraphic.owner = scope.owner;
scope.shieldGraphic.shield = this;
scope.size = 0;
scope.waveColors = new Array(16777215, 16777215, 16777215, 16777215, 16777215);
scope.waveAlphas = new Array(0, 0, 80, 0, 0);
scope.waveFractions = new Array(0, 1, 2, 3, 250);
scope.layerColors = new Array(scope.shieldColor, scope.shieldColor, scope.shieldColor, scope.shieldColor, scope.shieldColor);
scope.layerAlphas = new Array(0, 0, 70, 30, 30);
scope.layers = new Array();
scope.hitCount = 0;
scope.outside = 2 * avmGet(_root, "SHIELDSIZE") * (avmGet(_root, "SCALE") / 50);
avmCall(scope.layers, "push", [{
  x: scope.outside,
  y: scope.outside,
  fractions: new Array(0, 1, 2, 3, 250)
}]);
avmCall(scope.layers, "push", [{
  x: scope.outside,
  y: scope.outside,
  fractions: new Array(0, 1, 2, 3, 250)
}]);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  if (!avmGet(scope.owner, "alive")) {
    scope.owner.equipment = undefined;
    scope.owner.currentEquipment = "";
    avmCall(this, "removeMovieClip", []);
  }
  avmCall(scope, "clear", []);
  avmCall(scope, "lineStyle", [scope.size * (avmGet(_root, "SCALE") / 50)]);
  var _loc3_ = 0;
  while (_loc3_ < avmGet(scope.layers, "length")) {
    if (_loc3_ < scope.hitCount) {
      if (avmGet(avmGet(avmGet(scope.layers, _loc3_), "fractions"), 1) <= 140) {
        avmGet(avmGet(scope.layers, _loc3_), "fractions")[3] += 15;
        if (avmGet(avmGet(avmGet(scope.layers, _loc3_), "fractions"), 3) > 18) {
          avmGet(avmGet(scope.layers, _loc3_), "fractions")[2] += 15;
        }
        if (avmGet(avmGet(avmGet(scope.layers, _loc3_), "fractions"), 2) > 17) {
          avmGet(avmGet(scope.layers, _loc3_), "fractions")[1] += 15;
        }
      }
    }
    avmCall(scope, "lineGradientStyle", ["radial", scope.layerColors, scope.layerAlphas, avmGet(avmGet(scope.layers, _loc3_), "fractions"), {
      matrixType: "box",
      x: -2 * avmGet(_root, "SHIELDSIZE") * (avmGet(_root, "SCALE") / 50) + avmGet(avmGet(scope.layers, _loc3_), "x"),
      y: -2 * avmGet(_root, "SHIELDSIZE") * (avmGet(_root, "SCALE") / 50) + avmGet(avmGet(scope.layers, _loc3_), "y"),
      w: 4 * avmGet(_root, "SHIELDSIZE") * (avmGet(_root, "SCALE") / 50),
      h: 4 * avmGet(_root, "SHIELDSIZE") * (avmGet(_root, "SCALE") / 50),
      r: 0
    }]);
    avmCall(scope, "moveTo", [0, 0]);
    avmCall(scope, "lineTo", [1, 0]);
    _loc3_ = _loc3_ + 1;
  }
  scope.waveFractions[3] += 2;
  if (avmGet(scope.waveFractions, 3) > 15) {
    scope.waveFractions[2] += 2;
  }
  if (avmGet(scope.waveFractions, 2) > 15) {
    scope.waveFractions[1] += 2;
  }
  if (avmGet(scope.waveFractions, 1) > 60) {
    scope.waveFractions[3] = 3;
    scope.waveFractions[2] = 2;
    scope.waveFractions[1] = 1;
  }
  avmCall(scope, "lineGradientStyle", ["radial", scope.waveColors, scope.waveAlphas, scope.waveFractions, {
    matrixType: "box",
    x: -2 * avmGet(_root, "SHIELDSIZE") * (avmGet(_root, "SCALE") / 50),
    y: -2 * avmGet(_root, "SHIELDSIZE") * (avmGet(_root, "SCALE") / 50),
    w: 4 * avmGet(_root, "SHIELDSIZE") * (avmGet(_root, "SCALE") / 50),
    h: 4 * avmGet(_root, "SHIELDSIZE") * (avmGet(_root, "SCALE") / 50),
    r: 0
  }]);
  avmCall(scope, "moveTo", [0, 0]);
  avmCall(scope, "lineTo", [1, 0]);
  if (scope.hitCount >= 2) {
    scope.targetSize = 0;
    scope.waveAlphas[2] = avmCall(Math, "max", [avmGet(scope.waveAlphas, 2) - 10, 0]);
  }
  if (scope.targetSize > scope.size) {
    scope.size += 2;
  }
  if (scope.targetSize < scope.size) {
    scope.size -= 2;
  }
  if (scope.targetSize == 0) {
    scope.size -= 2;
  }
  if (scope.size <= 0) {
    scope.owner.equipment = undefined;
    scope.owner.currentEquipment = "";
    avmCall(this, "removeMovieClip", []);
  }
};
}
export function install_shieldGraphic(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.init = (function init() {
  scope.inited = true;
  scope.center = {
    x: avmGet(scope.owner, "x"),
    y: avmGet(scope.owner, "y")
  };
  var _loc2_ = {
    x: 0,
    y: 0
  };
  scope.hexagons = new Array(scope.SIZE);
  var _loc3_ = 0;
  while (_loc3_ < scope.SIZE) {
    scope.hexagons[_loc3_] = new Array(scope.SIZE);
    _loc3_ = _loc3_ + 1;
  }
  _loc3_ = 0;
  var _loc1_;
  while (_loc3_ < scope.SIZE) {
    _loc1_ = 0;
    while (_loc1_ < scope.SIZE) {
      _loc2_.x = avmGet(scope.center, "x") - (scope.SIZE - 1) / 2 * scope.HEXSIZE + _loc3_ * scope.HEXSIZE + (_loc1_ % 2 != 1 ? -scope.HEXSIZE / 4 : scope.HEXSIZE / 4);
      _loc2_.y = avmGet(scope.center, "y") - (scope.SIZE - 1) / 2 * (scope.HEXSIZE * 0.85) + _loc1_ * (scope.HEXSIZE * 0.85);
      avmGet(scope.hexagons, _loc3_)[_loc1_] = {
        x: avmGet(_loc2_, "x"),
        y: avmGet(_loc2_, "y"),
        size: 0,
        shake: 0,
        impactNum: 0
      };
      _loc1_ = _loc1_ + 1;
    }
    _loc3_ = _loc3_ + 1;
  }
}).bind(scope);
scope.impact = (function impact(x, y, impactNum) {
  var _loc7_ = 10000;
  var _loc11_;
  var _loc6_ = 0;
  var _loc4_;
  var _loc3_;
  var _loc5_;
  while (_loc6_ < scope.SIZE) {
    _loc4_ = 0;
    while (_loc4_ < scope.SIZE) {
      _loc3_ = avmGet(avmGet(scope.hexagons, _loc6_), _loc4_);
      _loc5_ = (avmGet(_loc3_, "x") - x) * (avmGet(_loc3_, "x") - x) + (avmGet(_loc3_, "y") - y) * (avmGet(_loc3_, "y") - y);
      if (_loc5_ < _loc7_) {
        _loc7_ = _loc5_;
        _loc11_ = _loc3_;
      }
      _loc4_ = _loc4_ + 1;
    }
    _loc6_ = _loc6_ + 1;
  }
  _loc11_.shake = 5;
  _loc11_.impactNum = impactNum;
  var _loc8_ = 0;
  var _loc9_;
  var _loc10_;
  while (_loc8_ < 50) {
    scope.p = avmCall(avmGet(_root, "game"), "createEmptyMovieClip", ["particle-" + avmCall(avmGet(_root, "game"), "getNextHighestDepth", []), avmCall(avmGet(_root, "game"), "getNextHighestDepth", [])]);
    _loc9_ = avmCall(Math, "random", []) * 360;
    _loc10_ = 3 * (0.5 + 2 * avmCall(Math, "random", [])) * (avmGet(_root, "SCALE") / 50);
    avmCall(scope.p, "lineStyle", [(avmCall(Math, "random", []) * 2 + 1) * (avmGet(_root, "SCALE") / 50), scope.shieldColor]);
    avmCall(scope.p, "moveTo", [0, 0]);
    avmCall(scope.p, "lineTo", [1, 0]);
    scope.p.xspeed = avmCall(Math, "cos", [_loc9_]) * _loc10_;
    scope.p.yspeed = avmCall(Math, "sin", [_loc9_]) * _loc10_;
    scope.p.x = x + avmGet(scope.p, "xspeed");
    scope.p.y = y + avmGet(scope.p, "yspeed");
    scope.p._x = avmGet(scope.p, "x");
    scope.p._y = avmGet(scope.p, "y");
    scope.p.lifetime = 12;
    scope.p.alpha = 20;
    scope.p.onEnterFrame = function () {
      if (avmGet(_root, "frozen")) {
        return undefined;
      }
      this.x += avmGet(this, "xspeed");
      this.y += avmGet(this, "yspeed");
      this._x = avmGet(this, "x");
      this._y = avmGet(this, "y");
      this._alpha = avmGet(this, "alpha");
      this.xspeed *= 0.9;
      this.yspeed *= 0.9;
      this.lifetime = avmGet(this, "lifetime") - 1;
      if (avmGet(this, "lifetime") <= 0) {
        this.alpha -= 2;
      }
      if (avmGet(this, "alpha") <= 0) {
        avmCall(this, "removeMovieClip", []);
      }
    };
    _loc8_ = _loc8_ + 1;
  }
}).bind(scope);
scope.hexagons = undefined;
scope.firstRowEven = true;
scope.inited = false;
scope.center = undefined;
scope.shieldColor = avmGet(scope.shield, "shieldColor");
scope.SIZE = 8;
scope.HEXSIZE = 20 * (avmGet(_root, "SCALE") / 50);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  if (!scope.inited) {
    return undefined;
  }
  var _loc8_ = 0;
  var _loc5_;
  var _loc2_;
  var _loc3_;
  while (_loc8_ < scope.SIZE) {
    _loc5_ = 0;
    while (_loc5_ < scope.SIZE) {
      _loc2_ = avmGet(avmGet(scope.hexagons, _loc8_), _loc5_);
      avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "localToGlobal", [_loc2_]);
      if (avmCall(scope.shield, "hitTest", [avmGet(_loc2_, "x"), avmGet(_loc2_, "y"), true])) {
        avmCall(avmGet(_root, "game"), "globalToLocal", [_loc2_]);
        _loc2_.size = avmCall(Math, "min", [avmGet(_loc2_, "size") + 0.2 * scope.HEXSIZE, scope.HEXSIZE]);
      } else {
        avmCall(avmGet(_root, "game"), "globalToLocal", [_loc2_]);
        _loc2_.size = avmCall(Math, "max", [avmGet(_loc2_, "size") - 0.1 * scope.HEXSIZE, 0]);
      }
      _loc2_.shake = avmCall(Math, "max", [avmGet(_loc2_, "shake") - 1, 0]);
      if (avmGet(_loc2_, "shake") > 0 && avmGet(_loc2_, "shake") < 3) {
        if (avmGet(avmGet(avmGet(scope.hexagons, _loc8_ - 1), _loc5_), "impactNum") < avmGet(_loc2_, "impactNum")) {
          avmGet(avmGet(scope.hexagons, _loc8_ - 1), _loc5_).shake = 5;
          avmGet(avmGet(scope.hexagons, _loc8_ - 1), _loc5_).impactNum = avmGet(_loc2_, "impactNum");
        }
        if (avmGet(avmGet(avmGet(scope.hexagons, _loc8_ + 1), _loc5_), "impactNum") < avmGet(_loc2_, "impactNum")) {
          avmGet(avmGet(scope.hexagons, _loc8_ + 1), _loc5_).shake = 5;
          avmGet(avmGet(scope.hexagons, _loc8_ + 1), _loc5_).impactNum = avmGet(_loc2_, "impactNum");
        }
        _loc3_ = _loc5_ % 2 != (!scope.firstRowEven ? 0 : 1) ? -1 : 0;
        if (avmGet(avmGet(avmGet(scope.hexagons, _loc8_ + _loc3_), _loc5_ - 1), "impactNum") < avmGet(_loc2_, "impactNum")) {
          avmGet(avmGet(scope.hexagons, _loc8_ + _loc3_), _loc5_ - 1).shake = 5;
          avmGet(avmGet(scope.hexagons, _loc8_ + _loc3_), _loc5_ - 1).impactNum = avmGet(_loc2_, "impactNum");
        }
        if (avmGet(avmGet(avmGet(scope.hexagons, _loc8_ + 1 + _loc3_), _loc5_ - 1), "impactNum") < avmGet(_loc2_, "impactNum")) {
          avmGet(avmGet(scope.hexagons, _loc8_ + 1 + _loc3_), _loc5_ - 1).shake = 5;
          avmGet(avmGet(scope.hexagons, _loc8_ + 1 + _loc3_), _loc5_ - 1).impactNum = avmGet(_loc2_, "impactNum");
        }
        if (avmGet(avmGet(avmGet(scope.hexagons, _loc8_ + _loc3_), _loc5_ + 1), "impactNum") < avmGet(_loc2_, "impactNum")) {
          avmGet(avmGet(scope.hexagons, _loc8_ + _loc3_), _loc5_ + 1).shake = 5;
          avmGet(avmGet(scope.hexagons, _loc8_ + _loc3_), _loc5_ + 1).impactNum = avmGet(_loc2_, "impactNum");
        }
        if (avmGet(avmGet(avmGet(scope.hexagons, _loc8_ + 1 + _loc3_), _loc5_ + 1), "impactNum") < avmGet(_loc2_, "impactNum")) {
          avmGet(avmGet(scope.hexagons, _loc8_ + 1 + _loc3_), _loc5_ + 1).shake = 5;
          avmGet(avmGet(scope.hexagons, _loc8_ + 1 + _loc3_), _loc5_ + 1).impactNum = avmGet(_loc2_, "impactNum");
        }
      }
      _loc5_ = _loc5_ + 1;
    }
    _loc8_ = _loc8_ + 1;
  }
  var _loc11_;
  var _loc12_;
  if (avmGet(scope.owner, "x") - avmGet(scope.center, "x") >= scope.HEXSIZE) {
    _loc11_ = avmCall(scope.hexagons, "shift", []);
    scope.hexagons[scope.SIZE - 1] = _loc11_;
    _loc5_ = 0;
    while (_loc5_ < scope.SIZE) {
      avmGet(avmGet(scope.hexagons, scope.SIZE - 1), _loc5_).x = avmGet(avmGet(avmGet(scope.hexagons, scope.SIZE - 2), _loc5_), "x") + scope.HEXSIZE;
      avmGet(avmGet(scope.hexagons, scope.SIZE - 1), _loc5_).y = avmGet(avmGet(avmGet(scope.hexagons, scope.SIZE - 2), _loc5_), "y");
      avmGet(avmGet(scope.hexagons, scope.SIZE - 1), _loc5_).size = 0;
      avmGet(avmGet(scope.hexagons, scope.SIZE - 1), _loc5_).shake = 0;
      _loc5_ = _loc5_ + 1;
    }
    scope.center.x += scope.HEXSIZE;
  } else if (avmGet(scope.owner, "x") - avmGet(scope.center, "x") <= -scope.HEXSIZE) {
    _loc12_ = avmCall(scope.hexagons, "pop", []);
    avmCall(scope.hexagons, "unshift", [_loc12_]);
    _loc5_ = 0;
    while (_loc5_ < scope.SIZE) {
      avmGet(avmGet(scope.hexagons, 0), _loc5_).x = avmGet(avmGet(avmGet(scope.hexagons, 1), _loc5_), "x") - scope.HEXSIZE;
      avmGet(avmGet(scope.hexagons, 0), _loc5_).y = avmGet(avmGet(avmGet(scope.hexagons, 1), _loc5_), "y");
      avmGet(avmGet(scope.hexagons, 0), _loc5_).size = 0;
      avmGet(avmGet(scope.hexagons, 0), _loc5_).shake = 0;
      _loc5_ = _loc5_ + 1;
    }
    scope.center.x -= scope.HEXSIZE;
  }
  var _loc9_;
  var _loc10_;
  if (avmGet(scope.owner, "y") - avmGet(scope.center, "y") >= scope.HEXSIZE * 0.85) {
    _loc8_ = 0;
    while (_loc8_ < scope.SIZE) {
      _loc9_ = avmCall(avmGet(scope.hexagons, _loc8_), "shift", []);
      avmGet(scope.hexagons, _loc8_)[scope.SIZE - 1] = _loc9_;
      avmGet(avmGet(scope.hexagons, _loc8_), scope.SIZE - 1).x = avmGet(avmGet(avmGet(scope.hexagons, _loc8_), scope.SIZE - 2), "x") + (scope.SIZE % 2 != (!scope.firstRowEven ? 0 : 1) ? -scope.HEXSIZE / 2 : scope.HEXSIZE / 2);
      avmGet(avmGet(scope.hexagons, _loc8_), scope.SIZE - 1).y = avmGet(avmGet(avmGet(scope.hexagons, _loc8_), scope.SIZE - 2), "y") + scope.HEXSIZE * 0.85;
      avmGet(avmGet(scope.hexagons, _loc8_), scope.SIZE - 1).size = 0;
      avmGet(avmGet(scope.hexagons, _loc8_), scope.SIZE - 1).shake = 0;
      _loc8_ = _loc8_ + 1;
    }
    scope.center.y += scope.HEXSIZE * 0.85;
    scope.firstRowEven = !scope.firstRowEven;
  } else if (avmGet(scope.owner, "y") - avmGet(scope.center, "y") <= -scope.HEXSIZE * 0.85) {
    _loc8_ = 0;
    while (_loc8_ < scope.SIZE) {
      _loc10_ = avmCall(avmGet(scope.hexagons, _loc8_), "pop", []);
      avmCall(avmGet(scope.hexagons, _loc8_), "unshift", [_loc10_]);
      avmGet(avmGet(scope.hexagons, _loc8_), 0).x = avmGet(avmGet(avmGet(scope.hexagons, _loc8_), 1), "x") + (!scope.firstRowEven ? -scope.HEXSIZE / 2 : scope.HEXSIZE / 2);
      avmGet(avmGet(scope.hexagons, _loc8_), 0).y = avmGet(avmGet(avmGet(scope.hexagons, _loc8_), 1), "y") - scope.HEXSIZE * 0.85;
      avmGet(avmGet(scope.hexagons, _loc8_), 0).size = 0;
      avmGet(avmGet(scope.hexagons, _loc8_), 0).shake = 0;
      _loc8_ = _loc8_ + 1;
    }
    scope.center.y -= scope.HEXSIZE * 0.85;
    scope.firstRowEven = !scope.firstRowEven;
  }
  avmCall(scope, "clear", []);
  _loc8_ = 0;
  var _loc6_;
  var _loc7_;
  var _loc4_;
  while (_loc8_ < scope.SIZE) {
    _loc5_ = 0;
    while (_loc5_ < scope.SIZE) {
      _loc2_ = avmGet(avmGet(scope.hexagons, _loc8_), _loc5_);
      avmCall(scope, "lineStyle", [1, 5592405, 50]);
      avmCall(scope, "beginFill", [scope.shieldColor, 50]);
      _loc6_ = avmCall(Math, "random", []) * (avmGet(_root, "SCALE") / 50) - avmGet(_root, "SCALE") / 50 / 2;
      _loc7_ = avmCall(Math, "random", []) * (avmGet(_root, "SCALE") / 50) - avmGet(_root, "SCALE") / 50 / 2;
      avmCall(scope, "moveTo", [avmGet(_loc2_, "x") + avmGet(_loc2_, "shake") * _loc6_, avmGet(_loc2_, "y") + avmGet(_loc2_, "shake") * _loc7_ + avmGet(_loc2_, "size") / 2]);
      _loc4_ = 0;
      while (_loc4_ < 7) {
        avmCall(scope, "lineTo", [avmGet(_loc2_, "x") + avmGet(_loc2_, "shake") * _loc6_ + avmCall(Math, "sin", [_loc4_ / 6 * 2 * 3.141593]) * avmGet(_loc2_, "size") / 2, avmGet(_loc2_, "y") + avmGet(_loc2_, "shake") * _loc7_ + avmCall(Math, "cos", [_loc4_ / 6 * 2 * 3.141593]) * avmGet(_loc2_, "size") / 2]);
        _loc4_ = _loc4_ + 1;
      }
      _loc5_ = _loc5_ + 1;
    }
    _loc8_ = _loc8_ + 1;
  }
};
}
export function install_crate(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;
scope.hitCheck = (function hitCheck(mc, point) {
  avmCall(scope, "localToGlobal", [point]);
  if (avmCall(mc, "hitTest", [avmGet(point, "x"), avmGet(point, "y"), false])) {
    return true;
  }
  return false;
}).bind(scope);
scope.onEnterFrame = function () {
  if (avmGet(_root, "frozen")) {
    return undefined;
  }
  var _loc3_ = 0;
  while (_loc3_ < avmGet(_root, "TANKS")) {
    if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "alive") && (avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + _loc3_), {
      x: -10,
      y: -10
    }]) || avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + _loc3_), {
      x: -10,
      y: 10
    }]) || avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + _loc3_), {
      x: 10,
      y: 10
    }]) || avmCall(scope, "hitCheck", [avmGet(avmGet(_root, "game"), "tank" + _loc3_), {
      x: 10,
      y: -10
    }]))) {
      if (avmGet(avmGet(avmGet(_root, "game"), "tank" + _loc3_), "currentWeapon") == "bullet") {
        if (avmGet(_root, "soundOn")) {
          avmCall(avmGet(_root, "soundClick"), "start", []);
        }
        avmCall(_root, "setWeapon", [avmGet(avmGet(_root, "game"), "tank" + _loc3_), scope.weapon]);
        _root.numberOfCrates = avmGet(_root, "numberOfCrates") - 1;
        avmGet(avmGet(_root, "reachable"), scope.pos).used = false;
        avmCall(this, "removeMovieClip", []);
      }
    }
    _loc3_ = _loc3_ + 1;
  }
  scope._xscale = scope._xscale + scope.scaleSpeed;
  scope._yscale = scope._yscale + scope.scaleSpeed;
  if (scope._xscale > scope.targetScale) {
    scope.scaleSpeed -= scope.scaleSpeedDiff;
  }
  var _loc4_;
  if (scope._xscale - scope.targetScale < 0 && scope.scaleSpeed < 0 && !scope.landed) {
    if (avmGet(_root, "soundOn")) {
      avmCall(avmGet(_root, "soundCrateLand"), "start", []);
    }
    scope.rotSpeed = 0;
    scope.scaleSpeed = 0;
    scope._xscale = scope.targetScale;
    scope._yscale = scope.targetScale;
    scope.landed = true;
    _loc4_ = 0;
    while (_loc4_ < avmGet(_root, "NUMBEROFDUSTCLOUDS")) {
      avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "createEmptyMovieClip", ["dust" + avmGet(_root, "numberOfCrates") + "-" + _loc4_, avmCall(avmGet(avmGet(_root, "game"), "mazebg"), "getNextHighestDepth", [])]);
      scope.s = avmGet(avmGet(avmGet(_root, "game"), "mazebg"), "dust" + avmGet(_root, "numberOfCrates") + "-" + _loc4_);
      avmCall(this, "swapDepths", [scope.s]);
      avmCall(scope.s, "lineStyle", [10 * (avmGet(_root, "SCALE") / 50), 11184810, 40 + random(20)]);
      avmCall(scope.s, "moveTo", [0, 0]);
      avmCall(scope.s, "lineTo", [0, 1]);
      scope.s.xspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
      scope.s.yspeed = (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
      scope.s.x = scope._X + avmGet(scope.s, "xspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
      scope.s.y = scope._Y + avmGet(scope.s, "yspeed") * (avmCall(Math, "random", []) * 3 + 1) + (avmCall(Math, "random", []) * 2 - 1) * (avmGet(_root, "SCALE") / 50);
      scope.s._x = avmGet(scope.s, "x");
      scope.s._y = avmGet(scope.s, "y");
      scope.s.onEnterFrame = function () {
        if (avmGet(_root, "frozen")) {
          return undefined;
        }
        this._xscale += 2;
        this._yscale += 2;
        this._alpha -= 4 - avmCall(Math, "random", []) * 2;
        this.xspeed *= 0.85;
        this.yspeed *= 0.85;
        this.x += avmGet(this, "xspeed");
        this.y += avmGet(this, "yspeed");
        this._x = avmGet(this, "x");
        this._y = avmGet(this, "y");
        if (avmGet(this, "_alpha") <= 0) {
          avmCall(this, "removeMovieClip", []);
        }
      };
      _loc4_ = _loc4_ + 1;
    }
  }
};
}
export const installers={"aimer":install_aimer,"elToro":install_elToro,"bullet":install_bullet,"deathRay":install_deathRay,"electricbullet":install_electricbullet,"fragbomb":install_fragbomb,"fragbombfragment":install_fragbombfragment,"gatling":install_gatling,"gatlingBullet":install_gatlingBullet,"homingbullet":install_homingbullet,"laser":install_laser,"mine":install_mine,"rCMissile":install_rCMissile,"rCSignal":install_rCSignal,"shield":install_shield,"shieldGraphic":install_shieldGraphic,"crate":install_crate};
export function tickCrates(scope, env) {
const {_root,Math,random,substring,Color,MovieClip,Key,trace}=env;

scope._loc2_ = 0;
scope._loc8_ = undefined;
scope._loc7_ = undefined;
while (scope._loc2_ < avmGet(_root, "TANKS")) {
  scope._loc8_ = avmCall(Math, "floor", [avmGet(avmGet(avmGet(_root, "game"), "tank" + scope._loc2_), "_x") / avmGet(_root, "SCALE")]);
  scope._loc7_ = avmCall(Math, "floor", [avmGet(avmGet(avmGet(_root, "game"), "tank" + scope._loc2_), "_y") / avmGet(_root, "SCALE")]);
  scope.tankFields[scope._loc2_] = {
    x: scope._loc8_,
    y: scope._loc7_
  };
  scope._loc2_ = scope._loc2_ + 1;
}
if (!scope.frozen) {
  scope.crateTimer--;
}
scope._loc5_ = undefined;
scope._loc9_ = undefined;
scope._loc12_ = undefined;
scope._loc6_ = undefined;
scope._loc3_ = undefined;
scope._loc4_ = undefined;
if (!scope.frozen && scope.crateTimer <= 0) {
  scope.crateTimer = (scope.CRATESPAWNTIMEBASE + random(scope.CRATESPAWNTIMERANDOM) + scope.CRATESPAWNMAZESIZESCALE / avmGet(avmGet(_root, "reachable"), "length")) * avmGet(_root, "settingsCrateSpawnModifier");
  scope.pos = 0;
  scope._loc5_ = true;
  scope._loc9_ = -1;
  scope._loc12_ = false;
  if (avmGet(_root, "numberOfCrates") >= avmGet(_root, "settingsMaxCrates")) {
    scope._loc12_ = true;
  }
  while ((avmGet(avmGet(avmGet(_root, "reachable"), scope.pos), "used") || scope._loc5_) && scope._loc9_ < 5 && !scope._loc12_) {
    if (avmGet(avmGet(_root, "crateSpawnPoints"), "length") > 0) {
      scope._loc6_ = avmGet(avmGet(_root, "crateSpawnPoints"), random(avmGet(avmGet(_root, "crateSpawnPoints"), "length")));
      scope.pos = avmGet(avmGet(avmGet(_root, "reachableIndex"), avmGet(scope._loc6_, "x")), avmGet(scope._loc6_, "y"));
    } else {
      scope.pos = random(avmGet(avmGet(_root, "reachable"), "length"));
    }
    scope._loc5_ = false;
    scope._loc9_ = scope._loc9_ + 1;
    if (scope.pos == undefined) {
      scope._loc5_ = true;
    } else {
      scope._loc2_ = 0;
      while (scope._loc2_ < avmGet(_root, "TANKS")) {
        scope._loc3_ = avmCall(Math, "floor", [avmGet(avmGet(avmGet(_root, "game"), "tank" + scope._loc2_), "x") / scope.SCALE]);
        scope._loc4_ = avmCall(Math, "floor", [avmGet(avmGet(avmGet(_root, "game"), "tank" + scope._loc2_), "y") / scope.SCALE]);
        if (avmCall(Math, "abs", [avmGet(avmGet(avmGet(_root, "reachable"), scope.pos), "x") - scope._loc3_]) + avmCall(Math, "abs", [avmGet(avmGet(avmGet(_root, "reachable"), scope.pos), "y") - scope._loc4_]) <= 1 && avmGet(avmGet(avmGet(_root, "game"), "tank" + scope._loc2_), "alive")) {
          scope._loc5_ = true;
        }
        scope._loc2_ = scope._loc2_ + 1;
      }
    }
  }
  if (scope._loc9_ < 5 && !scope._loc12_ && scope.pos != undefined) {
    avmCall(_root, "spawnCrate", [scope.pos, scope.SCALE]);
  }
}
}
