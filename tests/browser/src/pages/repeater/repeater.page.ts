// export class TemplateEnginePage extends HTMLElement {
//   public static observedAttributes = [];

//   async connectedCallback() {
//     // console.log(this);
//     const html = `
//     <div class="app-container">
//   <h1>Welcome to AcTemplateEngine</h1>

//   <!-- Interpolation -->
//   <p>{{ title }}</p>

//   <!-- acModel / two-way binding -->
//   <input type="text" [(acModel)]="title" />
//   <span>You typed: {{ title }}</span>

//   <!-- acIf -->
//   <div *acIf="show">Visible only if show=true</div>

//   <!-- acFor -->
//   <ul>
//     <li *acFor="let item in items">{{ item }}</li>
//   </ul>

//   <!-- acClass and acStyle -->
//   <p acClass="{ 'highlight': isHighlighted }" acStyle="{ fontSize: fontSize + 'px' }">Styled Text</p>

//   <!-- acBind -->
//   <a acBind:href="link" target="_blank">Go to link</a>

//   <!-- acRef and acOn -->
//   <input acRef="myInput" />
//   <button type="button" acOn:click="focusInput()">Focus input</button>

//   <!-- acSwitch -->
//   <div *acSwitch="status">
//     <div *acSwitchCase="'active'">Active</div>
//     <div *acSwitchCase="'inactive'">Inactive</div>
//     <div *acSwitchDefault>Unknown</div>
//   </div>

//   <!-- ac-template usage -->
//   <ac-template name="userTemplate">
//     <div>{{ user.name }} - {{ user.role }}</div>
//   </ac-template>

//   <div *acFor="user in users" acLet="user">
//     <ac-container acLet="user">
//       <ac-slot template="userTemplate"></ac-slot>
//     </ac-container>
//   </div>
// </div>

// `;
//     // console.log(html);
//     this.innerHTML = html;
//     const ctx = {
//       title: 'test-browser',
//       show: true,
//       items: ['One', 'Two', 'Three'],
//       isHighlighted: true,
//       fontSize: 16,
//       link: 'https://example.com',
//       status: 'active',
//       users: [
//         { name: 'Alice', role: 'Admin' },
//         { name: 'Bob', role: 'User' },
//       ],
//       focusInput:()=>{
//         console.log("Focus Input called");
//         // this.$refs.myInput?.focus();
//       },
//       onInit() {
//         console.log('AppElement initialized');
//       },
//       onDestroy() {
//         console.log('AppElement destroyed');
//       },
//     };
//     new AcTemplateEngine({context:ctx,element:this}).render();
//   }
// }
