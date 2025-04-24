export const  dataDictionaryJson = {
	"tables" : {
		"access_groups" : {
			 "table_name" : "access_groups",
			 "table_fields" : {
				"access_group_id" : {
					"field_name" : "access_group_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Access Group Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"access_group_name" : {
					"field_name" : "access_group_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Access Group Name"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"access_group_number" : {
					"field_name" : "access_group_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Access Group Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"access_group_status" : {
					"field_name" : "access_group_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Access Group Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"access_rights" : {
					"field_name" : "access_rights",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Access Rights"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"access_rights" : {
			 "table_name" : "access_rights",
			 "table_fields" : {
				"access_group_id" : {
					"field_name" : "access_group_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"access_right_id" : {
					"field_name" : "access_right_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"access_right_name" : {
					"field_name" : "access_right_name",
					"field_type" : "string",
					"field_properties" : {
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"accounts" : {
			 "table_name" : "accounts",
			 "table_fields" : {
				"account_balance" : {
					"field_name" : "account_balance",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account Balance"
						}
					}
				},
				"account_category" : {
					"field_name" : "account_category",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account Category"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"account_id" : {
					"field_name" : "account_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"account_name" : {
					"field_name" : "account_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"account_number" : {
					"field_name" : "account_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "ACC"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"account_target" : {
					"field_name" : "account_target",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account Traget"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "BALANCE SHEET"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"TRADING","value":"TRADING"},{"label":"TRADING ACCOUNT","value":"TRADING ACCOUNT"},{"label":"PROFIT AND LOSS ACCOUNT","value":"PROFIT AND LOSS ACCOUNT"},{"label":"BALANCE SHEET","value":"BALANCE SHEET"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"account_type" : {
					"field_name" : "account_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account Type"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contra Id"
						}
					}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contra Type"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"is_expense" : {
					"field_name" : "is_expense",
					"field_type" : "yes_no",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Is Expends?"
						}
					}
				},
				"is_income" : {
					"field_name" : "is_income",
					"field_type" : "yes_no",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Is Income?"
						}
					}
				},
				"parent_account_id" : {
					"field_name" : "parent_account_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Parent Account"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"show_for_purchase" : {
					"field_name" : "show_for_purchase",
					"field_type" : "yes_no",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Show for Purchase?"
						}
					}
				},
				"show_for_sale" : {
					"field_name" : "show_for_sale",
					"field_type" : "yes_no",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Show for Sale?"
						}
					}
				}
			}
		},
		"api_logs" : {
			 "table_name" : "api_logs",
			 "table_fields" : {
				"api_log_id" : {
					"field_name" : "api_log_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"api_request_status" : {
					"field_name" : "api_request_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"api_request_timestamp" : {
					"field_name" : "api_request_timestamp",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"api_resonse_timestamp" : {
					"field_name" : "api_resonse_timestamp",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"log_file_path" : {
					"field_name" : "log_file_path",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"request_details" : {
					"field_name" : "request_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"response_details" : {
					"field_name" : "response_details",
					"field_type" : "json",
					"field_properties" : {}
				}
			}
		},
		"apis" : {
			 "table_name" : "apis",
			 "table_fields" : {
				"api_id" : {
					"field_name" : "api_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"api_name" : {
					"field_name" : "api_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"api_url" : {
					"field_name" : "api_url",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"asset_attributes" : {
			 "table_name" : "asset_attributes",
			 "table_fields" : {
				"asset_attribute_id" : {
					"field_name" : "asset_attribute_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"attribute_label" : {
					"field_name" : "attribute_label",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"attribute_value" : {
					"field_name" : "attribute_value",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"attribute_value_type" : {
					"field_name" : "attribute_value_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"asset_depreciations" : {
			 "table_name" : "asset_depreciations",
			 "table_fields" : {
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company"
						}
					}
				},
				"depreciation_amount" : {
					"field_name" : "depreciation_amount",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Depreciation Amount"
						}
					}
				},
				"depreciation_date" : {
					"field_name" : "depreciation_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Depreciation Date"
						}
					}
				},
				"depreciation_id" : {
					"field_name" : "depreciation_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Depreciation Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"depreciation_number" : {
					"field_name" : "depreciation_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Depreciation Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"depreciation_percentage" : {
					"field_name" : "depreciation_percentage",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Depreciation Percentage"
						}
					}
				},
				"new_asset_value" : {
					"field_name" : "new_asset_value",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "New Asset Value"
						}
					}
				},
				"old_asset_value" : {
					"field_name" : "old_asset_value",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Old Asset value"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Transaction Id"
						}
					}
				}
			}
		},
		"asset_insurances" : {
			 "table_name" : "asset_insurances",
			 "table_fields" : {
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset"
						}
					}
				},
				"asset_insurance_amount" : {
					"field_name" : "asset_insurance_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Insurance Amount"
						}
					}
				},
				"asset_insurance_date" : {
					"field_name" : "asset_insurance_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Insurance Date"
						}
					}
				},
				"asset_insurance_expiry_date" : {
					"field_name" : "asset_insurance_expiry_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Insurance Expiry Date"
						}
					}
				},
				"asset_insurance_id" : {
					"field_name" : "asset_insurance_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Insurance Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"asset_insurance_number" : {
					"field_name" : "asset_insurance_number",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Insurance Number"
						}
					}
				},
				"asset_insurance_status" : {
					"field_name" : "asset_insurance_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Insurance Status"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"asset_items" : {
			 "table_name" : "asset_items",
			 "table_fields" : {
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"asset_item_id" : {
					"field_name" : "asset_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"asset_licenses" : {
			 "table_name" : "asset_licenses",
			 "table_fields" : {
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset"
						}
					}
				},
				"asset_license_date" : {
					"field_name" : "asset_license_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Date"
						}
					}
				},
				"asset_license_expiry_date" : {
					"field_name" : "asset_license_expiry_date",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Expiry Date"
						}
					}
				},
				"asset_license_id" : {
					"field_name" : "asset_license_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"asset_license_name" : {
					"field_name" : "asset_license_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Number"
						}
					}
				},
				"asset_license_number" : {
					"field_name" : "asset_license_number",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Number"
						}
					}
				},
				"asset_license_status" : {
					"field_name" : "asset_license_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Status"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"asset_maintenance" : {
			 "table_name" : "asset_maintenance",
			 "table_fields" : {
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"asset_maintenance_id" : {
					"field_name" : "asset_maintenance_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"maintenance_endtime" : {
					"field_name" : "maintenance_endtime",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"maintenance_starttime" : {
					"field_name" : "maintenance_starttime",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"maintenance_status" : {
					"field_name" : "maintenance_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"maintenance_type" : {
					"field_name" : "maintenance_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"request_attachments" : {
					"field_name" : "request_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"request_remarks" : {
					"field_name" : "request_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"response_attachments" : {
					"field_name" : "response_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"response_remarks" : {
					"field_name" : "response_remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"asset_maintenance_expenses" : {
			 "table_name" : "asset_maintenance_expenses",
			 "table_fields" : {
				"asset_maintenance_id" : {
					"field_name" : "asset_maintenance_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"maintenance_expense_id" : {
					"field_name" : "maintenance_expense_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"asset_requests" : {
			 "table_name" : "asset_requests",
			 "table_fields" : {
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"asset_request_id" : {
					"field_name" : "asset_request_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"delivered_by" : {
					"field_name" : "delivered_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"delivered_on" : {
					"field_name" : "delivered_on",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"delivery_attachments" : {
					"field_name" : "delivery_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"delivery_location" : {
					"field_name" : "delivery_location",
					"field_type" : "json",
					"field_properties" : {}
				},
				"delivery_remarks" : {
					"field_name" : "delivery_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"request_quantity" : {
					"field_name" : "request_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"request_status" : {
					"field_name" : "request_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"requested_by" : {
					"field_name" : "requested_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"requested_on" : {
					"field_name" : "requested_on",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"required_on" : {
					"field_name" : "required_on",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"trip_id" : {
					"field_name" : "trip_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"assets" : {
			 "table_name" : "assets",
			 "table_fields" : {
				"account_id" : {
					"field_name" : "account_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account"
						}
					}
				},
				"asset_details" : {
					"field_name" : "asset_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Assed Details"
						}
					}
				},
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"asset_images" : {
					"field_name" : "asset_images",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Images"
						}
					}
				},
				"asset_make" : {
					"field_name" : "asset_make",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Make"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"asset_model" : {
					"field_name" : "asset_model",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Model"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"asset_name" : {
					"field_name" : "asset_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"asset_number" : {
					"field_name" : "asset_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"asset_serial_number" : {
					"field_name" : "asset_serial_number",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Serial Number"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"asset_status" : {
					"field_name" : "asset_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Status"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"asset_type" : {
					"field_name" : "asset_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Type"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"asset_uses" : {
					"field_name" : "asset_uses",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Uses"
						}
					}
				},
				"asset_weight" : {
					"field_name" : "asset_weight",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Weight"
						}
					}
				},
				"asset_weight_unit" : {
					"field_name" : "asset_weight_unit",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset Weight Unit"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"available_for_use" : {
					"field_name" : "available_for_use",
					"field_type" : "yes_no",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Is Available?"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"depreciation_occurance" : {
					"field_name" : "depreciation_occurance",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Depreciation Occurrence"
						}
					}
				},
				"depreciation_percentage" : {
					"field_name" : "depreciation_percentage",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Depreciation Percentage"
						}
					}
				},
				"depreciation_remarks" : {
					"field_name" : "depreciation_remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Depreciation Remarks"
						}
					}
				},
				"insurance_attachments" : {
					"field_name" : "insurance_attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Insurance Attachments"
						}
					}
				},
				"license_attachments" : {
					"field_name" : "license_attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Attachments"
						}
					}
				},
				"license_details" : {
					"field_name" : "license_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Details"
						}
					}
				},
				"license_expiry_date" : {
					"field_name" : "license_expiry_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Expiry Date"
						}
					}
				},
				"license_number" : {
					"field_name" : "license_number",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Number"
						}
					}
				},
				"license_remarks" : {
					"field_name" : "license_remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "License Remarks"
						}
					}
				},
				"maintenance_duration" : {
					"field_name" : "maintenance_duration",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Maintenance Duration"
						}
					}
				},
				"maintenance_occurence" : {
					"field_name" : "maintenance_occurence",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Maintenanc Occurrence"
						}
					}
				},
				"maintenance_remarks" : {
					"field_name" : "maintenance_remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Maintenance Remarks"
						}
					}
				},
				"purchase_date" : {
					"field_name" : "purchase_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Purchase Date"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"warranty_attachments" : {
					"field_name" : "warranty_attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Warranty Attachments"
						}
					}
				},
				"warranty_expiry_date" : {
					"field_name" : "warranty_expiry_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Warranty Expiry Date"
						}
					}
				},
				"warranty_number" : {
					"field_name" : "warranty_number",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Warranty Number"
						}
					}
				},
				"warranty_remarks" : {
					"field_name" : "warranty_remarks",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Warranty Remarks"
						}
					}
				}
			}
		},
		"automated_task_logs" : {
			 "table_name" : "automated_task_logs",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"automated_task_event" : {
					"field_name" : "automated_task_event",
					"field_type" : "string",
					"field_properties" : {}
				},
				"automated_task_id" : {
					"field_name" : "automated_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"automated_task_log_id" : {
					"field_name" : "automated_task_log_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"automated_task_log_number" : {
					"field_name" : "automated_task_log_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"automated_task_message" : {
					"field_name" : "automated_task_message",
					"field_type" : "text",
					"field_properties" : {}
				},
				"automated_task_record_id" : {
					"field_name" : "automated_task_record_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"automated_task_status" : {
					"field_name" : "automated_task_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"automated_task_table" : {
					"field_name" : "automated_task_table",
					"field_type" : "string",
					"field_properties" : {}
				},
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"log_file_path" : {
					"field_name" : "log_file_path",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_automated_task_logs"
		},
		"automated_tasks" : {
			 "table_name" : "automated_tasks",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"automated_task_id" : {
					"field_name" : "automated_task_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"automated_task_name" : {
					"field_name" : "automated_task_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"automated_task_number" : {
					"field_name" : "automated_task_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"automated_task_status" : {
					"field_name" : "automated_task_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"rete_json" : {
					"field_name" : "rete_json",
					"field_type" : "text",
					"field_properties" : {}
				},
				"task_json" : {
					"field_name" : "task_json",
					"field_type" : "json",
					"field_properties" : {}
				}
			}
		},
		"automation_flags" : {
			 "table_name" : "automation_flags",
			 "table_fields" : {
				"automation_flag_id" : {
					"field_name" : "automation_flag_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"automation_flag_name" : {
					"field_name" : "automation_flag_name",
					"field_type" : "text",
					"field_properties" : {}
				},
				"automation_flag_value" : {
					"field_name" : "automation_flag_value",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"backups" : {
			 "table_name" : "backups",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"backup_details" : {
					"field_name" : "backup_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"backup_id" : {
					"field_name" : "backup_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"backup_initiation" : {
					"field_name" : "backup_initiation",
					"field_type" : "string",
					"field_properties" : {}
				},
				"backup_mode" : {
					"field_name" : "backup_mode",
					"field_type" : "string",
					"field_properties" : {}
				},
				"backup_number" : {
					"field_name" : "backup_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"backup_path" : {
					"field_name" : "backup_path",
					"field_type" : "text",
					"field_properties" : {}
				},
				"backup_size" : {
					"field_name" : "backup_size",
					"field_type" : "double",
					"field_properties" : {}
				},
				"backup_status" : {
					"field_name" : "backup_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"log_file_path" : {
					"field_name" : "log_file_path",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				}
			}
		},
		"barcodes" : {
			 "table_name" : "barcodes",
			 "table_fields" : {
				"barcode_id" : {
					"field_name" : "barcode_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"barcode_status" : {
					"field_name" : "barcode_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"barcode_value" : {
					"field_name" : "barcode_value",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				}
			}
		},
		"bookings" : {
			 "table_name" : "bookings",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"booking_id" : {
					"field_name" : "booking_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"booking_number" : {
					"field_name" : "booking_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"booking_status" : {
					"field_name" : "booking_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"resource_id" : {
					"field_name" : "resource_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"resource_type" : {
					"field_name" : "resource_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				}
			}
		},
		"checklist_items" : {
			 "table_name" : "checklist_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"checklist_id" : {
					"field_name" : "checklist_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"checklist_item_id" : {
					"field_name" : "checklist_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"checklist_item_name" : {
					"field_name" : "checklist_item_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"checklist_item_status" : {
					"field_name" : "checklist_item_status",
					"field_type" : "string",
					"field_properties" : {
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"}]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"checklists" : {
			 "table_name" : "checklists",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"checklist_id" : {
					"field_name" : "checklist_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"checklist_name" : {
					"field_name" : "checklist_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"checklist_status" : {
					"field_name" : "checklist_status",
					"field_type" : "string",
					"field_properties" : {}
				},
				"checklist_type" : {
					"field_name" : "checklist_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"completed_items" : {
					"field_name" : "completed_items",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"pending_items" : {
					"field_name" : "pending_items",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"companies" : {
			 "table_name" : "companies",
			 "table_fields" : {
				"address_details" : {
					"field_name" : "address_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Address"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"bank_details" : {
					"field_name" : "bank_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Bank Details"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"company_name" : {
					"field_name" : "company_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"email_details" : {
					"field_name" : "email_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"email_values" : {
					"field_name" : "email_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"fax_details" : {
					"field_name" : "fax_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Details"
						}
					}
				},
				"fax_values" : {
					"field_name" : "fax_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Details"
						}
					}
				},
				"legal_details" : {
					"field_name" : "legal_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Legal Details"
						}
					}
				},
				"logo_url" : {
					"field_name" : "logo_url",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Logo Image"
						}
					}
				},
				"phone_details" : {
					"field_name" : "phone_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"phone_values" : {
					"field_name" : "phone_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"social_details" : {
					"field_name" : "social_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Social Details"
						}
					}
				},
				"website_details" : {
					"field_name" : "website_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				},
				"website_values" : {
					"field_name" : "website_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				},
				"year_end" : {
					"field_name" : "year_end",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Year End"
						}
					}
				},
				"year_start" : {
					"field_name" : "year_start",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Year Start"
						}
					}
				}
			},
			"select_view_name" : "vw_companies"
		},
		"company_email_credentials" : {
			 "table_name" : "company_email_credentials",
			 "table_fields" : {
				"company_email_credential_id" : {
					"field_name" : "company_email_credential_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_modify" : {
							"property_name" : "check_in_modify",
							"property_value" : true
						}
					}
				},
				"from_email_address" : {
					"field_name" : "from_email_address",
					"field_type" : "text",
					"field_properties" : {}
				},
				"from_name" : {
					"field_name" : "from_name",
					"field_type" : "text",
					"field_properties" : {}
				},
				"password" : {
					"field_name" : "password",
					"field_type" : "password",
					"field_properties" : {}
				},
				"smtp_host" : {
					"field_name" : "smtp_host",
					"field_type" : "text",
					"field_properties" : {}
				},
				"smtp_port" : {
					"field_name" : "smtp_port",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"smtp_secure" : {
					"field_name" : "smtp_secure",
					"field_type" : "string",
					"field_properties" : {
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"YES","value":"YES"},{"label":"NO","value":"NO"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"username" : {
					"field_name" : "username",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"countries" : {
			 "table_name" : "countries",
			 "table_fields" : {
				"country_id" : {
					"field_name" : "country_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"country_name" : {
					"field_name" : "country_name",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"currency_name" : {
					"field_name" : "currency_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"currency_symbol" : {
					"field_name" : "currency_symbol",
					"field_type" : "string",
					"field_properties" : {}
				},
				"nationality" : {
					"field_name" : "nationality",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				}
			}
		},
		"coupon_issues" : {
			 "table_name" : "coupon_issues",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"coupon_id" : {
					"field_name" : "coupon_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon"
						}
					}
				},
				"coupon_issue_id" : {
					"field_name" : "coupon_issue_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Issue Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"coupon_issue_status" : {
					"field_name" : "coupon_issue_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Issue Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ISSUED"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ISSUED","value":"ISSUED"},{"label":"USED","value":"USED"},{"label":"CANCELLED","value":"CANCELLED"},{"label":"EXPIRED","value":"EXPIRED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"unique_identifier" : {
					"field_name" : "unique_identifier",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Unique Identifier"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				}
			}
		},
		"coupon_uses" : {
			 "table_name" : "coupon_uses",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company"
						}
					}
				},
				"coupon_issue_id" : {
					"field_name" : "coupon_issue_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Issue"
						}
					}
				},
				"coupon_use_id" : {
					"field_name" : "coupon_use_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupn Use Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"coupon_use_number" : {
					"field_name" : "coupon_use_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Use Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Transaction"
						}
					}
				}
			}
		},
		"coupons" : {
			 "table_name" : "coupons",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"coupon_amount" : {
					"field_name" : "coupon_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Amount"
						}
					}
				},
				"coupon_code" : {
					"field_name" : "coupon_code",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Code"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"coupon_id" : {
					"field_name" : "coupon_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"coupon_name" : {
					"field_name" : "coupon_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"coupon_number" : {
					"field_name" : "coupon_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"coupon_status" : {
					"field_name" : "coupon_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Coupon Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"EXPIRED","value":"EXPIRED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"valid_from" : {
					"field_name" : "valid_from",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Valid From"
						}
					}
				},
				"valid_to" : {
					"field_name" : "valid_to",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Valid To"
						}
					}
				}
			},
			"select_view_name" : "vw_coupons"
		},
		"cron_logs" : {
			 "table_name" : "cron_logs",
			 "table_fields" : {
				"cron_details" : {
					"field_name" : "cron_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"cron_job_id" : {
					"field_name" : "cron_job_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"cron_name" : {
					"field_name" : "cron_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"cron_status" : {
					"field_name" : "cron_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "FAILURE"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"log_file_path" : {
					"field_name" : "log_file_path",
					"field_type" : "text",
					"field_properties" : {}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				}
			}
		},
		"currencies" : {
			 "table_name" : "currencies",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"country_name" : {
					"field_name" : "country_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Country Name"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Currency Code"
						},
						"unique_key" : {
							"property_name" : "unique_key",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"currency_id" : {
					"field_name" : "currency_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Currency Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"currency_name" : {
					"field_name" : "currency_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Currency Name"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"current_rate" : {
					"field_name" : "current_rate",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"last_updated_at" : {
					"field_name" : "last_updated_at",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Last Updated At"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"symbol" : {
					"field_name" : "symbol",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Currency Symbol"
						}
					}
				}
			}
		},
		"currency_denominations" : {
			 "table_name" : "currency_denominations",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"denomination_id" : {
					"field_name" : "denomination_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"denomination_label" : {
					"field_name" : "denomination_label",
					"field_type" : "string",
					"field_properties" : {}
				},
				"denomination_value" : {
					"field_name" : "denomination_value",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"currency_rate_updates" : {
			 "table_name" : "currency_rate_updates",
			 "table_fields" : {
				"approved_at" : {
					"field_name" : "approved_at",
					"field_type" : "string",
					"field_properties" : {}
				},
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"currency_rate_id" : {
					"field_name" : "currency_rate_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"currency_rate_status" : {
					"field_name" : "currency_rate_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"source" : {
					"field_name" : "source",
					"field_type" : "string",
					"field_properties" : {}
				},
				"source_time" : {
					"field_name" : "source_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"updated_at" : {
					"field_name" : "updated_at",
					"field_type" : "datetime",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_currency_rate_updates"
		},
		"customer_contracts" : {
			 "table_name" : "customer_contracts",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"credit_amount" : {
					"field_name" : "credit_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Credit Amount"
						}
					}
				},
				"credit_days" : {
					"field_name" : "credit_days",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Credit Days"
						}
					}
				},
				"customer_contract_end_date" : {
					"field_name" : "customer_contract_end_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract End Date"
						}
					}
				},
				"customer_contract_id" : {
					"field_name" : "customer_contract_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer Contract Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"customer_contract_number" : {
					"field_name" : "customer_contract_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "CONT-"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer Contract Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"customer_contract_start_date" : {
					"field_name" : "customer_contract_start_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract Start Date"
						}
					}
				},
				"customer_contract_status" : {
					"field_name" : "customer_contract_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "INACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"EXPIRED","value":"EXPIRED"},{"label":"CANCELLED","value":"CANCELLED"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"customer_id" : {
					"field_name" : "customer_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"select_view_name" : "vw_customer_contracts"
		},
		"customers" : {
			 "table_name" : "customers",
			 "table_fields" : {
				"account_id" : {
					"field_name" : "account_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account Id"
						}
					}
				},
				"address_details" : {
					"field_name" : "address_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Address"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"bank_details" : {
					"field_name" : "bank_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Bank Details"
						}
					}
				},
				"business_type" : {
					"field_name" : "business_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Business Type"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"contact_person" : {
					"field_name" : "contact_person",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contact Person"
						}
					}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Currency"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"customer_category" : {
					"field_name" : "customer_category",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer Category"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"customer_id" : {
					"field_name" : "customer_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"customer_image_url" : {
					"field_name" : "customer_image_url",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer Image"
						}
					}
				},
				"customer_name" : {
					"field_name" : "customer_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"customer_number" : {
					"field_name" : "customer_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "CUST-"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"dock_id" : {
					"field_name" : "dock_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Preferred Dock"
						}
					}
				},
				"email_details" : {
					"field_name" : "email_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"email_values" : {
					"field_name" : "email_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"fax_details" : {
					"field_name" : "fax_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numbers"
						}
					}
				},
				"fax_values" : {
					"field_name" : "fax_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numbers"
						}
					}
				},
				"is_enquiry" : {
					"field_name" : "is_enquiry",
					"field_type" : "yes_no",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Is Enquiry?"
						}
					}
				},
				"legal_details" : {
					"field_name" : "legal_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Legal Details"
						}
					}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Payment Terms"
						}
					}
				},
				"phone_details" : {
					"field_name" : "phone_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"phone_values" : {
					"field_name" : "phone_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Pricing Group"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_term_id" : {
					"field_name" : "sale_term_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Sale Terms"
						}
					}
				},
				"social_details" : {
					"field_name" : "social_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Social Media Details"
						}
					}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Default Tax"
						}
					}
				},
				"website_details" : {
					"field_name" : "website_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Website Urls"
						}
					}
				},
				"website_values" : {
					"field_name" : "website_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Website Urls"
						}
					}
				}
			},
			"select_view_name" : "vw_customers"
		},
		"dashboard_widgets" : {
			 "table_name" : "dashboard_widgets",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"widget_details" : {
					"field_name" : "widget_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"widget_id" : {
					"field_name" : "widget_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"widget_image_url" : {
					"field_name" : "widget_image_url",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"widget_name" : {
					"field_name" : "widget_name",
					"field_type" : "string",
					"field_properties" : {
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"widget_number" : {
					"field_name" : "widget_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"widget_properties" : {
					"field_name" : "widget_properties",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"widget_type" : {
					"field_name" : "widget_type",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"dashboards" : {
			 "table_name" : "dashboards",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"dashboard_id" : {
					"field_name" : "dashboard_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"dashboard_name" : {
					"field_name" : "dashboard_name",
					"field_type" : "string",
					"field_properties" : {
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"dashboard_number" : {
					"field_name" : "dashboard_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"dashboard_status" : {
					"field_name" : "dashboard_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"dashboard_widgets" : {
					"field_name" : "dashboard_widgets",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"database_fields" : {
			 "table_name" : "database_fields",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"field_details" : {
					"field_name" : "field_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"field_id" : {
					"field_name" : "field_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"field_label" : {
					"field_name" : "field_label",
					"field_type" : "string",
					"field_properties" : {}
				},
				"field_name" : {
					"field_name" : "field_name",
					"field_type" : "string",
					"field_properties" : {
						"check_in_modify" : {
							"property_name" : "check_in_modify",
							"property_value" : true
						}
					}
				},
				"field_properties" : {
					"field_name" : "field_properties",
					"field_type" : "json",
					"field_properties" : {}
				},
				"field_type" : {
					"field_name" : "field_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"table_name" : {
					"field_name" : "table_name",
					"field_type" : "string",
					"field_properties" : {
						"check_in_modify" : {
							"property_name" : "check_in_modify",
							"property_value" : true
						}
					}
				}
			}
		},
		"devices" : {
			 "table_name" : "devices",
			 "table_fields" : {
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"authorization_status" : {
					"field_name" : "authorization_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Authorization Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "UNAUTHORIZED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"authorized_by" : {
					"field_name" : "authorized_by",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Authorized By"
						}
					}
				},
				"authorized_on" : {
					"field_name" : "authorized_on",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Authorized On"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company"
						}
					}
				},
				"device_details" : {
					"field_name" : "device_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Device Details"
						}
					}
				},
				"device_id" : {
					"field_name" : "device_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Device Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"device_name" : {
					"field_name" : "device_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Device Name"
						}
					}
				},
				"device_number" : {
					"field_name" : "device_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 3
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "DEV-"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Device Number"
						}
					}
				},
				"device_status" : {
					"field_name" : "device_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Device Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"device_type" : {
					"field_name" : "device_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Device Type"
						}
					}
				},
				"device_uid" : {
					"field_name" : "device_uid",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Device UID"
						},
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"last_online_time" : {
					"field_name" : "last_online_time",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Last Online Time"
						}
					}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Location"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"use_for" : {
					"field_name" : "use_for",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Use For"
						}
					}
				},
				"user_id" : {
					"field_name" : "user_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "User Id"
						}
					}
				}
			},
			"select_view_name" : "vw_devices"
		},
		"docks" : {
			 "table_name" : "docks",
			 "table_fields" : {
				"address_details" : {
					"field_name" : "address_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Addresses"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"dock_id" : {
					"field_name" : "dock_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Dock Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"dock_name" : {
					"field_name" : "dock_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Dock Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"dock_number" : {
					"field_name" : "dock_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Dock Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"dock_status" : {
					"field_name" : "dock_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Dock Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"email_details" : {
					"field_name" : "email_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"email_values" : {
					"field_name" : "email_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"fax_details" : {
					"field_name" : "fax_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numbers"
						}
					}
				},
				"fax_values" : {
					"field_name" : "fax_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numbers"
						}
					}
				},
				"phone_details" : {
					"field_name" : "phone_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"phone_values" : {
					"field_name" : "phone_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"website_details" : {
					"field_name" : "website_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				},
				"website_values" : {
					"field_name" : "website_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				}
			},
			"select_view_name" : "vw_docks"
		},
		"document_expenses" : {
			 "table_name" : "document_expenses",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"document_expense_id" : {
					"field_name" : "document_expense_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"document_expense_number" : {
					"field_name" : "document_expense_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"document_expense_status" : {
					"field_name" : "document_expense_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PAID","value":"PAID"},{"label":"PENDING","value":"PENDING"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"document_id" : {
					"field_name" : "document_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"document_type" : {
					"field_name" : "document_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"expense_account_id" : {
					"field_name" : "expense_account_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"expense_amount" : {
					"field_name" : "expense_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"expense_date" : {
					"field_name" : "expense_date",
					"field_type" : "date",
					"field_properties" : {}
				},
				"include_in_calculation" : {
					"field_name" : "include_in_calculation",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"reference_number" : {
					"field_name" : "reference_number",
					"field_type" : "string",
					"field_properties" : {}
				},
				"refundable" : {
					"field_name" : "refundable",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_document_expenses"
		},
		"document_payments" : {
			 "table_name" : "document_payments",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"document_id" : {
					"field_name" : "document_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"document_payment_id" : {
					"field_name" : "document_payment_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"document_payment_number" : {
					"field_name" : "document_payment_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"document_payment_status" : {
					"field_name" : "document_payment_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "COMPLETED"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"document_type" : {
					"field_name" : "document_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"payment_amount" : {
					"field_name" : "payment_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"payment_date" : {
					"field_name" : "payment_date",
					"field_type" : "date",
					"field_properties" : {}
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"reference_number" : {
					"field_name" : "reference_number",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"employee_assets" : {
			 "table_name" : "employee_assets",
			 "table_fields" : {
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Asset"
						}
					}
				},
				"assigned_on" : {
					"field_name" : "assigned_on",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Assigned On"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company"
						}
					}
				},
				"employee_asset_id" : {
					"field_name" : "employee_asset_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Asset Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_asset_number" : {
					"field_name" : "employee_asset_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Asset Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"employee_asset_status" : {
					"field_name" : "employee_asset_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Asset Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ISSUED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"employee_attendance" : {
			 "table_name" : "employee_attendance",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"attendance_id" : {
					"field_name" : "attendance_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"attendance_number" : {
					"field_name" : "attendance_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"attendance_status" : {
					"field_name" : "attendance_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				}
			}
		},
		"employee_contracts" : {
			 "table_name" : "employee_contracts",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"employee_contract_end_date" : {
					"field_name" : "employee_contract_end_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract End Date"
						}
					}
				},
				"employee_contract_id" : {
					"field_name" : "employee_contract_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Contract Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_contract_number" : {
					"field_name" : "employee_contract_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"employee_contract_start_date" : {
					"field_name" : "employee_contract_start_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract Start Date"
						}
					}
				},
				"employee_contract_status" : {
					"field_name" : "employee_contract_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"employee_contract_type" : {
					"field_name" : "employee_contract_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract type"
						}
					}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Id"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"employee_hiring_drives" : {
			 "table_name" : "employee_hiring_drives",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company"
						}
					}
				},
				"hiring_drive_for" : {
					"field_name" : "hiring_drive_for",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Drive For"
						}
					}
				},
				"hiring_drive_id" : {
					"field_name" : "hiring_drive_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Drive Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"hiring_drive_name" : {
					"field_name" : "hiring_drive_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Drive Name"
						}
					}
				},
				"hiring_drive_number" : {
					"field_name" : "hiring_drive_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Drive Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"hiring_drive_status" : {
					"field_name" : "hiring_drive_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Drive Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "CREATED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"hiring_end_date" : {
					"field_name" : "hiring_end_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring End Date"
						}
					}
				},
				"hiring_start_date" : {
					"field_name" : "hiring_start_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Start Date"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"employee_hirings" : {
			 "table_name" : "employee_hirings",
			 "table_fields" : {
				"address_details" : {
					"field_name" : "address_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Address Details"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"bank_details" : {
					"field_name" : "bank_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Bank Details"
						}
					}
				},
				"candidate_name" : {
					"field_name" : "candidate_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Candidate Name"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company"
						}
					}
				},
				"date_applied" : {
					"field_name" : "date_applied",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Date of Application"
						}
					}
				},
				"date_birth" : {
					"field_name" : "date_birth",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Date of Birth"
						}
					}
				},
				"designation" : {
					"field_name" : "designation",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Designation"
						}
					}
				},
				"email_details" : {
					"field_name" : "email_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee"
						}
					}
				},
				"gender" : {
					"field_name" : "gender",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Gender"
						}
					}
				},
				"hiring_drive_id" : {
					"field_name" : "hiring_drive_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Drive"
						}
					}
				},
				"hiring_id" : {
					"field_name" : "hiring_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"hiring_number" : {
					"field_name" : "hiring_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"hiring_status" : {
					"field_name" : "hiring_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "CREATED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"legal_details" : {
					"field_name" : "legal_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Legal Details"
						}
					}
				},
				"phone_details" : {
					"field_name" : "phone_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Details"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"social_details" : {
					"field_name" : "social_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Social Details"
						}
					}
				}
			}
		},
		"employee_leaves" : {
			 "table_name" : "employee_leaves",
			 "table_fields" : {
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Approved By"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"attendance_id" : {
					"field_name" : "attendance_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attendance Id"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee"
						}
					}
				},
				"leave_end_date" : {
					"field_name" : "leave_end_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Leave End Date"
						}
					}
				},
				"leave_id" : {
					"field_name" : "leave_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Leave Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"leave_number" : {
					"field_name" : "leave_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Leave Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"leave_reason" : {
					"field_name" : "leave_reason",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Leave Reason"
						}
					}
				},
				"leave_start_date" : {
					"field_name" : "leave_start_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Leave Start Date"
						}
					}
				},
				"leave_status" : {
					"field_name" : "leave_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Leave Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING APPROVAL"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING APPROVAL","value":"PENDING APPROVAL"},{"label":"APPROVED","value":"APPROVED"},{"label":"REJECTED","value":"REJECTED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"leave_type" : {
					"field_name" : "leave_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Leave Type"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"employee_loan_installments" : {
			 "table_name" : "employee_loan_installments",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"installment_number" : {
					"field_name" : "installment_number",
					"field_type" : "integer",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Installment Number"
						}
					}
				},
				"loan_id" : {
					"field_name" : "loan_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan"
						}
					}
				},
				"loan_installment_amount" : {
					"field_name" : "loan_installment_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Installment Amount"
						}
					}
				},
				"loan_installment_date" : {
					"field_name" : "loan_installment_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Installment Date"
						}
					}
				},
				"loan_installment_id" : {
					"field_name" : "loan_installment_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Instllment Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"loan_installment_number" : {
					"field_name" : "loan_installment_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Installment Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"loan_installment_status" : {
					"field_name" : "loan_installment_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Installment Status"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Transaction Id"
						}
					}
				}
			},
			"select_view_name" : "vw_employee_loan_installments"
		},
		"employee_loans" : {
			 "table_name" : "employee_loans",
			 "table_fields" : {
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Approved By"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee"
						}
					}
				},
				"installment_counts" : {
					"field_name" : "installment_counts",
					"field_type" : "integer",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Installments"
						}
					}
				},
				"installment_date" : {
					"field_name" : "installment_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"interest_calculation_method" : {
					"field_name" : "interest_calculation_method",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Interest Calculation Method"
						}
					}
				},
				"interest_percentage" : {
					"field_name" : "interest_percentage",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Interest Percentage"
						}
					}
				},
				"loan_amount" : {
					"field_name" : "loan_amount",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Amount"
						}
					}
				},
				"loan_date" : {
					"field_name" : "loan_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Date"
						}
					}
				},
				"loan_id" : {
					"field_name" : "loan_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"loan_number" : {
					"field_name" : "loan_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"loan_status" : {
					"field_name" : "loan_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Loan Status"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Transaction Id"
						}
					}
				}
			}
		},
		"employee_payroll" : {
			 "table_name" : "employee_payroll",
			 "table_fields" : {
				"amount_loan_installment" : {
					"field_name" : "amount_loan_installment",
					"field_type" : "double",
					"field_properties" : {}
				},
				"amount_month_expenses" : {
					"field_name" : "amount_month_expenses",
					"field_type" : "double",
					"field_properties" : {}
				},
				"amount_month_withdrawls" : {
					"field_name" : "amount_month_withdrawls",
					"field_type" : "double",
					"field_properties" : {}
				},
				"amount_overtime_rate" : {
					"field_name" : "amount_overtime_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"amount_payout_adjustment" : {
					"field_name" : "amount_payout_adjustment",
					"field_type" : "double",
					"field_properties" : {}
				},
				"amount_penalty_absent" : {
					"field_name" : "amount_penalty_absent",
					"field_type" : "double",
					"field_properties" : {}
				},
				"amount_salary" : {
					"field_name" : "amount_salary",
					"field_type" : "double",
					"field_properties" : {}
				},
				"balance_closing" : {
					"field_name" : "balance_closing",
					"field_type" : "double",
					"field_properties" : {}
				},
				"balance_opening" : {
					"field_name" : "balance_opening",
					"field_type" : "double",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"days_total_absent" : {
					"field_name" : "days_total_absent",
					"field_type" : "double",
					"field_properties" : {}
				},
				"days_total_half" : {
					"field_name" : "days_total_half",
					"field_type" : "double",
					"field_properties" : {}
				},
				"days_total_present" : {
					"field_name" : "days_total_present",
					"field_type" : "double",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"end_date" : {
					"field_name" : "end_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"hours_total_overtime" : {
					"field_name" : "hours_total_overtime",
					"field_type" : "double",
					"field_properties" : {}
				},
				"payout_currency_code" : {
					"field_name" : "payout_currency_code",
					"field_type" : "string",
					"field_properties" : {}
				},
				"payout_currency_rate" : {
					"field_name" : "payout_currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"payout_mode" : {
					"field_name" : "payout_mode",
					"field_type" : "string",
					"field_properties" : {}
				},
				"payroll_id" : {
					"field_name" : "payroll_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"payroll_number" : {
					"field_name" : "payroll_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"start_date" : {
					"field_name" : "start_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"employee_raises" : {
			 "table_name" : "employee_raises",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Currency Code"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee"
						}
					}
				},
				"employee_raise_amount" : {
					"field_name" : "employee_raise_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Raise Amount"
						}
					}
				},
				"employee_raise_date" : {
					"field_name" : "employee_raise_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Raise Date"
						}
					}
				},
				"employee_raise_effect_date" : {
					"field_name" : "employee_raise_effect_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Raise Effect Date"
						}
					}
				},
				"employee_raise_id" : {
					"field_name" : "employee_raise_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Raise Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_raise_number" : {
					"field_name" : "employee_raise_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Raise Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"employee_raise_status" : {
					"field_name" : "employee_raise_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Raise Status"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"new_salary_amount" : {
					"field_name" : "new_salary_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "New Salary"
						}
					}
				},
				"old_salary_amount" : {
					"field_name" : "old_salary_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Old Salary"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"employee_requirements" : {
			 "table_name" : "employee_requirements",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"employee_designation" : {
					"field_name" : "employee_designation",
					"field_type" : "string",
					"field_properties" : {}
				},
				"hiring_drive_id" : {
					"field_name" : "hiring_drive_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"openings" : {
					"field_name" : "openings",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"priority" : {
					"field_name" : "priority",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"requirement_deadline" : {
					"field_name" : "requirement_deadline",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"requirement_id" : {
					"field_name" : "requirement_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"requirement_number" : {
					"field_name" : "requirement_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"requirement_status" : {
					"field_name" : "requirement_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"skills_required" : {
					"field_name" : "skills_required",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"employees" : {
			 "table_name" : "employees",
			 "table_fields" : {
				"account_id" : {
					"field_name" : "account_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account Id"
						}
					}
				},
				"address_details" : {
					"field_name" : "address_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Addresses"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"bank_details" : {
					"field_name" : "bank_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Bank Details"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Currency Code"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"date_arrival" : {
					"field_name" : "date_arrival",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Date of Arrival"
						}
					}
				},
				"date_birth" : {
					"field_name" : "date_birth",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Date of Birth"
						}
					}
				},
				"date_joining" : {
					"field_name" : "date_joining",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Date of Joining"
						}
					}
				},
				"email_details" : {
					"field_name" : "email_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"email_values" : {
					"field_name" : "email_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"employee_code" : {
					"field_name" : "employee_code",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Code"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"employee_designation" : {
					"field_name" : "employee_designation",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Designation"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_image_url" : {
					"field_name" : "employee_image_url",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Images"
						}
					}
				},
				"employee_number" : {
					"field_name" : "employee_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "EMP-"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"employee_skills" : {
					"field_name" : "employee_skills",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Skills"
						}
					}
				},
				"employee_status" : {
					"field_name" : "employee_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"},{"label":"TERMINATED","value":"TERMINATED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"first_name" : {
					"field_name" : "first_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "First Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"gender" : {
					"field_name" : "gender",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Gender"
						}
					}
				},
				"last_name" : {
					"field_name" : "last_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Last Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"legal_details" : {
					"field_name" : "legal_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Legal Details"
						}
					}
				},
				"legal_employee_designation" : {
					"field_name" : "legal_employee_designation",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Employee Designation"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"legal_salary_amount" : {
					"field_name" : "legal_salary_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Salary Amount"
						}
					}
				},
				"middle_name" : {
					"field_name" : "middle_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Middle Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"nationality" : {
					"field_name" : "nationality",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Nationality"
						}
					}
				},
				"passport_details" : {
					"field_name" : "passport_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Passort Details"
						}
					}
				},
				"phone_details" : {
					"field_name" : "phone_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"phone_values" : {
					"field_name" : "phone_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"salary_amount" : {
					"field_name" : "salary_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Salary Amount"
						}
					}
				},
				"social_details" : {
					"field_name" : "social_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Social Details"
						}
					}
				},
				"visa_details" : {
					"field_name" : "visa_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Visa Details"
						}
					}
				}
			},
			"select_view_name" : "vw_employees"
		},
		"expenses" : {
			 "table_name" : "expenses",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"expense_account_id" : {
					"field_name" : "expense_account_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"expense_amount" : {
					"field_name" : "expense_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"expense_description" : {
					"field_name" : "expense_description",
					"field_type" : "text",
					"field_properties" : {}
				},
				"expense_details" : {
					"field_name" : "expense_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"expense_status" : {
					"field_name" : "expense_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "CREATED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"field_settings" : {
			 "table_name" : "field_settings",
			 "table_fields" : {
				"field_setting_id" : {
					"field_name" : "field_setting_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"field_setting_name" : {
					"field_name" : "field_setting_name",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"field_setting_value" : {
					"field_name" : "field_setting_value",
					"field_type" : "json",
					"field_properties" : {}
				}
			}
		},
		"hiring_adverts" : {
			 "table_name" : "hiring_adverts",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"hiring_advert_cost" : {
					"field_name" : "hiring_advert_cost",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Advert Cost"
						}
					}
				},
				"hiring_advert_date" : {
					"field_name" : "hiring_advert_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Advert Date"
						}
					}
				},
				"hiring_advert_id" : {
					"field_name" : "hiring_advert_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Advert Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"hiring_advert_name" : {
					"field_name" : "hiring_advert_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Advert Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"hiring_advert_number" : {
					"field_name" : "hiring_advert_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Advert Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"hiring_advert_status" : {
					"field_name" : "hiring_advert_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Advert Status"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"hiring_advert_type" : {
					"field_name" : "hiring_advert_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Advert Type"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"hiring_drive_id" : {
					"field_name" : "hiring_drive_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Hiring Drive"
						}
					}
				},
				"newspaper_name" : {
					"field_name" : "newspaper_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Newspaper"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Payment Method"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Transaction"
						}
					}
				}
			}
		},
		"incomes" : {
			 "table_name" : "incomes",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"income_account_id" : {
					"field_name" : "income_account_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"income_amount" : {
					"field_name" : "income_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"income_description" : {
					"field_name" : "income_description",
					"field_type" : "text",
					"field_properties" : {}
				},
				"income_details" : {
					"field_name" : "income_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"income_status" : {
					"field_name" : "income_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "CREATED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"inventory_tracking_quantities" : {
			 "table_name" : "inventory_tracking_quantities",
			 "table_fields" : {
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"inventory_tracking_quantity_id" : {
					"field_name" : "inventory_tracking_quantity_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"item_batch_id" : {
					"field_name" : "item_batch_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_status" : {
					"field_name" : "item_status",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_inventory_tracking_quantities"
		},
		"inventory_trackings" : {
			 "table_name" : "inventory_trackings",
			 "table_fields" : {
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"inventory_multiplier" : {
					"field_name" : "inventory_multiplier",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"inventory_tracking_number" : {
					"field_name" : "inventory_tracking_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"inventory_tracking_status" : {
					"field_name" : "inventory_tracking_status",
					"field_type" : "string",
					"field_properties" : {}
				},
				"inventory_update_quantity" : {
					"field_name" : "inventory_update_quantity",
					"field_type" : "string",
					"field_properties" : {}
				},
				"inventory_update_time" : {
					"field_name" : "inventory_update_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"item_attributes" : {
			 "table_name" : "item_attributes",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_attribute_id" : {
					"field_name" : "item_attribute_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"item_attribute_name" : {
					"field_name" : "item_attribute_name",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"item_attribute_value" : {
					"field_name" : "item_attribute_value",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"item_batches" : {
			 "table_name" : "item_batches",
			 "table_fields" : {
				"batch_number" : {
					"field_name" : "batch_number",
					"field_type" : "auto_number",
					"field_properties" : {}
				},
				"item_batch_id" : {
					"field_name" : "item_batch_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"item_categories" : {
			 "table_name" : "item_categories",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"category_id" : {
					"field_name" : "category_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Category Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"category_image_url" : {
					"field_name" : "category_image_url",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Category Images"
						}
					}
				},
				"category_name" : {
					"field_name" : "category_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Category Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"category_number" : {
					"field_name" : "category_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Category Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"master_category_id" : {
					"field_name" : "master_category_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Master Category Id"
						}
					}
				},
				"parent_category_id" : {
					"field_name" : "parent_category_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Parent Category"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"item_inward_storages" : {
			 "table_name" : "item_inward_storages",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"conta_type" : {
					"field_name" : "conta_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_inward_storage_id" : {
					"field_name" : "item_inward_storage_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"item_inward_storage_number" : {
					"field_name" : "item_inward_storage_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"item_location_price" : {
			 "table_name" : "item_location_price",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_location_price_id" : {
					"field_name" : "item_location_price_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_status" : {
					"field_name" : "item_price_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"item_outward_storages" : {
			 "table_name" : "item_outward_storages",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"conta_type" : {
					"field_name" : "conta_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_outward_storage_id" : {
					"field_name" : "item_outward_storage_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"item_outward_storage_number" : {
					"field_name" : "item_outward_storage_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"item_parts" : {
			 "table_name" : "item_parts",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item"
						}
					}
				},
				"item_part_id" : {
					"field_name" : "item_part_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Part Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"part_item_id" : {
					"field_name" : "part_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"part_item_quantity" : {
					"field_name" : "part_item_quantity",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Part Item Quantity"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"item_raw_materials" : {
			 "table_name" : "item_raw_materials",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_material_id" : {
					"field_name" : "item_material_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"material_item_id" : {
					"field_name" : "material_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"material_item_quantity" : {
					"field_name" : "material_item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"material_item_unit" : {
					"field_name" : "material_item_unit",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"item_requests" : {
			 "table_name" : "item_requests",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"document_id" : {
					"field_name" : "document_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"handled_by" : {
					"field_name" : "handled_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"handled_on" : {
					"field_name" : "handled_on",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"item_request_attachment" : {
					"field_name" : "item_request_attachment",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_request_id" : {
					"field_name" : "item_request_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"item_requested" : {
					"field_name" : "item_requested",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"requested_by" : {
					"field_name" : "requested_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"requested_on" : {
					"field_name" : "requested_on",
					"field_type" : "datetime",
					"field_properties" : {}
				}
			}
		},
		"item_uoms" : {
			 "table_name" : "item_uoms",
			 "table_fields" : {
				"item_uom_id" : {
					"field_name" : "item_uom_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"item_uom_name" : {
					"field_name" : "item_uom_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"item_uqcs" : {
			 "table_name" : "item_uqcs",
			 "table_fields" : {
				"item_uqc_id" : {
					"field_name" : "item_uqc_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"label" : {
					"field_name" : "label",
					"field_type" : "string",
					"field_properties" : {}
				},
				"unit_type" : {
					"field_name" : "unit_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"value" : {
					"field_name" : "value",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"items" : {
			 "table_name" : "items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"barcode_value" : {
					"field_name" : "barcode_value",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Barcode Value"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"default_vendor_id" : {
					"field_name" : "default_vendor_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Default Vendor Id"
						}
					}
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Purchase Dimensions"
						}
					}
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Sale Dimensions"
						}
					}
				},
				"hsnsac_code" : {
					"field_name" : "hsnsac_code",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "HSNSAC Code"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"is_part" : {
					"field_name" : "is_part",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Is Part?"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"YES","value":"YES"},{"label":"NO","value":"NO"}]
						}
					}
				},
				"is_saleable" : {
					"field_name" : "is_saleable",
					"field_type" : "integer",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "YES, NO"
						}
					}
				},
				"item_attributes" : {
					"field_name" : "item_attributes",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Attributes"
						}
					}
				},
				"item_category_id" : {
					"field_name" : "item_category_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Category"
						}
					}
				},
				"item_code" : {
					"field_name" : "item_code",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Code"
						}
					}
				},
				"item_description_full" : {
					"field_name" : "item_description_full",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Description Full"
						}
					}
				},
				"item_description_quick" : {
					"field_name" : "item_description_quick",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Description Quick"
						}
					}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"item_image_url" : {
					"field_name" : "item_image_url",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Images"
						}
					}
				},
				"item_name" : {
					"field_name" : "item_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"item_number" : {
					"field_name" : "item_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Number"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"item_price_mrp" : {
					"field_name" : "item_price_mrp",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Price MRP"
						}
					}
				},
				"item_price_purchase" : {
					"field_name" : "item_price_purchase",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Price Purchase"
						}
					}
				},
				"item_price_sale" : {
					"field_name" : "item_price_sale",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Price Sale"
						}
					}
				},
				"item_short_name" : {
					"field_name" : "item_short_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Short Name"
						}
					}
				},
				"item_sku" : {
					"field_name" : "item_sku",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item SKU"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"item_status" : {
					"field_name" : "item_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_type" : {
					"field_name" : "item_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Type"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"item_unit_purchase" : {
					"field_name" : "item_unit_purchase",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Purchase Unit"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_sale" : {
					"field_name" : "item_unit_sale",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Sale Unit"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_stock" : {
					"field_name" : "item_unit_stock",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Stock Unit"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_uoms" : {
					"field_name" : "item_uoms",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Units"
						}
					}
				},
				"quantity_min_order" : {
					"field_name" : "quantity_min_order",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Min Quantity Order"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"stock_maximum" : {
					"field_name" : "stock_maximum",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Max Stock Quantity"
						}
					}
				},
				"stock_minimum" : {
					"field_name" : "stock_minimum",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Min Stock Quantity"
						}
					}
				},
				"stock_threshold" : {
					"field_name" : "stock_threshold",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Order Threshold Quantity"
						}
					}
				},
				"warranty_expiration_details" : {
					"field_name" : "warranty_expiration_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Warranty Expiration Details"
						}
					}
				}
			},
			"select_view_name" : "vw_items"
		},
		"landing_price_items" : {
			 "table_name" : "landing_price_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_cost" : {
					"field_name" : "item_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"landing_price" : {
					"field_name" : "landing_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"landing_price_calculation_method" : {
					"field_name" : "landing_price_calculation_method",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "AVERAGE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"AVERAGE","value":"AVERAGE"},{"label":"MINIMUM","value":"MINIMUM"},{"label":"MAXIMUM","value":"MAXIMUM"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"landing_price_id" : {
					"field_name" : "landing_price_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"landing_price_item_id" : {
					"field_name" : "landing_price_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"landing_price_values" : {
					"field_name" : "landing_price_values",
					"field_type" : "json",
					"field_properties" : {}
				},
				"new_item_price" : {
					"field_name" : "new_item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"old_item_price" : {
					"field_name" : "old_item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"price_calcuation_method" : {
					"field_name" : "price_calcuation_method",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "AVERAGE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"AVERAGE","value":"AVERAGE"},{"label":"MINIMUM","value":"MINIMUM"},{"label":"MAXIMUM","value":"MAXIMUM"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"price_set_reason" : {
					"field_name" : "price_set_reason",
					"field_type" : "text",
					"field_properties" : {}
				},
				"purchase_invoice_numbers" : {
					"field_name" : "purchase_invoice_numbers",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"split_cost" : {
					"field_name" : "split_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"stock_price" : {
					"field_name" : "stock_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"stock_value" : {
					"field_name" : "stock_value",
					"field_type" : "double",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_landing_price_items"
		},
		"landing_price_location_items" : {
			 "table_name" : "landing_price_location_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_cost" : {
					"field_name" : "item_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"landing_price_calculation_method" : {
					"field_name" : "landing_price_calculation_method",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "AVERAGE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"AVERAGE","value":"AVERAGE"},{"label":"MINIMUM","value":"MINIMUM"},{"label":"MAXIMUM","value":"MAXIMUM"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"landing_price_location" : {
					"field_name" : "landing_price_location",
					"field_type" : "double",
					"field_properties" : {}
				},
				"landing_price_location_id" : {
					"field_name" : "landing_price_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"landing_price_location_item_id" : {
					"field_name" : "landing_price_location_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"landing_price_location_values" : {
					"field_name" : "landing_price_location_values",
					"field_type" : "json",
					"field_properties" : {}
				},
				"landing_price_numbers" : {
					"field_name" : "landing_price_numbers",
					"field_type" : "string",
					"field_properties" : {}
				},
				"new_item_price" : {
					"field_name" : "new_item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"old_item_price" : {
					"field_name" : "old_item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"price_calcuation_method" : {
					"field_name" : "price_calcuation_method",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "AVERAGE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"AVERAGE","value":"AVERAGE"},{"label":"MINIMUM","value":"MINIMUM"},{"label":"MAXIMUM","value":"MAXIMUM"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"price_set_reason" : {
					"field_name" : "price_set_reason",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"split_cost" : {
					"field_name" : "split_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"landing_price_locations" : {
			 "table_name" : "landing_price_locations",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"landing_price_location_date" : {
					"field_name" : "landing_price_location_date",
					"field_type" : "date",
					"field_properties" : {}
				},
				"landing_price_location_id" : {
					"field_name" : "landing_price_location_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"landing_price_location_number" : {
					"field_name" : "landing_price_location_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "LND"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"landing_price_location_status" : {
					"field_name" : "landing_price_location_status",
					"field_type" : "string",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "LP-"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "DRAFT"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"DRAFT","value":"DRAFT"},{"label":"WAITING APPROVAL","value":"WAITING APPROVAL"},{"label":"APPROVED","value":"APPROVED"}]
						}
					}
				},
				"landing_price_numbers" : {
					"field_name" : "landing_price_numbers",
					"field_type" : "text",
					"field_properties" : {}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"price_set_reason" : {
					"field_name" : "price_set_reason",
					"field_type" : "text",
					"field_properties" : {}
				},
				"profit_margin" : {
					"field_name" : "profit_margin",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"landing_prices" : {
			 "table_name" : "landing_prices",
			 "table_fields" : {
				"approval_status" : {
					"field_name" : "approval_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"APPROVED","value":"APPROVED"},{"label":"REJECTED","value":"REJECTED"}]
						}
					}
				},
				"approval_time" : {
					"field_name" : "approval_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"landing_price_date" : {
					"field_name" : "landing_price_date",
					"field_type" : "date",
					"field_properties" : {}
				},
				"landing_price_id" : {
					"field_name" : "landing_price_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"landing_price_number" : {
					"field_name" : "landing_price_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "LND"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"landing_price_status" : {
					"field_name" : "landing_price_status",
					"field_type" : "string",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "LP-"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "DRAFT"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"DRAFT","value":"DRAFT"},{"label":"WAITING APPROVAL","value":"WAITING APPROVAL"},{"label":"APPROVED","value":"APPROVED"}]
						}
					}
				},
				"price_set_reason" : {
					"field_name" : "price_set_reason",
					"field_type" : "text",
					"field_properties" : {}
				},
				"profit_margin" : {
					"field_name" : "profit_margin",
					"field_type" : "double",
					"field_properties" : {}
				},
				"purchase_invoice_numbers" : {
					"field_name" : "purchase_invoice_numbers",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"lift_assets" : {
			 "table_name" : "lift_assets",
			 "table_fields" : {
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"lift_asset_id" : {
					"field_name" : "lift_asset_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"lift_asset_status" : {
					"field_name" : "lift_asset_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"lift_id" : {
					"field_name" : "lift_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"lifts" : {
			 "table_name" : "lifts",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"destination_location" : {
					"field_name" : "destination_location",
					"field_type" : "json",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"lift_datetime" : {
					"field_name" : "lift_datetime",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"lift_id" : {
					"field_name" : "lift_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"lift_number" : {
					"field_name" : "lift_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"lift_status" : {
					"field_name" : "lift_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"source_location" : {
					"field_name" : "source_location",
					"field_type" : "json",
					"field_properties" : {}
				},
				"trip_id" : {
					"field_name" : "trip_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"locations" : {
			 "table_name" : "locations",
			 "table_fields" : {
				"address_details" : {
					"field_name" : "address_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Address"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"email_details" : {
					"field_name" : "email_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"email_values" : {
					"field_name" : "email_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"fax_details" : {
					"field_name" : "fax_details",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numbers"
						}
					}
				},
				"fax_values" : {
					"field_name" : "fax_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numvers"
						}
					}
				},
				"legal_details" : {
					"field_name" : "legal_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Legal Details"
						}
					}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Location Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"location_image_url" : {
					"field_name" : "location_image_url",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Location Images"
						}
					}
				},
				"location_name" : {
					"field_name" : "location_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Location Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"location_number" : {
					"field_name" : "location_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Location Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"location_status" : {
					"field_name" : "location_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Location Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"location_type" : {
					"field_name" : "location_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Location Type"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "STORE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"WAREHOUSE","value":"WAREHOUSE"},{"label":"STORE","value":"STORE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"phone_details" : {
					"field_name" : "phone_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"phone_values" : {
					"field_name" : "phone_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Values"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"website_details" : {
					"field_name" : "website_details",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				},
				"website_values" : {
					"field_name" : "website_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				}
			},
			"select_view_name" : "vw_locations"
		},
		"log" : {
			 "table_name" : "log",
			 "table_fields" : {
				"action_name" : {
					"field_name" : "action_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"log_id" : {
					"field_name" : "log_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"request_details" : {
					"field_name" : "request_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"user_id" : {
					"field_name" : "user_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"mandatory_documents" : {
			 "table_name" : "mandatory_documents",
			 "table_fields" : {
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"document_conditions" : {
					"field_name" : "document_conditions",
					"field_type" : "json",
					"field_properties" : {}
				},
				"document_name" : {
					"field_name" : "document_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"mandatory_document_id" : {
					"field_name" : "mandatory_document_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"master_item_categories" : {
			 "table_name" : "master_item_categories",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"category_id" : {
					"field_name" : "category_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"category_name" : {
					"field_name" : "category_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"parent_category_id" : {
					"field_name" : "parent_category_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"master_items" : {
			 "table_name" : "master_items",
			 "table_fields" : {
				"category_id" : {
					"field_name" : "category_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"item_image_url" : {
					"field_name" : "item_image_url",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_name" : {
					"field_name" : "item_name",
					"field_type" : "text",
					"field_properties" : {}
				},
				"item_sku" : {
					"field_name" : "item_sku",
					"field_type" : "string",
					"field_properties" : {}
				},
				"master_item_number" : {
					"field_name" : "master_item_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			}
		},
		"material_requests" : {
			 "table_name" : "material_requests",
			 "table_fields" : {
				"approval_status" : {
					"field_name" : "approval_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"APPROVED","value":"APPROVED"},{"label":"REJECTED","value":"REJECTED"}]
						}
					}
				},
				"approval_time" : {
					"field_name" : "approval_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"date_required" : {
					"field_name" : "date_required",
					"field_type" : "date",
					"field_properties" : {}
				},
				"delivered_by" : {
					"field_name" : "delivered_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"delivered_on" : {
					"field_name" : "delivered_on",
					"field_type" : "string",
					"field_properties" : {}
				},
				"delivery_attachments" : {
					"field_name" : "delivery_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"delivery_location_id" : {
					"field_name" : "delivery_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"delivery_recordings" : {
					"field_name" : "delivery_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"delivery_remarks" : {
					"field_name" : "delivery_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"delivery_signature_id" : {
					"field_name" : "delivery_signature_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"material_name" : {
					"field_name" : "material_name",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"material_quantity" : {
					"field_name" : "material_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"material_request_id" : {
					"field_name" : "material_request_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"material_request_number" : {
					"field_name" : "material_request_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "MR-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"pickup_location_id" : {
					"field_name" : "pickup_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"priority" : {
					"field_name" : "priority",
					"field_type" : "string",
					"field_properties" : {
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"HIGH","value":"HIGH"},{"label":"MEDIUM","value":"MEDIUM"},{"label":"LOW","value":"LOW"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"request_attachments" : {
					"field_name" : "request_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"request_audio_recordings" : {
					"field_name" : "request_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"request_item_details" : {
					"field_name" : "request_item_details",
					"field_type" : "string",
					"field_properties" : {}
				},
				"request_status" : {
					"field_name" : "request_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "SUBMITTED"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"SUBMITTED","value":"SUBMITTED"},{"label":"APPROVED","value":"APPROVED"},{"label":"REJECTED","value":"REJECTED"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"READY FOR PICKUP","value":"READY FOR PICKUP"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"requests_linked" : {
					"field_name" : "requests_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"required_on" : {
					"field_name" : "required_on",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"response_attachments" : {
					"field_name" : "response_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"response_audio_recordings" : {
					"field_name" : "response_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"trip_id" : {
					"field_name" : "trip_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_material_requests"
		},
		"material_requests_purchase_requests_link_items" : {
			 "table_name" : "material_requests_purchase_requests_link_items",
			 "table_fields" : {
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"material_request_id" : {
					"field_name" : "material_request_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_request_item_id" : {
					"field_name" : "purchase_request_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"material_requests_purchase_requests_links" : {
			 "table_name" : "material_requests_purchase_requests_links",
			 "table_fields" : {
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"material_request_id" : {
					"field_name" : "material_request_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_request_id" : {
					"field_name" : "purchase_request_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"media" : {
			 "table_name" : "media",
			 "table_fields" : {
				"file_details" : {
					"field_name" : "file_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"file_name" : {
					"field_name" : "file_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"file_size" : {
					"field_name" : "file_size",
					"field_type" : "double",
					"field_properties" : {}
				},
				"file_type" : {
					"field_name" : "file_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"file_url" : {
					"field_name" : "file_url",
					"field_type" : "text",
					"field_properties" : {}
				},
				"media_id" : {
					"field_name" : "media_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"membership_cards" : {
			 "table_name" : "membership_cards",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company"
						}
					}
				},
				"customer_id" : {
					"field_name" : "customer_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer"
						}
					}
				},
				"membership_amount" : {
					"field_name" : "membership_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Membership Fee Amount"
						}
					}
				},
				"membership_end_date" : {
					"field_name" : "membership_end_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Membership End Date"
						}
					}
				},
				"membership_id" : {
					"field_name" : "membership_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Membership Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"membership_number" : {
					"field_name" : "membership_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Membership Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"membership_start_date" : {
					"field_name" : "membership_start_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Membership Start Date"
						}
					}
				},
				"membership_status" : {
					"field_name" : "membership_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Membership Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "INACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"},{"label":"EXPIRED","value":"EXPIRED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Payment Method"
						}
					}
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Pricing Group"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"select_view_name" : "vw_membership_cards"
		},
		"membership_types" : {
			 "table_name" : "membership_types",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"membership_name" : {
					"field_name" : "membership_name",
					"field_type" : "string",
					"field_properties" : {
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"membership_price" : {
					"field_name" : "membership_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"membership_status" : {
					"field_name" : "membership_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"membership_type_id" : {
					"field_name" : "membership_type_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"mini_projects" : {
			 "table_name" : "mini_projects",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"mini_project_details" : {
					"field_name" : "mini_project_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"mini_project_drawings" : {
					"field_name" : "mini_project_drawings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"mini_project_id" : {
					"field_name" : "mini_project_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"mini_project_number" : {
					"field_name" : "mini_project_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "MP-"
						}
					}
				},
				"project_service_id" : {
					"field_name" : "project_service_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_invoice_item_id" : {
					"field_name" : "sale_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_quote_item_id" : {
					"field_name" : "sale_quote_item_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_mini_projects"
		},
		"notes" : {
			 "table_name" : "notes",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"note_id" : {
					"field_name" : "note_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"note_number" : {
					"field_name" : "note_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"note_test" : {
					"field_name" : "note_test",
					"field_type" : "text",
					"field_properties" : {}
				},
				"record_id" : {
					"field_name" : "record_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"record_type" : {
					"field_name" : "record_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"user_id" : {
					"field_name" : "user_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"notifications" : {
			 "table_name" : "notifications",
			 "table_fields" : {
				"notification_details" : {
					"field_name" : "notification_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"notification_id" : {
					"field_name" : "notification_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"notification_message" : {
					"field_name" : "notification_message",
					"field_type" : "text",
					"field_properties" : {}
				},
				"notification_status" : {
					"field_name" : "notification_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"notification_time" : {
					"field_name" : "notification_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"notification_title" : {
					"field_name" : "notification_title",
					"field_type" : "text",
					"field_properties" : {}
				},
				"read_time" : {
					"field_name" : "read_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"user_id" : {
					"field_name" : "user_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"offer_items" : {
			 "table_name" : "offer_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item"
						}
					}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Price"
						}
					}
				},
				"offer_id" : {
					"field_name" : "offer_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Offer"
						}
					}
				},
				"offer_item_id" : {
					"field_name" : "offer_item_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Offer Item Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"offer_item_status" : {
					"field_name" : "offer_item_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Offer Item Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"offers" : {
			 "table_name" : "offers",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company"
						}
					}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Location"
						}
					}
				},
				"offer_end_date" : {
					"field_name" : "offer_end_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "End Date"
						}
					}
				},
				"offer_id" : {
					"field_name" : "offer_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Offer Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"offer_name" : {
					"field_name" : "offer_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Offer Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"offer_number" : {
					"field_name" : "offer_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Offer Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"offer_start_date" : {
					"field_name" : "offer_start_date",
					"field_type" : "date",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Start Date"
						}
					}
				},
				"offer_status" : {
					"field_name" : "offer_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Offer Status"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"select_view_name" : "vw_offers"
		},
		"payment_method_documents" : {
			 "table_name" : "payment_method_documents",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"document_name" : {
					"field_name" : "document_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"payment_mode_document_id" : {
					"field_name" : "payment_mode_document_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"payment_mode_id" : {
					"field_name" : "payment_mode_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"payment_method_exceptions" : {
			 "table_name" : "payment_method_exceptions",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"payment_mode_exception_id" : {
					"field_name" : "payment_mode_exception_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"payment_mode_id" : {
					"field_name" : "payment_mode_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"reason" : {
					"field_name" : "reason",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"payment_methods" : {
			 "table_name" : "payment_methods",
			 "table_fields" : {
				"account_id" : {
					"field_name" : "account_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company"
						}
					}
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Payment Method Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"payment_method_name" : {
					"field_name" : "payment_method_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Payment Method Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"payment_method_number" : {
					"field_name" : "payment_method_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Payment Method Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"payment_method_status" : {
					"field_name" : "payment_method_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Payment Method Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"payment_method_type" : {
					"field_name" : "payment_method_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Payment Method Type"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PURCHASE","value":"PURCHASE"},{"label":"SALE","value":"SALE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"select_view_name" : "vw_payment_methods"
		},
		"payment_terms" : {
			 "table_name" : "payment_terms",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"payment_term_id" : {
					"field_name" : "payment_term_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"payment_term_name" : {
					"field_name" : "payment_term_name",
					"field_type" : "string",
					"field_properties" : {
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"payment_term_number" : {
					"field_name" : "payment_term_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"payment_term_status" : {
					"field_name" : "payment_term_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"payment_terms_type" : {
					"field_name" : "payment_terms_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"pricing_group_items" : {
			 "table_name" : "pricing_group_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"exclude" : {
					"field_name" : "exclude",
					"field_type" : "yes_no",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Exclude"
						}
					}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item"
						}
					}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item Price"
						}
					}
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Pricing Group"
						}
					}
				},
				"pricing_group_item_id" : {
					"field_name" : "pricing_group_item_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Pricing Group Item Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"pricing_group_item_status" : {
					"field_name" : "pricing_group_item_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Pricing Group Item Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"set_manually" : {
					"field_name" : "set_manually",
					"field_type" : "yes_no",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Set Manually?"
						}
					}
				}
			}
		},
		"pricing_groups" : {
			 "table_name" : "pricing_groups",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"discount_type" : {
					"field_name" : "discount_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Discount Type"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PERCENTAGE","value":"PERCENTAGE"},{"label":"AMOUNT","value":"AMOUNT"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"discount_value" : {
					"field_name" : "discount_value",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Discount Value"
						}
					}
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Pricing Group Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"pricing_group_name" : {
					"field_name" : "pricing_group_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Pricing Group Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"pricing_group_number" : {
					"field_name" : "pricing_group_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Pricing Group Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"pricing_group_status" : {
					"field_name" : "pricing_group_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Pricing Group Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"select_view_name" : "vw_pricing_groups"
		},
		"project_documents" : {
			 "table_name" : "project_documents",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"description" : {
					"field_name" : "description",
					"field_type" : "text",
					"field_properties" : {}
				},
				"document_name" : {
					"field_name" : "document_name",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"document_status" : {
					"field_name" : "document_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"document_type" : {
					"field_name" : "document_type",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"expiration_date" : {
					"field_name" : "expiration_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"project_document_id" : {
					"field_name" : "project_document_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_document_number" : {
					"field_name" : "project_document_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"project_service_form_inputs" : {
			 "table_name" : "project_service_form_inputs",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"project_service_form_input_id" : {
					"field_name" : "project_service_form_input_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Form Input Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_service_form_input_number" : {
					"field_name" : "project_service_form_input_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PSFI_"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Form Input Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_service_id" : {
					"field_name" : "project_service_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service"
						}
					}
				},
				"project_service_input_id" : {
					"field_name" : "project_service_input_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service Input"
						}
					}
				},
				"project_service_input_index" : {
					"field_name" : "project_service_input_index",
					"field_type" : "integer",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service Input Index"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"project_service_input_group_inputs" : {
			 "table_name" : "project_service_input_group_inputs",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"display_condition_function_code" : {
					"field_name" : "display_condition_function_code",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Display Condition Function Code"
						}
					}
				},
				"project_service_input_group_id" : {
					"field_name" : "project_service_input_group_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Group"
						}
					}
				},
				"project_service_input_group_input_id" : {
					"field_name" : "project_service_input_group_input_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Group Input Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_service_input_group_input_index" : {
					"field_name" : "project_service_input_group_input_index",
					"field_type" : "integer",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Group Input Index"
						}
					}
				},
				"project_service_input_group_input_number" : {
					"field_name" : "project_service_input_group_input_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PSIGI_"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Group Input Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_service_input_id" : {
					"field_name" : "project_service_input_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"project_service_input_groups" : {
			 "table_name" : "project_service_input_groups",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"display_condition_function_code" : {
					"field_name" : "display_condition_function_code",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Display Condition Function Code"
						}
					}
				},
				"project_service_input_group_id" : {
					"field_name" : "project_service_input_group_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Group Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_service_input_group_label" : {
					"field_name" : "project_service_input_group_label",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Group Label"
						}
					}
				},
				"project_service_input_group_name" : {
					"field_name" : "project_service_input_group_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Group Name"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"project_service_input_group_number" : {
					"field_name" : "project_service_input_group_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PSIG_"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Group Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"project_service_input_values" : {
			 "table_name" : "project_service_input_values",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"display_condition_function_code" : {
					"field_name" : "display_condition_function_code",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Display Condition Function Code"
						}
					}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Item"
						}
					}
				},
				"project_service_charge" : {
					"field_name" : "project_service_charge",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service Charge"
						}
					}
				},
				"project_service_charge_area_input_name" : {
					"field_name" : "project_service_charge_area_input_name",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Area Input Name"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_service_charge_calculation" : {
					"field_name" : "project_service_charge_calculation",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Charge Calculation"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_service_charge_calculation_function_code" : {
					"field_name" : "project_service_charge_calculation_function_code",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Charge Calculation Function Code"
						}
					}
				},
				"project_service_input_id" : {
					"field_name" : "project_service_input_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input"
						}
					}
				},
				"project_service_input_value" : {
					"field_name" : "project_service_input_value",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Value"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"project_service_input_value_id" : {
					"field_name" : "project_service_input_value_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Value id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_service_input_value_images" : {
					"field_name" : "project_service_input_value_images",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Value Images"
						}
					}
				},
				"project_service_input_value_index" : {
					"field_name" : "project_service_input_value_index",
					"field_type" : "integer",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Value Index"
						}
					}
				},
				"project_service_input_value_label" : {
					"field_name" : "project_service_input_value_label",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Value Label"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"project_service_input_value_number" : {
					"field_name" : "project_service_input_value_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PSIV_"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Value Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_service_input_value_type" : {
					"field_name" : "project_service_input_value_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Value Type"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"service_id" : {
					"field_name" : "service_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service"
						}
					}
				}
			},
			"select_view_name" : "vw_project_service_input_values"
		},
		"project_service_inputs" : {
			 "table_name" : "project_service_inputs",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"display_condition_function_code" : {
					"field_name" : "display_condition_function_code",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Displayy Condition Function Code"
						}
					}
				},
				"project_service_contra_input_id" : {
					"field_name" : "project_service_contra_input_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contra Input"
						}
					}
				},
				"project_service_input_configurations" : {
					"field_name" : "project_service_input_configurations",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Configurations"
						}
					}
				},
				"project_service_input_group_id" : {
					"field_name" : "project_service_input_group_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Group"
						}
					}
				},
				"project_service_input_id" : {
					"field_name" : "project_service_input_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_service_input_label" : {
					"field_name" : "project_service_input_label",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Label"
						}
					}
				},
				"project_service_input_name" : {
					"field_name" : "project_service_input_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Name"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"project_service_input_number" : {
					"field_name" : "project_service_input_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PSI_"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_service_input_type" : {
					"field_name" : "project_service_input_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Input Type"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"project_services" : {
			 "table_name" : "project_services",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"project_service_description" : {
					"field_name" : "project_service_description",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Project Service Description"
						}
					}
				},
				"project_service_description_generation_function_code" : {
					"field_name" : "project_service_description_generation_function_code",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Description Generation Function Code"
						}
					}
				},
				"project_service_filter_tag" : {
					"field_name" : "project_service_filter_tag",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Filter Tag"
						}
					}
				},
				"project_service_id" : {
					"field_name" : "project_service_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Project Service Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_service_images" : {
					"field_name" : "project_service_images",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Project Service Images"
						}
					}
				},
				"project_service_name" : {
					"field_name" : "project_service_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Project Service Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"project_service_number" : {
					"field_name" : "project_service_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PS_"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Project Service Number"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"project_tasks" : {
			 "table_name" : "project_tasks",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"parent_task_id" : {
					"field_name" : "parent_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"task_budget" : {
					"field_name" : "task_budget",
					"field_type" : "double",
					"field_properties" : {}
				},
				"task_description" : {
					"field_name" : "task_description",
					"field_type" : "text",
					"field_properties" : {}
				},
				"task_name" : {
					"field_name" : "task_name",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"task_status" : {
					"field_name" : "task_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			}
		},
		"project_template_tasks" : {
			 "table_name" : "project_template_tasks",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"duration" : {
					"field_name" : "duration",
					"field_type" : "double",
					"field_properties" : {}
				},
				"parent_task_id" : {
					"field_name" : "parent_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_template_id" : {
					"field_name" : "project_template_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"stage_description" : {
					"field_name" : "stage_description",
					"field_type" : "text",
					"field_properties" : {}
				},
				"task_budget" : {
					"field_name" : "task_budget",
					"field_type" : "double",
					"field_properties" : {}
				},
				"task_name" : {
					"field_name" : "task_name",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				}
			}
		},
		"project_templates" : {
			 "table_name" : "project_templates",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_description" : {
					"field_name" : "project_description",
					"field_type" : "text",
					"field_properties" : {}
				},
				"project_template_id" : {
					"field_name" : "project_template_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_template_name" : {
					"field_name" : "project_template_name",
					"field_type" : "string",
					"field_properties" : {
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"project_template_number" : {
					"field_name" : "project_template_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_type" : {
					"field_name" : "project_type",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"project_visits" : {
			 "table_name" : "project_visits",
			 "table_fields" : {
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_visit_id" : {
					"field_name" : "project_visit_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_visit_number" : {
					"field_name" : "project_visit_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"visit_for" : {
					"field_name" : "visit_for",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"visit_reason" : {
					"field_name" : "visit_reason",
					"field_type" : "text",
					"field_properties" : {}
				},
				"visit_type" : {
					"field_name" : "visit_type",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"visitor_company" : {
					"field_name" : "visitor_company",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"visitor_name" : {
					"field_name" : "visitor_name",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				}
			}
		},
		"projects" : {
			 "table_name" : "projects",
			 "table_fields" : {
				"address_details" : {
					"field_name" : "address_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"email_details" : {
					"field_name" : "email_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"email_values" : {
					"field_name" : "email_values",
					"field_type" : "text",
					"field_properties" : {}
				},
				"fax_details" : {
					"field_name" : "fax_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"fax_values" : {
					"field_name" : "fax_values",
					"field_type" : "text",
					"field_properties" : {}
				},
				"legal_details" : {
					"field_name" : "legal_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"manager_id" : {
					"field_name" : "manager_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"phone_details" : {
					"field_name" : "phone_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"phone_values" : {
					"field_name" : "phone_values",
					"field_type" : "text",
					"field_properties" : {}
				},
				"project_budget" : {
					"field_name" : "project_budget",
					"field_type" : "double",
					"field_properties" : {}
				},
				"project_description" : {
					"field_name" : "project_description",
					"field_type" : "text",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"project_name" : {
					"field_name" : "project_name",
					"field_type" : "string",
					"field_properties" : {
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"project_number" : {
					"field_name" : "project_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_status" : {
					"field_name" : "project_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_type" : {
					"field_name" : "project_type",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"website_details" : {
					"field_name" : "website_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"website_values" : {
					"field_name" : "website_values",
					"field_type" : "text",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_projects"
		},
		"purchase_commercial_invoice_documents" : {
			 "table_name" : "purchase_commercial_invoice_documents",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"mandatory_document_id" : {
					"field_name" : "mandatory_document_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_commercial_invoice_document_id" : {
					"field_name" : "purchase_commercial_invoice_document_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_commercial_invoice_id" : {
					"field_name" : "purchase_commercial_invoice_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"purchase_commercial_invoice_expenses" : {
			 "table_name" : "purchase_commercial_invoice_expenses",
			 "table_fields" : {
				"commercial_invoice_id" : {
					"field_name" : "commercial_invoice_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"document_expense_id" : {
					"field_name" : "document_expense_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_commercial_invoice_expense_id" : {
					"field_name" : "purchase_commercial_invoice_expense_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_commercial_invoice_items" : {
			 "table_name" : "purchase_commercial_invoice_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercial_invoice_id" : {
					"field_name" : "commercial_invoice_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"commercial_invoice_item_id" : {
					"field_name" : "commercial_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"commercial_invoice_item_status" : {
					"field_name" : "commercial_invoice_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"containers_linked" : {
					"field_name" : "containers_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"discount_cd_percentage" : {
					"field_name" : "discount_cd_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_rebate_amount" : {
					"field_name" : "discount_rebate_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_td_percentage" : {
					"field_name" : "discount_td_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"expiring_on" : {
					"field_name" : "expiring_on",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"invoices_linked" : {
					"field_name" : "invoices_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"item_cost" : {
					"field_name" : "item_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_landing" : {
					"field_name" : "item_price_landing",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 1
						}
					}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"lot_auto_generated" : {
					"field_name" : "lot_auto_generated",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"lot_details" : {
					"field_name" : "lot_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"lot_id" : {
					"field_name" : "lot_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"packings_linked" : {
					"field_name" : "packings_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"split_cost" : {
					"field_name" : "split_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"tax_percentage" : {
					"field_name" : "tax_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_commercial_invoice_items"
		},
		"purchase_commercial_invoice_links" : {
			 "table_name" : "purchase_commercial_invoice_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercial_invoice_item_id" : {
					"field_name" : "commercial_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"invoice_item_id" : {
					"field_name" : "invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"purchase_commercial_invoice_payments" : {
			 "table_name" : "purchase_commercial_invoice_payments",
			 "table_fields" : {
				"commercial_invoice_id" : {
					"field_name" : "commercial_invoice_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"document_payment_id" : {
					"field_name" : "document_payment_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_commercial_invoice_payment_id" : {
					"field_name" : "purchase_commercial_invoice_payment_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_commercial_invoices" : {
			 "table_name" : "purchase_commercial_invoices",
			 "table_fields" : {
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercial_invoice_amount" : {
					"field_name" : "commercial_invoice_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"commercial_invoice_date" : {
					"field_name" : "commercial_invoice_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"commercial_invoice_id" : {
					"field_name" : "commercial_invoice_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"commercial_invoice_number" : {
					"field_name" : "commercial_invoice_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "CIN"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"commercial_invoice_status" : {
					"field_name" : "commercial_invoice_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ON PORT"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"contact_person" : {
					"field_name" : "contact_person",
					"field_type" : "string",
					"field_properties" : {}
				},
				"containers_linked" : {
					"field_name" : "containers_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method",
					"field_type" : "string",
					"field_properties" : {}
				},
				"credit_days" : {
					"field_name" : "credit_days",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"invoices_linked" : {
					"field_name" : "invoices_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"is_payable" : {
					"field_name" : "is_payable",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 1
						}
					}
				},
				"item_price_type" : {
					"field_name" : "item_price_type",
					"field_type" : "string",
					"field_properties" : {
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"CIF","value":"CIF"},{"label":"FOB","value":"FOB"},{"label":"EX-FACTORY","value":"EX-FACTORY"}]
						}
					}
				},
				"packings_linked" : {
					"field_name" : "packings_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_commercial_invoices"
		},
		"purchase_commercial_invoices_purchase_invoices_link_items" : {
			 "table_name" : "purchase_commercial_invoices_purchase_invoices_link_items",
			 "table_fields" : {
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_commercial_invoice_item_id" : {
					"field_name" : "purchase_commercial_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_item_id" : {
					"field_name" : "purchase_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"purchase_commercial_invoices_purchase_invoices_links" : {
			 "table_name" : "purchase_commercial_invoices_purchase_invoices_links",
			 "table_fields" : {
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_commercial_invoice_id" : {
					"field_name" : "purchase_commercial_invoice_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_id" : {
					"field_name" : "purchase_invoice_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_container_commercial_links" : {
			 "table_name" : "purchase_container_commercial_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercial_invoice_item_id" : {
					"field_name" : "commercial_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"container_item_id" : {
					"field_name" : "container_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"purchase_container_documents" : {
			 "table_name" : "purchase_container_documents",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"document_name" : {
					"field_name" : "document_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"document_status" : {
					"field_name" : "document_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"UPLOADED","value":"UPLOADED"},{"label":"PENDING","value":"PENDING"}]
						}
					}
				},
				"purchase_container_document_id" : {
					"field_name" : "purchase_container_document_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_container_id" : {
					"field_name" : "purchase_container_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"purchase_container_expenses" : {
			 "table_name" : "purchase_container_expenses",
			 "table_fields" : {
				"container_id" : {
					"field_name" : "container_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"document_expense_id" : {
					"field_name" : "document_expense_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_container_expense_id" : {
					"field_name" : "purchase_container_expense_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_container_items" : {
			 "table_name" : "purchase_container_items",
			 "table_fields" : {
				"arrived_quantity" : {
					"field_name" : "arrived_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"container_id" : {
					"field_name" : "container_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"container_item_id" : {
					"field_name" : "container_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"container_item_status" : {
					"field_name" : "container_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"RECEIVED","value":"RECEIVED"},{"label":"MISSING","value":"MISSING"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"details" : {
					"field_name" : "details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_cost" : {
					"field_name" : "item_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"packings_linked" : {
					"field_name" : "packings_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"split_cost" : {
					"field_name" : "split_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_container_items"
		},
		"purchase_container_packing_link_items" : {
			 "table_name" : "purchase_container_packing_link_items",
			 "table_fields" : {
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_container_item_id" : {
					"field_name" : "purchase_container_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_packing_list_item_id" : {
					"field_name" : "purchase_packing_list_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"purchase_container_packing_links" : {
			 "table_name" : "purchase_container_packing_links",
			 "table_fields" : {
				"arrived_quantity" : {
					"field_name" : "arrived_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"container_item_id" : {
					"field_name" : "container_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"damaged_attachments" : {
					"field_name" : "damaged_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"damaged_audio_attachments" : {
					"field_name" : "damaged_audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"damaged_quantity" : {
					"field_name" : "damaged_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"damaged_remarks" : {
					"field_name" : "damaged_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"packing_list_item_id" : {
					"field_name" : "packing_list_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_container_packing_id" : {
					"field_name" : "purchase_container_packing_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unloading_status" : {
					"field_name" : "unloading_status",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"purchase_containers" : {
			 "table_name" : "purchase_containers",
			 "table_fields" : {
				"arrival_attachments" : {
					"field_name" : "arrival_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"arrival_audio_recordings" : {
					"field_name" : "arrival_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"arrival_date_est" : {
					"field_name" : "arrival_date_est",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"arrival_datetime_dock" : {
					"field_name" : "arrival_datetime_dock",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"arrival_datetime_location" : {
					"field_name" : "arrival_datetime_location",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"arrival_remarks" : {
					"field_name" : "arrival_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"arrival_signature_id" : {
					"field_name" : "arrival_signature_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"checklist_id" : {
					"field_name" : "checklist_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"container_color" : {
					"field_name" : "container_color",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"container_date" : {
					"field_name" : "container_date",
					"field_type" : "date",
					"field_properties" : {}
				},
				"container_details" : {
					"field_name" : "container_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"container_id" : {
					"field_name" : "container_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"container_number" : {
					"field_name" : "container_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "CNT"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"container_status" : {
					"field_name" : "container_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "READY TO LOAD"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"container_type" : {
					"field_name" : "container_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"default_storage_location_id" : {
					"field_name" : "default_storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"dispatch_attachments" : {
					"field_name" : "dispatch_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"dispatch_audio_recordings" : {
					"field_name" : "dispatch_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"dispatch_datetime_location" : {
					"field_name" : "dispatch_datetime_location",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"dispatch_remarks" : {
					"field_name" : "dispatch_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"dispatch_signature_id" : {
					"field_name" : "dispatch_signature_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"documents_pending" : {
					"field_name" : "documents_pending",
					"field_type" : "integer",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"documents_uploaded" : {
					"field_name" : "documents_uploaded",
					"field_type" : "integer",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"empty_date" : {
					"field_name" : "empty_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"empty_location_id" : {
					"field_name" : "empty_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"inbound_date" : {
					"field_name" : "inbound_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"material_type" : {
					"field_name" : "material_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"outbound_date" : {
					"field_name" : "outbound_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"packings_linked" : {
					"field_name" : "packings_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"shipping_company_id" : {
					"field_name" : "shipping_company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_end_time" : {
					"field_name" : "unloading_end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unloading_signature_id" : {
					"field_name" : "unloading_signature_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"unloading_start_time" : {
					"field_name" : "unloading_start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"vessel_number" : {
					"field_name" : "vessel_number",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_containers"
		},
		"purchase_containers_packings" : {
			 "table_name" : "purchase_containers_packings",
			 "table_fields" : {
				"container_id" : {
					"field_name" : "container_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"damaged_attachments" : {
					"field_name" : "damaged_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"damaged_audio_recordings" : {
					"field_name" : "damaged_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"damaged_remarks" : {
					"field_name" : "damaged_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"packing_list_id" : {
					"field_name" : "packing_list_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_container_packing_id" : {
					"field_name" : "purchase_container_packing_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_end_time" : {
					"field_name" : "unloading_end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unloading_start_time" : {
					"field_name" : "unloading_start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"unloading_status" : {
					"field_name" : "unloading_status",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_containers_packings"
		},
		"purchase_containers_purchase_packing_lists_link_items" : {
			 "table_name" : "purchase_containers_purchase_packing_lists_link_items",
			 "table_fields" : {
				"arrived_quantity" : {
					"field_name" : "arrived_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"damaged_attachments" : {
					"field_name" : "damaged_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"damaged_audio_attachments" : {
					"field_name" : "damaged_audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"damaged_quantity" : {
					"field_name" : "damaged_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"damaged_remarks" : {
					"field_name" : "damaged_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_container_item_id" : {
					"field_name" : "purchase_container_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_packing_list_item_id" : {
					"field_name" : "purchase_packing_list_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unloading_status" : {
					"field_name" : "unloading_status",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"purchase_containers_purchase_packing_lists_links" : {
			 "table_name" : "purchase_containers_purchase_packing_lists_links",
			 "table_fields" : {
				"damaged_attachments" : {
					"field_name" : "damaged_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"damaged_audio_recordings" : {
					"field_name" : "damaged_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"damaged_remarks" : {
					"field_name" : "damaged_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_container_id" : {
					"field_name" : "purchase_container_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_packing_list_id" : {
					"field_name" : "purchase_packing_list_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_end_time" : {
					"field_name" : "unloading_end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unloading_start_time" : {
					"field_name" : "unloading_start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"unloading_status" : {
					"field_name" : "unloading_status",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"purchase_invoice_expenses" : {
			 "table_name" : "purchase_invoice_expenses",
			 "table_fields" : {
				"document_expense_id" : {
					"field_name" : "document_expense_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"invoice_id" : {
					"field_name" : "invoice_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_invoice_expense_id" : {
					"field_name" : "purchase_invoice_expense_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_invoice_items" : {
			 "table_name" : "purchase_invoice_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"discount_cd_percentage" : {
					"field_name" : "discount_cd_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_rebate_amount" : {
					"field_name" : "discount_rebate_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_td_percentage" : {
					"field_name" : "discount_td_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"expiring_on" : {
					"field_name" : "expiring_on",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"invoice_id" : {
					"field_name" : "invoice_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"invoice_item_id" : {
					"field_name" : "invoice_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"invoice_item_status" : {
					"field_name" : "invoice_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "RECEIVED"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"RECEIVED","value":"RECEIVED"},{"label":"PENDING","value":"PENDING"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_cost" : {
					"field_name" : "item_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_landing" : {
					"field_name" : "item_price_landing",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_sale" : {
					"field_name" : "item_price_sale",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 1
						}
					}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"lot_auto_generated" : {
					"field_name" : "lot_auto_generated",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"lot_details" : {
					"field_name" : "lot_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"lot_id" : {
					"field_name" : "lot_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"split_cost" : {
					"field_name" : "split_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"tax_percentage" : {
					"field_name" : "tax_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_invoice_items"
		},
		"purchase_invoice_landing_links" : {
			 "table_name" : "purchase_invoice_landing_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"invoice_item_id" : {
					"field_name" : "invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"landing_price_item_id" : {
					"field_name" : "landing_price_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_invoice_landing_links"
		},
		"purchase_invoice_payments" : {
			 "table_name" : "purchase_invoice_payments",
			 "table_fields" : {
				"document_payment_id" : {
					"field_name" : "document_payment_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"invoice_id" : {
					"field_name" : "invoice_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_invoice_payment_id" : {
					"field_name" : "purchase_invoice_payment_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_invoices" : {
			 "table_name" : "purchase_invoices",
			 "table_fields" : {
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"contact_person" : {
					"field_name" : "contact_person",
					"field_type" : "string",
					"field_properties" : {}
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method",
					"field_type" : "string",
					"field_properties" : {}
				},
				"credit_days" : {
					"field_name" : "credit_days",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"invoice_amount" : {
					"field_name" : "invoice_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"invoice_date" : {
					"field_name" : "invoice_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"invoice_id" : {
					"field_name" : "invoice_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"invoice_number" : {
					"field_name" : "invoice_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PI"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"invoice_status" : {
					"field_name" : "invoice_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "INVOICE CREATED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"is_local_purchase" : {
					"field_name" : "is_local_purchase",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"is_payable" : {
					"field_name" : "is_payable",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"item_price_type" : {
					"field_name" : "item_price_type",
					"field_type" : "string",
					"field_properties" : {
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"CIF","value":"CIF"},{"label":"FOB","value":"FOB"},{"label":"EX-FACTORY","value":"EX-FACTORY"}]
						}
					}
				},
				"landing_price_id" : {
					"field_name" : "landing_price_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"profit_margin" : {
					"field_name" : "profit_margin",
					"field_type" : "double",
					"field_properties" : {}
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_invoices"
		},
		"purchase_order_expenses" : {
			 "table_name" : "purchase_order_expenses",
			 "table_fields" : {
				"document_expense_id" : {
					"field_name" : "document_expense_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"order_id" : {
					"field_name" : "order_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_order_expense_id" : {
					"field_name" : "purchase_order_expense_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_order_items" : {
			 "table_name" : "purchase_order_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_cd_percentage" : {
					"field_name" : "discount_cd_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_rebate_amount" : {
					"field_name" : "discount_rebate_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_td_percentage" : {
					"field_name" : "discount_td_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_cost" : {
					"field_name" : "item_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"lot_auto_generated" : {
					"field_name" : "lot_auto_generated",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"lot_details" : {
					"field_name" : "lot_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"lot_id" : {
					"field_name" : "lot_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"order_id" : {
					"field_name" : "order_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"order_item_id" : {
					"field_name" : "order_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"order_item_status" : {
					"field_name" : "order_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"RECEIVED","value":"RECEIVED"},{"label":"MISSING","value":"MISSING"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quotes_linked" : {
					"field_name" : "quotes_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"split_cost" : {
					"field_name" : "split_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"tax_percentage" : {
					"field_name" : "tax_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_order_items"
		},
		"purchase_order_payments" : {
			 "table_name" : "purchase_order_payments",
			 "table_fields" : {
				"document_payment_id" : {
					"field_name" : "document_payment_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"order_id" : {
					"field_name" : "order_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_order_payment_id" : {
					"field_name" : "purchase_order_payment_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_order_proforma_links" : {
			 "table_name" : "purchase_order_proforma_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"order_item_id" : {
					"field_name" : "order_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"proforma_item_id" : {
					"field_name" : "proforma_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"purchase_orders" : {
			 "table_name" : "purchase_orders",
			 "table_fields" : {
				"approval_status" : {
					"field_name" : "approval_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"APPROVED","value":"APPROVED"},{"label":"REJECTED","value":"REJECTED"}]
						}
					}
				},
				"approval_time" : {
					"field_name" : "approval_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"contact_person" : {
					"field_name" : "contact_person",
					"field_type" : "string",
					"field_properties" : {}
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method",
					"field_type" : "string",
					"field_properties" : {}
				},
				"credit_days" : {
					"field_name" : "credit_days",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"is_payable" : {
					"field_name" : "is_payable",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"item_price_type" : {
					"field_name" : "item_price_type",
					"field_type" : "string",
					"field_properties" : {
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"CIF","value":"CIF"},{"label":"FOB","value":"FOB"},{"label":"EX-FACTORY","value":"EX-FACTORY"}]
						}
					}
				},
				"loading_date" : {
					"field_name" : "loading_date",
					"field_type" : "date",
					"field_properties" : {}
				},
				"order_amount" : {
					"field_name" : "order_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"order_date" : {
					"field_name" : "order_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"order_id" : {
					"field_name" : "order_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"order_number" : {
					"field_name" : "order_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PO"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"order_status" : {
					"field_name" : "order_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ORDER CREATED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quotes_linked" : {
					"field_name" : "quotes_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks_for_vendor" : {
					"field_name" : "remarks_for_vendor",
					"field_type" : "text",
					"field_properties" : {}
				},
				"shipping_details" : {
					"field_name" : "shipping_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_orders"
		},
		"purchase_orders_purchase_proformas_link_items" : {
			 "table_name" : "purchase_orders_purchase_proformas_link_items",
			 "table_fields" : {
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_order_item_id" : {
					"field_name" : "purchase_order_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_proforma_item_id" : {
					"field_name" : "purchase_proforma_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"purchase_orders_purchase_proformas_links" : {
			 "table_name" : "purchase_orders_purchase_proformas_links",
			 "table_fields" : {
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_order_id" : {
					"field_name" : "purchase_order_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_proforma_id" : {
					"field_name" : "purchase_proforma_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_packing_commercial_links" : {
			 "table_name" : "purchase_packing_commercial_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercial_invoice_item_id" : {
					"field_name" : "commercial_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"packing_list_item_id" : {
					"field_name" : "packing_list_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"purchase_packing_list_expenses" : {
			 "table_name" : "purchase_packing_list_expenses",
			 "table_fields" : {
				"document_expense_id" : {
					"field_name" : "document_expense_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"packing_list_id" : {
					"field_name" : "packing_list_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_packing_list_expense_id" : {
					"field_name" : "purchase_packing_list_expense_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_packing_list_items" : {
			 "table_name" : "purchase_packing_list_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"containers_linked" : {
					"field_name" : "containers_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"details" : {
					"field_name" : "details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"item_cost" : {
					"field_name" : "item_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"packing_list_id" : {
					"field_name" : "packing_list_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"packing_list_item_id" : {
					"field_name" : "packing_list_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"packing_list_item_status" : {
					"field_name" : "packing_list_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"RECEIVED","value":"RECEIVED"},{"label":"MISSING","value":"MISSING"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"split_cost" : {
					"field_name" : "split_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_packing_list_items"
		},
		"purchase_packing_lists" : {
			 "table_name" : "purchase_packing_lists",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"containers_linked" : {
					"field_name" : "containers_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"material_type" : {
					"field_name" : "material_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"packing_list_date" : {
					"field_name" : "packing_list_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"packing_list_id" : {
					"field_name" : "packing_list_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"packing_list_number" : {
					"field_name" : "packing_list_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PL"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"packing_list_status" : {
					"field_name" : "packing_list_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "READY TO LOAD"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"packing_time" : {
					"field_name" : "packing_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"packing_type" : {
					"field_name" : "packing_type",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unloading_end_time" : {
					"field_name" : "unloading_end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unloading_start_time" : {
					"field_name" : "unloading_start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_packing_lists"
		},
		"purchase_proforma_commercial_links" : {
			 "table_name" : "purchase_proforma_commercial_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercial_invoice_item_id" : {
					"field_name" : "commercial_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"proforma_item_id" : {
					"field_name" : "proforma_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"purchase_proforma_container_links" : {
			 "table_name" : "purchase_proforma_container_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"container_item_id" : {
					"field_name" : "container_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"proforma_item_id" : {
					"field_name" : "proforma_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"purchase_proforma_expenses" : {
			 "table_name" : "purchase_proforma_expenses",
			 "table_fields" : {
				"document_expense_id" : {
					"field_name" : "document_expense_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"proforma_id" : {
					"field_name" : "proforma_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_proforma_expense_id" : {
					"field_name" : "purchase_proforma_expense_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_proforma_items" : {
			 "table_name" : "purchase_proforma_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"containers_linked" : {
					"field_name" : "containers_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_cd_percentage" : {
					"field_name" : "discount_cd_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_rebate_amount" : {
					"field_name" : "discount_rebate_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_td_percentage" : {
					"field_name" : "discount_td_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"expiring_on" : {
					"field_name" : "expiring_on",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"item_cost" : {
					"field_name" : "item_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"lot_auto_generated" : {
					"field_name" : "lot_auto_generated",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"lot_details" : {
					"field_name" : "lot_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"lot_id" : {
					"field_name" : "lot_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"orders_linked" : {
					"field_name" : "orders_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"packings_linked" : {
					"field_name" : "packings_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"proforma_id" : {
					"field_name" : "proforma_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"proforma_item_id" : {
					"field_name" : "proforma_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"proforma_item_status" : {
					"field_name" : "proforma_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"RECEIVED","value":"RECEIVED"},{"label":"MISSING","value":"MISSING"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"split_cost" : {
					"field_name" : "split_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"tax_percentage" : {
					"field_name" : "tax_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_proforma_items"
		},
		"purchase_proforma_packing_links" : {
			 "table_name" : "purchase_proforma_packing_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"packing_list_item_id" : {
					"field_name" : "packing_list_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"proforma_item_id" : {
					"field_name" : "proforma_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"purchase_proforma_payments" : {
			 "table_name" : "purchase_proforma_payments",
			 "table_fields" : {
				"document_payment_id" : {
					"field_name" : "document_payment_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"proforma_id" : {
					"field_name" : "proforma_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_proforma_payment_id" : {
					"field_name" : "purchase_proforma_payment_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_proformas" : {
			 "table_name" : "purchase_proformas",
			 "table_fields" : {
				"approval_status" : {
					"field_name" : "approval_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"APPROVED","value":"APPROVED"},{"label":"REJECTED","value":"REJECTED"}]
						}
					}
				},
				"approval_time" : {
					"field_name" : "approval_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"contact_person" : {
					"field_name" : "contact_person",
					"field_type" : "string",
					"field_properties" : {}
				},
				"containers_linked" : {
					"field_name" : "containers_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method",
					"field_type" : "string",
					"field_properties" : {}
				},
				"credit_days" : {
					"field_name" : "credit_days",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"is_payable" : {
					"field_name" : "is_payable",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"item_price_type" : {
					"field_name" : "item_price_type",
					"field_type" : "string",
					"field_properties" : {
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"CIF","value":"CIF"},{"label":"FOB","value":"FOB"},{"label":"EX-FACTORY","value":"EX-FACTORY"}]
						}
					}
				},
				"orders_linked" : {
					"field_name" : "orders_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"packings_linked" : {
					"field_name" : "packings_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"proforma_amount" : {
					"field_name" : "proforma_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"proforma_date" : {
					"field_name" : "proforma_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"proforma_id" : {
					"field_name" : "proforma_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"proforma_number" : {
					"field_name" : "proforma_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PFI"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"proforma_status" : {
					"field_name" : "proforma_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PROCESSING PAYMENT"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_proformas"
		},
		"purchase_proformas_purchase_commercial_invoices_link_items" : {
			 "table_name" : "purchase_proformas_purchase_commercial_invoices_link_items",
			 "table_fields" : {
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_commercial_invoice_item_id" : {
					"field_name" : "purchase_commercial_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_proforma_item_id" : {
					"field_name" : "purchase_proforma_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"purchase_proformas_purchase_commercial_invoices_links" : {
			 "table_name" : "purchase_proformas_purchase_commercial_invoices_links",
			 "table_fields" : {
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_commercial_invoice_id" : {
					"field_name" : "purchase_commercial_invoice_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_proforma_id" : {
					"field_name" : "purchase_proforma_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_proformas_purchase_containers_link_items" : {
			 "table_name" : "purchase_proformas_purchase_containers_link_items",
			 "table_fields" : {
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_container_item_id" : {
					"field_name" : "purchase_container_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_proforma_item_id" : {
					"field_name" : "purchase_proforma_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"purchase_proformas_purchase_containers_links" : {
			 "table_name" : "purchase_proformas_purchase_containers_links",
			 "table_fields" : {
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_container_id" : {
					"field_name" : "purchase_container_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_proforma_id" : {
					"field_name" : "purchase_proforma_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_proformas_purchase_packing_lists_link_items" : {
			 "table_name" : "purchase_proformas_purchase_packing_lists_link_items",
			 "table_fields" : {
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_packing_list_item_id" : {
					"field_name" : "purchase_packing_list_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_proforma_item_id" : {
					"field_name" : "purchase_proforma_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"purchase_proformas_purchase_packing_lists_links" : {
			 "table_name" : "purchase_proformas_purchase_packing_lists_links",
			 "table_fields" : {
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_packing_list_id" : {
					"field_name" : "purchase_packing_list_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_proforma_id" : {
					"field_name" : "purchase_proforma_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_quote_items" : {
			 "table_name" : "purchase_quote_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"orders_linked" : {
					"field_name" : "orders_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quote_id" : {
					"field_name" : "quote_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quote_item_id" : {
					"field_name" : "quote_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"quote_item_status" : {
					"field_name" : "quote_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"RECEIVED","value":"RECEIVED"},{"label":"MISSING","value":"MISSING"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"requests_linked" : {
					"field_name" : "requests_linked",
					"field_type" : "text",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_quote_items"
		},
		"purchase_quote_vendor_items" : {
			 "table_name" : "purchase_quote_vendor_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross",
					"field_type" : "double",
					"field_properties" : {}
				},
				"last_item_order_id" : {
					"field_name" : "last_item_order_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"last_item_price" : {
					"field_name" : "last_item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"quote_item_id" : {
					"field_name" : "quote_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quote_vendor_id" : {
					"field_name" : "quote_vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quote_vendor_item_id" : {
					"field_name" : "quote_vendor_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_quote_vendor_items"
		},
		"purchase_quote_vendor_order_links" : {
			 "table_name" : "purchase_quote_vendor_order_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"order_item_id" : {
					"field_name" : "order_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"quote_item_id" : {
					"field_name" : "quote_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quote_vendor_item_id" : {
					"field_name" : "quote_vendor_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"purchase_quote_vendors" : {
			 "table_name" : "purchase_quote_vendors",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"quote_id" : {
					"field_name" : "quote_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"quote_vendor_id" : {
					"field_name" : "quote_vendor_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"quote_vendor_number" : {
					"field_name" : "quote_vendor_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "VENQT"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks_for_vendor" : {
					"field_name" : "remarks_for_vendor",
					"field_type" : "text",
					"field_properties" : {}
				},
				"required_date" : {
					"field_name" : "required_date",
					"field_type" : "date",
					"field_properties" : {}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"vendor_quote_date" : {
					"field_name" : "vendor_quote_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"vendor_quote_status" : {
					"field_name" : "vendor_quote_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "SENT FOR QUOTE"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"select_view_name" : "vw_purchase_quote_vendors"
		},
		"purchase_quote_vendors_purchase_orders_link_items" : {
			 "table_name" : "purchase_quote_vendors_purchase_orders_link_items",
			 "table_fields" : {
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_order_item_id" : {
					"field_name" : "purchase_order_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_quote_vendor_item_id" : {
					"field_name" : "purchase_quote_vendor_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"purchase_quote_vendors_purchase_orders_links" : {
			 "table_name" : "purchase_quote_vendors_purchase_orders_links",
			 "table_fields" : {
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_order_id" : {
					"field_name" : "purchase_order_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_quote_vendor_id" : {
					"field_name" : "purchase_quote_vendor_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_quotes" : {
			 "table_name" : "purchase_quotes",
			 "table_fields" : {
				"approval_status" : {
					"field_name" : "approval_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"APPROVED","value":"APPROVED"},{"label":"REJECTED","value":"REJECTED"}]
						}
					}
				},
				"approval_time" : {
					"field_name" : "approval_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"orders_linked" : {
					"field_name" : "orders_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"quote_date" : {
					"field_name" : "quote_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"quote_id" : {
					"field_name" : "quote_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"quote_number" : {
					"field_name" : "quote_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "QT"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"quote_status" : {
					"field_name" : "quote_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "QUOTE CREATED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks_for_vendor" : {
					"field_name" : "remarks_for_vendor",
					"field_type" : "text",
					"field_properties" : {}
				},
				"requests_linked" : {
					"field_name" : "requests_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"required_date" : {
					"field_name" : "required_date",
					"field_type" : "date",
					"field_properties" : {}
				},
				"vendors_linked" : {
					"field_name" : "vendors_linked",
					"field_type" : "text",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_purchase_quotes"
		},
		"purchase_request_items" : {
			 "table_name" : "purchase_request_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"material_requests_linked" : {
					"field_name" : "material_requests_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quotes_linked" : {
					"field_name" : "quotes_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"request_id" : {
					"field_name" : "request_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"request_item_id" : {
					"field_name" : "request_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"request_item_status" : {
					"field_name" : "request_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"RECEIVED","value":"RECEIVED"},{"label":"MISSING","value":"MISSING"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"select_view_name" : "vw_purchase_request_items"
		},
		"purchase_request_quote_links" : {
			 "table_name" : "purchase_request_quote_links",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				},
				"quote_item_id" : {
					"field_name" : "quote_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"request_item_id" : {
					"field_name" : "request_item_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"purchase_requests" : {
			 "table_name" : "purchase_requests",
			 "table_fields" : {
				"approval_status" : {
					"field_name" : "approval_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"APPROVED","value":"APPROVED"},{"label":"REJECTED","value":"REJECTED"}]
						}
					}
				},
				"approval_time" : {
					"field_name" : "approval_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"material_requests_linked" : {
					"field_name" : "material_requests_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"quotes_linked" : {
					"field_name" : "quotes_linked",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"request_date" : {
					"field_name" : "request_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"request_id" : {
					"field_name" : "request_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"request_number" : {
					"field_name" : "request_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 8
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "PR"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"request_status" : {
					"field_name" : "request_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "REQUEST CREATED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"requested_by" : {
					"field_name" : "requested_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"requested_for" : {
					"field_name" : "requested_for",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				}
			},
			"select_view_name" : "vw_purchase_requests"
		},
		"purchase_requests_purchase_quotes_link_items" : {
			 "table_name" : "purchase_requests_purchase_quotes_link_items",
			 "table_fields" : {
				"item_link_id" : {
					"field_name" : "item_link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_modify" : {
							"property_name" : "check_in_modify",
							"property_value" : true
						}
					}
				},
				"purchase_quote_item_id" : {
					"field_name" : "purchase_quote_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_modify" : {
							"property_name" : "check_in_modify",
							"property_value" : true
						},
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_request_item_id" : {
					"field_name" : "purchase_request_item_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_modify" : {
							"property_name" : "check_in_modify",
							"property_value" : true
						},
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"quantity_used" : {
					"field_name" : "quantity_used",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"purchase_requests_purchase_quotes_links" : {
			 "table_name" : "purchase_requests_purchase_quotes_links",
			 "table_fields" : {
				"link_id" : {
					"field_name" : "link_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_quote_id" : {
					"field_name" : "purchase_quote_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				},
				"purchase_request_id" : {
					"field_name" : "purchase_request_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						}
					}
				}
			}
		},
		"purchase_return_items" : {
			 "table_name" : "purchase_return_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"discount_cd_percentage" : {
					"field_name" : "discount_cd_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_rebate_amount" : {
					"field_name" : "discount_rebate_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"discount_td_percentage" : {
					"field_name" : "discount_td_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_status" : {
					"field_name" : "item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"lot_auto_generated" : {
					"field_name" : "lot_auto_generated",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"lot_details" : {
					"field_name" : "lot_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"lot_id" : {
					"field_name" : "lot_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_invoice_item_id" : {
					"field_name" : "purchase_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_return_id" : {
					"field_name" : "purchase_return_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_restored" : {
					"field_name" : "quantity_restored",
					"field_type" : "double",
					"field_properties" : {}
				},
				"return_attachments" : {
					"field_name" : "return_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"return_item_id" : {
					"field_name" : "return_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"tax_percentage" : {
					"field_name" : "tax_percentage",
					"field_type" : "double",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"purchase_returns" : {
			 "table_name" : "purchase_returns",
			 "table_fields" : {
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method",
					"field_type" : "string",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_return_amount" : {
					"field_name" : "purchase_return_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"purchase_return_date" : {
					"field_name" : "purchase_return_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"purchase_return_id" : {
					"field_name" : "purchase_return_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_return_number" : {
					"field_name" : "purchase_return_number",
					"field_type" : "string",
					"field_properties" : {}
				},
				"purchase_return_status" : {
					"field_name" : "purchase_return_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"purchase_terms" : {
			 "table_name" : "purchase_terms",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Purchase Term Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_term_name" : {
					"field_name" : "purchase_term_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Purchase Term Name"
						}
					}
				},
				"purchase_term_number" : {
					"field_name" : "purchase_term_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Purchase Term Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"purchase_term_status" : {
					"field_name" : "purchase_term_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Purchase Term Status"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				}
			}
		},
		"record_versions" : {
			 "table_name" : "record_versions",
			 "table_fields" : {
				"record" : {
					"field_name" : "record",
					"field_type" : "json",
					"field_properties" : {}
				},
				"record_id" : {
					"field_name" : "record_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"record_type" : {
					"field_name" : "record_type",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						}
					}
				},
				"record_version_id" : {
					"field_name" : "record_version_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"version_name" : {
					"field_name" : "version_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"version_number" : {
					"field_name" : "version_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			}
		},
		"recurring_trips" : {
			 "table_name" : "recurring_trips",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"driver_id" : {
					"field_name" : "driver_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"has_return" : {
					"field_name" : "has_return",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"location_destination" : {
					"field_name" : "location_destination",
					"field_type" : "json",
					"field_properties" : {}
				},
				"location_source" : {
					"field_name" : "location_source",
					"field_type" : "json",
					"field_properties" : {}
				},
				"recurring_trip_id" : {
					"field_name" : "recurring_trip_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"recurring_trip_number" : {
					"field_name" : "recurring_trip_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"recurring_trip_status" : {
					"field_name" : "recurring_trip_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"trips_end_date" : {
					"field_name" : "trips_end_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"trips_start_date" : {
					"field_name" : "trips_start_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"vehicle_id" : {
					"field_name" : "vehicle_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"reminders" : {
			 "table_name" : "reminders",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"reminder_datetime" : {
					"field_name" : "reminder_datetime",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"reminder_for" : {
					"field_name" : "reminder_for",
					"field_type" : "string",
					"field_properties" : {}
				},
				"reminder_history" : {
					"field_name" : "reminder_history",
					"field_type" : "json",
					"field_properties" : {}
				},
				"reminder_id" : {
					"field_name" : "reminder_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"reminder_number" : {
					"field_name" : "reminder_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"reminder_status" : {
					"field_name" : "reminder_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"reminder_type" : {
					"field_name" : "reminder_type",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"reports" : {
			 "table_name" : "reports",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "text",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"report_details" : {
					"field_name" : "report_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"report_elements" : {
					"field_name" : "report_elements",
					"field_type" : "json",
					"field_properties" : {}
				},
				"report_id" : {
					"field_name" : "report_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"report_name" : {
					"field_name" : "report_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"report_number" : {
					"field_name" : "report_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "REP-"
						}
					}
				},
				"report_status" : {
					"field_name" : "report_status",
					"field_type" : "string",
					"field_properties" : {}
				},
				"report_title" : {
					"field_name" : "report_title",
					"field_type" : "string",
					"field_properties" : {}
				},
				"report_type" : {
					"field_name" : "report_type",
					"field_type" : "string",
					"field_properties" : {
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"report_url" : {
					"field_name" : "report_url",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"sale_appointments" : {
			 "table_name" : "sale_appointments",
			 "table_fields" : {
				"appointment_end_time" : {
					"field_name" : "appointment_end_time",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "End Time"
						}
					}
				},
				"appointment_start_time" : {
					"field_name" : "appointment_start_time",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Start Time"
						}
					}
				},
				"appointment_status" : {
					"field_name" : "appointment_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Appointment Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "BOOKED"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"BOOKED","value":"BOOKED"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"},{"label":"POSTPONED","value":"POSTPONED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Assigned To"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"customer_id" : {
					"field_name" : "customer_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Customer"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"request_attachments" : {
					"field_name" : "request_attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Request Attachments"
						}
					}
				},
				"request_remarks" : {
					"field_name" : "request_remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Request Remarks"
						}
					}
				},
				"response_attachments" : {
					"field_name" : "response_attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Response Attachments"
						}
					}
				},
				"response_remarks" : {
					"field_name" : "response_remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Response Remarks"
						}
					}
				},
				"sale_appointment_id" : {
					"field_name" : "sale_appointment_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Appointment Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_appointment_number" : {
					"field_name" : "sale_appointment_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Appointment Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"select_view_name" : "vw_sale_appointments"
		},
		"sale_container_items" : {
			 "table_name" : "sale_container_items",
			 "table_fields" : {
				"additional_cost_details" : {
					"field_name" : "additional_cost_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"container_item_status" : {
					"field_name" : "container_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"PACKED","value":"PACKED"},{"label":"PICKED UP","value":"PICKED UP"},{"label":"RECEIVED","value":"RECEIVED"},{"label":"MISSING","value":"MISSING"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"details" : {
					"field_name" : "details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_container_detail_id" : {
					"field_name" : "sale_container_detail_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_container_id" : {
					"field_name" : "sale_container_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_sale_container_items"
		},
		"sale_containers" : {
			 "table_name" : "sale_containers",
			 "table_fields" : {
				"arrival_date_dock" : {
					"field_name" : "arrival_date_dock",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"arrival_date_est" : {
					"field_name" : "arrival_date_est",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"container_color" : {
					"field_name" : "container_color",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"container_type" : {
					"field_name" : "container_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"cost_spit_method" : {
					"field_name" : "cost_spit_method",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"customer_id" : {
					"field_name" : "customer_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"empty_date" : {
					"field_name" : "empty_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"inbound_date" : {
					"field_name" : "inbound_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"material_type" : {
					"field_name" : "material_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"outbound_date" : {
					"field_name" : "outbound_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_container_details" : {
					"field_name" : "sale_container_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"sale_container_id" : {
					"field_name" : "sale_container_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_container_number" : {
					"field_name" : "sale_container_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "SC-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"sale_container_status" : {
					"field_name" : "sale_container_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"LOADING","value":"LOADING"},{"label":"IN TRANSIT","value":"IN TRANSIT"},{"label":"ON DOCKS","value":"ON DOCKS"},{"label":"DELIVERED","value":"DELIVERED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"shipping_company_id" : {
					"field_name" : "shipping_company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"vessel_number" : {
					"field_name" : "vessel_number",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_sale_containers"
		},
		"sale_invoice_items" : {
			 "table_name" : "sale_invoice_items",
			 "table_fields" : {
				"additional_cost_details" : {
					"field_name" : "additional_cost_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"delivery_mode" : {
					"field_name" : "delivery_mode",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "WAREHOUSE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"IN STORE","value":"IN STORE"},{"label":"WAREHOUSE","value":"WAREHOUSE"},{"label":"HOME DELIVERY","value":"HOME DELIVERY"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"mini_project_id" : {
					"field_name" : "mini_project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_invoice_id" : {
					"field_name" : "sale_invoice_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_invoice_item_id" : {
					"field_name" : "sale_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_invoice_item_status" : {
					"field_name" : "sale_invoice_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"DELIVERED","value":"DELIVERED"},{"label":"RETURNED","value":"RETURNED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"warranty_expiry_date" : {
					"field_name" : "warranty_expiry_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"warranty_expiry_details" : {
					"field_name" : "warranty_expiry_details",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_sale_invoice_items"
		},
		"sale_invoice_services" : {
			 "table_name" : "sale_invoice_services",
			 "table_fields" : {
				"additional_cost_details" : {
					"field_name" : "additional_cost_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_invoice_id" : {
					"field_name" : "sale_invoice_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_invoice_service_id" : {
					"field_name" : "sale_invoice_service_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_invoice_service_status" : {
					"field_name" : "sale_invoice_service_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"DELIVERED","value":"DELIVERED"},{"label":"RETURNED","value":"RETURNED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"service_charge" : {
					"field_name" : "service_charge",
					"field_type" : "double",
					"field_properties" : {}
				},
				"service_description" : {
					"field_name" : "service_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"service_id" : {
					"field_name" : "service_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"service_quantity" : {
					"field_name" : "service_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"sale_invoices" : {
			 "table_name" : "sale_invoices",
			 "table_fields" : {
				"additional_cost_amount" : {
					"field_name" : "additional_cost_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"additional_cost_details" : {
					"field_name" : "additional_cost_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contact_person" : {
					"field_name" : "contact_person",
					"field_type" : "string",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"customer_id" : {
					"field_name" : "customer_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"is_payable" : {
					"field_name" : "is_payable",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 1
						}
					}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_invoice_amount" : {
					"field_name" : "sale_invoice_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"sale_invoice_date" : {
					"field_name" : "sale_invoice_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"sale_invoice_id" : {
					"field_name" : "sale_invoice_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_invoice_number" : {
					"field_name" : "sale_invoice_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "SI-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sale_invoice_status" : {
					"field_name" : "sale_invoice_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sale_term_id" : {
					"field_name" : "sale_term_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_sale_invoices"
		},
		"sale_maintenance" : {
			 "table_name" : "sale_maintenance",
			 "table_fields" : {
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"in_warranty" : {
					"field_name" : "in_warranty",
					"field_type" : "string",
					"field_properties" : {
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"YES","value":"YES"},{"label":"NO","value":"NO"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"maintenance_charge" : {
					"field_name" : "maintenance_charge",
					"field_type" : "double",
					"field_properties" : {}
				},
				"maintenance_date" : {
					"field_name" : "maintenance_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"maintenance_status" : {
					"field_name" : "maintenance_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"IN PROCESS","value":"IN PROCESS"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"request_attachments" : {
					"field_name" : "request_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"request_remarks" : {
					"field_name" : "request_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"response_attachments" : {
					"field_name" : "response_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"response_remarks" : {
					"field_name" : "response_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_invoice_item_id" : {
					"field_name" : "sale_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_maintenance_id" : {
					"field_name" : "sale_maintenance_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_maintenancer_number" : {
					"field_name" : "sale_maintenancer_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"sale_maintenance_expenses" : {
			 "table_name" : "sale_maintenance_expenses",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"maintenance_expense_id" : {
					"field_name" : "maintenance_expense_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_maintenance_id" : {
					"field_name" : "sale_maintenance_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"sale_maintenance_items" : {
			 "table_name" : "sale_maintenance_items",
			 "table_fields" : {
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"customer_return_date" : {
					"field_name" : "customer_return_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"document_payment_id" : {
					"field_name" : "document_payment_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"in_warranty" : {
					"field_name" : "in_warranty",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "NO"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"YES","value":"YES"},{"label":"NO","value":"NO"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"maintenance_charge" : {
					"field_name" : "maintenance_charge",
					"field_type" : "double",
					"field_properties" : {}
				},
				"maintenance_date" : {
					"field_name" : "maintenance_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"maintenance_details" : {
					"field_name" : "maintenance_details",
					"field_type" : "string",
					"field_properties" : {}
				},
				"maintenance_item_status" : {
					"field_name" : "maintenance_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"IN PROCESS","value":"IN PROCESS"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"request_attachments" : {
					"field_name" : "request_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"request_audio_attachments" : {
					"field_name" : "request_audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"request_remarks" : {
					"field_name" : "request_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"response_attachments" : {
					"field_name" : "response_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"response_audio_attachments" : {
					"field_name" : "response_audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"response_remarks" : {
					"field_name" : "response_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_invoice_item_id" : {
					"field_name" : "sale_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_maintenance_id" : {
					"field_name" : "sale_maintenance_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_maintenance_item_id" : {
					"field_name" : "sale_maintenance_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_maintenance_item_number" : {
					"field_name" : "sale_maintenance_item_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "MAINT-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				}
			}
		},
		"sale_packing_list_items" : {
			 "table_name" : "sale_packing_list_items",
			 "table_fields" : {
				"additional_cost_details" : {
					"field_name" : "additional_cost_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"details" : {
					"field_name" : "details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_packing_list_id" : {
					"field_name" : "sale_packing_list_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_packing_list_item_id" : {
					"field_name" : "sale_packing_list_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_packing_list_item_status" : {
					"field_name" : "sale_packing_list_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"PACKED","value":"PACKED"},{"label":"DELIVERED","value":"DELIVERED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"sale_packing_lists" : {
			 "table_name" : "sale_packing_lists",
			 "table_fields" : {
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"customer_id" : {
					"field_name" : "customer_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"material_type" : {
					"field_name" : "material_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"packing_type" : {
					"field_name" : "packing_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_packing_list_date" : {
					"field_name" : "sale_packing_list_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"sale_packing_list_id" : {
					"field_name" : "sale_packing_list_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_packing_list_number" : {
					"field_name" : "sale_packing_list_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "SPL-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sale_packing_list_status" : {
					"field_name" : "sale_packing_list_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"IN PROCESS","value":"IN PROCESS"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_sale_packing_lists"
		},
		"sale_proforma_items" : {
			 "table_name" : "sale_proforma_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_proforma_id" : {
					"field_name" : "sale_proforma_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_proforma_item_id" : {
					"field_name" : "sale_proforma_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_proforma_item_status" : {
					"field_name" : "sale_proforma_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"DELIVERED","value":"DELIVERED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_sale_proforma_items"
		},
		"sale_proformas" : {
			 "table_name" : "sale_proformas",
			 "table_fields" : {
				"additional_costs_amount" : {
					"field_name" : "additional_costs_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"additional_costs_details" : {
					"field_name" : "additional_costs_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contact_person" : {
					"field_name" : "contact_person",
					"field_type" : "string",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"customer_id" : {
					"field_name" : "customer_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"is_payable" : {
					"field_name" : "is_payable",
					"field_type" : "yes_no",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : 0
						}
					}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_proforma_amount" : {
					"field_name" : "sale_proforma_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"sale_proforma_date" : {
					"field_name" : "sale_proforma_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"sale_proforma_id" : {
					"field_name" : "sale_proforma_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_proforma_number" : {
					"field_name" : "sale_proforma_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "SPI-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sale_proforma_status" : {
					"field_name" : "sale_proforma_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"CANCELLED","value":"CANCELLED"},{"label":"DELIVERED","value":"DELIVERED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sale_term_id" : {
					"field_name" : "sale_term_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_sale_proformas"
		},
		"sale_quote_items" : {
			 "table_name" : "sale_quote_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"linked_sale_invoices" : {
					"field_name" : "linked_sale_invoices",
					"field_type" : "text",
					"field_properties" : {}
				},
				"linked_sale_proformas" : {
					"field_name" : "linked_sale_proformas",
					"field_type" : "text",
					"field_properties" : {}
				},
				"mini_project_id" : {
					"field_name" : "mini_project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_quote_id" : {
					"field_name" : "sale_quote_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_quote_item_id" : {
					"field_name" : "sale_quote_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_quote_item_status" : {
					"field_name" : "sale_quote_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"APPROVED","value":"APPROVED"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sketch_attachments" : {
					"field_name" : "sketch_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_sale_quote_items"
		},
		"sale_quote_services" : {
			 "table_name" : "sale_quote_services",
			 "table_fields" : {
				"additional_cost_details" : {
					"field_name" : "additional_cost_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_quote_id" : {
					"field_name" : "sale_quote_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_quote_service_id" : {
					"field_name" : "sale_quote_service_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_quote_service_status" : {
					"field_name" : "sale_quote_service_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"DELIVERED","value":"DELIVERED"},{"label":"RETURNED","value":"RETURNED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"service_charge" : {
					"field_name" : "service_charge",
					"field_type" : "double",
					"field_properties" : {}
				},
				"service_description" : {
					"field_name" : "service_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"service_id" : {
					"field_name" : "service_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"service_quantity" : {
					"field_name" : "service_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				}
			}
		},
		"sale_quotes" : {
			 "table_name" : "sale_quotes",
			 "table_fields" : {
				"additional_costs_amount" : {
					"field_name" : "additional_costs_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"additional_costs_details" : {
					"field_name" : "additional_costs_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contact_person" : {
					"field_name" : "contact_person",
					"field_type" : "string",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"customer_id" : {
					"field_name" : "customer_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"is_payable" : {
					"field_name" : "is_payable",
					"field_type" : "yes_no",
					"field_properties" : {}
				},
				"linked_sale_invoices" : {
					"field_name" : "linked_sale_invoices",
					"field_type" : "text",
					"field_properties" : {}
				},
				"linked_sale_proformas" : {
					"field_name" : "linked_sale_proformas",
					"field_type" : "text",
					"field_properties" : {}
				},
				"mini_project_id" : {
					"field_name" : "mini_project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_quote_amount" : {
					"field_name" : "sale_quote_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"sale_quote_date" : {
					"field_name" : "sale_quote_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"sale_quote_id" : {
					"field_name" : "sale_quote_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_quote_number" : {
					"field_name" : "sale_quote_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "SQ-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sale_quote_status" : {
					"field_name" : "sale_quote_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"APPROVED","value":"APPROVED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_sale_quotes"
		},
		"sale_return_items" : {
			 "table_name" : "sale_return_items",
			 "table_fields" : {
				"additional_cost_amount" : {
					"field_name" : "additional_cost_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"additional_cost_details" : {
					"field_name" : "additional_cost_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"document_payment_id" : {
					"field_name" : "document_payment_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"is_discarded" : {
					"field_name" : "is_discarded",
					"field_type" : "string",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "RET-"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "NO"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"YES","value":"YES"},{"label":"NO","value":"NO"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_id" : {
					"field_name" : "project_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"project_task_id" : {
					"field_name" : "project_task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"quantity_restored" : {
					"field_name" : "quantity_restored",
					"field_type" : "double",
					"field_properties" : {}
				},
				"return_attachments" : {
					"field_name" : "return_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"return_date" : {
					"field_name" : "return_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"return_item_status" : {
					"field_name" : "return_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"RETURNED","value":"RETURNED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"return_location_id" : {
					"field_name" : "return_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"return_mode" : {
					"field_name" : "return_mode",
					"field_type" : "string",
					"field_properties" : {}
				},
				"return_reason" : {
					"field_name" : "return_reason",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_invoice_item_id" : {
					"field_name" : "sale_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_return_id" : {
					"field_name" : "sale_return_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_return_item_id" : {
					"field_name" : "sale_return_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"sale_returns" : {
			 "table_name" : "sale_returns",
			 "table_fields" : {
				"additional_cost_amount" : {
					"field_name" : "additional_cost_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"additional_cost_details" : {
					"field_name" : "additional_cost_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"assigned_to" : {
					"field_name" : "assigned_to",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"currency_rate" : {
					"field_name" : "currency_rate",
					"field_type" : "double",
					"field_properties" : {}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"return_reason" : {
					"field_name" : "return_reason",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sale_invoice_item_id" : {
					"field_name" : "sale_invoice_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"sale_return_amount" : {
					"field_name" : "sale_return_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"sale_return_date" : {
					"field_name" : "sale_return_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"sale_return_id" : {
					"field_name" : "sale_return_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_return_number" : {
					"field_name" : "sale_return_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "SR-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sale_return_status" : {
					"field_name" : "sale_return_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"total_cost" : {
					"field_name" : "total_cost",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"sale_terms" : {
			 "table_name" : "sale_terms",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_term_id" : {
					"field_name" : "sale_term_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Sale Term Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_term_name" : {
					"field_name" : "sale_term_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Sale Term Name"
						}
					}
				},
				"sale_term_number" : {
					"field_name" : "sale_term_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Sale Term Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sale_term_status" : {
					"field_name" : "sale_term_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Sale Term Status"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			}
		},
		"services" : {
			 "table_name" : "services",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"parent_service_id" : {
					"field_name" : "parent_service_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"service_charge" : {
					"field_name" : "service_charge",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service Charge"
						}
					}
				},
				"service_description" : {
					"field_name" : "service_description",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service Description"
						}
					}
				},
				"service_full_description" : {
					"field_name" : "service_full_description",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Full Description"
						}
					}
				},
				"service_id" : {
					"field_name" : "service_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"service_images" : {
					"field_name" : "service_images",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service Images"
						}
					}
				},
				"service_name" : {
					"field_name" : "service_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service Name"
						}
					}
				},
				"service_number" : {
					"field_name" : "service_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "SER_"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Service Number"
						}
					}
				},
				"service_quick_description" : {
					"field_name" : "service_quick_description",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Quick Description"
						}
					}
				}
			}
		},
		"settings" : {
			 "table_name" : "settings",
			 "table_fields" : {
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"setting_id" : {
					"field_name" : "setting_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"setting_name" : {
					"field_name" : "setting_name",
					"field_type" : "string",
					"field_properties" : {
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"setting_number" : {
					"field_name" : "setting_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"setting_type" : {
					"field_name" : "setting_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"setting_value" : {
					"field_name" : "setting_value",
					"field_type" : "text",
					"field_properties" : {}
				},
				"user_id" : {
					"field_name" : "user_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"shipping_companies" : {
			 "table_name" : "shipping_companies",
			 "table_fields" : {
				"address_details" : {
					"field_name" : "address_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Addresses"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"contact_person" : {
					"field_name" : "contact_person",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contact person"
						}
					}
				},
				"email_details" : {
					"field_name" : "email_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"email_values" : {
					"field_name" : "email_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"fax_details" : {
					"field_name" : "fax_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numbers"
						}
					}
				},
				"fax_values" : {
					"field_name" : "fax_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numbers"
						}
					}
				},
				"legal_details" : {
					"field_name" : "legal_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Legal Details"
						}
					}
				},
				"phone_details" : {
					"field_name" : "phone_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"phone_values" : {
					"field_name" : "phone_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"shipping_company_id" : {
					"field_name" : "shipping_company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Shipping Company Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"shipping_company_name" : {
					"field_name" : "shipping_company_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Shipping Company Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"shipping_company_number" : {
					"field_name" : "shipping_company_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Shipping Company Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"shipping_company_status" : {
					"field_name" : "shipping_company_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Shipping Company Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"social_details" : {
					"field_name" : "social_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Social Details"
						}
					}
				},
				"website_details" : {
					"field_name" : "website_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				},
				"website_values" : {
					"field_name" : "website_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				}
			},
			"select_view_name" : "vw_shipping_companies"
		},
		"sidebar_menus" : {
			 "table_name" : "sidebar_menus",
			 "table_fields" : {
				"sidebar_menu_id" : {
					"field_name" : "sidebar_menu_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sidebar_menu_json" : {
					"field_name" : "sidebar_menu_json",
					"field_type" : "json",
					"field_properties" : {}
				},
				"sidebar_menu_name" : {
					"field_name" : "sidebar_menu_name",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"sidebar_menu_number" : {
					"field_name" : "sidebar_menu_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			}
		},
		"signatures" : {
			 "table_name" : "signatures",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"signature_attachment" : {
					"field_name" : "signature_attachment",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"signature_datetime" : {
					"field_name" : "signature_datetime",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"signature_details" : {
					"field_name" : "signature_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"signature_id" : {
					"field_name" : "signature_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"signature_number" : {
					"field_name" : "signature_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 10
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "SIG-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			}
		},
		"status_updates" : {
			 "table_name" : "status_updates",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"new_status" : {
					"field_name" : "new_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"old_status" : {
					"field_name" : "old_status",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"status_update_number" : {
					"field_name" : "status_update_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"update_date" : {
					"field_name" : "update_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"update_id" : {
					"field_name" : "update_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"update_reason" : {
					"field_name" : "update_reason",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"stock_audit_item_storage_locations" : {
			 "table_name" : "stock_audit_item_storage_locations",
			 "table_fields" : {
				"found_quantity" : {
					"field_name" : "found_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"stock_audit_item_id" : {
					"field_name" : "stock_audit_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_audit_item_status" : {
					"field_name" : "stock_audit_item_status",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_audit_item_storage_location_id" : {
					"field_name" : "stock_audit_item_storage_location_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"stock_audit_items" : {
			 "table_name" : "stock_audit_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"found_quantity" : {
					"field_name" : "found_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"stock_audit_id" : {
					"field_name" : "stock_audit_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_audit_item_id" : {
					"field_name" : "stock_audit_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_audit_item_status" : {
					"field_name" : "stock_audit_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"AUDITED","value":"AUDITED"},{"label":"MISSING","value":"MISSING"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_stock_audit_items"
		},
		"stock_audits" : {
			 "table_name" : "stock_audits",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audit_status" : {
					"field_name" : "audit_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"STARTED","value":"STARTED"},{"label":"CANCELLED","value":"CANCELLED"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"performed_by" : {
					"field_name" : "performed_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"stock_audit_date" : {
					"field_name" : "stock_audit_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"stock_audit_id" : {
					"field_name" : "stock_audit_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_audit_number" : {
					"field_name" : "stock_audit_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "AUD-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"select_view_name" : "vw_stock_audits"
		},
		"stock_transfer_items" : {
			 "table_name" : "stock_transfer_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"destination_inventory_tracking_id" : {
					"field_name" : "destination_inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"destination_new_stock_quantity" : {
					"field_name" : "destination_new_stock_quantity",
					"field_type" : "string",
					"field_properties" : {}
				},
				"destination_old_stock_quantity" : {
					"field_name" : "destination_old_stock_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"destination_quantity" : {
					"field_name" : "destination_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"source_inventory_tracking_id" : {
					"field_name" : "source_inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"source_new_stock_quantity" : {
					"field_name" : "source_new_stock_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"source_old_stock_quantity" : {
					"field_name" : "source_old_stock_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"source_quantity" : {
					"field_name" : "source_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"stock_transfer_id" : {
					"field_name" : "stock_transfer_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_transfer_item_id" : {
					"field_name" : "stock_transfer_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_transfer_item_status" : {
					"field_name" : "stock_transfer_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"IN TRANSIT","value":"IN TRANSIT"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"select_view_name" : "vw_stock_transfer_items"
		},
		"stock_transfer_packing_items" : {
			 "table_name" : "stock_transfer_packing_items",
			 "table_fields" : {
				"item_quantity" : {
					"field_name" : "item_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"packing_attachments" : {
					"field_name" : "packing_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"packing_audio_attachments" : {
					"field_name" : "packing_audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"packing_remarks" : {
					"field_name" : "packing_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"packing_status" : {
					"field_name" : "packing_status",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_transfer_item_id" : {
					"field_name" : "stock_transfer_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_transfer_packing_id" : {
					"field_name" : "stock_transfer_packing_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_transfer_packing_item_id" : {
					"field_name" : "stock_transfer_packing_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"unpacking_attachments" : {
					"field_name" : "unpacking_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unpacking_audio_attachments" : {
					"field_name" : "unpacking_audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unpacking_remarks" : {
					"field_name" : "unpacking_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unpacking_status" : {
					"field_name" : "unpacking_status",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"stock_transfer_packings" : {
			 "table_name" : "stock_transfer_packings",
			 "table_fields" : {
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"packing_attachments" : {
					"field_name" : "packing_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"packing_audio_attachments" : {
					"field_name" : "packing_audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"packing_name" : {
					"field_name" : "packing_name",
					"field_type" : "string",
					"field_properties" : {}
				},
				"packing_remarks" : {
					"field_name" : "packing_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"packing_status" : {
					"field_name" : "packing_status",
					"field_type" : "string",
					"field_properties" : {}
				},
				"packing_type" : {
					"field_name" : "packing_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_transfer_id" : {
					"field_name" : "stock_transfer_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_transfer_packing_id" : {
					"field_name" : "stock_transfer_packing_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_transfer_packing_number" : {
					"field_name" : "stock_transfer_packing_number",
					"field_type" : "auto_number",
					"field_properties" : {}
				},
				"unpacking_attachments" : {
					"field_name" : "unpacking_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unpacking_audio_attachments" : {
					"field_name" : "unpacking_audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"unpacking_remarks" : {
					"field_name" : "unpacking_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"unpacking_status" : {
					"field_name" : "unpacking_status",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"stock_transfers" : {
			 "table_name" : "stock_transfers",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"destination_location_id" : {
					"field_name" : "destination_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"dispatch_attachments" : {
					"field_name" : "dispatch_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"dispatch_date" : {
					"field_name" : "dispatch_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"dispatch_remarks" : {
					"field_name" : "dispatch_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"dispatched_by" : {
					"field_name" : "dispatched_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"receive_attachments" : {
					"field_name" : "receive_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"receive_date" : {
					"field_name" : "receive_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"receive_remarks" : {
					"field_name" : "receive_remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"received_by" : {
					"field_name" : "received_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"source_location_id" : {
					"field_name" : "source_location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_transfer_date" : {
					"field_name" : "stock_transfer_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"stock_transfer_id" : {
					"field_name" : "stock_transfer_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_transfer_number" : {
					"field_name" : "stock_transfer_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "TRF-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_transfer_status" : {
					"field_name" : "stock_transfer_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"STARTED","value":"STARTED"},{"label":"IN TRANSIT","value":"IN TRANSIT"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"trip_id" : {
					"field_name" : "trip_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_stock_transfers"
		},
		"stock_update_items" : {
			 "table_name" : "stock_update_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_description" : {
					"field_name" : "item_description",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_unit" : {
					"field_name" : "item_unit",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"new_stock_quantity" : {
					"field_name" : "new_stock_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"old_stock_quantity" : {
					"field_name" : "old_stock_quantity",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"stock_update_id" : {
					"field_name" : "stock_update_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_update_item_id" : {
					"field_name" : "stock_update_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_update_item_status" : {
					"field_name" : "stock_update_item_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "UPDATED"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"UPDATED","value":"UPDATED"},{"label":"PENDING","value":"PENDING"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"update_quantity" : {
					"field_name" : "update_quantity",
					"field_type" : "double",
					"field_properties" : {}
				}
			},
			"select_view_name" : "vw_stock_update_items"
		},
		"stock_updates" : {
			 "table_name" : "stock_updates",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"performed_by" : {
					"field_name" : "performed_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"stock_update_date" : {
					"field_name" : "stock_update_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"stock_update_id" : {
					"field_name" : "stock_update_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_update_number" : {
					"field_name" : "stock_update_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "UPD-"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_update_reason" : {
					"field_name" : "stock_update_reason",
					"field_type" : "string",
					"field_properties" : {}
				},
				"stock_update_status" : {
					"field_name" : "stock_update_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "STARTED"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"STARTED","value":"STARTED"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"select_view_name" : "vw_stock_updates"
		},
		"storage_locations" : {
			 "table_name" : "storage_locations",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Location"
						}
					}
				},
				"parent_storage_location_id" : {
					"field_name" : "parent_storage_location_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Parent Storage Location"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"storage_image_url" : {
					"field_name" : "storage_image_url",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Storage Images"
						}
					}
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Storage Location Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"storage_location_name" : {
					"field_name" : "storage_location_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Storage Location Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"storage_location_number" : {
					"field_name" : "storage_location_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Storage Location Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"storage_location_status" : {
					"field_name" : "storage_location_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Storage Location Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"storage_location_tree" : {
					"field_name" : "storage_location_tree",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Storage Location Tree"
						}
					}
				}
			}
		},
		"task_comments" : {
			 "table_name" : "task_comments",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"comment_message" : {
					"field_name" : "comment_message",
					"field_type" : "text",
					"field_properties" : {}
				},
				"mentions" : {
					"field_name" : "mentions",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"task_comment_id" : {
					"field_name" : "task_comment_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"task_comment_number" : {
					"field_name" : "task_comment_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"task_id" : {
					"field_name" : "task_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"task_contras" : {
			 "table_name" : "task_contras",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"task_contra_id" : {
					"field_name" : "task_contra_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"task_contra_number" : {
					"field_name" : "task_contra_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			}
		},
		"task_histories" : {
			 "table_name" : "task_histories",
			 "table_fields" : {
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"task_history_datetime" : {
					"field_name" : "task_history_datetime",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"task_history_id" : {
					"field_name" : "task_history_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"task_history_type" : {
					"field_name" : "task_history_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"task_id" : {
					"field_name" : "task_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"task_time_entries" : {
			 "table_name" : "task_time_entries",
			 "table_fields" : {
				"end_time" : {
					"field_name" : "end_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"start_time" : {
					"field_name" : "start_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"task_id" : {
					"field_name" : "task_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"task_time_entry_id" : {
					"field_name" : "task_time_entry_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			}
		},
		"tasks" : {
			 "table_name" : "tasks",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"deadline_datetime" : {
					"field_name" : "deadline_datetime",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"due_datetime" : {
					"field_name" : "due_datetime",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"end_datetime" : {
					"field_name" : "end_datetime",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"remider_datetime" : {
					"field_name" : "remider_datetime",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"reminder_type" : {
					"field_name" : "reminder_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"start_datetime" : {
					"field_name" : "start_datetime",
					"field_type" : "string",
					"field_properties" : {}
				},
				"task_description" : {
					"field_name" : "task_description",
					"field_type" : "text",
					"field_properties" : {}
				},
				"task_details" : {
					"field_name" : "task_details",
					"field_type" : "text",
					"field_properties" : {}
				},
				"task_id" : {
					"field_name" : "task_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"task_index" : {
					"field_name" : "task_index",
					"field_type" : "integer",
					"field_properties" : {}
				},
				"task_number" : {
					"field_name" : "task_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"task_priority" : {
					"field_name" : "task_priority",
					"field_type" : "string",
					"field_properties" : {}
				},
				"task_status" : {
					"field_name" : "task_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"STARTED","value":"STARTED"},{"label":"CANCELLED","value":"CANCELLED"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"WAITING APPROVAL","value":"WAITING APPROVAL"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"task_title" : {
					"field_name" : "task_title",
					"field_type" : "string",
					"field_properties" : {
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				}
			}
		},
		"taxes" : {
			 "table_name" : "taxes",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Tax"
						}
					}
				},
				"country_name" : {
					"field_name" : "country_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Country"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Tax Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"tax_name" : {
					"field_name" : "tax_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Tax Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"tax_rates" : {
					"field_name" : "tax_rates",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Tax Rates"
						}
					}
				},
				"tax_status" : {
					"field_name" : "tax_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Tax Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"taxes_count" : {
					"field_name" : "taxes_count",
					"field_type" : "integer",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Taxes Count"
						}
					}
				}
			}
		},
		"transactions" : {
			 "table_name" : "transactions",
			 "table_fields" : {
				"account_credit_id" : {
					"field_name" : "account_credit_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"account_debit_id" : {
					"field_name" : "account_debit_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"parent_transaction_id" : {
					"field_name" : "parent_transaction_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"person_associated" : {
					"field_name" : "person_associated",
					"field_type" : "string",
					"field_properties" : {}
				},
				"reference_number" : {
					"field_name" : "reference_number",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"transaction_amount" : {
					"field_name" : "transaction_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"transaction_date" : {
					"field_name" : "transaction_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"transaction_details" : {
					"field_name" : "transaction_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"transaction_id" : {
					"field_name" : "transaction_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"transaction_narration" : {
					"field_name" : "transaction_narration",
					"field_type" : "string",
					"field_properties" : {}
				},
				"transaction_number" : {
					"field_name" : "transaction_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"transaction_status" : {
					"field_name" : "transaction_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"transaction_sub_type" : {
					"field_name" : "transaction_sub_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"transaction_type" : {
					"field_name" : "transaction_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"select_view_name" : "vw_transactions"
		},
		"trip_equipments" : {
			 "table_name" : "trip_equipments",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"equipment_id" : {
					"field_name" : "equipment_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"location_destination" : {
					"field_name" : "location_destination",
					"field_type" : "json",
					"field_properties" : {}
				},
				"location_source" : {
					"field_name" : "location_source",
					"field_type" : "json",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"trip_equipment_id" : {
					"field_name" : "trip_equipment_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"trip_equipment_status" : {
					"field_name" : "trip_equipment_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"trip_id" : {
					"field_name" : "trip_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"trip_order_items" : {
			 "table_name" : "trip_order_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"location_destination" : {
					"field_name" : "location_destination",
					"field_type" : "json",
					"field_properties" : {}
				},
				"location_source" : {
					"field_name" : "location_source",
					"field_type" : "json",
					"field_properties" : {}
				},
				"order_item_id" : {
					"field_name" : "order_item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"trip_id" : {
					"field_name" : "trip_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"trip_order_item_id" : {
					"field_name" : "trip_order_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"trip_order_item_status" : {
					"field_name" : "trip_order_item_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			}
		},
		"trip_passengers" : {
			 "table_name" : "trip_passengers",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"location_destination" : {
					"field_name" : "location_destination",
					"field_type" : "json",
					"field_properties" : {}
				},
				"location_source" : {
					"field_name" : "location_source",
					"field_type" : "json",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"trip_id" : {
					"field_name" : "trip_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"trip_passenger_id" : {
					"field_name" : "trip_passenger_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"trip_passenger_status" : {
					"field_name" : "trip_passenger_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			}
		},
		"trip_updates" : {
			 "table_name" : "trip_updates",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"contra_id" : {
					"field_name" : "contra_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"contra_type" : {
					"field_name" : "contra_type",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["lowercase"]
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"trip_id" : {
					"field_name" : "trip_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"trip_update_id" : {
					"field_name" : "trip_update_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"update_time" : {
					"field_name" : "update_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"update_type" : {
					"field_name" : "update_type",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"trips" : {
			 "table_name" : "trips",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"destination_location" : {
					"field_name" : "destination_location",
					"field_type" : "json",
					"field_properties" : {}
				},
				"driver_id" : {
					"field_name" : "driver_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"recurring_trip_id" : {
					"field_name" : "recurring_trip_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"source_location" : {
					"field_name" : "source_location",
					"field_type" : "json",
					"field_properties" : {}
				},
				"trip_id" : {
					"field_name" : "trip_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"trip_number" : {
					"field_name" : "trip_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"trip_status" : {
					"field_name" : "trip_status",
					"field_type" : "string",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"trip_time" : {
					"field_name" : "trip_time",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"vehicle_id" : {
					"field_name" : "vehicle_id",
					"field_type" : "string",
					"field_properties" : {}
				}
			}
		},
		"user_expenses" : {
			 "table_name" : "user_expenses",
			 "table_fields" : {
				"approved_by" : {
					"field_name" : "approved_by",
					"field_type" : "string",
					"field_properties" : {}
				},
				"approved_on" : {
					"field_name" : "approved_on",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"expense_amount" : {
					"field_name" : "expense_amount",
					"field_type" : "double",
					"field_properties" : {}
				},
				"expense_date" : {
					"field_name" : "expense_date",
					"field_type" : "datetime",
					"field_properties" : {}
				},
				"expense_id" : {
					"field_name" : "expense_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"expense_request_id" : {
					"field_name" : "expense_request_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"expense_status" : {
					"field_name" : "expense_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "CREATED"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"expense_type" : {
					"field_name" : "expense_type",
					"field_type" : "string",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				}
			}
		},
		"users" : {
			 "table_name" : "users",
			 "table_fields" : {
				"access_group_id" : {
					"field_name" : "access_group_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"asset_id" : {
					"field_name" : "asset_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"authenticator_details" : {
					"field_name" : "authenticator_details",
					"field_type" : "json",
					"field_properties" : {}
				},
				"dashboard_id" : {
					"field_name" : "dashboard_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"employee_id" : {
					"field_name" : "employee_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"location_id" : {
					"field_name" : "location_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"password" : {
					"field_name" : "password",
					"field_type" : "password",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"sidebar_menu_id" : {
					"field_name" : "sidebar_menu_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"user_id" : {
					"field_name" : "user_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"user_number" : {
					"field_name" : "user_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"user_status" : {
					"field_name" : "user_status",
					"field_type" : "string",
					"field_properties" : {
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"username" : {
					"field_name" : "username",
					"field_type" : "string",
					"field_properties" : {
						"unique_key" : {
							"property_name" : "unique_key",
							"property_value" : true
						}
					}
				}
			},
			"select_view_name" : "vw_users"
		},
		"vendor_contracts" : {
			 "table_name" : "vendor_contracts",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"credit_amount" : {
					"field_name" : "credit_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Credit Amount"
						}
					}
				},
				"credit_days" : {
					"field_name" : "credit_days",
					"field_type" : "integer",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Credit Days"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"vendor_contract_end_date" : {
					"field_name" : "vendor_contract_end_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract End Date"
						}
					}
				},
				"vendor_contract_id" : {
					"field_name" : "vendor_contract_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Vendor Contract Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"vendor_contract_name" : {
					"field_name" : "vendor_contract_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"vendor_contract_number" : {
					"field_name" : "vendor_contract_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Vendor Contract Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"vendor_contract_start_date" : {
					"field_name" : "vendor_contract_start_date",
					"field_type" : "datetime",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract Start Date"
						}
					}
				},
				"vendor_contract_status" : {
					"field_name" : "vendor_contract_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contract Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"},{"label":"EXPIRED","value":"EXPIRED"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Vendor"
						}
					}
				}
			}
		},
		"vendor_items" : {
			 "table_name" : "vendor_items",
			 "table_fields" : {
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {}
				},
				"item_id" : {
					"field_name" : "item_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"item_price" : {
					"field_name" : "item_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"last_price" : {
					"field_name" : "last_price",
					"field_type" : "double",
					"field_properties" : {}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {}
				},
				"vendor_item_code" : {
					"field_name" : "vendor_item_code",
					"field_type" : "string",
					"field_properties" : {}
				},
				"vendor_item_id" : {
					"field_name" : "vendor_item_id",
					"field_type" : "string",
					"field_properties" : {
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"select_view_name" : "vw_vendor_items"
		},
		"vendors" : {
			 "table_name" : "vendors",
			 "table_fields" : {
				"account_id" : {
					"field_name" : "account_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Account"
						}
					}
				},
				"address_details" : {
					"field_name" : "address_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Addresses"
						}
					}
				},
				"attachments" : {
					"field_name" : "attachments",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Attachments"
						}
					}
				},
				"bank_details" : {
					"field_name" : "bank_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Bank Details"
						}
					}
				},
				"business_type" : {
					"field_name" : "business_type",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Business Type"
						}
					}
				},
				"company_id" : {
					"field_name" : "company_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Company Id"
						}
					}
				},
				"contact_name" : {
					"field_name" : "contact_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Contact Number"
						}
					}
				},
				"credit_amount" : {
					"field_name" : "credit_amount",
					"field_type" : "double",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Credit Amount"
						}
					}
				},
				"credit_days" : {
					"field_name" : "credit_days",
					"field_type" : "integer",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Credit Days"
						}
					}
				},
				"currency_code" : {
					"field_name" : "currency_code",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Currency Code"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"dock_id" : {
					"field_name" : "dock_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Preferred Dock"
						}
					}
				},
				"email_details" : {
					"field_name" : "email_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"email_values" : {
					"field_name" : "email_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Email Addresses"
						}
					}
				},
				"fax_details" : {
					"field_name" : "fax_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numbers"
						}
					}
				},
				"fax_values" : {
					"field_name" : "fax_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Fax Numbers"
						}
					}
				},
				"legal_details" : {
					"field_name" : "legal_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Legal Details"
						}
					}
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Payment Terms"
						}
					}
				},
				"phone_details" : {
					"field_name" : "phone_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"phone_values" : {
					"field_name" : "phone_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Phone Numbers"
						}
					}
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Purchase Terms"
						}
					}
				},
				"remarks" : {
					"field_name" : "remarks",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Remarks"
						}
					}
				},
				"social_details" : {
					"field_name" : "social_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Social Details"
						}
					}
				},
				"tax_id" : {
					"field_name" : "tax_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Default Tax"
						}
					}
				},
				"vendor_category" : {
					"field_name" : "vendor_category",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Vendor Category"
						}
					}
				},
				"vendor_id" : {
					"field_name" : "vendor_id",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Vendor Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"vendor_image_url" : {
					"field_name" : "vendor_image_url",
					"field_type" : "media_json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Vendor Images"
						}
					}
				},
				"vendor_name" : {
					"field_name" : "vendor_name",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Vendor Name"
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"vendor_number" : {
					"field_name" : "vendor_number",
					"field_type" : "auto_number",
					"field_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "VEN-"
						},
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Vendor Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"vendor_status" : {
					"field_name" : "vendor_status",
					"field_type" : "string",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Vendor Status"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"website_details" : {
					"field_name" : "website_details",
					"field_type" : "json",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				},
				"website_values" : {
					"field_name" : "website_values",
					"field_type" : "text",
					"field_properties" : {
						"field_title" : {
							"property_name" : "field_title",
							"property_value" : "Websites"
						}
					}
				}
			},
			"select_view_name" : "vw_vendors"
		}
	},
	"views" : {
		"vw_companies" : {
			"view_name" : "vw_companies",
			"view_fields" : {
				"year_start" : {
					"field_name" : "year_start"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"address_values" : {
					"field_name" : "address_values"
				},
				"bank_values" : {
					"field_name" : "bank_values"
				},
				"company_image" : {
					"field_name" : "company_image"
				},
				"company_number" : {
					"field_name" : "company_number"
				},
				"id" : {
					"field_name" : "id"
				},
				"incorporation_date" : {
					"field_name" : "incorporation_date"
				},
				"legal_values" : {
					"field_name" : "legal_values"
				},
				"social_values" : {
					"field_name" : "social_values"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"bank_details" : {
					"field_name" : "bank_details"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"company_name" : {
					"field_name" : "company_name"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"fax_details" : {
					"field_name" : "fax_details"
				},
				"fax_values" : {
					"field_name" : "fax_values"
				},
				"legal_details" : {
					"field_name" : "legal_details"
				},
				"logo_url" : {
					"field_name" : "logo_url"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"social_details" : {
					"field_name" : "social_details"
				},
				"website_details" : {
					"field_name" : "website_details"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"year_end" : {
					"field_name" : "year_end"
				}
			}
		},
		"vw_automated_task_logs" : {
			"view_name" : "vw_automated_task_logs",
			"view_fields" : {
				"automated_task_name" : {
					"field_name" : "automated_task_name"
				},
				"automated_task_number" : {
					"field_name" : "automated_task_number"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"automated_task_event" : {
					"field_name" : "automated_task_event"
				},
				"automated_task_id" : {
					"field_name" : "automated_task_id"
				},
				"automated_task_log_id" : {
					"field_name" : "automated_task_log_id"
				},
				"automated_task_log_number" : {
					"field_name" : "automated_task_log_number"
				},
				"automated_task_message" : {
					"field_name" : "automated_task_message"
				},
				"automated_task_record_id" : {
					"field_name" : "automated_task_record_id"
				},
				"automated_task_status" : {
					"field_name" : "automated_task_status"
				},
				"automated_task_table" : {
					"field_name" : "automated_task_table"
				},
				"end_time" : {
					"field_name" : "end_time"
				},
				"log_file_path" : {
					"field_name" : "log_file_path"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"start_time" : {
					"field_name" : "start_time"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_checklists" : {
			"view_name" : "vw_checklists",
			"view_fields" : {
				"checklist_id" : {
					"field_name" : "checklist_id"
				},
				"checklist_name" : {
					"field_name" : "checklist_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"checklist_type" : {
					"field_name" : "checklist_type"
				},
				"completed_checklist_items" : {
					"field_name" : "completed_checklist_items"
				},
				"pending_checklist_items" : {
					"field_name" : "pending_checklist_items"
				},
				"total_checklist_items" : {
					"field_name" : "total_checklist_items"
				}
			}
		},
		"vw_coupons" : {
			"view_name" : "vw_coupons",
			"view_fields" : {
				"not_used_count" : {
					"field_name" : "not_used_count"
				},
				"total_count" : {
					"field_name" : "total_count"
				},
				"used_count" : {
					"field_name" : "used_count"
				},
				"days_count" : {
					"field_name" : "days_count"
				},
				"valid_days" : {
					"field_name" : "valid_days"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"coupon_amount" : {
					"field_name" : "coupon_amount"
				},
				"coupon_code" : {
					"field_name" : "coupon_code"
				},
				"coupon_id" : {
					"field_name" : "coupon_id"
				},
				"coupon_name" : {
					"field_name" : "coupon_name"
				},
				"coupon_number" : {
					"field_name" : "coupon_number"
				},
				"coupon_status" : {
					"field_name" : "coupon_status"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"valid_from" : {
					"field_name" : "valid_from"
				},
				"valid_to" : {
					"field_name" : "valid_to"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_currency_rate_updates" : {
			"view_name" : "vw_currency_rate_updates",
			"view_fields" : {
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"employee_code" : {
					"field_name" : "employee_code"
				},
				"currency_id" : {
					"field_name" : "currency_id"
				},
				"currency_name" : {
					"field_name" : "currency_name"
				},
				"country_name" : {
					"field_name" : "country_name"
				},
				"approved_at" : {
					"field_name" : "approved_at"
				},
				"approved_by" : {
					"field_name" : "approved_by"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"currency_rate_id" : {
					"field_name" : "currency_rate_id"
				},
				"currency_rate_status" : {
					"field_name" : "currency_rate_status"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"source" : {
					"field_name" : "source"
				},
				"source_time" : {
					"field_name" : "source_time"
				},
				"updated_at" : {
					"field_name" : "updated_at"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_customer_contracts" : {
			"view_name" : "vw_customer_contracts",
			"view_fields" : {
				"days_count" : {
					"field_name" : "days_count"
				},
				"valid_days" : {
					"field_name" : "valid_days"
				},
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"credit_amount" : {
					"field_name" : "credit_amount"
				},
				"credit_days" : {
					"field_name" : "credit_days"
				},
				"customer_contract_end_date" : {
					"field_name" : "customer_contract_end_date"
				},
				"customer_contract_id" : {
					"field_name" : "customer_contract_id"
				},
				"customer_contract_number" : {
					"field_name" : "customer_contract_number"
				},
				"customer_contract_start_date" : {
					"field_name" : "customer_contract_start_date"
				},
				"customer_contract_status" : {
					"field_name" : "customer_contract_status"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"contract_end_time" : {
					"field_name" : "contract_end_time"
				},
				"contract_start_time" : {
					"field_name" : "contract_start_time"
				},
				"contract_status" : {
					"field_name" : "contract_status"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_customers" : {
			"view_name" : "vw_customers",
			"view_fields" : {
				"account_id" : {
					"field_name" : "account_id"
				},
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"bank_details" : {
					"field_name" : "bank_details"
				},
				"business_type" : {
					"field_name" : "business_type"
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_term_id" : {
					"field_name" : "sale_term_id"
				},
				"social_details" : {
					"field_name" : "social_details"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"website_details" : {
					"field_name" : "website_details"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"address_values" : {
					"field_name" : "address_values"
				},
				"bank_values" : {
					"field_name" : "bank_values"
				},
				"credit_amount" : {
					"field_name" : "credit_amount"
				},
				"customer_image" : {
					"field_name" : "customer_image"
				},
				"customer_source" : {
					"field_name" : "customer_source"
				},
				"customer_type" : {
					"field_name" : "customer_type"
				},
				"gender" : {
					"field_name" : "gender"
				},
				"id" : {
					"field_name" : "id"
				},
				"legal_values" : {
					"field_name" : "legal_values"
				},
				"marketing" : {
					"field_name" : "marketing"
				},
				"referenced_by" : {
					"field_name" : "referenced_by"
				},
				"social_values" : {
					"field_name" : "social_values"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_person" : {
					"field_name" : "contact_person"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"customer_category" : {
					"field_name" : "customer_category"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				},
				"customer_image_url" : {
					"field_name" : "customer_image_url"
				},
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"customer_number" : {
					"field_name" : "customer_number"
				},
				"dock_id" : {
					"field_name" : "dock_id"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"fax_details" : {
					"field_name" : "fax_details"
				},
				"fax_values" : {
					"field_name" : "fax_values"
				},
				"is_enquiry" : {
					"field_name" : "is_enquiry"
				},
				"legal_details" : {
					"field_name" : "legal_details"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				}
			}
		},
		"vw_devices" : {
			"view_name" : "vw_devices",
			"view_fields" : {
				"company_name" : {
					"field_name" : "company_name"
				},
				"location_name" : {
					"field_name" : "location_name"
				},
				"username" : {
					"field_name" : "username"
				},
				"asset_id" : {
					"field_name" : "asset_id"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"authorization_status" : {
					"field_name" : "authorization_status"
				},
				"authorized_by" : {
					"field_name" : "authorized_by"
				},
				"authorized_on" : {
					"field_name" : "authorized_on"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"device_details" : {
					"field_name" : "device_details"
				},
				"device_id" : {
					"field_name" : "device_id"
				},
				"device_name" : {
					"field_name" : "device_name"
				},
				"device_number" : {
					"field_name" : "device_number"
				},
				"device_status" : {
					"field_name" : "device_status"
				},
				"device_type" : {
					"field_name" : "device_type"
				},
				"device_uid" : {
					"field_name" : "device_uid"
				},
				"last_online_time" : {
					"field_name" : "last_online_time"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"use_for" : {
					"field_name" : "use_for"
				},
				"user_id" : {
					"field_name" : "user_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"used_for" : {
					"field_name" : "used_for"
				}
			}
		},
		"vw_docks" : {
			"view_name" : "vw_docks",
			"view_fields" : {
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"dock_id" : {
					"field_name" : "dock_id"
				},
				"dock_name" : {
					"field_name" : "dock_name"
				},
				"dock_number" : {
					"field_name" : "dock_number"
				},
				"dock_status" : {
					"field_name" : "dock_status"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"fax_details" : {
					"field_name" : "fax_details"
				},
				"fax_values" : {
					"field_name" : "fax_values"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"website_details" : {
					"field_name" : "website_details"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_document_expenses" : {
			"view_name" : "vw_document_expenses",
			"view_fields" : {
				"document_number" : {
					"field_name" : "document_number"
				},
				"account_name" : {
					"field_name" : "account_name"
				},
				"payment_method_name" : {
					"field_name" : "payment_method_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"document_expense_id" : {
					"field_name" : "document_expense_id"
				},
				"document_expense_number" : {
					"field_name" : "document_expense_number"
				},
				"document_expense_status" : {
					"field_name" : "document_expense_status"
				},
				"document_id" : {
					"field_name" : "document_id"
				},
				"document_type" : {
					"field_name" : "document_type"
				},
				"expense_account_id" : {
					"field_name" : "expense_account_id"
				},
				"expense_amount" : {
					"field_name" : "expense_amount"
				},
				"expense_date" : {
					"field_name" : "expense_date"
				},
				"include_in_calculation" : {
					"field_name" : "include_in_calculation"
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id"
				},
				"reference_number" : {
					"field_name" : "reference_number"
				},
				"refundable" : {
					"field_name" : "refundable"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_document_paid_amounts" : {
			"view_name" : "vw_document_paid_amounts",
			"view_fields" : {
				"paid_amount" : {
					"field_name" : "paid_amount"
				},
				"document_id" : {
					"field_name" : "document_id"
				},
				"document_type" : {
					"field_name" : "document_type"
				}
			}
		},
		"vw_employee_loan_installments" : {
			"view_name" : "vw_employee_loan_installments",
			"view_fields" : {
				"loan_number" : {
					"field_name" : "loan_number"
				},
				"employee_id" : {
					"field_name" : "employee_id"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"installment_number" : {
					"field_name" : "installment_number"
				},
				"loan_id" : {
					"field_name" : "loan_id"
				},
				"loan_installment_amount" : {
					"field_name" : "loan_installment_amount"
				},
				"loan_installment_date" : {
					"field_name" : "loan_installment_date"
				},
				"loan_installment_id" : {
					"field_name" : "loan_installment_id"
				},
				"loan_installment_number" : {
					"field_name" : "loan_installment_number"
				},
				"loan_installment_status" : {
					"field_name" : "loan_installment_status"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_employees" : {
			"view_name" : "vw_employees",
			"view_fields" : {
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"account_id" : {
					"field_name" : "account_id"
				},
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"bank_details" : {
					"field_name" : "bank_details"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"date_arrival" : {
					"field_name" : "date_arrival"
				},
				"date_birth" : {
					"field_name" : "date_birth"
				},
				"date_joining" : {
					"field_name" : "date_joining"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"employee_code" : {
					"field_name" : "employee_code"
				},
				"employee_designation" : {
					"field_name" : "employee_designation"
				},
				"employee_id" : {
					"field_name" : "employee_id"
				},
				"employee_image_url" : {
					"field_name" : "employee_image_url"
				},
				"employee_number" : {
					"field_name" : "employee_number"
				},
				"employee_skills" : {
					"field_name" : "employee_skills"
				},
				"employee_status" : {
					"field_name" : "employee_status"
				},
				"first_name" : {
					"field_name" : "first_name"
				},
				"gender" : {
					"field_name" : "gender"
				},
				"last_name" : {
					"field_name" : "last_name"
				},
				"legal_details" : {
					"field_name" : "legal_details"
				},
				"legal_employee_designation" : {
					"field_name" : "legal_employee_designation"
				},
				"legal_salary_amount" : {
					"field_name" : "legal_salary_amount"
				},
				"middle_name" : {
					"field_name" : "middle_name"
				},
				"nationality" : {
					"field_name" : "nationality"
				},
				"passport_details" : {
					"field_name" : "passport_details"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"salary_amount" : {
					"field_name" : "salary_amount"
				},
				"social_details" : {
					"field_name" : "social_details"
				},
				"visa_details" : {
					"field_name" : "visa_details"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_inventory_tracking_quantities" : {
			"view_name" : "vw_inventory_tracking_quantities",
			"view_fields" : {
				"inventory_multiplier" : {
					"field_name" : "inventory_multiplier"
				},
				"contra_type" : {
					"field_name" : "contra_type"
				},
				"contra_id" : {
					"field_name" : "contra_id"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"storage_location_name" : {
					"field_name" : "storage_location_name"
				},
				"storage_location_tree" : {
					"field_name" : "storage_location_tree"
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id"
				},
				"inventory_tracking_quantity_id" : {
					"field_name" : "inventory_tracking_quantity_id"
				},
				"item_batch_id" : {
					"field_name" : "item_batch_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_status" : {
					"field_name" : "item_status"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_item_stock_quantity" : {
			"view_name" : "vw_item_stock_quantity",
			"view_fields" : {
				"item_id" : {
					"field_name" : "item_id"
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity"
				}
			}
		},
		"vw_item_stock_quantity_locations" : {
			"view_name" : "vw_item_stock_quantity_locations",
			"view_fields" : {
				"item_id" : {
					"field_name" : "item_id"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity"
				}
			}
		},
		"vw_item_stock_quantity_storage_locations" : {
			"view_name" : "vw_item_stock_quantity_storage_locations",
			"view_fields" : {
				"item_id" : {
					"field_name" : "item_id"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id"
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity"
				}
			}
		},
		"vw_items" : {
			"view_name" : "vw_items",
			"view_fields" : {
				"item_description_full" : {
					"field_name" : "item_description_full"
				},
				"item_description_quick" : {
					"field_name" : "item_description_quick"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_image_url" : {
					"field_name" : "item_image_url"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"item_short_name" : {
					"field_name" : "item_short_name"
				},
				"item_number" : {
					"field_name" : "item_number"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_attributes" : {
					"field_name" : "item_attributes"
				},
				"item_price_mrp" : {
					"field_name" : "item_price_mrp"
				},
				"item_price_purchase" : {
					"field_name" : "item_price_purchase"
				},
				"item_price_sale" : {
					"field_name" : "item_price_sale"
				},
				"item_sku" : {
					"field_name" : "item_sku"
				},
				"item_status" : {
					"field_name" : "item_status"
				},
				"item_type" : {
					"field_name" : "item_type"
				},
				"item_unit_purchase" : {
					"field_name" : "item_unit_purchase"
				},
				"item_unit_sale" : {
					"field_name" : "item_unit_sale"
				},
				"item_unit_stock" : {
					"field_name" : "item_unit_stock"
				},
				"quantity_min_order" : {
					"field_name" : "quantity_min_order"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"stock_maximum" : {
					"field_name" : "stock_maximum"
				},
				"stock_minimum" : {
					"field_name" : "stock_minimum"
				},
				"stock_threshold" : {
					"field_name" : "stock_threshold"
				},
				"warranty_expiration_details" : {
					"field_name" : "warranty_expiration_details"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"item_images_count" : {
					"field_name" : "item_images_count"
				},
				"brand_name" : {
					"field_name" : "brand_name"
				},
				"id" : {
					"field_name" : "id"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_images" : {
					"field_name" : "item_images"
				},
				"item_min_area" : {
					"field_name" : "item_min_area"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_weight" : {
					"field_name" : "item_weight"
				},
				"sale_rate" : {
					"field_name" : "sale_rate"
				},
				"stock_quantity_maximum" : {
					"field_name" : "stock_quantity_maximum"
				},
				"stock_quantity_minimum" : {
					"field_name" : "stock_quantity_minimum"
				},
				"stock_quantity_reorder" : {
					"field_name" : "stock_quantity_reorder"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"item_size" : {
					"field_name" : "item_size"
				},
				"category_number" : {
					"field_name" : "category_number"
				},
				"item_category_name" : {
					"field_name" : "item_category_name"
				},
				"category_name" : {
					"field_name" : "category_name"
				},
				"master_category_id" : {
					"field_name" : "master_category_id"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"barcode_value" : {
					"field_name" : "barcode_value"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"default_vendor_id" : {
					"field_name" : "default_vendor_id"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale"
				},
				"hsnsac_code" : {
					"field_name" : "hsnsac_code"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"is_saleable" : {
					"field_name" : "is_saleable"
				},
				"item_category_id" : {
					"field_name" : "item_category_id"
				}
			}
		},
		"vw_items_in_order" : {
			"view_name" : "vw_items_in_order",
			"view_fields" : {
				"in_order_quantity" : {
					"field_name" : "in_order_quantity"
				},
				"item_id" : {
					"field_name" : "item_id"
				}
			}
		},
		"vw_landing_price_items" : {
			"view_name" : "vw_landing_price_items",
			"view_fields" : {
				"current_stock_quantity" : {
					"field_name" : "current_stock_quantity"
				},
				"current_stock_value" : {
					"field_name" : "current_stock_value"
				},
				"current_stock_price" : {
					"field_name" : "current_stock_price"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"item_number" : {
					"field_name" : "item_number"
				},
				"item_price_sale" : {
					"field_name" : "item_price_sale"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"item_cost" : {
					"field_name" : "item_cost"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"landing_price" : {
					"field_name" : "landing_price"
				},
				"landing_price_calculation_method" : {
					"field_name" : "landing_price_calculation_method"
				},
				"landing_price_id" : {
					"field_name" : "landing_price_id"
				},
				"landing_price_item_id" : {
					"field_name" : "landing_price_item_id"
				},
				"landing_price_values" : {
					"field_name" : "landing_price_values"
				},
				"new_item_price" : {
					"field_name" : "new_item_price"
				},
				"old_item_price" : {
					"field_name" : "old_item_price"
				},
				"price_calcuation_method" : {
					"field_name" : "price_calcuation_method"
				},
				"price_set_reason" : {
					"field_name" : "price_set_reason"
				},
				"purchase_invoice_numbers" : {
					"field_name" : "purchase_invoice_numbers"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split"
				},
				"split_cost" : {
					"field_name" : "split_cost"
				},
				"stock_price" : {
					"field_name" : "stock_price"
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity"
				},
				"stock_value" : {
					"field_name" : "stock_value"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_last_vendor_order_item_prices" : {
			"view_name" : "vw_last_vendor_order_item_prices",
			"view_fields" : {
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"order_id" : {
					"field_name" : "order_id"
				},
				"order_number" : {
					"field_name" : "order_number"
				},
				"item_price" : {
					"field_name" : "item_price"
				}
			}
		},
		"vw_linked_purchase_commercials_with_invoice_items" : {
			"view_name" : "vw_linked_purchase_commercials_with_invoice_items",
			"view_fields" : {
				"linked_purchase_commercial_invoices" : {
					"field_name" : "linked_purchase_commercial_invoices"
				},
				"invoice_item_id" : {
					"field_name" : "invoice_item_id"
				}
			}
		},
		"vw_linked_purchase_commercials_with_invoices" : {
			"view_name" : "vw_linked_purchase_commercials_with_invoices",
			"view_fields" : {
				"linked_purchase_commercial_invoices" : {
					"field_name" : "linked_purchase_commercial_invoices"
				},
				"invoice_id" : {
					"field_name" : "invoice_id"
				}
			}
		},
		"vw_linked_purchase_commercials_with_proforma_items" : {
			"view_name" : "vw_linked_purchase_commercials_with_proforma_items",
			"view_fields" : {
				"linked_purchase_commercial_invoices" : {
					"field_name" : "linked_purchase_commercial_invoices"
				},
				"proforma_item_id" : {
					"field_name" : "proforma_item_id"
				}
			}
		},
		"vw_linked_purchase_commercials_with_proformas" : {
			"view_name" : "vw_linked_purchase_commercials_with_proformas",
			"view_fields" : {
				"linked_purchase_commercial_invoices" : {
					"field_name" : "linked_purchase_commercial_invoices"
				},
				"proforma_id" : {
					"field_name" : "proforma_id"
				}
			}
		},
		"vw_linked_purchase_containers_with_packing_items" : {
			"view_name" : "vw_linked_purchase_containers_with_packing_items",
			"view_fields" : {
				"linked_purchase_containers" : {
					"field_name" : "linked_purchase_containers"
				},
				"packing_list_item_id" : {
					"field_name" : "packing_list_item_id"
				}
			}
		},
		"vw_linked_purchase_containers_with_packings" : {
			"view_name" : "vw_linked_purchase_containers_with_packings",
			"view_fields" : {
				"linked_purchase_containers" : {
					"field_name" : "linked_purchase_containers"
				},
				"packing_list_id" : {
					"field_name" : "packing_list_id"
				}
			}
		},
		"vw_linked_purchase_containers_with_proforma_items" : {
			"view_name" : "vw_linked_purchase_containers_with_proforma_items",
			"view_fields" : {
				"linked_purchase_containers" : {
					"field_name" : "linked_purchase_containers"
				},
				"proforma_item_id" : {
					"field_name" : "proforma_item_id"
				}
			}
		},
		"vw_linked_purchase_containers_with_proformas" : {
			"view_name" : "vw_linked_purchase_containers_with_proformas",
			"view_fields" : {
				"linked_purchase_containers" : {
					"field_name" : "linked_purchase_containers"
				},
				"proforma_id" : {
					"field_name" : "proforma_id"
				}
			}
		},
		"vw_linked_purchase_invoices_with_commercial_items" : {
			"view_name" : "vw_linked_purchase_invoices_with_commercial_items",
			"view_fields" : {
				"linked_purchase_invoices" : {
					"field_name" : "linked_purchase_invoices"
				},
				"commercial_invoice_item_id" : {
					"field_name" : "commercial_invoice_item_id"
				}
			}
		},
		"vw_linked_purchase_invoices_with_commercials" : {
			"view_name" : "vw_linked_purchase_invoices_with_commercials",
			"view_fields" : {
				"linked_purchase_invoices" : {
					"field_name" : "linked_purchase_invoices"
				},
				"commercial_invoice_id" : {
					"field_name" : "commercial_invoice_id"
				}
			}
		},
		"vw_linked_purchase_material_requests_with_request_items" : {
			"view_name" : "vw_linked_purchase_material_requests_with_request_items",
			"view_fields" : {
				"linked_material_requests" : {
					"field_name" : "linked_material_requests"
				},
				"request_item_id" : {
					"field_name" : "request_item_id"
				}
			}
		},
		"vw_linked_purchase_material_requests_with_requests" : {
			"view_name" : "vw_linked_purchase_material_requests_with_requests",
			"view_fields" : {
				"linked_material_requests" : {
					"field_name" : "linked_material_requests"
				},
				"request_id" : {
					"field_name" : "request_id"
				}
			}
		},
		"vw_linked_purchase_orders_with_proforma_items" : {
			"view_name" : "vw_linked_purchase_orders_with_proforma_items",
			"view_fields" : {
				"linked_purchase_orders" : {
					"field_name" : "linked_purchase_orders"
				},
				"proforma_item_id" : {
					"field_name" : "proforma_item_id"
				}
			}
		},
		"vw_linked_purchase_orders_with_proformas" : {
			"view_name" : "vw_linked_purchase_orders_with_proformas",
			"view_fields" : {
				"linked_purchase_orders" : {
					"field_name" : "linked_purchase_orders"
				},
				"proforma_id" : {
					"field_name" : "proforma_id"
				}
			}
		},
		"vw_linked_purchase_orders_with_quote_items" : {
			"view_name" : "vw_linked_purchase_orders_with_quote_items",
			"view_fields" : {
				"linked_purchase_orders" : {
					"field_name" : "linked_purchase_orders"
				},
				"quote_item_id" : {
					"field_name" : "quote_item_id"
				}
			}
		},
		"vw_linked_purchase_orders_with_quotes" : {
			"view_name" : "vw_linked_purchase_orders_with_quotes",
			"view_fields" : {
				"linked_purchase_orders" : {
					"field_name" : "linked_purchase_orders"
				},
				"quote_id" : {
					"field_name" : "quote_id"
				}
			}
		},
		"vw_linked_purchase_packings_with_container_items" : {
			"view_name" : "vw_linked_purchase_packings_with_container_items",
			"view_fields" : {
				"linked_purchase_packing_lists" : {
					"field_name" : "linked_purchase_packing_lists"
				},
				"container_item_id" : {
					"field_name" : "container_item_id"
				}
			}
		},
		"vw_linked_purchase_packings_with_containers" : {
			"view_name" : "vw_linked_purchase_packings_with_containers",
			"view_fields" : {
				"linked_purchase_packing_lists" : {
					"field_name" : "linked_purchase_packing_lists"
				},
				"container_id" : {
					"field_name" : "container_id"
				}
			}
		},
		"vw_linked_purchase_proformas_with_commercial_items" : {
			"view_name" : "vw_linked_purchase_proformas_with_commercial_items",
			"view_fields" : {
				"linked_purchase_proformas" : {
					"field_name" : "linked_purchase_proformas"
				},
				"commercial_invoice_item_id" : {
					"field_name" : "commercial_invoice_item_id"
				}
			}
		},
		"vw_linked_purchase_proformas_with_commercials" : {
			"view_name" : "vw_linked_purchase_proformas_with_commercials",
			"view_fields" : {
				"linked_purchase_proformas" : {
					"field_name" : "linked_purchase_proformas"
				},
				"commercial_invoice_id" : {
					"field_name" : "commercial_invoice_id"
				}
			}
		},
		"vw_linked_purchase_proformas_with_container_items" : {
			"view_name" : "vw_linked_purchase_proformas_with_container_items",
			"view_fields" : {
				"linked_purchase_proformas" : {
					"field_name" : "linked_purchase_proformas"
				},
				"container_item_id" : {
					"field_name" : "container_item_id"
				}
			}
		},
		"vw_linked_purchase_proformas_with_containers" : {
			"view_name" : "vw_linked_purchase_proformas_with_containers",
			"view_fields" : {
				"linked_purchase_proformas" : {
					"field_name" : "linked_purchase_proformas"
				},
				"container_id" : {
					"field_name" : "container_id"
				}
			}
		},
		"vw_linked_purchase_proformas_with_order_items" : {
			"view_name" : "vw_linked_purchase_proformas_with_order_items",
			"view_fields" : {
				"linked_purchase_proformas" : {
					"field_name" : "linked_purchase_proformas"
				},
				"order_item_id" : {
					"field_name" : "order_item_id"
				}
			}
		},
		"vw_linked_purchase_proformas_with_orders" : {
			"view_name" : "vw_linked_purchase_proformas_with_orders",
			"view_fields" : {
				"linked_purchase_proformas" : {
					"field_name" : "linked_purchase_proformas"
				},
				"order_id" : {
					"field_name" : "order_id"
				}
			}
		},
		"vw_linked_purchase_quotes_with_order_items" : {
			"view_name" : "vw_linked_purchase_quotes_with_order_items",
			"view_fields" : {
				"linked_purchase_quotes" : {
					"field_name" : "linked_purchase_quotes"
				},
				"order_item_id" : {
					"field_name" : "order_item_id"
				}
			}
		},
		"vw_linked_purchase_quotes_with_orders" : {
			"view_name" : "vw_linked_purchase_quotes_with_orders",
			"view_fields" : {
				"linked_purchase_quotes" : {
					"field_name" : "linked_purchase_quotes"
				},
				"order_id" : {
					"field_name" : "order_id"
				}
			}
		},
		"vw_linked_purchase_quotes_with_request_items" : {
			"view_name" : "vw_linked_purchase_quotes_with_request_items",
			"view_fields" : {
				"linked_purchase_quotes" : {
					"field_name" : "linked_purchase_quotes"
				},
				"request_item_id" : {
					"field_name" : "request_item_id"
				}
			}
		},
		"vw_linked_purchase_quotes_with_requests" : {
			"view_name" : "vw_linked_purchase_quotes_with_requests",
			"view_fields" : {
				"linked_purchase_quotes" : {
					"field_name" : "linked_purchase_quotes"
				},
				"request_id" : {
					"field_name" : "request_id"
				}
			}
		},
		"vw_linked_purchase_requests_with_material_requests" : {
			"view_name" : "vw_linked_purchase_requests_with_material_requests",
			"view_fields" : {
				"linked_purchase_requests" : {
					"field_name" : "linked_purchase_requests"
				},
				"material_request_id" : {
					"field_name" : "material_request_id"
				}
			}
		},
		"vw_linked_purchase_requests_with_quote_items" : {
			"view_name" : "vw_linked_purchase_requests_with_quote_items",
			"view_fields" : {
				"linked_purchase_requests" : {
					"field_name" : "linked_purchase_requests"
				},
				"quote_item_id" : {
					"field_name" : "quote_item_id"
				}
			}
		},
		"vw_linked_purchase_requests_with_quotes" : {
			"view_name" : "vw_linked_purchase_requests_with_quotes",
			"view_fields" : {
				"linked_purchase_requests" : {
					"field_name" : "linked_purchase_requests"
				},
				"quote_id" : {
					"field_name" : "quote_id"
				}
			}
		},
		"vw_locations" : {
			"view_name" : "vw_locations",
			"view_fields" : {
				"company_name" : {
					"field_name" : "company_name"
				},
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"fax_details" : {
					"field_name" : "fax_details"
				},
				"fax_values" : {
					"field_name" : "fax_values"
				},
				"legal_details" : {
					"field_name" : "legal_details"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"location_image_url" : {
					"field_name" : "location_image_url"
				},
				"location_name" : {
					"field_name" : "location_name"
				},
				"location_number" : {
					"field_name" : "location_number"
				},
				"location_status" : {
					"field_name" : "location_status"
				},
				"location_type" : {
					"field_name" : "location_type"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"website_details" : {
					"field_name" : "website_details"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_material_requests" : {
			"view_name" : "vw_material_requests",
			"view_fields" : {
				"response_audio_recordings" : {
					"field_name" : "response_audio_recordings"
				},
				"trip_id" : {
					"field_name" : "trip_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"pickup_location_name" : {
					"field_name" : "pickup_location_name"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_image_url" : {
					"field_name" : "item_image_url"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"approval_status" : {
					"field_name" : "approval_status"
				},
				"approval_time" : {
					"field_name" : "approval_time"
				},
				"approved_by" : {
					"field_name" : "approved_by"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"date_required" : {
					"field_name" : "date_required"
				},
				"delivered_by" : {
					"field_name" : "delivered_by"
				},
				"delivered_on" : {
					"field_name" : "delivered_on"
				},
				"delivery_attachments" : {
					"field_name" : "delivery_attachments"
				},
				"delivery_location_id" : {
					"field_name" : "delivery_location_id"
				},
				"delivery_recordings" : {
					"field_name" : "delivery_recordings"
				},
				"delivery_remarks" : {
					"field_name" : "delivery_remarks"
				},
				"delivery_signature_id" : {
					"field_name" : "delivery_signature_id"
				},
				"employee_id" : {
					"field_name" : "employee_id"
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"material_name" : {
					"field_name" : "material_name"
				},
				"material_quantity" : {
					"field_name" : "material_quantity"
				},
				"material_request_id" : {
					"field_name" : "material_request_id"
				},
				"material_request_number" : {
					"field_name" : "material_request_number"
				},
				"pickup_location_id" : {
					"field_name" : "pickup_location_id"
				},
				"priority" : {
					"field_name" : "priority"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"request_attachments" : {
					"field_name" : "request_attachments"
				},
				"request_audio_recordings" : {
					"field_name" : "request_audio_recordings"
				},
				"request_item_details" : {
					"field_name" : "request_item_details"
				},
				"request_status" : {
					"field_name" : "request_status"
				},
				"requests_linked" : {
					"field_name" : "requests_linked"
				},
				"required_on" : {
					"field_name" : "required_on"
				},
				"response_attachments" : {
					"field_name" : "response_attachments"
				}
			}
		},
		"vw_membership_cards" : {
			"view_name" : "vw_membership_cards",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				},
				"membership_amount" : {
					"field_name" : "membership_amount"
				},
				"membership_end_date" : {
					"field_name" : "membership_end_date"
				},
				"membership_id" : {
					"field_name" : "membership_id"
				},
				"membership_number" : {
					"field_name" : "membership_number"
				},
				"membership_start_date" : {
					"field_name" : "membership_start_date"
				},
				"membership_status" : {
					"field_name" : "membership_status"
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id"
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"customer_image_url" : {
					"field_name" : "customer_image_url"
				},
				"customer_category" : {
					"field_name" : "customer_category"
				},
				"pricing_group_name" : {
					"field_name" : "pricing_group_name"
				},
				"payment_method_name" : {
					"field_name" : "payment_method_name"
				},
				"end_date" : {
					"field_name" : "end_date"
				},
				"start_date" : {
					"field_name" : "start_date"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_mini_projects" : {
			"view_name" : "vw_mini_projects",
			"view_fields" : {
				"sale_invoice_date" : {
					"field_name" : "sale_invoice_date"
				},
				"sale_invoice_number" : {
					"field_name" : "sale_invoice_number"
				},
				"sale_quote_date" : {
					"field_name" : "sale_quote_date"
				},
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"sale_quote_number" : {
					"field_name" : "sale_quote_number"
				},
				"project_service_name" : {
					"field_name" : "project_service_name"
				},
				"project_service_number" : {
					"field_name" : "project_service_number"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"mini_project_details" : {
					"field_name" : "mini_project_details"
				},
				"mini_project_drawings" : {
					"field_name" : "mini_project_drawings"
				},
				"mini_project_id" : {
					"field_name" : "mini_project_id"
				},
				"mini_project_number" : {
					"field_name" : "mini_project_number"
				},
				"project_service_id" : {
					"field_name" : "project_service_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_invoice_item_id" : {
					"field_name" : "sale_invoice_item_id"
				},
				"sale_quote_item_id" : {
					"field_name" : "sale_quote_item_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_offers" : {
			"view_name" : "vw_offers",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"offer_end_date" : {
					"field_name" : "offer_end_date"
				},
				"offer_id" : {
					"field_name" : "offer_id"
				},
				"offer_name" : {
					"field_name" : "offer_name"
				},
				"offer_number" : {
					"field_name" : "offer_number"
				},
				"offer_start_date" : {
					"field_name" : "offer_start_date"
				},
				"offer_status" : {
					"field_name" : "offer_status"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"days_count" : {
					"field_name" : "days_count"
				},
				"end_date" : {
					"field_name" : "end_date"
				},
				"start_date" : {
					"field_name" : "start_date"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_payment_methods" : {
			"view_name" : "vw_payment_methods",
			"view_fields" : {
				"account_name" : {
					"field_name" : "account_name"
				},
				"account_id" : {
					"field_name" : "account_id"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id"
				},
				"payment_method_name" : {
					"field_name" : "payment_method_name"
				},
				"payment_method_number" : {
					"field_name" : "payment_method_number"
				},
				"payment_method_status" : {
					"field_name" : "payment_method_status"
				},
				"payment_method_type" : {
					"field_name" : "payment_method_type"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"account_target" : {
					"field_name" : "account_target"
				},
				"id" : {
					"field_name" : "id"
				},
				"payment_method_code" : {
					"field_name" : "payment_method_code"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_pricing_groups" : {
			"view_name" : "vw_pricing_groups",
			"view_fields" : {
				"items_count" : {
					"field_name" : "items_count"
				},
				"customers_count" : {
					"field_name" : "customers_count"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"discount_type" : {
					"field_name" : "discount_type"
				},
				"discount_value" : {
					"field_name" : "discount_value"
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id"
				},
				"pricing_group_name" : {
					"field_name" : "pricing_group_name"
				},
				"pricing_group_number" : {
					"field_name" : "pricing_group_number"
				},
				"pricing_group_status" : {
					"field_name" : "pricing_group_status"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"group_name" : {
					"field_name" : "group_name"
				},
				"group_status" : {
					"field_name" : "group_status"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_project_service_input_values" : {
			"view_name" : "vw_project_service_input_values",
			"view_fields" : {
				"item_name" : {
					"field_name" : "item_name"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"item_number" : {
					"field_name" : "item_number"
				},
				"item_price_sale" : {
					"field_name" : "item_price_sale"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_unit_sale" : {
					"field_name" : "item_unit_sale"
				},
				"item_unit_purchase" : {
					"field_name" : "item_unit_purchase"
				},
				"item_unit_stock" : {
					"field_name" : "item_unit_stock"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"display_condition_function_code" : {
					"field_name" : "display_condition_function_code"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"project_service_charge" : {
					"field_name" : "project_service_charge"
				},
				"project_service_charge_area_input_name" : {
					"field_name" : "project_service_charge_area_input_name"
				},
				"project_service_charge_calculation" : {
					"field_name" : "project_service_charge_calculation"
				},
				"project_service_charge_calculation_function_code" : {
					"field_name" : "project_service_charge_calculation_function_code"
				},
				"project_service_input_id" : {
					"field_name" : "project_service_input_id"
				},
				"project_service_input_value" : {
					"field_name" : "project_service_input_value"
				},
				"project_service_input_value_id" : {
					"field_name" : "project_service_input_value_id"
				},
				"project_service_input_value_images" : {
					"field_name" : "project_service_input_value_images"
				},
				"project_service_input_value_index" : {
					"field_name" : "project_service_input_value_index"
				},
				"project_service_input_value_label" : {
					"field_name" : "project_service_input_value_label"
				},
				"project_service_input_value_number" : {
					"field_name" : "project_service_input_value_number"
				},
				"project_service_input_value_type" : {
					"field_name" : "project_service_input_value_type"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"service_id" : {
					"field_name" : "service_id"
				},
				"project_service_price" : {
					"field_name" : "project_service_price"
				},
				"project_service_price_calculation" : {
					"field_name" : "project_service_price_calculation"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"project_service_charge_calculation_function" : {
					"field_name" : "project_service_charge_calculation_function"
				}
			}
		},
		"vw_projects" : {
			"view_name" : "vw_projects",
			"view_fields" : {
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"fax_details" : {
					"field_name" : "fax_details"
				},
				"fax_values" : {
					"field_name" : "fax_values"
				},
				"legal_details" : {
					"field_name" : "legal_details"
				},
				"manager_id" : {
					"field_name" : "manager_id"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"project_budget" : {
					"field_name" : "project_budget"
				},
				"project_description" : {
					"field_name" : "project_description"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_name" : {
					"field_name" : "project_name"
				},
				"project_number" : {
					"field_name" : "project_number"
				},
				"project_status" : {
					"field_name" : "project_status"
				},
				"project_type" : {
					"field_name" : "project_type"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"website_details" : {
					"field_name" : "website_details"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_commercial_invoice_items" : {
			"view_name" : "vw_purchase_commercial_invoice_items",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"commercial_invoice_id" : {
					"field_name" : "commercial_invoice_id"
				},
				"commercial_invoice_item_id" : {
					"field_name" : "commercial_invoice_item_id"
				},
				"commercial_invoice_item_status" : {
					"field_name" : "commercial_invoice_item_status"
				},
				"containers_linked" : {
					"field_name" : "containers_linked"
				},
				"discount_cd_percentage" : {
					"field_name" : "discount_cd_percentage"
				},
				"discount_rebate_amount" : {
					"field_name" : "discount_rebate_amount"
				},
				"discount_td_percentage" : {
					"field_name" : "discount_td_percentage"
				},
				"expiring_on" : {
					"field_name" : "expiring_on"
				},
				"invoices_linked" : {
					"field_name" : "invoices_linked"
				},
				"item_cost" : {
					"field_name" : "item_cost"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross"
				},
				"item_price_landing" : {
					"field_name" : "item_price_landing"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"lot_auto_generated" : {
					"field_name" : "lot_auto_generated"
				},
				"lot_details" : {
					"field_name" : "lot_details"
				},
				"lot_id" : {
					"field_name" : "lot_id"
				},
				"packings_linked" : {
					"field_name" : "packings_linked"
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split"
				},
				"split_cost" : {
					"field_name" : "split_cost"
				},
				"tax_percentage" : {
					"field_name" : "tax_percentage"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"item_amount" : {
					"field_name" : "item_amount"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"commercial_invoice_number" : {
					"field_name" : "commercial_invoice_number"
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_commercial_invoices" : {
			"view_name" : "vw_purchase_commercial_invoices",
			"view_fields" : {
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"commercial_invoice_amount" : {
					"field_name" : "commercial_invoice_amount"
				},
				"commercial_invoice_date" : {
					"field_name" : "commercial_invoice_date"
				},
				"commercial_invoice_id" : {
					"field_name" : "commercial_invoice_id"
				},
				"commercial_invoice_number" : {
					"field_name" : "commercial_invoice_number"
				},
				"commercial_invoice_status" : {
					"field_name" : "commercial_invoice_status"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_person" : {
					"field_name" : "contact_person"
				},
				"containers_linked" : {
					"field_name" : "containers_linked"
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method"
				},
				"credit_days" : {
					"field_name" : "credit_days"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"invoices_linked" : {
					"field_name" : "invoices_linked"
				},
				"is_payable" : {
					"field_name" : "is_payable"
				},
				"item_price_type" : {
					"field_name" : "item_price_type"
				},
				"packings_linked" : {
					"field_name" : "packings_linked"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked"
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"purchase_term_name" : {
					"field_name" : "purchase_term_name"
				},
				"paid_amount" : {
					"field_name" : "paid_amount"
				},
				"pending_amount" : {
					"field_name" : "pending_amount"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_container_items" : {
			"view_name" : "vw_purchase_container_items",
			"view_fields" : {
				"remarks" : {
					"field_name" : "remarks"
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split"
				},
				"split_cost" : {
					"field_name" : "split_cost"
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments"
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings"
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"container_number" : {
					"field_name" : "container_number"
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"arrived_quantity" : {
					"field_name" : "arrived_quantity"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked"
				},
				"container_id" : {
					"field_name" : "container_id"
				},
				"container_item_id" : {
					"field_name" : "container_item_id"
				},
				"container_item_status" : {
					"field_name" : "container_item_status"
				},
				"details" : {
					"field_name" : "details"
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id"
				},
				"item_cost" : {
					"field_name" : "item_cost"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"packings_linked" : {
					"field_name" : "packings_linked"
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				}
			}
		},
		"vw_purchase_containers" : {
			"view_name" : "vw_purchase_containers",
			"view_fields" : {
				"arrival_attachments" : {
					"field_name" : "arrival_attachments"
				},
				"arrival_audio_recordings" : {
					"field_name" : "arrival_audio_recordings"
				},
				"arrival_date_est" : {
					"field_name" : "arrival_date_est"
				},
				"arrival_datetime_dock" : {
					"field_name" : "arrival_datetime_dock"
				},
				"arrival_datetime_location" : {
					"field_name" : "arrival_datetime_location"
				},
				"arrival_remarks" : {
					"field_name" : "arrival_remarks"
				},
				"arrival_signature_id" : {
					"field_name" : "arrival_signature_id"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"checklist_id" : {
					"field_name" : "checklist_id"
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"container_color" : {
					"field_name" : "container_color"
				},
				"container_date" : {
					"field_name" : "container_date"
				},
				"container_details" : {
					"field_name" : "container_details"
				},
				"container_id" : {
					"field_name" : "container_id"
				},
				"container_number" : {
					"field_name" : "container_number"
				},
				"container_status" : {
					"field_name" : "container_status"
				},
				"container_type" : {
					"field_name" : "container_type"
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method"
				},
				"default_storage_location_id" : {
					"field_name" : "default_storage_location_id"
				},
				"dispatch_attachments" : {
					"field_name" : "dispatch_attachments"
				},
				"dispatch_audio_recordings" : {
					"field_name" : "dispatch_audio_recordings"
				},
				"dispatch_datetime_location" : {
					"field_name" : "dispatch_datetime_location"
				},
				"dispatch_remarks" : {
					"field_name" : "dispatch_remarks"
				},
				"dispatch_signature_id" : {
					"field_name" : "dispatch_signature_id"
				},
				"documents_pending" : {
					"field_name" : "documents_pending"
				},
				"documents_uploaded" : {
					"field_name" : "documents_uploaded"
				},
				"empty_date" : {
					"field_name" : "empty_date"
				},
				"empty_location_id" : {
					"field_name" : "empty_location_id"
				},
				"inbound_date" : {
					"field_name" : "inbound_date"
				},
				"material_type" : {
					"field_name" : "material_type"
				},
				"outbound_date" : {
					"field_name" : "outbound_date"
				},
				"packings_linked" : {
					"field_name" : "packings_linked"
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"shipping_company_id" : {
					"field_name" : "shipping_company_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments"
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings"
				},
				"unloading_end_time" : {
					"field_name" : "unloading_end_time"
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks"
				},
				"unloading_signature_id" : {
					"field_name" : "unloading_signature_id"
				},
				"unloading_start_time" : {
					"field_name" : "unloading_start_time"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vessel_number" : {
					"field_name" : "vessel_number"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"shipping_company_name" : {
					"field_name" : "shipping_company_name"
				},
				"total_checklist_items" : {
					"field_name" : "total_checklist_items"
				},
				"pending_checklist_items" : {
					"field_name" : "pending_checklist_items"
				},
				"completed_checklist_items" : {
					"field_name" : "completed_checklist_items"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_containers_packings" : {
			"view_name" : "vw_purchase_containers_packings",
			"view_fields" : {
				"container_number" : {
					"field_name" : "container_number"
				},
				"packing_list_number" : {
					"field_name" : "packing_list_number"
				},
				"material_type" : {
					"field_name" : "material_type"
				},
				"packing_type" : {
					"field_name" : "packing_type"
				},
				"container_id" : {
					"field_name" : "container_id"
				},
				"damaged_attachments" : {
					"field_name" : "damaged_attachments"
				},
				"damaged_audio_recordings" : {
					"field_name" : "damaged_audio_recordings"
				},
				"damaged_remarks" : {
					"field_name" : "damaged_remarks"
				},
				"packing_list_id" : {
					"field_name" : "packing_list_id"
				},
				"purchase_container_packing_id" : {
					"field_name" : "purchase_container_packing_id"
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments"
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings"
				},
				"unloading_end_time" : {
					"field_name" : "unloading_end_time"
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks"
				},
				"unloading_start_time" : {
					"field_name" : "unloading_start_time"
				},
				"unloading_status" : {
					"field_name" : "unloading_status"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_document_payments" : {
			"view_name" : "vw_purchase_document_payments",
			"view_fields" : {
				"document_title" : {
					"field_name" : "document_title"
				},
				"document_type" : {
					"field_name" : "document_type"
				},
				"document_id" : {
					"field_name" : "document_id"
				},
				"document_number" : {
					"field_name" : "document_number"
				},
				"document_date" : {
					"field_name" : "document_date"
				},
				"document_amount" : {
					"field_name" : "document_amount"
				},
				"is_payable" : {
					"field_name" : "is_payable"
				},
				"paid_amount" : {
					"field_name" : "paid_amount"
				},
				"pending_amount" : {
					"field_name" : "pending_amount"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				}
			}
		},
		"vw_purchase_invoice_items" : {
			"view_name" : "vw_purchase_invoice_items",
			"view_fields" : {
				"item_price_gross" : {
					"field_name" : "item_price_gross"
				},
				"item_price_landing" : {
					"field_name" : "item_price_landing"
				},
				"item_price_sale" : {
					"field_name" : "item_price_sale"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"lot_auto_generated" : {
					"field_name" : "lot_auto_generated"
				},
				"lot_details" : {
					"field_name" : "lot_details"
				},
				"lot_id" : {
					"field_name" : "lot_id"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split"
				},
				"split_cost" : {
					"field_name" : "split_cost"
				},
				"tax_percentage" : {
					"field_name" : "tax_percentage"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"item_amount" : {
					"field_name" : "item_amount"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"invoice_number" : {
					"field_name" : "invoice_number"
				},
				"invoice_date" : {
					"field_name" : "invoice_date"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"item_weight" : {
					"field_name" : "item_weight"
				},
				"total_weight" : {
					"field_name" : "total_weight"
				},
				"id" : {
					"field_name" : "id"
				},
				"item_area" : {
					"field_name" : "item_area"
				},
				"item_height" : {
					"field_name" : "item_height"
				},
				"item_width" : {
					"field_name" : "item_width"
				},
				"purchase_invoice_id" : {
					"field_name" : "purchase_invoice_id"
				},
				"purchase_invoice_item_id" : {
					"field_name" : "purchase_invoice_item_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"service_charges_area" : {
					"field_name" : "service_charges_area"
				},
				"service_charges_percentage" : {
					"field_name" : "service_charges_percentage"
				},
				"service_charges_quantity" : {
					"field_name" : "service_charges_quantity"
				},
				"surcharge_area" : {
					"field_name" : "surcharge_area"
				},
				"surcharge_length" : {
					"field_name" : "surcharge_length"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked"
				},
				"discount_cd_percentage" : {
					"field_name" : "discount_cd_percentage"
				},
				"discount_rebate_amount" : {
					"field_name" : "discount_rebate_amount"
				},
				"discount_td_percentage" : {
					"field_name" : "discount_td_percentage"
				},
				"expiring_on" : {
					"field_name" : "expiring_on"
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id"
				},
				"invoice_id" : {
					"field_name" : "invoice_id"
				},
				"invoice_item_id" : {
					"field_name" : "invoice_item_id"
				},
				"invoice_item_status" : {
					"field_name" : "invoice_item_status"
				},
				"item_cost" : {
					"field_name" : "item_cost"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				}
			}
		},
		"vw_purchase_invoice_landing_links" : {
			"view_name" : "vw_purchase_invoice_landing_links",
			"view_fields" : {
				"invoice_number" : {
					"field_name" : "invoice_number"
				},
				"item_price_landing" : {
					"field_name" : "item_price_landing"
				},
				"invoice_date" : {
					"field_name" : "invoice_date"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"invoice_item_id" : {
					"field_name" : "invoice_item_id"
				},
				"item_link_id" : {
					"field_name" : "item_link_id"
				},
				"landing_price_item_id" : {
					"field_name" : "landing_price_item_id"
				},
				"quantity_used" : {
					"field_name" : "quantity_used"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_invoices" : {
			"view_name" : "vw_purchase_invoices",
			"view_fields" : {
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_person" : {
					"field_name" : "contact_person"
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method"
				},
				"credit_days" : {
					"field_name" : "credit_days"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id"
				},
				"invoice_amount" : {
					"field_name" : "invoice_amount"
				},
				"invoice_date" : {
					"field_name" : "invoice_date"
				},
				"invoice_id" : {
					"field_name" : "invoice_id"
				},
				"invoice_number" : {
					"field_name" : "invoice_number"
				},
				"invoice_status" : {
					"field_name" : "invoice_status"
				},
				"is_local_purchase" : {
					"field_name" : "is_local_purchase"
				},
				"is_payable" : {
					"field_name" : "is_payable"
				},
				"item_price_type" : {
					"field_name" : "item_price_type"
				},
				"landing_price_id" : {
					"field_name" : "landing_price_id"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"profit_margin" : {
					"field_name" : "profit_margin"
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"purchase_term_name" : {
					"field_name" : "purchase_term_name"
				},
				"paid_amount" : {
					"field_name" : "paid_amount"
				},
				"pending_amount" : {
					"field_name" : "pending_amount"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"supplier_name" : {
					"field_name" : "supplier_name"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"address_values" : {
					"field_name" : "address_values"
				},
				"bank_values" : {
					"field_name" : "bank_values"
				},
				"supplier_number" : {
					"field_name" : "supplier_number"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"user_number" : {
					"field_name" : "user_number"
				},
				"address_details" : {
					"field_name" : "address_details"
				},
				"id" : {
					"field_name" : "id"
				},
				"purchase_invoice_amount" : {
					"field_name" : "purchase_invoice_amount"
				},
				"purchase_invoice_date" : {
					"field_name" : "purchase_invoice_date"
				},
				"purchase_invoice_id" : {
					"field_name" : "purchase_invoice_id"
				},
				"purchase_invoice_number" : {
					"field_name" : "purchase_invoice_number"
				},
				"purchase_invoice_status" : {
					"field_name" : "purchase_invoice_status"
				},
				"purchase_order_id" : {
					"field_name" : "purchase_order_id"
				},
				"service_charges_area" : {
					"field_name" : "service_charges_area"
				},
				"service_charges_quantity" : {
					"field_name" : "service_charges_quantity"
				},
				"supplier_id" : {
					"field_name" : "supplier_id"
				},
				"tax_rate" : {
					"field_name" : "tax_rate"
				},
				"user_id" : {
					"field_name" : "user_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_order_items" : {
			"view_name" : "vw_purchase_order_items",
			"view_fields" : {
				"order_number" : {
					"field_name" : "order_number"
				},
				"order_date" : {
					"field_name" : "order_date"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"item_amount" : {
					"field_name" : "item_amount"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"discount_cd_percentage" : {
					"field_name" : "discount_cd_percentage"
				},
				"discount_rebate_amount" : {
					"field_name" : "discount_rebate_amount"
				},
				"discount_td_percentage" : {
					"field_name" : "discount_td_percentage"
				},
				"item_cost" : {
					"field_name" : "item_cost"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"lot_auto_generated" : {
					"field_name" : "lot_auto_generated"
				},
				"lot_details" : {
					"field_name" : "lot_details"
				},
				"lot_id" : {
					"field_name" : "lot_id"
				},
				"order_id" : {
					"field_name" : "order_id"
				},
				"order_item_id" : {
					"field_name" : "order_item_id"
				},
				"order_item_status" : {
					"field_name" : "order_item_status"
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"quotes_linked" : {
					"field_name" : "quotes_linked"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split"
				},
				"split_cost" : {
					"field_name" : "split_cost"
				},
				"tax_percentage" : {
					"field_name" : "tax_percentage"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"item_weight" : {
					"field_name" : "item_weight"
				},
				"total_weight" : {
					"field_name" : "total_weight"
				},
				"id" : {
					"field_name" : "id"
				},
				"item_area" : {
					"field_name" : "item_area"
				},
				"item_height" : {
					"field_name" : "item_height"
				},
				"item_width" : {
					"field_name" : "item_width"
				},
				"purchase_order_id" : {
					"field_name" : "purchase_order_id"
				},
				"purchase_order_item_id" : {
					"field_name" : "purchase_order_item_id"
				},
				"service_charges_area" : {
					"field_name" : "service_charges_area"
				},
				"service_charges_percentage" : {
					"field_name" : "service_charges_percentage"
				},
				"service_charges_quantity" : {
					"field_name" : "service_charges_quantity"
				},
				"surcharge_area" : {
					"field_name" : "surcharge_area"
				},
				"surcharge_length" : {
					"field_name" : "surcharge_length"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity"
				}
			}
		},
		"vw_purchase_orders" : {
			"view_name" : "vw_purchase_orders",
			"view_fields" : {
				"approval_status" : {
					"field_name" : "approval_status"
				},
				"approval_time" : {
					"field_name" : "approval_time"
				},
				"approved_by" : {
					"field_name" : "approved_by"
				},
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_person" : {
					"field_name" : "contact_person"
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method"
				},
				"credit_days" : {
					"field_name" : "credit_days"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"is_payable" : {
					"field_name" : "is_payable"
				},
				"item_price_type" : {
					"field_name" : "item_price_type"
				},
				"loading_date" : {
					"field_name" : "loading_date"
				},
				"order_amount" : {
					"field_name" : "order_amount"
				},
				"order_date" : {
					"field_name" : "order_date"
				},
				"order_id" : {
					"field_name" : "order_id"
				},
				"order_number" : {
					"field_name" : "order_number"
				},
				"order_status" : {
					"field_name" : "order_status"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked"
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id"
				},
				"quotes_linked" : {
					"field_name" : "quotes_linked"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"remarks_for_vendor" : {
					"field_name" : "remarks_for_vendor"
				},
				"shipping_details" : {
					"field_name" : "shipping_details"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"purchase_term_name" : {
					"field_name" : "purchase_term_name"
				},
				"paid_amount" : {
					"field_name" : "paid_amount"
				},
				"pending_amount" : {
					"field_name" : "pending_amount"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"item_attachments_count" : {
					"field_name" : "item_attachments_count"
				},
				"item_attachments" : {
					"field_name" : "item_attachments"
				},
				"supplier_name" : {
					"field_name" : "supplier_name"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"address_values" : {
					"field_name" : "address_values"
				},
				"bank_values" : {
					"field_name" : "bank_values"
				},
				"supplier_number" : {
					"field_name" : "supplier_number"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"user_number" : {
					"field_name" : "user_number"
				},
				"tax_name" : {
					"field_name" : "tax_name"
				},
				"address_details" : {
					"field_name" : "address_details"
				},
				"id" : {
					"field_name" : "id"
				},
				"purchase_invoice_amount" : {
					"field_name" : "purchase_invoice_amount"
				},
				"purchase_invoice_date" : {
					"field_name" : "purchase_invoice_date"
				},
				"purchase_invoice_number" : {
					"field_name" : "purchase_invoice_number"
				},
				"purchase_order_amount" : {
					"field_name" : "purchase_order_amount"
				},
				"purchase_order_date" : {
					"field_name" : "purchase_order_date"
				},
				"purchase_order_id" : {
					"field_name" : "purchase_order_id"
				},
				"purchase_order_number" : {
					"field_name" : "purchase_order_number"
				},
				"purchase_order_status" : {
					"field_name" : "purchase_order_status"
				},
				"quotation_id" : {
					"field_name" : "quotation_id"
				},
				"supplier_id" : {
					"field_name" : "supplier_id"
				},
				"tax_rate" : {
					"field_name" : "tax_rate"
				},
				"user_id" : {
					"field_name" : "user_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_packing_list_items" : {
			"view_name" : "vw_purchase_packing_list_items",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked"
				},
				"containers_linked" : {
					"field_name" : "containers_linked"
				},
				"details" : {
					"field_name" : "details"
				},
				"item_cost" : {
					"field_name" : "item_cost"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"packing_list_id" : {
					"field_name" : "packing_list_id"
				},
				"packing_list_item_id" : {
					"field_name" : "packing_list_item_id"
				},
				"packing_list_item_status" : {
					"field_name" : "packing_list_item_status"
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split"
				},
				"split_cost" : {
					"field_name" : "split_cost"
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments"
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings"
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"packing_list_number" : {
					"field_name" : "packing_list_number"
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_packing_lists" : {
			"view_name" : "vw_purchase_packing_lists",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"containers_linked" : {
					"field_name" : "containers_linked"
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method"
				},
				"material_type" : {
					"field_name" : "material_type"
				},
				"packing_list_date" : {
					"field_name" : "packing_list_date"
				},
				"packing_list_id" : {
					"field_name" : "packing_list_id"
				},
				"packing_list_number" : {
					"field_name" : "packing_list_number"
				},
				"packing_list_status" : {
					"field_name" : "packing_list_status"
				},
				"packing_time" : {
					"field_name" : "packing_time"
				},
				"packing_type" : {
					"field_name" : "packing_type"
				},
				"proformas_linked" : {
					"field_name" : "proformas_linked"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments"
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings"
				},
				"unloading_end_time" : {
					"field_name" : "unloading_end_time"
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks"
				},
				"unloading_start_time" : {
					"field_name" : "unloading_start_time"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_proforma_items" : {
			"view_name" : "vw_purchase_proforma_items",
			"view_fields" : {
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked"
				},
				"containers_linked" : {
					"field_name" : "containers_linked"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"discount_cd_percentage" : {
					"field_name" : "discount_cd_percentage"
				},
				"discount_rebate_amount" : {
					"field_name" : "discount_rebate_amount"
				},
				"discount_td_percentage" : {
					"field_name" : "discount_td_percentage"
				},
				"expiring_on" : {
					"field_name" : "expiring_on"
				},
				"item_cost" : {
					"field_name" : "item_cost"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"lot_auto_generated" : {
					"field_name" : "lot_auto_generated"
				},
				"lot_details" : {
					"field_name" : "lot_details"
				},
				"lot_id" : {
					"field_name" : "lot_id"
				},
				"orders_linked" : {
					"field_name" : "orders_linked"
				},
				"packings_linked" : {
					"field_name" : "packings_linked"
				},
				"proforma_id" : {
					"field_name" : "proforma_id"
				},
				"proforma_item_id" : {
					"field_name" : "proforma_item_id"
				},
				"proforma_item_status" : {
					"field_name" : "proforma_item_status"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"skip_in_cost_split" : {
					"field_name" : "skip_in_cost_split"
				},
				"split_cost" : {
					"field_name" : "split_cost"
				},
				"tax_percentage" : {
					"field_name" : "tax_percentage"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"item_amount" : {
					"field_name" : "item_amount"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"proforma_number" : {
					"field_name" : "proforma_number"
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity"
				}
			}
		},
		"vw_purchase_proformas" : {
			"view_name" : "vw_purchase_proformas",
			"view_fields" : {
				"approval_status" : {
					"field_name" : "approval_status"
				},
				"approval_time" : {
					"field_name" : "approval_time"
				},
				"approved_by" : {
					"field_name" : "approved_by"
				},
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"commercials_linked" : {
					"field_name" : "commercials_linked"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_person" : {
					"field_name" : "contact_person"
				},
				"containers_linked" : {
					"field_name" : "containers_linked"
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method"
				},
				"credit_days" : {
					"field_name" : "credit_days"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"is_payable" : {
					"field_name" : "is_payable"
				},
				"item_price_type" : {
					"field_name" : "item_price_type"
				},
				"orders_linked" : {
					"field_name" : "orders_linked"
				},
				"packings_linked" : {
					"field_name" : "packings_linked"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"proforma_amount" : {
					"field_name" : "proforma_amount"
				},
				"proforma_date" : {
					"field_name" : "proforma_date"
				},
				"proforma_id" : {
					"field_name" : "proforma_id"
				},
				"proforma_number" : {
					"field_name" : "proforma_number"
				},
				"proforma_status" : {
					"field_name" : "proforma_status"
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"purchase_term_name" : {
					"field_name" : "purchase_term_name"
				},
				"paid_amount" : {
					"field_name" : "paid_amount"
				},
				"pending_amount" : {
					"field_name" : "pending_amount"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_quote_items" : {
			"view_name" : "vw_purchase_quote_items",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"orders_linked" : {
					"field_name" : "orders_linked"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"quote_id" : {
					"field_name" : "quote_id"
				},
				"quote_item_id" : {
					"field_name" : "quote_item_id"
				},
				"quote_item_status" : {
					"field_name" : "quote_item_status"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"requests_linked" : {
					"field_name" : "requests_linked"
				},
				"quote_number" : {
					"field_name" : "quote_number"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"item_sku" : {
					"field_name" : "item_sku"
				},
				"item_number" : {
					"field_name" : "item_number"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_quote_vendor_items" : {
			"view_name" : "vw_purchase_quote_vendor_items",
			"view_fields" : {
				"last_order_price" : {
					"field_name" : "last_order_price"
				},
				"last_order_id" : {
					"field_name" : "last_order_id"
				},
				"quote_number" : {
					"field_name" : "quote_number"
				},
				"quote_vendor_id" : {
					"field_name" : "quote_vendor_id"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"quote_id" : {
					"field_name" : "quote_id"
				},
				"quote_item_id" : {
					"field_name" : "quote_item_id"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"quote_vendor_item_id" : {
					"field_name" : "quote_vendor_item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"last_item_price" : {
					"field_name" : "last_item_price"
				},
				"last_item_order_id" : {
					"field_name" : "last_item_order_id"
				}
			}
		},
		"vw_purchase_quote_vendors" : {
			"view_name" : "vw_purchase_quote_vendors",
			"view_fields" : {
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"vendor_number" : {
					"field_name" : "vendor_number"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"quote_id" : {
					"field_name" : "quote_id"
				},
				"quote_vendor_id" : {
					"field_name" : "quote_vendor_id"
				},
				"quote_vendor_number" : {
					"field_name" : "quote_vendor_number"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"remarks_for_vendor" : {
					"field_name" : "remarks_for_vendor"
				},
				"required_date" : {
					"field_name" : "required_date"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vendor_quote_date" : {
					"field_name" : "vendor_quote_date"
				},
				"vendor_quote_status" : {
					"field_name" : "vendor_quote_status"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_quotes" : {
			"view_name" : "vw_purchase_quotes",
			"view_fields" : {
				"approval_status" : {
					"field_name" : "approval_status"
				},
				"approval_time" : {
					"field_name" : "approval_time"
				},
				"approved_by" : {
					"field_name" : "approved_by"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"orders_linked" : {
					"field_name" : "orders_linked"
				},
				"quote_date" : {
					"field_name" : "quote_date"
				},
				"quote_id" : {
					"field_name" : "quote_id"
				},
				"required_date" : {
					"field_name" : "required_date"
				},
				"vendors_linked" : {
					"field_name" : "vendors_linked"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"quote_number" : {
					"field_name" : "quote_number"
				},
				"quote_status" : {
					"field_name" : "quote_status"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"remarks_for_vendor" : {
					"field_name" : "remarks_for_vendor"
				},
				"requests_linked" : {
					"field_name" : "requests_linked"
				}
			}
		},
		"vw_purchase_request_items" : {
			"view_name" : "vw_purchase_request_items",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"material_requests_linked" : {
					"field_name" : "material_requests_linked"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"quotes_linked" : {
					"field_name" : "quotes_linked"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"request_id" : {
					"field_name" : "request_id"
				},
				"request_item_id" : {
					"field_name" : "request_item_id"
				},
				"request_item_status" : {
					"field_name" : "request_item_status"
				},
				"request_number" : {
					"field_name" : "request_number"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"item_uom_quantity" : {
					"field_name" : "item_uom_quantity"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_purchase_requests" : {
			"view_name" : "vw_purchase_requests",
			"view_fields" : {
				"approval_status" : {
					"field_name" : "approval_status"
				},
				"approval_time" : {
					"field_name" : "approval_time"
				},
				"approved_by" : {
					"field_name" : "approved_by"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contra_id" : {
					"field_name" : "contra_id"
				},
				"contra_type" : {
					"field_name" : "contra_type"
				},
				"material_requests_linked" : {
					"field_name" : "material_requests_linked"
				},
				"quotes_linked" : {
					"field_name" : "quotes_linked"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"request_date" : {
					"field_name" : "request_date"
				},
				"request_id" : {
					"field_name" : "request_id"
				},
				"request_number" : {
					"field_name" : "request_number"
				},
				"request_status" : {
					"field_name" : "request_status"
				},
				"requested_by" : {
					"field_name" : "requested_by"
				},
				"requested_for" : {
					"field_name" : "requested_for"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_sale_appointments" : {
			"view_name" : "vw_sale_appointments",
			"view_fields" : {
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"appointment_end_time" : {
					"field_name" : "appointment_end_time"
				},
				"appointment_start_time" : {
					"field_name" : "appointment_start_time"
				},
				"appointment_status" : {
					"field_name" : "appointment_status"
				},
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"request_attachments" : {
					"field_name" : "request_attachments"
				},
				"request_remarks" : {
					"field_name" : "request_remarks"
				},
				"response_attachments" : {
					"field_name" : "response_attachments"
				},
				"response_remarks" : {
					"field_name" : "response_remarks"
				},
				"sale_appointment_id" : {
					"field_name" : "sale_appointment_id"
				},
				"sale_appointment_number" : {
					"field_name" : "sale_appointment_number"
				},
				"end_time" : {
					"field_name" : "end_time"
				},
				"start_time" : {
					"field_name" : "start_time"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_sale_container_items" : {
			"view_name" : "vw_sale_container_items",
			"view_fields" : {
				"additional_cost_details" : {
					"field_name" : "additional_cost_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"container_item_status" : {
					"field_name" : "container_item_status"
				},
				"details" : {
					"field_name" : "details"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_container_detail_id" : {
					"field_name" : "sale_container_detail_id"
				},
				"sale_container_id" : {
					"field_name" : "sale_container_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"sale_container_number" : {
					"field_name" : "sale_container_number"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_sale_containers" : {
			"view_name" : "vw_sale_containers",
			"view_fields" : {
				"arrival_date_dock" : {
					"field_name" : "arrival_date_dock"
				},
				"arrival_date_est" : {
					"field_name" : "arrival_date_est"
				},
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"container_color" : {
					"field_name" : "container_color"
				},
				"container_type" : {
					"field_name" : "container_type"
				},
				"cost_spit_method" : {
					"field_name" : "cost_spit_method"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				},
				"empty_date" : {
					"field_name" : "empty_date"
				},
				"inbound_date" : {
					"field_name" : "inbound_date"
				},
				"material_type" : {
					"field_name" : "material_type"
				},
				"outbound_date" : {
					"field_name" : "outbound_date"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_container_details" : {
					"field_name" : "sale_container_details"
				},
				"sale_container_id" : {
					"field_name" : "sale_container_id"
				},
				"sale_container_number" : {
					"field_name" : "sale_container_number"
				},
				"sale_container_status" : {
					"field_name" : "sale_container_status"
				},
				"shipping_company_id" : {
					"field_name" : "shipping_company_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"vessel_number" : {
					"field_name" : "vessel_number"
				},
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"shipping_company_name" : {
					"field_name" : "shipping_company_name"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_sale_document_payments" : {
			"view_name" : "vw_sale_document_payments",
			"view_fields" : {
				"document_title" : {
					"field_name" : "document_title"
				},
				"document_type" : {
					"field_name" : "document_type"
				},
				"document_id" : {
					"field_name" : "document_id"
				},
				"document_number" : {
					"field_name" : "document_number"
				},
				"document_date" : {
					"field_name" : "document_date"
				},
				"document_amount" : {
					"field_name" : "document_amount"
				},
				"is_payable" : {
					"field_name" : "is_payable"
				},
				"paid_amount" : {
					"field_name" : "paid_amount"
				},
				"pending_amount" : {
					"field_name" : "pending_amount"
				},
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				}
			}
		},
		"vw_sale_invoice_items" : {
			"view_name" : "vw_sale_invoice_items",
			"view_fields" : {
				"additional_cost_details" : {
					"field_name" : "additional_cost_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"delivery_mode" : {
					"field_name" : "delivery_mode"
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"mini_project_id" : {
					"field_name" : "mini_project_id"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_invoice_id" : {
					"field_name" : "sale_invoice_id"
				},
				"sale_invoice_item_id" : {
					"field_name" : "sale_invoice_item_id"
				},
				"sale_invoice_item_status" : {
					"field_name" : "sale_invoice_item_status"
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"warranty_expiry_date" : {
					"field_name" : "warranty_expiry_date"
				},
				"warranty_expiry_details" : {
					"field_name" : "warranty_expiry_details"
				},
				"item_amount" : {
					"field_name" : "item_amount"
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale"
				},
				"sale_invoice_number" : {
					"field_name" : "sale_invoice_number"
				},
				"item_price_landing" : {
					"field_name" : "item_price_landing"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"item_weight" : {
					"field_name" : "item_weight"
				},
				"total_weight" : {
					"field_name" : "total_weight"
				},
				"id" : {
					"field_name" : "id"
				},
				"item_area" : {
					"field_name" : "item_area"
				},
				"item_height" : {
					"field_name" : "item_height"
				},
				"item_width" : {
					"field_name" : "item_width"
				},
				"service_charges_area" : {
					"field_name" : "service_charges_area"
				},
				"service_charges_percentage" : {
					"field_name" : "service_charges_percentage"
				},
				"service_charges_quantity" : {
					"field_name" : "service_charges_quantity"
				},
				"surcharge_area" : {
					"field_name" : "surcharge_area"
				},
				"surcharge_length" : {
					"field_name" : "surcharge_length"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_sale_invoices" : {
			"view_name" : "vw_sale_invoices",
			"view_fields" : {
				"paid_amount" : {
					"field_name" : "paid_amount"
				},
				"pending_amount" : {
					"field_name" : "pending_amount"
				},
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"payment_term_name" : {
					"field_name" : "payment_term_name"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"additional_cost_amount" : {
					"field_name" : "additional_cost_amount"
				},
				"additional_cost_details" : {
					"field_name" : "additional_cost_details"
				},
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_person" : {
					"field_name" : "contact_person"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				},
				"is_payable" : {
					"field_name" : "is_payable"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_invoice_amount" : {
					"field_name" : "sale_invoice_amount"
				},
				"sale_invoice_date" : {
					"field_name" : "sale_invoice_date"
				},
				"sale_invoice_id" : {
					"field_name" : "sale_invoice_id"
				},
				"sale_invoice_number" : {
					"field_name" : "sale_invoice_number"
				},
				"sale_invoice_status" : {
					"field_name" : "sale_invoice_status"
				},
				"sale_term_id" : {
					"field_name" : "sale_term_id"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"attachments_count" : {
					"field_name" : "attachments_count"
				},
				"item_attachments_count" : {
					"field_name" : "item_attachments_count"
				},
				"item_attachments" : {
					"field_name" : "item_attachments"
				},
				"user_number" : {
					"field_name" : "user_number"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"address_values" : {
					"field_name" : "address_values"
				},
				"bank_values" : {
					"field_name" : "bank_values"
				},
				"customer_number" : {
					"field_name" : "customer_number"
				},
				"tax_name" : {
					"field_name" : "tax_name"
				},
				"current_document_role" : {
					"field_name" : "current_document_role"
				},
				"delivery_address_details" : {
					"field_name" : "delivery_address_details"
				},
				"delivery_date" : {
					"field_name" : "delivery_date"
				},
				"delivery_signature_id" : {
					"field_name" : "delivery_signature_id"
				},
				"delivery_signature_status" : {
					"field_name" : "delivery_signature_status"
				},
				"fitting_address_details" : {
					"field_name" : "fitting_address_details"
				},
				"fitting_date" : {
					"field_name" : "fitting_date"
				},
				"fitting_signature_id" : {
					"field_name" : "fitting_signature_id"
				},
				"fitting_signature_status" : {
					"field_name" : "fitting_signature_status"
				},
				"id" : {
					"field_name" : "id"
				},
				"invoice_address_details" : {
					"field_name" : "invoice_address_details"
				},
				"invoice_signature_id" : {
					"field_name" : "invoice_signature_id"
				},
				"invoice_signature_status" : {
					"field_name" : "invoice_signature_status"
				},
				"quotation_id" : {
					"field_name" : "quotation_id"
				},
				"tax_rate" : {
					"field_name" : "tax_rate"
				},
				"user_id" : {
					"field_name" : "user_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"entry_mode" : {
					"field_name" : "entry_mode"
				},
				"delivery_note_number" : {
					"field_name" : "delivery_note_number"
				},
				"fitting_note_number" : {
					"field_name" : "fitting_note_number"
				},
				"sale_order_number" : {
					"field_name" : "sale_order_number"
				},
				"sale_order_date" : {
					"field_name" : "sale_order_date"
				},
				"sale_order_signature_id" : {
					"field_name" : "sale_order_signature_id"
				},
				"sale_order_signature_status" : {
					"field_name" : "sale_order_signature_status"
				}
			}
		},
		"vw_sale_packing_list_items" : {
			"view_name" : "vw_sale_packing_list_items",
			"view_fields" : {
				"additional_cost_details" : {
					"field_name" : "additional_cost_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"details" : {
					"field_name" : "details"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_packing_list_id" : {
					"field_name" : "sale_packing_list_id"
				},
				"sale_packing_list_item_id" : {
					"field_name" : "sale_packing_list_item_id"
				},
				"sale_packing_list_item_status" : {
					"field_name" : "sale_packing_list_item_status"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale"
				},
				"sale_packing_list_number" : {
					"field_name" : "sale_packing_list_number"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_sale_packing_lists" : {
			"view_name" : "vw_sale_packing_lists",
			"view_fields" : {
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"cost_split_method" : {
					"field_name" : "cost_split_method"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				},
				"material_type" : {
					"field_name" : "material_type"
				},
				"packing_type" : {
					"field_name" : "packing_type"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_packing_list_date" : {
					"field_name" : "sale_packing_list_date"
				},
				"sale_packing_list_id" : {
					"field_name" : "sale_packing_list_id"
				},
				"sale_packing_list_number" : {
					"field_name" : "sale_packing_list_number"
				},
				"sale_packing_list_status" : {
					"field_name" : "sale_packing_list_status"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_sale_proforma_items" : {
			"view_name" : "vw_sale_proforma_items",
			"view_fields" : {
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_proforma_id" : {
					"field_name" : "sale_proforma_id"
				},
				"sale_proforma_item_id" : {
					"field_name" : "sale_proforma_item_id"
				},
				"sale_proforma_item_status" : {
					"field_name" : "sale_proforma_item_status"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"item_amount" : {
					"field_name" : "item_amount"
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale"
				},
				"sale_proforma_number" : {
					"field_name" : "sale_proforma_number"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id"
				}
			}
		},
		"vw_sale_proformas" : {
			"view_name" : "vw_sale_proformas",
			"view_fields" : {
				"paid_amount" : {
					"field_name" : "paid_amount"
				},
				"pending_amount" : {
					"field_name" : "pending_amount"
				},
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"payment_term_name" : {
					"field_name" : "payment_term_name"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"additional_costs_amount" : {
					"field_name" : "additional_costs_amount"
				},
				"additional_costs_details" : {
					"field_name" : "additional_costs_details"
				},
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_person" : {
					"field_name" : "contact_person"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				},
				"is_payable" : {
					"field_name" : "is_payable"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_proforma_amount" : {
					"field_name" : "sale_proforma_amount"
				},
				"sale_proforma_date" : {
					"field_name" : "sale_proforma_date"
				},
				"sale_proforma_id" : {
					"field_name" : "sale_proforma_id"
				},
				"sale_proforma_number" : {
					"field_name" : "sale_proforma_number"
				},
				"sale_proforma_status" : {
					"field_name" : "sale_proforma_status"
				},
				"sale_term_id" : {
					"field_name" : "sale_term_id"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_sale_quote_items" : {
			"view_name" : "vw_sale_quote_items",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"audio_attachments" : {
					"field_name" : "audio_attachments"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"item_price_gross" : {
					"field_name" : "item_price_gross"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"item_unit_quantity" : {
					"field_name" : "item_unit_quantity"
				},
				"linked_sale_invoices" : {
					"field_name" : "linked_sale_invoices"
				},
				"linked_sale_proformas" : {
					"field_name" : "linked_sale_proformas"
				},
				"mini_project_id" : {
					"field_name" : "mini_project_id"
				},
				"project_id" : {
					"field_name" : "project_id"
				},
				"project_stage_id" : {
					"field_name" : "project_stage_id"
				},
				"project_task_id" : {
					"field_name" : "project_task_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_quote_id" : {
					"field_name" : "sale_quote_id"
				},
				"sale_quote_item_id" : {
					"field_name" : "sale_quote_item_id"
				},
				"sale_quote_item_status" : {
					"field_name" : "sale_quote_item_status"
				},
				"sketch_attachments" : {
					"field_name" : "sketch_attachments"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"item_amount" : {
					"field_name" : "item_amount"
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale"
				},
				"sale_quote_number" : {
					"field_name" : "sale_quote_number"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_sale_quotes" : {
			"view_name" : "vw_sale_quotes",
			"view_fields" : {
				"customer_name" : {
					"field_name" : "customer_name"
				},
				"payment_term_name" : {
					"field_name" : "payment_term_name"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"items_count" : {
					"field_name" : "items_count"
				},
				"additional_costs_amount" : {
					"field_name" : "additional_costs_amount"
				},
				"additional_costs_details" : {
					"field_name" : "additional_costs_details"
				},
				"assigned_to" : {
					"field_name" : "assigned_to"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_person" : {
					"field_name" : "contact_person"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"currency_rate" : {
					"field_name" : "currency_rate"
				},
				"customer_id" : {
					"field_name" : "customer_id"
				},
				"is_payable" : {
					"field_name" : "is_payable"
				},
				"linked_sale_invoices" : {
					"field_name" : "linked_sale_invoices"
				},
				"linked_sale_proformas" : {
					"field_name" : "linked_sale_proformas"
				},
				"mini_project_id" : {
					"field_name" : "mini_project_id"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"pricing_group_id" : {
					"field_name" : "pricing_group_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"sale_quote_amount" : {
					"field_name" : "sale_quote_amount"
				},
				"sale_quote_date" : {
					"field_name" : "sale_quote_date"
				},
				"sale_quote_id" : {
					"field_name" : "sale_quote_id"
				},
				"sale_quote_number" : {
					"field_name" : "sale_quote_number"
				},
				"sale_quote_status" : {
					"field_name" : "sale_quote_status"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"total_cost" : {
					"field_name" : "total_cost"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_shipping_companies" : {
			"view_name" : "vw_shipping_companies",
			"view_fields" : {
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"contact_person" : {
					"field_name" : "contact_person"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"fax_details" : {
					"field_name" : "fax_details"
				},
				"fax_values" : {
					"field_name" : "fax_values"
				},
				"legal_details" : {
					"field_name" : "legal_details"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"shipping_company_id" : {
					"field_name" : "shipping_company_id"
				},
				"shipping_company_name" : {
					"field_name" : "shipping_company_name"
				},
				"shipping_company_number" : {
					"field_name" : "shipping_company_number"
				},
				"shipping_company_status" : {
					"field_name" : "shipping_company_status"
				},
				"social_details" : {
					"field_name" : "social_details"
				},
				"website_details" : {
					"field_name" : "website_details"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_stock_audit_items" : {
			"view_name" : "vw_stock_audit_items",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"found_quantity" : {
					"field_name" : "found_quantity"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"stock_audit_id" : {
					"field_name" : "stock_audit_id"
				},
				"stock_audit_item_id" : {
					"field_name" : "stock_audit_item_id"
				},
				"stock_audit_item_status" : {
					"field_name" : "stock_audit_item_status"
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"stock_audit_number" : {
					"field_name" : "stock_audit_number"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"new_inventory_tracking_id" : {
					"field_name" : "new_inventory_tracking_id"
				},
				"new_storage_location_id" : {
					"field_name" : "new_storage_location_id"
				},
				"old_inventory_tracking_id" : {
					"field_name" : "old_inventory_tracking_id"
				},
				"old_storage_location_id" : {
					"field_name" : "old_storage_location_id"
				},
				"original_quantity" : {
					"field_name" : "original_quantity"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id"
				},
				"new_stock_quantity" : {
					"field_name" : "new_stock_quantity"
				},
				"old_stock_quantity" : {
					"field_name" : "old_stock_quantity"
				}
			}
		},
		"vw_stock_audits" : {
			"view_name" : "vw_stock_audits",
			"view_fields" : {
				"items_count" : {
					"field_name" : "items_count"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"employee_code" : {
					"field_name" : "employee_code"
				},
				"location_name" : {
					"field_name" : "location_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"audit_status" : {
					"field_name" : "audit_status"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"performed_by" : {
					"field_name" : "performed_by"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"stock_audit_date" : {
					"field_name" : "stock_audit_date"
				},
				"stock_audit_id" : {
					"field_name" : "stock_audit_id"
				},
				"stock_audit_number" : {
					"field_name" : "stock_audit_number"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_stock_company" : {
			"view_name" : "vw_stock_company",
			"view_fields" : {
				"new_order_quantity" : {
					"field_name" : "new_order_quantity"
				},
				"below_threshold_quantity" : {
					"field_name" : "below_threshold_quantity"
				},
				"below_minimum_quantity" : {
					"field_name" : "below_minimum_quantity"
				},
				"over_stock_quantity" : {
					"field_name" : "over_stock_quantity"
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity"
				},
				"in_order_quantity" : {
					"field_name" : "in_order_quantity"
				},
				"category_name" : {
					"field_name" : "category_name"
				},
				"master_category_id" : {
					"field_name" : "master_category_id"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"barcode_value" : {
					"field_name" : "barcode_value"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"default_vendor_id" : {
					"field_name" : "default_vendor_id"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale"
				},
				"hsnsac_code" : {
					"field_name" : "hsnsac_code"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"is_saleable" : {
					"field_name" : "is_saleable"
				},
				"item_category_id" : {
					"field_name" : "item_category_id"
				},
				"item_description_full" : {
					"field_name" : "item_description_full"
				},
				"item_description_quick" : {
					"field_name" : "item_description_quick"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_image_url" : {
					"field_name" : "item_image_url"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"item_short_name" : {
					"field_name" : "item_short_name"
				},
				"item_number" : {
					"field_name" : "item_number"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_attributes" : {
					"field_name" : "item_attributes"
				},
				"item_price_mrp" : {
					"field_name" : "item_price_mrp"
				},
				"item_price_purchase" : {
					"field_name" : "item_price_purchase"
				},
				"item_price_sale" : {
					"field_name" : "item_price_sale"
				},
				"item_sku" : {
					"field_name" : "item_sku"
				},
				"item_status" : {
					"field_name" : "item_status"
				},
				"item_type" : {
					"field_name" : "item_type"
				},
				"item_unit_purchase" : {
					"field_name" : "item_unit_purchase"
				},
				"item_unit_sale" : {
					"field_name" : "item_unit_sale"
				},
				"item_unit_stock" : {
					"field_name" : "item_unit_stock"
				},
				"quantity_min_order" : {
					"field_name" : "quantity_min_order"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"stock_maximum" : {
					"field_name" : "stock_maximum"
				},
				"stock_minimum" : {
					"field_name" : "stock_minimum"
				},
				"stock_threshold" : {
					"field_name" : "stock_threshold"
				},
				"warranty_expiration_details" : {
					"field_name" : "warranty_expiration_details"
				}
			}
		},
		"vw_stock_location" : {
			"view_name" : "vw_stock_location",
			"view_fields" : {
				"location_id" : {
					"field_name" : "location_id"
				},
				"location_name" : {
					"field_name" : "location_name"
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity"
				},
				"category_name" : {
					"field_name" : "category_name"
				},
				"master_category_id" : {
					"field_name" : "master_category_id"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"barcode_value" : {
					"field_name" : "barcode_value"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"default_vendor_id" : {
					"field_name" : "default_vendor_id"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale"
				},
				"hsnsac_code" : {
					"field_name" : "hsnsac_code"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"is_saleable" : {
					"field_name" : "is_saleable"
				},
				"item_category_id" : {
					"field_name" : "item_category_id"
				},
				"item_description_full" : {
					"field_name" : "item_description_full"
				},
				"item_description_quick" : {
					"field_name" : "item_description_quick"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_image_url" : {
					"field_name" : "item_image_url"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"item_short_name" : {
					"field_name" : "item_short_name"
				},
				"item_number" : {
					"field_name" : "item_number"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_attributes" : {
					"field_name" : "item_attributes"
				},
				"item_price_mrp" : {
					"field_name" : "item_price_mrp"
				},
				"item_price_purchase" : {
					"field_name" : "item_price_purchase"
				},
				"item_price_sale" : {
					"field_name" : "item_price_sale"
				},
				"item_sku" : {
					"field_name" : "item_sku"
				},
				"item_status" : {
					"field_name" : "item_status"
				},
				"item_type" : {
					"field_name" : "item_type"
				},
				"item_unit_purchase" : {
					"field_name" : "item_unit_purchase"
				},
				"item_unit_sale" : {
					"field_name" : "item_unit_sale"
				},
				"item_unit_stock" : {
					"field_name" : "item_unit_stock"
				},
				"quantity_min_order" : {
					"field_name" : "quantity_min_order"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"stock_maximum" : {
					"field_name" : "stock_maximum"
				},
				"stock_minimum" : {
					"field_name" : "stock_minimum"
				},
				"stock_threshold" : {
					"field_name" : "stock_threshold"
				},
				"warranty_expiration_details" : {
					"field_name" : "warranty_expiration_details"
				}
			}
		},
		"vw_stock_storage_location" : {
			"view_name" : "vw_stock_storage_location",
			"view_fields" : {
				"warranty_expiration_details" : {
					"field_name" : "warranty_expiration_details"
				},
				"stock_quantity" : {
					"field_name" : "stock_quantity"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"storage_location_name" : {
					"field_name" : "storage_location_name"
				},
				"storage_location_tree" : {
					"field_name" : "storage_location_tree"
				},
				"location_name" : {
					"field_name" : "location_name"
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id"
				},
				"category_name" : {
					"field_name" : "category_name"
				},
				"master_category_id" : {
					"field_name" : "master_category_id"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"barcode_value" : {
					"field_name" : "barcode_value"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"default_vendor_id" : {
					"field_name" : "default_vendor_id"
				},
				"dimension_purchase" : {
					"field_name" : "dimension_purchase"
				},
				"dimension_sale" : {
					"field_name" : "dimension_sale"
				},
				"hsnsac_code" : {
					"field_name" : "hsnsac_code"
				},
				"item_code" : {
					"field_name" : "item_code"
				},
				"is_saleable" : {
					"field_name" : "is_saleable"
				},
				"item_category_id" : {
					"field_name" : "item_category_id"
				},
				"item_description_full" : {
					"field_name" : "item_description_full"
				},
				"item_description_quick" : {
					"field_name" : "item_description_quick"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_image_url" : {
					"field_name" : "item_image_url"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"item_short_name" : {
					"field_name" : "item_short_name"
				},
				"item_number" : {
					"field_name" : "item_number"
				},
				"item_uoms" : {
					"field_name" : "item_uoms"
				},
				"item_attributes" : {
					"field_name" : "item_attributes"
				},
				"item_price_mrp" : {
					"field_name" : "item_price_mrp"
				},
				"item_price_purchase" : {
					"field_name" : "item_price_purchase"
				},
				"item_price_sale" : {
					"field_name" : "item_price_sale"
				},
				"item_sku" : {
					"field_name" : "item_sku"
				},
				"item_status" : {
					"field_name" : "item_status"
				},
				"item_type" : {
					"field_name" : "item_type"
				},
				"item_unit_purchase" : {
					"field_name" : "item_unit_purchase"
				},
				"item_unit_sale" : {
					"field_name" : "item_unit_sale"
				},
				"item_unit_stock" : {
					"field_name" : "item_unit_stock"
				},
				"quantity_min_order" : {
					"field_name" : "quantity_min_order"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"stock_maximum" : {
					"field_name" : "stock_maximum"
				},
				"stock_minimum" : {
					"field_name" : "stock_minimum"
				},
				"stock_threshold" : {
					"field_name" : "stock_threshold"
				}
			}
		},
		"vw_stock_transfer_items" : {
			"view_name" : "vw_stock_transfer_items",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"destination_inventory_tracking_id" : {
					"field_name" : "destination_inventory_tracking_id"
				},
				"destination_new_stock_quantity" : {
					"field_name" : "destination_new_stock_quantity"
				},
				"destination_old_stock_quantity" : {
					"field_name" : "destination_old_stock_quantity"
				},
				"destination_quantity" : {
					"field_name" : "destination_quantity"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"source_inventory_tracking_id" : {
					"field_name" : "source_inventory_tracking_id"
				},
				"source_new_stock_quantity" : {
					"field_name" : "source_new_stock_quantity"
				},
				"source_old_stock_quantity" : {
					"field_name" : "source_old_stock_quantity"
				},
				"source_quantity" : {
					"field_name" : "source_quantity"
				},
				"stock_transfer_id" : {
					"field_name" : "stock_transfer_id"
				},
				"stock_transfer_item_id" : {
					"field_name" : "stock_transfer_item_id"
				},
				"stock_transfer_item_status" : {
					"field_name" : "stock_transfer_item_status"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"stock_transfer_number" : {
					"field_name" : "stock_transfer_number"
				},
				"new_inventory_tracking_id" : {
					"field_name" : "new_inventory_tracking_id"
				},
				"new_storage_location_id" : {
					"field_name" : "new_storage_location_id"
				},
				"old_inventory_tracking_id" : {
					"field_name" : "old_inventory_tracking_id"
				},
				"old_storage_location_id" : {
					"field_name" : "old_storage_location_id"
				},
				"original_quantity" : {
					"field_name" : "original_quantity"
				},
				"transfer_quantity" : {
					"field_name" : "transfer_quantity"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"new_stock_quantity" : {
					"field_name" : "new_stock_quantity"
				},
				"old_stock_quantity" : {
					"field_name" : "old_stock_quantity"
				}
			}
		},
		"vw_stock_transfers" : {
			"view_name" : "vw_stock_transfers",
			"view_fields" : {
				"items_count" : {
					"field_name" : "items_count"
				},
				"dispatched_by_employee_name" : {
					"field_name" : "dispatched_by_employee_name"
				},
				"asdispatched_by_employee_code" : {
					"field_name" : "asdispatched_by_employee_code"
				},
				"received_by_employee_name" : {
					"field_name" : "received_by_employee_name"
				},
				"received_by_employee_code" : {
					"field_name" : "received_by_employee_code"
				},
				"source_location_name" : {
					"field_name" : "source_location_name"
				},
				"destination_location_name" : {
					"field_name" : "destination_location_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"destination_location_id" : {
					"field_name" : "destination_location_id"
				},
				"dispatch_attachments" : {
					"field_name" : "dispatch_attachments"
				},
				"dispatch_date" : {
					"field_name" : "dispatch_date"
				},
				"dispatch_remarks" : {
					"field_name" : "dispatch_remarks"
				},
				"dispatched_by" : {
					"field_name" : "dispatched_by"
				},
				"receive_attachments" : {
					"field_name" : "receive_attachments"
				},
				"receive_date" : {
					"field_name" : "receive_date"
				},
				"receive_remarks" : {
					"field_name" : "receive_remarks"
				},
				"received_by" : {
					"field_name" : "received_by"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"source_location_id" : {
					"field_name" : "source_location_id"
				},
				"stock_transfer_date" : {
					"field_name" : "stock_transfer_date"
				},
				"stock_transfer_id" : {
					"field_name" : "stock_transfer_id"
				},
				"stock_transfer_number" : {
					"field_name" : "stock_transfer_number"
				},
				"stock_transfer_status" : {
					"field_name" : "stock_transfer_status"
				},
				"trip_id" : {
					"field_name" : "trip_id"
				},
				"performed_by" : {
					"field_name" : "performed_by"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_stock_update_items" : {
			"view_name" : "vw_stock_update_items",
			"view_fields" : {
				"attachments" : {
					"field_name" : "attachments"
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"new_stock_quantity" : {
					"field_name" : "new_stock_quantity"
				},
				"old_stock_quantity" : {
					"field_name" : "old_stock_quantity"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"stock_update_id" : {
					"field_name" : "stock_update_id"
				},
				"stock_update_item_id" : {
					"field_name" : "stock_update_item_id"
				},
				"stock_update_item_status" : {
					"field_name" : "stock_update_item_status"
				},
				"update_quantity" : {
					"field_name" : "update_quantity"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"stock_update_number" : {
					"field_name" : "stock_update_number"
				},
				"new_inventory_tracking_id" : {
					"field_name" : "new_inventory_tracking_id"
				},
				"new_quantity" : {
					"field_name" : "new_quantity"
				},
				"new_storage_location_id" : {
					"field_name" : "new_storage_location_id"
				},
				"old_inventory_tracking_id" : {
					"field_name" : "old_inventory_tracking_id"
				},
				"old_storage_location_id" : {
					"field_name" : "old_storage_location_id"
				},
				"original_quantity" : {
					"field_name" : "original_quantity"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_stock_updates" : {
			"view_name" : "vw_stock_updates",
			"view_fields" : {
				"items_count" : {
					"field_name" : "items_count"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"employee_code" : {
					"field_name" : "employee_code"
				},
				"location_name" : {
					"field_name" : "location_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"performed_by" : {
					"field_name" : "performed_by"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"stock_update_date" : {
					"field_name" : "stock_update_date"
				},
				"stock_update_id" : {
					"field_name" : "stock_update_id"
				},
				"stock_update_number" : {
					"field_name" : "stock_update_number"
				},
				"stock_update_reason" : {
					"field_name" : "stock_update_reason"
				},
				"stock_update_status" : {
					"field_name" : "stock_update_status"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_storage_locations" : {
			"view_name" : "vw_storage_locations",
			"view_fields" : {
				"location_name" : {
					"field_name" : "location_name"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"parent_storage_location_id" : {
					"field_name" : "parent_storage_location_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"storage_image_url" : {
					"field_name" : "storage_image_url"
				},
				"storage_location_id" : {
					"field_name" : "storage_location_id"
				},
				"storage_location_name" : {
					"field_name" : "storage_location_name"
				},
				"storage_location_number" : {
					"field_name" : "storage_location_number"
				},
				"storage_location_status" : {
					"field_name" : "storage_location_status"
				},
				"storage_location_tree" : {
					"field_name" : "storage_location_tree"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_transactions" : {
			"view_name" : "vw_transactions",
			"view_fields" : {
				"account_debit_name" : {
					"field_name" : "account_debit_name"
				},
				"account_credit_name" : {
					"field_name" : "account_credit_name"
				},
				"amount_debit" : {
					"field_name" : "amount_debit"
				},
				"amount_credit" : {
					"field_name" : "amount_credit"
				},
				"account_credit_id" : {
					"field_name" : "account_credit_id"
				},
				"account_debit_id" : {
					"field_name" : "account_debit_id"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contra_id" : {
					"field_name" : "contra_id"
				},
				"contra_type" : {
					"field_name" : "contra_type"
				},
				"parent_transaction_id" : {
					"field_name" : "parent_transaction_id"
				},
				"person_associated" : {
					"field_name" : "person_associated"
				},
				"reference_number" : {
					"field_name" : "reference_number"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"transaction_amount" : {
					"field_name" : "transaction_amount"
				},
				"transaction_date" : {
					"field_name" : "transaction_date"
				},
				"transaction_details" : {
					"field_name" : "transaction_details"
				},
				"transaction_id" : {
					"field_name" : "transaction_id"
				},
				"transaction_narration" : {
					"field_name" : "transaction_narration"
				},
				"transaction_number" : {
					"field_name" : "transaction_number"
				},
				"transaction_status" : {
					"field_name" : "transaction_status"
				},
				"transaction_sub_type" : {
					"field_name" : "transaction_sub_type"
				},
				"transaction_type" : {
					"field_name" : "transaction_type"
				},
				"payment_method_code" : {
					"field_name" : "payment_method_code"
				},
				"tax_name" : {
					"field_name" : "tax_name"
				},
				"id" : {
					"field_name" : "id"
				},
				"payment_method_id" : {
					"field_name" : "payment_method_id"
				},
				"tax_rate" : {
					"field_name" : "tax_rate"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				}
			}
		},
		"vw_unloading_container_packing_list_items" : {
			"view_name" : "vw_unloading_container_packing_list_items",
			"view_fields" : {
				"packing_list_id" : {
					"field_name" : "packing_list_id"
				},
				"packing_list_number" : {
					"field_name" : "packing_list_number"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"container_id" : {
					"field_name" : "container_id"
				},
				"item_quantity" : {
					"field_name" : "item_quantity"
				},
				"item_unit" : {
					"field_name" : "item_unit"
				},
				"container_attachments" : {
					"field_name" : "container_attachments"
				},
				"container_item_status" : {
					"field_name" : "container_item_status"
				},
				"item_description" : {
					"field_name" : "item_description"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"container_number" : {
					"field_name" : "container_number"
				},
				"arrived_quantity" : {
					"field_name" : "arrived_quantity"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"container_item_id" : {
					"field_name" : "container_item_id"
				},
				"damaged_attachments" : {
					"field_name" : "damaged_attachments"
				},
				"damaged_audio_attachments" : {
					"field_name" : "damaged_audio_attachments"
				},
				"damaged_quantity" : {
					"field_name" : "damaged_quantity"
				},
				"damaged_remarks" : {
					"field_name" : "damaged_remarks"
				},
				"inventory_tracking_id" : {
					"field_name" : "inventory_tracking_id"
				},
				"item_link_id" : {
					"field_name" : "item_link_id"
				},
				"packing_list_item_id" : {
					"field_name" : "packing_list_item_id"
				},
				"purchase_container_packing_id" : {
					"field_name" : "purchase_container_packing_id"
				},
				"quantity_used" : {
					"field_name" : "quantity_used"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"unloading_attachments" : {
					"field_name" : "unloading_attachments"
				},
				"unloading_audio_recordings" : {
					"field_name" : "unloading_audio_recordings"
				},
				"unloading_remarks" : {
					"field_name" : "unloading_remarks"
				},
				"unloading_status" : {
					"field_name" : "unloading_status"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_users" : {
			"view_name" : "vw_users",
			"view_fields" : {
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"bank_details" : {
					"field_name" : "bank_details"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"date_arrival" : {
					"field_name" : "date_arrival"
				},
				"date_birth" : {
					"field_name" : "date_birth"
				},
				"date_joining" : {
					"field_name" : "date_joining"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"employee_code" : {
					"field_name" : "employee_code"
				},
				"employee_designation" : {
					"field_name" : "employee_designation"
				},
				"employee_id" : {
					"field_name" : "employee_id"
				},
				"employee_image_url" : {
					"field_name" : "employee_image_url"
				},
				"employee_number" : {
					"field_name" : "employee_number"
				},
				"employee_skills" : {
					"field_name" : "employee_skills"
				},
				"employee_status" : {
					"field_name" : "employee_status"
				},
				"first_name" : {
					"field_name" : "first_name"
				},
				"gender" : {
					"field_name" : "gender"
				},
				"last_name" : {
					"field_name" : "last_name"
				},
				"legal_details" : {
					"field_name" : "legal_details"
				},
				"legal_employee_designation" : {
					"field_name" : "legal_employee_designation"
				},
				"legal_salary_amount" : {
					"field_name" : "legal_salary_amount"
				},
				"middle_name" : {
					"field_name" : "middle_name"
				},
				"nationality" : {
					"field_name" : "nationality"
				},
				"passport_details" : {
					"field_name" : "passport_details"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"salary_amount" : {
					"field_name" : "salary_amount"
				},
				"social_details" : {
					"field_name" : "social_details"
				},
				"visa_details" : {
					"field_name" : "visa_details"
				},
				"user_id" : {
					"field_name" : "user_id"
				},
				"password" : {
					"field_name" : "password"
				},
				"access_group_id" : {
					"field_name" : "access_group_id"
				},
				"username" : {
					"field_name" : "username"
				},
				"sidebar_menu_id" : {
					"field_name" : "sidebar_menu_id"
				},
				"location_id" : {
					"field_name" : "location_id"
				},
				"asset_id" : {
					"field_name" : "asset_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				},
				"access_group_name" : {
					"field_name" : "access_group_name"
				},
				"access_rights" : {
					"field_name" : "access_rights"
				},
				"sidebar_menu_name" : {
					"field_name" : "sidebar_menu_name"
				},
				"sidebar_menu_json" : {
					"field_name" : "sidebar_menu_json"
				},
				"location_name" : {
					"field_name" : "location_name"
				},
				"asset_name" : {
					"field_name" : "asset_name"
				},
				"employee_name" : {
					"field_name" : "employee_name"
				},
				"account_id" : {
					"field_name" : "account_id"
				}
			}
		},
		"vw_vendor_items" : {
			"view_name" : "vw_vendor_items",
			"view_fields" : {
				"item_short_name" : {
					"field_name" : "item_short_name"
				},
				"item_name" : {
					"field_name" : "item_name"
				},
				"category_name" : {
					"field_name" : "category_name"
				},
				"barcode_value" : {
					"field_name" : "barcode_value"
				},
				"item_number" : {
					"field_name" : "item_number"
				},
				"item_sku" : {
					"field_name" : "item_sku"
				},
				"item_status" : {
					"field_name" : "item_status"
				},
				"item_type" : {
					"field_name" : "item_type"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"vendor_category" : {
					"field_name" : "vendor_category"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"item_id" : {
					"field_name" : "item_id"
				},
				"item_price" : {
					"field_name" : "item_price"
				},
				"last_price" : {
					"field_name" : "last_price"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vendor_item_code" : {
					"field_name" : "vendor_item_code"
				},
				"vendor_item_id" : {
					"field_name" : "vendor_item_id"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_vendor_payments_summary" : {
			"view_name" : "vw_vendor_payments_summary",
			"view_fields" : {
				"purchase_term_name" : {
					"field_name" : "purchase_term_name"
				},
				"account_id" : {
					"field_name" : "account_id"
				},
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"bank_details" : {
					"field_name" : "bank_details"
				},
				"business_type" : {
					"field_name" : "business_type"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_name" : {
					"field_name" : "contact_name"
				},
				"credit_amount" : {
					"field_name" : "credit_amount"
				},
				"credit_days" : {
					"field_name" : "credit_days"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"dock_id" : {
					"field_name" : "dock_id"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"fax_details" : {
					"field_name" : "fax_details"
				},
				"fax_values" : {
					"field_name" : "fax_values"
				},
				"legal_details" : {
					"field_name" : "legal_details"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"social_details" : {
					"field_name" : "social_details"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"vendor_category" : {
					"field_name" : "vendor_category"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vendor_image_url" : {
					"field_name" : "vendor_image_url"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"vendor_number" : {
					"field_name" : "vendor_number"
				},
				"vendor_status" : {
					"field_name" : "vendor_status"
				},
				"website_details" : {
					"field_name" : "website_details"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"total_order_amount" : {
					"field_name" : "total_order_amount"
				},
				"total_order_paid_amount" : {
					"field_name" : "total_order_paid_amount"
				},
				"total_order_pending_amount" : {
					"field_name" : "total_order_pending_amount"
				},
				"orders_count" : {
					"field_name" : "orders_count"
				},
				"total_proforma_amount" : {
					"field_name" : "total_proforma_amount"
				},
				"total_proforma_paid_amount" : {
					"field_name" : "total_proforma_paid_amount"
				},
				"total_proforma_pending_amount" : {
					"field_name" : "total_proforma_pending_amount"
				},
				"proformas_count" : {
					"field_name" : "proformas_count"
				},
				"total_commercial_amount" : {
					"field_name" : "total_commercial_amount"
				},
				"total_commercial_paid_amount" : {
					"field_name" : "total_commercial_paid_amount"
				},
				"total_commercial_pending_amount" : {
					"field_name" : "total_commercial_pending_amount"
				},
				"commercials_count" : {
					"field_name" : "commercials_count"
				},
				"total_invoice_amount" : {
					"field_name" : "total_invoice_amount"
				},
				"total_invoice_paid_amount" : {
					"field_name" : "total_invoice_paid_amount"
				},
				"total_invoice_pending_amount" : {
					"field_name" : "total_invoice_pending_amount"
				},
				"invoices_count" : {
					"field_name" : "invoices_count"
				},
				"total_amount" : {
					"field_name" : "total_amount"
				},
				"total_paid_amount" : {
					"field_name" : "total_paid_amount"
				},
				"total_pending_amount" : {
					"field_name" : "total_pending_amount"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_vendors" : {
			"view_name" : "vw_vendors",
			"view_fields" : {
				"purchase_term_name" : {
					"field_name" : "purchase_term_name"
				},
				"account_id" : {
					"field_name" : "account_id"
				},
				"address_details" : {
					"field_name" : "address_details"
				},
				"attachments" : {
					"field_name" : "attachments"
				},
				"bank_details" : {
					"field_name" : "bank_details"
				},
				"business_type" : {
					"field_name" : "business_type"
				},
				"company_id" : {
					"field_name" : "company_id"
				},
				"contact_name" : {
					"field_name" : "contact_name"
				},
				"credit_amount" : {
					"field_name" : "credit_amount"
				},
				"credit_days" : {
					"field_name" : "credit_days"
				},
				"currency_code" : {
					"field_name" : "currency_code"
				},
				"dock_id" : {
					"field_name" : "dock_id"
				},
				"email_details" : {
					"field_name" : "email_details"
				},
				"email_values" : {
					"field_name" : "email_values"
				},
				"fax_details" : {
					"field_name" : "fax_details"
				},
				"fax_values" : {
					"field_name" : "fax_values"
				},
				"legal_details" : {
					"field_name" : "legal_details"
				},
				"payment_terms_id" : {
					"field_name" : "payment_terms_id"
				},
				"phone_details" : {
					"field_name" : "phone_details"
				},
				"phone_values" : {
					"field_name" : "phone_values"
				},
				"purchase_term_id" : {
					"field_name" : "purchase_term_id"
				},
				"remarks" : {
					"field_name" : "remarks"
				},
				"social_details" : {
					"field_name" : "social_details"
				},
				"tax_id" : {
					"field_name" : "tax_id"
				},
				"vendor_category" : {
					"field_name" : "vendor_category"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				},
				"vendor_image_url" : {
					"field_name" : "vendor_image_url"
				},
				"vendor_name" : {
					"field_name" : "vendor_name"
				},
				"vendor_number" : {
					"field_name" : "vendor_number"
				},
				"vendor_status" : {
					"field_name" : "vendor_status"
				},
				"website_details" : {
					"field_name" : "website_details"
				},
				"website_values" : {
					"field_name" : "website_values"
				},
				"created_on" : {
					"field_name" : "created_on"
				},
				"modified_on" : {
					"field_name" : "modified_on"
				}
			}
		},
		"vw_vendors_commercial_payments_summary" : {
			"view_name" : "vw_vendors_commercial_payments_summary",
			"view_fields" : {
				"total_commercial_amount" : {
					"field_name" : "total_commercial_amount"
				},
				"total_commercial_paid_amount" : {
					"field_name" : "total_commercial_paid_amount"
				},
				"total_commercial_pending_amount" : {
					"field_name" : "total_commercial_pending_amount"
				},
				"commercials_count" : {
					"field_name" : "commercials_count"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				}
			}
		},
		"vw_vendors_invoice_payments_summary" : {
			"view_name" : "vw_vendors_invoice_payments_summary",
			"view_fields" : {
				"total_invoice_amount" : {
					"field_name" : "total_invoice_amount"
				},
				"total_invoice_paid_amount" : {
					"field_name" : "total_invoice_paid_amount"
				},
				"total_invoice_pending_amount" : {
					"field_name" : "total_invoice_pending_amount"
				},
				"invoices_count" : {
					"field_name" : "invoices_count"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				}
			}
		},
		"vw_vendors_order_payments_summary" : {
			"view_name" : "vw_vendors_order_payments_summary",
			"view_fields" : {
				"total_order_amount" : {
					"field_name" : "total_order_amount"
				},
				"total_order_paid_amount" : {
					"field_name" : "total_order_paid_amount"
				},
				"total_order_pending_amount" : {
					"field_name" : "total_order_pending_amount"
				},
				"orders_count" : {
					"field_name" : "orders_count"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				}
			}
		},
		"vw_vendors_proforma_payments_summary" : {
			"view_name" : "vw_vendors_proforma_payments_summary",
			"view_fields" : {
				"total_proforma_amount" : {
					"field_name" : "total_proforma_amount"
				},
				"total_proforma_paid_amount" : {
					"field_name" : "total_proforma_paid_amount"
				},
				"total_proforma_pending_amount" : {
					"field_name" : "total_proforma_pending_amount"
				},
				"proformas_count" : {
					"field_name" : "proformas_count"
				},
				"vendor_id" : {
					"field_name" : "vendor_id"
				}
			}
		}
	},
	"triggers" : {
		"trg_set_amount_on_purchase_commercial_items_delete" : {
			"trigger_name" : "trg_set_amount_on_purchase_commercial_items_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_commercial_invoice_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_commercial_invoices SET commercial_invoice_amount = (SELECT SUM(item_amount) FROM vw_purchase_commercial_invoice_items WHERE commercial_invoice_id = OLD.commercial_invoice_id) WHERE commercial_invoice_id = OLD.commercial_invoice_id;"
		},
		"trg_set_amount_on_purchase_commercial_items_insert" : {
			"trigger_name" : "trg_set_amount_on_purchase_commercial_items_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_commercial_invoice_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_commercial_invoices SET commercial_invoice_amount = (SELECT SUM(item_amount) FROM vw_purchase_commercial_invoice_items WHERE commercial_invoice_id = NEW.commercial_invoice_id) WHERE commercial_invoice_id = NEW.commercial_invoice_id;"
		},
		"trg_set_amount_on_purchase_commercial_items_update" : {
			"trigger_name" : "trg_set_amount_on_purchase_commercial_items_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_commercial_invoice_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_commercial_invoices SET commercial_invoice_amount = (SELECT SUM(item_amount) FROM vw_purchase_commercial_invoice_items WHERE commercial_invoice_id = OLD.commercial_invoice_id) WHERE commercial_invoice_id = OLD.commercial_invoice_id;UPDATE purchase_commercial_invoices SET commercial_invoice_amount = (SELECT SUM(item_amount) FROM vw_purchase_commercial_invoice_items WHERE commercial_invoice_id = NEW.commercial_invoice_id) WHERE commercial_invoice_id = NEW.commercial_invoice_id;"
		},
		"trg_set_amount_on_purchase_invoice_items_delete" : {
			"trigger_name" : "trg_set_amount_on_purchase_invoice_items_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_invoice_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_invoices SET invoice_amount = (SELECT SUM(item_amount) FROM vw_purchase_invoice_items WHERE invoice_id = OLD.invoice_id) WHERE invoice_id = OLD.invoice_id;"
		},
		"trg_set_amount_on_purchase_invoice_items_insert" : {
			"trigger_name" : "trg_set_amount_on_purchase_invoice_items_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_invoice_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_invoices SET invoice_amount = (SELECT SUM(item_amount) FROM vw_purchase_invoice_items WHERE invoice_id = NEW.invoice_id) WHERE invoice_id = NEW.invoice_id;"
		},
		"trg_set_amount_on_purchase_invoice_items_update" : {
			"trigger_name" : "trg_set_amount_on_purchase_invoice_items_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_invoice_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_invoices SET invoice_amount = (SELECT SUM(item_amount) FROM vw_purchase_invoice_items WHERE invoice_id = OLD.invoice_id) WHERE invoice_id = OLD.invoice_id;UPDATE purchase_invoices SET invoice_amount = (SELECT SUM(item_amount) FROM vw_purchase_invoice_items WHERE invoice_id = NEW.invoice_id) WHERE invoice_id = NEW.invoice_id;"
		},
		"trg_set_amount_on_purchase_order_item_delete" : {
			"trigger_name" : "trg_set_amount_on_purchase_order_item_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_order_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_orders SET order_amount = (SELECT SUM(item_amount) FROM vw_purchase_order_items WHERE order_id = OLD.order_id) WHERE order_id = OLD.order_id;"
		},
		"trg_set_amount_on_purchase_order_item_insert" : {
			"trigger_name" : "trg_set_amount_on_purchase_order_item_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_order_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_orders SET order_amount = (SELECT SUM(item_amount) FROM vw_purchase_order_items WHERE order_id = NEW.order_id) WHERE order_id = NEW.order_id;"
		},
		"trg_set_amount_on_purchase_order_item_update" : {
			"trigger_name" : "trg_set_amount_on_purchase_order_item_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_order_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_orders SET order_amount = (SELECT SUM(item_amount) FROM vw_purchase_order_items WHERE order_id = OLD.order_id) WHERE order_id = OLD.order_id;UPDATE purchase_orders SET order_amount = (SELECT SUM(item_amount) FROM vw_purchase_order_items WHERE order_id = NEW.order_id) WHERE order_id = NEW.order_id;"
		},
		"trg_set_amount_on_purchase_proforma_items_delete" : {
			"trigger_name" : "trg_set_amount_on_purchase_proforma_items_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_proforma_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_proformas SET proforma_amount = (SELECT SUM(item_amount) FROM vw_purchase_proforma_items WHERE proforma_id = OLD.proforma_id) WHERE proforma_id = OLD.proforma_id;"
		},
		"trg_set_amount_on_purchase_proforma_items_insert" : {
			"trigger_name" : "trg_set_amount_on_purchase_proforma_items_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_proforma_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_proformas SET proforma_amount = (SELECT SUM(item_amount) FROM vw_purchase_proforma_items WHERE proforma_id = NEW.proforma_id) WHERE proforma_id = NEW.proforma_id;"
		},
		"trg_set_amount_on_purchase_proforma_items_update" : {
			"trigger_name" : "trg_set_amount_on_purchase_proforma_items_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_proforma_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_proformas SET proforma_amount = (SELECT SUM(item_amount) FROM vw_purchase_proforma_items WHERE proforma_id = OLD.proforma_id) WHERE proforma_id = OLD.proforma_id;UPDATE purchase_proformas SET proforma_amount = (SELECT SUM(item_amount) FROM vw_purchase_proforma_items WHERE proforma_id = NEW.proforma_id) WHERE proforma_id = NEW.proforma_id;"
		},
		"trg_set_amount_on_sale_invoice_items_delete" : {
			"trigger_name" : "trg_set_amount_on_sale_invoice_items_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "sale_invoice_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE sale_invoices SET sale_invoice_amount = (SELECT SUM(item_amount) FROM vw_sale_invoice_items WHERE sale_invoice_id = OLD.sale_invoice_id) WHERE sale_invoice_id = OLD.sale_invoice_id;"
		},
		"trg_set_amount_on_sale_invoice_items_insert" : {
			"trigger_name" : "trg_set_amount_on_sale_invoice_items_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "sale_invoice_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE sale_invoices SET sale_invoice_amount = (SELECT SUM(item_amount) FROM vw_sale_invoice_items WHERE sale_invoice_id = NEW.sale_invoice_id) WHERE sale_invoice_id = NEW.sale_invoice_id;"
		},
		"trg_set_amount_on_sale_invoice_items_update" : {
			"trigger_name" : "trg_set_amount_on_sale_invoice_items_update",
			"trigger_execution" : "AFTER",
			"table_name" : "sale_invoice_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE sale_invoices SET sale_invoice_amount = (SELECT SUM(item_amount) FROM vw_sale_invoice_items WHERE sale_invoice_id = OLD.sale_invoice_id) WHERE sale_invoice_id = OLD.sale_invoice_id;UPDATE sale_invoices SET sale_invoice_amount = (SELECT SUM(item_amount) FROM vw_sale_invoice_items WHERE sale_invoice_id = NEW.sale_invoice_id) WHERE sale_invoice_id = NEW.sale_invoice_id;"
		},
		"trg_set_amount_on_sale_proforma_items_delete" : {
			"trigger_name" : "trg_set_amount_on_sale_proforma_items_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "sale_proforma_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE sale_proformas SET sale_proforma_amount = (SELECT SUM(item_amount) FROM vw_sale_proforma_items WHERE sale_proforma_id = OLD.sale_proforma_id) WHERE sale_proforma_id = OLD.sale_proforma_id;"
		},
		"trg_set_amount_on_sale_proforma_items_insert" : {
			"trigger_name" : "trg_set_amount_on_sale_proforma_items_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "sale_proforma_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE sale_proformas SET sale_proforma_amount = (SELECT SUM(item_amount) FROM vw_sale_proforma_items WHERE sale_proforma_id = NEW.sale_proforma_id) WHERE sale_proforma_id = NEW.sale_proforma_id;"
		},
		"trg_set_amount_on_sale_proforma_items_update" : {
			"trigger_name" : "trg_set_amount_on_sale_proforma_items_update",
			"trigger_execution" : "AFTER",
			"table_name" : "sale_proforma_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE sale_proformas SET sale_proforma_amount = (SELECT SUM(item_amount) FROM vw_sale_proforma_items WHERE sale_proforma_id = OLD.sale_proforma_id) WHERE sale_proforma_id = OLD.sale_proforma_id;UPDATE sale_proformas SET sale_proforma_amount = (SELECT SUM(item_amount) FROM vw_sale_proforma_items WHERE sale_proforma_id = NEW.sale_proforma_id) WHERE sale_proforma_id = NEW.sale_proforma_id;"
		},
		"trg_set_amount_on_sale_quote_items_delete" : {
			"trigger_name" : "trg_set_amount_on_sale_quote_items_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "sale_quote_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE sale_quotes SET sale_quote_amount = (SELECT SUM(item_amount) FROM vw_sale_quote_items WHERE sale_quote_id = OLD.sale_quote_id) WHERE sale_quote_id = OLD.sale_quote_id;"
		},
		"trg_set_amount_on_sale_quote_items_insert" : {
			"trigger_name" : "trg_set_amount_on_sale_quote_items_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "sale_quote_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE sale_quotes SET sale_quote_amount = (SELECT SUM(item_amount) FROM vw_sale_quote_items WHERE sale_quote_id = NEW.sale_quote_id) WHERE sale_quote_id = NEW.sale_quote_id;"
		},
		"trg_set_amount_on_sale_quote_items_update" : {
			"trigger_name" : "trg_set_amount_on_sale_quote_items_update",
			"trigger_execution" : "AFTER",
			"table_name" : "sale_quote_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE sale_quotes SET sale_quote_amount = (SELECT SUM(item_amount) FROM vw_sale_quote_items WHERE sale_quote_id = OLD.sale_quote_id) WHERE sale_quote_id = OLD.sale_quote_id;UPDATE sale_quotes SET sale_quote_amount = (SELECT SUM(item_amount) FROM vw_sale_quote_items WHERE sale_quote_id = NEW.sale_quote_id) WHERE sale_quote_id = NEW.sale_quote_id;"
		},
		"trg_set_purchase_commercial_and_invoice_numbers_on_delete" : {
			"trigger_name" : "trg_set_purchase_commercial_and_invoice_numbers_on_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_commercial_invoices_purchase_invoices_link_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_commercial_invoice_items SET invoices_linked = (SELECT linked_purchase_invoices FROM vw_linked_purchase_invoices_with_commercial_items WHERE commercial_invoice_item_id = purchase_commercial_invoice_items.commercial_invoice_item_id) WHERE commercial_invoice_item_id = OLD.purchase_commercial_invoice_item_id;UPDATE purchase_commercial_invoices SET invoices_linked = (SELECT linked_purchase_invoices FROM vw_linked_purchase_invoices_with_commercials WHERE commercial_invoice_id = purchase_commercial_invoices.commercial_invoice_id) WHERE commercial_invoice_id IN (SELECT commercial_invoice_id FROM purchase_commercial_invoice_items WHERE commercial_invoice_item_id = OLD.purchase_commercial_invoice_item_id);UPDATE purchase_invoice_items SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_invoice_items WHERE invoice_item_id = purchase_invoice_items.invoice_item_id) WHERE invoice_item_id = OLD.purchase_invoice_item_id;UPDATE purchase_invoices SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_invoices WHERE invoice_id = purchase_invoices.invoice_id) WHERE invoice_id IN (SELECT invoice_id FROM purchase_invoice_items WHERE invoice_item_id = OLD.purchase_invoice_item_id);"
		},
		"trg_set_purchase_commercial_and_invoice_numbers_on_insert" : {
			"trigger_name" : "trg_set_purchase_commercial_and_invoice_numbers_on_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_commercial_invoices_purchase_invoices_link_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_commercial_invoice_items SET invoices_linked = (SELECT linked_purchase_invoices FROM vw_linked_purchase_invoices_with_commercial_items WHERE commercial_invoice_item_id = purchase_commercial_invoice_items.commercial_invoice_item_id) WHERE commercial_invoice_item_id = NEW.purchase_commercial_invoice_item_id;UPDATE purchase_commercial_invoices SET invoices_linked = (SELECT linked_purchase_invoices FROM vw_linked_purchase_invoices_with_commercials WHERE commercial_invoice_id = purchase_commercial_invoices.commercial_invoice_id) WHERE commercial_invoice_id IN (SELECT commercial_invoice_id FROM purchase_commercial_invoice_items WHERE commercial_invoice_item_id = NEW.purchase_commercial_invoice_item_id);UPDATE purchase_invoice_items SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_invoice_items WHERE invoice_item_id = purchase_invoice_items.invoice_item_id) WHERE invoice_item_id = NEW.purchase_invoice_item_id;UPDATE purchase_invoices SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_invoices WHERE invoice_id = purchase_invoices.invoice_id) WHERE invoice_id IN (SELECT invoice_id FROM purchase_invoice_items WHERE invoice_item_id = NEW.purchase_invoice_item_id);"
		},
		"trg_set_purchase_commercial_and_invoice_numbers_on_update" : {
			"trigger_name" : "trg_set_purchase_commercial_and_invoice_numbers_on_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_commercial_invoices_purchase_invoices_link_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_commercial_invoice_items SET invoices_linked = (SELECT linked_purchase_invoices FROM vw_linked_purchase_invoices_with_commercial_items WHERE commercial_invoice_item_id = purchase_commercial_invoice_items.commercial_invoice_item_id) WHERE commercial_invoice_item_id = OLD.purchase_commercial_invoice_item_id;UPDATE purchase_commercial_invoices SET invoices_linked = (SELECT linked_purchase_invoices FROM vw_linked_purchase_invoices_with_commercials WHERE commercial_invoice_id = purchase_commercial_invoices.commercial_invoice_id) WHERE commercial_invoice_id IN (SELECT commercial_invoice_id FROM purchase_commercial_invoice_items WHERE commercial_invoice_item_id = OLD.purchase_commercial_invoice_item_id);UPDATE purchase_invoice_items SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_invoice_items WHERE invoice_item_id = purchase_invoice_items.invoice_item_id) WHERE invoice_item_id = OLD.purchase_invoice_item_id;UPDATE purchase_invoices SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_invoices WHERE invoice_id = purchase_invoices.invoice_id) WHERE invoice_id IN (SELECT invoice_id FROM purchase_invoice_items WHERE invoice_item_id = OLD.purchase_invoice_item_id);UPDATE purchase_commercial_invoice_items SET invoices_linked = (SELECT linked_purchase_invoices FROM vw_linked_purchase_invoices_with_commercial_items WHERE commercial_invoice_item_id = purchase_commercial_invoice_items.commercial_invoice_item_id) WHERE commercial_invoice_item_id = NEW.purchase_commercial_invoice_item_id;UPDATE purchase_commercial_invoices SET invoices_linked = (SELECT linked_purchase_invoices FROM vw_linked_purchase_invoices_with_commercials WHERE commercial_invoice_id = purchase_commercial_invoices.commercial_invoice_id) WHERE commercial_invoice_id IN (SELECT commercial_invoice_id FROM purchase_commercial_invoice_items WHERE commercial_invoice_item_id = NEW.purchase_commercial_invoice_item_id);UPDATE purchase_invoice_items SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_invoice_items WHERE invoice_item_id = purchase_invoice_items.invoice_item_id) WHERE invoice_item_id = OLD.purchase_invoice_item_id;UPDATE purchase_invoices SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_invoices WHERE invoice_id = purchase_invoices.invoice_id) WHERE invoice_id IN (SELECT invoice_id FROM purchase_invoice_items WHERE invoice_item_id = NEW.purchase_invoice_item_id);"
		},
		"trg_set_purchase_containers_and_packings_numbers_on_delete" : {
			"trigger_name" : "trg_set_purchase_containers_and_packings_numbers_on_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_containers_purchase_packing_lists_link_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_container_items SET packings_linked = (SELECT linked_purchase_packing_lists FROM vw_linked_purchase_packings_with_container_items WHERE container_item_id = purchase_container_items.container_item_id) WHERE container_item_id = OLD.purchase_container_item_id;UPDATE purchase_containers SET packings_linked = (SELECT linked_purchase_packing_lists FROM vw_linked_purchase_packings_with_containers WHERE container_id = purchase_containers.container_id) WHERE container_id IN (SELECT container_id FROM purchase_container_items WHERE container_item_id = OLD.purchase_container_item_id);UPDATE purchase_packing_list_items SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_packing_items WHERE packing_list_item_id = purchase_packing_list_items.packing_list_item_id) WHERE packing_list_item_id = OLD.purchase_packing_list_item_id;UPDATE purchase_packing_lists SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_packings WHERE packing_list_id = purchase_packing_lists.packing_list_id) WHERE packing_list_id IN (SELECT packing_list_id FROM purchase_packing_list_items WHERE packing_list_item_id = OLD.purchase_packing_list_item_id);"
		},
		"trg_set_purchase_containers_and_packings_numbers_on_insert" : {
			"trigger_name" : "trg_set_purchase_containers_and_packings_numbers_on_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_containers_purchase_packing_lists_link_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_container_items SET packings_linked = (SELECT linked_purchase_packing_lists FROM vw_linked_purchase_packings_with_container_items WHERE container_item_id = purchase_container_items.container_item_id) WHERE container_item_id = NEW.purchase_container_item_id;UPDATE purchase_containers SET packings_linked = (SELECT linked_purchase_packing_lists FROM vw_linked_purchase_packings_with_containers WHERE container_id = purchase_containers.container_id) WHERE container_id IN (SELECT container_id FROM purchase_container_items WHERE container_item_id = NEW.purchase_container_item_id);UPDATE purchase_packing_list_items SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_packing_items WHERE packing_list_item_id = purchase_packing_list_items.packing_list_item_id) WHERE packing_list_item_id = NEW.purchase_packing_list_item_id;UPDATE purchase_packing_lists SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_packings WHERE packing_list_id = purchase_packing_lists.packing_list_id) WHERE packing_list_id IN (SELECT packing_list_id FROM purchase_packing_list_items WHERE packing_list_item_id = NEW.purchase_packing_list_item_id);"
		},
		"trg_set_purchase_containers_and_packings_numbers_on_update" : {
			"trigger_name" : "trg_set_purchase_containers_and_packings_numbers_on_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_containers_purchase_packing_lists_link_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_container_items SET packings_linked = (SELECT linked_purchase_packing_lists FROM vw_linked_purchase_packings_with_container_items WHERE container_item_id = purchase_container_items.container_item_id) WHERE container_item_id = OLD.purchase_container_item_id;UPDATE purchase_containers SET packings_linked = (SELECT linked_purchase_packing_lists FROM vw_linked_purchase_packings_with_containers WHERE container_id = purchase_containers.container_id) WHERE container_id IN (SELECT container_id FROM purchase_container_items WHERE container_item_id = OLD.purchase_container_item_id);UPDATE purchase_packing_list_items SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_packing_items WHERE packing_list_item_id = purchase_packing_list_items.packing_list_item_id) WHERE packing_list_item_id = OLD.purchase_packing_list_item_id;UPDATE purchase_packing_lists SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_packings WHERE packing_list_id = purchase_packing_lists.packing_list_id) WHERE packing_list_id IN (SELECT packing_list_id FROM purchase_packing_list_items WHERE packing_list_item_id = OLD.purchase_packing_list_item_id);UPDATE purchase_container_items SET packings_linked = (SELECT linked_purchase_packing_lists FROM vw_linked_purchase_packings_with_container_items WHERE container_item_id = purchase_container_items.container_item_id) WHERE container_item_id = NEW.purchase_container_item_id;UPDATE purchase_containers SET packings_linked = (SELECT linked_purchase_packing_lists FROM vw_linked_purchase_packings_with_containers WHERE container_id = purchase_containers.container_id) WHERE container_id IN (SELECT container_id FROM purchase_container_items WHERE container_item_id = NEW.purchase_container_item_id);UPDATE purchase_packing_list_items SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_packing_items WHERE packing_list_item_id = purchase_packing_list_items.packing_list_item_id) WHERE packing_list_item_id = NEW.purchase_packing_list_item_id;UPDATE purchase_packing_lists SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_packings WHERE packing_list_id = purchase_packing_lists.packing_list_id) WHERE packing_list_id IN (SELECT packing_list_id FROM purchase_packing_list_items WHERE packing_list_item_id = NEW.purchase_packing_list_item_id);"
		},
		"trg_set_purchase_material_and_request_numbers_on_delete" : {
			"trigger_name" : "trg_set_purchase_material_and_request_numbers_on_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "material_requests_purchase_requests_link_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_request_items SET material_requests_linked = (SELECT linked_material_requests FROM vw_linked_purchase_material_requests_with_request_items WHERE request_item_id = purchase_request_items.request_item_id) WHERE request_item_id=OLD.purchase_request_item_id;UPDATE purchase_requests SET material_requests_linked = (SELECT linked_material_requests FROM vw_linked_purchase_material_requests_with_requests WHERE request_id = purchase_requests.request_id) WHERE request_id IN (SELECT request_id FROM purchase_request_items WHERE request_item_id =  OLD.purchase_request_item_id);UPDATE material_requests SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_material_requests WHERE material_request_id = material_requests.material_request_id) WHERE material_request_id = OLD.material_request_id;"
		},
		"trg_set_purchase_material_and_request_numbers_on_insert" : {
			"trigger_name" : "trg_set_purchase_material_and_request_numbers_on_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "material_requests_purchase_requests_link_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_request_items SET material_requests_linked = (SELECT linked_material_requests FROM vw_linked_purchase_material_requests_with_request_items WHERE request_item_id = purchase_request_items.request_item_id) WHERE request_item_id=NEW.purchase_request_item_id;UPDATE purchase_requests SET material_requests_linked = (SELECT linked_material_requests FROM vw_linked_purchase_material_requests_with_requests WHERE request_id = purchase_requests.request_id) WHERE request_id IN (SELECT request_id FROM purchase_request_items WHERE request_item_id =  NEW.purchase_request_item_id);UPDATE material_requests SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_material_requests WHERE material_request_id = material_requests.material_request_id) WHERE material_request_id = NEW.material_request_id;"
		},
		"trg_set_purchase_material_and_request_numbers_on_update" : {
			"trigger_name" : "trg_set_purchase_material_and_request_numbers_on_update",
			"trigger_execution" : "AFTER",
			"table_name" : "material_requests_purchase_requests_link_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_request_items SET material_requests_linked = (SELECT linked_material_requests FROM vw_linked_purchase_material_requests_with_request_items WHERE request_item_id = purchase_request_items.request_item_id) WHERE request_item_id=OLD.purchase_request_item_id;UPDATE purchase_requests SET material_requests_linked = (SELECT linked_material_requests FROM vw_linked_purchase_material_requests_with_requests WHERE request_id = purchase_requests.request_id) WHERE request_id IN (SELECT request_id FROM purchase_request_items WHERE request_item_id =  OLD.purchase_request_item_id);UPDATE material_requests SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_material_requests WHERE material_request_id = material_requests.material_request_id) WHERE material_request_id = OLD.material_request_id;UPDATE purchase_request_items SET material_requests_linked = (SELECT linked_material_requests FROM vw_linked_purchase_material_requests_with_request_items WHERE request_item_id = purchase_request_items.request_item_id) WHERE request_item_id=NEW.purchase_request_item_id;UPDATE purchase_requests SET material_requests_linked = (SELECT linked_material_requests FROM vw_linked_purchase_material_requests_with_requests WHERE request_id = purchase_requests.request_id) WHERE request_id IN (SELECT request_id FROM purchase_request_items WHERE request_item_id =  NEW.purchase_request_item_id);UPDATE material_requests SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_material_requests WHERE material_request_id = material_requests.material_request_id) WHERE material_request_id = NEW.material_request_id;"
		},
		"trg_set_purchase_order_and_proforma_numbers_on_delete" : {
			"trigger_name" : "trg_set_purchase_order_and_proforma_numbers_on_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_orders_purchase_proformas_link_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_order_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_order_items WHERE order_item_id = purchase_order_items.order_item_id) WHERE order_item_id = OLD.purchase_order_item_id;UPDATE purchase_orders SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_orders WHERE order_id = purchase_orders.order_id) WHERE order_id IN (SELECT order_id FROM purchase_order_items WHERE order_item_id = OLD.purchase_order_item_id);UPDATE purchase_proforma_items SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = OLD.purchase_proforma_item_id;UPDATE purchase_proformas SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = OLD.purchase_proforma_item_id);"
		},
		"trg_set_purchase_order_and_proforma_numbers_on_insert" : {
			"trigger_name" : "trg_set_purchase_order_and_proforma_numbers_on_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_orders_purchase_proformas_link_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_order_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_order_items WHERE order_item_id = purchase_order_items.order_item_id) WHERE order_item_id = NEW.purchase_order_item_id;UPDATE purchase_orders SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_orders WHERE order_id = purchase_orders.order_id) WHERE order_id IN (SELECT order_id FROM purchase_order_items WHERE order_item_id = NEW.purchase_order_item_id);UPDATE purchase_proforma_items SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = NEW.purchase_proforma_item_id;UPDATE purchase_proformas SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = NEW.purchase_proforma_item_id);"
		},
		"trg_set_purchase_order_and_proforma_numbers_on_update" : {
			"trigger_name" : "trg_set_purchase_order_and_proforma_numbers_on_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_orders_purchase_proformas_link_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_order_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_order_items WHERE order_item_id = purchase_order_items.order_item_id) WHERE order_item_id = OLD.purchase_order_item_id;UPDATE purchase_orders SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_orders WHERE order_id = purchase_orders.order_id) WHERE order_id IN (SELECT order_id FROM purchase_order_items WHERE order_item_id = OLD.purchase_order_item_id);UPDATE purchase_proforma_items SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = OLD.purchase_proforma_item_id;UPDATE purchase_proformas SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = OLD.purchase_proforma_item_id);UPDATE purchase_order_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_order_items WHERE order_item_id = purchase_order_items.order_item_id) WHERE order_item_id = NEW.purchase_order_item_id;UPDATE purchase_orders SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_orders WHERE order_id = purchase_orders.order_id) WHERE order_id IN (SELECT order_id FROM purchase_order_items WHERE order_item_id = NEW.purchase_order_item_id);UPDATE purchase_proforma_items SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = NEW.purchase_proforma_item_id;UPDATE purchase_proformas SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = NEW.purchase_proforma_item_id);"
		},
		"trg_set_purchase_proforma_and_commercial_numbers_on_delete" : {
			"trigger_name" : "trg_set_purchase_proforma_and_commercial_numbers_on_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_proformas_purchase_commercial_invoices_link_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_proforma_items SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = OLD.purchase_proforma_item_id;UPDATE purchase_proformas SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = OLD.purchase_proforma_item_id);UPDATE purchase_commercial_invoice_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_commercial_items WHERE commercial_invoice_item_id = purchase_commercial_invoice_items.commercial_invoice_item_id) WHERE commercial_invoice_item_id = OLD.purchase_commercial_invoice_item_id;UPDATE purchase_commercial_invoices SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_commercials WHERE commercial_invoice_id = purchase_commercial_invoices.commercial_invoice_id) WHERE commercial_invoice_id IN (SELECT commercial_invoice_id FROM purchase_commercial_invoice_items WHERE commercial_invoice_item_id = OLD.purchase_commercial_invoice_item_id);"
		},
		"trg_set_purchase_proforma_and_commercial_numbers_on_insert" : {
			"trigger_name" : "trg_set_purchase_proforma_and_commercial_numbers_on_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_proformas_purchase_commercial_invoices_link_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_proforma_items SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = NEW.purchase_proforma_item_id;UPDATE purchase_proformas SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = NEW.purchase_proforma_item_id);UPDATE purchase_commercial_invoice_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_commercial_items WHERE commercial_invoice_item_id = purchase_commercial_invoice_items.commercial_invoice_item_id) WHERE commercial_invoice_item_id = NEW.purchase_commercial_invoice_item_id;UPDATE purchase_commercial_invoices SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_commercials WHERE commercial_invoice_id = purchase_commercial_invoices.commercial_invoice_id) WHERE commercial_invoice_id IN (SELECT commercial_invoice_id FROM purchase_commercial_invoice_items WHERE commercial_invoice_item_id = NEW.purchase_commercial_invoice_item_id);"
		},
		"trg_set_purchase_proforma_and_commercial_numbers_on_update" : {
			"trigger_name" : "trg_set_purchase_proforma_and_commercial_numbers_on_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_proformas_purchase_commercial_invoices_link_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_proforma_items SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = OLD.purchase_proforma_item_id;UPDATE purchase_proformas SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = OLD.purchase_proforma_item_id);UPDATE purchase_commercial_invoice_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_commercial_items WHERE commercial_invoice_item_id = purchase_commercial_invoice_items.commercial_invoice_item_id) WHERE commercial_invoice_item_id = OLD.purchase_commercial_invoice_item_id;UPDATE purchase_commercial_invoices SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_commercials WHERE commercial_invoice_id = purchase_commercial_invoices.commercial_invoice_id) WHERE commercial_invoice_id IN (SELECT commercial_invoice_id FROM purchase_commercial_invoice_items WHERE commercial_invoice_item_id = OLD.purchase_commercial_invoice_item_id);UPDATE purchase_proforma_items SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = NEW.purchase_proforma_item_id;UPDATE purchase_proformas SET commercials_linked = (SELECT linked_purchase_commercial_invoices FROM vw_linked_purchase_commercials_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = NEW.purchase_proforma_item_id);UPDATE purchase_commercial_invoice_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_commercial_items WHERE commercial_invoice_item_id = purchase_commercial_invoice_items.commercial_invoice_item_id) WHERE commercial_invoice_item_id = NEW.purchase_commercial_invoice_item_id;UPDATE purchase_commercial_invoices SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_commercials WHERE commercial_invoice_id = purchase_commercial_invoices.commercial_invoice_id) WHERE commercial_invoice_id IN (SELECT commercial_invoice_id FROM purchase_commercial_invoice_items WHERE commercial_invoice_item_id = NEW.purchase_commercial_invoice_item_id);"
		},
		"trg_set_purchase_proforma_and_container_numbers_on_delete" : {
			"trigger_name" : "trg_set_purchase_proforma_and_container_numbers_on_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_proformas_purchase_containers_link_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_proforma_items SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = OLD.purchase_proforma_item_id;UPDATE purchase_proformas SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = OLD.purchase_proforma_item_id);UPDATE purchase_container_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_container_items WHERE container_item_id = purchase_container_items.container_item_id) WHERE container_item_id = OLD.purchase_container_item_id;UPDATE purchase_containers SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_containers WHERE container_id = purchase_containers.container_id) WHERE container_id IN (SELECT container_id FROM purchase_container_items WHERE container_item_id = OLD.purchase_container_item_id);"
		},
		"trg_set_purchase_proforma_and_container_numbers_on_indert" : {
			"trigger_name" : "trg_set_purchase_proforma_and_container_numbers_on_indert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_proformas_purchase_containers_link_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_proforma_items SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = NEW.purchase_proforma_item_id;UPDATE purchase_proformas SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = NEW.purchase_proforma_item_id);UPDATE purchase_container_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_container_items WHERE container_item_id = purchase_container_items.container_item_id) WHERE container_item_id = NEW.purchase_container_item_id;UPDATE purchase_containers SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_containers WHERE container_id = purchase_containers.container_id) WHERE container_id IN (SELECT container_id FROM purchase_container_items WHERE container_item_id = NEW.purchase_container_item_id);"
		},
		"trg_set_purchase_proforma_and_container_numbers_on_update" : {
			"trigger_name" : "trg_set_purchase_proforma_and_container_numbers_on_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_proformas_purchase_containers_link_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_proforma_items SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = OLD.purchase_proforma_item_id;UPDATE purchase_proformas SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = OLD.purchase_proforma_item_id);UPDATE purchase_container_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_container_items WHERE container_item_id = purchase_container_items.container_item_id) WHERE container_item_id = OLD.purchase_container_item_id;UPDATE purchase_containers SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_containers WHERE container_id = purchase_containers.container_id) WHERE container_id IN (SELECT container_id FROM purchase_container_items WHERE container_item_id = OLD.purchase_container_item_id);UPDATE purchase_proforma_items SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_proforma_items WHERE proforma_item_id = purchase_proforma_items.proforma_item_id) WHERE proforma_item_id = NEW.purchase_proforma_item_id;UPDATE purchase_proformas SET containers_linked = (SELECT linked_purchase_containers FROM vw_linked_purchase_containers_with_proformas WHERE proforma_id = purchase_proformas.proforma_id) WHERE proforma_id IN (SELECT proforma_id FROM purchase_proforma_items WHERE proforma_item_id = NEW.purchase_proforma_item_id);UPDATE purchase_container_items SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_container_items WHERE container_item_id = purchase_container_items.container_item_id) WHERE container_item_id = NEW.purchase_container_item_id;UPDATE purchase_containers SET proformas_linked = (SELECT linked_purchase_proformas FROM vw_linked_purchase_proformas_with_containers WHERE container_id = purchase_containers.container_id) WHERE container_id IN (SELECT container_id FROM purchase_container_items WHERE container_item_id = NEW.purchase_container_item_id);"
		},
		"trg_set_purchase_quote_and_order_numbers_on_delete" : {
			"trigger_name" : "trg_set_purchase_quote_and_order_numbers_on_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_quote_vendors_purchase_orders_link_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_quote_items SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quote_items WHERE quote_item_id = purchase_quote_items.quote_item_id) WHERE quote_item_id IN (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = OLD.purchase_quote_vendor_item_id);UPDATE purchase_quotes SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quotes WHERE quote_id = purchase_quotes.quote_id) WHERE quote_id IN (SELECT quote_id FROM purchase_quote_items WHERE quote_item_id = (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = OLD.purchase_quote_vendor_item_id));UPDATE purchase_order_items SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_order_items WHERE order_item_id = purchase_order_items.order_item_id) WHERE order_item_id = OLD.purchase_order_item_id;UPDATE purchase_orders SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_orders WHERE order_id = purchase_orders.order_id) WHERE order_id IN (SELECT order_id FROM purchase_order_items WHERE order_item_id = OLD.purchase_order_item_id);"
		},
		"trg_set_purchase_quote_and_order_numbers_on_insert" : {
			"trigger_name" : "trg_set_purchase_quote_and_order_numbers_on_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_quote_vendors_purchase_orders_link_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_quote_items SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quote_items WHERE quote_item_id = purchase_quote_items.quote_item_id) WHERE quote_item_id IN (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = NEW.purchase_quote_vendor_item_id);UPDATE purchase_quotes SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quotes WHERE quote_id = purchase_quotes.quote_id) WHERE quote_id IN (SELECT quote_id FROM purchase_quote_items WHERE quote_item_id = (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = NEW.purchase_quote_vendor_item_id));UPDATE purchase_order_items SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_order_items WHERE order_item_id = purchase_order_items.order_item_id) WHERE order_item_id = NEW.purchase_order_item_id;UPDATE purchase_orders SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_orders WHERE order_id = purchase_orders.order_id) WHERE order_id IN (SELECT order_id FROM purchase_order_items WHERE order_item_id = NEW.purchase_order_item_id);"
		},
		"trg_set_purchase_quote_and_order_numbers_on_update" : {
			"trigger_name" : "trg_set_purchase_quote_and_order_numbers_on_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_quote_vendors_purchase_orders_link_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_quote_items SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quote_items WHERE quote_item_id = purchase_quote_items.quote_item_id) WHERE quote_item_id IN (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = OLD.purchase_quote_vendor_item_id);UPDATE purchase_quotes SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quotes WHERE quote_id = purchase_quotes.quote_id) WHERE quote_id IN (SELECT quote_id FROM purchase_quote_items WHERE quote_item_id = (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = OLD.purchase_quote_vendor_item_id));UPDATE purchase_quote_items SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quote_items WHERE quote_item_id = purchase_quote_items.quote_item_id) WHERE quote_item_id IN (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = NEW.purchase_quote_vendor_item_id);UPDATE purchase_quotes SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quotes WHERE quote_id = purchase_quotes.quote_id) WHERE quote_id IN (SELECT quote_id FROM purchase_quote_items WHERE quote_item_id = (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = NEW.purchase_quote_vendor_item_id));UPDATE purchase_quote_items SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quote_items WHERE quote_item_id = purchase_quote_items.quote_item_id) WHERE quote_item_id IN (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = NEW.purchase_quote_vendor_item_id);UPDATE purchase_quotes SET orders_linked = (SELECT linked_purchase_orders FROM vw_linked_purchase_orders_with_quotes WHERE quote_id = purchase_quotes.quote_id) WHERE quote_id IN (SELECT quote_id FROM purchase_quote_items WHERE quote_item_id = (SELECT quote_item_id FROM purchase_quote_vendor_items WHERE quote_vendor_item_id = NEW.purchase_quote_vendor_item_id));UPDATE purchase_order_items SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_order_items WHERE order_item_id = purchase_order_items.order_item_id) WHERE order_item_id = NEW.purchase_order_item_id;UPDATE purchase_orders SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_orders WHERE order_id = purchase_orders.order_id) WHERE order_id IN (SELECT order_id FROM purchase_order_items WHERE order_item_id = NEW.purchase_order_item_id);"
		},
		"trg_set_purchase_request_and_quote_numbers_on_delete" : {
			"trigger_name" : "trg_set_purchase_request_and_quote_numbers_on_delete",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_requests_purchase_quotes_link_items",
			"row_operation" : "DELETE",
			"trigger_code" : "UPDATE purchase_request_items SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_request_items WHERE request_item_id = purchase_request_items.request_item_id) WHERE request_item_id=OLD.purchase_request_item_id;UPDATE purchase_requests SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_requests WHERE request_id = purchase_requests.request_id) WHERE request_id IN (SELECT request_id FROM purchase_request_items WHERE request_item_id = OLD.purchase_request_item_id);UPDATE purchase_quote_items SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_quote_items WHERE quote_item_id = purchase_quote_items.quote_item_id) WHERE quote_item_id=OLD.purchase_quote_item_id;UPDATE purchase_quotes SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_quotes WHERE quote_id = purchase_quotes.quote_id) WHERE quote_id IN (SELECT quote_id FROM purchase_quote_items WHERE quote_item_id = OLD.purchase_quote_item_id);"
		},
		"trg_set_purchase_request_and_quote_numbers_on_insert" : {
			"trigger_name" : "trg_set_purchase_request_and_quote_numbers_on_insert",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_requests_purchase_quotes_link_items",
			"row_operation" : "INSERT",
			"trigger_code" : "UPDATE purchase_request_items SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_request_items WHERE request_item_id = purchase_request_items.request_item_id) WHERE request_item_id=NEW.purchase_request_item_id;UPDATE purchase_requests SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_requests WHERE request_id = purchase_requests.request_id) WHERE request_id IN (SELECT request_id FROM purchase_request_items WHERE request_item_id = NEW.purchase_request_item_id);UPDATE purchase_quote_items SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_quote_items WHERE quote_item_id = purchase_quote_items.quote_item_id) WHERE quote_item_id=NEW.purchase_quote_item_id;UPDATE purchase_quotes SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_quotes WHERE quote_id = purchase_quotes.quote_id) WHERE quote_id IN (SELECT quote_id FROM purchase_quote_items WHERE quote_item_id = NEW.purchase_quote_item_id);"
		},
		"trg_set_purchase_request_and_quote_numbers_on_update" : {
			"trigger_name" : "trg_set_purchase_request_and_quote_numbers_on_update",
			"trigger_execution" : "AFTER",
			"table_name" : "purchase_requests_purchase_quotes_link_items",
			"row_operation" : "UPDATE",
			"trigger_code" : "UPDATE purchase_request_items SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_request_items WHERE request_item_id = purchase_request_items.request_item_id) WHERE request_item_id=OLD.purchase_request_item_id;UPDATE purchase_requests SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_requests WHERE request_id = purchase_requests.request_id) WHERE request_id IN (SELECT request_id FROM purchase_request_items WHERE request_item_id = OLD.purchase_request_item_id);UPDATE purchase_quote_items SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_quote_items WHERE quote_item_id = purchase_quote_items.quote_item_id) WHERE quote_item_id=OLD.purchase_quote_item_id;UPDATE purchase_quotes SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_quotes WHERE quote_id = purchase_quotes.quote_id) WHERE quote_id IN (SELECT quote_id FROM purchase_quote_items WHERE quote_item_id = OLD.purchase_quote_item_id);UPDATE purchase_request_items SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_request_items WHERE request_item_id = purchase_request_items.request_item_id) WHERE request_item_id=NEW.purchase_request_item_id;UPDATE purchase_requests SET quotes_linked = (SELECT linked_purchase_quotes FROM vw_linked_purchase_quotes_with_requests WHERE request_id = purchase_requests.request_id) WHERE request_id IN (SELECT request_id FROM purchase_request_items WHERE request_item_id = NEW.purchase_request_item_id);UPDATE purchase_quote_items SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_quote_items WHERE quote_item_id = purchase_quote_items.quote_item_id) WHERE quote_item_id=NEW.purchase_quote_item_id;UPDATE purchase_quotes SET requests_linked = (SELECT linked_purchase_requests FROM vw_linked_purchase_requests_with_quotes WHERE quote_id = purchase_quotes.quote_id) WHERE quote_id IN (SELECT quote_id FROM purchase_quote_items WHERE quote_item_id = NEW.purchase_quote_item_id);"
		}
	},
	"relationships" : {
		"access_groups" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "access_groups",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"access_rights" : {
			"access_group_id" : {
				"access_groups" : {
					"access_group_id" : {
						"destination_field" : "access_group_id",
						"destination_table" : "access_rights",
						"source_field" : "access_group_id",
						"source_table" : "access_groups"
					}
				}
			}
		},
		"accounts" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "accounts",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"parent_account_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "parent_account_id",
						"destination_table" : "accounts",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			}
		},
		"asset_attributes" : {
			"asset_id" : {
				"assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "asset_attributes",
						"source_field" : "asset_id",
						"source_table" : "assets"
					}
				}
			}
		},
		"asset_depreciations" : {
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "asset_depreciations",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "asset_depreciations",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"asset_id" : {
				"assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "asset_depreciations",
						"source_field" : "asset_id",
						"source_table" : "assets"
					}
				}
			}
		},
		"asset_items" : {
			"asset_id" : {
				"assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "asset_items",
						"source_field" : "asset_id",
						"source_table" : "assets"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "asset_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "asset_items",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"asset_maintenance" : {
			"asset_id" : {
				"assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "asset_maintenance",
						"source_field" : "asset_id",
						"source_table" : "assets"
					}
				}
			}
		},
		"asset_maintenance_expenses" : {
			"asset_maintenance_id" : {
				"asset_maintenance" : {
					"asset_maintenance_id" : {
						"destination_field" : "asset_maintenance_id",
						"destination_table" : "asset_maintenance_expenses",
						"source_field" : "asset_maintenance_id",
						"source_table" : "asset_maintenance"
					}
				}
			}
		},
		"asset_requests" : {
			"trip_id" : {
				"trips" : {
					"trip_id" : {
						"destination_field" : "trip_id",
						"destination_table" : "asset_requests",
						"source_field" : "trip_id",
						"source_table" : "trips"
					}
				}
			},
			"asset_id" : {
				"assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "asset_requests",
						"source_field" : "asset_id",
						"source_table" : "assets"
					}
				}
			}
		},
		"assets" : {
			"company_id" : {
				"accounts" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "assets",
						"source_field" : "company_id",
						"source_table" : "accounts"
					}
				}
			},
			"account_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "account_id",
						"destination_table" : "assets",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			}
		},
		"automated_task_logs" : {
			"automated_task_id" : {
				"automated_tasks" : {
					"automated_task_id" : {
						"destination_field" : "automated_task_id",
						"destination_table" : "automated_task_logs",
						"source_field" : "automated_task_id",
						"source_table" : "automated_tasks"
					}
				}
			}
		},
		"checklist_items" : {
			"checklist_id" : {
				"checklists" : {
					"checklist_id" : {
						"destination_field" : "checklist_id",
						"destination_table" : "checklist_items",
						"source_field" : "checklist_id",
						"source_table" : "checklists"
					}
				}
			}
		},
		"coupon_issues" : {
			"coupon_id" : {
				"coupons" : {
					"coupon_id" : {
						"destination_field" : "coupon_id",
						"destination_table" : "coupon_issues",
						"source_field" : "coupon_id",
						"source_table" : "coupons"
					}
				}
			}
		},
		"coupon_uses" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "coupon_uses",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"coupon_issue_id" : {
				"coupon_issues" : {
					"coupon_issue_id" : {
						"destination_field" : "coupon_issue_id",
						"destination_table" : "coupon_uses",
						"source_field" : "coupon_issue_id",
						"source_table" : "coupon_issues"
					}
				}
			},
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "coupon_uses",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			}
		},
		"coupons" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "coupons",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"currency_rate_updates" : {
			"currency_code" : {
				"currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "currency_rate_updates",
						"source_field" : "currency_code",
						"source_table" : "currencies"
					}
				}
			}
		},
		"customer_contracts" : {
			"customer_id" : {
				"customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "customer_contracts",
						"source_field" : "customer_id",
						"source_table" : "customers"
					}
				}
			}
		},
		"customers" : {
			"account_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "account_id",
						"destination_table" : "customers",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "customers",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"dock_id" : {
				"docks" : {
					"dock_id" : {
						"destination_field" : "dock_id",
						"destination_table" : "customers",
						"source_field" : "dock_id",
						"source_table" : "docks"
					}
				}
			},
			"sale_term_id" : {
				"sale_terms" : {
					"sale_term_id" : {
						"destination_field" : "sale_term_id",
						"destination_table" : "customers",
						"source_field" : "sale_term_id",
						"source_table" : "sale_terms"
					}
				}
			},
			"tax_id" : {
				"taxes" : {
					"tax_id" : {
						"destination_field" : "tax_id",
						"destination_table" : "customers",
						"source_field" : "tax_id",
						"source_table" : "taxes"
					}
				}
			},
			"payment_terms_id" : {
				"payment_terms" : {
					"payment_term_id" : {
						"destination_field" : "payment_terms_id",
						"destination_table" : "customers",
						"source_field" : "payment_term_id",
						"source_table" : "payment_terms"
					}
				}
			},
			"pricing_group_id" : {
				"pricing_groups" : {
					"pricing_group_id" : {
						"destination_field" : "pricing_group_id",
						"destination_table" : "customers",
						"source_field" : "pricing_group_id",
						"source_table" : "pricing_groups"
					}
				}
			}
		},
		"devices" : {
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "devices",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			},
			"asset_id" : {
				"assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "devices",
						"source_field" : "asset_id",
						"source_table" : "assets"
					}
				}
			},
			"user_id" : {
				"users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "devices",
						"source_field" : "user_id",
						"source_table" : "users"
					}
				}
			},
			"authorized_by" : {
				"users" : {
					"user_id" : {
						"destination_field" : "authorized_by",
						"destination_table" : "devices",
						"source_field" : "user_id",
						"source_table" : "users"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "devices",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"document_expenses" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "document_expenses",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"payment_method_id" : {
				"payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "document_expenses",
						"source_field" : "payment_method_id",
						"source_table" : "payment_methods"
					}
				}
			},
			"expense_account_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "expense_account_id",
						"destination_table" : "document_expenses",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			}
		},
		"document_payments" : {
			"payment_method_id" : {
				"payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "document_payments",
						"source_field" : "payment_method_id",
						"source_table" : "payment_methods"
					}
				}
			},
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "document_payments",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "document_payments",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"employee_assets" : {
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "employee_assets",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "employee_assets",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"asset_id" : {
				"assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "employee_assets",
						"source_field" : "asset_id",
						"source_table" : "assets"
					}
				}
			}
		},
		"employee_contracts" : {
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "employee_contracts",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "employee_contracts",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"employee_hiring_drives" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "employee_hiring_drives",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"employee_hirings" : {
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "employee_hirings",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"hiring_drive_id" : {
				"employee_hiring_drives" : {
					"hiring_drive_id" : {
						"destination_field" : "hiring_drive_id",
						"destination_table" : "employee_hirings",
						"source_field" : "hiring_drive_id",
						"source_table" : "employee_hiring_drives"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "employee_hirings",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"employee_leaves" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "employee_leaves",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"approved_by" : {
				"users" : {
					"user_id" : {
						"destination_field" : "approved_by",
						"destination_table" : "employee_leaves",
						"source_field" : "user_id",
						"source_table" : "users"
					}
				}
			},
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "employee_leaves",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"attendance_id" : {
				"employee_attendance" : {
					"attendance_id" : {
						"destination_field" : "attendance_id",
						"destination_table" : "employee_leaves",
						"source_field" : "attendance_id",
						"source_table" : "employee_attendance"
					}
				}
			}
		},
		"employee_loan_installments" : {
			"loan_id" : {
				"employee_loans" : {
					"loan_id" : {
						"destination_field" : "loan_id",
						"destination_table" : "employee_loan_installments",
						"source_field" : "loan_id",
						"source_table" : "employee_loans"
					}
				}
			}
		},
		"employee_loans" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "employee_loans",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "employee_loans",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "employee_loans",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			}
		},
		"employee_raises" : {
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "employee_raises",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "employee_raises",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"employee_requirements" : {
			"hiring_drive_id" : {
				"employee_hiring_drives" : {
					"hiring_drive_id" : {
						"destination_field" : "hiring_drive_id",
						"destination_table" : "employee_requirements",
						"source_field" : "hiring_drive_id",
						"source_table" : "employee_hiring_drives"
					}
				}
			}
		},
		"employees" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "employees",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"account_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "account_id",
						"destination_table" : "employees",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			}
		},
		"expenses" : {
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "expenses",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			},
			"payment_method_id" : {
				"payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "expenses",
						"source_field" : "payment_method_id",
						"source_table" : "payment_methods"
					}
				}
			},
			"expense_account_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "expense_account_id",
						"destination_table" : "expenses",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "expenses",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"hiring_adverts" : {
			"hiring_drive_id" : {
				"employee_hiring_drives" : {
					"hiring_drive_id" : {
						"destination_field" : "hiring_drive_id",
						"destination_table" : "hiring_adverts",
						"source_field" : "hiring_drive_id",
						"source_table" : "employee_hiring_drives"
					}
				}
			},
			"payment_method_id" : {
				"payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "hiring_adverts",
						"source_field" : "payment_method_id",
						"source_table" : "payment_methods"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "hiring_adverts",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "hiring_adverts",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			}
		},
		"incomes" : {
			"payment_method_id" : {
				"payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "incomes",
						"source_field" : "payment_method_id",
						"source_table" : "payment_methods"
					}
				}
			},
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "incomes",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			},
			"income_account_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "income_account_id",
						"destination_table" : "incomes",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "incomes",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"inventory_tracking_quantities" : {
			"item_batch_id" : {
				"item_batches" : {
					"item_batch_id" : {
						"destination_field" : "item_batch_id",
						"destination_table" : "inventory_tracking_quantities",
						"source_field" : "item_batch_id",
						"source_table" : "item_batches"
					}
				}
			},
			"storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "inventory_tracking_quantities",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			},
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "inventory_tracking_quantities",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			}
		},
		"inventory_trackings" : {
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "inventory_trackings",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"item_categories" : {
			"parent_category_id" : {
				"item_categories" : {
					"category_id" : {
						"destination_field" : "parent_category_id",
						"destination_table" : "item_categories",
						"source_field" : "category_id",
						"source_table" : "item_categories"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "item_categories",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"item_inward_storages" : {
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "item_inward_storages",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "item_inward_storages",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			}
		},
		"item_location_price" : {
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "item_location_price",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			}
		},
		"item_outward_storages" : {
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "item_outward_storages",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "item_outward_storages",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			}
		},
		"item_parts" : {
			"part_item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "part_item_id",
						"destination_table" : "item_parts",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "item_parts",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"items" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "items",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"default_vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "default_vendor_id",
						"destination_table" : "items",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			},
			"item_category_id" : {
				"item_categories" : {
					"category_id" : {
						"destination_field" : "item_category_id",
						"destination_table" : "items",
						"source_field" : "category_id",
						"source_table" : "item_categories"
					}
				}
			}
		},
		"landing_price_items" : {
			"landing_price_id" : {
				"landing_prices" : {
					"landing_price_id" : {
						"destination_field" : "landing_price_id",
						"destination_table" : "landing_price_items",
						"source_field" : "landing_price_id",
						"source_table" : "landing_prices"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "landing_price_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"landing_prices" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "landing_prices",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "landing_prices",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			}
		},
		"lift_assets" : {
			"asset_id" : {
				"assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "lift_assets",
						"source_field" : "asset_id",
						"source_table" : "assets"
					}
				}
			},
			"lift_id" : {
				"lifts" : {
					"lift_id" : {
						"destination_field" : "lift_id",
						"destination_table" : "lift_assets",
						"source_field" : "lift_id",
						"source_table" : "lifts"
					}
				}
			}
		},
		"lifts" : {
			"trip_id" : {
				"trips" : {
					"trip_id" : {
						"destination_field" : "trip_id",
						"destination_table" : "lifts",
						"source_field" : "trip_id",
						"source_table" : "trips"
					}
				}
			}
		},
		"locations" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "locations",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"log" : {
			"user_id" : {
				"users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "log",
						"source_field" : "user_id",
						"source_table" : "users"
					}
				}
			}
		},
		"material_requests" : {
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "material_requests",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"delivered_by" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "delivered_by",
						"destination_table" : "material_requests",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"pickup_location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "pickup_location_id",
						"destination_table" : "material_requests",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			},
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "material_requests",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"delivery_signature_id" : {
				"signatures" : {
					"signature_id" : {
						"destination_field" : "delivery_signature_id",
						"destination_table" : "material_requests",
						"source_field" : "signature_id",
						"source_table" : "signatures"
					}
				}
			},
			"delivery_location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "delivery_location_id",
						"destination_table" : "material_requests",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			},
			"trip_id" : {
				"trips" : {
					"trip_id" : {
						"destination_field" : "trip_id",
						"destination_table" : "material_requests",
						"source_field" : "trip_id",
						"source_table" : "trips"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "material_requests",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "material_requests",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"membership_cards" : {
			"pricing_group_id" : {
				"pricing_groups" : {
					"pricing_group_id" : {
						"destination_field" : "pricing_group_id",
						"destination_table" : "membership_cards",
						"source_field" : "pricing_group_id",
						"source_table" : "pricing_groups"
					}
				}
			},
			"customer_id" : {
				"customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "membership_cards",
						"source_field" : "customer_id",
						"source_table" : "customers"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "membership_cards",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"payment_method_id" : {
				"payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "membership_cards",
						"source_field" : "payment_method_id",
						"source_table" : "payment_methods"
					}
				}
			},
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "membership_cards",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			}
		},
		"membership_types" : {
			"pricing_group_id" : {
				"pricing_groups" : {
					"pricing_group_id" : {
						"destination_field" : "pricing_group_id",
						"destination_table" : "membership_types",
						"source_field" : "pricing_group_id",
						"source_table" : "pricing_groups"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "membership_types",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"notes" : {
			"user_id" : {
				"users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "notes",
						"source_field" : "user_id",
						"source_table" : "users"
					}
				}
			}
		},
		"notifications" : {
			"user_id" : {
				"users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "notifications",
						"source_field" : "user_id",
						"source_table" : "users"
					}
				}
			}
		},
		"offer_items" : {
			"offer_id" : {
				"offers" : {
					"offer_id" : {
						"destination_field" : "offer_id",
						"destination_table" : "offer_items",
						"source_field" : "offer_id",
						"source_table" : "offers"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "offer_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"offers" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "offers",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"payment_methods" : {
			"account_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "account_id",
						"destination_table" : "payment_methods",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "payment_methods",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"payment_terms" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "payment_terms",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"pricing_group_items" : {
			"pricing_group_id" : {
				"pricing_groups" : {
					"pricing_group_id" : {
						"destination_field" : "pricing_group_id",
						"destination_table" : "pricing_group_items",
						"source_field" : "pricing_group_id",
						"source_table" : "pricing_groups"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "pricing_group_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"pricing_groups" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "pricing_groups",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"project_service_inputs" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "project_service_inputs",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"project_service_input_group_id" : {
				"project_service_input_groups" : {
					"project_service_input_group_id" : {
						"destination_field" : "project_service_input_group_id",
						"destination_table" : "project_service_inputs",
						"source_field" : "project_service_input_group_id",
						"source_table" : "project_service_input_groups"
					}
				}
			}
		},
		"project_services" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "project_services",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"project_template_tasks" : {
			"project_template_id" : {
				"project_templates" : {
					"project_template_id" : {
						"destination_field" : "project_template_id",
						"destination_table" : "project_template_tasks",
						"source_field" : "project_template_id",
						"source_table" : "project_templates"
					}
				}
			}
		},
		"purchase_commercial_invoice_items" : {
			"commercial_invoice_id" : {
				"purchase_commercial_invoices" : {
					"commercial_invoice_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "commercial_invoice_id",
						"destination_table" : "purchase_commercial_invoice_items",
						"source_field" : "commercial_invoice_id",
						"source_table" : "purchase_commercial_invoices"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "purchase_commercial_invoice_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"purchase_commercial_invoice_links" : {
			"commercial_invoice_item_id" : {
				"purchase_commercial_invoice_items" : {
					"commercial_invoice_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "commercial_invoice_item_id",
						"destination_table" : "purchase_commercial_invoice_links",
						"source_field" : "commercial_invoice_item_id",
						"source_table" : "purchase_commercial_invoice_items"
					}
				}
			},
			"invoice_item_id" : {
				"purchase_invoice_items" : {
					"invoice_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "invoice_item_id",
						"destination_table" : "purchase_commercial_invoice_links",
						"source_field" : "invoice_item_id",
						"source_table" : "purchase_invoice_items"
					}
				}
			}
		},
		"purchase_commercial_invoices" : {
			"payment_terms_id" : {
				"payment_terms" : {
					"payment_term_id" : {
						"destination_field" : "payment_terms_id",
						"destination_table" : "purchase_commercial_invoices",
						"source_field" : "payment_term_id",
						"source_table" : "payment_terms"
					}
				}
			},
			"tax_id" : {
				"taxes" : {
					"tax_id" : {
						"destination_field" : "tax_id",
						"destination_table" : "purchase_commercial_invoices",
						"source_field" : "tax_id",
						"source_table" : "taxes"
					}
				}
			},
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "purchase_commercial_invoices",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			},
			"purchase_term_id" : {
				"purchase_terms" : {
					"purchase_term_id" : {
						"destination_field" : "purchase_term_id",
						"destination_table" : "purchase_commercial_invoices",
						"source_field" : "purchase_term_id",
						"source_table" : "purchase_terms"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_commercial_invoices",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"purchase_container_commercial_links" : {
			"commercial_invoice_item_id" : {
				"purchase_commercial_invoice_items" : {
					"commercial_invoice_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "commercial_invoice_item_id",
						"destination_table" : "purchase_container_commercial_links",
						"source_field" : "commercial_invoice_item_id",
						"source_table" : "purchase_commercial_invoice_items"
					}
				}
			},
			"container_item_id" : {
				"purchase_container_items" : {
					"container_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "container_item_id",
						"destination_table" : "purchase_container_commercial_links",
						"source_field" : "container_item_id",
						"source_table" : "purchase_container_items"
					}
				}
			}
		},
		"purchase_container_items" : {
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "purchase_container_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			},
			"storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "purchase_container_items",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			},
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "purchase_container_items",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"container_id" : {
				"purchase_containers" : {
					"container_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "container_id",
						"destination_table" : "purchase_container_items",
						"source_field" : "container_id",
						"source_table" : "purchase_containers"
					}
				}
			}
		},
		"purchase_container_packing_links" : {
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "purchase_container_packing_links",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"container_item_id" : {
				"purchase_container_items" : {
					"container_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "container_item_id",
						"destination_table" : "purchase_container_packing_links",
						"source_field" : "container_item_id",
						"source_table" : "purchase_container_items"
					}
				}
			},
			"packing_list_item_id" : {
				"purchase_packing_list_items" : {
					"packing_list_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "packing_list_item_id",
						"destination_table" : "purchase_container_packing_links",
						"source_field" : "packing_list_item_id",
						"source_table" : "purchase_packing_list_items"
					}
				}
			},
			"purchase_container_packing_id" : {
				"purchase_containers_packings" : {
					"purchase_container_packing_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "purchase_container_packing_id",
						"destination_table" : "purchase_container_packing_links",
						"source_field" : "purchase_container_packing_id",
						"source_table" : "purchase_containers_packings"
					}
				}
			}
		},
		"purchase_containers" : {
			"shipping_company_id" : {
				"shipping_companies" : {
					"shipping_company_id" : {
						"destination_field" : "shipping_company_id",
						"destination_table" : "purchase_containers",
						"source_field" : "shipping_company_id",
						"source_table" : "shipping_companies"
					}
				}
			},
			"default_storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "default_storage_location_id",
						"destination_table" : "purchase_containers",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			},
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "purchase_containers",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			},
			"arrival_signature_id" : {
				"signatures" : {
					"signature_id" : {
						"destination_field" : "arrival_signature_id",
						"destination_table" : "purchase_containers",
						"source_field" : "signature_id",
						"source_table" : "signatures"
					}
				}
			},
			"dispatch_signature_id" : {
				"signatures" : {
					"signature_id" : {
						"destination_field" : "dispatch_signature_id",
						"destination_table" : "purchase_containers",
						"source_field" : "signature_id",
						"source_table" : "signatures"
					}
				}
			},
			"unloading_signature_id" : {
				"signatures" : {
					"signature_id" : {
						"destination_field" : "unloading_signature_id",
						"destination_table" : "purchase_containers",
						"source_field" : "signature_id",
						"source_table" : "signatures"
					}
				}
			},
			"checklist_id" : {
				"checklists" : {
					"checklist_id" : {
						"destination_field" : "checklist_id",
						"destination_table" : "purchase_containers",
						"source_field" : "checklist_id",
						"source_table" : "checklists"
					}
				}
			},
			"empty_location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "empty_location_id",
						"destination_table" : "purchase_containers",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_containers",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"purchase_containers_packings" : {
			"packing_list_id" : {
				"purchase_packing_lists" : {
					"packing_list_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "packing_list_id",
						"destination_table" : "purchase_containers_packings",
						"source_field" : "packing_list_id",
						"source_table" : "purchase_packing_lists"
					}
				}
			},
			"container_id" : {
				"purchase_containers" : {
					"container_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "container_id",
						"destination_table" : "purchase_containers_packings",
						"source_field" : "container_id",
						"source_table" : "purchase_containers"
					}
				}
			}
		},
		"purchase_invoice_items" : {
			"invoice_id" : {
				"purchase_invoices" : {
					"invoice_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "invoice_id",
						"destination_table" : "purchase_invoice_items",
						"source_field" : "invoice_id",
						"source_table" : "purchase_invoices"
					}
				}
			},
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "purchase_invoice_items",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "purchase_invoice_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"purchase_invoice_landing_links" : {
			"landing_price_item_id" : {
				"landing_price_items" : {
					"landing_price_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "landing_price_item_id",
						"destination_table" : "purchase_invoice_landing_links",
						"source_field" : "landing_price_item_id",
						"source_table" : "landing_price_items"
					}
				}
			},
			"invoice_item_id" : {
				"purchase_invoice_items" : {
					"invoice_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "invoice_item_id",
						"destination_table" : "purchase_invoice_landing_links",
						"source_field" : "invoice_item_id",
						"source_table" : "purchase_invoice_items"
					}
				}
			}
		},
		"purchase_invoices" : {
			"purchase_term_id" : {
				"purchase_terms" : {
					"purchase_term_id" : {
						"destination_field" : "purchase_term_id",
						"destination_table" : "purchase_invoices",
						"source_field" : "purchase_term_id",
						"source_table" : "purchase_terms"
					}
				}
			},
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "purchase_invoices",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"landing_price_id" : {
				"landing_prices" : {
					"landing_price_id" : {
						"destination_field" : "landing_price_id",
						"destination_table" : "purchase_invoices",
						"source_field" : "landing_price_id",
						"source_table" : "landing_prices"
					}
				}
			},
			"payment_terms_id" : {
				"payment_terms" : {
					"payment_term_id" : {
						"destination_field" : "payment_terms_id",
						"destination_table" : "purchase_invoices",
						"source_field" : "payment_term_id",
						"source_table" : "payment_terms"
					}
				}
			},
			"tax_id" : {
				"taxes" : {
					"tax_id" : {
						"destination_field" : "tax_id",
						"destination_table" : "purchase_invoices",
						"source_field" : "tax_id",
						"source_table" : "taxes"
					}
				}
			},
			"company_id" : {
				"landing_prices" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_invoices",
						"source_field" : "company_id",
						"source_table" : "landing_prices"
					}
				}
			},
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "purchase_invoices",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			},
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "purchase_invoices",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			}
		},
		"purchase_order_items" : {
			"order_id" : {
				"purchase_orders" : {
					"order_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "order_id",
						"destination_table" : "purchase_order_items",
						"source_field" : "order_id",
						"source_table" : "purchase_orders"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "purchase_order_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"purchase_order_proforma_links" : {
			"proforma_item_id" : {
				"purchase_proforma_items" : {
					"proforma_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "proforma_item_id",
						"destination_table" : "purchase_order_proforma_links",
						"source_field" : "proforma_item_id",
						"source_table" : "purchase_proforma_items"
					}
				}
			},
			"order_item_id" : {
				"purchase_order_items" : {
					"order_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "order_item_id",
						"destination_table" : "purchase_order_proforma_links",
						"source_field" : "order_item_id",
						"source_table" : "purchase_order_items"
					}
				}
			}
		},
		"purchase_orders" : {
			"tax_id" : {
				"taxes" : {
					"tax_id" : {
						"destination_field" : "tax_id",
						"destination_table" : "purchase_orders",
						"source_field" : "tax_id",
						"source_table" : "taxes"
					}
				}
			},
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "purchase_orders",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			},
			"purchase_term_id" : {
				"purchase_terms" : {
					"purchase_term_id" : {
						"destination_field" : "purchase_term_id",
						"destination_table" : "purchase_orders",
						"source_field" : "purchase_term_id",
						"source_table" : "purchase_terms"
					}
				}
			},
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "purchase_orders",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			},
			"assigned_to" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "assigned_to",
						"destination_table" : "purchase_orders",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"payment_terms_id" : {
				"payment_terms" : {
					"payment_term_id" : {
						"destination_field" : "payment_terms_id",
						"destination_table" : "purchase_orders",
						"source_field" : "payment_term_id",
						"source_table" : "payment_terms"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_orders",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"purchase_packing_commercial_links" : {
			"commercial_invoice_item_id" : {
				"purchase_commercial_invoice_items" : {
					"commercial_invoice_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "commercial_invoice_item_id",
						"destination_table" : "purchase_packing_commercial_links",
						"source_field" : "commercial_invoice_item_id",
						"source_table" : "purchase_commercial_invoice_items"
					}
				}
			},
			"packing_list_item_id" : {
				"purchase_packing_list_items" : {
					"packing_list_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "packing_list_item_id",
						"destination_table" : "purchase_packing_commercial_links",
						"source_field" : "packing_list_item_id",
						"source_table" : "purchase_packing_list_items"
					}
				}
			}
		},
		"purchase_packing_list_items" : {
			"packing_list_id" : {
				"purchase_packing_lists" : {
					"packing_list_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "packing_list_id",
						"destination_table" : "purchase_packing_list_items",
						"source_field" : "packing_list_id",
						"source_table" : "purchase_packing_lists"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "purchase_packing_list_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			},
			"storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "purchase_packing_list_items",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			}
		},
		"purchase_packing_lists" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_packing_lists",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "purchase_packing_lists",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			}
		},
		"purchase_proforma_commercial_links" : {
			"commercial_invoice_item_id" : {
				"purchase_commercial_invoice_items" : {
					"commercial_invoice_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "commercial_invoice_item_id",
						"destination_table" : "purchase_proforma_commercial_links",
						"source_field" : "commercial_invoice_item_id",
						"source_table" : "purchase_commercial_invoice_items"
					}
				}
			},
			"proforma_item_id" : {
				"purchase_proforma_items" : {
					"proforma_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "proforma_item_id",
						"destination_table" : "purchase_proforma_commercial_links",
						"source_field" : "proforma_item_id",
						"source_table" : "purchase_proforma_items"
					}
				}
			}
		},
		"purchase_proforma_container_links" : {
			"container_item_id" : {
				"purchase_container_items" : {
					"container_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "container_item_id",
						"destination_table" : "purchase_proforma_container_links",
						"source_field" : "container_item_id",
						"source_table" : "purchase_container_items"
					}
				}
			},
			"proforma_item_id" : {
				"purchase_proforma_items" : {
					"proforma_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "proforma_item_id",
						"destination_table" : "purchase_proforma_container_links",
						"source_field" : "proforma_item_id",
						"source_table" : "purchase_proforma_items"
					}
				}
			}
		},
		"purchase_proforma_items" : {
			"proforma_id" : {
				"purchase_proformas" : {
					"proforma_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "proforma_id",
						"destination_table" : "purchase_proforma_items",
						"source_field" : "proforma_id",
						"source_table" : "purchase_proformas"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "purchase_proforma_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"purchase_proforma_packing_links" : {
			"packing_list_item_id" : {
				"purchase_packing_list_items" : {
					"packing_list_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "packing_list_item_id",
						"destination_table" : "purchase_proforma_packing_links",
						"source_field" : "packing_list_item_id",
						"source_table" : "purchase_packing_list_items"
					}
				}
			},
			"proforma_item_id" : {
				"purchase_proforma_items" : {
					"proforma_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "proforma_item_id",
						"destination_table" : "purchase_proforma_packing_links",
						"source_field" : "proforma_item_id",
						"source_table" : "purchase_proforma_items"
					}
				}
			}
		},
		"purchase_proformas" : {
			"payment_terms_id" : {
				"payment_terms" : {
					"payment_term_id" : {
						"destination_field" : "payment_terms_id",
						"destination_table" : "purchase_proformas",
						"source_field" : "payment_term_id",
						"source_table" : "payment_terms"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_proformas",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "purchase_proformas",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			},
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "purchase_proformas",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			},
			"purchase_term_id" : {
				"purchase_terms" : {
					"purchase_term_id" : {
						"destination_field" : "purchase_term_id",
						"destination_table" : "purchase_proformas",
						"source_field" : "purchase_term_id",
						"source_table" : "purchase_terms"
					}
				}
			},
			"tax_id" : {
				"taxes" : {
					"tax_id" : {
						"destination_field" : "tax_id",
						"destination_table" : "purchase_proformas",
						"source_field" : "tax_id",
						"source_table" : "taxes"
					}
				}
			}
		},
		"purchase_quote_items" : {
			"quote_id" : {
				"purchase_quotes" : {
					"quote_id" : {
						"destination_field" : "quote_id",
						"destination_table" : "purchase_quote_items",
						"source_field" : "quote_id",
						"source_table" : "purchase_quotes"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "purchase_quote_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"purchase_quote_vendor_items" : {
			"quote_vendor_id" : {
				"purchase_quote_vendors" : {
					"quote_vendor_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "quote_vendor_id",
						"destination_table" : "purchase_quote_vendor_items",
						"source_field" : "quote_vendor_id",
						"source_table" : "purchase_quote_vendors"
					}
				}
			},
			"quote_item_id" : {
				"purchase_quote_items" : {
					"quote_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "quote_item_id",
						"destination_table" : "purchase_quote_vendor_items",
						"source_field" : "quote_item_id",
						"source_table" : "purchase_quote_items"
					}
				}
			}
		},
		"purchase_quote_vendor_order_links" : {
			"quote_item_id" : {
				"purchase_quote_items" : {
					"quote_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "quote_item_id",
						"destination_table" : "purchase_quote_vendor_order_links",
						"source_field" : "quote_item_id",
						"source_table" : "purchase_quote_items"
					}
				}
			},
			"quote_vendor_item_id" : {
				"purchase_quote_vendor_items" : {
					"quote_vendor_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "quote_vendor_item_id",
						"destination_table" : "purchase_quote_vendor_order_links",
						"source_field" : "quote_vendor_item_id",
						"source_table" : "purchase_quote_vendor_items"
					}
				}
			},
			"order_item_id" : {
				"purchase_order_items" : {
					"order_item_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "order_item_id",
						"destination_table" : "purchase_quote_vendor_order_links",
						"source_field" : "order_item_id",
						"source_table" : "purchase_order_items"
					}
				}
			}
		},
		"purchase_quote_vendors" : {
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "purchase_quote_vendors",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			},
			"quote_id" : {
				"purchase_quotes" : {
					"quote_id" : {
						"destination_field" : "quote_id",
						"destination_table" : "purchase_quote_vendors",
						"source_field" : "quote_id",
						"source_table" : "purchase_quotes"
					}
				}
			}
		},
		"purchase_quotes" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_quotes",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"purchase_request_items" : {
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "purchase_request_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			},
			"request_id" : {
				"purchase_requests" : {
					"request_id" : {
						"destination_field" : "request_id",
						"destination_table" : "purchase_request_items",
						"source_field" : "request_id",
						"source_table" : "purchase_requests"
					}
				}
			}
		},
		"purchase_request_quote_links" : {
			"quote_item_id" : {
				"purchase_quote_items" : {
					"quote_item_id" : {
						"destination_field" : "quote_item_id",
						"destination_table" : "purchase_request_quote_links",
						"source_field" : "quote_item_id",
						"source_table" : "purchase_quote_items"
					}
				}
			},
			"request_item_id" : {
				"purchase_request_items" : {
					"request_item_id" : {
						"destination_field" : "request_item_id",
						"destination_table" : "purchase_request_quote_links",
						"source_field" : "request_item_id",
						"source_table" : "purchase_request_items"
					}
				}
			}
		},
		"purchase_requests" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_requests",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"requested_by" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "requested_by",
						"destination_table" : "purchase_requests",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			}
		},
		"purchase_return_items" : {
			"purchase_invoice_item_id" : {
				"purchase_invoice_items" : {
					"invoice_item_id" : {
						"destination_field" : "purchase_invoice_item_id",
						"destination_table" : "purchase_return_items",
						"source_field" : "invoice_item_id",
						"source_table" : "purchase_invoice_items"
					}
				}
			},
			"storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "purchase_return_items",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "purchase_return_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			},
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "purchase_return_items",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			}
		},
		"purchase_returns" : {
			"transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "purchase_returns",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			},
			"payment_terms_id" : {
				"payment_terms" : {
					"payment_term_id" : {
						"destination_field" : "payment_terms_id",
						"destination_table" : "purchase_returns",
						"source_field" : "payment_term_id",
						"source_table" : "payment_terms"
					}
				}
			},
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "purchase_returns",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_returns",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"purchase_terms" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "purchase_terms",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"sale_appointments" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "sale_appointments",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"assigned_to" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "assigned_to",
						"destination_table" : "sale_appointments",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"customer_id" : {
				"customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "sale_appointments",
						"source_field" : "customer_id",
						"source_table" : "customers"
					}
				}
			}
		},
		"sale_container_items" : {
			"sale_container_id" : {
				"sale_containers" : {
					"sale_container_id" : {
						"destination_field" : "sale_container_id",
						"destination_table" : "sale_container_items",
						"source_field" : "sale_container_id",
						"source_table" : "sale_containers"
					}
				}
			}
		},
		"sale_containers" : {
			"shipping_company_id" : {
				"shipping_companies" : {
					"shipping_company_id" : {
						"destination_field" : "shipping_company_id",
						"destination_table" : "sale_containers",
						"source_field" : "shipping_company_id",
						"source_table" : "shipping_companies"
					}
				}
			}
		},
		"sale_invoice_items" : {
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "sale_invoice_items",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "sale_invoice_items",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			},
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "sale_invoice_items",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			}
		},
		"sale_invoices" : {
			"sale_term_id" : {
				"sale_terms" : {
					"sale_term_id" : {
						"destination_field" : "sale_term_id",
						"destination_table" : "sale_invoices",
						"source_field" : "sale_term_id",
						"source_table" : "sale_terms"
					}
				}
			},
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "sale_invoices",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			}
		},
		"sale_maintenance_expenses" : {
			"sale_maintenance_id" : {
				"sale_maintenance" : {
					"sale_maintenance_id" : {
						"destination_field" : "sale_maintenance_id",
						"destination_table" : "sale_maintenance_expenses",
						"source_field" : "sale_maintenance_id",
						"source_table" : "sale_maintenance"
					}
				}
			}
		},
		"sale_maintenance_items" : {
			"sale_maintenance_id" : {
				"sale_maintenance" : {
					"sale_maintenance_id" : {
						"destination_field" : "sale_maintenance_id",
						"destination_table" : "sale_maintenance_items",
						"source_field" : "sale_maintenance_id",
						"source_table" : "sale_maintenance"
					}
				}
			}
		},
		"sale_packing_list_items" : {
			"sale_packing_list_id" : {
				"sale_packing_lists" : {
					"sale_packing_list_id" : {
						"destination_field" : "sale_packing_list_id",
						"destination_table" : "sale_packing_list_items",
						"source_field" : "sale_packing_list_id",
						"source_table" : "sale_packing_lists"
					}
				}
			}
		},
		"sale_proforma_items" : {
			"sale_proforma_id" : {
				"sale_proformas" : {
					"sale_proforma_id" : {
						"destination_field" : "sale_proforma_id",
						"destination_table" : "sale_proforma_items",
						"source_field" : "sale_proforma_id",
						"source_table" : "sale_proformas"
					}
				}
			}
		},
		"sale_quote_items" : {
			"sale_quote_id" : {
				"sale_quotes" : {
					"sale_quote_id" : {
						"destination_field" : "sale_quote_id",
						"destination_table" : "sale_quote_items",
						"source_field" : "sale_quote_id",
						"source_table" : "sale_quotes"
					}
				}
			}
		},
		"sale_quotes" : {
			"pricing_group_id" : {
				"pricing_groups" : {
					"pricing_group_id" : {
						"destination_field" : "pricing_group_id",
						"destination_table" : "sale_quotes",
						"source_field" : "pricing_group_id",
						"source_table" : "pricing_groups"
					}
				}
			}
		},
		"sale_return_items" : {
			"storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "sale_return_items",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			},
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "sale_return_items",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"sale_return_id" : {
				"sale_returns" : {
					"sale_return_id" : {
						"destination_field" : "sale_return_id",
						"destination_table" : "sale_return_items",
						"source_field" : "sale_return_id",
						"source_table" : "sale_returns"
					}
				}
			},
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "sale_return_items",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			}
		},
		"sale_returns" : {
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "sale_returns",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			}
		},
		"sale_terms" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "sale_terms",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"services" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "services",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"parent_service_id" : {
				"services" : {
					"service_id" : {
						"destination_field" : "parent_service_id",
						"destination_table" : "services",
						"source_field" : "service_id",
						"source_table" : "services"
					}
				}
			}
		},
		"settings" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "settings",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"signatures" : {
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "signatures",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			}
		},
		"stock_audit_items" : {
			"stock_audit_id" : {
				"stock_audits" : {
					"stock_audit_id" : {
						"destination_field" : "stock_audit_id",
						"destination_table" : "stock_audit_items",
						"source_field" : "stock_audit_id",
						"source_table" : "stock_audits"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "stock_audit_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"stock_audits" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "stock_audits",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "stock_audits",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			},
			"performed_by" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "performed_by",
						"destination_table" : "stock_audits",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			}
		},
		"stock_transfer_items" : {
			"destination_inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "destination_inventory_tracking_id",
						"destination_table" : "stock_transfer_items",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"stock_transfer_id" : {
				"stock_transfers" : {
					"stock_transfer_id" : {
						"destination_field" : "stock_transfer_id",
						"destination_table" : "stock_transfer_items",
						"source_field" : "stock_transfer_id",
						"source_table" : "stock_transfers"
					}
				}
			},
			"source_inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "source_inventory_tracking_id",
						"destination_table" : "stock_transfer_items",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "stock_transfer_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			}
		},
		"stock_transfers" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "stock_transfers",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"source_location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "source_location_id",
						"destination_table" : "stock_transfers",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			},
			"destination_location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "destination_location_id",
						"destination_table" : "stock_transfers",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			},
			"trip_id" : {
				"trips" : {
					"trip_id" : {
						"destination_field" : "trip_id",
						"destination_table" : "stock_transfers",
						"source_field" : "trip_id",
						"source_table" : "trips"
					}
				}
			}
		},
		"stock_update_items" : {
			"stock_update_id" : {
				"stock_updates" : {
					"stock_update_id" : {
						"destination_field" : "stock_update_id",
						"destination_table" : "stock_update_items",
						"source_field" : "stock_update_id",
						"source_table" : "stock_updates"
					}
				}
			},
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "stock_update_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			},
			"inventory_tracking_id" : {
				"inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "stock_update_items",
						"source_field" : "inventory_tracking_id",
						"source_table" : "inventory_trackings"
					}
				}
			}
		},
		"stock_updates" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "stock_updates",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"performed_by" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "performed_by",
						"destination_table" : "stock_updates",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "stock_updates",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			}
		},
		"storage_locations" : {
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "storage_locations",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			},
			"parent_storage_location_id" : {
				"storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "parent_storage_location_id",
						"destination_table" : "storage_locations",
						"source_field" : "storage_location_id",
						"source_table" : "storage_locations"
					}
				}
			}
		},
		"task_comments" : {
			"task_id" : {
				"tasks" : {
					"task_id" : {
						"destination_field" : "task_id",
						"destination_table" : "task_comments",
						"source_field" : "task_id",
						"source_table" : "tasks"
					}
				}
			}
		},
		"task_time_entries" : {
			"task_id" : {
				"tasks" : {
					"task_id" : {
						"cascade_delete_destination" : true,
						"destination_field" : "task_id",
						"destination_table" : "task_time_entries",
						"source_field" : "task_id",
						"source_table" : "tasks"
					}
				}
			}
		},
		"taxes" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "taxes",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			}
		},
		"transactions" : {
			"account_debit_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "account_debit_id",
						"destination_table" : "transactions",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			},
			"account_credit_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "account_credit_id",
						"destination_table" : "transactions",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			},
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "transactions",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"parent_transaction_id" : {
				"transactions" : {
					"transaction_id" : {
						"destination_field" : "parent_transaction_id",
						"destination_table" : "transactions",
						"source_field" : "transaction_id",
						"source_table" : "transactions"
					}
				}
			}
		},
		"trip_equipments" : {
			"trip_id" : {
				"trips" : {
					"trip_id" : {
						"destination_field" : "trip_id",
						"destination_table" : "trip_equipments",
						"source_field" : "trip_id",
						"source_table" : "trips"
					}
				}
			}
		},
		"trip_order_items" : {
			"order_item_id" : {
				"purchase_order_items" : {
					"order_item_id" : {
						"destination_field" : "order_item_id",
						"destination_table" : "trip_order_items",
						"source_field" : "order_item_id",
						"source_table" : "purchase_order_items"
					}
				}
			},
			"trip_id" : {
				"trips" : {
					"trip_id" : {
						"destination_field" : "trip_id",
						"destination_table" : "trip_order_items",
						"source_field" : "trip_id",
						"source_table" : "trips"
					}
				}
			}
		},
		"trip_passengers" : {
			"trip_id" : {
				"trips" : {
					"trip_id" : {
						"destination_field" : "trip_id",
						"destination_table" : "trip_passengers",
						"source_field" : "trip_id",
						"source_table" : "trips"
					}
				}
			}
		},
		"trip_updates" : {
			"trip_id" : {
				"trips" : {
					"trip_id" : {
						"destination_field" : "trip_id",
						"destination_table" : "trip_updates",
						"source_field" : "trip_id",
						"source_table" : "trips"
					}
				}
			}
		},
		"trips" : {
			"recurring_trip_id" : {
				"recurring_trips" : {
					"recurring_trip_id" : {
						"destination_field" : "recurring_trip_id",
						"destination_table" : "trips",
						"source_field" : "recurring_trip_id",
						"source_table" : "recurring_trips"
					}
				}
			}
		},
		"user_expenses" : {
			"expense_id" : {
				"expenses" : {
					"expense_account_id" : {
						"destination_field" : "expense_id",
						"destination_table" : "user_expenses",
						"source_field" : "expense_account_id",
						"source_table" : "expenses"
					}
				}
			}
		},
		"users" : {
			"access_group_id" : {
				"access_groups" : {
					"access_group_id" : {
						"destination_field" : "access_group_id",
						"destination_table" : "users",
						"source_field" : "access_group_id",
						"source_table" : "access_groups"
					}
				}
			},
			"asset_id" : {
				"assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "users",
						"source_field" : "asset_id",
						"source_table" : "assets"
					}
				}
			},
			"location_id" : {
				"locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "users",
						"source_field" : "location_id",
						"source_table" : "locations"
					}
				}
			},
			"employee_id" : {
				"employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "users",
						"source_field" : "employee_id",
						"source_table" : "employees"
					}
				}
			},
			"sidebar_menu_id" : {
				"sidebar_menus" : {
					"sidebar_menu_id" : {
						"destination_field" : "sidebar_menu_id",
						"destination_table" : "users",
						"source_field" : "sidebar_menu_id",
						"source_table" : "sidebar_menus"
					}
				}
			},
			"dashboard_id" : {
				"dashboards" : {
					"dashboard_id" : {
						"destination_field" : "dashboard_id",
						"destination_table" : "users",
						"source_field" : "dashboard_id",
						"source_table" : "dashboards"
					}
				}
			}
		},
		"vendor_contracts" : {
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "vendor_contracts",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			}
		},
		"vendor_items" : {
			"item_id" : {
				"items" : {
					"item_id" : {
						"destination_field" : "item_id",
						"destination_table" : "vendor_items",
						"source_field" : "item_id",
						"source_table" : "items"
					}
				}
			},
			"vendor_id" : {
				"vendors" : {
					"vendor_id" : {
						"destination_field" : "vendor_id",
						"destination_table" : "vendor_items",
						"source_field" : "vendor_id",
						"source_table" : "vendors"
					}
				}
			}
		},
		"vendors" : {
			"company_id" : {
				"companies" : {
					"company_id" : {
						"destination_field" : "company_id",
						"destination_table" : "vendors",
						"source_field" : "company_id",
						"source_table" : "companies"
					}
				}
			},
			"dock_id" : {
				"docks" : {
					"dock_id" : {
						"destination_field" : "dock_id",
						"destination_table" : "vendors",
						"source_field" : "dock_id",
						"source_table" : "docks"
					}
				}
			},
			"account_id" : {
				"accounts" : {
					"account_id" : {
						"destination_field" : "account_id",
						"destination_table" : "vendors",
						"source_field" : "account_id",
						"source_table" : "accounts"
					}
				}
			},
			"tax_id" : {
				"taxes" : {
					"tax_id" : {
						"destination_field" : "tax_id",
						"destination_table" : "vendors",
						"source_field" : "tax_id",
						"source_table" : "taxes"
					}
				}
			},
			"purchase_term_id" : {
				"purchase_terms" : {
					"purchase_term_id" : {
						"destination_field" : "purchase_term_id",
						"destination_table" : "vendors",
						"source_field" : "purchase_term_id",
						"source_table" : "purchase_terms"
					}
				}
			},
			"payment_terms_id" : {
				"payment_terms" : {
					"payment_term_id" : {
						"destination_field" : "payment_terms_id",
						"destination_table" : "vendors",
						"source_field" : "payment_term_id",
						"source_table" : "payment_terms"
					}
				}
			}
		}
	}
};
