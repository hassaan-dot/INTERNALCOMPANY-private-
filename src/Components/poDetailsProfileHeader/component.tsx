import { formatDate } from "@/src/utils";
import React from "react";
import { Text, View } from "react-native";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import StatusBadge from "../StatusIcon/component";
import truncateComponentName from "../WordTruncate/component";
import { styles } from "./styles";

interface PoDetailProfileProps {
  profile?: boolean;
  style: any;
  title?: string;
  titleIcon?: boolean;
  titleStyle: any;
  cardContainer: any;
  detailscreenContainer: any;
  horizontalwidth?: any;
  data: any;
}

const PoDetailProfile: React.FC<PoDetailProfileProps> = ({
  style,
  title = "Details",
  titleIcon,
  titleStyle,
  cardContainer,
  detailscreenContainer,
  horizontalwidth = "50%",
  data,
}) => {
  return (
    <View style={[styles.card, cardContainer]}>
      <View style={styles.row}>
        <View style={[styles.detailsSection, detailscreenContainer]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <Text style={[styles.detailsTitle, titleStyle]}>{title}</Text>
              <HorizontalLine
                color="#B0C4DE"
                width={horizontalwidth}
              ></HorizontalLine>
            </View>
            {!titleIcon && (
              <View>
                <StatusBadge text={data?.data?.po_status} />
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginTop: 12,
            }}
          >
            <View style={[styles.detailsItem, {}]}>
              <Text style={[styles.label, style, {}]}>PO Name: </Text>
              <Text style={[styles.link, style]}>
                {truncateComponentName(data?.data?.po_name, 20)}
              </Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Type: </Text>
              <Text style={[styles.link, style]}>{"Internal"}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Items Number: </Text>
              <Text style={[styles.link, style]}>
                {data?.data?.po_items?.length}
              </Text>
            </View>
            <View style={[styles.detailsItem, {}]}>
              <Text style={[styles.label, style]}>Creation Date: </Text>
              <Text style={[styles.link, style]}>
                {formatDate(data?.data?.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PoDetailProfile;
