export class AcDataDictionaryAutoApiConfig {
  static pathForDelete = 'delete';
  static pathForInsert = 'add';
  static pathForSave = 'save';
  static pathForSelect = 'get';
  static pathForSelectDistinct = 'unique';
  static pathForUpdate = 'update';

  static selectParameterQueryKey = "query";
  static selectParameterPageNumberKey = "pageNumber";
  static selectParameterPageSizeKey = "pageSize";
  static selectParameterOrderByKey = "orderBy";
  static selectParameterAllRows = "allRows";
  static selectParameterFiltersKey = "filters";
  static selectParameterIncludeColumnsKey = "includeColumns";
  static selectParameterExcludeColumnsKey = "excludeColumns";
}
