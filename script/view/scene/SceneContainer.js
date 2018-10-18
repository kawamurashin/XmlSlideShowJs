class SceneContainer extends createjs.Container {
    constructor()
    {
        super();

        this.setup();
    }
    setup()
    {
        this._imageCount;
        this._sceneData;
        this._backgroundContainer = new createjs.Container();
        //
        this._bitmap;
        this._removeBitmap;
        this.addChild(this._backgroundContainer);
    }
    //public
    setSceneData(sceneData)
    {
        this._sceneData = sceneData;
        this._imageCount = 0;

        var textField = new createjs.Text();
        textField.color = "#CCCCCC";
        textField.font = "64px Futura PT Book";
        textField.text = sceneData.text;
        this.addChild(textField);

        //this.startTween();
    }
    startTween()
    {
        this.addImage();
    }

    //private
    addImage()
    {
        var image = this._sceneData.imageDataList[this._imageCount].image;
        this._bitmap = new createjs.Bitmap(image);
        this._bitmap.x = 640;
        this._backgroundContainer.addChild(this._bitmap);
        this.setTween();
    }

    setTween()
    {
        let eventHandler = (event) => {
            this.tweenCompleteHandler(event);
        };

        if(this._removeBitmap)
        {
            var timeline = new createjs.Timeline();
            timeline.addTween(createjs.Tween.get(this._removeBitmap).to({x:-640},1200,createjs.Ease.cubicIn));
            timeline.addTween(createjs.Tween.get(this._bitmap).wait(800).to({x:0},1200,createjs.Ease.cubicOut).call(eventHandler));
        }
        else
        {
            createjs.Tween.get(this._bitmap).to({x:0},1200,createjs.Ease.cubicOut).call(eventHandler);
        }
    }
    tweenCompleteHandler(event) {
        if(this._removeBitmap)
        {
            this._backgroundContainer.removeChild(this._removeBitmap)
        }
        this._removeBitmap = this._bitmap;

        this._imageCount++;
        if(this._imageCount >= this._sceneData.imageDataList.length)
        {
            //this._imageCount = 0;
            //this.addImage();
            //var viewEvent:ViewEvent = new ViewEvent(ViewEvent.SCENE_COMPLETE);
            //dispatchEvent(viewEvent);
            var event = new createjs.Event("scene_container_complete");
            this.dispatchEvent(event);
        }
        else
        {
            this.addImage();
        }
    }

}