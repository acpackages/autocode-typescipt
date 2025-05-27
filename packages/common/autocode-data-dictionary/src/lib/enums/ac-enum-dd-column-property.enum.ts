
export const AcEnumDDColumnProperty = {
  AUTO_INCREMENT: "auto_increment",
  AUTO_NUMBER_LENGTH: "auto_number_length",
  AUTO_NUMBER_PREFIX: "auto_number_prefix",
  CHECK_IN_AUTO_NUMBER: "check_in_auto_number",
  CHECK_IN_MODIFY: "check_in_modify",
  CHECK_IN_SAVE: "check_in_save",
  COLUMN_TITLE: "column_title",
  DEFAULT_VALUE: "default_value",
  FOREIGN_KEY: "foreign_key",
  FORMAT: "format",
  IS_SELECT_DISTINCT: "is_select_distinct",
  IN_SEARCH_QUERY: "in_search_query",
  NOT_NULL: "not_null",
  REMARKS: "remarks",
  REQUIRED: "required",
  PRIMARY_KEY: "primary_key",
  SELECT_OPTIONS: "select_options",
  SET_NULL_BEFORE_DELETE: "set_null_before_delete",
  SIZE: "size",
  UNIQUE_KEY: "unique_key",
} as const;

export type AcEnumDDColumnProperty = typeof AcEnumDDColumnProperty[keyof typeof AcEnumDDColumnProperty];
