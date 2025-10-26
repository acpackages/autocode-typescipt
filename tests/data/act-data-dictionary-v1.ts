export const dataDictionaryJson = {
  "name": "Accountea - Pro",
  "version": 1,
  "tables": {
    "act_access_groups": {
      "tableName": "act_access_groups",
      "tableColumns": {
        "access_group_id": {
          "columnName": "access_group_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "access_group_name": {
          "columnName": "access_group_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "UNIQUE_KEY": {
              "propertyName": "UNIQUE_KEY",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "access_group_remarks": {
          "columnName": "access_group_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "access_group_description": {
          "columnName": "access_group_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "access_group"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "access_groups"
        }
      }
    },
    "act_access_rights": {
      "tableName": "act_access_rights",
      "tableColumns": {
        "access_group_id": {
          "columnName": "access_group_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Access Group"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "access_right_id": {
          "columnName": "access_right_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "access_right_name": {
          "columnName": "access_right_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "access_right_value": {
          "columnName": "access_right_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "access_right"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "access_rights"
        }
      }
    },
    "act_accountee_addresses": {
      "tableName": "act_accountee_addresses",
      "tableColumns": {
        "accountee_address_id": {
          "columnName": "accountee_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "address_id": {
          "columnName": "address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Address"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee_address"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountee_addresses"
        }
      }
    },
    "act_accountee_bank_accounts": {
      "tableName": "act_accountee_bank_accounts",
      "tableColumns": {
        "accountee_bank_account_id": {
          "columnName": "accountee_bank_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "bank_account_id": {
          "columnName": "bank_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Bank Account"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee_bank_account"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountee_bank_accounts"
        }
      }
    },
    "act_accountee_email_addresses": {
      "tableName": "act_accountee_email_addresses",
      "tableColumns": {
        "accountee_email_address_id": {
          "columnName": "accountee_email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "email_address_id": {
          "columnName": "email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Address"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee_email_address"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountee_email_addresses"
        }
      }
    },
    "act_accountee_fax_numbers": {
      "tableName": "act_accountee_fax_numbers",
      "tableColumns": {
        "accountee_fax_number_id": {
          "columnName": "accountee_fax_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "fax_number_id": {
          "columnName": "fax_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Fax Number"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee_fax_number"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountee_fax_numbers"
        }
      }
    },
    "act_accountee_legal_documents": {
      "tableName": "act_accountee_legal_documents",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_legal_document_id": {
          "columnName": "accountee_legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "legal_document_id": {
          "columnName": "legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Legal Document"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee_legal_document"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountee_legal_documents"
        }
      }
    },
    "act_accountee_medias": {
      "tableName": "act_accountee_medias",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_media_id": {
          "columnName": "accountee_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee_media"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountee_medias"
        }
      }
    },
    "act_accountee_phone_numbers": {
      "tableName": "act_accountee_phone_numbers",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_phone_number_id": {
          "columnName": "accountee_phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "phone_number_id": {
          "columnName": "phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Number"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee_phone_number"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountee_phone_numbers"
        }
      }
    },
    "act_accountee_settings": {
      "tableName": "act_accountee_settings",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_setting_id": {
          "columnName": "accountee_setting_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "accountee_setting_name": {
          "columnName": "accountee_setting_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_setting_numeric_value": {
          "columnName": "accountee_setting_numeric_value",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        },
        "accountee_setting_text_value": {
          "columnName": "accountee_setting_text_value",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        },
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee_setting"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountee_settings"
        }
      }
    },
    "act_accountee_websites": {
      "tableName": "act_accountee_websites",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_website_id": {
          "columnName": "accountee_website_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "website_id": {
          "columnName": "website_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Website"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee_website"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountee_webistes"
        }
      }
    },
    "act_accountees": {
      "tableName": "act_accountees",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "accountee_image_media_id": {
          "columnName": "accountee_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        },
        "accountee_name": {
          "columnName": "accountee_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "financial_year_end": {
          "columnName": "financial_year_end",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Financial Year End"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "financial_year_start": {
          "columnName": "financial_year_start",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Financial Year Start"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "1"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_remarks": {
          "columnName": "accountee_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "accountee_type": {
          "columnName": "accountee_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "email_addresses": {
          "columnName": "email_addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Addresses"
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": "Value Options"
            }
          }
        },
        "phone_numbers": {
          "columnName": "phone_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Numbers"
            }
          }
        },
        "addresses": {
          "columnName": "addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Addresses"
            }
          }
        },
        "fax_numbers": {
          "columnName": "fax_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Fax Numbers"
            }
          }
        },
        "websites": {
          "columnName": "websites",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Websites"
            }
          }
        },
        "bank_accounts": {
          "columnName": "bank_accounts",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Bank Accounts"
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "INR"
            }
          }
        }
      },
      "tableProperties": {
        "CONSTRAINTS": {
          "propertyName": "CONSTRAINTS",
          "propertyValue": [
            {
              "type": "COMPOSITE_UNIQUE_KEY",
              "value": "accountee_name,financial_year_end,financial_year_start"
            }
          ]
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "accountees"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "accountee"
        }
      }
    },
    "act_addresses": {
      "tableName": "act_addresses",
      "tableColumns": {
        "address_id": {
          "columnName": "address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "address_label": {
          "columnName": "address_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Label"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "address_line_1": {
          "columnName": "address_line_1",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Address Line 1"
            }
          }
        },
        "address_line_2": {
          "columnName": "address_line_2",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Address Line 2"
            }
          }
        },
        "country_name": {
          "columnName": "country_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Country"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "landmark": {
          "columnName": "landmark",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Landmark"
            }
          }
        },
        "latitude": {
          "columnName": "latitude",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Latitude"
            }
          }
        },
        "longitude": {
          "columnName": "longitude",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Longitude"
            }
          }
        },
        "postal_code": {
          "columnName": "postal_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Postal Code"
            }
          }
        },
        "state_name": {
          "columnName": "state_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "State"
            }
          }
        },
        "city_name": {
          "columnName": "city_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "City"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "address"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "addresses"
        }
      }
    },
    "act_asset_attributes": {
      "tableName": "act_asset_attributes",
      "tableColumns": {
        "asset_attribute_id": {
          "columnName": "asset_attribute_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "asset_attribute_label": {
          "columnName": "asset_attribute_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "asset_attribute_numeric_value": {
          "columnName": "asset_attribute_numeric_value",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        },
        "asset_attribute_string_value": {
          "columnName": "asset_attribute_string_value",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            },
            "is_select_distinct": {
              "propertyName": "is_select_distinct",
              "propertyValue": true
            }
          }
        },
        "asset_id": {
          "columnName": "asset_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Asset"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "asset_attribute_remarks": {
          "columnName": "asset_attribute_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "asset_attribute_media_id": {
          "columnName": "asset_attribute_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            }
          }
        },
        "value_type": {
          "columnName": "value_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value Type"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "asset_attribute"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "asset_attributes"
        }
      }
    },
    "act_asset_depreciations": {
      "tableName": "act_asset_depreciations",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "asset_depreciation_amount": {
          "columnName": "asset_depreciation_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "asset_depreciation_date": {
          "columnName": "asset_depreciation_date",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "asset_depreciation_id": {
          "columnName": "asset_depreciation_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "asset_depreciation_percentage": {
          "columnName": "asset_depreciation_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Percentage"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "asset_id": {
          "columnName": "asset_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Asset"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "new_asset_value": {
          "columnName": "new_asset_value",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "New Value"
            }
          }
        },
        "old_asset_value": {
          "columnName": "old_asset_value",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Old Value"
            }
          }
        },
        "depreciation_status": {
          "columnName": "depreciation_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "asset_depreciation"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "asset_depreciations"
        }
      }
    },
    "act_asset_legal_documents": {
      "tableName": "act_asset_legal_documents",
      "tableColumns": {
        "asset_id": {
          "columnName": "asset_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Asset"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "asset_legal_document_id": {
          "columnName": "asset_legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "legal_document_id": {
          "columnName": "legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Legal Document"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "asset_legal_document"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "asset_legal_documents"
        }
      }
    },
    "act_asset_medias": {
      "tableName": "act_asset_medias",
      "tableColumns": {
        "asset_id": {
          "columnName": "asset_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Asset"
            }
          }
        },
        "asset_media_id": {
          "columnName": "asset_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "asset_media"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "asset_medias"
        }
      }
    },
    "act_assets": {
      "tableName": "act_assets",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "asset_barcode": {
          "columnName": "asset_barcode",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Barcode Value"
            }
          }
        },
        "asset_depreciation_occurance": {
          "columnName": "asset_depreciation_occurance",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Depreciation Occurance"
            }
          }
        },
        "asset_depreciation_percentage": {
          "columnName": "asset_depreciation_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Depreciation %"
            }
          }
        },
        "asset_details": {
          "columnName": "asset_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          }
        },
        "asset_id": {
          "columnName": "asset_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "asset_image_media_id": {
          "columnName": "asset_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        },
        "asset_name": {
          "columnName": "asset_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "asset_value": {
          "columnName": "asset_value",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          }
        },
        "asset_remarks": {
          "columnName": "asset_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "asset"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "assets"
        }
      }
    },
    "act_automated_task_logs": {
      "tableName": "act_automated_task_logs",
      "tableColumns": {
        "automated_task_end_datetime": {
          "columnName": "automated_task_end_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "End Time"
            }
          }
        },
        "automated_task_event": {
          "columnName": "automated_task_event",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Triggering Event"
            }
          }
        },
        "automated_task_id": {
          "columnName": "automated_task_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Automated Task"
            }
          }
        },
        "automated_task_log_file_path": {
          "columnName": "automated_task_log_file_path",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Log File Path"
            }
          }
        },
        "automated_task_log_id": {
          "columnName": "automated_task_log_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "automated_task_log_number": {
          "columnName": "automated_task_log_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Log Number"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "automated_task_message": {
          "columnName": "automated_task_message",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Message"
            }
          }
        },
        "automated_task_record_id": {
          "columnName": "automated_task_record_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Record Id"
            }
          }
        },
        "automated_task_start_datetime": {
          "columnName": "automated_task_start_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Start Time"
            }
          }
        },
        "automated_task_table": {
          "columnName": "automated_task_table",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Triggering Table"
            }
          }
        },
        "automated_task_log_remarks": {
          "columnName": "automated_task_log_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "automated_task_status": {
          "columnName": "automated_task_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                },
                {
                  "label": "CANCELLED",
                  "value": "CANCELLED"
                },
                {
                  "label": "ERROR",
                  "value": "ERROR"
                }
              ]
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "automated_task_log"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "automated_task_logs"
        }
      }
    },
    "act_automated_tasks": {
      "tableName": "act_automated_tasks",
      "tableColumns": {
        "automated_task_editor_json": {
          "columnName": "automated_task_editor_json",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Editor Json"
            }
          }
        },
        "automated_task_id": {
          "columnName": "automated_task_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "automated_task_json": {
          "columnName": "automated_task_json",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Task Json"
            }
          }
        },
        "automated_task_name": {
          "columnName": "automated_task_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "automated_task_number": {
          "columnName": "automated_task_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "AUTO_NUMBER_LENGTH": {
              "propertyName": "AUTO_NUMBER_LENGTH",
              "propertyValue": 5
            },
            "AUTO_NUMBER_PREFIX": {
              "propertyName": "AUTO_NUMBER_PREFIX",
              "propertyValue": "AT-"
            },
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Number"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "execution_priority": {
          "columnName": "execution_priority",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Execution Priority"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "ACTIVE",
                  "value": "ACTIVE"
                },
                {
                  "label": "INACTIVE",
                  "value": "INACTIVE"
                }
              ]
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "task_remarks": {
          "columnName": "task_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "automated_task_description": {
          "columnName": "automated_task_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "automated_task"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "automated_tasks"
        }
      }
    },
    "act_automation_flags": {
      "tableName": "act_automation_flags",
      "tableColumns": {
        "automation_flag_id": {
          "columnName": "automation_flag_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "automation_flag_name": {
          "columnName": "automation_flag_name",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          }
        },
        "automation_flag_value": {
          "columnName": "automation_flag_value",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "automation_flag"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "automation_flags"
        }
      }
    },
    "act_bank_accounts": {
      "tableName": "act_bank_accounts",
      "tableColumns": {
        "account_holder_name": {
          "columnName": "account_holder_name",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "account_number": {
          "columnName": "account_number",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Number"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "account_type": {
          "columnName": "account_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "bank_account_id": {
          "columnName": "bank_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "bank_code": {
          "columnName": "bank_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Bank Code"
            }
          }
        },
        "bank_name": {
          "columnName": "bank_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Bank"
            }
          }
        },
        "branch_code": {
          "columnName": "branch_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Branch Code"
            }
          }
        },
        "branch_name": {
          "columnName": "branch_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Branch"
            }
          }
        },
        "country_code": {
          "columnName": "country_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Country"
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "iban": {
          "columnName": "iban",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "IBAN"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "is_primary": {
          "columnName": "is_primary",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Primary?"
            }
          }
        },
        "swift_bic": {
          "columnName": "swift_bic",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "SWIFT/BIC"
            }
          }
        },
        "bank_label": {
          "columnName": "bank_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Label"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "bank_account"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "bank_accounts"
        }
      }
    },
    "act_chargeable_service_medias": {
      "tableName": "act_chargeable_service_medias",
      "tableColumns": {
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Chargeable Service"
            }
          }
        },
        "chargeable_service_media_id": {
          "columnName": "chargeable_service_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "chargeable_service_media"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "chargeable_service_medias"
        }
      }
    },
    "act_chargeable_service_uoms": {
      "tableName": "act_chargeable_service_uoms",
      "tableColumns": {
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_uom_id": {
          "columnName": "chargeable_service_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "uom_name": {
          "columnName": "uom_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "uom_quantity": {
          "columnName": "uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "chargeable_service_uom"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "chargeable_service_uoms"
        }
      }
    },
    "act_chargeable_services": {
      "tableName": "act_chargeable_services",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_charge": {
          "columnName": "chargeable_service_charge",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Charge"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_code": {
          "columnName": "chargeable_service_code",
          "columnType": "STRING",
          "columnProperties": {
            "AUTO_NUMBER_LENGTH": {
              "propertyName": "AUTO_NUMBER_LENGTH",
              "propertyValue": 4
            },
            "AUTO_NUMBER_PREFIX": {
              "propertyName": "AUTO_NUMBER_PREFIX",
              "propertyValue": "SER_"
            },
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Number"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_full_description": {
          "columnName": "chargeable_service_full_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Full Description"
            }
          }
        },
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_image_media_id": {
          "columnName": "chargeable_service_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        },
        "chargeable_service_name": {
          "columnName": "chargeable_service_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_quick_description": {
          "columnName": "chargeable_service_quick_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quick Description"
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "parent_chargeable_service_id": {
          "columnName": "parent_chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Parent Service"
            }
          }
        },
        "chargeable_service_remarks": {
          "columnName": "chargeable_service_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sac_code": {
          "columnName": "sac_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "SAC Code"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "chargeable_service"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "chargeable_services"
        }
      }
    },
    "act_contact_persons": {
      "tableName": "act_contact_persons",
      "tableColumns": {
        "contact_person_id": {
          "columnName": "contact_person_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "contact_person_image_media_id": {
          "columnName": "contact_person_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        },
        "contact_person_name": {
          "columnName": "contact_person_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "contact_person"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "contact_persons"
        }
      }
    },
    "act_currencies": {
      "tableName": "act_currencies",
      "tableColumns": {
        "country_name": {
          "columnName": "country_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Country"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "currency_name": {
          "columnName": "currency_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_symbol": {
          "columnName": "currency_symbol",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Symbol"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "currency"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "currencies"
        }
      }
    },
    "act_customers": {
      "tableName": "act_customers",
      "tableColumns": {
        "customer_category": {
          "columnName": "customer_category",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Category"
            }
          }
        },
        "customer_id": {
          "columnName": "customer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "customer_remarks": {
          "columnName": "customer_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "customer"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "customers"
        }
      }
    },
    "act_devices": {
      "tableName": "act_devices",
      "tableColumns": {
        "device_details": {
          "columnName": "device_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          }
        },
        "device_id": {
          "columnName": "device_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "device_image_media_id": {
          "columnName": "device_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        },
        "device_name": {
          "columnName": "device_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          }
        },
        "device_uuid": {
          "columnName": "device_uuid",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UUID"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "device_remarks": {
          "columnName": "device_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "is_online": {
          "columnName": "is_online",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Online?"
            }
          }
        },
        "device_type": {
          "columnName": "device_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "devices"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "devices"
        }
      }
    },
    "act_email_addresses": {
      "tableName": "act_email_addresses",
      "tableColumns": {
        "email_address_id": {
          "columnName": "email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "email_address_label": {
          "columnName": "email_address_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Label"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "email_address_value": {
          "columnName": "email_address_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "email_address"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "email_addresses"
        }
      }
    },
    "act_employee_attendances": {
      "tableName": "act_employee_attendances",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "employee_attendance_id": {
          "columnName": "employee_attendance_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "employee_id": {
          "columnName": "employee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Employee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "end_datetime": {
          "columnName": "end_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "End Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "employee_attendance_remarks": {
          "columnName": "employee_attendance_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "start_datetime": {
          "columnName": "start_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Start Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "attendance_status": {
          "columnName": "attendance_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "employee_attendance"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "employee_attendances"
        }
      }
    },
    "act_employee_contracts": {
      "tableName": "act_employee_contracts",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "employee_contract_id": {
          "columnName": "employee_contract_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "employee_contract_number": {
          "columnName": "employee_contract_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Number"
            }
          }
        },
        "employee_contract_type": {
          "columnName": "employee_contract_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "employee_id": {
          "columnName": "employee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Employee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "end_datetime": {
          "columnName": "end_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "End Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "start_datetime": {
          "columnName": "start_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Start Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "employee_contract_status": {
          "columnName": "employee_contract_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "employee_contract"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "employee_contracts"
        }
      }
    },
    "act_employees": {
      "tableName": "act_employees",
      "tableColumns": {
        "date_of_birth": {
          "columnName": "date_of_birth",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Birth Date"
            }
          }
        },
        "date_of_joining": {
          "columnName": "date_of_joining",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Joining Date"
            }
          }
        },
        "salary_duration": {
          "columnName": "salary_duration",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Salary Duration"
            }
          }
        },
        "employee_code": {
          "columnName": "employee_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Code"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "employee_designation": {
          "columnName": "employee_designation",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Designation"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "employee_id": {
          "columnName": "employee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "employee_salary_amount": {
          "columnName": "employee_salary_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Salary Amount"
            }
          }
        },
        "employee_gender": {
          "columnName": "employee_gender",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gender"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "employee_remarks": {
          "columnName": "employee_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "employee_status": {
          "columnName": "employee_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "employee"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "employees"
        }
      }
    },
    "act_fax_numbers": {
      "tableName": "act_fax_numbers",
      "tableColumns": {
        "fax_number_id": {
          "columnName": "fax_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "fax_number_label": {
          "columnName": "fax_number_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Label"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "fax_number_value": {
          "columnName": "fax_number_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "fax_number"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "fax_numbers"
        }
      }
    },
    "act_inventory_tracking_entries": {
      "tableName": "act_inventory_tracking_entries",
      "tableColumns": {
        "in_quantity": {
          "columnName": "in_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "In Quantity"
            }
          }
        },
        "in_uom_quantity": {
          "columnName": "in_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "In Quantity"
            }
          }
        },
        "inventory_tracking_id": {
          "columnName": "inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Inventory Tracking"
            }
          }
        },
        "inventory_tracking_quantity_id": {
          "columnName": "inventory_tracking_quantity_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            }
          }
        },
        "out_quantity": {
          "columnName": "out_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Out Quantity"
            }
          }
        },
        "out_uom_quantity": {
          "columnName": "out_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Out Quantity"
            }
          }
        },
        "product_barcode_id": {
          "columnName": "product_barcode_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Barcode"
            }
          }
        },
        "product_price_id": {
          "columnName": "product_price_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Price"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "storage_location_id": {
          "columnName": "storage_location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Storage Location"
            }
          }
        },
        "in_uom_id": {
          "columnName": "in_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "In UOM"
            }
          }
        },
        "out_uom_id": {
          "columnName": "out_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Out UOM"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "inventory_tracking_quantity"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "inventory_tracking_quantities"
        }
      }
    },
    "act_inventory_trackings": {
      "tableName": "act_inventory_trackings",
      "tableColumns": {
        "inventory_tracking_datetime": {
          "columnName": "inventory_tracking_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "inventory_tracking_id": {
          "columnName": "inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "inventory_tracking"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "inventory_trackings"
        }
      }
    },
    "act_ledger_account_mappings": {
      "tableName": "act_ledger_account_mappings",
      "tableColumns": {
        "ledger_account_mapping_id": {
          "columnName": "ledger_account_mapping_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "mapping_key": {
          "columnName": "mapping_key",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Mapping Key"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": "UPPERCASE"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "mapping_description": {
          "columnName": "mapping_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "CONSTRAINTS": {
          "propertyName": "CONSTRAINTS",
          "propertyValue": [
            {
              "value": "mapping_key,accountee_id",
              "type": "COMPOSITE_UNIQUE_KEY"
            }
          ]
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "ledger_account_mappings"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "ledger_account_mapping"
        }
      }
    },
    "act_ledger_account_types": {
      "tableName": "act_ledger_account_types",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "ledger_account_type_id": {
          "columnName": "ledger_account_type_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "ledger_account_type_index": {
          "columnName": "ledger_account_type_index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "0"
            }
          }
        },
        "ledger_account_type_name": {
          "columnName": "ledger_account_type_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "parent_ledger_account_type_id": {
          "columnName": "parent_ledger_account_type_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Parent Type"
            }
          }
        },
        "ledger_account_type_remarks": {
          "columnName": "ledger_account_type_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "ledger_account_types_description": {
          "columnName": "ledger_account_types_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "CONSTRAINTS": {
          "propertyName": "CONSTRAINTS",
          "propertyValue": [
            {
              "type": "COMPOSITE_UNIQUE_KEY",
              "value": "parent_ledger_account_type_id,ledger_account_type_name,accountee_id"
            }
          ]
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "ledger_account_types"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "ledger_account_type"
        }
      }
    },
    "act_ledger_accounts": {
      "tableName": "act_ledger_accounts",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": ""
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "reflecting_statement": {
          "columnName": "reflecting_statement",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reflecting Statement"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "Adjustment",
                  "value": "ADJUSTMENT"
                },
                {
                  "label": "Trading Account",
                  "value": "TRADING ACCOUNT"
                },
                {
                  "label": "Profit & Loss Account",
                  "value": "PROFIT AND LOSS ACCOUNT"
                },
                {
                  "label": "Balance Sheet",
                  "value": "BALANCE SHEET"
                }
              ]
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "1"
            }
          }
        },
        "ledger_account_balance": {
          "columnName": "ledger_account_balance",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Balance"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "ledger_account_name": {
          "columnName": "ledger_account_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "ledger_account_type_id": {
          "columnName": "ledger_account_type_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "ledger_account_remarks": {
          "columnName": "ledger_account_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "is_expense": {
          "columnName": "is_expense",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Expense?"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "0"
            }
          }
        },
        "is_income": {
          "columnName": "is_income",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Income?"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "0"
            }
          }
        },
        "ledger_account_description": {
          "columnName": "ledger_account_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "CONSTRAINTS": {
          "propertyName": "CONSTRAINTS",
          "propertyValue": [
            {
              "type": "COMPOSITE_UNIQUE_KEY",
              "value": "accountee_id,ledger_account_name"
            }
          ]
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "ledger_accounts"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "ledger_account"
        }
      }
    },
    "act_legal_document_medias": {
      "tableName": "act_legal_document_medias",
      "tableColumns": {
        "legal_document_id": {
          "columnName": "legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Legal Document"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "legal_document_media_id": {
          "columnName": "legal_document_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "legal_document_media"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "legal_document_medias"
        }
      }
    },
    "act_legal_document_types": {
      "tableName": "act_legal_document_types",
      "tableColumns": {
        "entity_id": {
          "columnName": "entity_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Entity"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "legal_document_type_id": {
          "columnName": "legal_document_type_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "legal_document_type_name": {
          "columnName": "legal_document_type_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Document Type Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "legal_document_type"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "legal_document_types"
        }
      }
    },
    "act_legal_documents": {
      "tableName": "act_legal_documents",
      "tableColumns": {
        "expiry_date": {
          "columnName": "expiry_date",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Expiring On"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "is_expired": {
          "columnName": "is_expired",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "is_expired"
            }
          }
        },
        "is_verified": {
          "columnName": "is_verified",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Verified?"
            }
          }
        },
        "legal_document_id": {
          "columnName": "legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "legal_document_type_id": {
          "columnName": "legal_document_type_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "legal_document_value": {
          "columnName": "legal_document_value",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "legal_document"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "legal_documents"
        }
      }
    },
    "act_location_addresses": {
      "tableName": "act_location_addresses",
      "tableColumns": {
        "address_id": {
          "columnName": "address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Address"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "location_address_id": {
          "columnName": "location_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "location_address"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "location_addresses"
        }
      }
    },
    "act_location_email_addresses": {
      "tableName": "act_location_email_addresses",
      "tableColumns": {
        "email_address_id": {
          "columnName": "email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Address"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "location_email_address_id": {
          "columnName": "location_email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "location_email_address"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "location_email_addresses"
        }
      }
    },
    "act_location_fax_numbers": {
      "tableName": "act_location_fax_numbers",
      "tableColumns": {
        "fax_number_id": {
          "columnName": "fax_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Fax Number"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "location_fax_number_id": {
          "columnName": "location_fax_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "location_fax_number"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "location_fax_numbers"
        }
      }
    },
    "act_location_legal_documents": {
      "tableName": "act_location_legal_documents",
      "tableColumns": {
        "legal_document_id": {
          "columnName": "legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Legal Document"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "location_legal_document_id": {
          "columnName": "location_legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "location_legal_document"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "location_legal_documents"
        }
      }
    },
    "act_location_medias": {
      "tableName": "act_location_medias",
      "tableColumns": {
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "location_media_id": {
          "columnName": "location_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "location_media"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "location_medias"
        }
      }
    },
    "act_location_phone_numbers": {
      "tableName": "act_location_phone_numbers",
      "tableColumns": {
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "location_phone_number_id": {
          "columnName": "location_phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "phone_number_id": {
          "columnName": "phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Number"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "location_phone_number"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "location_phone_numbers"
        }
      }
    },
    "act_location_websites": {
      "tableName": "act_location_websites",
      "tableColumns": {
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "location_website_id": {
          "columnName": "location_website_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "website_id": {
          "columnName": "website_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Webiste"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "location_website"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "location_websites"
        }
      }
    },
    "act_locations": {
      "tableName": "act_locations",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "location_image_media_id": {
          "columnName": "location_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        },
        "location_name": {
          "columnName": "location_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "location_type": {
          "columnName": "location_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "location"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "locations"
        }
      }
    },
    "act_medias": {
      "tableName": "act_medias",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "media_details": {
          "columnName": "media_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          }
        },
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "media_name": {
          "columnName": "media_name",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          }
        },
        "media_path": {
          "columnName": "media_path",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Path"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "media_size": {
          "columnName": "media_size",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Size"
            }
          }
        },
        "media_type": {
          "columnName": "media_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "media"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "medias"
        }
      }
    },
    "act_menu_items": {
      "tableName": "act_menu_items",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "menu_icon_media_id": {
          "columnName": "menu_icon_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Icon"
            }
          }
        },
        "menu_id": {
          "columnName": "menu_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Menu"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "menu_item_id": {
          "columnName": "menu_item_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "menu_label": {
          "columnName": "menu_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Label"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "menu_link": {
          "columnName": "menu_link",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Link"
            }
          }
        },
        "menu_parameters": {
          "columnName": "menu_parameters",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Parameters"
            }
          }
        },
        "parent_menu_item_id": {
          "columnName": "parent_menu_item_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Parent Menu"
            }
          }
        },
        "menu_icon_svg_code": {
          "columnName": "menu_icon_svg_code",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "SVG Code"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "menu_item"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "menu_items"
        }
      }
    },
    "act_menus": {
      "tableName": "act_menus",
      "tableColumns": {
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "menu_id": {
          "columnName": "menu_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "menu_name": {
          "columnName": "menu_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "menu_remarks": {
          "columnName": "menu_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "menu_description": {
          "columnName": "menu_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "menu"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "menus"
        }
      }
    },
    "act_notifications": {
      "tableName": "act_notifications",
      "tableColumns": {
        "notification_details": {
          "columnName": "notification_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          }
        },
        "notification_for": {
          "columnName": "notification_for",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "For"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "notification_icon_media_id": {
          "columnName": "notification_icon_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Icon"
            }
          }
        },
        "notification_id": {
          "columnName": "notification_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "notification_message": {
          "columnName": "notification_message",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Message"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "notification_title": {
          "columnName": "notification_title",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Title"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "notification_type": {
          "columnName": "notification_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "notification_status": {
          "columnName": "notification_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "notification"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "notifications"
        }
      }
    },
    "act_parties": {
      "tableName": "act_parties",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          }
        },
        "party_details": {
          "columnName": "party_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          }
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "party_name": {
          "columnName": "party_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "addresses": {
          "columnName": "addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Addresses"
            }
          }
        },
        "email_addresses": {
          "columnName": "email_addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Addresses"
            }
          }
        },
        "fax_numbers": {
          "columnName": "fax_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Fax Numbers"
            }
          }
        },
        "phone_numbers": {
          "columnName": "phone_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Numbers"
            }
          }
        },
        "websites": {
          "columnName": "websites",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Websites"
            }
          }
        },
        "bank_accounts": {
          "columnName": "bank_accounts",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Bank Accounts"
            }
          }
        },
        "customer_id": {
          "columnName": "customer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Customer"
            }
          }
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Supplier"
            }
          }
        },
        "employee_id": {
          "columnName": "employee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Employee"
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "party_image_media_id": {
          "columnName": "party_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party Image"
            }
          }
        },
        "is_customer": {
          "columnName": "is_customer",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Customer?"
            }
          }
        },
        "is_supplier": {
          "columnName": "is_supplier",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Supplier?"
            }
          }
        },
        "is_employee": {
          "columnName": "is_employee",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Employee?"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "parties"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party"
        }
      }
    },
    "act_party_addresses": {
      "tableName": "act_party_addresses",
      "tableColumns": {
        "address_id": {
          "columnName": "address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Address"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_address_id": {
          "columnName": "party_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "party_addresses"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party_address"
        }
      }
    },
    "act_party_bank_accounts": {
      "tableName": "act_party_bank_accounts",
      "tableColumns": {
        "bank_account_id": {
          "columnName": "bank_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Bank Account"
            }
          }
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party"
            }
          }
        },
        "party_bank_account_id": {
          "columnName": "party_bank_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "party_bank_accounts"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party_bank_account"
        }
      }
    },
    "act_party_contact_persons": {
      "tableName": "act_party_contact_persons",
      "tableColumns": {
        "contact_person_id": {
          "columnName": "contact_person_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Contact Person"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_contact_person_id": {
          "columnName": "party_contact_person_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "party_contact_persons"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party_contact_person"
        }
      }
    },
    "act_party_email_addresses": {
      "tableName": "act_party_email_addresses",
      "tableColumns": {
        "email_address_id": {
          "columnName": "email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Address"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_email_address_id": {
          "columnName": "party_email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "party_email_addresses"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party_email_address"
        }
      }
    },
    "act_party_fax_numbers": {
      "tableName": "act_party_fax_numbers",
      "tableColumns": {
        "fax_number_id": {
          "columnName": "fax_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Fax Number"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_fax_number_id": {
          "columnName": "party_fax_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "party_fax_numbers"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party_fax_number"
        }
      }
    },
    "act_party_legal_documents": {
      "tableName": "act_party_legal_documents",
      "tableColumns": {
        "legal_document_id": {
          "columnName": "legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Legal Document"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_legal_document_id": {
          "columnName": "party_legal_document_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "party_legal_documents"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party_legal_document"
        }
      }
    },
    "act_party_medias": {
      "tableName": "act_party_medias",
      "tableColumns": {
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_media_id": {
          "columnName": "party_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "party_medias"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party_media"
        }
      }
    },
    "act_party_phone_numbers": {
      "tableName": "act_party_phone_numbers",
      "tableColumns": {
        "phone_number_id": {
          "columnName": "phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Number"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_phone_number_id": {
          "columnName": "party_phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "party_phone_numbers"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party_phone_number"
        }
      }
    },
    "act_party_websites": {
      "tableName": "act_party_websites",
      "tableColumns": {
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "party_website_id": {
          "columnName": "party_website_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "website_id": {
          "columnName": "website_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Website"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "party_websites"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "party_website"
        }
      }
    },
    "act_payment_methods": {
      "tableName": "act_payment_methods",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "payment_method_id": {
          "columnName": "payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "payment_method_image_media_id": {
          "columnName": "payment_method_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        },
        "payment_method_name": {
          "columnName": "payment_method_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "use_for_expenses": {
          "columnName": "use_for_expenses",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Use For Expenses"
            }
          }
        },
        "use_for_incomes": {
          "columnName": "use_for_incomes",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Use For Incomes"
            }
          }
        },
        "use_for_purchase": {
          "columnName": "use_for_purchase",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Use For Purchase"
            }
          }
        },
        "use_for_sales": {
          "columnName": "use_for_sales",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Use For Sales"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "payment_method"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "payment_methods"
        }
      }
    },
    "act_phone_numbers": {
      "tableName": "act_phone_numbers",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "phone_number_id": {
          "columnName": "phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "phone_number_label": {
          "columnName": "phone_number_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Label"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "phone_number_value": {
          "columnName": "phone_number_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "phone_number"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "phone_numbers"
        }
      }
    },
    "act_price_change_products": {
      "tableName": "act_price_change_products",
      "tableColumns": {
        "new_product_price_id": {
          "columnName": "new_product_price_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "New Price"
            }
          }
        },
        "old_product_price_id": {
          "columnName": "old_product_price_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Old Price"
            }
          }
        },
        "price_change_id": {
          "columnName": "price_change_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Price Change"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "price_change_product_id": {
          "columnName": "price_change_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "price_change_product_remarks": {
          "columnName": "price_change_product_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "price_change_product_status": {
          "columnName": "price_change_product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_price_change_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_price_change_products"
        }
      }
    },
    "act_price_changes": {
      "tableName": "act_price_changes",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "price_change_datetime": {
          "columnName": "price_change_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "price_change_id": {
          "columnName": "price_change_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "price_change_name": {
          "columnName": "price_change_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "price_change_number": {
          "columnName": "price_change_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "AUTO_NUMBER_LENGTH": {
              "propertyName": "AUTO_NUMBER_LENGTH",
              "propertyValue": 10
            },
            "AUTO_NUMBER_PREFIX": {
              "propertyName": "AUTO_NUMBER_PREFIX",
              "propertyValue": "IPU-"
            },
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Number"
            }
          }
        },
        "price_change_reason": {
          "columnName": "price_change_reason",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reason"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "price_change_remarks": {
          "columnName": "price_change_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "price_change_status": {
          "columnName": "price_change_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                }
              ]
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Updated By"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_price_change"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_price_changes"
        }
      }
    },
    "act_product_attributes": {
      "tableName": "act_product_attributes",
      "tableColumns": {
        "product_attibute_numeric_value": {
          "columnName": "product_attibute_numeric_value",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        },
        "product_attribute_id": {
          "columnName": "product_attribute_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_attribute_name": {
          "columnName": "product_attribute_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_attribute_string_value": {
          "columnName": "product_attribute_string_value",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_attribute_media_id": {
          "columnName": "product_attribute_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            }
          }
        },
        "value_type": {
          "columnName": "value_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value Type"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_attribute"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_attributes"
        }
      }
    },
    "act_product_barcodes": {
      "tableName": "act_product_barcodes",
      "tableColumns": {
        "barcode_value": {
          "columnName": "barcode_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Barcode"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "product_barcode_id": {
          "columnName": "product_barcode_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_barcode"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_barcodes"
        }
      }
    },
    "act_product_categories": {
      "tableName": "act_product_categories",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "parent_product_categroy_id": {
          "columnName": "parent_product_categroy_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Parent Category"
            }
          }
        },
        "product_category_full_description": {
          "columnName": "product_category_full_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Full Description"
            }
          }
        },
        "product_category_id": {
          "columnName": "product_category_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_category_image_media_id": {
          "columnName": "product_category_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        },
        "product_category_index": {
          "columnName": "product_category_index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "product_category_name": {
          "columnName": "product_category_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_category_quick_description": {
          "columnName": "product_category_quick_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quick Description"
            }
          }
        },
        "product_category_tree": {
          "columnName": "product_category_tree",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Category Tree"
            }
          }
        },
        "purchase_tax_rate_id": {
          "columnName": "purchase_tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Tax Rate"
            }
          }
        },
        "purchase_taxing_scheme_id": {
          "columnName": "purchase_taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Taxing Scheme"
            }
          }
        },
        "sale_tax_rate_id": {
          "columnName": "sale_tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Tax Rate"
            }
          }
        },
        "sale_taxing_scheme_id": {
          "columnName": "sale_taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_category"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_categories"
        }
      }
    },
    "act_product_location_data": {
      "tableName": "act_product_location_data",
      "tableColumns": {
        "customer_waitlist_quantity": {
          "columnName": "customer_waitlist_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Waitlist Quantity"
            }
          }
        },
        "in_order_quantity": {
          "columnName": "in_order_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "In Order Quantity"
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_location_data_id": {
          "columnName": "product_location_data_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_location_data_remarks": {
          "columnName": "product_location_data_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "stock_quantity": {
          "columnName": "stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Stock Quantity"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_tracking_accountee_location"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_tracking_accountee_locations"
        }
      }
    },
    "act_product_medias": {
      "tableName": "act_product_medias",
      "tableColumns": {
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_media_id": {
          "columnName": "product_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_media"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_medias"
        }
      }
    },
    "act_product_prices": {
      "tableName": "act_product_prices",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            }
          }
        },
        "price_mrp": {
          "columnName": "price_mrp",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "MRP"
            }
          }
        },
        "price_purchase": {
          "columnName": "price_purchase",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Price"
            }
          }
        },
        "price_sale": {
          "columnName": "price_sale",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Price"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_price_id": {
          "columnName": "product_price_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "progit_margin": {
          "columnName": "progit_margin",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "profit_margin"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_price"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_prices"
        }
      }
    },
    "act_product_purchase_details": {
      "tableName": "act_product_purchase_details",
      "tableColumns": {
        "product_purchase_detail_id": {
          "columnName": "product_purchase_detail_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "minimum_order_quantity": {
          "columnName": "minimum_order_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Min Order Qunatity"
            }
          }
        },
        "minimum_order_quantity_uom_id": {
          "columnName": "minimum_order_quantity_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Min Order UOM"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "purchase_uom_id": {
          "columnName": "purchase_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase UOM"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        },
        "is_current": {
          "columnName": "is_current",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Current"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_purchase_details"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_purchase_detail"
        }
      }
    },
    "act_product_reference_urls": {
      "tableName": "act_product_reference_urls",
      "tableColumns": {
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_reference_url": {
          "columnName": "product_reference_url",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference URL"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_reference_url_id": {
          "columnName": "product_reference_url_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_reference_url_name": {
          "columnName": "product_reference_url_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_reference_url"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_reference_urls"
        }
      }
    },
    "act_product_sale_details": {
      "tableName": "act_product_sale_details",
      "tableColumns": {
        "product_sale_detail_id": {
          "columnName": "product_sale_detail_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "sale_uom_id": {
          "columnName": "sale_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale UOM"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        },
        "is_current": {
          "columnName": "is_current",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Current"
            }
          }
        },
        "product_barcode_id": {
          "columnName": "product_barcode_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Barcode Id"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_sale_details"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_sale_detail"
        }
      }
    },
    "act_product_stock_details": {
      "tableName": "act_product_stock_details",
      "tableColumns": {
        "product_stock_detail_id": {
          "columnName": "product_stock_detail_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "maximum_stock_quantity": {
          "columnName": "maximum_stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Max Stock Quantity"
            }
          }
        },
        "maximum_stock_uom_id": {
          "columnName": "maximum_stock_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Max Stock UOM"
            }
          }
        },
        "minimum_stock_quantity": {
          "columnName": "minimum_stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Min Stock Quantity"
            }
          }
        },
        "minimum_stock_uom_id": {
          "columnName": "minimum_stock_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Min Stock UOM"
            }
          }
        },
        "reorder_level_quantity": {
          "columnName": "reorder_level_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reorder Level Quantity"
            }
          }
        },
        "reorder_level_uom_id": {
          "columnName": "reorder_level_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reorder Level UOM"
            }
          }
        },
        "stock_uom_id": {
          "columnName": "stock_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Stock UOM"
            }
          }
        },
        "is_current": {
          "columnName": "is_current",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Current?"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_stock_details"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_stock_detail"
        }
      }
    },
    "act_product_storage_location_data": {
      "tableName": "act_product_storage_location_data",
      "tableColumns": {
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_storage_location_data_id": {
          "columnName": "product_storage_location_data_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_storage_location_data_remarks": {
          "columnName": "product_storage_location_data_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "stock_quantity": {
          "columnName": "stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Stock Quantity"
            }
          }
        },
        "storage_location_id": {
          "columnName": "storage_location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Storage Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_tracking_storage_location"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_tracking_storage_locations"
        }
      }
    },
    "act_product_uoms": {
      "tableName": "act_product_uoms",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "uom_name": {
          "columnName": "uom_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "uom_quantity": {
          "columnName": "uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_uom"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_uoms"
        }
      }
    },
    "act_product_variant_groups": {
      "tableName": "act_product_variant_groups",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "product_variant_group_id": {
          "columnName": "product_variant_group_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_variant_group_name": {
          "columnName": "product_variant_group_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Group Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_variant_group"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_variant_groups"
        }
      }
    },
    "act_product_variants": {
      "tableName": "act_product_variants",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_variant_group_id": {
          "columnName": "product_variant_group_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Variant Group"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_variant_id": {
          "columnName": "product_variant_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product_variant"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "product_variants"
        }
      }
    },
    "act_products": {
      "tableName": "act_products",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "home_delivery_available": {
          "columnName": "home_delivery_available",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Home Delivery Available"
            }
          }
        },
        "pickup_delivery_available": {
          "columnName": "pickup_delivery_available",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Pickup Available"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "product_category_id": {
          "columnName": "product_category_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Category"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_details": {
          "columnName": "product_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Details"
            }
          }
        },
        "product_full_description": {
          "columnName": "product_full_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Full Description"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_image_media_id": {
          "columnName": "product_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Image"
            }
          }
        },
        "product_name": {
          "columnName": "product_name",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_quick_description": {
          "columnName": "product_quick_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quick Description"
            }
          }
        },
        "product_sku": {
          "columnName": "product_sku",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "SKU"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_tags": {
          "columnName": "product_tags",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tags"
            }
          }
        },
        "stock_quantity": {
          "columnName": "stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Stock"
            }
          }
        },
        "waitlist_quantity": {
          "columnName": "waitlist_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Waitlist Quantity"
            }
          }
        },
        "hsn_code": {
          "columnName": "hsn_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "HSN Code"
            }
          }
        },
        "brand_name": {
          "columnName": "brand_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Brand"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "products"
        }
      }
    },
    "act_purchase_invoice_chargeable_services": {
      "tableName": "act_purchase_invoice_chargeable_services",
      "tableColumns": {
        "chargeable_service_charge_actual": {
          "columnName": "chargeable_service_charge_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Charge"
            }
          }
        },
        "chargeable_service_charge_gross": {
          "columnName": "chargeable_service_charge_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Charge"
            }
          }
        },
        "chargeable_service_charge_net": {
          "columnName": "chargeable_service_charge_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Charge"
            }
          }
        },
        "chargeable_service_description": {
          "columnName": "chargeable_service_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service"
            }
          }
        },
        "chargeable_service_quantity": {
          "columnName": "chargeable_service_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_uom_id": {
          "columnName": "chargeable_service_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_uom_quantity": {
          "columnName": "chargeable_service_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "purchase_invoice_chargeable_service_id": {
          "columnName": "purchase_invoice_chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_id": {
          "columnName": "purchase_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Invoice"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_status": {
          "columnName": "chargeable_service_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_invoice_chargeable_service"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_invoice_chargeable_services"
        }
      }
    },
    "act_purchase_invoice_expenses": {
      "tableName": "act_purchase_invoice_expenses",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "payment_method_id": {
          "columnName": "payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Payment Method"
            }
          }
        },
        "purchase_invoice_expense_amount": {
          "columnName": "purchase_invoice_expense_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_expense_datetime": {
          "columnName": "purchase_invoice_expense_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_expense_id": {
          "columnName": "purchase_invoice_expense_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_id": {
          "columnName": "purchase_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Invoice"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "purchase_invoice_expense_remarks": {
          "columnName": "purchase_invoice_expense_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "purchase_invoice_expense_status": {
          "columnName": "purchase_invoice_expense_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_invoice_expense"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_invoice_expenses"
        }
      }
    },
    "act_purchase_invoice_payments": {
      "tableName": "act_purchase_invoice_payments",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "payment_method_id": {
          "columnName": "payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Payment Method"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_id": {
          "columnName": "purchase_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Invoice"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_payment_amount": {
          "columnName": "purchase_invoice_payment_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_payment_datetime": {
          "columnName": "purchase_invoice_payment_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_payment_id": {
          "columnName": "purchase_invoice_payment_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "purchase_invoice_payment_remarks": {
          "columnName": "purchase_invoice_payment_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "payment_status": {
          "columnName": "payment_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_invoice_payment"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_invoice_payments"
        }
      }
    },
    "act_purchase_invoice_products": {
      "tableName": "act_purchase_invoice_products",
      "tableColumns": {
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "inventory_tracking_id": {
          "columnName": "inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Inventory Tracking"
            }
          }
        },
        "product_description": {
          "columnName": "product_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_price_actual": {
          "columnName": "product_price_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Price"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_price_gross": {
          "columnName": "product_price_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Price"
            }
          }
        },
        "product_price_net": {
          "columnName": "product_price_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Price"
            }
          }
        },
        "product_quantity": {
          "columnName": "product_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "product_uom_quantity": {
          "columnName": "product_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "purchase_invoice_id": {
          "columnName": "purchase_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Invoice"
            }
          }
        },
        "purchase_invoice_product_id": {
          "columnName": "purchase_invoice_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_status": {
          "columnName": "product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_invoice_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_invoice_products"
        }
      }
    },
    "act_purchase_invoices": {
      "tableName": "act_purchase_invoices",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "device_id": {
          "columnName": "device_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Device"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange  Rate"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "profit_margin_percentage": {
          "columnName": "profit_margin_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profit Margin%"
            }
          }
        },
        "purchase_invoice_amount": {
          "columnName": "purchase_invoice_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_datetime": {
          "columnName": "purchase_invoice_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_id": {
          "columnName": "purchase_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_invoice_number": {
          "columnName": "purchase_invoice_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Invoice#"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_term_id": {
          "columnName": "purchase_term_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Terms"
            }
          }
        },
        "purchase_invoice_remarks": {
          "columnName": "purchase_invoice_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "purchase_invoice_status": {
          "columnName": "purchase_invoice_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Supplier"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        },
        "purchase_invoice_type": {
          "columnName": "purchase_invoice_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_invoice"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_invoices"
        }
      }
    },
    "act_purchase_order_chargeable_services": {
      "tableName": "act_purchase_order_chargeable_services",
      "tableColumns": {
        "chargeable_service_charge_actual": {
          "columnName": "chargeable_service_charge_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Charge"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_charge_gross": {
          "columnName": "chargeable_service_charge_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Charge"
            }
          }
        },
        "chargeable_service_charge_net": {
          "columnName": "chargeable_service_charge_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Charge"
            }
          }
        },
        "chargeable_service_description": {
          "columnName": "chargeable_service_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_quantity": {
          "columnName": "chargeable_service_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_uom_id": {
          "columnName": "chargeable_service_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_uom_quantity": {
          "columnName": "chargeable_service_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "purchase_order_chargeable_service_id": {
          "columnName": "purchase_order_chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_order_id": {
          "columnName": "purchase_order_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Order"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "chargeable_service_status": {
          "columnName": "chargeable_service_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_order_chargeable_service"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_order_chargeable_services"
        }
      }
    },
    "act_purchase_order_expenses": {
      "tableName": "act_purchase_order_expenses",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "payment_method_id": {
          "columnName": "payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Payment Method"
            }
          }
        },
        "purchase_invoice_id": {
          "columnName": "purchase_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Invoice"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_order_expense_amount": {
          "columnName": "purchase_order_expense_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_order_expense_datetime": {
          "columnName": "purchase_order_expense_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_order_expense_id": {
          "columnName": "purchase_order_expense_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "purchase_order_expense_remarks": {
          "columnName": "purchase_order_expense_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "purchase_order_expense_status": {
          "columnName": "purchase_order_expense_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_order_expense"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_order_expenses"
        }
      }
    },
    "act_purchase_order_payments": {
      "tableName": "act_purchase_order_payments",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "payment_method_id": {
          "columnName": "payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Payment Method"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_order_id": {
          "columnName": "purchase_order_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Order"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_order_payment_amount": {
          "columnName": "purchase_order_payment_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_order_payment_datetime": {
          "columnName": "purchase_order_payment_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "purchase_order_payment_id": {
          "columnName": "purchase_order_payment_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "purchase_order_payment_remarks": {
          "columnName": "purchase_order_payment_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "purchase_order_payment_status": {
          "columnName": "purchase_order_payment_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_order_payment"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_order_payments"
        }
      }
    },
    "act_purchase_order_products": {
      "tableName": "act_purchase_order_products",
      "tableColumns": {
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "inventory_tracking_id": {
          "columnName": "inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Inventory Tracking"
            }
          }
        },
        "product_description": {
          "columnName": "product_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "product_price_actual": {
          "columnName": "product_price_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Price"
            }
          }
        },
        "product_price_gross": {
          "columnName": "product_price_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Price"
            }
          }
        },
        "product_price_net": {
          "columnName": "product_price_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Price"
            }
          }
        },
        "product_quantity": {
          "columnName": "product_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "product_uom_quantity": {
          "columnName": "product_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "purchase_order_id": {
          "columnName": "purchase_order_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Order"
            }
          }
        },
        "purchase_order_product_id": {
          "columnName": "purchase_order_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_status": {
          "columnName": "product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_order_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_order_products"
        }
      }
    },
    "act_purchase_orders": {
      "tableName": "act_purchase_orders",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "purchase_order_amount": {
          "columnName": "purchase_order_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "purchase_order_datetime": {
          "columnName": "purchase_order_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "purchase_order_id": {
          "columnName": "purchase_order_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_order_number": {
          "columnName": "purchase_order_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Order#"
            }
          }
        },
        "purchase_term_id": {
          "columnName": "purchase_term_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Terms"
            }
          }
        },
        "purchase_order_remarks": {
          "columnName": "purchase_order_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Supplier"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        },
        "purchase_order_status": {
          "columnName": "purchase_order_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_order"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_orders"
        }
      }
    },
    "act_purchase_return_chargeable_services": {
      "tableName": "act_purchase_return_chargeable_services",
      "tableColumns": {
        "chargeable_service_charge_actual": {
          "columnName": "chargeable_service_charge_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Charge"
            }
          }
        },
        "chargeable_service_charge_gross": {
          "columnName": "chargeable_service_charge_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Charge"
            }
          }
        },
        "chargeable_service_charge_net": {
          "columnName": "chargeable_service_charge_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Charge"
            }
          }
        },
        "chargeable_service_description": {
          "columnName": "chargeable_service_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service Description"
            }
          }
        },
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service"
            }
          }
        },
        "chargeable_service_quantity": {
          "columnName": "chargeable_service_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "chargeable_service_uom_id": {
          "columnName": "chargeable_service_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "chargeable_service_uom_quantity": {
          "columnName": "chargeable_service_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "purchase_return_chargeable_service_id": {
          "columnName": "purchase_return_chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_return_id": {
          "columnName": "purchase_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Note"
            }
          }
        },
        "chargeable_service_status": {
          "columnName": "chargeable_service_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_debit_note_chargeable_service"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_debit_note_chargeable_services"
        }
      }
    },
    "act_purchase_return_expenses": {
      "tableName": "act_purchase_return_expenses",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          }
        },
        "purchase_return_expense_amount": {
          "columnName": "purchase_return_expense_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "purchase_return_expense_datetime": {
          "columnName": "purchase_return_expense_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "purchase_return_expense_id": {
          "columnName": "purchase_return_expense_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_return_id": {
          "columnName": "purchase_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Note"
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "purchase_return_expense_remarks": {
          "columnName": "purchase_return_expense_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "purchase_return_expense_status": {
          "columnName": "purchase_return_expense_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_debit_note_expense"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_debit_note_expenses"
        }
      }
    },
    "act_purchase_return_payments": {
      "tableName": "act_purchase_return_payments",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "payment_method_id": {
          "columnName": "payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Payment Method"
            }
          }
        },
        "purchase_return_id": {
          "columnName": "purchase_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Note"
            }
          }
        },
        "purchase_return_payment_amount": {
          "columnName": "purchase_return_payment_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "purchase_return_payment_datetime": {
          "columnName": "purchase_return_payment_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "purchase_return_payment_id": {
          "columnName": "purchase_return_payment_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "purchase_return_payment_remarks": {
          "columnName": "purchase_return_payment_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "purchase_return_payment_status": {
          "columnName": "purchase_return_payment_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_debit_note_payment"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_debit_note_payments"
        }
      }
    },
    "act_purchase_return_products": {
      "tableName": "act_purchase_return_products",
      "tableColumns": {
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "inventory_tracking_id": {
          "columnName": "inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Inventory Tracking"
            }
          }
        },
        "product_description": {
          "columnName": "product_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Description"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "product_price_actual": {
          "columnName": "product_price_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Price"
            }
          }
        },
        "product_price_gross": {
          "columnName": "product_price_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Price"
            }
          }
        },
        "product_price_net": {
          "columnName": "product_price_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Price"
            }
          }
        },
        "product_quantity": {
          "columnName": "product_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "product_uom_quantity": {
          "columnName": "product_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "purchase_return_product_id": {
          "columnName": "purchase_return_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_return_id": {
          "columnName": "purchase_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Note"
            }
          }
        },
        "product_status": {
          "columnName": "product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_debit_note_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_debit_note_products"
        }
      }
    },
    "act_purchase_returns": {
      "tableName": "act_purchase_returns",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "audio_attachments": {
          "columnName": "audio_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Audio Recordings"
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "device_id": {
          "columnName": "device_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Device"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "purchase_invoice_id": {
          "columnName": "purchase_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Invoice"
            }
          }
        },
        "purchase_return_amount": {
          "columnName": "purchase_return_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "purchase_return_datetime": {
          "columnName": "purchase_return_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "purchase_return_id": {
          "columnName": "purchase_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_return_number": {
          "columnName": "purchase_return_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Note#"
            }
          }
        },
        "purchase_terms_id": {
          "columnName": "purchase_terms_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Terms"
            }
          }
        },
        "purchase_return_remarks": {
          "columnName": "purchase_return_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "purchase_return_status": {
          "columnName": "purchase_return_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                },
                {
                  "label": "CANCELLED",
                  "value": "CANCELLED"
                }
              ]
            }
          }
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Supplier"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        },
        "purchase_rerurn_type": {
          "columnName": "purchase_rerurn_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_debit_note"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_debit_notes"
        }
      }
    },
    "act_purchase_terms": {
      "tableName": "act_purchase_terms",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "purchase_term_id": {
          "columnName": "purchase_term_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "purchase_term_name": {
          "columnName": "purchase_term_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          }
        },
        "purchase_term_remarks": {
          "columnName": "purchase_term_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "purchase_term_description": {
          "columnName": "purchase_term_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "purchase_term"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "purchase_terms"
        }
      }
    },
    "act_sale_coupon_issues": {
      "tableName": "act_sale_coupon_issues",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "sale_coupon_issue_remarks": {
          "columnName": "sale_coupon_issue_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_coupon_id": {
          "columnName": "sale_coupon_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Coupon"
            }
          }
        },
        "sale_coupon_issue_id": {
          "columnName": "sale_coupon_issue_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_coupon_issue_identifier": {
          "columnName": "sale_coupon_issue_identifier",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Coupon Identifier"
            }
          }
        },
        "sale_coupon_issue_status": {
          "columnName": "sale_coupon_issue_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_coupon_issue"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_coupon_issues"
        }
      }
    },
    "act_sale_coupon_uses": {
      "tableName": "act_sale_coupon_uses",
      "tableColumns": {
        "sale_coupon_use_remarks": {
          "columnName": "sale_coupon_use_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_coupon_id": {
          "columnName": "sale_coupon_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Coupon"
            }
          }
        },
        "sale_coupon_issue_id": {
          "columnName": "sale_coupon_issue_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Coupon Issue"
            }
          }
        },
        "sale_coupon_use_id": {
          "columnName": "sale_coupon_use_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_coupon_use"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_coupon_uses"
        }
      }
    },
    "act_sale_coupons": {
      "tableName": "act_sale_coupons",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "calculation_method": {
          "columnName": "calculation_method",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Calculation"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "sale_coupon_remarks": {
          "columnName": "sale_coupon_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_coupon_amount": {
          "columnName": "sale_coupon_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_coupon_code": {
          "columnName": "sale_coupon_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Code"
            }
          }
        },
        "sale_coupon_id": {
          "columnName": "sale_coupon_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_coupon_name": {
          "columnName": "sale_coupon_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          }
        },
        "sale_coupon_percentage": {
          "columnName": "sale_coupon_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Coupon%"
            }
          }
        },
        "sale_coupon_validity_end_datetime": {
          "columnName": "sale_coupon_validity_end_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_coupon_validity_start_datetime": {
          "columnName": "sale_coupon_validity_start_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_coupon_status": {
          "columnName": "sale_coupon_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "sale_coupon_type": {
          "columnName": "sale_coupon_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "sale_coupon_description": {
          "columnName": "sale_coupon_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_coupon"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_coupons"
        }
      }
    },
    "act_sale_invoice_chargable_services": {
      "tableName": "act_sale_invoice_chargable_services",
      "tableColumns": {
        "chargeable_service_charge_actual": {
          "columnName": "chargeable_service_charge_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Charge"
            }
          }
        },
        "chargeable_service_charge_gross": {
          "columnName": "chargeable_service_charge_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Charge"
            }
          }
        },
        "chargeable_service_charge_net": {
          "columnName": "chargeable_service_charge_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Charge"
            }
          }
        },
        "chargeable_service_description": {
          "columnName": "chargeable_service_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service Description"
            }
          }
        },
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service"
            }
          }
        },
        "chargeable_service_quantity": {
          "columnName": "chargeable_service_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "chargeable_service_uom_id": {
          "columnName": "chargeable_service_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "chargeable_service_uom_quantity": {
          "columnName": "chargeable_service_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "sale_invoice_chargeable_service_id": {
          "columnName": "sale_invoice_chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_invoice_id": {
          "columnName": "sale_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Invoice"
            }
          }
        },
        "chargeable_service_status": {
          "columnName": "chargeable_service_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_invoice_chargeable_service"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_invoice_chargeable_services"
        }
      }
    },
    "act_sale_invoice_expenses": {
      "tableName": "act_sale_invoice_expenses",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "sale_invoice_expense_remarks": {
          "columnName": "sale_invoice_expense_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_invoice_expense_amount": {
          "columnName": "sale_invoice_expense_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_invoice_expense_datetime": {
          "columnName": "sale_invoice_expense_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_invoice_expense_id": {
          "columnName": "sale_invoice_expense_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_invoice_id": {
          "columnName": "sale_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Invoice"
            }
          }
        },
        "sale_invoice_expense_status": {
          "columnName": "sale_invoice_expense_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_invoice_expense"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_invoice_expenses"
        }
      }
    },
    "act_sale_invoice_payments": {
      "tableName": "act_sale_invoice_payments",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "payment_method_id": {
          "columnName": "payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Payment Method"
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "sale_invoice_payment_remarks": {
          "columnName": "sale_invoice_payment_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_invoice_id": {
          "columnName": "sale_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Invoice"
            }
          }
        },
        "sale_invoice_payment_amount": {
          "columnName": "sale_invoice_payment_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_invoice_payment_datetime": {
          "columnName": "sale_invoice_payment_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_invoice_payment_id": {
          "columnName": "sale_invoice_payment_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_invoice_payment_status": {
          "columnName": "sale_invoice_payment_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_invoice_payment"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_invoice_payments"
        }
      }
    },
    "act_sale_invoice_products": {
      "tableName": "act_sale_invoice_products",
      "tableColumns": {
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "inventory_tracking_id": {
          "columnName": "inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Inventory Tracking"
            }
          }
        },
        "product_description": {
          "columnName": "product_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Description"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "product_price_actual": {
          "columnName": "product_price_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Price"
            }
          }
        },
        "product_price_gross": {
          "columnName": "product_price_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Price"
            }
          }
        },
        "product_price_net": {
          "columnName": "product_price_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Price"
            }
          }
        },
        "product_quantity": {
          "columnName": "product_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "product_uom_quantity": {
          "columnName": "product_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "sale_invoice_id": {
          "columnName": "sale_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Invoice"
            }
          }
        },
        "sale_invoice_product_id": {
          "columnName": "sale_invoice_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_status": {
          "columnName": "product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_invoice_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_invoice_products"
        }
      }
    },
    "act_sale_invoices": {
      "tableName": "act_sale_invoices",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "customer_id": {
          "columnName": "customer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Customer"
            }
          }
        },
        "device_id": {
          "columnName": "device_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Device"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "sale_invoice_remarks": {
          "columnName": "sale_invoice_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_invoice_amount": {
          "columnName": "sale_invoice_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_invoice_datetime": {
          "columnName": "sale_invoice_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_invoice_id": {
          "columnName": "sale_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_invoice_number": {
          "columnName": "sale_invoice_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Invoice#"
            }
          }
        },
        "sale_term_id": {
          "columnName": "sale_term_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Terms"
            }
          }
        },
        "sale_invoice_status": {
          "columnName": "sale_invoice_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        },
        "sale_invoice_type": {
          "columnName": "sale_invoice_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_invoice"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_invoices"
        }
      }
    },
    "act_sale_maintenance_chargeable_services": {
      "tableName": "act_sale_maintenance_chargeable_services",
      "tableColumns": {
        "chargeable_service_charge_actual": {
          "columnName": "chargeable_service_charge_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Charge"
            }
          }
        },
        "chargeable_service_charge_gross": {
          "columnName": "chargeable_service_charge_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Charge"
            }
          }
        },
        "chargeable_service_charge_net": {
          "columnName": "chargeable_service_charge_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Charge"
            }
          }
        },
        "chargeable_service_description": {
          "columnName": "chargeable_service_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service Description"
            }
          }
        },
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service"
            }
          }
        },
        "chargeable_service_quantity": {
          "columnName": "chargeable_service_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "chargeable_service_uom_id": {
          "columnName": "chargeable_service_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "chargeable_service_uom_quantity": {
          "columnName": "chargeable_service_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "sale_maintenance_chargeable_service_id": {
          "columnName": "sale_maintenance_chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_maintenance_id": {
          "columnName": "sale_maintenance_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Maintenance"
            }
          }
        },
        "sale_maintenance_status": {
          "columnName": "sale_maintenance_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_maintenance_chargeable_services"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_maintenance_chargeable_services"
        }
      }
    },
    "act_sale_maintenance_expenses": {
      "tableName": "act_sale_maintenance_expenses",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "sale_maintenance_expense_remarks": {
          "columnName": "sale_maintenance_expense_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_maintenance_expense_amount": {
          "columnName": "sale_maintenance_expense_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_maintenance_expense_datetime": {
          "columnName": "sale_maintenance_expense_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_maintenance_expense_id": {
          "columnName": "sale_maintenance_expense_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_maintenance_id": {
          "columnName": "sale_maintenance_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Maintenance"
            }
          }
        },
        "sale_maintenance_expense_status": {
          "columnName": "sale_maintenance_expense_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_maintenance_expense"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_maintenance_expenses"
        }
      }
    },
    "act_sale_maintenance_payments": {
      "tableName": "act_sale_maintenance_payments",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "payment_method_id": {
          "columnName": "payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Payment Method"
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "sale_maintenance_payment_remarks": {
          "columnName": "sale_maintenance_payment_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_maintenance_id": {
          "columnName": "sale_maintenance_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Maintenance"
            }
          }
        },
        "sale_maintenance_payment_amount": {
          "columnName": "sale_maintenance_payment_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_maintenance_payment_datetime": {
          "columnName": "sale_maintenance_payment_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_maintenance_payment_id": {
          "columnName": "sale_maintenance_payment_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_maintenance_payment_status": {
          "columnName": "sale_maintenance_payment_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_maintenance_payment"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_maintenance_payments"
        }
      }
    },
    "act_sale_maintenance_products": {
      "tableName": "act_sale_maintenance_products",
      "tableColumns": {
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "inventory_tracking_id": {
          "columnName": "inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Inventory Tracking"
            }
          }
        },
        "product_description": {
          "columnName": "product_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Description"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "product_price_actual": {
          "columnName": "product_price_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Price"
            }
          }
        },
        "product_price_gross": {
          "columnName": "product_price_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Price"
            }
          }
        },
        "product_price_net": {
          "columnName": "product_price_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Price"
            }
          }
        },
        "product_quantity": {
          "columnName": "product_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "product_uom_quantity": {
          "columnName": "product_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "sale_maintenance_id": {
          "columnName": "sale_maintenance_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Maintenance"
            }
          }
        },
        "sale_maintenance_product_id": {
          "columnName": "sale_maintenance_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_status": {
          "columnName": "product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_maintenance_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_maintenance_product"
        }
      }
    },
    "act_sale_maintenances": {
      "tableName": "act_sale_maintenances",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "audio_attachments": {
          "columnName": "audio_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Audio Recordings"
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "customer_id": {
          "columnName": "customer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Customer"
            }
          }
        },
        "device_id": {
          "columnName": "device_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Device"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "sale_maintenance_remarks": {
          "columnName": "sale_maintenance_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_invoice_id": {
          "columnName": "sale_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Invoice"
            }
          }
        },
        "sale_maintenance_amount": {
          "columnName": "sale_maintenance_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_maintenance_datetime": {
          "columnName": "sale_maintenance_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_maintenance_id": {
          "columnName": "sale_maintenance_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_maintenance_number": {
          "columnName": "sale_maintenance_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Maintenance#"
            }
          }
        },
        "sale_terms_id": {
          "columnName": "sale_terms_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Terms"
            }
          }
        },
        "sale_maintenance_status": {
          "columnName": "sale_maintenance_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                },
                {
                  "label": "CANCELLED",
                  "value": "CANCELLED"
                }
              ]
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        },
        "sale_maintenance_type": {
          "columnName": "sale_maintenance_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_maintenance"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_maintenances"
        }
      }
    },
    "act_sale_offer_products": {
      "tableName": "act_sale_offer_products",
      "tableColumns": {
        "discount_type": {
          "columnName": "discount_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Discount Type"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PERCENTAGE",
                  "value": "PERCENTAGE"
                },
                {
                  "label": "AMOUNT",
                  "value": "AMOUNT"
                }
              ]
            }
          }
        },
        "discount_value": {
          "columnName": "discount_value",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Discount Value"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "is_selected": {
          "columnName": "is_selected",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Selected?"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "YES"
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "YES",
                  "value": "YES"
                },
                {
                  "label": "NO",
                  "value": "NO"
                }
              ]
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "sale_offer_product_remarks": {
          "columnName": "sale_offer_product_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_offer_id": {
          "columnName": "sale_offer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Offer"
            }
          }
        },
        "sale_offer_product_id": {
          "columnName": "sale_offer_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_offer_product_price": {
          "columnName": "sale_offer_product_price",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Offer Price"
            }
          }
        },
        "sale_offer_status": {
          "columnName": "sale_offer_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "ACTIVE"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "ACTIVE",
                  "value": "ACTIVE"
                },
                {
                  "label": "INACTIVE",
                  "value": "INACTIVE"
                }
              ]
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_offer_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_offer_products"
        }
      }
    },
    "act_sale_offers": {
      "tableName": "act_sale_offers",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "apply_to": {
          "columnName": "apply_to",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Apply To"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "ALL ITEMS"
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "ALL ITEMS",
                  "value": "ALL ITEMS"
                },
                {
                  "label": "INCLUDE SELECTED ITEMS",
                  "value": "INCLUDE SELECTED ITEMS"
                },
                {
                  "label": "EXCLUDE SELECTED ITEMS",
                  "value": "EXCLUDE SELECTED ITEMS"
                }
              ]
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "discount_type": {
          "columnName": "discount_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Discount Type"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PERCENTAGE",
                  "value": "PERCENTAGE"
                },
                {
                  "label": "AMOUNT",
                  "value": "AMOUNT"
                }
              ]
            }
          }
        },
        "discount_value": {
          "columnName": "discount_value",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Discount Value"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "sale_offer_remarks": {
          "columnName": "sale_offer_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_offer_end_datetime": {
          "columnName": "sale_offer_end_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "End Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "sale_offer_id": {
          "columnName": "sale_offer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_offer_name": {
          "columnName": "sale_offer_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Offer Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "sale_offer_start_datetime": {
          "columnName": "sale_offer_start_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Start Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "sale_offer_status": {
          "columnName": "sale_offer_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "ACTIVE"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "ACTIVE",
                  "value": "ACTIVE"
                },
                {
                  "label": "INACTIVE",
                  "value": "INACTIVE"
                }
              ]
            }
          }
        },
        "sale_offer_description": {
          "columnName": "sale_offer_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_offer"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_offers"
        }
      }
    },
    "act_sale_quotation_chargeable_services": {
      "tableName": "act_sale_quotation_chargeable_services",
      "tableColumns": {
        "chargeable_service_charge_actual": {
          "columnName": "chargeable_service_charge_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Charge"
            }
          }
        },
        "chargeable_service_charge_gross": {
          "columnName": "chargeable_service_charge_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Charge"
            }
          }
        },
        "chargeable_service_charge_net": {
          "columnName": "chargeable_service_charge_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Charge"
            }
          }
        },
        "chargeable_service_description": {
          "columnName": "chargeable_service_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service Description"
            }
          }
        },
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service"
            }
          }
        },
        "chargeable_service_quantity": {
          "columnName": "chargeable_service_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "chargeable_service_uom_id": {
          "columnName": "chargeable_service_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "chargeable_service_uom_quantity": {
          "columnName": "chargeable_service_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "sale_quotation_chargeable_service_id": {
          "columnName": "sale_quotation_chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_quotation_id": {
          "columnName": "sale_quotation_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Quotation"
            }
          }
        },
        "chargeable_service_status": {
          "columnName": "chargeable_service_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_quotation_chargeable_service"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_quotation_chargeable_services"
        }
      }
    },
    "act_sale_quotation_expenses": {
      "tableName": "act_sale_quotation_expenses",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "sale_quotation_expense_remarks": {
          "columnName": "sale_quotation_expense_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_quotation_expense_amount": {
          "columnName": "sale_quotation_expense_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_quotation_expense_datetime": {
          "columnName": "sale_quotation_expense_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_quotation_expense_id": {
          "columnName": "sale_quotation_expense_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_quotation_id": {
          "columnName": "sale_quotation_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Quotation"
            }
          }
        },
        "sale_quotation_expense_status": {
          "columnName": "sale_quotation_expense_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_quotation_expense"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_quotation_expenses"
        }
      }
    },
    "act_sale_quotation_products": {
      "tableName": "act_sale_quotation_products",
      "tableColumns": {
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "product_description": {
          "columnName": "product_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Description"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "product_price_actual": {
          "columnName": "product_price_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Price"
            }
          }
        },
        "product_price_gross": {
          "columnName": "product_price_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Price"
            }
          }
        },
        "product_price_net": {
          "columnName": "product_price_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Price"
            }
          }
        },
        "product_quantity": {
          "columnName": "product_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "product_uom_quantity": {
          "columnName": "product_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "sale_quotation_id": {
          "columnName": "sale_quotation_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Quotation"
            }
          }
        },
        "sale_quotation_product_id": {
          "columnName": "sale_quotation_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_status": {
          "columnName": "product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_quotation_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_quotation_products"
        }
      }
    },
    "act_sale_quotations": {
      "tableName": "act_sale_quotations",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "customer_id": {
          "columnName": "customer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Customer"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "sale_quotation_remarks": {
          "columnName": "sale_quotation_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_quotation_amount": {
          "columnName": "sale_quotation_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_quotation_datetime": {
          "columnName": "sale_quotation_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_quotation_id": {
          "columnName": "sale_quotation_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_quotation_number": {
          "columnName": "sale_quotation_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quotation#"
            }
          }
        },
        "sale_term_id": {
          "columnName": "sale_term_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Terms"
            }
          }
        },
        "sale_quotation_status": {
          "columnName": "sale_quotation_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        },
        "sale_quotation_type": {
          "columnName": "sale_quotation_type",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_quotation"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_quotations"
        }
      }
    },
    "act_sale_return_chargeable_services": {
      "tableName": "act_sale_return_chargeable_services",
      "tableColumns": {
        "chargeable_service_charge_actual": {
          "columnName": "chargeable_service_charge_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Charge"
            }
          }
        },
        "chargeable_service_charge_gross": {
          "columnName": "chargeable_service_charge_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Charge"
            }
          }
        },
        "chargeable_service_charge_net": {
          "columnName": "chargeable_service_charge_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Charge"
            }
          }
        },
        "chargeable_service_description": {
          "columnName": "chargeable_service_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service Description"
            }
          }
        },
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service"
            }
          }
        },
        "chargeable_service_quantity": {
          "columnName": "chargeable_service_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "chargeable_service_uom_id": {
          "columnName": "chargeable_service_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "chargeable_service_uom_quantity": {
          "columnName": "chargeable_service_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "sale_return_chargeable_service_id": {
          "columnName": "sale_return_chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_return_id": {
          "columnName": "sale_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Note"
            }
          }
        },
        "chargeable_service_status": {
          "columnName": "chargeable_service_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_debit_note_chargeable_service"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_debit_note_chargeable_services"
        }
      }
    },
    "act_sale_return_expenses": {
      "tableName": "act_sale_return_expenses",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "sale_return_expense_remarks": {
          "columnName": "sale_return_expense_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_return_expense_amount": {
          "columnName": "sale_return_expense_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_return_expense_datetime": {
          "columnName": "sale_return_expense_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_return_expense_id": {
          "columnName": "sale_return_expense_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_return_id": {
          "columnName": "sale_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Note"
            }
          }
        },
        "sale_return_expense_status": {
          "columnName": "sale_return_expense_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_debit_note_expense"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_debit_note_expenses"
        }
      }
    },
    "act_sale_return_payments": {
      "tableName": "act_sale_return_payments",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "payment_method_id": {
          "columnName": "payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Payment Method"
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "sale_return_payment_remarks": {
          "columnName": "sale_return_payment_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_return_id": {
          "columnName": "sale_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Note"
            }
          }
        },
        "sale_return_payment_amount": {
          "columnName": "sale_return_payment_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_return_payment_datetime": {
          "columnName": "sale_return_payment_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_return_payment_id": {
          "columnName": "sale_return_payment_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_return_payment_status": {
          "columnName": "sale_return_payment_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_debit_note_payment"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_debit_note_payments"
        }
      }
    },
    "act_sale_return_products": {
      "tableName": "act_sale_return_products",
      "tableColumns": {
        "discount_cash_percentage": {
          "columnName": "discount_cash_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "CD%"
            }
          }
        },
        "discount_rebate_percentage": {
          "columnName": "discount_rebate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Rebate%"
            }
          }
        },
        "discount_trade_percentage": {
          "columnName": "discount_trade_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "TD%"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "inventory_tracking_id": {
          "columnName": "inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Inventory Tracking"
            }
          }
        },
        "product_description": {
          "columnName": "product_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Description"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "product_price_actual": {
          "columnName": "product_price_actual",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Actual Price"
            }
          }
        },
        "product_price_gross": {
          "columnName": "product_price_gross",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gross Price"
            }
          }
        },
        "product_price_net": {
          "columnName": "product_price_net",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Net Price"
            }
          }
        },
        "product_quantity": {
          "columnName": "product_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "product_uom_quantity": {
          "columnName": "product_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "sale_return_id": {
          "columnName": "sale_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Note"
            }
          }
        },
        "sale_return_product_id": {
          "columnName": "sale_return_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "product_status": {
          "columnName": "product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_debit_note_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_debit_note_products"
        }
      }
    },
    "act_sale_returns": {
      "tableName": "act_sale_returns",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Company"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "audio_attachments": {
          "columnName": "audio_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Audio Recordings"
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "customer_id": {
          "columnName": "customer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Customer"
            }
          }
        },
        "device_id": {
          "columnName": "device_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Device"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency Rate"
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "sale_return_remarks": {
          "columnName": "sale_return_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_invoice_id": {
          "columnName": "sale_invoice_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sale Invoice"
            }
          }
        },
        "sale_return_amount": {
          "columnName": "sale_return_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "sale_return_datetime": {
          "columnName": "sale_return_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "sale_return_id": {
          "columnName": "sale_return_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_return_number": {
          "columnName": "sale_return_number",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Note#"
            }
          }
        },
        "sale_terms_id": {
          "columnName": "sale_terms_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Terms"
            }
          }
        },
        "sale_return_status": {
          "columnName": "sale_return_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                },
                {
                  "label": "CANCELLED",
                  "value": "CANCELLED"
                }
              ]
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        },
        "sale_return_type": {
          "columnName": "sale_return_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_debit_note"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_debit_notes"
        }
      }
    },
    "act_sale_terms": {
      "tableName": "act_sale_terms",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "sale_term_remarks": {
          "columnName": "sale_term_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "sale_term_id": {
          "columnName": "sale_term_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "sale_term_name": {
          "columnName": "sale_term_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          }
        },
        "sale_term_description": {
          "columnName": "sale_term_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "sale_term"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "sale_terms"
        }
      }
    },
    "act_signatures": {
      "tableName": "act_signatures",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "signature_datetime": {
          "columnName": "signature_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            }
          }
        },
        "signature_details": {
          "columnName": "signature_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          }
        },
        "signature_id": {
          "columnName": "signature_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "signature_media_id": {
          "columnName": "signature_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Signature"
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "signature"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "signatures"
        }
      }
    },
    "act_social_medias": {
      "tableName": "act_social_medias",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "social_media_id": {
          "columnName": "social_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "social_media_type": {
          "columnName": "social_media_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "social_media_value": {
          "columnName": "social_media_value",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "social_media"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "social_medias"
        }
      }
    },
    "act_stock_audit_product_storage_locations": {
      "tableName": "act_stock_audit_product_storage_locations",
      "tableColumns": {
        "found_quantity": {
          "columnName": "found_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Found Quantity"
            }
          }
        },
        "found_uom_quantity": {
          "columnName": "found_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Found Quantity"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "storage_location_product_status": {
          "columnName": "storage_location_product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                }
              ]
            }
          }
        },
        "stock_audit_product_id": {
          "columnName": "stock_audit_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Audit Item"
            }
          }
        },
        "stock_audit_product_storage_location_id": {
          "columnName": "stock_audit_product_storage_location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "stock_quantity": {
          "columnName": "stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Stock Quantity"
            }
          }
        },
        "stock_uom_quantity": {
          "columnName": "stock_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Stock Quantity"
            }
          }
        },
        "storage_location_id": {
          "columnName": "storage_location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Storage Location"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "stock_audit_product_storage_location"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "stock_audit_product_storage_locations"
        }
      }
    },
    "act_stock_audit_products": {
      "tableName": "act_stock_audit_products",
      "tableColumns": {
        "found_quantity": {
          "columnName": "found_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Found Quantity"
            }
          }
        },
        "found_uom_quantity": {
          "columnName": "found_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Found Quantity"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "stock_audit_product_remarks": {
          "columnName": "stock_audit_product_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "product_status": {
          "columnName": "product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "AUDITED",
                  "value": "AUDITED"
                },
                {
                  "label": "MISSING",
                  "value": "MISSING"
                }
              ]
            }
          }
        },
        "stock_audit_id": {
          "columnName": "stock_audit_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Audit"
            }
          }
        },
        "stock_audit_product_id": {
          "columnName": "stock_audit_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "stock_quantity": {
          "columnName": "stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Stock Quantity"
            }
          }
        },
        "stock_uom_quantity": {
          "columnName": "stock_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Stock Quantity"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "stock_audit_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "stock_audit_products"
        }
      }
    },
    "act_stock_audits": {
      "tableName": "act_stock_audits",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "stock_audit_remarks": {
          "columnName": "stock_audit_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "stock_audit_status": {
          "columnName": "stock_audit_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "STARTED",
                  "value": "STARTED"
                },
                {
                  "label": "CANCELLED",
                  "value": "CANCELLED"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                }
              ]
            }
          }
        },
        "stock_audit_datetime": {
          "columnName": "stock_audit_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "stock_audit_id": {
          "columnName": "stock_audit_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "stock_audit_number": {
          "columnName": "stock_audit_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "AUTO_NUMBER_LENGTH": {
              "propertyName": "AUTO_NUMBER_LENGTH",
              "propertyValue": 5
            },
            "AUTO_NUMBER_PREFIX": {
              "propertyName": "AUTO_NUMBER_PREFIX",
              "propertyValue": "AUD-"
            },
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Audit Number"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "stock_audit"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "stock_audits"
        }
      }
    },
    "act_stock_transfer_packing_products": {
      "tableName": "act_stock_transfer_packing_products",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "product_quantity": {
          "columnName": "product_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "product_uom_quantity": {
          "columnName": "product_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quantity"
            }
          }
        },
        "stock_transfer_packing_id": {
          "columnName": "stock_transfer_packing_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transfer Packing"
            }
          }
        },
        "stock_transfer_packing_item_id": {
          "columnName": "stock_transfer_packing_item_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "stock_transfer_product_id": {
          "columnName": "stock_transfer_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transfer Item"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "stock_transfer_packing_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "stock_transfer_packing_products"
        }
      }
    },
    "act_stock_transfer_packings": {
      "tableName": "act_stock_transfer_packings",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "packing_attachments": {
          "columnName": "packing_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Attachments"
            }
          }
        },
        "packing_audio_attachments": {
          "columnName": "packing_audio_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Audio Recordings"
            }
          }
        },
        "packing_name": {
          "columnName": "packing_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Name"
            }
          }
        },
        "packing_remarks": {
          "columnName": "packing_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Remarks"
            }
          }
        },
        "packing_status": {
          "columnName": "packing_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                }
              ]
            }
          }
        },
        "stock_transfer_id": {
          "columnName": "stock_transfer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transfer"
            }
          }
        },
        "stock_transfer_packing_id": {
          "columnName": "stock_transfer_packing_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "stock_transfer_packing_number": {
          "columnName": "stock_transfer_packing_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transfer Packing Number"
            }
          }
        },
        "packing_type": {
          "columnName": "packing_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Type"
            }
          }
        },
        "unpacking_attachments": {
          "columnName": "unpacking_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Unpacking Attachments"
            }
          }
        },
        "unpacking_audio_attachments": {
          "columnName": "unpacking_audio_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Unpacking Audio Recordings"
            }
          }
        },
        "unpacking_remarks": {
          "columnName": "unpacking_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Unpacking Remarks"
            }
          }
        },
        "unpacking_status": {
          "columnName": "unpacking_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Unpacking Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                }
              ]
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "stock_transfer_packing"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "stock_transfer_packings"
        }
      }
    },
    "act_stock_transfer_products": {
      "tableName": "act_stock_transfer_products",
      "tableColumns": {
        "destination_inventory_tracking_id": {
          "columnName": "destination_inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Destination Inventory Tracking"
            }
          }
        },
        "destination_new_stock_quantity": {
          "columnName": "destination_new_stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Destination New Stock Quantity"
            }
          }
        },
        "destination_new_stock_uom_quantity": {
          "columnName": "destination_new_stock_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Destination New Stock Quantity"
            }
          }
        },
        "destination_old_stock_quantity": {
          "columnName": "destination_old_stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Destination Old Stock Quantity"
            }
          }
        },
        "destination_old_stock_uom_quantity": {
          "columnName": "destination_old_stock_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Destination Old Stock Quantity"
            }
          }
        },
        "destination_quantity": {
          "columnName": "destination_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Destination Quantity"
            }
          }
        },
        "destination_uom_quantity": {
          "columnName": "destination_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Destination Quantity"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "packing_attachments": {
          "columnName": "packing_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Attachments"
            }
          }
        },
        "packing_audio_attachments": {
          "columnName": "packing_audio_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Audio Recordings"
            }
          }
        },
        "packing_remarks": {
          "columnName": "packing_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Remarks"
            }
          }
        },
        "packing_status": {
          "columnName": "packing_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Packing Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                }
              ]
            }
          }
        },
        "product_description": {
          "columnName": "product_description",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Prouct Description"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "stock_transfer_product_remarks": {
          "columnName": "stock_transfer_product_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "source_inventory_tracking_id": {
          "columnName": "source_inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Source Inventory Tracking"
            }
          }
        },
        "source_new_stock_quantity": {
          "columnName": "source_new_stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Source New Stock"
            }
          }
        },
        "source_new_stock_uom_quantity": {
          "columnName": "source_new_stock_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Source New Stock Unit"
            }
          }
        },
        "source_old_stock_quantity": {
          "columnName": "source_old_stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Source Old Stock"
            }
          }
        },
        "source_old_stock_uom_quantity": {
          "columnName": "source_old_stock_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Source Old Stock"
            }
          }
        },
        "source_quantity": {
          "columnName": "source_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Source Quantity"
            }
          }
        },
        "source_uom_quantity": {
          "columnName": "source_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Source Quantity"
            }
          }
        },
        "stock_transfer_product_status": {
          "columnName": "stock_transfer_product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "IN TRANSIT",
                  "value": "IN TRANSIT"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                },
                {
                  "label": "CANCELLED",
                  "value": "CANCELLED"
                }
              ]
            }
          }
        },
        "stock_transfer_id": {
          "columnName": "stock_transfer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transfer"
            }
          }
        },
        "stock_transfer_product_id": {
          "columnName": "stock_transfer_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "unpacking_attachments": {
          "columnName": "unpacking_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Unpacking Attachments"
            }
          }
        },
        "unpacking_audio_attachments": {
          "columnName": "unpacking_audio_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Unpacking Audio Recordings"
            }
          }
        },
        "unpacking_remarks": {
          "columnName": "unpacking_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Unpacking Remarks"
            }
          }
        },
        "unpacking_status": {
          "columnName": "unpacking_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Unpacking Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                }
              ]
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "stock_transfer_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "stock_transfer_products"
        }
      }
    },
    "act_stock_transfers": {
      "tableName": "act_stock_transfers",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Company"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "destination_attachments": {
          "columnName": "destination_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Receive Attachments"
            }
          }
        },
        "destination_datetime": {
          "columnName": "destination_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Receive Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "destination_location_id": {
          "columnName": "destination_location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Destination Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "destination_remarks": {
          "columnName": "destination_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Receive remarks"
            }
          }
        },
        "destination_user_id": {
          "columnName": "destination_user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Received By"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "stock_transfer_remarks": {
          "columnName": "stock_transfer_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "source_attachments": {
          "columnName": "source_attachments",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Dispatch Attachments"
            }
          }
        },
        "source_datetime": {
          "columnName": "source_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Dispatch Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "source_location_id": {
          "columnName": "source_location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Source Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "source_remarks": {
          "columnName": "source_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Dispatch Remarks"
            }
          }
        },
        "source_user_id": {
          "columnName": "source_user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Dispatched By"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "stock_transfer_status": {
          "columnName": "stock_transfer_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "PENDING"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "STARTED",
                  "value": "STARTED"
                },
                {
                  "label": "IN TRANSIT",
                  "value": "IN TRANSIT"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                },
                {
                  "label": "CANCELLED",
                  "value": "CANCELLED"
                }
              ]
            }
          }
        },
        "stock_transfer_datetime": {
          "columnName": "stock_transfer_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transfer Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "stock_transfer_id": {
          "columnName": "stock_transfer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "stock_transfer_number": {
          "columnName": "stock_transfer_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "AUTO_NUMBER_LENGTH": {
              "propertyName": "AUTO_NUMBER_LENGTH",
              "propertyValue": 5
            },
            "AUTO_NUMBER_PREFIX": {
              "propertyName": "AUTO_NUMBER_PREFIX",
              "propertyValue": "TRF-"
            },
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transfer Number"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "stock_transfer_type": {
          "columnName": "stock_transfer_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "OUTSIDE LOCATION"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "OUTSIDE LOCATION",
                  "value": "OUTSIDE LOCATION"
                },
                {
                  "label": "WITHIN LOCATION",
                  "value": "WITHIN LOCATION"
                }
              ]
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "stock_transfer"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "stock_transfers"
        }
      }
    },
    "act_stock_update_products": {
      "tableName": "act_stock_update_products",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "inventory_tracking_id": {
          "columnName": "inventory_tracking_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Inventory Tracking"
            }
          }
        },
        "new_stock_quantity": {
          "columnName": "new_stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "New Stock Quantity"
            }
          }
        },
        "new_stock_uom_quantity": {
          "columnName": "new_stock_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "New Stock Quantity"
            }
          }
        },
        "old_stock_quantity": {
          "columnName": "old_stock_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Old Stock Quantity"
            }
          }
        },
        "old_stock_uom_quantity": {
          "columnName": "old_stock_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Old Stock Quantity"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            }
          }
        },
        "product_uom_id": {
          "columnName": "product_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "UOM"
            }
          }
        },
        "stock_update_product_remarks": {
          "columnName": "stock_update_product_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "product_status": {
          "columnName": "product_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "UPDATED"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "UPDATED",
                  "value": "UPDATED"
                },
                {
                  "label": "PENDING",
                  "value": "PENDING"
                },
                {
                  "label": "CANCELLED",
                  "value": "CANCELLED"
                }
              ]
            }
          }
        },
        "stock_update_id": {
          "columnName": "stock_update_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Update"
            }
          }
        },
        "stock_update_product_id": {
          "columnName": "stock_update_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "update_quantity": {
          "columnName": "update_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Update Quantity"
            }
          }
        },
        "update_uom_quantity": {
          "columnName": "update_uom_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Update Quantity"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "stock_update_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "stock_update_products"
        }
      }
    },
    "act_stock_updates": {
      "tableName": "act_stock_updates",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "stock_update_remarks": {
          "columnName": "stock_update_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "stock_update_status": {
          "columnName": "stock_update_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "STARTED"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "STARTED",
                  "value": "STARTED"
                },
                {
                  "label": "COMPLETED",
                  "value": "COMPLETED"
                },
                {
                  "label": "CANCELLED",
                  "value": "CANCELLED"
                }
              ]
            }
          }
        },
        "stock_update_datetime": {
          "columnName": "stock_update_datetime",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "stock_update_id": {
          "columnName": "stock_update_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "stock_update_number": {
          "columnName": "stock_update_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "AUTO_NUMBER_LENGTH": {
              "propertyName": "AUTO_NUMBER_LENGTH",
              "propertyValue": 5
            },
            "AUTO_NUMBER_PREFIX": {
              "propertyName": "AUTO_NUMBER_PREFIX",
              "propertyValue": "UPD-"
            },
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Update Number"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            }
          }
        },
        "stock_update_reason": {
          "columnName": "stock_update_reason",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Update Reason"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "stock_update"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "stock_updates"
        }
      }
    },
    "act_storage_locations": {
      "tableName": "act_storage_locations",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "location_id": {
          "columnName": "location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Location"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "parent_storage_location_id": {
          "columnName": "parent_storage_location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Parent Storage Location"
            }
          }
        },
        "storage_location_remarks": {
          "columnName": "storage_location_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "storage_location_status": {
          "columnName": "storage_location_status",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Status"
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "ACTIVE"
            },
            "FORMAT": {
              "propertyName": "FORMAT",
              "propertyValue": [
                "UPPERCASE"
              ]
            },
            "REMARKS": {
              "propertyName": "REMARKS",
              "propertyValue": "status_field"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            },
            "VALUE_OPTIONS": {
              "propertyName": "VALUE_OPTIONS",
              "propertyValue": [
                {
                  "label": "ACTIVE",
                  "value": "ACTIVE"
                },
                {
                  "label": "INACTIVE",
                  "value": "INACTIVE"
                }
              ]
            }
          }
        },
        "storage_location_code": {
          "columnName": "storage_location_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Code"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "storage_location_id": {
          "columnName": "storage_location_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "storage_location_image_media_id": {
          "columnName": "storage_location_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Sorate Image"
            }
          }
        },
        "storage_location_index": {
          "columnName": "storage_location_index",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "storage_location_name": {
          "columnName": "storage_location_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "storage_location_tree": {
          "columnName": "storage_location_tree",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tree"
            }
          }
        },
        "storage_location_unique_identifier": {
          "columnName": "storage_location_unique_identifier",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Unique Identifier"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "storage_location"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "storage_locations"
        }
      }
    },
    "act_supplier_chargeable_services": {
      "tableName": "act_supplier_chargeable_services",
      "tableColumns": {
        "chargeable_service_charge": {
          "columnName": "chargeable_service_charge",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Charge"
            }
          }
        },
        "chargeable_service_id": {
          "columnName": "chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "last_purchase_price": {
          "columnName": "last_purchase_price",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Last Purchase Charge"
            }
          }
        },
        "minimum_order_quantity": {
          "columnName": "minimum_order_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Min Order Qty"
            }
          }
        },
        "minimum_order_quantity_uom_id": {
          "columnName": "minimum_order_quantity_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Min Order UOM"
            }
          }
        },
        "supplier_chargeable_service_remarks": {
          "columnName": "supplier_chargeable_service_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "supplier_chargeable_service_code": {
          "columnName": "supplier_chargeable_service_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Service Code"
            }
          }
        },
        "supplier_chargeable_service_id": {
          "columnName": "supplier_chargeable_service_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Supplier"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "supplier_chargeable_service"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "supplier_chargeable_services"
        }
      }
    },
    "act_supplier_products": {
      "tableName": "act_supplier_products",
      "tableColumns": {
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "last_purchase_price": {
          "columnName": "last_purchase_price",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Last Purchase Price"
            }
          }
        },
        "minimum_order_quantity": {
          "columnName": "minimum_order_quantity",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Min Order Qty"
            }
          }
        },
        "minimum_order_quantity_uom_id": {
          "columnName": "minimum_order_quantity_uom_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Min Order UOM"
            }
          }
        },
        "product_id": {
          "columnName": "product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "product_purchase_price": {
          "columnName": "product_purchase_price",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Purchase Price"
            }
          }
        },
        "supplier_product_remarks": {
          "columnName": "supplier_product_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Supplier"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "supplier_product_code": {
          "columnName": "supplier_product_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Product Code"
            }
          }
        },
        "supplier_product_id": {
          "columnName": "supplier_product_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "supplier_product"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "supplier_products"
        }
      }
    },
    "act_suppliers": {
      "tableName": "act_suppliers",
      "tableColumns": {
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "supplier_details": {
          "columnName": "supplier_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          }
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "supplier_type": {
          "columnName": "supplier_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "supplier_remarks": {
          "columnName": "supplier_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "supplier"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "suppliers"
        }
      }
    },
    "act_tax_parts": {
      "tableName": "act_tax_parts",
      "tableColumns": {
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "tax_part_percentage": {
          "columnName": "tax_part_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Percentage"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "tax_part_id": {
          "columnName": "tax_part_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "tax_part_name": {
          "columnName": "tax_part_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "tax_part"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "tax_parts"
        }
      }
    },
    "act_tax_rates": {
      "tableName": "act_tax_rates",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "tax_rate_name": {
          "columnName": "tax_rate_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "tax_rate_percentage": {
          "columnName": "tax_rate_percentage",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Percentage"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "tax_rate"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "tax_rates"
        }
      }
    },
    "act_taxing_schemes": {
      "tableName": "act_taxing_schemes",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "taxing_scheme_remarks": {
          "columnName": "taxing_scheme_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "taxing_scheme_name": {
          "columnName": "taxing_scheme_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "taxing_scheme_description": {
          "columnName": "taxing_scheme_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "taxing_scheme"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "taxing_schemes"
        }
      }
    },
    "act_transaction_entries": {
      "tableName": "act_transaction_entries",
      "tableColumns": {
        "entry_amount": {
          "columnName": "entry_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "debit_ledger_account_id": {
          "columnName": "debit_ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Ledger Account"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "reference_number": {
          "columnName": "reference_number",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Reference#"
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "transaction_id": {
          "columnName": "transaction_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction"
            }
          }
        },
        "credit_ledger_account_id": {
          "columnName": "credit_ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Credit Ledger Account"
            }
          }
        },
        "debit_payment_method_id": {
          "columnName": "debit_payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Debit Payment Method"
            }
          }
        },
        "credit_payment_method_id": {
          "columnName": "credit_payment_method_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Credit Payment Method"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "transaction_entry"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "transaction_entries"
        }
      }
    },
    "act_transaction_entry_medias": {
      "tableName": "act_transaction_entry_medias",
      "tableColumns": {
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "transaction_entry_id": {
          "columnName": "transaction_entry_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Transaction Entry"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "transaction_entry_media_id": {
          "columnName": "transaction_entry_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "transaction_entry_media"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "transaction_entry_medias"
        }
      }
    },
    "act_transactions": {
      "tableName": "act_transactions",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          }
        },
        "exchange_rate": {
          "columnName": "exchange_rate",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Exchange Rate"
            }
          }
        },
        "is_draft": {
          "columnName": "is_draft",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Draft?"
            }
          }
        },
        "transaction_remarks": {
          "columnName": "transaction_remarks",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Remarks"
            }
          }
        },
        "transaction_amount": {
          "columnName": "transaction_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Amount"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "transaction_details": {
          "columnName": "transaction_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          }
        },
        "transaction_id": {
          "columnName": "transaction_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "transaction_narration": {
          "columnName": "transaction_narration",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Narration"
            }
          }
        },
        "transaction_number": {
          "columnName": "transaction_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Number"
            }
          }
        },
        "transaction_time": {
          "columnName": "transaction_time",
          "columnType": "DATETIME",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Date/Time"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "transaction_type": {
          "columnName": "transaction_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          }
        },
        "taxing_scheme_id": {
          "columnName": "taxing_scheme_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Taxing Scheme"
            }
          }
        },
        "tax_rate_id": {
          "columnName": "tax_rate_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tax Rate"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "transaction"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "transactions"
        }
      }
    },
    "act_trigger_flags": {
      "tableName": "act_trigger_flags",
      "tableColumns": {
        "table_name": {
          "columnName": "table_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Table"
            }
          }
        },
        "trigger_flag_id": {
          "columnName": "trigger_flag_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "trigger_flag_name": {
          "columnName": "trigger_flag_name",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          }
        },
        "trigger_flag_value": {
          "columnName": "trigger_flag_value",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "trigger_flag"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "trigger_flags"
        }
      }
    },
    "act_uoms": {
      "tableName": "act_uoms",
      "tableColumns": {
        "uom_code": {
          "columnName": "uom_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "uom_name": {
          "columnName": "uom_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "uom_description": {
          "columnName": "uom_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "uom"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "uoms"
        }
      }
    },
    "act_user_accountees": {
      "tableName": "act_user_accountees",
      "tableColumns": {
        "access_group_id": {
          "columnName": "access_group_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Access Group"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "employee_id": {
          "columnName": "employee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Employee"
            }
          }
        },
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "menu_id": {
          "columnName": "menu_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Menu"
            }
          }
        },
        "user_accountee_id": {
          "columnName": "user_accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "user_accountee"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "user_accountees"
        }
      }
    },
    "act_users": {
      "tableName": "act_users",
      "tableColumns": {
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "password": {
          "columnName": "password",
          "columnType": "PASSWORD",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Password"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "username": {
          "columnName": "username",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Username"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "user"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "users"
        }
      }
    },
    "act_websites": {
      "tableName": "act_websites",
      "tableColumns": {
        "index": {
          "columnName": "index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          }
        },
        "website_id": {
          "columnName": "website_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "website_label": {
          "columnName": "website_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Label"
            }
          }
        },
        "website_value": {
          "columnName": "website_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Value"
            }
          }
        }
      },
      "tableProperties": {
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "website"
        },
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "websites"
        }
      }
    }
  },
  "views": {
    "vw_act_customers": {
      "viewName": "vw_act_customers",
      "viewColumns": {
        "customer_category": {
          "columnName": "customer_category",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Category"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_details": {
          "columnName": "party_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_name": {
          "columnName": "party_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "addresses": {
          "columnName": "addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Addresses"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "email_addresses": {
          "columnName": "email_addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Addresses"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "fax_numbers": {
          "columnName": "fax_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Fax Numbers"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "phone_numbers": {
          "columnName": "phone_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Numbers"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "websites": {
          "columnName": "websites",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Websites"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "bank_accounts": {
          "columnName": "bank_accounts",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Bank Accounts"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "customer_id": {
          "columnName": "customer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Customer"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Supplier"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "employee_id": {
          "columnName": "employee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Employee"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_image_media_id": {
          "columnName": "party_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party Image"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        }
      },
      "viewQuery": "SELECT act_customers.customer_category,act_parties.* FROM act_customers LEFT JOIN act_parties ON act_customers.customer_id = act_parties.customer_id"
    },
    "vw_act_employees": {
      "viewName": "vw_act_employees",
      "viewColumns": {
        "employee_code": {
          "columnName": "employee_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Code"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "date_of_birth": {
          "columnName": "date_of_birth",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Birth Date"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "date_of_joining": {
          "columnName": "date_of_joining",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Joining Date"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "salary_duration": {
          "columnName": "salary_duration",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Salary Duration"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "employee_designation": {
          "columnName": "employee_designation",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Designation"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "employee_salary_amount": {
          "columnName": "employee_salary_amount",
          "columnType": "DOUBLE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Salary Amount"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "employee_gender": {
          "columnName": "employee_gender",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gender"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_details": {
          "columnName": "party_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_name": {
          "columnName": "party_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "addresses": {
          "columnName": "addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Addresses"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "email_addresses": {
          "columnName": "email_addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Addresses"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "fax_numbers": {
          "columnName": "fax_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Fax Numbers"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "phone_numbers": {
          "columnName": "phone_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Numbers"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "websites": {
          "columnName": "websites",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Websites"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "bank_accounts": {
          "columnName": "bank_accounts",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Bank Accounts"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "customer_id": {
          "columnName": "customer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Customer"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Supplier"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "employee_id": {
          "columnName": "employee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Employee"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_image_media_id": {
          "columnName": "party_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party Image"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        }
      },
      "viewQuery": "SELECT act_employees.employee_code,act_employees.date_of_birth,act_employees.date_of_joining,act_employees.salary_duration,act_employees.employee_designation,act_employees.employee_salary_amount,act_employees.employee_gender,act_parties.* FROM act_employees LEFT JOIN act_parties ON act_employees.employee_id = act_parties.employee_id"
    },
    "vw_act_products": {
      "viewName": "vw_act_products",
      "viewColumns": {},
      "viewQuery": "SELECT * FROM act_products"
    },
    "vw_act_suppliers": {
      "viewName": "vw_act_suppliers",
      "viewColumns": {
        "supplier_type": {
          "columnName": "supplier_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Type"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "is_active": {
          "columnName": "is_active",
          "columnType": "YES_NO",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Is Active?"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "ledger_account_id": {
          "columnName": "ledger_account_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Ledger Account"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_details": {
          "columnName": "party_details",
          "columnType": "JSON",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Details"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_id": {
          "columnName": "party_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Id"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_name": {
          "columnName": "party_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "addresses": {
          "columnName": "addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Addresses"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "email_addresses": {
          "columnName": "email_addresses",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Addresses"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "fax_numbers": {
          "columnName": "fax_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Fax Numbers"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "phone_numbers": {
          "columnName": "phone_numbers",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Numbers"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "websites": {
          "columnName": "websites",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Websites"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "bank_accounts": {
          "columnName": "bank_accounts",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Bank Accounts"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "customer_id": {
          "columnName": "customer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Customer"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "supplier_id": {
          "columnName": "supplier_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Supplier"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "employee_id": {
          "columnName": "employee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Employee"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "currency_code": {
          "columnName": "currency_code",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Currency"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        },
        "party_image_media_id": {
          "columnName": "party_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Party Image"
            }
          },
          "columnSource": "",
          "columnSourceName": ""
        }
      },
      "viewQuery": "SELECT act_suppliers.supplier_type,act_parties.* FROM act_suppliers LEFT JOIN act_parties ON act_suppliers.supplier_id = act_parties.supplier_id"
    },
    "vw_act_transaction_credit_entries": {
      "viewName": "vw_act_transaction_credit_entries",
      "viewColumns": {},
      "viewQuery": "SELECT SUM(entry_amount) as credit_amount, credit_ledger_account_id,transaction_id FROM act_transaction_entries GROUP BY transaction_id,credit_ledger_account_id"
    },
    "vw_act_transaction_debit_entries": {
      "viewName": "vw_act_transaction_debit_entries",
      "viewColumns": {},
      "viewQuery": "SELECT SUM(entry_amount) as debit_amount, debit_ledger_account_id,transaction_id FROM act_transaction_entries GROUP BY transaction_id,debit_ledger_account_id"
    }
  },
  "relationships": [
    {
      "destinationColumn": "access_group_id",
      "destinationTable": "act_access_rights",
      "sourceColumn": "access_group_id",
      "sourceTable": "act_access_groups"
    },
    {
      "destinationColumn": "access_group_id",
      "destinationTable": "act_user_accountees",
      "sourceColumn": "access_group_id",
      "sourceTable": "act_access_groups"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_accountee_addresses",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_accountee_bank_accounts",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_accountee_email_addresses",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_accountee_fax_numbers",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_accountee_legal_documents",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_accountee_medias",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_accountee_phone_numbers",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_accountee_settings",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_accountee_websites",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_asset_depreciations",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_assets",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_chargeable_services",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_employee_attendances",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_employee_contracts",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_ledger_account_types",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_ledger_accounts",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_locations",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_payment_methods",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_price_changes",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_product_categories",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_product_variant_groups",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_products",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_purchase_invoices",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_purchase_orders",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_purchase_returns",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_purchase_terms",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_sale_coupons",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_sale_invoices",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_sale_maintenances",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_sale_offers",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_sale_quotations",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_sale_returns",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_sale_terms",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_stock_audits",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_stock_transfers",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_stock_updates",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_taxing_schemes",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_transactions",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_user_accountees",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "address_id",
      "destinationTable": "act_accountee_addresses",
      "sourceColumn": "address_id",
      "sourceTable": "act_addresses"
    },
    {
      "destinationColumn": "address_id",
      "destinationTable": "act_location_addresses",
      "sourceColumn": "address_id",
      "sourceTable": "act_addresses"
    },
    {
      "destinationColumn": "address_id",
      "destinationTable": "act_party_addresses",
      "sourceColumn": "address_id",
      "sourceTable": "act_addresses"
    },
    {
      "destinationColumn": "asset_id",
      "destinationTable": "act_asset_attributes",
      "sourceColumn": "asset_id",
      "sourceTable": "act_assets"
    },
    {
      "destinationColumn": "asset_id",
      "destinationTable": "act_asset_depreciations",
      "sourceColumn": "asset_id",
      "sourceTable": "act_assets"
    },
    {
      "destinationColumn": "asset_id",
      "destinationTable": "act_asset_legal_documents",
      "sourceColumn": "asset_id",
      "sourceTable": "act_assets"
    },
    {
      "destinationColumn": "asset_id",
      "destinationTable": "act_asset_medias",
      "sourceColumn": "asset_id",
      "sourceTable": "act_assets"
    },
    {
      "destinationColumn": "automated_task_id",
      "destinationTable": "act_automated_task_logs",
      "sourceColumn": "automated_task_id",
      "sourceTable": "act_automated_tasks"
    },
    {
      "destinationColumn": "bank_account_id",
      "destinationTable": "act_accountee_bank_accounts",
      "sourceColumn": "bank_account_id",
      "sourceTable": "act_bank_accounts"
    },
    {
      "destinationColumn": "bank_account_id",
      "destinationTable": "act_party_bank_accounts",
      "sourceColumn": "bank_account_id",
      "sourceTable": "act_bank_accounts"
    },
    {
      "destinationColumn": "chargeable_service_uom_id",
      "destinationTable": "act_purchase_invoice_chargeable_services",
      "sourceColumn": "chargeable_service_uom_id",
      "sourceTable": "act_chargeable_service_uoms"
    },
    {
      "destinationColumn": "chargeable_service_uom_id",
      "destinationTable": "act_purchase_order_chargeable_services",
      "sourceColumn": "chargeable_service_uom_id",
      "sourceTable": "act_chargeable_service_uoms"
    },
    {
      "destinationColumn": "chargeable_service_uom_id",
      "destinationTable": "act_purchase_return_chargeable_services",
      "sourceColumn": "chargeable_service_uom_id",
      "sourceTable": "act_chargeable_service_uoms"
    },
    {
      "destinationColumn": "chargeable_service_uom_id",
      "destinationTable": "act_sale_invoice_chargable_services",
      "sourceColumn": "chargeable_service_uom_id",
      "sourceTable": "act_chargeable_service_uoms"
    },
    {
      "destinationColumn": "chargeable_service_uom_id",
      "destinationTable": "act_sale_maintenance_chargeable_services",
      "sourceColumn": "chargeable_service_uom_id",
      "sourceTable": "act_chargeable_service_uoms"
    },
    {
      "destinationColumn": "chargeable_service_uom_id",
      "destinationTable": "act_sale_quotation_chargeable_services",
      "sourceColumn": "chargeable_service_uom_id",
      "sourceTable": "act_chargeable_service_uoms"
    },
    {
      "destinationColumn": "chargeable_service_uom_id",
      "destinationTable": "act_sale_return_chargeable_services",
      "sourceColumn": "chargeable_service_uom_id",
      "sourceTable": "act_chargeable_service_uoms"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_chargeable_service_medias",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_chargeable_service_uoms",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_purchase_invoice_chargeable_services",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_purchase_order_chargeable_services",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_purchase_return_chargeable_services",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_sale_invoice_chargable_services",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_sale_maintenance_chargeable_services",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_sale_quotation_chargeable_services",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_sale_return_chargeable_services",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "chargeable_service_id",
      "destinationTable": "act_supplier_chargeable_services",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "contact_person_id",
      "destinationTable": "act_party_contact_persons",
      "sourceColumn": "contact_person_id",
      "sourceTable": "act_contact_persons"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_asset_depreciations",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_assets",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_bank_accounts",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_chargeable_services",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_ledger_accounts",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_payment_methods",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_product_prices",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_purchase_invoice_expenses",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_purchase_invoice_payments",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_purchase_invoices",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_purchase_order_expenses",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_purchase_order_payments",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_purchase_orders",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_purchase_return_expenses",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_purchase_return_payments",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_purchase_returns",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_invoice_expenses",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_invoice_payments",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_invoices",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_maintenance_expenses",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_maintenance_payments",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_maintenances",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_quotation_expenses",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_quotations",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_return_expenses",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_return_payments",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_sale_returns",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_supplier_chargeable_services",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_supplier_products",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_transaction_entries",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_transactions",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "customer_id",
      "destinationTable": "act_sale_invoices",
      "sourceColumn": "customer_id",
      "sourceTable": "act_customers"
    },
    {
      "destinationColumn": "customer_id",
      "destinationTable": "act_sale_maintenances",
      "sourceColumn": "customer_id",
      "sourceTable": "act_customers"
    },
    {
      "destinationColumn": "customer_id",
      "destinationTable": "act_sale_quotations",
      "sourceColumn": "customer_id",
      "sourceTable": "act_customers"
    },
    {
      "destinationColumn": "customer_id",
      "destinationTable": "act_sale_returns",
      "sourceColumn": "customer_id",
      "sourceTable": "act_customers"
    },
    {
      "destinationColumn": "device_id",
      "destinationTable": "act_purchase_invoices",
      "sourceColumn": "device_id",
      "sourceTable": "act_devices"
    },
    {
      "destinationColumn": "device_id",
      "destinationTable": "act_purchase_returns",
      "sourceColumn": "device_id",
      "sourceTable": "act_devices"
    },
    {
      "destinationColumn": "device_id",
      "destinationTable": "act_sale_invoices",
      "sourceColumn": "device_id",
      "sourceTable": "act_devices"
    },
    {
      "destinationColumn": "device_id",
      "destinationTable": "act_sale_maintenances",
      "sourceColumn": "device_id",
      "sourceTable": "act_devices"
    },
    {
      "destinationColumn": "device_id",
      "destinationTable": "act_sale_returns",
      "sourceColumn": "device_id",
      "sourceTable": "act_devices"
    },
    {
      "destinationColumn": "email_address_id",
      "destinationTable": "act_accountee_email_addresses",
      "sourceColumn": "email_address_id",
      "sourceTable": "act_email_addresses"
    },
    {
      "destinationColumn": "email_address_id",
      "destinationTable": "act_location_email_addresses",
      "sourceColumn": "email_address_id",
      "sourceTable": "act_email_addresses"
    },
    {
      "destinationColumn": "email_address_id",
      "destinationTable": "act_party_email_addresses",
      "sourceColumn": "email_address_id",
      "sourceTable": "act_email_addresses"
    },
    {
      "destinationColumn": "employee_id",
      "destinationTable": "act_employee_attendances",
      "sourceColumn": "employee_id",
      "sourceTable": "act_employees"
    },
    {
      "destinationColumn": "employee_id",
      "destinationTable": "act_employee_contracts",
      "sourceColumn": "employee_id",
      "sourceTable": "act_employees"
    },
    {
      "destinationColumn": "employee_id",
      "destinationTable": "act_user_accountees",
      "sourceColumn": "employee_id",
      "sourceTable": "act_employees"
    },
    {
      "destinationColumn": "fax_number_id",
      "destinationTable": "act_accountee_fax_numbers",
      "sourceColumn": "fax_number_id",
      "sourceTable": "act_fax_numbers"
    },
    {
      "destinationColumn": "fax_number_id",
      "destinationTable": "act_location_fax_numbers",
      "sourceColumn": "fax_number_id",
      "sourceTable": "act_fax_numbers"
    },
    {
      "destinationColumn": "fax_number_id",
      "destinationTable": "act_party_fax_numbers",
      "sourceColumn": "fax_number_id",
      "sourceTable": "act_fax_numbers"
    },
    {
      "destinationColumn": "inventory_tracking_id",
      "destinationTable": "act_inventory_tracking_entries",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "inventory_tracking_id",
      "destinationTable": "act_purchase_invoice_products",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "inventory_tracking_id",
      "destinationTable": "act_purchase_order_products",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "inventory_tracking_id",
      "destinationTable": "act_sale_invoice_products",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "inventory_tracking_id",
      "destinationTable": "act_sale_maintenance_products",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "inventory_tracking_id",
      "destinationTable": "act_stock_update_products",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "ledger_account_type_id",
      "destinationTable": "act_ledger_accounts",
      "sourceColumn": "ledger_account_type_id",
      "sourceTable": "act_ledger_account_types"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_accountee_bank_accounts",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_assets",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_payment_methods",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_purchase_invoice_expenses",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_purchase_order_expenses",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_purchase_return_expenses",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_sale_invoice_expenses",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_sale_maintenance_expenses",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_sale_quotation_expenses",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_sale_return_expenses",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "legal_document_type_id",
      "destinationTable": "act_legal_documents",
      "sourceColumn": "legal_document_type_id",
      "sourceTable": "act_legal_document_types"
    },
    {
      "destinationColumn": "legal_document_id",
      "destinationTable": "act_accountee_legal_documents",
      "sourceColumn": "legal_document_id",
      "sourceTable": "act_legal_documents"
    },
    {
      "destinationColumn": "legal_document_id",
      "destinationTable": "act_asset_legal_documents",
      "sourceColumn": "legal_document_id",
      "sourceTable": "act_legal_documents"
    },
    {
      "destinationColumn": "legal_document_id",
      "destinationTable": "act_legal_document_medias",
      "sourceColumn": "legal_document_id",
      "sourceTable": "act_legal_documents"
    },
    {
      "destinationColumn": "legal_document_id",
      "destinationTable": "act_location_legal_documents",
      "sourceColumn": "legal_document_id",
      "sourceTable": "act_legal_documents"
    },
    {
      "destinationColumn": "legal_document_id",
      "destinationTable": "act_party_legal_documents",
      "sourceColumn": "legal_document_id",
      "sourceTable": "act_legal_documents"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_inventory_tracking_entries",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_location_addresses",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_location_email_addresses",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_location_fax_numbers",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_location_legal_documents",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_location_medias",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_location_phone_numbers",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_location_websites",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_product_location_data",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_product_prices",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_stock_audits",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_stock_updates",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "location_id",
      "destinationTable": "act_storage_locations",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "media_id",
      "destinationTable": "act_accountee_medias",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "media_id",
      "destinationTable": "act_accountee_settings",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "media_id",
      "destinationTable": "act_asset_medias",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "media_id",
      "destinationTable": "act_chargeable_service_medias",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "media_id",
      "destinationTable": "act_legal_document_medias",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "media_id",
      "destinationTable": "act_location_medias",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "media_id",
      "destinationTable": "act_product_medias",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "media_id",
      "destinationTable": "act_party_medias",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "media_id",
      "destinationTable": "act_transaction_entry_medias",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "menu_id",
      "destinationTable": "act_menu_items",
      "sourceColumn": "menu_id",
      "sourceTable": "act_menus"
    },
    {
      "destinationColumn": "menu_id",
      "destinationTable": "act_user_accountees",
      "sourceColumn": "menu_id",
      "sourceTable": "act_menus"
    },
    {
      "destinationColumn": "payment_method_id",
      "destinationTable": "act_purchase_invoice_expenses",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    },
    {
      "destinationColumn": "payment_method_id",
      "destinationTable": "act_purchase_invoice_payments",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    },
    {
      "destinationColumn": "payment_method_id",
      "destinationTable": "act_purchase_order_expenses",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    },
    {
      "destinationColumn": "payment_method_id",
      "destinationTable": "act_purchase_order_payments",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    },
    {
      "destinationColumn": "payment_method_id",
      "destinationTable": "act_purchase_return_payments",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    },
    {
      "destinationColumn": "payment_method_id",
      "destinationTable": "act_sale_invoice_payments",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    },
    {
      "destinationColumn": "payment_method_id",
      "destinationTable": "act_sale_maintenance_payments",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    },
    {
      "destinationColumn": "payment_method_id",
      "destinationTable": "act_sale_return_payments",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    },
    {
      "destinationColumn": "phone_number_id",
      "destinationTable": "act_accountee_phone_numbers",
      "sourceColumn": "phone_number_id",
      "sourceTable": "act_phone_numbers"
    },
    {
      "destinationColumn": "phone_number_id",
      "destinationTable": "act_location_phone_numbers",
      "sourceColumn": "phone_number_id",
      "sourceTable": "act_phone_numbers"
    },
    {
      "destinationColumn": "phone_number_id",
      "destinationTable": "act_party_phone_numbers",
      "sourceColumn": "phone_number_id",
      "sourceTable": "act_phone_numbers"
    },
    {
      "destinationColumn": "price_change_id",
      "destinationTable": "act_price_change_products",
      "sourceColumn": "price_change_id",
      "sourceTable": "act_price_changes"
    },
    {
      "destinationColumn": "product_barcode_id",
      "destinationTable": "act_inventory_tracking_entries",
      "sourceColumn": "product_barcode_id",
      "sourceTable": "act_product_barcodes"
    },
    {
      "destinationColumn": "product_category_id",
      "destinationTable": "act_products",
      "sourceColumn": "product_category_id",
      "sourceTable": "act_product_categories"
    },
    {
      "destinationColumn": "product_price_id",
      "destinationTable": "act_inventory_tracking_entries",
      "sourceColumn": "product_price_id",
      "sourceTable": "act_product_prices"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_inventory_tracking_entries",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_purchase_invoice_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_purchase_order_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_purchase_return_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_sale_invoice_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_sale_maintenance_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_sale_quotation_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_sale_return_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_stock_audit_product_storage_locations",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_stock_audit_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_stock_transfer_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_uom_id",
      "destinationTable": "act_stock_update_products",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "product_variant_group_id",
      "destinationTable": "act_product_variants",
      "sourceColumn": "product_variant_group_id",
      "sourceTable": "act_product_variant_groups"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_inventory_trackings",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_price_change_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_attributes",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_barcodes",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_location_data",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_medias",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_prices",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_reference_urls",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_storage_location_data",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_uoms",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_variants",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_purchase_invoice_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_purchase_order_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_purchase_return_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_sale_invoice_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_sale_maintenance_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_sale_offer_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_sale_quotation_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_sale_return_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_stock_audit_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_stock_transfer_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_stock_update_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_supplier_products",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "purchase_invoice_id",
      "destinationTable": "act_purchase_invoice_chargeable_services",
      "sourceColumn": "purchase_invoice_id",
      "sourceTable": "act_purchase_invoices"
    },
    {
      "destinationColumn": "purchase_invoice_id",
      "destinationTable": "act_purchase_invoice_expenses",
      "sourceColumn": "purchase_invoice_id",
      "sourceTable": "act_purchase_invoices"
    },
    {
      "destinationColumn": "purchase_invoice_id",
      "destinationTable": "act_purchase_invoice_payments",
      "sourceColumn": "purchase_invoice_id",
      "sourceTable": "act_purchase_invoices"
    },
    {
      "destinationColumn": "purchase_invoice_id",
      "destinationTable": "act_purchase_invoice_products",
      "sourceColumn": "purchase_invoice_id",
      "sourceTable": "act_purchase_invoices"
    },
    {
      "destinationColumn": "purchase_invoice_id",
      "destinationTable": "act_purchase_order_expenses",
      "sourceColumn": "purchase_invoice_id",
      "sourceTable": "act_purchase_invoices"
    },
    {
      "destinationColumn": "purchase_invoice_id",
      "destinationTable": "act_purchase_returns",
      "sourceColumn": "purchase_invoice_id",
      "sourceTable": "act_purchase_invoices"
    },
    {
      "destinationColumn": "purchase_order_id",
      "destinationTable": "act_purchase_order_chargeable_services",
      "sourceColumn": "purchase_order_id",
      "sourceTable": "act_purchase_orders"
    },
    {
      "destinationColumn": "purchase_order_id",
      "destinationTable": "act_purchase_order_payments",
      "sourceColumn": "purchase_order_id",
      "sourceTable": "act_purchase_orders"
    },
    {
      "destinationColumn": "purchase_order_id",
      "destinationTable": "act_purchase_order_products",
      "sourceColumn": "purchase_order_id",
      "sourceTable": "act_purchase_orders"
    },
    {
      "destinationColumn": "purchase_return_id",
      "destinationTable": "act_purchase_return_chargeable_services",
      "sourceColumn": "purchase_return_id",
      "sourceTable": "act_purchase_returns"
    },
    {
      "destinationColumn": "purchase_return_id",
      "destinationTable": "act_purchase_return_expenses",
      "sourceColumn": "purchase_return_id",
      "sourceTable": "act_purchase_returns"
    },
    {
      "destinationColumn": "purchase_return_id",
      "destinationTable": "act_purchase_return_payments",
      "sourceColumn": "purchase_return_id",
      "sourceTable": "act_purchase_returns"
    },
    {
      "destinationColumn": "purchase_return_id",
      "destinationTable": "act_purchase_return_products",
      "sourceColumn": "purchase_return_id",
      "sourceTable": "act_purchase_returns"
    },
    {
      "destinationColumn": "purchase_term_id",
      "destinationTable": "act_purchase_invoices",
      "sourceColumn": "purchase_term_id",
      "sourceTable": "act_purchase_terms"
    },
    {
      "destinationColumn": "purchase_term_id",
      "destinationTable": "act_purchase_orders",
      "sourceColumn": "purchase_term_id",
      "sourceTable": "act_purchase_terms"
    },
    {
      "destinationColumn": "sale_coupon_issue_id",
      "destinationTable": "act_sale_coupon_uses",
      "sourceColumn": "sale_coupon_issue_id",
      "sourceTable": "act_sale_coupon_issues"
    },
    {
      "destinationColumn": "sale_coupon_id",
      "destinationTable": "act_sale_coupon_issues",
      "sourceColumn": "sale_coupon_id",
      "sourceTable": "act_sale_coupons"
    },
    {
      "destinationColumn": "sale_coupon_id",
      "destinationTable": "act_sale_coupon_uses",
      "sourceColumn": "sale_coupon_id",
      "sourceTable": "act_sale_coupons"
    },
    {
      "destinationColumn": "sale_invoice_id",
      "destinationTable": "act_sale_invoice_chargable_services",
      "sourceColumn": "sale_invoice_id",
      "sourceTable": "act_sale_invoices"
    },
    {
      "destinationColumn": "sale_invoice_id",
      "destinationTable": "act_sale_invoice_expenses",
      "sourceColumn": "sale_invoice_id",
      "sourceTable": "act_sale_invoices"
    },
    {
      "destinationColumn": "sale_invoice_id",
      "destinationTable": "act_sale_invoice_payments",
      "sourceColumn": "sale_invoice_id",
      "sourceTable": "act_sale_invoices"
    },
    {
      "destinationColumn": "sale_invoice_id",
      "destinationTable": "act_sale_invoice_products",
      "sourceColumn": "sale_invoice_id",
      "sourceTable": "act_sale_invoices"
    },
    {
      "destinationColumn": "sale_invoice_id",
      "destinationTable": "act_sale_maintenances",
      "sourceColumn": "sale_invoice_id",
      "sourceTable": "act_sale_invoices"
    },
    {
      "destinationColumn": "sale_invoice_id",
      "destinationTable": "act_sale_returns",
      "sourceColumn": "sale_invoice_id",
      "sourceTable": "act_sale_invoices"
    },
    {
      "destinationColumn": "sale_maintenance_id",
      "destinationTable": "act_sale_maintenance_chargeable_services",
      "sourceColumn": "sale_maintenance_id",
      "sourceTable": "act_sale_maintenances"
    },
    {
      "destinationColumn": "sale_maintenance_id",
      "destinationTable": "act_sale_maintenance_expenses",
      "sourceColumn": "sale_maintenance_id",
      "sourceTable": "act_sale_maintenances"
    },
    {
      "destinationColumn": "sale_maintenance_id",
      "destinationTable": "act_sale_maintenance_payments",
      "sourceColumn": "sale_maintenance_id",
      "sourceTable": "act_sale_maintenances"
    },
    {
      "destinationColumn": "sale_maintenance_id",
      "destinationTable": "act_sale_maintenance_products",
      "sourceColumn": "sale_maintenance_id",
      "sourceTable": "act_sale_maintenances"
    },
    {
      "destinationColumn": "sale_offer_id",
      "destinationTable": "act_sale_offer_products",
      "sourceColumn": "sale_offer_id",
      "sourceTable": "act_sale_offers"
    },
    {
      "destinationColumn": "sale_quotation_id",
      "destinationTable": "act_sale_quotation_chargeable_services",
      "sourceColumn": "sale_quotation_id",
      "sourceTable": "act_sale_quotations"
    },
    {
      "destinationColumn": "sale_quotation_id",
      "destinationTable": "act_sale_quotation_expenses",
      "sourceColumn": "sale_quotation_id",
      "sourceTable": "act_sale_quotations"
    },
    {
      "destinationColumn": "sale_quotation_id",
      "destinationTable": "act_sale_quotation_products",
      "sourceColumn": "sale_quotation_id",
      "sourceTable": "act_sale_quotations"
    },
    {
      "destinationColumn": "sale_return_id",
      "destinationTable": "act_sale_return_chargeable_services",
      "sourceColumn": "sale_return_id",
      "sourceTable": "act_sale_returns"
    },
    {
      "destinationColumn": "sale_return_id",
      "destinationTable": "act_sale_return_expenses",
      "sourceColumn": "sale_return_id",
      "sourceTable": "act_sale_returns"
    },
    {
      "destinationColumn": "sale_return_id",
      "destinationTable": "act_sale_return_payments",
      "sourceColumn": "sale_return_id",
      "sourceTable": "act_sale_returns"
    },
    {
      "destinationColumn": "sale_return_id",
      "destinationTable": "act_sale_return_products",
      "sourceColumn": "sale_return_id",
      "sourceTable": "act_sale_returns"
    },
    {
      "destinationColumn": "sale_term_id",
      "destinationTable": "act_sale_invoices",
      "sourceColumn": "sale_term_id",
      "sourceTable": "act_sale_terms"
    },
    {
      "destinationColumn": "sale_term_id",
      "destinationTable": "act_sale_quotations",
      "sourceColumn": "sale_term_id",
      "sourceTable": "act_sale_terms"
    },
    {
      "destinationColumn": "stock_audit_product_id",
      "destinationTable": "act_stock_audit_product_storage_locations",
      "sourceColumn": "stock_audit_product_id",
      "sourceTable": "act_stock_audit_products"
    },
    {
      "destinationColumn": "stock_audit_id",
      "destinationTable": "act_stock_audit_products",
      "sourceColumn": "stock_audit_id",
      "sourceTable": "act_stock_audits"
    },
    {
      "destinationColumn": "stock_transfer_packing_id",
      "destinationTable": "act_stock_transfer_packing_products",
      "sourceColumn": "stock_transfer_packing_id",
      "sourceTable": "act_stock_transfer_packings"
    },
    {
      "destinationColumn": "stock_transfer_product_id",
      "destinationTable": "act_stock_transfer_packing_products",
      "sourceColumn": "stock_transfer_product_id",
      "sourceTable": "act_stock_transfer_products"
    },
    {
      "destinationColumn": "stock_transfer_id",
      "destinationTable": "act_stock_transfer_packings",
      "sourceColumn": "stock_transfer_id",
      "sourceTable": "act_stock_transfers"
    },
    {
      "destinationColumn": "stock_transfer_id",
      "destinationTable": "act_stock_transfer_products",
      "sourceColumn": "stock_transfer_id",
      "sourceTable": "act_stock_transfers"
    },
    {
      "destinationColumn": "stock_update_id",
      "destinationTable": "act_stock_update_products",
      "sourceColumn": "stock_update_id",
      "sourceTable": "act_stock_updates"
    },
    {
      "destinationColumn": "storage_location_id",
      "destinationTable": "act_inventory_tracking_entries",
      "sourceColumn": "storage_location_id",
      "sourceTable": "act_storage_locations"
    },
    {
      "destinationColumn": "storage_location_id",
      "destinationTable": "act_product_storage_location_data",
      "sourceColumn": "storage_location_id",
      "sourceTable": "act_storage_locations"
    },
    {
      "destinationColumn": "storage_location_id",
      "destinationTable": "act_stock_audit_product_storage_locations",
      "sourceColumn": "storage_location_id",
      "sourceTable": "act_storage_locations"
    },
    {
      "destinationColumn": "supplier_id",
      "destinationTable": "act_purchase_invoices",
      "sourceColumn": "supplier_id",
      "sourceTable": "act_suppliers"
    },
    {
      "destinationColumn": "supplier_id",
      "destinationTable": "act_purchase_orders",
      "sourceColumn": "supplier_id",
      "sourceTable": "act_suppliers"
    },
    {
      "destinationColumn": "supplier_id",
      "destinationTable": "act_purchase_returns",
      "sourceColumn": "supplier_id",
      "sourceTable": "act_suppliers"
    },
    {
      "destinationColumn": "party_id",
      "destinationTable": "act_party_addresses",
      "sourceColumn": "party_id",
      "sourceTable": "act_parties"
    },
    {
      "destinationColumn": "supplier_id",
      "destinationTable": "act_supplier_chargeable_services",
      "sourceColumn": "supplier_id",
      "sourceTable": "act_suppliers"
    },
    {
      "destinationColumn": "party_id",
      "destinationTable": "act_party_contact_persons",
      "sourceColumn": "party_id",
      "sourceTable": "act_parties"
    },
    {
      "destinationColumn": "party_id",
      "destinationTable": "act_party_email_addresses",
      "sourceColumn": "party_id",
      "sourceTable": "act_parties"
    },
    {
      "destinationColumn": "party_id",
      "destinationTable": "act_party_fax_numbers",
      "sourceColumn": "party_id",
      "sourceTable": "act_parties"
    },
    {
      "destinationColumn": "party_id",
      "destinationTable": "act_party_legal_documents",
      "sourceColumn": "party_id",
      "sourceTable": "act_parties"
    },
    {
      "destinationColumn": "party_id",
      "destinationTable": "act_party_medias",
      "sourceColumn": "party_id",
      "sourceTable": "act_parties"
    },
    {
      "destinationColumn": "party_id",
      "destinationTable": "act_party_phone_numbers",
      "sourceColumn": "party_id",
      "sourceTable": "act_parties"
    },
    {
      "destinationColumn": "supplier_id",
      "destinationTable": "act_supplier_products",
      "sourceColumn": "supplier_id",
      "sourceTable": "act_suppliers"
    },
    {
      "destinationColumn": "party_id",
      "destinationTable": "act_party_websites",
      "sourceColumn": "party_id",
      "sourceTable": "act_parties"
    },
    {
      "destinationColumn": "party_id",
      "destinationTable": "act_party_bank_accounts",
      "sourceColumn": "party_id",
      "sourceTable": "act_parties"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_purchase_invoice_chargeable_services",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_purchase_invoice_products",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_purchase_order_chargeable_services",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_purchase_order_products",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_purchase_return_chargeable_services",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_purchase_return_products",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_sale_invoice_chargable_services",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_sale_invoice_products",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_sale_maintenance_chargeable_services",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_sale_maintenance_products",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_sale_quotation_chargeable_services",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_sale_quotation_products",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_sale_return_chargeable_services",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_sale_return_products",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_tax_parts",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_purchase_invoice_chargeable_services",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_purchase_invoice_products",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_purchase_invoices",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_purchase_order_chargeable_services",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_purchase_order_products",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_purchase_orders",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_purchase_return_chargeable_services",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_purchase_return_products",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_invoice_chargable_services",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_invoice_products",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_invoices",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_maintenance_chargeable_services",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_maintenance_products",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_quotation_chargeable_services",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_quotation_products",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_quotations",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_return_chargeable_services",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_sale_return_products",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_tax_rates",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_asset_depreciations",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_purchase_invoice_expenses",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_purchase_invoice_payments",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_purchase_invoices",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_purchase_order_expenses",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_purchase_order_payments",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_purchase_orders",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_purchase_return_expenses",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_purchase_return_payments",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_purchase_returns",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_coupon_uses",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_invoice_expenses",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_invoice_payments",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_invoices",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_maintenance_expenses",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_maintenance_payments",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_maintenances",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_quotation_expenses",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_return_expenses",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_return_payments",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_sale_returns",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_entry_id",
      "destinationTable": "act_transaction_entry_medias",
      "sourceColumn": "transaction_entry_id",
      "sourceTable": "act_transaction_entries"
    },
    {
      "destinationColumn": "transaction_id",
      "destinationTable": "act_transaction_entries",
      "sourceColumn": "transaction_id",
      "sourceTable": "act_transactions"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_notifications",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_price_changes",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_purchase_invoices",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_purchase_returns",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_sale_invoices",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_sale_maintenances",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_sale_quotations",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_sale_returns",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_signatures",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_stock_audits",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_stock_updates",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "act_user_accountees",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "website_id",
      "destinationTable": "act_accountee_websites",
      "sourceColumn": "website_id",
      "sourceTable": "act_websites"
    },
    {
      "destinationColumn": "website_id",
      "destinationTable": "act_location_websites",
      "sourceColumn": "website_id",
      "sourceTable": "act_websites"
    },
    {
      "destinationColumn": "website_id",
      "destinationTable": "act_party_websites",
      "sourceColumn": "website_id",
      "sourceTable": "act_websites"
    },
    {
      "destinationColumn": "accountee_image_media_id",
      "destinationTable": "act_accountees",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "asset_image_media_id",
      "destinationTable": "act_assets",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "chargeable_service_image_media_id",
      "destinationTable": "act_chargeable_services",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "parent_chargeable_service_id",
      "destinationTable": "act_chargeable_services",
      "sourceColumn": "chargeable_service_id",
      "sourceTable": "act_chargeable_services"
    },
    {
      "destinationColumn": "contact_person_image_media_id",
      "destinationTable": "act_contact_persons",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "device_image_media_id",
      "destinationTable": "act_devices",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "in_uom_id",
      "destinationTable": "act_inventory_tracking_entries",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "out_uom_id",
      "destinationTable": "act_inventory_tracking_entries",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "parent_ledger_account_type_id",
      "destinationTable": "act_ledger_account_types",
      "sourceColumn": "ledger_account_type_id",
      "sourceTable": "act_ledger_account_types"
    },
    {
      "destinationColumn": "location_image_media_id",
      "destinationTable": "act_locations",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "menu_icon_media_id",
      "destinationTable": "act_menu_items",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "notification_icon_media_id",
      "destinationTable": "act_notifications",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "payment_method_image_media_id",
      "destinationTable": "act_payment_methods",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "new_product_price_id",
      "destinationTable": "act_price_change_products",
      "sourceColumn": "product_price_id",
      "sourceTable": "act_product_prices"
    },
    {
      "destinationColumn": "old_product_price_id",
      "destinationTable": "act_price_change_products",
      "sourceColumn": "product_price_id",
      "sourceTable": "act_product_prices"
    },
    {
      "destinationColumn": "product_image_media_id",
      "destinationTable": "act_products",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "product_attribute_media_id",
      "destinationTable": "act_product_attributes",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "parent_product_categroy_id",
      "destinationTable": "act_product_categories",
      "sourceColumn": "product_category_id",
      "sourceTable": "act_product_categories"
    },
    {
      "destinationColumn": "product_category_image_media_id",
      "destinationTable": "act_product_categories",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "purchase_tax_rate_id",
      "destinationTable": "act_product_categories",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "purchase_taxing_scheme_id",
      "destinationTable": "act_product_categories",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "sale_tax_rate_id",
      "destinationTable": "act_product_categories",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "sale_taxing_scheme_id",
      "destinationTable": "act_product_categories",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "asset_attribute_media_id",
      "destinationTable": "act_asset_attributes",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "parent_menu_item_id",
      "destinationTable": "act_menu_items",
      "sourceColumn": "menu_item_id",
      "sourceTable": "act_menu_items"
    },
    {
      "destinationColumn": "inventory_tracking_id",
      "destinationTable": "act_purchase_return_products",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "inventory_tracking_id",
      "destinationTable": "act_sale_return_products",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "signature_media_id",
      "destinationTable": "act_signatures",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "destination_inventory_tracking_id",
      "destinationTable": "act_stock_transfer_products",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "source_inventory_tracking_id",
      "destinationTable": "act_stock_transfer_products",
      "sourceColumn": "inventory_tracking_id",
      "sourceTable": "act_inventory_trackings"
    },
    {
      "destinationColumn": "destination_location_id",
      "destinationTable": "act_stock_transfers",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "destination_user_id",
      "destinationTable": "act_stock_transfers",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "source_location_id",
      "destinationTable": "act_stock_transfers",
      "sourceColumn": "location_id",
      "sourceTable": "act_locations"
    },
    {
      "destinationColumn": "source_user_id",
      "destinationTable": "act_stock_transfers",
      "sourceColumn": "user_id",
      "sourceTable": "act_users"
    },
    {
      "destinationColumn": "parent_storage_location_id",
      "destinationTable": "act_storage_locations",
      "sourceColumn": "storage_location_id",
      "sourceTable": "act_storage_locations"
    },
    {
      "destinationColumn": "storage_location_image_media_id",
      "destinationTable": "act_storage_locations",
      "sourceColumn": "media_name",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "debit_ledger_account_id",
      "destinationTable": "act_transaction_entries",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "credit_ledger_account_id",
      "destinationTable": "act_transaction_entries",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_parties",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_parties",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "customer_id",
      "destinationTable": "act_parties",
      "sourceColumn": "customer_id",
      "sourceTable": "act_customers"
    },
    {
      "destinationColumn": "supplier_id",
      "destinationTable": "act_parties",
      "sourceColumn": "supplier_id",
      "sourceTable": "act_suppliers"
    },
    {
      "destinationColumn": "employee_id",
      "destinationTable": "act_parties",
      "sourceColumn": "employee_id",
      "sourceTable": "act_employees"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_parties",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "party_image_media_id",
      "destinationTable": "act_parties",
      "sourceColumn": "media_id",
      "sourceTable": "act_medias"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_purchase_details",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_sale_details",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "product_id",
      "destinationTable": "act_product_stock_details",
      "sourceColumn": "product_id",
      "sourceTable": "act_products"
    },
    {
      "destinationColumn": "maximum_stock_uom_id",
      "destinationTable": "act_product_stock_details",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "minimum_stock_uom_id",
      "destinationTable": "act_product_stock_details",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "reorder_level_uom_id",
      "destinationTable": "act_product_stock_details",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "stock_uom_id",
      "destinationTable": "act_product_stock_details",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_product_sale_details",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "sale_uom_id",
      "destinationTable": "act_product_sale_details",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "minimum_order_quantity_uom_id",
      "destinationTable": "act_product_purchase_details",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_product_purchase_details",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "purchase_uom_id",
      "destinationTable": "act_product_purchase_details",
      "sourceColumn": "product_uom_id",
      "sourceTable": "act_product_uoms"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_product_purchase_details",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_product_sale_details",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "currency_code",
      "destinationTable": "act_accountees",
      "sourceColumn": "currency_code",
      "sourceTable": "act_currencies"
    },
    {
      "destinationColumn": "ledger_account_id",
      "destinationTable": "act_ledger_account_mappings",
      "sourceColumn": "ledger_account_id",
      "sourceTable": "act_ledger_accounts"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "act_ledger_account_mappings",
      "sourceColumn": "accountee_id",
      "sourceTable": "act_accountees"
    },
    {
      "destinationColumn": "taxing_scheme_id",
      "destinationTable": "act_transactions",
      "sourceColumn": "taxing_scheme_id",
      "sourceTable": "act_taxing_schemes"
    },
    {
      "destinationColumn": "tax_rate_id",
      "destinationTable": "act_transactions",
      "sourceColumn": "tax_rate_id",
      "sourceTable": "act_tax_rates"
    },
    {
      "destinationColumn": "product_barcode_id",
      "destinationTable": "act_product_sale_details",
      "sourceColumn": "product_barcode_id",
      "sourceTable": "act_product_barcodes"
    },
    {
      "destinationColumn": "debit_payment_method_id",
      "destinationTable": "act_transaction_entries",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    },
    {
      "destinationColumn": "credit_payment_method_id",
      "destinationTable": "act_transaction_entries",
      "sourceColumn": "payment_method_id",
      "sourceTable": "act_payment_methods"
    }
  ],
  "storedProcedures": {},
  "functions": {},
  "triggers": {
    "act_trg_set_accountee_addresses_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_accountee_addresses",
      "triggerName": "act_trg_set_accountee_addresses_on_delete",
      "triggerCode": "UPDATE act_accountees SET addresses = (SELECT GROUP_CONCAT(DISTINCT TRIM(COALESCE(address_line_1, '') || CASE WHEN TRIM(COALESCE(address_line_2, '')) <> '' THEN ', ' || TRIM(address_line_2) ELSE '' END || CASE WHEN TRIM(COALESCE(postal_code, '')) <> '' THEN ', ' || TRIM(postal_code) ELSE '' END || CASE WHEN TRIM(COALESCE(city_name, '')) <> '' THEN ', ' || TRIM(city_name) ELSE '' END || CASE WHEN TRIM(COALESCE(state_name, '')) <> '' THEN ', ' || TRIM(state_name) ELSE '' END || CASE WHEN TRIM(COALESCE(country_name, '')) <> '' THEN ', ' || TRIM(country_name) ELSE '' END )) FROM act_addresses WHERE address_line_1 IS NOT NULL AND TRIM(address_line_1) <> '' AND address_id IN (SELECT address_id FROM act_accountee_addresses WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_addresses_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_accountee_addresses",
      "triggerName": "act_trg_set_accountee_addresses_on_insert",
      "triggerCode": "UPDATE act_accountees SET addresses = (SELECT GROUP_CONCAT(DISTINCT TRIM(COALESCE(address_line_1, '') || CASE WHEN TRIM(COALESCE(address_line_2, '')) <> '' THEN ', ' || TRIM(address_line_2) ELSE '' END || CASE WHEN TRIM(COALESCE(postal_code, '')) <> '' THEN ', ' || TRIM(postal_code) ELSE '' END || CASE WHEN TRIM(COALESCE(city_name, '')) <> '' THEN ', ' || TRIM(city_name) ELSE '' END || CASE WHEN TRIM(COALESCE(state_name, '')) <> '' THEN ', ' || TRIM(state_name) ELSE '' END || CASE WHEN TRIM(COALESCE(country_name, '')) <> '' THEN ', ' || TRIM(country_name) ELSE '' END )) FROM act_addresses WHERE address_line_1 IS NOT NULL AND TRIM(address_line_1) <> '' AND address_id IN (SELECT address_id FROM act_accountee_addresses WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id;"
    },
    "act_trg_set_accountee_addresses_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_accountee_addresses",
      "triggerName": "act_trg_set_accountee_addresses_on_update",
      "triggerCode": "UPDATE act_accountees SET addresses = (SELECT GROUP_CONCAT(DISTINCT TRIM(COALESCE(address_line_1, '') || CASE WHEN TRIM(COALESCE(address_line_2, '')) <> '' THEN ', ' || TRIM(address_line_2) ELSE '' END || CASE WHEN TRIM(COALESCE(postal_code, '')) <> '' THEN ', ' || TRIM(postal_code) ELSE '' END || CASE WHEN TRIM(COALESCE(city_name, '')) <> '' THEN ', ' || TRIM(city_name) ELSE '' END || CASE WHEN TRIM(COALESCE(state_name, '')) <> '' THEN ', ' || TRIM(state_name) ELSE '' END || CASE WHEN TRIM(COALESCE(country_name, '')) <> '' THEN ', ' || TRIM(country_name) ELSE '' END )) FROM act_addresses WHERE address_line_1 IS NOT NULL AND TRIM(address_line_1) <> '' AND address_id IN (SELECT address_id FROM act_accountee_addresses WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id; UPDATE act_accountees SET addresses = (SELECT GROUP_CONCAT(DISTINCT TRIM(COALESCE(address_line_1, '') || CASE WHEN TRIM(COALESCE(address_line_2, '')) <> '' THEN ', ' || TRIM(address_line_2) ELSE '' END || CASE WHEN TRIM(COALESCE(postal_code, '')) <> '' THEN ', ' || TRIM(postal_code) ELSE '' END || CASE WHEN TRIM(COALESCE(city_name, '')) <> '' THEN ', ' || TRIM(city_name) ELSE '' END || CASE WHEN TRIM(COALESCE(state_name, '')) <> '' THEN ', ' || TRIM(state_name) ELSE '' END || CASE WHEN TRIM(COALESCE(country_name, '')) <> '' THEN ', ' || TRIM(country_name) ELSE '' END )) FROM act_addresses WHERE address_line_1 IS NOT NULL AND TRIM(address_line_1) <> '' AND address_id IN (SELECT address_id FROM act_accountee_addresses WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_bank_accounts_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_accountee_bank_accounts",
      "triggerName": "act_trg_set_accountee_bank_accounts_on_delete",
      "triggerCode": "UPDATE act_accountees SET bank_accounts = (SELECT GROUP_CONCAT(DISTINCT account_number || '[' || bank_name || ']') FROM act_bank_accounts WHERE account_number IS NOT NULL AND TRIM(account_number) <> '' AND bank_account_id IN (SELECT bank_account_id FROM act_accountee_bank_accounts WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_bank_accounts_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_accountee_bank_accounts",
      "triggerName": "act_trg_set_accountee_bank_accounts_on_insert",
      "triggerCode": "UPDATE act_accountees SET bank_accounts = (SELECT GROUP_CONCAT(DISTINCT account_number || '[' || bank_name || ']') FROM act_bank_accounts WHERE account_number IS NOT NULL AND TRIM(account_number) <> '' AND bank_account_id IN (SELECT bank_account_id FROM act_accountee_bank_accounts WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id;"
    },
    "act_trg_set_accountee_bank_accounts_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_accountee_bank_accounts",
      "triggerName": "act_trg_set_accountee_bank_accounts_on_update",
      "triggerCode": "UPDATE act_accountees SET bank_accounts = (SELECT GROUP_CONCAT(DISTINCT account_number || '[' || bank_name || ']') FROM act_bank_accounts WHERE account_number IS NOT NULL AND TRIM(account_number) <> '' AND bank_account_id IN (SELECT bank_account_id FROM act_accountee_bank_accounts WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id; UPDATE act_accountees SET bank_accounts = (SELECT GROUP_CONCAT(DISTINCT account_number || '[' || bank_name || ']') FROM act_bank_accounts WHERE account_number IS NOT NULL AND TRIM(account_number) <> '' AND bank_account_id IN (SELECT bank_account_id FROM act_accountee_bank_accounts WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_email_addresses_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_accountee_email_addresses",
      "triggerName": "act_trg_set_accountee_email_addresses_on_delete",
      "triggerCode": "UPDATE act_accountees SET email_addresses = (SELECT GROUP_CONCAT(DISTINCT email_address_value) FROM act_email_addresses WHERE email_address_value IS NOT NULL AND TRIM(email_address_value) <> '' AND email_address_id IN (SELECT email_address_id FROM act_accountee_email_addresses WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_email_addresses_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_accountee_email_addresses",
      "triggerName": "act_trg_set_accountee_email_addresses_on_insert",
      "triggerCode": "UPDATE act_accountees SET email_addresses = (SELECT GROUP_CONCAT(DISTINCT email_address_value) FROM act_email_addresses WHERE email_address_value IS NOT NULL AND TRIM(email_address_value) <> '' AND email_address_id IN (SELECT email_address_id FROM act_accountee_email_addresses WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id;"
    },
    "act_trg_set_accountee_email_addresses_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_accountee_email_addresses",
      "triggerName": "act_trg_set_accountee_email_addresses_on_update",
      "triggerCode": "UPDATE act_accountees SET email_addresses = (SELECT GROUP_CONCAT(DISTINCT email_address_value) FROM act_email_addresses WHERE email_address_value IS NOT NULL AND TRIM(email_address_value) <> '' AND email_address_id IN (SELECT email_address_id FROM act_accountee_email_addresses WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id; UPDATE act_accountees SET email_addresses = (SELECT GROUP_CONCAT(DISTINCT email_address_value) FROM act_email_addresses WHERE email_address_value IS NOT NULL AND TRIM(email_address_value) <> '' AND email_address_id IN (SELECT email_address_id FROM act_accountee_email_addresses WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_fax_numbers_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_accountee_fax_numbers",
      "triggerName": "act_trg_set_accountee_fax_numbers_on_delete",
      "triggerCode": "UPDATE act_accountees SET fax_numbers = (SELECT GROUP_CONCAT(DISTINCT fax_number_value) FROM act_fax_numbers WHERE fax_number_value IS NOT NULL AND TRIM(fax_number_value) <> '' AND fax_number_id IN (SELECT fax_number_id FROM act_accountee_fax_numbers WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_fax_numbers_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_accountee_fax_numbers",
      "triggerName": "act_trg_set_accountee_fax_numbers_on_insert",
      "triggerCode": "UPDATE act_accountees SET fax_numbers = (SELECT GROUP_CONCAT(DISTINCT fax_number_value) FROM act_fax_numbers WHERE fax_number_value IS NOT NULL AND TRIM(fax_number_value) <> '' AND fax_number_id IN (SELECT fax_number_id FROM act_accountee_fax_numbers WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id;"
    },
    "act_trg_set_accountee_fax_numbers_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_accountee_fax_numbers",
      "triggerName": "act_trg_set_accountee_fax_numbers_on_update",
      "triggerCode": "UPDATE act_accountees SET fax_numbers = (SELECT GROUP_CONCAT(DISTINCT fax_number_value) FROM act_fax_numbers WHERE fax_number_value IS NOT NULL AND TRIM(fax_number_value) <> '' AND fax_number_id IN (SELECT fax_number_id FROM act_accountee_fax_numbers WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id; UPDATE act_accountees SET fax_numbers = (SELECT GROUP_CONCAT(DISTINCT fax_number_value) FROM act_fax_numbers WHERE fax_number_value IS NOT NULL AND TRIM(fax_number_value) <> '' AND fax_number_id IN (SELECT fax_number_id FROM act_accountee_fax_numbers WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_phone_numbers_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_accountee_phone_numbers",
      "triggerName": "act_trg_set_accountee_phone_numbers_on_delete",
      "triggerCode": "UPDATE act_accountees SET phone_numbers = (SELECT GROUP_CONCAT(DISTINCT phone_number_value) FROM act_phone_numbers WHERE phone_number_value IS NOT NULL AND TRIM(phone_number_value) <> '' AND phone_number_id IN (SELECT phone_number_id FROM act_accountee_phone_numbers WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_phone_numbers_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_accountee_phone_numbers",
      "triggerName": "act_trg_set_accountee_phone_numbers_on_insert",
      "triggerCode": "UPDATE act_accountees SET phone_numbers = (SELECT GROUP_CONCAT(DISTINCT phone_number_value) FROM act_phone_numbers WHERE phone_number_value IS NOT NULL AND TRIM(phone_number_value) <> '' AND phone_number_id IN (SELECT phone_number_id FROM act_accountee_phone_numbers WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id;"
    },
    "act_trg_set_accountee_phone_numbers_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_accountee_phone_numbers",
      "triggerName": "act_trg_set_accountee_phone_numbers_on_update",
      "triggerCode": "UPDATE act_accountees SET phone_numbers = (SELECT GROUP_CONCAT(DISTINCT phone_number_value) FROM act_phone_numbers WHERE phone_number_value IS NOT NULL AND TRIM(phone_number_value) <> '' AND phone_number_id IN (SELECT phone_number_id FROM act_accountee_phone_numbers WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id; UPDATE act_accountees SET phone_numbers = (SELECT GROUP_CONCAT(DISTINCT phone_number_value) FROM act_phone_numbers WHERE phone_number_value IS NOT NULL AND TRIM(phone_number_value) <> '' AND phone_number_id IN (SELECT phone_number_id FROM act_accountee_phone_numbers WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_websites_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_accountee_websites",
      "triggerName": "act_trg_set_accountee_websites_on_delete",
      "triggerCode": "UPDATE act_accountees SET websites = (SELECT GROUP_CONCAT(DISTINCT website_value) FROM act_websites WHERE website_value IS NOT NULL AND TRIM(website_value) <> '' AND website_id IN (SELECT website_id FROM act_accountee_websites WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_accountee_websites_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_accountee_websites",
      "triggerName": "act_trg_set_accountee_websites_on_insert",
      "triggerCode": "UPDATE act_accountees SET websites = (SELECT GROUP_CONCAT(DISTINCT website_value) FROM act_websites WHERE website_value IS NOT NULL AND TRIM(website_value) <> '' AND website_id IN (SELECT website_id FROM act_accountee_websites WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id;"
    },
    "act_trg_set_accountee_websites_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_accountee_websites",
      "triggerName": "act_trg_set_accountee_websites_on_update",
      "triggerCode": "UPDATE act_accountees SET websites = (SELECT GROUP_CONCAT(DISTINCT website_value) FROM act_websites WHERE website_value IS NOT NULL AND TRIM(website_value) <> '' AND website_id IN (SELECT website_id FROM act_accountee_websites WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = NEW.accountee_id; UPDATE act_accountees SET websites = (SELECT GROUP_CONCAT(DISTINCT website_value) FROM act_websites WHERE website_value IS NOT NULL AND TRIM(website_value) <> '' AND website_id IN (SELECT website_id FROM act_accountee_websites WHERE accountee_id = act_accountees.accountee_id)) WHERE accountee_id = OLD.accountee_id;"
    },
    "act_trg_set_party_addresses_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_party_addresses",
      "triggerName": "act_trg_set_party_addresses_on_delete",
      "triggerCode": "UPDATE act_parties SET addresses = (SELECT GROUP_CONCAT(DISTINCT TRIM(COALESCE(address_line_1, '') || CASE WHEN TRIM(COALESCE(address_line_2, '')) <> '' THEN ', ' || TRIM(address_line_2) ELSE '' END || CASE WHEN TRIM(COALESCE(postal_code, '')) <> '' THEN ', ' || TRIM(postal_code) ELSE '' END || CASE WHEN TRIM(COALESCE(city_name, '')) <> '' THEN ', ' || TRIM(city_name) ELSE '' END || CASE WHEN TRIM(COALESCE(state_name, '')) <> '' THEN ', ' || TRIM(state_name) ELSE '' END || CASE WHEN TRIM(COALESCE(country_name, '')) <> '' THEN ', ' || TRIM(country_name) ELSE '' END )) FROM act_addresses WHERE address_line_1 IS NOT NULL AND TRIM(address_line_1) <> '' AND address_id IN (SELECT address_id FROM act_party_addresses WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_addresses_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_party_addresses",
      "triggerName": "act_trg_set_party_addresses_on_insert",
      "triggerCode": "UPDATE act_parties SET addresses = (SELECT GROUP_CONCAT(DISTINCT TRIM(COALESCE(address_line_1, '') || CASE WHEN TRIM(COALESCE(address_line_2, '')) <> '' THEN ', ' || TRIM(address_line_2) ELSE '' END || CASE WHEN TRIM(COALESCE(postal_code, '')) <> '' THEN ', ' || TRIM(postal_code) ELSE '' END || CASE WHEN TRIM(COALESCE(city_name, '')) <> '' THEN ', ' || TRIM(city_name) ELSE '' END || CASE WHEN TRIM(COALESCE(state_name, '')) <> '' THEN ', ' || TRIM(state_name) ELSE '' END || CASE WHEN TRIM(COALESCE(country_name, '')) <> '' THEN ', ' || TRIM(country_name) ELSE '' END )) FROM act_addresses WHERE address_line_1 IS NOT NULL AND TRIM(address_line_1) <> '' AND address_id IN (SELECT address_id FROM act_party_addresses WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;"
    },
    "act_trg_set_party_addresses_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_party_addresses",
      "triggerName": "act_trg_set_party_addresses_on_update",
      "triggerCode": "UPDATE act_parties SET addresses = (SELECT GROUP_CONCAT(DISTINCT TRIM(COALESCE(address_line_1, '') || CASE WHEN TRIM(COALESCE(address_line_2, '')) <> '' THEN ', ' || TRIM(address_line_2) ELSE '' END || CASE WHEN TRIM(COALESCE(postal_code, '')) <> '' THEN ', ' || TRIM(postal_code) ELSE '' END || CASE WHEN TRIM(COALESCE(city_name, '')) <> '' THEN ', ' || TRIM(city_name) ELSE '' END || CASE WHEN TRIM(COALESCE(state_name, '')) <> '' THEN ', ' || TRIM(state_name) ELSE '' END || CASE WHEN TRIM(COALESCE(country_name, '')) <> '' THEN ', ' || TRIM(country_name) ELSE '' END )) FROM act_addresses WHERE address_line_1 IS NOT NULL AND TRIM(address_line_1) <> '' AND address_id IN (SELECT address_id FROM act_party_addresses WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;   UPDATE act_parties SET addresses = (SELECT GROUP_CONCAT(DISTINCT TRIM(COALESCE(address_line_1, '') || CASE WHEN TRIM(COALESCE(address_line_2, '')) <> '' THEN ', ' || TRIM(address_line_2) ELSE '' END || CASE WHEN TRIM(COALESCE(postal_code, '')) <> '' THEN ', ' || TRIM(postal_code) ELSE '' END || CASE WHEN TRIM(COALESCE(city_name, '')) <> '' THEN ', ' || TRIM(city_name) ELSE '' END || CASE WHEN TRIM(COALESCE(state_name, '')) <> '' THEN ', ' || TRIM(state_name) ELSE '' END || CASE WHEN TRIM(COALESCE(country_name, '')) <> '' THEN ', ' || TRIM(country_name) ELSE '' END )) FROM act_addresses WHERE address_line_1 IS NOT NULL AND TRIM(address_line_1) <> '' AND address_id IN (SELECT address_id FROM act_party_addresses WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_bank_accounts_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_party_bank_accounts",
      "triggerName": "act_trg_set_party_bank_accounts_on_delete",
      "triggerCode": "UPDATE act_parties SET bank_accounts = (SELECT GROUP_CONCAT(DISTINCT account_number || '[' || bank_name || ']') FROM act_bank_accounts WHERE account_number IS NOT NULL AND TRIM(account_number) <> '' AND bank_account_id IN (SELECT bank_account_id FROM act_party_bank_accounts WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_bank_accounts_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_party_bank_accounts",
      "triggerName": "act_trg_set_party_bank_accounts_on_insert",
      "triggerCode": "UPDATE act_parties SET bank_accounts = (SELECT GROUP_CONCAT(DISTINCT account_number || '[' || bank_name || ']') FROM act_bank_accounts WHERE account_number IS NOT NULL AND TRIM(account_number) <> '' AND bank_account_id IN (SELECT bank_account_id FROM act_party_bank_accounts WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;"
    },
    "act_trg_set_party_bank_accounts_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_party_bank_accounts",
      "triggerName": "act_trg_set_party_bank_accounts_on_update",
      "triggerCode": "UPDATE act_parties SET bank_accounts = (SELECT GROUP_CONCAT(DISTINCT account_number || '[' || bank_name || ']') FROM act_bank_accounts WHERE account_number IS NOT NULL AND TRIM(account_number) <> '' AND bank_account_id IN (SELECT bank_account_id FROM act_party_bank_accounts WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;   UPDATE act_parties SET bank_accounts = (SELECT GROUP_CONCAT(DISTINCT account_number || '[' || bank_name || ']') FROM act_bank_accounts WHERE account_number IS NOT NULL AND TRIM(account_number) <> '' AND bank_account_id IN (SELECT bank_account_id FROM act_party_bank_accounts WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_email_addresses_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_party_email_addresses",
      "triggerName": "act_trg_set_party_email_addresses_on_delete",
      "triggerCode": "UPDATE act_parties SET email_addresses = (SELECT GROUP_CONCAT(DISTINCT email_address_value) FROM act_email_addresses WHERE email_address_value IS NOT NULL AND TRIM(email_address_value) <> '' AND email_address_id IN (SELECT email_address_id FROM act_party_email_addresses WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_email_addresses_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_party_email_addresses",
      "triggerName": "act_trg_set_party_email_addresses_on_insert",
      "triggerCode": "UPDATE act_parties SET email_addresses = (SELECT GROUP_CONCAT(DISTINCT email_address_value) FROM act_email_addresses WHERE email_address_value IS NOT NULL AND TRIM(email_address_value) <> '' AND email_address_id IN (SELECT email_address_id FROM act_party_email_addresses WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;"
    },
    "act_trg_set_party_email_addresses_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_party_email_addresses",
      "triggerName": "act_trg_set_party_email_addresses_on_update",
      "triggerCode": "UPDATE act_parties SET email_addresses = (SELECT GROUP_CONCAT(DISTINCT email_address_value) FROM act_email_addresses WHERE email_address_value IS NOT NULL AND TRIM(email_address_value) <> '' AND email_address_id IN (SELECT email_address_id FROM act_party_email_addresses WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;   UPDATE act_parties SET email_addresses = (SELECT GROUP_CONCAT(DISTINCT email_address_value) FROM act_email_addresses WHERE email_address_value IS NOT NULL AND TRIM(email_address_value) <> '' AND email_address_id IN (SELECT email_address_id FROM act_party_email_addresses WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_fax_numbers_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_party_fax_numbers",
      "triggerName": "act_trg_set_party_fax_numbers_on_delete",
      "triggerCode": "UPDATE act_parties SET fax_numbers = (SELECT GROUP_CONCAT(DISTINCT fax_number_value) FROM act_fax_numbers WHERE fax_number_value IS NOT NULL AND TRIM(fax_number_value) <> '' AND fax_number_id IN (SELECT fax_number_id FROM act_party_fax_numbers WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_fax_numbers_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_party_fax_numbers",
      "triggerName": "act_trg_set_party_fax_numbers_on_insert",
      "triggerCode": "UPDATE act_parties SET fax_numbers = (SELECT GROUP_CONCAT(DISTINCT fax_number_value) FROM act_fax_numbers WHERE fax_number_value IS NOT NULL AND TRIM(fax_number_value) <> '' AND fax_number_id IN (SELECT fax_number_id FROM act_party_fax_numbers WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;"
    },
    "act_trg_set_party_fax_numbers_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_party_fax_numbers",
      "triggerName": "act_trg_set_party_fax_numbers_on_update",
      "triggerCode": "UPDATE act_parties SET fax_numbers = (SELECT GROUP_CONCAT(DISTINCT fax_number_value) FROM act_fax_numbers WHERE fax_number_value IS NOT NULL AND TRIM(fax_number_value) <> '' AND fax_number_id IN (SELECT fax_number_id FROM act_party_fax_numbers WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;   UPDATE act_parties SET fax_numbers = (SELECT GROUP_CONCAT(DISTINCT fax_number_value) FROM act_fax_numbers WHERE fax_number_value IS NOT NULL AND TRIM(fax_number_value) <> '' AND fax_number_id IN (SELECT fax_number_id FROM act_party_fax_numbers WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_phone_numbers_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_party_phone_numbers",
      "triggerName": "act_trg_set_party_phone_numbers_on_delete",
      "triggerCode": "UPDATE act_parties SET phone_numbers = (SELECT GROUP_CONCAT(DISTINCT phone_number_value) FROM act_phone_numbers WHERE phone_number_value IS NOT NULL AND TRIM(phone_number_value) <> '' AND phone_number_id IN (SELECT phone_number_id FROM act_party_phone_numbers WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_phone_numbers_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_party_phone_numbers",
      "triggerName": "act_trg_set_party_phone_numbers_on_insert",
      "triggerCode": "UPDATE act_parties SET phone_numbers = (SELECT GROUP_CONCAT(DISTINCT phone_number_value) FROM act_phone_numbers WHERE phone_number_value IS NOT NULL AND TRIM(phone_number_value) <> '' AND phone_number_id IN (SELECT phone_number_id FROM act_party_phone_numbers WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;"
    },
    "act_trg_set_party_phone_numbers_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_party_phone_numbers",
      "triggerName": "act_trg_set_party_phone_numbers_on_update",
      "triggerCode": "UPDATE act_parties SET phone_numbers = (SELECT GROUP_CONCAT(DISTINCT phone_number_value) FROM act_phone_numbers WHERE phone_number_value IS NOT NULL AND TRIM(phone_number_value) <> '' AND phone_number_id IN (SELECT phone_number_id FROM act_party_phone_numbers WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;   UPDATE act_parties SET phone_numbers = (SELECT GROUP_CONCAT(DISTINCT phone_number_value) FROM act_phone_numbers WHERE phone_number_value IS NOT NULL AND TRIM(phone_number_value) <> '' AND phone_number_id IN (SELECT phone_number_id FROM act_party_phone_numbers WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_websites_on_delete": {
      "triggerExecution": "AFTER",
      "rowOperation": "DELETE",
      "tableName": "act_party_websites",
      "triggerName": "act_trg_set_party_websites_on_delete",
      "triggerCode": "UPDATE act_parties SET websites = (SELECT GROUP_CONCAT(DISTINCT website_value) FROM act_websites WHERE website_value IS NOT NULL AND TRIM(website_value) <> '' AND website_id IN (SELECT website_id FROM act_party_websites WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    },
    "act_trg_set_party_websites_on_insert": {
      "triggerExecution": "AFTER",
      "rowOperation": "INSERT",
      "tableName": "act_party_websites",
      "triggerName": "act_trg_set_party_websites_on_insert",
      "triggerCode": "UPDATE act_parties SET websites = (SELECT GROUP_CONCAT(DISTINCT website_value) FROM act_websites WHERE website_value IS NOT NULL AND TRIM(website_value) <> '' AND website_id IN (SELECT website_id FROM act_party_websites WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;"
    },
    "act_trg_set_party_websites_on_update": {
      "triggerExecution": "AFTER",
      "rowOperation": "UPDATE",
      "tableName": "act_party_websites",
      "triggerName": "act_trg_set_party_websites_on_update",
      "triggerCode": "UPDATE act_parties SET websites = (SELECT GROUP_CONCAT(DISTINCT website_value) FROM act_websites WHERE website_value IS NOT NULL AND TRIM(website_value) <> '' AND website_id IN (SELECT website_id FROM act_party_websites WHERE party_id = act_parties.party_id)) WHERE party_id = NEW.party_id;   UPDATE act_parties SET websites = (SELECT GROUP_CONCAT(DISTINCT website_value) FROM act_websites WHERE website_value IS NOT NULL AND TRIM(website_value) <> '' AND website_id IN (SELECT website_id FROM act_party_websites WHERE party_id = act_parties.party_id)) WHERE party_id = OLD.party_id;"
    }
  }
};
