class SceneData {

    constructor()
    {
        this._id;
        this._text;
        this._imageDataList;
    }
    setXmlNode(xmlNode)
    {
        var i;
        var n;
        var childs;
        //
        if (xmlNode.getAttribute("id")) {
            this._id = xmlNode.getAttribute("id");
        }
        childs = xmlNode.getElementsByTagName("text");
        if (childs[0]) {
            if (childs[0].firstChild) {
                this._text = childs[0].firstChild.nodeValue;
            }
        }

        this._imageDataList = [];
        childs = xmlNode.getElementsByTagName("images");
        if (childs[0]) {
            if (childs[0].firstChild) {
                var values = childs[0].getElementsByTagName("image");
                n = values.length;
                for (i = 0; i < n; i++) {
                    var childNode = values[i];
                    if (childNode.firstChild) {
                        var imageData = new ImageData();
                        imageData.setXmlNode(childNode);
                        this._imageDataList.push(imageData);
                    }
                }
            }
        }
    }
    get text()
    {
        return this._text;
    }

    get imageDataList()
    {
        return this._imageDataList;
    }

}