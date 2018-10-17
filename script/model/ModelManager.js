class ModelManager extends createjs.Container {
    constructor() {
        super();

        this.sceneDataList = []
    }

    loadStart()
    {

        let handleFileCompleted = (event) => {
            this.dataXmlLoadCompleteHandler(event)
        };
        var path = "data/data.xml?random=" + Math.random();
        var preload = new createjs.LoadQueue();
        preload.addEventListener("fileprogress", this.handleFileProgress);
        preload.addEventListener("fileload", handleFileCompleted);
        preload.loadFile( {src:path, type:"xml"});
    }

    handleFileProgress() {

    };

    dataXmlLoadCompleteHandler(event) {
        let handleFileCompleted = (event) => {
            this.imageLoadCompleteHandler(event)
        };
        var xml = event.result;
        this.sceneDataList = [];
        //
        var scenesNode = xml.getElementsByTagName("scenes")[0];
        var sceneNodeList = scenesNode.getElementsByTagName("scene");
        var n = sceneNodeList.length;
        for(var i = 0;i<n;i++)
        {
            var sceneNode = sceneNodeList[i];

            var sceneData = new SceneData();
            sceneData.setXmlNode(sceneNode);
            //
            this.sceneDataList.push(sceneData);
        }


        var imageLoaderManager = new ImageLoaderManager();
        imageLoaderManager.loadStart(this.sceneDataList);
        imageLoaderManager.addEventListener("complete" , handleFileCompleted)
    }
    imageLoadCompleteHandler(event)
    {
        var event = new createjs.Event("load_complete");
        this.dispatchEvent(event);
    }

}