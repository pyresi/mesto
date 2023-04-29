export class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = selector;

    this.items
      .map((item) => {
        return this.renderer(item);
      })
      .forEach((item) => {
        this.selector.prepend(item);
      });
  }

  addItem(element) {
    this.selector.prepend(this.renderer(element));
  }
}
