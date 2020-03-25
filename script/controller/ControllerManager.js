class ControllerManager extends createjs.Container{
    constructor()
    {
        super();

        this._modelManager;
        this._viewManager;

        this.init();
    }

    init()
    {
        let eventHandler = (event) => {
            this.modelHandleFileCompleteHandler(event)
        };

        this._modelManager = new ModelManager();
        this._modelManager.addEventListener('load_complete', eventHandler);

        this._viewManager = new ViewManager();
        this.addChild(this._viewManager);

        this._modelManager.loadStart();
    }



    modelHandleFileCompleteHandler(event)
    {
        var sceneDataList = this._modelManager.sceneDataList;
        this._viewManager.loadComplete(sceneDataList);
    }

}
