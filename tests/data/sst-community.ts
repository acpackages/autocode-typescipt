export const dataDictionaryJson = {
  "name": "Community App",
  "version": 0,
  "tables": {
    "addresses": {
      "tableName": "addresses",
      "tableColumns": {
        "address_line_1": {
          "columnName": "address_line_1",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Line 1"
            },
            "USE_FOR_ROW_LIKE_FILTER": {
              "propertyName": "USE_FOR_ROW_LIKE_FILTER",
              "propertyValue": false
            }
          }
        },
        "address_line_2": {
          "columnName": "address_line_2",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Line 2"
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
        "address_id": {
          "columnName": "address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Address iD"
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
          "propertyValue": "addresses"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "address"
        }
      }
    },
    "business_addresses": {
      "tableName": "business_addresses",
      "tableColumns": {
        "business_address_id": {
          "columnName": "business_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business Address Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
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
            }
          }
        },
        "business_id": {
          "columnName": "business_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "business_addresses"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "business_address"
        }
      }
    },
    "business_email_addresses": {
      "tableName": "business_email_addresses",
      "tableColumns": {
        "business_email_address_id": {
          "columnName": "business_email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business Email Address Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "business_id": {
          "columnName": "business_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business"
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
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "business_email_addresses"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "business_email_address"
        }
      }
    },
    "business_members": {
      "tableName": "business_members",
      "tableColumns": {
        "business_member_id": {
          "columnName": "business_member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business Member Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "business_id": {
          "columnName": "business_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business"
            }
          }
        },
        "member_id": {
          "columnName": "member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "business_members"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "business_member"
        }
      }
    },
    "business_phone_numbers": {
      "tableName": "business_phone_numbers",
      "tableColumns": {
        "business_phone_number_id": {
          "columnName": "business_phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business Phone Number Id"
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
            }
          }
        },
        "business_id": {
          "columnName": "business_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "business_phone_numbers"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "business_phone_number"
        }
      }
    },
    "business_social_medias": {
      "tableName": "business_social_medias",
      "tableColumns": {
        "business_social_media_id": {
          "columnName": "business_social_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business Social Media Id"
            }
          }
        },
        "business_id": {
          "columnName": "business_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business"
            }
          }
        },
        "social_media_id": {
          "columnName": "social_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Social Media"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "business_social_medias"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "business_social_media"
        }
      }
    },
    "business_website": {
      "tableName": "business_website",
      "tableColumns": {
        "business_website_id": {
          "columnName": "business_website_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business Website Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "business_id": {
          "columnName": "business_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business"
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
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "business_website"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "business_websites"
        }
      }
    },
    "businesses": {
      "tableName": "businesses",
      "tableColumns": {
        "business_id": {
          "columnName": "business_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "business_name": {
          "columnName": "business_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business Name"
            }
          }
        },
        "incorporation_type": {
          "columnName": "incorporation_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Incorporation Type"
            }
          }
        },
        "business_type": {
          "columnName": "business_type",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Business Type"
            }
          }
        },
        "business_profile_image_media_id": {
          "columnName": "business_profile_image_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Profile Image"
            }
          }
        },
        "business_description": {
          "columnName": "business_description",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Description"
            }
          }
        },
        "business_tags": {
          "columnName": "business_tags",
          "columnType": "TEXT",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Tags"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "businesses"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "business"
        }
      }
    },
    "communities": {
      "tableName": "communities",
      "tableColumns": {
        "community_id": {
          "columnName": "community_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Community Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "community_name": {
          "columnName": "community_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Community Name"
            }
          }
        },
        "community_profile_image_media_id": {
          "columnName": "community_profile_image_media_id",
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
          "propertyValue": "communities"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "community"
        }
      }
    },
    "community_members": {
      "tableName": "community_members",
      "tableColumns": {
        "community_id": {
          "columnName": "community_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Community"
            }
          }
        },
        "member_id": {
          "columnName": "member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member"
            }
          }
        },
        "community_member_id": {
          "columnName": "community_member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Community Member Id"
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
          "propertyValue": "community_members"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "community_member"
        }
      }
    },
    "community_zones": {
      "tableName": "community_zones",
      "tableColumns": {
        "community_zone_id": {
          "columnName": "community_zone_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Community Zone Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "community_id": {
          "columnName": "community_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Community"
            }
          }
        },
        "zone_name": {
          "columnName": "zone_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Zone Name"
            }
          }
        },
        "zone_index": {
          "columnName": "zone_index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Zone Index"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "comunity_zones"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "community_zone"
        }
      }
    },
    "email_addresses": {
      "tableName": "email_addresses",
      "tableColumns": {
        "email_address_id": {
          "columnName": "email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Address Id"
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
              "propertyValue": "Email Address Label"
            }
          }
        },
        "email_address_value": {
          "columnName": "email_address_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Email Address Value"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "email_addresses"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "email_address"
        }
      }
    },
    "events": {
      "tableName": "events",
      "tableColumns": {},
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "events"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "event"
        }
      }
    },
    "form_fields": {
      "tableName": "form_fields",
      "tableColumns": {},
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "form_fields"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "form_field"
        }
      }
    },
    "forms": {
      "tableName": "forms",
      "tableColumns": {},
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "forms"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "form"
        }
      }
    },
    "governing_body_members": {
      "tableName": "governing_body_members",
      "tableColumns": {
        "governing_body_member_id": {
          "columnName": "governing_body_member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Governing Body Member Id"
            }
          }
        },
        "governing_body_id": {
          "columnName": "governing_body_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Governing Body"
            }
          }
        },
        "member_id": {
          "columnName": "member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member"
            }
          }
        },
        "governing_body_member_index": {
          "columnName": "governing_body_member_index",
          "columnType": "INTEGER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Index"
            }
          }
        },
        "governing_body_member_title": {
          "columnName": "governing_body_member_title",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Title"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "governing_body_members"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "governing_body_member"
        }
      }
    },
    "governing_bodies": {
      "tableName": "governing_bodies",
      "tableColumns": {
        "governing_body_id": {
          "columnName": "governing_body_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Governing Body Id"
            }
          }
        },
        "governing_body_name": {
          "columnName": "governing_body_name",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Governing Body Name"
            }
          }
        },
        "governing_term_start_date": {
          "columnName": "governing_term_start_date",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Start Date"
            }
          }
        },
        "governing_term_end_date": {
          "columnName": "governing_term_end_date",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "End Date"
            }
          }
        },
        "community_id": {
          "columnName": "community_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Community"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "governing_bodies"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "governing_body"
        }
      }
    },
    "matrimony_subscriptions": {
      "tableName": "matrimony_subscriptions",
      "tableColumns": {},
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "matrimony_subscriptions"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "matrimony_subscription"
        }
      }
    },
    "medias": {
      "tableName": "medias",
      "tableColumns": {
        "media_id": {
          "columnName": "media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Media Id"
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
          "propertyValue": "medias"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "media"
        }
      }
    },
    "member_addresses": {
      "tableName": "member_addresses",
      "tableColumns": {
        "member_address_id": {
          "columnName": "member_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member Address Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "member_id": {
          "columnName": "member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member"
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
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "member_addresses"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "member_address"
        }
      }
    },
    "member_email_addresses": {
      "tableName": "member_email_addresses",
      "tableColumns": {
        "member_email_address_id": {
          "columnName": "member_email_address_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member Email Address Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "member_id": {
          "columnName": "member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member"
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
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "member_email_addresses"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "member_email__address"
        }
      }
    },
    "member_form_values": {
      "tableName": "member_form_values",
      "tableColumns": {},
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "member_form_values"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "member_form_value"
        }
      }
    },
    "member_phone_numbers": {
      "tableName": "member_phone_numbers",
      "tableColumns": {
        "member_phone_number_id": {
          "columnName": "member_phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member Phone Number Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "member_id": {
          "columnName": "member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member"
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
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "member_phone_numbers"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "member_phone_number"
        }
      }
    },
    "member_social_medias": {
      "tableName": "member_social_medias",
      "tableColumns": {
        "member_social_media_id": {
          "columnName": "member_social_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member Social Media Id"
            }
          }
        },
        "member_id": {
          "columnName": "member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member"
            }
          }
        },
        "social_media_id": {
          "columnName": "social_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Social Media"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "member_social_medias"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "member_social_media"
        }
      }
    },
    "members": {
      "tableName": "members",
      "tableColumns": {
        "member_id": {
          "columnName": "member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member Id"
            },
            "PRIMARY_KEY": {
              "propertyName": "PRIMARY_KEY",
              "propertyValue": true
            }
          }
        },
        "member_number": {
          "columnName": "member_number",
          "columnType": "AUTO_NUMBER",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member Number"
            }
          }
        },
        "member_fname": {
          "columnName": "member_fname",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "First Name"
            }
          }
        },
        "member_mname": {
          "columnName": "member_mname",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Middle Name"
            }
          }
        },
        "member_lname": {
          "columnName": "member_lname",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Last Name"
            }
          }
        },
        "main_member_id": {
          "columnName": "main_member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Main Member"
            }
          }
        },
        "father_member_id": {
          "columnName": "father_member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Father"
            }
          }
        },
        "mother_member_id": {
          "columnName": "mother_member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Mother"
            }
          }
        },
        "spouse_member_id": {
          "columnName": "spouse_member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Spouse"
            }
          }
        },
        "member_gender": {
          "columnName": "member_gender",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Gender"
            }
          }
        },
        "relation_with_main_member": {
          "columnName": "relation_with_main_member",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Relation with Main"
            }
          }
        },
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
        "date_of_demise": {
          "columnName": "date_of_demise",
          "columnType": "DATE",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Demise Date"
            }
          }
        },
        "blood_group": {
          "columnName": "blood_group",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Blood Group"
            }
          }
        },
        "member_profile_image_media_id": {
          "columnName": "member_profile_image_media_id",
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
          "propertyValue": "members"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "member"
        }
      }
    },
    "phone_numbers": {
      "tableName": "phone_numbers",
      "tableColumns": {
        "phone_number_id": {
          "columnName": "phone_number_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Number Id"
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
              "propertyValue": "Phone Number Label"
            }
          }
        },
        "phone_number_value": {
          "columnName": "phone_number_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Phone Number Value"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "phone_numbers"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "phone_number"
        }
      }
    },
    "posts": {
      "tableName": "posts",
      "tableColumns": {},
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "posts"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "post"
        }
      }
    },
    "social_medias": {
      "tableName": "social_medias",
      "tableColumns": {
        "social_media_id": {
          "columnName": "social_media_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Social Media Id"
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
              "propertyValue": "Social Media Type"
            }
          }
        },
        "social_media_label": {
          "columnName": "social_media_label",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Social Media Label"
            }
          }
        },
        "social_media_value": {
          "columnName": "social_media_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Social Media Value"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "social_medias"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "social_media"
        }
      }
    },
    "user_activities": {
      "tableName": "user_activities",
      "tableColumns": {},
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "user_activities"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "user_activity"
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
        "username": {
          "columnName": "username",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Username"
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
        "member_id": {
          "columnName": "member_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Member"
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
    "websites": {
      "tableName": "websites",
      "tableColumns": {
        "website_id": {
          "columnName": "website_id",
          "columnType": "UUID",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Website Id"
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
              "propertyValue": "Website Label"
            },
            "USE_FOR_ROW_LIKE_FILTER": {
              "propertyName": "USE_FOR_ROW_LIKE_FILTER",
              "propertyValue": false
            }
          }
        },
        "website_value": {
          "columnName": "website_value",
          "columnType": "STRING",
          "columnProperties": {
            "COLUMN_TITLE": {
              "propertyName": "COLUMN_TITLE",
              "propertyValue": "Website Value"
            }
          }
        }
      },
      "tableProperties": {
        "PLURAL_NAME": {
          "propertyName": "PLURAL_NAME",
          "propertyValue": "websites"
        },
        "SINGULAR_NAME": {
          "propertyName": "SINGULAR_NAME",
          "propertyValue": "website"
        }
      }
    }
  },
  "views": {},
  "relationships": [
    {
      "destinationColumn": "address_id",
      "destinationTable": "business_addresses",
      "sourceColumn": "address_id",
      "sourceTable": "addresses"
    },
    {
      "destinationColumn": "business_id",
      "destinationTable": "business_addresses",
      "sourceColumn": "business_id",
      "sourceTable": "businesses"
    },
    {
      "destinationColumn": "business_id",
      "destinationTable": "business_email_addresses",
      "sourceColumn": "business_id",
      "sourceTable": "businesses"
    },
    {
      "destinationColumn": "email_address_id",
      "destinationTable": "business_email_addresses",
      "sourceColumn": "email_address_id",
      "sourceTable": "email_addresses"
    },
    {
      "destinationColumn": "business_id",
      "destinationTable": "business_members",
      "sourceColumn": "business_id",
      "sourceTable": "businesses"
    },
    {
      "destinationColumn": "member_id",
      "destinationTable": "business_members",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "business_id",
      "destinationTable": "business_phone_numbers",
      "sourceColumn": "business_id",
      "sourceTable": "businesses"
    },
    {
      "destinationColumn": "phone_number_id",
      "destinationTable": "business_phone_numbers",
      "sourceColumn": "phone_number_id",
      "sourceTable": "phone_numbers"
    },
    {
      "destinationColumn": "business_id",
      "destinationTable": "business_social_medias",
      "sourceColumn": "business_id",
      "sourceTable": "businesses"
    },
    {
      "destinationColumn": "social_media_id",
      "destinationTable": "business_social_medias",
      "sourceColumn": "social_media_id",
      "sourceTable": "social_medias"
    },
    {
      "destinationColumn": "business_id",
      "destinationTable": "business_website",
      "sourceColumn": "business_id",
      "sourceTable": "businesses"
    },
    {
      "destinationColumn": "website_id",
      "destinationTable": "business_website",
      "sourceColumn": "website_id",
      "sourceTable": "websites"
    },
    {
      "destinationColumn": "community_profile_image_media_id",
      "destinationTable": "communities",
      "sourceColumn": "media_id",
      "sourceTable": "medias"
    },
    {
      "destinationColumn": "community_id",
      "destinationTable": "community_members",
      "sourceColumn": "community_id",
      "sourceTable": "communities"
    },
    {
      "destinationColumn": "member_id",
      "destinationTable": "community_members",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "community_id",
      "destinationTable": "community_zones",
      "sourceColumn": "community_id",
      "sourceTable": "communities"
    },
    {
      "destinationColumn": "governing_body_id",
      "destinationTable": "governing_body_members",
      "sourceColumn": "governing_body_id",
      "sourceTable": "governing_bodies"
    },
    {
      "destinationColumn": "member_id",
      "destinationTable": "governing_body_members",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "community_id",
      "destinationTable": "governing_bodies",
      "sourceColumn": "community_id",
      "sourceTable": "communities"
    },
    {
      "destinationColumn": "address_id",
      "destinationTable": "member_addresses",
      "sourceColumn": "address_id",
      "sourceTable": "addresses"
    },
    {
      "destinationColumn": "member_id",
      "destinationTable": "member_addresses",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "email_address_id",
      "destinationTable": "member_email_addresses",
      "sourceColumn": "email_address_id",
      "sourceTable": "email_addresses"
    },
    {
      "destinationColumn": "member_id",
      "destinationTable": "member_email_addresses",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "member_id",
      "destinationTable": "member_phone_numbers",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "phone_number_id",
      "destinationTable": "member_phone_numbers",
      "sourceColumn": "phone_number_id",
      "sourceTable": "phone_numbers"
    },
    {
      "destinationColumn": "social_media_id",
      "destinationTable": "member_social_medias",
      "sourceColumn": "social_media_id",
      "sourceTable": "social_medias"
    },
    {
      "destinationColumn": "member_id",
      "destinationTable": "member_social_medias",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "main_member_id",
      "destinationTable": "members",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "father_member_id",
      "destinationTable": "members",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "mother_member_id",
      "destinationTable": "members",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "spouse_member_id",
      "destinationTable": "members",
      "sourceColumn": "member_id",
      "sourceTable": "members"
    },
    {
      "destinationColumn": "member_profile_image_media_id",
      "destinationTable": "members",
      "sourceColumn": "media_id",
      "sourceTable": "medias"
    }
  ],
  "storedProcedures": {},
  "functions": {},
  "triggers": {}
};
