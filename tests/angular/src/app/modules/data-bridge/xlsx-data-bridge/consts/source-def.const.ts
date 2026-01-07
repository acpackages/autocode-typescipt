/* eslint-disable @nx/enforce-module-boundaries */
import { AC_DATA_BRIDGE_DEFAULTS, IAcDataBridgeEntityTemplateDef } from "@autocode-ts/ac-data-bridge";
import { Tables, TblActAddresses, TblActBankAccounts, TblActChargeableServiceCategories, TblActChargeableServiceCharges, TblActChargeableServicePurchaseDetails, TblActChargeableServices, TblActChargeableServiceSaleDetails, TblActChargeableServiceUoms, TblActContactPersons, TblActCustomers, TblActEmailAddresses, TblActFaxNumbers, TblActLedgerAccounts, TblActLedgerAccountTypes, TblActLegalDocuments, TblActParties, TblActPartyAddresses, TblActPartyBankAccounts, TblActPartyContactPersons, TblActPartyEmailAddresses, TblActPartyFaxNumbers, TblActPartyLegalDocuments, TblActPartyPhoneNumbers, TblActPartySocialMedias, TblActPartyWebsites, TblActPaymentMethods, TblActPhoneNumbers, TblActProductAttributes, TblActProductBarcodes, TblActProductCategories, TblActProductPrices, TblActProductPurchaseDetails, TblActProductReferenceUrls, TblActProducts, TblActProductSaleDetails, TblActProductStockDetails, TblActProductUoms, TblActPurchaseInvoiceChargeableServices, TblActPurchaseInvoiceExpenses, TblActPurchaseInvoicePayments, TblActPurchaseInvoiceProducts, TblActPurchaseInvoices, TblActSaleInvoiceChargeableServices, TblActSaleInvoiceExpenses, TblActSaleInvoicePayments, TblActSaleInvoiceProducts, TblActSaleInvoices, TblActSocialMedias, TblActSuppliers, TblActTaxingSchemes, TblActTaxParts, TblActTaxRates, TblActTransactionEntries, TblActTransactions, TblActWebsites } from "tests/data/dd-keys-ac-data-dictionary";

export const IMPORT_SHEET_DEFINITIONS: IAcDataBridgeEntityTemplateDef[] = [
  {
    destinationName: Tables.ActAddresses,
    templateName: "Addresses",
    templateFields: [
      { templateFieldName: "Address Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Address Id",destinationName: Tables.ActAddresses, destinationFieldName: TblActAddresses.AddressId,isDestinationPrimaryKey:true },
      { templateFieldName: "Address Label", destinationName: Tables.ActAddresses, destinationFieldName: TblActAddresses.AddressLabel },
      { templateFieldName: "Address Line 1", destinationName: Tables.ActAddresses, destinationFieldName: TblActAddresses.AddressLine1 },
      { templateFieldName: "Address Line 2", destinationName: Tables.ActAddresses, destinationFieldName: TblActAddresses.AddressLine2 },
      { templateFieldName: "City", destinationName: Tables.ActAddresses, destinationFieldName: TblActAddresses.CityName },
      { templateFieldName: "State", destinationName: Tables.ActAddresses, destinationFieldName: TblActAddresses.StateName },
      { templateFieldName: "Country", destinationName: Tables.ActAddresses, destinationFieldName: TblActAddresses.CountryName },
      { templateFieldName: "Postal Code", destinationName: Tables.ActAddresses, destinationFieldName: TblActAddresses.PostalCode },
      { templateFieldName: "Landmark", destinationName: Tables.ActAddresses, destinationFieldName: TblActAddresses.Landmark },
    ]
  },
  {
    destinationName: Tables.ActBankAccounts,
    templateName: "Bank Accounts",
    templateFields: [
      { templateFieldName: "Bank Account Unqiue Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Bank Account Id",destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.BankAccountId,isDestinationPrimaryKey:true },
      { templateFieldName: "Bank Label", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.BankLabel },
      { templateFieldName: "Account Holder Name", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.AccountHolderName },
      { templateFieldName: "Account Number", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.AccountNumber },
      { templateFieldName: "Account Type", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.AccountType },
      { templateFieldName: "Bank Name", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.BankName },
      { templateFieldName: "Branch Name", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.BranchName },
      { templateFieldName: "Branch Address", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.BranchAddress },
      { templateFieldName: "IBAN", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.Iban },
      { templateFieldName: "SWIFT/BIC", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.SwiftBic },
      { templateFieldName: "IFSC Code", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.Ifsc },
      { templateFieldName: "Is Primary Bank Account", destinationName: Tables.ActBankAccounts, destinationFieldName: TblActBankAccounts.IsPrimary },
    ]
  },
  {
    destinationName: Tables.ActChargeableServiceCategories,
    templateName: "Service Categories",
    templateFields: [
      { templateFieldName: "Service Category Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Service Category Id",destinationName: Tables.ActChargeableServiceCategories, destinationFieldName: TblActChargeableServiceCategories.ChargeableServiceCategoryId,isDestinationPrimaryKey:true },
      { templateFieldName: "Category Name", destinationName: Tables.ActChargeableServiceCategories, destinationFieldName: TblActChargeableServiceCategories.ChargeableServiceCategoryName },
    ]
  },
  {
    destinationName: Tables.ActChargeableServiceCharges,
    templateName: "Service Charges",
    templateFields: [
      { templateFieldName: "Service Charge Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Service Charge Id",destinationName: Tables.ActChargeableServiceCharges, destinationFieldName: TblActChargeableServiceCharges.ChargeableServiceChargeId,isDestinationPrimaryKey:true },
      { templateFieldName: "Charge Name", destinationName: Tables.ActChargeableServiceCharges, destinationFieldName: TblActChargeableServiceCharges.ChargeableServiceChargeName },
      { templateFieldName: "Service Name", foreignKeyTemplateName:'Services',foreignKeyTemplateFieldName:'Service Name' },
      { templateFieldName: "Charge Purchase", destinationName: Tables.ActChargeableServiceCharges, destinationFieldName: TblActChargeableServiceCharges.ChargePurchase },
      { templateFieldName: "Charge Sale", destinationName: Tables.ActChargeableServiceCharges, destinationFieldName: TblActChargeableServiceCharges.ChargeSale },
      { templateFieldName: "Profit Margin", destinationName: Tables.ActChargeableServiceCharges, destinationFieldName: TblActChargeableServiceCharges.ProfitMargin },
      { templateFieldName: "Charge Is Current", destinationName: Tables.ActChargeableServiceCharges, destinationFieldName: TblActChargeableServiceCharges.IsCurrent },
      { templateFieldName: "Charge Is Active", destinationName: Tables.ActChargeableServiceCharges, destinationFieldName: TblActChargeableServiceCharges.IsActive },
    ]
  },
  {
    destinationName: Tables.ActChargeableServicePurchaseDetails,
    templateName: "Service Purchase Details",
    templateFields: [
      { templateFieldName: "Service Purchase Detail Unqiue Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Service Purchase Detail Id",destinationName: Tables.ActChargeableServicePurchaseDetails, destinationFieldName: TblActChargeableServicePurchaseDetails.ChargeableServicePurchaseDetailId,isDestinationPrimaryKey:true },
      { templateFieldName: "Service Name", foreignKeyTemplateName:'Services',foreignKeyTemplateFieldName:'Service Name' },
      { templateFieldName: "Service Unique Id", foreignKeyTemplateName:'Services',foreignKeyTemplateFieldName:'Service Unique Id' },
      { templateFieldName: "Purchase UOM", foreignKeyTemplateName:'Service UOMs',foreignKeyTemplateFieldName:'UOM Name' },
      { templateFieldName: "Purchase Tax%", foreignKeyTemplateName:'Tax Name',foreignKeyTemplateFieldName:'Tax Percentage' },
      { templateFieldName: "Purchase Detail Name", destinationName: Tables.ActChargeableServicePurchaseDetails, destinationFieldName: TblActChargeableServicePurchaseDetails.ChargeableServicePurchaseDetailName },
      { templateFieldName: "Purchase Detail Is Current", destinationName: Tables.ActChargeableServicePurchaseDetails, destinationFieldName: TblActChargeableServicePurchaseDetails.IsCurrent },
      { templateFieldName: "Purchase Detail Is Active", destinationName: Tables.ActChargeableServicePurchaseDetails, destinationFieldName: TblActChargeableServicePurchaseDetails.IsActive },
    ]
  },
  {
    destinationName: Tables.ActChargeableServiceSaleDetails,
    templateName: "Service Sale Details",
    templateFields: [
      { templateFieldName: "Service Sale Detail Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Service Sale Detail Id",destinationName: Tables.ActChargeableServiceSaleDetails, destinationFieldName: TblActChargeableServiceSaleDetails.ChargeableServiceSaleDetailId,isDestinationPrimaryKey:true },
      { templateFieldName: "Service Name", foreignKeyTemplateName:'Services',foreignKeyTemplateFieldName:'Service Name' },
      { templateFieldName: "Service Unique Id", foreignKeyTemplateName:'Services',foreignKeyTemplateFieldName:'Id' },
      { templateFieldName: "Sale UOM", foreignKeyTemplateName:'Service UOMs',foreignKeyTemplateFieldName:'UOM Name' },
      { templateFieldName: "Sale Tax%", foreignKeyTemplateName:'Tax Name',foreignKeyTemplateFieldName:'Tax Percentage' },
      { templateFieldName: "Sale Detail Name", destinationName: Tables.ActChargeableServiceSaleDetails, destinationFieldName: TblActChargeableServiceSaleDetails.ChargeableServiceSaleDetailName },
      { templateFieldName: "Sale Detail Is Current", destinationName: Tables.ActChargeableServiceSaleDetails, destinationFieldName: TblActChargeableServiceSaleDetails.IsCurrent },
      { templateFieldName: "Sale Detail Is Active", destinationName: Tables.ActChargeableServiceSaleDetails, destinationFieldName: TblActChargeableServiceSaleDetails.IsActive },
    ]
  },
  {
    destinationName: Tables.ActChargeableServiceUoms,
    templateName: "Service UOMs",
    templateFields: [
      { templateFieldName: "Service UOM Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Service UOM Id",destinationName: Tables.ActChargeableServiceUoms, destinationFieldName: TblActChargeableServiceUoms.ChargeableServiceUomId,isDestinationPrimaryKey:true },
      { templateFieldName: "Service Name", foreignKeyTemplateName:'Services',foreignKeyTemplateFieldName:'Service Name' },
      { templateFieldName: "Service Unique Id", foreignKeyTemplateName:'Services',foreignKeyTemplateFieldName:'Servic Unqiue Id' },
      { templateFieldName: "UOM Name", destinationName: Tables.ActChargeableServiceUoms, destinationFieldName: TblActChargeableServiceUoms.ChargeableServiceUomName },
      { templateFieldName: "UOM Quantity", destinationName: Tables.ActChargeableServiceUoms, destinationFieldName: TblActChargeableServiceUoms.ChargeableServiceUomQuantity },
      { templateFieldName: "UOM Display Index", destinationName: Tables.ActChargeableServiceUoms, destinationFieldName: TblActChargeableServiceUoms.DisplayIndex }
    ]
  },
  {
    destinationName: Tables.ActChargeableServices,
    templateName: "Services",
    templateFields: [
      { templateFieldName: "Service Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Service Id",destinationName: Tables.ActChargeableServices, destinationFieldName: TblActChargeableServices.ChargeableServiceId,isDestinationPrimaryKey:true },
      { templateFieldName: "Service Name", destinationName: Tables.ActChargeableServices, destinationFieldName: TblActChargeableServices.ChargeableServiceName },
      { templateFieldName: "Service Code", destinationName: Tables.ActChargeableServices, destinationFieldName: TblActChargeableServices.ChargeableServiceCode },
      { templateFieldName: "SAC Code", destinationName: Tables.ActChargeableServices, destinationFieldName: TblActChargeableServices.SacCode },
      { templateFieldName: "Category Name", foreignKeyTemplateName:'Service Categories',foreignKeyTemplateFieldName:'Category Name' },
      { templateFieldName: "Quick Description", destinationName: Tables.ActChargeableServices, destinationFieldName: TblActChargeableServices.ChargeableServiceQuickDescription },
      { templateFieldName: "Full Description", destinationName: Tables.ActChargeableServices, destinationFieldName: TblActChargeableServices.ChargeableServiceFullDescription },
      { templateFieldName: "Service Remarks", destinationName: Tables.ActChargeableServices, destinationFieldName: TblActChargeableServices.ChargeableServiceRemarks },
      { templateFieldName: "Is Active", destinationName: Tables.ActChargeableServices, destinationFieldName: TblActChargeableServices.IsActive },
    ],
    extendChildTemplates:[
      {templateName:"Service Charges",excludeFields:["Service Name","Service Unique Id"]},
      {templateName:"Service Sale Details",excludeFields:["Service Name","Service Unique Id"]},
      {templateName:"Service Purchase Details",excludeFields:["Service Name","Service Unique Id"]},
      {templateName:"Service UOMs",excludeFields:["Service Name","Service Unique Id"]}
    ]
  },
  {
    destinationName: Tables.ActContactPersons,
    templateName: "Contact Persons",
    templateFields: [
      { templateFieldName: "Contact Person Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Contact Person Id",destinationName: Tables.ActContactPersons, destinationFieldName: TblActContactPersons.ContactPersonId,isDestinationPrimaryKey:true },
      { templateFieldName: "Contact Person Name", destinationName: Tables.ActContactPersons, destinationFieldName: TblActContactPersons.ContactPersonName },
    ]
  },
  {
    destinationName: Tables.ActCustomers,
    templateName: "Customers",
    templateFields: [
      { templateFieldName: "Customer Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Customer Id",destinationName: Tables.ActCustomers, destinationFieldName: TblActCustomers.CustomerId,isDestinationPrimaryKey:true },
      { templateFieldName: "Category", destinationName: Tables.ActCustomers, destinationFieldName: TblActCustomers.CustomerCategory },
      { templateFieldName: "Remarks", destinationName: Tables.ActCustomers, destinationFieldName: TblActCustomers.CustomerRemarks },
      { templateFieldName: "Is Active", destinationName: Tables.ActCustomers, destinationFieldName: TblActCustomers.IsActive },
    ],
    extendParentTemplates:[
      {
        templateName:"Parties",
        referencingFields:[{
          extendingTemplateFieldName:"Party Id",
          templateDestinationFieldName:TblActCustomers.PartyId,
          lookupFields:['Party Name',"Party Unique Id"]
        }]
      },
    ]
  },
  {
    destinationName: Tables.ActEmailAddresses,
    templateName: "Email Addresses",
    templateFields: [
      { templateFieldName: "Email Address Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Email Address Id",destinationName: Tables.ActEmailAddresses, destinationFieldName: TblActEmailAddresses.EmailAddressId,isDestinationPrimaryKey:true },
      { templateFieldName: "Email Label", destinationName: Tables.ActEmailAddresses, destinationFieldName: TblActEmailAddresses.EmailAddressLabel },
      { templateFieldName: "Email Value", destinationName: Tables.ActEmailAddresses, destinationFieldName: TblActEmailAddresses.EmailAddressValue },
    ]
  },
  {
    destinationName: Tables.ActFaxNumbers,
    templateName: "Fax Numbers",
    templateFields: [
      { templateFieldName: "Fax Number Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Fax Number Id",destinationName: Tables.ActFaxNumbers, destinationFieldName: TblActFaxNumbers.FaxNumberId,isDestinationPrimaryKey:true },
      { templateFieldName: "Fax Label", destinationName: Tables.ActFaxNumbers, destinationFieldName: TblActFaxNumbers.FaxNumberLabel },
      { templateFieldName: "Fax Value", destinationName: Tables.ActFaxNumbers, destinationFieldName: TblActFaxNumbers.FaxNumberValue },
    ]
  },
  {
    destinationName: Tables.ActLedgerAccounts,
    templateName: "Ledger Accounts",
    templateFields: [
      { templateFieldName: "Ledger Account Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Ledger Account Id",destinationName: Tables.ActLedgerAccounts, destinationFieldName: TblActLedgerAccounts.LedgerAccountId,isDestinationPrimaryKey:true },
      { templateFieldName: "Ledger Account Unique Id", foreignKeyTemplateName:"Ledger Account Types",foreignKeyTemplateFieldName:"Ledger Account Unique Id" },
      { templateFieldName: "Ledger Account Type Name", foreignKeyTemplateName:"Ledger Account Types",foreignKeyTemplateFieldName:"Ledger Account Type Name" },
      { templateFieldName: "Ledger Account Type Id", foreignKeyTemplateName:"Ledger Account Types",foreignKeyTemplateFieldName:"Ledger Account Type Id",destinationFieldName:TblActLedgerAccounts.LedgerAccountTypeId },
      { templateFieldName: "Ledger Account Name", destinationName: Tables.ActLedgerAccounts, destinationFieldName: TblActLedgerAccounts.LedgerAccountName,isUniqueValue:true },
      { templateFieldName: "Reflecting Statement", destinationName: Tables.ActLedgerAccounts, destinationFieldName: TblActLedgerAccounts.ReflectingStatement },
    ]
  },
  {
    destinationName: Tables.ActLedgerAccountTypes,
    templateName: "Ledger Account Types",
    templateFields: [
      { templateFieldName: "Ledger Account Type Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Ledger Account Type Id",destinationName: Tables.ActLedgerAccountTypes, destinationFieldName: TblActLedgerAccountTypes.LedgerAccountTypeId,isDestinationPrimaryKey:true },
      { templateFieldName: "Parent Type Unique Id", foreignKeyTemplateName:"Ledger Account Types",foreignKeyTemplateFieldName:"Ledger Account Type Unique Id" },
      { templateFieldName: "Ledger Account Type Name", destinationName: Tables.ActLedgerAccountTypes, destinationFieldName: TblActLedgerAccountTypes.LedgerAccountTypeName,isUniqueValue:true },
      { templateFieldName: "Parent Type Name", foreignKeyTemplateName:"Ledger Account Types",foreignKeyTemplateFieldName:"Ledger Account Type Name" }
    ]
  },
  {
    destinationName: Tables.ActLegalDocuments,
    templateName: "Legal Documents",
    templateFields: [
      { templateFieldName: "Legal Document Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Legal Document Id",destinationName: Tables.ActLegalDocuments, destinationFieldName: TblActLegalDocuments.LegalDocumentId,isDestinationPrimaryKey:true },
      { templateFieldName: "Legal Document Label", destinationName: Tables.ActLegalDocuments, destinationFieldName: TblActLegalDocuments.LegalDocumentLabel },
      { templateFieldName: "Legal Document Value", destinationName: Tables.ActLegalDocuments, destinationFieldName: TblActLegalDocuments.LegalDocumentValue },
      { templateFieldName: "Expiry Date", destinationName: Tables.ActLegalDocuments, destinationFieldName: TblActLegalDocuments.ExpiryDate },
    ]
  },
  {
    destinationName: Tables.ActParties,
    templateName: "Parties",
    templateFields: [
      { templateFieldName: "Party Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Id",destinationName: Tables.ActParties, destinationFieldName: TblActParties.PartyId,isDestinationPrimaryKey:true },
      { templateFieldName: "Party Name", destinationName: Tables.ActParties, destinationFieldName: TblActParties.PartyName },
      { templateFieldName: "Is Active", destinationName: Tables.ActParties, destinationFieldName: TblActParties.IsActive },
      { templateFieldName: "GST Number", destinationName: Tables.ActParties, destinationFieldName: TblActParties.LegalIdentifier },
      { templateFieldName: "Ledger Account Name", foreignKeyTemplateName:'Ledger Accounts',foreignKeyTemplateFieldName:'Ledger Account Name' },
      { templateFieldName: "Ledger Account Unique Id", foreignKeyTemplateName:'Ledger Accounts',foreignKeyTemplateFieldName:'Ledger Account Unique Id' }
    ],
    extendChildTemplates:[
      {templateName:"Party Contact Persons",excludeFields:["Party Id","Party Unique Id","Party Name"]},
      {templateName:"Party Email Addresses",excludeFields:["Party Id","Party Unique Id","Party Name"]},
      {templateName:"Party Phone Numbers",excludeFields:["Party Id","Party Unique Id","Party Name"]},
      {templateName:"Party Addresses",excludeFields:["Party Id","Party Unique Id","Party Name"]},
      {templateName:"Party Fax Numbers",excludeFields:["Party Id","Party Unique Id","Party Name"]},
      {templateName:"Party Websites",excludeFields:["Party Id","Party Unique Id","Party Name"]},
      {templateName:"Party Social Medias",excludeFields:["Party Id","Party Unique Id","Party Name"]},
      {templateName:"Party Legal Documents",excludeFields:["Party Id","Party Unique Id","Party Name"]},
      {templateName:"Party Bank Accounts",excludeFields:["Party Id","Party Unique Id","Party Name"]},
    ]
  },
  {
    destinationName: Tables.ActPartyAddresses,
    templateName: "Party Addresses",
    templateFields: [
      { templateFieldName: "Party Address Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Address Id",destinationName:Tables.ActPartyAddresses, destinationFieldName:TblActPartyAddresses.PartyAddressId,isDestinationPrimaryKey:true },
    ],
    extendParentTemplates:[
      {
        templateName:"Addresses",
        referencingFields:[{
          extendingTemplateFieldName:"Address Id",
          templateDestinationFieldName:TblActAddresses.AddressId,
          lookupFields:["Address Unique Id"]
        }]
      }
    ]
  },
  {
    destinationName: Tables.ActPartyBankAccounts,
    templateName: "Party Bank Accounts",
    templateFields: [
      { templateFieldName: "Party Bank Account Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Bank Account Id",destinationName:Tables.ActPartyBankAccounts,destinationFieldName:TblActPartyBankAccounts.PartyBankAccountId,isDestinationPrimaryKey:true },
    ],
    extendParentTemplates:[
      {
        templateName:"Bank Accounts",
        referencingFields:[{
          extendingTemplateFieldName:"Bank Account Id",
          templateDestinationFieldName:TblActBankAccounts.BankAccountId,
          lookupFields:["Bank Account Unique Id"]
        }]
      }
    ]
  },
  {
    destinationName: Tables.ActPartyContactPersons,
    templateName: "Party Contact Persons",
    templateFields: [
      { templateFieldName: "Party Contact Person Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Contact Person Id",destinationName:Tables.ActPartyContactPersons, destinationFieldName:TblActPartyContactPersons.PartyContactPersonId,isDestinationPrimaryKey:true },
    ],
    extendParentTemplates:[
      {
        templateName:"Contact Persons",
        referencingFields:[{
          extendingTemplateFieldName:"Contact Person Id",
          templateDestinationFieldName:TblActContactPersons.ContactPersonId,
          lookupFields:["Contact Person Unique Id"]
        }]
      }
    ]
  },
  {
    destinationName: Tables.ActPartyEmailAddresses,
    templateName: "Party Email Addresses",
    templateFields: [
      { templateFieldName: "Party Email Address Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Email Address Id",destinationName:Tables.ActPartyEmailAddresses,destinationFieldName:TblActPartyEmailAddresses.PartyEmailAddressId,isDestinationPrimaryKey:true },
    ],
    extendParentTemplates:[
      {
        templateName:"Email Addresses",
        referencingFields:[{
          extendingTemplateFieldName:"Email Address Id",
          templateDestinationFieldName:TblActEmailAddresses.EmailAddressId,
          lookupFields:["Email Address Unique Id"]
        }]
      }
    ]
  },
  {
    destinationName: Tables.ActPartyFaxNumbers,
    templateName: "Party Fax Numbers",
    templateFields: [
      { templateFieldName: "Party Fax Number Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Fax Number Id",destinationName:Tables.ActPartyFaxNumbers,destinationFieldName:TblActPartyFaxNumbers.PartyFaxNumberId,isDestinationPrimaryKey:true },
    ],
    extendParentTemplates:[
      {
        templateName:"Fax Numbers",
        referencingFields:[{
          extendingTemplateFieldName:"Fax Number Id",
          templateDestinationFieldName:TblActFaxNumbers.FaxNumberId,
          lookupFields:["Fax Number Unique Id"]
        }]
      }
    ]
  },
  {
    destinationName: Tables.ActPartyLegalDocuments,
    templateName: "Party Legal Documents",
    templateFields: [
      { templateFieldName: "Party Legal Document Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Legal Document Id",destinationName:Tables.ActPartyLegalDocuments,destinationFieldName:TblActPartyLegalDocuments.PartyLegalDocumentId,isDestinationPrimaryKey:true },
    ],
    extendParentTemplates:[
      {
        templateName:"Legal Documents",
        referencingFields:[{
          extendingTemplateFieldName:"Legal Document Id",
          templateDestinationFieldName:TblActLegalDocuments.LegalDocumentId,
          lookupFields:["Legal Document Unique Id"]
        }]
      }
    ]
  },
  {
    destinationName: Tables.ActPartyPhoneNumbers,
    templateName: "Party Phone Numbers",
    templateFields: [
      { templateFieldName: "Party Phone Number Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Phone Number Id",destinationName:Tables.ActPartyPhoneNumbers,destinationFieldName:TblActPartyPhoneNumbers.PartyPhoneNumberId,isDestinationPrimaryKey:true },
    ],
    extendParentTemplates:[
      {
        templateName:"Phone Numbers",
        referencingFields:[{
          extendingTemplateFieldName:"Phone Number Id",
          templateDestinationFieldName:TblActPhoneNumbers.PhoneNumberId,
          lookupFields:["Phone Number Unique Id"]
        }],
        childDestinationField:TblActPartyPhoneNumbers.PhoneNumberId,
        parentDestinationField:TblActPhoneNumbers.PhoneNumberId
      }
    ]
  },
  {
    destinationName: Tables.ActPartySocialMedias,
    templateName: "Party Social Medias",
    templateFields: [
      { templateFieldName: "Party Social Media Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Social Media Id",destinationName:Tables.ActPartySocialMedias,destinationFieldName:TblActPartySocialMedias.PartySocialMediaId,isDestinationPrimaryKey:true },
    ],
    extendParentTemplates:[
      {
        templateName:"Social Medias",
        referencingFields:[{
          extendingTemplateFieldName:"Social Media Id",
          templateDestinationFieldName:TblActSocialMedias.SocialMediaId,
          lookupFields:["Social Media Unique Id"]
        }]
      }
    ]
  },
  {
    destinationName: Tables.ActPartyWebsites,
    templateName: "Party Websites",
    templateFields: [
      { templateFieldName: "Party Website Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Party Website Id",destinationName:Tables.ActPartyWebsites,destinationFieldName:TblActPartyWebsites.PartyWebsiteId,isDestinationPrimaryKey:true },
    ],
    extendParentTemplates:[
      {
        templateName:"Websites",
        referencingFields:[{
          extendingTemplateFieldName:"Website Id",
          templateDestinationFieldName:TblActWebsites.WebsiteId,
          lookupFields:["Website Unique Id"]
        }]
      }
    ]
  },
  {
    destinationName: Tables.ActPaymentMethods,
    templateName: "Payment Methods",
    templateFields: [
      { templateFieldName: "Payment Method Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Payment Method Id", destinationName: Tables.ActPaymentMethods, destinationFieldName: TblActPaymentMethods.PaymentMethodId, isDestinationPrimaryKey:true },
      { templateFieldName: "Is Active", destinationName: Tables.ActPaymentMethods, destinationFieldName: TblActPaymentMethods.IsActive },
      { templateFieldName: "Ledger Account Unique Id", foreignKeyTemplateName:'Ledger Accounts', foreignKeyTemplateFieldName:AC_DATA_BRIDGE_DEFAULTS.sourceColumnUidLabel },
      { templateFieldName: "Ledger Account", destinationName: Tables.ActLedgerAccounts, foreignKeyTemplateName:'Ledger Accounts', foreignKeyTemplateFieldName:'Ledger Account Name' },
      { templateFieldName: "Payment Method Name", destinationName: Tables.ActPaymentMethods, destinationFieldName: TblActPaymentMethods.PaymentMethodName },
      { templateFieldName: "Use For Expenses", destinationName: Tables.ActPaymentMethods, destinationFieldName: TblActPaymentMethods.UseForExpenses },
      { templateFieldName: "Use For Incomes", destinationName: Tables.ActPaymentMethods, destinationFieldName: TblActPaymentMethods.UseForIncomes },
      { templateFieldName: "Use For Purchase", destinationName: Tables.ActPaymentMethods, destinationFieldName: TblActPaymentMethods.UseForPurchase },
      { templateFieldName: "Use For Sales", destinationName: Tables.ActPaymentMethods, destinationFieldName: TblActPaymentMethods.UseForSales }
    ]
  },
  {
    destinationName: Tables.ActPhoneNumbers,
    templateName: "Phone Numbers",
    templateFields: [
      { templateFieldName: "Phone Number Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Phone Number Id",destinationName: Tables.ActPhoneNumbers, destinationFieldName: TblActPhoneNumbers.PhoneNumberId,isDestinationPrimaryKey:true },
      { templateFieldName: "Phone Label", destinationName: Tables.ActPhoneNumbers, destinationFieldName: TblActPhoneNumbers.PhoneNumberLabel },
      { templateFieldName: "Phone Value", destinationName: Tables.ActPhoneNumbers, destinationFieldName: TblActPhoneNumbers.PhoneNumberValue },
    ]
  },
  {
    destinationName: Tables.ActProductCategories,
    templateName: "Product Categories",
    templateFields: [
      { templateFieldName: "Category Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Category Id", destinationName: Tables.ActProductCategories, destinationFieldName: TblActProductCategories.ProductCategoryId, isDestinationPrimaryKey:true },
      { templateFieldName: "Category Name", destinationName: Tables.ActProductCategories, destinationFieldName: TblActProductCategories.ProductCategoryName },
      { templateFieldName: "Category UOM", destinationName: Tables.ActProductCategories, destinationFieldName: TblActProductCategories.DefaultUomName },
      { templateFieldName: "Parent Category Name", foreignKeyTemplateName:'Product Categories',foreignKeyTemplateFieldName:'Category Name' },
      { templateFieldName: "Parent Category Unique Id", foreignKeyTemplateName:'Product Categories', foreignKeyTemplateFieldName:"Category Unique Id" },

    ]
  },
  {
    destinationName: Tables.ActProductAttributes,
    templateName: "Product Attributes",
    templateFields: [
      { templateFieldName: "Product Attribute Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Product Attribute Id",destinationName: Tables.ActProductAttributes, destinationFieldName: TblActProductAttributes.ProductAttributeId,isDestinationPrimaryKey:true },
      { templateFieldName: "Attribute Name", destinationName: Tables.ActProductAttributes, destinationFieldName: TblActProductAttributes.ProductAttributeName },
      { templateFieldName: "Numeric Value", destinationName: Tables.ActProductAttributes, destinationFieldName: TblActProductAttributes.ProductAttributeNumericValue },
      { templateFieldName: "Text Value", destinationName: Tables.ActProductAttributes, destinationFieldName: TblActProductAttributes.ProductAttributeTextValue },
      { templateFieldName: "Product Name", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Product Name' },
      { templateFieldName: "Attribute Is Active", destinationName: Tables.ActProductAttributes, destinationFieldName: TblActProductAttributes.IsActive },
    ]
  },
  {
    destinationName: Tables.ActProductBarcodes,
    templateName: "Product Barcodes",
    templateFields: [
      { templateFieldName: "Product Barcode Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Product Barcode Id",destinationName: Tables.ActProductBarcodes, destinationFieldName: TblActProductBarcodes.ProductBarcodeId,isDestinationPrimaryKey:true },
      { templateFieldName: "Barcode Name", destinationName: Tables.ActProductBarcodes, destinationFieldName: TblActProductBarcodes.ProductBarcodeName },
      { templateFieldName: "Barcode Value", destinationName: Tables.ActProductBarcodes, destinationFieldName: TblActProductBarcodes.BarcodeValue },
      { templateFieldName: "Product Name", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Product Name' },
      { templateFieldName: "Barcode Is Active", destinationName: Tables.ActProductBarcodes, destinationFieldName: TblActProductBarcodes.IsActive },
    ]
  },
  {
    destinationName: Tables.ActProductPrices,
    templateName: "Product Prices",
    templateFields: [
      { templateFieldName: "Product Price Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Product Price Id",destinationName: Tables.ActProductPrices, destinationFieldName: TblActProductPrices.ProductPriceId,isDestinationPrimaryKey:true },
      { templateFieldName: "Price Name", destinationName: Tables.ActProductPrices, destinationFieldName: TblActProductPrices.ProductPriceName },
      { templateFieldName: "Product Name", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Product Name' },
      { templateFieldName: "Price Purchase", destinationName: Tables.ActProductPrices, destinationFieldName: TblActProductPrices.PricePurchase },
      { templateFieldName: "Price Sale", destinationName: Tables.ActProductPrices, destinationFieldName: TblActProductPrices.PriceSale },
      { templateFieldName: "Price Mrp", destinationName: Tables.ActProductPrices, destinationFieldName: TblActProductPrices.PriceMrp },
      { templateFieldName: "Profit Margin", destinationName: Tables.ActProductPrices, destinationFieldName: TblActProductPrices.ProfitMargin },
      { templateFieldName: "Price Is Current", destinationName: Tables.ActProductPrices, destinationFieldName: TblActProductPrices.IsCurrent },
      { templateFieldName: "Price Is Active", destinationName: Tables.ActProductPrices, destinationFieldName: TblActProductPrices.IsActive },
    ]
  },
  {
    destinationName: Tables.ActProductPurchaseDetails,
    templateName: "Product Purchase Details",
    templateFields: [
      { templateFieldName: "Product Purchase Detail Unqiue Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Product Purchase Detail Id",destinationName: Tables.ActProductPurchaseDetails, destinationFieldName: TblActProductPurchaseDetails.ProductPurchaseDetailId,isDestinationPrimaryKey:true },
      { templateFieldName: "Product Name", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Product Name' },
      { templateFieldName: "Product Unique Id", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Product Unique Id' },
      { templateFieldName: "Purchase UOM", foreignKeyTemplateName:'Product UOMs',foreignKeyTemplateFieldName:'UOM Name' },
      { templateFieldName: "Purchase Tax%", foreignKeyTemplateName:'Tax Name',foreignKeyTemplateFieldName:'Tax Percentage' },
      { templateFieldName: "Purchase Detail Name", destinationName: Tables.ActProductPurchaseDetails, destinationFieldName: TblActProductPurchaseDetails.ProductPurchaseDetailName },
      { templateFieldName: "Purchase Detail Is Current", destinationName: Tables.ActProductPurchaseDetails, destinationFieldName: TblActProductPurchaseDetails.IsCurrent },
      { templateFieldName: "Purchase Detail Is Active", destinationName: Tables.ActProductPurchaseDetails, destinationFieldName: TblActProductPurchaseDetails.IsActive },
    ]
  },
  {
    destinationName: Tables.ActProductSaleDetails,
    templateName: "Product Sale Details",
    templateFields: [
      { templateFieldName: "Product Sale Detail Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Product Sale Detail Id",destinationName: Tables.ActProductSaleDetails, destinationFieldName: TblActProductSaleDetails.ProductSaleDetailId,isDestinationPrimaryKey:true },
      { templateFieldName: "Product Name", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Product Name' },
      { templateFieldName: "Product Unique Id", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Id' },
      { templateFieldName: "Sale UOM", foreignKeyTemplateName:'Product UOMs',foreignKeyTemplateFieldName:'UOM Name' },
      { templateFieldName: "Sale Tax%", foreignKeyTemplateName:'Tax Name',foreignKeyTemplateFieldName:'Tax Percentage' },
      { templateFieldName: "Sale Detail Name", destinationName: Tables.ActProductSaleDetails, destinationFieldName: TblActProductSaleDetails.ProductSaleDetailName },
      { templateFieldName: "Sale Detail Is Current", destinationName: Tables.ActProductSaleDetails, destinationFieldName: TblActProductSaleDetails.IsCurrent },
      { templateFieldName: "Sale Detail Is Active", destinationName: Tables.ActProductSaleDetails, destinationFieldName: TblActProductSaleDetails.IsActive },
    ]
  },
  {
    destinationName: Tables.ActProductStockDetails,
    templateName: "Product Stock Details",
    templateFields: [
      { templateFieldName: "Stock Detail Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Stock Detail Id",destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductSaleDetails.ProductSaleDetailId,isDestinationPrimaryKey:true },
      { templateFieldName: "Product Name", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Product Name' },
      { templateFieldName: "Product Unique Id", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Id' },
      { templateFieldName: "Max Stock Quantity", destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.MaximumStockQuantity },
      { templateFieldName: "Max Stock UOM", foreignKeyTemplateName:'Product UOMs',foreignKeyTemplateFieldName:'UOM Name', destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.MaximumStockUomId },
      { templateFieldName: "Min Stock Quantity", destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.MinimumStockQuantity },
      { templateFieldName: "Min Stock UOM", foreignKeyTemplateName:'Product UOMs',foreignKeyTemplateFieldName:'UOM Name', destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.MinimumStockUomId },
      { templateFieldName: "Reorder Level Quantity", destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.ReorderLevelQuantity },
      { templateFieldName: "Reorder Level UOM", foreignKeyTemplateName:'Product UOMs',foreignKeyTemplateFieldName:'UOM Name', destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.ReorderLevelUomId },
      { templateFieldName: "Stock UOM", foreignKeyTemplateName:'Product UOMs',foreignKeyTemplateFieldName:'UOM Name', destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.StockUomId },
      { templateFieldName: "Stock Detail Name", destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.ProductStockDetailName },
      { templateFieldName: "Stock Detail Is Current", destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.IsCurrent },
      { templateFieldName: "Stock Detail Is Active", destinationName: Tables.ActProductStockDetails, destinationFieldName: TblActProductStockDetails.IsActive },
    ]
  },
  {
    destinationName: Tables.ActProductUoms,
    templateName: "Product UOMs",
    templateFields: [
      { templateFieldName: "Product UOM Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Product UOM Id",destinationName: Tables.ActProductUoms, destinationFieldName: TblActProductUoms.ProductUomId,isDestinationPrimaryKey:true },
      { templateFieldName: "Product Name", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Product Name' },
      { templateFieldName: "Product Unique Id", foreignKeyTemplateName:'Products',foreignKeyTemplateFieldName:'Product Unqiue Id' },
      { templateFieldName: "UOM Name", destinationName: Tables.ActProductUoms, destinationFieldName: TblActProductUoms.ProductUomName },
      { templateFieldName: "UOM Quantity", destinationName: Tables.ActProductUoms, destinationFieldName: TblActProductUoms.ProductUomQuantity },
      { templateFieldName: "UOM Display Index", destinationName: Tables.ActProductUoms, destinationFieldName: TblActProductUoms.DisplayIndex }
    ]
  },
  {
    destinationName: Tables.ActProducts,
    templateName: "Products",
    templateFields: [
      { templateFieldName: "Product Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Product Id", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.ProductId, isDestinationPrimaryKey:true },
      { templateFieldName: "Product Name", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.ProductName },
      { templateFieldName: "Product SKU", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.ProductSku },
      { templateFieldName: "HSN Code", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.HsnCode },
      { templateFieldName: "Brand Name", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.BrandName },
      { templateFieldName: "Category Name", destinationName: Tables.ActProductCategories, foreignKeyTemplateName:'Product Categories', foreignKeyTemplateFieldName: "Category Name" },
      { templateFieldName: "Category Unique Id", foreignKeyTemplateName:'Product Categories', foreignKeyTemplateFieldName: "Category Unique Id" },
      { templateFieldName: "Product Quick Description", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.ProductQuickDescription },
      { templateFieldName: "Product Full Description", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.ProductFullDescription },
      { templateFieldName: "Product Tags", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.ProductTags },
      { templateFieldName: "Delivery Available", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.DeliveryAvailable },
      { templateFieldName: "Pickup Available", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.PickupAvailable },
      { templateFieldName: "Is Product Active", destinationName: Tables.ActProducts, destinationFieldName: TblActProducts.IsActive },
    ],
    extendChildTemplates:[
      {templateName:"Product Attributes",excludeFields:["Product id","Product Unique Id","Product Name"],childDestinationField:TblActProductAttributes.ProductId,parentDestinationField:TblActProducts.ProductId},
      {templateName:"Product Prices",excludeFields:["Product id","Product Unique Id","Product Name"],childDestinationField:TblActProductAttributes.ProductId,parentDestinationField:TblActProducts.ProductId},
      {templateName:"Product Sale Details",excludeFields:["Product id","Product Unique Id","Product Name"],childDestinationField:TblActProductAttributes.ProductId,parentDestinationField:TblActProducts.ProductId},
      {templateName:"Product Purchase Details",excludeFields:["Product id","Product Unique Id","Product Name"],childDestinationField:TblActProductAttributes.ProductId,parentDestinationField:TblActProducts.ProductId},
      {templateName:"Product Stock Details",excludeFields:["Product id","Product Unique Id","Product Name"],childDestinationField:TblActProductAttributes.ProductId,parentDestinationField:TblActProducts.ProductId},
      {templateName:"Product UOMs",excludeFields:["Product id","Product Unique Id","Product Name"],childDestinationField:TblActProductAttributes.ProductId,parentDestinationField:TblActProducts.ProductId},
      {templateName:"Product Barcodes",excludeFields:["Product id","Product Unique Id","Product Name"],childDestinationField:TblActProductAttributes.ProductId,parentDestinationField:TblActProducts.ProductId},
    ]
  },
  {
    destinationName: Tables.ActPurchaseInvoices,
    templateName: "Purchase Invoices",
    templateFields: [
      { templateFieldName: "Purchase Invoice Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Purchase Invoice Id", destinationName: Tables.ActPurchaseInvoices, destinationFieldName: TblActPurchaseInvoices.PurchaseInvoiceId, isDestinationPrimaryKey:true },
      { templateFieldName: "Invoice Number", destinationName: Tables.ActPurchaseInvoices, destinationFieldName: TblActPurchaseInvoices.PurchaseInvoiceNumber },
      { templateFieldName: "Invoice DateTime", destinationName: Tables.ActPurchaseInvoices, destinationFieldName: TblActPurchaseInvoices.PurchaseInvoiceDatetime },
      { templateFieldName: "Supplier Unique Id", foreignKeyTemplateName: "Suppliers", foreignKeyTemplateFieldName: "Supplier Unique Id" },
      { templateFieldName: "Supplier Name", foreignKeyTemplateName: "Suppliers", foreignKeyTemplateFieldName: "Supplier Name" },
      { templateFieldName: "Invoice Amount", destinationName: Tables.ActPurchaseInvoices, destinationFieldName: TblActPurchaseInvoices.PurchaseInvoiceAmount },
      { templateFieldName: "Invoice Type", destinationName: Tables.ActPurchaseInvoices, destinationFieldName: TblActPurchaseInvoices.PurchaseInvoiceType },
      { templateFieldName: "Invoice Remarks", destinationName: Tables.ActPurchaseInvoices, destinationFieldName: TblActPurchaseInvoices.PurchaseInvoiceRemarks },
    ],
    extendChildTemplates:[
      {templateName:"Purchase Invoice Products",excludeFields:["Purchase Invoice Unique Id","Purchase Invoice Id"]},
      {templateName:"Purchase Invoice Payments",excludeFields:["Purchase Invoice Unique Id","Purchase Invoice Id"]},
    ]
  },
  {
    destinationName: Tables.ActPurchaseInvoicePayments,
    templateName: "Purchase Invoice Payments",
    templateFields: [
      { templateFieldName: "Payment Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Purchase Invoice Unique Id",foreignKeyTemplateName:'Purchase Invoices' ,foreignKeyTemplateFieldName:'Purchase Invoice Unique Id', isLookupTemplateField:true },
      { templateFieldName: "Purchase Invoice Id", destinationName: Tables.ActPurchaseInvoicePayments, destinationFieldName: TblActPurchaseInvoicePayments.PurchaseInvoiceId,foreignKeyTemplateName:'Purchase Invoices' ,foreignKeyTemplateFieldName:'Purchase Invoice Id' },
      { templateFieldName: "Payment Id",destinationName: Tables.ActPurchaseInvoicePayments, destinationFieldName: TblActPurchaseInvoicePayments.PurchaseInvoicePaymentId,isDestinationPrimaryKey:true },
      { templateFieldName: "Payment Method Name", foreignKeyTemplateName: "Payment Methods", destinationFieldName: "Payment Method Name" },
      { templateFieldName: "Payment Method Unique Id", foreignKeyTemplateName: "Payment Methods", destinationFieldName: "Payment Method Unique Id" },
      { templateFieldName: "Payment Amount", destinationName: Tables.ActPurchaseInvoicePayments, destinationFieldName: TblActPurchaseInvoicePayments.PurchaseInvoicePaymentAmount },
      { templateFieldName: "Payment DateTime", destinationName: Tables.ActPurchaseInvoicePayments, destinationFieldName: TblActPurchaseInvoicePayments.PurchaseInvoicePaymentDatetime },
      { templateFieldName: "Payment Status", destinationName: Tables.ActPurchaseInvoicePayments, destinationFieldName: TblActPurchaseInvoicePayments.PurchaseInvoicePaymentStatus },
      { templateFieldName: "Payment Remarks", destinationName: Tables.ActPurchaseInvoicePayments, destinationFieldName: TblActPurchaseInvoicePayments.PurchaseInvoicePaymentRemarks },
      { templateFieldName: "Payment Reference Number", destinationName: Tables.ActPurchaseInvoicePayments, destinationFieldName: TblActPurchaseInvoicePayments.ReferenceNumber },
    ]
  },
  {
    destinationName: Tables.ActPurchaseInvoiceProducts,
    templateName: "Purchase Invoice Products",
    templateFields: [
      { templateFieldName: "Product Detail Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Purchase Invoice Unique Id",foreignKeyTemplateName:'Purchase Invoices' ,foreignKeyTemplateFieldName:'Purchase Invoice Unique Id', isLookupTemplateField:true },
      { templateFieldName: "Purchase Invoice Id", destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.PurchaseInvoiceId,foreignKeyTemplateName:'Purchase Invoices' ,foreignKeyTemplateFieldName:'Purchase Invoice Id' },
      { templateFieldName: "Product Detail Id",destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.PurchaseInvoiceProductId,isDestinationPrimaryKey:true },
      { templateFieldName: "Product Unique Id", foreignKeyTemplateName:'Products', foreignKeyTemplateFieldName: "Product Unique Id" },
      { templateFieldName: "Product Name", foreignKeyTemplateName:'Products', foreignKeyTemplateFieldName: "Product Name" },
      { templateFieldName: "Product UOM Name", foreignKeyTemplateName:'Product UOMs', foreignKeyTemplateFieldName: "UOM Name" },
      { templateFieldName: "Product Description", destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.ProductDescription },
      { templateFieldName: "Product Quantity", destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.ProductQuantity },
      { templateFieldName: "Product TD%", destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.DiscountTradePercentage },
      { templateFieldName: "Product CD%", destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.DiscountCashPercentage },
      { templateFieldName: "Product Rebate%", destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.DiscountRebatePercentage },
      { templateFieldName: "Product Tax%", destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.TaxRatePercentage },
      { templateFieldName: "Product Final Price", destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.ProductPriceFinal },
      { templateFieldName: "Product MRP", destinationName: Tables.ActPurchaseInvoiceProducts, destinationFieldName: TblActPurchaseInvoiceProducts.ProductPriceMrp },
    ]
  },
  {
    destinationName: Tables.ActSaleInvoices,
    templateName: "Sale Invoices",
    templateFields: [
      { templateFieldName: "Sale Invoice Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Sale Invoice Id", destinationName: Tables.ActSaleInvoices, destinationFieldName: TblActSaleInvoices.SaleInvoiceId, isDestinationPrimaryKey:true },
      { templateFieldName: "Invoice Amount", destinationName: Tables.ActSaleInvoices, destinationFieldName: TblActSaleInvoices.SaleInvoiceAmount },
      { templateFieldName: "Invoice Number", destinationName: Tables.ActSaleInvoices, destinationFieldName: TblActSaleInvoices.SaleInvoiceNumber },
      { templateFieldName: "Invoice Date", destinationName: Tables.ActSaleInvoices, destinationFieldName: TblActSaleInvoices.SaleInvoiceDatetime },
      { templateFieldName: "Customer Name",foreignKeyTemplateName:'Customers', foreignKeyTemplateFieldName:'Party Name' },
      { templateFieldName: "Customer Unique Id",foreignKeyTemplateName:'Customers', foreignKeyTemplateFieldName:'Customer Unique Id' },
      { templateFieldName: "Invoice Type", destinationName: Tables.ActSaleInvoices, destinationFieldName: TblActSaleInvoices.SaleInvoiceType },
      { templateFieldName: "Invoice Remarks", destinationName: Tables.ActSaleInvoices, destinationFieldName: TblActSaleInvoices.SaleInvoiceRemarks },
    ],
    extendChildTemplates:[
      {templateName:"Sale Invoice Products",excludeFields:["Sale Invoice Unique Id","Sale Invoice Id"]},
      {templateName:"Sale Invoice Payments",excludeFields:["Sale Invoice Unique Id","Sale Invoice Id"]},
    ]
  },
  {
    destinationName: Tables.ActSaleInvoicePayments,
    templateName: "Sale Invoice Payments",
    templateFields: [
      { templateFieldName: "Payment Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Payment Id",destinationName: Tables.ActSaleInvoicePayments, destinationFieldName: TblActSaleInvoicePayments.SaleInvoicePaymentId,isDestinationPrimaryKey:true },
      { templateFieldName: "Payment Method Name", foreignKeyTemplateName: "Payment Methods", destinationFieldName: "Payment Method Name" },
      { templateFieldName: "Payment Method Unique Id", foreignKeyTemplateName: "Payment Methods", destinationFieldName: "Payment Method Unique Id" },
      { templateFieldName: "Payment Amount", destinationName: Tables.ActSaleInvoicePayments, destinationFieldName: TblActSaleInvoicePayments.SaleInvoicePaymentAmount },
      { templateFieldName: "Payment DateTime", destinationName: Tables.ActSaleInvoicePayments, destinationFieldName: TblActSaleInvoicePayments.SaleInvoicePaymentDatetime },
      { templateFieldName: "Payment Status", destinationName: Tables.ActSaleInvoicePayments, destinationFieldName: TblActSaleInvoicePayments.SaleInvoicePaymentStatus },
      { templateFieldName: "Payment Remarks", destinationName: Tables.ActSaleInvoicePayments, destinationFieldName: TblActSaleInvoicePayments.SaleInvoicePaymentRemarks },
      { templateFieldName: "Payment Reference Number", destinationName: Tables.ActSaleInvoicePayments, destinationFieldName: TblActSaleInvoicePayments.ReferenceNumber },
    ]
  },
  {
    destinationName: Tables.ActSaleInvoiceProducts,
    templateName: "Sale Invoice Products",
    templateFields: [
      { templateFieldName: "Product Detail Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Sale Invoice Unique Id",foreignKeyTemplateName:'Sale Invoices' ,foreignKeyTemplateFieldName:'Sale Invoice Unique Id', isLookupTemplateField:true },
      { templateFieldName: "Sale Invoice Id", destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.SaleInvoiceId,foreignKeyTemplateName:'Sale Invoices' ,foreignKeyTemplateFieldName:'Sale Invoice Id' },
      { templateFieldName: "Product Detail Id",destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.SaleInvoiceProductId,isDestinationPrimaryKey:true },
      { templateFieldName: "Product Unique Id", foreignKeyTemplateName:'Products', foreignKeyTemplateFieldName: "Product Unique Id" },
      { templateFieldName: "Product Name", foreignKeyTemplateName:'Products', foreignKeyTemplateFieldName: "Product Name" },
      { templateFieldName: "Product UOM Name", foreignKeyTemplateName:'Product UOMs', foreignKeyTemplateFieldName: "UOM Name" },
      { templateFieldName: "Product Description", destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.ProductDescription },
      { templateFieldName: "Product Quantity", destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.ProductQuantity },
      { templateFieldName: "Product TD%", destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.DiscountTradePercentage },
      { templateFieldName: "Product CD%", destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.DiscountCashPercentage },
      { templateFieldName: "Product Rebate%", destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.DiscountRebatePercentage },
      { templateFieldName: "Product Tax%", destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.TaxRatePercentage },
      { templateFieldName: "Product Final Price", destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.ProductPriceFinal },
      { templateFieldName: "Product MRP", destinationName: Tables.ActSaleInvoiceProducts, destinationFieldName: TblActSaleInvoiceProducts.ProductPriceMrp },
    ]
  },
  {
    destinationName: Tables.ActSocialMedias,
    templateName: "Social Medias",
    templateFields: [
      { templateFieldName: "Social Media Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Social Media Id",destinationName: Tables.ActSocialMedias, destinationFieldName: TblActSocialMedias.SocialMediaId,isDestinationPrimaryKey:true },
      { templateFieldName: "Social Media Type", destinationName: Tables.ActSocialMedias, destinationFieldName: TblActSocialMedias.SocialMediaType },
      { templateFieldName: "Social Media Value", destinationName: Tables.ActSocialMedias, destinationFieldName: TblActSocialMedias.SocialMediaValue },
    ]
  },
  {
    destinationName: Tables.ActSuppliers,
    templateName: "Suppliers",
    templateFields: [
      { templateFieldName: "Supplier Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Supplier Id", destinationName: Tables.ActSuppliers, destinationFieldName: TblActSuppliers.SupplierId, isDestinationPrimaryKey:true },
      { templateFieldName: "Supplier Name", destinationName: Tables.ActParties, destinationFieldName: TblActParties.PartyName },
      { templateFieldName: "Supplier Type", destinationName: Tables.ActSuppliers, destinationFieldName: TblActSuppliers.SupplierType },
      { templateFieldName: "Remarks", destinationName: Tables.ActSuppliers, destinationFieldName: TblActSuppliers.SupplierRemarks },
      { templateFieldName: "Is Active", destinationName: Tables.ActSuppliers, destinationFieldName: TblActSuppliers.IsActive },
    ],
    extendParentTemplates:[
      {
        templateName:"Parties",
        referencingFields:[{
          extendingTemplateFieldName:"Party Id",
          templateDestinationFieldName:TblActSuppliers.PartyId,
          lookupFields:['Party Name',"Party Unique Id"]
        }]
      }
    ]
  },
  {
    destinationName: Tables.ActTaxingSchemes,
    templateName: "Taxing Schemes",
    templateFields: [
      { templateFieldName: "Taxing Scheme Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Taxing Scheme Id",destinationName: Tables.ActTaxingSchemes, destinationFieldName: TblActTaxingSchemes.TaxingSchemeId,isDestinationPrimaryKey:true },
      { templateFieldName: "Taxing Scheme Name", destinationName: Tables.ActTaxingSchemes, destinationFieldName: TblActTaxingSchemes.TaxingSchemeName },
    ],
    extendChildTemplates:[
      {templateName:"Tax Rates",excludeFields:["Taxing Scheme Name","Taxing Scheme Id"]},
    ]
  },
  {
    destinationName: Tables.ActTaxingSchemes,
    templateName: "Tax Rates",
    templateFields: [
      { templateFieldName: "Tax Rate Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Tax Rate Id",destinationName: Tables.ActTaxRates, destinationFieldName: TblActTaxRates.TaxRateId,isDestinationPrimaryKey:true },
      { templateFieldName: "Taxing Scheme Name", foreignKeyTemplateName:'Taxing Schemes', foreignKeyTemplateFieldName:'Taxing Scheme Name', isLookupTemplateField:true },
      { templateFieldName: "Taxing Scheme Id", foreignKeyTemplateName:'Taxing Schemes', foreignKeyTemplateFieldName:'Taxing Scheme Id',destinationName: Tables.ActTaxRates, destinationFieldName: TblActTaxRates.TaxingSchemeId },
      { templateFieldName: "Tax Name", destinationName: Tables.ActTaxRates, destinationFieldName: TblActTaxRates.TaxRateName },
      { templateFieldName: "Tax Percentage", destinationName: Tables.ActTaxRates, destinationFieldName: TblActTaxRates.TaxRatePercentage },
    ]
  },
  {
    destinationName: Tables.ActTransactionEntries,
    templateName: "Transaction Entries",
    templateFields: [
      { templateFieldName: "Transaction Entry Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Transaction Unique Id", foreignKeyTemplateName:'Transactions', foreignKeyTemplateFieldName:'Transaction Unique id', isLookupTemplateField:true },
      { templateFieldName: "Transaction Id", foreignKeyTemplateName:'Transactions', foreignKeyTemplateFieldName:'Transaction Unique id', destinationName:Tables.ActTransactionEntries,destinationFieldName:TblActTransactionEntries.TransactionId },
      { templateFieldName: "Transaction Entry Id", destinationName: Tables.ActTransactionEntries, destinationFieldName: TblActTransactionEntries.TransactionEntryId, isDestinationPrimaryKey:true },
      { templateFieldName: "Ledger Account Name", foreignKeyTemplateName: 'Ledger Accounts', foreignKeyTemplateFieldName: 'Ledger Account Name' },
      { templateFieldName: "Ledger Account Unique Id", foreignKeyTemplateName: 'Ledger Accounts', foreignKeyTemplateFieldName: 'Ledger Account Unique Id' },
      { templateFieldName: "Entry Amount", destinationName: Tables.ActTransactionEntries, destinationFieldName: TblActTransactionEntries.TransactionEntryAmount },
      { templateFieldName: "Entry Reference Number", destinationName: Tables.ActTransactionEntries, destinationFieldName: TblActTransactionEntries.ReferenceNumber },
      { templateFieldName: "Is Credit", destinationName: Tables.ActTransactionEntries, destinationFieldName: TblActTransactionEntries.IsCredit }
    ]
  },
  {
    destinationName: Tables.ActTransactions,
    templateName: "Transactions",
    templateFields: [
      { templateFieldName: "Transaction Unique Id", isTemplatePrimaryKey:true },
      { templateFieldName: "Transaction Id", destinationName: Tables.ActTransactions, destinationFieldName: TblActTransactions.TransactionId, isDestinationPrimaryKey:true },
      { templateFieldName: "DateTime", destinationName: Tables.ActTransactions, destinationFieldName: TblActTransactions.TransactionTime },
      { templateFieldName: "Amount", destinationName: Tables.ActTransactions, destinationFieldName: TblActTransactions.TransactionAmount },
      { templateFieldName: "Narration", destinationName: Tables.ActTransactions, destinationFieldName: TblActTransactions.TransactionNarration },
      { templateFieldName: "Transaction Type", destinationName: Tables.ActTransactions, destinationFieldName: TblActTransactions.TransactionType },
      { templateFieldName: "Remarks", destinationName: Tables.ActTransactions, destinationFieldName: TblActTransactions.TransactionRemarks },
    ],
    extendChildTemplates:[
      {'templateName':'Transaction Entries',excludeFields:["Transaction Id", "Transaction Unique Id"]}
    ]
  },
  {
    destinationName: Tables.ActWebsites,
    templateName: "Websites",
    templateFields: [
      { templateFieldName: "Social media Unique Id",isTemplatePrimaryKey:true },
      { templateFieldName: "Social Media Id",destinationName: Tables.ActWebsites, destinationFieldName: TblActWebsites.WebsiteId,isDestinationPrimaryKey:true },
      { templateFieldName: "Website Label", destinationName: Tables.ActWebsites, destinationFieldName: TblActWebsites.WebsiteLabel },
      { templateFieldName: "Website Value", destinationName: Tables.ActWebsites, destinationFieldName: TblActWebsites.WebsiteValue },
    ]
  },
];
