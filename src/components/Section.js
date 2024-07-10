export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }
  renderItems(item) {
    this._items.forEach((item) => {
      this._renderer(item);
    });
    //create elements to render
  }
  addItem(element) {
    this._element.prepend(element);
    // add item into this._element
  }
}
