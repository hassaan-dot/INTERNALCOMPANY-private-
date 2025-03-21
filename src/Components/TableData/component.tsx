import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { icons } from "../../Resources";
import { CheckBox } from "..";
// interface Company {
//   id: number;
//   email: string;
//   phone: string;
//   contactPerson: string;
//   companyName: string;
//   Status: string;
// }

interface CompanyTableProps {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  showActions?: boolean;
  showStatus?: boolean;
  checkbox?: boolean;
  headerRowStyle?: any;
  headerTextStyle?: any;
  rowTextStyle?: any;
  pagination?: boolean;
  DATA:any
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

const ITEMS_PER_PAGE = 10;
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
    <View style={styles.customHeader}>
      {checkbox && <CheckBox></CheckBox>}
      <Text style={[styles.headerText, headerTextStyle, { flex: 2 }]}>
        {col1}
      </Text>
    </View>
    <Text style={[styles.headerText, headerTextStyle, { flex: 2 }]}>
      {col2}
    </Text>
    <Text style={[styles.headerText, headerTextStyle, { flex: 2 }]}>
      {col3}
    </Text>
    <Text style={[styles.headerText, headerTextStyle, { flex: 2 }]}>
      {col4}
    </Text>
    {showActions && (
      <Text style={[styles.headerText, headerTextStyle, { flex: 2 }]}>
        Actions
      </Text>
    )}
    {showStatus && <Text style={[styles.headerText, { flex: 2 }]}>Status</Text>}
  </View>
);

const CompanyTable: React.FC<CompanyTableProps> = ({
  col1,
  col2,
  col3,
  col4,
  col5,
  showActions,
  showStatus,
  checkbox = false,
  headerRowStyle,
  headerTextStyle,
  rowTextStyle,
  pagination,DATA
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(DATA.length / ITEMS_PER_PAGE);

  const renderItem = ({ item }: { item: Company }) => (
    <View style={styles.row}>
      <View style={[styles.customDesign,rowTextStyle]}>
        {checkbox && <CheckBox></CheckBox>}
        <Text style={styles.cell}>{item?.id}</Text>
      </View>
      <Text style={[styles.cell, rowTextStyle, { flex: 2 }]}>{item?.email}</Text>
      <Text style={[styles.cell, rowTextStyle, { flex: 2 }]}>{item?.phone}</Text>
      <Text style={[styles.cell, rowTextStyle, { flex: 2 }]}>
        {item?.contactPerson}
      </Text>
      {showActions && (
        <View
          style={[styles.cell, rowTextStyle, { flex: 2 }, styles.actionIcons]}
        >
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
            col1={col1}
            col2={col2}
            col3={col3}
            col4={col4}
            col5={col5}
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
