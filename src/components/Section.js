export default class Section {
  constructor({ items, render }, cardTemplate) {
    this._items = items;
    this._render = render;
    this._container = cardTemplate;
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderer() {
    this.clear();

    this._items.forEach((item) => {
      this._render(item);
    });
  }
}
