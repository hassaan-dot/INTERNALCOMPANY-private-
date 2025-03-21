import {StyleSheet} from 'react-native';
import helpers from '../../utils/helpers';
import { PoppinsBold, PoppinsLight, PoppinsMedium, PoppinsRegular, PoppinsSemiBold } from '../../Resources/fonts';
export const styles = StyleSheet.create({
  descContainer: {

  },
  title: {
    fontSize:37,
    fontFamily:PoppinsMedium,
    fontWeight:'700',
    color:'white'
  },
  subtitleCont: {
    // paddingHorizontal: helpers.normalize(5),
    marginTop:5,
  },
  subtitle: {
    fontSize: 25,
    fontFamily:PoppinsBold,
    fontWeight:'100',
    color: '#fff',
  },
});
