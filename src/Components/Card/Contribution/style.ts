import {StyleSheet} from 'react-native';
import helpers from '../../../utils/helpers';
import { PoppinsMedium, PoppinsRegular, PoppinsSemiBold } from '../../../Resources/fonts';
export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5169C',
    borderRadius: helpers.normalize(10),
    padding: helpers.normalize(15),
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    width: helpers.normalize(50),
    height: helpers.normalize(50),
    marginBottom: helpers.normalize(10),
  },
  cardTitle: {
    fontSize: helpers.normalize(16),
    fontFamily: PoppinsSemiBold,
    color: '#FFFFFF',
    marginBottom: helpers.normalize(5),
  },
  cardDescription: {
    fontSize: helpers.normalize(14),
    fontFamily: PoppinsRegular,
    color: '#FDBFE4',
    textAlign: 'center',
    marginBottom: helpers.normalize(20),
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: helpers.normalize(10),
    paddingHorizontal: helpers.normalize(20),
    borderRadius: helpers.normalize(5),
  },
  buttonText: {
    fontSize: helpers.normalize(12),
    fontFamily: PoppinsMedium,
    color: '#F5169C',
  },
});
