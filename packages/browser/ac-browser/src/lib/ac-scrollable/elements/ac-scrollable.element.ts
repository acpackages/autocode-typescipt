interface AcScrollableOptions {
  itemHeight?: number; // fallback fixed height if variable height not available
  containerHeight?: number;
}

export class AcScrollable {
  private container: HTMLElement;
  private items: HTMLElement[] = [];
  private renderedItems: HTMLElement[] = [];
  private itemHeights: number[] = [];
  private scrollTop = 0;
  private containerHeight: number;
  private itemHeightFallback: number;

  constructor(container: HTMLElement, options: AcScrollableOptions = {}) {
    this.container = container;
    this.containerHeight = options.containerHeight ?? container.clientHeight;
    this.itemHeightFallback = options.itemHeight ?? 50;

    this.container.style.overflowY = 'auto';
    this.container.addEventListener('scroll', () => this.onScroll());
  }

  addItem(element: HTMLElement) {
    // Store the item
    this.items.push(element);

    // Measure height
    const temp = element.cloneNode(true) as HTMLElement;
    temp.style.visibility = 'hidden';
    this.container.appendChild(temp);
    const height = temp.offsetHeight || this.itemHeightFallback;
    this.container.removeChild(temp);

    this.itemHeights.push(height);

    // Re-render visible range
    this.render();
  }

  private onScroll() {
    this.scrollTop = this.container.scrollTop;
    this.render();
  }

  private getVisibleRange() {
    let startIndex = 0;
    let endIndex = this.items.length - 1;
    let y = 0;

    // Find start index
    for (let i = 0; i < this.items.length; i++) {
      if (y + this.itemHeights[i] >= this.scrollTop) {
        startIndex = i;
        break;
      }
      y += this.itemHeights[i];
    }

    // Find end index
    y = 0;
    for (let i = startIndex; i < this.items.length; i++) {
      y += this.itemHeights[i];
      if (y >= this.containerHeight) {
        endIndex = i;
        break;
      }
    }

    return { startIndex, endIndex };
  }

  private render() {
    const { startIndex, endIndex } = this.getVisibleRange();

    // Clear DOM
    this.container.innerHTML = '';

    // Add spacer before
    const topSpacer = document.createElement('div');
    topSpacer.style.height = this.itemHeights.slice(0, startIndex).reduce((a, b) => a + b, 0) + 'px';
    this.container.appendChild(topSpacer);

    // Render visible items
    for (let i = startIndex; i <= endIndex; i++) {
      this.container.appendChild(this.items[i]);
    }

    // Add spacer after
    const bottomSpacer = document.createElement('div');
    bottomSpacer.style.height = this.itemHeights.slice(endIndex + 1).reduce((a, b) => a + b, 0) + 'px';
    this.container.appendChild(bottomSpacer);
  }
}
