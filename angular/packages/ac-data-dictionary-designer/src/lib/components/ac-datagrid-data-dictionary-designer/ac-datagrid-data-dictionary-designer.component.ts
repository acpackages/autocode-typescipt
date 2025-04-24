import { Component, Input, ViewChild } from '@angular/core';
import { AcBase } from '../../../../../autocode-angular/src/lib/_base/ac-base.component';
import { AcDDRelationship, AcDDTable, AcDDTableField, AcDDTableFieldProperty, AcDDTrigger, AcEnumDDFieldProperty, AcEnumDDFieldType } from '@ac_packages/autocode-data-dictionary';
import "@ac_packages/autocode-extensions";
import { AcDatagridComponent } from '../../../../../autocode-angular/src/lib/ac-datagrid/components/ac-datagrid/ac-datagrid.component';
import { AcDataDictionary } from '../../utilities/ac-data-dictionary';
@Component({
  selector: 'ac-datagrid-data-dictionary-designer',
  templateUrl: './ac-datagrid-data-dictionary-designer.component.html',
  styleUrl: './ac-datagrid-data-dictionary-designer.component.css',
  standalone:false
})
export class AcDatagridDataDictionaryDesignerComponent extends AcBase{
  @ViewChild('dataGridTables') dataGridTables!:AcDatagridComponent;
  @ViewChild('dataGridFields') dataGridFields!:AcDatagridComponent;
  @Input dataDictionaryJson:any = {};
  AcDDRelationship = AcDDRelationship;
  AcDDTable = AcDDTable;
  AcDDTableField = AcDDTableField;
  AcDDTableFieldProperty = AcDDTableFieldProperty;
  AcDDTrigger = AcDDTrigger;
  AcEnumDDFieldProperty = AcEnumDDFieldProperty;
  acDataDictionary:AcDataDictionary = new AcDataDictionary();
  tables:any[] = [];
  tableFields:any[] = [];
  tableRelationshipsDestination:any[] = [];
  tableRelationshipsSource:any[] = [];
  tableTriggers:any = [];
  optionsFieldTypes:any[] = [
    {'label':'AutoNumber','value':AcEnumDDFieldType.autoNumber},
    {'label':'Blob','value':AcEnumDDFieldType.blob},
    {'label':'Date','value':AcEnumDDFieldType.date},
    {'label':'DateTime','value':AcEnumDDFieldType.datetime},
    {'label':'Double','value':AcEnumDDFieldType.double},
    {'label':'Encrypted','value':AcEnumDDFieldType.encrypted},
    {'label':'Guid','value':AcEnumDDFieldType.guid},
    {'label':'Integer','value':AcEnumDDFieldType.integer},
    {'label':'Json','value':AcEnumDDFieldType.json},
    {'label':'MediaJson','value':AcEnumDDFieldType.mediaJson},
    {'label':'Password','value':AcEnumDDFieldType.password},
    {'label':'String','value':AcEnumDDFieldType.string},
    {'label':'Text','value':AcEnumDDFieldType.text},
    {'label':'Time','value':AcEnumDDFieldType.time},
    {'label':'Timestamp','value':AcEnumDDFieldType.timestamp},
    {'label':'UserDefined Function','value':AcEnumDDFieldType.userDefinedFunction},
  ];
  optionsTriggerExecution:any[] = [
    {'label':'After','value':'AFTER'},
    {'label':'Before','value':'BEFORE'}
  ];
  optionsTriggerOperation:any[] = [
    {'label':'Delete','value':'DELETE'},
    {'label':'Insert','value':'INSERT'},
    {'label':'Update','value':'UPDATE'}
  ];

  ngOnInit(): void {
    super.ngOnInit();
    this.loadDataDictionaryJson(this.dataDictionaryJson);
  }

  handleSelectedTableChange(){
    this.tableFields = this.acDataDictionary.getTableFieldsList({tableName:this.dataGridTables.selectedRowData[AcDDTable.keyTableName]});
    this.tableRelationshipsDestination = this.acDataDictionary.getTableRelationshipsList({tableName:this.dataGridTables.selectedRowData[AcDDTable.keyTableName],asDestination:true});
    this.tableRelationshipsSource = this.acDataDictionary.getTableRelationshipsList({tableName:this.dataGridTables.selectedRowData[AcDDTable.keyTableName],asDestination:false});
    this.tableTriggers = this.acDataDictionary.getTableTriggersList({tableName:this.dataGridTables.selectedRowData[AcDDTable.keyTableName]});
    // console.log(this);
  }

  loadDataDictionaryJson(dataDictionaryJson:any){
    this.acDataDictionary.setValuesFromJson(dataDictionaryJson);
    this.tables = this.acDataDictionary.getTablesList();
  }
}
