import { AcEnumInputType, AcOptionInput, AcPopoutTextareaInput, AcSelectInput, AcTextAreaInput, AcTextInput } from "@autocode-ts/ac-browser";
import { PageHeader } from "../../components/page-header/page-header.component";
import { AcReactiveValueProxy } from "@autocode-ts/ac-template-engine";

export class InputBasicPage extends HTMLElement {
  pageHeader: PageHeader = new PageHeader();
  proxyInstance!: AcReactiveValueProxy;
  recordProxy: any;
  record: any = {
    full_name: 'Alice Johnson',
    personal_email: 'alice.j@example.com',
    user_password: 'Secret123!',
    age: 29,
    favorite_color: '#007bff',
    birth_date: '1996-05-12',
    preferred_time: '09:30',
    meeting_datetime: '2025-08-15T14:30',
    preferred_month: '2025-08',
    preferred_week: '2025-W33',
    contact_number: '+91-9876543210',
    portfolio_url: 'https://alicejohnson.dev',
    search_query: 'frontend developer',
    auth_token: 'abc123xyz',
    profile_strength: 85,
    resume_file: '',       // placeholder for file input
    profile_picture: '',   // placeholder for image input
    about_me: 'UI/UX designer with 5+ years of experience.',
    favourite_quote: 'The value of life is not in its duration, but in its donation. You are not important because of how long you live, you are important because of how effective you live..',
    contact_preference: 'Email',
    interested_fruits: ['Apple', 'Mango'],
    preferred_framework: 'Vue.js'
  };

  async connectedCallback() {
    this.proxyInstance = new AcReactiveValueProxy(this.record);
    this.recordProxy = this.proxyInstance.valueProxy;

    this.innerHTML = `<div class="container py-4"><div class="accordion" id="formAccordion"></div></div>`;
    this.prepend(this.pageHeader.element);
    this.pageHeader.pageTitle = 'All Real-Life Inputs';

    const accordion = this.querySelector('#formAccordion')!;

    const addField = (labelText: string, element: HTMLElement, container: HTMLElement) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'mb-3';
      const label = document.createElement('label');
      label.textContent = labelText;
      label.className = 'form-label';
      wrapper.append(label, element);
      container.appendChild(wrapper);
    };

    const createCard = (title: string, id: string) => {
      const card = document.createElement('div');
      card.className = 'accordion-item';
      card.innerHTML = `
        <div id="collapse-${id}" class="accordion-collapse collapse ${accordion.children.length === 0 ? 'show' : ''}" aria-labelledby="heading-${id}" data-bs-parent="#formAccordion">
          <div class="accordion-body row g-3"></div>
        </div>
      `;
      accordion.appendChild(card);
      return card.querySelector('.accordion-body')! as HTMLElement;
    };

    const allInputsGroup = createCard('Real-Life Inputs', 'real-inputs');

    const addInput = (type: AcEnumInputType, label: string, key: string) => {
      const input = new AcTextInput();
      input.type = type;
      input.bindKey = key;
      input.bindToReactiveValueProxy = this.proxyInstance;
      input.init();
      input.element.classList.add('form-control');
      addField(label, input.element, allInputsGroup);
    };

    // Realistic mapped inputs
    addInput(AcEnumInputType.Text, 'Full Name', 'full_name');
    addInput(AcEnumInputType.Email, 'Personal Email', 'personal_email');
    addInput(AcEnumInputType.Password, 'Password', 'user_password');
    addInput(AcEnumInputType.Number, 'Age', 'age');
    addInput(AcEnumInputType.Color, 'Favorite Color', 'favorite_color');
    addInput(AcEnumInputType.Date, 'Birth Date', 'birth_date');
    addInput(AcEnumInputType.Time, 'Preferred Time', 'preferred_time');
    addInput(AcEnumInputType.DateTimeLocal, 'Meeting Date & Time', 'meeting_datetime');
    addInput(AcEnumInputType.Month, 'Preferred Month', 'preferred_month');
    addInput(AcEnumInputType.Week, 'Preferred Week', 'preferred_week');
    addInput(AcEnumInputType.Tel, 'Contact Number', 'contact_number');
    addInput(AcEnumInputType.Url, 'Portfolio URL', 'portfolio_url');
    addInput(AcEnumInputType.Search, 'Search Query', 'search_query');
    addInput(AcEnumInputType.Hidden, 'Auth Token', 'auth_token');
    addInput(AcEnumInputType.Range, 'Profile Strength (%)', 'profile_strength');
    addInput(AcEnumInputType.File, 'Resume File', 'resume_file');
    addInput(AcEnumInputType.Image, 'Profile Picture', 'profile_picture');

    // Textarea: About Me
    const textarea = new AcTextAreaInput();
    textarea.bindKey = 'about_me';
    textarea.bindToReactiveValueProxy = this.proxyInstance;
    textarea.init();
    textarea.element.classList.add('form-control');
    addField('About Me', textarea.element, allInputsGroup);

    const popoutTextArea = new AcPopoutTextareaInput();
    popoutTextArea.bindKey = 'favourite_quote';
    popoutTextArea.bindToReactiveValueProxy = this.proxyInstance;
    popoutTextArea.init();
    popoutTextArea.element.classList.add('form-control');
    addField('Fav Quote', popoutTextArea.element, allInputsGroup);

    // Radio group: Contact Preference
    const radioLabel = document.createElement('div');
    radioLabel.className = 'fw-bold mt-3';
    radioLabel.textContent = 'Preferred Contact Method';
    allInputsGroup.appendChild(radioLabel);

    ['Email', 'Phone', 'In-app'].forEach((method) => {
      const radio = new AcOptionInput();
      radio.type = AcEnumInputType.Radio;
      radio.name = 'contact_preference';
      radio.valueWhenChecked = method;
      radio.bindKey = 'contact_preference';
      radio.bindToReactiveValueProxy = this.proxyInstance;
      radio.init();
      radio.element.classList.add('form-check-input');

      const div = document.createElement('div');
      div.className = 'form-check';
      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.textContent = method;

      div.appendChild(radio.element);
      div.appendChild(label);
      allInputsGroup.appendChild(div);
    });

    // Checkbox group: Favorite Fruits
    const checkboxLabel = document.createElement('div');
    checkboxLabel.className = 'fw-bold mt-3';
    checkboxLabel.textContent = 'Fruits You Like';
    allInputsGroup.appendChild(checkboxLabel);

    ['Apple', 'Banana', 'Mango'].forEach((fruit) => {
      const checkbox = new AcOptionInput();
      checkbox.type = AcEnumInputType.Checkbox;
      checkbox.valueWhenChecked = fruit;
      checkbox.bindKey = 'interested_fruits';
      checkbox.bindToReactiveValueProxy = this.proxyInstance;
      checkbox.init();
      checkbox.element.classList.add('form-check-input');

      const div = document.createElement('div');
      div.className = 'form-check';
      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.textContent = fruit;

      div.appendChild(checkbox.element);
      div.appendChild(label);
      allInputsGroup.appendChild(div);
    });

    // Select: Preferred Framework
    const select = new AcSelectInput();
    select.bindKey = 'preferred_framework';
    select.bindToReactiveValueProxy = this.proxyInstance;
    select.selectOptions = ['Angular', 'React', 'Vue.js', 'Svelte'];
    select.init();
    select.element.classList.add('form-select');
    addField('Preferred Framework', select.element, allInputsGroup);

    this.pageHeader.addMenuItem({
      label: 'Record',
      children: [
        {
          label: 'Log',
          callback: () => console.log(this.record)
        },
        {
          label: 'Set Value',
          callback: () => this.setExampleValues()
        }
      ]
    });
  }

  setExampleValues() {
    Object.assign(this.recordProxy, {
      full_name: 'Bob Martin',
      personal_email: 'bob.m@example.com',
      user_password: 'TopSecret456',
      age: 41,
      favorite_color: '#00cc88',
      birth_date: '1983-04-22',
      preferred_time: '11:15',
      meeting_datetime: '2025-09-10T17:00',
      preferred_month: '2025-09',
      preferred_week: '2025-W37',
      contact_number: '+91-9988776655',
      portfolio_url: 'https://bobmartin.dev',
      search_query: 'ux specialist',
      auth_token: 'zxy321lmn',
      profile_strength: 92,
      resume_file: '',
      profile_picture: '',
      about_me: 'Product designer focused on user-centered design.',
      contact_preference: 'Phone',
      interested_fruits: ['Banana'],
      preferred_framework: 'React'
    });
  }
}
