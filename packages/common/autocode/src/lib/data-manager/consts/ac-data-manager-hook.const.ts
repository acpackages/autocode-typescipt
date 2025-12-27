import { AC_DATA_MANAGER_EVENT } from "./ac-data-manager-event.const";


export const AC_DATA_MANAGER_HOOK = {
  ...AC_DATA_MANAGER_EVENT,
  AssignUniqueIdToDataChange : 'assignUniqueIdToDataChange',
  AssignUniqueParentIdToDataChange : 'assignUniqueParentIdToDataChange',
  DataParentUniqueValueKeyChange : 'dataParentUniqueValueKeyChange',
  DataUniqueValueKeyChange : 'dataUniqueValueKeyChange',
  UniqueIdKeyChange : 'uniqueIdKeyChange',
  UniqueIdParentKeyChange : 'uniqueIdParentKeyChange'
}
