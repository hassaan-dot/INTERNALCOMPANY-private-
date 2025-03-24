import { StyleSheet } from 'react-native';
import helpers from '../../utils/helpers';
import { PoppinsRegular, PoppinsSemiBold } from '../../Resources/fonts';

export const styles = StyleSheet.create({
  container: {

  },
  // menuicon:{width:helpers.wp(30),height:helpers.hp(20)},
  profileTitle: {
    fontSize: helpers.normalize(19),
    fontFamily: PoppinsSemiBold,
    color: '#333',
    marginBottom: helpers.normalize(10),
  },avatar: {
    width: 27,
    height: 27,
    borderRadius: 15,
    // right: 20,
    right: helpers.normalize(27)
  },
  menuButton: {
    position: 'absolute',
    top: helpers.normalize(20),
    right: helpers.normalize(20),
  },
  menuIcon: {
    width: helpers.normalize(24),
    height: helpers.normalize(24),
    tintColor: '#F5169C',
  },
  profileImageContainer: {
    width: helpers.normalize(100),
    height: helpers.normalize(100),
    borderRadius: helpers.normalize(50),
    borderWidth: helpers.normalize(2),
    borderColor: '#F5169C',
    overflow: 'hidden',
    marginBottom: helpers.normalize(10),
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: helpers.normalize(18),
    fontFamily: PoppinsSemiBold,
    color: '#333',
  },
  profileDesc: {
    fontSize: helpers.normalize(12),
    fontFamily: PoppinsRegular,
    color: '#959595',
    marginTop: helpers.normalize(5),
    textAlign: 'center',

  },
  image_menu:{
    width: helpers.normalize(20),
    height: helpers.normalize(20),
  }
});
