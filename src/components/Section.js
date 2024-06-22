export default class Section {
  constructor(
    { items, renderer, insertMethod, emptySelector },
    containerSelector
  ) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._insertMethod = insertMethod ?? "append";
    this._emptyElement = document.querySelector(emptySelector);
    this._emptySelector = emptySelector;
  }

  isEmpty() {
    if (this._container.innerHTML == "") {
      this._emptyElement.style.display = "block";
      return true;
    } else {
      this._emptyElement.style.display = "none";
      return false;
    }
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
    this.isEmpty();
  }

  addItem(element) {
    switch (this._insertMethod) {
      case "prepend":
        this._container.prepend(element);
        break;

      default:
        this._container.append(element);
        break;
    }
  }
}
