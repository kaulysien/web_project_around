export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  addItem(cardItem) {
    this._container.append(cardItem);
  }

  // removeItem(cardId) {
  //   this._container.querySelector(`[data-id='${cardId}']`).remove();
  // }

  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

}
