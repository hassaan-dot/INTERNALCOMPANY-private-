import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { icons } from "@/assets/icons/icons";
import { CheckBox, StatusBadge, truncateComponentName } from "..";
import { useModalStore } from "@/store/useModalStore";
import { PO_ACTIVE_STATUS } from "@/constants/po_status";
import { getValueFromKey } from "@/src/utils";
import { ROLE } from "@/constants/role";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslation } from "react-i18next";

interface CompanyTableProps {
  columns_schema: {
    key: string;
    header: string;
  }[];
  showActions?: boolean;
  showStatus?: boolean;
  checkbox?: boolean;
  headerRowStyle?: any;
  headerTextStyle?: any;
  rowTextStyle?: any;
  pagination?: boolean;
  DATA: any;
  showEye?: boolean;
  onPressUpdate: any;
  onPressDelete: any;
  showDel: boolean;
  showEdit: boolean;
  showTime?: boolean;
  showDocument: boolean;
  onClickTime?: any;
  onClickEye?: (item: any) => void;
  isPO?: boolean;
  onClickDoc?: any;
}

const TableHeader: React.FC<any> = ({
  showActions = false,
  showStatus = false,
  checkbox = false,
  headerRowStyle,
  columns_schema,
  headerTextStyle,
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.headerRow, headerRowStyle]}>
      {columns_schema?.map((c: { key: string; header: string }, index: number) => (
        <Text key={index} style={[styles.headerText, headerTextStyle, { flex: 2 }]}>
          {truncateComponentName(c.header, 20)}
        </Text>
      ))}
      {showStatus && (
        <Text style={[styles.headerText, headerTextStyle, { flex: 2 }]}>
          {t("Status")}
        </Text>
      )}
      {showActions && (
        <Text style={[styles.headerText, { flex: 2 }]}>{t("Actions")}</Text>
      )}
    </View>
  );
};

const CompanyTable: React.FC<CompanyTableProps> = ({
  onPressUpdate,
  onPressDelete,
  columns_schema,
  showActions,
  showStatus,
  checkbox = false,
  headerRowStyle,
  headerTextStyle,
  rowTextStyle,
  pagination,
  DATA,
  showEye = false,
  showDel = false,
  showEdit = false,
  showDocument = false,
  showTime = false,
  onClickTime,
  onClickEye,
  onClickDoc,
  isPO = false,
}) => {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  const IconHandleStatus = ({
    is_active,
    payment_status,
    item_status,
    active_status,
    is_confirmed,
    request_status,
  }: any) => {
    if (is_active === true) {
      return (
        <View style={{ alignItems: "center", flex: 0.2 }}>
          <StatusBadge text={t("po_status.active")} />
        </View>
      );
    }
    if (is_active === false) {
      return (
        <View style={{ alignItems: "center", flex: 0.2 }}>
          <StatusBadge text={t("po_status.inactive")} />
        </View>
      );
    }

    if (request_status === "Rejected") {
      return (
        <StatusBadge
          text={t("po_status.rejected")}
          textColor="#EC4746"
          dot="#EC4746"
          color="#FECACA"
        />
      );
    }
    if (request_status === "To do") {
      return (
        <StatusBadge
          text={t("po_status.todo")}
          dot="#ECFDF3"
          textColor="#ECFDF3"
          color="#5A6470"
        />
      );
    }
    if (request_status === "In Progress") {
      return (
        <StatusBadge
          text={t("po_status.in_progress")}
          textColor="white"
          dot="#ECFDF3"
          color="#A47C60"
        />
      );
    }
    if (request_status === "Done") {
      return <StatusBadge text={t("po_status.done")} dot="#12B76A" color="#ECFDF3" />;
    }

    if (payment_status === "Pending") {
      return (
        <StatusBadge
          text={t("po_status.pending")}
          textColor="white"
          dot="#ECFDF3"
          color="#A47C60"
        />
      );
    }
    if (payment_status === "Completed") {
      return <StatusBadge text={t("po_status.completed")} dot="#12B76A" color="#ECFDF3" />;
    }
    if (payment_status === "Failed") {
      return (
        <StatusBadge
          text={t("po_status.failed")}
          textColor="#EC4746"
          dot="#EC4746"
          color="#FECACA"
        />
      );
    }
    if (item_status === "Delivered") {
      return (
        <StatusBadge text={t("po_status.delivered")} dot="#12B76A" color="#ECFDF3" />
      );
    }
    if (item_status === "Processing") {
      return (
        <StatusBadge
          text={t("po_status.processing")}
          dot="#ECFDF3"
          textColor="#fff"
          color="#A47C60"
        />
      );
    }
    if (active_status === PO_ACTIVE_STATUS.DRAFT) {
      return (
        <StatusBadge
          text={t("po_status.draft")}
          dot="#ECFDF3"
          textColor="#ECFDF3"
          color="#5A6470"
        />
      );
    }
    if (active_status === PO_ACTIVE_STATUS.CLOSED) {
      return (
        <StatusBadge
          text={t("po_status.closed")}
          textColor="#EC4746"
          dot="#EC4746"
          color="#FECACA"
        />
      );
    }
    if (is_confirmed) {
      return (
        <StatusBadge text={t("po_status.confirmed")} dot="#12B76A" color="#ECFDF3" />
      );
    }
    if (active_status === PO_ACTIVE_STATUS.ACCEPTED) {
      return (
        <StatusBadge text={t("po_status.accepted")} dot="#12B76A" color="#ECFDF3" />
      );
    }
    if (active_status === PO_ACTIVE_STATUS.REJECTED) {
      return (
        <StatusBadge
          text={t("po_status.rejected")}
          textColor="#EC4746"
          dot="#EC4746"
          color="#FECACA"
        />
      );
    }
  };

  const dataArray = DATA?.meta?.pagination ? DATA.data : DATA;

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.row}>
      {columns_schema?.map((c, index) => (
        <TouchableOpacity key={index} style={{ flex: 2 }}>
          <Text style={[
            styles.cell,
            rowTextStyle,
            {
              textAlign: "center",
              backgroundColor: c.key === "standing" && item[c.key]?.toLowerCase() === "priority" ? "#FECACA" : "transparent",
              color: c.key === "standing" && item[c.key]?.toLowerCase() === "priority" ? "#EC4746" : undefined,
              paddingHorizontal: c.key === "standing" ? 12 : 0,
              width: c.key === "standing" ? 90 : undefined,
              alignSelf: c.key === "standing" ? "center" : undefined,
              borderRadius: c.key === "standing" ? 16 : 0,
            }
          ]}>
            {truncateComponentName(
              c.key === "role.name"
                ? t(`roles.${item.role?.name}`)
                : c.key === "department.name"
                  ? t(`departments.${item.department?.name}`)
                  : c.key === "standing"
                    ? t(`request.${item[c.key]?.toLowerCase()}`)
                    : getValueFromKey(item, c?.key),
              16
            )}
          </Text>
        </TouchableOpacity>
      ))}

      {showStatus && (
        <View style={[styles.cell, { flex: 2, alignItems: "center" }, styles.actionIcons]}>
          {IconHandleStatus(item)}
        </View>
      )}

      {showActions && (
        <View
          style={[styles.cell, rowTextStyle, { flex: 2 }, styles.actionIcons]}
        >
          {showEye && (
            <TouchableOpacity onPress={() => onClickEye && onClickEye(item)}>
              <Image
                source={icons.tableEyeIcon}
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
            </TouchableOpacity>
          )}
          {showEdit && (
            <TouchableOpacity
              onPress={() => onPressUpdate(item)}
              disabled={
                isPO
                  ? user?.role?.name !== ROLE.ADMIN &&
                  (item?.po_created_by?.documentId !== user?.documentId ||
                    item?.active_status === PO_ACTIVE_STATUS.CLOSED ||
                    item?.active_status === PO_ACTIVE_STATUS.REJECTED ||
                    item?.is_confirmed)
                  : false
              }
            >
              <Image
                source={icons.tableEditIcon}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 6,
                  tintColor: isPO
                    ? user?.role?.name !== ROLE.ADMIN &&
                      (item?.po_created_by?.documentId !== user?.documentId ||
                        item?.active_status === PO_ACTIVE_STATUS.CLOSED ||
                        item?.active_status === PO_ACTIVE_STATUS.REJECTED ||
                        item?.is_confirmed)
                      ? "#292D32"
                      : ""
                    : "",
                }}
              />
            </TouchableOpacity>
          )}
          {showDel && (
            <TouchableOpacity
              onPress={() => onPressDelete(item.documentId, item.id)}
              disabled={
                isPO
                  ? user?.role?.name !== ROLE.ADMIN &&
                  (item?.po_created_by?.documentId !== user?.documentId ||
                    item?.active_status === PO_ACTIVE_STATUS.ACCEPTED ||
                    item?.is_confirmed)
                  : false
              }
            >
              <Image
                source={icons.tableDeleteIcon}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 6,
                  tintColor: isPO
                    ? user?.role?.name !== ROLE.ADMIN &&
                      (item?.po_created_by?.documentId !== user?.documentId ||
                        item?.active_status === PO_ACTIVE_STATUS.ACCEPTED ||
                        item?.is_confirmed)
                      ? "#292D32"
                      : ""
                    : "",
                }}
              />
            </TouchableOpacity>
          )}

          {showDocument && (
            <TouchableOpacity onPress={() => onClickDoc(item)}>
              <Image
                source={icons.tableDocumentIcon}
                style={{ width: 20, height: 20, tintColor: "#292D32" }}
              />
            </TouchableOpacity>
          )}
          {showTime && (
            <TouchableOpacity onPress={() => onClickTime(item)}>
              <Image
                source={icons.tableTimeIcon}
                style={{ width: 20, height: 20, tintColor: "#292D32" }}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <TableHeader
            columns_schema={columns_schema}
            checkbox={checkbox}
            showActions={showActions}
            showStatus={showStatus}
            headerTextStyle={headerTextStyle}
            headerRowStyle={headerRowStyle}
          />
        )}
      />
    </View>
  );
};

export default CompanyTable;
