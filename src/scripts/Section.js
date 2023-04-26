export class Section {
  constuctor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = selector;
  }

  render() {
    this.items.forEach((element) => {
      this.renderer(element);
    });
  }

  addItem(element) {
    this.items.push(element);
  }
}
