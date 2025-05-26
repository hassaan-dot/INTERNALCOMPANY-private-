import { useTranslation } from "react-i18next";

export const useSchemas = () => {
  const { t } = useTranslation();

  const columns_schema = [
    { key: "documentId", header: t("columns.documentId") },
    { key: "email", header: t("columns.email") },
    { key: "phone_number", header: t("columns.phone_number") },
    { key: "contact_person_name", header: t("columns.contact_person") },
    { key: "company_name", header: t("columns.company_name") },
  ];

  const User_columns_schema = [
    { key: "first_name", header: t("columns.first_name") },
    { key: "last_name", header: t("columns.last_name") },
    { key: "email", header: t("columns.email") },
    { key: "phone_number", header: t("columns.phone_number") },
    { key: "role.name", header: t("columns.role") },
    { key: "department.name", header: t("columns.department") },
  ];

  const Requests_columns_schema = [
    { key: "documentId", header: t("columns.id") },
    { key: "title", header: t("columns.name") },
    { key: "perform_on", header: t("columns.date") },
    { key: "standing", header: t("columns.standing") },
  ];

  const Po_Schema = [
    { key: "po_name", header: t("columns.po_name") },
    { key: "client.company_name", header: t("columns.company_name") },
    { key: "client.contact_person_name", header: t("columns.contact_person") },
    { key: "client.email", header: t("columns.email") },
    { key: "client.phone_number", header: t("columns.phone_number") },
  ];

  const Po_Schema_Client = [
    { key: "po_name", header: t("columns.po_name") },
    { key: "client.email", header: t("columns.email") },
    { key: "client.phone_number", header: t("columns.phone_number") },
  ];

  const Invoice_Schema = [
    { key: "date_of_payment", header: t("columns.date_of_payment") },
    { key: "payer", header: t("columns.payer") },
    { key: "amount", header: t("columns.amount_paid") },
    { key: "payment_method", header: t("columns.payment_method") },
  ];

  const Item_Schema = [
    { key: "item_number", header: t("columns.item_number") },
    { key: "item_name", header: t("columns.item_name") },
    { key: "price", header: t("columns.price") },
    { key: "company", header: t("columns.company") },
  ];

  return {
    columns_schema,
    User_columns_schema,
    Requests_columns_schema,
    Po_Schema,
    Po_Schema_Client,
    Invoice_Schema,
    Item_Schema,
  };
};
