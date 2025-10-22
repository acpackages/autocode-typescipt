import { AcForm, AcFormField, acInit } from "@autocode-ts/ac-browser";

export class AcFormTest extends HTMLElement {
  private form: AcForm | null = null;

  connectedCallback() {
    acInit();
    this.render();
    this.addEventListeners();
  }

  private render() {
    this.innerHTML = `
      <h3>AC Form Test</h3>
      <form id="manuallyAddedForm">
      <ac-form id="test-form" novalidate>
        <ac-form-field>
        <div class="form-group mb-2">
          <input type="text" name="username" placeholder="Username" required />
          <ac-form-field-error-message></ac-form-field-error-message>
          </div>
        </ac-form-field>

        <ac-form-field>
        <div class="form-group mb-2">
          <input type="email" name="email" placeholder="Email" required />
          <ac-form-field-error-message>Valid email required</ac-form-field-error-message>
          </div>
        </ac-form-field>

        <ac-form-field>
        <div class="form-group mb-2">
          <input type="password" name="password" placeholder="Password" minlength="6" required />
          <ac-form-field-error-message>Password must be at least 6 characters</ac-form-field-error-message>
          </div>
        </ac-form-field>

        <ac-form-field>
        <div class="form-group mb-2">
          <select name="role" required>
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <ac-form-field-error-message>Please select a role</ac-form-field-error-message>
          </div>
        </ac-form-field>

        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </ac-form>
</form>
      <pre id="form-output"></pre>
    `;

    this.form = this.querySelector('#test-form');
  }

  private addEventListeners() {
    if (!this.form) return;

    const object = this;
    this.form.addEventListener('submit', (e: any) => {
      e.preventDefault();
      console.log(object.form?.valuesToJsonObject());
      console.dir(object.form);
      const output = object.querySelector('#form-output');
      if (output) {
        // output.textContent = JSON.stringify(e.detail.values, null, 2);
      }
    });

    // Dynamically add an input after 3 seconds to test runtime binding
    setTimeout(() => {
      const dynamicField = new AcFormField();
      dynamicField.innerHTML = `
      <div class="form-group my-2">
        <input type="number" name="age" placeholder="Age" min="1" required />
        <ac-form-field-error-message>Age must be greater than 0</ac-form-field-error-message>
        </div>
      `;
      this.form?.appendChild(dynamicField);
    }, 3000);
  }
}

