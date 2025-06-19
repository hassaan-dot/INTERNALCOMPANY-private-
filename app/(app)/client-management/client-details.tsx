import React from "react";
import ClientDetailsScreen from "../../../src/Screens/ClientDetails/screen";
import { useTranslation } from "react-i18next";

const ClientDetails = () => {
  const { t } = useTranslation();
  return <ClientDetailsScreen />;
};

export default ClientDetails;
