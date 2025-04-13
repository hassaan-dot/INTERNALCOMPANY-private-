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
  showTime: boolean;
  showDocument: boolean;
  onClickTime: any;
  onClickEye?: (item: any) => void;
  isPO?: boolean;
  onClickDoc?: any;
}

const TableHeader: React.FC<CompanyTableProps> = ({
  showActions = false,
  showStatus = false,
  checkbox = false,
  headerRowStyle,
  columns_schema,
  headerTextStyle,
  // onCliclTimeFunc,
}) => (
  <View style={[styles.headerRow, headerRowStyle]}>
    <View style={styles.customHeader}>{checkbox && <CheckBox />}</View>
    {columns_schema?.map((c, index) => (
      <Text
        key={index}
        style={[styles.headerText, headerTextStyle, { flex: 2 }]}
      >
        {truncateComponentName(c.header, 20)}
      </Text>
    ))}
    {showStatus && (
      <Text style={[styles.headerText, , headerTextStyle, { flex: 2 }]}>
        Status
      </Text>
    )}
    {showActions && (
      <Text style={[styles.headerText, { flex: 2 }]}>Actions</Text>
    )}
  </View>
);

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
  const { filters, setFilters } = useModalStore();

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
          <StatusBadge text="Active" />
        </View>
      );
    }
    if (is_active === false) {
      return (
        <View style={{ alignItems: "center", flex: 0.2 }}>
          <StatusBadge />
        </View>
      );
    }

    if (request_status === "Rejected") {
      return (
        <StatusBadge
          text="Rejected"
          textColor={"#EC4746"}
          dot={"#EC4746"}
          color="#FECACA"
        />
      );
    }

    if (request_status === "To do") {
      return (
        <StatusBadge
          text="To do"
          dot={"#ECFDF3"}
          textColor={"#ECFDF3"}
          color="#5A6470"
        />
      );
    }

    if (request_status === "In Progress") {
      return (
        <StatusBadge
          text="In progress"
          textColor={"white"}
          dot={"#ECFDF3"}
          color="#A47C60"
        />
      );
    }

    if (request_status === "Done") {
      return <StatusBadge text="Done" dot={"#12B76A"} color="#ECFDF3" />;
    }

    if (payment_status === "Pending") {
      return (
        <StatusBadge
          text="Pending "
          textColor={"white"}
          dot={"#ECFDF3"}
          color="#A47C60"
        />
      );
    }
    if (payment_status === "Completed") {
      return <StatusBadge text="Completed" dot={"#12B76A"} color="#ECFDF3" />;
    }

    if (payment_status === "Failed") {
      return (
        <StatusBadge
          text="Failed"
          textColor={"#EC4746"}
          dot={"#EC4746"}
          color="#FECACA"
        />
      );
    }
    if (item_status === "Delivered") {
      return (
        <View style={{ alignItems: "center", flex: 0.2 }}>
          <StatusBadge text="Delieverd" dot={"#12B76A"} color="#ECFDF3" />
        </View>
      );
    }
    if (item_status === "Processing") {
      return (
        <View style={{ alignItems: "center" }}>
          <StatusBadge
            text="Processing"
            dot={"#ECFDF3"}
            textColor={"#fff"}
            color="#A47C60"
          />
        </View>
      );
    }
    if (active_status === PO_ACTIVE_STATUS.DRAFT) {
      return (
        <View style={{ alignItems: "center", flex: 0.2 }}>
          <StatusBadge
            text="Draft"
            dot={"#ECFDF3"}
            textColor={"#ECFDF3"}
            color="#5A6470"
          />
        </View>
      );
    }

    if (active_status === PO_ACTIVE_STATUS.CLOSED) {
      return (
        <View style={{ alignItems: "center", flex: 0.2 }}>
          <StatusBadge
            text="Closed"
            textColor={"#EC4746"}
            dot={"#EC4746"}
            color="#FECACA"
          />
        </View>
      );
    }

    if (is_confirmed) {
      return (
        <View style={{ alignItems: "center", flex: 0.2 }}>
          <StatusBadge text="Confirmed" dot={"#12B76A"} color="#ECFDF3" />
        </View>
      );
    } else if (active_status === PO_ACTIVE_STATUS.ACCEPTED) {
      return (
        <View
          style={{ alignItems: "center", flex: 0.2, backgroundColor: "red" }}
        >
          <StatusBadge text="Accepted" dot={"#12B76A"} color="#ECFDF3" />
        </View>
      );
    }

    if (active_status === PO_ACTIVE_STATUS.REJECTED) {
      return (
        <View style={{ alignItems: "center", flex: 0.2 }}>
          <StatusBadge
            text="Rejected"
            textColor={"#EC4746"}
            dot={"#EC4746"}
            color="#FECACA"
          />
        </View>
      );
    }

    // or some default casem
  };
  // Determine if we have pagination meta data or just an array
  const hasPaginationMeta = DATA?.meta?.pagination;
  const dataArray = hasPaginationMeta ? DATA?.data : DATA;

  const ITEMS_PER_PAGE = hasPaginationMeta
    ? DATA?.meta?.pagination?.pageSize
    : 25;

  const totalPages = hasPaginationMeta
    ? DATA?.meta?.pagination?.pageCount
    : Math.ceil((dataArray?.length || 0) / ITEMS_PER_PAGE);

  const [expandedEmail, setExpandedEmail] = useState<number | null>(null);

  const renderItem = ({ item }: { item: any }) => {
    const isExpanded = expandedEmail === item.id;
    const isRTL = (text: any) => {
      const rtlRegex = /^[\u0600-\u06FF]/;
      return rtlRegex.test(text);
    };
    return (
      <View style={styles.row}>
        <View style={[styles.customDesign, rowTextStyle]}>
          {checkbox && <CheckBox />}
        </View>
        {columns_schema?.map((c, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setExpandedEmail(isExpanded ? null : item.id)}
            style={{ flex: isExpanded && c.key === "email" ? 5 : 2 }}
          >
            <Text
              style={[
                styles.cell,
                rowTextStyle,
                {
                  textAlign: isRTL(getValueFromKey(item, c?.key))
                    ? "left"
                    : "left",
                },
              ]}
            >
              {isExpanded
                ? getValueFromKey(item, c?.key)
                : truncateComponentName(getValueFromKey(item, c?.key), 16)}
            </Text>
          </TouchableOpacity>
        ))}

        {showStatus && (
          <View
            style={[
              styles.cell,
              {
                flex: 2,
                // backgroundColor: "red",
                alignItems: "center",
                // justifyContent: "center",
              },
              styles.actionIcons,
            ]}
          >
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
  };

  console.log("Data", DATA);

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
      {pagination && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            disabled={filters.page == 1}
            onPress={() => setFilters({ ...filters, page: filters?.page - 1 })}
          >
            <Image
              source={icons.tablepaginationleftarrowIcon}
              style={styles.image}
            />
          </TouchableOpacity>
          {Array.from({ length: totalPages }, (_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setFilters({ ...filters, page: i + 1 })}
              style={[
                styles.pageButton,
                filters.page == i + 1 && styles.activePageButton,
              ]}
            >
              <Text
                style={[
                  styles.pageButton,
                  filters.page == i + 1 && styles.activePage,
                ]}
              >
                {i + 1}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            disabled={filters.page == totalPages}
            onPress={() => setFilters({ ...filters, page: filters?.page + 1 })}
          >
            <Image
              source={icons.tablepaginationrightarrowIcon}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CompanyTable;
