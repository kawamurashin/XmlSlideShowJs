class ViewManager extends createjs.Container
{
    constructor()
    {
        super();

        this.setup();
    }

    setup()
    {
        this._sceneManager = new SceneManager();
        this.addChild(this._sceneManager);
    }

    loadComplete(sceneDataList)
    {
        this._sceneManager.start(sceneDataList);
    }
}