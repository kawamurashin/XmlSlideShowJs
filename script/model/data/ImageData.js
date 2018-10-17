class ImageData {
    constructor()
    {

        this._id;
        this._path;
        this._image;
    }
    setXmlNode(xmlNode)
    {
        if (xmlNode.getAttribute("id")) {
            this._id = xmlNode.getAttribute("id");
        }
        if (xmlNode.firstChild) {
            this._path = xmlNode.firstChild.nodeValue;
        }
    }
    setImage(image)
    {
        this._image = image;

    }

    get path()
    {
        return this._path;
    }
    get image()
    {
        return this._image;
    }
}