export class GlobalColumnRenderer {
  private grid: HTMLElement;

  constructor(grid: HTMLElement) {
    this.grid = grid;
    this.start();
  }

  private start() {
    const observer = new MutationObserver(() => this.render());
    observer.observe(this.grid, { childList: true, subtree: true });
    this.render();
  }

  private render() {
    const placeholders = this.grid.querySelectorAll<HTMLDivElement>('div[data-row-id]');
    placeholders.forEach(placeholder => {
      const rowIndex = Number(placeholder.dataset["rowId"]);
      placeholder.textContent = `🔹 Rendered once globally for row ${rowIndex}`;
    });
  }
}
