require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  Coin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6178byZoiRF/or0M8eYKJrE", "Coin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Coin = function(_super) {
      __extends(Coin, _super);
      function Coin() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Coin.prototype.update = function() {
        this.rotate();
      };
      Coin.prototype.start = function() {};
      Coin.prototype.rotate = function() {
        if (!this.node) return;
        this.node.scaleX >= 1 && (this.node.scaleX = 0);
        this.node.scaleX += .01;
      };
      Coin = __decorate([ ccclass ], Coin);
      return Coin;
    }(cc.Component);
    exports.Coin = Coin;
    cc._RF.pop();
  }, {} ],
  Enermy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "294fcdFeXpIA7ni6H0Qf6hd", "Enermy");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  GameConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fbd7c3hBJZPgb4UqzVN4zV0", "GameConfig");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameConfig = function() {
      function GameConfig() {}
      GameConfig.SPEED = 5;
      GameConfig.JUMP_HEIGHT = 100;
      GameConfig.MAX_SPEED = 10;
      GameConfig.MIN_ENERMY_HEIGHT = 260;
      GameConfig.DOWN_G_SPEED = .44;
      GameConfig.UP_G_SPEED = 11;
      return GameConfig;
    }();
    exports.GameConfig = GameConfig;
    cc._RF.pop();
  }, {} ],
  GameData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8799HaxC9JVK3BcIy9hLUb", "GameData");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameData = function() {
      function GameData() {}
      GameData.maxScore = 0;
      GameData.nowScore = 0;
      GameData.coin = 0;
      GameData.totalCoin = 0;
      return GameData;
    }();
    exports.GameData = GameData;
    cc._RF.pop();
  }, {} ],
  Hero: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f94adM8zxJ/5hhLVeTlXDu", "Hero");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MainScene_1 = require("./MainScene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Hero = function(_super) {
      __extends(Hero, _super);
      function Hero() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.main = null;
        return _this;
      }
      Hero.prototype.onCollisionEnter = function(other, self) {
        1 == other.tag ? this.main.getComponent(MainScene_1.MainScene).getCoin(other.node) : this.main.getComponent(MainScene_1.MainScene).gameOver();
      };
      Hero.prototype.start = function() {};
      __decorate([ property(cc.Node) ], Hero.prototype, "main", void 0);
      Hero = __decorate([ ccclass ], Hero);
      return Hero;
    }(cc.Component);
    exports.Hero = Hero;
    cc._RF.pop();
  }, {
    "./MainScene": "MainScene"
  } ],
  MainScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63164kOW3VDW6qNuEupJbIY", "MainScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameConfig_1 = require("./GameConfig");
    var OverView_1 = require("./OverView");
    var SubDomController_1 = require("./SubDomController");
    var wx = window["wx"];
    var GAME_TYPE;
    (function(GAME_TYPE) {
      GAME_TYPE[GAME_TYPE["DOWN"] = 0] = "DOWN";
      GAME_TYPE[GAME_TYPE["UP"] = 1] = "UP";
    })(GAME_TYPE = exports.GAME_TYPE || (exports.GAME_TYPE = {}));
    var MainScene = function(_super) {
      __extends(MainScene, _super);
      function MainScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.firstBotBG = null;
        _this.enermyGroup = null;
        _this.secondBotBG = null;
        _this.hero = null;
        _this.enermy = null;
        _this.scoreTxt = null;
        _this.coinTxt = null;
        _this.coin = null;
        _this.pause_view = null;
        _this.start_view = null;
        _this.game_view = null;
        _this.over_view = null;
        _this.gameFlag = false;
        _this.gameType = GAME_TYPE.DOWN;
        _this.nowSpeed = GameConfig_1.GameConfig.SPEED;
        _this.downSpeed = 0;
        _this.score = 0;
        _this.coinNum = 0;
        _this.bestScore = 0;
        _this.count = 0;
        return _this;
      }
      MainScene.prototype.onLoad = function() {
        this.jump();
        this.initConfig();
        this.shareRightTop();
      };
      MainScene.prototype.update = function(dt) {
        this.moveFirstBg();
        this.moveSecondBg();
        this.heroMove();
        this.moveEnermy();
        this.changeHeroBg();
        this.count++;
        if (150 == this.count) {
          this.count = 0;
          this.createEnermy();
        }
      };
      MainScene.prototype.start = function() {
        this.initCollision();
      };
      MainScene.prototype.initCollision = function() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
      };
      MainScene.prototype.initConfig = function() {
        var top_bg = this.node.getChildByName("game_view").getChildByName("top_bg");
        this.topBgBotY = this.firstBotBG.y + this.firstBotBG.height / 2;
        this.firstBgX = this.firstBotBG.x;
        this.secondBgX = this.secondBotBG.x;
        this.heroFirstY = this.hero.y;
        this.botBgY = this.firstBotBG.y;
        this.windowSize = cc.view.getVisibleSize();
      };
      MainScene.prototype.moveFirstBg = function() {
        if (!this.gameFlag) return;
        var node = this.firstBotBG;
        node.x -= this.nowSpeed;
        node.x <= -this.windowSize.width && (node.x = 0);
      };
      MainScene.prototype.moveSecondBg = function() {
        if (!this.gameFlag) return;
        var node = this.secondBotBG;
        node.x -= this.nowSpeed;
        node.x <= 0 && (node.x = this.windowSize.width);
      };
      MainScene.prototype.jump = function() {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
          _this.downSpeed = 0;
          switch (_this.gameType) {
           case GAME_TYPE.UP:
            _this.downSpeed += GameConfig_1.GameConfig.UP_G_SPEED;
            break;

           case GAME_TYPE.DOWN:
            _this.downSpeed -= GameConfig_1.GameConfig.UP_G_SPEED;
          }
        });
      };
      MainScene.prototype.changeHeroBg = function() {
        if (!this.gameFlag) return;
        this.downSpeed >= 0 ? this.hero.rotation = 0 : this.hero.rotation = 10;
      };
      MainScene.prototype.heroMove = function() {
        if (!this.gameFlag) return;
        switch (this.gameType) {
         case GAME_TYPE.UP:
          this.downSpeed -= GameConfig_1.GameConfig.DOWN_G_SPEED;
          break;

         case GAME_TYPE.DOWN:
          this.downSpeed += GameConfig_1.GameConfig.DOWN_G_SPEED;
        }
        this.hero.y -= this.downSpeed;
        (this.hero.y - .75 * this.hero.height / 2 <= this.topBgBotY || this.hero.y >= (this.windowSize.height - this.hero.height) / 2) && this.gameOver();
      };
      MainScene.prototype.createEnermy = function() {
        if (!this.gameFlag) return;
        var enermyTop = cc.instantiate(this.enermy);
        var enermyBot = cc.instantiate(this.enermy);
        var coin = cc.instantiate(this.coin);
        var topScaleY = this.getRandomNum();
        var boScaleY = this.enermyGroup.height / 100 - topScaleY - GameConfig_1.GameConfig.MIN_ENERMY_HEIGHT / 100;
        enermyTop.scaleY = topScaleY;
        enermyBot.scaleY = boScaleY;
        enermyTop.y = this.enermyGroup.height / 2 - enermyTop.height * topScaleY / 2;
        enermyBot.y = -this.enermyGroup.height / 2 + enermyBot.height * boScaleY / 2;
        coin.y = enermyTop.y - enermyTop.height * topScaleY / 2 - GameConfig_1.GameConfig.MIN_ENERMY_HEIGHT / 2;
        this.enermyGroup.addChild(enermyTop);
        this.enermyGroup.addChild(enermyBot);
        this.enermyGroup.addChild(coin);
      };
      MainScene.prototype.moveEnermy = function() {
        var _this = this;
        if (!this.gameFlag) return;
        if (this.enermyGroup.children.length <= 0) return;
        this.enermyGroup.children.forEach(function(val) {
          if (!val) return;
          val.x -= _this.nowSpeed;
          if (val.x <= -(_this.windowSize.width + val.width)) {
            _this.addScore();
            val.destroy();
          }
        });
      };
      MainScene.prototype.getRandomNum = function() {
        return Math.ceil(5 * Math.random());
      };
      MainScene.prototype.addScore = function() {
        if (!this.gameFlag) return;
        this.score += 1;
        this.scoreTxt.string = "" + this.score;
      };
      MainScene.prototype.gameOver = function() {
        var _this = this;
        this.gameFlag = false;
        SubDomController_1.SubDomController.getUserScore(function(res) {
          var scoreBest;
          var allCoin;
          res.forEach(function(val, idx) {
            "score" == val["key"] ? scoreBest = val["value"] : allCoin = val["value"];
          });
          if (!scoreBest || _this.score > scoreBest) {
            scoreBest = _this.score;
            if (allCoin) {
              allCoin += _this.coinNum;
              wx.setUserCloudStorage({
                KVDataList: [ {
                  key: "score",
                  value: "" + scoreBest
                }, {
                  key: "coin",
                  value: allCoin
                } ],
                success: function(res) {
                  console.log("设置开放成功", res);
                },
                fail: function(res) {
                  console.error("设置开放域失败", res);
                },
                complete: function(res) {}
              });
            } else wx.setUserCloudStorage({
              KVDataList: [ {
                key: "score",
                value: "" + scoreBest
              }, {
                key: "coin",
                value: "" + _this.coinNum
              } ],
              success: function(res) {
                console.log("设置开放成功", res);
              },
              fail: function(res) {
                console.error("设置开放域失败", res);
              },
              complete: function(res) {}
            });
          }
          SubDomController_1.SubDomController.getFriendInfo(function(res) {
            _this.over_view.getComponent(OverView_1.OverView).setRankData(res);
            _this.over_view.getComponent(OverView_1.OverView).setScore({
              coin: _this.coinNum,
              score: _this.score,
              best_score: scoreBest
            });
            _this.over_view.active = true;
            _this.game_view.active = false;
            _this.resetGame();
            _this.pauseBgMusic();
          });
        });
      };
      MainScene.prototype.addSpead = function() {
        this.score % 20 == 0;
      };
      MainScene.prototype.startGame = function() {
        this.gameFlag = true;
        this.playBgMusic();
        this.start_view.active = false;
        this.game_view.active = true;
      };
      MainScene.prototype.continueGame = function() {
        this.gameFlag = true;
        this.playBgMusic();
        this.pause_view.active = false;
      };
      MainScene.prototype.againGame = function() {
        this.over_view.active = false;
        this.game_view.active = true;
        this.playBgMusic();
        this.gameFlag = true;
      };
      MainScene.prototype.pauseGame = function() {
        this.gameFlag = false;
        this.pauseBgMusic();
        this.pause_view.active = true;
      };
      MainScene.prototype.setSpriteBg = function(node, resUrl) {
        cc.loader.loadRes(resUrl, cc.SpriteFrame, function(err, spriteFrame) {
          if (null != err) {
            console.log(err.message);
            return;
          }
          node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
      };
      MainScene.prototype.playBgMusic = function() {
        this.node.getComponent(cc.AudioSource).play();
      };
      MainScene.prototype.pauseBgMusic = function() {
        this.node.getComponent(cc.AudioSource).pause();
      };
      MainScene.prototype.changeVolume = function(x) {
        this.node.getComponent(cc.AudioSource).volume = x || .5;
      };
      MainScene.prototype.getCoin = function(node) {
        this.coinNum++;
        node.destroy();
      };
      MainScene.prototype.setGameType = function(e, data) {
        switch (+data) {
         case GAME_TYPE.UP:
          this.gameType = GAME_TYPE.UP;
          break;

         case GAME_TYPE.DOWN:
          this.gameType = GAME_TYPE.DOWN;
        }
      };
      MainScene.prototype.resetGame = function() {
        this.score = 0;
        this.coinNum = 0;
        this.scoreTxt.string = "分数:" + this.score + "分";
        this.enermyGroup.children.forEach(function(val) {
          val.destroy();
        });
        this.hero.y = 0;
        this.downSpeed = 0;
      };
      MainScene.prototype.backStartView = function() {
        this.over_view.active = false;
        this.start_view.active = true;
      };
      MainScene.prototype.shareLife = function() {
        wx.shareAppMessage({
          title: "体验过飞的感觉吗",
          imageUrl: "http://oss.againfly.com/game/share_battle.png",
          query: "type=relay"
        });
      };
      MainScene.prototype.shareRightTop = function() {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) return;
        wx.showShareMenu();
      };
      __decorate([ property(cc.Node) ], MainScene.prototype, "firstBotBG", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "enermyGroup", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "secondBotBG", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "hero", void 0);
      __decorate([ property(cc.Prefab) ], MainScene.prototype, "enermy", void 0);
      __decorate([ property(cc.Label) ], MainScene.prototype, "scoreTxt", void 0);
      __decorate([ property(cc.Label) ], MainScene.prototype, "coinTxt", void 0);
      __decorate([ property(cc.Prefab) ], MainScene.prototype, "coin", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "pause_view", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "start_view", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "game_view", void 0);
      __decorate([ property(cc.Node) ], MainScene.prototype, "over_view", void 0);
      MainScene = __decorate([ ccclass ], MainScene);
      return MainScene;
    }(cc.Component);
    exports.MainScene = MainScene;
    cc._RF.pop();
  }, {
    "./GameConfig": "GameConfig",
    "./OverView": "OverView",
    "./SubDomController": "SubDomController"
  } ],
  OverView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4e201mRs8hP9qzwMu4lldYT", "OverView");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MainScene_1 = require("./MainScene");
    var RankItem_1 = require("./RankItem");
    var wx = window["wx"];
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OverView = function(_super) {
      __extends(OverView, _super);
      function OverView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.coin_txt = null;
        _this.score_txt = null;
        _this.best_txt = null;
        _this.award_txt = null;
        _this.main = null;
        _this.rankList = null;
        _this.rankItem = null;
        _this.dataList = [];
        _this.itemArr = [];
        return _this;
      }
      OverView.prototype.start = function() {};
      OverView.prototype.setScore = function(data) {
        if (!data) return;
        this.coin_txt.string = data["coin"];
        this.score_txt.string = data["score"];
        this.best_txt.string = data["best_score"];
        if (data["score"] <= 20) {
          if (this.main.getComponent(MainScene_1.MainScene).gameType == MainScene_1.GAME_TYPE.UP) {
            this.award_txt.string = " 崩溃了吧,菜鸡儿 ";
            return;
          }
          this.award_txt.string = " 你可真的是个小菜鸡呢 ";
        } else data["score"] > 20 && data["score"] <= 60 ? this.award_txt.string = " 这波不亏 " : data["score"] > 60 && data["score"] <= 100 ? this.award_txt.string = " 恭喜您已入门 " : data["score"] > 100 && data["score"] <= 200 ? this.award_txt.string = " 这么棒的吗，兄弟 " : this.award_txt.string = " 我没话说了 ";
      };
      OverView.prototype.setRankData = function(data) {
        var _this = this;
        this.dataList = data;
        this.rankList.getChildByName("view").getChildByName("content").removeAllChildren();
        data.sort(function(a, b) {
          return +b["KVDataList"][0]["value"] - +a["KVDataList"][0]["value"];
        });
        data.forEach(function(val, idx) {
          var node = cc.instantiate(_this.rankItem);
          _this.itemArr.push(node);
          node.getComponent(RankItem_1.RankItem).setData(val, idx);
          _this.rankList.getChildByName("view").getChildByName("content").addChild(node);
        });
      };
      __decorate([ property(cc.Label) ], OverView.prototype, "coin_txt", void 0);
      __decorate([ property(cc.Label) ], OverView.prototype, "score_txt", void 0);
      __decorate([ property(cc.Label) ], OverView.prototype, "best_txt", void 0);
      __decorate([ property(cc.Label) ], OverView.prototype, "award_txt", void 0);
      __decorate([ property(cc.Node) ], OverView.prototype, "main", void 0);
      __decorate([ property(cc.Node) ], OverView.prototype, "rankList", void 0);
      __decorate([ property(cc.Prefab) ], OverView.prototype, "rankItem", void 0);
      OverView = __decorate([ ccclass ], OverView);
      return OverView;
    }(cc.Component);
    exports.OverView = OverView;
    cc._RF.pop();
  }, {
    "./MainScene": "MainScene",
    "./RankItem": "RankItem"
  } ],
  RankItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9c2294ZESZNq7XsHzcMEFCx", "RankItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RankItem = function(_super) {
      __extends(RankItem, _super);
      function RankItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rank_num = null;
        _this.nick_name = null;
        _this.score = null;
        _this.head_pic = null;
        return _this;
      }
      RankItem.prototype.start = function() {};
      RankItem.prototype.setData = function(data, idx) {
        var _this = this;
        0 == idx ? this.rank_num.node.color = cc.color(245, 62, 4) : 1 == idx ? this.rank_num.node.color = cc.color(240, 148, 11) : 2 == idx && (this.rank_num.node.color = cc.color(221, 205, 25));
        this.rank_num.string = "No." + (idx + 1);
        this.nick_name.string = data.nickname;
        this.score.string = data.KVDataList[0]["value"];
        cc.loader.load(data.avatarUrl + "?aa=aa.jpg", function(err, texture) {
          var frame = new cc.SpriteFrame(texture);
          _this.head_pic.spriteFrame = frame;
        });
      };
      __decorate([ property(cc.Label) ], RankItem.prototype, "rank_num", void 0);
      __decorate([ property(cc.Label) ], RankItem.prototype, "nick_name", void 0);
      __decorate([ property(cc.Label) ], RankItem.prototype, "score", void 0);
      __decorate([ property(cc.Sprite) ], RankItem.prototype, "head_pic", void 0);
      RankItem = __decorate([ ccclass ], RankItem);
      return RankItem;
    }(cc.Component);
    exports.RankItem = RankItem;
    cc._RF.pop();
  }, {} ],
  StarView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aaac55KTkJNaLmSGr31+xiE", "StarView");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StarView = function(_super) {
      __extends(StarView, _super);
      function StarView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.name_txt = null;
        return _this;
      }
      StarView.prototype.start = function() {
        this.nameAnimate();
      };
      StarView.prototype.nameAnimate = function() {
        var action = cc.sequence(cc.moveTo(1.5, cc.p(0, 370)), cc.tintTo(1.5, 255, 255, 255), cc.callFunc(function() {}));
        action.easing(cc.easeBounceInOut());
        this.name_txt.runAction(action);
      };
      __decorate([ property(cc.Node) ], StarView.prototype, "name_txt", void 0);
      StarView = __decorate([ ccclass ], StarView);
      return StarView;
    }(cc.Component);
    exports.StarView = StarView;
    cc._RF.pop();
  }, {} ],
  SubDomController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb0866/ssBIXon9lTlNWmJ9", "SubDomController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var wx = window["wx"];
    var sharedCanvas = window["sharedCanvas"];
    var SubDomController = function(_super) {
      __extends(SubDomController, _super);
      function SubDomController() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SubDomController_1 = SubDomController;
      SubDomController.prototype.start = function() {};
      SubDomController.prototype.update = function() {
        SubDomController_1.display();
      };
      SubDomController.display = function() {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) return;
        var del = new Array();
        SubDomController_1.KEYS.forEach(function(value, index) {
          if (wx.getOpenDataContext().canvas[value]) {
            console.log("主域收到回复:", value, wx.getOpenDataContext().canvas[value]);
            var feedback = SubDomController_1.OBJ[value];
            "function" == typeof feedback && feedback(wx.getOpenDataContext().canvas[value]);
            del.push(value);
          }
        });
        del.forEach(function(value, index) {
          SubDomController_1.deleteArr(SubDomController_1.KEYS, value);
          SubDomController_1.OBJ[value] = void 0;
          wx.postMessage({
            message: {
              type: 1,
              key: value,
              msg: "清除一个对象"
            }
          });
        });
      };
      SubDomController.getUserInfo = function(feedback) {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
          "function" == typeof feedback && feedback({
            openId: "selfOpenId",
            nickName: "安康",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
            gender: 1,
            language: "zh_CN",
            city: "",
            province: "",
            country: "中国"
          });
          return;
        }
        SubDomController_1.OBJ["USER_INFO"] = feedback;
        SubDomController_1.KEYS.push("USER_INFO");
        wx.postMessage({
          message: {
            type: 3,
            key: "USER_INFO",
            msg: "获取用户信息"
          }
        });
      };
      SubDomController.getFriendInfo = function(feedback) {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
          var res = [ {
            openid: "oIBzT5Ipt2UG9_qmqBChfElWFhyU",
            nickname: "Momo",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoBDWashnx1icbCrez0bWOm2rjpCQ0Pa84yITGOefKWv6Nqlt4yxZ7hz2gmrlWLb2zG0lH9maWVUicg/132",
            KVDataList: [ {
              key: "score",
              value: "7777"
            } ]
          }, {
            openid: "1",
            nickname: "安康2",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
            KVDataList: [ {
              key: "score",
              value: "8888"
            } ]
          }, {
            openid: "2",
            nickname: "安康3",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
            KVDataList: [ {
              key: "score",
              value: "9999"
            } ]
          }, {
            openid: "oIBzT5BFyVZeFtpA76bycj4as7KQ",
            nickname: "安康5",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
            KVDataList: [ {
              key: "score",
              value: "0"
            } ]
          } ];
          "function" == typeof feedback && feedback(res);
          return;
        }
        SubDomController_1.OBJ["FRIEND_STORAGE"] = feedback;
        SubDomController_1.KEYS.push("FRIEND_STORAGE");
        wx.postMessage({
          message: {
            type: 2,
            key: "score",
            msg: "获取好友信息"
          }
        });
      };
      SubDomController.getUserScore = function(feedback) {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME && "function" == typeof feedback) {
          feedback([ {
            key: "score",
            value: "10"
          }, {
            key: "coin",
            value: "10"
          } ]);
          return;
        }
        SubDomController_1.OBJ["USER_STORAGE"] = feedback;
        SubDomController_1.KEYS.push("USER_STORAGE");
        wx.postMessage({
          message: {
            type: 1,
            key: "USER_STORAGE",
            msg: "获取用户分数"
          }
        });
      };
      SubDomController.deleteArr = function(arr, key) {
        arr.forEach(function(value, index) {
          if (value == key) {
            arr.splice(index, 1);
            return;
          }
        });
      };
      var SubDomController_1;
      SubDomController.KEYS = [];
      SubDomController.OBJ = {};
      SubDomController = SubDomController_1 = __decorate([ ccclass ], SubDomController);
      return SubDomController;
    }(cc.Component);
    exports.SubDomController = SubDomController;
    cc._RF.pop();
  }, {} ]
}, {}, [ "Coin", "Enermy", "GameConfig", "GameData", "Hero", "MainScene", "OverView", "RankItem", "StarView", "SubDomController" ]);