import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";

const styles = StyleSheet.create({
    container: {

      // marginBottom:50,

      // flexDirection: 'column',
    },
    fieldContainer: {
      // flexDirection: 'row',
      // alignItems: 'center',
      flexDirection:'row',
      alignItems:'center',
    },
    checkbox: {
      
        width: helpers.normalize(7),
        height: helpers.normalize(7),
        // right: helpers.normalize(5),
        borderWidth:1,
        marginHorizontal:10,  

        borderColor:'#B0C4DE'

        // top: helpers.normalize(-4),
      
      // marginRight: 8,
    },
    uncheckbox:{
      width: helpers.normalize(10),
      height: helpers.normalize(10),
      // right: helpers.normalize(5),
      // top: helpers.normalize(-4),
    },
    checked: {
      backgroundColor: '#007AFF',
      borderColor: '#007AFF',
    },
    errorCheckbox: {
      borderColor: '#ca3238',
    },
    label: {
      fontSize: 16,
    },
    errorText: {
      color: '#ca3238',
      fontSize: 12,
      marginTop: 4,
    },
  });
  export default styles