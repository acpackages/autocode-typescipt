import { AC_REPORT_ATTRIBUTE, AcReport } from '@autocode-ts/ac-report-engine';
import { acInitBwipjsPipe } from '@autocode-ts/ac-bwipjs-pipe';
export class BasicReportPage extends HTMLElement {
  public static observedAttributes = [];
  data: any = {
    "record": {
      "id": 74240,
      "created_on": "2025-03-31",
      "modified_on": "2025-04-10",
      "accountee_id": 1,
      "account_debit": 228,
      "account_credit": 62,
      "account_transaction": 10,
      "date": "2025-03-31",
      "amount": 2540,
      "narration": "Tax Sale Invoice Document - 46510",
      "type": "SALE INVOICE",
      "sub_type": "TAX",
      "supply_mode": "INTRA",
      "details": {
        "vehicle_number": ""
      },
      "status": 1,
      "person_associated": "SELF",
      "document_number": "46510",
      "parent_id": 0,
      "other_amount": 0,
      "employee_id": 0,
      "media_files": null,
      "user_id": null,
      "transaction_account_name": "Cash",
      "transaction_business_id": "",
      "transaction_account_type": "CASH & EQUIVALENTS",
      "transaction_account_category": "",
      "transaction_account_balance": 670343,
      "transaction_state_name": "",
      "transaction_city_name": "",
      "transaction_phone_details": "",
      "transaction_upi_details": "",
      "debit_account_name": "KMB",
      "debit_business_id": "",
      "debit_account_type": "BANK ACCOUNTS",
      "debit_account_category": "",
      "debit_account_balance": 56496.97000000626,
      "debit_state_name": "",
      "debit_city_name": "",
      "debit_phone_details": "{}",
      "debit_upi_details": "{}",
      "credit_account_name": "Sale",
      "credit_business_id": "",
      "credit_account_type": "TRADING",
      "credit_account_category": "",
      "credit_account_balance": -14216428,
      "credit_state_name": "",
      "credit_city_name": "",
      "credit_phone_details": "",
      "credit_upi_details": "",
      "user_display_name": null
    },
    "account": {
      "id": 10,
      "created_on": "2023-07-16",
      "modified_on": "2023-07-16",
      "accountee_id": 1,
      "name": "Cash",
      "target": "BALANCE SHEET",
      "category_name": "",
      "contact_name": "",
      "email_details": null,
      "phone_details": null,
      "website_details": null,
      "address": "",
      "country": "",
      "state": "",
      "city": "",
      "postal_code": "",
      "business_id": "",
      "remarks": "",
      "credit_type": 0,
      "credit_amount": 0,
      "credit_days": 0,
      "parent_id": 0,
      "is_expense": 0,
      "is_income": 0,
      "is_customer": 1,
      "is_supplier": 1,
      "upi_details": null,
      "bank_details": null,
      "legal_details": null,
      "social_media_details": null,
      "media_files": null,
      "type": "CASH & EQUIVALENTS",
      "debit_count": 26323,
      "debit_total": 7775559,
      "credit_count": 837,
      "credit_total": 7105216,
      "transactions_count": 27160,
      "balance": 670343
    },
    "details": [
      {
        "cess_percentage": 0,
        "id": 316603,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 15453,
        "item_narration": "Gokul Tikha Mitha Mix 500gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 12,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 76,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 80,
        "hsnsac_code": "210690",
        "item_details": "",
        "name": "Gokul Tikha Mitha Mix 500gm",
        "number": "8906155920571",
        "amount": 76,
        "amount_mrp": 80,
        "difference_mrp_actual_price": 4,
        "difference_mrp_actual_amount": 4,
        "amount_gross": 67.85714285714286,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 67.85714285714286,
        "price_net": 67.85714285714286,
        "amount_net": 67.85714285714286,
        "tax_amount": 8.142857142857142,
        "tax_amount_total": 8.142857142857142,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316604,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 16507,
        "item_narration": "Sangita Soap 170gm",
        "uqc_code": "NOS",
        "quantity": 5,
        "tax_percentage": 18,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 10,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 10,
        "hsnsac_code": "08134020",
        "item_details": "",
        "name": "Sangita Soap 170gm",
        "number": "8903401100084",
        "amount": 50,
        "amount_mrp": 50,
        "difference_mrp_actual_price": 0,
        "difference_mrp_actual_amount": 0,
        "amount_gross": 42.37288135593221,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 8.474576271186441,
        "price_net": 8.474576271186441,
        "amount_net": 42.37288135593221,
        "tax_amount": 1.5254237288135593,
        "tax_amount_total": 7.627118644067796,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316605,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 15339,
        "item_narration": "Vasant Chilli Powder 1kg",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 5,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 425,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 450,
        "hsnsac_code": "09042211",
        "item_details": "",
        "name": "Vasant Chilli Powder 1kg",
        "number": "8906101820139",
        "amount": 425,
        "amount_mrp": 450,
        "difference_mrp_actual_price": 25,
        "difference_mrp_actual_amount": 25,
        "amount_gross": 404.76190476190476,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 404.76190476190476,
        "price_net": 404.76190476190476,
        "amount_net": 404.76190476190476,
        "tax_amount": 20.238095238095237,
        "tax_amount_total": 20.238095238095237,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316606,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 18859,
        "item_narration": "Vasant Dhana Jirua Powder 1KG",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 5,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 405,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 430,
        "hsnsac_code": "09109100",
        "item_details": "",
        "name": "Vasant Dhana Jirua Powder 1KG",
        "number": "8906101820184",
        "amount": 405,
        "amount_mrp": 430,
        "difference_mrp_actual_price": 25,
        "difference_mrp_actual_amount": 25,
        "amount_gross": 385.7142857142857,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 385.7142857142857,
        "price_net": 385.7142857142857,
        "amount_net": 385.7142857142857,
        "tax_amount": 19.285714285714285,
        "tax_amount_total": 19.285714285714285,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316607,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 14423,
        "item_narration": "Pixie Dishwash Bar 120gm",
        "uqc_code": "NOS",
        "quantity": 5,
        "tax_percentage": 18,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 10,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 10,
        "hsnsac_code": "34054000",
        "item_details": "",
        "name": "Pixie Dishwash Bar 120gm",
        "number": "8904281903482",
        "amount": 50,
        "amount_mrp": 50,
        "difference_mrp_actual_price": 0,
        "difference_mrp_actual_amount": 0,
        "amount_gross": 42.37288135593221,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 8.474576271186441,
        "price_net": 8.474576271186441,
        "amount_net": 42.37288135593221,
        "tax_amount": 1.5254237288135593,
        "tax_amount_total": 7.627118644067796,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316608,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 14691,
        "item_narration": "Madhur Sugar 1kg",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 5,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 58,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 65,
        "hsnsac_code": "17011490",
        "item_details": "",
        "name": "Madhur Sugar 1kg",
        "number": "8906026900022",
        "amount": 58,
        "amount_mrp": 65,
        "difference_mrp_actual_price": 7,
        "difference_mrp_actual_amount": 7,
        "amount_gross": 55.23809523809524,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 55.23809523809524,
        "price_net": 55.23809523809524,
        "amount_net": 55.23809523809524,
        "tax_amount": 2.761904761904762,
        "tax_amount_total": 2.761904761904762,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316609,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 14039,
        "item_narration": "Vasant Tea Masala Powder 100gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 5,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 130,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 140,
        "hsnsac_code": "09042211",
        "item_details": "",
        "name": "Vasant Tea Masala Powder 100gm",
        "number": "8906101820382",
        "amount": 130,
        "amount_mrp": 140,
        "difference_mrp_actual_price": 10,
        "difference_mrp_actual_amount": 10,
        "amount_gross": 123.80952380952381,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 123.80952380952381,
        "price_net": 123.80952380952381,
        "amount_net": 123.80952380952381,
        "tax_amount": 6.190476190476191,
        "tax_amount_total": 6.190476190476191,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316610,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 18546,
        "item_narration": "Cadbury Oreo Choco Biscuits 43.75gm",
        "uqc_code": "NOS",
        "quantity": 2,
        "tax_percentage": 18,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 10,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 10,
        "hsnsac_code": "19053100",
        "item_details": "",
        "name": "Cadbury Oreo Choco Biscuits 43.75gm",
        "number": "7622202225550",
        "amount": 20,
        "amount_mrp": 20,
        "difference_mrp_actual_price": 0,
        "difference_mrp_actual_amount": 0,
        "amount_gross": 16.949152542372882,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 8.474576271186441,
        "price_net": 8.474576271186441,
        "amount_net": 16.949152542372882,
        "tax_amount": 1.5254237288135593,
        "tax_amount_total": 3.0508474576271185,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316611,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 15737,
        "item_narration": "Britannia Treat Orange Cream 51gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 18,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 10,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 10,
        "hsnsac_code": "19053100",
        "item_details": "",
        "name": "Britannia Treat Orange Cream 51gm",
        "number": "8901063033306",
        "amount": 10,
        "amount_mrp": 10,
        "difference_mrp_actual_price": 0,
        "difference_mrp_actual_amount": 0,
        "amount_gross": 8.474576271186441,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 8.474576271186441,
        "price_net": 8.474576271186441,
        "amount_net": 8.474576271186441,
        "tax_amount": 1.5254237288135593,
        "tax_amount_total": 1.5254237288135593,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316612,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 15531,
        "item_narration": "Parle Fab Jam-In 55gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 18,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 10,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 10,
        "hsnsac_code": "19059020",
        "item_details": "",
        "name": "Parle Fab Jam-In 55gm",
        "number": "8901719107320",
        "amount": 10,
        "amount_mrp": 10,
        "difference_mrp_actual_price": 0,
        "difference_mrp_actual_amount": 0,
        "amount_gross": 8.474576271186441,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 8.474576271186441,
        "price_net": 8.474576271186441,
        "amount_net": 8.474576271186441,
        "tax_amount": 1.5254237288135593,
        "tax_amount_total": 1.5254237288135593,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316613,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 18374,
        "item_narration": "Sunfeast Mom's Magic Butter 56gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 18,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 10,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 10,
        "hsnsac_code": "19053100",
        "item_details": "",
        "name": "Sunfeast Mom's Magic Butter 56gm",
        "number": "8909081005107",
        "amount": 10,
        "amount_mrp": 10,
        "difference_mrp_actual_price": 0,
        "difference_mrp_actual_amount": 0,
        "amount_gross": 8.474576271186441,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 8.474576271186441,
        "price_net": 8.474576271186441,
        "amount_net": 8.474576271186441,
        "tax_amount": 1.5254237288135593,
        "tax_amount_total": 1.5254237288135593,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316614,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 12576,
        "item_narration": "Amul Butter Cookies Nuts & Raisin 50gms",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 18,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 25,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 25,
        "hsnsac_code": "1905",
        "item_details": "",
        "name": "Amul Butter Cookies Nuts & Raisin 50gms",
        "number": "8901262221139",
        "amount": 25,
        "amount_mrp": 25,
        "difference_mrp_actual_price": 0,
        "difference_mrp_actual_amount": 0,
        "amount_gross": 21.1864406779661,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 21.1864406779661,
        "price_net": 21.1864406779661,
        "amount_net": 21.1864406779661,
        "tax_amount": 3.8135593220338984,
        "tax_amount_total": 3.8135593220338984,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316615,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 18549,
        "item_narration": "Cadbury Original Oreo Biscuits 43.75gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 18,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 10,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 10,
        "hsnsac_code": "19053100",
        "item_details": "",
        "name": "Cadbury Original Oreo Biscuits 43.75gm",
        "number": "7622202225512",
        "amount": 10,
        "amount_mrp": 10,
        "difference_mrp_actual_price": 0,
        "difference_mrp_actual_amount": 0,
        "amount_gross": 8.474576271186441,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 8.474576271186441,
        "price_net": 8.474576271186441,
        "amount_net": 8.474576271186441,
        "tax_amount": 1.5254237288135593,
        "tax_amount_total": 1.5254237288135593,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316616,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 14355,
        "item_narration": "Parle 20-20 Cashew Cookies 200gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 18,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 33,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 35,
        "hsnsac_code": "1905",
        "item_details": "",
        "name": "Parle 20-20 Cashew Cookies 200gm",
        "number": "8901719113451",
        "amount": 33,
        "amount_mrp": 35,
        "difference_mrp_actual_price": 2,
        "difference_mrp_actual_amount": 2,
        "amount_gross": 27.966101694915253,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 27.966101694915253,
        "price_net": 27.966101694915253,
        "amount_net": 27.966101694915253,
        "tax_amount": 5.033898305084746,
        "tax_amount_total": 5.033898305084746,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316617,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 13982,
        "item_narration": "Loose Jeera 500gm",
        "uqc_code": "NOS",
        "quantity": 2,
        "tax_percentage": 5,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 190,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 200,
        "hsnsac_code": "09093129",
        "item_details": "",
        "name": "Loose Jeera 500gm",
        "number": "3870022310030034",
        "amount": 380,
        "amount_mrp": 400,
        "difference_mrp_actual_price": 10,
        "difference_mrp_actual_amount": 20,
        "amount_gross": 361.9047619047619,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 180.95238095238096,
        "price_net": 180.95238095238096,
        "amount_net": 361.9047619047619,
        "tax_amount": 9.047619047619047,
        "tax_amount_total": 18.095238095238095,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316618,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 13685,
        "item_narration": "Loose Mogar Dal 500gm",
        "uqc_code": "NOS",
        "quantity": 2,
        "tax_percentage": 0,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 64,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 70,
        "hsnsac_code": "0713",
        "item_details": "",
        "name": "Loose Mogar Dal 500gm",
        "number": "3870022309180006",
        "amount": 128,
        "amount_mrp": 140,
        "difference_mrp_actual_price": 6,
        "difference_mrp_actual_amount": 12,
        "amount_gross": 128,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 64,
        "price_net": 64,
        "amount_net": 128,
        "tax_amount": 0,
        "tax_amount_total": 0,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316619,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 14004,
        "item_narration": "Loose Udad Fada 500gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 0,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 73,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 90,
        "hsnsac_code": "07139010",
        "item_details": "",
        "name": "Loose Udad Fada 500gm",
        "number": "3870022310040002",
        "amount": 73,
        "amount_mrp": 90,
        "difference_mrp_actual_price": 17,
        "difference_mrp_actual_amount": 17,
        "amount_gross": 73,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 73,
        "price_net": 73,
        "amount_net": 73,
        "tax_amount": 0,
        "tax_amount_total": 0,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316620,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 15914,
        "item_narration": "Loose Chana Desi 500gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 0,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 50,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 55,
        "hsnsac_code": "0713",
        "item_details": "",
        "name": "Loose Chana Desi 500gm",
        "number": "3870022310030027",
        "amount": 50,
        "amount_mrp": 55,
        "difference_mrp_actual_price": 5,
        "difference_mrp_actual_amount": 5,
        "amount_gross": 50,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 50,
        "price_net": 50,
        "amount_net": 50,
        "tax_amount": 0,
        "tax_amount_total": 0,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316621,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 18439,
        "item_narration": "Loose Ajwain 500gm",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 0,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 180,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 195,
        "hsnsac_code": "07139010",
        "item_details": "",
        "name": "Loose Ajwain 500gm",
        "number": "387002241220240001",
        "amount": 180,
        "amount_mrp": 195,
        "difference_mrp_actual_price": 15,
        "difference_mrp_actual_amount": 15,
        "amount_gross": 180,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 180,
        "price_net": 180,
        "amount_net": 180,
        "tax_amount": 0,
        "tax_amount_total": 0,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316622,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 13924,
        "item_narration": "Loose Kaju 100gm",
        "uqc_code": "NOS",
        "quantity": 2,
        "tax_percentage": 5,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 110,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 135,
        "hsnsac_code": "0801",
        "item_details": "",
        "name": "Loose Kaju 100gm",
        "number": "3870022310020002",
        "amount": 220,
        "amount_mrp": 270,
        "difference_mrp_actual_price": 25,
        "difference_mrp_actual_amount": 50,
        "amount_gross": 209.52380952380952,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 104.76190476190476,
        "price_net": 104.76190476190476,
        "amount_net": 209.52380952380952,
        "tax_amount": 5.238095238095238,
        "tax_amount_total": 10.476190476190476,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316623,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 14212,
        "item_narration": "Loose GJ 17 Gopi Rice 1kg",
        "uqc_code": "NOS",
        "quantity": 2,
        "tax_percentage": 0,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 56,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 62,
        "hsnsac_code": "1006",
        "item_details": "",
        "name": "Loose GJ 17 Gopi Rice 1kg",
        "number": "387002191120240001",
        "amount": 112,
        "amount_mrp": 124,
        "difference_mrp_actual_price": 6,
        "difference_mrp_actual_amount": 12,
        "amount_gross": 112,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 56,
        "price_net": 56,
        "amount_net": 112,
        "tax_amount": 0,
        "tax_amount_total": 0,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      },
      {
        "cess_percentage": 0,
        "id": 316624,
        "created_on": "2025-03-31",
        "modified_on": "2025-03-31",
        "accountee_id": 1,
        "transaction_id": 74240,
        "item_id": 14697,
        "item_narration": "Loose Basmati Khusdil 1kg",
        "uqc_code": "NOS",
        "quantity": 1,
        "tax_percentage": 0,
        "tax_type": "0",
        "reverse_charge": 0,
        "discount_cash_percentage": 0,
        "discount_trade_percentage": 0,
        "discount_rebate_amount": 0,
        "price_actual": 85,
        "status": 1,
        "details": "",
        "lot_id": "",
        "expiry_time": "",
        "lot_details": "",
        "price_mrp": 100,
        "hsnsac_code": "1006",
        "item_details": "",
        "name": "Loose Basmati Khusdil 1kg",
        "number": "3870022308210001",
        "amount": 85,
        "amount_mrp": 100,
        "difference_mrp_actual_price": 15,
        "difference_mrp_actual_amount": 15,
        "amount_gross": 85,
        "discount_cash_amount": 0,
        "discount_cash_amount_total": 0,
        "discount_rebate_percentage": 0,
        "discount_trade_amount": 0,
        "discount_trade_amount_total": 0,
        "price_gross": 85,
        "price_net": 85,
        "amount_net": 85,
        "tax_amount": 0,
        "tax_amount_total": 0,
        "cess_amount": 0,
        "cess_amount_total": 0,
        "document_type": "SALE INVOICE",
        "document_date": "2025-03-31",
        "document_number": "46510"
      }
    ],
    "terms": {
      "content": "<p><strong>Terms &amp; Conditions :&nbsp;</strong><br>01. Returns accepted only between 04:00 PM to 05:00 PM. 02. Our responsibility ceases the moment the products leave our premises. 03. Any expired products will not be accepted back. Please check your products for expiry before leaving the premises after purchase. 04. <strong>Subject to NADIAD Jurisdiction.</strong></p>"
    },
    "print_type": "ORIGINAL FOR RECIPIENT",
    "memo_type": "CASH MEMO",
    "media": {
      "logo": {
        "id": 1,
        "created_on": "2023-07-25",
        "modified_on": "2023-07-25",
        "accountee_id": 1,
        "name": "ShreeHariMart Vertical.svg",
        "size": 8547,
        "type": "IMAGE",
        "url": "setting/1690265567300/ShreeHariMart Vertical.svg",
        "details": ""
      }
    },
    "type": "sale",
    "accountee": {
      "id": 1,
      "created_on": "2023-07-16",
      "modified_on": "2025-10-15",
      "name": "S H Mart 24 - 25",
      "year_start": "2024-04-01",
      "year_end": "2025-03-31",
      "email_details": {
        "0": {
          "label": "Contact",
          "value": "shmartnadiad@gmail.com"
        }
      },
      "phone_details": {
        "0": {
          "label": "Mobile",
          "value": "8866268666"
        }
      },
      "website_details": {},
      "address": "Opp. Walk Way Garden,\nPij Road, Near Canal",
      "country": "INDIA",
      "state": "GUJARAT",
      "city": "",
      "postal_code": "387002",
      "business_id": "24HENPP2843N1ZS",
      "remarks": "",
      "type": 2,
      "sub_type": 0,
      "logo_image": {
        "id": "2",
        "created_on": "2023-08-12",
        "modified_on": "2023-08-12",
        "accountee_id": "1",
        "name": "SH Icon.svg",
        "size": "3182",
        "type": "IMAGE",
        "url": "accountee/logo/1691820621837/SH Icon.svg",
        "details": ""
      },
      "unique_identifier": "8866268666_20242025",
      "upi_details": {
        "0": {
          "label": "IOB",
          "value": "8866121250@IOB"
        }
      },
      "bank_details": {
        "0": {
          "label": "Indian Overseas Bank",
          "beneficiary_name": "SH MART",
          "account_number": "092633000000079",
          "account_type": "Current Account",
          "bank_name": "Indian Overseas Bank",
          "branch_name": "Nadiad Branch",
          "branch_code": "",
          "ifsc_code": "IOBA0000926",
          "micr_code": "",
          "swift_code": "",
          "branch_address": "Santram Mandir Road Nadiad",
          "branch_phone": ""
        }
      },
      "legal_details": {},
      "social_media_details": {},
      "main_device_id": ""
    },
    "page_settings": {
      "margin_top": "20",
      "margin_bottom": "20",
      "margin_left": "10",
      "margin_right": "20",
      "page_size": "ROLL_80",
      "page_orientation": "PORTRAIT"
    },
    "setting_names": [
      "DOCUMENT_FORMAT_COMMON",
      "DOCUMENT_TERMS_COMMON",
      "DOCUMENT_LOGO_COMMON",
      "DOCUMENT_FORMAT_SALE",
      "DOCUMENT_TERMS_SALE",
      "PRINT_DOCUMENT_SALE",
      "DOCUMENT_LOGO_SALE",
      "BUSINESS_ID_TITLE",
      "DECIMAL_PLACES"
    ],
    "settings": {
      "DOCUMENT_FORMAT_COMMON": {
        "id": 2,
        "created_on": "2023-07-17",
        "modified_on": "2023-08-06",
        "accountee_id": 1,
        "name": "DOCUMENT_FORMAT_COMMON",
        "value": "POS_230805",
        "type": ""
      },
      "DOCUMENT_LOGO_COMMON": {
        "id": 7,
        "created_on": "2023-07-25",
        "modified_on": "2023-07-25",
        "accountee_id": 1,
        "name": "DOCUMENT_LOGO_COMMON",
        "value": "{\"id\":1,\"created_on\":\"2023-07-25\",\"modified_on\":\"2023-07-25\",\"accountee_id\":1,\"name\":\"ShreeHariMart Vertical.svg\",\"size\":8547,\"type\":\"IMAGE\",\"url\":\"setting/1690265567300/ShreeHariMart Vertical.svg\",\"details\":\"\"}",
        "type": "JSON"
      },
      "DOCUMENT_TERMS_COMMON": {
        "id": 8,
        "created_on": "2023-07-25",
        "modified_on": "2023-11-24",
        "accountee_id": 1,
        "name": "DOCUMENT_TERMS_COMMON",
        "value": "<p><strong>Terms &amp; Conditions :&nbsp;</strong><br>01. Returns accepted only between 04:00 PM to 05:00 PM. 02. Our responsibility ceases the moment the products leave our premises. 03. Any expired products will not be accepted back. Please check your products for expiry before leaving the premises after purchase. 04. <strong>Subject to NADIAD Jurisdiction.</strong></p>",
        "type": ""
      },
      "PRINT_DOCUMENT_SALE": {
        "id": 3,
        "created_on": "2023-07-17",
        "modified_on": "2023-08-05",
        "accountee_id": 1,
        "name": "PRINT_DOCUMENT_SALE",
        "value": "{\"margin_top\":\"20\",\"margin_bottom\":\"20\",\"margin_left\":\"10\",\"margin_right\":\"20\",\"page_size\":\"ROLL_80\",\"page_orientation\":\"PORTRAIT\"}",
        "type": "JSON"
      }
    },
    "total_coupon_amount": null,
    "format": "POS_230805",
    "page": {
      "marginTop": "20px",
      "marginBottom": "20px",
      "marginLeft": "20px",
      "marginRight": "20px"
    }
  };

  async connectedCallback() {
    this.innerHTML = `<p style="display:none;">AcReports Test Basic</p>
      <div style="width:100%;padding:30px;background:#555;"; ${AC_REPORT_ATTRIBUTE.report}>
        <div ac:style:padding-top="data.page.marginTop" ac:style:padding-left="data.page.marginLeft" ac:style:padding-bootom="data.page.marginBottom" ac:style:padding-right="data.page.marginRight" style="margin:auto;background:white;"; ${AC_REPORT_ATTRIBUTE.page}>
          <div>
            {{data.name}} {{data.surname}}
          </div>
        </div>
      </div>
    `;
    this.setTemplate01();
    acInitBwipjsPipe();
    const report: AcReport = new AcReport({ element: this.querySelector('[ac-report]') as HTMLElement });
    report.generate({
      data: this.data
    })
    console.log(report);
  }

  setTemplate01() {
    this.innerHTML = `
    <style type="text/css">
        .sr_no{
            min-width: 3.5%;
            width: 3.5%;
            max-width: 3.5%;
        }
        .item_description
        {
            text-align: left;
        }
        .item_hsn{
            text-align: center;
            min-width: 6%;
            width: 6%;
            max-width: 6%;
        }
        .item_size{
            text-align: center;
            min-width: 8%;
            width: 8%;
            max-width: 8%;
        }
        .item_nos{
            text-align: center;
            min-width: 6%;
            width: 6%;
            max-width: 6%;
        }
        .item_qty{
            text-align: right;
            min-width: 6%;
            width: 6%;
            max-width: 6%;
        }
        .item_unit{
            text-align: center;
            min-width: 6%;
            width: 6%;
            max-width: 6%;
        }
        .item_rate{
            text-align: right;
            min-width: 7%;
            width: 7%;
            max-width: 7%;
        }
        .item_tax_rate{
            text-align: right;
            min-width: 6%;
            width: 6%;
            max-width: 6%;
        }
        .item_tax_amount{
            text-align: right;
            min-width: 14%;
            width: 14%;
            max-width: 14%;
        }
        .data-row-height{
            max-height:0.4cm;min-height: 0.4cm;height:0.4cm;
        }
        th,td{
            padding-left: 3px;
            padding-right: 3px;
        }
        table{
            border-collapse: collapse;
            font-size:12px;
        }
        .text-right{
            text-align: right;
        }
        hr{
            background-color:black!important;
        }
    </style>
    <div class="report" style="margin:auto;width:fit-content;font:arial;" ${AC_REPORT_ATTRIBUTE.report}>
        <div class="page" ac:style:padding-top="data.page.marginTop" ac:style:padding-left="data.page.marginLeft" ac:style:padding-bottom="data.page.marginBottom" ac:style:padding-right="data.page.marginRight" ${AC_REPORT_ATTRIBUTE.page} ${AC_REPORT_ATTRIBUTE.pageSize}="A5" ${AC_REPORT_ATTRIBUTE.pageOrientation}="portrait" style="border:solid 1px black;">
            <table style="width:100%;" cellspacing="0" cellpadding="0">
                <tr>
                    <td ${AC_REPORT_ATTRIBUTE.pageHeader}>
                        <table width="100%">
                            <tr $>
                                <td style="vertical-align: middle;text-align: center;width:80px;">
                                    <img document-value="accountee_logo" style="max-height:100px;max-width:100%;object-fit: contain;margin-bottom: 10px;"/><br>
                                </td>
                                <td style="vertical-align: top;text-align: left;height:10px;font-size:12px;border-left:solid 1px;">
                                    <strong>{{data.accountee.name}}</strong><br>
                                    <span>{{data.accountee.address}}</span><br>
                                    Ph. <span>{{data.accountee.phone_details[0].value}}</span><br>
                                    <span document-value="business_id_title"></span> <span document-value="accountee_business_id">{{data.accountee.business_id}}</span><br>
                                </td>
                            </tr>
                            <tr style="border-bottom-style: solid;border-bottom-color: black;border-bottom-width: 1px;border-top-style: solid;border-top-color: black;border-top-width: 1px;">
                                <td class="" colspan="2">
                                    <div class="mb-0 text-center"><b document-value="document_type" style="font-size: 14px;">{{data.record.sub_type}} INVOICE</b></div>
                                </td>
                            </tr>
                            <tr>
                                <td class="" colspan="2">
                                    M/S: <strong document-value="account_name">{{data.record.person_associated}}</strong> <div document-value="account_phone"></div>
                                </td>
                            </tr>
                            <tr>
                                <td class="" style="text-align: left;">
                                    No. :  <b><span document-value="document_number">{{data.record.document_number}}</span></b>
                               </td>
                               <td class="" style="text-align: right;">
                                    Date. : <b><span document-value="document_date">{{data.record.date}}</span></b>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td ${AC_REPORT_ATTRIBUTE.pageBody} style="vertical-align: top;">
                        <table height="100%" width="100%" cellspacing="0" style="border-color: black;font-size: 12px;border-width: 1px;">
                            <tbody ac:for="let item of data.details;let index;">
                                <div>
                                    <tr style="max-height:0.4cm;min-height: 0.4cm;height:0.4cm;border-top-style: solid;border-bottom-style: none;border-width:1px;font-size:10px;">
                                        <td colspan="4">
                                            <span class="sr_no" srm-value="srno">{{index + 1}}</span>:&nbsp;<span class="item_description">{{item.item_narration}}</span>
                                        </td>
                                    </tr>
                                    <tr style="max-height:0.4cm;min-height: 0.4cm;height:0.4cm;border-top-style: none;border-bottom-style: solid;border-width:1px;font-size:10px;">
                                        <td class="text-start" style="min-width:20%;max-width: 20%;width: 20%;">Qty: <b ></b>{{item.quantity}}<span sim-data-field="item_unit"></span></td>
                                        <td class="item_rate text-start" style="min-width:27.5%;max-width: 27.5%;width: 27.5%;"> MRP: <span>{{item.price_mrp}}</span></td>
                                        <td class="item_rate text-start" style="min-width:27.5%;max-width: 27.5%;width: 27.5%;"> Price: <span>{{item.price_actual}}</span></td>
                                        <td class="item_tax_amount text-start" style="min-width:25%;max-width: 25%;width: 25%;"> Amt: <b>{{item.amount}}</b></td>
                                    </tr>
                                </div>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td ${AC_REPORT_ATTRIBUTE.pageFooter} style="vertical-align: top;height:10px;font-size:14px;">
                        <table width="100%">
                            <tr>
                                <table style="width:100%;">
                                <tr style="font-size:16px;border-bottom: solid 1px;"><th>Total</th><th class="text-right py-1" >{{data.record.amount | currency:'INR'}}</th></tr>
                                </table>
                            </tr>
                            <tr>
                                <td style="text-align:center;padding:0px;border-bottom: solid 1px;">
                                    <table style="width:100%;">
                                        <tr>
                                            <td style="padding:5px 0px;padding-right: 5px;width:110px;">
                                                <div style="height:100px;width:100px;margin-left:5px;" ac:bind:innerHTML="data.record.document_number | bwipjs:{height:100,width:100}">
                                                </div>
                                            </td>
                                            <td style="border-left: solid 1px;vertical-align:middle;">
                                                <table style="width:100%;">
                                                    <tr>
                                                        <td>Tot.MRP</td>
                                                        <td class="text-end">Saved</td>
                                                    </tr>
                                                    <tr>
                                                        <td show-tax document-value="total_mrp">0</td>
                                                        <th class="text-end" show-tax document-value="total_difference_mrp_actual_amount" style="font-size:15px;">0</th>
                                                    </tr>
                                                </table>
                                                <hr style="margin:2px 0px;">
                                                <table style="text-align:center;font-size:10px;width:100%;margin-bottom:5px;">
                                                    <tr>
                                                        <td>CGST</td>
                                                        <td>SGST</td>
                                                        <td>IGST</td>
                                                        <td>CESS</td>
                                                    </tr>
                                                    <tr>
                                                        <th show-tax document-value="total_cgst">0</th>
                                                        <th show-tax document-value="total_sgst">0</th>
                                                        <th show-tax document-value="total_igst">0</th>
                                                        <th show-tax document-value="total_cess">0</th>
                                                    </tr>
                                                </table>
                                                <table class="table-payments" style="width:100%;">
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="pt-1" style="text-align:left;border-top: solid 1px;border-bottom: solid 1px;padding-bottom: 2.5px;">
                                    <div document-value="terms_title"></div>
                                    <div document-value="terms_content"></div>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center;font-size: 12px;padding:5px 0px;padding-top: 2.5px;" report-value="document-declaration"></td>
                            </tr>
                            <tr style="border-style: solid;border-color: black;border-width: 1px;">
                                <td style="text-align: center;font-size: 12px;">
                                   <b>Thanks for shopping with us.</b>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    `;
  }
}
