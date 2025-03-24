import { StyleSheet } from 'react-native';
import helpers from '../../../utils/helpers';
import { PoppinsRegular, PoppinsSemiBold } from '../../../Resources/fonts';

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: helpers.normalize(10),
    // elevation: 3,
    padding: helpers.normalize(10),
    paddingVertical: helpers.normalize(15),
    marginVertical: helpers.normalize(5),
    shadowColor: '#000',  // The shadow color
    shadowOffset: { width: 0, height: 2 },  // The shadow offset (horizontal, vertical)
    shadowOpacity: 0.3,  // The opacity of the shadow
    shadowRadius: 4,  // The blur radius of the shadow
  },
  cardContent: {
    flex: 1,
    marginLeft: helpers.normalize(10),
    flexDirection: 'column',

  },
  rowFlex: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center'
  },
  cardTitle: {
    flex: 1,
    fontSize: helpers.normalize(15),
    fontFamily: PoppinsSemiBold,
    color: '#F624A1',
  },
  imageView: {
    justifyContent: 'center',
    backgroundColor: '#FEEAF5',
    borderRadius: helpers.normalize(8),
  },
  cardImage: {
    width: helpers.normalize(80),
    height: helpers.normalize(80),
  },
  cardAmountlabelText: {
    flex: 0.5,
    fontSize: helpers.normalize(10),
    fontFamily: PoppinsRegular,
    color: '#4E5D78',
  },
  cardAmountText: {
    flex: 0.5,
    fontSize: helpers.normalize(10),
    color: '#4E5D78',
    fontFamily: PoppinsSemiBold,
    textAlign: 'right',
  },
  paymentStatus: {
    flex: 0.5,
    fontSize: helpers.normalize(12),
    textAlign: 'right',
  },
  success: {
    color: 'green',
  },
  failed: {
    color: 'red',
  },
  failedReason: {
    color: '#3771C8',
    fontSize: helpers.normalize(10),
    fontFamily: PoppinsRegular,
    marginTop: helpers.normalize(15),
    marginBottom: helpers.normalize(5),
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: helpers.normalize(10),
  },
  viewReceiptButton: {
    backgroundColor: '#F5169C',
    paddingVertical: helpers.normalize(5),
    paddingHorizontal: helpers.normalize(10),
    borderRadius: helpers.normalize(3),
    marginRight: helpers.normalize(5),
    justifyContent: 'center',
  },
  contributeAgainButton: {
    borderWidth: 1,
    borderColor: '#F5169C',
    padding: helpers.normalize(10),
    borderRadius: helpers.normalize(3),
    marginLeft: helpers.normalize(5),
  },
  viewReceiptButtonText: {
    fontSize: helpers.normalize(12),
    color: '#fff',
    fontWeight: 'bold',
  },
  contributeAgainButtonText: {
    fontSize: helpers.normalize(12),
    color: '#F5169C',
  },
  boldText: {
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#FEEAF7',
    borderColor: '#F5169C',
    borderWidth: helpers.normalize(1.3),
    borderRadius: helpers.normalize(10),
    padding: helpers.normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    width: helpers.normalize(160),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    // paddingRight: helpers.normalize(5),
  },
  modalText: {
    fontSize: helpers.normalize(14),
    color: '#F5169C',
    paddingVertical:8,
    marginLeft: helpers.normalize(6),
  },
  reportSignIcon:{
    height: helpers.normalize(20),
    width: helpers.normalize(20),
  },
});
