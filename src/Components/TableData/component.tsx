import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { icons } from "../../Resources";
import { CheckBox } from "..";
import { columns_schema } from "@/src/Screens/ClientManagement/_schema";
// interface Company {
//   id: number;
//   email: string;
//   phone: string;
//   contactPerson: string;
//   companyName: string;
//   Status: string;
// }

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
  onClickEye?: (username: string, id: number) => void;
}
//Our Prop Structure
// const DATA: Company[] = Array.from({ length: 50 }, (_, i) => ({
//   id: i + 1,
//   email: "irnabela@gmail.com",
//   phone: "(+971) 7 35 55 45 43",
//   contactPerson: "Ahmed",
//   companyName: "Hospitality Chain",
//   Status: "Approved",
// }));

// const DATA= generateData();

const TableHeader: React.FC<CompanyTableProps & { isSelectable?: boolean }> = ({
  col1,
  col2,
  col3,
  col4,
  col5,
  showActions = false,
  showStatus = false,
  checkbox = false,
  headerRowStyle,
  headerTextStyle,
  rowTextStyle,
  pagination,
  // DATA
  // items
}) => (
  <View style={[styles.headerRow, headerRowStyle]}>
    <View style={styles.customHeader}>{checkbox && <CheckBox></CheckBox>}</View>
    {columns_schema?.map((c, index) => (
      <Text
        key={index}
        style={[styles.headerText, headerTextStyle, { flex: 2 }]}
      >
        {c?.header}
      </Text>
    ))}

    {showActions && (
      <Text style={[styles.headerText, headerTextStyle, { flex: 2 }]}>
        Actions
      </Text>
    )}
    {showStatus && <Text style={[styles.headerText, { flex: 2 }]}>Status</Text>}
  </View>
);

const CompanyTable: React.FC<CompanyTableProps> = ({
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

  const ITEMS_PER_PAGE = DATA?.meta?.pagination?.pageSize;

  const startIndex = (DATA?.meta?.pagination?.page - 1) * ITEMS_PER_PAGE;
  const paginatedData = DATA?.data?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = DATA?.meta?.pagination?.pageCount;

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <View style={[styles.customDesign, rowTextStyle]}>
        {checkbox && <CheckBox />}
      </View>
      {columns_schema?.map((c, index) => (
        <Text key={index} style={[styles.cell, rowTextStyle, { flex: 2 }]}>
          {item?.[c.key]}
        </Text>
      ))}

      {showActions && (
        <View
          style={[styles.cell, rowTextStyle, { flex: 2 }, styles.actionIcons]}
        >
          {showEye && (
            <TouchableOpacity
              onPress={() => onClickEye && onClickEye(item.email, item.id)}
            >
              <Image
                source={icons.tableEyeIcon}
                style={{ width: 20, height: 20, marginRight: 6 }}
              ></Image>
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <Image
              source={icons.tableDeleteIcon}
              style={{ width: 20, height: 20, marginRight: 6 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={icons.tableEditIcon}
              style={{ width: 20, height: 20, marginRight: 6 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={icons.tableReadIcon}
              style={{ width: 20, height: 20 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={icons.tableDocumentIcon}
              style={{ width: 20, height: 20 }}
            ></Image>
          </TouchableOpacity>
        </View>
      )}
      {showStatus && (
        <View style={[styles.cell, { flex: 2 }, styles.actionIcons]}>
          <TouchableOpacity>
            {item?.Status && (
              <Image
                source={
                  item.Status == "Approved"
                    ? icons.tableStatusIcon
                    : icons.tableDeleteIcon
                }
                style={{ width: 15, height: 15 }}
              ></Image>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

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
            headerTextStyle={headerTextStyle}
            headerRowStyle={headerRowStyle}
            rowTextStyle={rowTextStyle}
            pagination={pagination}
            DATA={DATA}
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
            ></Image>
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
            ></Image>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CompanyTable;
