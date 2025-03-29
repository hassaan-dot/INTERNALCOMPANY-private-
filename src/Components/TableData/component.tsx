import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { icons } from "../../Resources";
import { CheckBox, StatusBadge, truncateComponentName } from "..";

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
  onClickEye?: (item: any) => void;
}

const TableHeader: React.FC<CompanyTableProps> = ({
  showActions = false,
  showStatus = false,
  checkbox = false,
  headerRowStyle,
  columns_schema,
  headerTextStyle,
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
    {showStatus && <Text style={[styles.headerText, { flex: 2 }]}>Status</Text>}
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
  onClickEye,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const IconHandleStatus = ({
    is_active,
    payment_status,
    item_status,
  }: any) => {
    if (is_active === true) {
      return <StatusBadge text="Active" />;
    }
    if (is_active === false) {
      return <StatusBadge />;
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
    if (item_status === "Delivered") {
      return <StatusBadge text="Delieverd" dot={"#12B76A"} color="#ECFDF3" />;
    }
    if (item_status === "Processing") {
      return (
        <StatusBadge
          text="Processing"
          dot={"#ECFDF3"}
          textColor={"#fff"}
          color="#A47C60"
        />
      );
    }
    // or some default casem
  };
  // Determine if we have pagination meta data or just an array
  const hasPaginationMeta = DATA?.meta?.pagination;
  const dataArray = hasPaginationMeta ? DATA?.data : DATA;

  const ITEMS_PER_PAGE = hasPaginationMeta
    ? DATA?.meta?.pagination?.pageSize
    : 10;

  const totalPages = hasPaginationMeta
    ? DATA?.meta?.pagination?.pageCount
    : Math.ceil((dataArray?.length || 0) / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = hasPaginationMeta
    ? dataArray // If we have pagination meta, the server handles pagination
    : dataArray?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const [expandedEmail, setExpandedEmail] = useState<number | null>(null);

  const renderItem = ({ item }: { item: any }) => {
    const isExpanded = expandedEmail === item.id;
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
            <Text style={[styles.cell, rowTextStyle]}>
              {isExpanded
                ? item[c?.key]
                : truncateComponentName(item[c.key], 10)}
            </Text>
          </TouchableOpacity>
        ))}

        {showStatus && (
          <View style={[styles.cell, { flex: 2 }, styles.actionIcons]}>
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
            <TouchableOpacity onPress={() => onPressDelete(item.documentId)}>
              <Image
                source={icons.tableDeleteIcon}
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPressUpdate(item)}>
              <Image
                source={icons.tableEditIcon}
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Image
                source={icons.tableDocumentIcon}
                style={{ width: 20, height: 20, tintColor: "#07504B" }}
              />
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={paginatedData}
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
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)}
          >
            <Image
              source={icons.tablepaginationleftarrowIcon}
              style={styles.image}
            />
          </TouchableOpacity>
          {Array.from({ length: totalPages }, (_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setCurrentPage(i + 1)}
              style={[
                styles.pageButton,
                currentPage === i + 1 && styles.activePageButton,
              ]}
            >
              <Text
                style={[
                  styles.pageButton,
                  currentPage === i + 1 && styles.activePage,
                ]}
              >
                {i + 1}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(currentPage + 1)}
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
