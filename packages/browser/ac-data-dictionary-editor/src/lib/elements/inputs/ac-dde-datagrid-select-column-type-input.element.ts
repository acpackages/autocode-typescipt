import { IAcDatagridCellRendererElement, IAcDatagridCellRendererElementArgs, AcSelectInput } from '@autocode-ts/ac-browser';
import { AcEnumDDColumnType } from '@autocode-ts/ac-data-dictionary';
export class AcDDEDatagridSelectColumnTypeInput implements IAcDatagridCellRendererElement{
  selectInput:AcSelectInput = new AcSelectInput();

  destroy?(): void {
    this.selectInput.destroy();
  }

  focus?(): void {
    this.selectInput.element.focus();
  }

  getElement(): HTMLElement {
    return this.selectInput.element;
  }

  init(args: IAcDatagridCellRendererElementArgs): void {
    this.selectInput.init();
    this.selectInput.selectOptions = [
      {label:'Auto Increment',value:AcEnumDDColumnType.AutoIncrement},
      {label:'Auto Index',value:AcEnumDDColumnType.AutoIndex},
      {label:'Auto Number',value:AcEnumDDColumnType.AutoNumber},
      {label:'Blob',value:AcEnumDDColumnType.Blob},
      {label:'Date',value:AcEnumDDColumnType.Date},
      {label:'Datetime',value:AcEnumDDColumnType.Datetime},
      {label:'Double',value:AcEnumDDColumnType.Double},
      {label:'Encrypted',value:AcEnumDDColumnType.Encrypted},
      {label:'Integer',value:AcEnumDDColumnType.Integer},
      {label:'Json',value:AcEnumDDColumnType.Json},
      // {label:'Media Json',value:AcEnumDDColumnType.MediaJson},
      {label:'Password',value:AcEnumDDColumnType.Password},
      {label:'String',value:AcEnumDDColumnType.String},
      {label:'Text',value:AcEnumDDColumnType.Text},
      {label:'Time',value:AcEnumDDColumnType.Time},
      {label:'Timestamp',value:AcEnumDDColumnType.Timestamp},
      {label:'User Defined Function',value:AcEnumDDColumnType.UserDefinedFunction},
      {label:'UUID',value:AcEnumDDColumnType.Uuid},
      {label:'Yes/No',value:AcEnumDDColumnType.YesNo}
    ];
    this.selectInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnDefinition.field]!
  }

  refresh(args: IAcDatagridCellRendererElementArgs): void {
    this.selectInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnDefinition.field]!;
  }

}
