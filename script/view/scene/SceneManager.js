class SceneManager extends createjs.Container {
    constructor()
    {
        super();

        this._sceneDataList = [];
        this._sceneCount = 0;
        //
        this.sceneContainer;
        this.removeSceneContainer;

        this.setup();
    }
    setup()
    {

    }
    start(sceneDataList)
    {
        this._sceneDataList = sceneDataList;
        this._sceneCount = 0;
        this.addScene();

    }

    addScene()
    {
        let handleCompleted = (event) => {
            this.sceneContainerCompleteHandler(event)
        };
        var sceneData = this._sceneDataList[this._sceneCount];
        this.sceneContainer = new SceneContainer();
        this.sceneContainer.setSceneData(sceneData);
        this.sceneContainer.addEventListener("scene_container_complete" , handleCompleted);
        this.sceneContainer.y = -480;
        this.addChild(this.sceneContainer);

        this.setTween();
    }

    setTween()
    {
        let eventHandler = (event) => {
            this.tweenCompleteHandler(event);
        };

        if(this.removeSceneContainer)
        {

            var timeline = new createjs.Timeline();
            timeline.addTween(createjs.Tween.get(this.removeSceneContainer ).to({y:-480},1200,createjs.Ease.cubicIn));
            timeline.addTween(createjs.Tween.get(this.sceneContainer).wait(800).to({y:0},1200,createjs.Ease.cubicOut).call(eventHandler));
        }
        else
        {
            createjs.Tween.get(this.sceneContainer).to({y:0},1200,createjs.Ease.cubicOut).call(eventHandler);
        }
    }

    tweenCompleteHandler(event) {
        this.sceneContainer.startTween();

        if (this.removeSceneContainer) {
            this.removeChild(this.removeSceneContainer)
        }
        this.removeSceneContainer = this.sceneContainer;
    }

    nextScene() {
        this._sceneCount++;
        if (this._sceneCount >= this._sceneDataList.length) {
            this._sceneCount = 0;
        }
        this.addScene();
    }

    sceneContainerCompleteHandler(event)
    {
        this.nextScene();

    }
}