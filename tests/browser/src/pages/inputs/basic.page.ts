/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-tiptap-editor-input/src/lib/css/ac-tiptap-editor-simple-editor.css';
import "./../../../../../node_modules/quill/dist/quill.snow.css";
import { AC_INPUT_ATTRIBUTE_NAME, AcArrayValuesInput, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridExtensionManager, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcDatagridSelectInput, AcEnumDatagridExtension, AcEnumInputType, AcForm, AcOptionInput, AcPopoutTextareaInput, AcSelectInput, AcTagsInput, AcTextareaInput, AcTextInput } from "@autocode-ts/ac-browser";
import { PageHeader } from "../../components/page-header/page-header.component";
import { customersData } from './../../../../data/customers-data';
import { ActionsDatagridColumn } from "../../components/actions-datagrid-column/actions-datagrid-column.component";
import { AcDatagridOnAgGridExtension, AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME, AgGridOnAcDatagrid } from "@autocode-ts/ac-datagrid-on-ag-grid";
import { AcDataManager, IAcOnDemandRequestArgs,AcContext } from "@autocode-ts/autocode";
import { acInitTipTapEditor, AcTiptapEditorInput } from "@autocode-ts/ac-tiptap-editor-input";
import { AcQuillEditorInput, acInitQuillEditor } from "@autocode-ts/ac-quill-editor-input";

export class InputBasicPage extends HTMLElement {
  offlineDataManager: AcDataManager = new AcDataManager();

  datagridApi!: AcDatagridApi;
  pageHeader: PageHeader = new PageHeader();
  agGridExtension!: AcDatagridOnAgGridExtension;
  columnDraggingExtension!: AcDatagridColumnDraggingExtension;
  columnsCustomizerExtension!: AcDatagridColumnsCustomizerExtension;
  dataExportXlsxExtension!: AcDatagridDataExportXlsxExtension;
  rowDraggingExtension!: AcDatagridRowDraggingExtension;
  rowNumbersExtension!: AcDatagridRowNumbersExtension;
  rowSelectionExtension!: AcDatagridRowSelectionExtension;
  form!: AcForm;
  btnSubmit!: HTMLButtonElement;
  context: AcContext = new AcContext({
    value: {
      full_name: 'Alice Johnson',
      bio:"This is bio of the element",
      personal_email: 'alice.j@example.com',
      user_password: 'Secret123!',
      age: 29,
      favorite_color: '#007bff',
      customer_id: '97667fd4-fbd2-48ea-a42f-6391505370e7',
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
      phone_numbers: [{ "label": "Home", "value": "0123456789" }, { "label": "Mobile", "value": "9876543210" }]
    }, name: 'record'
  });

  async connectedCallback() {
    acInitQuillEditor();
    acInitTipTapEditor();

    this.innerHTML = `<ac-form>
      <div class="container py-4">
        <div class="accordion" id="formAccordion"></div>
        <buton type="submit" class="btn btn-primary my-2">Submit</buton>
      </div>
    </ac-form>`;
    this.form = this.querySelector('ac-form') as AcForm;
    this.form.addEventListener('submit', () => {
      console.log(this.form.valuesToJsonObject());
    });
    console.dir(this);
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
    AcDatagridExtensionManager.register(AgGridOnAcDatagrid);
    this.offlineDataManager.autoSetUniqueIdToData = true;
    this.offlineDataManager.data = customersData;

    const datagridSelectContainer = document.createElement('div');
    datagridSelectContainer.className = 'mb-3';
    datagridSelectContainer.innerHTML = '<label>Linked Customer</label><ac-datagrid-select-input class="form-control"></ac-datagrid-select-input>';
    // allInputsGroup.appendChild(datagridSelectContainer);
    const datagridSelectInput: AcDatagridSelectInput = datagridSelectContainer.querySelector('ac-datagrid-select-input') as AcDatagridSelectInput;
    this.datagridApi = datagridSelectInput.datagrid.datagridApi;
    this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
    this.columnsCustomizerExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnsCustomizer }) as AcDatagridColumnsCustomizerExtension;
    this.dataExportXlsxExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.DataExportXlsx }) as AcDatagridDataExportXlsxExtension;
    this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
    this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
    this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;
    this.agGridExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME }) as AcDatagridOnAgGridExtension;

    this.datagridApi.usePagination = true;

    this.columnsCustomizerExtension.showColumnCustomizerPanel = true;

    this.rowNumbersExtension.showRowNumbers = true;

    this.rowSelectionExtension.allowSelection = true;
    this.rowSelectionExtension.allowMultipleSelection = true;
    datagridSelectInput.columnDefinitions = [
      { field: 'action', title: "", allowSort: false, cellRendererElement: ActionsDatagridColumn, width: 65 },
      { field: 'customer_id', title: "Id" },
      { field: 'first_name', title: "First Name", allowEdit: true },
      { field: 'last_name', title: "Last Name" },
      { field: 'company', title: "Company" },
      { field: 'city', title: "City" },
      { field: 'country', title: "Country" },
      { field: 'phone_1', title: "Phone 1" },
      { field: 'phone_2', title: "Phone 2" },
      { field: 'email', title: "Email" },
      { field: 'subscription_date', title: "Subscription Date" },
      { field: 'website', title: "Website" },
    ];

    datagridSelectInput.data = customersData;

    const onDemandSelectContainer = document.createElement('div');
    onDemandSelectContainer.className = 'mb-3';
    onDemandSelectContainer.innerHTML = '<label>Linked Customer</label><ac-select-input class="form-control" placeholder="Select Customer"></ac-select-input>';
    allInputsGroup.appendChild(onDemandSelectContainer);
    const onDemandSelectInput: AcSelectInput = onDemandSelectContainer.querySelector('ac-select-input') as AcSelectInput;
    onDemandSelectInput.labelKey = 'first_name';
    onDemandSelectInput.valueKey = 'customer_id';
    onDemandSelectInput.acContextKey = 'customer_id';
    onDemandSelectInput.acContext = this.context;
    onDemandSelectInput.dataManager.onDemandFunction = async (args: IAcOnDemandRequestArgs) => {
      // console.log("Getting on demand data");
      // console.log(args);
      if (args.filterGroup && args.filterGroup.filters && args.filterGroup.filters.length > 0) {
        this.offlineDataManager.filterGroup = args.filterGroup;
        this.offlineDataManager.processRows();
      }

      const totalCount = this.offlineDataManager.totalRows;
      const data = await this.offlineDataManager.getData({ startIndex: args.startIndex, rowsCount: args.rowsCount });
      const response = {
        totalCount,
        data
      };
      console.log(response);
      args.successCallback(response);
    };

    console.dir(onDemandSelectInput);

    const tiptapEditorContainer = document.createElement('div');
    tiptapEditorContainer.style.height = "300px";
    tiptapEditorContainer.className = 'mb-3';
    tiptapEditorContainer.innerHTML = '<label>Bio</label><ac-tiptap-editor-input></ac-tiptap-editor-input>';
    // allInputsGroup.appendChild(tiptapEditorContainer);

    const quillEditorContainer = document.createElement('div');
    quillEditorContainer.style.height = "300px";
    quillEditorContainer.className = 'mb-3';
    quillEditorContainer.innerHTML = '<label>Bio</label><ac-quill-editor-input value="Sample editor content"></ac-quill-editor-input>';
    const quillEditor: AcQuillEditorInput = quillEditorContainer.querySelector('ac-quill-editor-input') as AcQuillEditorInput;
    quillEditor.acContextKey = 'bio';
    quillEditor.acContext = this.context;
    allInputsGroup.appendChild(quillEditorContainer);


    const addInput = (type: AcEnumInputType, label: string, key: string) => {
      const input = new AcTextInput();
      input.type = type;
      input.name = key;
      input.acContextKey = key;
      input.acContext = this.context;
      input.className = 'form-control';
      input.setAttribute('required', 'true');
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
    const arrayValuesElement = new AcArrayValuesInput();
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
    arrayValuesElement.name = 'phone_numbers';
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
    const textarea = new AcTextareaInput();
    textarea.acContextKey = 'about_me';
    textarea.name = 'about_me';
    textarea.acContext = this.context;
    textarea.className = 'form-control';
    addField('About Me', textarea, allInputsGroup);

    const popoutTextArea = new AcPopoutTextareaInput();
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
      const radio = new AcOptionInput();
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

    ['Apple', 'Banana', 'Mango', 'Orange'].forEach((fruit) => {
      const checkbox = new AcOptionInput();
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
    const select = new AcSelectInput();
    select.acContextKey = 'preferred_framework';
    select.name = 'preferred_framework';
    select.acContext = this.context;
    select.options = ['Angular', 'React', 'Vue.js', 'Svelte'];
    select.className = 'form-select';
    select.addOption = true;
    select.addOptionCallback = ({ query, callback }: { query: string, callback: Function }) => {
      alert(`Adding option : ${query}`);
      callback({ label: query, value: query });;
    };
    addField('Preferred Framework', select, allInputsGroup);

    const languageTags = new AcTagsInput();
    languageTags.acContextKey = 'languages';
    languageTags.name = 'languages';
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
    setTimeout(() => {
      this.setExampleValues()
    }, 5000);
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
      interested_fruits: ['Banana', 'Orange'],
      preferred_framework: 'React',
      languages: 'Telgu,English,Hindi,Sanskrit',
      customer_id:'fa51d247-f53c-4f25-8436-9de299bb9160'
    });
  }
}
