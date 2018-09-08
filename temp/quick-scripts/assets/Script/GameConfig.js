(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fbd7c3hBJZPgb4UqzVN4zV0', 'GameConfig', __filename);
// Script/GameConfig.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.SPEED = 5; // 游戏场景速度
    GameConfig.JUMP_HEIGHT = 100; // 玩家跳跃高度
    GameConfig.MAX_SPEED = 10; // 最大速度
    GameConfig.MIN_ENERMY_HEIGHT = 260; // 上下障碍物之间的高度
    GameConfig.MIN_ENERMY_MAX = 270; // 上下障碍物之间的高度
    GameConfig.DOWN_G_SPEED = 0.44; // 下落加速度
    GameConfig.UP_G_SPEED = 11; // 上升加速度
    return GameConfig;
}());
exports.GameConfig = GameConfig;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameConfig.js.map
        