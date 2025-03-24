import { StyleSheet } from 'react-native';
import helpers from '../../../utils/helpers';

export default {
  getSheet: () =>
    StyleSheet.create({
      overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: helpers.normalize(10),
        alignItems: 'center',
      },
      dragHandle: {
        alignItems: 'center',
        marginHorizontal: helpers.normalize(150),
        paddingVertical: helpers.normalize(2),
        borderRadius: helpers.normalize(5),
        backgroundColor: '#D3D3D3',
      },
      dragIcon: {
        width: helpers.normalize(100),
        height: helpers.normalize(4),
        borderRadius: helpers.normalize(2.5),
        backgroundColor: "#C4C4C4",
      },
      header: {
        marginTop: helpers.normalize(20),
        marginVertical: helpers.normalize(10),
      },
      headerTitle: {
        fontSize: helpers.normalize(18),
        fontFamily: 'MontserratBold',
        color: '#333333',
      },
      shareOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: helpers.normalize(20),
      },
      shareButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: helpers.normalize(70),
      },
      iconStyle: {
        width: helpers.normalize(50),
        height: helpers.normalize(50),
        marginBottom: helpers.normalize(5),
      },
      shareLabel: {
        fontSize: helpers.normalize(12),
        fontFamily: 'PoppinsMedium',
        color: '#333333',
        textAlign: 'center',
      },
    }),
};
