import i18n from "@/src/i18n";

export const columns_schema = [
  {
    key: "documentId",
    header: i18n.t("columns.documentId"),
  },
  {
    key: "email",
    header: i18n.t("columns.email"),
  },
  {
    key: "phone_number",
    header: i18n.t("columns.phone_number"),
  },
  {
    key: "contact_person_name",
    header: i18n.t("columns.contact_person"),
  },
  {
    key: "company_name",
    header: i18n.t("columns.company_name"),
  },
];

export const User_columns_schema = [
  {
    key: "first_name",
    header: i18n.t("columns.first_name"),
  },
  {
    key: "last_name",
    header: i18n.t("columns.last_name"),
  },
  {
    key: "email",
    header: i18n.t("columns.email"),
  },
  {
    key: "phone_number",
    header: i18n.t("columns.phone_number"),
  },
  {
    key: "role.name",
    header: i18n.t("columns.role"),
  },
  {
    key: "department.name",
    header: i18n.t("columns.department"),
  },
];

export const Requests_columns_schema = [
  {
    key: "documentId",
    header: i18n.t("columns.id"),
  },
  {
    key: "title",
    header: i18n.t("columns.name"),
  },
  {
    key: "perform_on",
    header: i18n.t("columns.date"),
  },
  {
    key: "standing",
    header: i18n.t("columns.standing"),
  },
];

export const Po_Schema = [
  {
    key: "po_name",
    header: i18n.t("columns.po_name"),
  },
  {
    key: "client.company_name",
    header: i18n.t("columns.company_name"),
  },
  {
    key: "client.contact_person_name",
    header: i18n.t("columns.contact_person"),
  },
  {
    key: "client.email",
    header: i18n.t("columns.email"),
  },
  {
    key: "client.phone_number",
    header: i18n.t("columns.phone_number"),
  },
];

export const Po_Schema_Client = [
  {
    key: "po_name",
    header: i18n.t("columns.po_name"),
  },
  {
    key: "client.email",
    header: i18n.t("columns.email"),
  },
  {
    key: "client.phone_number",
    header: i18n.t("columns.phone_number"),
  },
];

export const Invoice_Schema = [
  {
    key: "date_of_payment",
    header: i18n.t("columns.date_of_payment"),
  },
  {
    key: "payer",
    header: i18n.t("columns.payer"),
  },
  {
    key: "amount",
    header: i18n.t("columns.amount_paid"),
  },
  {
    key: "payment_method",
    header: i18n.t("columns.payment_method"),
  },
];

export const Item_Schema = [
  {
    key: "item_number",
    header: i18n.t("columns.item_number"),
  },
  {
    key: "item_name",
    header: i18n.t("columns.item_name"),
  },
  {
    key: "price",
    header: i18n.t("columns.price"),
  },
  {
    key: "company",
    header: i18n.t("columns.company"),
  },
];
