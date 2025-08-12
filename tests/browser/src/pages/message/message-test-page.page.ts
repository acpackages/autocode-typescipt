import { AcMessage } from "@autocode-ts/ac-browser";

export class MessageTestPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container py-4">
        <h2 class="mb-4">AcMessage Test Page</h2>
        <p>This page demonstrates all <code>AcMessage</code> modes and types.</p>

        <h4>Toast Messages</h4>
        <div class="mb-3">
          ${this.renderBtn("Toast Success", "toast-success")}
          ${this.renderBtn("Toast Error", "toast-error")}
          ${this.renderBtn("Toast Warning", "toast-warning")}
          ${this.renderBtn("Toast Info", "toast-info")}
          ${this.renderBtn("Toast Default", "toast-default")}
        </div>

        <h4>Notification Messages</h4>
        <div class="mb-3">
          ${this.renderBtn("Notification Success", "notif-success")}
          ${this.renderBtn("Notification Error", "notif-error")}
          ${this.renderBtn("Notification Warning", "notif-warning")}
          ${this.renderBtn("Notification Info", "notif-info")}
          ${this.renderBtn("Notification Default", "notif-default")}
        </div>

        <h4>Modal Messages</h4>
        <div class="mb-3">
          ${this.renderBtn("Modal Confirm", "modal-confirm")}
          ${this.renderBtn("Modal Info", "modal-info")}
        </div>
      </div>
    `;

    this.addEventListeners();
  }

  private renderBtn(label: string, action: string): string {
    return `<button class="btn btn-primary me-2 mb-2" data-action="${action}">${label}</button>`;
  }

  private addEventListeners() {
    this.querySelectorAll<HTMLButtonElement>("[data-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action!;
        switch (action) {
          // Toasts
          case "toast-success":
            AcMessage.show({
              title: "Success",
              message: "Your action was successful.",
              type: "success",
              mode: "toast",
              duration: 3000
            });
            break;
          case "toast-error":
            AcMessage.show({
              title: "Error",
              message: "Something went wrong!",
              type: "error",
              mode: "toast",
              duration: 3000
            });
            break;
          case "toast-warning":
            AcMessage.show({
              title: "Warning",
              message: "Please be careful.",
              type: "warning",
              mode: "toast",
              duration: 3000
            });
            break;
          case "toast-info":
            AcMessage.show({
              title: "Info",
              message: "Here is some information.",
              type: "info",
              mode: "toast",
              duration: 3000
            });
            break;
          case "toast-default":
            AcMessage.show({
              message: "A default toast message.",
              type: "default",
              mode: "toast",
              duration: 3000
            });
            break;

          // Notifications
          case "notif-success":
            AcMessage.show({
              title: "Success Notification",
              message: "Your data has been saved.",
              type: "success",
              mode: "notification",
              duration: 5000
            });
            break;
          case "notif-error":
            AcMessage.show({
              title: "Error Notification",
              message: "Failed to process request.",
              type: "error",
              mode: "notification",
              duration: 5000
            });
            break;
          case "notif-warning":
            AcMessage.show({
              title: "Warning Notification",
              message: "You have unsaved changes.",
              type: "warning",
              mode: "notification",
              duration: 5000
            });
            break;
          case "notif-info":
            AcMessage.show({
              title: "Info Notification",
              message: "System maintenance tonight.",
              type: "info",
              mode: "notification",
              duration: 5000
            });
            break;
          case "notif-default":
            AcMessage.show({
              message: "A plain notification.",
              type: "default",
              mode: "notification",
              duration: 5000
            });
            break;

          // Modals
          case "modal-confirm":
            AcMessage.show({
              title: "Are you sure?",
              message: "Do you want to proceed?",
              type: "warning",
              mode: "modal",
              showConfirmButton: true,
              showCancelButton: true,
              onConfirm: () => alert("Confirmed!"),
              onCancel: () => alert("Cancelled!")
            });
            break;
          case "modal-info":
            AcMessage.show({
              title: "Information",
              message: "This is an informational modal.",
              type: "info",
              mode: "modal",
              showConfirmButton: true,
              onConfirm: () => alert("Closed info modal")
            });
            break;
        }
      });
    });
  }
}
