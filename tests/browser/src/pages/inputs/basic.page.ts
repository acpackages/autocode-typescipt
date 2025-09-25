import { AC_INPUT_ATTRIBUTE_NAME, AcArrayValuesInputElement, AcEnumInputType, AcOptionInputElement, AcPopoutTextareaInputElement, AcSelectInputElement, AcTagsInputElement, AcTextareaInputElement, AcTextInputElement } from "@autocode-ts/ac-browser";
import { PageHeader } from "../../components/page-header/page-header.component";
import { AcContext } from "@autocode-ts/ac-template-engine";
import { languages } from "monaco-editor";

export class InputBasicPage extends HTMLElement {
  pageHeader: PageHeader = new PageHeader();
  context: AcContext = new AcContext({
    value: {
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
      preferred_framework: 'Vue.js',
      phone_numbers:[{"label":"Home","value":"0123456789"},{"label":"Mobile","value":"9876543210"}]
    }, name: 'record'
  });

  async connectedCallback() {

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
      const input = new AcTextInputElement();
      input.type = type;
      input.acContextKey = key;
      input.acContext = this.context;
      input.className = 'form-control';
      addField(label, input, allInputsGroup);
    };

    // Realistic mapped inputs
    addInput(AcEnumInputType.Text, 'Full Name', 'full_name');
    addInput(AcEnumInputType.Email, 'Personal Email', 'personal_email');
    addInput(AcEnumInputType.Password, 'Password', 'user_password');
    addInput(AcEnumInputType.Number, 'Age', 'age');

    const arrayValuesLabel = document.createElement('div');
    arrayValuesLabel.className = 'fw-bold mt-3';
    arrayValuesLabel.textContent = 'Phone Numbers';
    allInputsGroup.appendChild(arrayValuesLabel);
    const arrayValuesElement = new AcArrayValuesInputElement();
    arrayValuesElement.innerHTML = `
    <table>
    <thead>
      <tr>
        <th>Label</th>
        <th>Value</th>
        <th></th>
      </tr>
      <tbody ac-array-values-items>
        <tr >
          <td>
            <input class="form-control" ac-array-values-item-input ac-array-value-item-key="label"/>
          </td>
          <td>
              <input class="form-control" ac-array-values-item-input ac-array-value-item-key="value"/>
          </td>
          <td>
              <button type="button" class="btn btn-danger" ac-array-values-item-remove><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
      <tfoot>
      <tr>
      <td colspan="3">
          <button type="button" class="btn btn-danger" ac-array-values-item-add><i class="fa fa-plus"></i> Add New</button>
      </td>
      </tr>
      </tfoot>
    </thead>
    </table>
    `;
    arrayValuesElement.acContext = this.context;
    arrayValuesElement.acContextKey = 'phone_numbers';
    allInputsGroup.appendChild(arrayValuesElement);

    addInput(AcEnumInputType.Color, 'Favorite Color', 'favorite_color');
    addInput(AcEnumInputType.Date, 'Birth Date', 'birth_date');
    addInput(AcEnumInputType.Time, 'Preferred Time', 'preferred_time');
    addInput(AcEnumInputType.DatetimeLocal, 'Meeting Date & Time', 'meeting_datetime');
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
    const textarea = new AcTextareaInputElement();
    textarea.acContextKey = 'about_me';
    textarea.acContext = this.context;
    textarea.className = 'form-control';
    addField('About Me', textarea, allInputsGroup);

    const popoutTextArea = new AcPopoutTextareaInputElement();
    popoutTextArea.acContextKey = 'favourite_quote';
    popoutTextArea.acContext = this.context;
    popoutTextArea.className = 'form-control';
    addField('Fav Quote', popoutTextArea, allInputsGroup);

    // // Radio group: Contact Preference
    const radioLabel = document.createElement('div');
    radioLabel.className = 'fw-bold mt-3';
    radioLabel.textContent = 'Preferred Contact Method';
    allInputsGroup.appendChild(radioLabel);

    ['Email', 'Phone', 'In-app'].forEach((method) => {
      const radio = new AcOptionInputElement();
      radio.type = AcEnumInputType.Radio;
      radio.name = 'contact_preference';
      radio.value = method;
      radio.acContextKey = 'contact_preference';
      radio.acContext = this.context;
      radio.className = 'form-check-input';

      const div = document.createElement('div');
      div.className = 'form-check';
      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.textContent = method;
      radio.labelElement = label;

      div.appendChild(radio);
      div.appendChild(label);
      allInputsGroup.appendChild(div);
    });

    // // Checkbox group: Favorite Fruits
    const checkboxLabel = document.createElement('div');
    checkboxLabel.className = 'fw-bold mt-3';
    checkboxLabel.textContent = 'Fruits You Like';
    allInputsGroup.appendChild(checkboxLabel);

    ['Apple', 'Banana', 'Mango','Orange'].forEach((fruit) => {
      const checkbox = new AcOptionInputElement();
      checkbox.type = AcEnumInputType.Checkbox;
      checkbox.value = fruit;
      checkbox.acContextKey = 'interested_fruits';
      checkbox.acContext = this.context;
      checkbox.className = 'form-check-input';

      const div = document.createElement('div');
      div.className = 'form-check';
      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.textContent = fruit;
      checkbox.labelElement = div;

      div.appendChild(checkbox);
      div.appendChild(label);
      allInputsGroup.appendChild(div);
    });

    // Select: Preferred Framework
    const select = new AcSelectInputElement();
    select.acContextKey = 'preferred_framework';
    select.acContext = this.context;
    select.selectOptions = ['Angular', 'React', 'Vue.js', 'Svelte'];
    select.className = 'form-select';
    addField('Preferred Framework', select, allInputsGroup);

    const languageTags = new AcTagsInputElement();
    languageTags.acContextKey = 'languages';
    languageTags.acContext = this.context;
    languageTags.tagOptions = ['English', 'Hindi', 'Gujarati', 'Spanish', 'Sanskrit'];
    languageTags.className = 'form-control';
    addField('Languages', languageTags, allInputsGroup);

    this.pageHeader.addMenuItem({
      label: 'Record',
      children: [
        {
          label: 'Log',
          callback: () => {
            console.log(this.context);
            console.log(JSON.stringify(this.context));

          }
        },
        {
          label: 'Set Value',
          callback: () => this.setExampleValues()
        }
      ]
    });

    // let value:any = {'hello':'world'};
    // value['hello']='new world';
    // value['new-property']='hello world';
    // value = new Proxy(value, {
    //       deleteProperty: (target, prop)=>{
    //         console.log('Proxy value property deleted',target,prop);
    //         return false;
    //       },
    //       set: (target, prop, value) => {
    //         console.log('Proxy value property changes',target,prop,value);
    //         return true;
    //       }
    //     });
    //     value['hello'] = 'hello-modern-world';
    //     value['new-property'] = 'another-property';
    //     value['another-property'] = 'another-property';
    //     delete value['hello'];
    //     value['hello'] = {'hello':'modified',nested:{level1:{level2:'hello'}}};
    //     value.hello.nestes.level1['level2_alternative'] = {};

    // const reactiveProxy = new AcReactiveValueProxy(window);
    // this.context.__events__.subscribeAllEvents({callback:(event:string,params:any)=>{
    //   console.log(event,params);
    // }})
    // console.log(value);
  }

  setExampleValues() {
    Object.assign(this.context, {
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
      interested_fruits: ['Banana','Orange'],
      preferred_framework: 'React',
      languages: 'Telgu,English,Hindi,Sanskrit'
    });
  }
}
