import {StyleSheet} from 'react-native';
import helpers from '../../../utils/helpers';

const getSheet = () => {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
      backgroundColor: '#FFFFFF',
      paddingBottom: 15,
      paddingTop: 10,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 22,
    },
    dragHandle: {
      alignItems: 'center',
      marginHorizontal: helpers.normalize(150),
      paddingVertical: helpers.normalize(2),
      borderRadius: helpers.normalize(5),
      backgroundColor: '#D3D3D3',
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: helpers.normalize(30),
    },
    headerImage: {
      width: helpers.normalize(60),
      height: helpers.normalize(60),
    },
    headerTitle: {
      textAlign: 'center',
      fontSize: helpers.normalize(19),
      fontFamily: 'PoppinsSemiBold',
      padding: helpers.normalize(10),
    },
    distributionLineImage: {
      width: helpers.wp(100),
      height: helpers.normalize(35),
    },
    contentPadding: {padding: helpers.normalize(10)},
    detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    detailTextOne: {
      fontSize: helpers.normalize(14),
      fontFamily: 'PoppinsRegular',
      color: '#4D4D4D',
    },
    detailTextTwo: {
      fontSize: helpers.normalize(14),
      fontFamily: 'PoppinsSemiBold',
      color: '#333333',
    },
    secondDetailContainerPadding: {
      paddingHorizontal: helpers.normalize(10),
      paddingTop: helpers.normalize(10),
    },
    buttonContainer: {flexDirection: 'row', justifyContent: 'center'},
    buttonTextStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lastButton: {
      marginTop: helpers.normalize(40),
      width: '90%',
      paddingVertical:  helpers.normalize(15),
      backgroundColor: '#F51796',
      borderRadius:  helpers.normalize(10),
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontFamily: 'PoppinsMedium',
      marginHorizontal:  helpers.normalize(10),
      fontSize: helpers.normalize(15),
    },
  });
};

export default {getSheet};
