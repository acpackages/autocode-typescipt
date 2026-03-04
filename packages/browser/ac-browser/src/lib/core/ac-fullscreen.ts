type FullscreenChangeCallback = (isFullscreen: boolean, element: Element | null) => void;

export const AcFullscreen = {
  /**
   * Returns true if any element is in fullscreen
   */
  isFullscreen(): boolean {
    return !!document.fullscreenElement;
  },

  /**
   * Returns current fullscreen element
   */
  element(): Element | null {
    return document.fullscreenElement;
  },

  /**
   * Enter fullscreen
   * If no element provided → fullscreen entire document
   */
  async enter(element?: HTMLElement) {
    const target = element ?? document.documentElement;

    if (!document.fullscreenElement) {
      await target.requestFullscreen();
    }
  },

  /**
   * Exit fullscreen
   */
  async exit() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  },

  /**
   * Toggle fullscreen
   */
  async toggle(element?: HTMLElement) {
    if (this.isFullscreen()) {
      await this.exit();
    } else {
      await this.enter(element);
    }
  },

  /**
   * Listen for fullscreen changes
   * Returns unsubscribe function
   */
  onChange(callback: FullscreenChangeCallback) {
    const handler = () => {
      callback(this.isFullscreen(), this.element());
    };

    document.addEventListener("fullscreenchange", handler);

    return () => {
      document.removeEventListener("fullscreenchange", handler);
    };
  }
};
