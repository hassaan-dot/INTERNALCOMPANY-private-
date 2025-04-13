export const columns_schema = [
  {
    key: "documentId",
    header: "Company No.",
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "phone_number",
    header: "Phone Number",
  },
  {
    key: "contact_person_name",
    header: "Conatact Person",
  },
  {
    key: "company_name",
    header: "Company Name",
  },
];
export const User_columns_schema = [
  {
    key: "first_name",
    header: "First Name",
  },
  {
    key: "last_name",
    header: "Last Name",
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "phone_number",
    header: "Phone Number",
  },
  {
    key: "role.name",
    header: "Role",
  },
  {
    key: "department.name",
    header: "Department",
  },
];

export const Requests_columns_schema = [
  {
    key: "documentId",
    header: "Id",
  },
  {
    key: "title",
    header: "Name",
  },

  {
    key: "perform_on",
    header: "Date",
  },
  {
    key: "standing",
    header: "Standing",
  },
];

export const Po_Schema = [
  {
    key: "po_name",
    header: "Name",
  },
  {
    key: "client.company_name",
    header: "Company Name",
  },
  {
    key: "client.contact_person_name",
    header: "Contact Person",
  },
  {
    key: "client.email",
    header: "Email",
  },
  {
    key: "client.phone_number",
    header: "Phone number",
  },
];

export const Po_Schema_Client = [
  {
    key: "po_name",
    header: "Name",
  },
  {
    key: "client.email",
    header: "Email",
  },
  {
    key: "client.phone_number",
    header: "Phone number",
  },
];

export const Invoice_Schema = [
  {
    key: "date_of_payment",
    header: "Date of each payment",
  },
  {
    key: "payer",
    header: "Name of each payment",
  },

  {
    key: "amount",
    header: "Amount paid",
  },
  {
    key: "payment_method",
    header: "Payment method",
  },
];
export const Item_Schema = [
  {
    key: "item_number",
    header: "Item Number",
  },
  {
    key: "item_name",
    header: "Item Name",
  },

  {
    key: "price",
    header: "Price",
  },
  {
    key: "company",
    header: "Company",
  },
];
