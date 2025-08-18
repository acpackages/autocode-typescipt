export const dataDictionaryJson = {
	"tables" : {
		"act_tbl_access_groups" : {
			 "table_name" : "act_tbl_access_groups",
			 "table_columns" : {
				"access_group_id" : {
					"column_name" : "access_group_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"access_group_name" : {
					"column_name" : "access_group_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"access_group"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"access_groups"
				}
			}

		},
		"act_tbl_access_rights" : {
			 "table_name" : "act_tbl_access_rights",
			 "table_columns" : {
				"access_group_id" : {
					"column_name" : "access_group_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Access Group"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"access_right_id" : {
					"column_name" : "access_right_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"access_right_name" : {
					"column_name" : "access_right_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"access_right_value" : {
					"column_name" : "access_right_value",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"access_right"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"access_rights"
				}
			}

		},
		"act_tbl_accountee_addresses" : {
			 "table_name" : "act_tbl_accountee_addresses",
			 "table_columns" : {
				"accountee_address_id" : {
					"column_name" : "accountee_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"address_id" : {
					"column_name" : "address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountee_addresses"
				}
			}

		},
		"act_tbl_accountee_bank_accounts" : {
			 "table_name" : "act_tbl_accountee_bank_accounts",
			 "table_columns" : {
				"accountee_bank_account_id" : {
					"column_name" : "accountee_bank_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"bank_account_id" : {
					"column_name" : "bank_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Bank Account"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee_bank_account"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountee_bank_accounts"
				}
			}

		},
		"act_tbl_accountee_email_addresses" : {
			 "table_name" : "act_tbl_accountee_email_addresses",
			 "table_columns" : {
				"accountee_email_address_id" : {
					"column_name" : "accountee_email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"email_address_id" : {
					"column_name" : "email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Email Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee_email_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountee_email_addresses"
				}
			}

		},
		"act_tbl_accountee_fax_numbers" : {
			 "table_name" : "act_tbl_accountee_fax_numbers",
			 "table_columns" : {
				"accountee_fax_number_id" : {
					"column_name" : "accountee_fax_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"fax_number_id" : {
					"column_name" : "fax_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Fax Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee_fax_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountee_fax_numbers"
				}
			}

		},
		"act_tbl_accountee_legal_documents" : {
			 "table_name" : "act_tbl_accountee_legal_documents",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"accountee_legal_document_id" : {
					"column_name" : "accountee_legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"legal_document_id" : {
					"column_name" : "legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Legal Document"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee_legal_document"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountee_legal_documents"
				}
			}

		},
		"act_tbl_accountee_medias" : {
			 "table_name" : "act_tbl_accountee_medias",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"accountee_media_id" : {
					"column_name" : "accountee_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountee_medias"
				}
			}

		},
		"act_tbl_accountee_phone_numbers" : {
			 "table_name" : "act_tbl_accountee_phone_numbers",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"accountee_phone_number_id" : {
					"column_name" : "accountee_phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"phone_number_id" : {
					"column_name" : "phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Phone Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee_phone_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountee_phone_numbers"
				}
			}

		},
		"act_tbl_accountee_settings" : {
			 "table_name" : "act_tbl_accountee_settings",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"accountee_setting_id" : {
					"column_name" : "accountee_setting_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"accountee_setting_name" : {
					"column_name" : "accountee_setting_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"accountee_setting_numeric_value" : {
					"column_name" : "accountee_setting_numeric_value",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				},
				"accountee_setting_string_value" : {
					"column_name" : "accountee_setting_string_value",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee_setting"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountee_settings"
				}
			}

		},
		"act_tbl_accountee_websites" : {
			 "table_name" : "act_tbl_accountee_websites",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"accountee_website_id" : {
					"column_name" : "accountee_website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"website_id" : {
					"column_name" : "website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Website"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee_website"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountee_webistes"
				}
			}

		},
		"act_tbl_accountees" : {
			 "table_name" : "act_tbl_accountees",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"accountee_image_media_id" : {
					"column_name" : "accountee_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"accountee_name" : {
					"column_name" : "accountee_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"financial_year_end" : {
					"column_name" : "financial_year_end",
					"column_type" : "date",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Financial Year End"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"financial_year_start" : {
					"column_name" : "financial_year_start",
					"column_type" : "date",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Financial Year Start"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"accountee"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"accountees"
				}
			}

		},
		"act_tbl_addresses" : {
			 "table_name" : "act_tbl_addresses",
			 "table_columns" : {
				"address_id" : {
					"column_name" : "address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"address_label" : {
					"column_name" : "address_label",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Label"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"address_line_1" : {
					"column_name" : "address_line_1",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Address Line 1"
						}
					}
				},
				"address_line_2" : {
					"column_name" : "address_line_2",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Address Line 2"
						}
					}
				},
				"country_name" : {
					"column_name" : "country_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Country"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"landmark" : {
					"column_name" : "landmark",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Landmark"
						}
					}
				},
				"latitude" : {
					"column_name" : "latitude",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Latitude"
						}
					}
				},
				"longitude" : {
					"column_name" : "longitude",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Longitude"
						}
					}
				},
				"postal_code" : {
					"column_name" : "postal_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Postal Code"
						}
					}
				},
				"state_name" : {
					"column_name" : "state_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "State"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"addresses"
				}
			}

		},
		"act_tbl_asset_attributes" : {
			 "table_name" : "act_tbl_asset_attributes",
			 "table_columns" : {
				"asset_attribute_id" : {
					"column_name" : "asset_attribute_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"asset_attribute_label" : {
					"column_name" : "asset_attribute_label",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
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
				"asset_attribute_numeric_value" : {
					"column_name" : "asset_attribute_numeric_value",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				},
				"asset_attribute_string_value" : {
					"column_name" : "asset_attribute_string_value",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						},
						"is_select_distinct" : {
							"property_name" : "is_select_distinct",
							"property_value" : true
						}
					}
				},
				"asset_id" : {
					"column_name" : "asset_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Asset"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"value_type_lookup_value_id" : {
					"column_name" : "value_type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value Type"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"asset_attribute"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"asset_attributes"
				}
			}

		},
		"act_tbl_asset_depreciations" : {
			 "table_name" : "act_tbl_asset_depreciations",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"asset_depreciation_amount" : {
					"column_name" : "asset_depreciation_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"asset_depreciation_date" : {
					"column_name" : "asset_depreciation_date",
					"column_type" : "date",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"asset_depreciation_id" : {
					"column_name" : "asset_depreciation_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"asset_depreciation_percentage" : {
					"column_name" : "asset_depreciation_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Percentage"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"asset_id" : {
					"column_name" : "asset_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Asset"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"new_asset_value" : {
					"column_name" : "new_asset_value",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "New Value"
						}
					}
				},
				"old_asset_value" : {
					"column_name" : "old_asset_value",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Old Value"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"asset_depreciation"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"asset_depreciations"
				}
			}

		},
		"act_tbl_asset_legal_documents" : {
			 "table_name" : "act_tbl_asset_legal_documents",
			 "table_columns" : {
				"asset_id" : {
					"column_name" : "asset_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Asset"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"asset_legal_document_id" : {
					"column_name" : "asset_legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"legal_document_id" : {
					"column_name" : "legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Legal Document"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"asset_legal_document"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"asset_legal_documents"
				}
			}

		},
		"act_tbl_asset_medias" : {
			 "table_name" : "act_tbl_asset_medias",
			 "table_columns" : {
				"asset_id" : {
					"column_name" : "asset_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Asset"
						}
					}
				},
				"asset_media_id" : {
					"column_name" : "asset_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"asset_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"asset_medias"
				}
			}

		},
		"act_tbl_assets" : {
			 "table_name" : "act_tbl_assets",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"asset_barcode" : {
					"column_name" : "asset_barcode",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Barcode Value"
						}
					}
				},
				"asset_depreciation_occurance" : {
					"column_name" : "asset_depreciation_occurance",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Depreciation Occurance"
						}
					}
				},
				"asset_depreciation_percentage" : {
					"column_name" : "asset_depreciation_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Depreciation %"
						}
					}
				},
				"asset_details" : {
					"column_name" : "asset_details",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Details"
						}
					}
				},
				"asset_id" : {
					"column_name" : "asset_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"asset_image_media_id" : {
					"column_name" : "asset_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"asset_name" : {
					"column_name" : "asset_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"asset_value" : {
					"column_name" : "asset_value",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"asset"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"assets"
				}
			}

		},
		"act_tbl_automated_task_logs" : {
			 "table_name" : "act_tbl_automated_task_logs",
			 "table_columns" : {
				"automated_task_end_datetime" : {
					"column_name" : "automated_task_end_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "End Time"
						}
					}
				},
				"automated_task_event" : {
					"column_name" : "automated_task_event",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Triggering Event"
						}
					}
				},
				"automated_task_id" : {
					"column_name" : "automated_task_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Automated Task"
						}
					}
				},
				"automated_task_log_file_path" : {
					"column_name" : "automated_task_log_file_path",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Log File Path"
						}
					}
				},
				"automated_task_log_id" : {
					"column_name" : "automated_task_log_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"automated_task_log_number" : {
					"column_name" : "automated_task_log_number",
					"column_type" : "auto_number",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Log Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"automated_task_message" : {
					"column_name" : "automated_task_message",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Message"
						}
					}
				},
				"automated_task_record_id" : {
					"column_name" : "automated_task_record_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Record Id"
						}
					}
				},
				"automated_task_start_datetime" : {
					"column_name" : "automated_task_start_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Start Time"
						}
					}
				},
				"automated_task_table" : {
					"column_name" : "automated_task_table",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Triggering Table"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"},{"label":"ERROR","value":"ERROR"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"automated_task_log"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"automated_task_logs"
				}
			}

		},
		"act_tbl_automated_tasks" : {
			 "table_name" : "act_tbl_automated_tasks",
			 "table_columns" : {
				"automated_task_editor_json" : {
					"column_name" : "automated_task_editor_json",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Editor Json"
						}
					}
				},
				"automated_task_id" : {
					"column_name" : "automated_task_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"automated_task_json" : {
					"column_name" : "automated_task_json",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Task Json"
						}
					}
				},
				"automated_task_name" : {
					"column_name" : "automated_task_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"automated_task_number" : {
					"column_name" : "automated_task_number",
					"column_type" : "auto_number",
					"column_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "AT-"
						},
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"execution_priority" : {
					"column_name" : "execution_priority",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Execution Priority"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"automated_task"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"automated_tasks"
				}
			}

		},
		"act_tbl_automation_flags" : {
			 "table_name" : "act_tbl_automation_flags",
			 "table_columns" : {
				"automation_flag_id" : {
					"column_name" : "automation_flag_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"automation_flag_name" : {
					"column_name" : "automation_flag_name",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						}
					}
				},
				"automation_flag_value" : {
					"column_name" : "automation_flag_value",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"automation_flag"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"automation_flags"
				}
			}

		},
		"act_tbl_bank_accounts" : {
			 "table_name" : "act_tbl_bank_accounts",
			 "table_columns" : {
				"account_holder_name" : {
					"column_name" : "account_holder_name",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"account_number" : {
					"column_name" : "account_number",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"account_type" : {
					"column_name" : "account_type",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"bank_account_id" : {
					"column_name" : "bank_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"bank_code" : {
					"column_name" : "bank_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Bank Code"
						}
					}
				},
				"bank_name" : {
					"column_name" : "bank_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Bank"
						}
					}
				},
				"branch_code" : {
					"column_name" : "branch_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Branch Code"
						}
					}
				},
				"branch_name" : {
					"column_name" : "branch_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Branch"
						}
					}
				},
				"country_code" : {
					"column_name" : "country_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Country"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"iban" : {
					"column_name" : "iban",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "IBAN"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"is_primary" : {
					"column_name" : "is_primary",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Primary?"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"swift_bic" : {
					"column_name" : "swift_bic",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "SWIFT/BIC"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"bank_account"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"bank_accounts"
				}
			}

		},
		"act_tbl_chargeable_service_medias" : {
			 "table_name" : "act_tbl_chargeable_service_medias",
			 "table_columns" : {
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Chargeable Service"
						}
					}
				},
				"chargeable_service_media_id" : {
					"column_name" : "chargeable_service_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"chargeable_service_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"chargeable_service_medias"
				}
			}

		},
		"act_tbl_chargeable_service_uoms" : {
			 "table_name" : "act_tbl_chargeable_service_uoms",
			 "table_columns" : {
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_uom_id" : {
					"column_name" : "chargeable_service_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"uom_name" : {
					"column_name" : "uom_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"uom_quantity" : {
					"column_name" : "uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"chargeable_service_uom"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"chargeable_service_uoms"
				}
			}

		},
		"act_tbl_chargeable_services" : {
			 "table_name" : "act_tbl_chargeable_services",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"check_in_auto_number" : {
							"property_name" : "check_in_auto_number",
							"property_value" : true
						},
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"check_in_save" : {
							"property_name" : "check_in_save",
							"property_value" : true
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_charge" : {
					"column_name" : "chargeable_service_charge",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Charge"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_code" : {
					"column_name" : "chargeable_service_code",
					"column_type" : "string",
					"column_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 4
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "SER_"
						},
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Number"
						},
						"unique_key" : {
							"property_name" : "unique_key",
							"property_value" : true
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_full_description" : {
					"column_name" : "chargeable_service_full_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Full Description"
						}
					}
				},
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"chargeable_service_image_media_id" : {
					"column_name" : "chargeable_service_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"chargeable_service_name" : {
					"column_name" : "chargeable_service_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_quick_description" : {
					"column_name" : "chargeable_service_quick_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quick Description"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"parent_chargeable_service_id" : {
					"column_name" : "parent_chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Parent Service"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"chargeable_service"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"chargeable_services"
				}
			}

		},
		"act_tbl_contact_persons" : {
			 "table_name" : "act_tbl_contact_persons",
			 "table_columns" : {
				"contact_person_id" : {
					"column_name" : "contact_person_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"contact_person_image_media_id" : {
					"column_name" : "contact_person_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"contact_person_name" : {
					"column_name" : "contact_person_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"contact_person"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"contact_persons"
				}
			}

		},
		"act_tbl_currencies" : {
			 "table_name" : "act_tbl_currencies",
			 "table_columns" : {
				"country_name" : {
					"column_name" : "country_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Country"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"currency_name" : {
					"column_name" : "currency_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"currency_symbol" : {
					"column_name" : "currency_symbol",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Symbol"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"currency"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"currencies"
				}
			}

		},
		"act_tbl_customer_addresses" : {
			 "table_name" : "act_tbl_customer_addresses",
			 "table_columns" : {
				"address_id" : {
					"column_name" : "address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"customer_address_id" : {
					"column_name" : "customer_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"customer_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"customer_addresses"
				}
			}

		},
		"act_tbl_customer_bank_accounts" : {
			 "table_name" : "act_tbl_customer_bank_accounts",
			 "table_columns" : {
				"bank_account_id" : {
					"column_name" : "bank_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Bank Account"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"customer_bank_account_id" : {
					"column_name" : "customer_bank_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"bank_account"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"bank_accounts"
				}
			}

		},
		"act_tbl_customer_contact_persons" : {
			 "table_name" : "act_tbl_customer_contact_persons",
			 "table_columns" : {
				"contact_person_id" : {
					"column_name" : "contact_person_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Contact Person"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"customer_contact_person_id" : {
					"column_name" : "customer_contact_person_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"customer_contact_person"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"customer_contact_person"
				}
			}

		},
		"act_tbl_customer_email_addresses" : {
			 "table_name" : "act_tbl_customer_email_addresses",
			 "table_columns" : {
				"customer_email_address_id" : {
					"column_name" : "customer_email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"email_address_id" : {
					"column_name" : "email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Email Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"customer_email_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"customer_email_addresses"
				}
			}

		},
		"act_tbl_customer_fax_numbers" : {
			 "table_name" : "act_tbl_customer_fax_numbers",
			 "table_columns" : {
				"customer_fax_number_id" : {
					"column_name" : "customer_fax_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"fax_number_id" : {
					"column_name" : "fax_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Fax Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"customer_fax_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"customer_fax_numbers"
				}
			}

		},
		"act_tbl_customer_legal_documents" : {
			 "table_name" : "act_tbl_customer_legal_documents",
			 "table_columns" : {
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"customer_legal_document_id" : {
					"column_name" : "customer_legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"legal_document_id" : {
					"column_name" : "legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Legal Document"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"customer_legal_document"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"customer_legal_documents"
				}
			}

		},
		"act_tbl_customer_medias" : {
			 "table_name" : "act_tbl_customer_medias",
			 "table_columns" : {
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"customer_media_id" : {
					"column_name" : "customer_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"customer_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"customer_medias"
				}
			}

		},
		"act_tbl_customer_phone_numbers" : {
			 "table_name" : "act_tbl_customer_phone_numbers",
			 "table_columns" : {
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"customer_phone_number_id" : {
					"column_name" : "customer_phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"phone_number_id" : {
					"column_name" : "phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Phone Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"customer_phone_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"customer_phone_numbers"
				}
			}

		},
		"act_tbl_customer_websites" : {
			 "table_name" : "act_tbl_customer_websites",
			 "table_columns" : {
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"customer_website_id" : {
					"column_name" : "customer_website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"website_id" : {
					"column_name" : "website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Webiste"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"customer_website"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"customer_websites"
				}
			}

		},
		"act_tbl_customers" : {
			 "table_name" : "act_tbl_customers",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"category_lookup_value_id" : {
					"column_name" : "category_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Category"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"customer_image_media_id" : {
					"column_name" : "customer_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"customer_name" : {
					"column_name" : "customer_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"customer"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"customers"
				}
			}

		},
		"act_tbl_devices" : {
			 "table_name" : "act_tbl_devices",
			 "table_columns" : {
				"device_details" : {
					"column_name" : "device_details",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Details"
						}
					}
				},
				"device_id" : {
					"column_name" : "device_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"device_image_media_id" : {
					"column_name" : "device_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"device_name" : {
					"column_name" : "device_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						}
					}
				},
				"device_uuid" : {
					"column_name" : "device_uuid",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UUID"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"devices"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"devices"
				}
			}

		},
		"act_tbl_email_addresses" : {
			 "table_name" : "act_tbl_email_addresses",
			 "table_columns" : {
				"email_address_id" : {
					"column_name" : "email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"email_address_label" : {
					"column_name" : "email_address_label",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Label"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"email_address_value" : {
					"column_name" : "email_address_value",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"email_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"email_addresses"
				}
			}

		},
		"act_tbl_employee_addresses" : {
			 "table_name" : "act_tbl_employee_addresses",
			 "table_columns" : {
				"address_id" : {
					"column_name" : "address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_address_id" : {
					"column_name" : "employee_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employee_addresses"
				}
			}

		},
		"act_tbl_employee_attendances" : {
			 "table_name" : "act_tbl_employee_attendances",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_attendance_id" : {
					"column_name" : "employee_attendance_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"end_datetime" : {
					"column_name" : "end_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "End Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"start_datetime" : {
					"column_name" : "start_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Start Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee_attendance"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employee_attendances"
				}
			}

		},
		"act_tbl_employee_bank_accounts" : {
			 "table_name" : "act_tbl_employee_bank_accounts",
			 "table_columns" : {
				"bank_account_id" : {
					"column_name" : "bank_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Bank Account"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_bank_account_id" : {
					"column_name" : "employee_bank_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee_bank_account"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employee_bank_accounts"
				}
			}

		},
		"act_tbl_employee_contracts" : {
			 "table_name" : "act_tbl_employee_contracts",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_contract_id" : {
					"column_name" : "employee_contract_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_contract_number" : {
					"column_name" : "employee_contract_number",
					"column_type" : "auto_number",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Number"
						}
					}
				},
				"employee_contract_type" : {
					"column_name" : "employee_contract_type",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"end_datetime" : {
					"column_name" : "end_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "End Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"start_datetime" : {
					"column_name" : "start_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Start Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee_contract"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employee_contracts"
				}
			}

		},
		"act_tbl_employee_email_addresses" : {
			 "table_name" : "act_tbl_employee_email_addresses",
			 "table_columns" : {
				"email_address_id" : {
					"column_name" : "email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Email Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_email_address_id" : {
					"column_name" : "employee_email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee_email_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employee_email_addresses"
				}
			}

		},
		"act_tbl_employee_legal_documents" : {
			 "table_name" : "act_tbl_employee_legal_documents",
			 "table_columns" : {
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_legal_document_id" : {
					"column_name" : "employee_legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"legal_document_id" : {
					"column_name" : "legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Legal Document"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee_legal_document"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employee_legal_documents"
				}
			}

		},
		"act_tbl_employee_medias" : {
			 "table_name" : "act_tbl_employee_medias",
			 "table_columns" : {
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_media_id" : {
					"column_name" : "employee_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employee_medias"
				}
			}

		},
		"act_tbl_employee_phone_numbers" : {
			 "table_name" : "act_tbl_employee_phone_numbers",
			 "table_columns" : {
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_phone_number_id" : {
					"column_name" : "employee_phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"phone_number_id" : {
					"column_name" : "phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Phone Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee_phone_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employee_phone_numbers"
				}
			}

		},
		"act_tbl_employee_websites" : {
			 "table_name" : "act_tbl_employee_websites",
			 "table_columns" : {
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_website_id" : {
					"column_name" : "employee_website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"website_id" : {
					"column_name" : "website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Webiste"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee_website"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employee_websites"
				}
			}

		},
		"act_tbl_employees" : {
			 "table_name" : "act_tbl_employees",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"date_of_birth" : {
					"column_name" : "date_of_birth",
					"column_type" : "date",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Birth Date"
						}
					}
				},
				"date_of_joining" : {
					"column_name" : "date_of_joining",
					"column_type" : "date",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Joining Date"
						}
					}
				},
				"duration_lookup_value_id" : {
					"column_name" : "duration_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Salary Duration"
						}
					}
				},
				"employee_code" : {
					"column_name" : "employee_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Code"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_designation" : {
					"column_name" : "employee_designation",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Designation"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"employee_image_media_id" : {
					"column_name" : "employee_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"employee_salary_amount" : {
					"column_name" : "employee_salary_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Salary Amount"
						}
					}
				},
				"first_name" : {
					"column_name" : "first_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "First Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"gender_lookup_value_id" : {
					"column_name" : "gender_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gender"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"last_name" : {
					"column_name" : "last_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Last Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						}
					}
				},
				"middle_name" : {
					"column_name" : "middle_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Middle Name"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"employee"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"employees"
				}
			}

		},
		"act_tbl_entities" : {
			 "table_name" : "act_tbl_entities",
			 "table_columns" : {
				"entity_id" : {
					"column_name" : "entity_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"entity_name" : {
					"column_name" : "entity_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"entity_value" : {
					"column_name" : "entity_value",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"entity"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"entities"
				}
			}

		},
		"act_tbl_fax_numbers" : {
			 "table_name" : "act_tbl_fax_numbers",
			 "table_columns" : {
				"fax_number_id" : {
					"column_name" : "fax_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"fax_number_label" : {
					"column_name" : "fax_number_label",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Label"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"fax_number_value" : {
					"column_name" : "fax_number_value",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"fax_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"fax_numbers"
				}
			}

		},
		"act_tbl_inventory_tracking_entries" : {
			 "table_name" : "act_tbl_inventory_tracking_entries",
			 "table_columns" : {
				"in_quantity" : {
					"column_name" : "in_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "In Quantity"
						}
					}
				},
				"in_stock" : {
					"column_name" : "in_stock",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "In Stock?"
						}
					}
				},
				"in_uom_quantity" : {
					"column_name" : "in_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "In Quantity"
						}
					}
				},
				"inventory_tracking_id" : {
					"column_name" : "inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Inventory Tracking"
						}
					}
				},
				"inventory_tracking_quantity_id" : {
					"column_name" : "inventory_tracking_quantity_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						}
					}
				},
				"out_quantity" : {
					"column_name" : "out_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Out Quantity"
						}
					}
				},
				"out_uom_quantity" : {
					"column_name" : "out_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Out Quantity"
						}
					}
				},
				"product_barcode_id" : {
					"column_name" : "product_barcode_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Barcode"
						}
					}
				},
				"product_price_id" : {
					"column_name" : "product_price_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Price"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"storage_location_id" : {
					"column_name" : "storage_location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Storage Location"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"inventory_tracking_quantity"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"inventory_tracking_quantities"
				}
			}

		},
		"act_tbl_inventory_trackings" : {
			 "table_name" : "act_tbl_inventory_trackings",
			 "table_columns" : {
				"inventory_tracking_datetime" : {
					"column_name" : "inventory_tracking_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"inventory_tracking_id" : {
					"column_name" : "inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"inventory_tracking"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"inventory_trackings"
				}
			}

		},
		"act_tbl_ledger_account_types" : {
			 "table_name" : "act_tbl_ledger_account_types",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"ledger_account_type_id" : {
					"column_name" : "ledger_account_type_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"ledger_account_type_index" : {
					"column_name" : "ledger_account_type_index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"ledger_account_type_name" : {
					"column_name" : "ledger_account_type_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"parent_ledger_account_type_id" : {
					"column_name" : "parent_ledger_account_type_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Parent Type"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"ledger_account_type"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"ledger_account_types"
				}
			}

		},
		"act_tbl_ledger_accounts" : {
			 "table_name" : "act_tbl_ledger_accounts",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"final_account_type_lookup_value_id" : {
					"column_name" : "final_account_type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Final Account"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"ledger_account_balance" : {
					"column_name" : "ledger_account_balance",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Balance"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"ledger_account_name" : {
					"column_name" : "ledger_account_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"ledger_account_type_id" : {
					"column_name" : "ledger_account_type_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"ledger_account"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"ledger_accounts"
				}
			}

		},
		"act_tbl_legal_document_medias" : {
			 "table_name" : "act_tbl_legal_document_medias",
			 "table_columns" : {
				"legal_document_id" : {
					"column_name" : "legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Legal Document"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"legal_document_media_id" : {
					"column_name" : "legal_document_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"legal_document_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"legal_document_medias"
				}
			}

		},
		"act_tbl_legal_document_types" : {
			 "table_name" : "act_tbl_legal_document_types",
			 "table_columns" : {
				"entity_id" : {
					"column_name" : "entity_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Entity"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"legal_document_type_id" : {
					"column_name" : "legal_document_type_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"legal_document_type_name" : {
					"column_name" : "legal_document_type_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Document Type Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"legal_document_type"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"legal_document_types"
				}
			}

		},
		"act_tbl_legal_documents" : {
			 "table_name" : "act_tbl_legal_documents",
			 "table_columns" : {
				"expiry_date" : {
					"column_name" : "expiry_date",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Expiring On"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"is_expired" : {
					"column_name" : "is_expired",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "is_expired"
						}
					}
				},
				"is_verified" : {
					"column_name" : "is_verified",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Verified?"
						}
					}
				},
				"legal_document_id" : {
					"column_name" : "legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"legal_document_type_id" : {
					"column_name" : "legal_document_type_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"legal_document_value" : {
					"column_name" : "legal_document_value",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"legal_document"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"legal_documents"
				}
			}

		},
		"act_tbl_location_addresses" : {
			 "table_name" : "act_tbl_location_addresses",
			 "table_columns" : {
				"address_id" : {
					"column_name" : "address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"location_address_id" : {
					"column_name" : "location_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"location_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"location_addresses"
				}
			}

		},
		"act_tbl_location_email_addresses" : {
			 "table_name" : "act_tbl_location_email_addresses",
			 "table_columns" : {
				"email_address_id" : {
					"column_name" : "email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Email Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"location_email_address_id" : {
					"column_name" : "location_email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"location_email_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"location_email_addresses"
				}
			}

		},
		"act_tbl_location_fax_numbers" : {
			 "table_name" : "act_tbl_location_fax_numbers",
			 "table_columns" : {
				"fax_number_id" : {
					"column_name" : "fax_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Fax Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"location_fax_number_id" : {
					"column_name" : "location_fax_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"location_fax_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"location_fax_numbers"
				}
			}

		},
		"act_tbl_location_legal_documents" : {
			 "table_name" : "act_tbl_location_legal_documents",
			 "table_columns" : {
				"legal_document_id" : {
					"column_name" : "legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Legal Document"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"location_legal_document_id" : {
					"column_name" : "location_legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"location_legal_document"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"location_legal_documents"
				}
			}

		},
		"act_tbl_location_medias" : {
			 "table_name" : "act_tbl_location_medias",
			 "table_columns" : {
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"location_media_id" : {
					"column_name" : "location_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"location_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"location_medias"
				}
			}

		},
		"act_tbl_location_phone_numbers" : {
			 "table_name" : "act_tbl_location_phone_numbers",
			 "table_columns" : {
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"location_phone_number_id" : {
					"column_name" : "location_phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"phone_number_id" : {
					"column_name" : "phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Phone Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"location_phone_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"location_phone_numbers"
				}
			}

		},
		"act_tbl_location_websites" : {
			 "table_name" : "act_tbl_location_websites",
			 "table_columns" : {
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"location_website_id" : {
					"column_name" : "location_website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"website_id" : {
					"column_name" : "website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Webiste"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"location_website"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"location_websites"
				}
			}

		},
		"act_tbl_locations" : {
			 "table_name" : "act_tbl_locations",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"location_image_media_id" : {
					"column_name" : "location_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"location_name" : {
					"column_name" : "location_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"location"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"locations"
				}
			}

		},
		"act_tbl_lookup_values" : {
			 "table_name" : "act_tbl_lookup_values",
			 "table_columns" : {
				"entity_id" : {
					"column_name" : "entity_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Entity"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"lookup_value" : {
					"column_name" : "lookup_value",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"lookup_value_css_class" : {
					"column_name" : "lookup_value_css_class",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Style Class"
						}
					}
				},
				"lookup_value_id" : {
					"column_name" : "lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"lookup_value_label" : {
					"column_name" : "lookup_value_label",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Label"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"lookup_value_media_id" : {
					"column_name" : "lookup_value_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Display Image"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"lookup_value"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"lookup_values"
				}
			}

		},
		"act_tbl_medias" : {
			 "table_name" : "act_tbl_medias",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"media_details" : {
					"column_name" : "media_details",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Details"
						}
					}
				},
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"media_name" : {
					"column_name" : "media_name",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						}
					}
				},
				"media_path" : {
					"column_name" : "media_path",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Path"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"media_size" : {
					"column_name" : "media_size",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Size"
						}
					}
				},
				"media_type" : {
					"column_name" : "media_type",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"medias"
				}
			}

		},
		"act_tbl_menu_items" : {
			 "table_name" : "act_tbl_menu_items",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"menu_icon_media_id" : {
					"column_name" : "menu_icon_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Icon"
						}
					}
				},
				"menu_id" : {
					"column_name" : "menu_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Menu"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"menu_item_id" : {
					"column_name" : "menu_item_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"menu_label" : {
					"column_name" : "menu_label",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Label"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"menu_link" : {
					"column_name" : "menu_link",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Link"
						}
					}
				},
				"menu_parameters" : {
					"column_name" : "menu_parameters",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Parameters"
						}
					}
				},
				"parent_menu_item_id" : {
					"column_name" : "parent_menu_item_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Parent Menu"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"menu_item"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"menu_items"
				}
			}

		},
		"act_tbl_menus" : {
			 "table_name" : "act_tbl_menus",
			 "table_columns" : {
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"menu_id" : {
					"column_name" : "menu_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"menu_name" : {
					"column_name" : "menu_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"menu"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"menus"
				}
			}

		},
		"act_tbl_notifications" : {
			 "table_name" : "act_tbl_notifications",
			 "table_columns" : {
				"notification_details" : {
					"column_name" : "notification_details",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Details"
						}
					}
				},
				"notification_for" : {
					"column_name" : "notification_for",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "For"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"notification_icon_media_id" : {
					"column_name" : "notification_icon_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Icon"
						}
					}
				},
				"notification_id" : {
					"column_name" : "notification_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"notification_message" : {
					"column_name" : "notification_message",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Message"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"notification_title" : {
					"column_name" : "notification_title",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Title"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"notification_type" : {
					"column_name" : "notification_type",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"notification"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"notifications"
				}
			}

		},
		"act_tbl_payment_methods" : {
			 "table_name" : "act_tbl_payment_methods",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"payment_method_id" : {
					"column_name" : "payment_method_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"payment_method_image_media_id" : {
					"column_name" : "payment_method_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"payment_method_name" : {
					"column_name" : "payment_method_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"use_for_expenses" : {
					"column_name" : "use_for_expenses",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Use For Expenses"
						}
					}
				},
				"use_for_incomes" : {
					"column_name" : "use_for_incomes",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Use For Incomes"
						}
					}
				},
				"use_for_purchase" : {
					"column_name" : "use_for_purchase",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Use For Purchase"
						}
					}
				},
				"use_for_sales" : {
					"column_name" : "use_for_sales",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Use For Sales"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"payment_method"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"payment_methods"
				}
			}

		},
		"act_tbl_phone_numbers" : {
			 "table_name" : "act_tbl_phone_numbers",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"phone_number_id" : {
					"column_name" : "phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"phone_number_label" : {
					"column_name" : "phone_number_label",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Label"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"phone_number_value" : {
					"column_name" : "phone_number_value",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"phone_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"phone_numbers"
				}
			}

		},
		"act_tbl_price_change_products" : {
			 "table_name" : "act_tbl_price_change_products",
			 "table_columns" : {
				"new_product_price_id" : {
					"column_name" : "new_product_price_id",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "New Price"
						}
					}
				},
				"old_product_price_id" : {
					"column_name" : "old_product_price_id",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Old Price"
						}
					}
				},
				"price_change_id" : {
					"column_name" : "price_change_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Price Change"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"price_change_product_id" : {
					"column_name" : "price_change_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_price_change_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_price_change_products"
				}
			}

		},
		"act_tbl_price_changes" : {
			 "table_name" : "act_tbl_price_changes",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"price_change_datetime" : {
					"column_name" : "price_change_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"price_change_id" : {
					"column_name" : "price_change_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"price_change_name" : {
					"column_name" : "price_change_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"price_change_number" : {
					"column_name" : "price_change_number",
					"column_type" : "auto_number",
					"column_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 10
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "IPU-"
						},
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Number"
						}
					}
				},
				"price_change_reason" : {
					"column_name" : "price_change_reason",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reason"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
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
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Updated By"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_price_change"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_price_changes"
				}
			}

		},
		"act_tbl_product_attributes" : {
			 "table_name" : "act_tbl_product_attributes",
			 "table_columns" : {
				"product_attibute_numeric_value" : {
					"column_name" : "product_attibute_numeric_value",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				},
				"product_attribute_id" : {
					"column_name" : "product_attribute_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"product_attribute_name" : {
					"column_name" : "product_attribute_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_attribute_string_value" : {
					"column_name" : "product_attribute_string_value",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"value_type_lookup_value_id" : {
					"column_name" : "value_type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value Type"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_attribute"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_attributes"
				}
			}

		},
		"act_tbl_product_barcodes" : {
			 "table_name" : "act_tbl_product_barcodes",
			 "table_columns" : {
				"barcode_value" : {
					"column_name" : "barcode_value",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Barcode"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"product_barcode_id" : {
					"column_name" : "product_barcode_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_barcode"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_barcodes"
				}
			}

		},
		"act_tbl_product_categories" : {
			 "table_name" : "act_tbl_product_categories",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"parent_product_categroy_id" : {
					"column_name" : "parent_product_categroy_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Parent Category"
						}
					}
				},
				"product_category_full_description" : {
					"column_name" : "product_category_full_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Full Description"
						}
					}
				},
				"product_category_id" : {
					"column_name" : "product_category_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"product_category_image_media_id" : {
					"column_name" : "product_category_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profile Image"
						}
					}
				},
				"product_category_index" : {
					"column_name" : "product_category_index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"product_category_name" : {
					"column_name" : "product_category_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_category_quick_description" : {
					"column_name" : "product_category_quick_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quick Description"
						}
					}
				},
				"product_category_tree" : {
					"column_name" : "product_category_tree",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Category Tree"
						}
					}
				},
				"purchase_tax_rate_id" : {
					"column_name" : "purchase_tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Tax Rate"
						}
					}
				},
				"purchase_taxing_scheme_id" : {
					"column_name" : "purchase_taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Taxing Scheme"
						}
					}
				},
				"sale_tax_rate_id" : {
					"column_name" : "sale_tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Tax Rate"
						}
					}
				},
				"sale_taxing_scheme_id" : {
					"column_name" : "sale_taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_category"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_categories"
				}
			}

		},
		"act_tbl_product_location_data" : {
			 "table_name" : "act_tbl_product_location_data",
			 "table_columns" : {
				"customer_waitlist_quantity" : {
					"column_name" : "customer_waitlist_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Waitlist Quantity"
						}
					}
				},
				"in_order_quantity" : {
					"column_name" : "in_order_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "In Order Quantity"
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_location_data_id" : {
					"column_name" : "product_location_data_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"stock_quantity" : {
					"column_name" : "stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Stock Quantity"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_tracking_accountee_location"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_tracking_accountee_locations"
				}
			}

		},
		"act_tbl_product_medias" : {
			 "table_name" : "act_tbl_product_medias",
			 "table_columns" : {
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_media_id" : {
					"column_name" : "product_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_medias"
				}
			}

		},
		"act_tbl_product_prices" : {
			 "table_name" : "act_tbl_product_prices",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						}
					}
				},
				"price_mrp" : {
					"column_name" : "price_mrp",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "MRP"
						}
					}
				},
				"price_purchase" : {
					"column_name" : "price_purchase",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Price"
						}
					}
				},
				"price_sale" : {
					"column_name" : "price_sale",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Price"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_price_id" : {
					"column_name" : "product_price_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_price"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_prices"
				}
			}

		},
		"act_tbl_product_reference_urls" : {
			 "table_name" : "act_tbl_product_reference_urls",
			 "table_columns" : {
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_reference_url" : {
					"column_name" : "product_reference_url",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference URL"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_reference_url_id" : {
					"column_name" : "product_reference_url_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"product_reference_url_name" : {
					"column_name" : "product_reference_url_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_reference_url"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_reference_urls"
				}
			}

		},
		"act_tbl_product_storage_location_data" : {
			 "table_name" : "act_tbl_product_storage_location_data",
			 "table_columns" : {
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_storage_location_data_id" : {
					"column_name" : "product_storage_location_data_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"stock_quantity" : {
					"column_name" : "stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Stock Quantity"
						}
					}
				},
				"storage_location_id" : {
					"column_name" : "storage_location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Storage Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_tracking_storage_location"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_tracking_storage_locations"
				}
			}

		},
		"act_tbl_product_uoms" : {
			 "table_name" : "act_tbl_product_uoms",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"uom_name" : {
					"column_name" : "uom_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"uom_quantity" : {
					"column_name" : "uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_uom"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_uoms"
				}
			}

		},
		"act_tbl_product_variant_groups" : {
			 "table_name" : "act_tbl_product_variant_groups",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"product_variant_group_id" : {
					"column_name" : "product_variant_group_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"product_variant_group_name" : {
					"column_name" : "product_variant_group_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Group Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_variant_group"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_variant_groups"
				}
			}

		},
		"act_tbl_product_variants" : {
			 "table_name" : "act_tbl_product_variants",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_variant_group_id" : {
					"column_name" : "product_variant_group_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Variant Group"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_variant_id" : {
					"column_name" : "product_variant_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product_variant"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"product_variants"
				}
			}

		},
		"act_tbl_products" : {
			 "table_name" : "act_tbl_products",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"delivery_home_available" : {
					"column_name" : "delivery_home_available",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Home Delivery Available"
						}
					}
				},
				"delivery_pickup_available" : {
					"column_name" : "delivery_pickup_available",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Pickup Available"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"minimum_order_quantity" : {
					"column_name" : "minimum_order_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Min Order Qty"
						}
					}
				},
				"minimum_order_quantity_uom_id" : {
					"column_name" : "minimum_order_quantity_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Min Order UOM"
						}
					}
				},
				"product_category_id" : {
					"column_name" : "product_category_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Category"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_details" : {
					"column_name" : "product_details",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Details"
						}
					}
				},
				"product_full_description" : {
					"column_name" : "product_full_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Full Description"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"product_image_media_id" : {
					"column_name" : "product_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Image"
						}
					}
				},
				"product_name" : {
					"column_name" : "product_name",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_quick_description" : {
					"column_name" : "product_quick_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quick Description"
						}
					}
				},
				"product_sku" : {
					"column_name" : "product_sku",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "SKU"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_tags" : {
					"column_name" : "product_tags",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tags"
						}
					}
				},
				"purchase_tax_rate_id" : {
					"column_name" : "purchase_tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Tax"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_uom_id" : {
					"column_name" : "purchase_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase UOM"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"sale_tax_rate_id" : {
					"column_name" : "sale_tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Tax"
						}
					}
				},
				"sale_uom_id" : {
					"column_name" : "sale_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale UOM"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"stock_maximum_quantity" : {
					"column_name" : "stock_maximum_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Max Stock"
						}
					}
				},
				"stock_maximum_uom_id" : {
					"column_name" : "stock_maximum_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Max Stock UOM"
						}
					}
				},
				"stock_minimum_quantity" : {
					"column_name" : "stock_minimum_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Min Stock"
						}
					}
				},
				"stock_minimum_uom_id" : {
					"column_name" : "stock_minimum_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Min Stock UOM"
						}
					}
				},
				"stock_quantity" : {
					"column_name" : "stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Stock"
						}
					}
				},
				"stock_reorder_level_quantity" : {
					"column_name" : "stock_reorder_level_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reorder Level"
						}
					}
				},
				"stock_reorder_level_uom_id" : {
					"column_name" : "stock_reorder_level_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reorder Level UOM"
						}
					}
				},
				"stock_uom_id" : {
					"column_name" : "stock_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Stock UOM"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"waitlist_quantity" : {
					"column_name" : "waitlist_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Waitlist Quantity"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"products"
				}
			}

		},
		"act_tbl_purchase_invoice_chargeable_services" : {
			 "table_name" : "act_tbl_purchase_invoice_chargeable_services",
			 "table_columns" : {
				"chargeable_service_charge_actual" : {
					"column_name" : "chargeable_service_charge_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Charge"
						}
					}
				},
				"chargeable_service_charge_gross" : {
					"column_name" : "chargeable_service_charge_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Charge"
						}
					}
				},
				"chargeable_service_charge_net" : {
					"column_name" : "chargeable_service_charge_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Charge"
						}
					}
				},
				"chargeable_service_description" : {
					"column_name" : "chargeable_service_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Description"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service"
						}
					}
				},
				"chargeable_service_quantity" : {
					"column_name" : "chargeable_service_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_uom_id" : {
					"column_name" : "chargeable_service_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_uom_quantity" : {
					"column_name" : "chargeable_service_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"purchase_invoice_chargeable_service_id" : {
					"column_name" : "purchase_invoice_chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_id" : {
					"column_name" : "purchase_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Invoice"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_invoice_chargeable_service"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_invoice_chargeable_services"
				}
			}

		},
		"act_tbl_purchase_invoice_expenses" : {
			 "table_name" : "act_tbl_purchase_invoice_expenses",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"payment_method_id" : {
					"column_name" : "payment_method_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Payment Method"
						}
					}
				},
				"purchase_invoice_expense_amount" : {
					"column_name" : "purchase_invoice_expense_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_expense_datetime" : {
					"column_name" : "purchase_invoice_expense_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_expense_id" : {
					"column_name" : "purchase_invoice_expense_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_id" : {
					"column_name" : "purchase_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Invoice"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_invoice_expense"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_invoice_expenses"
				}
			}

		},
		"act_tbl_purchase_invoice_payments" : {
			 "table_name" : "act_tbl_purchase_invoice_payments",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"payment_method_id" : {
					"column_name" : "payment_method_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Payment Method"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_id" : {
					"column_name" : "purchase_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Invoice"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_payment_amount" : {
					"column_name" : "purchase_invoice_payment_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_payment_datetime" : {
					"column_name" : "purchase_invoice_payment_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_payment_id" : {
					"column_name" : "purchase_invoice_payment_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_invoice_payment"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_invoice_payments"
				}
			}

		},
		"act_tbl_purchase_invoice_products" : {
			 "table_name" : "act_tbl_purchase_invoice_products",
			 "table_columns" : {
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"inventory_tracking_id" : {
					"column_name" : "inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Inventory Tracking"
						}
					}
				},
				"product_description" : {
					"column_name" : "product_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Description"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_price_actual" : {
					"column_name" : "product_price_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Price"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_price_gross" : {
					"column_name" : "product_price_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Price"
						}
					}
				},
				"product_price_net" : {
					"column_name" : "product_price_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Price"
						}
					}
				},
				"product_quantity" : {
					"column_name" : "product_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"product_uom_quantity" : {
					"column_name" : "product_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"purchase_invoice_id" : {
					"column_name" : "purchase_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Invoice"
						}
					}
				},
				"purchase_invoice_product_id" : {
					"column_name" : "purchase_invoice_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_invoice_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_invoice_products"
				}
			}

		},
		"act_tbl_purchase_invoices" : {
			 "table_name" : "act_tbl_purchase_invoices",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"device_id" : {
					"column_name" : "device_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Device"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange  Rate"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"profit_margin_percentage" : {
					"column_name" : "profit_margin_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Profit Margin%"
						}
					}
				},
				"purchase_invoice_amount" : {
					"column_name" : "purchase_invoice_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_datetime" : {
					"column_name" : "purchase_invoice_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_id" : {
					"column_name" : "purchase_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_invoice_number" : {
					"column_name" : "purchase_invoice_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Invoice#"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_term_id" : {
					"column_name" : "purchase_term_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Terms"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_invoice"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_invoices"
				}
			}

		},
		"act_tbl_purchase_order_chargeable_services" : {
			 "table_name" : "act_tbl_purchase_order_chargeable_services",
			 "table_columns" : {
				"chargeable_service_charge_actual" : {
					"column_name" : "chargeable_service_charge_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Charge"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_charge_gross" : {
					"column_name" : "chargeable_service_charge_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Charge"
						}
					}
				},
				"chargeable_service_charge_net" : {
					"column_name" : "chargeable_service_charge_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Charge"
						}
					}
				},
				"chargeable_service_description" : {
					"column_name" : "chargeable_service_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Description"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_quantity" : {
					"column_name" : "chargeable_service_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_uom_id" : {
					"column_name" : "chargeable_service_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"chargeable_service_uom_quantity" : {
					"column_name" : "chargeable_service_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"purchase_order_chargeable_service_id" : {
					"column_name" : "purchase_order_chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_order_id" : {
					"column_name" : "purchase_order_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Order"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_order_chargeable_service"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_order_chargeable_services"
				}
			}

		},
		"act_tbl_purchase_order_expenses" : {
			 "table_name" : "act_tbl_purchase_order_expenses",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"payment_method_id" : {
					"column_name" : "payment_method_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Payment Method"
						}
					}
				},
				"purchase_invoice_id" : {
					"column_name" : "purchase_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Invoice"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_order_expense_amount" : {
					"column_name" : "purchase_order_expense_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_order_expense_datetime" : {
					"column_name" : "purchase_order_expense_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_order_expense_id" : {
					"column_name" : "purchase_order_expense_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_order_expense"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_order_expenses"
				}
			}

		},
		"act_tbl_purchase_order_payments" : {
			 "table_name" : "act_tbl_purchase_order_payments",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"payment_method_id" : {
					"column_name" : "payment_method_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Payment Method"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_order_id" : {
					"column_name" : "purchase_order_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Order"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_order_payment_amount" : {
					"column_name" : "purchase_order_payment_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_order_payment_datetime" : {
					"column_name" : "purchase_order_payment_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"purchase_order_payment_id" : {
					"column_name" : "purchase_order_payment_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_order_payment"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_order_payments"
				}
			}

		},
		"act_tbl_purchase_order_products" : {
			 "table_name" : "act_tbl_purchase_order_products",
			 "table_columns" : {
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"inventory_tracking_id" : {
					"column_name" : "inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Inventory Tracking"
						}
					}
				},
				"product_description" : {
					"column_name" : "product_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Description"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"product_price_actual" : {
					"column_name" : "product_price_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Price"
						}
					}
				},
				"product_price_gross" : {
					"column_name" : "product_price_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Price"
						}
					}
				},
				"product_price_net" : {
					"column_name" : "product_price_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Price"
						}
					}
				},
				"product_quantity" : {
					"column_name" : "product_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"product_uom_quantity" : {
					"column_name" : "product_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"purchase_order_id" : {
					"column_name" : "purchase_order_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Order"
						}
					}
				},
				"purchase_order_product_id" : {
					"column_name" : "purchase_order_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_order_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_order_products"
				}
			}

		},
		"act_tbl_purchase_orders" : {
			 "table_name" : "act_tbl_purchase_orders",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"purchase_order_amount" : {
					"column_name" : "purchase_order_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"purchase_order_datetime" : {
					"column_name" : "purchase_order_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"purchase_order_id" : {
					"column_name" : "purchase_order_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_order_number" : {
					"column_name" : "purchase_order_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Order#"
						}
					}
				},
				"purchase_term_id" : {
					"column_name" : "purchase_term_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Terms"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_order"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_orders"
				}
			}

		},
		"act_tbl_purchase_return_chargeable_services" : {
			 "table_name" : "act_tbl_purchase_return_chargeable_services",
			 "table_columns" : {
				"chargeable_service_charge_actual" : {
					"column_name" : "chargeable_service_charge_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Charge"
						}
					}
				},
				"chargeable_service_charge_gross" : {
					"column_name" : "chargeable_service_charge_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Charge"
						}
					}
				},
				"chargeable_service_charge_net" : {
					"column_name" : "chargeable_service_charge_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Charge"
						}
					}
				},
				"chargeable_service_description" : {
					"column_name" : "chargeable_service_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service Description"
						}
					}
				},
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service"
						}
					}
				},
				"chargeable_service_quantity" : {
					"column_name" : "chargeable_service_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"chargeable_service_uom_id" : {
					"column_name" : "chargeable_service_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"chargeable_service_uom_quantity" : {
					"column_name" : "chargeable_service_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"purchase_return_chargeable_service_id" : {
					"column_name" : "purchase_return_chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_return_id" : {
					"column_name" : "purchase_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Debit Note"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_debit_note_chargeable_service"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_debit_note_chargeable_services"
				}
			}

		},
		"act_tbl_purchase_return_expenses" : {
			 "table_name" : "act_tbl_purchase_return_expenses",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						}
					}
				},
				"purchase_return_expense_amount" : {
					"column_name" : "purchase_return_expense_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"purchase_return_expense_datetime" : {
					"column_name" : "purchase_return_expense_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"purchase_return_expense_id" : {
					"column_name" : "purchase_return_expense_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_return_id" : {
					"column_name" : "purchase_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Debit Note"
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_debit_note_expense"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_debit_note_expenses"
				}
			}

		},
		"act_tbl_purchase_return_payments" : {
			 "table_name" : "act_tbl_purchase_return_payments",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"payment_method_id" : {
					"column_name" : "payment_method_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Payment Method"
						}
					}
				},
				"purchase_return_id" : {
					"column_name" : "purchase_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Debit Note"
						}
					}
				},
				"purchase_return_payment_amount" : {
					"column_name" : "purchase_return_payment_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"purchase_return_payment_datetime" : {
					"column_name" : "purchase_return_payment_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"purchase_return_payment_id" : {
					"column_name" : "purchase_return_payment_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_debit_note_payment"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_debit_note_payments"
				}
			}

		},
		"act_tbl_purchase_return_products" : {
			 "table_name" : "act_tbl_purchase_return_products",
			 "table_columns" : {
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"inward_inventory_tracking_id" : {
					"column_name" : "inward_inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Inventory Tracking"
						}
					}
				},
				"product_description" : {
					"column_name" : "product_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Description"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"product_price_actual" : {
					"column_name" : "product_price_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Price"
						}
					}
				},
				"product_price_gross" : {
					"column_name" : "product_price_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Price"
						}
					}
				},
				"product_price_net" : {
					"column_name" : "product_price_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Price"
						}
					}
				},
				"product_quantity" : {
					"column_name" : "product_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"product_uom_quantity" : {
					"column_name" : "product_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"purchase_debit_note_product_id" : {
					"column_name" : "purchase_debit_note_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_return_id" : {
					"column_name" : "purchase_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Debit Note"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_debit_note_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_debit_note_products"
				}
			}

		},
		"act_tbl_purchase_returns" : {
			 "table_name" : "act_tbl_purchase_returns",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"audio_attachments" : {
					"column_name" : "audio_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Audio Recordings"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"device_id" : {
					"column_name" : "device_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Device"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"purchase_invoice_id" : {
					"column_name" : "purchase_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Invoice"
						}
					}
				},
				"purchase_return_amount" : {
					"column_name" : "purchase_return_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"purchase_return_datetime" : {
					"column_name" : "purchase_return_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"purchase_return_id" : {
					"column_name" : "purchase_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_return_number" : {
					"column_name" : "purchase_return_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Note#"
						}
					}
				},
				"purchase_terms_id" : {
					"column_name" : "purchase_terms_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Terms"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_debit_note"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_debit_notes"
				}
			}

		},
		"act_tbl_purchase_terms" : {
			 "table_name" : "act_tbl_purchase_terms",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"purchase_term_id" : {
					"column_name" : "purchase_term_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"purchase_term_name" : {
					"column_name" : "purchase_term_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"purchase_term"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"purchase_terms"
				}
			}

		},
		"act_tbl_sale_coupon_issues" : {
			 "table_name" : "act_tbl_sale_coupon_issues",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_coupon_id" : {
					"column_name" : "sale_coupon_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Coupon"
						}
					}
				},
				"sale_coupon_issue_id" : {
					"column_name" : "sale_coupon_issue_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_coupon_issue_identifier" : {
					"column_name" : "sale_coupon_issue_identifier",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Coupon Identifier"
						},
						"unique_key" : {
							"property_name" : "unique_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_coupon_issue"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_coupon_issues"
				}
			}

		},
		"act_tbl_sale_coupon_uses" : {
			 "table_name" : "act_tbl_sale_coupon_uses",
			 "table_columns" : {
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_coupon_id" : {
					"column_name" : "sale_coupon_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Coupon"
						}
					}
				},
				"sale_coupon_issue_id" : {
					"column_name" : "sale_coupon_issue_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Coupon Issue"
						}
					}
				},
				"sale_coupon_use_id" : {
					"column_name" : "sale_coupon_use_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_coupon_use"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_coupon_uses"
				}
			}

		},
		"act_tbl_sale_coupons" : {
			 "table_name" : "act_tbl_sale_coupons",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"calculation_method_lookup_value_id" : {
					"column_name" : "calculation_method_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Calculation"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_coupon_amount" : {
					"column_name" : "sale_coupon_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_coupon_code" : {
					"column_name" : "sale_coupon_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Code"
						},
						"unique_key" : {
							"property_name" : "unique_key",
							"property_value" : true
						}
					}
				},
				"sale_coupon_id" : {
					"column_name" : "sale_coupon_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_coupon_name" : {
					"column_name" : "sale_coupon_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						}
					}
				},
				"sale_coupon_percentage" : {
					"column_name" : "sale_coupon_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Coupon%"
						}
					}
				},
				"sale_coupon_validity_end_datetime" : {
					"column_name" : "sale_coupon_validity_end_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_coupon_validity_start_datetime" : {
					"column_name" : "sale_coupon_validity_start_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_coupon"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_coupons"
				}
			}

		},
		"act_tbl_sale_invoice_chargable_services" : {
			 "table_name" : "act_tbl_sale_invoice_chargable_services",
			 "table_columns" : {
				"chargeable_service_charge_actual" : {
					"column_name" : "chargeable_service_charge_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Charge"
						}
					}
				},
				"chargeable_service_charge_gross" : {
					"column_name" : "chargeable_service_charge_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Charge"
						}
					}
				},
				"chargeable_service_charge_net" : {
					"column_name" : "chargeable_service_charge_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Charge"
						}
					}
				},
				"chargeable_service_description" : {
					"column_name" : "chargeable_service_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service Description"
						}
					}
				},
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service"
						}
					}
				},
				"chargeable_service_quantity" : {
					"column_name" : "chargeable_service_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"chargeable_service_uom_id" : {
					"column_name" : "chargeable_service_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"chargeable_service_uom_quantity" : {
					"column_name" : "chargeable_service_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"sale_invoice_chargeable_service_id" : {
					"column_name" : "sale_invoice_chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_invoice_id" : {
					"column_name" : "sale_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Invoice"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_invoice_chargeable_service"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_invoice_chargeable_services"
				}
			}

		},
		"act_tbl_sale_invoice_expenses" : {
			 "table_name" : "act_tbl_sale_invoice_expenses",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_invoice_expense_amount" : {
					"column_name" : "sale_invoice_expense_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_invoice_expense_datetime" : {
					"column_name" : "sale_invoice_expense_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_invoice_expense_id" : {
					"column_name" : "sale_invoice_expense_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_invoice_id" : {
					"column_name" : "sale_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Invoice"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_invoice_expense"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_invoice_expenses"
				}
			}

		},
		"act_tbl_sale_invoice_payments" : {
			 "table_name" : "act_tbl_sale_invoice_payments",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"payment_method_id" : {
					"column_name" : "payment_method_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Payment Method"
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_invoice_id" : {
					"column_name" : "sale_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Invoice"
						}
					}
				},
				"sale_invoice_payment_amount" : {
					"column_name" : "sale_invoice_payment_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_invoice_payment_datetime" : {
					"column_name" : "sale_invoice_payment_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_invoice_payment_id" : {
					"column_name" : "sale_invoice_payment_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_invoice_payment"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_invoice_payments"
				}
			}

		},
		"act_tbl_sale_invoice_products" : {
			 "table_name" : "act_tbl_sale_invoice_products",
			 "table_columns" : {
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"inventory_tracking_id" : {
					"column_name" : "inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Inventory Tracking"
						}
					}
				},
				"product_description" : {
					"column_name" : "product_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Description"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"product_price_actual" : {
					"column_name" : "product_price_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Price"
						}
					}
				},
				"product_price_gross" : {
					"column_name" : "product_price_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Price"
						}
					}
				},
				"product_price_net" : {
					"column_name" : "product_price_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Price"
						}
					}
				},
				"product_quantity" : {
					"column_name" : "product_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"product_uom_quantity" : {
					"column_name" : "product_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"sale_invoice_id" : {
					"column_name" : "sale_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Invoice"
						}
					}
				},
				"sale_invoice_product_id" : {
					"column_name" : "sale_invoice_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_invoice_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_invoice_products"
				}
			}

		},
		"act_tbl_sale_invoices" : {
			 "table_name" : "act_tbl_sale_invoices",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						}
					}
				},
				"device_id" : {
					"column_name" : "device_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Device"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_invoice_amount" : {
					"column_name" : "sale_invoice_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_invoice_datetime" : {
					"column_name" : "sale_invoice_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_invoice_id" : {
					"column_name" : "sale_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_invoice_number" : {
					"column_name" : "sale_invoice_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Invoice#"
						}
					}
				},
				"sale_term_id" : {
					"column_name" : "sale_term_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Terms"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_invoice"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_invoices"
				}
			}

		},
		"act_tbl_sale_maintenance_chargeable_services" : {
			 "table_name" : "act_tbl_sale_maintenance_chargeable_services",
			 "table_columns" : {
				"chargeable_service_charge_actual" : {
					"column_name" : "chargeable_service_charge_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Charge"
						}
					}
				},
				"chargeable_service_charge_gross" : {
					"column_name" : "chargeable_service_charge_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Charge"
						}
					}
				},
				"chargeable_service_charge_net" : {
					"column_name" : "chargeable_service_charge_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Charge"
						}
					}
				},
				"chargeable_service_description" : {
					"column_name" : "chargeable_service_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service Description"
						}
					}
				},
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service"
						}
					}
				},
				"chargeable_service_quantity" : {
					"column_name" : "chargeable_service_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"chargeable_service_uom_id" : {
					"column_name" : "chargeable_service_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"chargeable_service_uom_quantity" : {
					"column_name" : "chargeable_service_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"sale_maintenance_chargeable_service_id" : {
					"column_name" : "sale_maintenance_chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_maintenance_id" : {
					"column_name" : "sale_maintenance_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Maintenance"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_maintenance_chargeable_services"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_maintenance_chargeable_services"
				}
			}

		},
		"act_tbl_sale_maintenance_expenses" : {
			 "table_name" : "act_tbl_sale_maintenance_expenses",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_maintenance_expense_amount" : {
					"column_name" : "sale_maintenance_expense_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_maintenance_expense_datetime" : {
					"column_name" : "sale_maintenance_expense_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_maintenance_expense_id" : {
					"column_name" : "sale_maintenance_expense_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_maintenance_id" : {
					"column_name" : "sale_maintenance_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Maintenance"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_maintenance_expense"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_maintenance_expenses"
				}
			}

		},
		"act_tbl_sale_maintenance_payments" : {
			 "table_name" : "act_tbl_sale_maintenance_payments",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"payment_method_id" : {
					"column_name" : "payment_method_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Payment Method"
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_maintenance_id" : {
					"column_name" : "sale_maintenance_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Maintenance"
						}
					}
				},
				"sale_maintenance_payment_amount" : {
					"column_name" : "sale_maintenance_payment_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_maintenance_payment_datetime" : {
					"column_name" : "sale_maintenance_payment_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_maintenance_payment_id" : {
					"column_name" : "sale_maintenance_payment_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_maintenance_payment"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_maintenance_payments"
				}
			}

		},
		"act_tbl_sale_maintenance_products" : {
			 "table_name" : "act_tbl_sale_maintenance_products",
			 "table_columns" : {
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"inventory_tracking_id" : {
					"column_name" : "inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Inventory Tracking"
						}
					}
				},
				"product_description" : {
					"column_name" : "product_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Description"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"product_price_actual" : {
					"column_name" : "product_price_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Price"
						}
					}
				},
				"product_price_gross" : {
					"column_name" : "product_price_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Price"
						}
					}
				},
				"product_price_net" : {
					"column_name" : "product_price_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Price"
						}
					}
				},
				"product_quantity" : {
					"column_name" : "product_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"product_uom_quantity" : {
					"column_name" : "product_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"sale_maintenance_id" : {
					"column_name" : "sale_maintenance_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Maintenance"
						}
					}
				},
				"sale_maintenance_product_id" : {
					"column_name" : "sale_maintenance_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_maintenance_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_maintenance_product"
				}
			}

		},
		"act_tbl_sale_maintenances" : {
			 "table_name" : "act_tbl_sale_maintenances",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"audio_attachments" : {
					"column_name" : "audio_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Audio Recordings"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						}
					}
				},
				"device_id" : {
					"column_name" : "device_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Device"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_invoice_id" : {
					"column_name" : "sale_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Invoice"
						}
					}
				},
				"sale_maintenance_amount" : {
					"column_name" : "sale_maintenance_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_maintenance_datetime" : {
					"column_name" : "sale_maintenance_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_maintenance_id" : {
					"column_name" : "sale_maintenance_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_maintenance_number" : {
					"column_name" : "sale_maintenance_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Maintenance#"
						}
					}
				},
				"sale_terms_id" : {
					"column_name" : "sale_terms_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Terms"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_maintenance"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_maintenances"
				}
			}

		},
		"act_tbl_sale_offer_products" : {
			 "table_name" : "act_tbl_sale_offer_products",
			 "table_columns" : {
				"discount_type_lookup_value_id" : {
					"column_name" : "discount_type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
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
					"column_name" : "discount_value",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Discount Value"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"is_selected" : {
					"column_name" : "is_selected",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Selected?"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "YES"
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
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_offer_id" : {
					"column_name" : "sale_offer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Offer"
						}
					}
				},
				"sale_offer_product_id" : {
					"column_name" : "sale_offer_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_offer_product_price" : {
					"column_name" : "sale_offer_product_price",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Offer Price"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_offer_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_offer_products"
				}
			}

		},
		"act_tbl_sale_offers" : {
			 "table_name" : "act_tbl_sale_offers",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"apply_to" : {
					"column_name" : "apply_to",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Apply To"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ALL ITEMS"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ALL ITEMS","value":"ALL ITEMS"},{"label":"INCLUDE SELECTED ITEMS","value":"INCLUDE SELECTED ITEMS"},{"label":"EXCLUDE SELECTED ITEMS","value":"EXCLUDE SELECTED ITEMS"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"discount_type_lookup_value_id" : {
					"column_name" : "discount_type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Discount Type"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PERCENTAGE","value":"PERCENTAGE"},{"label":"AMOUNT","value":"AMOUNT"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"discount_value" : {
					"column_name" : "discount_value",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Discount Value"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_offer_end_datetime" : {
					"column_name" : "sale_offer_end_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "End Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"sale_offer_id" : {
					"column_name" : "sale_offer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_offer_name" : {
					"column_name" : "sale_offer_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Offer Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"sale_offer_start_datetime" : {
					"column_name" : "sale_offer_start_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Start Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_offer"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_offers"
				}
			}

		},
		"act_tbl_sale_quotation_chargeable_services" : {
			 "table_name" : "act_tbl_sale_quotation_chargeable_services",
			 "table_columns" : {
				"chargeable_service_charge_actual" : {
					"column_name" : "chargeable_service_charge_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Charge"
						}
					}
				},
				"chargeable_service_charge_gross" : {
					"column_name" : "chargeable_service_charge_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Charge"
						}
					}
				},
				"chargeable_service_charge_net" : {
					"column_name" : "chargeable_service_charge_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Charge"
						}
					}
				},
				"chargeable_service_description" : {
					"column_name" : "chargeable_service_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service Description"
						}
					}
				},
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service"
						}
					}
				},
				"chargeable_service_quantity" : {
					"column_name" : "chargeable_service_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"chargeable_service_uom_id" : {
					"column_name" : "chargeable_service_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"chargeable_service_uom_quantity" : {
					"column_name" : "chargeable_service_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"sale_quotation_chargeable_service_id" : {
					"column_name" : "sale_quotation_chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_quotation_id" : {
					"column_name" : "sale_quotation_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Quotation"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_quotation_chargeable_service"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_quotation_chargeable_services"
				}
			}

		},
		"act_tbl_sale_quotation_expenses" : {
			 "table_name" : "act_tbl_sale_quotation_expenses",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_quotation_expense_amount" : {
					"column_name" : "sale_quotation_expense_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_quotation_expense_datetime" : {
					"column_name" : "sale_quotation_expense_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_quotation_expense_id" : {
					"column_name" : "sale_quotation_expense_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_quotation_id" : {
					"column_name" : "sale_quotation_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Quotation"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_quotation_expense"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_quotation_expenses"
				}
			}

		},
		"act_tbl_sale_quotation_products" : {
			 "table_name" : "act_tbl_sale_quotation_products",
			 "table_columns" : {
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"product_description" : {
					"column_name" : "product_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Description"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"product_price_actual" : {
					"column_name" : "product_price_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Price"
						}
					}
				},
				"product_price_gross" : {
					"column_name" : "product_price_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Price"
						}
					}
				},
				"product_price_net" : {
					"column_name" : "product_price_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Price"
						}
					}
				},
				"product_quantity" : {
					"column_name" : "product_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"product_uom_quantity" : {
					"column_name" : "product_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"sale_quotation_id" : {
					"column_name" : "sale_quotation_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Quotation"
						}
					}
				},
				"sale_quotation_product_id" : {
					"column_name" : "sale_quotation_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_quotation_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_quotation_products"
				}
			}

		},
		"act_tbl_sale_quotations" : {
			 "table_name" : "act_tbl_sale_quotations",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_quotation_amount" : {
					"column_name" : "sale_quotation_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_quotation_datetime" : {
					"column_name" : "sale_quotation_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_quotation_id" : {
					"column_name" : "sale_quotation_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_quotation_number" : {
					"column_name" : "sale_quotation_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quotation#"
						}
					}
				},
				"sale_term_id" : {
					"column_name" : "sale_term_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Terms"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_quotation"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_quotations"
				}
			}

		},
		"act_tbl_sale_return_chargeable_services" : {
			 "table_name" : "act_tbl_sale_return_chargeable_services",
			 "table_columns" : {
				"chargeable_service_charge_actual" : {
					"column_name" : "chargeable_service_charge_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Charge"
						}
					}
				},
				"chargeable_service_charge_gross" : {
					"column_name" : "chargeable_service_charge_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Charge"
						}
					}
				},
				"chargeable_service_charge_net" : {
					"column_name" : "chargeable_service_charge_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Charge"
						}
					}
				},
				"chargeable_service_description" : {
					"column_name" : "chargeable_service_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service Description"
						}
					}
				},
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service"
						}
					}
				},
				"chargeable_service_quantity" : {
					"column_name" : "chargeable_service_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"chargeable_service_uom_id" : {
					"column_name" : "chargeable_service_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"chargeable_service_uom_quantity" : {
					"column_name" : "chargeable_service_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"sale_return_chargeable_service_id" : {
					"column_name" : "sale_return_chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_return_id" : {
					"column_name" : "sale_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Debit Note"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_debit_note_chargeable_service"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_debit_note_chargeable_services"
				}
			}

		},
		"act_tbl_sale_return_expenses" : {
			 "table_name" : "act_tbl_sale_return_expenses",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_return_expense_amount" : {
					"column_name" : "sale_return_expense_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_return_expense_datetime" : {
					"column_name" : "sale_return_expense_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_return_expense_id" : {
					"column_name" : "sale_return_expense_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_return_id" : {
					"column_name" : "sale_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Debit Note"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_debit_note_expense"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_debit_note_expenses"
				}
			}

		},
		"act_tbl_sale_return_payments" : {
			 "table_name" : "act_tbl_sale_return_payments",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"payment_method_id" : {
					"column_name" : "payment_method_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Payment Method"
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_return_id" : {
					"column_name" : "sale_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Debit Note"
						}
					}
				},
				"sale_return_payment_amount" : {
					"column_name" : "sale_return_payment_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_return_payment_datetime" : {
					"column_name" : "sale_return_payment_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_return_payment_id" : {
					"column_name" : "sale_return_payment_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_debit_note_payment"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_debit_note_payments"
				}
			}

		},
		"act_tbl_sale_return_products" : {
			 "table_name" : "act_tbl_sale_return_products",
			 "table_columns" : {
				"discount_cash_percentage" : {
					"column_name" : "discount_cash_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "CD%"
						}
					}
				},
				"discount_rebate_percentage" : {
					"column_name" : "discount_rebate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Rebate%"
						}
					}
				},
				"discount_trade_percentage" : {
					"column_name" : "discount_trade_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "TD%"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"inward_inventory_tracking_id" : {
					"column_name" : "inward_inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Inventory Tracking"
						}
					}
				},
				"product_description" : {
					"column_name" : "product_description",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Description"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"product_price_actual" : {
					"column_name" : "product_price_actual",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Actual Price"
						}
					}
				},
				"product_price_gross" : {
					"column_name" : "product_price_gross",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Gross Price"
						}
					}
				},
				"product_price_net" : {
					"column_name" : "product_price_net",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Net Price"
						}
					}
				},
				"product_quantity" : {
					"column_name" : "product_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"product_uom_quantity" : {
					"column_name" : "product_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"sale_return_id" : {
					"column_name" : "sale_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Debit Note"
						}
					}
				},
				"sale_return_product_id" : {
					"column_name" : "sale_return_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_debit_note_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_debit_note_products"
				}
			}

		},
		"act_tbl_sale_returns" : {
			 "table_name" : "act_tbl_sale_returns",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Company"
						}
					}
				},
				"audio_attachments" : {
					"column_name" : "audio_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Audio Recordings"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"customer_id" : {
					"column_name" : "customer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Customer"
						}
					}
				},
				"device_id" : {
					"column_name" : "device_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Device"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency Rate"
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_invoice_id" : {
					"column_name" : "sale_invoice_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sale Invoice"
						}
					}
				},
				"sale_return_amount" : {
					"column_name" : "sale_return_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						}
					}
				},
				"sale_return_datetime" : {
					"column_name" : "sale_return_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"sale_return_id" : {
					"column_name" : "sale_return_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_return_number" : {
					"column_name" : "sale_return_number",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Note#"
						}
					}
				},
				"sale_terms_id" : {
					"column_name" : "sale_terms_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Terms"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_debit_note"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_debit_notes"
				}
			}

		},
		"act_tbl_sale_terms" : {
			 "table_name" : "act_tbl_sale_terms",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"sale_term_id" : {
					"column_name" : "sale_term_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"sale_term_name" : {
					"column_name" : "sale_term_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"sale_term"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"sale_terms"
				}
			}

		},
		"act_tbl_signatures" : {
			 "table_name" : "act_tbl_signatures",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"signature_datetime" : {
					"column_name" : "signature_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						}
					}
				},
				"signature_details" : {
					"column_name" : "signature_details",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Details"
						}
					}
				},
				"signature_id" : {
					"column_name" : "signature_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"signature_media_id" : {
					"column_name" : "signature_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Signature"
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"signature"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"signatures"
				}
			}

		},
		"act_tbl_social_medias" : {
			 "table_name" : "act_tbl_social_medias",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"social_media_id" : {
					"column_name" : "social_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"social_media_type" : {
					"column_name" : "social_media_type",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				},
				"social_media_value" : {
					"column_name" : "social_media_value",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"social_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"social_medias"
				}
			}

		},
		"act_tbl_stock_audit_product_storage_locations" : {
			 "table_name" : "act_tbl_stock_audit_product_storage_locations",
			 "table_columns" : {
				"found_quantity" : {
					"column_name" : "found_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Found Quantity"
						}
					}
				},
				"found_uom_quantity" : {
					"column_name" : "found_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Found Quantity"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_audit_product_id" : {
					"column_name" : "stock_audit_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Audit Item"
						}
					}
				},
				"stock_audit_product_storage_location_id" : {
					"column_name" : "stock_audit_product_storage_location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_quantity" : {
					"column_name" : "stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Stock Quantity"
						}
					}
				},
				"stock_uom_quantity" : {
					"column_name" : "stock_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Stock Quantity"
						}
					}
				},
				"storage_location_id" : {
					"column_name" : "storage_location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Storage Location"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"stock_audit_product_storage_location"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"stock_audit_product_storage_locations"
				}
			}

		},
		"act_tbl_stock_audit_products" : {
			 "table_name" : "act_tbl_stock_audit_products",
			 "table_columns" : {
				"found_quantity" : {
					"column_name" : "found_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Found Quantity"
						}
					}
				},
				"found_uom_quantity" : {
					"column_name" : "found_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Found Quantity"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"AUDITED","value":"AUDITED"},{"label":"MISSING","value":"MISSING"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_audit_id" : {
					"column_name" : "stock_audit_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Audit"
						}
					}
				},
				"stock_audit_product_id" : {
					"column_name" : "stock_audit_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_quantity" : {
					"column_name" : "stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Stock Quantity"
						}
					}
				},
				"stock_uom_quantity" : {
					"column_name" : "stock_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Stock Quantity"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"stock_audit_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"stock_audit_products"
				}
			}

		},
		"act_tbl_stock_audits" : {
			 "table_name" : "act_tbl_stock_audits",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"STARTED","value":"STARTED"},{"label":"CANCELLED","value":"CANCELLED"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_audit_datetime" : {
					"column_name" : "stock_audit_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"stock_audit_id" : {
					"column_name" : "stock_audit_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_audit_number" : {
					"column_name" : "stock_audit_number",
					"column_type" : "auto_number",
					"column_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "AUD-"
						},
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Audit Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"stock_audit"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"stock_audits"
				}
			}

		},
		"act_tbl_stock_transfer_packing_products" : {
			 "table_name" : "act_tbl_stock_transfer_packing_products",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"product_quantity" : {
					"column_name" : "product_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"product_uom_quantity" : {
					"column_name" : "product_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Quantity"
						}
					}
				},
				"stock_transfer_packing_id" : {
					"column_name" : "stock_transfer_packing_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transfer Packing"
						}
					}
				},
				"stock_transfer_packing_item_id" : {
					"column_name" : "stock_transfer_packing_item_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_transfer_product_id" : {
					"column_name" : "stock_transfer_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transfer Item"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"stock_transfer_packing_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"stock_transfer_packing_products"
				}
			}

		},
		"act_tbl_stock_transfer_packings" : {
			 "table_name" : "act_tbl_stock_transfer_packings",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"packing_attachments" : {
					"column_name" : "packing_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Attachments"
						}
					}
				},
				"packing_audio_attachments" : {
					"column_name" : "packing_audio_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Audio Recordings"
						}
					}
				},
				"packing_name" : {
					"column_name" : "packing_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Name"
						}
					}
				},
				"packing_remarks" : {
					"column_name" : "packing_remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Remarks"
						}
					}
				},
				"packing_status_lookup_value_id" : {
					"column_name" : "packing_status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_transfer_id" : {
					"column_name" : "stock_transfer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transfer"
						}
					}
				},
				"stock_transfer_packing_id" : {
					"column_name" : "stock_transfer_packing_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_transfer_packing_number" : {
					"column_name" : "stock_transfer_packing_number",
					"column_type" : "auto_number",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transfer Packing Number"
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Type"
						}
					}
				},
				"unpacking_attachments" : {
					"column_name" : "unpacking_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Unpacking Attachments"
						}
					}
				},
				"unpacking_audio_attachments" : {
					"column_name" : "unpacking_audio_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Unpacking Audio Recordings"
						}
					}
				},
				"unpacking_remarks" : {
					"column_name" : "unpacking_remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Unpacking Remarks"
						}
					}
				},
				"unpacking_status_lookup_value_id" : {
					"column_name" : "unpacking_status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Unpacking Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"stock_transfer_packing"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"stock_transfer_packings"
				}
			}

		},
		"act_tbl_stock_transfer_products" : {
			 "table_name" : "act_tbl_stock_transfer_products",
			 "table_columns" : {
				"destination_inventory_tracking_id" : {
					"column_name" : "destination_inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Destination Inventory Tracking"
						}
					}
				},
				"destination_new_stock_quantity" : {
					"column_name" : "destination_new_stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Destination New Stock Quantity"
						}
					}
				},
				"destination_new_stock_uom_quantity" : {
					"column_name" : "destination_new_stock_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Destination New Stock Quantity"
						}
					}
				},
				"destination_old_stock_quantity" : {
					"column_name" : "destination_old_stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Destination Old Stock Quantity"
						}
					}
				},
				"destination_old_stock_uom_quantity" : {
					"column_name" : "destination_old_stock_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Destination Old Stock Quantity"
						}
					}
				},
				"destination_quantity" : {
					"column_name" : "destination_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Destination Quantity"
						}
					}
				},
				"destination_uom_quantity" : {
					"column_name" : "destination_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Destination Quantity"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"packing_attachments" : {
					"column_name" : "packing_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Attachments"
						}
					}
				},
				"packing_audio_attachments" : {
					"column_name" : "packing_audio_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Audio Recordings"
						}
					}
				},
				"packing_remarks" : {
					"column_name" : "packing_remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Remarks"
						}
					}
				},
				"packing_status_lookup_value_id" : {
					"column_name" : "packing_status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Packing Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"product_description" : {
					"column_name" : "product_description",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Prouct Description"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"source_inventory_tracking_id" : {
					"column_name" : "source_inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Source Inventory Tracking"
						}
					}
				},
				"source_new_stock_quantity" : {
					"column_name" : "source_new_stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Source New Stock"
						}
					}
				},
				"source_new_stock_uom_quantity" : {
					"column_name" : "source_new_stock_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Source New Stock Unit"
						}
					}
				},
				"source_old_stock_quantity" : {
					"column_name" : "source_old_stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Source Old Stock"
						}
					}
				},
				"source_old_stock_uom_quantity" : {
					"column_name" : "source_old_stock_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Source Old Stock"
						}
					}
				},
				"source_quantity" : {
					"column_name" : "source_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Source Quantity"
						}
					}
				},
				"source_uom_quantity" : {
					"column_name" : "source_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Source Quantity"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"IN TRANSIT","value":"IN TRANSIT"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_transfer_id" : {
					"column_name" : "stock_transfer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transfer"
						}
					}
				},
				"stock_transfer_product_id" : {
					"column_name" : "stock_transfer_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"unpacking_attachments" : {
					"column_name" : "unpacking_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Unpacking Attachments"
						}
					}
				},
				"unpacking_audio_attachments" : {
					"column_name" : "unpacking_audio_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Unpacking Audio Recordings"
						}
					}
				},
				"unpacking_remarks" : {
					"column_name" : "unpacking_remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Unpacking Remarks"
						}
					}
				},
				"unpacking_status_lookup_value_id" : {
					"column_name" : "unpacking_status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Unpacking Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"COMPLETED","value":"COMPLETED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"stock_transfer_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"stock_transfer_products"
				}
			}

		},
		"act_tbl_stock_transfers" : {
			 "table_name" : "act_tbl_stock_transfers",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Company"
						}
					}
				},
				"destination_attachments" : {
					"column_name" : "destination_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Receive Attachments"
						}
					}
				},
				"destination_datetime" : {
					"column_name" : "destination_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Receive Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"destination_location_id" : {
					"column_name" : "destination_location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Destination Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"destination_remarks" : {
					"column_name" : "destination_remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Receive remarks"
						}
					}
				},
				"destination_user_id" : {
					"column_name" : "destination_user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Received By"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"source_attachments" : {
					"column_name" : "source_attachments",
					"column_type" : "media_json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Dispatch Attachments"
						}
					}
				},
				"source_datetime" : {
					"column_name" : "source_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Dispatch Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"source_location_id" : {
					"column_name" : "source_location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Source Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"source_remarks" : {
					"column_name" : "source_remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Dispatch Remarks"
						}
					}
				},
				"source_user_id" : {
					"column_name" : "source_user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Dispatched By"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "PENDING"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"PENDING","value":"PENDING"},{"label":"STARTED","value":"STARTED"},{"label":"IN TRANSIT","value":"IN TRANSIT"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_transfer_datetime" : {
					"column_name" : "stock_transfer_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transfer Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"stock_transfer_id" : {
					"column_name" : "stock_transfer_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_transfer_number" : {
					"column_name" : "stock_transfer_number",
					"column_type" : "auto_number",
					"column_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "TRF-"
						},
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transfer Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "OUTSIDE LOCATION"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"OUTSIDE LOCATION","value":"OUTSIDE LOCATION"},{"label":"WITHIN LOCATION","value":"WITHIN LOCATION"}]
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"stock_transfer"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"stock_transfers"
				}
			}

		},
		"act_tbl_stock_update_products" : {
			 "table_name" : "act_tbl_stock_update_products",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"inventory_tracking_id" : {
					"column_name" : "inventory_tracking_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Inventory Tracking"
						}
					}
				},
				"new_stock_quantity" : {
					"column_name" : "new_stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "New Stock Quantity"
						}
					}
				},
				"new_stock_uom_quantity" : {
					"column_name" : "new_stock_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "New Stock Quantity"
						}
					}
				},
				"old_stock_quantity" : {
					"column_name" : "old_stock_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Old Stock Quantity"
						}
					}
				},
				"old_stock_uom_quantity" : {
					"column_name" : "old_stock_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Old Stock Quantity"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						}
					}
				},
				"product_uom_id" : {
					"column_name" : "product_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "UOM"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "UPDATED"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"UPDATED","value":"UPDATED"},{"label":"PENDING","value":"PENDING"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_update_id" : {
					"column_name" : "stock_update_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Update"
						}
					}
				},
				"stock_update_product_id" : {
					"column_name" : "stock_update_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"update_quantity" : {
					"column_name" : "update_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Update Quantity"
						}
					}
				},
				"update_uom_quantity" : {
					"column_name" : "update_uom_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Update Quantity"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"stock_update_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"stock_update_products"
				}
			}

		},
		"act_tbl_stock_updates" : {
			 "table_name" : "act_tbl_stock_updates",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "STARTED"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"STARTED","value":"STARTED"},{"label":"COMPLETED","value":"COMPLETED"},{"label":"CANCELLED","value":"CANCELLED"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_update_datetime" : {
					"column_name" : "stock_update_datetime",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"stock_update_id" : {
					"column_name" : "stock_update_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"stock_update_number" : {
					"column_name" : "stock_update_number",
					"column_type" : "auto_number",
					"column_properties" : {
						"auto_number_length" : {
							"property_name" : "auto_number_length",
							"property_value" : 5
						},
						"auto_number_prefix" : {
							"property_name" : "auto_number_prefix",
							"property_value" : "UPD-"
						},
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Update Number"
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"stock_update_reason" : {
					"column_name" : "stock_update_reason",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Update Reason"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"stock_update"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"stock_updates"
				}
			}

		},
		"act_tbl_storage_locations" : {
			 "table_name" : "act_tbl_storage_locations",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"location_id" : {
					"column_name" : "location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Location"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"parent_storage_location_id" : {
					"column_name" : "parent_storage_location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Parent Storage Location"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"status_lookup_value_id" : {
					"column_name" : "status_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Status"
						},
						"field_remarks" : {
							"property_name" : "field_remarks",
							"property_value" : "status_field"
						},
						"default_value" : {
							"property_name" : "default_value",
							"property_value" : "ACTIVE"
						},
						"select_options" : {
							"property_name" : "select_options",
							"property_value" : [{"label":"ACTIVE","value":"ACTIVE"},{"label":"INACTIVE","value":"INACTIVE"}]
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"format" : {
							"property_name" : "format",
							"property_value" : ["uppercase"]
						}
					}
				},
				"storage_location_code" : {
					"column_name" : "storage_location_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Code"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"storage_location_id" : {
					"column_name" : "storage_location_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"storage_location_image_media_id" : {
					"column_name" : "storage_location_image_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Sorate Image"
						}
					}
				},
				"storage_location_index" : {
					"column_name" : "storage_location_index",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"storage_location_name" : {
					"column_name" : "storage_location_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				},
				"storage_location_tree" : {
					"column_name" : "storage_location_tree",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tree"
						}
					}
				},
				"storage_location_unique_identifier" : {
					"column_name" : "storage_location_unique_identifier",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Unique Identifier"
						},
						"unique_key" : {
							"property_name" : "unique_key",
							"property_value" : true
						},
						"in_search_query" : {
							"property_name" : "in_search_query",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"storage_location"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"storage_locations"
				}
			}

		},
		"act_tbl_supplier_addresses" : {
			 "table_name" : "act_tbl_supplier_addresses",
			 "table_columns" : {
				"address_id" : {
					"column_name" : "address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_address_id" : {
					"column_name" : "supplier_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_addresses"
				}
			}

		},
		"act_tbl_supplier_chargeable_services" : {
			 "table_name" : "act_tbl_supplier_chargeable_services",
			 "table_columns" : {
				"chargeable_service_charge" : {
					"column_name" : "chargeable_service_charge",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Charge"
						}
					}
				},
				"chargeable_service_id" : {
					"column_name" : "chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"last_purchase_price" : {
					"column_name" : "last_purchase_price",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Last Purchase Charge"
						}
					}
				},
				"minimum_order_quantity" : {
					"column_name" : "minimum_order_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Min Order Qty"
						}
					}
				},
				"minimum_order_quantity_uom_id" : {
					"column_name" : "minimum_order_quantity_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Min Order UOM"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"supplier_chargeable_service_code" : {
					"column_name" : "supplier_chargeable_service_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Service Code"
						}
					}
				},
				"supplier_chargeable_service_id" : {
					"column_name" : "supplier_chargeable_service_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_chargeable_service"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_chargeable_services"
				}
			}

		},
		"act_tbl_supplier_contact_persons" : {
			 "table_name" : "act_tbl_supplier_contact_persons",
			 "table_columns" : {
				"contact_person_id" : {
					"column_name" : "contact_person_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Contact Person"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_contact_person_id" : {
					"column_name" : "supplier_contact_person_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_contact_person"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_contact_persons"
				}
			}

		},
		"act_tbl_supplier_email_addresses" : {
			 "table_name" : "act_tbl_supplier_email_addresses",
			 "table_columns" : {
				"email_address_id" : {
					"column_name" : "email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Email Address"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_email_address_id" : {
					"column_name" : "supplier_email_address_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_email_address"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_email_addresses"
				}
			}

		},
		"act_tbl_supplier_fax_numbers" : {
			 "table_name" : "act_tbl_supplier_fax_numbers",
			 "table_columns" : {
				"fax_number_id" : {
					"column_name" : "fax_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Fax Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_fax_number_id" : {
					"column_name" : "supplier_fax_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_fax_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_fax_numbers"
				}
			}

		},
		"act_tbl_supplier_legal_documents" : {
			 "table_name" : "act_tbl_supplier_legal_documents",
			 "table_columns" : {
				"legal_document_id" : {
					"column_name" : "legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Legal Document"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_legal_document_id" : {
					"column_name" : "supplier_legal_document_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_legal_document"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_legal_documents"
				}
			}

		},
		"act_tbl_supplier_medias" : {
			 "table_name" : "act_tbl_supplier_medias",
			 "table_columns" : {
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_media_id" : {
					"column_name" : "supplier_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_medias"
				}
			}

		},
		"act_tbl_supplier_phone_numbers" : {
			 "table_name" : "act_tbl_supplier_phone_numbers",
			 "table_columns" : {
				"phone_number_id" : {
					"column_name" : "phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Phone Number"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_phone_number_id" : {
					"column_name" : "supplier_phone_number_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_phone_number"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_phone_numbers"
				}
			}

		},
		"act_tbl_supplier_products" : {
			 "table_name" : "act_tbl_supplier_products",
			 "table_columns" : {
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"last_purchase_price" : {
					"column_name" : "last_purchase_price",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Last Purchase Price"
						}
					}
				},
				"minimum_order_quantity" : {
					"column_name" : "minimum_order_quantity",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Min Order Qty"
						}
					}
				},
				"minimum_order_quantity_uom_id" : {
					"column_name" : "minimum_order_quantity_uom_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Min Order UOM"
						}
					}
				},
				"product_id" : {
					"column_name" : "product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"product_purchase_price" : {
					"column_name" : "product_purchase_price",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Purchase Price"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_product_code" : {
					"column_name" : "supplier_product_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Product Code"
						}
					}
				},
				"supplier_product_id" : {
					"column_name" : "supplier_product_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_product"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_products"
				}
			}

		},
		"act_tbl_supplier_websites" : {
			 "table_name" : "act_tbl_supplier_websites",
			 "table_columns" : {
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Supplier"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"supplier_website_id" : {
					"column_name" : "supplier_website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"website_id" : {
					"column_name" : "website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Website"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier_website"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"supplier_websites"
				}
			}

		},
		"act_tbl_suppliers" : {
			 "table_name" : "act_tbl_suppliers",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						}
					}
				},
				"supplier_details" : {
					"column_name" : "supplier_details",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Details"
						}
					}
				},
				"supplier_id" : {
					"column_name" : "supplier_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"supplier_name" : {
					"column_name" : "supplier_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"type_lookup_value_id" : {
					"column_name" : "type_lookup_value_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"supplier"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"suppliers"
				}
			}

		},
		"act_tbl_tax_parts" : {
			 "table_name" : "act_tbl_tax_parts",
			 "table_columns" : {
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"part_percentage" : {
					"column_name" : "part_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Percentage"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"tax_part_id" : {
					"column_name" : "tax_part_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"tax_part_name" : {
					"column_name" : "tax_part_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Tax Rate"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"tax_part"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"tax_parts"
				}
			}

		},
		"act_tbl_tax_rates" : {
			 "table_name" : "act_tbl_tax_rates",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"tax_rate_id" : {
					"column_name" : "tax_rate_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"tax_rate_name" : {
					"column_name" : "tax_rate_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"tax_rate_percentage" : {
					"column_name" : "tax_rate_percentage",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Percentage"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Taxing Scheme"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"tax_rate"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"tax_rates"
				}
			}

		},
		"act_tbl_taxing_schemes" : {
			 "table_name" : "act_tbl_taxing_schemes",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"taxing_scheme_id" : {
					"column_name" : "taxing_scheme_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"taxing_scheme_name" : {
					"column_name" : "taxing_scheme_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"taxing_scheme"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"taxing_schemes"
				}
			}

		},
		"act_tbl_transaction_entries" : {
			 "table_name" : "act_tbl_transaction_entries",
			 "table_columns" : {
				"credit_amount" : {
					"column_name" : "credit_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Credit Amount"
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"debit_amount" : {
					"column_name" : "debit_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Debit Amount"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"ledger_account_id" : {
					"column_name" : "ledger_account_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Ledger Account"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"reference_number" : {
					"column_name" : "reference_number",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Reference#"
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"transaction_id" : {
					"column_name" : "transaction_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"transaction_entry"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"transaction_entries"
				}
			}

		},
		"act_tbl_transaction_entry_medias" : {
			 "table_name" : "act_tbl_transaction_entry_medias",
			 "table_columns" : {
				"media_id" : {
					"column_name" : "media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Media"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"transaction_entry_id" : {
					"column_name" : "transaction_entry_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Transaction Entry"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"transaction_entry_media_id" : {
					"column_name" : "transaction_entry_media_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"transaction_entry_media"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"transaction_entry_medias"
				}
			}

		},
		"act_tbl_transactions" : {
			 "table_name" : "act_tbl_transactions",
			 "table_columns" : {
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"currency_code" : {
					"column_name" : "currency_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Currency"
						}
					}
				},
				"exchange_rate" : {
					"column_name" : "exchange_rate",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Exchange Rate"
						}
					}
				},
				"is_draft" : {
					"column_name" : "is_draft",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Draft?"
						}
					}
				},
				"remarks" : {
					"column_name" : "remarks",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Remarks"
						}
					}
				},
				"transaction_amount" : {
					"column_name" : "transaction_amount",
					"column_type" : "double",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Amount"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"transaction_details" : {
					"column_name" : "transaction_details",
					"column_type" : "json",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Details"
						}
					}
				},
				"transaction_id" : {
					"column_name" : "transaction_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"transaction_narration" : {
					"column_name" : "transaction_narration",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Narration"
						}
					}
				},
				"transaction_number" : {
					"column_name" : "transaction_number",
					"column_type" : "auto_number",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Number"
						}
					}
				},
				"transaction_time" : {
					"column_name" : "transaction_time",
					"column_type" : "datetime",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Date/Time"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"transaction_type" : {
					"column_name" : "transaction_type",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Type"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"transaction"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"transactions"
				}
			}

		},
		"act_tbl_trigger_flags" : {
			 "table_name" : "act_tbl_trigger_flags",
			 "table_columns" : {
				"table_name" : {
					"column_name" : "table_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Table"
						}
					}
				},
				"trigger_flag_id" : {
					"column_name" : "trigger_flag_id",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"trigger_flag_name" : {
					"column_name" : "trigger_flag_name",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						}
					}
				},
				"trigger_flag_value" : {
					"column_name" : "trigger_flag_value",
					"column_type" : "text",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"trigger_flag"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"trigger_flags"
				}
			}

		},
		"act_tbl_uoms" : {
			 "table_name" : "act_tbl_uoms",
			 "table_columns" : {
				"uom_code" : {
					"column_name" : "uom_code",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"uom_name" : {
					"column_name" : "uom_name",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Name"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"uom"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"uoms"
				}
			}

		},
		"act_tbl_user_accountees" : {
			 "table_name" : "act_tbl_user_accountees",
			 "table_columns" : {
				"access_group_id" : {
					"column_name" : "access_group_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Access Group"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"accountee_id" : {
					"column_name" : "accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Accountee"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"employee_id" : {
					"column_name" : "employee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Employee"
						}
					}
				},
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"menu_id" : {
					"column_name" : "menu_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Menu"
						}
					}
				},
				"user_accountee_id" : {
					"column_name" : "user_accountee_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "User"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"user_accountee"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"user_accountees"
				}
			}

		},
		"act_tbl_users" : {
			 "table_name" : "act_tbl_users",
			 "table_columns" : {
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"password" : {
					"column_name" : "password",
					"column_type" : "password",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Password"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				},
				"user_id" : {
					"column_name" : "user_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"username" : {
					"column_name" : "username",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Username"
						},
						"required" : {
							"property_name" : "required",
							"property_value" : true
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"user"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"users"
				}
			}

		},
		"act_tbl_websites" : {
			 "table_name" : "act_tbl_websites",
			 "table_columns" : {
				"index" : {
					"column_name" : "index",
					"column_type" : "integer",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Index"
						}
					}
				},
				"is_active" : {
					"column_name" : "is_active",
					"column_type" : "yes_no",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Is Active?"
						}
					}
				},
				"website_id" : {
					"column_name" : "website_id",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Id"
						},
						"primary_key" : {
							"property_name" : "primary_key",
							"property_value" : true
						}
					}
				},
				"website_label" : {
					"column_name" : "website_label",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Label"
						}
					}
				},
				"website_value" : {
					"column_name" : "website_value",
					"column_type" : "string",
					"column_properties" : {
						"column_title" : {
							"property_name" : "column_title",
							"property_value" : "Value"
						}
					}
				}
			},
			"table_properties" : {
				"singular_name" : {
					"property_name" : "singular_name",
					"property_value" :"website"
				},
				"plural_name" : {
					"property_name" : "plural_name",
					"property_value" :"websites"
				}
			}

		}
	},
	"views" : {

	},
	"triggers" : {

	},
	"relationships" : {
		"act_tbl_access_rights" : {
			"access_group_id" : {
				"act_tbl_access_groups" : {
					"access_group_id" : {
						"destination_field" : "access_group_id",
						"destination_table" : "act_tbl_access_rights",
						"source_field" : "access_group_id",
						"source_table" : "act_tbl_access_groups"
					}
				}
			}
		},
		"act_tbl_accountee_addresses" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_accountee_addresses",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"address_id" : {
				"act_tbl_addresses" : {
					"address_id" : {
						"destination_field" : "address_id",
						"destination_table" : "act_tbl_accountee_addresses",
						"source_field" : "address_id",
						"source_table" : "act_tbl_addresses"
					}
				}
			}
		},
		"act_tbl_accountee_bank_accounts" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_accountee_bank_accounts",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"bank_account_id" : {
				"act_tbl_bank_accounts" : {
					"bank_account_id" : {
						"destination_field" : "bank_account_id",
						"destination_table" : "act_tbl_accountee_bank_accounts",
						"source_field" : "bank_account_id",
						"source_table" : "act_tbl_bank_accounts"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_accountee_bank_accounts",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			}
		},
		"act_tbl_accountee_email_addresses" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_accountee_email_addresses",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"email_address_id" : {
				"act_tbl_email_addresses" : {
					"email_address_id" : {
						"destination_field" : "email_address_id",
						"destination_table" : "act_tbl_accountee_email_addresses",
						"source_field" : "email_address_id",
						"source_table" : "act_tbl_email_addresses"
					}
				}
			}
		},
		"act_tbl_accountee_fax_numbers" : {
			"fax_number_id" : {
				"act_tbl_fax_numbers" : {
					"fax_number_id" : {
						"destination_field" : "fax_number_id",
						"destination_table" : "act_tbl_accountee_fax_numbers",
						"source_field" : "fax_number_id",
						"source_table" : "act_tbl_fax_numbers"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_accountee_fax_numbers",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_accountee_legal_documents" : {
			"legal_document_id" : {
				"act_tbl_legal_documents" : {
					"legal_document_id" : {
						"destination_field" : "legal_document_id",
						"destination_table" : "act_tbl_accountee_legal_documents",
						"source_field" : "legal_document_id",
						"source_table" : "act_tbl_legal_documents"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_accountee_legal_documents",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_accountee_medias" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_accountee_medias",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_accountee_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_accountee_phone_numbers" : {
			"phone_number_id" : {
				"act_tbl_phone_numbers" : {
					"phone_number_id" : {
						"destination_field" : "phone_number_id",
						"destination_table" : "act_tbl_accountee_phone_numbers",
						"source_field" : "phone_number_id",
						"source_table" : "act_tbl_phone_numbers"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_accountee_phone_numbers",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_accountee_settings" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_accountee_settings",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_accountee_websites" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_accountee_websites",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"website_id" : {
				"act_tbl_websites" : {
					"website_id" : {
						"destination_field" : "website_id",
						"destination_table" : "act_tbl_accountee_websites",
						"source_field" : "website_id",
						"source_table" : "act_tbl_websites"
					}
				}
			}
		},
		"act_tbl_accountees" : {
			"accountee_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "accountee_image_media_id",
						"destination_table" : "act_tbl_accountees",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_asset_attributes" : {
			"asset_id" : {
				"act_tbl_assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "act_tbl_asset_attributes",
						"source_field" : "asset_id",
						"source_table" : "act_tbl_assets"
					}
				}
			},
			"value_type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "value_type_lookup_value_id",
						"destination_table" : "act_tbl_asset_attributes",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_asset_depreciations" : {
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_asset_depreciations",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_asset_depreciations",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"asset_id" : {
				"act_tbl_assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "act_tbl_asset_depreciations",
						"source_field" : "asset_id",
						"source_table" : "act_tbl_assets"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_asset_depreciations",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_asset_depreciations",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			}
		},
		"act_tbl_asset_legal_documents" : {
			"asset_id" : {
				"act_tbl_assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "act_tbl_asset_legal_documents",
						"source_field" : "asset_id",
						"source_table" : "act_tbl_assets"
					}
				}
			},
			"legal_document_id" : {
				"act_tbl_legal_documents" : {
					"legal_document_id" : {
						"destination_field" : "legal_document_id",
						"destination_table" : "act_tbl_asset_legal_documents",
						"source_field" : "legal_document_id",
						"source_table" : "act_tbl_legal_documents"
					}
				}
			}
		},
		"act_tbl_asset_medias" : {
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_asset_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"asset_id" : {
				"act_tbl_assets" : {
					"asset_id" : {
						"destination_field" : "asset_id",
						"destination_table" : "act_tbl_asset_medias",
						"source_field" : "asset_id",
						"source_table" : "act_tbl_assets"
					}
				}
			}
		},
		"act_tbl_assets" : {
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_assets",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_assets",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"asset_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "asset_image_media_id",
						"destination_table" : "act_tbl_assets",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_assets",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			}
		},
		"act_tbl_automated_task_logs" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_automated_task_logs",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"automated_task_id" : {
				"act_tbl_automated_tasks" : {
					"automated_task_id" : {
						"destination_field" : "automated_task_id",
						"destination_table" : "act_tbl_automated_task_logs",
						"source_field" : "automated_task_id",
						"source_table" : "act_tbl_automated_tasks"
					}
				}
			}
		},
		"act_tbl_chargeable_service_medias" : {
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_chargeable_service_medias",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			},
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_chargeable_service_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_chargeable_service_uoms" : {
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_chargeable_service_uoms",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			}
		},
		"act_tbl_chargeable_services" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_chargeable_services",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_chargeable_services",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_chargeable_services",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"chargeable_service_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "chargeable_service_image_media_id",
						"destination_table" : "act_tbl_chargeable_services",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"parent_chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "parent_chargeable_service_id",
						"destination_table" : "act_tbl_chargeable_services",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			}
		},
		"act_tbl_contact_persons" : {
			"contact_person_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "contact_person_image_media_id",
						"destination_table" : "act_tbl_contact_persons",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_customer_addresses" : {
			"address_id" : {
				"act_tbl_addresses" : {
					"address_id" : {
						"destination_field" : "address_id",
						"destination_table" : "act_tbl_customer_addresses",
						"source_field" : "address_id",
						"source_table" : "act_tbl_addresses"
					}
				}
			},
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_customer_addresses",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			}
		},
		"act_tbl_customer_bank_accounts" : {
			"bank_account_id" : {
				"act_tbl_bank_accounts" : {
					"bank_account_id" : {
						"destination_field" : "bank_account_id",
						"destination_table" : "act_tbl_customer_bank_accounts",
						"source_field" : "bank_account_id",
						"source_table" : "act_tbl_bank_accounts"
					}
				}
			},
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_customer_bank_accounts",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			}
		},
		"act_tbl_customer_contact_persons" : {
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_customer_contact_persons",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			},
			"contact_person_id" : {
				"act_tbl_contact_persons" : {
					"contact_person_id" : {
						"destination_field" : "contact_person_id",
						"destination_table" : "act_tbl_customer_contact_persons",
						"source_field" : "contact_person_id",
						"source_table" : "act_tbl_contact_persons"
					}
				}
			}
		},
		"act_tbl_customer_email_addresses" : {
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_customer_email_addresses",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			},
			"email_address_id" : {
				"act_tbl_email_addresses" : {
					"email_address_id" : {
						"destination_field" : "email_address_id",
						"destination_table" : "act_tbl_customer_email_addresses",
						"source_field" : "email_address_id",
						"source_table" : "act_tbl_email_addresses"
					}
				}
			}
		},
		"act_tbl_customer_fax_numbers" : {
			"fax_number_id" : {
				"act_tbl_fax_numbers" : {
					"fax_number_id" : {
						"destination_field" : "fax_number_id",
						"destination_table" : "act_tbl_customer_fax_numbers",
						"source_field" : "fax_number_id",
						"source_table" : "act_tbl_fax_numbers"
					}
				}
			},
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_customer_fax_numbers",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			}
		},
		"act_tbl_customer_legal_documents" : {
			"legal_document_id" : {
				"act_tbl_legal_documents" : {
					"legal_document_id" : {
						"destination_field" : "legal_document_id",
						"destination_table" : "act_tbl_customer_legal_documents",
						"source_field" : "legal_document_id",
						"source_table" : "act_tbl_legal_documents"
					}
				}
			},
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_customer_legal_documents",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			}
		},
		"act_tbl_customer_medias" : {
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_customer_medias",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			},
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_customer_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_customer_phone_numbers" : {
			"phone_number_id" : {
				"act_tbl_phone_numbers" : {
					"phone_number_id" : {
						"destination_field" : "phone_number_id",
						"destination_table" : "act_tbl_customer_phone_numbers",
						"source_field" : "phone_number_id",
						"source_table" : "act_tbl_phone_numbers"
					}
				}
			},
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_customer_phone_numbers",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			}
		},
		"act_tbl_customer_websites" : {
			"website_id" : {
				"act_tbl_websites" : {
					"website_id" : {
						"destination_field" : "website_id",
						"destination_table" : "act_tbl_customer_websites",
						"source_field" : "website_id",
						"source_table" : "act_tbl_websites"
					}
				}
			},
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_customer_websites",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			}
		},
		"act_tbl_customers" : {
			"customer_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "customer_image_media_id",
						"destination_table" : "act_tbl_customers",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"category_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "category_lookup_value_id",
						"destination_table" : "act_tbl_customers",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_customers",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_customers",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_customers",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_customers",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			}
		},
		"act_tbl_devices" : {
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_devices",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"device_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "device_image_media_id",
						"destination_table" : "act_tbl_devices",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_devices",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_employee_addresses" : {
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_employee_addresses",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			},
			"address_id" : {
				"act_tbl_addresses" : {
					"address_id" : {
						"destination_field" : "address_id",
						"destination_table" : "act_tbl_employee_addresses",
						"source_field" : "address_id",
						"source_table" : "act_tbl_addresses"
					}
				}
			}
		},
		"act_tbl_employee_attendances" : {
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_employee_attendances",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_employee_attendances",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_employee_attendances",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_employee_bank_accounts" : {
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_employee_bank_accounts",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			},
			"bank_account_id" : {
				"act_tbl_bank_accounts" : {
					"bank_account_id" : {
						"destination_field" : "bank_account_id",
						"destination_table" : "act_tbl_employee_bank_accounts",
						"source_field" : "bank_account_id",
						"source_table" : "act_tbl_bank_accounts"
					}
				}
			}
		},
		"act_tbl_employee_contracts" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_employee_contracts",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_employee_contracts",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_employee_contracts",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_employee_email_addresses" : {
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_employee_email_addresses",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			},
			"email_address_id" : {
				"act_tbl_email_addresses" : {
					"email_address_id" : {
						"destination_field" : "email_address_id",
						"destination_table" : "act_tbl_employee_email_addresses",
						"source_field" : "email_address_id",
						"source_table" : "act_tbl_email_addresses"
					}
				}
			}
		},
		"act_tbl_employee_legal_documents" : {
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_employee_legal_documents",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			},
			"legal_document_id" : {
				"act_tbl_legal_documents" : {
					"legal_document_id" : {
						"destination_field" : "legal_document_id",
						"destination_table" : "act_tbl_employee_legal_documents",
						"source_field" : "legal_document_id",
						"source_table" : "act_tbl_legal_documents"
					}
				}
			}
		},
		"act_tbl_employee_medias" : {
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_employee_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_employee_medias",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			}
		},
		"act_tbl_employee_phone_numbers" : {
			"phone_number_id" : {
				"act_tbl_phone_numbers" : {
					"phone_number_id" : {
						"destination_field" : "phone_number_id",
						"destination_table" : "act_tbl_employee_phone_numbers",
						"source_field" : "phone_number_id",
						"source_table" : "act_tbl_phone_numbers"
					}
				}
			},
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_employee_phone_numbers",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			}
		},
		"act_tbl_employee_websites" : {
			"website_id" : {
				"act_tbl_websites" : {
					"website_id" : {
						"destination_field" : "website_id",
						"destination_table" : "act_tbl_employee_websites",
						"source_field" : "website_id",
						"source_table" : "act_tbl_websites"
					}
				}
			},
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_employee_websites",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			}
		},
		"act_tbl_employees" : {
			"employee_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "employee_image_media_id",
						"destination_table" : "act_tbl_employees",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_employees",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"gender_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "gender_lookup_value_id",
						"destination_table" : "act_tbl_employees",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"duration_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "duration_lookup_value_id",
						"destination_table" : "act_tbl_employees",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_employees",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_employees",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_inventory_tracking_entries" : {
			"product_barcode_id" : {
				"act_tbl_product_barcodes" : {
					"product_barcode_id" : {
						"destination_field" : "product_barcode_id",
						"destination_table" : "act_tbl_inventory_tracking_entries",
						"source_field" : "product_barcode_id",
						"source_table" : "act_tbl_product_barcodes"
					}
				}
			},
			"product_price_id" : {
				"act_tbl_product_prices" : {
					"product_price_id" : {
						"destination_field" : "product_price_id",
						"destination_table" : "act_tbl_inventory_tracking_entries",
						"source_field" : "product_price_id",
						"source_table" : "act_tbl_product_prices"
					}
				}
			},
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_inventory_tracking_entries",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"storage_location_id" : {
				"act_tbl_storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "act_tbl_inventory_tracking_entries",
						"source_field" : "storage_location_id",
						"source_table" : "act_tbl_storage_locations"
					}
				}
			},
			"inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "act_tbl_inventory_tracking_entries",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_inventory_tracking_entries",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			}
		},
		"act_tbl_inventory_trackings" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_inventory_trackings",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			}
		},
		"act_tbl_ledger_account_types" : {
			"parent_ledger_account_type_id" : {
				"act_tbl_ledger_account_types" : {
					"ledger_account_type_id" : {
						"destination_field" : "parent_ledger_account_type_id",
						"destination_table" : "act_tbl_ledger_account_types",
						"source_field" : "ledger_account_type_id",
						"source_table" : "act_tbl_ledger_account_types"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_ledger_account_types",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_ledger_accounts" : {
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_ledger_accounts",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"ledger_account_type_id" : {
				"act_tbl_ledger_account_types" : {
					"ledger_account_type_id" : {
						"destination_field" : "ledger_account_type_id",
						"destination_table" : "act_tbl_ledger_accounts",
						"source_field" : "ledger_account_type_id",
						"source_table" : "act_tbl_ledger_account_types"
					}
				}
			},
			"final_account_type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "final_account_type_lookup_value_id",
						"destination_table" : "act_tbl_ledger_accounts",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_ledger_accounts",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_legal_document_medias" : {
			"legal_document_id" : {
				"act_tbl_legal_documents" : {
					"legal_document_id" : {
						"destination_field" : "legal_document_id",
						"destination_table" : "act_tbl_legal_document_medias",
						"source_field" : "legal_document_id",
						"source_table" : "act_tbl_legal_documents"
					}
				}
			},
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_legal_document_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_legal_document_types" : {
			"entity_id" : {
				"act_tbl_entities" : {
					"entity_id" : {
						"destination_field" : "entity_id",
						"destination_table" : "act_tbl_legal_document_types",
						"source_field" : "entity_id",
						"source_table" : "act_tbl_entities"
					}
				}
			}
		},
		"act_tbl_legal_documents" : {
			"legal_document_type_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "legal_document_type_id",
						"destination_table" : "act_tbl_legal_documents",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_location_addresses" : {
			"address_id" : {
				"act_tbl_addresses" : {
					"address_id" : {
						"destination_field" : "address_id",
						"destination_table" : "act_tbl_location_addresses",
						"source_field" : "address_id",
						"source_table" : "act_tbl_addresses"
					}
				}
			},
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_location_addresses",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			}
		},
		"act_tbl_location_email_addresses" : {
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_location_email_addresses",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"email_address_id" : {
				"act_tbl_email_addresses" : {
					"email_address_id" : {
						"destination_field" : "email_address_id",
						"destination_table" : "act_tbl_location_email_addresses",
						"source_field" : "email_address_id",
						"source_table" : "act_tbl_email_addresses"
					}
				}
			}
		},
		"act_tbl_location_fax_numbers" : {
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_location_fax_numbers",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"fax_number_id" : {
				"act_tbl_fax_numbers" : {
					"fax_number_id" : {
						"destination_field" : "fax_number_id",
						"destination_table" : "act_tbl_location_fax_numbers",
						"source_field" : "fax_number_id",
						"source_table" : "act_tbl_fax_numbers"
					}
				}
			}
		},
		"act_tbl_location_legal_documents" : {
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_location_legal_documents",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"legal_document_id" : {
				"act_tbl_legal_documents" : {
					"legal_document_id" : {
						"destination_field" : "legal_document_id",
						"destination_table" : "act_tbl_location_legal_documents",
						"source_field" : "legal_document_id",
						"source_table" : "act_tbl_legal_documents"
					}
				}
			}
		},
		"act_tbl_location_medias" : {
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_location_medias",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_location_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_location_phone_numbers" : {
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_location_phone_numbers",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"phone_number_id" : {
				"act_tbl_phone_numbers" : {
					"phone_number_id" : {
						"destination_field" : "phone_number_id",
						"destination_table" : "act_tbl_location_phone_numbers",
						"source_field" : "phone_number_id",
						"source_table" : "act_tbl_phone_numbers"
					}
				}
			}
		},
		"act_tbl_location_websites" : {
			"website_id" : {
				"act_tbl_websites" : {
					"website_id" : {
						"destination_field" : "website_id",
						"destination_table" : "act_tbl_location_websites",
						"source_field" : "website_id",
						"source_table" : "act_tbl_websites"
					}
				}
			},
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_location_websites",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			}
		},
		"act_tbl_locations" : {
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_locations",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"location_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "location_image_media_id",
						"destination_table" : "act_tbl_locations",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_locations",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_lookup_values" : {
			"entity_id" : {
				"act_tbl_entities" : {
					"entity_id" : {
						"destination_field" : "entity_id",
						"destination_table" : "act_tbl_lookup_values",
						"source_field" : "entity_id",
						"source_table" : "act_tbl_entities"
					}
				}
			},
			"lookup_value_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "lookup_value_media_id",
						"destination_table" : "act_tbl_lookup_values",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_menu_items" : {
			"menu_id" : {
				"act_tbl_menus" : {
					"menu_id" : {
						"destination_field" : "menu_id",
						"destination_table" : "act_tbl_menu_items",
						"source_field" : "menu_id",
						"source_table" : "act_tbl_menus"
					}
				}
			},
			"parent_menu_item_id" : {
				"act_tbl_menu_items" : {
					"menu_item_id" : {
						"destination_field" : "parent_menu_item_id",
						"destination_table" : "act_tbl_menu_items",
						"source_field" : "menu_item_id",
						"source_table" : "act_tbl_menu_items"
					}
				}
			},
			"menu_icon_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "menu_icon_media_id",
						"destination_table" : "act_tbl_menu_items",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_notifications" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_notifications",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"notification_icon_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "notification_icon_media_id",
						"destination_table" : "act_tbl_notifications",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_notifications",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			}
		},
		"act_tbl_payment_methods" : {
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_payment_methods",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			},
			"payment_method_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "payment_method_image_media_id",
						"destination_table" : "act_tbl_payment_methods",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_payment_methods",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_price_change_products" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_price_change_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"price_change_id" : {
				"act_tbl_price_changes" : {
					"price_change_id" : {
						"destination_field" : "price_change_id",
						"destination_table" : "act_tbl_price_change_products",
						"source_field" : "price_change_id",
						"source_table" : "act_tbl_price_changes"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_price_change_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			}
		},
		"act_tbl_price_changes" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_price_changes",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_price_changes",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_price_changes",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_product_attributes" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_product_attributes",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"value_type_lookup_value_id" : {
				"act_tbl_product_attributes" : {
					"value_type_lookup_value_id" : {
						"destination_field" : "value_type_lookup_value_id",
						"destination_table" : "act_tbl_product_attributes",
						"source_field" : "value_type_lookup_value_id",
						"source_table" : "act_tbl_product_attributes"
					}
				}
			}
		},
		"act_tbl_product_barcodes" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_product_barcodes",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			}
		},
		"act_tbl_product_categories" : {
			"product_category_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "product_category_image_media_id",
						"destination_table" : "act_tbl_product_categories",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"parent_product_categroy_id" : {
				"act_tbl_product_categories" : {
					"product_category_id" : {
						"destination_field" : "parent_product_categroy_id",
						"destination_table" : "act_tbl_product_categories",
						"source_field" : "product_category_id",
						"source_table" : "act_tbl_product_categories"
					}
				}
			},
			"sale_taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "sale_taxing_scheme_id",
						"destination_table" : "act_tbl_product_categories",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"purchase_tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "purchase_tax_rate_id",
						"destination_table" : "act_tbl_product_categories",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"sale_tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "sale_tax_rate_id",
						"destination_table" : "act_tbl_product_categories",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"purchase_taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "purchase_taxing_scheme_id",
						"destination_table" : "act_tbl_product_categories",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_product_categories",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_product_location_data" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_product_location_data",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_product_location_data",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			}
		},
		"act_tbl_product_medias" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_product_medias",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_product_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_product_prices" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_product_prices",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_product_prices",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_product_prices",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			}
		},
		"act_tbl_product_reference_urls" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_product_reference_urls",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			}
		},
		"act_tbl_product_storage_location_data" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_product_storage_location_data",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"storage_location_id" : {
				"act_tbl_storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "act_tbl_product_storage_location_data",
						"source_field" : "storage_location_id",
						"source_table" : "act_tbl_storage_locations"
					}
				}
			}
		},
		"act_tbl_product_uoms" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_product_uoms",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			}
		},
		"act_tbl_product_variant_groups" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_product_variant_groups",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_product_variants" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_product_variants",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"product_variant_group_id" : {
				"act_tbl_product_variant_groups" : {
					"product_variant_group_id" : {
						"destination_field" : "product_variant_group_id",
						"destination_table" : "act_tbl_product_variants",
						"source_field" : "product_variant_group_id",
						"source_table" : "act_tbl_product_variant_groups"
					}
				}
			}
		},
		"act_tbl_products" : {
			"sale_tax_rate_id" : {
				"act_tbl_products" : {
					"sale_tax_rate_id" : {
						"destination_field" : "sale_tax_rate_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "sale_tax_rate_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"product_category_id" : {
				"act_tbl_product_categories" : {
					"product_category_id" : {
						"destination_field" : "product_category_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "product_category_id",
						"source_table" : "act_tbl_product_categories"
					}
				}
			},
			"purchase_tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "purchase_tax_rate_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"minimum_order_quantity_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "minimum_order_quantity_uom_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"stock_reorder_level_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "stock_reorder_level_uom_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"stock_minimum_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "stock_minimum_uom_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"stock_maximum_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "stock_maximum_uom_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"purchase_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "purchase_uom_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"sale_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "sale_uom_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"stock_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "stock_uom_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"product_image_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "product_image_media_id",
						"destination_table" : "act_tbl_products",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_purchase_invoice_chargeable_services" : {
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_purchase_invoice_chargeable_services",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_sale_offer_products" : {
					"status_lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_invoice_chargeable_services",
						"source_field" : "status_lookup_value_id",
						"source_table" : "act_tbl_sale_offer_products"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_purchase_invoice_chargeable_services",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"chargeable_service_uom_id" : {
				"act_tbl_chargeable_service_uoms" : {
					"chargeable_service_uom_id" : {
						"destination_field" : "chargeable_service_uom_id",
						"destination_table" : "act_tbl_purchase_invoice_chargeable_services",
						"source_field" : "chargeable_service_uom_id",
						"source_table" : "act_tbl_chargeable_service_uoms"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_purchase_invoice_chargeable_services",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"purchase_invoice_id" : {
				"act_tbl_purchase_invoices" : {
					"purchase_invoice_id" : {
						"destination_field" : "purchase_invoice_id",
						"destination_table" : "act_tbl_purchase_invoice_chargeable_services",
						"source_field" : "purchase_invoice_id",
						"source_table" : "act_tbl_purchase_invoices"
					}
				}
			}
		},
		"act_tbl_purchase_invoice_expenses" : {
			"payment_method_id" : {
				"act_tbl_payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "act_tbl_purchase_invoice_expenses",
						"source_field" : "payment_method_id",
						"source_table" : "act_tbl_payment_methods"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_purchase_invoice_expenses",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_invoice_expenses",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"purchase_invoice_id" : {
				"act_tbl_purchase_invoices" : {
					"purchase_invoice_id" : {
						"destination_field" : "purchase_invoice_id",
						"destination_table" : "act_tbl_purchase_invoice_expenses",
						"source_field" : "purchase_invoice_id",
						"source_table" : "act_tbl_purchase_invoices"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_purchase_invoice_expenses",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_purchase_invoice_expenses",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			}
		},
		"act_tbl_purchase_invoice_payments" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_invoice_payments",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"purchase_invoice_id" : {
				"act_tbl_purchase_invoices" : {
					"purchase_invoice_id" : {
						"destination_field" : "purchase_invoice_id",
						"destination_table" : "act_tbl_purchase_invoice_payments",
						"source_field" : "purchase_invoice_id",
						"source_table" : "act_tbl_purchase_invoices"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_purchase_invoice_payments",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"payment_method_id" : {
				"act_tbl_payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "act_tbl_purchase_invoice_payments",
						"source_field" : "payment_method_id",
						"source_table" : "act_tbl_payment_methods"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_purchase_invoice_payments",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			}
		},
		"act_tbl_purchase_invoice_products" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_purchase_invoice_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_purchase_invoice_products",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_invoice_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_purchase_invoice_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_purchase_invoice_products",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"purchase_invoice_id" : {
				"act_tbl_purchase_invoices" : {
					"purchase_invoice_id" : {
						"destination_field" : "purchase_invoice_id",
						"destination_table" : "act_tbl_purchase_invoice_products",
						"source_field" : "purchase_invoice_id",
						"source_table" : "act_tbl_purchase_invoices"
					}
				}
			},
			"inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "act_tbl_purchase_invoice_products",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			}
		},
		"act_tbl_purchase_invoices" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"purchase_term_id" : {
				"act_tbl_purchase_terms" : {
					"purchase_term_id" : {
						"destination_field" : "purchase_term_id",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "purchase_term_id",
						"source_table" : "act_tbl_purchase_terms"
					}
				}
			},
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"device_id" : {
				"act_tbl_devices" : {
					"device_id" : {
						"destination_field" : "device_id",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "device_id",
						"source_table" : "act_tbl_devices"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_purchase_invoices",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			}
		},
		"act_tbl_purchase_order_chargeable_services" : {
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_purchase_order_chargeable_services",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"purchase_order_id" : {
				"act_tbl_purchase_orders" : {
					"purchase_order_id" : {
						"destination_field" : "purchase_order_id",
						"destination_table" : "act_tbl_purchase_order_chargeable_services",
						"source_field" : "purchase_order_id",
						"source_table" : "act_tbl_purchase_orders"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_order_chargeable_services",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_purchase_order_chargeable_services",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			},
			"chargeable_service_uom_id" : {
				"act_tbl_chargeable_service_uoms" : {
					"chargeable_service_uom_id" : {
						"destination_field" : "chargeable_service_uom_id",
						"destination_table" : "act_tbl_purchase_order_chargeable_services",
						"source_field" : "chargeable_service_uom_id",
						"source_table" : "act_tbl_chargeable_service_uoms"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_purchase_order_chargeable_services",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			}
		},
		"act_tbl_purchase_order_expenses" : {
			"purchase_invoice_id" : {
				"act_tbl_purchase_invoices" : {
					"purchase_invoice_id" : {
						"destination_field" : "purchase_invoice_id",
						"destination_table" : "act_tbl_purchase_order_expenses",
						"source_field" : "purchase_invoice_id",
						"source_table" : "act_tbl_purchase_invoices"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_order_expenses",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"payment_method_id" : {
				"act_tbl_payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "act_tbl_purchase_order_expenses",
						"source_field" : "payment_method_id",
						"source_table" : "act_tbl_payment_methods"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_purchase_order_expenses",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_purchase_order_expenses",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_purchase_order_expenses",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			}
		},
		"act_tbl_purchase_order_payments" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_order_payments",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_purchase_order_payments",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_purchase_order_payments",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"payment_method_id" : {
				"act_tbl_payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "act_tbl_purchase_order_payments",
						"source_field" : "payment_method_id",
						"source_table" : "act_tbl_payment_methods"
					}
				}
			},
			"purchase_order_id" : {
				"act_tbl_purchase_orders" : {
					"purchase_order_id" : {
						"destination_field" : "purchase_order_id",
						"destination_table" : "act_tbl_purchase_order_payments",
						"source_field" : "purchase_order_id",
						"source_table" : "act_tbl_purchase_orders"
					}
				}
			}
		},
		"act_tbl_purchase_order_products" : {
			"purchase_order_id" : {
				"act_tbl_purchase_orders" : {
					"purchase_order_id" : {
						"destination_field" : "purchase_order_id",
						"destination_table" : "act_tbl_purchase_order_products",
						"source_field" : "purchase_order_id",
						"source_table" : "act_tbl_purchase_orders"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_purchase_order_products",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "act_tbl_purchase_order_products",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_purchase_order_products",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_purchase_order_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_order_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_purchase_order_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			}
		},
		"act_tbl_purchase_orders" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_purchase_orders",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_purchase_orders",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"purchase_term_id" : {
				"act_tbl_purchase_terms" : {
					"purchase_term_id" : {
						"destination_field" : "purchase_term_id",
						"destination_table" : "act_tbl_purchase_orders",
						"source_field" : "purchase_term_id",
						"source_table" : "act_tbl_purchase_terms"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_purchase_orders",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_purchase_orders",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_orders",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_purchase_orders",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_purchase_orders",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_purchase_return_chargeable_services" : {
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_purchase_return_chargeable_services",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_purchase_return_chargeable_services",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_purchase_return_chargeable_services",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_return_chargeable_services",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"chargeable_service_uom_id" : {
				"act_tbl_chargeable_service_uoms" : {
					"chargeable_service_uom_id" : {
						"destination_field" : "chargeable_service_uom_id",
						"destination_table" : "act_tbl_purchase_return_chargeable_services",
						"source_field" : "chargeable_service_uom_id",
						"source_table" : "act_tbl_chargeable_service_uoms"
					}
				}
			},
			"purchase_return_id" : {
				"act_tbl_purchase_return_chargeable_services" : {
					"purchase_return_id" : {
						"destination_field" : "purchase_return_id",
						"destination_table" : "act_tbl_purchase_return_chargeable_services",
						"source_field" : "purchase_return_id",
						"source_table" : "act_tbl_purchase_return_chargeable_services"
					}
				}
			}
		},
		"act_tbl_purchase_return_expenses" : {
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_purchase_return_expenses",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_purchase_return_expenses",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"purchase_return_id" : {
				"act_tbl_purchase_returns" : {
					"purchase_return_id" : {
						"destination_field" : "purchase_return_id",
						"destination_table" : "act_tbl_purchase_return_expenses",
						"source_field" : "purchase_return_id",
						"source_table" : "act_tbl_purchase_returns"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_purchase_return_expenses",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_return_expenses",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_purchase_return_payments" : {
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_purchase_return_payments",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"payment_method_id" : {
				"act_tbl_payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "act_tbl_purchase_return_payments",
						"source_field" : "payment_method_id",
						"source_table" : "act_tbl_payment_methods"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_return_payments",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_purchase_return_payments",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"purchase_return_id" : {
				"act_tbl_purchase_returns" : {
					"purchase_return_id" : {
						"destination_field" : "purchase_return_id",
						"destination_table" : "act_tbl_purchase_return_payments",
						"source_field" : "purchase_return_id",
						"source_table" : "act_tbl_purchase_returns"
					}
				}
			}
		},
		"act_tbl_purchase_return_products" : {
			"inward_inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inward_inventory_tracking_id",
						"destination_table" : "act_tbl_purchase_return_products",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_purchase_return_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_return_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_purchase_return_products",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"purchase_return_id" : {
				"act_tbl_purchase_returns" : {
					"purchase_return_id" : {
						"destination_field" : "purchase_return_id",
						"destination_table" : "act_tbl_purchase_return_products",
						"source_field" : "purchase_return_id",
						"source_table" : "act_tbl_purchase_returns"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_purchase_return_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_purchase_return_products",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			}
		},
		"act_tbl_purchase_returns" : {
			"purchase_terms_id" : {
				"act_tbl_purchase_terms" : {
					"purchase_term_id" : {
						"destination_field" : "purchase_terms_id",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "purchase_term_id",
						"source_table" : "act_tbl_purchase_terms"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"device_id" : {
				"act_tbl_devices" : {
					"device_id" : {
						"destination_field" : "device_id",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "device_id",
						"source_table" : "act_tbl_devices"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"purchase_invoice_id" : {
				"act_tbl_purchase_invoices" : {
					"purchase_invoice_id" : {
						"destination_field" : "purchase_invoice_id",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "purchase_invoice_id",
						"source_table" : "act_tbl_purchase_invoices"
					}
				}
			},
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_purchase_returns",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_purchase_terms" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_purchase_terms",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_sale_coupon_issues" : {
			"sale_coupon_id" : {
				"act_tbl_sale_coupons" : {
					"sale_coupon_id" : {
						"destination_field" : "sale_coupon_id",
						"destination_table" : "act_tbl_sale_coupon_issues",
						"source_field" : "sale_coupon_id",
						"source_table" : "act_tbl_sale_coupons"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_coupon_issues",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_sale_coupon_uses" : {
			"sale_coupon_issue_id" : {
				"act_tbl_sale_coupon_uses" : {
					"sale_coupon_use_id" : {
						"destination_field" : "sale_coupon_issue_id",
						"destination_table" : "act_tbl_sale_coupon_uses",
						"source_field" : "sale_coupon_use_id",
						"source_table" : "act_tbl_sale_coupon_uses"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_coupon_uses",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"sale_coupon_id" : {
				"act_tbl_sale_coupons" : {
					"sale_coupon_id" : {
						"destination_field" : "sale_coupon_id",
						"destination_table" : "act_tbl_sale_coupon_uses",
						"source_field" : "sale_coupon_id",
						"source_table" : "act_tbl_sale_coupons"
					}
				}
			}
		},
		"act_tbl_sale_coupons" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_sale_coupons",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_sale_coupons",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"calculation_method_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "calculation_method_lookup_value_id",
						"destination_table" : "act_tbl_sale_coupons",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_coupons",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_sale_invoice_chargable_services" : {
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_sale_invoice_chargable_services",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"chargeable_service_uom_id" : {
				"act_tbl_chargeable_service_uoms" : {
					"chargeable_service_uom_id" : {
						"destination_field" : "chargeable_service_uom_id",
						"destination_table" : "act_tbl_sale_invoice_chargable_services",
						"source_field" : "chargeable_service_uom_id",
						"source_table" : "act_tbl_chargeable_service_uoms"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_invoice_chargable_services",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"sale_invoice_id" : {
				"act_tbl_sale_invoices" : {
					"sale_invoice_id" : {
						"destination_field" : "sale_invoice_id",
						"destination_table" : "act_tbl_sale_invoice_chargable_services",
						"source_field" : "sale_invoice_id",
						"source_table" : "act_tbl_sale_invoices"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_invoice_chargable_services",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_sale_invoice_chargable_services",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			}
		},
		"act_tbl_sale_invoice_expenses" : {
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_invoice_expenses",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_invoice_expenses",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"sale_invoice_id" : {
				"act_tbl_sale_invoices" : {
					"sale_invoice_id" : {
						"destination_field" : "sale_invoice_id",
						"destination_table" : "act_tbl_sale_invoice_expenses",
						"source_field" : "sale_invoice_id",
						"source_table" : "act_tbl_sale_invoices"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_invoice_expenses",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_sale_invoice_expenses",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			}
		},
		"act_tbl_sale_invoice_payments" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_invoice_payments",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"payment_method_id" : {
				"act_tbl_payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "act_tbl_sale_invoice_payments",
						"source_field" : "payment_method_id",
						"source_table" : "act_tbl_payment_methods"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_invoice_payments",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_invoice_payments",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"sale_invoice_id" : {
				"act_tbl_sale_invoices" : {
					"sale_invoice_id" : {
						"destination_field" : "sale_invoice_id",
						"destination_table" : "act_tbl_sale_invoice_payments",
						"source_field" : "sale_invoice_id",
						"source_table" : "act_tbl_sale_invoices"
					}
				}
			}
		},
		"act_tbl_sale_invoice_products" : {
			"sale_invoice_id" : {
				"act_tbl_sale_invoices" : {
					"sale_invoice_id" : {
						"destination_field" : "sale_invoice_id",
						"destination_table" : "act_tbl_sale_invoice_products",
						"source_field" : "sale_invoice_id",
						"source_table" : "act_tbl_sale_invoices"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_sale_invoice_products",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "act_tbl_sale_invoice_products",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_sale_invoice_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_invoice_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_invoice_products",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_sale_invoice_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			}
		},
		"act_tbl_sale_invoices" : {
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"device_id" : {
				"act_tbl_devices" : {
					"device_id" : {
						"destination_field" : "device_id",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "device_id",
						"source_table" : "act_tbl_devices"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"sale_term_id" : {
				"act_tbl_sale_terms" : {
					"sale_term_id" : {
						"destination_field" : "sale_term_id",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "sale_term_id",
						"source_table" : "act_tbl_sale_terms"
					}
				}
			},
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_sale_invoices",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			}
		},
		"act_tbl_sale_maintenance_chargeable_services" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_maintenance_chargeable_services",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_sale_maintenance_chargeable_services",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_sale_maintenance_chargeable_services",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"chargeable_service_uom_id" : {
				"act_tbl_chargeable_service_uoms" : {
					"chargeable_service_uom_id" : {
						"destination_field" : "chargeable_service_uom_id",
						"destination_table" : "act_tbl_sale_maintenance_chargeable_services",
						"source_field" : "chargeable_service_uom_id",
						"source_table" : "act_tbl_chargeable_service_uoms"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_maintenance_chargeable_services",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"sale_maintenance_id" : {
				"act_tbl_sale_maintenances" : {
					"sale_maintenance_id" : {
						"destination_field" : "sale_maintenance_id",
						"destination_table" : "act_tbl_sale_maintenance_chargeable_services",
						"source_field" : "sale_maintenance_id",
						"source_table" : "act_tbl_sale_maintenances"
					}
				}
			}
		},
		"act_tbl_sale_maintenance_expenses" : {
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_maintenance_expenses",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_sale_maintenance_expenses",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			},
			"sale_maintenance_id" : {
				"act_tbl_sale_maintenances" : {
					"sale_maintenance_id" : {
						"destination_field" : "sale_maintenance_id",
						"destination_table" : "act_tbl_sale_maintenance_expenses",
						"source_field" : "sale_maintenance_id",
						"source_table" : "act_tbl_sale_maintenances"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_maintenance_expenses",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_maintenance_expenses",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			}
		},
		"act_tbl_sale_maintenance_payments" : {
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_maintenance_payments",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"payment_method_id" : {
				"act_tbl_payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "act_tbl_sale_maintenance_payments",
						"source_field" : "payment_method_id",
						"source_table" : "act_tbl_payment_methods"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_maintenance_payments",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"sale_maintenance_id" : {
				"act_tbl_sale_maintenances" : {
					"sale_maintenance_id" : {
						"destination_field" : "sale_maintenance_id",
						"destination_table" : "act_tbl_sale_maintenance_payments",
						"source_field" : "sale_maintenance_id",
						"source_table" : "act_tbl_sale_maintenances"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_maintenance_payments",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			}
		},
		"act_tbl_sale_maintenance_products" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_maintenance_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "act_tbl_sale_maintenance_products",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			},
			"sale_maintenance_id" : {
				"act_tbl_sale_maintenances" : {
					"sale_maintenance_id" : {
						"destination_field" : "sale_maintenance_id",
						"destination_table" : "act_tbl_sale_maintenance_products",
						"source_field" : "sale_maintenance_id",
						"source_table" : "act_tbl_sale_maintenances"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_maintenance_products",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_sale_maintenance_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_sale_maintenance_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_sale_maintenance_products",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			}
		},
		"act_tbl_sale_maintenances" : {
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"device_id" : {
				"act_tbl_devices" : {
					"device_id" : {
						"destination_field" : "device_id",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "device_id",
						"source_table" : "act_tbl_devices"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"sale_invoice_id" : {
				"act_tbl_sale_invoices" : {
					"sale_invoice_id" : {
						"destination_field" : "sale_invoice_id",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "sale_invoice_id",
						"source_table" : "act_tbl_sale_invoices"
					}
				}
			},
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			},
			"sale_terms_id" : {
				"act_tbl_sale_maintenances" : {
					"sale_terms_id" : {
						"destination_field" : "sale_terms_id",
						"destination_table" : "act_tbl_sale_maintenances",
						"source_field" : "sale_terms_id",
						"source_table" : "act_tbl_sale_maintenances"
					}
				}
			}
		},
		"act_tbl_sale_offer_products" : {
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_sale_offer_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"sale_offer_id" : {
				"act_tbl_sale_offers" : {
					"sale_offer_id" : {
						"destination_field" : "sale_offer_id",
						"destination_table" : "act_tbl_sale_offer_products",
						"source_field" : "sale_offer_id",
						"source_table" : "act_tbl_sale_offers"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_offer_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"discount_type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "discount_type_lookup_value_id",
						"destination_table" : "act_tbl_sale_offer_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_sale_offers" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_offers",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"discount_type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "discount_type_lookup_value_id",
						"destination_table" : "act_tbl_sale_offers",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_sale_offers",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_sale_quotation_chargeable_services" : {
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_sale_quotation_chargeable_services",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			},
			"chargeable_service_uom_id" : {
				"act_tbl_chargeable_service_uoms" : {
					"chargeable_service_uom_id" : {
						"destination_field" : "chargeable_service_uom_id",
						"destination_table" : "act_tbl_sale_quotation_chargeable_services",
						"source_field" : "chargeable_service_uom_id",
						"source_table" : "act_tbl_chargeable_service_uoms"
					}
				}
			},
			"sale_quotation_id" : {
				"act_tbl_sale_quotations" : {
					"sale_quotation_id" : {
						"destination_field" : "sale_quotation_id",
						"destination_table" : "act_tbl_sale_quotation_chargeable_services",
						"source_field" : "sale_quotation_id",
						"source_table" : "act_tbl_sale_quotations"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_sale_quotation_chargeable_services",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_quotation_chargeable_services",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_quotation_chargeable_services",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			}
		},
		"act_tbl_sale_quotation_expenses" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_quotation_expenses",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_quotation_expenses",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_quotation_expenses",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_sale_quotation_expenses",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			},
			"sale_quotation_id" : {
				"act_tbl_sale_quotations" : {
					"sale_quotation_id" : {
						"destination_field" : "sale_quotation_id",
						"destination_table" : "act_tbl_sale_quotation_expenses",
						"source_field" : "sale_quotation_id",
						"source_table" : "act_tbl_sale_quotations"
					}
				}
			}
		},
		"act_tbl_sale_quotation_products" : {
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_quotation_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_sale_quotation_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"sale_quotation_id" : {
				"act_tbl_sale_quotations" : {
					"sale_quotation_id" : {
						"destination_field" : "sale_quotation_id",
						"destination_table" : "act_tbl_sale_quotation_products",
						"source_field" : "sale_quotation_id",
						"source_table" : "act_tbl_sale_quotations"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_sale_quotation_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_sale_quotation_products",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_quotation_products",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			}
		},
		"act_tbl_sale_quotations" : {
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_sale_quotations",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_sale_quotations",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_quotations",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_sale_quotations",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"sale_term_id" : {
				"act_tbl_sale_terms" : {
					"sale_term_id" : {
						"destination_field" : "sale_term_id",
						"destination_table" : "act_tbl_sale_quotations",
						"source_field" : "sale_term_id",
						"source_table" : "act_tbl_sale_terms"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_quotations",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_quotations",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			}
		},
		"act_tbl_sale_return_chargeable_services" : {
			"sale_return_id" : {
				"act_tbl_sale_returns" : {
					"sale_return_id" : {
						"destination_field" : "sale_return_id",
						"destination_table" : "act_tbl_sale_return_chargeable_services",
						"source_field" : "sale_return_id",
						"source_table" : "act_tbl_sale_returns"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_return_chargeable_services",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_sale_return_chargeable_services",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_return_chargeable_services",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_sale_return_chargeable_services",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			},
			"chargeable_service_uom_id" : {
				"act_tbl_chargeable_service_uoms" : {
					"chargeable_service_uom_id" : {
						"destination_field" : "chargeable_service_uom_id",
						"destination_table" : "act_tbl_sale_return_chargeable_services",
						"source_field" : "chargeable_service_uom_id",
						"source_table" : "act_tbl_chargeable_service_uoms"
					}
				}
			}
		},
		"act_tbl_sale_return_expenses" : {
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_return_expenses",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_sale_return_expenses",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_return_expenses",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"sale_return_id" : {
				"act_tbl_sale_returns" : {
					"sale_return_id" : {
						"destination_field" : "sale_return_id",
						"destination_table" : "act_tbl_sale_return_expenses",
						"source_field" : "sale_return_id",
						"source_table" : "act_tbl_sale_returns"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_return_expenses",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_sale_return_payments" : {
			"payment_method_id" : {
				"act_tbl_payment_methods" : {
					"payment_method_id" : {
						"destination_field" : "payment_method_id",
						"destination_table" : "act_tbl_sale_return_payments",
						"source_field" : "payment_method_id",
						"source_table" : "act_tbl_payment_methods"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_return_payments",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"sale_return_id" : {
				"act_tbl_sale_returns" : {
					"sale_return_id" : {
						"destination_field" : "sale_return_id",
						"destination_table" : "act_tbl_sale_return_payments",
						"source_field" : "sale_return_id",
						"source_table" : "act_tbl_sale_returns"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_return_payments",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_return_payments",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			}
		},
		"act_tbl_sale_return_products" : {
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_sale_return_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_sale_return_products",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_return_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_sale_return_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_sale_return_products",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			},
			"inward_inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inward_inventory_tracking_id",
						"destination_table" : "act_tbl_sale_return_products",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			},
			"sale_return_id" : {
				"act_tbl_sale_returns" : {
					"sale_return_id" : {
						"destination_field" : "sale_return_id",
						"destination_table" : "act_tbl_sale_return_products",
						"source_field" : "sale_return_id",
						"source_table" : "act_tbl_sale_returns"
					}
				}
			}
		},
		"act_tbl_sale_returns" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"transaction_entry_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"sale_invoice_id" : {
				"act_tbl_sale_invoices" : {
					"sale_invoice_id" : {
						"destination_field" : "sale_invoice_id",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "sale_invoice_id",
						"source_table" : "act_tbl_sale_invoices"
					}
				}
			},
			"customer_id" : {
				"act_tbl_customers" : {
					"customer_id" : {
						"destination_field" : "customer_id",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "customer_id",
						"source_table" : "act_tbl_customers"
					}
				}
			},
			"sale_terms_id" : {
				"act_tbl_sale_terms" : {
					"sale_term_id" : {
						"destination_field" : "sale_terms_id",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "sale_term_id",
						"source_table" : "act_tbl_sale_terms"
					}
				}
			},
			"device_id" : {
				"act_tbl_devices" : {
					"device_id" : {
						"destination_field" : "device_id",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "device_id",
						"source_table" : "act_tbl_devices"
					}
				}
			},
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_sale_returns",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			}
		},
		"act_tbl_sale_terms" : {
			"is_active" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "is_active",
						"destination_table" : "act_tbl_sale_terms",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_sale_terms",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_signatures" : {
			"signature_media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "signature_media_id",
						"destination_table" : "act_tbl_signatures",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_signatures",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			}
		},
		"act_tbl_stock_audit_product_storage_locations" : {
			"storage_location_id" : {
				"act_tbl_storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "storage_location_id",
						"destination_table" : "act_tbl_stock_audit_product_storage_locations",
						"source_field" : "storage_location_id",
						"source_table" : "act_tbl_storage_locations"
					}
				}
			},
			"stock_audit_product_id" : {
				"act_tbl_stock_audit_products" : {
					"stock_audit_product_id" : {
						"destination_field" : "stock_audit_product_id",
						"destination_table" : "act_tbl_stock_audit_product_storage_locations",
						"source_field" : "stock_audit_product_id",
						"source_table" : "act_tbl_stock_audit_products"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_stock_audit_product_storage_locations",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_stock_audit_product_storage_locations",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			}
		},
		"act_tbl_stock_audit_products" : {
			"stock_audit_id" : {
				"act_tbl_stock_audits" : {
					"stock_audit_id" : {
						"destination_field" : "stock_audit_id",
						"destination_table" : "act_tbl_stock_audit_products",
						"source_field" : "stock_audit_id",
						"source_table" : "act_tbl_stock_audits"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_stock_audit_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_stock_audit_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_stock_audit_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_stock_audits" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_stock_audits",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_stock_audits",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_stock_audits",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_stock_audits",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			}
		},
		"act_tbl_stock_transfer_packing_products" : {
			"stock_transfer_product_id" : {
				"act_tbl_stock_transfer_products" : {
					"stock_transfer_product_id" : {
						"destination_field" : "stock_transfer_product_id",
						"destination_table" : "act_tbl_stock_transfer_packing_products",
						"source_field" : "stock_transfer_product_id",
						"source_table" : "act_tbl_stock_transfer_products"
					}
				}
			},
			"stock_transfer_packing_id" : {
				"act_tbl_stock_transfer_packings" : {
					"stock_transfer_packing_id" : {
						"destination_field" : "stock_transfer_packing_id",
						"destination_table" : "act_tbl_stock_transfer_packing_products",
						"source_field" : "stock_transfer_packing_id",
						"source_table" : "act_tbl_stock_transfer_packings"
					}
				}
			}
		},
		"act_tbl_stock_transfer_packings" : {
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_stock_transfer_packings",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"unpacking_status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "unpacking_status_lookup_value_id",
						"destination_table" : "act_tbl_stock_transfer_packings",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"packing_status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "packing_status_lookup_value_id",
						"destination_table" : "act_tbl_stock_transfer_packings",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"stock_transfer_id" : {
				"act_tbl_stock_transfers" : {
					"stock_transfer_id" : {
						"destination_field" : "stock_transfer_id",
						"destination_table" : "act_tbl_stock_transfer_packings",
						"source_field" : "stock_transfer_id",
						"source_table" : "act_tbl_stock_transfers"
					}
				}
			}
		},
		"act_tbl_stock_transfer_products" : {
			"source_inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "source_inventory_tracking_id",
						"destination_table" : "act_tbl_stock_transfer_products",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_stock_transfer_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"packing_status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "packing_status_lookup_value_id",
						"destination_table" : "act_tbl_stock_transfer_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"unpacking_status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "unpacking_status_lookup_value_id",
						"destination_table" : "act_tbl_stock_transfer_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"destination_inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "destination_inventory_tracking_id",
						"destination_table" : "act_tbl_stock_transfer_products",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_stock_transfer_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"stock_transfer_id" : {
				"act_tbl_stock_transfers" : {
					"stock_transfer_id" : {
						"destination_field" : "stock_transfer_id",
						"destination_table" : "act_tbl_stock_transfer_products",
						"source_field" : "stock_transfer_id",
						"source_table" : "act_tbl_stock_transfers"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_stock_transfer_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_stock_transfers" : {
			"destination_user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "destination_user_id",
						"destination_table" : "act_tbl_stock_transfers",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"source_user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "source_user_id",
						"destination_table" : "act_tbl_stock_transfers",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"source_location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "source_location_id",
						"destination_table" : "act_tbl_stock_transfers",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"destination_location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "destination_location_id",
						"destination_table" : "act_tbl_stock_transfers",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_stock_transfers",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_stock_transfers",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_stock_transfers",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_stock_update_products" : {
			"stock_update_id" : {
				"act_tbl_stock_updates" : {
					"stock_update_id" : {
						"destination_field" : "stock_update_id",
						"destination_table" : "act_tbl_stock_update_products",
						"source_field" : "stock_update_id",
						"source_table" : "act_tbl_stock_updates"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_stock_update_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			},
			"product_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "product_uom_id",
						"destination_table" : "act_tbl_stock_update_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_stock_update_products",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"inventory_tracking_id" : {
				"act_tbl_inventory_trackings" : {
					"inventory_tracking_id" : {
						"destination_field" : "inventory_tracking_id",
						"destination_table" : "act_tbl_stock_update_products",
						"source_field" : "inventory_tracking_id",
						"source_table" : "act_tbl_inventory_trackings"
					}
				}
			}
		},
		"act_tbl_stock_updates" : {
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_stock_updates",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_stock_updates",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_stock_updates",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_stock_updates",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_storage_locations" : {
			"storage_location_image_media_id" : {
				"act_tbl_storage_locations" : {
					"storage_location_image_media_id" : {
						"destination_field" : "storage_location_image_media_id",
						"destination_table" : "act_tbl_storage_locations",
						"source_field" : "storage_location_image_media_id",
						"source_table" : "act_tbl_storage_locations"
					}
				}
			},
			"location_id" : {
				"act_tbl_locations" : {
					"location_id" : {
						"destination_field" : "location_id",
						"destination_table" : "act_tbl_storage_locations",
						"source_field" : "location_id",
						"source_table" : "act_tbl_locations"
					}
				}
			},
			"parent_storage_location_id" : {
				"act_tbl_storage_locations" : {
					"storage_location_id" : {
						"destination_field" : "parent_storage_location_id",
						"destination_table" : "act_tbl_storage_locations",
						"source_field" : "storage_location_id",
						"source_table" : "act_tbl_storage_locations"
					}
				}
			},
			"status_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "status_lookup_value_id",
						"destination_table" : "act_tbl_storage_locations",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			}
		},
		"act_tbl_supplier_addresses" : {
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_addresses",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"address_id" : {
				"act_tbl_addresses" : {
					"address_id" : {
						"destination_field" : "address_id",
						"destination_table" : "act_tbl_supplier_addresses",
						"source_field" : "address_id",
						"source_table" : "act_tbl_addresses"
					}
				}
			}
		},
		"act_tbl_supplier_chargeable_services" : {
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_chargeable_services",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"minimum_order_quantity_uom_id" : {
				"act_tbl_chargeable_service_uoms" : {
					"chargeable_service_uom_id" : {
						"destination_field" : "minimum_order_quantity_uom_id",
						"destination_table" : "act_tbl_supplier_chargeable_services",
						"source_field" : "chargeable_service_uom_id",
						"source_table" : "act_tbl_chargeable_service_uoms"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_supplier_chargeable_services",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"chargeable_service_id" : {
				"act_tbl_chargeable_services" : {
					"chargeable_service_id" : {
						"destination_field" : "chargeable_service_id",
						"destination_table" : "act_tbl_supplier_chargeable_services",
						"source_field" : "chargeable_service_id",
						"source_table" : "act_tbl_chargeable_services"
					}
				}
			}
		},
		"act_tbl_supplier_contact_persons" : {
			"contact_person_id" : {
				"act_tbl_contact_persons" : {
					"contact_person_id" : {
						"destination_field" : "contact_person_id",
						"destination_table" : "act_tbl_supplier_contact_persons",
						"source_field" : "contact_person_id",
						"source_table" : "act_tbl_contact_persons"
					}
				}
			},
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_contact_persons",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			}
		},
		"act_tbl_supplier_email_addresses" : {
			"email_address_id" : {
				"act_tbl_email_addresses" : {
					"email_address_id" : {
						"destination_field" : "email_address_id",
						"destination_table" : "act_tbl_supplier_email_addresses",
						"source_field" : "email_address_id",
						"source_table" : "act_tbl_email_addresses"
					}
				}
			},
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_email_addresses",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			}
		},
		"act_tbl_supplier_fax_numbers" : {
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_fax_numbers",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"fax_number_id" : {
				"act_tbl_fax_numbers" : {
					"fax_number_id" : {
						"destination_field" : "fax_number_id",
						"destination_table" : "act_tbl_supplier_fax_numbers",
						"source_field" : "fax_number_id",
						"source_table" : "act_tbl_fax_numbers"
					}
				}
			}
		},
		"act_tbl_supplier_legal_documents" : {
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_legal_documents",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"legal_document_id" : {
				"act_tbl_legal_documents" : {
					"legal_document_id" : {
						"destination_field" : "legal_document_id",
						"destination_table" : "act_tbl_supplier_legal_documents",
						"source_field" : "legal_document_id",
						"source_table" : "act_tbl_legal_documents"
					}
				}
			}
		},
		"act_tbl_supplier_medias" : {
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_medias",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_supplier_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_supplier_phone_numbers" : {
			"phone_number_id" : {
				"act_tbl_phone_numbers" : {
					"phone_number_id" : {
						"destination_field" : "phone_number_id",
						"destination_table" : "act_tbl_supplier_phone_numbers",
						"source_field" : "phone_number_id",
						"source_table" : "act_tbl_phone_numbers"
					}
				}
			},
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_phone_numbers",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			}
		},
		"act_tbl_supplier_products" : {
			"minimum_order_quantity_uom_id" : {
				"act_tbl_product_uoms" : {
					"product_uom_id" : {
						"destination_field" : "minimum_order_quantity_uom_id",
						"destination_table" : "act_tbl_supplier_products",
						"source_field" : "product_uom_id",
						"source_table" : "act_tbl_product_uoms"
					}
				}
			},
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_products",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_supplier_products",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"product_id" : {
				"act_tbl_products" : {
					"product_id" : {
						"destination_field" : "product_id",
						"destination_table" : "act_tbl_supplier_products",
						"source_field" : "product_id",
						"source_table" : "act_tbl_products"
					}
				}
			}
		},
		"act_tbl_supplier_websites" : {
			"supplier_id" : {
				"act_tbl_suppliers" : {
					"supplier_id" : {
						"destination_field" : "supplier_id",
						"destination_table" : "act_tbl_supplier_websites",
						"source_field" : "supplier_id",
						"source_table" : "act_tbl_suppliers"
					}
				}
			},
			"website_id" : {
				"act_tbl_websites" : {
					"website_id" : {
						"destination_field" : "website_id",
						"destination_table" : "act_tbl_supplier_websites",
						"source_field" : "website_id",
						"source_table" : "act_tbl_websites"
					}
				}
			}
		},
		"act_tbl_suppliers" : {
			"type_lookup_value_id" : {
				"act_tbl_lookup_values" : {
					"lookup_value_id" : {
						"destination_field" : "type_lookup_value_id",
						"destination_table" : "act_tbl_suppliers",
						"source_field" : "lookup_value_id",
						"source_table" : "act_tbl_lookup_values"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_suppliers",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_suppliers",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_suppliers",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			}
		},
		"act_tbl_tax_parts" : {
			"tax_rate_id" : {
				"act_tbl_tax_rates" : {
					"tax_rate_id" : {
						"destination_field" : "tax_rate_id",
						"destination_table" : "act_tbl_tax_parts",
						"source_field" : "tax_rate_id",
						"source_table" : "act_tbl_tax_rates"
					}
				}
			}
		},
		"act_tbl_tax_rates" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_tax_rates",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"taxing_scheme_id" : {
				"act_tbl_taxing_schemes" : {
					"taxing_scheme_id" : {
						"destination_field" : "taxing_scheme_id",
						"destination_table" : "act_tbl_tax_rates",
						"source_field" : "taxing_scheme_id",
						"source_table" : "act_tbl_taxing_schemes"
					}
				}
			}
		},
		"act_tbl_taxing_schemes" : {
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_taxing_schemes",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_transaction_entries" : {
			"transaction_id" : {
				"act_tbl_transactions" : {
					"transaction_id" : {
						"destination_field" : "transaction_id",
						"destination_table" : "act_tbl_transaction_entries",
						"source_field" : "transaction_id",
						"source_table" : "act_tbl_transactions"
					}
				}
			},
			"ledger_account_id" : {
				"act_tbl_ledger_accounts" : {
					"ledger_account_id" : {
						"destination_field" : "ledger_account_id",
						"destination_table" : "act_tbl_transaction_entries",
						"source_field" : "ledger_account_id",
						"source_table" : "act_tbl_ledger_accounts"
					}
				}
			}
		},
		"act_tbl_transaction_entry_medias" : {
			"transaction_entry_id" : {
				"act_tbl_transaction_entries" : {
					"transaction_entry_id" : {
						"destination_field" : "transaction_entry_id",
						"destination_table" : "act_tbl_transaction_entry_medias",
						"source_field" : "transaction_entry_id",
						"source_table" : "act_tbl_transaction_entries"
					}
				}
			},
			"media_id" : {
				"act_tbl_medias" : {
					"media_id" : {
						"destination_field" : "media_id",
						"destination_table" : "act_tbl_transaction_entry_medias",
						"source_field" : "media_id",
						"source_table" : "act_tbl_medias"
					}
				}
			}
		},
		"act_tbl_transactions" : {
			"currency_code" : {
				"act_tbl_currencies" : {
					"currency_code" : {
						"destination_field" : "currency_code",
						"destination_table" : "act_tbl_transactions",
						"source_field" : "currency_code",
						"source_table" : "act_tbl_currencies"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_transactions",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			}
		},
		"act_tbl_user_accountees" : {
			"access_group_id" : {
				"act_tbl_access_groups" : {
					"access_group_id" : {
						"destination_field" : "access_group_id",
						"destination_table" : "act_tbl_user_accountees",
						"source_field" : "access_group_id",
						"source_table" : "act_tbl_access_groups"
					}
				}
			},
			"accountee_id" : {
				"act_tbl_accountees" : {
					"accountee_id" : {
						"destination_field" : "accountee_id",
						"destination_table" : "act_tbl_user_accountees",
						"source_field" : "accountee_id",
						"source_table" : "act_tbl_accountees"
					}
				}
			},
			"employee_id" : {
				"act_tbl_employees" : {
					"employee_id" : {
						"destination_field" : "employee_id",
						"destination_table" : "act_tbl_user_accountees",
						"source_field" : "employee_id",
						"source_table" : "act_tbl_employees"
					}
				}
			},
			"menu_id" : {
				"act_tbl_menus" : {
					"menu_id" : {
						"destination_field" : "menu_id",
						"destination_table" : "act_tbl_user_accountees",
						"source_field" : "menu_id",
						"source_table" : "act_tbl_menus"
					}
				}
			},
			"user_id" : {
				"act_tbl_users" : {
					"user_id" : {
						"destination_field" : "user_id",
						"destination_table" : "act_tbl_user_accountees",
						"source_field" : "user_id",
						"source_table" : "act_tbl_users"
					}
				}
			}
		}
	}
}
