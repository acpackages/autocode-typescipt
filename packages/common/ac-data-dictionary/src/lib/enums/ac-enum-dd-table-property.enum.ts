
export const AcEnumDDTableProperty = {
  ORDER_BY: "order_by",
  INDEX: "index",
  PLURAL_NAME: "plural_name",
  SELECT_QUERY_COLUMNS: "select_query_columns",
  SELECT_QUERY: "select_query",
  SELECT_REQUEST_COLUMNS: "select_request_columns",
  SELECT_VIEW_NAME: "select_view_name",
  SINGULAR_NAME: "singular_name",
  ADDITIONAL_FILTER_COLUMNS: "additional_filter_columns",
} as const;

export type AcEnumDDTableProperty = typeof AcEnumDDTableProperty[keyof typeof AcEnumDDTableProperty];
