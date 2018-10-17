class ImageLoaderManager extends createjs.Container{
    constructor()
    {
        super();
        this._imageCount = 0;
        this._sceneCount = 0;
        this._sceneDataList;
    }
    loadStart(sceneDataList)
    {
        this._sceneDataList = sceneDataList;
        this.count = 0;

        this.initSceneLoad();

    }
    initSceneLoad() {
        this._sceneCount = 0;
        this.setSceneLoad();
    }

    setSceneLoad() {
        //_modelManager.sceneDataList[_sceneCount];
        this.initImageLoad();
    }

     initImageLoad() {
        this._imageCount = 0;
        this.setImageLoad();
    }

    setImageLoad() {
        let handleFileCompleted = (event) => {
            this.imageLoadCompleteHandler(event)
        };
        //_modelManager.sceneDataList[_sceneCount];
        var path = this._sceneDataList[this._sceneCount].imageDataList[this._imageCount].path;
        var loader = new createjs.LoadQueue();
        loader.addEventListener("fileload", handleFileCompleted);
        loader.loadFile({src: path, type: "image"});

    }

    imageLoadCompleteHandler(event)
    {
        var image = event.result;
        var imageData = this._sceneDataList[this._sceneCount].imageDataList[this._imageCount];
        imageData.setImage(image);

        this._imageCount++;
        if (this._imageCount >= this._sceneDataList[this._sceneCount].imageDataList.length) {
            this.sceneLoadComplete();
        }
        else {
            this.setImageLoad();
        }
    };

    sceneLoadComplete() {
        this._sceneCount++;
        if (this._sceneCount >= this._sceneDataList.length) {
            this.loadComplete();
        }
        else {
            this.setSceneLoad();
        }
    }
    loadComplete() {
        var event = new createjs.Event("complete");
        this.dispatchEvent(event);
    }
}