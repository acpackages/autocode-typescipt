type MessageType = "success" | "error" | "warning" | "info" | "default";
type MessageMode = "toast" | "modal" | "notification";

interface AcMessageOptions {
  title?: string;
  message: string;
  type?: MessageType;
  mode?: MessageMode;
  duration?: number; // ms, only for toast/notification
  showConfirmButton?: boolean; // for modal
  showCancelButton?: boolean; // for modal
  onConfirm?: () => void;
  onCancel?: () => void;
}

export class AcMessage {
  private static container: HTMLElement;

  static init() {
    if (!this.container) {
      this.container = document.createElement("div");
      Object.assign(this.container.style, {
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: "9999",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "flex-end",
      });
      document.body.appendChild(this.container);
    }
  }

  static show(options: AcMessageOptions) {
    this.init();
    const {
      title,
      message,
      type = "default",
      mode = "toast",
      duration = 3000,
      showConfirmButton = false,
      showCancelButton = false,
      onConfirm,
      onCancel,
    } = options;

    const el = document.createElement("div");
    Object.assign(el.style, this.getBaseStyle(type, mode));

    // Title
    if (title) {
      const header = document.createElement("div");
      header.innerText = title;
      Object.assign(header.style, {
        fontWeight: "bold",
        marginBottom: "0.25rem",
      });
      el.appendChild(header);
    }

    // Body
    const body = document.createElement("div");
    body.innerText = message;
    Object.assign(body.style, {
      fontSize: "0.9rem",
    });
    el.appendChild(body);

    // Buttons for modal
    if (mode === "modal" && (showConfirmButton || showCancelButton)) {
      const footer = document.createElement("div");
      Object.assign(footer.style, {
        marginTop: "1rem",
        textAlign: "right",
      });

      if (showConfirmButton) {
        const btnOk = document.createElement("button");
        btnOk.innerText = "OK";
        Object.assign(btnOk.style, this.getButtonStyle("#4caf50"));
        btnOk.onclick = () => {
          el.remove();
          onConfirm?.();
        };
        footer.appendChild(btnOk);
      }

      if (showCancelButton) {
        const btnCancel = document.createElement("button");
        btnCancel.innerText = "Cancel";
        Object.assign(btnCancel.style, this.getButtonStyle("#f44336"));
        btnCancel.onclick = () => {
          el.remove();
          onCancel?.();
        };
        footer.appendChild(btnCancel);
      }

      el.appendChild(footer);
    }

    // Append to container
    if (mode === "modal") {
      this.showModal(el);
    } else {
      this.container.appendChild(el);
      if (duration > 0) {
        setTimeout(() => {
          el.remove();
        }, duration);
      }
    }
  }

  private static getBaseStyle(type: MessageType, mode: MessageMode): Partial<CSSStyleDeclaration> {
    const colors: Record<MessageType, string> = {
      success: "#4caf50",
      error: "#f44336",
      warning: "#ff9800",
      info: "#2196f3",
      default: "#333",
    };

    const base: Partial<CSSStyleDeclaration> = {
      color: "#fff",
      padding: "0.75rem 1rem",
      borderRadius: "4px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      backgroundColor: colors[type],
      maxWidth: "300px",
    };

    if (mode === "toast" || mode === "notification") {
      return { ...base, cursor: "pointer" };
    }

    if (mode === "modal") {
      return {
        ...base,
        backgroundColor: "#fff",
        color: "#333",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: "300px",
        maxWidth: "400px",
        padding: "1.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        zIndex: "10001",
      };
    }

    return base;
  }

  private static getButtonStyle(color: string): Partial<CSSStyleDeclaration> {
    return {
      backgroundColor: color,
      color: "#fff",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "3px",
      marginLeft: "0.5rem",
      cursor: "pointer",
    };
  }

  private static showModal(content: HTMLElement) {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "10000",
    });
    overlay.appendChild(content);
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
    };
    document.body.appendChild(overlay);
  }
}
