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
        this._modelManager = new ModelManager();
        this._modelManager.addEventListener('load_complete', this.modelHandleFileCompleteHandler);

        this._viewManager = new ViewManager();
        this.addChild(this._viewManager);

        this._modelManager.loadStart();
    }


    modelHandleFileCompleteHandler(event)
    {
        console.log("modelHandleFileComplete");
    }

}