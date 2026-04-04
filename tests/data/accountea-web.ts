export const dataDictionaryJson = {
  "name": "Accountea - Web",
  "version": 0,
  "tables": {
    "accountees": {
      "tableName": "accountees",
      "tableColumns": {
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "accountee_name": {
          "columnName": "accountee_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee Name"
            },
            "REQUIRED": {
              "propertyName": "REQUIRED",
              "propertyValue": true
            }
          }
        },
        "accountee_profile_image_media_id": {
          "columnName": "accountee_profile_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee Profile Image"
            }
          }
        },
        "accountee_type": {
          "columnName": "accountee_type",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee Type"
            }
          }
        }
      },
      "tableProperties": {
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
    "applications": {
      "tableName": "applications",
      "tableColumns": {
        "application_id": {
          "columnName": "application_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Application Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "application_name": {
          "columnName": "application_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Application Name"
            }
          }
        },
        "application_identifier": {
          "columnName": "application_identifier",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Application Identifier"
            }
          }
        },
        "current_version_number": {
          "columnName": "current_version_number",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Current Version Number"
            }
          }
        },
        "current_version_label": {
          "columnName": "current_version_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Current Version Label"
            }
          }
        },
        "last_updated_on": {
          "columnName": "last_updated_on",
          "columnType": "TIMESTAMP",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Last Updated On"
            }
          }
        },
        "application_image_media_id": {
          "columnName": "application_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Application Image"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "applications"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "application"
        }
      }
    },
    "developers": {
      "tableName": "developers",
      "tableColumns": {
        "developer_id": {
          "columnName": "developer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Developer Id"
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
            }
          }
        },
        "developer_name": {
          "columnName": "developer_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Developer Name"
            }
          }
        },
        "developer_profile_image_media_id": {
          "columnName": "developer_profile_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "developers"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "developer"
        }
      }
    },
    "devices": {
      "tableName": "devices",
      "tableColumns": {
        "device_id": {
          "columnName": "device_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Device"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "device_unique_identifier": {
          "columnName": "device_unique_identifier",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Device Unique Identifier"
            }
          }
        },
        "device_type": {
          "columnName": "device_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Device Type"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "devices"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "device"
        }
      }
    },
    "extensions": {
      "tableName": "extensions",
      "tableColumns": {
        "extension_id": {
          "columnName": "extension_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Extension Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "extension_name": {
          "columnName": "extension_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Extension Name"
            }
          }
        },
        "extension_identifier": {
          "columnName": "extension_identifier",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Extension Identifier"
            },
            "UNIQUE_KEY": {
              "propertyName": "UNIQUE_KEY",
              "propertyValue": true
            }
          }
        },
        "extension_type": {
          "columnName": "extension_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Extension Type"
            }
          }
        },
        "developer_id": {
          "columnName": "developer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Developer"
            }
          }
        },
        "current_version_number": {
          "columnName": "current_version_number",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Version Number"
            }
          }
        },
        "current_version_label": {
          "columnName": "current_version_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Version"
            }
          }
        },
        "extension_archive_url": {
          "columnName": "extension_archive_url",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Extension Url"
            }
          }
        },
        "last_updated_on": {
          "columnName": "last_updated_on",
          "columnType": "TIMESTAMP",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Updated At"
            }
          }
        },
        "extension_image_media_id": {
          "columnName": "extension_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Extension Image"
            }
          }
        },
        "quick_description": {
          "columnName": "quick_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Quick Description"
            }
          }
        },
        "full_description": {
          "columnName": "full_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Full Description"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "extensions"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "extension"
        }
      }
    },
    "medias": {
      "tableName": "medias",
      "tableColumns": {
        "display_index": {
          "columnName": "display_index",
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
            },
            "DEFAULT_VALUE": {
              "propertyName": "DEFAULT_VALUE",
              "propertyValue": "0"
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
        },
        "media_remarks": {
          "columnName": "media_remarks",
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
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "medias"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "media"
        }
      }
    },
    "user_accountees": {
      "tableName": "user_accountees",
      "tableColumns": {
        "user_accountee_id": {
          "columnName": "user_accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User Accountee iD"
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
        "accountee_id": {
          "columnName": "accountee_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Accountee"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "user_accountees"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "user_accountee"
        }
      }
    },
    "user_devices": {
      "tableName": "user_devices",
      "tableColumns": {
        "user_device_id": {
          "columnName": "user_device_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User Device ID"
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
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "user_devices"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "user_device"
        }
      }
    },
    "users": {
      "tableName": "users",
      "tableColumns": {
        "user_id": {
          "columnName": "user_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "User Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "name": {
          "columnName": "name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Name"
            }
          }
        },
        "mobile_no": {
          "columnName": "mobile_no",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Mobile"
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
            }
          }
        },
        "email_address": {
          "columnName": "email_address",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Address"
            }
          }
        },
        "user_profile_image_media_id": {
          "columnName": "user_profile_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "users"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "user"
        }
      }
    },
    "report_formats": {
      "tableName": "report_formats",
      "tableColumns": {
        "report_format_id": {
          "columnName": "report_format_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Report Format Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "report_format_name": {
          "columnName": "report_format_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Report Format Name"
            }
          }
        },
        "report_format_label": {
          "columnName": "report_format_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Report Format Label"
            }
          }
        },
        "current_version_label": {
          "columnName": "current_version_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Version"
            }
          }
        },
        "current_version_number": {
          "columnName": "current_version_number",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Version Number"
            }
          }
        },
        "last_updated_on": {
          "columnName": "last_updated_on",
          "columnType": "TIMESTAMP",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Updated On"
            }
          }
        },
        "report_format_json": {
          "columnName": "report_format_json",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Report Format Json"
            }
          }
        },
        "developer_id": {
          "columnName": "developer_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Developer"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "report_formats"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "report_format"
        }
      }
    }
  },
  "relationships": [
    {
      "destinationColumn": "developer_id",
      "destinationTable": "extensions",
      "sourceColumn": "developer_id",
      "sourceTable": "developers"
    },
    {
      "destinationColumn": "extension_image_media_id",
      "destinationTable": "extensions",
      "sourceColumn": "media_id",
      "sourceTable": "medias"
    },
    {
      "destinationColumn": "user_profile_image_media_id",
      "destinationTable": "users",
      "sourceColumn": "media_id",
      "sourceTable": "medias"
    },
    {
      "destinationColumn": "accountee_profile_image_media_id",
      "destinationTable": "accountees",
      "sourceColumn": "media_id",
      "sourceTable": "medias"
    },
    {
      "destinationColumn": "application_image_media_id",
      "destinationTable": "applications",
      "sourceColumn": "media_id",
      "sourceTable": "medias"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "user_accountees",
      "sourceColumn": "user_id",
      "sourceTable": "users"
    },
    {
      "cascadeDeleteSource": false,
      "destinationColumn": "device_id",
      "destinationTable": "user_accountees",
      "sourceColumn": "device_id",
      "sourceTable": "devices"
    },
    {
      "destinationColumn": "accountee_id",
      "destinationTable": "user_accountees",
      "sourceColumn": "accountee_id",
      "sourceTable": "accountees"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "user_devices",
      "sourceColumn": "user_id",
      "sourceTable": "users"
    },
    {
      "destinationColumn": "device_id",
      "destinationTable": "user_devices",
      "sourceColumn": "device_id",
      "sourceTable": "devices"
    },
    {
      "destinationColumn": "user_id",
      "destinationTable": "developers",
      "sourceColumn": "user_id",
      "sourceTable": "users"
    },
    {
      "destinationColumn": "developer_id",
      "destinationTable": "report_formats",
      "sourceColumn": "developer_id",
      "sourceTable": "developers"
    },
    {
      "destinationColumn": "developer_id",
      "destinationTable": "developers",
      "sourceColumn": "media_id",
      "sourceTable": "medias"
    }
  ]
};
