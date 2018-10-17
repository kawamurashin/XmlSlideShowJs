var stage;
var _controllerManager;
window.addEventListener("load", init);
function init() {
    stage = new createjs.Stage("Main");

    _controllerManager = new ControllerManager();
    stage.addChild(_controllerManager);

    stage.update();
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", handleTick);
}


function handleTick() {

    stage.update();
}